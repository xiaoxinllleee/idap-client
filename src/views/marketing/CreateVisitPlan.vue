<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @submit.prevent="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8"><a-form-item label="客户类型">
            <j-dict-select-tag placeholder="请选择客户类型查询" v-model="queryParam.khlx" dict-code="KHHF_KHLX"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="计划开始月份">
            <a-month-picker placeholder="请选择开始月份" v-model="queryParam.jhksyf" style="width: 200px;"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="计划结束月份">
            <a-month-picker placeholder="请选择结束月份" v-model="queryParam.jhjsyf" style="width: 200px;"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="是否生成客户回访明细">
            <j-dict-select-tag placeholder="是否生成明细"
                                 v-model="queryParam.sfsckhhfmx"
                                 dict-code="sfbz"/>
          </a-form-item></a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator" style="border-top: 5px;">
      <a-button type="primary" @click="handleAdd" icon="plus">新增</a-button>
      <a-button type="primary" @click="handleExportXls('客户回访计划')" icon="download" style="margin-left: 8px;">导出</a-button>
      <a-button type="primary" @click="searchQuery" icon="search" style="margin-left: 8px;">查询</a-button>
      <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px;">重置</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay" @click="handleMenuClick"><a-menu-item key="1">
          <a-icon type="delete" @click="batchDel"/>删除
        </a-menu-item></a-menu>
        <a-button style="margin-left: 8px;">
          批量操作<a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择
        <a style="font-weight: 600;">{{ selectedRowKeys.length }}</a> 项
        <a style="margin-left: 24px;" @click="onClearSelected">清空</a>
      </div>

      <a-table bordered
                ref="table"
                size="middle"
                rowKey="id"
                :columns="columns"
                :dataSource="dataSource"
                :pagination="ipagination"
                @change="handleTableChange"
                :loading="loading"
                :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
        <!-- 字符串超长截取省略号显示 -->
        <span slot="jhsm" slot-scope="text">
          <j-ellipsis :value="text" :length="10"/>
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="handleView(record)">详情</a>
              </a-menu-item>
              <a-menu-item><a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                <a>删除</a>
              </a-popconfirm></a-menu-item>
              <a-menu-item v-if="record.sfsckhhfmx==2"><a-popconfirm title="确定生成客户回访明细?" @confirm="() => handleInitList(record.id)">
                <a>生成客户回访明细</a>
              </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <CreateVisitPlan-modal ref="modalForm" @ok="modalFormOk"/>
  </a-card>
</template>

<script>
  import {putAction} from '@/api/manage';
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import CreateVisitPlanModal from './modules/CreateVisitPlanModal'
  import JInput from '../../components/jeecg/JInput'
  import JEllipsis from '../../components/jeecg/JEllipsis'

  export default {
    name: "CreateVisitPlan",
    mixins: [JeecgListMixin],
    components: { JEllipsis, CreateVisitPlanModal, JInput },
    data() {
      return {
        description: '创建回访计划',
        queryParam: {},
        columns: [
          {
            title: '客户类型',
            align: "center",
            dataIndex: 'khlx_dictText',
            width: 80,
          },
          {
            title: '计划开始月份',
            align: "center",
            dataIndex: 'jhkssj',
            customRender:function (text) {
              return !text ? "" : (text.length>7 ? text.substr(0,7) : text)
            },
            width: 120,
          },
          {
            title: '计划结束月份',
            align: "center",
            dataIndex: 'jhjssj',
            customRender:function (text) {
              return !text ? "" : (text.length>7 ? text.substr(0,7) : text)
            },
            width: 120,
          },
          {
            title: '是否生成回访明细',
            align: "center",
            dataIndex: 'sfschfmx_dictText',
            width: 100,
          },
          {
            title: '计划说明',
            align: "center",
            dataIndex: 'jhsm',
            scopedSlots: { customRender: 'jhsm' },
            width: 150,
          },
          {
            title: '创建人',
            align: "center",
            dataIndex: 'createBy',
            width: 80,
          },
          {
            title: '创建时间',
            align: "center",
            width: 120,
            dataIndex: 'createTime'
          },
          {
            title: '操作',
            dataIndex: 'action',
            scopedSlots: {customRender: 'action'},
            align: "center",
            width: 100
          }
        ],
        url: {
          imgerver: window._CONFIG['domianURL'] + "/sys/common/view",
          list: "/cjhfjh/yxglKhhfjh/list",
          delete: "/cjhfjh/yxglKhhfjh/delete",
          deleteBatch: "/cjhfjh/yxglKhhfjh/deleteBatch",
          exportXlsUrl: "/cjhfjh/yxglKhhfjh/exportXls",
          importExcelUrl: "/cjhfjh/yxglKhhfjh/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      getAvatarView: function (avatar) {
        return this.url.imgerver + "/" + avatar;
      },
      handleMenuClick(e) {
        if (e.key == 1) {
          this.batchDel();
        }
      },
      handleInitList: function (id) {
        let that = this;
        that.$message.success("操作成功！");
      },
      handleView: function(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.disableSubmit = true;
      }
    },
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>