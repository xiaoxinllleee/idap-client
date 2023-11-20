<template>
  <!--走访进度-用信额度-->
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
          {"name":"珠联村","value":233},
          {"name":"七家坪村","value":155},
          {"name":"芙蓉村","value":165},
          {"name":"中新村","value":233},
          {"name":"托下村","value":105},
          {"name":"合金村","value":75},
          {"name":"九江村","value":99},
          {"name":"新福村","value":165},
          {"name":"紫杨村","value":199},
          {"name":"卓江村","value":201},
          {"name":"向阳村","value":99},
          {"name":"白石村","value":165},
          {"name":"茶恩村","value":199},
          {"name":"石龙村","value":201}
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
            let obj = this.$refs.myEchart;
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
            show: true,
            text: '用信额度',
            x: 'left',
            textStyle: {
              fontFamily: 'Times New Roman'
            },
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b} {a}: <br/> {c}万元 ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'right',
            data:['珠联村','七家坪村','芙蓉村','中新村','托下村','合金村','九江村','新福村','紫杨村','卓江村','向阳村','白石村','茶恩村','石龙村'],
          },
          series: [
            {
              name:'用信额度',
              type:'pie',
              radius: '70%',
              center: ['50%', '50%'],
              avoidLabelOverlap: true,
              roseType: 'angle',
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