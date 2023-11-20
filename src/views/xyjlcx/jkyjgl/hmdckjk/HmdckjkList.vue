<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="机构代码">
            <j-tree-select placeholder="请选择机构代码"
                           v-model="queryParam.jgdm"
                           treeNodeFilterProp="title"
                           pid-field="sjywjgdm"
                           dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                           :showSearch="true"
                           :treeDefaultExpandAll="true"/>
          </a-form-item></a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="存款余额">
              <a-input-number placeholder="Minimum" v-model="queryParam.zhye_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.zhye_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />

            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷记卡余额">
              <a-input-number placeholder="Minimum" v-model="queryParam.djkye_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.djkye_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>

          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="表内贷款余额">
              <a-input-number placeholder="Minimum" v-model="queryParam.bndkye_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.bndkye_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="表外贷款余额">
              <a-input-number placeholder="Minimum" v-model="queryParam.bwdkye_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.bwdkye_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>
          </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
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
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('黑名单存款监控')" v-has="'hmdckjk:exportXls'">导出</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
<!--        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
<!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项-->
<!--        <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
<!--      </div>-->

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

        <span slot="action" slot-scope="text, record">
          <a @click="handleView(record)" v-has="'hmdckjk:handle'">查看详情</a>
<!--          <a @click="handleEdit(record)">编辑</a>-->
<!--          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                  <a>删除</a>
            </a-popconfirm>-->
        </span>
      </a-table>
    </div>

    <!-- table区域-end -->

    <!-- 表单区域 -->
    <hmdckjk-modal ref="modalForm" @ok="modalFormOk"></hmdckjk-modal>
  </a-card>
</template>

<script>
  import HmdckjkModal from './modules/HmdckjkModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'

  export default {
    name: "HmdckjkList",
    mixins:[JeecgListMixin],
    components: {
      HmdckjkModal,JTreeSelect
    },
    data () {
      return {
        description: '黑名单存款监控管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },
		   {
            title: '业务机构代码',
            align:"center",
            dataIndex: 'jgdm'
           },
          {
            title: '业务机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
          },
		   {
            title: '证件号码',
            align:"center",
            width: 200,
            dataIndex: 'zjhm'
           },
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
           },
		   {
            title: '存款余额',
            align:"center",
            dataIndex: 'zhye'
           },
		   {
            title: '进入黑名单原因',
            align:"center",
            width: 300,
            dataIndex: 'bljlxwms_dictText'
           },
		   {
            title: '表内贷款余额',
            align:"center",
            dataIndex: 'bndkye'
           },
		   {
            title: '表外贷款余额',
            align:"center",
            dataIndex: 'bwdkye'
           },
		   {
            title: '贷记卡余额',
            align:"center",
            dataIndex: 'djkye'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            width: 150,
            scopedSlots: { customRender: 'action' },
          }

        ],
		url: {
          list: "/hmdckjk/hmdckjk/list",
          delete: "/hmdckjk/hmdckjk/delete",
          deleteBatch: "/hmdckjk/hmdckjk/deleteBatch",
          exportXlsUrl: "hmdckjk/hmdckjk/exportXls",
          importExcelUrl: "hmdckjk/hmdckjk/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      // 查看详情Func
      handleView: function (record) {
        console.log('HmdckjkList => handleView: function (record)')
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "查看详情";
        this.$refs.modalForm.disableSubmit = true;
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>