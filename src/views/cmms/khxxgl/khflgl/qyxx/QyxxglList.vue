<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="归属网格">
              <JTreeSelectNotJg placeholder="请选择归属网格"
                                v-model="queryParam.wgbh"
                                treeNodeFilterProp="title"
                                pidField="PARENT_ID"
                                dict="YXDYGL_MAIN,WGMC,ID"
                                pidValue="0"
                                :showSearch="true"
                                :treeDefaultExpandAll="true"/>            </a-form-item>
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
            <a-form-item label="企业名称">
              <a-input placeholder="请输入企业名称" v-model="queryParam.qymc"></a-input>
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
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('企业信息')">导出</a-button>
      <a-button icon="import" @click="excelImport">导入</a-button>
      <a-button icon="area-chart" :loading="loadingInit" @click="initData">同步数据</a-button>

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
        :scroll="{ x: 5000 }"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
       <!--   <a @click="handleEdit(record)">编辑</a>-->
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
         <!-- <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>

              </a-menu-item>
            </a-menu>
          </a-dropdown>-->
        </span>
        <span slot="detail" slot-scope="qymc,record">
          <a @click="handlepjsxjdmxEdit(record)">{{qymc}}</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->
    <excel-import ref="excelImportModal" @ok="importComplete"/>
    <!-- 表单区域 -->
    <qyxxgl-modal ref="modalForm" @ok="modalFormOk"></qyxxgl-modal>
    <QyjbxxXqModal ref="QyjbxxXqModal"></QyjbxxXqModal>
  </a-card>
</template>

<script>
  import QyxxglModal from './modules/QyxxglModal'
  import QyjbxxXqModal from './modules/QyjbxxXqModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from "@comp/common/ExcelImport";
  import JTreeSelect from "@comp/jeecg/JTreeSelect";
  import JTreeSelectNotJg from "@comp/jeecg/JTreeSelectNotJg";
  import {putAction} from "@api/manage";

  export default {
    name: "QyxxglList",
    mixins:[JeecgListMixin],
    components: {
      QyxxglModal,ExcelImport,JTreeSelect,JTreeSelectNotJg,QyjbxxXqModal
    },
    data () {
      return {
        description: '企业信息管理页面',
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
            title: '企业名称',
            align:"center",
            dataIndex: 'qymc',
            width:200,
         scopedSlots: { customRender: 'detail' }
           },
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
            dataIndex: 'zczb'
           },
		   {
            title: '注册时间',
            align:"center",
            dataIndex: 'zcsj'
           },
		   {
            title: '企业联系电话',
            align:"center",
            dataIndex: 'qylxdh'
           },
		   {
            title: '法人联系电话',
            align:"center",
            dataIndex: 'frlxdh'
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
            title: '注册地址',
            align:"center",
            dataIndex: 'zcdz',
            width: 200,
            ellipsis: true,
           },
		   {
            title: '参保人数',
            align:"center",
            dataIndex: 'cbrs'
           },
		   {
            title: '企业类型',
            align:"center",
            dataIndex: 'qylx_dictText'
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
          list: "/qyxx/qyxxgl/list",
          delete: "/qyxx/qyxxgl/delete",
          deleteBatch: "/qyxx/qyxxgl/deleteBatch",
          exportXlsUrl: "qyxx/qyxxgl/exportXls",
          importExcelUrl: "qyxx/qyxxgl/importExcel",
          exportTemplateUrl: "/qyxx/qyxxgl/exportTemplateXls",
          extract:"/qyxx/qyxxgl/extract",
       },
        exportTemplateName: '企业信息导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      handlepjsxjdmxEdit(record){
        this.$refs.QyjbxxXqModal.edit(record);
        this.$refs.QyjbxxXqModal.title = "详情";
        this.$refs.QyjbxxXqModal.disableSubmit = true;
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