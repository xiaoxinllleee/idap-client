<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8"><a-form-item label="所属机构">
            <j-tree-select placeholder="请选择所属机构" v-model="queryParam.jgdm" dict="v_hr_bas_organization_cmms,ZZJC,ywjgdm"
                           treeNodeFilterProp="title" pidField="sjywjgdm" :treeDefaultExpandAll="true" :show-search="false" :isAll="isAll"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="客户名称">
            <j-input placeholder="请输入客户名称" v-model="queryParam.khmc" type="likemore"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="证件号码">
            <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"/>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item label="是否开通存款业务">
              <j-dict-select-tag placeholder="请选择是否开通存款业务" v-model="queryParam.sfktckyw" dictCode="sfbz"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="是否开通贷款业务">
            <j-dict-select-tag placeholder="请选择是否开通贷款业务" v-model="queryParam.sfktdkyw" dictCode="sfbz"/>
          </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="客户类型">
              <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam.khlx" dictCode="lldjkhlx"/>
            </a-form-item></a-col>
          </template>

          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button @click="handleExtract" type="primary" icon="cloud-download">提取</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('存量客户')">导出</a-button>
      <!--<a-button type="primary" icon="import" @click="excelImport">导入</a-button>-->
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
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600;">{{ selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px;" @click="onClearSelected">清空</a>
      </div>

      <a-table bordered
               ref="table"
               size="middle"
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :scroll="{ x: 1300 }"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">
        <span slot="zjhm" slot-scope="text">
          <j-ellipsis :value="text" :length="18"/>
        </span>
        <span slot="dz" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>

        <span slot="detail" slot-scope="khmc, record">
          <a @click="handleDetailClkh(record)">{{khmc}}</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <clgrkh-modal ref="grmodalForm" @ok="modalFormOk"></clgrkh-modal>
    <clqykh-modal ref="qymodalForm" @ok="modalFormOk"></clqykh-modal>
    <excel-import ref="excelImportModal"></excel-import>
  </a-card>
</template>

<script>
  import clgrkhModal from './modules/ClgrkhModal'
  import clqykhModal from './modules/ClqykhModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import ExcelImport from '@/components/common/ExcelImport'
  import { postAction, getAction, putAction } from '@/api/manage'
  import JInput from '../../../components/jeecg/JInput'
  import JEllipsis from '../../../components/jeecg/JEllipsis'
  import store from '@/store/'

  export default {
    name: "ClkhList",
    mixins:[JeecgListMixin],
    components: {
      JEllipsis,
      JInput,
      clgrkhModal,clqykhModal,JTreeSelect,ExcelImport
    },
    data () {
      return {
        description: '存量客户管理页面',
        queryParam: {},
        isAll: false,
        isorter: {
          order: 'desc',
        },
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title: '机构代码',
            align: "center",
            dataIndex: 'jgdm',
            width: 100,
            sorter: true,
          },
		      {
            title: '机构名称',
            align: "center",
            dataIndex: 'jgdm_dictText',
            width: 150,
            sorter: true,
          },
		      // {
          //   title: '客户编号',
          //   align: "center",
          //   dataIndex: 'khbh',
          //   scopedSlots: {customRender: 'khbh'},
          //   width: 150,
          //   sorter: true,
          // },
		      {
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc',
            // scopedSlots: {customRender: 'detail'},
            width: 150,
          },
		      {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            scopedSlots: {customRender: 'zjhm'},
            width: 160,
          },
		      {
            title: '客户类型',
            align: "center",
            dataIndex: 'khlx_dictText',
            width: 100,
          },
          {
            title: '性别',
            align: "center",
            dataIndex: 'xb_dictText',
            width: 80,
          },
          {
            title: '年龄',
            align: "center",
            dataIndex: 'nl',
            width: 80,
          },
          {
            title: '联系方式',
            align: "center",
            dataIndex: 'lxfs',
            width: 100,
          },
		      {
            title: '地址',
            align: "center",
            dataIndex: 'dz',
            scopedSlots: {customRender: 'dz'},
            width: 150,
          },
		      {
            title: '是否开通存款业务',
            align: "center",
            dataIndex: 'sfktckyw_dictText',
            width: 150,
          },
          {
            title: '存款余额',
            align: "center",
            dataIndex: 'ckye',
            width: 150,
          },
          {
            title: '存款日平余额',
            align: "center",
            dataIndex: 'ckrpye',
            width: 150,
          },
          {
            title: '是否开通贷款业务',
            align: "center",
            dataIndex: 'sfktdkyw_dictText',
            width: 150,
          },
          {
            title: '贷款金额',
            align: "center",
            dataIndex: 'dkje',
            width: 150,
          },
          {
            title: '贷款余额',
            align: "center",
            dataIndex: 'dkye',
            width: 150,
          },
          {
            title: '不良贷款余额',
            align: "center",
            dataIndex: 'bldkye',
            width: 150,
          },
          {
            title: '表外不良贷款余额',
            align: "center",
            dataIndex: 'bwbldkye',
            width: 150,
          },
          {
            title: '是否开通手机银行',
            align: "center",
            dataIndex: 'sfktsjyhyw_dictText',
            width: 150,
          },
          {
            title: '是否办理ETC',
            align: "center",
            dataIndex: 'sfbletcyw_dictText',
            width: 150,
          },
          {
            title: '是否开通社保卡',
            align: "center",
            dataIndex: 'sfktsbk_dictText',
            width: 150,
          },
          // {
          //   title: '操作',
          //   fixed: 'right',
          //   dataIndex: 'action',
          //   scopedSlots: {customRender: 'action'},
          //   align: "center",
          //   width: 100,
          // }
        ],
        url: {
          list: "/khgl/clkhxxgl/list",
          exportXlsUrl: "/khgl/clkhxxgl/exportXls",
          importExcelUrl: "/khgl/clkhxxgl/importExcel",
          exportTemplateUrl: "/khgl/clkhxxgl/exportTemplateXls",
          init: "/khgl/clkhxxgl/init",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      },
    },
    created() {
      this.isAll = store.getters.isRoot
    },
    methods: {
      initQueryParams() {
        console.log('store.getters.userInfo', store.getters.userInfo)
        if(!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.paramsInited = true
      },
      excelImport(){
        let params = {}
        params.exportTemplateUrl = this.url.exportTemplateUrl
        params.importExcelUrl = this.importExcelUrl
        params.exportTemplateName = "存量客户导入模板"
        this.$refs.excelImportModal.showModal(params);
      },
      handleDetailClkh(record) {
        if(record.khlx==1) {
          //个人客户
          this.$refs.grmodalForm.edit(record);
          this.$refs.grmodalForm.title="个人客户信息详情";
          this.$refs.grmodalForm.disableSubmit = true;
        } else if (record.khlx == 2) {
          //企业客户
          this.$refs.qymodalForm.edit(record);
          this.$refs.qymodalForm.title="企业客户信息详情";
          this.$refs.qymodalForm.disableSubmit = true;
        }
      },
      handleEditClkh(record) {
        if(record.khxz==1) {
          //个人客户
          this.$refs.grmodalForm.edit(record);
          this.$refs.grmodalForm.title="个人客户信息编辑";
          this.$refs.grmodalForm.disableSubmit = false;
        } else if (record.khxz == 2) {
          //企业客户
          this.$refs.qymodalForm.edit(record);
          this.$refs.qymodalForm.title="企业客户信息编辑";
          this.$refs.qymodalForm.disableSubmit = false;
        }
      },
      handleExtract() {
        let params = {}
        this.loading = true;
        getAction(this.url.init, params).then((res) => {
          if (res.success) {
            this.loadData()
            this.$message.success(res.message)
          } else {
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })
      },
      searchReset: function() {
        this.queryParam = {}
        if(!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.loadData(1);
      },
    },
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>