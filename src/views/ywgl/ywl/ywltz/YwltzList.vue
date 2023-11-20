<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="组织标识">
              <j-tree-select placeholder="请选择所属组织"
                             v-model="queryParam.zzbz"
                             dict="hr_bas_organization,zzjc,zzbz"
                             pidField="sjzzbz"
                             treeNodeFilterProp="title"
                             :sszh="true"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"
                             :filterTreeNode="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="岗位标识">
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
          <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="调整月份">
              <a-month-picker placeholder="请输入调整月份" v-model="queryParam.tzyf" style="width: 100%"
                              :defaultValue="defaultMonthOpera" :format="monthFormat"></a-month-picker>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'ywltz:add'">新增</a-button>
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('业务量调整')" v-has="'ywltz:exportXls'">导出</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
                @change="handleImportExcel">
        <a-button icon="import" v-has="'ywltz:import'">导入</a-button>
      </a-upload>-->
      <a-button icon="import" @click="excelImport" v-has="'ywltz:import'">导入</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'ywltz:edit'">编辑</a>

          <a-divider type="vertical"/>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'ywltz:delete'">
                  <a>删除</a>
                </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <ywltz-modal ref="modalForm" @ok="modalFormOk"></ywltz-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import YwltzModal from './modules/YwltzModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import ExcelImport from '@/components/common/ExcelImport'
  import moment from 'moment'
  import {filterObj} from "@/utils/util";
  import {deleteAction} from "@/api/manage";
  import {downFile, getAction} from "../../../../api/manage";

  export default {
    name: "YwltzList",
    mixins: [JeecgListMixin],
    components: {
      YwltzModal, JTreeSelect,ExcelImport
    },
    data() {
      return {
        description: '业务量调整管理页面',
        defaultMonthOpera: '',
        monthFormat: 'YYYY-MM',
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
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '组织标识',
            align: "center",
            dataIndex: 'zzbz'
          },
          {
            title: '组织名称',
            align: "center",
            dataIndex: 'zzbz_dictText'
          },
          {
            title: '岗位标识',
            align: "center",
            dataIndex: 'gwbz'
          },
          {
            title: '岗位名称',
            align: "center",
            dataIndex: 'gwbz_dictText'
          },
          {
            title: '员工工号',
            align: "center",
            dataIndex: 'yggh'
          },
          {
            title: '员工姓名',
            align: "center",
            dataIndex: 'yggh_dictText'
          },
          {
            title: '调整月份',
            align: "center",
            dataIndex: 'tzyf',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            },
            sorter: true,
          },
          {
            title: '调整业务量',
            align: "center",
            dataIndex: 'tzywl'
          },
          {
            title: '调整原因',
            align: "center",
            dataIndex: 'tzyy'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/ywltz/ywltz/list",
          delete: "/ywltz/ywltz/delete",
          deleteBatch: "/ywltz/ywltz/deleteBatch",
          exportXlsUrl: "ywltz/ywltz/exportXls",
          importExcelUrl: "ywltz/ywltz/importExcel",
          exportTemplateUrl: "/ywltz/ywltz/exportTemplateXls",
        },
        exportTemplateName: "业务量调整导入模板"
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created(){
      this.getCurrentMonth()
    },
    methods: {
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
      getQueryParams() {
        let tjrqment = "";
        if (this.queryParam.tzyf) {
          tjrqment = moment(this.queryParam.tzyf).format("YYYY-MM") + "-01";
        }
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tzyf) {
          param.tzyf = tjrqment;
        }
        return filterObj(param);
      },

      handleDelete: function (record) {
        console.log(record)
        if (!this.url.delete) {
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        deleteAction(that.url.delete, {
          zzbz: record.zzbz,
          gwbz: record.gwbz,
          yggh: record.yggh,
          tzyf: record.tzyf
        }).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },

      searchReset() {
        this.flag = false;
        this.queryParam = {tzyf: undefined};
        this.queryParam.tzyf = this.defaultMonthOpera;
        this.loadData(1);
      },
      getCurrentMonth() {
        let curDate = new Date();
        let curMonth = {year: curDate.getFullYear(), month: curDate.getMonth() + 1,}
        this.defaultMonthOpera = moment(curDate);
      },
      loadData(arg) {
        // 获取当前月份
        this.getCurrentMonth()
        if (!this.url.list) {
          this.$message.error("请设置url.list属性!");
          return;
        }
        // 加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        // 查询条件
        var params = this.getQueryParams();
        if ((params.tzyf === undefined || params.tzyf == null)) {
          params.tzyf = moment(this.defaultMonthOpera).format("YYYY-MM") + '-01';
        }
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          }
          if (res.code === 510) {
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })
      },

      handleExportXls(fileName) {
        if (!fileName || typeof fileName != "string") {
          fileName = "导出文件"
        }
        let tzyf = ''
        let param = this.queryParam
        if (this.queryParam.tzyf === undefined || this.queryParam.tzyf === "") {
          //this.$message.warning("统计月份不能为空！")
          tzyf = moment(this.defaultMonthOpera).format("YYYY-MM") + '-01'
        } else {
          tzyf = moment(param.tzyf).format("YYYY-MM") + '-01'
        }
        param.tzyf = tzyf;
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(",")
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()));
        param.paramsStr = paramsStr
        console.log("导出参数", param)
        this.exportLoading = true
        downFile(this.url.exportXlsUrl, param).then((data) => {
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          var blob = new Blob([data]);
          if ('msSaveOrOpenBlob' in navigator) {
            window.navigator.msSaveOrOpenBlob(blob, fileName + '.xls');
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = fileName + '.xls';
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
        }).finally(() => {
          this.exportLoading = false
          this.loadData(1)
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>