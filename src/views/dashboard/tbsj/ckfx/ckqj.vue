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
            "name": "1万以下",
            "value": 0
          },
          {
            "name": "1万元至5万元",
            "value": 0
          },
          {
            "name": "5万元至10万元",
            "value": 0
          },
          {
            "name": "10万元至50万元",
            "value": 0
          },
          {
            "name": "50万元以上",
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
      // 图表初始化数据
      initDictConfig() {
        getAction("/tjfx/zhckshmx/zhcksjmx/getzhdhckqj",{zzbz:this.jdgmCode}).then(res=>{
          if (res.success) {
            if (res.result.length > 0) {
              this.mylist = res.result;
            }
            if (this.$refs.myEchart) {
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
            text: '单户存款余额区间分析',
            x: 'left',
            textStyle: {
              fontFamily: 'Times New Roman'
            },
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: "vertical", // 'horizontal',
            // bottom: 20,
            x: "right",
            data:['1万以下','1万元至5万元','5万元至10万元','10万元至50万元','50万元以上']
          },
          series: [
            {
              name:'户数分布',
              type:'pie',
              radius: '60%',
              center: ['50%', '50%'],
              avoidLabelOverlap: false,
              data:this.mylist,
              itemStyle: {
                emphasis: {
                  shadowBlur: 8,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.3)'
                }
              },
              // label: {
              //   normal: {
              //     show: false,
              //     position: 'outside'
              //   },
              //   emphasis: {
              //     show: true,
              //     textStyle: {
              //       fontSize: '20',
              //       fontWeight: 'bold'
              //     }
              //   }
              // },
              // labelLine: {
              //   normal: {
              //     show: false
              //   }
              // },
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