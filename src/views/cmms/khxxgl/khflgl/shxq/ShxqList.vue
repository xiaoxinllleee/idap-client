<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="归属网格">
              <!--<JTreeSelectNotJg placeholder="请选择归属网格"-->
                                <!--v-model="queryParam.wgbh"-->
                                <!--treeNodeFilterProp="title"-->
                                <!--pidField="PARENT_ID"-->
                                <!--dict="YXDYGL_MAIN,WGMC,ID"-->
                                <!--pidValue="0"-->
                                <!--:showSearch="true"-->
                                <!--:treeDefaultExpandAll="true"/>-->
              <a-tree-select
                :treeData=sswgTreeDateoptions
                :replaceFields=replaceFields
                v-model="queryParam.wgbh"
                :dropdownStyle="{maxHeight:'400px',overflow:'auto'}"
                showSearch
                treeNodeFilterProp="title"
              >
              </a-tree-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="归属机构">
              <j-tree-select placeholder="请选择所属机构"
                             v-model="queryParam.jgdm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="商户名称">
              <a-input placeholder="请输入商户名称" v-model="queryParam.shmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="法定代表人">
              <a-input placeholder="请输入法定代表人" v-model="queryParam.fddbr"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="法人证件号码">
              <a-input placeholder="请输入法人证件号码" v-model="queryParam.frzjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="商户分类">
              <j-dict-select-tag placeholder="请选择商户分类" v-model="queryParam.shfl" dict-code="shgl_shfl"></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="是否有效走访">
              <j-dict-select-tag v-model="queryParam.sfyxzf" placeholder="请选择是否有效走访" dictCode="sfbz"/>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'Shxq:add'">新增</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('商户信息')" v-has="'Shxq:exp'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'Shxq:imp'">导入</a-button>
      <a-button icon="area-chart" :loading="loadingInit" @click="initData" v-has="'Shxq:init'">同步数据</a-button>

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
        :scroll="{ x: 5000 }"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'Shxq:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown v-has="'Shxq:del'">
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
        <span slot="detail" slot-scope="shmc,record">
          <a @click="handlepjsxjdmxEdit(record)">{{shmc}}</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <shxq-modal ref="modalForm" @ok="modalFormOk"></shxq-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
    <ShjbxxxXqModal ref="ShjbxxxXqModal"></ShjbxxxXqModal>
  </a-card>
</template>

<script>
  import ShjbxxxXqModal from './modules/ShjbxxxXqModal'
  import ShxqModal from './modules/ShxqModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JTreeSelectNotJg from '@/components/jeecg/JTreeSelectNotJg'
  import ExcelImport from '@/components/common/ExcelImport'
  import { putAction, getAction } from '@api/manage'
  export default {
    name: "ShcjxxList",
    mixins:[JeecgListMixin],
    components: {
      ShxqModal,JTreeSelect,JTreeSelectNotJg,ExcelImport,ShjbxxxXqModal
    },
    data () {
      return {
        description: '商户户采集信息管理页面',
        // 表头
        loadingInit: false,
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
            title: '归属网格',
            align:"center",
            dataIndex: 'wgbh_dictText',
            width:100,
           },
		   {
            title: '归属机构',
            align:"center",
            dataIndex: 'jgdm_dictText',
             width:100,
           },
		   {
            title: '商户名称',
            align:"center",
            dataIndex: 'shmc',
            width:200,
            scopedSlots: { customRender: 'detail' }
       }
           ,
          {
            title: '统一社会信用代码',
            align:"center",
            dataIndex: 'tyshxydm'
          },
          {
            title: '营业执照',
            align:"center",
            dataIndex: 'yyzz'
          },
          {
            title: '纳税人识别号',
            align:"center",
            dataIndex: 'nsrsbh'
          },
		   {
            title: '法定代表人',
            align:"center",
            dataIndex: 'fddbr'
           },
		   {
            title: '法人证件号码',
            align:"center",
            dataIndex: 'frzjhm'
           },


		   {
            title: '组织机构代码',
            align:"center",
            dataIndex: 'zzjgdm'
           },
		   {
            title: '注册号',
            align:"center",
            dataIndex: 'zch'
           },
		   {
            title: '经营状态',
            align:"center",
            dataIndex: 'jyzt_dictText'
           },
		   {
            title: '注册资本',
            align:"center",
            dataIndex: 'zccb'
           },
		   {
            title: '成立日期',
            align:"center",
            dataIndex: 'clrq'
           },
		   {
            title: '联系方式',
            align:"center",
            dataIndex: 'lsfs'
           },
		   {
            title: '更多联系方式',
            align:"center",
            dataIndex: 'gdlsfs'
           },
		   {
            title: '邮箱地址',
            align:"center",
            dataIndex: 'yxdz'
           },
		   {
            title: '更多邮箱地址',
            align:"center",
            dataIndex: 'gdyxdz'
           },
		   {
            title: '地址',
            align:"center",
            dataIndex: 'dz',
            width: 200,
            ellipsis: true,
           },
          {
            title: '是否有效走访',
            align:"center",
            dataIndex: 'sfyxzf_dictText'
          },
          {
            title: '走访人',
            align:"center",
            dataIndex: 'xgr_dictText'
          },
          {
            title: '走访时间',
            align:"center",
            dataIndex: 'xgsj'
          },
		   {
            title: '参保人数',
            align:"center",
            dataIndex: 'cbrs'
           },
		   {
            title: '商户类型',
            align:"center",
            dataIndex: 'shlx_dictText'
           },
		   {
            title: '所属行业',
            align:"center",
            dataIndex: 'sshy'
           },
		   {
            title: '曾用名',
            align:"center",
            dataIndex: 'cym'
           },
		   {
            title: '网址',
            align:"center",
            dataIndex: 'wz'
           },
		   {
            title: '经营范围',
            align:"center",
            dataIndex: 'jyfw',
            width: 200,
            ellipsis: true,
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'bz'
           },
		   {
            title: '档案编号',
            align:"center",
            dataIndex: 'dabh'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
            width:120, fixed: 'right',
          }
        ],
		url: {
          list: "/khflgl/shxq/list",
          delete: "/khflgl/shxq/delete",
          deleteBatch: "/khflgl/shxq/deleteBatch",
          exportXlsUrl: "khflgl/shxq/exportXls",
          importExcelUrl: "khflgl/shxq/importExcel",
          exportTemplateUrl: "/khflgl/shxq/exportTemplateXls",
          extract:"/khflgl/shxq/extract",
    },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created() {
      getAction('/yxdyglmain/yxdyglMain/getWgxxTreeDateBySskhjl', {wgxz: '6'}).then(res => {
        if (res.success) {
          this.sswgTreeDateoptions = res.result
        }
      })
      this.loadData(1);
    },
    methods: {
      handlepjsxjdmxEdit(record){
        this.$refs.ShjbxxxXqModal.edit(record);
        this.$refs.ShjbxxxXqModal.title = "详情";
        this.$refs.ShjbxxxXqModal.disableSubmit = true;
      },
      excelImport(){
        let params = {}
        params.exportTemplateUrl = this.url.exportTemplateUrl
        params.importExcelUrl = this.importExcelUrl
        params.exportTemplateName = "商户信息导入模板"
        this.$refs.excelImportModal.showModal(params);
      },
      initData() {
        this.loadingInit = true
        putAction(this.url.extract, {}).then((res) => {
          if (res.success) {
            this.$message.success("提取成功")
          } else {
            this.$message.warning("提取失败")
          }
        }).catch((error) => {
          this.$message.error("提取失败", error)
        }).finally(() => {
          this.loadingInit = false
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>