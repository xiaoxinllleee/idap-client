<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <!--<a-month-picker placeholder="请选择统计月份" style="width: 100%;" :format="monthFormat"-->
                              <!--:defaultValue="defaultMonthOpera" v-model="queryParam.gzrq"></a-month-picker>-->
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.gzrq" :format="DateFormat"
                              @change="gzrqChange" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="考核项目">
              <j-dict-select-tag placeholder="请选择考核项目" v-model="queryParam.schemeId" dict-code="V_PMA_A_SCHEME,SHOW_NAME,SCHEME_ID,evl_obj_type!=3" :showSearch="true"  />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构名称">
              <j-tree-select placeholder="请选择机构查询"
                             v-model="queryParam.zzbz"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ"
                             pidField="sjzzbz"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="指标ID">
              <a-input  placeholder="请输入指标ID" v-model="queryParam.zbid"/>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="指标类别">
              <j-dict-select-tag placeholder="请选择指标类别" v-model="queryParam.zblb" dict-code="zblb" :showSearch="true"  />
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('机构考核结果')" v-has="'Jgkhjg:exp'">导出</a-button>
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
        :scroll="{ x: 1200 }"
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

    <!-- 表单区域 -->
    <jgkhjg-modal ref="modalForm" @ok="modalFormOk"></jgkhjg-modal>
  </a-card>
</template>

<script>
  import JgkhjgModal from './modules/JgkhjgModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util'
  import moment from 'moment'

  export default {
    name: "JgkhjgList",
    mixins:[JeecgListMixin],
    components: {
      JgkhjgModal,JTreeSelect
    },
    data () {
      return {
        description: '机构考核结果管理页面',
        // 表头
        monthFormat: 'YYYY-MM',
        DateFormat: 'YYYY-MM-DD',
        // 默认当前月份
        defaultMonthOpera: '',
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
            dataIndex: 'gzrq',
         width: 100,
           },
		   {
            title: '考核项目',
            align:"center",
            dataIndex: 'schemeId_dictText',
         width: 150,
           },
		   {
            title: '机构名称',
            align:"center",
            dataIndex: 'zzbz_dictText'
           },
		   {
            title: '指标标识',
            align:"center",
            dataIndex: 'zbid'
           },
          {
            title: '指标名称',
            align:"center",
            dataIndex: 'zbid_dictText'
          },
		   {
            title: '指标类别',
            align:"center",
            dataIndex: 'zblb_dictText'
           },
		   {
            title: '指标结果',
            align:"center",
            dataIndex: 'zbjg'
           },
          {
            title: '指标分值',
            align:"center",
            dataIndex: 'zbfz'
          },
		   {
            title: '指标得分',
            align:"center",
            dataIndex: 'zbdf'
           },
          {
            title: '指标任务',
            align:"center",
            dataIndex: 'zbrw'
          },
		   {
            title: '指标工资',
            align:"center",
            dataIndex: 'zbgz'
           },
		   // {
       //      title: '指标单价',
       //      align:"center",
       //      dataIndex: 'zbdj'
       //     },
		   // {
       //      title: '指标单位',
       //      align:"center",
       //      dataIndex: 'zbdw'
       //     },
		   // {
       //      title: '指标权重',
       //      align:"center",
       //      dataIndex: 'zbqz'
       //     },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'bz'
           },

        ],
		url: {
          list: "/jgkhjg/jgkhjg/list",
          delete: "/jgkhjg/jgkhjg/delete",
          deleteBatch: "/jgkhjg/jgkhjg/deleteBatch",
          exportXlsUrl: "/jgkhjg/jgkhjg/exportXls",
          importExcelUrl: "jgkhjg/jgkhjg/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created() {
      this.defaultMonthOpera = moment(new Date(), this.monthFormat);
      // this.queryParam = {gzrq: undefined};
      // this.queryParam.gzrq=this.defaultMonthOpera
    },
    methods: {
      gzrqChange:function(value, dateString) {
        this.queryParam.gzrq_begin = dateString[0]
        this.queryParam.gzrq_end = dateString[1]
      },
      getQueryParams() {
        // if (this.queryParam.gzrq) {
        //   this.queryParam.gzrq = moment(this.queryParam.gzrq).format("YYYY-MM")+'-01';
        // }
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.gzrq
        return filterObj(param);
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>