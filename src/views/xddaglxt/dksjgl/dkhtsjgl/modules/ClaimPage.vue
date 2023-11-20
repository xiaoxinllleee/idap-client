<template>
  <a-modal :title="title"
           :visible="visible"
           :footer="null"
           width="75%"
           :confirmLoading="confirmLoading"
           :maskClosable="false"
           @cancel="handleClose">

    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="4" :sm="5">
            <a-form-item label="机构名称">
              <j-tree-select placeholder="请选择机构名称"
                             v-model="queryParam.jgdm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="5">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="5">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="5">
            <a-form-item label="贷款责任人工号">
              <a-input placeholder="请输入贷款责任人工号" v-model="queryParam.dkzrr"></a-input>
            </a-form-item>
          </a-col>
          <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
          <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
        </a-row>
      </a-form>
    </div>
    <div>


    </div>

  <!--    根据条件查询的待分配账号-->
    <a-table
      ref="table"
      size="middle"
      bordered
      :columns="columns"
      :dataSource="dataSource1"
      :pagination="ipagination"
      :row-selection="rowSelection"
      :loading="loading"
      >
    </a-table>
    <account-info ref="accountInfo" @close="colseWindow"></account-info>
  </a-modal>
</template>

<script>
import {  getAction,httpAction } from '@/api/manage'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import moment from 'moment'
import AccountInfo from './AccountInfo'
import pick from 'lodash.pick'
import {filterObj} from "../../../../../utils/util";

  export default {
    name: "CustomerInfoDetail",
    components: {
      AccountInfo,JTreeSelect
    },
    data() {
      return {
        loading:false,
        title: '账号认领',
        ipagination:{
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['10', '20', '30'],
          showTotal: (total, range) => {
            return range[0] + "-" + range[1] + " 共" + total + "条"
          },
          showQuickJumper: true,
          showSizeChanger: true,
          total: 0
        },
        queryParam:{},
        // rowSelection:{
        //   type:'checkbox',
        // },
        //表头
        columns: [
          {
            title: '机构名称',
            align: "center",
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc'
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm'
          },
          {
            title: '客户类型',
            align: "center",
            dataIndex: 'khlx_dictText'
          },
          {
            title: '合同号',
            align: "center",
            dataIndex: 'hth'
          },
          {
            title: '业务编号',
            align: "center",
            dataIndex: 'ywbh'
          },
          {
            title: '贷款责任人工号',
            align: "center",
            dataIndex: 'dkzrr'
          },
          {
            title: '贷款责任人姓名',
            align: "center",
            dataIndex: 'dkzrr_dictText'
          },
        ],
        visible: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        records: {
          zzbz:'',
          zzbz_dictText:'',
          yggh:'',
          yggh_dictText:'',
        },
        //数据集
        dataSource1: [],
        dataSource2:[],
        // 分页参数
        // ipagination: {
        //   current: 1,
        //   pageSize: 10,
        //   pageSizeOptions: ['10', '50', '100'],
        //   showTotal: (total, range) => {
        //     return range[0] + "-" + range[1] + " 共" + total + "条"
        //   },
        //   total: 0
        // },

        array:[],
        url: {
          list: "/dkhtsjgl/dkhtsjgl/list",
          preservation:'/ckzhglgl/ckjkptCkzhglxx/preservation',

        },
      }
    },
    created(){
      this.isAll = store.getters.isRoot
      this.loadData(1)
    },
    computed: {
      rowSelection() {
        return {
          onChange: (selectedRowKeys, selectedRows) => {
            this.array=selectedRows;
            console.log(this.array)
          },
          getCheckboxProps: record => ({
            props: {
              //disabled: record.name === 'Disabled User', // Column configuration not to be checked
              //name: record.name,
            },
          }),
        };
      },
    },
    created() {},
    methods: {
      searchReset() {
        this.queryParam = {}
        this.selectedRowKeys = [];
        this.dataSource2=[];
        this.selectionRows=[];
        this.loadData(1);
      },
      searchQuery() {
        this.loadData(1);
      },
      loadData(arg) {
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        this.loading = true;
        var params = this.getQueryParams();//查询条件
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource1 = res.result.records;
            this.ipagination.total = res.result.total;
            this.loading = false;
          }else{
            this.$message.error(res.message,5);
            this.loading = false;
          }
        })
      },
      getQueryParams() {
        var param = Object.assign({}, this.queryParam,this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        return filterObj(param);
      },
      getQueryField() {
        //TODO 字段权限控制
      },
      preservation(){
        if (!this.records.yggh){
          this.$message.warning('请选择移交人')
          return
        }
        if(this.array.length==0){
          this.$message.warning('请选择移交人账号')
          return
        }
        this.records.rlyf=this.records.rlyf.format('YYYY-MM')+'-01';
        let param={
          array:this.array,
          gwbz:this.records.gwbz,
          khjlbz:this.records.khjlbz,
          gyh:this.records.gyh,
          zzbz:this.records.zzbz,
          rglx:this.records.rglx,
          yggh:this.records.yggh,
          rlyf:this.records.rlyf,
          ywjgdm:this.records.ywjgdm};
        httpAction(this.url.preservation,param,'post').then((res) => {
          if (res.success) {
            this.$message.success("移交成功");
          }else{
            this.$message.warning("移交失败")
          }
        })
        this.handleClose();
        this.$emit("close", 1)
      },
      getCurrentMonth() {
        let curDate = new Date();
        let curMonth = {year: curDate.getFullYear(), month: curDate.getMonth() + 1,}
        this.defaultMonthOpera = moment(curDate);
        this.records.rlyf=moment(curDate);
      },
      colseWindow(args){
        this.records.zzbz = args.zzbz
        this.records.zzbz_dictText = args.zzbz_dictText
        this.records.yggh = args.yggh
        this.records.yggh_dictText = args.yggh_dictText
        this.model = Object.assign({}, this.records);
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'yggh_dictText','yggh','zzbz','zzbz_dictText'))  // loadsh的pick方法
        })
      },
      getListFindBack(){
        this.$refs.accountInfo.init();
      },
      handleClose(){
        this.visible=false;
        this.records={
          yggh_dictText:'',
          gwbz:'',
          khjlbz:'',
          zzbz:'',
          rglx:'',
          yggh:'',
          fpyf:'',
        }
        ;
        this.array=[];
      },
      /*init(params){
        this.getCurrentMonth();
         getAction(this.url.list, params).then((res) => {
           if (res.success) {
             this.dataSource = res.result.records;
             this.ipagination.total = res.result.total;
           }else{
             this.dataSource =[];
             this.ipagination.total=0;
           }
           if(res.code===510){
             this.$message.warning(res.message,5)
           }
           this.loading = false;
         })
        this.$forceUpdate();
        this.visible=true;
      }*/
    },
  }
</script>

<style scoped>

</style>