<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="组织标识">
              <j-tree-select placeholder="请选择组织机构"
                             v-model="queryParam.zzbz"
                             treeNodeFilterProp="title"
                             pid-field="sjzzbz"
                             dict="hr_bas_organization, zzjc, zzbz"
                             getAllZzjg="1"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="岗位名称">
              <j-dict-select-tag
                placeholder="全部"
                v-model="queryParam.gwbz"
                dictCode="Hr_bas_post,gwmc,gwbz"
              />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="考试时间">
              <a-date-picker placeholder="请选择考试时间" v-model="queryParam.kssj" @change="onChange" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="考试类型">
              <a-select placeholder="全部" v-model="queryParam.kslx">
                <a-select-option value="1">
                  开卷
                </a-select-option>
                <a-select-option value="2">
                  闭卷
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <!--<a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>-->
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button icon="download" @click="handleExportXls('培训考试评分')" v-has="'Pxkspf:exp'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'Pxkspf:imp'">导入</a-button>
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
          <a @click="handleEdit(record)" v-has="'Pxkspf:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                  <a v-has="'Pxkspf:del'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->
    <excel-import ref="excelImportModal" @ok="importComplete"/>
    <!-- 表单区域 -->
    <pxkspf-modal ref="modalForm" @ok="modalFormOk"></pxkspf-modal>
  </a-card>
</template>

<script>
  import PxkspfModal from './modules/PxkspfModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ACol from "ant-design-vue/es/grid/Col";
  import AFormItem from "ant-design-vue/es/form/FormItem";
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {deleteAction} from "@/api/manage";
  import ExcelImport from '@comp/common/ExcelImport'

  export default {
    name: "PxkspfList",
    mixins:[JeecgListMixin],
    components: {
      AFormItem,
      ACol,
      PxkspfModal,
      JTreeSelect,
      ExcelImport
    },
    data () {
      return {
        description: '培训考试评分管理页面',
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
            title: '机构名称',
            align:"center",
            dataIndex: 'zzbz_dictText'
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
            title: '客户经理标识',
            align:"center",
            dataIndex: 'khjlbz'
          },
          {
            title: '客户经理姓名',
            align:"center",
            dataIndex: 'yggh_dictText'
          },
          {
            title: '考试时间',
            align:"center",
            dataIndex: 'kssj'
          },
		   {
            title: '考试名称',
            align:"center",
            dataIndex: 'ksmc'
           },
		   {
            title: '考试描述',
            align:"center",
            dataIndex: 'ksms'
           },
		   {
            title: '考试得分',
            align:"center",
            dataIndex: 'ksdf'
           },
		   {
            title: '考试类型',
            align:"center",
            dataIndex: 'kslx_dictText'
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
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/pxkspf/pxkspf/list",
          delete: "/pxkspf/pxkspf/delete",
          deleteBatch: "/pxkspf/pxkspf/deleteBatch",
          exportXlsUrl: "pxkspf/pxkspf/exportXls",
          importExcelUrl: "pxkspf/pxkspf/importExcel",
          exportTemplateUrl: "/pxkspf/pxkspf/exportTemplateXls",
       },
        exportTemplateName:'培训考试评分管理导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      onChange(date,dateString){
        this.queryParam.kssj=dateString;
      },
      handleAdd: function () {
        this.$refs.modalForm.add();
        this.$refs.modalForm.title = "新增";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = false;
      },
      handleEdit: function (record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = true;
      },
      handleDelete: function (record) {
        console.log(record)
        if(!this.url.delete){
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        deleteAction(that.url.delete, {zzbz: record.zzbz,gwbz: record.gwbz,yggh: record.yggh,kssj: record.kssj}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>