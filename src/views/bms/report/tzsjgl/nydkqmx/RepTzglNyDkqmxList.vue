<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='数据日期'>
              <a-month-picker placeholder="请选择数据月份" v-model="queryParam.sjrq"
                              :defaultValue="defaultMonthOpera" :format="monthFormat" style="width: 100%;" @change="beforeUpload"/>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='机构名称'>
              <a-input placeholder='请输入机构名称' v-model='queryParam.jgmc'></a-input>
            </a-form-item>
          </a-col>
          <template v-if='toggleSearchStatus'>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='贷款账号'>
                <a-input placeholder='请输入贷款账号' v-model='queryParam.dkzh'></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='客户名称'>
                <a-input placeholder='请输入客户名称' v-model='queryParam.khmc'></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl='6' :lg='7' :md='8' :sm='24'>
              <a-form-item label='注册证件号'>
                <a-input placeholder='请输入注册证件号' v-model='queryParam.zczjh'></a-input>
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
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button icon="import" @click="excelImport">导入</a-button>
      <a-button icon='download' :loading='exportLoading'
                @click="handleExportXls('手工台账_宁远_贷款全明细')">导出
      </a-button>
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
    <repTzglNyDkqmx-modal ref='modalForm' @ok='modalFormOk'></repTzglNyDkqmx-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
import RepTzglNyDkqmxModal from './modules/RepTzglNyDkqmxModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { getAction } from '@api/manage'
import { filterObj } from '@/utils/util'
import ExcelImport from '@/components/common/ExcelImport'

export default {
  name: 'RepTzglNyDkqmxList',
  mixins: [JeecgListMixin],
  components: {
    RepTzglNyDkqmxModal,ExcelImport
  },
  data() {
    return {
      description: '手工台账_宁远_贷款全明细管理页面',
      monthFormat: 'YYYY-MM',
      // 默认当前月份
      defaultMonthOpera: '',
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
          title: '数据日期',
          align: 'center',
          dataIndex: 'sjrq',
          customRender: function (text) {
            return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
          },
        },
        {
          title: '机构名称',
          align: 'center',
          dataIndex: 'jgmc'
        },
        {
          title: '贷款账号',
          align: 'center',
          dataIndex: 'dkzh'
        },
        {
          title: '客户名称',
          align: 'center',
          dataIndex: 'khmc'
        },
        {
          title: '注册证件号',
          align: 'center',
          dataIndex: 'zczjh'
        },
        {
          title: '合同号',
          align: 'center',
          dataIndex: 'hth'
        },
        {
          title: '合同额度',
          align: 'center',
          dataIndex: 'hted'
        },
        {
          title: '贷款规模',
          align: 'center',
          dataIndex: 'dkgm'
        },
        {
          title: '对比贷款规模',
          align: 'center',
          dataIndex: 'dbdkgm'
        },
        {
          title: '小微企业',
          align: 'center',
          dataIndex: 'xwqy'
        },
        {
          title: '新放',
          align: 'center',
          dataIndex: 'xf'
        },
        {
          title: '按揭',
          align: 'center',
          dataIndex: 'aj'
        },
        {
          title: '商业用房',
          align: 'center',
          dataIndex: 'syyf'
        },
        {
          title: '到期天数',
          align: 'center',
          dataIndex: 'dqts'
        },
        {
          title: '融资担保',
          align: 'center',
          dataIndex: 'rzdb'
        },
        {
          title: '贷款投向0',
          align: 'center',
          dataIndex: 'dktx0'
        },
        {
          title: '经营性',
          align: 'center',
          dataIndex: 'jyx'
        },
        {
          title: '贷款金额',
          align: 'center',
          dataIndex: 'dkje'
        },
        {
          title: '本金余额',
          align: 'center',
          dataIndex: 'bjye'
        },
        {
          title: '贷款日期',
          align: 'center',
          dataIndex: 'dkrq'
        },
        {
          title: '展期日期',
          align: 'center',
          dataIndex: 'zqrq'
        },
        {
          title: '到期日期',
          align: 'center',
          dataIndex: 'dqrq'
        },
        {
          title: '上次结息日',
          align: 'center',
          dataIndex: 'scjxr'
        },
        {
          title: '年化利息收益',
          align: 'center',
          dataIndex: 'nhlxsy'
        },
        {
          title: '贷款到期前利率',
          align: 'center',
          dataIndex: 'dkdqqll'
        },
        {
          title: '五级分类状态',
          align: 'center',
          dataIndex: 'wjflzt'
        },
        {
          title: '年初五级分类',
          align: 'center',
          dataIndex: 'ncwjfl'
        },
        {
          title: '客户经理',
          align: 'center',
          dataIndex: 'khjl'
        },
        {
          title: '主客户经理',
          align: 'center',
          dataIndex: 'zkhjl'
        },
        {
          title: '第一责任人',
          align: 'center',
          dataIndex: 'dyzzr'
        },
        {
          title: '行政村组',
          align: 'center',
          dataIndex: 'xzcz'
        },
        {
          title: '详细地址',
          align: 'center',
          dataIndex: 'xxdz'
        },
        {
          title: '联系电话',
          align: 'center',
          dataIndex: 'lxdh'
        },
        {
          title: '借款人性质分类',
          align: 'center',
          dataIndex: 'jkrxzfl'
        },
        {
          title: '借款人性质分类1',
          align: 'center',
          dataIndex: 'jkrxzfl1'
        },
        {
          title: '借款人性质分类2',
          align: 'center',
          dataIndex: 'jkrxzfl2'
        },
        {
          title: '借款人性质分类3',
          align: 'center',
          dataIndex: 'jkrxzfl3'
        },
        {
          title: '企业规模',
          align: 'center',
          dataIndex: 'qygm'
        },
        {
          title: '企业规模1',
          align: 'center',
          dataIndex: 'qygm1'
        },
        {
          title: '贷款品种',
          align: 'center',
          dataIndex: 'dkpz'
        },
        {
          title: '期限分类',
          align: 'center',
          dataIndex: 'qxfl'
        },
        {
          title: '担保方式',
          align: 'center',
          dataIndex: 'dbfs'
        },
        {
          title: '贷款投向',
          align: 'center',
          dataIndex: 'dktx'
        },
        {
          title: '贷款投向1',
          align: 'center',
          dataIndex: 'dktx1'
        },
        {
          title: '贷款投向2',
          align: 'center',
          dataIndex: 'dktx2'
        },
        {
          title: '贷款投向3',
          align: 'center',
          dataIndex: 'dktx3'
        },
        {
          title: '贷款投向4',
          align: 'center',
          dataIndex: 'dktx4'
        },
        {
          title: '贷款投向5',
          align: 'center',
          dataIndex: 'dktx5'
        },
        {
          title: '贷款投向6',
          align: 'center',
          dataIndex: 'dktx6'
        },
        {
          title: '贷款投向7',
          align: 'center',
          dataIndex: 'dktx7'
        },
        {
          title: '贷款投向8',
          align: 'center',
          dataIndex: 'dktx8'
        },
        {
          title: '是否财政贴息',
          align: 'center',
          dataIndex: 'sfcztx'
        },
        {
          title: '贷款其他类型1',
          align: 'center',
          dataIndex: 'dkqtlx1'
        },
        {
          title: '备注1',
          align: 'center',
          dataIndex: 'bz1'
        },
        {
          title: '备注2',
          align: 'center',
          dataIndex: 'bz2'
        },
        {
          title: '固定资产类型',
          align: 'center',
          dataIndex: 'gdzclx'
        },
        {
          title: '固定资产类型1',
          align: 'center',
          dataIndex: 'gdzclx1'
        },
        {
          title: '固定资产类型2',
          align: 'center',
          dataIndex: 'gdzclx2'
        },
        {
          title: '固定资产类型3',
          align: 'center',
          dataIndex: 'gdzclx3'
        },
        {
          title: '固定资产类型4',
          align: 'center',
          dataIndex: 'gdzclx4'
        },
        {
          title: '借款人行业分类',
          align: 'center',
          dataIndex: 'jkrhyfl'
        },
        {
          title: '借款人行业分类1',
          align: 'center',
          dataIndex: 'jkrhyfl1'
        },
        {
          title: '借款人行业分类2',
          align: 'center',
          dataIndex: 'jkrhyfl2'
        },
        {
          title: '借款人行业分类3',
          align: 'center',
          dataIndex: 'jkrhyfl3'
        },
        {
          title: '利率类型',
          align: 'center',
          dataIndex: 'lllx'
        },
        {
          title: '统计日期',
          align: 'center',
          dataIndex: 'tjrq'
        },
        {
          title: '是否职工',
          align: 'center',
          dataIndex: 'sfzg'
        },
        {
          title: '农户经营性',
          align: 'center',
          dataIndex: 'nhjyx'
        },
        {
          title: '普惠涉农',
          align: 'center',
          dataIndex: 'phsn'
        },
        {
          title: '涉农',
          align: 'center',
          dataIndex: 'sn'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/nydkqmx/repTzglNyDkqmx/list',
        delete: '/nydkqmx/repTzglNyDkqmx/delete',
        deleteBatch: '/nydkqmx/repTzglNyDkqmx/deleteBatch',
        exportXlsUrl: '/nydkqmx/repTzglNyDkqmx/exportXls',
        importExcelUrl: '/nydkqmx/repTzglNyDkqmx/importExcel',
        exportTemplateUrl: '/nydkqmx/repTzglNyDkqmx/exportTemplateXls',
      },
      rq:'',
      exportTemplateName:'贷款全明细导入模板',
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {
    excelImport(){
      if (this.queryParam.sjrq == undefined || this.queryParam.sjrq == '') {
        this.$message.error("请选择数据月份!")
        return
      }else {
        let params = {}
        params.exportTemplateUrl = this.url.exportTemplateUrl
        params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}?sjrq=${this.rq}`
        params.exportTemplateName = this.exportTemplateName
        var param = Object.assign({},this.queryParam, params);
        this.$refs.excelImportModal.showModal(param);
      }
    },
    beforeUpload() {
      if (this.queryParam.sjrq){
        this.rq = this.queryParam.sjrq.format("YYYY-MM") + '-01';
      }
    },
    loadData(arg) {
      // this.getCurrentMonth();
      if (!this.url.list) {
        this.$message.error("请设置url.list属性!")
        return
      }
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1;
      }
      var params = this.getQueryParams();//查询条件
      /* if ((params.sjrq === undefined || params.sjrq == null)) {
         params.sjrq = this.defaultMonthOpera.format("YYYY-MM") + '-01'
       }*/
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
      let tjyfMoment = "";
      if (this.queryParam.sjrq) {
        tjyfMoment = this.queryParam.sjrq.format("YYYY-MM") + '-01';
      }
      var param = Object.assign({}, this.queryParam, this.isorter);
      param.field = this.getQueryField();
      param.pageNo = this.ipagination.current;
      param.pageSize = this.ipagination.pageSize;
      if (param.sjrq) {
        param.sjrq = tjyfMoment;
      }
      return filterObj(param);
    },
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>