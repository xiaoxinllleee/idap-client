<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8"><a-form-item label="开始日期">
            <a-date-picker placeholder="请选择开始日期" v-model="queryParam.ksrq" style="width: 100%;"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="结束日期">
            <a-date-picker placeholder="请选择结束日期" v-model="queryParam.jsrq" style="width: 100%;"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="所属支行">
            <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh" dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ"
                           pidField="SJZZBZ" :tree-default-expand-all="true" :show-search="true"/>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item label="行政村">
              <j-input placeholder="请输入行政村" v-model="queryParam.xzc"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="班子成员名称">
              <j-input placeholder="请输入班子成员名称" v-model="queryParam.bzcymc"/>
            </a-form-item></a-col>
          </template>

          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <!--<a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button type="primary" icon="download" @click="handleExportXls('行政村完成情况明细表')">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
<!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
<!--        <a-menu slot="overlay">-->
<!--          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>-->
<!--        </a-menu>-->
<!--        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
<!--      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table ref="table"
               size="middle"
               bordered
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               :scroll="{ x: 2000 }"
               @change="handleTableChange">

<!--        <span slot="action" slot-scope="text, record">-->
<!--          <a @click="handleEdit(record)">编辑</a>-->
<!--          <a-divider type="vertical" />-->
<!--          <a-dropdown>-->
<!--            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>-->
<!--            <a-menu slot="overlay">-->
<!--              <a-menu-item>-->
<!--                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">-->
<!--                  <a>删除</a>-->
<!--                </a-popconfirm>-->
<!--              </a-menu-item>-->
<!--            </a-menu>-->
<!--          </a-dropdown>-->
<!--        </span>-->
        <span slot="detail" slot-scope="xzc, record">
          <a @click="handleDetailToZmx(record, '/tjfx/pjsxwcqkmxb/zwcqkmxb/PjsxwcqkZmxList')">{{xzc}}</a>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <pjsxwcqkCmx-modal ref="modalForm" @ok="modalFormOk"/>
  </a-card>
</template>

<script>
  import PjsxwcqkCmxModal from './modules/PjsxwcqkCmxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../components/jeecg/JTreeSelect'
  import JInput from '../../../../components/jeecg/JInput'
  import { filterObj } from '@/utils/util';
  export default {
    name: "PjsxwcqkCmxList",
    mixins:[JeecgListMixin],
    components: {
      JInput,
      JTreeSelect,
      PjsxwcqkCmxModal
    },
    data () {
      return {
        description: '行政村完成情况明细表管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title: '开始日期',
            align: "center",
            dataIndex: 'ksrq',
            customRender: function(text) {
              return !text ? "" : (text.length>10 ? text.substr(0,10) : text)
            }
          },
          {
            title: '结束日期',
            align: "center",
            dataIndex: 'jsrq',
            customRender: function(text) {
              return !text ? "" : (text.length>10 ? text.substr(0,10) : text)
            }
          },
          {
            title: '所属支行',
            align: "center",
            dataIndex: 'sszh_dictText'
          },
          {
            title: '行政村',
            align: "center",
            dataIndex: 'xzc',
            scopedSlots: { customRender: 'detail' },
          },
          {
            title: '班子成员名称',
            align: "center",
            dataIndex: 'bzcymc_dictText'
          },
          {
            title: '村户数',
            align: "center",
            dataIndex: 'chs'
          },
          {
            title: '走访',
            children: [
              {
                title: '实际走访数',
                align: "center",
                dataIndex: 'sjzfhs'
              },
              {
                title: '采集完成率(%)',
                align: "center",
                dataIndex: 'cjl'
              },
            ],
          },
          {
            title: '评级',
            children: [
              {
                title: '实际评级户数',
                align: "center",
                dataIndex: 'sjpjhs'
              },
              {
                title: '评级完成率(%)',
                align: "center",
                dataIndex: 'pjl'
              },
            ],
          },
          {
            title: '授信',
            children: [
              {
                title: '实际授信户数',
                align: "center",
                dataIndex: 'sjsxhs'
              },
              {
                title: '授信完成率(%)',
                align: "center",
                dataIndex: 'sxl'
              },
            ],
          },
          {
            title: '用信',
            children: [
              {
                title: '用信户数',
                align: "center",
                dataIndex: 'yxhs'
              },
              {
                title: '用信完成率(%)',
                align: "center",
                dataIndex: 'yxl'
              },
            ],
          },
          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   align: "center",
          //   scopedSlots: { customRender: 'action' },
          // }
        ],
        url: {
          list: "/tjfx.pjsxwcqkmxb/xzcwcqkmxb/list",
          delete: "/tjfx.pjsxwcqkmxb/xzcwcqkmxb/delete",
          deleteBatch: "/tjfx.pjsxwcqkmxb/xzcwcqkmxb/deleteBatch",
          exportXlsUrl: "tjfx.pjsxwcqkmxb/xzcwcqkmxb/exportXls",
          importExcelUrl: "tjfx.pjsxwcqkmxb/xzcwcqkmxb/importExcel",
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
        let ksrqMoment = "";
        let jsrqMoment = "";
        let ksrqValue  = this.$route.query.ksrq;
        let jsrqValue  = this.$route.query.jsrq;
        let sszhValue  = this.$route.query.sszh;
        if (this.queryParam.ksrq) {
          console.log(this.queryParam.ksrq)
          ksrqMoment = this.queryParam.ksrq.format("YYYY-MM-DD");
        }
        if (this.queryParam.jsrq) {
          console.log(this.queryParam.jsrq)
          jsrqMoment = this.queryParam.jsrq.format("YYYY-MM-DD");
        }
        if (ksrqValue) {
          ksrqMoment = ksrqValue;
        }
        if (jsrqValue) {
          jsrqMoment = jsrqValue;
        }
        var param      = Object.assign({}, this.queryParam, this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.ksrq     = ksrqMoment;
        param.jsrq     = jsrqMoment;
        if (sszhValue) {
          param.sszh = sszhValue;
        }
       /* this.$route.query.ksrq = null;
        this.$route.query.jsrq = null;
        this.$route.query.sszh = null;*/
        return filterObj(param);
      },
      handleDetailToZmx: function(record, path) {
        this.$router.push({
          path: path,
          query: {
            ksrq: record.ksrq,
            jsrq: record.jsrq,
            sszh: record.sszh,
            xzc : record.xzc,
          },
        })
      },

      searchReset() {
        console.log("-----")
        console.log(this.getQueryParams().jsrq)

        console.log("-----")

       /* this.getQueryParams().ksrq=null
        this.getQueryParams().jsrq=null
        this.getQueryParams().sszh=null*/



        this.$route.query.ksrq = null;
        this.$route.query.jsrq = null;
        this.$route.query.sszh = null;
        this.queryParam = {}
        this.loadData(1);

      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>