<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务机构">
              <j-tree-select placeholder="请选择业务机构"
                             v-model="queryParam.ywjg"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="借款人姓名">
              <a-input placeholder="请输入借款人姓名" v-model="queryParam.jkrxm"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="账号/卡号">
                <a-input placeholder="请输入账号/卡号" v-model="queryParam.zh"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="申请执行日期">
                <a-range-picker @change="onChangeBeginday" v-model="queryParam.sqzxrq"/>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'zxgl:add'">新增</a-button>
      <a-button  :loading="exportLoading" icon="download" @click="handleExportXls('执行管理')" v-has="'zxgl:exportXls'">导出</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
                @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
      <a-button icon="import"  @click="excelImport" v-has="'zxgl:import'">导入</a-button>
    </div>

    <!-- table区域-begin -->
    <div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey=""
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:2200}"
        @change="handleTableChange">

        <span slot="bz" slot-scope="text"><j-ellipsis :value="text" :length="15"></j-ellipsis></span>
        <span slot="dqzxfy" slot-scope="text"><j-ellipsis :value="text" :length="10"></j-ellipsis></span>
        <span slot="zxah" slot-scope="text"><j-ellipsis :value="text" :length="10"></j-ellipsis></span>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'zxgl:edit'">编辑</a>
          <a-divider type="vertical"/>
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'zxgl:delete'">
                  <a>删除</a>
            </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <zxgl-modal ref="modalForm" @ok="modalFormOk"></zxgl-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import ZxglModal from './modules/ZxglModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JEllipsis from "@/components/jeecg/JEllipsis"
  import {deleteAction, getAction} from '@/api/manage'
  import {filterObj} from '@/utils/util';
  import ExcelImport from '@/components/common/ExcelImport'

  export default {
    name: "ZxglList",
    mixins: [JeecgListMixin],
    components: {
      ZxglModal, JTreeSelect,JEllipsis,ExcelImport
    },
    data() {
      return {
        description: '执行管理管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '业务机构',
            align: "center",
            dataIndex: 'ywjg_dictText',
            width: 120
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            width: 200
          },
          {
            title: '借款人姓名',
            align: "center",
            dataIndex: 'jkrxm',
            width: 120
          },
          {
            title: '账号/卡号',
            align: "center",
            dataIndex: 'zh',
            width: 200
          },
          {
            title: '申请执行日期',
            align: "center",
            dataIndex: 'sqzxrq',
            width: 140
          },
          {
            title: '执行本金',
            align: "center",
            dataIndex: 'zxbj',
            width: 120
          },
          {
            title: '执行利息',
            align: "center",
            dataIndex: 'zxlx',
            width: 120
          },
          {
            title: '待执行金额',
            align: "center",
            dataIndex: 'dzxje',
            width: 120
          },
          {
            title: '执行案号',
            align: "center",
            dataIndex: 'zxah',
            scopedSlots: {customRender: 'zxah'},
            width: 150
          },
          {
            title: '当前执行法院',
            align: "center",
            dataIndex: 'dqzxfy',
            scopedSlots: {customRender: 'dqzxfy'},
            width: 160
          },
          {
            title: '可供执行财产额',
            align: "center",
            dataIndex: 'kgzxcce',
            width: 150
          },
          {
            title: '抵押担保人',
            align: "center",
            dataIndex: 'dydbr',
            width: 120
          },
          {
            title: '备注',
            align: "center",
            dataIndex: 'bz',
            scopedSlots: {customRender: 'bz'},
            width: 240
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            width: '180',
            fixed: 'right',
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/zxgl/zxgl/list",
          delete: "/zxgl/zxgl/delete",
          deleteBatch: "/zxgl/zxgl/deleteBatch",
          exportXlsUrl: "zxgl/zxgl/exportXls",
          importExcelUrl: "zxgl/zxgl/importExcel",
          exportTemplateUrl: "/zxgl/zxgl/exportTemplateXls",
        },
        exportTemplateName: '执行管理导入模板'
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      handleAdd: function () {
        this.$refs.modalForm.add();
        this.$refs.modalForm.title = "新增";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = false;
      },
      handleEdit(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = true;
      },

      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.sqzxrq;
        return filterObj(param);
      },
      onChangeBeginday: function(value, dateString) {
        let sqzxrqString = dateString
        this.queryParam.sqzxrq_begin = sqzxrqString[0]
        this.queryParam.sqzxrq_end = sqzxrqString[1]
      },
      handleDelete: function (record) {
        console.log(record)
        if (!this.url.delete) {
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        deleteAction(that.url.delete, {zh: record.zh, sqzxrq: record.sqzxrq}).then((res) => {
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