<template>
  <!--存贷款业务分析-不良贷款占比-->
  <div ref='myEchart' style="width:2000px;height:400px"></div>
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
          {"name":"大瑶支行","value":145},
          {"name":"镇头支行","value":123},
          {"name":"古港支行","value":165},
          {"name":"官渡支行","value":122},
          {"name":"淮川支行","value":128},
          {"name":"关口支行","value":150},
          {"name":"集里支行","value":168},
          {"name":"荷花支行","value":56},
          {"name":"许浒支行","value":62},
          {"name":"大围山支行","value":15}
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
            text: '不良贷款占比分析',
            left: '26%',
            show: false
          },
          tooltip: {
            trigger:'item',
            formatter: "{a} <br/>{b}: {c} 万元<br/> ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['大瑶支行','镇头支行','古港支行','官渡支行','淮川支行','关口支行','集里支行','荷花支行','许浒支行','大围山支行']
          },
          series : [
            {
              name:'不良贷款数据',
              type: 'pie',
              radius : '70%',
              center: ['20%', '50%'],
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