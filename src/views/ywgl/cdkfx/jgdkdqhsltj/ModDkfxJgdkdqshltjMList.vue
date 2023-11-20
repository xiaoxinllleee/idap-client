<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" style="width: 100%;"
                              :defaultValue="defaultMonthOpera" :format="monthFormat"/>
            </a-form-item>
          </a-col>
<!--          <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
<!--            <a-form-item label="机构代码">-->
<!--              <a-input placeholder="请输入机构代码" v-model="queryParam.jgdm"></a-input>-->
<!--            </a-form-item>-->
<!--          </a-col>-->

          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="机构代码">
            <j-tree-select placeholder="请选择支行"
                           v-model="queryParam.jgdm"
                           treeNodeFilterProp="title"
                           pid-field="sjywjgdm"
                           dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                           :showSearch="true"
                           :treeDefaultExpandAll="true"/>
          </a-form-item></a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button  @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <!--              <a @click="handleToggleSearch" style="margin-left: 8px">-->
              <!--                {{ toggleSearchStatus ? '收起' : '展开' }}-->
              <!--                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>-->
              <!--              </a>-->
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>
    <div class="table-operator">
      <a-button  style="margin-left: 7px" :loading="exportLoading" icon="download" @click="handleExportXls('机构贷款到期收回率统计')" v-has="'jgdkdqshltj:exportXls'">导出</a-button>
    </div>
    <!-- 操作按钮区域 -->
<!--    <div class="table-operator">-->
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
<!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
<!--        <a-menu slot="overlay">-->
<!--          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>-->
<!--        </a-menu>-->
<!--        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
<!--      </a-dropdown>-->
<!--    </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x : 3000}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'jgdkdqshltj:edit'">编辑</a>

          <a-divider type="vertical" />
         <!-- <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                  </a-menu-item>
            </a-menu>
          </a-dropdown>-->
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)" v-has="'jgdkdqshltj:delete'">
                  <a>删除</a>
                </a-popconfirm>

        </span>

      </a-table>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <modDkfxJgdkdqshltjM-modal ref="modalForm" @ok="modalFormOk"></modDkfxJgdkdqshltjM-modal>
  </a-card>
</template>

<script>
import ModDkfxJgdkdqshltjMModal from './modules/ModDkfxJgdkdqshltjMModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { filterObj } from '@/utils/util';
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import { getAction,downFile } from '@/api/manage'
import moment from 'moment'
import store from '@/store/'
export default {
  name: "ModDkfxJgdkdqshltjMList",
  mixins:[JeecgListMixin],
  components: {
    ModDkfxJgdkdqshltjMModal,JTreeSelect
  },
  data () {
    return {
      description: '机构贷款到期收回率统计管理页面',
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
          title: '统计月份',
          align:"center",
          dataIndex: 'tjyf',
          customRender:function (text) {
            return !text?"":(text.length>8?text.substr(0,7):text)
          },
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
          title: '开始日期',
          align:"center",
          dataIndex: 'beginday'
        },
        {
          title: '结束日期',
          align:"center",
          dataIndex: 'endday'
        },
        {
          title: '发放应收回(元)',
          align:"center",
          dataIndex: 'ffysh'
        },
        {
          title: '发放未收回(元)',
          align:"center",
          dataIndex: 'ffwsh'
        },
        {
          title: '发放已收回(元)',
          align:"center",
          dataIndex: 'ffyish'
        },
        {
          title: '发放到期收回率(%)',
          align:"center",
          dataIndex: 'ffdqshl'
        },
        {
          title: '当年发放应收回(元)',
          align:"center",
          dataIndex: 'dnffysh'
        },
        {
          title: '当年发放未收回(元)',
          align:"center",
          dataIndex: 'dnffwsh'
        },
        {
          title: '当年发放已收回(元)',
          align:"center",
          dataIndex: 'dnffyish'
        },
        {
          title: '当年发放到期收回率(%)',
          align:"center",
          dataIndex: 'dnffdqshl'
        },
        {
          title: '以前发放应收回(元)',
          align:"center",
          dataIndex: 'yqnffysh'
        },
        {
          title: '以前发放未收回(元)',
          align:"center",
          dataIndex: 'yqnffwsh'
        },
        {
          title: '以前发放已收回(元)',
          align:"center",
          dataIndex: 'yqnffyish'
        },
        {
          title: '以前发放到期收回率(%)',
          align:"center",
          dataIndex: 'yqnffdqshl'
        }
      ],
      url: {
        list: "/jgdkdqhsltj/modDkfxJgdkdqshltjM/list",
        delete: "/jgdkdqhsltj/modDkfxJgdkdqshltjM/delete",
        deleteBatch: "/jgdkdqhsltj/modDkfxJgdkdqshltjM/deleteBatch",
        exportXlsUrl: "jgdkdqhsltj/modDkfxJgdkdqshltjM/exportXls",
        importExcelUrl: "jgdkdqhsltj/modDkfxJgdkdqshltjM/importExcel",
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
   /* getCurrentMonth() {
      let curDate = new Date();
      curDate.setMonth(curDate.getMonth()-1);
      this.defaultMonthOpera = moment(curDate);
    },*/
    getCurrentMonth() {
      let curDate = new Date();
      let curMonth = {year: curDate.getFullYear(), month: curDate.getMonth() + 1,}
      this.defaultMonthOpera = moment(curDate, this.monthFormat);
      this.queryParam = {tjyf: undefined};
      this.queryParam.tjyf=this.defaultMonthOpera;
    },
    searchReset () {
      this.queryParam = { tjyf: undefined ,jgdm:''}
      this.queryParam.tjyf = this.defaultMonthOpera
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
      if ((params.tjyf != undefined && params.tjyf != null)) {
        params.tjyf = moment(params.tjyf).format("YYYY-MM") + '-01';
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
      if (this.queryParam.tjyf) {
        tjrqment = moment(this.queryParam.tjyf).format("YYYY-MM") + '-01'
      }
      var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters);
      param.field = this.getQueryField();
      param.pageNo = this.ipagination.current;
      param.pageSize = this.ipagination.pageSize;
      if (param.tjyf) {
        param.tjyf = tjrqment;
      }
      return filterObj(param);
    },
    handleExportXls(fileName){
      if(!fileName || typeof fileName != "string"){
        fileName = "导出文件"
      }
      let tjyf = ''
      let param = Object.assign({}, this.queryParam)
      if (this.queryParam.tjyf !== undefined && this.queryParam.tjyf !== null) {
        tjyf = moment(param.tjyf).format("YYYY-MM") + '-01'
      }
      param.tjyf=tjyf;
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