<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="指标维度">
              <j-dict-select-tag placeholder="请选择指标维度" v-model="queryParam.zbwd"   dict-code="zbwd"  />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据日期">
              <a-date-picker v-if="queryParam.zbwd=='W'" placeholder="请选择数据日期" v-model="queryParam.sjrq"  allowClear/>
              <a-month-picker v-else placeholder="请选择数据月份" v-model="queryParam.sjrq"
                              :defaultValue="defaultMonthOpera" :format="monthFormat" style="width: 100%;" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="指标ID">
              <a-input placeholder="请输入指标id" v-model="queryParam.zbid"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="指标类型">
                <j-dict-select-tag placeholder="请选择指标类型:" v-model="queryParam.zblx" dict-code="zblx" ></j-dict-select-tag>
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
<!--  <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('指标结果')">导出</a-button>
      <a-button @click="init" :loading="initLoading" icon="area-chart" >提取</a-button>

      <!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
              <a-button type="primary" icon="import">导入</a-button>
            </a-upload>-->
<!--      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
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
    <zbjg-modal ref="modalForm" @ok="modalFormOk"></zbjg-modal>
  </a-card>
</template>

<script>
  import ZbjgModal from './modules/ZbjgModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'
  import { putAction } from '@api/manage'

  export default {
    name: "ZbjgList",
    mixins:[JeecgListMixin],
    components: {
      ZbjgModal
    },
    data () {
      return {
        description: '指标结果管理页面',
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: '',
        initLoading:false,
        loading:false,
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
            dataIndex: 'sjrq'
          },
		   {
            title: '指标id',
            align:"center",
            dataIndex: 'zbid'
           },
          {
            title: '指标名称',
            align:"center",
            dataIndex: 'zbmc'
          },

          {
            title: '指标类型',
            align:"center",
            dataIndex: 'zblx_dictText'
          },
		   {
            title: '指标维度',
            align:"center",
            dataIndex: 'zbwd_dictText'
           },

		     {
            title: '指标结果',
            align:"center",
            dataIndex: 'zbjg'
           },

         /* {
            title: '机构代码',
            align:"center",
            dataIndex: 'jgdm_dictText'
          },*/
        /*  {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/zbgl/zbjg/list",
          delete: "/zbgl/zbjg/delete",
          deleteBatch: "/zbgl/zbjg/deleteBatch",
          exportXlsUrl: "zbgl/zbjg/exportXls",
          importExcelUrl: "zbgl/zbjg/importExcel",
          init:"/zbgl/zbjg/init"
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      init(){
        var zbid='';
        if (!this.queryParam.zbwd) {
          this.$message.error('请选择指标维度！');
          return false;
        }
        if (this.queryParam.sjrq == null || this.queryParam.sjrq == 'undefined') {
          this.$message.error('请选择需要提取的数据日期！');
          return;
        }else{
          let sjrqMoment= this.queryParam.sjrq.format("YYYY-MM") + '-01';
          if (this.queryParam.zbwd == 'W') {
            sjrqMoment = this.queryParam.sjrq.format("YYYY-MM-DD")
          }
          console.log(sjrqMoment);
          this.initLoading=true;
          this.loading = true;
          if (this.queryParam.zbid == null || this.queryParam.zbid == 'undefined') {
            zbid='';
          }else{
            zbid=this.queryParam.zbid;
          }
          putAction(this.url.init, { sjrq: sjrqMoment, zbwd: this.queryParam.zbwd,zbid: zbid}).then((res) => {
            console.log(res)
            if (res.success) {
              this.$message.success(res.message)
              this.initLoading=false;
              this.loadData()
            } else {
              this.$message.warning(res.message,5)
              this.initLoading=false;
              this.loading = false

            }
          });

        }



      },
      getQueryParams() {
        let sjrqMoment=""
        if (this.queryParam.sjrq != null && this.queryParam.sjrq != 'undefined') {
          sjrqMoment=this.queryParam.sjrq.format("YYYY-MM") + '-01'
          if (this.queryParam.zbwd == 'W') {
            sjrqMoment = this.queryParam.sjrq.format("YYYY-MM-DD")
          }
        }
        var param=Object.assign({},this.queryParam,this.isorter);
        param.field=this.getQueryField();
        param.pageNo=this.ipagination.current;
        param.pageSize=this.ipagination.pageSize;
        param.sjrq=sjrqMoment;
        return filterObj(param);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>