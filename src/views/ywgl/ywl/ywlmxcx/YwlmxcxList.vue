<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="组织标识">
            <j-tree-select placeholder="请选择组织标识"
                           v-model="queryParam.zzbz"
                           treeNodeFilterProp="title"
                           pid-field="sjywjgdm"
                           dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                           :showSearch="true"
                           :treeDefaultExpandAll="true"/>
          </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="岗位标识">
              <j-dict-select-tag
                placeholder="全部"
                v-model="queryParam.gwbz"
                dictCode="Hr_bas_post,gwmc,gwbz"
              />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
          <a-form-item label="员工工号">
            <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
          </a-form-item>
        </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易码">
              <a-input placeholder="请输入交易码" v-model="queryParam.jym"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="柜员号">
              <a-input placeholder="请输入柜员号" v-model="queryParam.gyh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易日期">
              <a-range-picker @change="onChangeBeginday" v-model="queryParam.tjrq" :default-value="[undefined, moment(new Date(), 'YYYY/MM/DD')]"  />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('业务量明细查询')" v-has="'ywlmxcx:exportXls'">导出</a-button>
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
        rowKey="id"
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

    <!-- 表单区域 -->
    <ywlmxcx-modal ref="modalForm" @ok="modalFormOk"></ywlmxcx-modal>
  </a-card>
</template>

<script>
  import YwlmxcxModal from './modules/YwlmxcxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {filterObj} from "@/utils/util";
  import moment from 'moment'

  export default {
    name: "YwlmxcxList",
    mixins:[JeecgListMixin],
    components: {
      YwlmxcxModal,JTreeSelect
    },
    data () {
      return {
        description: '业务量明细查询管理页面',
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
            title: '组织标志',
            align:"center",
            dataIndex: 'zzbz'
          },
          {
            title: '组织名称',
            align:"center",
            dataIndex: 'zzbz_dictText'
          },
          {
            title: '岗位标识',
            align:"center",
            dataIndex: 'gwbz'
          },
          {
            title: '岗位名称',
            align:"center",
            dataIndex: 'gwbz_dictText'
          },
          {
            title: '员工工号',
            align:"center",
            dataIndex: 'yggh'
          },
          {
            title: '员工姓名',
            align:"center",
            dataIndex: 'yggh_dictText'
          },
          {
            title: '柜员号',
            align:"center",
            dataIndex: 'gyh'
          },
          {
            title: '交易日期',
            align:"center",
            dataIndex: 'tjrq'
          },
          {
            title: '交易码',
            align:"center",
            dataIndex: 'jym'
          },
          {
            title: '交易码名称',
            align:"center",
            dataIndex: 'jymmc_dictText'
          },
          {
            title: '交易笔数',
            align:"center",
            dataIndex: 'jybs'
          },
          {
            title: '现金流量',
            align:"center",
            dataIndex: 'xjjyje'
          },
          {
            title: '折算后笔数',
            align:"center",
            dataIndex: 'zshjybs'
          },
          /*{
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/ywlmxcx/ywlmxcx/list",
          delete: "/ywlmxcx/ywlmxcx/delete",
          deleteBatch: "/ywlmxcx/ywlmxcx/deleteBatch",
          exportXlsUrl: "ywlmxcx/ywlmxcx/exportXls",
          importExcelUrl: "ywlmxcx/ywlmxcx/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created () {
      this.queryParam.tjrq_end = moment(new Date()).format('YYYY-MM-DD');
    },
    methods: {
      moment,
      onChangeBeginday: function(value, dateString) {
        let tjrqString = dateString
        this.queryParam.tjrq_begin = tjrqString[0]
        this.queryParam.tjrq_end = tjrqString[1]
      },

      getQueryParams(){
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.tjrq;
        return filterObj(param);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>