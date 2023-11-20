<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="4" :sm="1">
            <a-form-item label="状态">
              <j-dict-select-tag v-model="queryParam.zt" placeholder="请选择状态" dictCode="gzap_rwxfzt"/>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="任务名称">
              <a-input placeholder="请输入任务名称" v-model="queryParam.rwmc"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="开始时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-range-picker
                style="width: 210px"
                v-model="queryParam.createTimeRange"
                format="YYYY-MM-DD"
                :placeholder="['开始时间', '结束时间']"
                @change="onDateChange"
                @ok="onDateOk"
              />
            </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="任务类型">
                <j-dict-select-tag v-model="queryParam.rwlx" placeholder="请选择任务类型" dictCode="gzap_rwlx"/>
              </a-form-item>


            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="重要级别">
                <j-dict-select-tag v-model="queryParam.zyjb" placeholder="请选择状态" dictCode="gzap_zyjb"/>
              </a-form-item>
            </a-col>
          </template>

          <a-col :md="6" :sm="8">
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
      <a-button @click="$refs.modalForm.add()" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('工作日志')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
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
        <i class="anticon anticon-info-circle ant-alert-icon"></i>
        <span>已选择</span>
        <a style="font-weight: 600">
          {{ selectedRowKeys.length }}
        </a>
        <span>项</span>
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
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>

             <a-menu slot="overlay">
               <a-menu-item v-if="record.zt == '1'">
                <a-popconfirm title="确定结束吗?" @confirm="() => overData(record.id)">
                  <a>结束</a>
                </a-popconfirm>
              </a-menu-item>

              <a-menu-item>
                <a href="javascript:;" @click="handleEdXq(record)">任务明细</a>
              </a-menu-item>

              <a-menu-item>
                <a-popconfirm v-if="record.zt != '1' "title="确定删除吗?" @confirm="() => handleDelete(record.id)">
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
    <gzapRwxfJxz-modal ref="modalForm" @ok="modalFormOk"/>
    <gzap-rwxf-jxzrwmx-modal ref="modalForm1" @ok="modalFormOk"></gzap-rwxf-jxzrwmx-modal>

  </a-card>
</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import GzapRwxfJxzModal from './modules/GzapRwxfJxzModal'
  import GzapRwxfJxzrwmxModal from './modules/GzapRwxfJxzRwmxModal'

  import { filterObj } from '@/utils/util';
  import { getAction,putAction } from '@/api/manage'
  import {initDictOptions, filterDictText} from '@/components/dict/JDictSelectUtil'

  export default {
    name: "GzapRwxfJxzList",
    mixins: [JeecgListMixin],
    components: {
      GzapRwxfJxzModal,GzapRwxfJxzrwmxModal
    },
    data () {
      return {
        description: '工作日志管理页面',
        // 表头
        columns: [
          {
            title: '任务名称',
            align:"center",
            dataIndex: 'rwmc'
          },
          {
            title: '开始时间',
            align:"center",
            dataIndex: 'kssj',
            customRender:function (text) {
              return !text?"":(text.length>10?text.substr(0,10):text)
            }
          },
          {
            title: '结束时间',
            align:"center",
            dataIndex: 'jssj',
            customRender:function (text) {
              return !text?"":(text.length>10?text.substr(0,10):text)
            }
          },
          {
            title: '任务类型',
            align:"center",
            dataIndex: 'rwlx',
            customRender: (text) => {
              //字典值替换通用方法
              return filterDictText(this.rwlxDictOptions, text);
            }
          },
          {
            title: '重要级别',
            align:"center",
            dataIndex: 'zyjb',
            customRender: (text) => {
              //字典值替换通用方法
              return filterDictText(this.zyjbDictOptions, text);
            }
          },
          {
            title: '状态',
            align:"center",
            dataIndex: 'zt',
            customRender: (text) => {
              //字典值替换通用方法
              return filterDictText(this.rwztDictOptions, text);
            }
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],

        labelCol: {
          xs: { span: 1 },
          sm: { span: 2 },
        },
        wrapperCol: {
          xs: { span: 10 },
          sm: { span: 16 },
        },

        rwsxDictOptions: [],
        rwztDictOptions: [],
        rwdxDictOptions: [],
        zyjbDictOptions: [],
        rwlxDictOptions: [],

        // 请求参数
    	url: {
              list: "/gzap.rwxf/gzapRwxfJxz/list",
              delete: "/gzap.rwxf/gzapRwxfJxz/delete",
              deleteBatch: "/gzap.rwxf/gzapRwxfJxz/deleteBatch",
              exportXlsUrl: "gzap.rwxf/gzapRwxfJxz/exportXls",
              importExcelUrl: "gzap.rwxf/gzapRwxfJxz/importExcel",
              overUrl: "gzap.rwxf/gzapRwxfJxz/over",
           },
        }
      },
      computed: {
        importExcelUrl: function(){
          return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
        }
      },


    methods: {

      initDictConfig() {
        console.log("--我才是真的方法!--")
        //初始化字典 - 性别
        initDictOptions('gzap_rwxfzt').then((res) => {
          if (res.success) {
            this.rwztDictOptions = res.result;
          }
        });
        initDictOptions('sys_depart,depart_name,id').then((res) => {
          if (res.success) {
            this.rwdxDictOptions = res.result;
          }
        });
        initDictOptions('gzap_zyjb').then((res) => {
          if (res.success) {
            this.zyjbDictOptions = res.result;
          }
        });

        // 任务类型 gzap_rwlx
        initDictOptions('gzap_rwlx').then((res) => {
          if (res.success) {
            this.rwlxDictOptions = res.result;
          }
        });
        initDictOptions('gzap_rwxfrwsx').then((res) => {
          if (res.success) {
            this.rwsxDictOptions = res.result;
          }
        });
      },
      overData: function (id) {
        putAction(this.url.overUrl,{Id:id}).then((res)=>{
          if(res.success){
            this.$message.success('操作成功!');
            this.loadData();
          }
        });
      },
      getQueryParams(){
        console.log(this.queryParam.createTimeRange)
        var param = Object.assign({}, this.queryParam,this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.createTimeRange; // 时间参数不传递后台
        return filterObj(param);
      },

      // 重置
      searchReset(){
        var that = this;
        that.queryParam = {}; //清空查询区域参数
        that.loadData(this.ipagination.current);
      },
      onDateChange: function (value, dateString) {
        console.log(dateString[0],dateString[1]);
        this.queryParam.kssj_begin=dateString[0];
        this.queryParam.kssj_end=dateString[1];
      },
      onDateOk(value) {
        console.log(value);
      },

      handleEdXq: function (record) {
        this.$refs.modalForm1.edit(record);
        this.$refs.modalForm1.title = "编辑";
        this.$refs.modalForm1.disableSubmit = true;
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>