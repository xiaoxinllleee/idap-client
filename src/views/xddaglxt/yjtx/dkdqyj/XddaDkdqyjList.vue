<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构代码"
                             v-model="queryParam.jgdm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款账号">
              <a-input placeholder="请输入贷款账号" v-model="queryParam.dkzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户姓名">
              <a-input placeholder="请输入客户姓名" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="借款日期">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.jkrq"
                              @change="onJkDateChange" style="width: 100%;"/>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="到期日期">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.dqrq"
                              @change="onDQDateChange" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="贷款金额">
              <a-input-group compact>
                <a-input-number placeholder="" v-model="queryParam.dkje_begin" :min="0"
                                style=" width: 40%; text-align: center; "/>
                <a-input placeholder="<->" disabled
                         style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "/>
                <a-input-number placeholder="" v-model="queryParam.dkje_end" :min="0"
                                style="width: 40%; text-align: center; border-left: 0;"/>
              </a-input-group>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="贷款余额">
              <a-input-group compact>
                <a-input-number placeholder="" v-model="queryParam.dkye_begin" :min="0"
                                style=" width: 40%; text-align: center; "/>
                <a-input placeholder="<->" disabled
                         style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "/>
                <a-input-number placeholder="" v-model="queryParam.dkye_end" :min="0"
                                style="width: 40%; text-align: center; border-left: 0;"/>
              </a-input-group>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="贷款形态">
              <j-dict-select-tag placeholder="贷款形态" v-model="queryParam.dkxt" dictCode="wjflbz"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="剩余天数">
              <a-input-group compact>
                <a-input-number placeholder="" v-model="queryParam.syts_begin" :min="0"
                                style=" width: 40%; text-align: center; "/>
                <a-input placeholder="<->" disabled
                         style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "/>
                <a-input-number placeholder="" v-model="queryParam.syts_end" :min="0"
                                style="width: 40%; text-align: center; border-left: 0;"/>
              </a-input-group>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="到期时间区间">
              <j-dict-select-tag placeholder="到期时间区间" v-model="queryParam.dqlx" dictCode="dqlx"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="信贷贷款品种">
              <j-dict-select-tag placeholder="请选择信贷贷款品种" v-model="queryParam.xddkpz" dictCode="dkzl"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="">
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="">
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="">
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('贷款到期预警')" v-has="'dkdqyj:exportXls'">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'dkdqyj:edit'">编辑</a>

          <a-divider type="vertical" />
        <!--  <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                 </a-menu-item>
            </a-menu>
          </a-dropdown>-->
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)" v-has="'dkdqyj:delete'">
                  <a>删除</a>
                </a-popconfirm>

        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <xddaDkdqyj-modal ref="modalForm" @ok="modalFormOk"></xddaDkdqyj-modal>
  </a-card>
</template>

<script>
  import XddaDkdqyjModal from './modules/XddaDkdqyjModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {filterObj} from "../../../../utils/util";

  export default {
    name: "XddaDkdqyjList",
    mixins:[JeecgListMixin],
    components: {
      XddaDkdqyjModal,JTreeSelect
    },
    data () {
      return {
        description: '贷款到期预警管理页面',
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
            title: '机构代码',
            align:"center",
            dataIndex: 'jgdm'
          },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '客户姓名',
            align:"center",
            dataIndex: 'khmc'
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
          },
          {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText'
          },
          {
            title: '住址',
            align:"center",
            dataIndex: 'dz'
          },
          {
            title: '贷款账号',
            align:"center",
            dataIndex: 'dkzh'
          },
          {
            title: '贷款金额',
            align:"center",
            dataIndex: 'dkje'
          },
          {
            title: '贷款余额',
            align:"center",
            dataIndex: 'dkye'
          },
          {
            title: '借款日期',
            align:"center",
            dataIndex: 'jkrq'
          },
          {
            title: '到期日期',
            align:"center",
            dataIndex: 'dqrq'
          },
          {
            title: '贷款期限',
            align:"center",
            dataIndex: 'dkqx_dictText'
          },
          {
            title: '剩余天数',
            align:"center",
            dataIndex: 'syts'
          },
          {
            title: '第一责任人',
            align:"center",
            dataIndex: 'dyzrr'
          },
          {
            title: '主客户经理',
            align:"center",
            dataIndex: 'khjlbz'
          },
          {
            title: '贷款形态',
            align:"center",
            dataIndex: 'dkxt_dictText'
          },
          {
            title: '信贷贷款品种',
            align:"center",
            dataIndex: 'xddkpz_dictText'
          },
          {
            title: '主要责任人',
            align:"center",
            dataIndex: 'zyzrr'
          },
          {
            title: '次要责任人',
            align:"center",
            dataIndex: 'cyzrr'
          },
          {
            title: '清收责任人',
            align:"center",
            dataIndex: 'qszrr'
          },

		   /*{
            title: 'khjlyggh',
            align:"center",
            dataIndex: 'khjlyggh'
           },

		   {
            title: 'xwqy',
            align:"center",
            dataIndex: 'xwqy'
           },
		   {
            title: 'dhhm',
            align:"center",
            dataIndex: 'dhhm'
           },
		   {
            title: 'dqlx',
            align:"center",
            dataIndex: 'dqlx'
           },
		   {
            title: 'jxr',
            align:"center",
            dataIndex: 'jxr'
           },

		   {
            title: 'cpmc',
            align:"center",
            dataIndex: 'cpmc'
           },

		   {
            title: 'qxts',
            align:"center",
            dataIndex: 'qxts'
           },
		   {
            title: 'bnyjlx',
            align:"center",
            dataIndex: 'bnyjlx'
           },
		   {
            title: 'bnyslx',
            align:"center",
            dataIndex: 'bnyslx'
           },
		   {
            title: 'bwyjlx',
            align:"center",
            dataIndex: 'bwyjlx'
           },
		   {
            title: 'bwyslx',
            align:"center",
            dataIndex: 'bwyslx'
           },
		   {
            title: 'bnwqxh',
            align:"center",
            dataIndex: 'bnwqxh'
           },
		   {
            title: 'dkll',
            align:"center",
            dataIndex: 'dkll'
           },
		   {
            title: 'dbfs',
            align:"center",
            dataIndex: 'dbfs'
           },
		   {
            title: 'khsshylx',
            align:"center",
            dataIndex: 'khsshylx'
           },
		   {
            title: 'dktx',
            align:"center",
            dataIndex: 'dktx'
           },
		   {
            title: 'dqqkjc',
            align:"center",
            dataIndex: 'dqqkjc'
           },
		   {
            title: 'blxcyy',
            align:"center",
            dataIndex: 'blxcyy'
           },
		   {
            title: 'zrjd',
            align:"center",
            dataIndex: 'zrjd'
           },
		   {
            title: 'qsczcs',
            align:"center",
            dataIndex: 'qsczcs'
           },
		   {
            title: 'qsczsx',
            align:"center",
            dataIndex: 'qsczsx'
           },
		   {
            title: 'dkzrr',
            align:"center",
            dataIndex: 'dkzrr'
           },

		   {
            title: 'bz',
            align:"center",
            dataIndex: 'bz'
           },
		   {
            title: 'lrsj',
            align:"center",
            dataIndex: 'lrsj'
           },
		   {
            title: 'lrbz',
            align:"center",
            dataIndex: 'lrbz'
           },
		   {
            title: 'lrr',
            align:"center",
            dataIndex: 'lrr'
           },
		   {
            title: 'tjyf',
            align:"center",
            dataIndex: 'tjyf'
           },

		   {
            title: 'bmkkh',
            align:"center",
            dataIndex: 'bmkkh'
           },
		   {
            title: 'qxr',
            align:"center",
            dataIndex: 'qxr'
           },*/
          /*{
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/dkdqyj/xddaDkdqyj/list",
          delete: "/dkdqyj/xddaDkdqyj/delete",
          deleteBatch: "/dkdqyj/xddaDkdqyj/deleteBatch",
          exportXlsUrl: "dkdqyj/xddaDkdqyj/exportXls",
          importExcelUrl: "dkdqyj/xddaDkdqyj/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.jkrq;
        delete param.dqrq;
        return filterObj(param);
      },
      onJkDateChange(date,dateString){
        this.queryParam.jkrqString = dateString[0] + "," + dateString[1];
      },
      onDQDateChange(date,dateString){
        this.queryParam.dqrqString = dateString[0] + "," + dateString[1];
      }

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>