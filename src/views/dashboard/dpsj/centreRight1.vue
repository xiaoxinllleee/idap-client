<template>
  <div id="centreRight1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-line"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">全行任务完成情况比年初</span>
        </div>
      </div>
      <div class="d-flex jc-center body-box">
        <dv-scroll-board :config="config" style="width:270px;height:360px" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: {
        header: ["任务类型", "完成度"],
        data: [
          ["建档覆盖率", "<span  class='colorGrass'>↑75%</span>"],
          ["走访覆盖率", "<span  class='colorRed'>↓33%</span>"],
          [ "存款揽储", "<span  class='colorGrass'>↑100%</span>"],
          [ "发放贷款", "<span  class='colorGrass'>↑94%</span>"],
          [ "ETC开户", "<span  class='colorGrass'>↑95%</span>"],
          [ "电子银行", "<span  class='colorGrass'>↑63%</span>"],
          [ "手机银行", "<span  class='colorGrass'>↑84%</span>"],
          [ "口袋零钱", "<span  class='colorRed'>↓46%</span>"],
          [ "POS机", "<span  class='colorRed'>↓13%</span>"],
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