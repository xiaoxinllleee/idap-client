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

<!--          <template v-if="toggleSearchStatus">-->
<!--            <a-col :md="6" :sm="8">-->
<!--              <a-form-item label="实际走访数">-->
<!--                <a-input placeholder="请输入实际走访数" v-model="queryParam.sjzfhs"></a-input>-->
<!--              </a-form-item>-->
<!--            </a-col>-->
<!--            <a-col :md="6" :sm="8">-->
<!--              <a-form-item label="全支行户数">-->
<!--                <a-input placeholder="请输入全支行户数" v-model="queryParam.chs"></a-input>-->
<!--              </a-form-item>-->
<!--            </a-col>-->
<!--            <a-col :md="6" :sm="8">-->
<!--              <a-form-item label="采集率">-->
<!--                <a-input placeholder="请输入采集率" v-model="queryParam.cjl"></a-input>-->
<!--              </a-form-item>-->
<!--            </a-col>-->
<!--          </template>-->

          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
<!--              <a @click="handleToggleSearch" style="margin-left: 8px">-->
<!--                {{ toggleSearchStatus ? '收起' : '展开' }}-->
<!--                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>-->
<!--              </a>-->
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <!--<a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button @click="handleInit" type="primary" icon="cloud-download">提取</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('全行完成情况明细表')">导出</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
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
               :scroll="{ x: 1800 }"
               @change="handleTableChange">

        <span slot="detail" slot-scope="text, record">
          <a @click="handleDetailToZhmx(record, '/tjfx/pjsxwcqkmxb/zhwcqkmxb/PjsxwcqkZhList')">详情</a>
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
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <pjsxwcqkQh-modal ref="modalForm" @ok="modalFormOk"/>
  </a-card>
</template>

<script>
  import PjsxwcqkQhModal from './modules/PjsxwcqkQhModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JDate from '../../../../components/jeecg/JDate'
  import { putAction } from '../../../../api/manage'
  import { filterObj } from '../../../../utils/util'
  import moment from 'moment'

  export default {
    name: "PjsxwcqkQhList",
    mixins:[JeecgListMixin],
    components: {
      JDate,
      PjsxwcqkQhModal
    },
    data () {
      return {
        description: '全行完成情况明细表管理页面',
        beginDay: '',
        endDay  : '',
        dateFormat: 'YYYY-MM-DD',
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
            title: '全行户数',
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
          {
            title: '详情',
            dataIndex: 'action',
            align: "center",
            scopedSlots: { customRender: 'detail' },
            fixed: "right",
            width: 100,
          }
        ],
        url: {
          init: "/tjfx.pjsxwcqkmxb/qhwcqkmxb/init",
          list: "/tjfx.pjsxwcqkmxb/qhwcqkmxb/list",
          delete: "/tjfx.pjsxwcqkmxb/qhwcqkmxb/delete",
          deleteBatch: "/tjfx.pjsxwcqkmxb/qhwcqkmxb/deleteBatch",
          exportXlsUrl: "tjfx.pjsxwcqkmxb/qhwcqkmxb/exportXls",
          importExcelUrl: "tjfx.pjsxwcqkmxb/qhwcqkmxb/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      handleInit() {
        var params = this.queryParam;
        if (params.ksrq==null || params.ksrq=='undefined') {
          this.$message.error("请选择开始日期！");
          return;
        }
        if (params.jsrq==null || params.jsrq=='undefined') {
          this.$message.error("请选择结束日期！");
          return;
        }
        let ksrqFormat = params.ksrq.format("YYYYMMDD");
        let jsrqFormat = params.jsrq.format("YYYYMMDD");
        this.loading = true;
        putAction(this.url.init, { ksrq: ksrqFormat,jsrq: jsrqFormat,jgdm: '' }).then((res) => {
          if (res.success) {
            this.$message.success(res.message);
            this.loadData();
          } else {
            this.$message.warning(res.message,5);
          }
          this.loading = false;
        })
      },
      getQueryParams() {
        // let beginDay =
        //   moment(this.queryParam.ksrq, this.dateFormat).startOf('month').format('YYYY-MM-DD');
        // let ksrqMoment = '';
        // if (this.queryParam.ksrq){
        //   ksrqMoment = this.queryParam.ksrq.format("YYYY-MM-DD");
        // }
        // console.log('>>>>>>>>>>>>>>>>beginDay<<<<<<<<<<<<<<<<<');
        // console.log(beginDay);
        // console.log('>>>>>>>>>>>>>>>>ksrqMoment<<<<<<<<<<<<<<<<<');
        // console.log(ksrqMoment);
        // let endDay  =
        //   moment(this.queryParam.jsrq, this.dateFormat).endOf('month').format('YYYY-MM-DD');
        // let jsrqMoment = '';
        // if (this.queryParam.jsrq){
        //   jsrqMoment = this.queryParam.jsrq.format("YYYY-MM-DD");
        // }
        // console.log('>>>>>>>>>>>>>>>>endDay<<<<<<<<<<<<<<<<<');
        // console.log(endDay);
        // console.log('>>>>>>>>>>>>>>>>jsrqMoment<<<<<<<<<<<<<<<<<');
        // console.log(jsrqMoment);
        let ksrqMoment = '';
        if (this.queryParam.ksrq){
          ksrqMoment = this.queryParam.ksrq.format("YYYY-MM-DD");
        }
        let jsrqMoment = '';
        if (this.queryParam.jsrq){
          jsrqMoment = this.queryParam.jsrq.format("YYYY-MM-DD");
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        // if (beginDay&&endDay){
        //   console.log('1111111111111111111111111');
        //   param.ksrq_ge = beginDay;
        //   param.jsrq_le = endDay;
        // } else {
        //   console.log('2222222222222222222222222');
        //   param.ksrq     = ksrqMoment;
        //   param.jsrq     = jsrqMoment;
        // }
        param.ksrq     = ksrqMoment;
        param.jsrq     = jsrqMoment;
        return filterObj(param);
      },
      handleDetailToZhmx(record, path) {
        this.$router.push({
          path: path,
          query: { ksrq: record.ksrq, jsrq: record.jsrq, },
        })
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>