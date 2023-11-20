<template>
  <a-modal :title="title"
           :visible="visible"
           width="75%"
           :confirmLoading="confirmLoading"
           @ok="handleSubmit"
           cancelText="关闭"
           :maskClosable="false"
           @cancel="handleClose">

<!--    查找区域-->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="商户编码">
              <a-input placeholder="请输入商户编码" v-model="queryParam.shbm"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="商户名称">
              <j-input placeholder="请输入商户名称" v-model="queryParam.shmc"></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="9" :md="10" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <a-table
      ref="table"
      size="middle"
      bordered
      rowKey="shbm"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="ipagination"
      :loading="loading"
      :rowSelection="{type: type, selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      @change="handleTableChange"
    >
    </a-table>
  </a-modal>
</template>

<script>
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
import { httpAction, getAction } from '@/api/manage'
import JInput from '@/components/jeecg/JInput'

export default {
  name: 'FindBack',
  mixins: [JeecgListMixin],
  components: {
    JInput
  },
  data () {
    return {
      loading: false,
      title: '商户信息',
      type: 'radio',
      dataSource: [],
      queryParam:{},
      columns: [
        {
          title: '机构代码',
          align: 'center',
          dataIndex: 'jgdm'
        },
        {
          title: '组织名称',
          align: 'center',
          dataIndex: 'jgdm_dictText'
        },
        {
          title: '商户编码',
          align: 'center',
          dataIndex: 'shbm'
        },
        {
          title: '商户名称',
          align: 'center',
          dataIndex: 'shmc'
        },
      ],
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      selectedRowKeys: [],
      selectedRows: [],
    }
  },
  created () {
  },
  methods: {
    handleSubmit() {
      this.$emit('ok', this.selectedRows);
      this.handleClose()
    },
    handleClose () {
      this.$emit('close');
      this.visible = false
      this.queryParam={}
      this.selectedRowKeys = []
      this.selectedRows = []
    },
    init () {
      this.visible = true
    },
    loadData(arg) {
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1;
      }
      this.loading = true;
      var params = this.getQueryParams();//查询条件
      getAction('/shjbxx/shjbxx/list', params).then((res) => {
        if (res.success) {
          this.dataSource = res.result.records;
          this.ipagination.total = res.result.total;
          this.loading = false;
        }else{
          this.$message.error(res.message,5);
          this.loading = false;
        }
      })
    },
    onSelectChange(selectedRowKeys, selectionRows) {
      let that = this
      if (selectedRowKeys.length > 1){
        that.$message.error('只能同时分配给一个员工！');
      }else {
        that.selectedRowKeys = selectedRowKeys;
        that.selectedRows = selectionRows;
      }
    },
  }
}
</script>

<style scoped>

</style>