import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
import anime from 'https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.es.js';
// ── Grade ordering (A+ = 16, F = 0) ──────────────────────────────────

export class Stats {
    constructor() {
        this.GRADE_ORDER = ['F','E-','E','E+','D-','D','D+','C-','C','C+','B-','B','B+','A-','A','A+'];
        this.gradeNum = g => this.GRADE_ORDER.indexOf(g);
        this.APEX_COLORS = ['#1f6bde','#4cb2ff','#00c29a','#f5a623','#e94560','#9b59b6'];
        this.gradeBadge = cell => `<span class="grade-badge">${cell.getValue()}</span>`;
    }

    // ── Fetch data from stats_data.php ────────────────────────────────────
    async load() {
        let rows;
        try {
            const res = await fetch('stats_data.php');
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            rows = await res.json();
        } catch (err) {
            document.getElementById('class-table').innerHTML =
                `<p class="loading-msg" style="color:#e94560">Could not load data – is stats_data.php running? (${err.message})</p>`;
            return;
        }

        if (!Array.isArray(rows) || rows.length === 0) {
            document.getElementById('class-table').innerHTML =
                '<p class="stats-empty">No classes yet. Add data on the Form page.</p>';
            return;
        }

        this.#populateSummary(rows);
        this.#buildTable(rows);
        this.#buildCharts(rows);
    }

    // ── Summary cards ─────────────────────────────────────────────────────
    #populateSummary(rows) {
        document.getElementById('total-classes').textContent = rows.length;

        const avgSize = Math.round(rows.reduce((s, r) => s + Number(r.size), 0) / rows.length);
        document.getElementById('avg-size').textContent = avgSize;

        const years = [...new Set(rows.map(r => r.year_level))].map(Number).sort((a,b)=>a-b);
        document.getElementById('year-span').textContent =
            years.length === 1 ? years[0] : `${years[0]}–${years[years.length-1]}`;
    }

    // ── Tabulator table ───────────────────────────────────────────────────
    #buildTable(rows) {
        new Tabulator('#class-table', {
            data: rows,
            layout: 'fitColumns',
            responsiveLayout: 'collapse',
            pagination: 'local',
            paginationSize: 10,
            movableColumns: true,
            columns: [
                { title: 'Class name',     field: 'class',         sorter: 'string', headerFilter: 'input' },
                { title: 'Year level',     field: 'year_level',    sorter: 'number', headerFilter: 'input', width: 110 },
                { title: 'Size',           field: 'size',          sorter: 'number', width: 80 },
                { title: 'Lowest grade',   field: 'lowest_grade',  sorter: (a,b) => this.gradeNum(a) - this.gradeNum(b), formatter: this.gradeBadge },
                { title: 'Average grade',  field: 'av_grade',      sorter: (a,b) => this.gradeNum(a) - this.gradeNum(b), formatter: this.gradeBadge },
                { title: 'Highest grade',  field: 'highest_grade', sorter: (a,b) => this.gradeNum(a) - this.gradeNum(b), formatter: this.gradeBadge },
            ],
        });
    }

    // ── ApexCharts ────────────────────────────────────────────────────────
    #baseOpts() {
        return {
            chart: { fontFamily: 'inherit', toolbar: { show: false }, background: 'transparent' },
            theme: { mode: 'light' },
            colors: this.APEX_COLORS,
            tooltip: { theme: 'light' },
        };
    }

    #buildCharts(rows) {
        // 1. Bar – class sizes
        new ApexCharts(document.getElementById('chart-sizes'), {
            ...this.#baseOpts(),
            chart: { ...this.#baseOpts().chart, type: 'bar', height: 220 },
            series: [{ name: 'Size', data: rows.map(r => Number(r.size)) }],
            xaxis: { categories: rows.map(r => r.class), labels: { rotate: -30 } },
            yaxis: { title: { text: 'Students' } },
            plotOptions: { bar: { borderRadius: 6, distributed: true } },
            legend: { show: false },
        }).render();

        // 2. Donut – average grade distribution
        const gradeCounts = {};
        rows.forEach(r => { gradeCounts[r.av_grade] = (gradeCounts[r.av_grade] || 0) + 1; });
        const gradeLabels = Object.keys(gradeCounts).sort((a,b) => this.gradeNum(b) - this.gradeNum(a));
        new ApexCharts(document.getElementById('chart-grades'), {
            ...this.#baseOpts(),
            chart: { ...this.#baseOpts().chart, type: 'donut', height: 220 },
            series: gradeLabels.map(g => gradeCounts[g]),
            labels: gradeLabels,
            legend: { position: 'bottom', fontSize: '12px' },
        }).render();

        // 3. Column – classes per year level
        const yearCounts = {};
        rows.forEach(r => { yearCounts[r.year_level] = (yearCounts[r.year_level] || 0) + 1; });
        const yearLabels = Object.keys(yearCounts).sort((a,b) => a - b);
        new ApexCharts(document.getElementById('chart-years'), {
            ...this.#baseOpts(),
            chart: { ...this.#baseOpts().chart, type: 'bar', height: 220 },
            series: [{ name: 'Classes', data: yearLabels.map(y => yearCounts[y]) }],
            xaxis: { categories: yearLabels.map(y => `Year ${y}`) },
            plotOptions: { bar: { borderRadius: 6 } },
            colors: ['#00c29a'],
        }).render();

        // 4. Line chart – low/avg/high per class (cleaner than range bar)
        const classes = rows.map(r => r.class);
        const lowestSeries = rows.map(r => this.gradeNum(r.lowest_grade));
        const averageSeries = rows.map(r => this.gradeNum(r.av_grade));
        const highestSeries = rows.map(r => this.gradeNum(r.highest_grade));
        new ApexCharts(document.getElementById('chart-range'), {
            ...this.#baseOpts(),
            chart: { ...this.#baseOpts().chart, type: 'line', height: 240 },
            series: [
                { name: 'Lowest', type: 'line', data: lowestSeries },
                { name: 'Average', type: 'line', data: averageSeries },
                { name: 'Highest', type: 'line', data: highestSeries },
            ],
            xaxis: { categories: classes, labels: { rotate: -30 } },
            yaxis: {
                min: 0, max: this.GRADE_ORDER.length - 1,
                tickAmount: this.GRADE_ORDER.length,
                labels: { formatter: v => this.GRADE_ORDER[Math.round(v)] ?? '' },
            },
            markers: { size: 5 },
            stroke: { curve: 'smooth' },
            colors: ['#4cb2ff', '#f5a623', '#00c29a'],
            legend: { position: 'top' },
        }).render();
    }
}