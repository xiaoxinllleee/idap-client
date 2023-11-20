<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8"><a-form-item label="统计月份">
            <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" style="width: 100%;"
                             :format="monthFormat"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="所属机构">
            <j-tree-select placeholder="请选择所属机构" v-model="queryParam.jgdm" dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pid-field="sjzzbz"
                           :show-search="true" treeNodeFilterProp="title" :tree-default-expand-all="true"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="业务编号">
            <a-input placeholder="请输入业务编号" v-model="queryParam.ywbh"/>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item label="执行定价ID">
              <a-input placeholder="请输入执行定价ID" v-model="queryParam.zxdjid"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.khmc" type="likemore"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="利率对比">
              <j-dict-select-tag placeholder="请选择利率对比" v-model="queryParam.lldb" dict-code="lldj_lldb"/>
            </a-form-item></a-col>
          </template>

          <a-col :md="6" :sm="8" >
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
      <a-button @click="init" icon="area-chart" v-has="'qylldb:init'">提取</a-button>
      <a-button icon="download" @click="handleExportXls('签约利率对比')" v-has="'qylldb:exportXls'">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
         :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      </div>-->

      <a-table ref="table"
               size="middle"
               bordered
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"

               :scroll="{ x: 2200 }"
               @change="handleTableChange">
        <span slot="action" slot-scope="text, record">
          <a @click="handleView(record)" v-has="'qylldb:see'">查看</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <qylldb-modal ref="modalForm" @ok="modalFormOk"></qylldb-modal>
  </a-card>
</template>

<script>
  import QylldbModal from './modules/QylldbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {downFile, getAction, putAction} from '../../../../api/manage'
  import moment from 'moment'
  import { filterObj } from '@/utils/util';
  import JTreeSelect from '../../../../components/jeecg/JTreeSelect'
  import JInput from '../../../../components/jeecg/JInput'

  export default {
    name: "QylldbList",
    mixins:[JeecgListMixin],
    components: { JInput, JTreeSelect, QylldbModal },
    data () {
      return {
        description: '签约利率对比 管理页面',
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: '',
        // 重置标识
        flag: true,
        isorter: {
          columns: 'tjyf',
          order: 'desc',
        },
        // 表头
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
            title: '统计月份',
            align: "center",
            dataIndex: 'tjyf',
            customRender:function (text) {
              return !text?"":(text.length>8?text.substr(0,7):text)
            },
            sorter: (a, b) => b.tjyf.replace(/-/g, '/') - a.tjyf.replace(/-/g, '/'),
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
          {
            title: '业务编号',
            align: "center",
            dataIndex: 'ywbh'
          },
          {
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc'
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            width: 180
          },
          {
            title: '贷款金额合计(元)',
            align: "center",
            dataIndex: 'dkjehj',
            width: 130
          },
          {
            title: '贷款笔数',
            align: "center",
            dataIndex: 'dkbs'
          },
          {
            title: '合同日期',
            align: "center",
            dataIndex: 'htrq',
            customRender:function (text) {
              return !text?"":(text.length>10?text.substr(0,10):text)
            },
          },
          {
            title: '签约利率(‰)',
            align: "center",
            dataIndex: 'qyll'
          },
          {
            title: '执行定价ID',
            align: "center",
            dataIndex: 'zxdjid'
          },
          {
            title: '定价日期',
            align: "center",
            dataIndex: 'djnf',
            customRender:function (text) {
              return !text?"":(text.length>10?text.substr(0,10):text)
            },
          },
          {
            title: '定价得分',
            align: "center",
            dataIndex: 'djdf'
          },
          {
            title: '基准利率(%)',
            align: "center",
            dataIndex: 'jzll'
          },
          {
            title: '上浮幅度(%)',
            align: "center",
            dataIndex: 'sffd'
          },
          {
            title: '执行利率(%)',
            align: "center",
            dataIndex: 'zxll'
          },
          {
            title: 'LPR利率',
            align: "center",
            dataIndex: 'lprll'
          },
          {
            title: '基点(加/减)BP',
            align: "center",
            dataIndex: 'jdbp',
            width: 120
          },
          {
            title: '利率对比',
            align: "center",
            dataIndex: 'lldb_dictText'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: { customRender: 'action' },
            fixed: "right",
            width: 100,
          }
        ],
        url: {
          init: "/tjfxgl/qylldb/init",
          list: "/tjfxgl/qylldb/list",
          delete: "/tjfxgl/qylldb/delete",
          deleteBatch: "/tjfxgl/qylldb/deleteBatch",
          exportXlsUrl: "tjfxgl/qylldb/exportXls",
          importExcelUrl: "tjfxgl/qylldb/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      moment,
      searchReset() {
        this.flag = false;
        this.queryParam = {tjyf: undefined};
        this.queryParam.tjyf = this.defaultMonthOpera;
        this.loadData(1);
      },
     /* getCurrentMonth() {
        let curDate = new Date();
        // let curMonth= { year : curDate.getFullYear(), month: curDate.getMonth() + 1, }
        // this.defaultMonthOpera = moment(curMonth.year+'-'+0+curMonth.month, this.monthFormat);
        this.defaultMonthOpera=moment(curDate.getFullYear()+'-'+(curDate.getMonth()+1),this.monthFormat); //当前月份
      },*/
      getQueryParams() {
        let tjyfMoment = '';
        if (this.queryParam.tjyf) {
          tjyfMoment = moment(this.queryParam.tjyf).format("YYYY-MM")+"-01";
        }
        var param      = Object.assign({},this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf = tjyfMoment;
        }
        return filterObj(param);
      },
      loadData(arg) {
        // 获取当前月份
        //this.getCurrentMonth();
        if (!this.url.list){
          this.$message.error("请设置url.list属性!");
          return;
        }
        // 加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        // 查询条件
        var params = this.getQueryParams();
       /* if ((params.tjyf=='undefined' || params.tjyf==null)) {
          params.tjyf = this.defaultMonthOpera.format("YYYY-MM")+'-01';
        }*/
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          }
          if(res.code===510){
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })
      },
      init() {
        if (this.queryParam.tjyf==null || this.queryParam==undefined) {
          this.$message.error("请选择统计月份！");
          return;
        }
        let tjyfMoment = moment(this.queryParam.tjyf).format("YYYYMMDD");
        this.loading = true;
        putAction(this.url.init, {tjyf: tjyfMoment}).then((res) => {
          if (res.success) {
            this.$message.success("提取成功！");
            this.loadData(1);
          } else {
            this.$message.warning("提取失败！");
          }
          this.loading = false;
        })
      },
      handleView: function(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title="查看单户贷款明细";
        this.$refs.modalForm.disableSubmit = true;
      },
      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let tjyf = ''
        let param = this.queryParam
        if (this.queryParam.tjyf === undefined || this.queryParam.tjyf === "") {
          //this.$message.warning("统计月份不能为空！")
          tjyf = moment(this.defaultMonthOpera).format("YYYY-MM") + '-01'
        }else {
          tjyf = moment(param.tjyf).format("YYYY-MM") + '-01'
        }
        param.tjyf=tjyf;
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()));
        param.paramsStr = paramsStr
        console.log("导出参数",param)
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
        })
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>