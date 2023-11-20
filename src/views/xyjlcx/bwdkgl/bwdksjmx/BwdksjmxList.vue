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
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款账号">
              <a-input placeholder="请输入贷款账号" v-model="queryParam.dkzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="包收责任人">
              <a-input placeholder="请输入包收责任人" v-model="queryParam.bszrr"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="管理责任人">
              <a-input placeholder="请输入管理责任人" v-model="queryParam.glzrr"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="诉讼时效">
                <a-select placeholder="请选择诉讼时效" v-model="queryParam.sssx">
                  <a-select-option value="1">
                    无效
                  </a-select-option>
                  <a-select-option value="2">
                    有效
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="核心余额">
                <a-input-number placeholder="Minimum" v-model="queryParam.hxye_begin"
                                style="width: 40%; text-align: center" :min="0" />
                <a-input placeholder="~"
                         style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                         disabled />
                <a-input-number placeholder="Maximum" v-model="queryParam.hxye_end"
                                style="width: 40%; text-align: center; border-left: 0" :min="0" />
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="最近催收日期">
                <a-range-picker @change="onChangezjcsrq" v-model="queryParam.zjcsrq"/>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="转入表外类型">
                <a-select placeholder="请选择转入表外类型" v-model="queryParam.zrbwlx">
                  <a-select-option value="1">
                    核销
                  </a-select-option>
                  <a-select-option value="2">
                    置换
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="转入表外日期">
                <a-range-picker @change="onChangezrbwrq" v-model="queryParam.zrbwrq"/>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="诉讼时效到期日">
                <a-range-picker @change="onChangeBeginday" v-model="queryParam.sssxdqr"/>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="">
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="">
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="">
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'bwdksjmx:add'">新增</a-button>
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('表外贷款数据明细')" v-has="'bwdksjmx:exportXls'">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button icon="import" v-has="'bwdksjmx:import'">导入</a-button>
      </a-upload>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importEditExcelUrl" @change="handleImportEditExcel">
        <a-button icon="import" v-has="'bwdksjmx:importEdit'">导入:批量修改</a-button>
      </a-upload>-->
      <a-button  @click="init" icon="area-chart" v-has="'bwdksjmx:init'">提取</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>删除
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table ref="table"
               size="middle"
               bordered
               rowKey=""
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :scroll="{x:3430}"
               @change="handleTableChange">

        <span slot="zjhm" slot-scope="text">
          <j-ellipsis :value="text" :length="18"/>
        </span>
        <span slot="khdz" slot-scope="text">
          <j-ellipsis :value="text" :length="18"/>
        </span>
        <span slot="qksm" slot-scope="text">
          <j-ellipsis :value="text" :length="18"/>
        </span>
        <span slot="dktx" slot-scope="text">
          <j-ellipsis :value="text" :length="18"/>
        </span>
        <span slot="dkzh" slot-scope="text">
          <j-ellipsis :value="text" :length="18"/>
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'bwdksjmx:edit'">编辑</a>
          <a-divider type="vertical"/>
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'bwdksjmx:delete'">
                  <a>删除</a>
            </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <bwdksjmx-modal ref="modalForm" @ok="modalFormOk"></bwdksjmx-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import BwdksjmxModal from './modules/BwdksjmxModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {deleteAction, getAction} from '@/api/manage'
  import ExcelImport from '@/components/common/ExcelImport'
  import {filterObj} from '@/utils/util';
  import JEllipsis from "../../../../components/jeecg/JEllipsis";

  export default {
    name: "BwdksjmxList",
    mixins: [JeecgListMixin],
    components: {
      JEllipsis,
      BwdksjmxModal,
      JTreeSelect,
      ExcelImport
    },
    data() {
      return {
        description: '表外贷款数据明细管理页面',
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
            width: 100,
            dataIndex: 'jgdm'
          }, {
            title: '机构名称',
            align: "center",
            width: 100,
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '客户名称',
            align: "center",
            width: 100,
            dataIndex: 'khmc'
          },
          {
            title: '证件类型',
            align: "center",
            width: 100,
            dataIndex: 'zjlx_dictText'
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            width: 180,
            scopedSlots: {customRender: 'zjhm'},
          },
          {
            title: '联系方式',
            align: "center",
            width: 150,
            dataIndex: 'lxfs'
          },
          {
            title: '客户地址',
            align: "center",
            width: 200,
            dataIndex: 'khdz',
            scopedSlots: {customRender: 'khdz'}
          },
          {
            title: '客户状况',
            align: "center",
            width: 150,
            dataIndex: 'khzk'
          },
          {
            title: '贷款账号',
            align: "center",
            width: 200,
            scopedSlots: {customRender: 'dkzh'},
            dataIndex: 'dkzh'
          },
          {
            title: '贷款日期',
            align: "center",
            width: 120,
            dataIndex: 'dkrq'
          },
          {
            title: '到期日期',
            align: "center",
            width: 120,
            dataIndex: 'dqrq'
          },
          {
            title: '借款金额',
            align: "center",
            width: 100,
            dataIndex: 'jkje'
          },
          {
            title: '核心余额',
            align: "center",
            width: 100,
            dataIndex: 'hxye'
          },
          {
            title: '核销本金',
            align: "center",
            width: 100,
            dataIndex: 'hxbj'
          },
          {
            title: '核销利息',
            align: "center",
            width: 100,
            dataIndex: 'hxlx'
          },
          {
            title: '表内贷款账号',
            align: "center",
            width: 200,
            dataIndex: 'bndkzh'
          },
          {
            title: '转入表外日期',
            align: "center",
            width: 120,
            dataIndex: 'zrbwrq'
          },
          {
            title: '转入表外类型',
            align: "center",
            dataIndex: 'zrbwlx_dictText',
            width: 120
          },
          {
            title: '贷款投向',
            align: "center",
            dataIndex: 'dktx',
            scopedSlots: {customRender: 'dktx'},
            width: 200
          },
          {
            title: '包收责任人',
            align: "center",
            dataIndex: 'bszrr',
            width: 100
          },
          {
            title: '管理责任人',
            align: "center",
            dataIndex: 'glzrr',
            width: 100
          },
          {
            title: '最近催收日期',
            align: "center",
            dataIndex: 'zjcsrq',
            width: 120
          },
          {
            title: '诉讼时效',
            align: "center",
            dataIndex: 'sssx_dictText',
            width: 120
          },
          {
            title: '诉讼时效到期日',
            align: "center",
            dataIndex: 'sssxdqr',
            width: 120
          },
          {
            title: '情况说明',
            align: "center",
            dataIndex: 'qksm',
            scopedSlots: {customRender: 'qksm'},
            width: 200
          },
          {
            title: '录入人',
            align: "center",
            dataIndex: 'lrr',
            width: 120
          },
          {
            title: '录入标志',
            align: "center",
            dataIndex: 'lrbz_dictText',
            width: 120
          },
          {
            title: '录入时间',
            align: "center",
            dataIndex: 'lrsj',
            width: 120
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            width: 150,
            fixed: "right",
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/bwdksjmx/bwdksjmx/list",
          delete: "/bwdksjmx/bwdksjmx/delete",
          deleteBatch: "/bwdksjmx/bwdksjmx/deleteBatch",
          exportXlsUrl: "bwdksjmx/bwdksjmx/exportXls",
          importExcelUrl: "bwdksjmx/bwdksjmx/importExcel",
          importEditExcelUrl: "bwdksjmx/bwdksjmx/importEditExcel",
          exportTemplateUrl: "/bwdksjmx/bwdksjmx/exportTemplateXls",
          init: "/bwdksjmx/bwdksjmx/init",
        },
        exportTemplateName: '表外贷款数据明细导入模板'
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      },
      importEditExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importEditExcelUrl}`;
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
      //导入:批量修改
      handleImportEditExcel(info) {
        console.info('导入:批量修改-info:',info)
      },
      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.zjcsrq;
        delete param.zrbwrq;
        delete param.sssxdqr;
        return filterObj(param);
      },
      onChangezrbwrq: function(value, dateString){
        let zrbwrqString = dateString
        this.queryParam.zrbwrq_begin = zrbwrqString[0]
        this.queryParam.zrbwrq_end = zrbwrqString[1]
      },
      onChangezjcsrq: function(value, dateString){
        let zjcsrqString = dateString
        this.queryParam.zjcsrq_begin = zjcsrqString[0]
        this.queryParam.zjcsrq_end = zjcsrqString[1]
      },
      onChangeBeginday: function(value, dateString) {
        let sssxdqrString = dateString
        this.queryParam.sssxdqr_begin = sssxdqrString[0]
        this.queryParam.sssxdqr_end = sssxdqrString[1]
      },
      handleDelete: function (record) {
        console.log(record)
        if (!this.url.delete) {
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        deleteAction(that.url.delete, {dkzh: record.dkzh}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },
      init() {
        this.loading=true
        getAction(this.url.init).then((response) => {
          if (response.success) {
            this.$message.success('提取成功！')
            this.loadData(1);
          } else {
            this.$message.warning('提取失败！')
          }
        }).catch((error) => {
          this.$message.error('提取失败')
        }).finally(()=>{
          this.loading=false;
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>