<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计日期">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.tjrq" @change="ontjDateChange" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工姓名">
              <a-input placeholder="请输入员工姓名" v-model="queryParam.ygxm"></a-input>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('员工每日上传数')" v-has="'ygmrscs:exportXls'">导出</a-button>
      <a-button icon="area-chart" @click="init" v-has="'ygmrscs:init'">提取</a-button>
    </div>

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
    <ygmrscs-modal ref="modalForm" @ok="modalFormOk"></ygmrscs-modal>
  </a-card>
</template>

<script>
  import YgmrscsModal from './modules/YgmrscsModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {filterObj} from "../../../../utils/util";
  import {postAction} from "../../../../api/manage";

  export default {
    name: "YgmrscsList",
    mixins:[JeecgListMixin],
    components: {
      YgmrscsModal
    },
    data () {
      return {
        description: '员工每日上传数管理页面',
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
            title: '员工工号',
            align:"center",
            dataIndex: 'yggh'
           },
		   {
            title: '员工姓名',
            align:"center",
            dataIndex: 'ygxm'
           },
		   {
            title: '上传档案数',
            align:"center",
            dataIndex: 'scdas'
           },
        ],
		url: {
          list: "/ygmrscs/ygmrscs/list",
          delete: "/ygmrscs/ygmrscs/delete",
          deleteBatch: "/ygmrscs/ygmrscs/deleteBatch",
          exportXlsUrl: "ygmrscs/ygmrscs/exportXls",
          importExcelUrl: "ygmrscs/ygmrscs/importExcel",
          init: "/ygmrscs/ygmrscs/init",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      init: function () {
        if (this.queryParam.tjrq == undefined || this.queryParam.tjrq == '') {
          this.$message.warning("请选择统计日期区间!")
          return
        }
        let arr = this.queryParam.tjrqString.split(',')
        let param = {
          tjrqBegin:arr[0],
          tjrqEnd:arr[1],
        }
        this.loading = true;
        postAction(this.url.init,param).then((response) => {
          if (response.success) {
            this.$message.success('提取成功！')
            this.loadData(1);
          } else {
            this.$message.warning('提取失败！')
          }
        }).catch((error) => {
          this.$message.error('提取失败！')
        }).finally(()=>{
          this.loading=false;
        })
      },

      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.tjrq;
        return filterObj(param);
      },

      ontjDateChange(date,dateString){
        this.queryParam.tjrqString = dateString[0] + "," + dateString[1];
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>