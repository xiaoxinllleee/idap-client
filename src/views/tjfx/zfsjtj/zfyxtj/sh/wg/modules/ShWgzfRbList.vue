<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计日期">
              <a-date-picker v-model="queryParam.tjrq" placeholder="请选择统计日期" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属网格">
              <JTreeSelectNotJg placeholder="请选择所属网格"
                                v-model="queryParam.wgbh"
                                treeNodeFilterProp="title"
                                pidField="PARENT_ID"
                                dict="YXDYGL_MAIN,WGMC,ID"
                                pidValue="0"
                                :showSearch="true"
                                :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button icon="download" @click="handleExportXls('网格走访（日报）')" v-has="'ShWgzfRb:exp'">导出</a-button>
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
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">
          <span slot="zfhs" slot-scope="zfhs,record">
            <a @click="zfs(record,'1')">{{zfhs}}</a>
          </span>
          <span slot="yxzfhs" slot-scope="yxzfhs,record">
            <a @click="zfs(record,'7')">{{yxzfhs}}</a>
          </span>

      </a-table>
    </div>
    <!-- table区域-end -->
    <shzfmx-modal ref="shzfmxModal"/>
    <!-- 表单区域 -->
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelectNotJg from '@/components/jeecg/JTreeSelectNotJg'
  import moment from 'moment'
  import {filterObj} from "@/utils/util";
  import ShzfmxModal from '@views/tjfx/zfsjtj/zfyxtj/sh/gr/modules/ShzfmxModal'

  export default {
    name: "WgZfyxtjRbList",
    mixins:[JeecgListMixin],
    components:{
      JTreeSelectNotJg, ShzfmxModal
    },
    data () {
      return {
        description: '网格走访营销统计管理页面',
        khlx:'2',
        tjwd:'DD',
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
            title: '统计日期',
            align:"center",
            dataIndex: 'tjrq'
          },
          {
            title: '网格名称',
            align:"center",
            dataIndex: 'wgbh_dictText'
          },
          {
            title: '走访户数',
            align:"center",
            dataIndex: 'zfhs',
            scopedSlots: { customRender: 'zfhs' }
          },
          {
            title: '有效户数',
            align:"center",
            dataIndex: 'yxzfhs',
            scopedSlots: { customRender: 'yxzfhs' }
          },
          {
            title: '有效户数比昨日',
            align:"center",
            dataIndex: 'yxzfhsBsq'
          },
          {
            title: '有效走访排名',
            align:"center",
            dataIndex: 'yxzfpm'
          }
        ],
        url: {
          list: "/zfyxtj/wgZfyxtj/list",
          delete: "/zfyxtj/wgZfyxtj/delete",
          deleteBatch: "/zfyxtj/wgZfyxtj/deleteBatch",
          exportXlsUrl: "zfyxtj/wgZfyxtj/exportXlsshrb",
          importExcelUrl: "zfyxtj/wgZfyxtj/importExcel",
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
      getCurrentMonth() {
        let curDate = new Date();
        this.defaultMonthOpera = moment(curDate, this.monthFormat);
        this.queryParam = {tjrq: undefined};
        this.queryParam.tjrq=this.defaultMonthOpera;
      },
      searchReset() {
        this.queryParam = {tjrq: undefined};
        this.queryParam.tjrq=this.defaultMonthOpera;
        this.loadData(1);
      },
      getQueryParams() {
        let tjyfMoment = "";
        if (this.queryParam.tjrq){
          tjyfMoment = moment(this.queryParam.tjrq).format("YYYY-MM-DD");
        }
        let lx = {khlx: this.khlx,tjwd: this.tjwd}
        console.log(tjyfMoment)
        var param      = Object.assign({},this.queryParam,this.isorter,lx);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjrq) {
          param.tjrq   = tjyfMoment;
        }
        return filterObj(param);
      },
      zfs(record,lx){
        this.$refs.shzfmxModal.init(record,lx,'WG', null,'2');
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>