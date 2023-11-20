<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">


          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择所属机构" v-model="queryParam.jgdm" dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             treeNodeFilterProp="title" pid-field="sjywjgdm"
                             :showSearch="true" :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="合同号">
              <a-input placeholder="请输入合同号" v-model="queryParam.hth"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款账号">
              <a-input placeholder="请输入贷款账号" v-model="queryParam.dkzh"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户姓名">
              <a-input placeholder="请输入客户姓名" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="便民卡卡号">
              <a-input placeholder="请输入便民卡卡号" v-model="queryParam.bmkkh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="借款日期">
              <a-range-picker @change="onjkrqDateChange" v-model="queryParam.jkrq" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="到期日期">
              <a-range-picker @change="ondqrqDateChange" v-model="queryParam.dqrq"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款金额">
<!--              <a-input placeholder="请输入贷款金额" v-model="queryParam.dkje"></a-input>-->
              <a-input-number  v-model="queryParam.dkje_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number  v-model="queryParam.dkje_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款余额">
<!--              <a-input placeholder="请输入贷款余额" v-model="queryParam.dkye"></a-input>-->
              <a-input-number  v-model="queryParam.dkye_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number  v-model="queryParam.dkye_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="第一责任人">
              <a-input placeholder="请输入第一责任人" v-model="queryParam.dyzrr"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="主客户经理">
              <a-input placeholder="请输入主客户经理" v-model="queryParam.khjlbz"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="担保方式">
<!--              <a-input placeholder="请输入担保方式" v-model="queryParam.dbfs"></a-input>-->
              <j-dict-select-tag  :placeholder="true" dict-code="gljydbfs" v-model="queryParam.dbfs"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款形态">
<!--              <a-input placeholder="请输入贷款形态" v-model="queryParam.dkxt"></a-input>-->
              <j-dict-select-tag  :placeholder="true" dict-code="wjflbz" v-model="queryParam.dkxt"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="剩余天数">
              <a-input placeholder="请输入剩余天数" v-model="queryParam.syts"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="剩余天数">
              <a-range-picker @change="onsytsDateChange" v-model="queryParam.syts"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款期限">
<!--              <a-input placeholder="请输入贷款期限" v-model="queryParam.dkqx"></a-input>-->
              <j-dict-select-tag  :placeholder="true" dict-code="dkqx" v-model="queryParam.dkqx"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户类型">
<!--              <a-input placeholder="请输入客户类型" v-model="queryParam.khlx"></a-input>-->
              <j-dict-select-tag  :placeholder="true" dict-code="dkkhlx" v-model="queryParam.khlx"/>

            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="到期情况监测">
<!--              <a-input placeholder="请输入到期情况监测" v-model="queryParam.dqqkjc"></a-input>-->
              <j-dict-select-tag  :placeholder="true" dict-code="dqqkjc" v-model="queryParam.dqqkjc"/>

            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="不良形成原因">
<!--              <a-input placeholder="请输入不良形成原因" v-model="queryParam.blxcyy"></a-input>-->
              <j-dict-select-tag  :placeholder="true" dict-code="blxcyy" v-model="queryParam.blxcyy"/>

            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="责任界定">
<!--              <a-input placeholder="请输入责任界定" v-model="queryParam.zrjd"></a-input>-->
              <j-dict-select-tag  :placeholder="true" dict-code="zrjd" v-model="queryParam.zrjd"/>

            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="清收处置措施">
<!--              <a-input placeholder="请输入清收处置措施" v-model="queryParam.qsczcs"></a-input>-->
              <j-dict-select-tag  :placeholder="true" dict-code="qsczcs" v-model="queryParam.qsczcs"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="清收处置时限">
              <a-input placeholder="请输入清收处置时限" v-model="queryParam.qsczsx"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="主要责任人">
              <a-input placeholder="请输入主要责任人" v-model="queryParam.zyzrr"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="次要责任人">
              <a-input placeholder="请输入次要责任人" v-model="queryParam.cyzrr"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="清收责任人">
              <a-input placeholder="请输入清收责任人" v-model="queryParam.qszrr"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="信贷贷款品种">
<!--              <a-input placeholder="全部" v-model="queryParam.xddkpz"></a-input>-->
              <j-dict-select-tag  :placeholder="true" dict-code="dkzl" v-model="queryParam.qsczcs"/>
            </a-form-item>
          </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('信贷T+1核查')" v-has="'xdhc01:exportXls'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'xdhc01:import'">导入</a-button>
      <a-button @click="init" icon="area-chart" v-has="'xdhc01:init'">提取</a-button>
      <a-button @click="allAudit">全部审核</a-button>
      <a-button @click="allunAudit">全部撤销审核</a-button>
    </div>

    <!-- table区域-begin -->
    <div>

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:8500}"
        @change="handleTableChange">



        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'xdhc01:edit'">编辑</a>
          <a-divider type="vertical" />
           <a @click="handleView(record)" v-has="'xdhc01:view'">查看</a>
           <a-divider type="vertical" />
          <a @click="audit(record)" v-has="'xdhc01:audit'">审核</a>

        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <xdhc01-modal ref="modalForm" @ok="modalFormOk"></xdhc01-modal>
    <excel-import ref="excelImportModal" @ok="importComplete" />
  </a-card>
</template>

<script>
  import Xdhc01Modal from './modules/Xdhc01Modal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../components/jeecg/JTreeSelect'
  import { filterObj } from '../../../../utils/util'
  import JEllipsis from '../../../../components/jeecg/JEllipsis'
  import ExcelImport from '@/components/common/ExcelImport'
  import { getAction, putAction } from '../../../../api/manage'

  export default {
    name: "Xdhc01List",
    mixins:[JeecgListMixin],
    components: {
      Xdhc01Modal,JTreeSelect,JEllipsis,ExcelImport
    },
    data () {
      return {
        description: '信贷T+1核查管理页面',
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
            title: '数据日期',
            align:"center",
            dataIndex: 'tjyf'
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
            title: '客户姓名',
            align:"center",
            dataIndex: 'khmc'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm',
       scopedSlots: { customRender: 'zjhm' },
           },
		   {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText'
           },
		   {
            title: '住址',
            align:"center",
            dataIndex: 'dz'
           },
        /*  {
            title: '电话号码',
            align:"center",
            dataIndex: 'dhhm'
          },*/
          {
            title: '贷款账号',
            align:"center",
            dataIndex: 'dkzh',
            scopedSlots: { customRender: 'dkzh' },
          },
          {
            title: '合同号',
            align:"center",
            dataIndex: 'hth',
            scopedSlots: { customRender: 'hth' },
          },

		   {
            title: '便民卡卡号',
            align:"center",
            dataIndex: 'bmkkh'
           },
		   {
            title: '贷款金额',
            align:"center",
            dataIndex: 'dkje'
           },
		   {
            title: '贷款余额',
            align:"center",
            dataIndex: 'dkye'
           },
		   {
            title: '借款日期',
            align:"center",
            dataIndex: 'jkrq'
           },
		   {
            title: '到期日期',
            align:"center",
            dataIndex: 'dqrq'
           },
		   {
            title: '起息日',
            align:"center",
            dataIndex: 'qxr'
           },
		   {
            title: '结息日',
            align:"center",
            dataIndex: 'jxr'
           },
		   {
            title: '贷款期限',
            align:"center",
            dataIndex: 'dkqx_dictText'
           },
		   {
            title: '产品名称',
            align:"center",
            dataIndex: 'cpmc'
           },
		   {
            title: '剩余天数',
            align:"center",
            dataIndex: 'syts'
           },
		   {
            title: '欠息天数',
            align:"center",
            dataIndex: 'qxts'
           },
		   {
            title: '表内应计利息',
            align:"center",
            dataIndex: 'bnyjlx'
           },
		   {
            title: '表内应收利息',
            align:"center",
            dataIndex: 'bnyslx'
           },
		   {
            title: '表外应计利息',
            align:"center",
            dataIndex: 'bwyjlx'
           },
		   {
            title: '表外应收利息',
            align:"center",
            dataIndex: 'bwyslx'
           },
		   {
            title: '表内外欠息和',
            align:"center",
            dataIndex: 'bnwqxh'
           },
		   {
            title: '贷款利率',
            align:"center",
            dataIndex: 'dkll'
           },
		   {
            title: '担保方式',
            align:"center",
            dataIndex: 'dbfs_dictText'
           },
		   {
            title: '第一责任人',
            align:"center",
            dataIndex: 'dyzrr'
           },
		   {
            title: '主客户经理',
            align:"center",
            dataIndex: 'khjlbz'
           },
		   {
            title: '所属行业类型',
            align:"center",
            dataIndex: 'khsshylx_dictText'
           },
		   {
            title: '贷款投向',
            align:"center",
            dataIndex: 'dktx_dictText'
           },
		   {
            title: '贷款形态',
            align:"center",
            dataIndex: 'dkxt_dictText'
           },
		   {
            title: '信贷贷款品种',
            align:"center",
            dataIndex: 'xddkpz_dictText'
           },
		   {
            title: '到期情况监测',
            align:"center",
            dataIndex: 'dqqkjc_dictText'
           },
		   {
            title: '不良形成原因',
            align:"center",
            dataIndex: 'blxcyy_dictText'
           },
		   {
            title: '责任界定',
            align:"center",
            dataIndex: 'zrjd_dictText'
           },
		   {
            title: '清收处置措施',
            align:"center",
            dataIndex: 'qsczcs_dictText'
           },
		   {
            title: '清收处置时限',
            align:"center",
            dataIndex: 'qsczsx'
           },
          {
            title: '主要责任人',
            align:"center",
            dataIndex: 'zyzrr'
          },
          {
            title: '次要责任人',
            align:"center",
            dataIndex: 'cyzrr'
          },
		   {
            title: '清收责任人',
            align:"center",
            dataIndex: 'qszrr'
           },
          {
            title: '审核状态',
            align:"center",
            dataIndex: 'shzt_dictText'
          },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'bz'
           },

          {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr'
          },
		   {
            title: '录入标志',
            align:"center",
            dataIndex: 'lrbz_dictText'
           },
          {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
          },

		 /*  {
            title: '客户经理员工工号',
            align:"center",
            dataIndex: 'khjlyggh'
           },*/

		  /* {
            title: 'xwqy',
            align:"center",
            dataIndex: 'xwqy'
           },*/
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            fixed: "right",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/xdhc01/xdhc01/list",
          delete: "/xdhc01/xdhc01/delete",
          deleteBatch: "/xdhc01/xdhc01/deleteBatch",
          exportXlsUrl: "xdhc01/xdhc01/exportXls",
          importExcelUrl: "xdhc01/xdhc01/importExcel",
          init: "/xdhc01/xdhc01/init",
          audit: "/xdhc01/xdhc01/audit",
          allAudit: "/xdhc01/xdhc01/allAudit",
          allunAudit: "/xdhc01/xdhc01/allunAudit",
          exportTemplateUrl: "/xdhc01/xdhc01/exportTemplateXls",
       },
        exportTemplateName: '信贷T+1核查管理_1导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.dqrq;
        delete param.jkrq;
        delete param.syts;
        return filterObj(param);
      },
      ondqrqDateChange(value,dateString){
        let dqrqString = dateString
        this.queryParam.dqrq_begin = dqrqString[0]
        this.queryParam.dqrq_end = dqrqString[1]
      },
      onjkrqDateChange(value,dateString){
        let jkrqString = dateString
        this.queryParam.jkrq_begin = jkrqString[0]
        this.queryParam.jkrq_end = jkrqString[1]
      },
      onsytsDateChange(value,dateString){
        let sytsString = dateString
        this.queryParam.syts_begin = sytsString[0]
        this.queryParam.syts_end = sytsString[1]
      },

      handleEdit(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "修改";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = true;
      },
      handleView: function (record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "查看";
        this.$refs.modalForm.disableSubmit = true;
        this.$refs.modalForm.disabled = true;
        this.$refs.modalForm.show = false;
      },
      init () {
        this.loading = true
        let params = {}
        getAction(this.url.init,params).then((res) => {
          if (res.success) {
            this.$message.success('提取成功')
            this.loadData(1)
          } else {
            this.$message.warning('提取失败')
          }
        }).catch((err) => {
          this.$message.error('提取失败', error)
        }).finally(() => {
          this.loading = false
        })
      },
      audit (record) {
        let params = record
        console.log(params)
        this.loading=true
        putAction(this.url.audit,params).then((res) => {
          if (res.success) {
            this.$message.success('审核成功！')
          } else {
            this.$message.warning('审核失败！')
          }
        }).catch((err) => {
          this.$message.error('审核失败', error)
        }).finally(res =>{
          this.loading=false
          this.loadData(1)
        })
      },
      allAudit(record){
        let params = record
        console.log(params)
        this.loading=true
        putAction(this.url.allAudit,params).then((res) => {
          if (res.success) {
            this.$message.success('全部审核成功！')
          } else {
            this.$message.warning('全部审核失败！')
          }
        }).catch((err) => {
          this.$message.error('审核失败', error)
        }).finally(res =>{
          this.loading=false
          this.loadData(1)
        })
      },
      allunAudit(record){
        let params = record
        console.log(params)
        this.loading=true
        putAction(this.url.allunAudit,params).then((res) => {
          if (res.success) {
            this.$message.success('全部撤销审核成功！')
          } else {
            this.$message.warning('全部撤销审核失败！')
          }
        }).catch((err) => {
          this.$message.error('审核失败', error)
        }).finally(res =>{
          this.loading=false
          this.loadData(1)
        })
      }



    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>