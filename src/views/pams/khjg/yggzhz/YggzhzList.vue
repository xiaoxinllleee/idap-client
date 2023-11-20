<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="工资月份">
              <!--<a-month-picker v-model="queryParam.gzrq" placeholder="请选择工资月份" style="width: 100%;"-->
                              <!--:defaultValue="defaultMonthOpera" :format="dateFormat"/>&lt;!&ndash;:defaultValue="defaultDate"&ndash;&gt;-->
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.gzrq" :format="DateFormat"
                              @change="gzrqChange" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="组织机构">
              <j-tree-select placeholder="请选择" v-model="queryParam.zzbz"
                             dict="hr_bas_organization,zzjc,zzbz" pidField="sjzzbz" treeNodeFilterProp="title"
                             show-search :showSearch="true" :treeDefaultExpandAll="true" :filterTreeNode="true"
                             :isAll="false"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="岗位">
              <j-dict-select-tag placeholder="请选择" v-model="queryParam.gwbz" dictCode="hr_bas_post,gwmc,gwbz">
              </j-dict-select-tag>
            </a-form-item>
          </a-col>
          <!--<template v-if="toggleSearchStatus">
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>-->

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <!--<a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
      <a-button type="primary" @click="searchQueryByUrl(url.listAll)" v-has="'Yggzhz:searchAll'" icon="search" style="margin-left: 8px">查询全部</a-button>
      <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('员工工资汇总')" v-has="'Yggzhz:exp'" style="margin-left: 8px">导出</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXlsByNameAndUrl('员工工资汇总', url.exportAllXlsUrl)" v-has="'Yggzhz:expAll'">导出全部</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
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
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table ref="table" size="middle" bordered
               :rowKey="rowKey" :columns="columns" :dataSource="dataSource" :pagination="ipagination" :loading="loading"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">

        <!--<span slot="action" slot-scope="text, record">
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
    <yggzhz-modal ref="modalForm" @ok="modalFormOk"></yggzhz-modal>
  </a-card>
</template>

<script>
  import YggzhzModal from './modules/YggzhzModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util'
  import moment from 'moment'
  import store from '@/store/'

  export default {
    name: "YggzhzList",
    mixins:[JeecgListMixin],
    components: {
      YggzhzModal,
      JTreeSelect,
    },
    data () {
      return {
        description: '员工工资汇总管理页面',
        dateFormat: 'YYYY-MM',
        DateFormat: 'YYYY-MM-DD',
        defaultDate: undefined,
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '工资日期',
            align: "center",
            dataIndex: 'gzrq'
          },
          {
            title: '组织标识',
            align: "center",
            dataIndex: 'zzbz'
          },
          {
            title: '组织名称',
            align: "center",
            dataIndex: 'zzbz_dictText'
          },
          {
            title: '岗位标识',
            align: "center",
            dataIndex: 'gwbz'
          },
          {
            title: '岗位名称',
            align: "center",
            dataIndex: 'gwbz_dictText'
          },
          {
            title: '员工工号',
            align: "center",
            dataIndex: 'yggh'
          },
          {
            title: '员工姓名',
            align: "center",
            dataIndex: 'yggh_dictText'
          },
          {
            title: '绩效工资合计（元）',
            align: "center",
            dataIndex: 'jxgzhj',
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          // {
          //   title: '基本工资（元）',
          //   align: "center",
          //   dataIndex: 'jbgz',
          //   customRender:(text)=>{
          //     if (text != null) {
          //       return Number.parseFloat(text).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
          //     }
          //   },
          // },
          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   align: "center",
          //   scopedSlots: {customRender: 'action'},
          // }
        ],
        url: {
          list: "/yggzhz/list",
          listAll: "/yggzhz/listAll",
          // delete: "/yggzhz/delete",
          // deleteBatch: "/yggzhz/deleteBatch",
          exportXlsUrl: "/yggzhz/exportXls",
          exportAllXlsUrl: "/yggzhz/exportXlsAll",
          // importExcelUrl: "/yggzhz/importExcel",
        },
        searchAll: false,
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created() {
      this.defaultMonthOpera = moment(new Date(), this.monthFormat);
      // this.queryParam = {gzrq: undefined};
      // this.queryParam.gzrq=this.defaultMonthOpera
    },
    methods: {
      searchReset() {
        this.queryParam = {zzbz: undefined};
        if(!store.getters.isRoot) {
          this.queryParam.zzbz = store.getters.orgCode
        }
        if (this.searchAll) {
          this.loadDataByUrl(1, this.url.listAll)
        } else {
          this.loadData(1);
        }
      },
      beforeSearchQuery(url) {
        if (url) {
          //查询全部
          this.searchAll = true
        } else {
          this.searchAll = false
        }
      },
      handleTableChange (pagination, filters, sorter) {
        //分页、排序、筛选变化时触发
        //TODO 筛选
        if (Object.keys(sorter).length > 0) {
          this.isorter.column = sorter.field
          this.isorter.order = 'ascend' == sorter.order ? 'asc' : 'desc'
        }
        this.ipagination = pagination
        if (this.searchAll) {
          this.loadDataByUrl(undefined, this.url.listAll)
        } else {
          this.loadData();
        }
      },
      gzrqChange:function(value, dateString) {
        this.queryParam.gzrq_begin = dateString[0]
        this.queryParam.gzrq_end = dateString[1]
      },
      getQueryParams() {
        // if (this.queryParam.gzrq) {
        //   this.queryParam.gzrq = moment(this.queryParam.gzrq).format("YYYY-MM")+'-01';
        // }
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.gzrq
        return filterObj(param);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>