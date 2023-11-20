<template>
  <div ref='myEchart' style="width: 100%; height: 333px"></div>
</template>
<script type="text/babel">
  import echarts from 'echarts'
  import { getAction } from '@/api/manage'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    props: {
      jdgmCode: {
        type: String,
        default: '1'
      },
    },
    data() {
      return {
        mylist:[
          {
            "name": "正常",
            "value": 0
          },
          {
            "name": "关注",
            "value": 0},
          {
            "name": "次级",
            "value": 0
          },
          {
            "name": "可疑",
            "value": 0
          },
          {
            "name": "损失",
            "value": 0
          }
        ]
      }
    },
    created() {
      this.initDictConfig();
      this.jdgmCode=this.orgCode();

    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo","orgCode"]),
      initDictConfig() {
        getAction("/tjfx/zhckshmx/zhcksjmx/getzhwjfldk",{zzbz:this.jdgmCode}).then(res=>{
          if (res.success) {
            if (res.result.length > 0) {
              this.mylist = res.result
            }
            if (this.$refs.myEchart) {
              this.initChart();
            }
          }
        });
      },
      // 图表初始化数据
      initChart(){
        let myChart = echarts.init(this.$refs.myEchart);
        myChart.setOption({
          title: {
            show: true,
            text: '贷款五级分类分析',
            x: 'right',
            textStyle: {
              fontFamily: 'Times New Roman'
            },
          },
          tooltip: {
            trigger:'item',
            formatter: "{a} <br/>{b}: {c} <br/> ({d}%)"
          },
          legend: {
            orient: "vertical", // 'horizontal',
            // bottom: 20,
            left: 'left',
            data: ['正常', '关注','次级','可疑','损失']
          },
          series : [
            {
              name:'五级分类贷款数据',
              type: 'pie',
              radius: '60%',
              center: ['50%', '50%'],
              avoidLabelOverlap: true,
              data: this.mylist,
              itemStyle: {
                emphasis: {
                  shadowBlur: 8,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.3)'
                }
              }
            }
          ]
        })
      }
    },
   /* mounted () {
      this.initDictConfig();
      let obj = this.$refs.myEchart;
      if(obj){
        this.initChart();
      }
    }*/
  }


</script>
<!-- 引入 vintage 主题 -->

<style lang="less" type="text/less" rel="stylesheet/less" scoped>

</style>