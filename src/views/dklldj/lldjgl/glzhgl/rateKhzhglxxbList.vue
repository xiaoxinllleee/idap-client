<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="组织标识">
              <j-tree-select placeholder="请选择支行查询" v-model="queryParam.zzbz" dict="hr_bas_organization, zzjc, zzbz" pidField="sjzzbz"
                             :sszh="true" :showSearch="true" :treeDefaultExpandAll=true treeNodeFilterProp="title" getAllZzjg="1"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.khmc"></j-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="关联存款账号">
                <j-input placeholder="请输入关联存款账号" v-model="queryParam.ckzh"></j-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="卡号">
                <j-input placeholder="请输入卡号" v-model="queryParam.dyzkh"></j-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="关联账号关系">
                <j-dict-select-tag placeholder="关联账号关系" v-model="queryParam.zhgx" dict-code="zhgx"></j-dict-select-tag>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'glzhgl:add'">新增</a-button>
      <a-button icon="download" @click="handleExportXls('关联账号管理')" v-has="'glzhgl:exportXls'">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
                @change="handleImportExcel">
        <a-button icon="import" v-has="'glzhgl:import'">导入</a-button>
      </a-upload>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
                @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
      <a-button icon="area-chart"  @click="initData" v-has="'glzhgl:init'">提取</a-button>
      <!--<a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table ref="table"
               size="middle"
               bordered
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               @change="handleTableChange">

        <span slot="zhgx" slot-scope="zhgx">
          <a-tag :key="zhgx" :color="zhgx==='本企业(人)'?'#24C780':zhgx==='直系亲属'?'#108EE9':zhgx==='其他关系人'?'#8A2BE2':zhgx==='以他人名义存入本行'?'#002140':'grey'">
            {{ zhgx }}
          </a-tag>
        </span>
        <span slot="lrbz" slot-scope="lrbz">
          <a-tag :key="lrbz" :color="lrbz==='导入'?'#24C780':lrbz==='录入'?'#108EE9':lrbz==='修改'?'#8A2BE2':lrbz==='调整'?'#002140':'grey'">
            {{ lrbz }}
          </a-tag>
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'glzhgl:edit'">编辑</a>
          <a-divider type="vertical" />
           <a-dropdown>
             <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
             <a-menu slot="overlay">
               <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.zjhm,record.ckzh)" v-has="'glzhgl:delete'">
                  <a>删除</a>
                </a-popconfirm>
                <a-popconfirm title="确定删除吗?" @confirm="() => adminDelete(record.zjhm,record.ckzh)" v-has="'glzhgl:adminDelete'">
                  <a>超级删除</a>
                </a-popconfirm>
               </a-menu-item>
             </a-menu>
           </a-dropdown>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <rateKhzhglxxb-modal ref="modalForm" @ok="modalFormOk"></rateKhzhglxxb-modal>

  </a-card>
</template>

<script>
  import rateKhzhglxxbModal from './modules/rateKhzhglxxbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JInput from '@/components/jeecg/JInput'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { putAction } from '@/api/manage'
  import {deleteAction} from "../../../../api/manage";
  import store from '@/store/'
  import {notification} from "ant-design-vue";

  export default {
    name: "rateKhzhglxxbList",
    mixins:[JeecgListMixin],
    components: {
      rateKhzhglxxbModal,
      JInput,
      JTreeSelect
    },
    data () {
      return {
        description: '客户账号关联信息管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
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
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm',
          },
          {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
          },
          {
            title: '关联存款账号',
            align:"center",
            dataIndex: 'ckzh',
          },
          {
            title: '卡号',
            align:"center",
            dataIndex: 'dyzkh',
          },
          {
            title: '关联账号名称',
            align:"center",
            dataIndex: 'zhmc'
          },
          {
            title: '关联账号关系',
            align:"center",
            dataIndex: 'zhgx_dictText',
            scopedSlots: {customRender: 'zhgx'},
          },
          {
            title: '关联账号详细关系',
            align:"center",
            dataIndex: 'glzhxxgx'
          },
          {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
          },
          {
            title: '录入操作员',
            align:"center",
            dataIndex: 'lrczy'
          },
          {
            title: '录入标志',
            align:"center",
            dataIndex: 'lrbz_dictText',
            scopedSlots: {customRender: 'lrbz'},
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            width: 150,
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
          list: "/rateKhzhglxxb/rateKhzhglxxb/list",
          delete: "/rateKhzhglxxb/rateKhzhglxxb/delete",
          adminDelete: "/rateKhzhglxxb/rateKhzhglxxb/adminDelete",
          exportXlsUrl: "rateKhzhglxxb/rateKhzhglxxb/exportXls",
          importExcelUrl: "rateKhzhglxxb/rateKhzhglxxb/importExcel",
          exportTemplateUrl: "rateKhzhglxxb/rateKhzhglxxb/exportTemplateXls",
          initData: "/rateKhzhglxxb/rateKhzhglxxb/extract",
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
        if (this.queryParam.zjhm === "" || this.queryParam.zjhm == null) {
          notification.warning({ message: '系统提示', description: '请输入证件号码!', duration: 4})
          return
        }
        this.loading = true
        putAction(this.url.initData, {'zjhm': this.queryParam.zjhm}).then((res) => {
          if (res.success) {
            notification.success({ message: '系统提示', description: '提取成功!', duration: 4})
            this.loadData(1)
          } else {
            notification.warning({ message: '系统提示', description: '提取失败!'+res.message, duration: 4})
          }
        }).catch((error) => {
          notification.error({ message: '系统提示', description: '提取失败!'+error, duration: 4})
        }).finally(() => {
          this.loading = false
        })
      },

      handleDelete: function (zjhm,ckzh) {
        if (!this.url.delete) {
          notification.error({ message: '系统提示', description: '请设置url.delete属性!', duration: 4})
          return
        }
        var that = this
        that.loading = true
        deleteAction(that.url.delete, {'zjhm': zjhm,'ckzh': ckzh}).then((res) => {
          if (res.success) {
            notification.success({ message: '系统提示', description: res.message, duration: 4})
            that.loadData()
          } else {
            notification.warning({ message: '系统提示', description: res.message, duration: 4})
          }
        }).finally(() => {
          that.loading = false
        })
      },

      adminDelete: function (zjhm,ckzh) {
        if (!this.url.delete) {
          notification.error({ message: '系统提示', description: '请设置url.delete属性!', duration: 4})
          return
        }
        var that = this
        that.loading = true
        deleteAction(that.url.adminDelete, {'zjhm': zjhm,'ckzh': ckzh}).then((res) => {
          if (res.success) {
            notification.success({ message: '系统提示', description: res.message, duration: 4})
            that.loadData()
          } else {
            notification.warning({ message: '系统提示', description: res.message, duration: 4})
          }
        }).finally(() => {
          that.loading = false
        })
      },

      handleAdd: function () {
        this.$refs.modalForm.add();
        this.$refs.modalForm.title = "新增";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.operationFlag = 'add';
      },

      handleEdit: function (record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.operationFlag = 'edit';
      },

      // initQueryParams() {
      //   if (!store.getters.isRoot) {
      //     this.queryParam.zzbz = store.getters.userInfo.orgCode
      //   }
      //   this.paramsInited = true
      // },

      searchReset() {
        this.queryParam = {}
        // if (!store.getters.isRoot) {
        //   this.queryParam.zzbz = store.getters.userInfo.orgCode
        // }
        this.loadData(1)
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>