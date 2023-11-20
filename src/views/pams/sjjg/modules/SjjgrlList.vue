<template>

  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="执行日期">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.tjrq" :format="DateFormat" @change="onQxDateChange" style="width: 100%;" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="执行状态">
              <j-dict-select-tag placeholder="请选择执行状态" v-model="queryParam.zt" dict-code="zxzt" />
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button type="primary"
                icon="area-chart"
                @click="initData"  >批量提取</a-button>
    </div>
    <br/>

    <!-- table区域-begin -->
    <div>
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
        <span slot="zxxx" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="action" slot-scope="text, record">
          <Button   type="warning" size="small" :disabled="record.zxzt==0||record.zxzt==3" @click="handleEdit(record)">重新提取</Button>

        <!--  <a-divider type="vertical" />
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
    <!-- table区域-end -->
    <BatchExtract ref="BatchExtract" @ok="complete"/>
    <!-- 表单区域 -->
  </a-modal>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {getAction, postAction, deleteAction} from '@/api/manage'
  import {extractJx,updateztJx} from '@/api/api'
  import BatchExtract from './BatchExtract'
  import { filterObj } from '@/utils/util';
  import JEllipsis from '@/components/jeecg/JEllipsis'

  export default {
    name: "SjjgrlList",
    mixins:[JeecgListMixin],
    components: {
      BatchExtract, JEllipsis
    },
    data () {
      return {
        DateFormat: 'YYYY-MM-DD',
        rowDate:{},
        title: "查看任务日历",
        visible:false,
        description: '任务日历管理页面',
        rwid:'',
        spname:'',
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
            title: '任务',
            align:"center",
            dataIndex: 'rwid_dictText'
          },
		   {
            title: '执行日期',
            align:"center",
            dataIndex: 'sjrq'
           },
		   {
            title: '开始时间',
            align:"center",
            dataIndex: 'kssj'
           },
		   {
            title: '结束时间',
            align:"center",
            dataIndex: 'jssj'
           },
		   {
            title: '执行耗时(秒)',
            align:"center",
            dataIndex: 'hs'
           },
          {
            title: '执行状态',
            align:"center",
            dataIndex: 'zt_dictText'
          },
		   {
            title: '执行日志',
            align:"center",
            dataIndex: 'zxxx',
         scopedSlots: { customRender: 'zxxx' },
           },



          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/sjjg/pmaADataExeLog/list",
          delete: "/system/dpRwrl/delete",
          deleteBatch: "/system/dpRwrl/deleteBatch",
          exportXlsUrl: "system/dpRwrl/exportXls",
          importExcelUrl: "system/dpRwrl/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      onQxDateChange: function(value, dateString) {
        let qxDateString   = dateString;
        this.queryParam.tjrq_begin = qxDateString[0];
        this.queryParam.tjrq_end   = qxDateString[1];
      },
      searchReset() {
        this.queryParam = {}
        //this.rwid = '';
        this.loadData(1);
      },
      getQueryParams() {
        //获取查询条件
        let sqp = {}
        if(this.superQueryParams){
          sqp['superQueryParams']=encodeURI(this.superQueryParams)
        }
        var param = Object.assign(sqp, this.queryParam, this.isorter ,this.filters);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.tjrq;
        return filterObj(param);
      },
      loadData(arg) {
        if (!this.url.list) {
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        let params = this.getQueryParams();//查询条件
        params.tjrq_begin = this.queryParam.tjrq_begin
        params.tjrq_end = this.queryParam.tjrq_end
        params.rwid = this.rwid;
        getAction(this.url.list, params).then((res) => {
          if (res.success && res.result) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          }
        })
      },
      open(record) {
        this.rowDate=record;
        //console.log(record);
        this.rwid = record.id;
        this.spname=record.rwgc;
        this.loadData(1);
      },
      handleCancel() {
        this.visible = false;
        this.dataSource=[];
        this.rwid='';
        this.spname='';
      },
      handleOk() {
        this.visible = false;
        this.dataSource=[];
        this.rwid='';
        this.spname='';
      },

      handleEdit(record){
        var that=this;
        console.log(record);
        updateztJx({tjrq:record.sjrq,rwid: record.rwid}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
            extractJx({tjrq:record.sjrq,rwid: record.rwid, spname: this.spname,}).then((res) => {
              if (res.success) {
                that.loadData();
              } else {
              }
            });
          } else {
            that.$message.warning(res.message);
          }
        });
      },
      initData(){
        this.$refs.BatchExtract.showModal(this.rowDate);
      },
      complete(){
        this.loadData(1);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>