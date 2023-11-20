<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="所属机构">
            <j-tree-select placeholder="请选择所属机构"
                           v-model="queryParam.jgdm"
                           treeNodeFilterProp="title"
                           pid-field="sjywjgdm"
                           dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                           :sszh="true"
                           :showSearch="true"
                           :treeDefaultExpandAll="true"/>
          </a-form-item></a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="评定类型">
              <a-select placeholder="全部" v-model="queryParam.pdlx" :change="handlePdzq()">
                <a-select-option value="MM">
                  月
                </a-select-option>
                <a-select-option value="Q">
                  季
                </a-select-option>
                <a-select-option value="YY">
                  半年
                </a-select-option>
                <a-select-option value="YYYY">
                  年
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item  label="评定年份" v-if="pdlxY">
              <a-select placeholder="请选择评定年份" v-model="pdnf" :defaultValue="dateValue" @change="selectValue">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
            <!--<a-form-item  label="评定日期" v-if="this.queryParam.pdzq=='YYYY'">
              <a-year-picker placeholder="请选择评定年份" v-model="queryParam.pdrq" @change="selectValue" style="width: 100%;" />
            </a-form-item>-->
            <a-form-item label="评定季度" v-if="pdlxQ">
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

            <a-form-item  label="评定月份" v-if="pdlxM">
              <a-month-picker placeholder="请选择评定月份" v-model="queryParam.pdzq" @change="selectValue" style="width: 100%;" />
            </a-form-item>

            <a-form-item  label="评定半年" v-if="pdlxYY">
              <a-select placeholder="评定年份" v-model="bnssnf" :defaultValue="dateValue" @change="selectValue" style="width: 35%;">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
              <a-select placeholder="请选择评定周期" v-model="pdbn" @change="selectValue" style="width: 65%;">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="01">上半年</a-select-option>
                <a-select-option value="07">下半年</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="商户编码">
              <a-input placeholder="请输入商户编码" v-model="queryParam.shbm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="商户名称">
              <a-input placeholder="请输入商户名称" v-model="queryParam.shmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户经理名称">
              <a-input placeholder="请输入客户经理名称" v-model="queryParam.khjlbz"></a-input>
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
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('商户评级报表')" v-has="'shpjbb:exportXls'">导出</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
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
        :scroll="{x: 3000}"
        @change="handleTableChange">

        <!--<span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>-->

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <shpjbb-modal ref="modalForm" @ok="modalFormOk"></shpjbb-modal>
  </a-card>
</template>

<script>
  import ShpjbbModal from './modules/ShpjbbModal'
  import moment from 'moment'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {filterObj} from "@/utils/util";
  import store from '@/store/'

  export default {
    name: "ShpjbbList",
    mixins:[JeecgListMixin],
    components: {
      ShpjbbModal,JTreeSelect
    },
    data () {
      return {
        description: '商户评级报表管理页面',
        queryParam: {pdlx: 'MM'},
        dateValue: '',
        pdlxYY: null,
        pdlxM: null,
        pdlxQ: null,
        pdlxY: null,
        pdnf:'',
        jdssnf:'',
        pdjd:'',
        pdbn:'',
        bnssnf:'',
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
            title: '评定类型',
            align:"center",
            dataIndex: 'pdlx_dictText'
           },
		   {
            title: '评定周期',
            align:"center",
            dataIndex: 'pdzq'
           },
		   {
            title: '机构代码',
            align:"center",
            dataIndex: 'jgdm_dictText'
           },
		   {
            title: '商户编码',
            align:"center",
            dataIndex: 'shbm'
           },
		   {
            title: '商户名称',
            align:"center",
            dataIndex: 'shmc'
           },
		   {
            title: '联系电话',
            align:"center",
            dataIndex: 'lxdh'
           },
		   {
            title: '客户经理名称',
            align:"center",
            dataIndex: 'khjlbz'
           },
		   {
            title: '关联账号',
            align:"center",
            dataIndex: 'glzh'
           },
		   {
            title: '上期评定日平',
            align:"center",
            dataIndex: 'sqpdrp'
           },
		   {
            title: '上期评定等级',
            align:"center",
            dataIndex: 'sqpddj'
           },
		   {
            title: '本期评定日平',
            align:"center",
            dataIndex: 'bqpdrp'
           },
		   {
            title: '本期评定等级',
            align:"center",
            dataIndex: 'bqpddj'
           },
		   // {
       //      title: '评定日期',
       //      align:"center",
       //      dataIndex: 'pdrq'
       //     },
		   {
            title: '等级是否有调整',
            align:"center",
            dataIndex: 'djsfytz_dictText'
           },
		   {
            title: '录入标志',
            align:"center",
            dataIndex: 'lrbz_dictText'
           },
		   {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr'
           },
		   {
            title: '录入日期',
            align:"center",
            dataIndex: 'lrrq'
           },
		   {
            title: '修改人',
            align:"center",
            dataIndex: 'xgr'
           },
		   {
            title: '修改日期',
            align:"center",
            dataIndex: 'xgrq'
           },
          /*{
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/shpjbb/shpjbb/list",
          delete: "/shpjbb/shpjbb/delete",
          deleteBatch: "/shpjbb/shpjbb/deleteBatch",
          exportXlsUrl: "shpjbb/shpjbb/exportXls",
          importExcelUrl: "shpjbb/shpjbb/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created(){
      this.dqnf();
    },

    methods: {
      handlePdzq(){
        var param = this.queryParam
        if(param.pdlx=="YY"){
          this.pdlxYY=true
          this.pdlxM=false
          this.pdlxQ=false
          this.pdlxY=false
        }else if(param.pdlx=="MM") {
          this.pdlxYY=false
          this.pdlxM=true
          this.pdlxQ=false
          this.pdlxY=false
        } else if (param.pdlx=="Q") {
          this.pdlxYY=false
          this.pdlxM=false
          this.pdlxQ=true
          this.pdlxY=false
        } else if (param.pdlx=="YYYY") {
          this.pdlxYY=false
          this.pdlxM=false
          this.pdlxQ=false
          this.pdlxY=true
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
        console.log('ZhrpbbList => selectValue(value)')
        console.log('selectValue::::'+value)
        let val=value;
        this.$emit('change', val);
      },

      // 查询条件[pdrq]格式化Func
      getQueryParams() {
        console.log('ZhrpbbList => getQueryParams()')
        console.log(this.pdnf)
        let pdlx=this.queryParam.pdlx
        let pdrqMoment=""
        if (this.queryParam.pdlx  || this.queryParam.pdlx) {
          if(pdlx=="YY"){
            if (this.queryParam.pdlx != null && this.queryParam.pdlx != 'undefined'){
              let day = new Date(this.bnssnf,this.bnssnf,0)
              let dayCount = day.getDate()
              pdrqMoment=this.bnssnf+"-" + this.pdbn+ '-01'
            }
          }else if(pdlx=="MM") {
            if (this.queryParam.pdlx != null && this.queryParam.pdlx != 'undefined') {
              pdrqMoment = moment(this.queryParam.pdzq).format("YYYY-MM")+'-01'
            }
          } else if (pdlx=="Q") {
            if (this.jdssnf != '' && this.pdjd != '') {
              let day = new Date(this.jdssnf,this.pdjd,0)
              let dayCount = day.getDate()
              pdrqMoment=this.jdssnf + '-' + this.pdjd + '-01'
            }
          } else if (pdlx=="YYYY") {
            if (this.pdnf != '') {
              pdrqMoment=this.pdnf + '-01-01'
            }
          }
        }
        console.log('查询 => pdzq::::::::::' + pdlx)
        console.log('查询 => pdrqMoment::::' + pdrqMoment)
        var param=Object.assign({},this.queryParam,this.isorter);
        param.field=this.getQueryField();
        param.pageNo=this.ipagination.current;
        param.pageSize=this.ipagination.pageSize;
        param.pdzq=pdrqMoment;
        return filterObj(param);
      },
      // 查询条件重置Func
      searchReset() {
        this.queryParam = {jgdm: undefined};
        if(!store.getters.isRoot) {
          this.queryParam.jgdm = store.getters.ywjgdm
        }
        // 重置时清除季度所属年份
        this.jdssnf=''
        // 重置时清除评定年份
        this.pdjd=''
        this.pdnf =''
        this.bnssnf=''

        this.loadData(1)
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>