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
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="支行代码">
              <j-tree-select placeholder="请选择支行"
                             pid-field="sjywjgdm_b"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.sjywjgdm"
                             v-decorator="['sjywjgdm', {rules: [{required: true, message: '请选择机构查询！'}]}]"
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

          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="存款余额之和">
                <a-input placeholder="请输入存款余额之和" v-model="queryParam.ckyezh"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="存款日平余额">
                <a-input placeholder="请输入存款日平余额" v-model="queryParam.ckrpye"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="贷款余额之和">
                <a-input placeholder="请输入贷款余额之和" v-model="queryParam.dkyezh"></a-input>
              </a-form-item>
            </a-col>
          </template>
          <!--          <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
          <!--            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">-->

          <!--              <a @click="handleToggleSearch" style="margin-left: 8px">-->
          <!--                {{ toggleSearchStatus ? '收起' : '展开' }}-->
          <!--                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>-->
          <!--              </a>-->
          <!--            </span>-->
          <!--          </a-col>-->

        </a-row>
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户经理姓名">
              <j-dict-select-tag placeholder="请输入客户经理姓名" v-model="queryParam.custid" dict-code="view_staff_dict,khjl,khjlbh" :show-search="true"/>
            </a-form-item>
          </a-col>
          <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
          <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>

        </a-row>

      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button icon="download" @click="handleExportXls('客户经理存贷款月统计')">导出</a-button>
      <!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
      <!--        <a-button type="primary" icon="import">导入</a-button>-->
      <!--      </a-upload>-->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :scroll="{x:3000}"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <!--<a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                 </a-menu-item>
            </a-menu>
          </a-dropdown>-->
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>

        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <modDkfxJgkhlqxnwdkqktjM-modal ref="modalForm" @ok="modalFormOk"></modDkfxJgkhlqxnwdkqktjM-modal>
  </a-card>
</template>

<script>
  import ModDkfxJgkhlqxnwdkqktjMModal from './modules/ModDkfxJgkhlqxnwdkqktjMModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util';
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import store from '@/store/'
  import moment from 'moment'
  import { downFile, getAction } from '@api/manage'
  export default {
    name: "ModDkfxJgkhlqxnwdkqktjMList",
    mixins:[JeecgListMixin],
    components: {
      ModDkfxJgkhlqxnwdkqktjMModal,JTreeSelect
    },
    data () {
      return {
        description: '客户经理贷款综合统计管理页面',
        // 表头
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: '',
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
            customRender:function (text){
              return !text?"":(text.length>8?text.substr(0,7):text)
            }
          },
          {
            title: '支行代码',
            align:"center",
            dataIndex: 'sjywjgdm'
          },
          {
            title: '支行名称',
            align:"center",
            dataIndex: 'sjywjgdm_dictText'
          },	   {
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
            title: '客户经理标识',
            align:"center",
            dataIndex: 'custid'
          },
          {
            title: '客户经理姓名',
            align:"center",
            dataIndex: 'custid_dictText'
          },
		   {
            title: '权限外贷款笔数',
            align:"center",
            dataIndex: 'dbqxwdkbs'
           },
		   {
            title: '贷款户数',
            align:"center",
            dataIndex: 'dhdkhs'
           },
		   {
            title: '权限内贷款户数',
            align:"center",
            dataIndex: 'dhqxndkhs'
           },
		   {
            title: '权限外贷款户数',
            align:"center",
            dataIndex: 'dhqxwdkhs'
           },
		   {
            title: '发放贷款金额(元)',
            align:"center",
            dataIndex: 'ffdkje'
           },
		   {
            title: '发放贷款笔数',
            align:"center",
            dataIndex: 'ffdkbs'
           },
		   {
            title: '发放权限内贷款金额(元)',
            align:"center",
            dataIndex: 'ffqxndkje'
           },
		   {
            title: '发放权限内贷款笔数',
            align:"center",
            dataIndex: 'ffqxndkbs'
           },
		   {
            title: '发放权限外贷款金额(元)',
            align:"center",
            dataIndex: 'ffqxwdkje'
           },
		   {
            title: '发放权限外贷款笔数',
            align:"center",
            dataIndex: 'ffqxwdkbs'
           },
		   {
            title: '收回利息(元)',
            align:"center",
            dataIndex: 'shlx'
           },
		   {
            title: '收回本金(元)',
            align:"center",
            dataIndex: 'shbj'
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
            title: '贷款金额(元)',
            align:"center",
            dataIndex: 'dbdkje'
           },
		   {
            title: '贷款余额(元)',
            align:"center",
            dataIndex: 'dbdkye'
           },
		   {
            title: '贷款笔数',
            align:"center",
            dataIndex: 'dbdkbs'
           },
		   {
            title: '权限内贷款笔数',
            align:"center",
            dataIndex: 'dbqxndkbs'
           },
        ],
		url: {
          list: "/khjldkzhtj/modDkfxJgkhlqxnwdkqktjM/list",
          delete: "/khjldkzhtj/modDkfxJgkhlqxnwdkqktjM/delete",
          deleteBatch: "/khjldkzhtj/modDkfxJgkhlqxnwdkqktjM/deleteBatch",
          exportXlsUrl: "khjldkzhtj/modDkfxJgkhlqxnwdkqktjM/exportXls",
          importExcelUrl: "khjldkzhtj/modDkfxJgkhlqxnwdkqktjM/importExcel",
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
        if (!this.url.list) {
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
          if (res.code === 510) {
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
        console.info('统计月份:',this.queryParam.tjyf)
        //日期格式调整
        let tjyf = ""
        if (this.queryParam.tjyf) {
          tjyf = moment(this.queryParam.tjyf).format("YYYY-MM") + '-01'
        }
        var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf = tjyf;
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
    },

  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>