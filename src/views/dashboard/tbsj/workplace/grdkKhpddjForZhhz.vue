<template>
  <div ref='myEchartGrdkZhhz' style="height: 280px"></div>
</template>

<script type="text/babel">
  import echarts from 'echarts'
  import { getAction } from '@/api/manage'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    components: [ echarts ],
    props: {
      zzbz: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        EchartList: [
          {value: 0, name: 'AAAAA'},
          {value: 0, name: 'AAAA'},
          {value: 0, name: 'AAA'},
          {value: 0, name: 'AA'},
          {value: 0, name: 'A'},
        ],
        url: {
          list: "/workplace/echartsByGrdkForZhhz",
        },
      }
    },
    created() {
      this.initEchartM();
    },
    methods: {
      initEchartM() {
        var params = this.zzbz;
        console.log("个人贷款饼状图组织标识："+params);
        getAction(this.url.list, {zzbz: params}).then((res)=>{
          if (res.success) {
            if (res.result.length > 0) {
              this.EchartList = res.result;
            }
            if (this.$refs.myEchartGrdkZhhz) {
              this.initEhartcs();
            }
          }
        });
      },
      // 图表初始化数据
      initEhartcs(){
        echarts.init(this.$refs.myEchartGrdkZhhz).setOption({
          title: {
            show: true,
            text: "个人贷款 / 授信等级",
            x: 'right',
            textStyle: {
              fontFamily: 'Times New Roman'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} 人({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['AAAAA','AAAA','AAA','AA','A'],
          },
          series : [
            {
              name:'授信等级',
              type: 'pie',
              radius : [10, 100],
              center: ['50%', '45%'],
              avoidLabelOverlap: false,
              roseType: 'area',
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