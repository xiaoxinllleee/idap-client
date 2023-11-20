<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="任务维度">
            <j-dict-select-tag placeholder="请选择任务维度" v-model="queryParam.rwwd" dict-code="rwwd"/>
          </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item  label="任务日期" v-if="this.queryParam.rwwd=='DD' ">
              <a-date-picker placeholder="请输入任务日期" v-model="queryParam.rwrq"></a-date-picker>
            </a-form-item>

            <a-form-item  label="评定月份" v-if="this.queryParam.rwwd=='MM'">
              <a-month-picker placeholder="请选择评定月份" v-model="queryParam.rwrq" @change="selectValue" style="width: 100%;"/>
            </a-form-item>

            <a-form-item  label="任务季度" v-if="this.queryParam.rwwd=='Q'">
              <a-select placeholder="任务季度年份" v-model="jdssnf" :defaultValue="dateValue" @change="selectValue" style="width: 35%;">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
              <a-select placeholder="请选择任务季度" v-model="rwjd" @change="selectValue" style="width: 65%;">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="01">第一季度</a-select-option>
                <a-select-option value="04">第二季度</a-select-option>
                <a-select-option value="07">第三季度</a-select-option>
                <a-select-option value="10">第四季度</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item
              v-if="this.queryParam.rwwd=='YY'"
              label="任务半年年份">
              <a-select placeholder="半年年份" v-model="bnnf" :defaultValue="dateValue" @change="selectValue" style="width: 35%;">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
              <a-select placeholder="请选择任务半年日期" v-model="rwbnsj" @change="selectValue" style="width: 65%;">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="01">上半年</a-select-option>
                <a-select-option value="07">下半年</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item  label="任务年份" v-if="this.queryParam.rwwd=='YYYY'">
              <a-select placeholder="请选择任务年份" v-model="rwnf" :defaultValue="dateValue" @change="selectValue">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>


          </a-col>


        <template v-if="toggleSearchStatus">
          <a-col :md="6" :sm="8"><a-form-item label="所属支行">
            <j-tree-select placeholder="请选择支行查询" v-model="queryParam.zzbz"
                           dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz"
                           :sszh="true" :showSearch="true" :treeDefaultExpandAll=true treeNodeFilterProp="title"/>
          </a-form-item></a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>

          </template>
          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('个人任务设置')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
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
        :scroll="{ x: 2400 }"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete2(record)">
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
    <gzapGrrwsz-modal ref="modalForm" @ok="modalFormOk"></gzapGrrwsz-modal>
  </a-card>
</template>

<script>
  import GzapGrrwszModal from './modules/GzapGrrwszModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { httpAction,putAction } from '@/api/manage'
  import moment from "moment"
  import { filterObj } from '../../../utils/util'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'





  export default {
    name: "GzapGrrwszList",
    mixins:[JeecgListMixin],
    components: {
      GzapGrrwszModal,moment,JTreeSelect
    },
    data () {
      return {
        /*queryParam: {rwwd: 'DD'},*/
        dateValue: '',
        jdssnf:"",jdssnf:"",rwjd:"",rwnf:"",bnnf:"",rwbnsj:"",
        description: '个人任务设置管理页面',
        // 表头
        columns: [
		   {
            title: '任务维度',
            align:"center",
            dataIndex: 'rwwd_dictText',
           },
		   {
            title: '任务日期',
            align:"center",
            dataIndex: 'rwrq',
             /*customHeaderCell:function(cloumn) {
              alert(cloumn);
           return cloumn;
         }*/
           },
		   {
            title: '组织标识',
            align:"center",
            dataIndex: 'zzbz_dictText',
           },
		   {
            title: '员工工号',
            align:"center",
            dataIndex: 'yggh'
           },
		   {
            title: '客户经理标志',
            align:"center",
            dataIndex: 'khjlbz'
           },
		   {
            title: '员工姓名',
            align:"center",
            dataIndex: 'ygxm'
           },
		   {
            title: '存款净增任务',
            align:"center",
            dataIndex: 'ckjzrw'
           },
		   {
            title: '存款日平净增任务',
            align:"center",
            dataIndex: 'ckrpjzrw'
           },
		   {
            title: '存款客户数净增任务',
            align:"center",
            dataIndex: 'ckkhsjzrw'
           },
		   {
            title: '贷款净增任务',
            align:"center",
            dataIndex: 'dkjzrw'
           },
		   {
            title: '贷款日平净增任务',
            align:"center",
            dataIndex: 'dkrpjzrw'
           },
		   {
            title: '法人贷款客户净增任务',
            align:"center",
            dataIndex: 'frdkkhjzrw'
           },
		   {
            title: '个人贷款客户净增任务',
            align:"center",
            dataIndex: 'grdkkhjzrw'
           },
		   {
            title: '手机银行净增任务',
            align:"center",
            dataIndex: 'sjyhjzrw'
           },
		   {
            title: 'ETC净增任务',
            align:"center",
            dataIndex: 'etcjzrw'
           },
		   {
            title: 'E支付净增任务',
            align:"center",
            dataIndex: 'ezfjzrw'
           },
		   {
            title: '任务完成时间',
            align:"center",
            dataIndex: 'rwwcsj'
           },
		   {
            title: '录入标识',
            align:"center",
            dataIndex: 'lrbz'
           },
		   {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
           },
		   {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            width:90,
            fixed: "right",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/gzap.grrwsz/gzapGrrwsz/list",
          delete: "/gzap.grrwsz/gzapGrrwsz/delete",
          deleteBatch: "/gzap.grrwsz/gzapGrrwsz/deleteBatch",
          exportXlsUrl: "gzap.grrwsz/gzapGrrwsz/exportXls",
          importExcelUrl: "gzap.grrwsz/gzapGrrwsz/importExcel",
       },
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

      handleDelete2: function (record) {
        if(!this.url.delete){
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        putAction(that.url.delete,record).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
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
      // 下拉选择Func
      selectValue(value){
        console.log('KhdjpdList => selectValue(value)')
        console.log('selectValue::::'+value)
        let val=value;
        this.$emit('change', val);
      },



      getQueryParams(){
        let tjyfMoment = "";
        let jsrq = " ";
        let parm = this.queryParam;

        if(parm.rwwd =='MM' && parm.rwrq !='') {
          tjyfMoment =  moment(parm.rwrq).format("YYYY-MM")+'-01';
        }
        if(parm.rwwd =='DD' && parm.rwrq !='') {
          tjyfMoment =  moment(parm.rwrq).format("YYYY-MM-DD");
        }
        if(parm.rwwd =='Q' && this.jdssnf!='' &&this.rwjd!='') {
          let day = new Date(this.jdssnf,this.rwjd,0)
          let dayCount = day.getDate()
          tjyfMoment =  this.jdssnf +'-'+ this.rwjd +'-'+ dayCount;
        }
        if(parm.rwwd =='YY' && this.bnnf!='' &&this.rwbnsj!='') {
          let bnday = new Date(this.bnnf,this.rwbnsj,0)
          let dayCount1 = bnday.getDate()
          tjyfMoment= this.bnnf+'-' + this.rwbnsj +'-' + dayCount1;
        }
        if(parm.rwwd =='YYYY' && this.rwnf!='' ) {
          tjyfMoment= this.rwnf + "-12-01";
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.rwrq     = tjyfMoment;
        return filterObj(param);
      },



      // 查询条件重置Func
      searchReset() {
        this.queryParam = {}
        // 重置时清除季度所属年份
        this.jdssnf=''
        // 重置时清除评定年份
        this.rwjd=''
        this.bnnf=''
        this.rwbnsj=''
        this.rwnf =''

        this.loadData(1)
      }

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>