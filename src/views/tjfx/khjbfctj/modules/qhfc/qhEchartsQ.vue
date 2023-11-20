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
      this.initEchartQ();
    },
    methods: {
      initEchartQ() {
        let jd   = "第X季度";
        let year = "XXXX";
        getAction("/khfctj/khfctjQh/QList").then(res=>{
        if (res.success) {
          this.EchartList = res.DataQ;
          this.djNameList = res.djName;
          if (res.MaxQuarter != null) {
            year = res.MaxQuarter.split('-')[0];
            let quarter = res.MaxQuarter.split('-')[1];
            if (quarter=='03') {
              jd = '第一季度';
            } else if (quarter=='06') {
              jd = '第二季度';
            } else if (quarter=='09') {
              jd = '第三季度';
            } else if (quarter=='12') {
              jd = '第四季度';
            }
          }
          this.discription = year+"年"+jd
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