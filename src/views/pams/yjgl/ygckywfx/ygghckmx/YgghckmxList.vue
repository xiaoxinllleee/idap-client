<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构查询" v-model="queryParam.jgdm"
                             dict="V_HR_BAS_ORGANIZATION_CMMS, ZZJC, YWJGDM"
                             pid-field="SJYWJGDM" :showSearch="true" treeNodeFilterProp="title"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计日期">
              <a-date-picker placeholder="请选择统计日期" v-model="queryParam.tjrq" format="YYYY-MM-DD"
                              style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="子账号">
              <a-input placeholder="请输入子账号" v-model="queryParam.ckzh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="主账号">
              <a-input placeholder="请输入主账号" v-model="queryParam.mastAcct"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户日期">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.khrq" :format="DateFormat"
                              @change="onKhrqDateChange" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="户名">
              <a-input placeholder="请输入户名" v-model="queryParam.custName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="到期日">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.endDate" :format="DateFormat"
                              @change="onDqrqDateChange" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账户组别">
              <j-dict-select-tag placeholder="请选择账户组别 " v-model="queryParam.acctGrp" dictCode="zhzb"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账户处理标志">
              <j-dict-select-tag placeholder="请选择账户处理标志 " v-model="queryParam.acctDesc" dictCode="zhclbz"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="期末余额">
              <a-input-group compact>
                <a-input placeholder="Min"
                         v-model="queryParam.qmye_begin"
                         style=" width: 40%; text-align: center; "/>
                <a-input placeholder="~"
                         disabled
                         style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "/>
                <a-input placeholder="Max"
                         v-model="queryParam.qmye_end"
                         style="width: 40%; text-align: center; border-left: 0;"/>
              </a-input-group>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="定期最大存期">
              <a-input-group compact>
                <a-input placeholder="Min"
                         v-model="queryParam.cq_begin"
                         style=" width: 40%; text-align: center; "/>
                <a-input placeholder="~"
                         disabled
                         style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "/>
                <a-input placeholder="Max"
                         v-model="queryParam.cq_end"
                         style="width: 40%; text-align: center; border-left: 0;"/>
              </a-input-group>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="营销类型">
              <j-dict-select-tag placeholder="请选择营销类型 " v-model="queryParam.yxlx" dictCode="yxlx"/>
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
      <a-button  icon="area-chart" @click="initData" >提取</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('员工管户存款明细')">导出</a-button>
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
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :scroll="{ x: 4000 }"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
      <a-modal
        title="提取"
        :width="600"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="initOk"
        @cancel="handleCancel">
        <a-form :form="form">
          <a-spin :spinning="confirmLoading">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="机构代码">
              <j-tree-select placeholder="请选择机构查询" v-model="model.jgdm"
                             dict="V_HR_BAS_ORGANIZATION_CMMS, ZZJC, YWJGDM"
                             pid-field="SJYWJGDM" :showSearch="true" treeNodeFilterProp="title"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="提取日期">
            <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="model.tqrq" format="YYYY-MM-DD"
                            @change="onTjrqDateChange" style="width: 100%;" :default-value="[moment(new Date(), 'YYYY-MM-DD'), moment(new Date(), 'YYYY-MM-DD')]"/>
          </a-form-item>
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="model.yggh" />
            </a-form-item>
          </a-spin>
        </a-form>

      </a-modal>


    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <ygghckmx-modal ref="modalForm" @ok="modalFormOk"></ygghckmx-modal>
  </a-card>
</template>

<script>
  import YgghckmxModal from './modules/YgghckmxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'
  import { downFile, getAction, putAction } from '@api/manage'
  import moment from 'moment'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import store from '@/store/'

  export default {
    name: "YgghckmxList",
    mixins:[JeecgListMixin],
    components: {
      YgghckmxModal,JTreeSelect
    },
    data () {
      return {
        description: '员工管户存款明细管理页面',
        DateFormat: 'YYYYMMDD',
        confirmLoading: false,
        form: this.$form.createForm(this),
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        model: {},
        visible:false,
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
            title: '统计日期',
            align:"center",
            dataIndex: 'tjrq'
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
            title: '户名',
            align:"center",
            dataIndex: 'custName'
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
          },
		   {
            title: '子账号',
            align:"center",
            dataIndex: 'ckzh'
           },
		   {
            title: '主账号',
            align:"center",
            dataIndex: 'mastAcct'
           },
		   {
            title: '开户日期',
            align:"center",
            dataIndex: 'khrq'
           },
		   {
            title: '本期起息日',
            align:"center",
            dataIndex: 'intFrmDt'
           },
		   {
            title: '本期截止日',
            align:"center",
            dataIndex: 'intToDt'
           },
          {
            title: '管户员工工号',
            align:"center",
            dataIndex: 'yggh'
          },
          {
            title: '管户员工姓名',
            align:"center",
            dataIndex: 'yggh_dictText'
          },
		   {
            title: '账户组别',
            align:"center",
            dataIndex: 'acctGrp_dictText'
           },
		   {
            title: '账户处理标志',
            align:"center",
            dataIndex: 'acctDesc_dictText'
           },

		   {
            title: '到期日',
            align:"center",
            dataIndex: 'endDate'
           },
		   {
            title: '定期最大存期',
            align:"center",
            dataIndex: 'cq'
           },
		   {
            title: '利率',
            align:"center",
            dataIndex: 'll'
           },
		   {
            title: '期末余额',
            align:"center",
            dataIndex: 'qmye'
           },
		   {
            title: '存量余额',
            align:"center",
            dataIndex: 'clye'
           },
		   {
            title: '存量月日平1',
            align:"center",
            dataIndex: 'clYrp1'
           },
		   {
            title: '存量月日平2',
            align:"center",
            dataIndex: 'clYrp2'
           },
		   {
            title: '存量月日平3',
            align:"center",
            dataIndex: 'clYrp3'
           },
		   {
            title: '月日平1',
            align:"center",
            dataIndex: 'yrp1'
           },
		   {
            title: '月日平2',
            align:"center",
            dataIndex: 'yrp2'
           },
		   {
            title: '月日平3',
            align:"center",
            dataIndex: 'yrp3'
           },
		   // {
       //      title: '存量季日平1',
       //      align:"center",
       //      dataIndex: 'clJrp1'
       //     },
		   // {
       //      title: '存量季日平2',
       //      align:"center",
       //      dataIndex: 'clJrp2'
       //     },
		   // {
       //      title: '存量季日平3',
       //      align:"center",
       //      dataIndex: 'clJrp3'
       //     },
		   // {
       //      title: '季日平1',
       //      align:"center",
       //      dataIndex: 'jrp1'
       //     },
		   // {
       //      title: '季日平2',
       //      align:"center",
       //      dataIndex: 'jrp2'
       //     },
		   // {
       //      title: '季日平3',
       //      align:"center",
       //      dataIndex: 'jrp3'
       //     },
		   {
            title: '存量年日平1',
            align:"center",
            dataIndex: 'clNrp1'
           },
		   {
            title: '存量年日平2',
            align:"center",
            dataIndex: 'clNrp2'
           },
		   {
            title: '存量年日平3',
            align:"center",
            dataIndex: 'clNrp3'
           },
		   {
            title: '年日平1',
            align:"center",
            dataIndex: 'nrp1'
           },
		   {
            title: '年日平2',
            align:"center",
            dataIndex: 'nrp2'
           },
		   {
            title: '年日平3',
            align:"center",
            dataIndex: 'nrp3'
           },
		   // {
       //      title: '模拟利润',
       //      align:"center",
       //      dataIndex: 'mnlr'
       //     },
		   {
            title: '账户状态',
            align:"center",
            dataIndex: 'currStatus'
           },
		   {
            title: '推荐人',
            align:"center",
            dataIndex: 'acNo'
           },
		   {
            title: '上月余额',
            align:"center",
            dataIndex: 'syye'
           },
		   {
            title: '账户性质',
            align:"center",
            dataIndex: 'zhlx'
           },
		   {
            title: '营销类型',
            align:"center",
            dataIndex: 'yxlx_dictText'
           },
		   // {
       //      title: '利率差',
       //      align:"center",
       //      dataIndex: 'llc'
       //     },
		   // {
       //      title: '日利率差',
       //      align:"center",
       //      dataIndex: 'rllc'
       //     },
		   // {
       //      title: '成本率',
       //      align:"center",
       //      dataIndex: 'cbl'
       //     },
       //    {
       //      title: '录入标志',
       //      align:"center",
       //      dataIndex: 'lrbz'
       //    },
          {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr'
          },
          {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
          },
		 /*  {
            title: 'cpdl',
            align:"center",
            dataIndex: 'cpdl'
           },
		   {
            title: 'cpzl',
            align:"center",
            dataIndex: 'cpzl'
           },
		   {
            title: 'cpdm',
            align:"center",
            dataIndex: 'cpdm'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/ygghckmx/ygghckmx/list",
          delete: "/ygghckmx/ygghckmx/delete",
          deleteBatch: "/ygghckmx/ygghckmx/deleteBatch",
          exportXlsUrl: "ygghckmx/ygghckmx/exportXls",
          importExcelUrl: "ygghckmx/ygghckmx/importExcel",
          init: "/ygghckmx/ygghckmx/init",
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
      moment,
      searchReset() {
        this.queryParam = {tjrq: undefined, jgdm: undefined};
        this.queryParam.tjrq=this.defaultMonthOpera;
        if(!store.getters.isRoot) {
          this.queryParam.jgdm = store.getters.ywjgdm
        }
        this.loadData(1);
      },
      onTjrqDateChange: function(value, dateString) {
        let tqrqDateString = dateString
        this.model.tqrq_begin = tqrqDateString[0]
        this.model.tqrq_end = tqrqDateString[1]
        this.$forceUpdate()
      },
      onKhrqDateChange: function(value, dateString) {
        let khrqDateString = dateString
        this.queryParam.khrq_begin = khrqDateString[0]
        this.queryParam.khrq_end = khrqDateString[1]
      },
      onDqrqDateChange: function(value, dateString) {
        let dqrqDateString = dateString
        this.queryParam.dqrq_begin = dqrqDateString[0]
        this.queryParam.dqrq_end = dqrqDateString[1]
      },
      getCurrentMonth() {
        let curDate = new Date();
        this.defaultMonthOpera = moment(curDate, this.monthFormat);
        this.queryParam = {tjrq: undefined};
        this.queryParam.tjrq=this.defaultMonthOpera;
      },
      getQueryParams: function() {
        let tjyfMoment = "";
        if (this.queryParam.tjrq){
          tjyfMoment = moment(this.queryParam.tjrq).format("YYYY-MM-DD");
        }
        var param = Object.assign({}, this.queryParam, this.isorter)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        if (param.tjrq) {
          param.tjrq   = tjyfMoment;
        }
        delete param.khrq
        delete param.endDate
        return filterObj(param)
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
        if(!params.tjrq){
          this.$message.error('请选择统计日期!')
          return
         }
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
      initData(){
        this.model.tqrq_begin = moment(new Date()).format('YYYY-MM-DD');
        this.model.tqrq_end = moment(new Date()).format('YYYY-MM-DD');
        this.model.tqrq = [moment(`${this.model.tqrq_begin}`, 'YYYY-MM-DD'), moment(`${this.model.tqrq_end}`, 'YYYY-MM-DD')]
        this.visible = true;
      },
      initOk() {
        var params = Object.assign({}, this.model)
        if (params.tqrq_begin === undefined || params.tqrq_begin === '') {
          this.$message.error('提取日期不能为空!')
          return
        }
        let kssj = moment(params.tqrq_begin).format('YYYY-MM-DD')
        let jssj = moment(params.tqrq_end).format('YYYY-MM-DD')
        console.log(kssj)
        console.log(jssj)
        this.loading = true
        putAction(this.url.init, { 'ksrq': kssj, 'jsrq': jssj,'jgdm':params.jgdm,'yggh':params.yggh }).then((res) => {
          if (res.success) {
            this.$message.success("提取成功！")
            this.loadData(1)
          } else {
            this.$message.warning("提取失败！")
          }
        }).catch((error) => {
          this.$message.error("提取失败！", error)
        }).finally(() => {
          this.loading = false
        })
      },
      handleCancel() {
        console.log('Clicked cancel button');
        this.model={}
        this.visible = false;
      },
      handleExportXls (fileName) {
        if (!fileName || typeof fileName != 'string') {
          fileName = '导出文件'
        }

        //let param = {...this.queryParam};
        let param = this.getQueryParams();
        console.log(param.tjrq)
        if (param.tjrq === undefined || param.tjrq === null){
          this.$message.error('统计日期不能为空!')
          return
        }
        if(this.selectedRowKeys && this.selectedRowKeys.length>0) {
          param['selections'] = this.selectedRowKeys.join(",")
          param['rowKey'] = this.rowKey
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
        param.paramsStr = paramsStr
        console.log('导出参数', param)
        this.exportLoading = true
        downFile(this.url.exportXlsUrl, param).then((data) => {
          if (!data) {
            this.$message.warning('文件下载失败')
            return
          }
          var blob = new Blob([data])
          if ('msSaveOrOpenBlob' in navigator) {
            window.navigator.msSaveOrOpenBlob(blob, fileName + '.xls')
            return
          }
          var eleLink = document.createElement('a')
          eleLink.download = fileName + '.xls'
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob)
          document.body.appendChild(eleLink)
          eleLink.click()
          document.body.removeChild(eleLink)
          this.exportLoading = false
        })
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>