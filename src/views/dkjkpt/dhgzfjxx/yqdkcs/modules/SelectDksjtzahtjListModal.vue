<template>
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :span="6">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构查询"
                             pid-field="sjywjgdm"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.jgdm"
                             v-decorator="['jgdm', {rules: [{required: true, message: '请选择机构查询！'}]}]"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>

          <a-col :span="6">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称查询" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>


          <template v-if="toggleSearchStatus">
            <a-col :span="6">
              <a-form-item label="证件号码">
                <a-input placeholder="请输入证件号码查询" v-model="queryParam.zjhm"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="借款日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-range-picker
                  style="width: 210px"
                  format="YYYY-MM-DD"
                  :placeholder="['开始时间', '结束时间']"
                  @change="onDateChange_jkrq"
                  v-model="queryParam.jkrq"
                />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="到期日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-range-picker
                  style="width: 210px"
                  format="YYYY-MM-DD"
                  :placeholder="['开始时间', '结束时间']"
                  @change="onDateChange_dqrq"
                  v-model="queryParam.dqrq"
                />
              </a-form-item>
            </a-col>
          </template>

          <a-col :span="6" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchByquery" icon="search">查询</a-button>
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

    <a-table
      ref="table"
      rowKey="zjhm"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="ipagination"
      :scroll="{ x: 1500, y: 300 }"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange,type:'radio'}"
      @change="handleTableChange"
    >

    </a-table>
  </a-modal>
</template>

<script>
  import { filterObj } from '@/utils/util';
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { getAction,putAction,httpAction } from '@/api/manage'
  export default {
    name: "SelectDksjtzahtjListModal",
    components: {
      JTreeSelect
    },
    data () {
      return {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        title:"选择客户",
        queryParam: {},
        jkrq_begin:null,
        jkrq_end:null,
        dqrq_begin:null,
        dqrq_end:null,
        columns: [
          {
            title: '统计月份',
            align:"center",
            dataIndex: 'tjyf'
          },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
          },
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
            title: '贷款账号',
            align:"center",
            dataIndex: 'dkzh'
          },
          {
            title: '便民卡卡号',
            align:"center",
            dataIndex: 'bmkkh'
          },
          {
            title: '贷款金额',
            align:"center",
            dataIndex: 'dkje'
          },
          {
            title: '贷款余额',
            align:"center",
            dataIndex: 'dkye'
          },
          {
            title: '借款日期',
            align:"center",
            dataIndex: 'jkrq'
          },
          {
            title: '到期日期',
            align:"center",
            dataIndex: 'dqrq'
          },
          {
            title: '贷款形态',
            align:"center",
            dataIndex: 'dkxt_dictText'
          },
          /* {
             title: '文件名',
             align:"center",
             dataIndex: 'wjm'
           },*/
        ],
        dataSource:[],
        ipagination:{
          current: 1,
          pageSize: 5,
          pageSizeOptions: ['5', '10', '20'],
          showTotal: (total, range) => {
            return range[0] + "-" + range[1] + " 共" + total + "条"
          },
          showQuickJumper: true,
          showSizeChanger: true,
          total: 0
        },
        isorter:{

        },
        selectedRowKeys: [],
        selectionRows: [],
        visible:false,
        toggleSearchStatus:false,
      }
    },
    created() {
      this.loadData();
    },
    methods: {
      onDateChange_jkrq(date, dateString) {
        this.jkrq_begin=date[0].format("YYYY-MM-DD");
        this.jkrq_end=date[1].format("YYYY-MM-DD");
      },
      onDateChange_dqrq(date, dateString) {
        this.dqrq_begin=date[0].format("YYYY-MM-DD");
        this.dqrq_end=date[1].format("YYYY-MM-DD");
      },
      add (selectUser,userIds) {
        this.visible = true;
        this.edit(selectUser,userIds);
      },
      edit(selectUser,userIds){
        if(!userIds){
          this.selectedRowKeys = []
        }else{
          this.selectedRowKeys = userIds.split(',');
        }
        if(!selectUser){
          this.selectionRows=[]
        }else{
          this.selectionRows = selectUser;
        }
      },
      loadData (arg){
        if(arg===1){
          this.ipagination.current = 1;
        }
        let params = this.getQueryParams();//查询条件
        delete params.jkrq; // 时间参数不传递后台
        delete params.dqrq; // 时间参数不传递后台
        if (this.jkrq_begin!=null&&this.jkrq_end!=null){
          params.jkrq_begin=this.jkrq_begin;
          params.jkrq_end=this.jkrq_end;
        }
        if (this.dqrq_begin!=null&&this.dqrq_end!=null){
          params.dqrq_begin=this.dqrq_begin;
          params.dqrq_end=this.dqrq_end;
        }
        getAction("/bndksjjktz/dndksjjktz/list",params).then((res)=>{
          if(res.success){
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          }
        })
      },
      getQueryParams(){
        let param = Object.assign({}, this.queryParam);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        return filterObj(param);
      },
      getQueryField(){
        let str = "zjhm,";
        for(let a = 0;a<this.columns.length;a++){
          str+=","+this.columns[a].dataIndex;
        }
        return str;
      },
      onSelectChange (selectedRowKeys,selectionRows) {
        this.selectedRowKeys = selectedRowKeys;
        console.log(this.selectedRowKeys);
        this.selectionRows = selectionRows;
      },
      searchReset(){

        this.queryParam = {}
        this.jkrq_end=null;
        this.jkrq_begin=null;
        this.dqrq_end=null;
        this.dqrq_begin=null;
        this.loadData(1);
      },
      handleTableChange(pagination, filters, sorter){
        //TODO 筛选
        if (Object.keys(sorter).length>0){
          this.isorter.column = sorter.field;
          this.isorter.order = "ascend"==sorter.order?"asc":"desc"
        }
        this.ipagination = pagination;
        this.loadData();
      },
      handleCancel () {
        this.selectionRows = [];
        this.selectedRowKeys = [];
        this.visible = false;
      },
      handleOk () {
        this.$emit("choseUser",this.selectionRows);
        this.handleCancel();
      },
      searchByquery(){
        this.loadData(1);
      },
      handleToggleSearch(){
        this.toggleSearchStatus = !this.toggleSearchStatus;
      },
    }
  }
</script>
<style scoped>
  .ant-card-body .table-operator{
    margin-bottom: 18px;
  }

  .ant-table-tbody .ant-table-row td{
    padding-top:15px;
    padding-bottom:15px;
  }
  .anty-row-operator button{margin: 0 5px}
  .ant-btn-danger{background-color: #ffffff}

  .ant-modal-cust-warp{height: 100%}
  .ant-modal-cust-warp .ant-modal-body{height:calc(100% - 110px) !important;overflow-y: auto}
  .ant-modal-cust-warp .ant-modal-content{height:90% !important;overflow-y: hidden}

  .anty-img-wrap{height:25px;position: relative;}
  .anty-img-wrap > img{max-height:100%;}
</style>