<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="报告编号">
              <a-input v-model="queryParam.bgbh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="查询日期">
              <a-range-picker @change="onChangeBeginday" v-model="queryParam.cxrq"  :default-value="[undefined, moment(new Date(), 'YYYY/MM/DD')]" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="被查询人证件号码">
              <a-input v-model="queryParam.bcxrzjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="被查询人姓名">
              <j-input v-model="queryParam.bcxrxm"></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作员所属机构">
              <j-tree-select placeholder="请选择组织机构" v-model="queryParam.czyjgdm" get-all-zzjg="1"
                             treeNodeFilterProp="title" pid-field="sjywjgdm" dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true" :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="查询操作员姓名">
              <a-input placeholder="请输入查询操作员姓名" v-model="queryParam.cxczyxm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="查询原因">
              <a-select placeholder="全部" v-model="queryParam.cxyy">
                <a-select-option value="1">
                  贷款审批
                </a-select-option>
                <a-select-option value="2">
                  信用卡审批
                </a-select-option>
                <a-select-option value="3">
                  贷后管理
                </a-select-option>
                <a-select-option value="4">
                  担保资格审查
                </a-select-option>
                <a-select-option value="5">
                  特约商户实名审查
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
          <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button :loading="exportLoading" icon="download"
                @click="handleExportXls('查询记录台账')" v-has="'cxjltz:exportXls'">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>

      <a-table ref="table"
               size="middle"
               bordered
               rowKey="lrsj"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
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
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util';
  import moment from 'moment'
  import JInput from '../../../../components/jeecg/JInput'

  export default {
    name: "CxjltzList",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect,JInput
    },
    data () {
      return {
        escription: '查询记录台账管理页面',
        // 表头
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
            title: '报告编号',
            align:"center",
            dataIndex: 'bgbh'
          },
          {
            title: '查询日期',
            align:"center",
            dataIndex: 'cxrq'
          },
          {
            title: '查询时间',
            align:"center",
            dataIndex: 'lrsj'
          },
          {
            title: '被查询人证件号码',
            align:"center",
            dataIndex: 'bcxrzjhm',
            width: 180
          },
          {
            title: '被查询人姓名',
            align:"center",
            dataIndex: 'bcxrxm',
            width: 150
          },
		   {
            title: '操作员机构名称',
            align:"center",
            dataIndex: 'czyjgdm_dictText',
            width: 150
           },
		   {
            title: '查询操作员姓名',
            align:"center",
            dataIndex: 'cxczyxm',
            width: 150
           },
		   {
            title: '查询原因',
            align:"center",
            dataIndex: 'cxyy_dictText',
            width: 200
           },
		   {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr'
           },
		   {
            title: '录入标识',
            align:"center",
            dataIndex: 'lrbz_dictText'
           },

		   {
            title: '查询人IP',
            align:"center",
            dataIndex: 'cxrip'
           }
        ],
		url: {
          list: "/cxjltz/cxjltz/list",
          delete: "/cxjltz/cxjltz/delete",
          deleteBatch: "/cxjltz/cxjltz/deleteBatch",
          exportXlsUrl: "cxjltz/cxjltz/exportXls",
          importExcelUrl: "cxjltz/cxjltz/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created () {
      this.queryParam.cxrq_end = moment(new Date()).format('YYYY-MM-DD');
    },
    methods: {
      moment,
      onChangeBeginday: function(value, dateString){
        let cxrqString = dateString
        this.queryParam.cxrq_begin = cxrqString[0]
        this.queryParam.cxrq_end = cxrqString[1]
      },
      getQueryParams() {
        //获取查询条件
        let sqp = {}
        if(this.superQueryParams){
          sqp['superQueryParams']=encodeURI(this.superQueryParams)
        }
        //日期格式调整
        let tjrqment = "";
        if(this.queryParam.tjyf) {
          tjrqment = this.queryParam.tjyf.format("YYYY-MM")+'-01';
        }
        var param = Object.assign(sqp, this.queryParam, this.isorter ,this.filters);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.cxrq;
        if (param.tjyf) {
          param.tjyf = tjrqment;
        }
        return filterObj(param);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>