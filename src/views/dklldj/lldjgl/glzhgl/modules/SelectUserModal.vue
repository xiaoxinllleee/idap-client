<template>
  <div>
    <a-modal centered
             :title="title"
             :width="1000"
             :visible="visible"
             @ok="handleOk"
             @cancel="handleCancel"
             cancelText="关闭" >
      <!-- 查询区域 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="24">

            <a-col :span="6"><a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.khmc"></j-input>
            </a-form-item></a-col>
            <a-col :span="6"><a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item></a-col>
            <a-col :span="6"><a-form-item label="客户类型">
              <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam.khlx" dict-code="lldj_khlx"></j-dict-select-tag>
            </a-form-item></a-col>
            <a-col :span="6">
              <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <!-- table区域-begin -->
      <div>
        <a-table bordered
                 size="small"
                 rowKey="id"
                 :columns="columns"
                 :dataSource="dataSource"
                 :pagination="ipagination"
                 :loading="loading"
                 :rowSelection="{
                   selectedRowKeys: selectedRowKeys,
                   onSelectAll:onSelectAll,
                   onSelect:onSelect,
                   onChange: onSelectChange,
                   type: type
                 }"
                 @change="handleTableChange">

        </a-table>
      </div>
      <!-- table区域-end -->


    </a-modal>
  </div>
</template>

<script>
  import {filterObj} from '@/utils/util'
  import {getAction} from '@/api/manage'
  import JInput from "../../../../../components/jeecg/JInput";

  export default {
    name: "SelectUserModal",
    components: {JInput},
    data() {
      return {
        title: "被关联人客户",
        names: [],
        visible: false,
        placement: 'right',
        description: '',
        // 查询条件
        queryParam: {},
        type: 'radio',
        // 表头
        columns: [
          {
            title: '组织标识',
            align: "center",
            dataIndex: 'zzbz'
          },
          {
            title: '组织名称',
            align: "center",
            dataIndex: 'zzbz_dictText'
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
            title: '法人代表',
            align: "center",
            dataIndex: 'frdb'
          },
        ],
        columns2: [
          {
            title: '用户账号',
            align: "center",
            dataIndex: 'username',

          },
          {
            title: '用户名称',
            align: "center",
            dataIndex: 'realname',
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            width: 100,
            scopedSlots: {customRender: 'action'},
          }
        ],
        //数据集
        dataSource: [],
        dataSource2: [],
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
        // isorter: {
        //   column: 'lrsj',
        //   order: 'desc',
        // },
        loading: false,
        selectedRowKeys: [],
        selectedRows: [],
        url: {
          list: "/dklldj.jbxxgl.khxxgl/rate_khjbxxb/list",
        }
      }
    },
    created() {

    },
    methods: {
      onClearSelected() {
        this.selectedRowKeys = [];
        this.selectionRows = [];
        this.queryParam = {}
        //this.loadData();
      },
      loadData(arg) {
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();//查询条件
        this.loading = true
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          }
        }).finally(()=>{
          this.loading = false
        })
      },
      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        return filterObj(param);
      },
      searchQuery() {
        this.loadData(1);
      },
      searchReset() {
        this.queryParam = {};
        this.loadData(1);
      },
      add() {
        this.visible = true;
      },
      handleOk() {
        this.dataSource2 = this.selectedRowKeys;
        //console.log("data:" + this.dataSource2);
        console.info('确认关联客户信息:',this.selectionRows)
        this.$emit("selectFinished", this.selectionRows);
        this.visible = false;
      },
      handleCancel() {
        this.visible = false;
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
        if (selectedRowKeys.length == 1) {
          this.selectedRowKeys = selectedRowKeys;
          this.selectionRows = selectedRows;
          console.info('已选择的关联客户:',this.selectionRows)
        } else {
          alert("只能选择一个被关联客户")
          this.selectedRows = [];
          this.selectedRowKeys = [];
        }
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
      getQueryField() {
        //TODO 字段权限控制
      }
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