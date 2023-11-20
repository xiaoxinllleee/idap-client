<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="设备所属网点">
              <!--              <a-input placeholder="请输入账户开户机构" v-model="queryParam.accbrno"></a-input>-->
              <j-tree-select placeholder="全部"
                             v-model="queryParam.devbrno"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="设备类型">
              <a-input placeholder="请输入设备类型" v-model="queryParam.devtype"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="设备编号">
                <a-input placeholder="请输入设备编号" v-model="queryParam.devno"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="商户号">
                <a-input placeholder="请输入商户号" v-model="queryParam.merchantno"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="账户开户机构">
                <a-input placeholder="请输入账户开户机构" v-model="queryParam.accbrno"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="账户户名">
                <a-input placeholder="请输入账户户名" v-model="queryParam.acctname"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('设备信息管理表')">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
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
        :scroll="{x:6830}"
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
    <sbxxglb-modal ref="modalForm" @ok="modalFormOk"></sbxxglb-modal>
  </a-card>
</template>

<script>
  import SbxxglbModal from './modules/SbxxglbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'

  export default {
    name: "SbxxglbList",
    mixins:[JeecgListMixin],
    components: {
      SbxxglbModal,JTreeSelect
    },
    data () {
      return {
        description: '设备信息管理表管理页面',
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
            title: '设备标识号',
            align:"center",
            dataIndex: 'devid'
           },
		   {
            title: '设备类型',
            align:"center",
            dataIndex: 'devtype'
           },
		   {
            title: '设备厂商编号',
            align:"center",
            dataIndex: 'devmanuid'
           },
		   {
            title: '设备编号',
            align:"center",
            dataIndex: 'devno'
           },
		   {
            title: '商户号',
            align:"center",
            dataIndex: 'merchantno'
           },
		   {
            title: '虚拟账户',
            align:"center",
            dataIndex: 'virtualaccno'
           },
		   {
            title: '设备IP地址',
            align:"center",
            dataIndex: 'devip'
           },
		   {
            title: '设备所属地区',
            align:"center",
            dataIndex: 'devcity'
           },
		   {
            title: '设备所属分行',
            align:"center",
            dataIndex: 'devzoneno'
           },
		   {
            title: '设备所属网点',
            align:"center",
            dataIndex: 'devbrno'
           },
		   {
            title: '设备安放地址类型',
            align:"center",
            dataIndex: 'devaddrtype'
           },
		   {
            title: '设备安放地址',
            align:"center",
            dataIndex: 'devaddr'
           },
		   {
            title: '设备绑定电话',
            align:"center",
            dataIndex: 'devphone'
           },
		   {
            title: '设备连接方式',
            align:"center",
            dataIndex: 'devmode'
           },
		   {
            title: '设备状态',
            align:"center",
            dataIndex: 'devstatus'
           },
		   {
            title: '设备签到状态',
            align:"center",
            dataIndex: 'loginstatus'
           },
		   {
            title: '设备安放类型',
            align:"center",
            dataIndex: 'fixtype1'
           },
		   {
            title: '设备安放类型',
            align:"center",
            dataIndex: 'fixtype2'
           },
		   {
            title: '设备单笔取款最大金额',
            align:"center",
            dataIndex: 'permaxamt'
           },
		   {
            title: '设备单天取款最大笔数',
            align:"center",
            dataIndex: 'daytotalcnt'
           },
		   {
            title: '设备单天取款最大金额',
            align:"center",
            dataIndex: 'daytotalamt'
           },
		   {
            title: '地区号',
            align:"center",
            dataIndex: 'cityno'
           },
		   {
            title: '设备柜员所属机构号',
            align:"center",
            dataIndex: 'brno'
           },
		   {
            title: '柜员号',
            align:"center",
            dataIndex: 'tellerno'
           },
		   {
            title: '授权柜员号',
            align:"center",
            dataIndex: 'authtellerno'
           },
		   {
            title: '出纳员',
            align:"center",
            dataIndex: 'cashier'
           },
		   {
            title: 'A岗负责人',
            align:"center",
            dataIndex: 'person1'
           },
		   {
            title: 'A岗负责人手机号',
            align:"center",
            dataIndex: 'person1phone'
           },
		   {
            title: 'B岗负责人',
            align:"center",
            dataIndex: 'person2'
           },
		   {
            title: 'B岗负责人手机号',
            align:"center",
            dataIndex: 'person2phone'
           },
		   {
            title: '负责人',
            align:"center",
            dataIndex: 'person3'
           },
		   {
            title: '负责人手机号',
            align:"center",
            dataIndex: 'person3phone'
           },
		   {
            title: '创建日期',
            align:"center",
            dataIndex: 'crtdate'
           },
		   {
            title: '正式运营时间',
            align:"center",
            dataIndex: 'startdate'
           },
		   {
            title: '创建时间',
            align:"center",
            dataIndex: 'crttime'
           },
		   {
            title: '创建地区号',
            align:"center",
            dataIndex: 'crtcity'
           },
		   {
            title: '创建网点号',
            align:"center",
            dataIndex: 'crtbrno'
           },
		   {
            title: '创建柜员号',
            align:"center",
            dataIndex: 'crttellerno'
           },
		   {
            title: '最近操作日期',
            align:"center",
            dataIndex: 'moddate'
           },
		   {
            title: '最近操作时间',
            align:"center",
            dataIndex: 'modtime'
           },
		   {
            title: '最近操作地区号',
            align:"center",
            dataIndex: 'modcity'
           },
		   {
            title: '最近操作网点号',
            align:"center",
            dataIndex: 'modbrno'
           },
		   {
            title: '最近操作柜员号',
            align:"center",
            dataIndex: 'modtellerno'
           },
		   {
            title: '代理行机构标识',
            align:"center",
            dataIndex: 'proxybrno'
           },
		   {
            title: '受理机构标识码',
            align:"center",
            dataIndex: 'sendbank'
           },
		   {
            title: '发送机构标识码',
            align:"center",
            dataIndex: 'sendclearbank'
           },
		   {
            title: '省联社报备时间',
            align:"center",
            dataIndex: 'supervisedate'
           },
		   {
            title: '省联社批复时间',
            align:"center",
            dataIndex: 'approvedate'
           },
		   {
            title: '安防验收时间',
            align:"center",
            dataIndex: 'securedate'
           },
		   {
            title: '监管部门报备时间',
            align:"center",
            dataIndex: 'admindate'
           },
		   {
            title: '加密方式',
            align:"center",
            dataIndex: 'encrypttype'
           },
		   {
            title: '主密钥更新标志',
            align:"center",
            dataIndex: 'firstflag'
           },
		   {
            title: '清算方式',
            align:"center",
            dataIndex: 'clearflag'
           },
		   {
            title: '清算行号',
            align:"center",
            dataIndex: 'clearbrno'
           },
		   {
            title: '账户开户机构',
            align:"center",
            dataIndex: 'accbrno'
           },
		   {
            title: '账户户名',
            align:"center",
            dataIndex: 'acctname'
           },
		   {
            title: '绑定账户号',
            align:"center",
            dataIndex: 'accno'
           },
		   {
            title: '设备型号',
            align:"center",
            dataIndex: 'devcode'
           },
		   {
            title: '管理员',
            align:"center",
            dataIndex: 'adminteller'
           },
		   {
            title: '交易批次号',
            align:"center",
            dataIndex: 'batchnum'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'devmacaddr'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'remark'
           },
		   {
            title: '预留1',
            align:"center",
            dataIndex: 'reserved1'
           },
		   {
            title: '预留2',
            align:"center",
            dataIndex: 'reserved2'
           },
		   {
            title: '预留3',
            align:"center",
            dataIndex: 'reserved3'
           },
		   {
            title: '最后处理时间',
            align:"center",
            dataIndex: 'lasttime'
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
		 /*  {
            title: '法人标识',
            align:"center",
            dataIndex: 'legalNo'
           },
		   {
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
          list: "/sbxxglb/sbxxglb/list",
          delete: "/sbxxglb/sbxxglb/delete",
          deleteBatch: "/sbxxglb/sbxxglb/deleteBatch",
          exportXlsUrl: "sbxxglb/sbxxglb/exportXls",
          importExcelUrl: "sbxxglb/sbxxglb/importExcel",
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