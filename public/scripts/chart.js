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
          color: 'rgb(255, 99, 132)'
        },
        display: true,
        labels: {
          color: 'rgb(255, 99, 132)'
        }
      }
    }
  }
});
