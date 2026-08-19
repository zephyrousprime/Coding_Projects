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

export const titlesar = [{
    stateNames,
    stateOrder,

    que1: [
        {
            text: "What is the most dangerous day of the week to drive?",
            style: { fontSize: '18px' }
        },
        {
            text: "Fatal crashes by day of the week (columns) with share of all crashes (line)",
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
            title: { text: 'Fatal crashes', style: { color: 'var(--chart-muted)' } },
            labels: { style: { colors: 'var(--chart-muted)' } }
        },
        {
            opposite: true,
            min: 0,
            title: { text: 'Share of crashes (%)', style: { color: 'var(--chart-muted)' } },
            labels: { style: { colors: 'var(--chart-muted)' } }
        },
        {
            position: 'bottom',
            horizontalAlign: 'center',
            labels: { colors: 'var(--chart-foreground)' },
            markers: { size: 8 }
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
            text: 'Fatal crashes during the Christmas and Easter periods',
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
            text: 'Are fatalities reducing over time?',
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
            text: 'Fatal crashes by month of the year',
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
            text: 'Fatal crashes by road user type',
            style: { color: getCSSVariable('--chart-foreground'), fontSize: '18px', fontWeight: 600 }
        },
        {
            text: 'Fatal crashes by road user type — click a wedge to zoom in',
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
        text: "With 54,641 fatal crashes recorded across Australia, the data paints a clear picture of when, where, and to whom our roads are most dangerous. Saturdays are the deadliest day, and when combined with Friday, the two days alone make up over a third of all fatal crashes. Risk also surges during holiday periods, with the Christmas window recording significantly more fatal crashes than Easter. Seasonal trends reinforce this, as fatalities peak in December and January during the Australian summer. Despite improvements in vehicle safety and road infrastructure, there is no strong long-term decline in fatal crashes. Motorcycle riders, pedestrians, and pedal cyclists face disproportionate risk. Certain states carry a far heavier toll, and it is in those regions where targeted enforcement, infrastructure investment, and public education could save the most lives."
    },

    overQuChartTitle: {
        title: { text: 'Fatal crashes by state and territory', style: { color: getCSSVariable('--chart-foreground'), fontSize: '18px', fontWeight: 600 } }
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
    }
}];
