<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div ref="myEchart"  style="height: 300px;"/>
</template>

<script type="text/babel">
  import echarts from 'echarts'

  export default {
    components: [ echarts ],
    name: 'DateSelect',
    props: {
      EcharNameList: {
        type: Array
      },
      EchartList:{
        type: Array ,
        default: '',
        required: false
      },
    },
    data() {
      return {
        djNameList:[],
      }
    },
    created() {
      this.initEchartM();
    },
    methods: {
      initEchartM(){
          this.initEhartcs();
      },
      initEhartcs() {
       this.$nextTick(function() {
         echarts.init(this.$refs.myEchart).setOption({
           title: {
             text: '个人客户按年龄分类',
             x: 'left',
             textStyle: {
               fontFamily: 'Microsoft YaHei'
             },
           },
           tooltip: {
             trigger: 'item',
             formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
              //orient: 'vertical',
              left: 'center',
              top: 'bottom',
              data: this.EcharNameList
            },
            series: [
              {
                name: '客户年龄',
                type: 'pie',
                radius: '50%',
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                roseType: 'area',
                data:this.EchartList,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 8,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.3)'
                  }
                },
                // label: {
                //   show: false,
                //   position: 'center'
                // },
                // emphasis: {
                //   label: {
                //     show: true,
                //     fontSize: '30',
                //     fontWeight: 'bold'
                //   }
                // },
                // labelLine: {
                //   show: false
                // },
              }
            ]
        })
       })
      },
    },

  }
</script>
