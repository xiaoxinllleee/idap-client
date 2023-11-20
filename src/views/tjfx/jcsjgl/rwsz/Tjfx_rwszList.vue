<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="任务年份">
            <a-select placeholder="请选择统计年份" v-model="queryParam.rwnf" :defaultValue="defaultYear" @change="selectValue">
              <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
            </a-select>
          </a-form-item></a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="组织标识">
            <j-tree-select placeholder="请选择组织机构" v-model="queryParam.zzbz" dict="HR_BAS_ORGANIZATION, ZZJC, ZZBZ"
                           pid-field="sjzzbz" treeNodeFilterProp="title" :showSearch="true" :tree-default-expand-all="true"/>
          </a-form-item></a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('首页任务设置')">导出</a-button>
      <a-button type="primary" icon="import" @click="excelImport">导入</a-button>
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

      <a-table ref="table"
               size="middle"
               bordered
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <tjfx_rwsz-modal ref="modalForm" @ok="modalFormOk"></tjfx_rwsz-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import Tjfx_rwszModal from './modules/Tjfx_rwszModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import ExcelImport from '@/components/common/ExcelImport'
  import { getAction, downFile,putAction ,deleteAction} from '@/api/manage'
  import { filterObj } from '../../../../utils/util'
  import moment from 'moment'

  export default {
    name: "Tjfx_rwszList",
    mixins:[JeecgListMixin],
    components: {
      Tjfx_rwszModal,JTreeSelect,ExcelImport
    },
    data () {
      return {
        description: '首页-任务设置',
        // 表头
        tjnf: '',
        defaultYear: '',
        isorter: {
          order: 'desc',
        },
        columns: [
          {
            title: '序号',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title: '任务年份',
            align:"center",
            dataIndex: 'rwnf',
            customRender:function (text) {
              return !text?"":(text.length>8?text.substr(0,4):text)
            },
            sorter: true,
          },
          {
            title: '组织标识',
            align:"center",
            dataIndex: 'zzbz_dictText'
          },
          {
            title: '存款日平余额',
            align:"center",
            dataIndex: 'ckrpye'
          },
          {
            title: '存款余额',
            align:"center",
            dataIndex: 'ckye'
          },
          {
            title: '贷款余额',
            align:"center",
            dataIndex: 'dkye'
          },
          {
            title: '存款户数净增',
            align:"center",
            dataIndex: 'ckhsjz'
          },
          {
            title: '贷款户数净增',
            align:"center",
            dataIndex: 'dkhsjz'
          },
          {
            title: '贷款不良率',
            align:"center",
            dataIndex: 'dkbll'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
          list: "/tjfx_rwsz/tjfx_rwsz/list",
          delete: "/tjfx_rwsz/tjfx_rwsz/delete",
          deleteBatch: "/tjfx_rwsz/tjfx_rwsz/deleteBatch",
          exportXlsUrl: "tjfx_rwsz/tjfx_rwsz/exportXls",
          importExcelUrl: "tjfx_rwsz/tjfx_rwsz/importExcel",
          exportTemplateUrl: "tjfx_rwsz/tjfx_rwsz/exportTemplateXls",
        },
      }
    },
    created() {this.init()
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      getQueryParams(){
        let tjyfMoment = "";
        if (this.queryParam.rwnf){
          tjyfMoment = moment(this.queryParam.rwnf+"-01-01").format("YYYY-MM-DD");
          // formData.rwnf =   moment(formData.rwnf+"-01-01").format("YYYY-MM-DD")
        }
        console.log(tjyfMoment)
        var param=Object.assign({},this.queryParam,this.isorter);
        param.field=this.getQueryField();
        param.pageNo=this.ipagination.current;
        param.pageSize=this.ipagination.pageSize;
        if (param.rwnf) {
          param.rwnf = tjyfMoment;
        }
        return filterObj(param);
      },
      excelImport(){
        let params = {}
        params.exportTemplateUrl = this.url.exportTemplateUrl
        params.importExcelUrl = this.importExcelUrl
        params.exportTemplateName = "首页任务设置导入模板"
        this.$refs.excelImportModal.showModal(params);
      },
      importComplete(filePath) {
        let fileName = "导入结果"
        let param = {};
        console.log("filePath")
        console.log(filePath)
        downFile("/sys/common/download/" + filePath,param).then((data)=>{
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          var blob = new Blob([data]);
          if('msSaveOrOpenBlob' in navigator){
            window.navigator.msSaveOrOpenBlob(blob, fileName+'.xls');
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = fileName+'.xls';
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
        })

        this.loadData();
      },
      /** 获取当前年份 */
      init() {
        let date = new Date
        let year = date.getFullYear()
        this.initYear(year)
      },
      /** 初始化年份下拉框 */
      initYear(year) {
        this.years = []
        for(let i=0; i<30; i++) {
          this.years.push({ value:((year-i)+''),label:((year-i)+'') })
        }
      },
      /** 下拉选择 */
      selectValue(value) {
        console.log('年份下拉框选择值 => '+value)
        let val = value
        this.$emit('change', val)
      },
      handleDelete: function (id) {
        if(!this.url.delete){
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        putAction("/tjfx_rwsz/tjfx_rwsz/delete", id).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },

      handleAdd: function () {
        this.$refs.modalForm.add();
        this.$refs.modalForm.title = "新增任务";
        this.$refs.modalForm.disableSubmit = false;
      },
      handleEdit: function (record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑任务";
        this.$refs.modalForm.disableSubmit = false;
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>