<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户编号">
              <a-input placeholder="请输入客户编号" v-model="queryParam.custId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.ctfcCd"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
<!--              <a @click="handleToggleSearch" style="margin-left: 8px">
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
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('客户证件信息')">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:3430}"
        @change="handleTableChange">

<!--        <span slot="action" slot-scope="text, record">
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
        </span>-->

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <khzjxx-modal ref="modalForm" @ok="modalFormOk"></khzjxx-modal>
  </a-card>
</template>

<script>
  import KhzjxxModal from './modules/KhzjxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "KhzjxxList",
    mixins:[JeecgListMixin],
    components: {
      KhzjxxModal
    },
    data () {
      return {
        description: '客户证件信息管理页面',
        // 表头
        columns: [
          {
            title: '',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },
		   {
            title: '删除标志',
            align:"center",
            dataIndex: 'dataFlag'
           },
		   {
            title: '成立日期',
            align:"center",
            dataIndex: 'createDate'
           },
		   {
            title: '标注地址,证件标注地,证件标注地址,注册地址',
            align:"center",
            dataIndex: 'ctfcAddr'
           },
		   {
            title: '颁发单位,登记机关,发证机构,发证机关,发证税务机关,认证机构',
            align:"center",
            dataIndex: 'ctfcAwardDept'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'ctfcCd'
           },
		   {
            title: '年检日期',
            align:"center",
            dataIndex: 'ctfcCheckDate'
           },
		   {
            title: '年检结果(是否有效),是否年检,证件类型',
            align:"center",
            dataIndex: 'ctfcCheckState'
           },
		   {
            title: '登记号,经营范围(66*3),实际住址,证件描述(66*3),主营范围(66*3)',
            align:"center",
            dataIndex: 'ctfcDesc'
           },
		   {
            title: '兼营范围(66*3),经营方式,凭证号',
            align:"center",
            dataIndex: 'ctfcDesc1'
           },
		   {
            title: '经营到期日期,失效日期,证件年检日期',
            align:"center",
            dataIndex: 'ctfcEndDate'
           },
		   {
            title: '流水编号',
            align:"center",
            dataIndex: 'ctfcId'
           },
		   {
            title: '注册类型',
            align:"center",
            dataIndex: 'ctfcLoginType'
           },
		   {
            title: '证件类型',
            align:"center",
            dataIndex: 'ctfcName'
           },
		   {
            title: '证书名称',
            align:"center",
            dataIndex: 'ctfcOthCd'
           },
		   {
            title: '实收资本',
            align:"center",
            dataIndex: 'ctfcPaiupSum'
           },
		   {
            title: '贷款卡密码',
            align:"center",
            dataIndex: 'ctfcPassword'
           },
		   {
            title: '注册资本',
            align:"center",
            dataIndex: 'ctfcRegSum'
           },
		   {
            title: '登记日期,发证日期,经营起始日期,生效日期',
            align:"center",
            dataIndex: 'ctfcStartDate'
           },
		   {
            title: '贷款卡状态,证件级别,资质等级',
            align:"center",
            dataIndex: 'ctfcState'
           },
		   {
            title: '经营期限,有效年限,证件有效期',
            align:"center",
            dataIndex: 'ctfcTerm'
           },
		   {
            title: '客户编号',
            align:"center",
            dataIndex: 'custId'
           },
		   {
            title: '有/无期限',
            align:"center",
            dataIndex: 'hasCtfcTerm'
           },
		   {
            title: '是否为注册证件',
            align:"center",
            dataIndex: 'register'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '调查人',
            align:"center",
            dataIndex: 'checkId'
           },
		   {
            title: '录入日期',
            align:"center",
            dataIndex: 'inputDate'
           },
		   {
            title: '更新日期',
            align:"center",
            dataIndex: 'updateDate'
           },
		   {
            title: '暂末用',
            align:"center",
            dataIndex: 'principal'
           },
		   {
            title: '性别',
            align:"center",
            dataIndex: 'gender'
           },
		   {
            title: '照片路径',
            align:"center",
            dataIndex: 'photo'
           },
		   {
            title: '年检时间',
            align:"center",
            dataIndex: 'ctfccdate'
           },
		   {
            title: '是否有效',
            align:"center",
            dataIndex: 'isEnabled'
           },
		   {
            title: '数据开始日期',
            align:"center",
            dataIndex: 'sdate'
           },
		   {
            title: '数据结束日期',
            align:"center",
            dataIndex: 'edate'
           },
		   {
            title: '加载时间',
            align:"center",
            dataIndex: 'loadDate'
           },
		   {
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
           },
		/*   {
            title: '天入库表编号-对不同的表名唯一',
            align:"center",
            dataIndex: 'dtnum'
           },
		   {
            title: 'dttime',
            align:"center",
            dataIndex: 'dttime'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/khzjxx/khzjxx/list",
          delete: "/khzjxx/khzjxx/delete",
          deleteBatch: "/khzjxx/khzjxx/deleteBatch",
          exportXlsUrl: "khzjxx/khzjxx/exportXls",
          importExcelUrl: "khzjxx/khzjxx/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>