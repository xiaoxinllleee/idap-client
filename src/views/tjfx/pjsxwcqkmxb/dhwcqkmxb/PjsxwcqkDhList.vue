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
            <a-col :md="6" :sm="8"><a-form-item label="行政组">
              <j-input placeholder="请输入行政组" v-model="queryParam.xzz"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="责任人">
              <j-dict-select-tag placeholder="请选择责任人" v-model="queryParam.zkhjl" dict-code="HR_BAS_STAFF,YGXM,YGGH" :show-search="true"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="户号编码">
              <j-input placeholder="请输入户号编码" v-model="queryParam.hhbm"/>
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
      <a-button type="primary" icon="download" @click="handleExportXls('单户完成情况明细表')">导出</a-button>
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
               :scroll="{ x: 2400 }"
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
        <span slot="detail" slot-scope="hhbm, record">
          <a @click="handleDetailToDhmx(record, '/tjfx/pjsxwcqkmxb/grwcqkmxb/PjsxwcqkGrList')">{{hhbm}}</a>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <pjsxwcqkDh-modal ref="modalForm" @ok="modalFormOk"></pjsxwcqkDh-modal>
  </a-card>
</template>

<script>
  import PjsxwcqkDhModal from './modules/PjsxwcqkDhModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JInput from '../../../../components/jeecg/JInput'
  import JTreeSelect from '../../../../components/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util';
  export default {
    name: "PjsxwcqkDhList",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect,
      JInput,
      PjsxwcqkDhModal
    },
    data () {
      return {
        description: '单户完成情况明细表管理页面',
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
            dataIndex: 'xzc'
          },
          {
            title: '行政组',
            align: "center",
            dataIndex: 'xzz_dictText'
          },
          {
            title: '责任人',
            align: "center",
            dataIndex: 'zkhjl_dictText'
          },
          {
            title: '户号编码',
            align: "center",
            dataIndex: 'hhbm',
            scopedSlots: { customRender: 'detail' },
          },
          {
            title: '户主名称',
            align: "center",
            dataIndex: 'hzmc'
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm'
          },

          {
            title: '户内人数',
            align: "center",
            dataIndex: 'dhrs'
          },
          // {
          //   title: '系统测算评定等级',
          //   align: "center",
          //   dataIndex: 'xtcspddj'
          // },
          {
            title: '最终授信额度',
            align: "center",
            dataIndex: 'zzsxed',
            sorter: true,
          },
          {
            title: '用信金额',
            align: "center",
            dataIndex: 'yxje',
            sorter: true,
          },
          {
            title: '是否已走访',
            align: "center",
            dataIndex: 'sfyzf_dictText',
            filters: [
              { text: '是',value: '1' },
              { text: '否',value: '0' },
            ],
            onFilter: (value, record) => record.sfyzf.indexOf(value) === 0,
          },
          {
            title: '是否已评级',
            align: "center",
            dataIndex: 'sfyjpj_dictText',
            filters: [
              { text: '是',value: '1' },
              { text: '否',value: '0' },
            ],
            onFilter: (value, record) => record.sfyjpj.indexOf(value) === 0,
          },
          {
            title: '是否已授信',
            align: "center",
            dataIndex: 'sfysx_dictText',
            filters: [
              { text: '是',value: '1' },
              { text: '否',value: '0' },
            ],
            onFilter: (value, record) => record.sfysx.indexOf(value) === 0,
          },
          {
            title: '是否已用信',
            align: "center",
            dataIndex: 'sfyyx_dictText',
            filters: [
              { text: '是',value: '1' },
              { text: '否',value: '0' },
            ],
            onFilter: (value, record) => record.sfyyx.indexOf(value) === 0,
          },

          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   align: "center",
          //   scopedSlots: { customRender: 'action' },
          // }
        ],
        url: {
          list: "/tjfx.pjsxwcqkmxb/dhwcqkmxb/list",
          delete: "/tjfx.pjsxwcqkmxb/dhwcqkmxb/delete",
          deleteBatch: "/tjfx.pjsxwcqkmxb/dhwcqkmxb/deleteBatch",
          exportXlsUrl: "tjfx.pjsxwcqkmxb/dhwcqkmxb/exportXls",
          importExcelUrl: "tjfx.pjsxwcqkmxb/dhwcqkmxb/importExcel",
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
        let xzcValue   = this.$route.query.xzc;
        let xzzValue   = this.$route.query.xzz;
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
        if (xzcValue) {
          param.xzc = xzcValue;
        }
        if (xzzValue) {
          param.xzz = xzzValue;
        }

        return filterObj(param);
      },
      handleDetailToDhmx: function(record, path) {
        this.$router.push({
          path: path,
          query: {
            ksrq: record.ksrq,
            jsrq: record.jsrq,
            sszh: record.sszh,
            xzc : record.xzc,
            xzz : record.xzz,
            hhbm: record.hhbm,
          },
        })
      },
      searchReset() {
        this.$route.query.ksrq = null;
        this.$route.query.jsrq = null;
        this.$route.query.sszh = null;
        this.$route.query.xzc  = null;
        this.$route.query.xzz  = null;
        this.queryParam = {}
        this.loadData(1);
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>