<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="所属支行">
              <j-tree-select
                v-model="queryParam.sszh"
                placeholder="请选择支行"
                dict="hr_bas_organization,zzjc,zzbz"
                :sszh="true"
                pidField="sjzzbz"
                :showSearch="true"
                :treeDefaultExpandAll=true
              >
              </j-tree-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="客户名称">
              <j-input  placeholder="请输入客户名称" v-model="queryParam.khmc"></j-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="证件号码">
              <j-input  placeholder="请输入证件号码" v-model="queryParam.zjhm"></j-input>
            </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="贷款账号">
                <j-input  placeholder="请输入贷款账号" v-model="queryParam.acctNo"></j-input>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="6" :sm="8" >
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
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="area-chart"  @click="initData" v-has="'dkcsgl:init'">提取</a-button>
      <a-button icon="download" @click="handleExportXls('贷款催收管理')" style="margin-left: 8px" v-has="'dkcsgl:exportXls'">导出</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
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
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
<!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项-->
<!--        <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
<!--      </div>-->

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
    <dkjkpt_dkcsgl-modal ref="modalForm" @ok="modalFormOk"></dkjkpt_dkcsgl-modal>
  </a-card>
</template>

<script>
  import Dkjkpt_dkcsglModal from './modules/Dkjkpt_dkcsglModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JInput from '@/components/jeecg/JInput'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { getAction,putAction,httpAction } from '@/api/manage'

  export default {
    name: "Dkjkpt_dkcsglList",
    mixins:[JeecgListMixin],
    components: {
      Dkjkpt_dkcsglModal,JInput,JTreeSelect
    },
    data () {
      return {
        description: '1管理页面',
        // 表头
        columns: [
		   {
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh_dictText'
           },
		   {
            title: '所属营销单元',
            align:"center",
            dataIndex: 'ssyxdy_dictText'
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
            title: '贷款账号',
            align:"center",
            dataIndex: 'acctNo'
           },
		   {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText'
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
            title: '到期日期',
            align:"center",
            dataIndex: 'endDate'
           },
		   {
            title: '联系方式',
            align:"center",
            dataIndex: 'lxfs'
           },
		   {
            title: '地址',
            align:"center",
            dataIndex: 'dz'
           },
        ],
		url: {
          list: "/dkjkpt_dkcsgl/dkjkpt_dkcsgl/list",
          delete: "/dkjkpt_dkcsgl/dkjkpt_dkcsgl/delete",
          deleteBatch: "/dkjkpt_dkcsgl/dkjkpt_dkcsgl/deleteBatch",
          exportXlsUrl: "dkjkpt_dkcsgl/dkjkpt_dkcsgl/exportXls",
          importExcelUrl: "dkjkpt_dkcsgl/dkjkpt_dkcsgl/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      initData() {
        var params = this.getQueryParams();
        this.loading=true;
        putAction("dkjkpt_dkcsgl/dkjkpt_dkcsgl/extract").then((res) => {
          if(res.success){
            this.$message.success("提取成功！")
            this.loadData(1)
          }else{
            this.$message.warning("提取失败！")
          }
          this.loading=false;

        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>