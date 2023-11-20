<template>
  <div ref='myEchart' style="height: 300px;"></div>
</template>

<script type="text/babel">
  import echarts from 'echarts'
  import { getAction } from '@/api/manage'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    components: [ echarts ],
    props: {
      jdgmCode: {
        type: String,
        default: '1'
      },
    },
    data() {
      return {
        EchartList: [],
        djNameList: [],
        discription: ''
      }
    },
    created() {
      this.initEchartM();
    },
    methods: {
      initEchartM() {
        let year  = "XXXX";
        let month = "XX";
        getAction("/khfctj/khfctjQh/MList").then(res=>{
        if (res.success) {
          this.EchartList = res.DataM;
          this.djNameList = res.djName;
          if (res.MaxMonth != null) {
            year  = res.MaxMonth.split('-')[0];
            month = res.MaxMonth.split('-')[1];
          }
          this.discription = year+"年"+month+"月";
          if(this.$refs.myEchart){
            this.initEhartcs();
          }
        }
        });
      },
      // 图表初始化数据
      initEhartcs(){
        echarts.init(this.$refs.myEchart).setOption({
          title: {
            text: this.discription,
            x: 'right',
            textStyle: {
              fontFamily: 'Microsoft YaHei'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} 人({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: this.djNameList
          },
          series : [
            {
              name:'等级分层',
              type: 'pie',
              radius : '70%',
              center: ['50%', '50%'],
              avoidLabelOverlap: false,
              //roseType: 'angle',
              data: this.EchartList,
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