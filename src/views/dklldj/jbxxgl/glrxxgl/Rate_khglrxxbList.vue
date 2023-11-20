<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.khmc" type="likemore"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="关联人类型">
              <j-dict-select-tag placeholder="请选择关联人类型" v-model="queryParam.glrlx" dict-code="dklldj_glrlx"/>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
        <a-col :md="6" :sm="8">
            <a-form-item label="关联人证件号码">
              <a-input placeholder="请输入关联人证件号码" v-model="queryParam.glrzjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="关联人名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.glrmc" type="likemore"/>
            </a-form-item>
          </a-col>
          </template>
          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'khglrxx:add'">新增</a-button>
      <a-button icon="download" @click="handleExportXls('客户关联人信息')" v-has="'khglrxx:exportXls'">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
                @change="handleImportExcel">
        <a-button icon="import" v-has="'khglrxx:import'">导入</a-button>
      </a-upload>
      <a-button icon="area-chart"  @click="initData" v-has="'khglrxx:init'">提取</a-button>
      <!--<a-dropdown v-if="selectedRowKeys.length > 0">
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

        <span slot="glrlx" slot-scope="glrlx">
          <a-tag :key="glrlx" :color="glrlx==='直系亲属'?'#FB6241':glrlx==='其他关系'?'#8A2BE2':'grey'">
            {{ glrlx }}
          </a-tag>
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'khglrxx:edit'">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'khglrxx:delete'">
            <a>删除</a>
          </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <rate_khglrxxb-modal ref="modalForm" @ok="modalFormOk"></rate_khglrxxb-modal>

  </a-card>
</template>

<script>
  import Rate_khglrxxbModal from './modules/Rate_khglrxxbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JInput from '@/components/jeecg/JInput'
  import { getAction,putAction,httpAction } from '@/api/manage'
  import {deleteAction} from "../../../../api/manage";

  export default {
    name: "RateKhglrxxbList",
    mixins:[JeecgListMixin],
    components: {
      Rate_khglrxxbModal,JInput
    },
    data () {
      return {
        description: '客户关联人信息管理',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
          },
          {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
          },
          {
            title: '关联人证件号码',
            align:"center",
            dataIndex: 'glrzjhm'
          },
          {
            title: '关联人名称',
            align:"center",
            dataIndex: 'glrmc'
          },
          {
            title: '关联人类型',
            align:"center",
            dataIndex: 'glrlx_dictText',
            scopedSlots: {customRender: 'glrlx'},
          },
          {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
          },
          {
            title: '录入操作员',
            align:"center",
            dataIndex: 'lrczy'
          },
          {
            title: '录入标志',
            align:"center",
            dataIndex: 'lrbz_dictText'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
          list: "/dklldj.jbxxgl.glrxxgl/rate_khglrxxb/list",
          delete: "/dklldj.jbxxgl.glrxxgl/rate_khglrxxb/delete",
          deleteBatch: "/dklldj.jbxxgl.glrxxgl/rate_khglrxxb/deleteBatch",
          exportXlsUrl: "dklldj.jbxxgl.glrxxgl/rate_khglrxxb/exportXls",
          importExcelUrl: "dklldj.jbxxgl.glrxxgl/rate_khglrxxb/importExcel",
          exportTemplateUrl: "dklldj.jbxxgl.glrxxgl/rate_khglrxxb/exportTemplateXls",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      initData() {
        this.loading = true
        putAction("/dklldj.jbxxgl.glrxxgl/rate_khglrxxb/extract").then((res) => {
          if (res.success) {
            this.$message.success("提取成功！")
            this.loadData(1)
          } else {
            this.$message.warning("提取失败！")
          }
        }).catch((error) => {
          this.$message.error("提取失败", error)
        }).finally(() => {
          this.loading = false
          this.loadData()
        })
      },
      handleDelete: function (record) {
        if (!this.url.delete) {
          this.$message.error("请设置url.delete属性!")
          return
        }
        var params = {
          'zjhm': record.zjhm,
          'glrzjhm': record.glrzjhm
        }
        var that = this
        deleteAction(that.url.delete, params).then((res) => {
          if (res.success) {
            that.$message.success(res.message)
            that.loadData()
          } else {
            that.$message.warning(res.message)
          }
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>