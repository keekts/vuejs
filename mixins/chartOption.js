export default {
  data() {
    return {
      chartOption:{
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontFamily: 'Bouasavanh'
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }
  },
}