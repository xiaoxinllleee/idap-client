<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据日期">
              <a-date-picker placeholder="请选择数据日期" v-model="queryParam.sjrq"  :defaultValue="defaultMonthOpera"
                             :format="monthFormat" style="width: 100%;" @change="beforeUpload"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh"
                             dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="总户数">
              <a-input placeholder="请输入总户数" v-model="queryParam.zhs"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="评级授信户数">
              <a-input placeholder="请输入评级授信户数" v-model="queryParam.pjsxhs"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="评级授信金额">
              <a-input placeholder="请输入评级授信金额" v-model="queryParam.pjsxje"></a-input>
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
      <!--<a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('支行评级授信统计报表')" v-has="'ZhPjsxtjbb:exp'">导出</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button icon="import">导入</a-button>
      </a-upload>-->
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
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="pjsxhs" slot-scope="pjsxhs,record">
          <a @click="pjsxtjmx(record)">{{pjsxhs}}</a>
        </span>
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
    <zhPjsxtjbb-modal ref="zhPjsxtjbbModal"></zhPjsxtjbb-modal>
  </a-card>
</template>

<script>
  import ZhPjsxtjbbModal from './ZhPjsxtjbbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import moment from 'moment'
  import { filterObj } from '@/utils/util'
  import { putAction } from '@api/manage'
  import JTreeSelectNotJg from '@comp/jeecg/JTreeSelectNotJg'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'

  export default {
    name: "ZhPjsxtjbbList",
    mixins:[JeecgListMixin],
    components: {
      ZhPjsxtjbbModal,JTreeSelectNotJg,JTreeSelect
    },
    data () {
      return {
        description: '支行评级授信统计报表管理页面',
        // 表头
        monthFormat: 'YYYY-MM-DD',
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
            title: '数据日期',
            align:"center",
            dataIndex: 'sjrq'
           },
		   {
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh_dictText'
           },
		   {
            title: '总户数',
            align:"center",
            dataIndex: 'zhs'
           },
		   {
            title: '评级授信户数',
            align:"center",
            dataIndex: 'pjsxhs',
         scopedSlots: { customRender: 'pjsxhs' }
           },
		   {
            title: '评级授信金额',
            align:"center",
            dataIndex: 'pjsxje'
           },
          {
            title: '录入人',
            align:"center",
            dataIndex: 'createBy'
          },
          {
            title: '录入时间',
            align:"center",
            dataIndex: 'createTime'
          },
         /* {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/zhPjsxtjbb/zhPjsxtjbb/list",
          delete: "/zhPjsxtjbb/zhPjsxtjbb/delete",
          deleteBatch: "/zhPjsxtjbb/zhPjsxtjbb/deleteBatch",
          exportXlsUrl: "zhPjsxtjbb/zhPjsxtjbb/exportXls",
          importExcelUrl: "zhPjsxtjbb/zhPjsxtjbb/importExcel",
          init: "zhPjsxtjbb/zhPjsxtjbb/init",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      beforeUpload() {
        if (this.queryParam.sjrq){
          this.queryParam.sjrq.format("YYYY-MM-DD");
        }
      },

      pjsxtjmx(record){
        console.log("zhpjsxtjbbModal")
        console.log(record)
        this.$refs.zhPjsxtjbbModal.init(record);
      },

      getQueryParams () {
        //获取查询条件
        let sqp = {}
        let tjMoment=""
        if (this.superQueryParams) {
          sqp['superQueryParams'] = encodeURI(this.superQueryParams)
        }
        if (this.queryParam.sjrq) {
          tjMoment=moment(this.queryParam.sjrq).format("YYYY-MM-DD")
        }
        var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        param.sjrq = tjMoment
        return filterObj(param)
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>