<template>
  <!--走访进度-建档覆盖率-->
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
          {"name":"大瑶支行","value":195},
          {"name":"镇头支行","value":183},
          {"name":"古港支行","value":261},
          {"name":"官渡支行","value":155},
          {"name":"淮川支行","value":106},
          {"name":"关口支行","value":105},
          {"name":"集里支行","value":54},
          {"name":"荷花支行","value":44},
          {"name":"许浒支行","value":62},
          {"name":"大围山支行","value":260}
        ]
      }
    },
    created() {
      this.initDictConfig();
      this.jdgmCode=this.orgCode();
    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo","orgCode"]),
      // 图表初始化数据
      initDictConfig() {
        getAction("/tjfx/zhckshmx/zhcksjmx/getzhdhckqj",{zzbz:this.jdgmCode}).then(res=>{
          if(res.success){
            //this.mylist = res.result
            let obj     = this.$refs.myEchart;
            if(obj){
              this.initChart();
            }
          }
        });
      },
      initChart(){
        let myChart = echarts.init(this.$refs.myEchart);
        myChart.setOption({
          title: {
            text: '建档覆盖率',
            left: '0%',
            show: false
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} 户({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data:['大瑶支行','镇头支行','古港支行','官渡支行','淮川支行','关口支行','集里支行','荷花支行','许浒支行','大围山支行'],
          },
          series: [
            {
              name:'已建档户数',
              type:'pie',
              radius: '70%',
              center: ['20%', '50%'],
              avoidLabelOverlap: false,
              data:this.mylist,
              itemStyle: {
                emphasis: {
                  shadowBlur: 8,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.3)'
                }
              }
              /*label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },*/
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