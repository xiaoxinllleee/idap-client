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
            "name": "年龄不详",
            "value": 0
          },
          {
            "name": "18岁以下",
            "value": 0
          },
          {
            "name": "19-26",
            "value": 0
          },
          {
            "name": "27-30",
            "value": 0
          },
          {
            "name": "31-40",
            "value": 0
          },
          {
            "name": "41-55",
            "value": 0
          },
          {
            "name": "56-65",
            "value": 0
          },
          {
            "name": "66岁以上",
            "value": 0
          },
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
        getAction("/tjfx/zhckshmx/zhcksjmx/getzhanlqjck",{zzbz:this.jdgmCode}).then(res=>{
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
      // 图表初始化数据
      initChart(){
        let myChart = echarts.init(this.$refs.myEchart);
        myChart.setOption({
          title: {
            show: true,
            text: '存款余额按年龄分布',
            x: 'left',
            textStyle: {
              fontFamily: 'Times New Roman'
            },
          },
          tooltip: {
            trigger:'item',
            formatter: "{a} <br/>{b}: {c} <br/> ({d}%)"
          },
          legend: {
            orient: "vertical", // 'horizontal',
            // bottom: 20,
            x: "right",
            data: ['年龄不详', '18岁以下','19-26','27-30','31-40','41-55','56-65','66岁以上']
          },
          series : [
            {
              name:'按余额分布',
              type: 'pie',
              radius : '60%',
              center: ['50%', '50%'],
              // minAngle: 10,
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
   /* mounted () {
      this.initDictConfig();
      let obj = this.$refs.myEchart;
      if(obj){
        this.initChart();
      }
    }*/
  }


</script>
<!-- 引入 vintage 主题 -->

<style lang="less" type="text/less" rel="stylesheet/less" scoped>

</style>