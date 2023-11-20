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
          <a-col :md="6" :sm="8">
            <a-form-item label="员工所属机构代码">
              <j-tree-select placeholder="请选择员工所属机构代码" v-model="queryParam.ygssjgdm"
                             dict="V_HR_BAS_ORGANIZATION_CMMS, ZZJC, YWJGDM"
                             pid-field="SJYWJGDM" :showSearch="true" treeNodeFilterProp="title"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
             <!-- <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>-->
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button  icon="area-chart" @click="initData" >提取</a-button>
      <a-button  icon="download" :loading="exportLoading" @click="handleExportXls('员工包收贷款到期收回率')">导出</a-button>
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
        :scroll="{ x: 4000 }"
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
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <ygbsdkdqshl-modal ref="modalForm" @ok="modalFormOk"></ygbsdkdqshl-modal>
  </a-card>
</template>

<script>
  import YgbsdkdqshlModal from './modules/YgbsdkdqshlModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import moment from 'moment'
  import { filterObj } from '@/utils/util'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import { downFile, getAction, putAction } from '@api/manage'
  import store from '@/store/'

  export default {
    name: "YgbsdkdqshlList",
    mixins:[JeecgListMixin],
    components: {
      YgbsdkdqshlModal,JTreeSelect
    },
    data () {
      return {
        description: '员工包收贷款到期收回率管理页面',
        // 表头
        monthFormat: 'YYYY-MM',
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
            dataIndex: 'tjyf'
           },
          {
            title: '员工所属机构代码',
            align:"center",
            dataIndex: 'ygssjgdm'
          },
          {
            title: '员工所属机构名称',
            align:"center",
            dataIndex: 'ygssjgdm_dictText'
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
            title: '本年应收回金额',
            align:"center",
            dataIndex: 'bnyshje'
           },
		   {
            title: '本年收回金额',
            align:"center",
            dataIndex: 'bnshje'
           },
		   {
            title: '本年未收回余额',
            align:"center",
            dataIndex: 'bnwshye'
           },
		   {
            title: '本年到期收回率',
            align:"center",
            dataIndex: 'bndqshl'
           },
		   {
            title: '历年发放当年到期应收回金额',
            align:"center",
            dataIndex: 'lnffyshje'
           },
		   {
            title: '历年发放当年到期收回金额',
            align:"center",
            dataIndex: 'lnffshje'
           },
		   {
            title: '历年发放当年到期未收回余额',
            align:"center",
            dataIndex: 'lnffwshye'
           },
		   {
            title: '历年发放到期收回率',
            align:"center",
            dataIndex: 'lnffdqshl'
           },
		   {
            title: '本年发放当年到期应收回金额',
            align:"center",
            dataIndex: 'bnffyshje'
           },
		   {
            title: '本年发放当年到期收回金额',
            align:"center",
            dataIndex: 'bnffshje'
           },
		   {
            title: '本年发放当年到期未收回余额',
            align:"center",
            dataIndex: 'bnffwshye'
           },
		   {
            title: '本年发放到期收回率',
            align:"center",
            dataIndex: 'bnffdqshl'
           },
		   {
            title: '本月应收回金额',
            align:"center",
            dataIndex: 'byyshje'
           },
		   {
            title: '本月收回金额',
            align:"center",
            dataIndex: 'byshje'
           },
		   {
            title: '本月未收回余额',
            align:"center",
            dataIndex: 'bywshye'
           },
		   {
            title: '本月到期收回率',
            align:"center",
            dataIndex: 'bydqshl'
           },
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

          /*{
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/ygbsdkdqshl/ygbsdkdqshl/list",
          delete: "/ygbsdkdqshl/ygbsdkdqshl/delete",
          deleteBatch: "/ygbsdkdqshl/ygbsdkdqshl/deleteBatch",
          exportXlsUrl: "ygbsdkdqshl/ygbsdkdqshl/exportXls",
          importExcelUrl: "ygbsdkdqshl/ygbsdkdqshl/importExcel",
          init: "/ygbsdkdqshl/ygbsdkdqshl/init",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created () {
      this.getCurrentDate()
    },
    methods: {
      searchReset() {
        this.queryParam = {tjyf: undefined, ygssjgdm: undefined};
        this.queryParam.tjyf=this.defaultMonthOpera;
        if(!store.getters.isRoot) {
          this.queryParam.ygssjgdm = store.getters.ywjgdm
        }
        this.loadData(1);
      },
      getCurrentDate() {
        let curDate = new Date()
        this.defaultMonthOpera = moment(curDate,this.monthFormat)
        this.queryParam = {tjyf :undefined};
        this.queryParam.tjyf = this.defaultMonthOpera;
      },
      getQueryParams() {
        let tjrqment = "";
        if (this.queryParam.tjyf) {
          tjrqment = moment(this.queryParam.tjyf).format("YYYY-MM") + '-01';
        }
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf = tjrqment;
        }
        return filterObj(param);
      },
      initData() {
        let tjrq=''
        var params = Object.assign({}, this.queryParam)
        if (params.tjyf === undefined || params.tjyf === null) {
          this.$message.warning("请选择月份日期！")
          return false
        }else {
          tjrq = moment(params.tjyf).format("YYYY-MM")+'-01'
        }
        this.loading = true
        putAction(this.url.init, {'tjyf': tjrq,'jgdm':params.ygssjgdm,'yggh':params.yggh}).then((res) => {
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
      handleExportXls (fileName) {
        if (!fileName || typeof fileName != 'string') {
          fileName = '导出文件'
        }

        //let param = {...this.queryParam};
        let param = this.getQueryParams();
        console.log(param.tjyf)
        if (param.tjyf === undefined || param.tjyf === null){
          this.$message.error('统计月份不能为空!')
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
        if(!params.tjyf){
          this.$message.error('请选择统计月份!')
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