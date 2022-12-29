new Chart("resultsChart", {
  type: "pie",
  data: {
    labels: toolTipVal,
    datasets: [{
      // label: toolTipVal,
      backgroundColor: colours,
      data: yVal
    }]
  },
  options: {
    plugins: {
      legend: {
        title: {
          display: true,
          // text: `${creator}'s Poll Results`,
          text: `Poll Results`,
          color: 'rgb(187,188,0)',
          font: {
            size: 26,
          }
        },
        display: true,
        labels: {
          color: 'rgb(254, 255, 230)',
          font: {
            size: 16,
          }
        },
      },
      // tooltip: {
      //   enabled: true,
      //   callbacks: {
      //     label: (item) => label + ': ' + item.parsed,
      //     // label: (item) => item.parsed + '%'
      //   },
      // },
    },
    maintainAspectRatio: false,
  },
});
