export const mon_names = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

export function getCSSVariable(varName) {
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
}

const stateNames = {
    'NSW': 'New South Wales', 'Vic': 'Victoria', 'Qld': 'Queensland',
    'WA': 'Western Australia', 'SA': 'South Australia', 'Tas': 'Tasmania',
    'NT': 'Northern Territory', 'ACT': 'ACT'
};

const stateOrder = ['NSW', 'Vic', 'Qld', 'WA', 'SA', 'Tas', 'NT', 'ACT'];
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:<>?~';
const { animate, stagger, createTimeline } = anime;
export const titlesar = [{
    stateNames,
    stateOrder,
    createbase: [
        {
            background: 'transparent',
            foreColor: 'var(--chart-foreground)',
            fontFamily: 'var(--chart-font-family)',
            toolbar: { show: true },
            animations: { easing: 'easeinout', speed: 800 }
        },
        { borderColor: 'var(--chart-grid)' },
        { enabled: false },
        {
            theme: 'dark',
            style: { fontSize: '13px' },
            y: { formatter: value => value.toLocaleString() }
        },
        {
                    axisBorder: { color: 'var(--chart-grid)' }
        }
    ],
    que1: [
        {
            text: "What is the most dangerous day of the week to drive?",
            style: { fontSize: '18px' }
        },
        {
            text: "Road deaths by day of the week (columns) with share of all deaths (line)",
            style: { color: getCSSVariable('--chart-muted'), fontSize: '13px' }
        },
        ['var(--chart-lime)', 'var(--chart-amber)'],
        { bar: { columnWidth: '55%', borderRadius: 6 } },
        { width: [0, 3], curve: 'smooth' },
        {
            size: 5,
            colors: ['var(--chart-amber)'],
            strokeColors: 'var(--chart-card)',
            strokeWidth: 2
        },
        {
            dayOrder: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            axisBorder: { color: 'var(--chart-grid)' },
            axisTicks: { color: 'var(--chart-grid)' },
            labels: { style: { colors: 'var(--chart-muted)' } }
        },
        {
            title: { text: 'Road deaths', style: { color: 'var(--chart-muted)' } },
            labels: { style: { colors: 'var(--chart-muted)' } }
        },
        {
            opposite: true,
            min: 0,
            title: { text: 'Share of deaths (%)', style: { color: 'var(--chart-muted)' } },
            labels: { style: { colors: 'var(--chart-muted)' } }
        },
        {
            position: 'bottom',
            horizontalAlign: 'center',
            labels: { colors: 'var(--chart-foreground)' },
            markers: { size: 8 }
        }
    ],

    renderday: [
        ['var(--chart-amber)'],
        { bar: { columnWidth: '55%', borderRadius: 6 } },
        {
            theme: 'dark',
            style: { fontSize: '13px' },
            y: { formatter: value => value.toLocaleString() }
        }
    ],
    que2: [
        {
            position: 'bottom',
            labels: { color: getCSSVariable('--chart-foreground'), usePointStyle: true, pointStyle: 'rectRounded', padding: 14, font: { size: 12 } }
        },
        {
            display: true,
            text: 'Is Christmas more dangerous than Easter?',
            color: getCSSVariable('--chart-foreground'),
            font: { size: 18, weight: 600 },
            padding: { bottom: 6 }
        },
        {
            display: true,
            text: 'Road deaths during the Christmas period (12 days) vs Easter period (5 days)',
            color: getCSSVariable('--chart-muted'),
            font: { size: 13 },
            padding: { bottom: 16 }
        },
        {
            backgroundColor: getCSSVariable('--chart-tooltip-bg'),
            borderColor: getCSSVariable('--chart-grid'),
            borderWidth: 1,
            titleColor: getCSSVariable('--chart-foreground'),
            bodyColor: getCSSVariable('--chart-foreground'),
            padding: 12,
            cornerRadius: 8,
            callbacks: {
                label: context => ` ${context.label}: ${context.parsed.toLocaleString()}`
            }
        },
        [getCSSVariable('--chart-lime'), getCSSVariable('--chart-coral')]
    ],


    que3: [
        {
            text: 'Are road deaths reducing over time?',
            style: { color: getCSSVariable('--chart-foreground'), fontSize: '18px', fontWeight: 600 }
        },
        {
            text: 'Click a year point to see that year by month',
            style: { color: getCSSVariable('--chart-muted'), fontSize: '13px' }
        },
        ['var(--chart-teal)'],
        { curve: 'smooth', width: 3 },
        {
            size: 5,
            hover: { size: 7 },
            colors: ['var(--chart-teal)'],
            strokeColors: 'var(--chart-card)',
            strokeWidth: 2
        },
        {
            type: 'gradient',
            gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.05, stops: [0, 90, 100] }
        },
        {
            text: 'Road deaths by month of the year',
            style: { color: getCSSVariable('--chart-foreground'), fontSize: '18px', fontWeight: 600 }
        },
        {
            text: 'Seasonal pattern across all years',
            style: { color: getCSSVariable('--chart-muted'), fontSize: '13px' }
        },
        { bar: { columnWidth: '55%', borderRadius: 6 } },
        ['var(--chart-violet)']
    ],


    que4: [
        ['var(--chart-amber)', 'var(--chart-teal)', 'var(--chart-coral)'],
        {
            text: 'Road deaths by road user type',
            style: { color: getCSSVariable('--chart-foreground'), fontSize: '18px', fontWeight: 600 }
        },
        {
            text: 'Road deaths by road user type — click a wedge to zoom in',
            style: { color: getCSSVariable('--chart-muted'), fontSize: '13px' }
        },
        { colors: ['var(--chart-card)'], width: 3 },
        {
            sunburst: {
                innerSize: '15%',
                borderRadius: 6,
                spacing: 2,
                zoomOnClick: true
            }
        },
        { enabled: true, style: { fontSize: '12px' } },
        {
            position: 'bottom',
            horizontalAlign: 'center',
            labels: { colors: 'var(--chart-foreground)' },
            markers: { size: 8 }
        }
    ],


    overQuAnswer: {
        title: "How safe are our roads?",
        text: "With 54,641 road deaths recorded across Australia, the analysis reveals clear patterns in when and where road trauma occurs. Road deaths vary by day of week, time of year, holiday period, road user type, and state. Saturday is the deadliest day, and when combined with Friday, the two days alone make up over a third of all road deaths. Risk also increases during holiday periods, with the Christmas period recording significantly more road deaths than Easter. Seasonal trends reinforce this, as road deaths peak in December and January. Despite improvements in vehicle safety and road infrastructure, there is no strong long-term decline in road deaths. The dataset alone does not provide enough context to determine whether Australian roads are becoming safer or more dangerous over time. Motorcycle riders account for a significant proportion of road deaths, but the dataset does not provide information about the number of motorcycle riders, kilometres travelled, or trip frequency — therefore, we cannot conclude that motorcycle riding is disproportionately dangerous relative to other road uses. Certain states carry a far heavier toll, and it is in those regions where targeted enforcement, infrastructure investment, and public education could save the most lives."
    },

    overQuChartTitle: {
        title: { text: 'Road deaths by state and territory', style: { color: getCSSVariable('--chart-foreground'), fontSize: '18px', fontWeight: 600 } }
    },

    ai: {
        buttonLabel: 'AI Analysis',
        prompts: {
            que1: '',
            que2: '',
            que3: '',
            que4: '',
            'over-qu': ''
        }
    },
    anime: [
        {
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 600,
            delay: 20,
            ease: 'easeOutExpo',
            onComplete: () => { document.getElementById('changing-title').style.opacity = ''; }
        },
        {
            opacity: [0, 1],
            translateY: [60, 0],
            scale: [0.95, 1],
            duration: 600,
            delay: stagger(120, { start: 400 }),
            ease: 'easeOutExpo'
        },
        {
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 600,
            delay: 400 + (document.querySelectorAll('.home-grid .multiple-choice').length * 120) + 100,
            ease: 'easeOutExpo'
        },
        {
            rotate: '1turn',
            duration: 600,
            ease: 'easeInOut'
        },
        {
            opacity: [0, 1],
            translateY: [30, 0],
            scale: [0.98, 1],
            duration: 700,
            ease: 'easeOutExpo'
        },
        {
            scale: [1, 1.06, 1],
            boxShadow: [
                '0 0 0px rgba(206,253,84,0)',
                '0 0 24px rgba(206,253,84,0.4)',
                '0 0 0px rgba(206,253,84,0)'
            ],
            duration: 800,
            ease: 'easeInOut',
            loop: true
        },
        {
            scale: 1,
            boxShadow: '0 0 0px rgba(206,253,84,0)',
            duration: 300,
            ease: 'easeOut'
        }
    ]
}];
const cfg = titlesar[0];
export const groupedarry = [{
    grouped: [
        {
                chart: cfg.createbase[0],
                grid: cfg.createbase[1],
                dataLabels: cfg.createbase[2],
                tooltip: cfg.createbase[3],
                xaxis: cfg.createbase[4]
        },
    ]
}]
