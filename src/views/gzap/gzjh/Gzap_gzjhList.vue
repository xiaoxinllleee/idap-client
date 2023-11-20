<template>
  <a-card :bordered="false">
    <!-- 查询区域 Begin -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8"><a-form-item label="计划类型">
            <j-dict-select-tag placeholder="请选择计划类型" v-model="queryParam.jhlx" dict-code="gzap_gzlx"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="完成状态">
            <j-dict-select-tag placeholder="请选择完成状态" v-model="queryParam.wczt" dict-code="gzap_wczt"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="开始时间">
            <a-range-picker :placeholder="['开始时间', '结束时间']" @change="onDateChange" format="YYYY-MM-DD" @ok="onDateOk" style="width: 100%;"/>
          </a-form-item></a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域 End -->

    <!--操作按钮区域 BEGIN-->
    <div class="table-operator" style="padding-bottom: 30px;"><span style="float: left; overflow: hidden;" class="table-page-search-submitButtons">
      <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
      <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px;">重置</a-button>
    </span></div>
    <!--操作按钮区域 END-->

    <!-- table区域 Begin -->
    <a-table bordered
             ref="table"
             size="middle"
             :loading="loading"
             :columns="columns"
             :dataSource="dataSource"
             :pagination="ipagination"
             @change="handleTableChange">

        <!--超长字符串截取省略号显示-->
        <span slot="jhgs" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="jhnr" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="sjwcqk" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
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
    <!-- table区域 End -->

    <!-- 表单区域 Begin -->
    <gzap_jhxf-modal ref="modalForm" @ok="modalFormOk"/>
    <!-- 表单区域 End -->
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'
  import JEllipsis from '../../../components/jeecg/JEllipsis'
  import Gzap_jhxfModal from './modules/Gzap_gzjhModal'
  import JTreeSelect from '../../../components/jeecg/JTreeSelect'

  export default {
    name: "Gzap_jhxfList",
    mixins: [JeecgListMixin],
    components: {
      JTreeSelect,
      Gzap_jhxfModal,
      JEllipsis
    },
    data () {
      return {
        description: '工作安排/工作计划页面',
        // 表头
        columns: [
          {
            title: '计划类型',
            align:"center",
            dataIndex: 'jhlx_dictText'
          },
          {
            title: '开始日期',
            align:"center",
            dataIndex: 'jhkssj',
            customRender: function(text) {
              return !text ? "" : (text.length>10 ? text.substr(0,10) : text)
            }
          },
          {
            title: '结束日期',
            align: "center",
            dataIndex: 'jhjssj',
            customRender: function(text) {
              return !text ? "":(text.length>10 ? text.substr(0,10) : text)
            }
          },
          {
            title: '计划概述',
            align: "center",
            dataIndex: 'jhgs',
            scopedSlots: { customRender: 'jhgs' },
            width: 150
          },
          {
            title: '计划内容',
            align: "center",
            dataIndex: 'jhnr',
            scopedSlots: { customRender: 'jhnr' },
            width: 150
          },
          {
            title: '实际完成情况',
            align: "center",
            dataIndex: 'sjwcqk',
            scopedSlots: { customRender: 'sjwcqk' },
            width: 150
          },
          {
            title: '实际完成日期',
            align: "center",
            dataIndex: 'sjwcrq',
            customRender: function(text) {
              return !text ? "":(text.length>10 ? text.substr(0,10) : text)
            }
          },
          {
            title: '完成状态',
            align:"center",
            dataIndex: 'wczt_dictText'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: { customRender: 'action' }
          }
        ],
        gzlxDictOptions: [],
        wcztDictOptions: [],
        queryParam: {
          createTimeRange:[],
        },
		    url: {
          list: "/gzjh/vGzapGzjh/list"
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      onDateChange: function (value, dateString) {
        console.log(dateString[0],dateString[1]);
        this.queryParam.jhkssj_begin= dateString[0];
        this.queryParam.jhwcsj_end  = dateString[1];
      },
      onDateOk(value) {
        console.log(value);
      },
      handleEdit: function (record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "填写计划完成情况";
        this.$refs.modalForm.disableSubmit = false;
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>