<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="机构代码">
            <j-tree-select placeholder="请选择机构"
                           v-model="queryParam.ywjg"
                           treeNodeFilterProp="title"
                           pid-field="sjywjgdm"
                           dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                           :showSearch="true"
                           :treeDefaultExpandAll="true"/>
          </a-form-item></a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="无关联人类型">
              <a-select placeholder="请选择无关联人类型" v-model="queryParam.wglrlx">
                <a-select-option value="1">
                  全部
                </a-select-option>
                <a-select-option value="2">
                  无配偶
                </a-select-option>
                <a-select-option value="3">
                  无父母与子女
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属业务种类">
              <a-select placeholder="请选择所属业务种类" v-model="queryParam.ssywzl">
                <a-select-option value="1">
                  表内贷款
                </a-select-option>
                <a-select-option value="2">
                  贷记卡
                </a-select-option>
                <a-select-option value="3">
                  表外贷款
                </a-select-option>
              </a-select>
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
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('无关联人明细')" v-has="'wglrmx:exportXls'">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <!--<a-button type="primary" icon="import">导入</a-button>-->
      </a-upload>
      <a-button  @click="init" icon="area-chart" v-has="'wglrmx:init'">提取</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
<!--        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
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

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <wglrmx-modal ref="modalForm" @ok="modalFormOk"></wglrmx-modal>
  </a-card>
</template>

<script>
  import WglrmxModal from './modules/WglrmxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { getAction } from '@/api/manage'

  export default {
    name: "WglrmxList",
    mixins:[JeecgListMixin],
    components: {
      WglrmxModal,JTreeSelect
    },
    data () {
      return {
        description: '无关联人明细管理页面',
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
            title: '业务机构',
            align:"center",
            dataIndex: 'ywjg'
          },
		   {
            title: '业务机构名称',
            align:"center",
            dataIndex: 'ywjg_dictText'
           },
		   {
            title: '证件号码',
            align:"center",
            width: 200,
            dataIndex: 'zjhm'
           },
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
           },
		   {
            title: '无关联人类型',
            align:"center",
            dataIndex: 'wglrlx_dictText'
           },
		   {
            title: '所属业务种类',
            align:"center",
            dataIndex: 'ssywzl_dictText'
           },
		   /*{
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
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
           },*/
        ],
		url: {
          list: "/wglrmx/wglrmx/list",
          delete: "/wglrmx/wglrmx/delete",
          deleteBatch: "/wglrmx/wglrmx/deleteBatch",
          exportXlsUrl: "wglrmx/wglrmx/exportXls",
          importExcelUrl: "wglrmx/wglrmx/importExcel",
          init: "/wglrmx/wglrmx/init",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      init(){
        this.loading=true;
        getAction(this.url.init).then((response)=>{
          if(response.success){
            this.$message.success('提取成功！')
            this.loadData(1)
          }else {
            this.$message.warning('提取失败！')
          }
        }).catch((error) => {
          this.$message.error('提取失败！')
        }).finally(()=>{
          this.loading=false;
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>