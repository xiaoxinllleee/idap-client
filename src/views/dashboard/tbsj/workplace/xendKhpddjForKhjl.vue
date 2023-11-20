<template>
  <div ref='myEChartXendKhjl' style="height: 290px"></div>
</template>

<script type="text/babel">
  import echarts from 'echarts'
  import { getAction } from '@/api/manage'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    components: [ echarts ],
    props: {
      yggh: {
        type: String,
        default: '',
      }
    },
    data() {
      return {
        EchartList: [
          {value: 0, name: '特级'},
          {value: 0, name: '优秀'},
          {value: 0, name: '较好'},
          {value: 0, name: '一般'},
          {value: 0, name: '级外'},
        ],
        url: {
          list: "/workplace/echartsByXendForKhjl",
        },
      }
    },
    created() {
      this.initEchart();
    },
    methods: {
      initEchart() {
        var params = this.yggh;
        console.log("小额农贷饼状图员工工号："+params);
        getAction(this.url.list, {yggh: params}).then((res)=>{
          if (res.success) {
            if (res.result.length > 0) {
              this.EchartList = res.result;
            }
            if (this.$refs.myEChartXendKhjl) {
              this.initEhartcs();
            }
          }
        });
      },
      // 图表初始化数据
      initEhartcs(){
        echarts.init(this.$refs.myEChartXendKhjl).setOption({
          title: {
            show: true,
            text: '小额农贷 / 授信等级',
            x: 'right',
            textStyle: {
              fontFamily: 'Times New Roman'
            },
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} 人({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['特级','优秀','较好','一般','级外'],
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
              },
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