<template>
  <a-modal
    :title="title"
    width="80%"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="开始创建"
    cancelText="关闭">
    <template #footer>
      <a-button key="back" @click="handleCancel">关闭</a-button>
      <a-button key="submit" type="primary" :loading="loadingButton" @click="handleOk">开始创建</a-button>
    </template>
    <a-spin :spinning="confirmLoading">
      <a-form :form="form" layout="inline">
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item
              :required="true"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="报表类型">
              <j-dict-select-tag  v-model="queryParam.bblx" placeholder="请选择报表类型" style="width: 150px"
                                  dictCode="rep_bblx"/>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              :required="true"
              :rules="[{ required: true, message: '请选择报表时间!' }]"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="报表时间">
              <a-date-picker v-if="queryParam.bblx=='4'"  v-model="queryParam.bbyf"  allowClear/>
              <a-month-picker v-else v-model="queryParam.bbyf" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="时间类型">
              <j-dict-select-tag  v-model="queryParam.sjlx" placeholder="请选择时间类型" style="width: 150px"
                                  dictCode="rep_sjlx"/>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="报表编号">
                  <a-input placeholder="请输入报表编号" v-model="queryParam.bbbh" style="width: 150px"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="报表名称">
              <a-input placeholder="请输入报表名称" v-model="queryParam.bbmc" style="width: 150px"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否已创建">
              <j-dict-select-tag  v-model="queryParam.sfcj" placeholder="请选择是否已创建" style="width: 150px"
                                  dictCode="rep_sfcj"/>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>

        <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
          <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
          <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        </div>
        <a-table
          ref="table"
          size="middle"
          bordered
          rowKey="bbbh"
          :columns="columns"
          :dataSource="dataSource"
          :pagination="ipagination"
          :loading="loading"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          @change="handleTableChange">
        </a-table>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction, getAction, postAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import { filterObj } from '@/utils/util'

  export default {
    name: "BbsjglModal",
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        queryParam: {bbyf: '', sjlx: ''},
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        },
        loading:false,
        loadingButton:false,
        selectedRowKeys: [],
        selectedRows: [],
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
        columns: [
          {
            title: '报表编号',
            align: "center",
            dataIndex: 'bbbh',
          },
          {
            title: '报表名称',
            align: "center",
            dataIndex: 'bbmc',
          },
          {
            title: '报表类型',
            align: "center",
            dataIndex: 'bblx_dictText',
          },
          {
            title: '时间类型',
            align: "center",
            dataIndex: 'sjlx_dictText',
          },
          {
            title: '是否创建',
            align: "center",
            dataIndex: 'sfcj_dictText',
          },
          {
            title: '报表顺序',
            align: "center",
            dataIndex: 'bbsx',
          },
          {
            title: '版本号',
            align: "center",
            dataIndex: 'bbh'
          },
        ],
        dataSource: [],
        url: {
          add: "/bbgl/vBbsjgl/add",
          edit: "/bbgl/vBbsjgl/edit",
          list: "/bbgl/vBbsjgl/datalist"
        },
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'bbbh','bblj'))
		  //时间格式化
          this.form.setFieldsValue({bbyf:this.model.bbyf?moment(this.model.bbyf):null})
        });
      },
      searchQuery() {
        this.loadData(1);
      },
      searchReset() {
        this.queryParam = {};
        this.loadData(1);
      },

      getQueryParams() {
        //获取查询条件
        let sqp = {}
        if(this.superQueryParams){
          sqp['superQueryParams']=encodeURI(this.superQueryParams)
        }
        var param = Object.assign(sqp, this.queryParam, this.isorter ,this.filters);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        return filterObj(param);
      },
      getQueryField() {
        //TODO 字段权限控制
        var str = "id,";
        this.columns.forEach(function (value) {
          str += "," + value.dataIndex;
        });
        return str;
      },

      loadData(arg) {
        var params = this.getQueryParams();//查询条件
        //let params = Object.assign({}, this.queryParam)
        if (!this.queryParam.bblx) {
          this.$message.warning("请选择报表类型");
          return false
        }
        if (this.queryParam.bbyf) {
          params.bbyf = moment(this.queryParam.bbyf).format("YYYY-MM") + '-01';
          if (this.queryParam.bblx == '4') {
            params.bbyf = moment(this.queryParam.bbyf).format("YYYY-MM-DD")
          }
        } else {
          this.$message.warning("请选择报表时间");
          return false
        }

        this.loading = true
        getAction(this.url.list, params).then(res => {
          console.log('bbsjgl', res)
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          }else{
            this.dataSource =[];
            this.ipagination.total=0;
          }
        }).finally(() => {
          this.loading = false
        });
      },
      onSelectChange(selectedRowKeys, selectionRows) {
        this.selectedRowKeys = selectedRowKeys;
        this.selectedRows = selectionRows;
      },
      onClearSelected() {
        this.selectedRowKeys = [];
        this.selectedRows = [];
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
      close () {
        this.queryParam = {};
        this.dataSource =[];
        this.ipagination.total=0;
        this.ipagination.current=1;
        this.ipagination.pageSize=10;
        this.selectedRowKeys = []
        this.selectedRows = []
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        this.loadingButton= true;
        console.log('handleOk', this.selectedRowKeys, this.selectedRows)
        if(!this.selectedRowKeys || this.selectedRowKeys.length <= 0) {
          this.$message.warning('未选择任何报表！');
          return false
        }
        let params = {}
        params.bbyf = moment(this.queryParam.bbyf).format("YYYY-MM") + '-01';
        if (this.queryParam.bblx == '4') {
          params.bbyf = moment(this.queryParam.bbyf).format("YYYY-MM-DD")
        }
        params.bblx = this.queryParam.bblx;
        params.sjlx = this.queryParam.sjlx
        params.bbbhStr = this.selectedRowKeys.join(',')
        this.confirmLoading = true
        postAction('/bbgl/bbsjgl/create', params).then(res => {
          if(res.success){
            this.$message.success(res.message);
            this.$emit('ok');
            this.loadingButton= false;
          }else{
            this.$message.warning(res.message,5);
            this.loadingButton= false;
          }
        }).finally(() => {
          this.confirmLoading = false
        })

      },
      handleCancel () {
        this.close()
      },


    }
  }
</script>

<style lang="less" scoped>

</style>