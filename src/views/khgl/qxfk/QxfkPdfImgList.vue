<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="手机号码">
              <a-input placeholder="请输入手机号码" v-model="queryParam.sjhm"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button @click="fkcx" type="primary" :loading="qxfkLoading" icon="plus">风控查询</a-button>
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
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="fkxq(record)">风控详情</a>

<!--          <a-divider type="vertical" />-->
<!--          <a-dropdown>-->
<!--            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>-->
<!--            <a-menu slot="overlay">-->
<!--              <a-menu-item>-->
<!--                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">-->
<!--                  <a>删除</a>-->
<!--                </a-popconfirm>-->
<!--              </a-menu-item>-->
<!--            </a-menu>-->
<!--          </a-dropdown>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <qxfkPdfImg-modal ref="modalForm" @ok="modalFormOk"></qxfkPdfImg-modal>
    <qxfk-pdf-img-xq ref="xqModal" ></qxfk-pdf-img-xq>
  </a-card>
</template>

<script>
  import QxfkPdfImgModal from './modules/QxfkPdfImgModal'
  import { JeecgListMixin } from '../../../mixins/JeecgListMixin'
  import { getAction, getActionOther, putAction, downFile } from '@api/manage'
  import QxfkPdfImgXq from './modules/QxfkPdfImgXq'

  export default {
    name: "QxfkPdfImgList",
    mixins:[JeecgListMixin],
    components: {
      QxfkPdfImgModal,QxfkPdfImgXq
    },
    data () {
      return {
        description: '七星风控管理页面',
        // 表头
        columns: [
/*          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },*/
          {
            title: '查询时间',
            align:"center",
            dataIndex: 'queryTime'
          },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
           },
          {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
          },
          {
            title: '手机号码',
            align:"center",
            dataIndex: 'sjhm'
          },
		   {
            title: '查询人',
            align:"center",
            dataIndex: 'lrr_dictText'
           },
		   {
            title: '报告编码',
            align:"center",
            dataIndex: 'reportCode'
           },
		   {
            title: '风险等级',
            align:"center",
            dataIndex: 'riskLevel_dictText'
           }/*,
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/qxfk/qxfkPdfImg/list",
          delete: "/qxfk/qxfkPdfImg/delete",
          deleteBatch: "/qxfk/qxfkPdfImg/deleteBatch",
          exportXlsUrl: "qxfk/qxfkPdfImg/exportXls",
          importExcelUrl: "qxfk/qxfkPdfImg/importExcel",
       },
        qxfkLoading:false
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      fkcx(){
        let zjhm = this.queryParam.zjhm;
        let khmc = this.queryParam.khmc;
        let sjhm = this.queryParam.sjhm;
        if (zjhm == undefined || zjhm == null || zjhm == ''){
          this.errorInfo("请填写证件号码")
          return
        }
        if (khmc == undefined || khmc == null || khmc == ''){
          this.errorInfo("请填写客户名称")
          return
        }
        this.qxfkLoading = true
        getAction("/qxfk/qxfkPdfImg/queryQxfk",{zjhm:zjhm,khmc:khmc,sjhm:sjhm}).then(res=>{
          if (res.success){
            this.successInfo("风控查询成功")
            this.loadData();
          }else {
            this.errorInfo(res.message)
          }
          this.qxfkLoading = false
        })

      },
      fkxq(val){
        if (val.reportCode == null || val.reportCode == undefined){
          this.$message.warning('未查询到风控数据')
          return
        }

        getAction('/qxfk/qxfkPdfImg/getByCode', { reportCode : val.reportCode}).then((res) => {
          if (res.success) {
            let data = res.result.replace("\\","");
            this.$refs.xqModal.view(data)
          } else {
            this.$message.warning(res.message,5)
          }
        })

      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>