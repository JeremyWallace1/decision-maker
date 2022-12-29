new Chart("resultsChart", {
  type: "pie",
  data: {
    labels: xVal,
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
          text: `${creator}'s Poll Results`,
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
        }
      }
    }
  }
});
