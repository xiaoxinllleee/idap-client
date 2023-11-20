<template>
    <a-modal :title="title"
             :width="1200"
             :visible="visible"
             :confirmLoading="confirmLoading"
             @ok="handleOk"
             @cancel="handleCancel"
             cancelText="关闭">
      <!--查询区域-->
      <div class="table-page-search-wrapper">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="24">
              <a-col :span="6"><a-form-item label="所属支行">
                <j-tree-select placeholder="请选择所属支行" v-model="queryParam.zzbz" dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz"
                               :sszh="true" :showSearch="true" :treeDefaultExpandAll="true"/>
              </a-form-item></a-col>
              <a-col :span="6"><a-form-item label="交接支行">
                <j-tree-select placeholder="请选择交接支行" ref="xzzbz" dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz"
                               :sszh="true" :showSearch="true" @change="GetValForJjzzbz" :treeDefaultExpandAll="true"/>
              </a-form-item></a-col>
              <a-col :span="8"><a-form-item label="交接客户经理">
                <j-select-ygxx placeholder="请选择交接客户经理" ref="xkhjl" @change="GetValForJjKhjl" :treeDefaultExpandAll="true"/>
              </a-form-item></a-col>
              <a-col :span="4"><span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              </span></a-col>
            </a-row>
          </a-form>
        </div>
      </div>

      <!--table区域-->
      <div><a-table bordered
                    size="small"
                    rowKey="id"
                    :columns="columns"
                    :dataSource="dataSources"
                    :pagination="ipagination"
                    :loading="loading"
                    :rowSelection="{selectedRowKeys: selectedRowKeys, onSelectAll:onSelectAll, onSelect:onSelect, onChange:onSelectChange}"
                    @change="handleTableChange">
      </a-table></div>
    </a-modal>
</template>

<script>
  import JTreeSelect from '../../../../components/jeecg/JTreeSelect'
  import JSelectYgxx from '../JSelectYgxx'
  import { putAction,getAction } from '../../../../api/manage'
  import {filterObj} from '@/utils/util'

  export default {
    name: 'KhglgxKhjjModal',
    components: { JSelectYgxx, JTreeSelect },
    data() {
      return {
        title: '操作',
        loading: false,
        visible: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        // 交接支行
        xzzbz: "",
        // 交接客户经理
        xkhjl: "",
        model: [],
        dataSources: [],
        //dataSource2: [],
        selectedRowKeys: [],
        selectionRows: [],
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            //width: 40,
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '所属支行',
            align:"center",
            dataIndex: 'zzbz_dictText',
          },
          {
            title: '所属客户经理',
            align:"center",
            dataIndex: 'sskhjl_dictText',
          },
          {
            title: '客户姓名',
            align:"center",
            dataIndex: 'khxm',
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm',
          },
        ],
        // 查询参数
        queryParam: {},
        isorter: {
          column: 'createTime',
          order: 'desc',
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
        url: {
          list: "/khglgx/khgl_khglgx/list",
        }
      }
    },
    created() {
      this.loadData();
    },
    methods: {
      GetValForJjzzbz(value) {
        this.xzzbz = value
      },
      GetValForJjKhjl(value) {
        this.xkhjl = value.yggh
      },
      ceshi(){
        setTimeout(() =>{
          //this.$refs.xzzbz.clear();
          this.$refs.xkhjl.clearName();
          this.$refs.xzzbz.treeValue="";
        },3000);
        this.$emit('searchQuery');
        this.searchReset();
      },
      searchQuery() {
        this.loadData(1);
      },
      searchReset() {
        this.queryParam = {};
        this.loadData(1);
      },
      handleOk() {
        let user = this;
        if (this.xzzbz == null || this.xzzbz == "") {
          alert("请选择交接支行！");
        }
        if (this.xkhjl == null || this.xkhjl == "") {
          alert("请选择交接客户经理！");
        }
        putAction("/khglgx/khgl_khglgx/handover",{
          "rows":this.selectionRows, "handoverToZzbz":this.xzzbz, "handoverToKhjl":this.xkhjl
        }).then((res) => {
          if (res.success){
            //this.$message.success(res.message);
            alert("客户交接成功！");
            this.onClearSelected();
            this.visible = false;
            setTimeout(() => {
              user.$emit('reset')
            }, 3000);
            //this.$emit('ok');
          } else {
            //this.$message.warning(res.message,5);
            alert("客户交接失败！");
            this.$refs.xzzbz.zzbz = "";
            this.$refs.xkhjl.ygxm = "";
            this.visible = false;
          }
        });
      },
      handleCancel() {
        this.onClearSelected();
        this.close();
      },
      handleDelete: function (record) {
        this.dataSource2.splice(this.dataSource2.indexOf(record), 1);
      },
      close() {
        this.$emit('close')
        this.visible = false
      },
      //加载数据 若传入参数1则加载第一页的内容
      loadData(arg) {
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        let params = this.getQueryParams();
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSources = res.result.records;
            this.ipagination.total = res.result.total;
          }
        })
      },
      getQueryParams() {
        console.info( this.queryParam)
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