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
            <a-form-item label="认领月份">
              <a-month-picker  v-model="records.rlyf" style="width: 100%;"
                              :defaultValue="defaultMonthOpera" :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <a-input  style="width:10%" hidden="hidden"  v-model="records.yggh"></a-input>
          <a-input style="width:10%" disabled="disabled" placeholder="员工姓名" readonly="readonly"  v-model="records.yggh_dictText"></a-input>
          <a-button type="primary" @click="getListFindBack()" icon="search">查找认领</a-button>
          <a-button style="margin-left: 10px" width="46px" type="primary" @click="preservation" icon="search">保存</a-button>
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
      :dataSource="dataSource"
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
import moment from 'moment'
import AccountInfo from './AccountInfo'

  export default {
    name: "CustomerInfoDetail",
    components: {
      AccountInfo
    },
    data() {
      return {
        defaultMonthOpera: '',
        monthFormat: 'YYYY-MM',
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
        dataSource:[],
        queryParam:{},
        // rowSelection:{
        //   type:'checkbox',
        // },
        //表头
        columns: [
          {
            title: '组织名称',
            align: "center",
            dataIndex: 'zzbz_dictText'
          },
          {
            title: '岗位名称',
            align: "center",
            dataIndex: 'gwbz_dictText'
          },
          {
            title: '员工姓名',
            align: "center",
            dataIndex: 'yggh_dictText'
          },  {
            title: '客户账号',
            align: "center",
            dataIndex: 'ckzh'
          },
          {
            title: '账号名称',
            align: "center",
            dataIndex: 'zhmc'
          },
          {
            title: '账号性质',
            align: "center",
            dataIndex: 'zhxz_dictText'
          },
          {
            title: '月存款日平余额',
            align: "center",
            dataIndex: 'ckrpye'
          },
          {
            title: '年存款日平余额',
            align: "center",
            dataIndex: 'nckrpye'
          },
        ],
        visible: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        records: {
          yggh_dictText:'',
          gwbz:'',
          khjlbz:'',
          zzbz:'',
          rglx:'',
          rlyf:'',
          yggh:'',
          ywjgdm:'',
        },
        array:[],
        url: {
          list: "/ckzhglgl/ckjkptCkzhglxx/list",
          preservation:'/ckzhglgl/ckjkptCkzhglxx/preservation',

        },
      }
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
      preservation(){
        if (!this.records.yggh){
          this.$message.warning('请选择认领人')
          return
        }
        if(this.array.length==0){
          this.$message.warning('请选择认领人账号')
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
            this.$message.success("认领成功");
          }else{
            this.$message.warning("认领失败")
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
        this.records.yggh_dictText=args.yggh_dictText;
        this.records.gwbz=args.gwbz;
        this.records.khjlbz=args.khjlbz;
        this.records.zzbz=args.zzbz;
        this.records.rglx=args.rglx;
        this.records.yggh=args.yggh;
        this.records.gyh=args.gyh;
        this.records.ywjgdm=args.ywjgdm;
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
      init(params){
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
      }
    },
  }
</script>

<style scoped>

</style>