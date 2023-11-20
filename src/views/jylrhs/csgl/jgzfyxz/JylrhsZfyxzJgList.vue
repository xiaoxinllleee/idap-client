<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='业务机构'>
              <!--              <a-input placeholder="请输入业务机构" v-model="queryParam.jgdm"></a-input>-->
<!--              <j-tree-select placeholder='请选择业务机构' v-model='queryParam.jgdm'-->
<!--                             dict='v_hr_bas_organization_cmms,zzjc,ywjgdm' pidField='sjywjgdm'-->
<!--                             treeNodeFilterProp='title'-->
<!--                             show-search :showSearch='true' :treeDefaultExpandAll='true' :filterTreeNode='true'-->
<!--                             :isAll='false' />-->
              <j-tree-select placeholder="请选择业务机构"
                             pid-field="sjywjgdm_b"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.jgdm"
                             dict="v_hr_bas_organization,zzjc,ywjgdm"
                             condition='{"sjywjgdm": "ywjgdm"}'
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='记账年份'>
<!--              <a-input placeholder='请输入记账年份' v-model='queryParam.jznf'></a-input>-->
              <a-select placeholder="请选择记账年份" v-model="jznf" @change="selectValue" :allowClear="true">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!--        <template v-if="toggleSearchStatus">-->
          <!--          <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
          <!--            <a-form-item label="上限额度">-->
          <!--              <a-input placeholder="请输入上限额度" v-model="queryParam.sxed"></a-input>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <!--          <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
          <!--            <a-form-item label="备注">-->
          <!--              <a-input placeholder="请输入备注" v-model="queryParam.remark"></a-input>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <!--          <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
          <!--            <a-form-item label="操作类型">-->
          <!--              <a-input placeholder="请输入操作类型" v-model="queryParam.oprationType"></a-input>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <!--          </template>-->
          <!--          <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
          <!--            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">-->
          <!--              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>-->
          <!--              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>-->
          <!--              <a @click="handleToggleSearch" style="margin-left: 8px">-->
          <!--                {{ toggleSearchStatus ? '收起' : '展开' }}-->
          <!--                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>-->
          <!--              </a>-->
          <!--            </span>-->
          <!--          </a-col>-->

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class='table-operator'>
      <a-button @click='handleAdd' type='primary' icon='plus' v-has="'JylrhsZfyxzJg:add'">新增</a-button>
      <a-button type='primary' icon='download' :loading='exportLoading' @click="handleExportXls('机构费用上限')"
                v-has="'JylrhsZfyxzJg:export'">导出
      </a-button>
      <a-button icon='import' @click='excelImport' v-has="'JylrhsZfyxzJg:import'">导入</a-button>
      <a-button type='primary' @click='searchQuery' icon='search' style='margin-left: 8px'>查询</a-button>
      <a-button type='primary' @click='searchReset' icon='reload'>重置</a-button>
      <!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
      <!--        <a-button type="primary" icon="import">导入</a-button>-->
      <!--      </a-upload>-->
      <!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
      <!--        <a-menu slot="overlay">-->
      <!--          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>-->
      <!--        </a-menu>-->
      <!--        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
      <!--      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
      <!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项-->
      <!--        <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
      <!--      </div>-->

      <a-table
        ref='table'
        size='small'
        bordered
        :rowKey='rowKey'
        :columns='columns'
        :dataSource='dataSource'
        :pagination='ipagination'
        :loading='loading'
        @change='handleTableChange'>

        <span slot="remark" slot-scope="text">
          <j-ellipsis :value="text" :length="16" />
        </span>

        <span slot='action' slot-scope='text, record'>
          <a @click='handleEdit(record)' v-has="'JylrhsZfyxzJg:edit'">编辑</a>

          <a-divider type='vertical' v-has="'JylrhsZfyxzJg:delete'" />
          <a-dropdown v-has="'JylrhsZfyxzJg:delete'">
            <a class='ant-dropdown-link'>更多 <a-icon type='down' /></a>
            <a-menu slot='overlay'>
              <a-menu-item>
                <a-popconfirm title='确定删除吗?' @confirm='() => handleDelete(record)'>
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
    <jylrhsZfyxzJg-modal ref='modalForm' @ok='modalFormOk'></jylrhsZfyxzJg-modal>

    <excel-import ref='excelImportModal' @ok='importComplete' />
  </a-card>
</template>

<script>
import JylrhsZfyxzJgModal from './modules/JylrhsZfyxzJgModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JTreeSelect from '@comp/jeecg/JTreeSelect.vue'
import ExcelImport from '@comp/common/ExcelImport.vue'
import { filterObj } from '@/utils/util'
import { notification } from 'ant-design-vue'
import moment from 'moment/moment'
import { deleteAction, downFile, getAction } from '@api/manage'
import store from '@/store'
import JEllipsis from '@comp/jeecg/JEllipsis.vue'

export default {
  name: 'JylrhsZfyxzJgList',
  mixins: [JeecgListMixin],
  components: {
    JEllipsis,
    JTreeSelect,
    JylrhsZfyxzJgModal,
    ExcelImport
  },
  data() {
    return {
      description: '机构费用上限管理页面',
      jznf: '',
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
          title: '业务机构',
          align: 'center',
          dataIndex: 'jgdm_dictText'
        },
        {
          title: '记账年份',
          align: 'center',
          dataIndex: 'jznf',
          customRender: function (text) {
            return !text ? "" : (text.length > 4 ? text.substr(0, 4) : text)
          },
        },
        {
          title: '上限额度(万元)',
          align: 'center',
          dataIndex: 'sxed',
          customRender: function(text) {
            return Number(text).toFixed(2)
          },
        },
        {
          title: '备注',
          align: 'left',
          dataIndex: 'remark',
          scopedSlots: { customRender: 'remark' },
        },
        {
          title: '操作类型',
          align: 'center',
          dataIndex: 'oprationType_dictText'
        },
        {
          title: '操作员',
          align: 'center',
          dataIndex: 'operator'
        },
        {
          title: '录入/修改时间',
          align: 'center',
          dataIndex: 'oprationTime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/jylrhs/csgl/jgzfyxz/list',
        delete: '/jylrhs/csgl/jgzfyxz/delete',
        deleteBatch: '/jylrhs/csgl/jgzfyxz/deleteBatch',
        exportXlsUrl: 'jylrhs/csgl/jgzfyxz/exportXls',
        importExcelUrl: 'jylrhs/csgl/jgzfyxz/importExcel',
        exportTemplateUrl: 'jylrhs/csgl/jgzfyxz/exportTemplateXls',
      }
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  created() {
    this.init()
  },
  methods: {

    init() {
      var myDate = new Date;
      var year = myDate.getFullYear();
      this.jznf = year
      this.initSelectYear(year)
    },
    initSelectYear(year) {
      // 初始化年份选择下拉框
      this.years = [];
      for (let i = 0; i < 30; i++) {
        this.years.push({value: ((year - i) + ''), label: ((year - i) + '')});
      }
    },
    selectValue(value) {
      this.$emit('change', value)
    },

    loadData(arg) {
      if (!this.url.list) {
        notification.error({message: '系统提示', description: '请设置url.list属性!', duration: 4})
        return
      }
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1;
      }
      //查询条件
      var params = this.getQueryParams();
      if (params.jznf !== undefined && params.jznf !== null && params.jznf !== '') {
        params.jznf = moment(params.jznf).format('YYYY') + '-01-01'
      }
      this.loading = true;
      getAction(this.url.list, params).then((res) => {
        if (res.success) {
          this.dataSource = res.result.records;
          this.ipagination.total = res.result.total;
        }
        if (res.code === 510) {
          this.$message.warning(res.message,5)
        }
        this.loading = false;
      })
    },
    getQueryParams() {
      var param = Object.assign({}, this.queryParam, this.isorter);
      param.field = this.getQueryField();
      param.pageNo = this.ipagination.current;
      param.pageSize = this.ipagination.pageSize;
      if (this.jznf) {
        param.jznf = this.jznf + '-01-01'
      }
      return filterObj(param);
    },
    searchReset() {
      this.queryParam = {jznf: undefined}
      var date = new Date
      var year = date.getFullYear()
      this.jznf = year
      this.queryParam.jznf = moment(this.jznf+"-01-01").format("YYYYMMDD")
      this.loadData(1)
    },

    handleDelete: function (record) {
      if (!this.url.delete) {
        this.$message.error('请设置url.delete属性!')
        return
      }
      var that = this
      let params = {
        'jgdm': record.jgdm,
        'jznf': record.jznf,
      }
      deleteAction(that.url.delete, params).then((res) => {
        if (res.success) {
          that.$message.success(res.message)
          that.loadData()
        } else {
          that.$message.warning(res.message)
        }
      })
    },

    handleExportXls (fileName) {
      if (!fileName || typeof fileName != 'string') {
        fileName = '导出文件'
      }
      fileName = fileName + '导出_' + moment(new Date()).format('YYYYMMDDHHmmss')
      let param = this.getQueryParams();
      if(this.selectedRowKeys && this.selectedRowKeys.length>0) {
        param['selections'] = this.selectedRowKeys.join(",")
        param['rowKey'] = this.rowKey
      }
      let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
      param.paramsStr = paramsStr
      console.log('导出参数', param)
      this.exportLoading = true
      downFile(this.url.exportXlsUrl, param).then((data) => {
        if (!data) {
          this.$message.warning('文件下载失败')
          return
        }
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

    excelImport() {
      let params = {}
      params.exportTemplateUrl = this.url.exportTemplateUrl
      params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      this.exportTemplateName = '经营利润核算（机构费用上限）导入模板' + '_' + moment(new Date()).format('YYYYMMDDHHmmss')
      params.exportTemplateName = this.exportTemplateName
      var param = Object.assign({}, this.queryParam, params);
      this.$refs.excelImportModal.showModal(param);
    },

  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>