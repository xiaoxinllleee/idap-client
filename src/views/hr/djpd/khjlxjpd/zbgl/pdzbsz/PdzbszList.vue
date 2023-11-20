<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="评定周期">
              <a-select placeholder="全部" v-model="queryParam.pdzq" :change="handlePdzq()">
                <a-select-option value="DD">
                  天
                </a-select-option>
                <a-select-option value="MM">
                  月
                </a-select-option>
                <a-select-option value="Q">
                  季
                </a-select-option>
                <a-select-option value="YYYY">
                  年
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item  label="评定年份" v-if="pdzqY">
              <a-select placeholder="请选择评定年份" v-model="pdnf" :defaultValue="dateValue" @change="selectValue">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
            <!--<a-form-item  label="评定日期" v-if="this.queryParam.pdzq=='YYYY'">
              <a-year-picker placeholder="请选择评定年份" v-model="queryParam.pdrq" @change="selectValue" style="width: 100%;" />
            </a-form-item>-->
            <a-form-item label="评定季度" v-if="pdzqQ">
              <a-select placeholder="评定季度年份" v-model="jdssnf" :defaultValue="dateValue" @change="selectValue" style="width: 35%;">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
              <a-select placeholder="请选择评定季度" v-model="pdjd" @change="selectValue" style="width: 65%;">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="01">第一季度</a-select-option>
                <a-select-option value="04">第二季度</a-select-option>
                <a-select-option value="07">第三季度</a-select-option>
                <a-select-option value="10">第四季度</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item  label="评定月份" v-if="pdzqM">
              <a-month-picker placeholder="请选择评定月份" v-model="queryParam.pdrq" @change="selectValue" style="width: 100%;" />
            </a-form-item>

            <a-form-item  label="评定日期" v-if="pdzqD">
              <a-date-picker placeholder="请选择评定日期" v-model="queryParam.pdrq" @change="selectValue" style="width: 100%;" />
            </a-form-item>
          </a-col>
          <!--<a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="评定日期">
              <a-input placeholder="请输入评定日期" v-model="queryParam.pdrq"></a-input>
            </a-form-item>
          </a-col>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="指标ID">
              <a-input placeholder="请输入指标ID" v-model="queryParam.zbid"></a-input>
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
      <a-button @click="handleAdd(queryParam)" type="primary" icon="plus" v-has="'Pdzbsz:add'">新增</a-button>
      <a-button icon="download" @click="handleExportXls('评定指标设置')" v-has="'Pdzbsz:exp'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'Pdzbsz:imp'">导入</a-button>
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
          <a @click="handleEdit(record)" v-has="'Pdzbsz:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                  <a v-has="'Pdzbsz:del'">删除</a>
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
    <pdzbsz-modal ref="modalForm" @ok="modalFormOk"></pdzbsz-modal>
    <pdzbsz-set-modal ref="modalForm2" @ok="modalFormOk"></pdzbsz-set-modal>
  </a-card>
</template>

<script>
  import PdzbszModal from './modules/PdzbszModal'
  import PdzbszSetModal from './modules/PdzbszSetModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {deleteAction} from "@/api/manage";
  import {filterObj} from "@/utils/util";
  import ExcelImport from '@comp/common/ExcelImport'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import JEllipsis from '@comp/jeecg/JEllipsis'

  export default {
    name: "PdzbszList",
    mixins:[JeecgListMixin],
    components: {
      PdzbszModal,ExcelImport,JTreeSelect,JEllipsis,PdzbszSetModal
    },
    data () {
      return {
        description: '评定指标设置管理页面',
        dateValue: '',
        pdzqY: null,
        pdzqQ: null,
        pdzqM: null,
        pdzqD: null,
        pdjd: '',
        jdssnf:'',
        pdnf: '',
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
            title: '评定周期',
            align:"center",
            dataIndex: 'pdzq_dictText'
           },
		   {
            title: '评定日期',
            align:"center",
            dataIndex: 'pdrq'
           },
		   {
            title: '指标ID',
            align:"center",
            dataIndex: 'zbid'
           },
		   {
            title: '指标名称',
            align:"center",
            dataIndex: 'zbmc'
           },
		   {
            title: '指标分值',
            align:"center",
            dataIndex: 'zbfz'
           },
		   {
            title: '加减标识',
            align:"center",
            dataIndex: 'zbabs_dictText'
           },
		   {
            title: '加权比率',
            align:"center",
            dataIndex: 'jqbl'
           },
		   {
            title: '加权分值',
            align:"center",
            dataIndex: 'jqfz'
           },
		   {
            title: '加权限制分值',
            align:"center",
            dataIndex: 'jqxzfz'
           },
		   {
            title: '减权比率',
            align:"center",
            dataIndex: 'kqbl'
           },
		   {
            title: '减权分值',
            align:"center",
            dataIndex: 'kqfz'
           },
		   {
            title: '减权限制分值',
            align:"center",
            dataIndex: 'kqxzfz'
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
            title: '修改人',
            align:"center",
            dataIndex: 'xgr'
           },
		   {
            title: '修改时间',
            align:"center",
            dataIndex: 'xgsj'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/pdzbsz/pdzbsz/list",
          delete: "/pdzbsz/pdzbsz/delete",
          deleteBatch: "/pdzbsz/pdzbsz/deleteBatch",
          exportXlsUrl: "pdzbsz/pdzbsz/exportXls",
          importExcelUrl: "pdzbsz/pdzbsz/importExcel",
          exportTemplateUrl:"/pdzbsz/pdzbsz/exportTemplateXls",
       },
        exportTemplateName: '评定指标设置管理导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },

    created(){
      this.queryParam.pdzq = 'YYYY'
      this.dqnf();
    },

    methods: {
      handleDelete: function (record) {
        console.log(record)
        if(!this.url.delete){
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        deleteAction(that.url.delete, {pdzq: record.pdzq,zbid: record.zbid}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },

      // 评定周期下拉框选中项变更Func
      handlePdzq(){
        var param = this.queryParam
        if(param.pdzq=="DD"){
          this.pdzqD=true
          this.pdzqM=false
          this.pdzqQ=false
          this.pdzqY=false
        }else if(param.pdzq=="MM") {
          this.pdzqD=false
          this.pdzqM=true
          this.pdzqQ=false
          this.pdzqY=false
        } else if (param.pdzq=="Q") {
          this.pdzqD=false
          this.pdzqM=false
          this.pdzqQ=true
          this.pdzqY=false
        } else if (param.pdzq=="YYYY") {
          this.pdzqD=false
          this.pdzqM=false
          this.pdzqQ=false
          this.pdzqY=true
        }
      },

      // 获取当前年份
      dqnf(){
        var myDate = new Date;
        var year = myDate.getFullYear();
        this.initSelectYear(year)
      },
      // 初始化年份选择下拉框
      initSelectYear(year){
        this.years = [];
        for(let i=0; i<30; i++){
          this.years.push({value:((year - i)+''),label:((year - i)+'')});
        }
      },
    // 下拉选择Func
      selectValue(value){
        console.log('ZhdjglList => selectValue(value)')
        console.log('selectValue::::'+value)
        let val=value;
        this.$emit('change', val);
      },
      getQueryParams() {
        console.log('PdzbszlList => getQueryParams()')
        console.log(this.pdnf)
        let pdzq=this.queryParam.pdzq
        let pdrqMoment=""
        if (this.queryParam.pdzq  || this.queryParam.pdrq) {
          if(pdzq=="DD"){
            if (this.queryParam.pdrq != null && this.queryParam.pdrq != 'undefined'){
              pdrqMoment=this.queryParam.pdrq.format("YYYY-MM-DD")
            }
          }else if(pdzq=="MM") {
            if (this.queryParam.pdrq != null && this.queryParam.pdrq != 'undefined') {
              pdrqMoment=this.queryParam.pdrq.format("YYYY-MM")+"-01"
            }
          } else if (pdzq=="Q") {
            if (this.jdssnf != '' && this.pdjd != '') {
              let day = new Date(this.jdssnf,this.pdjd,0)
              let dayCount = day.getDate()
              pdrqMoment=this.jdssnf + '-' + this.pdjd + '-01'
            }
          } else if (pdzq=="YYYY") {
            if (this.pdnf != '') {
              pdrqMoment=this.pdnf + '-01-01'
            }
          }
        }
        console.log('查询 => pdzq::::::::::' + pdzq)
        console.log('查询 => pdrqMoment::::' + pdrqMoment)
        var param=Object.assign({},this.queryParam,this.isorter);
        param.field=this.getQueryField();
        param.pageNo=this.ipagination.current;
        param.pageSize=this.ipagination.pageSize;
        param.pdrq=pdrqMoment;
        return filterObj(param);
      },

      // 查询条件重置Func
      searchReset() {
        this.queryParam = {pdzq:'YYYY'}
        // 重置时清除季度所属年份
        /*this.jdssnf=''*/
        // 重置时清除评定年份
        this.pdjd=''
        this.pdnf =''

        this.loadData(1)
      },
      handleAdd: function (queryParam) {

        let pdzq=this.queryParam.pdzq
        let pdrqMoment=""
        if (this.queryParam.pdzq  || this.queryParam.pdrq) {
          if(pdzq=="DD"){
            if (this.queryParam.pdrq != null && this.queryParam.pdrq != 'undefined'){
              pdrqMoment=this.queryParam.pdrq.format("YYYY-MM-DD")
            }else {
              this.$message.error("请选择评定日期！")
              return
            }
          }else if(pdzq=="MM") {
            if (this.queryParam.pdrq != null && this.queryParam.pdrq != 'undefined') {
              pdrqMoment=this.queryParam.pdrq.format("YYYY-MM")+"-01"
            }else {
              this.$message.error("请选择评定月份！")
              return
            }
          } else if (pdzq=="Q") {
            if (this.jdssnf != '' && this.pdjd != '') {
              pdrqMoment=this.jdssnf + '-' + this.pdjd + '-01'
            }else {
              this.$message.error("请选择评定季度！")
              return
            }
          } else if (pdzq=="YYYY") {
            if (this.pdnf != '') {
              pdrqMoment=this.pdnf + '-01-01'
            }else {
              this.$message.error("请选择评定年份！")
              return
            }
          }
        }
        queryParam.pdrq =pdrqMoment
        queryParam = Object.assign({},this.queryParam);
        console.log(queryParam)
        this.$refs.modalForm2.add(queryParam);
        this.$refs.modalForm2.title = "新增";
        this.$refs.modalForm2.disableSubmit = false

      },
      handleEdit: function (record) {
        this.$refs.modalForm.edit(record)
        this.$refs.modalForm.title = '编辑'
        this.$refs.modalForm.disableSubmit = false
        this.$refs.modalForm.disabled = true;
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>