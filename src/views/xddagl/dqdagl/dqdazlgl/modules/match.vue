<template>
  <a-modal
    :title="title"
    width="75%"
    :visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel">
    <!-- table区域-begin -->
    <div>
      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :row-selection="rowSelection"
       >
      </a-table>
    </div>
    <!-- table区域-end -->
  </a-modal>
</template>

<script>
  import {putAction} from '@/api/manage'

  export default {
    name: "DqdazlglList",
    components: {
    },
    data () {
      return {
        confirmLoading:false,
        visible:false,
        obj:{},
        /* table加载状态 */
        loading:false,
        /* 数据源 */
        dataSource:[],
        ipagination:{
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['10', '20', '30'],
          showTotal: (total, range) => {
            return range[0] + "-" + range[1] + " 共" + total + "条"
          },
          showQuickJumper: true,
          showSizeChanger: true,
          total: 0
        },
        title: '匹配',
        // 表头
        columns: [
		   {
        title: '客户姓名',
        align:"center",
        dataIndex: 'khmc',
        width: 100
       },
      {
        title: '证件号码',
        align:"center",
        dataIndex: 'zjhm',
        width: 100
      },
      {
        title: '合同号',
        align:"center",
        dataIndex: 'hth',
        width: 100
      },
      {
        title: '机构代码',
        align:"center",
        dataIndex: 'jgdm_dictText',
        width: 100
      },
      {
        title: '签约日期',
        align:"center",
        dataIndex: 'qyrq',
        width: 100
      }
        ],
		url: {
          match:"dqdazlgl/dqdazlgl/match",
         matchSave:"dqdazlgl/dqdazlgl/matchSave",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    },
    rowSelection () {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          this.obj['hth']=selectedRows[0].hth;
          console.log(this.obj)
        },
        getCheckboxProps: record => ({
          props: {
          }
        }),
        type: 'radio'
      }
    }
  },
    methods: {
      init(record){
        putAction(this.url.match, record).then((res) => {
          if (res.success) {
            this.visible=true
            this.dataSource=res.result
            this.obj['id']=record.id
          }else{
            this.$message.warning(res.message,5)
          }
        })
      },
      handleCancel () {
        this.visible = false
        this.obj={}
        this.dataSource=[]
      },
      handleOk(){
        putAction(this.url.matchSave, this.obj).then((res) => {
          if (res.success) {
            this.$message.success(res.message)
            this.handleCancel()
          }else{
            this.$message.warning(res.message,5)
          }
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>