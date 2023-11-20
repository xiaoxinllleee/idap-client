<template>
  <a-card :bordered="false">
    <a-form>
      <a-row :gutter="24">
        <a-col :md="12">
          <div ref='myEchart1' style="width: 100%; height: 333px"></div>
        </a-col>
        <a-col :md="12">
          <div :style="{ padding: '0 0 32px 32px' }">
            <h4 :style="{ marginBottom: '20px', align: 'center' }">高危预警客户详情</h4>
            <v-chart :forceFit="true" height="333" :data="data">
              <v-tooltip />
              <v-axis />
              <v-legend />
              <v-bar position="x*y" color="type" :adjust="adjust" />
            </v-chart>
          </div>

        </a-col>
      </a-row>
      <a-row>
        <a-col :md="12">
          <div :style="{ padding: '0 0 32px 32px' }">
            <h4 :style="{ marginBottom: '20px' }">每月新增高危客户数</h4>
            <v-chart :force-fit="true" height="333" :data="data1" :scale="scale">
              <v-tooltip/>
              <v-axis/>
              <v-legend/>
              <v-line position="type*y" color="x"/>
              <v-point position="type*y" color="x" :size="4" :v-style="style" :shape="'circle'"/>
            </v-chart>
          </div>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>

<script>
  import echarts from 'echarts'
  import { DataSet } from '@antv/data-set'

  export default {
    name: "DqfxfxtbList",
    data() {
      return {
        mylist:[
          {
            "name": "正常",
            "value": 0
          },
          {
            "name": "关注",
            "value": 0
          },
          {
            "name": "高危",
            "value": 0
          },
        ],
        dataSource: [],
        fields: ['多头申请(一个月内多次)', '多头申请(7天内多次)', '手机异常', '特殊名单核验', '公安负面信息', '失信被执行人', '被执行人'],
        adjust: [{
          type: 'dodge',
          marginRatio: 1 / 32
        }],
        scale: [{
          dataKey: 'x',
          min: 0,
          max: 1
        }],
        style: { stroke: '#fff', lineWidth: 1 },
        dataSource1: [

        ],
        fields1: ['客户数']
      }
    },
    computed: {
      data() {
        const dv = new DataSet.View().source(this.dataSource)
        dv.transform({
          type: 'fold',
          fields: this.fields,
          key: 'x',
          value: 'y'
        })

        // bar 使用不了 - 和 / 所以替换下
        return dv.rows.map(row => {
          row.x = row.x.replace(/[-/]/g, '')
          return row
        })

      },
      data1() {
        const dv = new DataSet.View().source(this.dataSource1)
        dv.transform({
          type: 'fold',
          fields: this.fields1,
          key: 'x',
          value: 'y'
        })

        // bar 使用不了 - 和 / 所以替换下
        return dv.rows.map(row => {
          row.x = row.x.replace(/[-/]/g, '')
          return row
        })

      }
    },
    mounted() {
      this.initChart1()
      this.initChart2()
      this.initChart3()
    },
    methods: {
      initChart1(){
        let myChart = echarts.init(this.$refs.myEchart1);
        myChart.setOption({
          title: {
            show: true,
            text: '新增客户数量',
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
            data: ['正常', '关注','高危']
          },
          series : [
            {
              name:'按客户类型区分',
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
      },
      initChart2() {
        this.dataSource = [
          { type: '命中说明', '多头申请(一个月内多次)': 18, '多头申请(7天内多次)': 28, '手机异常': 39, '特殊名单核验': 81, '公安负面信息': 47, '失信被执行人': 20, '被执行人': 24},
        ]
      },
      initChart3() {
        this.dataSource1 = [
          { type: '2023-01', '客户数': 184,},
          { type: '2023-02', '客户数': 226,},
          { type: '2023-03', '客户数': 212,},
          { type: '2023-04', '客户数': 167,},
          { type: '2023-05', '客户数': 242,},
          { type: '2023-06', '客户数': 176,},
          { type: '2023-07', '客户数': 156,},
        ]
      }
    }
  }
</script>

<style scoped>

</style>