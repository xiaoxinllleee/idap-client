<template>
  <a-modal
    :title="title"
    :width="modalWidth"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    cancelText="关闭"
    style="margin-top: -70px"
    wrapClassName="ant-modal-cust-warp"
  >
    <a-card :bordered="true">
      <!-- 查询区域 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="24">
            <a-col :span="6"><a-form-item label="员工姓名">
              <j-input placeholder="请输入员工姓名" v-model="queryParam.ygxm"/>
            </a-form-item></a-col>
            <a-col :span="6"><a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"/>
            </a-form-item></a-col>
            <a-col :span="6"><a-form-item label="客户经理标识">
              <a-input placeholder="请输入客户经理标识" v-model="queryParam.khjlbz"/>
            </a-form-item></a-col>
            <a-col :span="6" ><span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span></a-col>
          </a-row>
        </a-form>
      </div>
      <!--用户账号:-->
      <!--<a-input-search-->
        <!--:style="{width:'150px',marginBottom:'15px'}"-->
        <!--placeholder="请输入用户账号"-->
        <!--v-model="queryParam.username"-->
        <!--@search="onSearch"-->
      <!--&gt;</a-input-search>-->
      <!--<a-button @click="searchReset(1)" style="margin-left: 20px" icon="redo">重置</a-button>-->
      <!-- table区域-begin -->
      <div>
        <a-table bordered
                 ref="table"
                 :scroll="scrollTrigger"
                 size="middle"
                 rowKey="yggh"
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
  import {getYgxxList} from '@/api/api'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JInput from '../../../../components/jeecg/JInput'

  export default {
    name: "SelectYgxxListModal",
    components: { JInput },
    mixins: [JeecgListMixin],
    props:{
      modalWidth:'',
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
        model: {},
        confirmLoading: false,
        url: {
          add: "/act/model/create",
          list: "/hr/ygxx/list"
        },
        queryParam: {
          username:"",
        },
        columns: [
          {
            title: '员工工号',
            align: "center",
            dataIndex: 'yggh',
            fixed: 'left',
            width: 200
          },
          {
            title: '员工姓名',
            align: "center",
            dataIndex: 'ygxm',
          },
          {
            title: '客户经理编号',
            align: "center",
            dataIndex: 'khjlbh'
          },
        ],
        scrollTrigger: {},
        dataSource: [],
        selectedKeys: [],
        userNameArr: [],
        departName: '',
        userRolesMap: {},
        selectedRowKeys: [],
        selectedRows: [],
        form: this.$form.createForm(this)
      }
    },
    created() {
      // 该方法触发屏幕自适应
      this.resetScreenSize();
      // this.queryUserRoleMap();
      //Step.2 加载用户数据
      getYgxxList().then((res) => {
        if (res.success) {
          this.dataSource = res.result.records;
          this.ipagination.total = res.result.total;
        }
      })
    },
    methods: {
      open() {
        this.visible = true;

        //Step.1 清空选中用户
        this.selectedRowKeys = []
        this.selectedRows = []
      },
      close() {
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
        if (selectedRowKeys.length>1){
          alert("只能同时转移给一个客户经理")
        }else{
        this.selectedRowKeys = selectedRowKeys;
        this.selectedRows = selectionRows;}
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
