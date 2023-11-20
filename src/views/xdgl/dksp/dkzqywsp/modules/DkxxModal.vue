<template>
  <a-modal
    title='贷款详情'
    :width='1200'
    :visible='visible'
    :confirmLoading='confirmLoading'
    @ok='handleOk'
    @cancel='handleCancel'
    cancelText='关闭'>

    <a-spin :spinning='confirmLoading'>
      <a-table
        ref='table'
        size='middle'
        bordered
        :rowKey='rowKey'
        :columns='columns'
        :dataSource='dataSource'
        :loading='loading'
        :scroll="{x : 'max-content'}"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange,type:'radio'}">
      </a-table>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'

export default {
  name: 'CamsZqywspYwzcEditModal',
  mixins: [JeecgListMixin],
  data() {
    return {
      title: '贷款详情',
      visible: false,
      confirmLoading: false,
      validatorRules: {},
      model: {},
      dataSource:[],
      columns:[
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '借款人',
          align: 'center',
          dataIndex: 'khmc'
        },
        {
          title: '证件号码',
          align: 'center',
          dataIndex: 'zjhm'
        },
        {
          title: '贷款账号',
          align: 'center',
          dataIndex: 'dkzh'
        },
        {
          title: '贷款种类',
          align: 'center',
          dataIndex: 'dkzl'
        },
        {
          title: '合同编号',
          align: 'center',
          dataIndex: 'yhtbh'
        },
        {
          title: '贷款日期',
          align: 'center',
          dataIndex: 'ydkrq'
        },
        {
          title: '贷款金额',
          align: 'center',
          dataIndex: 'ydkje'
        },
        {
          title: '到期日期',
          align: 'center',
          dataIndex: 'ydqrq'
        },
      ],
      loading:false,
    }
  },
  created() {
  },
  methods: {
    init(record) {
      this.dataSource=record
    },
    close() {
      this.selectionRows=[]
      this.selectedRowKeys=[]
      this.visible = false
    },
    handleCancel() {
      this.close()
    },
    handleOk() {
      if (this.selectionRows==null || this.selectionRows==undefined || this.selectionRows.length==0){
        this.$message.error("请选择一个贷款信息！！")
      }else {
        this.$emit('close', this.selectionRows[0])
        this.close()
      }
    },
  }
}
</script>

<style lang='less' scoped>

</style>