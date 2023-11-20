<template>
  <a-modal :title="title"
           :visible="visible"
           :footer="null"
           width="80%"
           :confirmLoading="confirmLoading"
           :maskClosable="false"
           @cancel="handleClose">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="loadData">
        <a-row :gutter="24">
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="指标ID">
              <a-input placeholder="请输入指标ID" v-model="queryParam.zbid"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="指标名称">
              <a-input placeholder="请输入指标名称" v-model="queryParam.zbbm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="4" :lg="4" :md="8" :sm="24">
            <a-form-item label="指标维度">
              <j-dict-select-tag placeholder="请选择指标维度" v-model="queryParam.zbwd"   dict-code="zbwd"  />
            </a-form-item>
          </a-col>
          <a-col :xl="4" :lg="4" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="loadData(num,1)" icon="search">查询</a-button>
              <a-button @click="searchReset(num)" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <!--<a-col :xl="8" :lg="7" :md="8" :sm="24">-->
            <!--<a-form-item label="考核方式">-->
              <!--<j-dict-select-tag placeholder="请选择考核方式" v-model="queryParam.khfs"   dict-code="khfs"  />-->
            <!--</a-form-item>-->
          <!--</a-col>-->
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="determine" icon="check" style="margin-left: 8px">确定</a-button>
            </span>
          </a-col>
        </a-row>


      </a-form>
    </div>
    <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
      <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }} </a>项
      <a style="margin-left: 24px" @click="onClearSelected">清空</a>
    </div>
    <a-table
      ref="table"
      size="middle"
      bordered
      rowKey="zbid"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="ipagination"
      :row-selection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :loading="loading"
       @change="handleTableChange">
    </a-table>
  </a-modal>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import { getAction } from '@api/manage'
  import { filterObj } from '@/utils/util'

  export default {
    name: "AccounGxl",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect
    },
    data () {
      return {
        loading: false,
        title: '指标ID管理',
        recode:[],
        ipagination: {
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['10', '20', '30'],
          showTotal: (total, range) => {
            return range[0] + '-' + range[1] + ' 共' + total + '条'
          },
          showQuickJumper: true,
          showSizeChanger: true,
          total: 0
        },
        num:0,
        dataSource: [],
        queryParam:{},
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
            dataIndex: 'zbid_dictText'
          },
          {
            title: '考核方式',
            align:"center",
            dataIndex: 'khfs_dictText'
          },
          {
            title: '指标维度',
            align:"center",
            dataIndex: 'zbwd_dictText'
          },

        ],
        obj: { } ,
        url: {
          JgList: "/farwsz/erpAssessTaskset/listTasksetJg",
          GwList: "/farwsz/erpAssessTaskset/listTasksetGw",
        },
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
    methods: {
      init(num, khfs){
        this.num = num
        this.visible = true
        if (khfs) {
          this.queryParam.khfs = khfs
        }
        this.onClearSelected()
        this.loadData(this.num,1);
      },

      handleClose () {
        this.visible = false
        this.obj={}
        this.queryParam={}
      },
      getQueryParams () {
        //获取查询条件
        let sqp = {}
        if (this.superQueryParams) {
          sqp['superQueryParams'] = encodeURI(this.superQueryParams)
        }
        var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        return filterObj(param)
      },
      onSelectChange (selectedRowKeys, selectionRows) {
        console.log('onSelectChange', selectedRowKeys, selectionRows)
        this.selectedRowKeys = selectedRowKeys
        // this.selectionRows = selectionRows
        selectionRows.forEach(row => {
          let index = this.selectionRows.findIndex(item => item.zbid === row.zbid)
          if(index < 0) {
            this.selectionRows.push(row)
          }
        })
      },
      loadData(num,arg){
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1
        }
        var params = this.getQueryParams()//查询条件
        console.info(params)
        if (this.num ==1){
          getAction(this.url.JgList,params).then((res) => {
            if (res.success) {
              this.dataSource = res.result.records;
              this.ipagination.total = res.result.total
              this.loading = false
            }else{
              this.$message.warning("查询失败")
              this.loading = false
            }
          })
        }else {
          getAction(this.url.GwList,params).then((res) => {
            if (res.success) {
              this.dataSource = res.result.records;
              this.ipagination.total = res.result.total
              this.loading = false
            }else{
              this.$message.warning("查询失败")
              this.loading = false
            }
          })
        }

      },

      searchReset(num) {
        this.queryParam = {}
        this.loadData(num,1)
      },

      determine(){
        if(!this.obj){
          this.$message.warning('请选择指标ID')
        }
        console.log(this.selectedRowKeys)
        console.log(this.selectionRows)
        this.selectionRows = this.selectionRows.filter(row => this.selectedRowKeys.includes(row.zbid))

        this.$emit("close",this.selectionRows)
        this.handleClose ()
      },
      close(){
        this.selectedRowKeys=[]
        this.selectionRows = []
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>