<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='组织标志'>
              <j-tree-select placeholder='请选择所属组织'
                             v-model='queryParam.zzbz'
                             dict='hr_bas_organization,zzjc,zzbz'
                             pidField='sjzzbz'
                             treeNodeFilterProp='title'
                             :sszh='true'
                             :showSearch='true'
                             :treeDefaultExpandAll='true'
                             :filterTreeNode='true' />
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='统计日期'>
              <a-range-picker @change='onChangeBeginday' v-model='queryParam.tjrq'
                              :default-value="[undefined, moment(new Date(), 'YYYY/MM/DD')]"></a-range-picker>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='分配状态'>
              <j-dict-select-tag placeholder='请选择分配状态' v-model='queryParam.fpzt'
                                 dictCode='fpzt'></j-dict-select-tag>
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
      <a-button icon='download' :loading='exportLoading' @click="handleExportXls('业务量分配')">导出</a-button>
      <!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
      <!--        <a-button icon="import">导入</a-button>-->
      <!--      </a-upload>-->
      <a-dropdown v-if='selectedRowKeys.length > 0'>
        <a-menu slot='overlay'>
          <a-menu-item key='1' @click='batchDel'>
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

      <a-table
        ref='table'
        size='middle'
        bordered
        :rowKey='rowKey'
        :columns='columns'
        :dataSource='dataSource'
        :pagination='ipagination'
        :loading='loading'
        @change='handleTableChange'>

        <span slot='action' slot-scope='text, record'>
          <a @click="handleEdit('1','分配',record)" v-if="record.fpzt=='0'">分配</a>
          <a-divider type='vertical' v-if="record.fpzt=='0'" />
          <a @click="handleEdit('2','按月分配全行',record)" v-if="record.fpzt=='0'">按月分配全行</a>
          <a-divider type='vertical' v-if="record.fpzt=='0'" />
          <a @click="handleEdit('3','按月分配支行',record)" v-if="record.fpzt=='0'">按月分配支行</a>
          <a-divider type='vertical' v-if="record.fpzt=='0'" />
          <a @click='handleReturn(record)' v-if="record.fpzt=='1'">撤销分配</a>
          <a-divider type='vertical' v-if="record.fpzt=='1'" />
          <a-dropdown>
            <a class='ant-dropdown-link'>更多 <a-icon type='down' /></a>
            <a-menu slot='overlay'>
              <a-menu-item>
                <a-popconfirm title='确定删除吗?' @confirm='() => handleDelete(record.id)'>
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <ywlfpday-modal ref='modalForm' @ok='modalFormOk'></ywlfpday-modal>
  </a-card>
</template>

<script>
import YwlfpdayModal from './modules/YwlfpdayModal'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { getAction, postAction } from '../../../../api/manage'
import { filterObj } from '../../../../utils/util'
import moment from 'moment'
import { syncGwxxZzbz } from '@api/api'

export default {
  name: 'YwlfpdayList',
  mixins: [JeecgListMixin],
  components: {
    YwlfpdayModal, JTreeSelect
  },
  data() {
    return {
      description: '业务量分配管理页面',
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
          title: '统计日期',
          align: 'center',
          dataIndex: 'tjrq'
        },
        {
          title: '组织标志',
          align: 'center',
          dataIndex: 'zzbz'
        },
        {
          title: '组织名称',
          align: 'center',
          dataIndex: 'zzbz_dictText'
        },
        {
          title: '待分配ATM业务笔数',
          align: 'center',
          dataIndex: 'atmywbs'
        },
        {
          title: '待分配ATM现金流量',
          align: 'center',
          dataIndex: 'atmxjll'
        },
        {
          title: '待分配其它业务笔数',
          align: 'center',
          dataIndex: 'qtywbs'
        },
        {
          title: '待分配其它现金流量',
          align: 'center',
          dataIndex: 'qtxjll'
        },
        {
          title: '分配状态',
          align: 'center',
          dataIndex: 'fpzt_dictText'
        },
        {
          title: '录入时间',
          align: 'center',
          dataIndex: 'lrsj'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/ywlfpday/ywlfpday/list',
        delete: '/ywlfpday/ywlfpday/delete',
        deleteBatch: '/ywlfpday/ywlfpday/deleteBatch',
        exportXlsUrl: 'ywlfpday/ywlfpday/exportXls',
        importExcelUrl: 'ywlfpday/ywlfpday/importExcel',
        rollback: '/ywlfpday/ywlfpday/rollback',
        getFpxxByMonth: '/ywlfpday/ywlfpday/getFpxxByMonth'
      }
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  created() {
    this.queryParam.tjrq_end = moment(new Date()).format('YYYY-MM-DD')
  },
  methods: {
    moment,
    onChangeBeginday: function(value, dateString) {
      let tjrqString = dateString
      this.queryParam.tjrq_begin = tjrqString[0]
      this.queryParam.tjrq_end = tjrqString[1]
    },
    getQueryParams() {
      var param = Object.assign({}, this.queryParam, this.isorter)
      param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      delete param.tjrq
      return filterObj(param)
    },
    handleEdit: function(lx, title, record) {
      if (lx != '1') {
        getAction(this.url.getFpxxByMonth, { zzbz: record.zzbz, tjrq: record.tjrq }).then(res => {
          if (res.success) {
            this.$refs.modalForm.edit(lx, res.result)
          }
        })
      }else{
        this.$refs.modalForm.edit(lx, record)
      }
      this.$refs.modalForm.title = '业务量' + title
      this.$refs.modalForm.disableSubmit = false
    },
    handleReturn(row) {
      let that = this;
      that.$confirm({
        title:'确认操作',
        okText: '确定',
        cancelText: '取消',
        content: '确定撤回该分配信息吗?',
        onOk: () => {
          this.loading=true
          postAction(this.url.rollback, { fpid: row.fpid,zzbz:row.zzbz,fprq:row.tjrq}).then(res => {
            if (res.success) {
              this.$message.success('撤销成功！！')
              this.loadData(1)
            }
          }).finally(()=>{
            this.loading=false
          })
        },
        onCancel: e => {
          if (e.triggerCancel) {
            // 点击x或者按键盘esc关闭的弹窗
            return
          }
          // 函数体 方法
          e()
        }
      })
    }
    // init() {
    //   if (this.queryParam.tjrq === undefined || this.queryParam.tjrq === "") {
    //     this.$message.warning("统计日期不能为空！")
    //     return false
    //   }
    //   let arr=this.queryParam.tjrqString.split(',')
    //   let para={
    //     tjrqBegin:arr[0],
    //     tjrqEnd:arr[1]
    //   }
    //   this.loading=true;
    //   postAction(this.url.init,para).then((response) => {
    //     if (response.success) {
    //       this.$message.success('提取成功！')
    //       this.loadData(1);
    //     } else {
    //       this.$message.warning('提取失败！')
    //     }
    //   }).catch((error) => {
    //     this.$message.error('提取失败！')
    //   }).finally(()=>{
    //     this.loading=false;
    //   })
    // },
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>