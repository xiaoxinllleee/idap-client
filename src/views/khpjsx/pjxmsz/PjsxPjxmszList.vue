<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <!--<a-col :md="6" :sm="8"><a-form-item label="区域代码">
            <a-input placeholder="请输入区域代码" v-model="queryParam.qydm"></a-input>
          </a-form-item></a-col>-->

          <a-col :md="6" :sm="8"><a-form-item label="客户类型">
            <j-dict-select-tag v-model="queryParam.khlx" placeholder="请选择客户类型" dictCode="khlx"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="项目编号">
            <a-input placeholder="请输入项目编号" v-model="queryParam.xmbh"></a-input>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="项目名称">
            <a-input placeholder="请输入项目名称" v-model="queryParam.xmmc"></a-input>
          </a-form-item></a-col>

          <!--<template v-if="toggleSearchStatus">
          </template>-->

          <a-col :md="6" :sm="8" ><span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
            <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
            <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            <!--<a @click="handleToggleSearch" style="margin-left: 8px">
              {{ toggleSearchStatus ? '收起' : '展开' }}
              <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
            </a>-->
          </span></a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('评级项目设置')">导出</a-button>
      <a-button type="primary"icon="import"@click="excelImport"style="margin-left: 8px;">导入</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px;"> 批量操作 <a-icon type="down" /></a-button>
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
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">

        <!-- 字符串超长截取省略号显示 -->
        <span slot="xmmc" slot-scope="text">
          <j-ellipsis :value="text" :length="8" />
        </span>
        <span slot="bz" slot-scope="text">
          <j-ellipsis :value="text" :length="8" />
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay"><a-menu-item>
              <a-popconfirm title="确定删除吗?" @confirm="() => delete1(record)">
                <a>删除</a>
              </a-popconfirm>
            </a-menu-item></a-menu>
          </a-dropdown>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <pjsxPjxmsz-modal ref="modalForm" @ok="modalFormOk"/>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import PjsxPjxmszModal from './modules/PjsxPjxmszModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getAction,putAction,httpAction } from '@/api/manage'
  import ExcelImport from '@/components/common/ExcelImport'
  import JInput from '../../../components/jeecg/JInput'
  import JEllipsis from '../../../components/jeecg/JEllipsis'

  export default {
    name: "PjsxPjxmszList",
    mixins:[JeecgListMixin],
    components: {
      JEllipsis,
      PjsxPjxmszModal,ExcelImport,JInput
    },
    data () {
      return {
        description: '评级项目设置管理页面',
        // 表头
        columns: [
          {
            title: '区域代码',
            align:"center",
            dataIndex: 'qydm',
            width: 100,
          },
          {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText',
            width: 100,
          },
          {
            title: '项目编号',
            align:"center",
            dataIndex: 'xmbh',
            width: 100,
          },
          {
            title: '项目名称',
            align:"center",
            dataIndex: 'xmmc',
            scopedSlots: { customRender: 'xmmc' },
            width: 150,
          },
          {
            title: '排序序号',
            align:"center",
            dataIndex: 'pxxh',
            width: 100,
          },
          {
            title: '备注',
            align:"center",
            dataIndex: 'bz',
            scopedSlots: { customRender: 'bz' },
            width: 150,
          },
          {
            title: '是否启用',
            align:"center",
            dataIndex: 'sfqy_dictText',
            width: 100,
          },
          {
            title: '创建人',
            align: "center",
            dataIndex: 'createBy',
            width: 100,
          },
          {
            title: '创建时间',
            align: "center",
            dataIndex: 'createTime',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 10) : text)
            },
            width: 120,
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
            width: 100,
          }
        ],
        url: {
          list: "/khpjsx.pjxmsz/pjsxPjxmsz/list",
          delete: "/khpjsx.pjxmsz/pjsxPjxmsz/delete",
          deleteBatch: "/khpjsx.pjxmsz/pjsxPjxmsz/deleteBatch",
          exportXlsUrl: "khpjsx.pjxmsz/pjsxPjxmsz/exportXls",
          importExcelUrl: "khpjsx.pjxmsz/pjsxPjxmsz/importExcel",
          exportTemplateUrl: "/khpjsx.pjxmsz/pjsxPjxmsz/exportTemplateXls",

        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      excelImport(){
        let params = {}
        params.exportTemplateUrl = this.url.exportTemplateUrl
        params.importExcelUrl = this.importExcelUrl
        params.exportTemplateName = "评级项目设置导入模板"
        this.$refs.excelImportModal.showModal(params);
      },
      delete1(record) {
        /* var truthBeTold = window.confirm("确定删除吗")*/
        if(!this.url.delete){
          this.$message.error("请设置url.delete属性!")
          return
        }
        var parm ={"qydm":record.qydm,"xmbh":record.xmbh}
        putAction(this.url.delete, parm,'put').then((res) => {
          if (res.success) {
            this.$message.success(res.message);
            this.loadData();
          } else {
            this.$message.warning(res.message,5);
          }
        });
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>