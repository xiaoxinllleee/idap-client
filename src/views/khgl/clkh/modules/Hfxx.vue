<template>
  <a-card class="card" :bordered="false">
    <a-table size="middle"
             :columns="columns"
             :dataSource="data"
             :pagination="false"
             :bordered="true">
      <span slot="hfxqsm" slot-scope="text, record">
        <j-ellipsis :value="text" :length="15"/>
      </span>
    </a-table>
  </a-card>
</template>

<script>
  import JEllipsis from '../../../../components/jeecg/JEllipsis'

  export default {
    name: 'Hfxx',
    components: { JEllipsis },
    data() {
      return {
        data: [],
        columns: [
          {
            title: '回访日期',
            dataIndex: 'hfrq',
            key: 'hfrq',
            width: '15%',
            align: "center",
          },
          {
            title: '回访人',
            dataIndex: 'hfr',
            key: 'hfr',
            width: '15%',
            align: "center",
          },
          {
            title: '回访方式',
            dataIndex: 'hffs',
            key: 'hffs',
            width: '15%',
            align: "center",
          },
          {
            title: '回访目的',
            dataIndex: 'hfmd',
            key: 'hfmd',
            width: '20%',
            align: "center",
          },
          {
            title: '回访详情说明',
            dataIndex: 'hfxqsm',
            key: 'hfxqsm',
            width: '25%',
            align: "center",
            scopedSlots: { customRender: 'hfxqsm' },
          },
        ],
      }
    }
  }
</script>

<style scoped>

</style>