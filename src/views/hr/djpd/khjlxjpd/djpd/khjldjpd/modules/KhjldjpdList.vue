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
            <a-form-item  label="评定年份" v-show="queryParam.pdzq=='YYYY'">
              <a-select placeholder="请选择评定年份" v-model="pdnf" :defaultValue="dateValue" @change="selectValue">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="评定季度" v-show="queryParam.pdzq=='Q'">
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
            <a-form-item  label="评定月份" v-show="queryParam.pdzq=='MM'">
              <a-month-picker placeholder="请选择评定月份" v-model="queryParam.pdrq" @change="selectValue" style="width: 100%;" />
            </a-form-item>
            <a-form-item  label="评定日期" v-if="queryParam.pdzq=='DD'">
              <a-date-picker placeholder="请选择评定日期" v-model="queryParam.pdrq" @change="selectValue" style="width: 100%;" />
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
         <!-- <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="支行名称">
              <j-tree-select placeholder="请选择支行名称"
                             v-model="queryParam.zhmc"
                             treeNodeFilterProp="title"
                             pid-field="sjzzbz"
                             dict="v_hr_bas_organization, sjzzjc, zzbz"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构名称">
              <j-tree-select placeholder="请选择机构名称"
                             v-model="queryParam.zzbz"
                             treeNodeFilterProp="title"
                             pid-field="sjzzbz"
                             dict="v_hr_bas_organization, zzjc, zzbz"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="岗位标识">
              <j-dict-select-tag
                placeholder="全部"
                v-model="queryParam.gwbz"
                dictCode="Hr_bas_post,gwmc,gwbz"
              />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
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
      <a-button icon="download" @click="handleExportXls('客户经理等级评定')" v-has="'Khjldjpd:exp'">导出</a-button>
      <a-button @click="init" icon="area-chart" v-has="'Khjldjpd:init'">提取</a-button>
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
          <a @click="handleEdit(record)" v-has="'Khjldjpd:edit'">编辑</a>

          <!--<a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <khjldjpd-modal ref="modalForm" @ok="modalFormOk"></khjldjpd-modal>
  </a-card>
</template>

<script>
  import KhjldjpdModal from './KhjldjpdModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import {filterObj} from "@/utils/util";
  import { getAction, putAction } from '@api/manage'
  import moment from 'moment'

  export default {
    name: "KhjldjpdList",
    mixins:[JeecgListMixin],
    components: {
      KhjldjpdModal,JTreeSelect
    },
    data () {
      return {
        description: '客户经理等级评定管理页面',
        dateValue: '',
        pdzqD: null,
        pdzqM: null,
        pdzqQ: null,
        pdzqY: null,
        pdnf:'',
        jdssnf:'',
        pdjd:'',
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
            title: '支行名称',
            align:"center",
            dataIndex: 'zhmc_dictText'
          },
		   {
            title: '机构名称',
            align:"center",
            dataIndex: 'zzbz_dictText'
           },
          {
            title: '岗位名称',
            align:"center",
            dataIndex: 'gwbz_dictText'
           },
		   {
            title: '员工工号',
            align:"center",
            dataIndex: 'yggh'
           },
          {
            title: '客户经理名称',
            align:"center",
            dataIndex: 'yggh_dictText'
           },
		   {
            title: '评级得分',
            align:"center",
            dataIndex: 'pjdf'
           },
		   /*{
            title: '所属等级',
            align:"center",
            dataIndex: 'ssdj_dictText'
           },*/
		   /*{
            title: 'ywjgxz',
            align:"center",
            dataIndex: 'ywjgxz'
           },
		   {
            title: 'szqy',
            align:"center",
            dataIndex: 'szqy'
           },
		   {
            title: 'sspjxs',
            align:"center",
            dataIndex: 'sspjxs'
           },
		   {
            title: 'dkqx',
            align:"center",
            dataIndex: 'dkqx'
           },*/
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/khjldjpd/khjldjpd/list",
          delete: "/khjldjpd/khjldjpd/delete",
          deleteBatch: "/khjldjpd/khjldjpd/deleteBatch",
          exportXlsUrl: "khjldjpd/khjldjpd/exportXls",
          importExcelUrl: "khjldjpd/khjldjpd/importExcel",
          init: "/khjldjpd/khjldjpd/init",
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
      init(){
        console.log(this.queryParam.pdzq)
        console.log(this.queryParam.pdrq)
        if (!this.queryParam.pdzq){
          this.$message.error("请选择评定周期!")
          return
        }
        let pdzq=this.queryParam.pdzq
        let sjrqMoment =""
          if(pdzq=="DD"){
            if (this.queryParam.pdrq != null && this.queryParam.pdrq != 'undefined'){
              sjrqMoment=this.queryParam.pdrq.format("YYYY-MM-DD")
            }else {
              this.$message.error("请选择评定日期!")
              return
            }
          }else if(pdzq=="MM") {
            if (this.queryParam.pdrq != null && this.queryParam.pdrq != 'undefined') {
              sjrqMoment=this.queryParam.pdrq.format("YYYY-MM")+"-01"
            }else {
              this.$message.error("请选择评定月份!")
              return
            }
          } else if (pdzq=="Q") {
            if (this.jdssnf != '' && this.pdjd != '') {
              let day = new Date(this.jdssnf,this.pdjd,0)
              let dayCount = day.getDate()
              sjrqMoment=this.jdssnf + '-' + this.pdjd + '-01'
            }else {
              this.$message.error("请选择评定季度!")
              return
            }
          } else if (pdzq=="YYYY") {
            if (this.pdnf != '') {
              sjrqMoment=this.pdnf + '-01-01'
            }else {
              this.$message.error("请选择评定年份!")
              return
            }
          console.log(sjrqMoment)
        }
        this.loading=true;
        putAction(this.url.init,{ "pdzq":this.queryParam.pdzq,"pdrq": sjrqMoment }).then((res)=>{
          console.log(res)
          if (res.success) {
            this.$message.success(res.message)
            this.initLoading=false;
            this.loadData(1)
          } else {
            this.$message.warning(res.message,5)
            this.initLoading=false;
            this.loading = false
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
        console.log('ZbsjglList => selectValue(value)')
        console.log('selectValue::::'+value)
        let val=value;
        this.$emit('change', val);
      },

      // 查询条件[pdrq]格式化Func
      getQueryParams() {
        console.log('ZbsjglList => getQueryParams()')
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
        this.queryParam = {}
        // 重置时清除季度所属年份
        this.jdssnf=''
        // 重置时清除评定年份
        this.pdjd=''
        this.pdnf =''

        this.loadData(1)
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>