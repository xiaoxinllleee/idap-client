<template>
  <a-modal :title="title"
           :width="1200"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleSubmit"
           @cancel="handleCancel"
           cancelText="关闭"
           wrapClassName="ant-modal-cust-warp">
    <a-card :bordered="true">
      <!-- 查询区域 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="24">
            <a-col :span="6"><a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.zzbz" dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ"
                             pidField="sjzzbz" treeNodeFilterProp="title"
                             :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="isAll"/>
            </a-form-item></a-col>
            <a-col :span="6"><a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh" allow-clear/>
            </a-form-item></a-col>
            <a-col :span="6"><a-form-item label="员工姓名">
              <j-input placeholder="请输入员工姓名" v-model="queryParam.ygxm" type="likemore"/>
            </a-form-item></a-col>
            <a-col :span="6"><a-form-item label="客户经理标识">
              <a-input placeholder="请输入客户经理标识" v-model="queryParam.khjlbz" allow-clear/>
            </a-form-item></a-col>
          </a-row>

          <a-row :gutter="24">
            <a-col :span="8" >
              <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div>
        <a-table bordered
                 ref="table"
                 size="small"
                 rowKey="yggh"
                 :scroll="scrollTrigger"
                 :columns="columns"
                 :dataSource="dataSource"
                 :pagination="ipagination"
                 :loading="loading"
                 :rowSelection="{type: type, selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
                 @change="handleTableChange"/>
      </div>
    </a-card>
  </a-modal>
</template>

<script>
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import store from '@/store/'
  import { mapGetters } from 'vuex'
  import {getAction,putAction} from '@/api/manage'
  import JInput from "@/components/jeecg/JInput";

  export default {
    name: "SelectYgxxListModal",
    mixins: [JeecgListMixin],
    components: {JInput, JTreeSelect},
    props:{
      type: {
        type: String,
        required: false,
        default: 'checkbox'
      },
      isAll: {
        type: Boolean,
        required: false,
        default: true
      }
    },
    data() {
      return {
        title: "接收人信息列表",
        visible: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        sszh: '',
        departName: '',
        isorter: {
          order: 'desc',
        },
        model: {},
        queryParam: {
          username: "",
        },
        scrollTrigger: {},
        userRolesMap: {},
        dataSource: [],
        selectedKeys: [],
        userNameArr: [],
        selectedRowKeys: [],
        selectedRows: [],
        columns: [
          {
            sorter: true,
            title: '所属支行',
            align: "center",
            dataIndex: 'zzbz_dictText',
            width: 200,
          },
          {
            sorter: true,
            title: '员工工号',
            align: "center",
            dataIndex: 'yggh',
            width: 200,
          },
          {
            title: '员工姓名',
            align: "center",
            dataIndex: 'ygxm',
            width: 200,
          },
          {
            sorter: true,
            title: '客户经理编号',
            align: "center",
            dataIndex: 'khjlbz',
            width: 200,
          },
        ],
        url: {
          add: "/act/model/create",
          list: "/hr/vhrbasstaffpost/list"
        },
      }
    },
    created() {
      // 该方法触发屏幕自适应
      this.resetScreenSize();

    },
    mounted() {
      this.initQueryParams()
      //Step.2 加载用户数据
      this.loadData(1);
    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo"]),

      initQueryParams() {
        console.log('initQueryParams', store.getters.isRoot, this.isAll)
        if (!store.getters.isRoot && !this.isAll) {
          this.queryParam.zzbz = store.getters.userInfo.orgCode
        }
        this.paramsInited = true
      },

      searchReset() {
        this.queryParam = {}
        if (!store.getters.isRoot && !this.isAll) {
          this.queryParam.zzbz = store.getters.userInfo.orgCode
        }
        this.loadData(1);
      },

      loadData(arg) {
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) this.ipagination.current = 1;
        //查询条件
        var params = this.getQueryParams();
        this.loading = true;
        getAction('/hr/vhrbasstaffpost/list', params).then((res) => {
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
        this.selectedRowKeys = [];
        this.selectedRows = [];
      },

      close() {
        this.selectedRowKeys = [];
        this.selectedRows = [];
        this.$emit('close');
        this.visible = false;
      },

      handleCancel() {
        this.close();
      },

      handleSubmit() {
        if (this.selectedRowKeys.length <= 0) {
          this.$message.error('至少选择一位接收人！');
          return;
        }
        this.$emit('ok', this.selectedRows);
        this.close();
      },

      onSelectChange(selectedRowKeys, selectionRows) {
        let that = this;
        if (selectedRowKeys.length > 1) {
          that.$message.error('只能选择一位接收人！');
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
          this.scrollTrigger = { x: 800 };
        } else {
          this.scrollTrigger = {};
        }
      },

      showModal() {
        this.visible = true;
        this.form.resetFields();
        this.queryParam = {};
        this.searchReset();
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
