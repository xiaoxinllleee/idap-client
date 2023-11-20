<template>
  <a-card :bordered="false">

    <!-- 查询区域 begin -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8"><a-form-item label="统计日期">
            <a-date-picker placeholder="请选择统计日期" v-model="queryParam.tjrq" style="width: 100%;"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="所属支行">
            <j-tree-select placeholder="请选择所属支行查询" v-model="queryParam.zzbz" dict="hr_bas_organization, zzjc, zzbz" pid-field="sjzzbz"
                           treeNodeFilterProp="title" :showSearch="false" :sszh="true" :tree-default-expand-all="true"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="客户经理">
            <a-input placeholder="请输入客户经理" v-model="queryParam.khjlbh" type="likemore"/>
          </a-form-item></a-col>

          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px;">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域 end -->

    <!-- 操作按钮区域 begin -->
    <div class="table-operator">
      <a-button type="primary" icon="area-chart" @click="CountData">统计</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('客户走访统计')">导出</a-button>
    </div>
    <!-- 操作按钮区域 end -->

    <!-- table区域 begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"/> 已选择
        <a style="font-weight: 600;">{{ selectedRowKeys.length }} </a> 项
        <a style="margin-left: 24px;" @click="onClearSelected">清空</a>
      </div>

      <a-table bordered
               ref="table"
               size="middle"
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
               @change="handleTableChange"/>
    </div>
    <!-- table区域 end -->

  </a-card>
</template>

<script>
  import moment from 'moment';
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util';
  import JTreeSelect from '../../../components/jeecg/JTreeSelect'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'


  export default {
    name: "KhzftjList",
    mixins:[JeecgListMixin],
    components: { JTreeSelect },
    data () {
      return {
        description: '客户走访统计页面',
        queryParam: [],
        isorter: {
          order: 'desc',
        },
        // 表头
        columns: [
          {
            title: '序号',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title: '统计日期',
            align: "center",
            dataIndex: 'tjrq',
            width: 100,
            customRender: function (text) {
              return !text ? "" : (text.length > 10 ? text.substr(0, 10) : text)
            },
            sorter: true,
          },
          {
            title: '机构名称',
            align: "center",
            dataIndex: 'zzbz_dictText',
            width: 150,
            sorter: true,
          },
          {
            title: '客户经理',
            align:"center",
            dataIndex: 'khjlbh_dictText',
            width: 100,
            sorter: true,
          },
          {
            title: '总人数',
            align:"center",
            dataIndex: 'zrs',
            width: 100,
            sorter: true,
          },
          {
            title: '回访人数',
            align:"center",
            dataIndex: 'hfrs',
            width: 100,
            sorter: true,
          },
          {
            title: '未回访人数',
            align:"center",
            dataIndex: 'whfrs',
            width: 100,
            sorter: true,
          },
          {
            title: '完成率(％)',
            align:"center",
            dataIndex: 'wcl',
            width: 100,
            sorter: true,
          }
        ],
		    url: {
          list: "/khzftj/khzftj/list",
          delete: "/khzftj/khzftj/delete",
          deleteBatch: "/khzftj/khzftj/deleteBatch",
          exportXlsUrl: "khzftj/khzftj/exportXls",
          importExcelUrl: "khzftj/khzftj/importExcel",
          init:"/khzftj/khzftj/extract",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      moment,
      // 统计客户走访数据
      CountData() {
        var params = this.queryParam;
        if( params.tjrq==null || params.tjrq=='undefined'){
          this.$message.error("请选择统计日期!")
          return
        }
        let tjyfstr=params.tjrq.format("YYYYMMDD");
        this.loading = true;
        putAction(this.url.init, 'TJRQ='+tjyfstr,'put').then((res) => {
          if(res.success){
            this.loadData();
            this.$message.success(res.message);
          }else{
            this.$message.warning(res.message,5);
          }
          this.loading = false;
        })
      },
      getQueryParams(){
        let tjrqment = "";
        if(this.queryParam.tjrq) {
          tjrqment = this.queryParam.tjrq.format("YYYY-MM-DD");
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.tjrq     = tjrqment;
        return filterObj(param);
      },
      getTreeFieldValue(){
        return this.form.getFieldValue("OrgTree")
      }
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>