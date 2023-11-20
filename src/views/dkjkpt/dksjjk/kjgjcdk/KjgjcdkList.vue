<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8"><a-form-item label="所属机构">
            <j-tree-select placeholder="请选择所属机构" v-model="queryParam.brNo" dict="V_HR_BAS_ORGANIZATION_CMMSZH,ZZJC,YWJGDM" pid-field="SJYWJGDM"
                           treeNodeFilterProp="title" :showSearch="true" :treeDefaultExpandAll="true" :isAll="true" getAllZzjg="1"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="客户名称">
            <j-input placeholder="请输入客户名称" v-model="queryParam.custName" type="likemore"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="证件号码">
            <a-input placeholder="请输入证件号码" v-model="queryParam.identNo"/>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item label="贷款账号">
              <a-input placeholder="请输入贷款账号" v-model="queryParam.acctNo"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="借款日期">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.qxDate" :format="DateFormat" @change="onQxDateChange" style="width: 100%;" />
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="到期日期">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.endDate" :format="DateFormat" @change="onEndDateChange" style="width: 100%;" />
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="贷款金额">
              <a-input-group compact>
                <a-input-number placeholder="" v-model="queryParam.advVal_begin" :min="0" style=" width: 40%; text-align: center; "/>
                <a-input placeholder="<->" disabled style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "/>
                <a-input-number placeholder="" v-model="queryParam.advVal_end" :min="0" style="width: 40%; text-align: center; border-left: 0;"/>
              </a-input-group>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="贷款余额">
              <a-input-group compact>
                <a-input-number placeholder="" v-model="queryParam.loanBal_begin" :min="0" style=" width: 40%; text-align: center; "/>
                <a-input placeholder="<->" disabled style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "/>
                <a-input-number placeholder="" v-model="queryParam.loanBal_end" :min="0" style="width: 40%; text-align: center; border-left: 0; "/>
              </a-input-group>
            </a-form-item></a-col>

            <a-col :md="6" :sm="8"><a-form-item label="第一责任人">
              <j-input placeholder="请输入第一责任人" v-model="queryParam.custCn" type="likemore"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="贷款形态">
              <j-select-multiple v-model="queryParam.fiveClassType" :options="jselectMultiple.options1" placeholder="请选择贷款形态"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item></a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item></a-form-item></a-col>
            <a-col :md="24" :sm="24"><a-form-item label="信贷贷款品种">
              <j-select-multiple v-model="queryParam.businessPhase" :options="jselectMultiple.options2" placeholder="请选择信贷贷款品种"/>
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
      <a-button @click="handleInit" icon="area-chart" v-has="'kjgjcdk:InitData'">提取</a-button>
      <a-button icon="download" @click="handleExportXls('跨机构交叉贷款')" v-has="'kjgjcdk:exportXls'">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
<!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
<!--        <a-menu slot="overlay">-->
<!--          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>-->
<!--        </a-menu>-->
<!--        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
<!--      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
<!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }} </a>项-->
<!--        <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
<!--      </div>-->

      <a-table ref="table"
               size="middle"
               bordered
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               @change="handleTableChange">

<!--        <span slot="action" slot-scope="text, record">-->
<!--          <a @click="handleEdit(record)">编辑</a>-->
<!--          <a-divider type="vertical" />-->
<!--          <a-dropdown>-->
<!--            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>-->
<!--            <a-menu slot="overlay">-->
<!--              <a-menu-item>-->
<!--                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">-->
<!--                  <a>删除</a>-->
<!--                </a-popconfirm>-->
<!--              </a-menu-item>-->
<!--            </a-menu>-->
<!--          </a-dropdown>-->
<!--        </span>-->

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <kjgjcdk-modal ref="modalForm" @ok="modalFormOk"></kjgjcdk-modal>
  </a-card>
</template>

<script>
  import KjgjcdkModal from './modules/KjgjcdkModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JInput from '../../../../components/jeecg/JInput'
  import JTreeSelect from '../../../../components/jeecg/JTreeSelect'
  import { putAction ,downFile} from '../../../../api/manage'
  import { filterObj } from '../../../../utils/util'
  import JSelectMultiple from "../../../../components/jeecg/JSelectMultiple";
  import {ajaxGetDictItems} from '@/api/api'

  export default {
    name: "KjgjcdkList",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect,
      JInput,
      KjgjcdkModal,
      JSelectMultiple
    },
    data () {
      return {
        description: '跨机构交叉贷款管理页面',
        DateFormat: 'YYYY-MM-DD',
        // 表头
        columns: [
          // {
          //   title: '#',
          //   dataIndex: '',
          //   key: 'rowIndex',
          //   width: 60,
          //   align: "center",
          //   customRender:function (t,r,index) {
          //     return parseInt(index)+1;
          //   }
          // },
          {
            title: '机构代码',
            align: "center",
            dataIndex: 'brNo'
          },
          {
            title: '所属机构',
            align: "center",
            dataIndex: 'brNo_dictText'
          },
          {
            title: '客户姓名',
            align: "center",
            dataIndex: 'custName'
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'identNo'
          },
          {
            title: '贷款账号',
            align: "center",
            dataIndex: 'acctNo'
          },
          {
            title: '产品名称',
            align: "center",
            dataIndex: 'catTypeName'
          },
          {
            title: '信贷贷款品种',
            align: "center",
            dataIndex: 'businessPhase_dictText'
          },
          {
            title: '贷款形态',
            align: "center",
            dataIndex: 'fiveClassType_dictText'
          },
          {
            title: '第一责任人',
            align: "center",
            dataIndex: 'custCn'
          },
          {
            title: '借款日期',
            align: "center",
            dataIndex: 'qxDate',
            customRender: (text) => {
              // 日期字符串转换
              return this.formatText(text);
            },
          },
          {
            title: '到期日期',
            align: "center",
            dataIndex: 'endDate',
            customRender: (text) => {
              // 日期字符串转换
              return this.formatText(text);
            },
          },
          {
            title: '贷款金额',
            align: "center",
            dataIndex: 'advVal'
          },
          {
            title: '贷款余额',
            align: "center",
            dataIndex: 'loanBal'
          },
          // {
          //   title: '便民卡卡号',
          //   align: "center",
          //   dataIndex: 'cardNo'
          // },
          // {
          //   title: '贷款种类',
          //   align: "center",
          //   dataIndex: 'loanKind'
          // },
          // {
          //   title: '剩余天数',
          //   align: "center",
          //   dataIndex: 'remainingDays'
          // },
          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   align: "center",
          //   scopedSlots: { customRender: 'action' },
          // }
        ],
        url: {
          init: "/dkjkpt/dksjjk/kjgjcdk/init",
          list: "/dkjkpt/dksjjk/kjgjcdk/list",
          delete: "/dkjkpt/dksjjk/kjgjcdk/delete",
          deleteBatch: "/dkjkpt/dksjjk/kjgjcdk/deleteBatch",
          exportXlsUrl: "dkjkpt/dksjjk/kjgjcdk/exportXls",
          importExcelUrl: "dkjkpt/dksjjk/kjgjcdk/importExcel",
        },
        jselectMultiple:{
          options1:[],
          options2:[],
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created() {
      this.initDictData('dkxt')
      this.initDictData('dkzl')
    },
    methods: {
      initDictData(dictCode) {
        //根据字典Code, 初始化字典数组
        ajaxGetDictItems(dictCode, null).then((res) => {
          if (res.success) {
            if (dictCode=='dkxt') {
              this.jselectMultiple.options1 = res.result;
            }
            if (dictCode=='dkzl') {
              this.jselectMultiple.options2 = res.result;
            }
          }
        })
      },
      handleInit: function() {
        this.loading=true;
        putAction(this.url.init).then((res) => {
          if (res.success) {
            this.$message.success(res.message);
            this.loadData();
          } else {
            this.$message.warning(res.message,5);
          }
          this.loading = false;
        })
      },
      // 借款日期、到期日期 日期字符串 -> 日期格式
      formatText(text){
        var dateFormat = text.substr(0,4)+'-'+text.substr(4,2)+'-'+text.substr(6,2);
        return dateFormat;
      },
      getQueryParams: function() {
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.qxDate;
        delete param.endDate;
        return filterObj(param);
      },
      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let param = {...this.queryParam};
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }
        if (param.tjyf != null){
          param.tjyf=param.tjyf.format("YYYY-MM")+'-01'
        }
        delete param.qxDate;
        delete param.endDate;
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
      onQxDateChange: function(value, dateString) {
        //console.log('111111111111111111111111111');
        //console.log(dateString);
        let qxDateString             = dateString;
        //console.log('222222222222222222222222222');
        //console.log(qxDateString[0],qxDateString[1]);
        this.queryParam.qxDate_begin = qxDateString[0].replace(/-/g, '');
        this.queryParam.qxDate_end   = qxDateString[1].replace(/-/g, '');
        console.log('444444444444444444444444444');
        console.log(this.queryParam.qxDate_begin);
        console.log(this.queryParam.qxDate_end);
      },
      onEndDateChange: function(value, dateString) {
        //console.log('5555555555555555555555555555');
        //console.log(dateString);
        let endDateString = dateString;
        //console.log('6666666666666666666666666666');
        //console.log(endDateString[0],endDateString[1]);
        this.queryParam.endDate_begin = endDateString[0].replace(/-/g, '');
        this.queryParam.endDate_end   = endDateString[1].replace(/-/g, '');
        console.log('7777777777777777777777777777');
        console.log(this.queryParam.endDate_begin);
        console.log(this.queryParam.endDate_end);
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>