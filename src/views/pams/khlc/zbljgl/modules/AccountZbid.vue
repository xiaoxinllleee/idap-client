<template>
  <a-modal :title="title"
           :visible="visible"
           :footer="null"
           width="75%"
           :confirmLoading="confirmLoading"
           :maskClosable="false"
           @cancel="handleClose">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="指标ID">
              <a-input placeholder="请输入指标ID" v-model="queryParam.zbid"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="指标名称">
              <a-input placeholder="请输入指标名称" v-model="queryParam.zbmc"></a-input>
            </a-form-item>
          </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="指标类别">
                <j-dict-select-tag placeholder="请输入指标类别" v-model="queryParam.zblb" dict-code="zblb"></j-dict-select-tag>
              </a-form-item>
            </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a-button type="primary" @click="determine" icon="check" style="margin-left: 8px">确定</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <a-table
      ref="table"
      size="middle"
      bordered
      rowKey="zbid"
      :pagination="ipagination"
      :columns="columns"
      :dataSource="dataSource"
      :row-selection="rowSelection"
      :loading="loading"
      @change="handleTableChange"
    >
    </a-table>
  </a-modal>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import { getAction } from '@api/manage'
  import { filterObj } from '@/utils/util'

  export default {
    name: "AccountZbid",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect
    },
    data () {
      return {
        loading: false,
        title: '指标库管理',
        dataSource: [],
        queryParam:{},
        selectedRowKeys:[],
        visible: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        // 表头
        columns: [
          {
            title: '指标ID',
            align:"center",
            dataIndex: 'zbid'
          },
          {
            title: '指标名称',
            align:"center",
            dataIndex: 'zbmc'
          },
          {
            title: '指标类别',
            align:"center",
            dataIndex: 'zblb_dictText'
          },
          // {
          //   title: '工资类别',
          //   align:"center",
          //   dataIndex: 'gzlb'
          // },
          {
            title: '备注',
            align:"center",
            dataIndex: 'bz'
          },
        ],
        url: {
          list: "/jczbgl/erpBasZbk/list",
        },
      }
    },
    computed: {
      rowSelection () {
        return {
          selectedRowKeys: this.selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            this.selectedRowKeys = selectedRowKeys
            this.obj=selectedRows[0];
          },
          getCheckboxProps: record => ({
            props: {
              // disabled: record.name === 'Disabled User', // Column configuration not to be checked
              //name: record.name,
            }
          }),
          type: 'radio'
        }
      }
    },
    methods: {
      handleClose () {
        this.visible = false
        this.obj={}
        this.selectedRowKeys = []
        this.queryParam={}
        this.dataSource=[]
      },
      init(){
        this.visible = true
      },
      determine(){
        if(!this.obj){
          this.$message.warning('请选择指标ID')
        }
        this.$emit("close", this.obj)
        this.handleClose()
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>