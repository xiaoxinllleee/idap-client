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


          <template v-if="toggleSearchStatus">

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
            <a-col :md="6" :sm="8">
              <a-form-item label="重要级别">
                <j-dict-select-tag v-model="queryParam.zyjb" placeholder="请选择重要级别" dictCode="gzap_zyjb"/>
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
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('GZAP_RWXF_JXZ')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :action="importExcelUrl" @change="handleImportExcel">
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
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无此图片</span>
          <img v-else :src="getImgView(text)" height="25px" alt="图片不存在" style="max-width:80px;font-size: 12px;font-style: italic;"/>
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无此文件</span>
          <a-button
            v-else
            :ghost="true"
            type="primary"
            icon="download"
            size="small"
            @click="uploadFile(text)">
            下载
          </a-button>
        </template>

        <span slot="action" slot-scope="text, record">

          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">

               <a-menu-item v-if="record.zt == '1'">
               <a @click="handleEdXq(record)">完成情况填写</a>
             </a-menu-item>
               <a-menu-item v-if="record.zt == '1'">
                <a-popconfirm title="确定结束吗?" @confirm="() => overData(record.id)">
                  <a>结束</a>
                </a-popconfirm>
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

    <gzapRwxfJxz-modal ref="modalForm" @ok="modalFormOk"></gzapRwxfJxz-modal>
    <gzap-rwxf-zjrw-wcqktx-modal ref="modalForm1" @ok="modalFormOk" ></gzap-rwxf-zjrw-wcqktx-modal>
  </a-card>
</template>

<script>
  import { filterObj } from '@/utils/util';
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import GzapRwxfJxzModal from './modules/GzapRwxfZjrwModal'
  import GzapRwxfZjrwWcqktxModal from './modules/GzapRwxfZjrwWcqktxModal'

  import {initDictOptions, filterDictText} from '@/components/dict/JDictSelectUtil'
  import { getAction,putAction } from '@/api/manage'

  export default {
    name: "GzapRwxfJxzList",
    mixins:[JeecgListMixin],
    components: {
      GzapRwxfJxzModal,GzapRwxfZjrwWcqktxModal

    },
    data () {
      return {
        description: 'GZAP_RWXF_JXZ管理页面',
        // 表头
        queryParam: {
          createTimeRange:[],
        },
        columns: [
         /* {
           /!* title: 'id',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }*!/
          },*/

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
            title: '任务名称',
            align:"center",
            dataIndex: 'rwmc'
          },
          {
            title: '内容',
            align:"center",
            dataIndex: 'nr'
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
            title: '完成情况',
            align:"center",
            dataIndex: 'wcqk'
          },
          {
            title: '完成时间',
            align:"center",
            dataIndex: 'wcsj',
            customRender:function (text) {
              return !text?"":(text.length>10?text.substr(0,10):text)
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
        rwztDictOptions:[],
        zyjbDictOptions:[],

        url: {
          overUrl:"/gzap/zjrw/gzapRwxfZjrw/over",
          list: "/gzap/zjrw/gzapRwxfZjrw/list",
          delete: "/gzap/zjrw/gzapRwxfZjrw/delete",
          deleteBatch: "/gzap/zjrw/gzapRwxfZjrw/deleteBatch",
          exportXlsUrl: "/gzap/zjrw/gzapRwxfZjrw/exportXls",
          importExcelUrl: "/gzap/zjrw/gzapRwxfZjrw/importExcel",
        },
        dictOptions:{
        }
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
        initDictOptions('gzap_zyjb').then((res) => {
          if (res.success) {
            this.zyjbDictOptions = res.result;
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
        this.$refs.modalForm1.disableSubmit = false;
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>