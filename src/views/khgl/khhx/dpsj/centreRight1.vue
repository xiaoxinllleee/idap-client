<template>
  <div id="centreRight1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-line"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">资金归行率分析</span>
        </div>
      </div>
      <div class="d-flex jc-center body-box">
        <dv-scroll-board :config="config" style="height:360px" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: {
        header: ["月份", "贷款余额","存款余额", "贷款日平","存款日平","资金归行率"],
        data: [
          ["2020-05-01", "1000000","1000000", "1000000","1000000", "<span  class='colorGrass'>↑75%</span>"],
          ["2020-04-01", "1000000","1000000",  "1000000","1000000","<span  class='colorRed'>↓33%</span>"],
          ["2020-03-01", "1000000","1000000", "1000000","1000000", "<span  class='colorGrass'>↑100%</span>"],
          ["2020-02-01", "1000000","1000000", "1000000","1000000", "<span  class='colorGrass'>↑94%</span>"],
          ["2020-01-01", "1000000","1000000",  "1000000","1000000","<span  class='colorGrass'>↑95%</span>"],
          ["2019-12-01", "1000000", "1000000", "1000000","1000000","<span  class='colorGrass'>↑63%</span>"],
          ["2019-11-01", "1000000","1000000",  "1000000","1000000","<span  class='colorGrass'>↑84%</span>"],
          ["2019-10-01", "1000000", "1000000", "1000000","1000000","<span  class='colorRed'>↓46%</span>"],
          ["2019-09-01","1000000", "1000000", "1000000","1000000","<span  class='colorRed'>↓13%</span>"],
          ["2019-08-01", "1000000", "1000000", "1000000","1000000","<span  class='colorGrass'>↑76%</span>"]
        ],
        rowNum: 7, //表格行数
        headerHeight: 35,
        headerBGC: "#0f1325", //表头
        oddRowBGC: "#0f1325", //奇数行
        evenRowBGC: "#171c33", //偶数行
        index: true,
        columnWidth: [50],
        align: ["center"]
      }
    };
  },
  components: {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
#centreRight1 {
  padding: 1rem;
  height: 410px;
  min-width: 300px;
  border-radius: 5px;
  .bg-color-black {
    height: 385px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .body-box {
    border-radius: 10px;
    overflow: hidden;
  }
  
}
</style>