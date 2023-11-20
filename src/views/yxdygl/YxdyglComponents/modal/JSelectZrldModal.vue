<!--// TODO 员工信息列表组件 -->
<template>
  <a-modal :title="title"
           :width="modalWidth"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleSubmit"
           @cancel="handleCancel"
           cancelText="关闭"
           wrapClassName="ant-modal-cust-warp"
           style="margin-top: -70px">

    <a-card :bordered="false">
      <!-- 查询区域 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline">

          <a-row :gutter="24">
            <a-col :span="12"><a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"/>
            </a-form-item></a-col>
            <a-col :span="12"><a-form-item label="员工姓名">
              <j-input placeholder="请输入员工姓名" v-model="queryParam.ygxm" type="likemore"/>
            </a-form-item></a-col>
          </a-row>

          <a-row :gutter="24">
            <a-col :span="12"><a-form-item label="客户经理标识">
              <a-input placeholder="请输入客户经理标识" v-model="queryParam.khjlbh"/>
            </a-form-item></a-col>
            <a-col :span="12">
                  <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                    <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                    <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
                  </span>
            </a-col>
          </a-row>

        </a-form>
      </div>

      <div>
        <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
          <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }} </a>项
          <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        </div>
        <a-table ref="table"
                 :scroll="scrollTrigger"
                 bordered
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
  import JInput from '@/components/jeecg/JInput'

  export default {
    name: "SelectYgxxListModal",
    components: { JInput },
    mixins: [JeecgListMixin],
    props:{
      modalWidth: '',
      type: {
        type: String,
        required: false,
        default: 'checkbox'
      },
    },
    data() {
      return {
        title: "责任领导信息列表",
        visible: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        departName: '',
        // 1-新增；2-修改
        okType: '',
        model: {},
        scrollTrigger: {},
        queryParam: {},
        selectedRows: [],
        selectedRowKeys: [],
        dataSource: [],
        columns: [
          {
            title: '员工工号',
            align: "center",
            dataIndex: 'yggh',
            width: 200
          },
          {
            title: '员工姓名',
            align: "center",
            dataIndex: 'ygxm',
            width: 200
          },
          {
            title: '柜员号',
            align: "center",
            dataIndex: 'gyh',
            width: 200
          },
          {
            title: '客户经理编号',
            align: "center",
            dataIndex: 'khjlbh',
            width: 200
          },
        ],
        url: {
          list: "/hr/ygxx/list",
          add: "/act/model/create",
        },
      }
    },
    created() {
      // 该方法触发屏幕自适应
      this.resetScreenSize();
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
        // TODO 重新打开窗口时会清空所选员工，暂未解决点击选择按钮后未做出修改仍会清空input框内内容的问题
        this.selectedRowKeys = [];
        this.selectedRows = [];
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
        this.selectedRowKeys = selectedRowKeys;
        this.selectedRows = selectionRows;
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
        let screenHeight = document.body.clientHeight;
        if (screenHeight > 300) {
          this.scrollTrigger = { y: 300 };
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
