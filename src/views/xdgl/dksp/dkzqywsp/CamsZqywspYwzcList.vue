<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='借款人'>
              <a-input placeholder='请输入借款人' v-model='queryParam.khmc'></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='贷款账号'>
              <a-input placeholder='请输入贷款账号' v-model='queryParam.dkzh'></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='证件号码'>
              <a-input placeholder='请输入证件号码' v-model='queryParam.zjhm'></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <span style='float: left;overflow: hidden;' class='table-page-search-submitButtons'>
              <a-button type='primary' @click='searchQuery' icon='search'>查询</a-button>
              <a-button @click='searchReset' icon='reload' style='margin-left: 8px'>重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class='table-operator'>
      <a-button @click='handleAdd' type='primary' icon='plus' v-has="'dkzqywsp:add'">新增审批</a-button>
      <a-button icon='download' @click="handleExportXls('贷款展期业务审批信息表')" v-has="'dkzqywsp:export'">导出
      </a-button>
      <a-dropdown v-if='selectedRowKeys.length > 0'>
        <a-menu slot='overlay'>
          <a-menu-item key='1' @click='batchDel' v-has="'dkzqywsp:delete'">
            <a-icon type='delete' />
            删除
          </a-menu-item>
        </a-menu>
        <a-button style='margin-left: 8px'> 批量操作
          <a-icon type='down' />
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class='ant-alert ant-alert-info' style='margin-bottom: 16px;'>
        <i class='anticon anticon-info-circle ant-alert-icon'></i> 已选择 <a
        style='font-weight: 600'>{{ selectedRowKeys.length }}</a>项
        <a style='margin-left: 24px' @click='onClearSelected'>清空</a>
      </div>

      <a-table
        ref='table'
        size='middle'
        bordered
        :rowKey='rowKey'
        :columns='columns'
        :dataSource='dataSource'
        :pagination='ipagination'
        :loading='loading'
        :scroll="{x : 'max-content'}"
        :rowSelection='{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}'
        @change='handleTableChange'>

        <span slot='action' slot-scope='text, record'>
          <a v-if="record.result == '0' || record.result == '3' ||  !record.processId" @click='handleEdit(record)' v-has="'dkzqywsp:edit'">编辑</a>
           <a v-else @click="handleView(record)">查看</a>
          <a-divider type='vertical' v-if='record.processId && record.procInstId' />
          <a v-if='record.processId && record.procInstId' @click='historyDetail(record)'
             v-has="'dkzqywsp:spls'">审批历史</a>
          <a-divider type='vertical' v-if='record.processId && record.procInstId' />
          <a v-if="record.processId && record.procInstId && record.result == '2'" @click='historyDownload(record)'
             v-has="'dkzqywsp:init'">展期业务审批表</a>
          <a-divider type='vertical' />
          <a-popconfirm title='确定删除吗?' @confirm='() => handleDelete(record.id)'>
            <a v-has="'dkzqywsp:delete'">删除</a>
          </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->
    <cams-zqywsp-ywzc-modal ref='modal' @close='close'></cams-zqywsp-ywzc-modal>
    <historic-detail v-if='showHistory' @close='showHistory=false' :procInstId='procInstId'></historic-detail>
    <!-- 表单区域 -->
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import historicDetail from '@/views/activiti/historic-detail/historicDetail'
import { downFile } from '@api/manage'
import CamsZqywspYwzcModal from '@views/xdgl/dksp/dkzqywsp/modules/CamsZqywspYwzcModal'
import store from '@views/xdgl/dksp/dkspkhzc/modules/DkspKhzcModal'

export default {
  name: 'VCamsZqywspYwzcList',
  mixins: [JeecgListMixin],
  components: {  historicDetail ,CamsZqywspYwzcModal},
  data() {
    return {
      procInstId: '',
      showHistory: false,
      description: '贷款展期业务审批信息表管理页面',
      // 表头
      columns: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '所属机构',
          align: 'center',
          dataIndex: 'sszh_dictText'
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
          dataIndex: 'dkzl_dictText'
        },
        {
          title: '原合同编号',
          align: 'center',
          dataIndex: 'yhtbh'
        },
        {
          title: '原贷款日期',
          align: 'center',
          dataIndex: 'ydkrq'
        },
        {
          title: '原贷款金额(万元)',
          align: 'center',
          dataIndex: 'ydkje'
        },
        {
          title: '原到期日期',
          align: 'center',
          dataIndex: 'ydqrq'
        },
        {
          title: '备注',
          align: 'center',
          dataIndex: 'bz'
        },
        {
          title: '审批状态',
          align: 'center',
          dataIndex: 'result_dictText'
        },
        {
          title: '提交人',
          align: 'center',
          dataIndex: 'createBy_dictText'
        },
        {
          title: '提交时间',
          align: 'center',
          dataIndex: 'createTime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          fixed: 'right',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/dkzqywsp/vCamsZqywspYwzc/list',
        delete: '/dkzqywsp/camsZqywspYwzc/delete',
        deleteBatch: '/dkzqywsp/camsZqywspYwzc/deleteBatch',
        exportXlsUrl: '/dkzqywsp/camsZqywspYwzc/exportXls'
      }
    }
  },
  created() {
    this.searchReset()
  },
  methods: {
    handleAdd() {
      this.$refs.modal.visible = true
      this.$refs.modal.add()
    },
    handleView(record){
      this.$refs.modal.title='查看详情'
      this.$refs.modal.visible = true
      this.$refs.modal.view(record)
    },
    handleEdit(record) {
      this.$refs.modal.title='编辑'
      this.$refs.modal.visible = true
      this.$refs.modal.edit(record)
    },
    close() {
      this.searchReset()
    },
    historyDetail(v) {
      if (!v.procInstId) {
        this.$Message.error('流程实例ID不存在')
        return
      }
      this.procInstId = v.procInstId
      this.showHistory = true
    },
    historyDownload(row) {
      this.loading = true
      let fileName = "贷款展期业务审批表"
      let param = {...row};
      console.log("导出参数",param)
      downFile('/dkzqywsp/camsZqywspYwzc/download',param).then((data)=>{
        if (!data) {
          this.$message.warning("文件下载失败")
          return
        }
        var blob = new Blob([data]);
        if('msSaveOrOpenBlob' in navigator){
          window.navigator.msSaveOrOpenBlob(blob, fileName+'.pdf');
          return;
        }
        var eleLink = document.createElement('a');
        eleLink.download = fileName+'.pdf';
        eleLink.style.display = 'none'
        eleLink.href = URL.createObjectURL(blob);
        document.body.appendChild(eleLink);
        eleLink.click();
        document.body.removeChild(eleLink);
      }).finally(()=>{
        this.loading = false
      })
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>