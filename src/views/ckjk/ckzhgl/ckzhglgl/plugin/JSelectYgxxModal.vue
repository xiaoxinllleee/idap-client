<template>
  <a-modal :title="title"
           :width="1500"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :keyboard="false"
           :maskClosable="false"
           @ok="handleSubmit"
           @cancel="handleCancel"
           cancelText="关闭"
           wrapClassName="ant-modal-cust-warp">

    <a-card :bordered="true">
      <!-- 查询区域 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="24">
            <a-col :span="6">
              <a-form-item label="所属组织">
                <j-tree-select placeholder="请选择所属组织" v-model="queryParam.zzbz" dict="hr_bas_organization, zzjc, zzbz"
                               pidField="sjzzbz" treeNodeFilterProp="title"
                               :sszh="false" :showSearch="true" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="isAll"/>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="员工姓名">
                <j-input placeholder="请输入员工姓名" v-model="queryParam.ygxm"></j-input>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="员工工号">
                <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="所属岗位">
                <j-dict-select-tag placeholder="请选择所属岗位" v-model="queryParam.gwbz" dict-code="hr_bas_post, gwmc, gwbz"></j-dict-select-tag>
              </a-form-item>
            </a-col>
            <a-col :span="6">
                  <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                    <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                    <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px;">重置</a-button>
                    <span style="color: red;font-size: 8pt;margin-left: 8px;">(温馨提示：只限选择一名员工)</span>
                  </span>
            </a-col>

          </a-row>
        </a-form>
      </div>
      <div>
        <a-table ref="table"
                 bordered
                 size="small"
                 rowKey="id"
                 :columns="columns"
                 :dataSource="dataSource"
                 :pagination="ipagination"
                 :loading="loading"
                 :scroll="{y: 300}"
                 :rowSelection="{type: type, selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
                 @change="handleTableChange">
        </a-table>
      </div>
    </a-card>
  </a-modal>
</template>

<script>
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import store from '@/store/'
  import {mapGetters} from 'vuex'
  import {getAction, putAction} from '@/api/manage'
  import JInput from "../../../../../components/jeecg/JInput";

  export default {
    name: "SelectYgxxListModal",
    mixins: [JeecgListMixin],
    components: {JInput, JTreeSelect},
    props: {
      type: {
        type: String,
        required: false,
        default: 'checkbox'
      },
    },
    data() {
      return {
        title: "员工列表",
        visible: false,
        isAll: false,
        sszh: '',
        model: {},
        confirmLoading: false,
        queryParam: {
          username: "",
        },
        dataSource: [],
        columns: [
          {
            title: '所属组织',
            align: "center",
            dataIndex: 'zzbz'
          },
          {
            title: '组织名称',
            align: "center",
            dataIndex: 'zzmc'
          },
          {
            title: '岗位标识',
            align: "center",
            dataIndex: 'gwbz'
          },
          {
            title: '岗位名称',
            align: "center",
            dataIndex: 'gwmc',
          },
          {
            title: '员工工号',
            align: "center",
            dataIndex: 'yggh'
          },
          {
            title: '员工姓名',
            align: "center",
            dataIndex: 'ygxm',
          },
          {
            title: '客户经理标识',
            align: "center",
            dataIndex: 'khjlbz'
          },
          {
            title: '柜员号',
            align: "center",
            dataIndex: 'gyh'
          },
        ],
        selectedKeys: [],
        userNameArr: [],
        departName: '',
        userRolesMap: {},
        selectedRowKeys: [],
        selectedRows: [],
        form: this.$form.createForm(this),
        url: {
          list: "/ckzhglgl/ckjkptCkzhglxx/staffpostlist"
        },
      }
    },
    created() {
      // 该方法触发屏幕自适应
      this.resetScreenSize();
      //Step.2 加载用户数据
      this.loadData(1);
    },
    methods: {
      ...mapGetters(["nickname", "avatar", "userInfo"]),

      initQueryParams() {
        if (!store.getters.isRoot) {
          //this.queryParam.zzbz = store.getters.userInfo.orgCode
        }
        this.paramsInited = true
      },
      searchReset() {
        this.queryParam = {}
        if (!store.getters.isRoot) {
          //this.queryParam.zzbz = store.getters.userInfo.orgCode
        }
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
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
            this.loading = false;
          } else {
            this.$message.error(res.message,5);
            this.loading = false;
          }
        })
      },
      open() {
        this.visible = true;

        //Step.1 清空选中用户
        this.selectedRowKeys = []
        this.selectedRows = []
      },
      close() {
        this.selectedRowKeys = []
        this.selectedRows = []
        this.$emit('close');
        this.visible = false;
      },
      handleCancel() {
        this.close()
      },
      handleSubmit() {
        this.$emit('ok', this.selectedRows);
        this.close()
      },
      onSelectChange(selectedRowKeys, selectionRows) {
        let that = this
        if (selectedRowKeys.length > 1) {
          that.$message.error('只能同时分配给一个员工！');
        } else {
          that.selectedRowKeys = selectedRowKeys;
          that.selectedRows = selectionRows;
        }
      },
      handleTableChange(pagination, filters, sorter) {
        //TODO 筛选
        if (Object.keys(sorter).length > 0) {
          this.isorter.column = sorter.field;
          this.isorter.order = 'ascend' === sorter.order ? 'asc' : 'desc';
        }
        this.ipagination = pagination;
        this.loadData();
      },
      // 触发屏幕自适应
      resetScreenSize() {
        let screenWidth = document.body.clientWidth;
        if (screenWidth < 500) {
          this.scrollTrigger = {x: 800};
        } else {
          this.scrollTrigger = {};
        }
      },
      showModal() {
        this.visible = true;
        this.form.resetFields();
        this.loadData(1);
      },
    }
  }
</script>

<style scoped>
  .ant-table-tbody .ant-table-row td {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color .3s;
  }
</style>
