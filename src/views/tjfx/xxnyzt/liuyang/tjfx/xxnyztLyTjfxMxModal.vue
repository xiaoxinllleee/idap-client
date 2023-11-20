<template>
  <a-modal
    title="新型农业主体统计分析明细展示"
    :width="1450"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :okButtonProps="{ props: {disabled: true} }"
    :destroyOnClose="true"
    @cancel="close"
    cancelText="关闭"
  >
    <a-table
      ref="table"
      size="middle"
      bordered
      :columns="columns"
      :dataSource="dataSource"
      :pagination="ipagination"
      :loading="loading"
      @change="handleTableChange">
    </a-table>

  </a-modal>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
export default {
  name: 'xxnyztTjfxMxModal',
  mixins:[JeecgListMixin],

  data(){
    return{
      visible:false,
      url: {
        list: '/tjfx/xxnyztTjfx/getTjfxmx'
      },
      confirmLoading: false,
      columns: [
        { align: 'center',title: '主体分类', dataIndex: 'ztfl_dictText', width: '70' },
        { align: 'center',title: '新型主体名称', dataIndex: 'xxztmc', width: '200' },
        { align: 'center',title: '管户人', dataIndex: 'ghzrr_dictText', width: '80' },
        { align: 'center',title: '村组评议完成时间', dataIndex: 'czpywcsj', width: '200' },
        { align: 'center',title: '村组评定等级', dataIndex: 'pdfl_dictText', width: '80' },
        { align: 'center',title: '入户核定完成时间', dataIndex: 'rhhdwcsj', width: '120' },
        { align: 'center',title: '入户核定客户分类', dataIndex: 'zhfl_dictText', width: '80' },
        { align: 'center',title: '有效走访完成时间', dataIndex: 'yxzfwcsj', width: '100' },
        { align: 'center',title: '入户核定授信金额', dataIndex: 'ysxedcj', width: '70' },
        { align: 'center',title: '系统测算额度', dataIndex: 'nsxedck', width: '70' }
      ],
    }
  },
  methods:{
    close() {
      this.visible = false
    },
    init(record){
      if (record.tjfx2List){
        this.url.list = record.tjfx2List;
      }
      this.queryParam = record;
      this.ipagination.currentPage = 1
      this.loadData(1)
      this.visible = true
    }
  }
}
</script>

<style scoped>

</style>