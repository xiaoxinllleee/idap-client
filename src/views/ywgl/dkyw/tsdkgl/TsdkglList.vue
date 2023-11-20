<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="机构代码">
            <j-tree-select placeholder="请选择机构代码" v-model="queryParam.jgdm" dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                           pid-field="sjywjgdm" treeNodeFilterProp="title"
                           :showSearch="true" :tree-default-expand-all="true"/>
          </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户类型">
              <a-select placeholder="请选择客户类型" v-model="queryParam.custType">
                <a-select-option value="0">
                  全部
                </a-select-option>
                <a-select-option value="1">
                  对私
                </a-select-option>
                <a-select-option value="2">
                  对公
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款标签">
              <a-select placeholder="请选择贷款标签" v-model="queryParam.dkbq">
                <a-select-option value="0">
                  全部
                </a-select-option>
                <a-select-option value="1">
                  平台贷款
                </a-select-option>
                <a-select-option value="2">
                  股东购买
                </a-select-option>
                <a-select-option value="3">
                  政府购买
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户姓名">
              <a-input placeholder="请输入客户姓名" v-model="queryParam.custName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款账号">
              <a-input placeholder="请输入贷款账号" v-model="queryParam.dkzh"></a-input>
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
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button icon="download" @click="handleExportXls('特殊贷款管理')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button icon="import">导入</a-button>
      </a-upload>
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
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
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
    <tsdkgl-modal ref="modalForm" @ok="modalFormOk"></tsdkgl-modal>
  </a-card>
</template>

<script>
  import TsdkglModal from './modules/TsdkglModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ACol from "ant-design-vue/es/grid/Col";
  import {deleteAction} from "@/api/manage";
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import store from '@/store/'

  export default {
    name: "TsdkglList",
    mixins:[JeecgListMixin],
    components: {
      ACol,
      TsdkglModal,
      JTreeSelect
    },
    data () {
      return {
        description: '特殊贷款管理管理页面',
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
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
           },
          {
            title: '客户姓名',
            align:"center",
            dataIndex: 'custName'
          },
          {
            title: '客户类型',
            align:"center",
            dataIndex: 'custType_dictText'
          },
		   {
            title: '贷款账号',
            align:"center",
            dataIndex: 'dkzh'
           },
		   {
            title: '贷款标签',
            align:"center",
            dataIndex: 'dkbq_dictText'
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
            title: '利率',
            align:"center",
            dataIndex: 'll'
           },
		   {
            title: '担保方式',
            align:"center",
            dataIndex: 'dbfs_dictText'
           },
		   {
            title: '贷款状态',
            align:"center",
            dataIndex: 'dkzt_dictText'
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
            title: '员工考核',
            align:"center",
            dataIndex: 'ygkh_dictText'
           },
		   {
            title: '机构考核',
            align:"center",
            dataIndex: 'jgkh_dictText'
           },
          {
            title: '折扣比例',
            align:"center",
            dataIndex: 'zkbl'
          },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'bz'
           },
          {
            title: '录入标识',
            align:"center",
            dataIndex: 'lrbz_dictText'
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
		   {
            title: '修改人',
            align:"center",
            dataIndex: 'xgr'
           },
		   {
            title: '修改时间',
            align:"center",
            dataIndex: 'xgsj'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/tsdkgl/tsdkgl/list",
          delete: "/tsdkgl/tsdkgl/delete",
          deleteBatch: "/tsdkgl/tsdkgl/deleteBatch",
          exportXlsUrl: "tsdkgl/tsdkgl/exportXls",
          importExcelUrl: "tsdkgl/tsdkgl/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      handleDelete: function (record) {
        console.log(record)
        if(!this.url.delete){
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        deleteAction(that.url.delete, {dkzh:record.dkzh}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },
      searchReset() {
        this.queryParam={jgdm:''};
        if(!store.getters.isRoot) {
          console.log(store.getters.ywjgdm)
          this.queryParam.jgdm = store.getters.ywjgdm
        }
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>