import { mon_names, getCSSVariable} from './universal.js';
const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const sharePct = [ 11.5, 11.7, 12.6, 13.5, 16.4, 18.3, 16 ];
const crashTotals = [ 6299, 6391, 6891, 7358, 8973, 9987, 8742 ];
export const titlesar = [{
    que1: [
        {
            text: "What is the most dangerous day of the week to drive?", 
            style: {fontSize: '18px'}
        },
        {
            text: "Fatal crashes by day of the week (columns) with share of all crashes (line)",
            style: { color: 'var(--chart-muted)',
            fontSize: '13px' } 
        }, 
        ['var(--chart-lime)', 'var(--chart-amber)'
        ], 
        { bar: { columnWidth: '55%', borderRadius: 6 } 
        },
        { width: [0, 3], curve: 'smooth' 
        }, 
        {
            size: 5,
            colors: ['var(--chart-amber)'],
            strokeColors: 'var(--chart-card)',
            strokeWidth: 2
        },
        {
            dayOrder,
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
            max: Math.max(...sharePct) + 2,
            title: { text: 'Share of crashes (%)', style: { color: 'var(--chart-muted)' } }, labels: { style: { colors: 'var(--chart-muted)' } }  
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
        [
            getCSSVariable('--chart-lime'),
            getCSSVariable('--chart-coral')
        ]
    ],
    que3: [
        {
            text: 'Are fatalities reducing over time?',
            style: { color: 'var(--chart-foreground)', fontSize: '18px', fontWeight: 600 }
        },
        {
            text: 'Click a year point to see that year by month',
            style: { color: 'var(--chart-muted)', fontSize: '13px' }
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
            style: { color: 'var(--chart-foreground)', fontSize: '18px', fontWeight: 600 }
        },
        {
            text: 'Seasonal pattern across all years',
            style: { color: 'var(--chart-muted)', fontSize: '13px' }
        },
        {
            bar: { columnWidth: '55%', borderRadius: 6 }
        },
        ['var(--chart-violet)']
    ],
    que4: [
        [
            'var(--chart-amber)', 'var(--chart-teal)', 'var(--chart-coral)'
        ],
        {
            text: 'Fatal crashes by road user type',
            style: { color: 'var(--chart-foreground)', fontSize: '18px', fontWeight: 600 }
        },
        {
            text: 'Fatal crashes by road user type — click a wedge to zoom in',
            style: { color: 'var(--chart-muted)', fontSize: '13px' }
        },
        {
            colors: ['var(--chart-card)'], width: 3
        },
        {
            sunburst: {
                innerSize: '15%',
                borderRadius: 6,
                spacing: 2,
                zoomOnClick: true
            }
        },
        {
            enabled: true,
            style: { fontSize: '12px' }
        },
        {
            position: 'bottom',
            horizontalAlign: 'center',
            labels: { colors: 'var(--chart-foreground)' },
            markers: { size: 8 }
        }
    ],
    ai: {
        buttonLabel: 'AI Analysis',
        prompts: {
            que1: `You are analysing Australian fatal crash data (54,641 records). Fatal crashes by day of the week: Monday 6,299 (11.5%), Tuesday 6,391 (11.7%), Wednesday 6,891 (12.6%), Thursday 7,358 (13.5%), Friday 8,973 (16.4%), Saturday 9,987 (18.3%), Sunday 8,742 (16.0%). Saturday is the most dangerous day. Write a 2-3 sentence analysis about what the data reveals about driving danger by day of week. Be specific with numbers.`,
            que2: `You are analysing Australian fatal crash data (54,641 records) comparing Christmas and Easter holiday periods. The Christmas period has more fatal crashes than Easter due to the longer travel window and festive celebrations. Write a 2-3 sentence analysis comparing the two holiday periods and their risk factors. Be specific.`,
            que3: `You are analysing Australian fatal crash data (54,641 records) over time. Fatal crashes peak in December and January (summer in Australia). The yearly totals show some variation but no strong consistent decline. Write a 2-3 sentence analysis about trends and seasonal patterns. Be specific with numbers.`,
            que4: `You are analysing Australian fatal crash data (54,641 records) by road user type. Car drivers and passengers make up the majority, but motorcycle riders are disproportionately at risk relative to their road usage. Pedestrians and pedal cyclists are also vulnerable. Write a 2-3 sentence analysis about which road users are most at risk. Be specific with numbers.`
        }
    }
}];