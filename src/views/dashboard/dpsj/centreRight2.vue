<template>
  <div id="centreRight2">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="align-left"></icon>
        </span>
        <span class="fs-xl text mx-2">支行放款前五</span>
      </div>
      <div class="d-flex jc-center body-box">
        <dv-capsule-chart :config="config" style="width: 100%;height:160px" />
        <!-- ---------------------------------------- -->
        <centreRight2Chart1></centreRight2Chart1>
      </div>
    </div>
  </div>
</template>

<script>
import centreRight2Chart1 from "@/components/echart/centreRight2/centreRight2Chart1";

export default {
  data() {
    return {
      config: {
        data: [
          {
            name: "大围山支行",
            value: 1670
          },
          {
            name: "镇头支行",
            value: 1452
          },
          {
            name: "古港支行",
            value: 1405
          },
          {
            name: "淮川支行",
            value: 1230
          },
          {
            name:  "关口支行",
            value: 1105
          }
        ]
      }
    };
  },
  components: { centreRight2Chart1 },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
#centreRight2 {
  padding: 5px;
  height: 400px;
  min-width: 300px;
  border-radius: 5px;
  .bg-color-black {
    padding: 5px;
    height: 405px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .body-box {
    flex-direction: column;
    border-radius: 10px;
    overflow: hidden;
  }
}
</style>