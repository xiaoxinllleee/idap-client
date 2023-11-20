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
            <a-form-item label="客户姓名">
              <a-input placeholder="请输入客户姓名" v-model="queryParam.custName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="最早贷款发放日期">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.zzffrq" :format="DateFormat"
                              @change="onZzffrqDateChange" style="width: 100%;"/>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('员工管户贷款客户明细')">导出</a-button>
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
        :scroll="{ x: 7000 }"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
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
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="model.tqrq" :format=DateFormat
                              @change="onTjrqDateChange" style="width: 100%;"/>
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
    <ygghdkkhmx-modal ref="modalForm" @ok="modalFormOk"></ygghdkkhmx-modal>
  </a-card>
</template>

<script>
  import YgghdkkhmxModal from './modules/YgghdkkhmxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import moment from 'moment'
  import { filterObj } from '@/utils/util'
  import { downFile, getAction, putAction } from '@api/manage'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import store from '@/store/'

  export default {
    name: "YgghdkkhmxList",
    mixins:[JeecgListMixin],
    components: {
      YgghdkkhmxModal,JTreeSelect
    },
    data () {
      return {
        description: '员工管户贷款客户明细管理页面',
        // 表头
        DateFormat: 'YYYY-MM-DD',
        confirmLoading: false,
        allZzjg: '1',
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
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
           },
		   {
            title: '客户类型',
            align:"center",
            dataIndex: 'custType'
           },
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'custName'
           },
		   {
            title: '最早贷款发放日期',
            align:"center",
            dataIndex: 'zzffrq'
           },
		   {
            title: '存量客户贷款余额',
            align:"center",
            dataIndex: 'clKhdkye'
           },
		   {
            title: '客户贷款余额',
            align:"center",
            dataIndex: 'khdkye'
           },
		   {
            title: '存量客户月日平1',
            align:"center",
            dataIndex: 'clKhyrp1'
           },
		   {
            title: '存量客户月日平2',
            align:"center",
            dataIndex: 'clKhyrp2'
           },
		   {
            title: '存量客户月日平3',
            align:"center",
            dataIndex: 'clKhyrp3'
           },
		   {
            title: '客户月日平1',
            align:"center",
            dataIndex: 'khyrp1'
           },
		   {
            title: '客户月日平2',
            align:"center",
            dataIndex: 'khyrp2'
           },
		   {
            title: '客户月日平3',
            align:"center",
            dataIndex: 'khyrp3'
           },
		   {
            title: '存量客户季日平1',
            align:"center",
            dataIndex: 'clKhjrp1'
           },
		   {
            title: '存量客户季日平2',
            align:"center",
            dataIndex: 'clKhjrp2'
           },
		   {
            title: '存量客户季日平3',
            align:"center",
            dataIndex: 'clKhjrp3'
           },
		   {
            title: '季日平1',
            align:"center",
            dataIndex: 'khjrp1'
           },
		   {
            title: '季日平2',
            align:"center",
            dataIndex: 'khjrp2'
           },
		   {
            title: '季日平3',
            align:"center",
            dataIndex: 'khjrp3'
           },
		   {
            title: '存量客户年日平1',
            align:"center",
            dataIndex: 'clKhnrp1'
           },
		   {
            title: '存量客户年日平2',
            align:"center",
            dataIndex: 'clKhnrp2'
           },
		   {
            title: '存量客户年日平3',
            align:"center",
            dataIndex: 'clKhnrp3'
           },
		   {
            title: '年日平1',
            align:"center",
            dataIndex: 'khnrp1'
           },
		   {
            title: '年日平2',
            align:"center",
            dataIndex: 'khnrp2'
           },
		   {
            title: '年日平3',
            align:"center",
            dataIndex: 'khnrp3'
           },
		   {
            title: '客户模拟利润',
            align:"center",
            dataIndex: 'khmnlr'
           },
		   {
            title: '客户贷款金额',
            align:"center",
            dataIndex: 'khdkje'
           },
		  /* {
            title: '有效客户标志',
            align:"center",
            dataIndex: 'yxkhbz'
           },
		   {
            title: '存量有效客户标志',
            align:"center",
            dataIndex: 'clYxkhbz'
           },
		   {
            title: '贷款标签',
            align:"center",
            dataIndex: 'dkbq'
           },*/
		   {
            title: '录入标志',
            align:"center",
            dataIndex: 'lrbz_dictText'
           },
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
         /* {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/ygghdkkhmx/ygghdkkhmx/list",
          delete: "/ygghdkkhmx/ygghdkkhmx/delete",
          deleteBatch: "/ygghdkkhmx/ygghdkkhmx/deleteBatch",
          exportXlsUrl: "ygghdkkhmx/ygghdkkhmx/exportXls",
          importExcelUrl: "ygghdkkhmx/ygghdkkhmx/importExcel",
          init: "ygghdkkhmx/ygghdkkhmx/init",
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
      getCurrentMonth() {
        let curDate = new Date();
        this.defaultMonthOpera = moment(curDate, this.monthFormat);
        this.queryParam = {tjrq: undefined};
        this.queryParam.tjrq=this.defaultMonthOpera;
      },
      onTjrqDateChange: function(value, dateString) {
        let tqrqDateString = dateString
        this.model.tqrq_begin = tqrqDateString[0]
        this.model.tqrq_end = tqrqDateString[1]
        this.$forceUpdate()
      },
      onZzffrqDateChange: function(value, dateString) {
        let zzffrqDateString = dateString
        this.queryParam.zzffrq_begin = zzffrqDateString[0]
        this.queryParam.zzffrq_end = zzffrqDateString[1]
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
        delete param.zzffrq
        return filterObj(param)
      },
      initData(){
        this.model.tqrq_begin = moment(new Date()).format('YYYY-MM-DD');
        this.model.tqrq_end = moment(new Date()).format('YYYY-MM-DD');
        this.model.tqrq = [moment(`${this.model.tqrq_begin}`, 'YYYY-MM-DD'), moment(`${this.model.tqrq_end}`, 'YYYY-MM-DD')]
        this.visible = true;

      },
      initOk() {
        var params = Object.assign({}, this.model)
        if (params.tqrq_begin === '' || params.tqrq_begin === undefined) {
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
      handleCancel(e) {
        console.log('Clicked cancel button');
        this.visible = false;
        this.model={}
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


    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>