<template>
  <a-card :bordered='false'>

    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>

          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='数据日期'>
              <a-date-picker v-model="queryParam.sjrq" placeholder="数据日期" style="width: 100%;"
                             :defaultValue="maxDate" :format="dateFormat" :allowClear="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='所属支行'>
              <j-tree-select placeholder="请选择所属支行"
                             v-model="queryParam.sszh"
                             treeNodeFilterProp="title"
                             pid-field="sjzzbz"
                             dict="v_hr_bas_organization, zzjc, zzbz"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <span style='float: left;overflow: hidden;' class='table-page-search-submitButtons'>
              <a-button type='primary' @click='searchQuery' icon='search'>查询</a-button>
              <a-button  @click='searchReset' icon='reload' style='margin-left: 8px'>重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class='table-operator'>
      <a-button type='primary' @click="extract" :loading="loading" icon="area-chart" v-has="'qhckqk:init'">提取</a-button>
      <a-button icon='download' :loading='exportLoading' @click="handleExportXls('全行存款情况')">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table
        ref='table'
        size='middle'
        bordered
        :rowKey="(record,index)=>{return index}"
        :columns='columns'
        :dataSource='dataSource'
        :pagination='ipagination'
        :loading='loading'
        :scroll="{ x : 'max-content' }"
        @change='handleTableChange'>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JTreeSelect from '@comp/jeecg/JTreeSelect'
import { getAction, putAction } from '@api/manage'
import moment from 'moment/moment'
import { filterObj } from '@/utils/util'

export default {
  name: 'TjfxQhckqkList',
  mixins: [JeecgListMixin],
  components: {JTreeSelect},
  data() {
    return {
      dateFormat: 'YYYY-MM-DD',
      description: '全行存款情况管理页面',
      // 表头
      columns: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '数据日期',
          align: 'center',
          dataIndex: 'sjrq'
        },
        {
          title: '所属支行',
          align: 'center',
          dataIndex: 'sszh_dictText',
          customRender:function(text){
            if (text!=null && text!=undefined && text!=''){
              return text
            }else {
              return '合计'
            }
          }
        },
        {
          title: '当期存款总额',
          align: 'center',
          dataIndex: 'dqckze'
        },
        {
          title: '上月底存款总额',
          align: 'center',
          dataIndex: 'sydckze'
        },
        {
          title: '年初存款总额',
          align: 'center',
          dataIndex: 'ncckze'
        },
        {
          title: '比年初净增减',
          align: 'center',
          dataIndex: 'bncjzj'
        },
        {
          title: '日平',
          align: 'center',
          dataIndex: 'rp'
        },
        {
          title: '月初日平',
          align: 'center',
          dataIndex: 'ycrp'
        },
        {
          title: '较月初日平增减',
          align: 'center',
          dataIndex: 'jycrpzj'
        },
        {
          title: '年初日平',
          align: 'center',
          dataIndex: 'ncrp'
        },
        {
          title: '较年初日平增减',
          align: 'center',
          dataIndex: 'jncrpzj'
        },
      ],
      url: {
        list: '/qhckqk/tjfxqhckqk/list',
        exportXlsUrl: 'qhckqk/tjfxqhckqk/exportXls',
        init:'/qhckqk/tjfxqhckqk/initData'
      },
      maxDate:''
    }
  },
  created() {
    this.getMaxDateToQuery()
  },
  methods: {
    getMaxDateToQuery(){
      getAction("/qhckqk/tjfxqhckqk/getMaxDate").then(res=>{
        if (res.success){
          if (!this.isCheck(res.result)){
            this.maxDate=''
          }else{
            this.maxDate=moment(res.result)
          }
          this.queryParam.sjrq=this.maxDate
        }
      }).finally(()=>{
        this.queryParam = {sjrq: this.maxDate};
        this.loadData(1);
      })
    },
    searchReset() {
      this.queryParam = {sjrq: this.maxDate};
      this.queryParam.sjrq=this.maxDate
      this.loadData(1);
    },
    loadData (arg) {
      if (!this.url.list) {
        this.$message.error('请设置url.list属性!')
        return
      }
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1
      }
      var params = this.getQueryParams()//查询条件
      console.info(params)
      this.loading = true
      getAction(this.url.list, params).then((res) => {
        if (res.success) {
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total
          this.loading = false
        } else {
          this.dataSource = []
          this.ipagination.total = 0
          this.loading = false
        }
        if (res.code === 510) {
          this.$message.warning(res.message,5)
          this.loading = false
        }
        this.loading = false
      })
    },
    getQueryParams() {
      let sjrqMoment = '';
      if (this.queryParam.sjrq) {
        sjrqMoment = moment(this.queryParam.sjrq).format("YYYY-MM-DD");
      }
      var param      = Object.assign({},this.queryParam,this.isorter);
      param.field    = this.getQueryField();
      param.pageNo   = this.ipagination.current;
      param.pageSize = this.ipagination.pageSize;
      if (param.sjrq) {
        param.sjrq = sjrqMoment;
      }
      return filterObj(param);
    },
    extract(){
      if (!this.isCheck(this.queryParam.sjrq)) {
        this.$message.error('请选择数据提取日期！')
        return
      }
      this.loading = true
      putAction(this.url.init, {sjrq:moment(this.queryParam.sjrq).format('YYYY-MM-DD')}).then((res) => {
        if (res.success) {
          this.$message.success("提取成功！")
          this.getMaxDateToQuery()
        } else {
          this.$message.warning("提取失败！")
        }
      }).catch((error) => {
        this.$message.error("提取失败！", error)
      }).finally(() => {
        this.loading = false
      })
    },
    isCheck(e) {
      if (e == null || e == undefined || e == '') {
        return false
      }
      return true
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>