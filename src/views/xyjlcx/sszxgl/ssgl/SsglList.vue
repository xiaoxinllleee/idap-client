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
            <a-form-item label="申请日期">
              <a-range-picker @change="onChangeBeginday" v-model="queryParam.sqrq"/>
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
              <a-form-item label="证件号码">
                <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="支行联系人">
                <a-input placeholder="请输入支行联系人" v-model="queryParam.zhlxr"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="余额">
                <a-input-number placeholder="Minimum" v-model="queryParam.ye_begin"
                                style="width: 40%; text-align: center" :min="0" />
                <a-input placeholder="~"
                         style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                         disabled />
                <a-input-number placeholder="Maximum" v-model="queryParam.ye_end"
                                style="width: 40%; text-align: center; border-left: 0" :min="0" />
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'ssgl:add'">新增</a-button>
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('诉讼管理')" v-has="'ssgl:exportXls'">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"-->
<!--                @change="handleImportExcel">-->
<!--        -->
<!--      </a-upload>-->
      <a-button icon="import" @click="excelImport" v-has="'ssgl:import'">导入</a-button>
      <a-button @click="init" icon="area-chart" v-has="'ssgl:init'">提取</a-button>
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
        :scroll="{x:2290}"
        @change="handleTableChange">

        <span slot="zjhm" slot-scope="text"><j-ellipsis :value="text" :length="18"></j-ellipsis></span>
        <span slot="zh" slot-scope="text"><j-ellipsis :value="text" :length="18"></j-ellipsis></span>
        <span slot="sxflwsh" slot-scope="text"><j-ellipsis :value="text" :length="17"></j-ellipsis></span>
        <span slot="khdwzxyq" slot-scope="text"><j-ellipsis :value="text" :length="17"></j-ellipsis></span>
        <span slot="bz" slot-scope="text"><j-ellipsis :value="text" :length="12"></j-ellipsis></span>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'ssgl:edit'">编辑</a>
          <a-divider type="vertical"/>
          <a @click="AddZxxx(record)">添加执行信息</a>
          <a-divider type="vertical"/>
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'ssgl:delete'">
                  <a>删除</a>
            </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <ssgl-modal ref="modalForm" @ok="modalFormOk"></ssgl-modal>
    <Addzxxx ref="zxxxForm" @ok="modalFormOk"></Addzxxx>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import SsglModal from './modules/SsglModal'
  import Addzxxx from './modules/Addzxxx'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JEllipsis from "@/components/jeecg/JEllipsis"
  import {deleteAction, getAction} from '@/api/manage'
  import {filterObj} from '@/utils/util';
  import ExcelImport from '@/components/common/ExcelImport'
  export default {
    name: "SsglList",
    mixins: [JeecgListMixin],
    components: {
      SsglModal,
      Addzxxx,
      JTreeSelect,
      JEllipsis,
      ExcelImport
    },
    data() {
      return {
        description: '诉讼管理管理页面',
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
            dataIndex: 'ywjg',
            width: 100
          }, {
            title: '业务名称',
            align: "center",
            dataIndex: 'ywjg_dictText',
            width: 100
          },
          {
            title: '申请日期',
            align: "center",
            dataIndex: 'sqrq',
            width: 100
          },
          {
            title: '合规审查日期',
            align: "center",
            dataIndex: 'hgscrq',
            width: 120
          },
          {
            title: '支行联系人',
            align: "center",
            dataIndex: 'zhlxr',
            width: 100
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            scopedSlots: {customRender: 'zjhm'},
            width: 180
          },
          {
            title: '借款人姓名',
            align: "center",
            dataIndex: 'jkrxm',
            width: 100
          },
          {
            title: '账号/卡号',
            align: "center",
            dataIndex: 'zh',
            scopedSlots: {customRender: 'zh'},
            width: 180
          },
          {
            title: '金额',
            align: "center",
            dataIndex: 'je',
            width: 100
          },
          {
            title: '余额',
            align: "center",
            dataIndex: 'ye',
            width: 100
          },
          {
            title: '被申请执行人',
            align: "center",
            dataIndex: 'bsqzxr',
            width: 120
          },
          {
            title: '起诉日期',
            align: "center",
            dataIndex: 'qsrq',
            width: 100
          },
          {
            title: '生效法律文书号',
            align: "center",
            dataIndex: 'sxflwsh',
            scopedSlots: {customRender: 'sxflwsh'},
            width: 150
          },
          {
            title: '案件受理费',
            align: "center",
            dataIndex: 'ajslf',
            width: 100
          },
          {
            title: '律师费',
            align: "center",
            dataIndex: 'lsf',
            width: 100
          },
          {
            title: '考核单位执行要求',
            align: "center",
            dataIndex: 'khdwzxyq',
            scopedSlots: {customRender: 'khdwzxyq'},
            width: 150
          },
          {
            title: '备注',
            align: "center",
            dataIndex: 'bz',
            scopedSlots: {customRender: 'bz'},
            width: 250
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            width: 200,
            fixed: 'right',
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/ssgl/ssgl/list",
          init: "/ssgl/ssgl/init",
          delete: "/ssgl/ssgl/delete",
          deleteBatch: "/ssgl/ssgl/deleteBatch",
          exportXlsUrl: "ssgl/ssgl/exportXls",
          importExcelUrl: "ssgl/ssgl/importExcel",
          exportTemplateUrl: "/ssgl/ssgl/exportTemplateXls",
        },
        exportTemplateName: '诉讼管理导入模板'
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
      AddZxxx(record){
        this.$refs.zxxxForm.edit(record);
        this.$refs.zxxxForm.title = "添加执行信息";
        this.$refs.zxxxForm.disableSubmit = false;
        this.$refs.zxxxForm.disabled = true;
      },

      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.sqrq;
        return filterObj(param);
      },
      init() {
        this.loading=true;
        getAction(this.url.init).then((response) => {
          if (response.success) {
            this.$message.success('提取成功！')
            this.loadData(1)
          } else {
            this.$message.warning('提取失败！')
          }
        }).catch((error) =>{
          this.$message.error('提取失败！')
        }).finally(()=>{
          this.loading=false;
        })
      },
      onChangeBeginday: function(value, dateString) {
        let sqrqString = dateString
        this.queryParam.sqrq_begin = sqrqString[0]
        this.queryParam.sqrq_end = sqrqString[1]
      },
      handleDelete: function (record) {
        console.log(record)
        if (!this.url.delete) {
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        deleteAction(that.url.delete, {zh: record.zh,}).then((res) => {
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