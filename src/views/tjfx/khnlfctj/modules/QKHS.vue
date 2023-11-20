<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <a-card :bordered="true">
    <div id="main" style="width: 100%; height: 400px;"></div>
  </a-card>
</template>
<script>
  import echarts from 'echarts'
  import { getAction,putAction,httpAction } from '@/api/manage'

  export default {
    name: '',
    data () {
      return {
        charts: {},
        qhkhs: [1, 2, 3, 4, 5, 6, 7, 8],
      }
    },
    //调用
    mounted(){
      this.drawPie('main');
      // window.onresize = function() {
      //   this.charts.resize();
      // },
      // this.$nextTick(function() {
      //   this.drawPie('main');
      // })
    },
    created(){
      this.updateV()
    },
    props: ['msg'],
    methods:{
      updateV(){
        putAction("/tjfx.khnlfctj/tjfxkhnlfctj/extract").then((res) => {
          this.charts = echarts.init(document.getElementById('main'))
          this.charts.setOption({
            title: {
              text: '客户年龄分层统计（全行）',
              x: 'left',
              textStyle: {
                fontFamily: 'Times New Roman'
              },
            },
            color: ['#1890FF'],
            tooltip: {},
            legend: {
              orient: "vertical",
              x: "right",
              data:['客户数']
            },
            yAxis: {},
            xAxis: {
              data: ["年龄不详", "18岁以下", "19-26岁", "27-30岁", "31-40岁", "41-55岁", "56-65岁", "66岁以上"]
            },
            series: [
              {
                name: '客户数',
                type: 'bar',
                data: [
                  res.result[0].nlbxkhs,
                  res.result[0].sbsyxkhs,
                  res.result[0].sjzel,
                  res.result[0].eqzsh,
                  res.result[0].syzsh,
                  res.result[0].syzww,
                  res.result[0].wlzlw,
                  res.result[0].llsys
                ],
                showBackground: true,
                backgroundStyle: {
                  color: 'rgba(220, 220, 220, 0.8)'
                },
              },
            ]
          })
        })
      },

      drawPie(id){
        this.charts = echarts.init(document.getElementById(id))
        this.charts.setOption({
          title: {
            text: '客户年龄分层统计（全行）',
            x: 'left',
            textStyle: {
              fontFamily: 'Times New Roman'
            },
          },
          color: ['#1890FF'],
          tooltip: {},
          legend: {
            orient: "vertical",
            x: "right",
            data:['客户数']
          },
          yAxis: {},
          xAxis: {
            data: ["年龄不详","18岁以下","19-26岁","27-30岁","31-40岁","41-55岁","56-65岁","66岁以上"]
          },
          series: [
            {
              name: '客户数',
              type: 'bar',
              data: [],
            }
          ],
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          },
        })
      },
    },
  }
</script>
<style scoped>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
