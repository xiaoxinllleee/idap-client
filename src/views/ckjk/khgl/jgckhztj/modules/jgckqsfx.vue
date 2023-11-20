<template>
  <a-modal
    :width="1000"
    :visible="visible"
    :destroyOnClose="true"
    @cancel="handleCancel"
    cancelText="关闭">
    <line-chart-multid :fields="visitFields" title="机构趋势分析" :dataSource="dataRows"></line-chart-multid>
  </a-modal>

</template>

<script>
  import { DataSet } from '@antv/data-set'
  import { getAction } from '@/api/manage'
  import { mapActions, mapGetters } from 'vuex'
  import LineChartMultid from '@/components/chart/LineChartMultid'
  import pick from 'lodash.pick'
  import moment from 'moment'
  export default {
    components: {
      LineChartMultid
    },
    props: {
      fields: {
        type: Array,
        default: () => ['存款余额','存款月日平']
      },
      height: {
        type: Number,
        default: 254
      }
    },
    data() {
      return {
        title:'机构趋势分析',
        name: 'jgckqsfx',
        visible: false,
        dataRows:[],
        visitFields:['存款余额','存款月日平'],
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
        if (this.dataRows.length) {
          const dv = new DataSet.View().source(this.dataRows)
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
    created() {
      this.init();
    },
    methods: {
      handleCancel () {
        this.close()
      },
      init(){
        if (this.dataRows.length) {
          this.$nextTick(() => {
            const dv = new DataSet.View().source(this.dataRows)
            dv.transform({
              type: 'fold',
              fields: this.fields,
              key: 'x',
              value: 'y'
            })
            return dv.rows
          });
        }
        this.$forceUpdate();
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
    }
  }
</script>

<style scoped>

</style>