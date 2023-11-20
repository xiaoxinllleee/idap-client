<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="银行号">
              <a-input placeholder="请输入银行号" v-model="queryParam.institution"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡bin号">
              <a-input placeholder="请输入卡BIN" v-model="queryParam.no"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡前缀">
              <a-input placeholder="请输入卡前缀" v-model="queryParam.prefix"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="名称">
              <J-input placeholder="请输入名称" v-model="queryParam.name"></J-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="检验位算法">
              <J-input placeholder="请输入检验位算法" v-model="queryParam.checkDigit"></J-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="卡类型">
              <a-select placeholder="全部" v-model="queryParam.isoType">
                <a-select-option value="C">
                  贷记卡
                </a-select-option>
                <a-select-option value="D">
                  借记卡
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="密码校验方式：">
              <a-input placeholder="请输入密码校验方式" v-model="queryParam.pinMethod"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="cvv校验方式：">
              <a-input placeholder="请输入cvv校验方式" v-model="queryParam.cvvMethod"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="cvv类型：">
              <a-input placeholder="请输入cvv类型" v-model="queryParam.cvvType"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('卡6位BIN号信息表')">导出</a-button>
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
        @change="handleTableChange">


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <kbhxx-modal ref="modalForm" @ok="modalFormOk"></kbhxx-modal>
  </a-card>
</template>

<script>
  import KbhxxModal from './modules/KbhxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import JInput from "@/components/jeecg/JInput";

  export default {
    name: "KbhxxList",
    mixins:[JeecgListMixin],
    components: {
      KbhxxModal,JTreeSelect,JInput
    },
    data () {
      return {
        description: '卡6位BIN号信息表管理页面',
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
            title: '银行号',
            align:"center",
            dataIndex: 'institution'
           },
		   {
            title: '卡bin号',
            align:"center",
            dataIndex: 'no'
           },
		   {
            title: '卡前缀',
            align:"center",
            dataIndex: 'prefix'
           },
		   {
            title: '名称',
            align:"center",
            dataIndex: 'name'
           },
		   {
            title: '检验位算法',
            align:"center",
            dataIndex: 'checkDigit'
           },
		   {
            title: '卡类型',
            align:"center",
            dataIndex: 'isoType_dictText'
           },
		   {
            title: '密码格式和长度',
            align:"center",
            dataIndex: 'pinFormat'
           },
		   {
            title: '密码校验方式',
            align:"center",
            dataIndex: 'pinMethod'
           },
		   {
            title: 'CVV校验方式',
            align:"center",
            dataIndex: 'cvvMethod'
           },
		   {
            title: 'CVV类型',
            align:"center",
            dataIndex: 'cvvType'
           },
		   {
            title: '销卡之后多少个月之后从数据库清除',
            align:"center",
            dataIndex: 'purgePeriod'
           },
		   {
            title: '最近维护日期',
            align:"center",
            dataIndex: 'lastMaintainDate'
           },
		   {
            title: '最近维护标志',
            align:"center",
            dataIndex: 'lastMaintainFlag'
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
            title: '加载日期',
            align:"center",
            dataIndex: 'loadDate'
           },
		  /* {
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
          list: "/kbhxx/kbhxx/list",
          delete: "/kbhxx/kbhxx/delete",
          deleteBatch: "/kbhxx/kbhxx/deleteBatch",
          exportXlsUrl: "kbhxx/kbhxx/exportXls",
          importExcelUrl: "kbhxx/kbhxx/importExcel",
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