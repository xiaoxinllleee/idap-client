<template>
  <div style="height: 300px">
    <h4 :style="{ marginBottom: '20px' }">{{ title }}</h4>
    <v-chart :force-fit="true" :height="height" :data="data" :scale="scale">
      <v-tooltip/>
      <v-axis/>
      <v-legend/>
      <v-line position="type*y" color="x"/>
      <v-point position="type*y" color="x" :size="4" :v-style="style" :shape="'circle'"/>
    </v-chart>
  </div>
</template>

<script>
  import { DataSet } from '@antv/data-set'
  import { getAction } from '@/api/manage'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'LineChartJynckqsfx',
    props: {
      title: {
        type: String,
        default: ''
      },
      jdgmCode: {
        type: String,
        default: '1'
      },
      jynckqssj:[],
      fields: {
        type: Array,
        default: () => ['余额', '月日平','年日平']
      },
      height: {
        type: Number,
        default: 254
      }
    },
    data() {
      return {
        scale: [{
          dataKey: 'x',
          min: 0,
          max: 1
        }],
        style: { stroke: '#fff', lineWidth: 1 },
        dataSource: {
          type: Array,
          default: () => [ ]
        },
      }
    },
    computed: {
      data() {
        if (this.dataSource.length) {
          const dv = new DataSet.View().source(this.dataSource)
          dv.transform({
            type: 'fold',
            fields: this.fields,
            key: 'x',
            value: 'y'
          })
          return dv.rows
        }
      }
    },
    /*created() {
      this.initDictConfig();
      this.jdgmCode=this.orgCode();

    },*/
    methods: {
      /*...mapGetters(["nickname", "avatar","userInfo","orgCode"]),
      initDictConfig() {
        getAction("/tjfx/zhckshmx/zhcksjmx/getzhjynck",{zzbz:this.jdgmCode}).then(res=>{
          if(res.success){
             this.dataSource =res.result
          }
        });
      },*/
    }
  }
</script>

<style scoped>

</style>