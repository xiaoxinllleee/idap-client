<template>
  <div id="index">
   <!-- <dv-full-screen-container class="bg">
    </dv-full-screen-container>-->
    <dv-loading v-if="loading">Loading...</dv-loading>
    <div v-else class="host-body">
      <div class="d-flex jc-center">
        <dv-decoration-10 style="width:33.3%;height:5px;" />
        <div class="d-flex jc-center">
          <dv-decoration-8 :color="['#568aea', '#000000']" style="width:200px;height:50px;" />
          <div class="title">
            <span class="title-text">客户画像</span>
            <dv-decoration-6
              class="title-bototm"
              :reverse="true"
              :color="['#50e3c2', '#67a1e5']"
              style="width:250px;height:8px;"
            />
          </div>
          <dv-decoration-8
            :reverse="true"
            :color="['#568aea', '#000000']"
            style="width:200px;height:50px;"
          />
        </div>
        <dv-decoration-10 style="width:33.3%;height:5px;" />
      </div>

      <!-- 第二行 -->
      <div class="d-flex jc-between px-2">
        <div class="d-flex" style="width: 40%">
          <div
            class="react-right ml-4"
            style="width: 500px; text-align: left;background-color: #0f1325;"
          >
            <span class="react-before"></span>
            <span class="text fw-b">客户姓名 : 张三    证件号码 : 430000199302171111</span>
          </div>
          <div class="react-right ml-3" style="background-color: #0f1325;">
            <span class="text colorBlue fw-b">数据分析2</span>
          </div>
        </div>
        <div style="width: 40%" class="d-flex">
          <div class="react-left bg-color-blue mr-3">
            <span class="text fw-b">数据分析3</span>
          </div>
          <div
            class="react-left mr-4"
            style="width: 500px; background-color: #0f1325; text-align: right;"
          >
            <span class="react-after"></span>
            <span class="text">2020年05月24日 周一 12:00</span>
          </div>
        </div>
      </div>

      <div class="body-box">
        <!-- 第三行数据 -->
        <div class="content-box">
          <div>
            <dv-border-box-12>
              <centreLeft1 />
            </dv-border-box-12>
          </div>
          <div>
            <dv-border-box-12>
              <centreLeft2 />
            </dv-border-box-12>
          </div>
         <!-- &lt;!&ndash; 中间 &ndash;&gt;
          <div>
            <center />
          </div>
          &lt;!&ndash; 中间 &ndash;&gt;
          <div>
            <centreRight2 />
          </div>-->
          <div>
            <dv-border-box-12>
              <centreRight1 />
            </dv-border-box-12>
          </div>
        </div>

        <!-- 第四行数据 -->
        <div class="bototm-box">
          <dv-border-box-13>
            <bottomLeft />
          </dv-border-box-13>
          <dv-border-box-12>
            <bottomRight />
          </dv-border-box-12>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import centreLeft1 from "./dpsj/centreLeft1";
  import centreLeft2 from "./dpsj/centreLeft2";
  import centreRight1 from "./dpsj/centreRight1";
  import centreRight2 from "./dpsj/centreRight2";
  import center from "./dpsj/center";
  import bottomLeft from "./dpsj/bottomLeft";
  import bottomRight from "./dpsj/bottomRight";
  export default {
    data() {
      return {
        loading: true
      };
    },
    components: {
      centreLeft1,
      centreLeft2,
      centreRight1,
      centreRight2,
      center,
      bottomLeft,
      bottomRight
    },
    mounted() {
      this.cancelLoading();
    },
    methods: {
      cancelLoading() {
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      }
    }
  };
</script>

<style scoped lang="scss">
  @import '~@assets/scss/indextwo.scss';
</style>
