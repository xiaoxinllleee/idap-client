<template>
  <a-modal :title="title"
           :visible="visible"
           :footer="null"
           width="75%"
           :confirmLoading="confirmLoading"
           :maskClosable="false"
           @cancel="handleClose">

<!--    查找区域-->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">

        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="评定周期">
              <a-select placeholder="请选择评定周期" v-model="queryParam.pdzq" :change="handlePdzq">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="DD">天</a-select-option>
                <a-select-option value="MM">月</a-select-option>
                <a-select-option value="Q">季</a-select-option>
                <a-select-option value="YYYY">年</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item  label="评定年份" v-show="queryParam.pdzq=='YYYY'">
                <a-select placeholder="请选择评定年份" v-model="pdnf" :defaultValue="dateValue" @blur="selectValue">
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


          <a-col :md="6" :sm="8">
            <a-form-item label="组织标识">
              <j-tree-select placeholder="请选择组织标识"
                             pidField="sjzzbz"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.zzbz"
                             dict="v_hr_bas_organization_cmms,ZZJC,zzbz"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户经理标识">
              <a-input placeholder="请输入客户经理标识" v-model="queryParam.khjlbz"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户经理名称">
              <a-input placeholder="请输入客户经理名称" v-model="queryParam.ygxm"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="8" :lg="9" :md="10" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
               <a-button type="primary" @click="determine" icon="check" style="margin-left: 8px">确定</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

<!--    &lt;!&ndash;    根据条件查询的待分配账号&ndash;&gt;-->
<!--    <a-button type="primary" @click="determine">-->
<!--      确定接收人-->
<!--    </a-button>-->
    <a-table
      ref="table"
      size="middle"
      bordered
      rowKey="yggh,zzbz,gwbz,pdrq,pdzq"
      :columns="columns"
      :dataSource="dataSource"
      :row-selection="rowSelection"
      :loading="loading"
    >
    </a-table>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/manage'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'

export default {
  name: 'AccountInFo',
  mixins:[JeecgListMixin],
  components: {
    JTreeSelect
  },
  data () {
    return {
      loading: false,
      title: '查找带回',
      pdzqD: null,
      pdzqM: null,
      pdzqQ: null,
      pdzqY: null,
      pdnf:'',
      jdssnf:'',
      pdjd:'',
      open: false,
      dateValue: '',
      dataSource: [],
      queryParam:{},
      columns: [
        {
          title: '评定周期',
          align: 'center',
          dataIndex: 'pdzq_dictText'
        },
        {
          title: '评定日期',
          align: 'center',
          dataIndex: 'pdrq'
        },
        {
          title: '组织标识',
          align: 'center',
          dataIndex: 'zzbz'
        },
        {
          title: '机构代码',
          align: 'center',
          dataIndex: 'zzbz_dictText'
        },

        {
          title: '岗位名称',
          align: 'center',
          dataIndex: 'gwbz_dictText'
        },
        {
          title: '员工工号',
          align: 'center',
          dataIndex: 'yggh'
        },
        {
          title: '员工姓名',
          align: 'center',
          dataIndex: 'ygxm'
        },
        {
          title: '客户经理标识',
          align: 'center',
          dataIndex: 'khjlbz'
        },
      ],
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      obj: { } ,
      url: {
        getListFindBack: '/zbsjtz/zbsjtz/getListClaim'
      }
    }
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          this.obj=selectedRows[0];
          this.selectedRowKeys = selectedRowKeys
        },
        getCheckboxProps: record => ({
          props: {
            // disabled: record.name === 'Disabled User', // Column configuration not to be checked
            //name: record.name,
          }
        }),
        type: 'radio'
      }
    }
  },
  created () {
    this.dqnf();
  },
  methods: {
    handlePdzq(){
        var param = this.queryParam
      console.log(param.pdzq)
       if(param.pdzq=='DD'){
         this.pdzqD=true
         this.pdzqM=false
         this.pdzqQ=false
         this.pdzqY=false
       }else if(param.pdzq=='MM') {
         this.pdzqD=false
         this.pdzqM=true
         this.pdzqQ=false
         this.pdzqY=false
       } else if (param.pdzq=='Q') {
         this.pdzqD=false
         this.pdzqM=false
         this.pdzqQ=true
         this.pdzqY=false
       } else if (param.pdzq=='YYYY') {
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
      console.log('ZbrwglList => selectValue(value)')
      console.log('selectValue::::'+value)
      let val=value;
      this.$emit('change', val);
    },


    openChange (status) {
      if (status) {
        this.open = true
      } else {
        this.open = false
      }
    },
    panelChange (value) {
      this.year = value

      let nf = this.year.format('YYYY' + '-01' + '-01')
      if (nf == null && nf == undefined && nf == '') {
        this.$message.warning('请重新选择日期')
        return
      }
      this.queryParam.pdrq = nf
      console.log(this.queryParam.pdrq)
      this.open = false
    },
    handleClose () {
      this.visible = false
      this.obj={}
      this.queryParam={}
      this.dataSource=[]
    },
    determine(){
      if(!this.obj){
        this.$message.warning('请选择存款账号接收人')
      }
      this.$emit("close", this.obj)
      this.handleClose ()
    },
    init () {
      this.visible = true
      this.obj = {}
      this.selectedRowKeys = []
    },
    searchReset() {
      this.queryParam={}
      let  params={
      }
      this.loading=true
      httpAction(this.url.getListFindBack,params,'post').then((res) => {
        if (res.success) {
          this.dataSource = res.result;
        }else{
          this.$message.warning("查询失败")
        }
      }).finally(()=>{
        this.loading=false
      })
    },
    searchQuery(){
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
      var param=Object.assign({},this.queryParam,this.isorter);
      param.pdrq=pdrqMoment;
      // getListClaim
      httpAction(this.url.getListFindBack,param,'post').then((res) => {
        if (res.success) {
          this.dataSource = res.result;
        }else{
          this.$message.warning("查询失败")
        }
      }).finally(()=>{
        this.loading=false
      })
    },
  }
}
</script>

<style scoped>

</style>