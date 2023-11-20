<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据月份">
              <a-month-picker placeholder="请输入数据月份" @change="onChange" v-model="queryParam.tjyf" style="width: 100%"
                              :defaultValue="defaultMonthOpera" :format="monthFormat"></a-month-picker>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="营销机构">
              <!--<a-input placeholder="请输入入账网点" v-model="queryParam.rzwd"></a-input>-->
              <j-tree-select placeholder="请选择机构代码"
                             v-model="queryParam.yxjgdm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户日期">
              <a-range-picker @change="onChangeBeginday" v-model="queryParam.khrq" :default-value="[undefined, moment(new Date(), 'YYYY/MM/DD')]"  />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="办理员工编号">
              <a-input placeholder="请输入办理员工编号" v-model="queryParam.blygbh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="营销人工号">
              <a-input placeholder="请输入营销人工号" v-model="queryParam.yxrgh"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户姓名">
              <a-input placeholder="请输入客户姓名" v-model="queryParam.khxm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户身份证号">
              <a-input placeholder="请输入客户身份证号" v-model="queryParam.khsfzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="车牌号码">
              <a-input placeholder="请输入车牌号码" v-model="queryParam.cphm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="ETC绑定状态">
              <a-input placeholder="请输入ETC绑定状态" v-model="queryParam.etcbdzt"></a-input>
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
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('ETC营销信息管理')" v-has="'etcyxxxgl:exportXls'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'etcyxxxgl:import'">导入</a-button>
      <a-button icon="import" @click="excelImportYxr" v-has="'etcyxxxgl:importYxr'">导入营销人</a-button>
      <a-button icon="delete" @click="batchDelete" v-has="'etcyxxxgl:batchDelete'">批量删除</a-button>
      <a-button icon="export" @click="exportDeleteData" v-has="'etcyxxxgl:exportDeleteData'">导出批量删除数据</a-button>
      <a-button icon="swap" @click="transferData" v-has="'etcyxxxgl:transferData'">移交</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:5000}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'etcyxxxgl:edit'">编辑</a>

          <a-divider type="vertical" />
          <a @click="handleEditYxr(record)" v-has="'etcyxxxgl:editYxr'">修改营销人</a>

          <a-divider type="vertical" />
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'etcyxxxgl:delete'">
                  <a>删除</a>
                </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <etcyxxxgl-modal ref="modalForm" @ok="modalFormOk"></etcyxxxgl-modal>
    <etcyxxxgl-transfer ref="etcyxxxglTransfer"></etcyxxxgl-transfer>
    <excel-import ref="excelImportModal" @ok="importComplete"></excel-import>
    <excel-import ref="excelImportYxrModal" @ok="importComplete"></excel-import>
  </a-card>
</template>

<script>
  import EtcyxxxglModal from './modules/EtcyxxxglModal'
  import EtcyxxxglTransfer from './modules/EtcyxxxgTransfer'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {filterObj} from "@/utils/util";
  import moment from 'moment'
  import ExcelImport from '@/components/common/ExcelImport'
  import {deleteAction, downFile, getAction, postAction} from "../../../../api/manage";
  import store from '@/store/'

  export default {
    name: "EtcyxxxglList",
    mixins:[JeecgListMixin],
    components: {
      EtcyxxxglModal,JTreeSelect, ExcelImport, EtcyxxxglTransfer
    },
    data () {
      return {
        description: 'ETC营销信息管理管理页面',
        defaultMonthOpera: '',
        monthFormat: 'YYYY-MM',
        exportTemplateName: 'ETC营销信息导入模板',
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
            title: '数据月份',
            align:"center",
            dataIndex: 'tjyf',
            width: 100
           },
		   {
            title: '法人行机构码',
            align:"center",
            dataIndex: 'frhjgdm'
           },
		   {
            title: '法人行机构名称',
            align:"center",
            dataIndex: 'frhjgmc'
           },
		   {
            title: '营业网点名称',
            align:"center",
            dataIndex: 'yywdmc'
           },
		   {
            title: '网点机构码',
            align:"center",
            dataIndex: 'yywdjgm',
            width: 100
           },
		   {
            title: '办理渠道',
            align:"center",
            dataIndex: 'blqd',
            width: 100
           },
		   {
            title: '办理员工编号',
            align:"center",
            dataIndex: 'blygbh'
           },
		   {
            title: '办理员工姓名',
            align:"center",
            dataIndex: 'blygxm'
           },
		   {
            title: '客户姓名',
            align:"center",
            dataIndex: 'khxm'
           },
		   {
            title: '客户身份证号',
            align:"center",
            dataIndex: 'khsfzh'
           },
		   {
            title: '车牌号码',
            align:"center",
            dataIndex: 'cphm',
            width: 110
           },
		   {
            title: '车牌颜色',
            align:"center",
            dataIndex: 'cpys'
           },
		   {
            title: '获客方式',
            align:"center",
            dataIndex: 'hkfs'
           },
		   {
            title: '绑定帐卡号',
            align:"center",
            dataIndex: 'bdzkh'
           },
		   {
            title: '开户机构',
            align:"center",
            dataIndex: 'khjgdm',
            width: 100
           },
		   {
            title: '开户日期',
            align:"center",
            dataIndex: 'khrq',
            width: 100
           },
		   {
            title: '开户时间（时分秒）',
            align:"center",
            dataIndex: 'khsj'
           },
		   {
            title: '销户日期',
            align:"center",
            dataIndex: 'xhrq',
            width: 100
           },
		   {
            title: '销户时间（时分秒）',
            align:"center",
            dataIndex: 'xhsj',
            width: 100
           },
		   {
            title: 'ETC绑定状态',
            align:"center",
            dataIndex: 'etcbdzt'
           },
          {
            title: '推荐人',
            align:"center",
            dataIndex: 'tjr'
          },
          {
            title: '推荐人姓名',
            align:"center",
            dataIndex: 'tjrxm'
          },
          {
            title: '推荐人机构',
            align:"center",
            dataIndex: 'tjrjg'
          },
          {
            title: '销户操作员',
            align:"center",
            dataIndex: 'xhczy'
          },
          {
            title: '销户操作员姓名',
            align:"center",
            dataIndex: 'xhczyxm'
          },
          {
            title: '销户操作员机构',
            align:"center",
            dataIndex: 'xhczyjg'
          },
		   {
            title: '营销人工号',
            align:"center",
            dataIndex: 'yxrgh'
           },
          {
            title: '营销人姓名',
            align:"center",
            dataIndex: 'yxrgh_dictText'
          },
		   {
            title: '营销人机构代码',
            align:"center",
            dataIndex: 'yxjgdm_dictText'
           },
		   // {
       //      title: '修改时间',
       //      align:"center",
       //      dataIndex: 'xgsj'
       //     },
		   // {
       //      title: '修改人',
       //      align:"center",
       //      dataIndex: 'xgr'
       //     },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            fixed: "right",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/etcyxxxgl/etcyxxxgl/list",
          editCheck: "/etcyxxxgl/etcyxxxgl/editCheck",
          delete: "/etcyxxxgl/etcyxxxgl/delete",
          deleteBatch: "/etcyxxxgl/etcyxxxgl/deleteBatch",
          deleteBatchByTjyf: "/etcyxxxgl/etcyxxxgl/deleteBatchByTjyf",
          exportXlsUrl: "etcyxxxgl/etcyxxxgl/exportXls",
          exportDeleteDataXlsUrl: "etcyxxxgl/etcyxxxgl/exportDeleteDataXls",
          importExcelUrl: "etcyxxxgl/etcyxxxgl/importExcel",
          importYxrExcelUrl: "etcyxxxgl/etcyxxxgl/importYxrExcel",
          exportTemplateUrl: "etcyxxxgl/etcyxxxgl/exportTemplateXls",
          exportYxrTemplateUrl: "etcyxxxgl/etcyxxxgl/exportYxrTemplateXls",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    },
    importYxrExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importYxrExcelUrl}`;
    }
  },
    created () {
      this.queryParam.khrq_end = moment(new Date()).format('YYYY-MM-DD');
      this.getCurrentMonth()
    },
    methods: {
      moment,
      getCurrentMonth() {
        let curDate = new Date();
        let curMonth = {year: curDate.getFullYear(), month: curDate.getMonth() + 1,}
        this.defaultMonthOpera = moment(curDate, this.monthFormat);
        this.queryParam = {tjyf: undefined};
        this.queryParam.tjyf=this.defaultMonthOpera;
      },
      handleEditYxr (record) {
        postAction(this.url.editCheck, { khsfzh: record.khsfzh, khsj: record.khsj, khrq: record.khrq }).then(result => {
          if (result.success) {
            this.$refs.modalForm.edit(record)
            this.$refs.modalForm.title = '修改营销人'
            this.$refs.modalForm.disableSubmit = false
            this.$refs.modalForm.disabled = true
          } else {
            this.$message.warning(result.message)
          }
        })

      },
      handleEdit (record) {
        this.$refs.modalForm.edit(record)
        this.$refs.modalForm.title = '编辑'
        this.$refs.modalForm.disableSubmit = false
        this.$refs.modalForm.disabled = false
      },
      onChange(date,dateString){
        dateString=this.queryParam.tjyf;
      },
      onChangeBeginday: function(value, dateString){
        let khrqString = dateString
        this.queryParam.khrq_begin = khrqString[0]
        this.queryParam.khrq_end = khrqString[1]
      },
      getQueryParams() {
        let tjyfment = "";
        if (this.queryParam.tjyf) {
          tjyfment = moment(this.queryParam.tjyf).format("YYYY-MM")+'-01';
        }
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf){
          param.tjyf = tjyfment;
        }
        delete param.khrq;
        return filterObj(param);
      },
      handleDelete: function (record) {
        console.log(record)
        if (!this.url.delete) {
          this.$message.error('请设置url.delete属性!')
          return
        }
        var that = this
        deleteAction(that.url.delete, { khsfzh: record.khsfzh, khsj: record.khsj, khrq: record.khrq }).then((res) => {
          if (res.success) {
            that.$message.success(res.message)
            that.loadData()
          } else {
            that.$message.warning(res.message)
          }
        })
      },
      searchReset() {
        this.flag = false;
        this.queryParam = {tjyf: undefined, yxjgdm: undefined};
        this.queryParam.tjyf = this.defaultMonthOpera;
        if(!store.getters.isRoot) {
          this.queryParam.yxjgdm = store.getters.ywjgdm
        }
        this.loadData(1);
      },
      loadData(arg) {
        // 获取当前月份
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
        if ((params.tjyf != undefined && params.tjyf != null)) {
          params.tjyf = moment(params.tjyf).format("YYYY-MM") + '-01';
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
      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let tjyf = ''
        let param = Object.assign({}, this.queryParam)
        if (this.queryParam.tjyf !== undefined && this.queryParam.tjyf !== null) {
          tjyf = moment(param.tjyf).format("YYYY-MM") + '-01'
        }
        param.tjyf=tjyf;
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()));
        param.paramsStr = paramsStr
        console.log("导出参数",param)
        this.exportLoading = true
        downFile(this.url.exportXlsUrl,param).then((data)=>{
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
        }).finally(()=>{
          this.exportLoading = false
          // this.loadData(1)
        })
      },
      excelImportYxr(){
        let params = {}
        params.exportTemplateUrl = this.url.exportYxrTemplateUrl
        params.importExcelUrl = this.importYxrExcelUrl
        params.exportTemplateName = 'ETC营销人信息导入模板'
        this.$refs.excelImportYxrModal.showModal(params);
      },
      batchDelete() {
        if (this.queryParam.tjyf === undefined || this.queryParam.tjyf === "") {
          this.$message.warning("请选择统计月份！")
          return false
        }
        let tjyfStr = moment(this.queryParam.tjyf).format("YYYY-MM")+'-01'
        let _that = this
        this.$confirm({
          title: "确认删除",
          content: "是否删除指定月份的数据?",
          onOk: function () {
            _that.loading = true;
            deleteAction(_that.url.deleteBatchByTjyf, {tjyf: tjyfStr}).then((res) => {
              if (res.success) {
                _that.$message.success(res.message);
                _that.loadData();
              } else {
                _that.$message.warning(res.message);
              }
            }).finally(() => {
              _that.loading = false;
            });
          }
        });
      },
      exportDeleteData(){
        let fileName = "etc营销批量删除数据导出"
        let param = this.queryParam
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()));
        param.paramsStr = paramsStr
        if (this.queryParam.tjyf != undefined && this.queryParam.tjyf != "") {
          let tjyf = moment(this.queryParam.tjyf).format("YYYY-MM") + '-01'
          param.tjyf=tjyf;
        }
        console.log("导出参数",param)
        downFile(this.url.exportDeleteDataXlsUrl,param).then((data)=>{
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
      },
      transferData() {
        if (this.queryParam.yxrgh === undefined || this.queryParam.yxrgh === "") {
          this.$message.warning("请输入营销人工号！")
          return false
        }
        this.$refs['etcyxxxglTransfer'].showModal(this.queryParam)
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>