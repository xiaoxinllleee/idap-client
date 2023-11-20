<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属机构">
              <j-tree-select placeholder="请选择支行"
                             v-model="queryParam.jgdm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
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
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="便民卡卡号">
                <a-input placeholder="请输入便民卡卡号" v-model="queryParam.bmkkh"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="借款日期">
                <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.jkrq" :format="DateFormat"
                                @change="onJkDateChange" style="width: 100%;"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="到期日期">
                <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.dqrq" :format="DateFormat"
                                @change="onDqDateChange" style="width: 100%;"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="贷款金额">
                <a-input-group compact>
                  <a-input-number placeholder="" v-model="queryParam.dkje_begin" :min="0"
                                  style=" width: 40%; text-align: center; "/>
                  <a-input placeholder="<->" disabled
                           style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "/>
                  <a-input-number placeholder="" v-model="queryParam.dkje_end" :min="0"
                                  style="width: 40%; text-align: center; border-left: 0;"/>
                </a-input-group>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="贷款余额">
                <a-input-group compact>
                  <a-input-number placeholder="" v-model="queryParam.dkye_begin" :min="0"
                                  style=" width: 40%; text-align: center; "/>
                  <a-input placeholder="<->" disabled
                           style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "/>
                  <a-input-number placeholder="" v-model="queryParam.dkye_end" :min="0"
                                  style="width: 40%; text-align: center; border-left: 0;"/>
                </a-input-group>
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
            <a-col :md="6" :sm="8">
              <a-form-item label="担保方式">
                <j-dict-select-tag placeholder="请选择担保方式 " v-model="queryParam.dbfs" dictCode="dbfs"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="贷款形态">
                <j-dict-select-tag placeholder="请选择贷款形态 " v-model="queryParam.dkxt" dictCode="wjflbz"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="剩余天数">
                <a-input-group compact>
                  <a-input-number placeholder="" v-model="queryParam.syts_begin" :min="0"
                                  style=" width: 40%; text-align: center; "/>
                  <a-input placeholder="<->" disabled
                           style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "/>
                  <a-input-number placeholder="" v-model="queryParam.syts_end" :min="0"
                                  style="width: 40%; text-align: center; border-left: 0;"/>
                </a-input-group>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="贷款期限">
                <j-dict-select-tag placeholder="贷款期限" v-model="queryParam.dkqx" dictCode="dkqx"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="客户类型">
                <j-dict-select-tag placeholder="客户类型" v-model="queryParam.khlx" dictCode="dkjkpt_khlx"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="到期情况监测">
                <j-dict-select-tag placeholder="到期情况监测" v-model="queryParam.dqqkjc" dictCode="dqqkjc"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="不良形成原因">
                <j-dict-select-tag placeholder="不良形成原因" v-model="queryParam.blxcyy" dictCode="blxcyy"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="责任界定">
                <j-dict-select-tag placeholder="责任界定" v-model="queryParam.zrjd" dictCode="zrjd"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="清收处置措施">
                <j-dict-select-tag placeholder="清收处置措施" v-model="queryParam.qsczcs" dictCode="qsczcs"/>
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
            <a-col :md="6" :sm="8">
              <a-form-item label="信贷贷款品种">
                <j-dict-select-tag placeholder="请选择信贷贷款品种" v-model="queryParam.xddkpz" dictCode="dkzl"/>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('贷款数据监控台账')" v-has="'dksjjktz:exportXls'">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button icon="import" v-has="'dksjjktz:import'">导入</a-button>
      </a-upload>
      <a-button @click="init" icon="area-chart" v-has="'dksjjktz:init'">提取</a-button>
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
        rowKey="dkzh"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:5780}"
        @change="handleTableChange">

        <span slot="dz" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="hth" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="cpmc" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="dkzh" slot-scope="text">
          <j-ellipsis :value="text" :length="18"/>
        </span>
        <span slot="bmkkh" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="khsshylx" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="dktx" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="xddkpz" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>



        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'dksjjktz:edit'">编辑</a>

          <a-divider type="vertical" />
                  <a @click="handleView(record)" v-has="'dksjjktz:see'">详情</a>
          <a-divider type="vertical" />
                  <a @click="audit(record)" v-has="'dksjjktz:audit'">审核</a>
          <a-divider type="vertical" />
                  <a @click="unaudit(record)" v-has="'dksjjktz:unaudit'">撤销审核</a>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dksjjktz-modal ref="modalForm" @ok="modalFormOk"></dksjjktz-modal>
  </a-card>
</template>

<script>
  import DksjjktzModal from './modules/DksjjktzModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JEllipsis from '@/components/jeecg/JEllipsis'
  import {getAction, putAction} from "../../../../api/manage";
  import {filterObj} from "../../../../utils/util";

  export default {
    name: "DksjjktzList",
    mixins:[JeecgListMixin],
    components: {
      DksjjktzModal,JEllipsis,JTreeSelect
    },
    data () {
      return {
        description: '贷款数据监控台账管理页面',
        DateFormat:'YYYY-MM-DD',
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
            dataIndex: 'tjyf',
            width: 100
          },
          {
            title: '机构代码',
            align:"center",
            dataIndex: 'jgdm',
            width: 100
          },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText',
            width: 100
          },
          {
            title: '客户姓名',
            align:"center",
            dataIndex: 'khmc',
            width: 100
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm',
            scopedSlots: { customRender: 'zjhm' },
            width: 180
          },
          {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText',
            width: 100
          },
          {
            title: '住址',
            align:"center",
            dataIndex: 'dz',
            scopedSlots: { customRender: 'dz' },
            width: 180
          },
          {
            title: '贷款账号',
            align:"center",
            dataIndex: 'dkzh',
            scopedSlots: { customRender: 'dkzh' },
            width: 180
          },
		      {
            title: '合同号',
            align:"center",
            dataIndex: 'hth',
            scopedSlots: { customRender: 'hth' },
            width: 100
           },
          {
            title: '便民卡卡号',
            align:"center",
            dataIndex: 'bmkkh',
            scopedSlots: { customRender: 'bmkkh' },
            width: 150
          },
          {
            title: '贷款金额',
            align:"center",
            dataIndex: 'dkje',
            width: 150
          },
          {
            title: '贷款余额',
            align:"center",
            dataIndex: 'dkye',
            width: 150
          },
          {
            title: '借款日期',
            align:"center",
            dataIndex: 'jkrq',
            width: 100
          },
          {
            title: '到期日期',
            align:"center",
            dataIndex: 'dqrq',
            width: 100
          },
          {
            title: '起息日',
            align:"center",
            dataIndex: 'qxr',
            width: 100
          },
          {
            title: '结息日',
            align:"center",
            dataIndex: 'jxr',
            width: 100
          },
          {
            title: '贷款期限',
            align:"center",
            dataIndex: 'dkqx_dictText',
            width: 150
          },
          {
            title: '产品名称',
            align:"center",
            dataIndex: 'cpmc',
            scopedSlots: { customRender: 'cpmc' },
            width: 150
          },
          {
            title: '剩余天数',
            align:"center",
            dataIndex: 'syts',
            width: 100
          },
          {
            title: '欠息天数',
            align:"center",
            dataIndex: 'qxts',
            width: 100
          },
          {
            title: '表内应计利息',
            align:"center",
            dataIndex: 'bnyjlx',
            width: 120
          },
          {
            title: '表内应收利息',
            align:"center",
            dataIndex: 'bnyslx',
            width: 120
          },
          {
            title: '表外应计利息',
            align:"center",
            dataIndex: 'bwyjlx',
            width: 120
          },
          {
            title: '表外应收利息',
            align:"center",
            dataIndex: 'bwyslx',
            width: 120
          },
          {
            title: '表内外欠息和',
            align:"center",
            dataIndex: 'bnwqxh',
            width: 120
          },
          {
            title: '贷款利率(%)',
            align:"center",
            dataIndex: 'dkll',
            width: 120
          },
          {
            title: '担保方式',
            align:"center",
            dataIndex: 'dbfs_dictText',
            width: 100
          },
          {
            title: '第一责任人',
            align:"center",
            dataIndex: 'dyzrr',
            width: 100
          },
          {
            title: '主客户经理',
            align:"center",
            dataIndex: 'khjlbz',
            width: 100
          },
          {
            title: '所属行业类型',
            align:"center",
            dataIndex: 'khsshylx',
            scopedSlots: { customRender: 'khsshylx' },
            width: 150
          },
		   {
            title: '贷款投向',
            align:"center",
            dataIndex: 'dktx_dictText',
            scopedSlots: { customRender: 'dktx' },
            width: 120
           },
		   {
            title: '贷款形态',
            align:"center",
            dataIndex: 'dkxt_dictText',
            width: 100
           },
		   {
            title: '信贷贷款品种',
            align:"center",
            dataIndex: 'xddkpz_dictText',
            scopedSlots: { customRender: 'xddkpz' },
            width:150
           },
		   {
            title: '到期情况监测',
            align:"center",
            dataIndex: 'dqqkjc_dictText',
            width: 120
           },
		   {
            title: '不良形成原因',
            align:"center",
            dataIndex: 'blxcyy_dictText',
            width: 120
           },
		   {
            title: '责任界定',
            align:"center",
            dataIndex: 'zrjd_dictText',
            width: 150
           },
		   {
            title: '清收处置措施',
            align:"center",
            dataIndex: 'qsczcs_dictText',
            width: 120
           },
		   {
            title: '清收处置时限',
            align:"center",
            dataIndex: 'qsczsx',
            width: 120
           },
          {
            title: '主要责任人',
            align:"center",
            dataIndex: 'zyzrr',
            width: 100
          },
          {
            title: '次要责任人',
            align:"center",
            dataIndex: 'cyzrr',
            width: 100
          },
          {
            title: '清收责任人',
            align:"center",
            dataIndex: 'qszrr',
            width: 100
          },
          {
            title: '审核状态',
            align:"center",
            dataIndex: 'shzt_dictText',
            width: 100
          },
          {
            title: '备注',
            align:"center",
            dataIndex: 'bz',
            width: 150
          },
          {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr',
            width: 100
          },
          {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj',
            width: 100
          },
          {
            title: '录入标识',
            align:"center",
            dataIndex: 'lrbz_dictText',
            width: 100
          },
		   /*{
            title: '贷款责任人',
            align:"center",
            dataIndex: 'dkzrr'
           },
		   {
            title: '客户经理员工工号',
            align:"center",
            dataIndex: 'khjlyggh'
           },

		   {
            title: 'xwqy',
            align:"center",
            dataIndex: 'xwqy'
           },
		   {
            title: '电话号码',
            align:"center",
            dataIndex: 'dhhm'
           },
*/
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            fixed: "right",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/dksjjktz/dksjjktz/list",
          delete: "/dksjjktz/dksjjktz/delete",
          deleteBatch: "/dksjjktz/dksjjktz/deleteBatch",
          exportXlsUrl: "dksjjktz/dksjjktz/exportXls",
          importExcelUrl: "dksjjktz/dksjjktz/importExcel",
          init: "/dksjjktz/dksjjktz/init",
          audit: "/dksjjktz/dksjjktz/audit",
          unaudit: "/dksjjktz/dksjjktz/unaudit"
       },
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
        delete param.jkrq;
        delete param.dqrq;
        return filterObj(param);
      },
      onJkDateChange(date,dateString){
        this.queryParam.jkString = dateString[0] + "," + dateString[1];
      },
      onDqDateChange(date,dateString){
        this.queryParam.dqString = dateString[0] + "," + dateString[1];
      },
      handleView: function(record) {
        console.log('Dksjjktz => handleView: function (record)')
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "查看详情";
        this.$refs.modalForm.disableSubmit = true;
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
      unaudit (record) {
        let params = record
        console.log(params)
        this.loading = true
        putAction(this.url.unaudit,params).then((res) => {
          if (res.success) {
            this.$message.success('撤销审核成功！')
          } else {
            this.$message.warning('撤销审核失败！')
          }
        }).catch((err) => {
          this.$message.error('撤销审核失败', error)
        }).finally(res =>{
          this.loading = false
          this.loadData(1)
        })
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
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>