<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-input placeholder="请输入统计月份" v-model="queryParam.tjyf"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="组织标志">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.zzbz"
                             dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             show-search :showSearch="true" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="false"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="岗位标识">
              <j-dict-select-tag v-model="queryParam.gwbz" placeholder="请选择岗位标识"
                                 dictCode="hr_bas_post,gwmc,gwbz"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工姓名">
              <j-input placeholder="请输入员工姓名" v-model="queryParam.ygxm"></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户经理标识">
              <a-input placeholder="请输入客户经理标识" v-model="queryParam.khjlbz"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="柜员号">
              <a-input placeholder="请输入柜员号" v-model="queryParam.gyh"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="入岗类型">
                <a-input placeholder="请输入入岗类型" v-model="queryParam.rglx"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="是否参与考核">
                <j-dict-select-tag v-model="queryParam.sfcykh" placeholder="请选择是否参与考核" dictCode="sfbz"/>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="是否临退休">
                <j-dict-select-tag v-model="queryParam.sfltx" placeholder="请选择是否临退休" dictCode="sfbz"/>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="入岗日期">
                <j-date v-model="queryParam.rgrq" style="width: 100%;"></j-date>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="离岗日期">
                <j-date v-model="queryParam.lgrq" style="width: 100%;"></j-date>
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
      <!--<a-button @click="handleAdd" type="primary" icon="plus">提取</a-button>-->
      <a-button icon="download" @click="handleExportXls('员工岗位信息月统计')">导出</a-button>
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
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">
          <span slot="sfcykhTag" slot-scope="text, record">
            <a-tag v-if="record.sfcykh=='1'" color="blue">
              {{record.sfcykh_dictText}}
            </a-tag>
            <a-tag v-else-if="record.sfcykh=='2'" color="pink">
              {{record.sfcykh_dictText}}
            </a-tag>
          </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <hrBasStaffpostM-modal ref="modalForm" @ok="modalFormOk"></hrBasStaffpostM-modal>
  </a-card>
</template>

<script>
  import HrBasStaffpostMModal from './modules/HrBasStaffpostMModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JInput from "@/components/jeecg/JInput";
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JDate from '@/components/jeecg/JDate'

  export default {
    name: "HrBasStaffpostMList",
    mixins:[JeecgListMixin],
    components: {
      HrBasStaffpostMModal, JTreeSelect, JInput, JDate
    },
    data () {
      return {
        description: '员工岗位信息月统计管理页面',
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
            title: '统计月份',
            align:"center",
            dataIndex: 'tjyf'
           },
		   {
            title: '组织标识',
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
            dataIndex: 'yggh_dictText',
            scopedSlots: { customRender: 'detail' },
          },
          {
            title: '客户经理标识',
            align:"center",
            dataIndex: 'khjlbz'
          },
          {
            title: '柜员号',
            align:"center",
            dataIndex: 'gyh'
          },
		   {
            title: '入岗类型',
            align:"center",
            dataIndex: 'rglx_dictText'
           },
		   {
            title: '入岗日期',
            align:"center",
            dataIndex: 'rgrq'
           },
		   {
            title: '离岗日期',
            align:"center",
            dataIndex: 'lgrq'
           },
		   {
            title: '是否参与考核',
            align:"center",
            dataIndex: 'sfcykh_dictText',
            scopedSlots: { customRender: 'sfcykhTag' },
           },
		   {
            title: '是否临退休',
            align:"center",
            dataIndex: 'sfltx_dictText'
           },
        ],
		url: {
          list: "/yggwxxytj/hrBasStaffpostM/list",
          delete: "/yggwxxytj/hrBasStaffpostM/delete",
          deleteBatch: "/yggwxxytj/hrBasStaffpostM/deleteBatch",
          exportXlsUrl: "yggwxxytj/hrBasStaffpostM/exportXls",
          importExcelUrl: "yggwxxytj/hrBasStaffpostM/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
     
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>