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
          <a-col :md="6" :sm="8">
            <a-form-item label="组织标识">
              <j-tree-select placeholder="请选择组织标识"
                             pidField="sjywjgdm"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.zzbz"
                             dict="v_hr_bas_organization_cmms,ZZJC,ywjgdm"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="岗位名称">
              <j-dict-select-tag
                placeholder="请选择岗位标识"
                v-model="queryParam.gwbz"
                dictCode="eweb:Hr_bas_post,gwmc,gwbz"
              />
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户经理标识">
              <a-input placeholder="请输入客户经理标识" v-model="queryParam.khjlbz"></a-input>
            </a-form-item>
          </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="入岗类型">
                <a-select placeholder="全部" v-model="queryParam.rglx">
                  <a-select-option value="null">
                    请选择
                  </a-select-option>
                  <a-select-option value="1">
                    正式
                  </a-select-option>
                  <a-select-option value="2">
                    代班
                  </a-select-option>
                  <a-select-option value="3">
                    实习
                  </a-select-option>
                  <a-select-option value="4">
                    虚拟
                  </a-select-option>
                  <a-select-option value="5">
                    离岗
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          <a-col :xl="8" :lg="9" :md="10" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
               <a-button type="primary" @click="determine" icon="search" style="margin-left: 8px">确定领取人</a-button>
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
      rowKey="zzbz,yggh,gwbz"
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
  name: 'AccountInFo',
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
          dataIndex: 'ywjgdm'
        },
        {
          title: '组织名称',
          align: 'center',
          dataIndex: 'zzbz_dictText'
        },
        {
          title: '岗位名称',
          align: 'center',
          dataIndex: 'gwbz_dictText'
        },
        {
          title: '员工工号',
          align: 'center',
          dataIndex: 'yggh'
        },
        {
          title: '员工姓名',
          align: 'center',
          dataIndex: 'yggh_dictText'
        },
        {
          title: '入岗日期',
          align: 'center',
          dataIndex: 'rgrq'
        },
        {
          title: '离岗日期',
          align: 'center',
          dataIndex: 'lgrq'
        },
      ],
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      obj: { } ,
      url: {
        getListFindBack: '/khjljcsjsz/khjljcsjsz/getListClaim'
      }
    }
  },
  computed: {
    rowSelection () {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
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
      this.queryParam={}
      this.dataSource=[]
      this.obj={};
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
      this.queryParam = {}
      let  params={}
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
        zzbz:this.queryParam.zzbz,
        gwbz:this.queryParam.gwbz,
        rglx:this.queryParam.rglx,
        khjlbz:this.queryParam.khjlbz,
        yggh:this.queryParam.yggh,
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