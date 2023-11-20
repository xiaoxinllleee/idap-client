<template>
  <div id="center">
    <div class="up">
      <div class="bg-color-black item" v-for="item in titleItem" :key="item.title">
        <p class="ml-3 colorBlue fw-b">{{item.title}}</p>
        <div>
          <dv-digital-flop :config="item.number" style="width:100px;height:50px;" />
        </div>
      </div>
    </div>
    <div class="down">
      <div class="ranking bg-color-black">
        <span style="color:#5cd9e8">
          <icon name="align-left"></icon>
        </span>
        <span class="fs-xl text mx-2 mb-1">行政村任务达标情况</span>
        <dv-scroll-ranking-board :config="ranking" style="height:220px" />
      </div>
      <div class="percent">
        <div class="item  bg-color-black">
          <span>任务通过率</span>
          <centerChart1 />
        </div>
        <div class="item  bg-color-black">
          <span>任务达标率</span>
          <centerChart2 />
        </div>
        <div class="water">
          <dv-water-level-pond :config="water" style="height: 120px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import centerChart1 from "@/components/echart/center/centerChart1";
import centerChart2 from "@/components/echart/center/centerChart2";

export default {
  data() {
    return {
      titleItem: [
        {
          title: "存款日平余额",
          number: {
            number: [100],
            toFixed: 1,
            content: "{nt}"
          }
        },
        {
          title: "存款余额",
          number: {
            number: [18],
            toFixed: 1,
            content: "{nt}"
          }
        },
        {
          title: "贷款余额",
          number: {
            number: [2],
            toFixed: 1,
            content: "{nt}"
          }
        },
        {
          title: "本年新增贷款户数",
          number: {
            number: [14],
            toFixed: 1,
            content: "{nt}"
          }
        },
        {
          title: "本年新增存款户数",
          number: {
            number: [106],
            toFixed: 1,
            content: "{nt}"
          }
        },
        {
          title: "贷款不良率",
          number: {
            number: [100],
            toFixed: 1,
            content: "{nt}"
          }
        }
      ],
      ranking: {
        data: [
          {
            name: "珠联村",
            value: 100
          },
          {
            name: "七家坪村",
            value: 98
          },
          {
            name: "芙蓉村",
            value: 98
          },
          {
            name: "中新村",
            value: 90
          },
          {
            name: "拖下村",
            value: 89
          },
          {
            name: "合金村",
            value: 86
          },
          {
            name: "九江村",
            value: 84
          },
          {
            name: "新福村",
            value: 83
          }
        ],
        waitTime: 4000,
        carousel: "page",
        unit: "%"
      },
      water: {
        data: [24, 45],
        shape: 'roundRect',
        formatter:'{value}%',
        waveNum:3
      }
    };
  },
  components: {
    centerChart1,
    centerChart2
  }
};
</script>

<style lang="scss" scoped>
#center {
  display: flex;
  flex-direction: column;
  .up {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item {
      border-radius: 5px;
      padding-top: 1rem;
      margin-top: 0.5rem;
      width: 32%;
      height: 70px;
    }
  }
  .down {
    padding: 4px;
    padding-bottom: 0px;
    width: 100%;
    display: flex;
    height: 255px;
    justify-content: space-between;
    .bg-color-black {
      border-radius: 5px;
    }
    .ranking {
      padding: 10px;
      width: 59%;
    }
    .percent {
      width: 40%;
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 50%;
        height: 120px;
        span {
          margin-top: 7px;
          display: flex;
          justify-content: center;
        }
      }
      .water {
        width: 100%;
      }
    }
  }
}
</style>