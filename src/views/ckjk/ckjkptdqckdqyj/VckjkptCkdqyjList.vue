<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label=" 机构代码">
              <j-tree-select placeholder="请选择机构查询"
                             pid-field="sjywjgdm"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.jgdm"
                             v-decorator="['jgdm', {rules: [{required: true, message: '请选择机构查询！'}]}]"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="存款账号">
              <a-input placeholder="请输入存款账号" v-model="queryParam.ckzh"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="客户名称">
                <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="证件号码">
                <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="存款余额">
                <a-input-group compact>
                  <a-input-number placeholder="" v-model="queryParam.ckye_begin" :min="0"
                                  style=" width: 40%; text-align: center; "/>
                  <a-input placeholder="<->" disabled
                           style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "/>
                  <a-input-number placeholder="" v-model="queryParam.ckye_end" :min="0"
                                  style="width: 40%; text-align: center; border-left: 0;"/>
                </a-input-group>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="">
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="6" :sm="8">
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

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('存款到期预警')" v-has="'ckdqyj:exportXls'">
        导出
      </a-button>

    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
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


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <vckjkptCkdqyj-modal ref="modalForm" @ok="modalFormOk"></vckjkptCkdqyj-modal>
  </a-card>
</template>

<script>
import VckjkptCkdqyjModal from './modules/VckjkptCkdqyjModal'
import {JeecgListMixin} from '@/mixins/JeecgListMixin'
import JSelectDepart from '@/components/jeecgbiz/JSelectDepart'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import store from '@/store/'
import {filterObj} from "../../../utils/util";

export default {
  name: "VckjkptCkdqyjList",
  mixins: [JeecgListMixin],
  components: {
    VckjkptCkdqyjModal, JSelectDepart,
    JTreeSelect
  },
  data() {
    return {
      description: '存款到期预警管理页面',
      // 表头
      columns: [
        /* {
           title: '机构代码',
           align:"center",
           dataIndex: 'jgdm'
         },*/
        {
          title: '机构名称',
          align: "center",
          dataIndex: 'jgdm_dictText'
        },
        {
          title: '存款账号',
          align: "center",
          dataIndex: 'ckzh'
        },

        {
          title: '客户名称',
          align: "center",
          dataIndex: 'khmc'
        },
        {
          title: '证件号码',
          align: "center",
          dataIndex: 'zjhm'
        },
        {
          title: '手机号码',
          align: "center",
          dataIndex: 'lxfs'
        },
        {
          title: '地址',
          align: "center",
          dataIndex: 'dz'
        },
        {
          title: '存款余额',
          align: "center",
          dataIndex: 'ckye'
        },
        {
          title: '开户日期',
          align: "center",
          dataIndex: 'khrq'
        },
        {
          title: '定期最大存期',
          align: "center",
          dataIndex: 'dqzdcq'
        },

        {
          title: '本期起息日',
          align: "center",
          dataIndex: 'bqqxr'
        },
        {
          title: '本期截至日',
          align: "center",
          dataIndex: 'bqjzr'
        },
        {
          title: '到期日期',
          align: "center",
          dataIndex: 'dqrq',
          sorter: (a, b) => b.dqrq.replace(/-/g, '/') - a.dqrq.replace(/-/g, '/'),
        },
        {
          title: '剩余天数',
          align: "center",
          dataIndex: 'syts',
          sorter: (a, b) => a.syts - b.syts,
        },
      ],
      url: {
        list: "/ckjkpt.ckjkptdqckdqyj/vckjkptCkdqyj/list",
        delete: "/ckjkpt.ckjkptdqckdqyj/vckjkptCkdqyj/delete",
        deleteBatch: "/ckjkpt.ckjkptdqckdqyj/vckjkptCkdqyj/deleteBatch",
        exportXlsUrl: "ckjkpt.ckjkptdqckdqyj/vckjkptCkdqyj/exportXls",
        importExcelUrl: "ckjkpt.ckjkptdqckdqyj/vckjkptCkdqyj/importExcel",
      },
    }
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
  methods: {
    searchReset() {
      this.queryParam = {};
      if (!store.getters.isRoot) {
        this.queryParam.jgdm = store.getters.ywjgdm
      }
      this.loadData(1);
    },
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>