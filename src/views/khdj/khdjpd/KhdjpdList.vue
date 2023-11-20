<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8"><a-form-item label="评定周期">
            <a-select placeholder="请选择评定周期" v-model="queryParam.pdzq" :change="handlePdzq()">
              <a-select-option value="">请选择</a-select-option>
              <a-select-option value="MM">月</a-select-option>
              <a-select-option value="Q">季</a-select-option>
              <a-select-option value="YYYY">年</a-select-option>
            </a-select>
          </a-form-item></a-col>

          <a-col :md="6" :sm="8">
            <a-form-item :labelCol="this.labelCol" :wrapperCol="this.wrapperCol" label="评定月份" v-if="pdzqM">
              <a-month-picker placeholder="请选择评定月份" v-model="queryParam.pdrq" @change="selectValue" style="width: 100%;"/>
            </a-form-item>
            <a-form-item :labelCol="this.labelCol" :wrapperCol="this.wrapperCol" label="评定季度" v-if="pdzqQ">
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
            <a-form-item :labelCol="this.labelCol" :wrapperCol="this.wrapperCol" label="评定年份" v-if="pdzqY">
              <a-select placeholder="请选择评定年份" v-model="pdnf" :defaultValue="dateValue" @change="selectValue">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8"><a-form-item label="评定等级">
            <j-dict-select-tag placeholder="请选择评定等级" v-model="queryParam.pddj" dictCode="KHDJ_KHDJSZ,djmc,djbh"/>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item label="上期评定等级">
              <j-dict-select-tag placeholder="请选择上期评定等级" v-model="queryParam.sqpddj" dictCode="KHDJ_KHDJSZ,djmc,djbh"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="客户类型">
              <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam.khlx" dictCode="khdjpd_khlx"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.khmc" type="likemore"/>
            </a-form-item></a-col>
          </template>

          <a-col :md="6" :sm="8" ><span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
            <a-button @click="searchQuery" type="primary" icon="search">查询</a-button>
            <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            <a @click="handleToggleSearch" style="margin-left: 8px;">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
          </span></a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="initData" icon="area-chart" v-has="'Khdjpd:init'">提取</a-button>
      <a-button @click="handleExportXls('客户等级评定数据')" icon="download" style="margin-left: 8px;" v-has="'Khdjpd:exp'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'Khdjpd:imp'">导入</a-button>
    </div>

    <!-- table区域 begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600;">{{ selectedRowKeys.length }}</a> 项
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
        <span slot="action" slot-scope="text, record">
          <a @click="handleView(record)" v-has="'Khdjpd:view'">查看详情</a>
        </span>
      </a-table>
    </div>
    <!-- table区域 end -->

    <!-- 表单区域 -->
    <khdjpd-modal ref="modalForm" @ok="modalFormOk"/>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import { filterObj } from '@/utils/util'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@/components/common/ExcelImport'
  import { getAction,putAction,httpAction } from '@/api/manage'
  import moment from "moment"
  import AFormItem from 'ant-design-vue/es/form/FormItem'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import KhdjpdModal from './modules/KhdjpdModal'
  import JInput from '@/components/jeecg/JInput'

  export default {
    name: "KhdjpdList",
    mixins:[JeecgListMixin],
    components: {
      AFormItem,
      JTreeSelect,
      KhdjpdModal,
      moment,
      JInput,
      ExcelImport
    },
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
    data () {
      return {
        description: '客户等级评定管理页面',
        // 评定周期初始默认为月
        queryParam: {pdzq: 'MM'},
        pdzqD: null,
        pdzqM: null,
        pdzqQ: null,
        pdzqY: null,
        dateValue: '',
        jdssnf: '',
        pdnf: '',
        pdjd: '',
        // 表头
        columns: [
          {
            title: '评定周期',
            align:"center",
            dataIndex: 'pdzq_dictText'
          },
          {
            title: '评定日期',
            align: "center",
            dataIndex: 'pdrq',
            customRender:function (text) {
              return !text ? "" : (text.length>7?text.substr(0,10):text)
            },
            sorter: true
          },
          /*{
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '所属营销单元',
            align:"center",
            dataIndex: 'ssyxdy_dictText'
          },*/
          {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
          },
          {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText'
          },
          {
            title: '联系方式',
            align:"center",
            dataIndex: 'lxfs'
          },
          {
            title: '评定等级',
            align:"center",
            dataIndex: 'pddj_dictText'
          },
          {
            title: '上期评定等级',
            align:"center",
            dataIndex: 'sqpddj_dictText'
          },
          {
            title: '上期评定日期',
            align: "center",
            dataIndex: 'sqpdrq',
            customRender:function (text) {
              return !text ? "" : (text.length>7?text.substr(0,10):text)
            },
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
          list: "/khgl/khdjpd/list",
          delete: "/khgl/khdjpd/delete",
          init: "/khgl/khdjpd/initData",
          deleteBatch: "/khgl/khdjpd/deleteBatch",
          exportXlsUrl: "/khgl/khdjpd/exportXls",
          importExcelUrl: "/khgl/khdjpd/importExcel",
          exportTemplateUrl: "/khgl/khdjpd/exportTemplateXls",
        },
        exportTemplateName: '客户等级评定导入模板'
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created() {
      this.init();
    },
    methods: {
      // 评定周期下拉框选中项变更Func
      handlePdzq(){
        var param = this.queryParam
        if (param.pdzq=="MM") {
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
      init(){
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
      // 客户评定等级提取Func
      initData() {
        console.log('KhdjpdList => initData()')
        let pdrqStr
        let pdzqStr
        var params = this.queryParam;
        console.log("评定周期：：："+params.pdzq)
        console.log("评定日期：：："+params.pdrq)
        if(params.pdzq==null || params.pdzq=='undefined'){
          this.$message.error("请选择评定周期！")
          return
        }
        if(params.pdzq=='MM'){
          if (params.pdrq==null || params.pdrq=='undefined'){
            this.$message.error("请选择评定月份！")
            return
          } else {
            pdrqStr = moment(params.pdrq).format("YYYYMM") + "01"
          }
        }else if(params.pdzq=='Q'){
            if (this.jdssnf=='' || this.pdjd==''){
              this.$message.error("季度所属年份与评定季度不能为空！")
              return
            } else {
              let day = new Date(this.jdssnf,this.pdjd,0)
              let dayCount = day.getDate()
              pdrqStr = this.jdssnf + this.pdjd + dayCount
            }
        }else {
          if (this.pdnf==''){
            this.$message.error("评定年份不能为空！")
            return
          } else {
            pdrqStr = this.pdnf + "1201"
          }
        }
        pdzqStr=params.pdzq
        console.log("提取 => 评定周期@@@@@@@@::"+pdzqStr)
        console.log("提取 => 评定日期@@@@@@@@::"+pdrqStr)
        this.loading = true
        putAction(this.url.init, {"pdzq": pdzqStr,"pdrq": pdrqStr }, 'put').then((res) => {
          if (res.success) {
            this.$message.success(res.message);
            this.loadData();
          } else {
            this.$message.warning(res.message,5);
          }
          this.loading = false
        })
      },
      // 查询条件[pdrq]格式化Func
      getQueryParams() {
        console.log('KhdjpdList => getQueryParams()')
        console.log(this.pdnf)
        let pdzq=this.queryParam.pdzq
        let pdrqMoment=""
        if (this.queryParam.pdzq  || this.queryParam.pdrq) {
          if (pdzq=="MM") {
            if (this.queryParam.pdrq != null && this.queryParam.pdrq != 'undefined') {
              pdrqMoment=this.queryParam.pdrq.format("YYYY-MM") + '-01'
            }
          } else if (pdzq=="Q") {
            if (this.jdssnf != '' && this.pdjd != '') {
              let day = new Date(this.jdssnf,this.pdjd,0)
              let dayCount = day.getDate()
              pdrqMoment=this.jdssnf + '-' + this.pdjd + '-' + dayCount
            }
          } else if (pdzq=="YYYY") {
            if (this.pdnf != '') {
              pdrqMoment=this.pdnf + '-12-01'
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
      // 下拉选择Func
      selectValue(value){
        console.log('KhdjpdList => selectValue(value)')
        console.log('selectValue::::'+value)
        let val=value;
        this.$emit('change', val);
      },
      // 查看详情Func
      handleView: function (record) {
        console.log('KhdjpdList => handleView: function (record)')
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "评定数据详情";
        this.$refs.modalForm.disableSubmit = true;
      },
      // 查询条件重置Func
      searchReset() {
        this.queryParam = {}
        // 重置时清除季度所属年份
        this.jdssnf=''
        // 重置时清除评定年份
        this.pdnf=''
        this.loadData(1)
      }
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>