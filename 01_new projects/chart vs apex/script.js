const data = [
  { month: 'Jan', revenue: 28, profit: 18 },
  { month: 'Feb', revenue: 35, profit: 25 },
  { month: 'Mar', revenue: 40, profit: 29 },
  { month: 'Apr', revenue: 55, profit: 38 },
  { month: 'May', revenue: 48, profit: 31 },
  { month: 'Jun', revenue: 65, profit: 43 },
  { month: 'Jul', revenue: 75, profit: 52 },
  
]
const type = 'line';
const apexOptions = {
  chart: {
    type: type,
    height: 360,
    toolbar: { show: false },
  },
  series: [
    {
      name: 'Revenue',
      data: data.map(d => d.revenue),
    },
    {
      name: 'Profit',
      data: data.map(d => d.profit),
    },
  ],
  xaxis: {
    categories: data.map(d => d.month),
  },
  yaxis: {
    title: {
      text: 'Value (k)',
    },
  },
  stroke: {
    curve: 'smooth',
    width: 3,
  },
  markers: {
    size: 4,
  },
  tooltip: {
    shared: true,
    intersect: false,
  },
};

new ApexCharts(document.querySelector('#lineChartpa'), apexOptions).render();

const ctx = document.getElementById('lineChartjs').getContext('2d');
const plugin = { filler: 'start' };
new Chart(ctx, {
  type: type,
  data: {
    labels: data.map(d => d.month),
    datasets: [
      {
        label: 'Sales',
        data: data.map(d => d.revenue),
        borderColor: '#3498db',
        backgroundColor: 'rgb(52, 152, 219)',
        tension: 0.35,
        fill: true,
      },
      {
        label: 'Expenses',
        data: data.map(d => d.profit),
        borderColor: '#e74c3c',
        backgroundColor: 'rgb(231, 77, 60)',
        tension: 0.35,
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Performance',
        font: {
          size: 16,
        },
      },
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (k)',
        },
      },
    },
  },
});