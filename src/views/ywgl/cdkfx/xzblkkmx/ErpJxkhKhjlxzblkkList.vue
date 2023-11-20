<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <!--          <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
          <!--            <a-form-item label="考核月份">-->
          <!--              <a-input placeholder="请输入考核月份" v-model="queryParam.khyf"></a-input>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="考核月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.khyf" style="width: 100%;"
                              :defaultValue="defaultMonthOpera" :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="支行代码">
              <j-tree-select placeholder="请选择支行"
                             pid-field="sjywjgdm_b"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.zhjgdm"
                             v-decorator="['zhjgdm', {rules: [{required: true, message: '请选择机构查询！'}]}]"
                             dict="v_hr_bas_organization, zzjc, ywjgdm"
                             condition='{"sjywjgdm": "ywjgdm"}'
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构查询"
                             pid-field="sjywjgdm"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.jgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>

          <!--        <template v-if="toggleSearchStatus">-->
          <!--         -->
          <!--          <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
          <!--            <a-form-item label="岗位">-->
          <!--              <a-input placeholder="请输入岗位" v-model="queryParam.postid"></a-input>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <!--          <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
          <!--            <a-form-item label="客户经理标识">-->
          <!--              <a-input placeholder="请输入客户经理标识" v-model="queryParam.custid"></a-input>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <!--          </template>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">

<!--              <a @click="handleToggleSearch" style="margin-left: 8px">-->
              <!--                {{ toggleSearchStatus ? '收起' : '展开' }}-->
              <!--                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>-->
              <!--              </a>-->
            </span>
          </a-col>

        </a-row>
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>
          <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
          <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('新增不良扣款明细')" v-has="'xzblkkmx:exportXls'">导出</a-button>
      <a-button @click="count"  icon="area-chart" v-has="'xzblkkmx:init'">提取</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :scroll="{x:3000}"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'xzblkkmx:edit'">编辑</a>

          <a-divider type="vertical" />
        <!--  <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                </a-menu-item>
            </a-menu>
          </a-dropdown>-->
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)" v-has="'xzblkkmx:delete'">
                  <a>删除</a>
                </a-popconfirm>

        </span>

      </a-table>
    </div>
    <!-- table区域-end -->
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import moment from 'moment'
import { filterObj } from '@/utils/util';
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import { getAction } from '@/api/manage'
import {downFile} from "../../../../api/manage";
import store from '@/store/'

export default {
  name: "ErpJxkhKhjlxzblkkList",
  mixins:[JeecgListMixin],
  components: {
    JTreeSelect
  },
  data () {
    return {
      description: '新增不良扣款明细管理页面',
      monthFormat: 'YYYY-MM',
      // 默认当前月份
      defaultMonthOpera: '',
      // 表头
      columns: [
        {
          title: '#',
          dataIndex: '',
          key:'rowIndex',
          width:60,
          align:"center",
          customRender:function (t,r,index) {
            return parseInt(index)+1;
          }
        },
        {
          title: '考核月份',
          align:"center",
          dataIndex: 'khyf',
          customRender:function (text){
            return !text?"":(text.length>8?text.substr(0,7):text)
          }
        },
        {
          title: '支行代码',
          align:"center",
          dataIndex: 'zhjgdm'
        },
        {
          title: '支行名称',
          align:"center",
          dataIndex: 'zhjgdm_dictText'
        },
        {
          title: '机构代码',
          align:"center",
          dataIndex: 'jgdm'
        },
        {
          title: '机构名称',
          align:"center",
          dataIndex: 'jgdm_dictText'
        },
        {
          title: '员工工号',
          align:"center",
          dataIndex: 'yggh'
        },

        {
          title: '员工姓名',
          align:"center",
          dataIndex: 'yggh_dictText'
        },
        {
          title: '客户经理标识',
          align:"center",
          dataIndex: 'custid'
        },
        {
          title: '岗位',
          align:"center",
          dataIndex: 'postid'
        },

        {
          title: '本期不良余额(元)',
          align:"center",
          dataIndex: 'bqbldkye'
        },
        {
          title: '本期扣款档次(元)',
          align:"center",
          dataIndex: 'bqkkjedc'
        },
        // {
        //      title: 'sqbldkye',
        //      align:"center",
        //      dataIndex: 'sqbldkye'
        //     },
        // {
        //      title: 'sqkkjedc',
        //      align:"center",
        //      dataIndex: 'sqkkjedc'
        //     },
        {
          title: '上期应扣(元)',
          align:"center",
          dataIndex: 'sqykje'
        },
        {
          title: '上期实扣(元)',
          align:"center",
          dataIndex: 'sqskje'
        },
        {
          title: '上期未扣(元)',
          align:"center",
          dataIndex: 'sqsyykje'
        },
        {
          title: '本期应扣(元)',
          align:"center",
          dataIndex: 'bqykje'
        },
        {
          title: '本期实扣(元)',
          align:"center",
          dataIndex: 'bqskje'
        },
        {
          title: '本期未扣(元)',
          align:"center",
          dataIndex: 'bqsyykje'
        },
        {
          title: '本期退回(元)',
          align:"center",
          dataIndex: 'ythkk'
        },
        {
          title: '已扣不良金额(元)',
          align:"center",
          dataIndex: 'ykblje'
        },
       /* {
          title: '本金不良',
          align:"center",
          dataIndex: 'bjbl'
        },
        {
          title: '利息不良',
          align:"center",
          dataIndex: 'lxbl'
        }		,*/
        {
          title: '录入时间',
          align:"center",
          dataIndex: 'lrsj'
        },
        {
          title: '录入标志',
          align:"center",
          dataIndex: 'lrbz_dictText'
        },
        {
          title: '录入操作员',
          align:"center",
          dataIndex: 'lrczy'
        },
      ],
      url: {
        list: "/xzblkkmx/erpJxkhKhjlxzblkk/list",
        delete: "/xzblkkmx/erpJxkhKhjlxzblkk/delete",
        deleteBatch: "/xzblkkmx/erpJxkhKhjlxzblkk/deleteBatch",
        exportXlsUrl: "xzblkkmx/erpJxkhKhjlxzblkk/exportXls",
        importExcelUrl: "xzblkkmx/erpJxkhKhjlxzblkk/importExcel",
        count: "xzblkkmx/erpJxkhKhjlxzblkk/count",
      },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
  created() {
    this.getCurrentMonth()

  },
  methods: {
    count(){
      let khyf = this.queryParam.khyf
      if (khyf == null || khyf == ''){
        khyf = moment(this.defaultMonthOpera).format("YYYY-MM") + '-01'
      }else {
        khyf = moment(this.queryParam.khyf).format("YYYY-MM")+'-01';
      }
      this.loading = true
      getAction(this.url.count,{tjyf:khyf}).then((res)=>{
        if (res.success) {
          this.$message.success("提取成功！")
          this.loadData(1)
        } else {
          this.$message.warning("提取失败！")
        }
      }).catch((error) => {
        this.$message.error("提取失败", error)
      }).finally(() => {
        this.loading = false
      })
    },

    getCurrentMonth() {
      let curDate = new Date();
      let curMonth = {year: curDate.getFullYear(), month: curDate.getMonth() + 1,}
      this.defaultMonthOpera = moment(curDate, this.monthFormat);
      this.queryParam = {khyf: undefined};
      this.queryParam.khyf=this.defaultMonthOpera;
    },
    searchReset () {
      this.queryParam = { khyf: undefined ,jgdm:''}
      this.queryParam.khyf = this.defaultMonthOpera
      if(!store.getters.isRoot) {
        console.log( store.getters.ywjgdm)
        this.queryParam.jgdm = store.getters.ywjgdm
      }
      this.loadData(1)
    },
    loadData(arg) {
      if(!this.url.list){
        this.$message.error("请设置url.list属性!")
        return
      }
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1
      }
      var params = this.getQueryParams();//查询条件
      if ((params.khyf != undefined && params.khyf != null)) {
        params.khyf = moment(params.khyf).format("YYYY-MM") + '-01';
      }
      this.loading = true
      getAction(this.url.list, params).then((res) => {
        if (res.success) {
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total
        }
        if(res.code===510){
          this.$message.warning(res.message,5)
        }
        this.loading = false
      })
    },

    getQueryParams() {
      //获取查询条件
      let sqp = {}
      if (this.superQueryParams) {
        sqp['superQueryParams'] = encodeURI(this.superQueryParams)
      }
      //日期格式调整
      let tjrqment = ""
      if (this.queryParam.khyf) {
        tjrqment = moment(this.queryParam.khyf).format("YYYY-MM") + '-01'
      }
      var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters);
      param.field = this.getQueryField();
      param.pageNo = this.ipagination.current;
      param.pageSize = this.ipagination.pageSize;
      if (param.khyf) {
        param.khyf = tjrqment;
      }
      return filterObj(param);
    },

    handleExportXls(fileName){
      if(!fileName || typeof fileName != "string"){
        fileName = "导出文件"
      }
      let tjyf = ''
      let param = Object.assign({}, this.queryParam)
      if (this.queryParam.khyf !== undefined && this.queryParam.khyf !== null) {
        tjyf = moment(param.khyf).format("YYYY-MM") + '-01'
      }
      param.khyf=tjyf;
      if(this.selectedRowKeys && this.selectedRowKeys.length>0){
        param['selections'] = this.selectedRowKeys.join(",")
      }
      let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()));
      param.paramsStr = paramsStr
      console.log("导出参数",param)
      this.exportLoading = true
      downFile(this.url.exportXlsUrl,param).then((data)=>{
        if (!data) {
          this.$message.warning("文件下载失败")
          return
        }
        var blob = new Blob([data]);
        if('msSaveOrOpenBlob' in navigator){
          window.navigator.msSaveOrOpenBlob(blob, fileName+'.xls');
          return;
        }
        var eleLink = document.createElement('a');
        eleLink.download = fileName+'.xls';
        eleLink.style.display = 'none'
        eleLink.href = URL.createObjectURL(blob);
        document.body.appendChild(eleLink);
        eleLink.click();
        document.body.removeChild(eleLink);
      }).finally(()=>{
        this.exportLoading = false
        // this.loadData(1)
      })
    },
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>