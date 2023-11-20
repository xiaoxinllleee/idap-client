<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计日期">
              <a-date-picker placeholder="请输入统计日期" v-model="queryParam.tjrq"  :defaultValue="defaultMonthOpera"
                             :format="monthFormat" style="width: 100%;" @change="beforeUpload"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户号">
              <a-input placeholder="请输入客户号" v-model="queryParam.khh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务品种">
              <a-input placeholder="请输入业务品种" v-model="queryParam.ywpz"></a-input>
            </a-form-item>
          </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('借款合同登记簿')" v-has="'jkhtdjb:exp'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'jkhtdjb:imp'">导入</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{ x: 5500}"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->
    <excel-import ref="excelImportModal" @ok="importComplete"/>
    <!-- 表单区域 -->
    <tjfxJkhtdjb-modal ref="modalForm" @ok="modalFormOk"></tjfxJkhtdjb-modal>
  </a-card>
</template>

<script>
  import TjfxJkhtdjbModal from './TjfxJkhtdjbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'
  import TjfxHnkdModal from '@views/tjfx/tjfxJkhtdjb/modules/TjfxHnkdModal'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import ExcelImport from '@comp/common/ExcelImport'

  export default {
    name: "TjfxJkhtdjbList",
    mixins:[JeecgListMixin],
    components: {
      TjfxJkhtdjbModal,JTreeSelect,ExcelImport
    },
    data () {
      return {
        description: '借款合同登记簿管理页面',
        // 表头
        monthFormat: 'YYYY-MM-DD',
        // 默认当前月份
        defaultMonthOpera: '',
        rq:'',
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
		  {
            title: '统计日期',
            align:"center",
            dataIndex: 'tjrq'
          },
          {
            title: '序号',
            align:"center",
            dataIndex: 'xh'
          },
          {
            title: '签约机构',
            align:"center",
            dataIndex: 'qyjg'
          },
          {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx'
          },
		  {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
          },
		  {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
          },
		  {
            title: '客户号',
            align:"center",
            dataIndex: 'khh'
          },
		  {
            title: '业务品种',
            align:"center",
            dataIndex: 'ywpz'
          },
		  {
            title: '合同编号',
            align:"center",
            dataIndex: 'htbh'
          },
		  {
            title: '合同类型',
            align:"center",
            dataIndex: 'htlx'
          },
		  {
            title: '合同金额',
            align:"center",
            dataIndex: 'htje'
          },
		  {
            title: '已使用额度',
            align:"center",
            dataIndex: 'ysyed'
          },
		  {
            title: '可用额度',
            align:"center",
            dataIndex: 'kyed'
          },
		  {
            title: '合同起始日',
            align:"center",
            dataIndex: 'htqsr'
          },
		  {
            title: '合同到期日',
            align:"center",
            dataIndex: 'htdqr'
          },
		  {
            title: '签约日期',
            align:"center",
            dataIndex: 'qyrq'
          },
		  {
            title: '终止日期',
            align:"center",
            dataIndex: 'zzrq'
          },
		  {
            title: '还款周期',
            align:"center",
            dataIndex: 'hkzq'
          },
		  {
            title: '还款方式',
            align:"center",
            dataIndex: 'hkfs'
          },
		  {
            title: '签约利率',
            align:"center",
            dataIndex: 'qyll'
          },
		  {
            title: '担保方式',
            align:"center",
            dataIndex: 'dbfs'
          },
		  {
            title: '抵押/质押/保证合同编号',
            align:"center",
            dataIndex: 'dyzybzhtbh'
          },
		  {
            title: '他项权证号码',
            align:"center",
            dataIndex: 'xqzhmt'
          },
		  {
            title: '借款原因',
            align:"center",
            dataIndex: 'jkyy'
          },
		  {
            title: '客户经理',
            align:"center",
            dataIndex: 'khjl'
          },
          /*{
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/tjfxJkhtdjb/tjfxJkhtdjb/list",
          delete: "/tjfxJkhtdjb/tjfxJkhtdjb/delete",
          deleteBatch: "/tjfxJkhtdjb/tjfxJkhtdjb/deleteBatch",
          exportXlsUrl: "tjfxJkhtdjb/tjfxJkhtdjb/exportXls",
          importExcelUrl: "tjfxJkhtdjb/tjfxJkhtdjb/importExcel",
      exportTemplateUrl:"/tjfxJkhtdjb/tjfxJkhtdjb/exportTemplateXls",
        },
        exportTemplateName: '借款合同登记簿导入模板'
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      beforeUpload() {
        if (this.queryParam.tjrq){
          this.rq = this.queryParam.tjrq.format("YYYY-MM-DD");
        }
      },
      excelImport(){
        if (this.queryParam.tjrq == undefined || this.queryParam.tjrq == '') {
          this.$message.error("请选择数据日期!")
          return
        }else {
          let params = {}
          params.exportTemplateUrl = this.url.exportTemplateUrl
          params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}?tjrq=${this.rq}`
          params.exportTemplateName = this.exportTemplateName
          var param = Object.assign({},this.queryParam, params);
          this.$refs.excelImportModal.showModal(param);
        }
      },

      getQueryParams() {
        let tjyfMoment = "";
        if (this.queryParam.tjrq) {
          tjyfMoment = this.queryParam.tjrq.format("YYYY-MM-DD");
        }
        console.log(tjyfMoment+'====tjyfMoment=====')
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjrq) {
          param.tjrq = tjyfMoment;
        }
        return filterObj(param);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>
