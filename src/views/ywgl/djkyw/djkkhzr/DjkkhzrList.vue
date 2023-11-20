<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构代码"
                             v-model="queryParam.jgdm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡号">
              <a-input placeholder="请输入卡号" v-model="queryParam.djkkh"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="责任人工号">
                <a-input placeholder="请输入责任人工号" v-model="queryParam.jobnumberzr"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="责任客户经理标识">
                <a-input placeholder="请输入责任客户经理标识" v-model="queryParam.custidzr"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="员工工号">
                <a-input placeholder="请输入员工工号" v-model="queryParam.jobnumber"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="客户经理标识">
                <a-input placeholder="请输入客户经理标识" v-model="queryParam.custid"></a-input>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'djkkhzr:add'">新增</a-button>
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('贷记卡考核责任')" v-has="'djkkhzr:exportXls'">导出
      </a-button>
      <a-button icon="import" @click="excelImport" v-has="'djkkhzr:import'">导入</a-button>
      <!--<a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="djkkh"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:2000}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'djkkhzr:edit'">编辑</a>

          <a-divider type="vertical"/>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'djkkhzr:delete'">
                  <a>删除</a>
                </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <djkkhzr-modal ref="modalForm" @ok="modalFormOk"></djkkhzr-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>

  </a-card>
</template>

<script>
  import DjkkhzrModal from './modules/DjkkhzrModal'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import ExcelImport from '@/components/common/ExcelImport'
  import {deleteAction} from "../../../../api/manage";
  import store from '@/store/'

  export default {
    name: "DjkkhzrList",
    mixins: [JeecgListMixin],
    components: {
      DjkkhzrModal, JTreeSelect, ExcelImport
    },
    data() {
      return {
        description: '贷记卡考核责任管理页面',
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
            title: '机构代码',
            align: "center",
            dataIndex: 'jgdm'
          },
          {
            title: '机构名称',
            align: "center",
            dataIndex: 'jgdm_dictText'
          },
          /*{
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm'
          },*/
          {
            title: '卡号',
            align: "center",
            dataIndex: 'djkkh'
          },
          {
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc'
          },
          {
            title: '员工工号',
            align: "center",
            dataIndex: 'jobnumber'
          },
          {
            title: '员工姓名',
            align: "center",
            dataIndex: 'jobnumber_dictText'
          },
          {
            title: '客户经理标识',
            align: "center",
            dataIndex: 'custid'
          },
          {
            title: '责任人工号',
            align: "center",
            dataIndex: 'jobnumberzr'
          },
          {
            title: '责任人姓名',
            align: "center",
            dataIndex: 'jobnumberzr_dictText'
          },
          {
            title: '责任人客户经理标识',
            align: "center",
            dataIndex: 'custidzr'
          },
          {
            title: '追责标志',
            align: "center",
            dataIndex: 'zzbz_dictText'
          },
          {
            title: '追责日期',
            align: "center",
            dataIndex: 'zzrq'
          },

          {
            title: '录入时间',
            align: "center",
            dataIndex: 'lrsj'
          },
          {
            title: '录入标志',
            align: "center",
            dataIndex: 'lrbz_dictText'
          },
          {
            title: '录入操作员',
            align: "center",
            dataIndex: 'lrczy'
          },

          /*{
               title: '删除标志',
               align:"center",
               dataIndex: 'dflag'
              },

          {
               title: '追责操作员',
               align:"center",
               dataIndex: 'zzczy'
              },

          {
               title: '暂不扣收',
               align:"center",
               dataIndex: 'zbks'
              },*/
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            fixed: "right",
            width: 150,
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/djkkhzr/djkkhzr/list",
          delete: "/djkkhzr/djkkhzr/delete",
          deleteBatch: "/djkkhzr/djkkhzr/deleteBatch",
          exportXlsUrl: "djkkhzr/djkkhzr/exportXls",
          importExcelUrl: "djkkhzr/djkkhzr/importExcel",
          exportTemplateUrl: "/djkkhzr/djkkhzr/exportTemplateXls",
        },
        exportTemplateName: '贷记卡考核责任导入模板'
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      searchReset() {
        this.queryParam = {jgdm: undefined};
        if(!store.getters.isRoot) {
          this.queryParam.jgdm = store.getters.ywjgdm
        }
        this.loadData(1);
      },
      handleDelete: function (record) {
        var that = this
        console.log(record)
        if (!that.url.delete) {
          that.$message.error("请设置url.delete属性!")
          return
        }
        if (!record.djkkh) {
          that.$message.error("卡号为空，请核实！")
          return
        }
        var djkkh = record.djkkh
        deleteAction(that.url.delete, {'djkkh': djkkh}).then((res) => {
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