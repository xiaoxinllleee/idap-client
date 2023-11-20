<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8"><a-form-item label="建档月份">
            <a-month-picker v-model="queryParam.jdyf" placeholder="请选择统计月份" :defaultValue="defaultMonthOpera"
                            :format="monthFormat" style="width: 100%;"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="所属支行">
            <j-tree-select placeholder="请选择所属支行查询" pid-field="sjzzbz" :showSearch="true" treeNodeFilterProp="title"
                           v-model="queryParam.zzbz" :sszh="true" dict="hr_bas_organization, zzjc, zzbz" :tree-default-expand-all="true"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="所属营销单元">
            <j-dict-select-tag v-model="queryParam.yxdymc" placeholder="请输入营销单元名称" dictCode="yxdygl_czxxgl,organize,qybm"
                               :showSearch="true" treeNodeFilterProp="title"/>
          </a-form-item></a-col>

          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <!--<a @click="handleToggleSearch" style="margin-left: 8px">
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
      <!--
            <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      -->
      <a-button type="primary" icon="area-chart"  @click="initData" >统计</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('建档覆盖率统计')">导出</a-button>

      <!--  <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
          <a-button type="primary" icon="import">导入</a-button>
        </a-upload>-->
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
    <tjfx_jdfgltj-modal ref="modalForm" @ok="modalFormOk"></tjfx_jdfgltj-modal>
  </a-card>
</template>

<script>
  import Tjfx_jdfgltjModal from './modules/Tjfx_jdfgltjModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getAction,putAction,httpAction } from '@/api/manage'
  import { filterObj } from '@/utils/util';
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import moment from 'moment'

  export default {
    name: "Tjfx_jdfgltjList",
    mixins:[JeecgListMixin],
    components: {
      Tjfx_jdfgltjModal,JTreeSelect
    },
    data () {
      return {
        description: '1管理页面',
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: undefined,
        // 重置标识
        flag: true,
        isorter: {
          columns: 'jdyf',
          order: 'desc',
        },
        // 表头
        columns: [
          {
            title: '建档月份',
            align:"center",
            dataIndex: 'jdyf',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            },
            sorter: (a, b) => b.jdyf.replace(/-/g, '/') - a.jdyf.replace(/-/g, '/'),
          },
          {
            title: '组织名称',
            align:"center",
            dataIndex: 'zzbz_dictText',
            sorter: (a, b) => b.zzbz - a.zzbz,
          },
          {
            title: '营销单元名称',
            align:"center",
            dataIndex: 'yxdymc_dictText'
          },
          {
            title: '月建档人数',
            align:"center",
            dataIndex: 'yjdrs'
          },
          {
            title: '累计建档人数',
            align:"center",
            dataIndex: 'ljjdrs'
          },
          {
            title: '单元总人数',
            align:"center",
            dataIndex: 'dyzrs'
          },
          {
            title: '累计建档覆盖率',
            align:"center",
            dataIndex: 'ljjdfgl'
          },
        ],
        url: {
          list: "/tjfx_jdfgltj/tjfx_jdfgltj/list",
          delete: "/tjfx_jdfgltj/tjfx_jdfgltj/delete",
          deleteBatch: "/tjfx_jdfgltj/tjfx_jdfgltj/deleteBatch",
          exportXlsUrl: "tjfx_jdfgltj/tjfx_jdfgltj/exportXls",
          importExcelUrl: "tjfx_jdfgltj/tjfx_jdfgltj/importExcel",
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
      getCurrentMonth() {
        let curDate = new Date();
        let curMonth= { year : curDate.getFullYear(), month: curDate.getMonth() + 1, }
        this.defaultMonthOpera = moment(curMonth.year+'-'+0+curMonth.month, this.monthFormat);
      },
      searchReset() {
        this.flag = false;
        this.queryParam = {};
        this.loadData(1);
      },
      loadData(arg) {
        this.getCurrentMonth();
        if(!this.url.list){
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();//查询条件
        if ((params.jdyf=='undefined' || params.jdyf==null) && this.flag==true) {
          params.jdyf = this.defaultMonthOpera.format("YYYY-MM")+'-01';
        }
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          }
          if(res.code===510){
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })
      },
      initData() {
        this.loading = true;
        putAction("/tjfx_jdfgltj/tjfx_jdfgltj/extract").then((res) => {
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
        let jdyfMoment = "";
        if(this.queryParam.jdyf) {
          jdyfMoment = this.queryParam.jdyf.format("YYYY-MM")+'-01';
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.jdyf) {
          param.jdyf   = jdyfMoment;
        }
        return filterObj(param);
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>