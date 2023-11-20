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
            <a-form-item label="数据项ID">
              <a-input placeholder="请输入数据项ID" v-model="queryParam.sjxid"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据项名称">
              <a-input placeholder="请输入数据项名称" v-model="queryParam.sjxmc"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据项维度">
              <a-select placeholder="全部" v-model="queryParam.sjxwd">
                <a-select-option value="">
                  请选择
                </a-select-option>
                <a-select-option value="DD">
                  天
                </a-select-option>
                <a-select-option value="MM">
                  月
                </a-select-option>
                <a-select-option value="Q">
                  季
                </a-select-option>
                <a-select-option value="YYYY">
                  年
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>


          <a-col :xl="8" :lg="9" :md="10" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
               <a-button type="primary" @click="determine" icon="check" style="margin-left: 8px">确定</a-button>
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
      rowKey="sjxid"
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
import moment from 'moment'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'

export default {
  name: 'AccountInfoZbid',
  mixins:[JeecgListMixin],
  components: {
    JTreeSelect
  },
  data () {
    return {
      loading: false,
      title: '查找带回',
      dataSource: [],
      queryParam:{},
      columns: [
        {
          title: '数据项ID',
          align: 'center',
          dataIndex: 'sjxid'
        },
        {
          title: '数据项名称',
          align: 'center',
          dataIndex: 'sjxmc'
        },
        {
          title: '数据项维度',
          align: 'center',
          dataIndex: 'sjxwd_dictText'
        },
      ],
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      obj: { } ,
      url: {
        getListFindBack: '/zbsjtz/zbsjtz/getListZbid'
      }
    }
  },
  computed: {
    rowSelection () {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
  created () {
  },
  methods: {
    handleClose () {
      this.visible = false
      this.obj={}
      this.queryParam={}
      this.dataSource=[]
    },
    determine(){
      if(!this.obj){
        this.$message.warning('请选择存款账号接收人')
      }
      this.$emit("close", this.obj)
      this.handleClose ()
    },
    init () {
      this.visible = true
    },
    searchReset() {
      this.queryParam = {
      }
      let  params={
      }
      this.loading=true
      httpAction(this.url.getListFindBack,params,'post').then((res) => {
        if (res.success) {
          this.dataSource = res.result;
        }else{
          this.$message.warning("查询失败")
        }
      }).finally(()=>{
        this.loading=false
      })
    },
    searchQuery(){
      // getListClaim
      let  params={
        sjxid:this.queryParam.sjxid,
        sjxmc:this.queryParam.sjxmc,
        sjxwd:this.queryParam.sjxwd,
      }
      httpAction(this.url.getListFindBack,params,'post').then((res) => {
        if (res.success) {
          this.dataSource = res.result;
        }else{
          this.$message.warning("查询失败")
        }
      }).finally(()=>{
        this.loading=false
      })
    },
  }
}
</script>

<style scoped>

</style>