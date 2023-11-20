<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='统计日期'>
              <a-date-picker v-model='queryParam.tjrq' placeholder='请选择统计日期' style='width: 100%;'
                             :defaultValue='defaultMonthOpera' :format='monthFormat' />
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24' v-if="qybm!='425'">
            <a-form-item label='所属机构'>
              <j-tree-select placeholder='请选择所属机构' v-model='queryParam.zzbz'
                             dict='HR_BAS_ORGANIZATION,ZZJC,ZZBZ' pidField='sjzzbz' treeNodeFilterProp='title'
                             show-search :showSearch='true' :treeDefaultExpandAll='true' :filterTreeNode='true'
                             :isAll='false' />
            </a-form-item>
          </a-col>
          <template v-if='toggleSearchStatus'>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='员工工号'>
                <a-input placeholder='请输入员工工号' v-model='queryParam.yggh'></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='客户类型'>
                <j-dict-select-tag placeholder='请选择客户类型' v-model='queryParam.khlx' dictCode='khlx' />
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <span style='float: left;overflow: hidden;' class='table-page-search-submitButtons'>
              <a-button type='primary' @click='searchQuery' icon='search'>查询</a-button>
              <a-button @click='searchReset' icon='reload' style='margin-left: 8px'>重置</a-button>
              <a @click='handleToggleSearch' style='margin-left: 8px'>
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class='table-operator'>
      <a-button icon='download' :loading='exportLoading' @click="handleExportXls('陪访人走访数据统计')"
                v-has="'PfrZfsjtj:exp'">导出
      </a-button>
      <!--<a-dropdown v-if="selectedRowKeys.length > 0">-->
      <!--<a-menu slot="overlay">-->
      <!--<a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>-->
      <!--</a-menu>-->
      <!--<a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
      <!--</a-dropdown>-->
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
        :rowSelection='{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}'
        @change='handleTableChange'>

        <span slot='bryxzfs' slot-scope='bryxzfs,record'>
          <a @click="detailInfo(record,'1',bryxzfs)">{{ bryxzfs }}</a>
        </span>
        <span slot='bzyxzfs' slot-scope='bzyxzfs,record'>
          <a @click="detailInfo(record,'2',bzyxzfs)">{{ bzyxzfs }}</a>
        </span>
        <span slot='byyxzfs' slot-scope='byyxzfs,record'>
          <a @click="detailInfo(record,'3',byyxzfs)">{{ byyxzfs }}</a>
        </span>
        <span slot='bjyxzfs' slot-scope='bjyxzfs,record'>
          <a @click="detailInfo(record,'4',bjyxzfs)">{{ bjyxzfs }}</a>
        </span>
        <span slot='bnyxzfs' slot-scope='bnyxzfs,record'>
          <a @click="detailInfo(record,'5',bnyxzfs)">{{ bnyxzfs }}</a>
        </span>
        <span slot='ljyxzfs' slot-scope='ljyxzfs,record'>
          <a @click="detailInfo(record,'6',ljyxzfs)">{{ ljyxzfs }}</a>
        </span>

        <span slot='brzfs' slot-scope='brzfs,record'>
          <a @click="detailInfo(record,'7',brzfs)">{{ brzfs }}</a>
        </span>
        <span slot='bzzfs' slot-scope='bzzfs,record'>
          <a @click="detailInfo(record,'8',bzzfs)">{{ bzzfs }}</a>
        </span>
        <span slot='byzfs' slot-scope='byzfs,record'>
          <a @click="detailInfo(record,'9',byzfs)">{{ byzfs }}</a>
        </span>
        <span slot='bjzfs' slot-scope='bjzfs,record'>
          <a @click="detailInfo(record,'10',bjzfs)">{{ bjzfs }}</a>
        </span>
        <span slot='bnzfs' slot-scope='bnzfs,record'>
          <a @click="detailInfo(record,'11',bnzfs)">{{ bnzfs }}</a>
        </span>
        <span slot='ljzfs' slot-scope='ljzfs,record'>
          <a @click="detailInfo(record,'12',ljzfs)">{{ ljzfs }}</a>
        </span>

        <span slot='action' slot-scope='text, record'>
          <a @click='handleEdit(record)'>编辑</a>

          <a-divider type='vertical' />
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
    <pfrZfsjtj-modal ref='modalForm' @ok='modalFormOk'></pfrZfsjtj-modal>
    <pfr-zfmx-modal ref='pfrzfmx'></pfr-zfmx-modal>
  </a-card>
</template>

<script>
import PfrZfsjtjModal from './modules/PfrZfsjtjModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import moment from 'moment'
import store from '@/store/'
import { getAction, downFile } from '@/api/manage'
import PfrZfmxModal from '@views/tjfx/zfsjtj/pfrzfsjtj/modules/PfrZfmxModal'

export default {
  name: 'PfrZfsjtjList',
  mixins: [JeecgListMixin],
  components: {
    PfrZfmxModal,
    PfrZfsjtjModal, JTreeSelect
  },
  data() {
    return {
      description: '陪访人走访数据统计管理页面',
      defaultMonthOpera: '',
      monthFormat: 'YYYY-MM-DD',
      // 表头
      columns: [],
      columns1: [
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
          title: '员工工号',
          align: 'center',
          dataIndex: 'yggh'
        },
        {
          title: '员工姓名',
          align: 'center',
          dataIndex: 'yggh_dictText'
        },
        {
          title: '客户类型',
          align: 'center',
          dataIndex: 'khlx_dictText'
        },
        {
          title: '本日走访数',
          align: 'center',
          dataIndex: 'brzfs'
        },
        {
          title: '本周走访数',
          align: 'center',
          dataIndex: 'bzzfs'
        },
        {
          title: '本月走访数',
          align: 'center',
          dataIndex: 'byzfs'
        },
        {
          title: '本季走访数',
          align: 'center',
          dataIndex: 'bjzfs'
        },
        {
          title: '本年走访数',
          align: 'center',
          dataIndex: 'bnzfs'
        },
        {
          title: '累计走访数',
          align: 'center',
          dataIndex: 'ljzfs'
        },
        {
          title: '本日有效走访数',
          align: 'center',
          dataIndex: 'bryxzfs'
        },
        {
          title: '本周有效走访数',
          align: 'center',
          dataIndex: 'bzyxzfs'
        },
        {
          title: '本月有效走访数',
          align: 'center',
          dataIndex: 'byyxzfs'
        },
        {
          title: '本季有效走访数',
          align: 'center',
          dataIndex: 'bjyxzfs'
        },
        {
          title: '本年有效走访数',
          align: 'center',
          dataIndex: 'bnyxzfs'
        },
        {
          title: '累计有效走访数',
          align: 'center',
          dataIndex: 'ljyxzfs'
        }
        // {
        //   title: '操作',
        //   dataIndex: 'action',
        //   align:"center",
        //   scopedSlots: { customRender: 'action' },
        // }
      ],
      columns2: [
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
          title: '岗位名称',
          align: 'center',
          dataIndex: 'gwbz_dictText'
        },
        {
          title: '员工工号',
          align: 'center',
          dataIndex: 'yggh'
        },
        {
          title: '员工姓名',
          align: 'center',
          dataIndex: 'yggh_dictText'
        },
        {
          title: '客户类型',
          align: 'center',
          dataIndex: 'khlx_dictText'
        },
        {
          title: '当日有效数',
          align: 'center',
          dataIndex: 'bryxzfs',
          scopedSlots: { customRender: 'bryxzfs' }
        },
        {
          title: '本周有效数',
          align: 'center',
          dataIndex: 'bzyxzfs',
          scopedSlots: { customRender: 'bzyxzfs' }
        },
        {
          title: '本月有效数',
          align: 'center',
          dataIndex: 'byyxzfs',
          scopedSlots: { customRender: 'byyxzfs' }
        },
        {
          title: '本季有效数',
          align: 'center',
          dataIndex: 'bjyxzfs',
          scopedSlots: { customRender: 'bjyxzfs' }
        },
        {
          title: '本年有效数',
          align: 'center',
          dataIndex: 'bnyxzfs',
          scopedSlots: { customRender: 'bnyxzfs' }
        },
        {
          title: '累计有效数',
          align: 'center',
          dataIndex: 'ljyxzfs',
          scopedSlots: { customRender: 'ljyxzfs' }
        },
        {
          title: '本日陪访数',
          align: 'center',
          dataIndex: 'brzfs',
          scopedSlots: { customRender: 'brzfs' }
        },
        {
          title: '本周陪访数',
          align: 'center',
          dataIndex: 'bzzfs',
          scopedSlots: { customRender: 'bzzfs' }
        },
        {
          title: '本月陪访数',
          align: 'center',
          dataIndex: 'byzfs',
          scopedSlots: { customRender: 'byzfs' }
        },
        {
          title: '本季陪访数',
          align: 'center',
          dataIndex: 'bjzfs',
          scopedSlots: { customRender: 'bjzfs' }
        },
        {
          title: '本年陪访数',
          align: 'center',
          dataIndex: 'bnzfs',
          scopedSlots: { customRender: 'bnzfs' }
        },
        {
          title: '累计陪访数',
          align: 'center',
          dataIndex: 'ljzfs',
          scopedSlots: { customRender: 'ljzfs' }
        }
      ],
      url: {
        list: '/zfsjtj/pfrZfsjtj/list',
        delete: '/zfsjtj/pfrZfsjtj/delete',
        deleteBatch: '/zfsjtj/pfrZfsjtj/deleteBatch',
        exportXlsUrl: 'zfsjtj/pfrZfsjtj/exportXls',
        importExcelUrl: 'zfsjtj/pfrZfsjtj/importExcel',
        exportXlsUrlXt: 'zfsjtj/pfrZfsjtj/exportXlsXt',
      },
      qybm: ''
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  created() {
    this.qybm = store.getters.qybm
    if (this.qybm=='425') {
      this.columns = this.columns2
    } else {
      this.columns = this.columns1
    }
    this.getCurrentMonth()
  },
  methods: {
    getCurrentMonth() {
      let curDate = new Date()
      let curMonth = { year: curDate.getFullYear(), month: curDate.getMonth() + 1 }
      this.defaultMonthOpera = moment(curDate)
      this.queryParam = { tjrq: undefined, zzbz: undefined }
      this.queryParam.tjrq = this.defaultMonthOpera
    },
    searchReset() {
      this.queryParam = { tjrq: undefined, zzbz: undefined }
      this.queryParam.tjrq = this.defaultMonthOpera
      if (!store.getters.isRoot) {
        this.queryParam.zzbz = store.getters.userInfo.orgCode
      }
      this.loadData(1)
    },
    loadData(arg) {
      if (!this.url.list) {
        this.$message.error('请设置url.list属性!')
        return
      }
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1
      }
      var params = this.getQueryParams()//查询条件
      if ((params.tjrq != undefined && params.tjrq != null)) {
        params.tjrq = moment(params.tjrq).format('YYYY-MM-DD')
      }
      this.loading = true
      getAction(this.url.list, params).then((res) => {
        if (res.success) {
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total
        }
        if (res.code === 510) {
          this.$message.warning(res.message, 5)
        }
        this.loading = false
      })
    },
    handleExportXls(fileName) {
      if (!fileName || typeof fileName != 'string') {
        fileName = '导出文件'
      }
      let param = { ...this.queryParam }
      if (this.queryParam.tjrq !== undefined && this.queryParam.tjrq !== null) {
        param.tjrq = moment(param.tjrq).format('YYYY-MM-DD')
      }
      if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
        param['selections'] = this.selectedRowKeys.join(',')
        param['rowKey'] = this.rowKey
      }
      let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
      param.paramsStr = paramsStr
      console.log('导出参数', param)
      this.exportLoading = true
      let url=''
      if (true){
        url=this.url.exportXlsUrlXt
      }else{
        url=this.url.exportXlsUrl
      }
      downFile(url, param).then((data) => {
        if (!data) {
          this.$message.warning('文件下载失败')
          return
        }
        /* if (typeof window.navigator.msSaveBlob !== 'undefined') {
           window.navigator.msSaveBlob(new Blob([data]), fileName+'.xls')
         }else{
           let url = window.URL.createObjectURL(new Blob([data]))
           let link = document.createElement('a')
           link.style.display = 'none'
           link.href = url
           link.setAttribute('download', fileName+'.xls')
           document.body.appendChild(link)
           link.click()
           document.body.removeChild(link); //下载完成移除元素
           window.URL.revokeObjectURL(url); //释放掉blob对象

         }*/
        var blob = new Blob([data])
        if ('msSaveOrOpenBlob' in navigator) {
          window.navigator.msSaveOrOpenBlob(blob, fileName + '.xls')
          return
        }
        var eleLink = document.createElement('a')
        eleLink.download = fileName + '.xls'
        eleLink.style.display = 'none'
        eleLink.href = URL.createObjectURL(blob)
        document.body.appendChild(eleLink)
        eleLink.click()
        document.body.removeChild(eleLink)
        this.exportLoading = false
      })
    },
    detailInfo(row,lx,sl){
      console.log("lx------------"+lx)
      if (sl <= 0){
        this.successInfo("数量为0不展示明细！")
        return;
      }
      this.$refs.pfrzfmx.init(row,lx)
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>