<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择支行查询" v-model="queryParam.zzbz"
                             dict="hr_bas_organization,zzjc,zzbz" pidField="sjzzbz" :is-all="isAll"
                             :sszh="true" :showSearch="true" :treeDefaultExpandAll=true treeNodeFilterProp="title"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.khmc" type="likemore"/>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="客户类型">
                <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam.khlx" dict-code="lldj_khlx"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="法人代表">
                <a-input placeholder="请输入法人代表" v-model="queryParam.frdb"></a-input>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="6" :sm="8">
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'khjbxx:add'">新增</a-button>
      <a-button icon="download" @click="handleExportXls('客户基本信息')" v-has="'khjbxx:exportXls'">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
                @change="handleImportExcel">
        <a-button icon="import" v-has="'khjbxx:import'">导入</a-button>
      </a-upload>
      <a-button icon="area-chart" @click="initData" v-has="'khjbxx:init'">提取</a-button>
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
               rowKey="zjhm"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               @change="handleTableChange">

        <span slot="khlx" slot-scope="khlx">
          <a-tag :key="khlx" :color="khlx==='个人'?'#FB6241':khlx==='企业'?'#8A2BE2':'grey'">
            {{ khlx }}
          </a-tag>
        </span>
        <span slot="lrbz" slot-scope="lrbz">
          <a-tag :key="lrbz" :color="lrbz==='导入'?'#24C780':lrbz==='录入'?'#108EE9':lrbz==='修改'?'#8A2BE2':lrbz==='调整'?'#002140':'grey'">
            {{ lrbz }}
          </a-tag>
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record,1)" v-has="'khjbxx:edit'">编辑</a>
          <a-divider type="vertical"/>
          <a @click="handleEdit(record,2)" v-has="'khjbxx:transfer'">转移</a>
          <a-divider type="vertical"/>
          <a-popconfirm title="确定删除吗?" @confirm="()=> handleDelete(record.zjhm)" v-has="'khjbxx:delete'">
            <a>删除</a>
          </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <rate_khjbxxb-modal ref="modalForm" @ok="modalFormOk"></rate_khjbxxb-modal>
  </a-card>
</template>

<script>
  import Rate_khjbxxbModal from './modules/Rate_khjbxxbModal.vue'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JInput from '@/components/jeecg/JInput'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {getAction, putAction, httpAction} from '@/api/manage'
  import {deleteAction} from '../../../../api/manage'
  import {notification} from "ant-design-vue";
  import store from '@/store/'
  import {mapGetters} from "vuex";

  export default {
    name: 'RateKhjbxxbList',
    mixins: [JeecgListMixin],
    components: {
      Rate_khjbxxbModal, JInput, JTreeSelect
    },
    data() {
      return {
        description: '贷款利率定价：客户基本信息管理页面',
        isAll: false,
        sszh: '',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            align: 'center',
            customRender: function (t, r, index) {
              return parseInt(index) + 1
            }
          },
          {
            title: '所属组织',
            align: 'center',
            dataIndex: 'zzbz'
          },
          {
            title: '组织名称',
            align: 'center',
            dataIndex: 'zzbz_dictText'
          },
          {
            title: '证件号码',
            align: 'center',
            dataIndex: 'zjhm'
          },
          {
            title: '客户名称',
            align: 'center',
            dataIndex: 'khmc'
          },
          {
            title: '客户类型',
            align: 'center',
            dataIndex: 'khlx_dictText',
            scopedSlots: {customRender: 'khlx'},
          },
          {
            title: '法人代表',
            align: 'center',
            dataIndex: 'frdb'
          },
          {
            title: '录入时间',
            align: 'center',
            dataIndex: 'lrsj'
          },
          {
            title: '录入操作员',
            align: 'center',
            dataIndex: 'lrczy'
          },
          {
            title: '录入标志',
            align: 'center',
            dataIndex: 'lrbz_dictText',
            scopedSlots: {customRender: 'lrbz'},
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            width: 180,
            scopedSlots: {customRender: 'action'}
          }
        ],
        url: {
          list: '/dklldj.jbxxgl.khxxgl/rate_khjbxxb/list',
          delete: '/dklldj.jbxxgl.khxxgl/rate_khjbxxb/delete',
          deleteBatch: '/dklldj.jbxxgl.khxxgl/rate_khjbxxb/deleteBatch',
          exportXlsUrl: 'dklldj.jbxxgl.khxxgl/rate_khjbxxb/exportXls',
          importExcelUrl: 'dklldj.jbxxgl.khxxgl/rate_khjbxxb/importExcel',
          exportTemplateUrl: 'dklldj.jbxxgl.khxxgl/rate_khjbxxb/exportTemplateXls'
        }
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    created() {
      this.isAll = store.getters.isRoot
      this.sszh  = store.getters.userInfo.orgCode
    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo"]),

      handleAdd: function () {
        this.$refs.modalForm.add();
        this.$refs.modalForm.title = "新增";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.operationflag = 'add';
      },

      handleEdit: function (record, flag) {
        this.$refs.modalForm.edit(record, flag)
        this.$refs.modalForm.title = '编辑'
        this.$refs.modalForm.disableSubmit = false
        this.$refs.modalForm.operationflag = 'edit';
      },

      handleAddUserDepart() {
        this.$refs.selectUserModal.visible = true
        this.$refs.selectUserModal.ceshi()
        this.loadData(1)
      },

      initData() {
        this.loading = true
        putAction('/dklldj.jbxxgl.khxxgl/rate_khjbxxb/extract').then((res) => {
          if (res.success) {
            //this.$message.success('提取成功')
            notification.success({ message: '系统提示', description: '提取成功!', duration: 4})
            this.loadData(1)
          } else {
            //this.$message.warning('提取失败')
            notification.warning({ message: '系统提示', description: '提取失败!', duration: 4})
          }
        }).catch((error) => {
          //this.$message.error('提取失败', error)
          notification.error({ message: '系统提示', description: '提取失败!', duration: 4})
        }).finally(() => {
          this.loading = false
        })
      },

      handleDelete: function (zjhm) {
        if (!this.url.delete) {
          //this.$message.error('请设置url.delete属性!')
          notification.error({ message: '系统提示', description: '请设置url.delete属性!', duration: 4})
          return
        }
        var that = this
        deleteAction(that.url.delete, {zjhm: zjhm}).then((res) => {
          if (res.success) {
            //that.$message.success(res.message)
            notification.success({ message: '系统提示', description: res.message, duration: 4})
            that.loadData()
          } else {
            //that.$message.warning(res.message)
            notification.success({ message: '系统提示', description: res.message, duration: 4})
          }
        })
      },

      initQueryParams() {
        if(!store.getters.isRoot) {
          this.queryParam.zzbz = store.getters.userInfo.orgCode
          console.info('当前查询组织标识:',this.queryParam.zzbz)
        }
        this.paramsInited = true
      },

      searchReset: function() {
        this.queryParam = {}
        if(!store.getters.isRoot) {
          this.queryParam.zzbz = store.getters.userInfo.orgCode
          console.info('当前查询组织标识:',this.queryParam.zzbz)
        }
        this.loadData(1);
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>