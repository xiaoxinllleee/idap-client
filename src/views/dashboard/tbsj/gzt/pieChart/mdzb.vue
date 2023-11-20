<template>
  <!--工作台-白名单/灰名单/黑名单占比-->
  <div ref='myEchart' style="width: 100%; height:275px"></div>
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
          {"name":"白名单","value":170},
          {"name":"灰名单","value":105},
          {"name":"黑名单","value":25}
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
          if(res.success){
            //this.mylist =res.result
            let obj = this.$refs.myEchart;
            if(obj){
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
            text: '白名单/灰名单/黑名单占比',
            x: 'right',
            textStyle: {
              fontFamily: 'Times New Roman'
            },
          },
          tooltip: {
            trigger:'item',
            formatter: "{a} <br/>{b}: {c} 人<br/> ({d}%)"
          },
          legend: {
            orient: "vertical", // 'horizontal',
            // bottom: 20,
            x: "left",
            data: ['白名单','灰名单','黑名单']
          },
          series : [
            {
              name:'人数',
              type: 'pie',
              radius : '60%',
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
  }
</script>

<!-- 引入 vintage 主题 -->
<style lang="less" type="text/less" rel="stylesheet/less" scoped>
</style>