new Chart("resultsChart", {
  type: "pie",
  data: {
    labels: toolTipVal,
    datasets: [{
      backgroundColor: colours,
      data: yVal
    }]
  },
  options: {
    plugins: {
      legend: {
        title: {
          display: true,
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
          },
        },
      },
    },
    animation: true,
    maintainAspectRatio: false,
  },
});
