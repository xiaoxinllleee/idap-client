<template>
  <a-card :bordered="false">
    <!--查询区域 BEGIN-->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8"><a-form-item label="开始时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-range-picker :placeholder="['开始时间', '结束时间']" format="YYYY-MM-DD" @change="onDateChange" @ok="onDateOk" style="width: 100%;"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="任务类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <j-dict-select-tag placeholder="请选择任务类型 " v-model="queryParam.rwlx" dict-code="gzap_rwlx"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="重要级别" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <j-dict-select-tag placeholder="请选择重要级别" v-model="queryParam.zyjb" dict-code="gzap_zyjb"/>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item></a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="任务名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input placeholder="请输入任务名称" v-model="queryParam.rwmc"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="是否达标" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="请选择是否达标" v-model="queryParam.sfdb" dict-code="gzrw_sfdb"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="完成状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag placeholder="请选择完成状态" v-model="queryParam.wczt" dict-code="gzap_wczt"/>
            </a-form-item></a-col>
          </template>
        </a-row>
      </a-form>
    </div>
    <!--查询区域 END-->

    <!--操作按钮区域 BEGIN-->
    <div class="table-operator" style="padding-bottom: 30px;">
      <span class="table-page-search-submitButtons" style="float: left;overflow: hidden;">
        <a-button type="primary" @click="searchQuery" icon="search" style="margin-left: 0px;">查询</a-button>
        <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px;">重置</a-button>
        <a @click="handleToggleSearch" style="margin-left: 8px;">{{ toggleSearchStatus ? '收起' : '展开' }}
          <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
        </a>
      </span>
    </div>
    <!--操作按钮区域 END-->

    <!--Table区域 BEGIN-->
    <div>
      <a-table bordered
               ref="table"
               size="middle"
               rowKey="id"
               :columns="columns"
               :loading="loading"
               :dataSource="dataSource"
               :pagination="ipagination"
               @change="handleTableChange">
        <!--字符串超长截取省略号显示-->
        <span slot="rwmc" slot-scope="text">
          <j-ellipsis :value="text" :length="6"/>
        </span>
        <span slot="wcqk" slot-scope="text">
          <j-ellipsis :value="text" :length="6"/>
        </span>

        <span slot="action" slot-scope="text, record">
          <span v-if="record.wczt == '1'">
            <a href="javascript:;" @click="handleEdit(record)" disabled="true">填写完成情况</a>
          </span>
          <span v-else="record.wczt == '2'">
            <a href="javascript:;" @click="handleEdit(record)">填写完成情况</a>
          </span>
        </span>

      </a-table>
    </div>
    <!--Table区域 END-->

    <!--表单区域 BEGIN-->
    <gzap-gzrw-modal ref="modalForm" @ok="modalFormOk"/>
    <!--表单区域 END-->
  </a-card>
</template>

<script>
  import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'
  import GzapGzrwModal from './modules/GzapGzrwModal'
  import AFormItem from 'ant-design-vue/es/form/FormItem'
  import JEllipsis from '../../../components/jeecg/JEllipsis'
  import { FormTypes } from '../../../utils/JEditableTableUtil'

  export default {
    name: "GzapGzrwList",
    mixins: [JeecgListMixin],
    components: { AFormItem, GzapGzrwModal, JEllipsis },
    data() {
      return {
        description: '工作安排/工作任务管理页面',
        // 字段表头
        columns: [
          {
            title: '任务名称',
            align: "center",
            dataIndex: 'rwmc',
            scopedSlots: { customRender: 'rwmc' },
          },
          {
            title: '开始时间',
            align: "center",
            dataIndex: 'kssj',
            customRender:function (text) {
              return !text ? "" : (text.length>10 ? text.substr(0,10) : text)
            }
          },
          {
            title: '结束时间',
            align: "center",
            dataIndex: 'jssj',
            customRender:function (text) {
              return !text ? "" : (text.length>10 ? text.substr(0,10) : text)
            }
          },
          {
            title:'重要级别',
            align:"center",
            dataIndex: 'zyjb_dictText'
          },
          {
            title:'任务类型',
            align:"center",
            dataIndex: 'rwlx_dictText'
          },
          {
            title: '任务值',
            align: "center",
            dataIndex: 'rwz'
          },
          {
            title: '完成值',
            align: "center",
            dataIndex: 'wcz'
          },
          {
            title: '是否达标',
            align: "center",
            dataIndex: 'sfdb_dictText'
          },
          {
            title: '完成情况',
            align: "center",
            dataIndex: 'wcqk',
            scopedSlots: { customRender: 'wcqk' },
          },
          {
            title: '完成时间',
            align: "center",
            dataIndex: 'wcsj',
          },
          {
            title: '完成状态',
            align: "center",
            dataIndex: 'wczt_dictText'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        queryParam: { createTimeRange: [] },
        labelCol: {
          xs: { span: 1 },
          sm: { span: 2 },
        },
        wrapperCol: {
          xs: { span: 10 },
          sm: { span: 16 },
        },
        url: {
          list: "/gzrw/gzapGzrw/list"
        }
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      // 重置清空查询区域参数
      searchReset(){
        var that = this;
        that.queryParam = {};
        that.loadData(this.ipagination.current);
      },
      getQueryParams(){
        console.log(this.queryParam.createTimeRange)
        var param = Object.assign({}, this.queryParam,this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        // 时间参数不传递后台
        delete param.createTimeRange;
        return filterObj(param);
      },
      // 任务时间
      onDateChange: function (value, dateString) {
        // console.log(dateString[0],dateString[1]);
        this.queryParam.kssj=dateString[0];
        this.queryParam.jssj=dateString[1];
      },
      onDateOk(value) {
        console.log(value);
      },
      handleEdit: function (record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "填写任务完成情况";
        this.$refs.modalForm.disableSubmit = false;
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less';
</style>