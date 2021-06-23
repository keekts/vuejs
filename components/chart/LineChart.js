import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    data: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  computed: {
    chartData: function () {
      return this.data;
    }
  },
  mounted() {
    // this.renderChart(this.chartdata, this.options)
    this.renderLineChart()
  },
  methods: {
    renderLineChart() {
      this.renderChart(this.chartData, this.options)
    }
  },
  watch: {
    data () {
      this._chart.destroy();
      this.renderChart(this.chartData, this.options)
    }
  }
}
// https://stackoverflow.com/questions/43728332/vue-chart-js-chart-is-not-updating-when-data-is-changing