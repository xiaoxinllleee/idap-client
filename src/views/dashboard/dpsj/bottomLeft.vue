<template>
  <div id="bottomLeft">
    <div class="bg-color-black ">
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-bar"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">存款趋势分析图</span>
        </div>
      </div>
      <div>
        <bottomLeftChart />
      </div>
    </div>
  </div>
</template>

<script>
import bottomLeftChart from "@/components/echart/bottom/bottomLeftChart";
export default {
  data() {
    return {};
  },
  components: {
    bottomLeftChart
  },
  mounted() {
  },
  methods: {
    jdrsclick() {
      let curDate = new Date();
      let curMonth= { year : curDate.getFullYear(), month: curDate.getMonth() + 1, }
      let tjyf=curMonth.year+'-'+0+curMonth.month+'-01';
      this.$router.push({path: '/tjfx/jdsjmx/tjfx_khjdltj_zhmx/Tjfx_khjdltj_zhmxList', query: {sszh:this.jddmCode,tjyf:tjyf}})
    },

  }
};
</script>

<style lang="scss">
#bottomLeft {
  padding: 1.5rem 1rem;
  height: 520px;
  min-width: 300px;
  border-radius: 5px;
  .bg-color-black {
    height: 485px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .chart-box {
    margin-top: 1rem;
    width: 170px;
    height: 170px;
    .active-ring-name {
      padding-top: 10px;
    }
  }
}
</style>