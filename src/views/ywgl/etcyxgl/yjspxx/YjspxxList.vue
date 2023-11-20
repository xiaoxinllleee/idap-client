<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="营销网点机构码">
              <j-tree-select placeholder="请选择营销网点机构码"
                             v-model="queryParam.yywdjgm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户身份证号">
              <a-input placeholder="请输入客户身份证号" v-model="queryParam.khsfzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户姓名">
              <a-input placeholder="请输入客户姓名" v-model="queryParam.khxm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="车牌号码">
              <a-input placeholder="请输入车牌号码" v-model="queryParam.cphm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="移交人工号">
              <a-input placeholder="请输入移交人工号" v-model="queryParam.yyxrgh"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="接收管户人工号">
              <a-input placeholder="请输入移交人工号" v-model="queryParam.yyxrgh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="流程业务编号">
              <a-input placeholder="请输入流程业务编号" v-model="queryParam.businessnumber"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="录入时间">
              <a-range-picker @change="onChangeBeginday" v-model="queryParam.lrsj"  :default-value="[undefined, moment(new Date(), 'YYYY/MM/DD')]" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="流程审批节点">
              <a-input placeholder="请输入流程审批节点" v-model="queryParam.lczt"></a-input>
            </a-form-item>
          </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button  @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('移交审批信息')">导出</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x: 3500}"
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

    <!-- 表单区域 -->
    <yjspxx-modal ref="modalForm" @ok="modalFormOk"></yjspxx-modal>
  </a-card>
</template>

<script>
  import YjspxxModal from './modules/YjspxxModal'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {filterObj} from "../../../../utils/util";
  import moment from 'moment'
  import store from '@/store/'

  export default {
    name: "YjspxxList",
    mixins:[JeecgListMixin],
    components: {
      YjspxxModal,JTreeSelect
    },
    data () {
      return {
        description: '移交审批信息管理页面',
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
            title: '营业网点机构码',
            align:"center",
            dataIndex: 'yywdjgm'
           },
          {
            title: '营业网点机构名称',
            align:"center",
            dataIndex: 'yywdjgm_dictText'
          },
          {
            title: '客户身份证号',
            align:"center",
            dataIndex: 'khsfzh'
          },
          {
            title: '客户姓名',
            align:"center",
            dataIndex: 'khxm'
          },
          {
            title: '车牌号码',
            align:"center",
            dataIndex: 'cphm'
          },
		   {
            title: '办理渠道',
            align:"center",
            dataIndex: 'blqd'
           },
          {
            title: '移交人工号',
            align:"center",
            dataIndex: 'yyxrgh'
          },
          {
            title: '移交人姓名',
            align:"center",
            dataIndex: 'yyxrgh'
          },
          {
            title: '移交日期',
            align:"center",
            dataIndex: 'yjrq'
          },
          {
            title: '接收管户人工号',
            align:"center",
            dataIndex: 'xyxrgh'
          },
          {
            title: '接收管户人姓名',
            align:"center",
            dataIndex: 'xyxrgh_dictText'
          },
          {
            title: '申请说明',
            align:"center",
            dataIndex: 'sqsm'
          },
          {
            title: '流程业务编号',
            align:"center",
            dataIndex: 'businessnumber'
          },
          {
            title: '流程审批节点',
            align:"center",
            dataIndex: 'lczt'
          },
          {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr'
          },
          {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
          },


		   /*{
            title: '办理员工编号',
            align:"center",
            dataIndex: 'blygbh'
           },
		   {
            title: '车牌颜色',
            align:"center",
            dataIndex: 'cpys'
           },
		   {
            title: '获客方式',
            align:"center",
            dataIndex: 'hkfs'
           },
		   {
            title: '绑定帐卡号',
            align:"center",
            dataIndex: 'bdzkh'
           },
		   {
            title: '原营销机构代码',
            align:"center",
            dataIndex: 'yyxjgdm'
           },
		   {
            title: '新营销机构代码',
            align:"center",
            dataIndex: 'xyxjgdm'
           },
		   {
            title: '录入标识',
            align:"center",
            dataIndex: 'lrbz'
           },
		   {
            title: '流程编号',
            align:"center",
            dataIndex: 'processid'
           },*/
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/yjspxx/yjspxx/list",
          delete: "/yjspxx/yjspxx/delete",
          deleteBatch: "/yjspxx/yjspxx/deleteBatch",
          exportXlsUrl: "yjspxx/yjspxx/exportXls",
          importExcelUrl: "yjspxx/yjspxx/importExcel",
       },
    }
  },
    created () {
      this.queryParam.lrsj_end = moment(new Date()).format('YYYY-MM-DD');
    },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      moment,
      onChangeBeginday: function(value, dateString){
        let lrsjString = dateString
        this.queryParam.lrsj_begin = lrsjString[0]
        this.queryParam.lrsj_end = lrsjString[1]

      },
      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.lrsj;
        return filterObj(param);
      },
      searchReset() {
        this.queryParam = {jgdm: undefined};
        if(!store.getters.isRoot) {
          this.queryParam.yywdjgm = store.getters.ywjgdm
        }
        this.loadData(1);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>