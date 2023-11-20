<template>
  <div :style="{ padding: '0 0 32px 32px' }">
    <h4 :style="{ marginBottom: '20px' }">{{ title }}</h4>
    <v-chart :forceFit="true" :height="height" :data="data">
      <v-tooltip />
      <v-axis />
      <v-legend />
      <v-bar position="x*y" color="type" :adjust="adjust" />
    </v-chart>
  </div>
</template>

<script>
  import { DataSet } from '@antv/data-set'
  import { mapActions, mapGetters } from 'vuex'
  import { getAction } from '@/api/manage'

  export default {
    name: 'BarMultid',
    props: {
      title: {
        type: String,
        default: ''
      },
      jdgmCode: {
        type: String,
        default: '1'
      },
      dataSource:{
        type: Array,
        default: () => [
          { type: '定期', '一月': 18.9, '二月': 28.8, '三月': 39.3, '四月': 81.4, '五月': 47, '六月': 20.3, '七月': 24, '八月': 34.6, '九月': 55.6, '十月': 15.6, '十一月': 75.6, '十二月': 71.6 },
          { type: '活期', '一月': 12.4, '二月': 23.2, '三月': 34.5, '四月': 99.7, '五月': 52.6, '六月': 35.5, '七月': 37.4, '八月': 52.4 , '九月': 25.6, '十月': 35.6, '十一月': 15.6, '十二月': 55.6}
        ]
      },
      fields:{
        type: Array,
        default: () => ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      },
      height: {
        type: Number,
        default: 254
      }
    },
    data() {
      return {
        adjust: [{
          type: 'dodge',
          marginRatio: 1 / 32
        }]
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

      }
    },
    created() {
      this.initDictConfig();
      this.jdgmCode=this.orgCode();
    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo","orgCode"]),

      initDictConfig() {
        getAction("/tjfx/zhckshmx/zhcksjmx/getzhdqhqck",{zzbz:this.jdgmCode}).then(res=>{
          if(res.success){
            this.dataSource =res.result
          }
        });
        getAction("/tjfx/zhckshmx/zhcksjmx/getzhdqhqcktype",null).then(res=>{
          if(res.success){
            this.fields =res.result
          }
        });
      },
    }
  }
</script>

<style scoped>

</style>