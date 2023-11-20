<template>
  <!--存贷款业务分析-贷款占比-->
  <div ref='myEchart' style="width: 100%; height:400px"></div>
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
          {"name":"珠联村","value":260},
          {"name":"七家坪村","value":273},
          {"name":"芙蓉村","value":223},
          {"name":"中新村","value":374},
          {"name":"托下村","value":158},
          {"name":"合金村","value":178},
          {"name":"九江村","value":459},
          {"name":"新福村","value":304},
          {"name":"紫杨村","value":150},
          {"name":"卓江村","value":148},
          {"name":"向阳村","value":363},
          {"name":"白石村","value":89},
          {"name":"茶恩村","value":394},
          {"name":"石龙村","value":303}
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
            text: '贷款占比',
            x: 'right',
            textStyle: {
              fontFamily: 'Times New Roman'
            },
          },
          tooltip: {
            trigger:'item',
            formatter: "{b}{a} :<br/> {c} 万元 ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data:['珠联村','七家坪村','芙蓉村','中新村','托下村','合金村','九江村','新福村','紫杨村','卓江村','向阳村','白石村','茶恩村','石龙村'],
          },
          series : [
            {
              name:'贷款数据',
              type: 'pie',
              radius : '70%',
              center: ['50%', '50%'],
              avoidLabelOverlap: true,
              roseType: 'angle',
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