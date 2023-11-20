<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8"><a-form-item label="指标项目">
            <j-dict-select-tag placeholder="请选择所属指标项目" v-model="queryParam.zbid" dict-code="rate:rate_zbkxxb,zbmc,zbid"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="指标规则ID">
            <j-input placeholder="请输入指标规则ID" v-model="queryParam.zbgzid"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="指标规则名称">
            <j-input placeholder="请输入指标规则名称" v-model="queryParam.zbgzmc" type="likemore"/>
          </a-form-item></a-col>

          <!--<template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item></a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="计分符合">
              <j-dict-select-tag placeholder="请选择计分符合" v-model="queryParam.zbabs" dict-code="abs"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="是否只读">
              <j-dict-select-tag placeholder="请选择是否只读" v-model="queryParam.readonly" dict-code="sfbz"/>
            </a-form-item></a-col>
          </template>-->

          <a-col :md="6" :sm="8" >
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'xmgzsz:add'">新增</a-button>
      <a-button icon="download" @click="handleExportXls('项目规则设置')" v-has="'xmgzsz:exportXls'">导出</a-button>
      <!--<a-button type="primary" icon="import" @click="handleImport">导入</a-button>-->
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
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
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table ref="table"
               size="middle"
               bordered
               rowKey="zbgzid"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               @change="handleTableChange">
        <span slot="zbgzmc" slot-scope="text, record">
          <j-ellipsis :value="text" :length="16"/>
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'xmgzsz:edit'">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'xmgzsz:delete'">
            <a>删除</a>
          </a-popconfirm>
          <!--<a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>-->
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <xmgzsz-modal ref="modalForm" @ok="modalFormOk"/>
    <!--<excel-import ref="excelImportModal" @ok="importComplete"/>-->
  </a-card>
</template>

<script>
  import XmgzszModal from './modules/XmgzszModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '../../../../components/common/ExcelImport'
  import JEllipsis from '../../../../components/jeecg/JEllipsis'
  import JInput from '../../../../components/jeecg/JInput'
  import { deleteAction } from '@/api/manage'

  export default {
    name: "XmgzszList",
    mixins:[JeecgListMixin],
    components: {
      JInput,
      JEllipsis,
      ExcelImport,
      XmgzszModal
    },
    data () {
      return {
        description: '项目规则设置管理页面',
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
          // {
          //   title: '区域代码',
          //   align: "center",
          //   dataIndex: 'qydm'
          // },
          {
            title: '指标项目名称',
            align: "center",
            dataIndex: 'zbid_dictText',
          },
          {
            title: '指标规则ID',
            align: "center",
            dataIndex: 'zbgzid'
          },
          {
            title: '指标规则名称',
            align: "center",
            dataIndex: 'zbgzmc',
            scopedSlots: { customRender: 'zbgzmc' },
          },
          {
            title: '指标符号',
            align: "center",
            dataIndex: 'zbabs_dictText',
            filters: [
              {text:'正',value:'1'},
              {text:'负',value:'-1'},
            ],
            filterMultiple: true,
            onFilter: (value, record) => record.zbabs.indexOf(value) === 0,
          },
          {
            title: '指标规则分值',
            align: "center",
            dataIndex: 'zbgzfz'
          },
          {
            title: '指标结果',
            align: "center",
            dataIndex: 'zbjg'
          },
          {
            title: '是否只读',
            align: "center",
            dataIndex: 'readonly_dictText',
            filters: [
              {text:'是',value:'1'},
              {text:'否',value:'2'},
            ],
            filterMultiple: true,
            onFilter: (value, record) => record.readonly.indexOf(value) === 0,
          },
          // {
          //   title: '排序序号',
          //   align: "center",
          //   dataIndex: 'pxxh'
          // },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
          list: "/csszgl/xmgzsz/list",
          delete: "/csszgl/xmgzsz/delete",
          deleteBatch: "/csszgl/xmgzsz/deleteBatch",
          exportXlsUrl: "csszgl/xmgzsz/exportXls",
          importExcelUrl: "csszgl/xmgzsz/importExcel",
          //exportTemplateUrl: "dklldj.csszgl.xmgzsz/xmgzsz/exportTemplateXls",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      handleAdd: function () {
        this.$refs.modalForm.add();
        this.$refs.modalForm.title = "新增项目规则";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = false;
      },
      handleEdit(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑项目规则";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = true;
      },
      // handleImport() {
      //   let param = {};
      //   param.exportTemplateUrl = this.url.exportTemplateUrl;
      //   param.importExcelUrl = this.importExcelUrl;
      //   param.exportTemplateName = "项目规则设置导入模板";
      //   this.$refs.excelImportModal.showModal(param);
      // },
      handleDelete: function (record) {
        if(!this.url.delete){
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        deleteAction(that.url.delete, {zbid: record.zbid, zbgzid: record.zbgzid}).then((res) => {
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