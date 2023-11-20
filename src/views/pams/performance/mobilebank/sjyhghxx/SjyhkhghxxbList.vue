<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="机构代码">
              <a-input placeholder="请输入机构代码" v-model="queryParam.jgdm"/>
          </a-form-item></a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="客户编号">
              <a-input placeholder="请输入客户编号" v-model="queryParam.khbh"/>
          </a-form-item></a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="客户名称">
            <j-input placeholder="请输入客户名称" v-model="queryParam.khmc" type="likemore"/>
          </a-form-item></a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="证件号码">
            <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
          </a-form-item></a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="管户人">
            <j-input placeholder="请输入管户人" v-model="queryParam.ghr" type="likemore"/>
          </a-form-item></a-col>
          <!--<template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="证件类型">
              <a-input placeholder="请输入证件类型" v-model="queryParam.zjlx"></a-input>
            </a-form-item></a-col>
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
      <a-button @click="handleDataExtraction" type="primary" icon="area-chart">提取</a-button>
      <a-button @click="handleSyncData" type="primary" icon="area-chart">同步存款管户信息</a-button>
      <a-button @click="handleTransfer" type="primary" icon="edit">移交</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('手机银行客户管户信息')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <!--<a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
      <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
      <a-button type="primary" @click="searchReset" icon="reload">重置</a-button>
      <!--<a @click="handleToggleSearch">
        {{ toggleSearchStatus ? '收起' : '展开' }}
        <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
      </a>-->
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
               @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleView(record)">查看</a>
          <!--<a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <sjyhkhghxxb-modal ref="modalForm" @ok="modalFormOk"></sjyhkhghxxb-modal>
  </a-card>
</template>

<script>
  import SjyhkhghxxbModal from './modules/SjyhkhghxxbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JInput from "@/components/jeecg/JInput";

  export default {
    name: "WdyjSjyhkhghxxbList",
    mixins:[JeecgListMixin],
    components: {
      JInput,
      SjyhkhghxxbModal
    },
    data () {
      return {
        description: '手机银行客户管户信息 管理页面',
        // 表头
        columns: [
          // {
          //   title: '#',
          //   dataIndex: '',
          //   key: 'rowIndex',
          //   width: 60,
          //   align: "center",
          //   customRender:function (t,r,index) {
          //     return parseInt(index)+1;
          //   }
          // },
          {
            title: '机构名称',
            align: "center",
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '客户编号',
            align: "center",
            dataIndex: 'khbh'
          },
          {
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc'
          },
          // {
          //   title: '证件类型',
          //   align: "center",
          //   dataIndex: 'zjlx_dictText'
          // },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm'
          },
          {
            sorter: true,
            title: '最早开户日期',
            align: "center",
            dataIndex: 'zzkhrq'
          },
          {
            title: '管户人',
            align: "center",
            dataIndex: 'ghr'
          },
          {
            sorter: true,
            title: '管户比例(%)',
            align: "center",
            dataIndex: 'ghbl'
          },
          // {
          //   title: '录入标识',
          //   align: "center",
          //   dataIndex: 'lrbz_dictText'
          // },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
          list: "/performance/sjyhkhghxx/list",
          delete: "/performance/sjyhkhghxx/delete",
          deleteBatch: "/performance/sjyhkhghxx/deleteBatch",
          exportXlsUrl: "performance/sjyhkhghxx/exportXls",
          importExcelUrl: "performance/sjyhkhghxx/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      /**
       * 数据抽取
       */
      handleDataExtraction: function () {},
      /**
       * 同步存款管户信息
       */
      handleSyncData: function () {},
      /**
       * 移交
       */
      handleTransfer: function () {},
      /**
       * 查看
       */
      handleView: function (record) {},
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>
