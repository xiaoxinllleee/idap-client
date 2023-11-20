<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="调整前五级分类形态">
              <a-input placeholder="请输入调整前五级分类形态" v-model="queryParam.item001"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="学生证号">
              <a-input placeholder="请输入学生证号" v-model="queryParam.item002"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="助学贷款类型">
              <a-input placeholder="请输入助学贷款类型" v-model="queryParam.item003"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="是否小额贷款公司经营贷款1:是2:否">
              <a-input placeholder="请输入是否小额贷款公司经营贷款1:是2:否" v-model="queryParam.item004"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="学校名称">
              <a-input placeholder="请输入学校名称" v-model="queryParam.item011"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="约定还款日">
              <a-range-picker @change="onChangeydhkr" v-model="queryParam.item404" :format="dateFormat"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="业务编号">
              <a-input placeholder="请输入业务编号" v-model="queryParam.businessNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="借据号码">
              <a-input placeholder="请输入借据号码" v-model="queryParam.voucherNo"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('业务借据扩展表')">导出</a-button>
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
        :scroll="{x:24300}"
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
    <ywjjkzb-modal ref="modalForm" @ok="modalFormOk"></ywjjkzb-modal>
  </a-card>
</template>

<script>
  import YwjjkzbModal from './modules/YwjjkzbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {filterObj} from '@/utils/util'

  export default {
    name: "YwjjkzbList",
    mixins:[JeecgListMixin],
    components: {
      YwjjkzbModal
    },
    data () {
      return {
        description: '业务借据扩展表管理页面',
        // 表头
        dateFormat:'YYYYMMDD',
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
            title: 'ITEM_INFO_ID',
            align:"center",
            dataIndex: 'itemInfoId'
           },
		   {
            title: 'ITEM_INFO_TYPE',
            align:"center",
            dataIndex: 'itemInfoType'
           },
		   {
            title: 'ITEM_RELA_ID',
            align:"center",
            dataIndex: 'itemRelaId'
           },
		   {
            title: 'ITEM_RELA_NO',
            align:"center",
            dataIndex: 'itemRelaNo'
           },
		   {
            title: '调整前五级分类形态',
            align:"center",
            dataIndex: 'item001'
           },
		   {
            title: '学生证号',
            align:"center",
            dataIndex: 'item002'
           },
		   {
            title: '助学贷款类型',
            align:"center",
            dataIndex: 'item003'
           },
		   {
            title: '是否小额贷款公司经营贷款1:是2:否',
            align:"center",
            dataIndex: 'item004'
           },
		   {
            title: 'ITEM005',
            align:"center",
            dataIndex: 'item005'
           },
		   {
            title: '学校行政区码[省]',
            align:"center",
            dataIndex: 'item006'
           },
		   {
            title: '学校行政区码[市]',
            align:"center",
            dataIndex: 'item007'
           },
		   {
            title: '学校行政区码[县]',
            align:"center",
            dataIndex: 'item008'
           },
		   {
            title: '贷款时家庭住址行政区码[县]',
            align:"center",
            dataIndex: 'item009'
           },
		   {
            title: '贷款时家庭住址行政区码[省]',
            align:"center",
            dataIndex: 'item010'
           },
		   {
            title: '学校名称',
            align:"center",
            dataIndex: 'item011'
           },
		   {
            title: '学校地址',
            align:"center",
            dataIndex: 'item012'
           },
		   {
            title: '学校地址[部分]',
            align:"center",
            dataIndex: 'item013'
           },
		   {
            title: '贷款时家庭住址',
            align:"center",
            dataIndex: 'item014'
           },
		   {
            title: '贷款时家庭住址[部分]',
            align:"center",
            dataIndex: 'item015'
           },
		   {
            title: '贷款时家庭住址行政区码[市]',
            align:"center",
            dataIndex: 'item016'
           },
		   {
            title: '水利建设贷款类型1',
            align:"center",
            dataIndex: 'item017'
           },
		   {
            title: '水利建设贷款类型2',
            align:"center",
            dataIndex: 'item018'
           },
		   {
            title: '融资平台贷款类型1',
            align:"center",
            dataIndex: 'item019'
           },
		   {
            title: '融资平台贷款类型2',
            align:"center",
            dataIndex: 'item020'
           },
		   {
            title: '融资平台贷款投向1',
            align:"center",
            dataIndex: 'item021'
           },
		   {
            title: '融资平台贷款投向2',
            align:"center",
            dataIndex: 'item022'
           },
		   {
            title: '融资平台贷款投向3',
            align:"center",
            dataIndex: 'item023'
           },
		   {
            title: '融资平台贷款偿债资金来源',
            align:"center",
            dataIndex: 'item024'
           },
		   {
            title: '融资平台按隶属关系分类',
            align:"center",
            dataIndex: 'item025'
           },
		   {
            title: 'ITEM026',
            align:"center",
            dataIndex: 'item026'
           },
		   {
            title: 'ITEM027',
            align:"center",
            dataIndex: 'item027'
           },
		   {
            title: 'ITEM028',
            align:"center",
            dataIndex: 'item028'
           },
		   {
            title: 'ITEM029',
            align:"center",
            dataIndex: 'item029'
           },
		   {
            title: 'ITEM030',
            align:"center",
            dataIndex: 'item030'
           },
		   {
            title: '是否铁路、公路基础设施建设贷款',
            align:"center",
            dataIndex: 'item031'
           },
		   {
            title: 'ITEM032',
            align:"center",
            dataIndex: 'item032'
           },
		   {
            title: 'ITEM033',
            align:"center",
            dataIndex: 'item033'
           },
		   {
            title: 'ITEM034',
            align:"center",
            dataIndex: 'item034'
           },
		   {
            title: 'ITEM035',
            align:"center",
            dataIndex: 'item035'
           },
		   {
            title: 'ITEM036',
            align:"center",
            dataIndex: 'item036'
           },
		   {
            title: 'ITEM037',
            align:"center",
            dataIndex: 'item037'
           },
		   {
            title: 'ITEM038',
            align:"center",
            dataIndex: 'item038'
           },
		   {
            title: 'ITEM039',
            align:"center",
            dataIndex: 'item039'
           },
		   {
            title: 'ITEM040',
            align:"center",
            dataIndex: 'item040'
           },
		   {
            title: 'ITEM100',
            align:"center",
            dataIndex: 'item100'
           },
		   {
            title: 'ITEM101',
            align:"center",
            dataIndex: 'item101'
           },
		   {
            title: 'ITEM102',
            align:"center",
            dataIndex: 'item102'
           },
		   {
            title: 'ITEM111',
            align:"center",
            dataIndex: 'item111'
           },
		   {
            title: 'ITEM112',
            align:"center",
            dataIndex: 'item112'
           },
		   {
            title: 'ITEM200',
            align:"center",
            dataIndex: 'item200'
           },
		   {
            title: 'ITEM201',
            align:"center",
            dataIndex: 'item201'
           },
		   {
            title: 'ITEM202',
            align:"center",
            dataIndex: 'item202'
           },
		   {
            title: 'ITEM203',
            align:"center",
            dataIndex: 'item203'
           },
		   {
            title: 'ITEM204',
            align:"center",
            dataIndex: 'item204'
           },
		   {
            title: 'ITEM205',
            align:"center",
            dataIndex: 'item205'
           },
		   {
            title: 'ITEM300',
            align:"center",
            dataIndex: 'item300'
           },
		   {
            title: 'ITEM301',
            align:"center",
            dataIndex: 'item301'
           },
		   {
            title: 'ITEM302',
            align:"center",
            dataIndex: 'item302'
           },
		   {
            title: 'ITEM303',
            align:"center",
            dataIndex: 'item303'
           },
		   {
            title: 'ITEM304',
            align:"center",
            dataIndex: 'item304'
           },
		   {
            title: 'ITEM305',
            align:"center",
            dataIndex: 'item305'
           },
		   {
            title: 'ITEM306',
            align:"center",
            dataIndex: 'item306'
           },
		   {
            title: 'ITEM307',
            align:"center",
            dataIndex: 'item307'
           },
		   {
            title: 'ITEM308',
            align:"center",
            dataIndex: 'item308'
           },
		   {
            title: 'ITEM309',
            align:"center",
            dataIndex: 'item309'
           },
		   {
            title: 'ITEM310',
            align:"center",
            dataIndex: 'item310'
           },
		   {
            title: 'ITEM311',
            align:"center",
            dataIndex: 'item311'
           },
		   {
            title: 'ITEM312',
            align:"center",
            dataIndex: 'item312'
           },
		   {
            title: 'ITEM313',
            align:"center",
            dataIndex: 'item313'
           },
		   {
            title: 'ITEM314',
            align:"center",
            dataIndex: 'item314'
           },
		   {
            title: 'ITEM315',
            align:"center",
            dataIndex: 'item315'
           },
		   {
            title: 'ITEM400',
            align:"center",
            dataIndex: 'item400'
           },
		   {
            title: 'ITEM401',
            align:"center",
            dataIndex: 'item401'
           },
		   {
            title: 'ITEM402',
            align:"center",
            dataIndex: 'item402'
           },
		   {
            title: 'ITEM403',
            align:"center",
            dataIndex: 'item403'
           },
		   {
            title: '约定还款日',
            align:"center",
            dataIndex: 'item404'
           },
		   {
            title: 'ITEM405',
            align:"center",
            dataIndex: 'item405'
           },
		   {
            title: 'ITEM500',
            align:"center",
            dataIndex: 'item500'
           },
		   {
            title: 'ITEM501',
            align:"center",
            dataIndex: 'item501'
           },
		   {
            title: 'ITEM502',
            align:"center",
            dataIndex: 'item502'
           },
		   {
            title: 'ITEM503',
            align:"center",
            dataIndex: 'item503'
           },
		   {
            title: 'ITEM504',
            align:"center",
            dataIndex: 'item504'
           },
		   {
            title: 'USER_ID',
            align:"center",
            dataIndex: 'userId'
           },
		   {
            title: '业务编号',
            align:"center",
            dataIndex: 'businessNo'
           },
		   {
            title: 'UPDATE_DATE',
            align:"center",
            dataIndex: 'updateDate'
           },
		   {
            title: '借据号码',
            align:"center",
            dataIndex: 'voucherNo'
           },
		   {
            title: '起始日期',
            align:"center",
            dataIndex: 'sdate'
           },
		   {
            title: '结束日期',
            align:"center",
            dataIndex: 'edate'
           },
		   {
            title: '加载时间',
            align:"center",
            dataIndex: 'loadDate'
           },
		   {
            title: '法人编号',
            align:"center",
            dataIndex: 'legalNo'
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
          list: "/ywjjkzb/ywjjkzb/list",
          delete: "/ywjjkzb/ywjjkzb/delete",
          deleteBatch: "/ywjjkzb/ywjjkzb/deleteBatch",
          exportXlsUrl: "ywjjkzb/ywjjkzb/exportXls",
          importExcelUrl: "ywjjkzb/ywjjkzb/importExcel",
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
        delete param.item404;
        return filterObj(param);
      },
      onChangesxr(value,dateString){
        let item404String = dateString
        this.queryParam.item404_begin = item404String[0]
        this.queryParam.item404_end = item404String[1]
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>