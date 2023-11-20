<template>
  <a-modal :title="title"
           :visible="visible"
           :footer="null"
           width="75%"
           :confirmLoading="confirmLoading"
           :maskClosable="false"
           @cancel="handleClose">

<!--    查找区域-->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户姓名">
              <a-input placeholder="请输入客户姓名" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>


          <a-col :xl="8" :lg="9" :md="10" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a-button type="primary" @click="determine" icon="search" style="margin-left: 8px">确定</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

<!--    &lt;!&ndash;    根据条件查询的待分配账号&ndash;&gt;-->
<!--    <a-button type="primary" @click="determine">-->
<!--      确定接收人-->
<!--    </a-button>-->
    <a-table
      ref="table"
      size="middle"
      bordered
      rowKey="id"
      :columns="columns"
      :dataSource="dataSource"
      :row-selection="rowSelection"
      :loading="loading"
    >
    </a-table>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/manage'
import JTreeSelect from '@/components/jeecg/JTreeSelect'

export default {
  name: 'DhjczllrInfo',
  components: {
    JTreeSelect
  },
  data () {
    return {
      loading: false,
      title: '认领人',
      dataSource: [],
      queryParam:{},
      columns: [
        {
          title: '机构代码',
          align: 'center',
          dataIndex: 'jgdm_dictText'
        },
        {
          title: '证件号码',
          align: 'center',
          dataIndex: 'zjhm'
        },
        {
          title: '客户姓名',
          align: 'center',
          dataIndex: 'khmc'
        },
        {
          title: '单户贷款金额',
          align: 'center',
          dataIndex: 'dhdkje'
        },
        {
          title: '单户贷款余额',
          align: 'center',
          dataIndex: 'dhdkye'
        },
        {
          title: '最新借款日期',
          align: 'center',
          dataIndex: 'zxjkrq'
        }
      ],
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      obj: {

      } ,
      url: {
        getListFindBack: '/dhjczllr/dhjczllr/getListClaim'
      }
    }
  },
  computed: {
    rowSelection () {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          this.obj=selectedRows[0];
          console.log(this.obj)
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
  created () {
  },
  methods: {
    init () {
      this.visible = true
      this.searchQuery();
    },
    handleClose () {
      this.visible = false
      this.queryParam={}
      this.obj={};
    },
    determine(){
      if(!this.obj){
          this.$message.warning('请选择一条信息')
      }
      this.$emit("close", this.obj)
      this.visible = false
      this.queryParam={}
    },
    searchReset() {
      this.queryParam = {}
      this.searchQuery()
    },
    searchQuery(){
      // getListClaim
      let  params={
        zjhm:this.queryParam.zjhm,
        khmc:this.queryParam.khmc,

      }
      this.loading = true;
      httpAction(this.url.getListFindBack,params,'post').then((res) => {
        if (res.success) {
          this.dataSource = res.result;
          this.loadData(1)
        }else{
          this.$message.warning("查询失败")
        }
      }).finally(() => {
        this.loading = false
      })
      },
    },
}
</script>

<style scoped>

</style>