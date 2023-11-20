<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据日期">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.statDate" :format="DateFormat"
                              @change="startDateChange" style="width: 100%;"/>
            </a-form-item>

          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="方案名称">
              <j-dict-select-tag placeholder="请选择方案" v-model="queryParam.schemeId" :showSearch="true" dict-code="idap:PMA_A_SCHEME,SCHEME_NAME,SCHEME_ID"  />
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属机构">
              <j-tree-select placeholder="请选择机构查询"
                             v-model="queryParam.orgId"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ"
                             pidField="sjzzbz"
                             :treeDefaultExpandAll="true"/>
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
      <a-button @click="handlePlPpbe" :loading="loadingBt" >批量加工</a-button>
      <a-button icon="download" @click="handleExportXls('考核方案加工 ')">导出</a-button>
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
      <a-spin :spinning="loadingJg" tip="数据加工中...">
        <div class="spin-content">
          <a-table
            ref="table"
            size="middle"
            bordered
            rowKey="id"
            :columns="columns"
            :dataSource="dataSource"
            :pagination="ipagination"
            :loading="loading"
            :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
            @change="handleTableChange">

              <template slot="status" slot-scope="text">
                <a-tag v-if="text === '未运行'" color="#a4a4c1">{{ text }}</a-tag>
                <a-tag v-else-if="text === '正在运行'" color="#2db7f5">{{ text }}</a-tag>
                <a-tag v-else-if="text === '已完成'" color="#87d068">{{ text }}</a-tag>
                <a-tag v-else-if="text === '运行出错'" color="#f50">{{ text }}</a-tag>
                <span v-else>{{ text }}</span>
              </template>

              <span slot="action" slot-scope="text, record">
                <a @click="handlePpbe(record)">数据加工</a>

<!--                <a-divider type="vertical" />
                <a-dropdown>
                  <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
                  <a-menu slot="overlay">
                    <a-menu-item>
                      <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                        <a>删除</a>
                      </a-popconfirm>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>-->
              </span>

          </a-table>
        </div>
      </a-spin>


    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <vPmaFEngineSchemeStat-modal ref="modalForm" @ok="modalFormOk"></vPmaFEngineSchemeStat-modal>
  </a-card>
</template>

<script>
  import VPmaFEngineSchemeStatModal from './modules/VPmaFEngineSchemeStatModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { filterObj, timeFix } from '@/utils/util'
  import { getAction, httpAction } from '@api/manage'

  export default {
    name: "VPmaFEngineSchemeStatList",
    mixins:[JeecgListMixin],
    components: {
      VPmaFEngineSchemeStatModal,JTreeSelect
    },
    data () {
      return {
        loadingBt:false,
        loadingJg:false,
        description: '考核方案加工 管理页面',
        DateFormat: 'YYYY-MM-DD',
        schemeId:'',
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
            dataIndex: 'statDate'
           },
		   /*{
            title: '方案id',
            align:"center",
            dataIndex: 'schemeId'
           },*/
		   {
            title: '方案名称',
            align:"center",
            dataIndex: 'schemeName'
           },
		 /*  {
            title: '机构编码',
            align:"center",
            dataIndex: 'orgId'
           },*/
		   {
            title: '所属机构',
            align:"center",
            dataIndex: 'orgName'
           },
		   {
            title: '评价对象类型',
            align:"center",
            dataIndex: 'evlObjType_dictText'
           },
		   {
            title: '数据加工状态',
            align:"center",
            dataIndex: 'status_dictText',
            scopedSlots:{customRender: 'status'}
           },
		   {
            title: '运行开始时间',
            align:"center",
            dataIndex: 'startTime'
           },
		   {
            title: '运行结束日期',
            align:"center",
            dataIndex: 'endTime'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/khfajg/vPmaFEngineSchemeStat/list",
          delete: "/khfajg/vPmaFEngineSchemeStat/delete",
          deleteBatch: "/khfajg/vPmaFEngineSchemeStat/deleteBatch",
          exportXlsUrl: "khfajg/vPmaFEngineSchemeStat/exportXls",
          importExcelUrl: "khfajg/vPmaFEngineSchemeStat/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      startDateChange:function(value, dateString) {
        console.log("dateString");
        console.log(dateString)
        let sjrqDateString = dateString
        this.queryParam.statDate_begin = sjrqDateString[0]
        this.queryParam.statDate_end = sjrqDateString[1]
      },

      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        delete param.statDate
        return filterObj(param)
      },

      handlePpbe: function (record) {
        let _this=this;
        _this.loadingJg = true;
        //httpAction("/khfajg/vPmaFEngineSchemeStat/execPpbe",record,'put').then((res)=>{
        httpAction("/khfajg/vPmaFEngineSchemeStat/pszbpljg",record,'put').then((res)=>{
          if(res.success){
            _this.$message.success(res.message);
          }else{
            _this.$message.warning(res.message,5);
          }
        }).finally(() => {
          _this.loadData(_this.ipagination.current);
          _this.loadingJg = false;
        })
      },
      handlePlPpbe: function () {
        let _this=this;
        console.log('this.queryParam.statDate_begin',this.queryParam.statDate_begin)
        console.log('this.queryParam.statDate_end',this.queryParam.statDate_end)
        console.log('this.queryParam.schemeId',this.queryParam.schemeId)
        if(this.queryParam.statDate_begin==null||this.queryParam.statDate_end==null||this.queryParam.statDate_begin==undefined||this.queryParam.statDate_end==undefined){
          return  _this.$message.warning('请选择数据日期区间');
        }
        if(this.queryParam.schemeId==null||this.queryParam.schemeId==undefined){
          return  _this.$message.warning('请选择方案');
        }
        console.log('111111')
        this.loadingBt=true;
        //httpAction("/khfajg/vPmaFEngineSchemeStat/execPlPpbe",{beginDate:this.queryParam.statDate_begin,endDate:this.queryParam.statDate_end,schemeId:this.queryParam.schemeId},'put').then((res)=>{
        httpAction("/khfajg/vPmaFEngineSchemeStat/execPlpszbjg",{beginDate:this.queryParam.statDate_begin,endDate:this.queryParam.statDate_end,schemeId:this.queryParam.schemeId},'put').then((res)=>{
          if(res.success){
            _this.$notification.success({
              message: `引擎加工数据 `,
              description: `${this.queryParam.statDate_begin}至${this.queryParam.statDate_end}数据加工完成！`,
            });
          }else{
            _this.$notification.error({
              message: `引擎加工数据 `,
              description: res.message,
            });
          }
        }).finally(() => {
          this.loadingBt=false;
          _this.loadData(_this.ipagination.current);
        })
        _this.$message.success("批量加工中，请稍后手动刷新查看加工结果！");


      },
      loadData(arg) {
        if(!this.url.list){
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();//查询条件
        console.info(params)
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          }else{
            this.dataSource =[];
            this.ipagination.total=0;
          }
          if(res.code===510){
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>