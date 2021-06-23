import {
  Pie
} from 'vue-chartjs'
// https://codesandbox.io/s/yv8zrl0jwv?file=/src/PieChart.js
// https://codepen.io/kasiditp/pen/jwBqBZ
export default {
  extends: Pie,
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, this.options)
  },
}