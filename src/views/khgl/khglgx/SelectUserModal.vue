<template>
  <div>
    <a-modal centered
             :title="title"
             :width="1000"
             :visible="visible"
             @ok="handleOk"
             @cancel="handleCancel"
             cancelText="关闭">

      <!-- 查询区域 -->
      <div class="table-page-search-wrapper">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="24">
              <a-col :span="6"><a-form-item label="客户经理">
                <j-dict-select-tag placeholder="请选择客户经理" v-model="this.queryParam.sskhjl"
                                   dictCode="HR_BAS_STAFF,YGXM,YGGH" treeNodeFilterProp="title" :showSearch="true"/>
              </a-form-item></a-col>
              <a-col :span="10"><a-form-item label="转给客户经理">
                <j-select-ygxx ref="zkhjl" :treeDefaultExpandAll="true" @change="GetValueZkhjl"/>
              </a-form-item></a-col>
              <a-col :span="8"><span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span></a-col>
            </a-row>
          </a-form>
        </div>
      </div>

      <!-- table区域-begin -->
      <div>
        <a-table bordered
                 size="small"
                 rowKey="id"
                 :columns="columns1"
                 :dataSource="dataSource1"
                 :pagination="ipagination"
                 :loading="loading"
                 :scroll="{ y: 240 }"
                 :rowSelection="{selectedRowKeys: selectedRowKeys,onSelectAll:onSelectAll,onSelect:onSelect,onChange: onSelectChange}"
                 @change="handleTableChange"/>
      </div>
    </a-modal>
  </div>
</template>

<script>
  import {filterObj} from '@/utils/util'
  import {getAction,putAction} from '@/api/manage'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JSelectYgxx from './JSelectYgxx'
  export default {
    name: "SelectUserModal",
    components:{JTreeSelect,JSelectYgxx},
    data() {
      return {
        title: "客户转移",
        placement: 'right',
        description: '',
        zygkhjlzh: "",
        sskhjl: "",
        visible: false,
        loading: false,
        selectedRowKeys: [],
        selectedRows: [],
        names: [],
        model: [],
        // 表头
        columns1: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 50,
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '客户姓名',
            align:"center",
            dataIndex: 'khxm'
            ,width:160
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
            ,width:160
          },
          {
            title: '所属客户经理',
            align:"center",
            dataIndex: 'sskhjl_dictText'
            ,width:160
          },

        ],
        //数据集
        dataSource1: [],
        // 查询条件
        queryParam: {
          sskhjl:"",
        },
        // 分页参数
        ipagination: {
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
        isorter: {
          column: 'createTime',
          order: 'desc',
        },
        url: {
          list: "/khglgx/khgl_khglgx/list",
        }
      }
    },
    created() {
      this.loadData();
    },
    methods: {
      GetValueZkhjl(value){
        this.zygkhjlzh=value.yggh;
        /*this.model.zkhjl=value.yggh;
        this.zkhjlacct=value.ygxm;*/
      },
      ceshi(){
        setTimeout(() =>{
          this.$refs.zkhjl.clearName();
        },3000);
        this.$emit('searchQuery');
      },
      searchQuery() {
        this.loadData(1);
      },
      searchReset() {
        this.queryParam = {};
        this.loadData(1);
      },
      handleCancel() {
        this.onClearSelected();
        this.visible = false;
      },
      handleOk() {
        let user=this;
        if(this.zygkhjlzh==null||this.zygkhjlzh==""){
          alert("请选择被转移客户经理")
        }else{
        putAction("/khglgx/khgl_khglgx/transfer",{"rows":this.selectionRows,"transferTo":this.zygkhjlzh}).then((res)=>{
          if(res.success){
            alert("转移成功")
            this.onClearSelected();
            this.visible = false;
            setTimeout(() =>{
              user.$emit('ceshi2');
            },3000);
            this.$emit('reset');
          }else{
            alert("转移失败")
            this.$refs.zkhjl.ygxm="";
            this.visible = false;
          }
        })}
       // this.$refs.zyhkhjl.visible = true;
       // this.$refs.zyhkhjl.selectRow = this.selectionRows;
       /* this.dataSource2 = this.selectedRowKeys;
        console.log("data:" + this.dataSource2);
        this.$emit("selectFinished", this.dataSource2);
        this.visible = false;*/
      },
      add() {
        this.visible = true;
      },
      loadData(arg) {
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();//查询条件
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource1 = res.result.records;
            this.ipagination.total = res.result.total;
          }
        })
      },
      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        return filterObj(param);
      },
      getQueryField() {
        //TODO 字段权限控制
      },
      onSelectAll(selected, selectedRows, changeRows) {
        if (selected === true) {
          for (var a = 0; a < changeRows.length; a++) {
            this.dataSource2.push(changeRows[a]);
          }
        } else {
          for (var b = 0; b < changeRows.length; b++) {
            this.dataSource2.splice(this.dataSource2.indexOf(changeRows[b]), 1);
          }
        }
        // console.log(selected, selectedRows, changeRows);
      },
      onSelect(record, selected) {
        if (selected === true) {
          this.dataSource2.push(record);
        } else {
          var index = this.dataSource2.indexOf(record);
          //console.log();
          if (index >= 0) {
            this.dataSource2.splice(this.dataSource2.indexOf(record), 1);
          }

        }
      },
      onSelectChange(selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys;
        this.selectionRows = selectedRows;
      },
      onClearSelected() {
        this.selectedRowKeys = [];
        this.selectionRows = [];
      },
      handleDelete: function (record) {
        this.dataSource2.splice(this.dataSource2.indexOf(record), 1);
      },
      handleTableChange(pagination, filters, sorter) {
        //分页、排序、筛选变化时触发
        console.log(sorter);
        //TODO 筛选
        if (Object.keys(sorter).length > 0) {
          this.isorter.column = sorter.field;
          this.isorter.order = "ascend" == sorter.order ? "asc" : "desc"
        }
        this.ipagination = pagination;
        this.loadData();
      },
    }
  }
</script>
<style lang="less" scoped>
  .ant-card-body .table-operator {
    margin-bottom: 18px;
  }

  .ant-table-tbody .ant-table-row td {
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .anty-row-operator button {
    margin: 0 5px
  }

  .ant-btn-danger {
    background-color: #ffffff
  }

  .ant-modal-cust-warp {
    height: 100%
  }

  .ant-modal-cust-warp .ant-modal-body {
    height: calc(100% - 110px) !important;
    overflow-y: auto
  }

  .ant-modal-cust-warp .ant-modal-content {
    height: 90% !important;
    overflow-y: hidden
  }
</style>