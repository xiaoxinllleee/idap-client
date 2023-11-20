<template>
  <div>
    <a-modal centered
             :title="title"
             :width="1200"
             :visible="visible"
             @ok="handleOk"
             @cancel="handleCancel"
             cancelText="关闭">

      <!-- 查询区域 -->
      <div class="table-page-search-wrapper">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="24">
              <a-col :span="6">
                <a-form-item label="所属支行">
                  <j-tree-select placeholder="请选择所属支行" v-model="queryParam.zzbz"
                                 dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                                 :zzbz="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="isAll"/>
                </a-form-item>
              </a-col>

              <a-col :span="6">
                <a-form-item label="员工名称">
                  <a-input placeholder="请输入员工名称" v-model="queryParam.ygxm" />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="员工工号">
                  <a-input placeholder="请输入员工工号" v-model="queryParam.yggh" />
                </a-form-item>
              </a-col>
            </a-row>
           <a-row>
              <a-col :span="8">
                <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                  <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                  <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              </span>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </div>

      <!-- table区域-begin -->
      <div>
        <a-table bordered
                 size="small"
                 rowKey="yggh"
                 :columns="columns1"
                 :dataSource="dataSource1"
                 :pagination="ipagination"
                 :loading="loading"
                 :scroll="{ y: 240 }"
                 :rowSelection="{selectedRowKeys: selectedRowKeys,onChange: onSelectChange}"
                 @change="handleTableChange"/>
      </div>



    </a-modal>
  </div>
</template>

<script>
  import {filterObj} from '@/utils/util'
  import {getAction,putAction} from '@/api/manage'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  export default {
    name: "SelectUserModal",
    components:{JTreeSelect},
    mixins: [JeecgListMixin],
    data() {
      return {
        title: "",
        placement: 'right',
        description: '',
        visible: false,
        loading: false,
        selectedRowKeys: [],
        selectedRows: [],
        names: [],
        model: [],
        show:false,
        showKhjl:false,
        // 表头
        isAll:false,
        columns1: [
          {
            title: '所属支行',
            align:"center",
            dataIndex: 'zzjc'
            ,width:120
          },
          {
            title: '员工姓名',
            align:"center",
            dataIndex: 'ygxm'
            ,width:100
          },
          {
            title: '员工工号',
            align:"center",
            dataIndex: 'yggh'
            ,width:100
          },

        ],
        //数据集
        dataSource1: [],
        // 分页参数
        ipagination: {
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['10', '50', '100'],
          showTotal: (total, range) => {
            return range[0] + "-" + range[1] + " 共" + total + "条"
          },
          total: 0
        },

        url: {
          list: "/khgl/khglgx/vglgxmx/list",
        }
      }
    },
    created() {

    },
    computed: {
      hasSelected() {
        return this.selectedRowKeys.length > 0;
      },
    },
    methods: {
      onSelectChange(selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys;
        this.selectionRows = selectedRows;
      },

      handleCancel() {
        this.onClearSelected();
        this.visible = false;
      },
      handleOk() {
        var ygghs = this.selectionRows;
        this.onClearSelected();

        this.visible = false;
        this.$emit('ok',ygghs);
      },
      add() {
        this.visible = true;
        var data = Object.assign({}, this.queryParam);
        data.pageNo = this.ipagination.current;
        data.pageSize = this.ipagination.pageSize;``
        getAction("/hr/vhrbasstaffpost/list",data).then(res=>{
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
      searchQuery() {
        this.loadData(1);
      },
      searchReset() {
        this.queryParam = {}
        this.loadData(1);
      },
      loadData(arg) {
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        this.loading = true;
        var params = this.getQueryParams();//查询条件
        getAction('/hr/vhrbasstaffpost/list', params).then((res) => {
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
        var param = Object.assign({}, this.queryParam);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        return filterObj(param);
      },
      getQueryField() {
        //TODO 字段权限控制
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