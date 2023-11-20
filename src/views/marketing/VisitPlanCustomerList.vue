<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @submit.prevent="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8"><a-form-item label="所属机构">
            <j-tree-select placeholder="请选择机构查询"
                           v-model="queryParam.jgdm"
                           showSearch="true"
                           treeNodeFilterProp="title"
                           dict="HR_BAS_ORGANIZATION,ZZJC,YWJGDM"
                           pidField="sjzzbz"
                           :treeDefaultExpandAll="true"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="客户经理">
            <j-select-ygxx placeholder="请选择客户经理"
                           v-model="queryParam.khjl"
                           type="radio"
                           @selectComplete="selectComplete"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="营销单元">
            <j-dict-select-tag placeholder="请选择营销单元查询"
                               v-model="queryParam.yxdy"
                               show-search="true"
                               dictCode="YXDYGL_EJYXDYGL,DYMC,DYBH"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="客户名称">
            <j-input placeholder="请输入客户名称查询" v-model="queryParam.khmc" type="likemore"/>
          </a-form-item></a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :md="6" :sm="8"><a-form-item label="证件号码">
            <a-input placeholder="请输入证件号码查询" v-model="queryParam.zjhm"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="是否完成回访">
            <j-dict-select-tag placeholder="是否完成回访"
                               v-model="queryParam.sfwchf"
                               dict-code="sfbz"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="回访日期" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
            <a-range-picker name="hfrq" style="width: 100%" v-decorator="['hfrq',{}]"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="回访方式">
            <j-dict-select-tag placeholder="请选择回访方式"
                               v-model="queryParam.hffs"
                               dict-code="khhf_hffs"/>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item label="计划开始月份" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
              <a-range-picker :placeholder="['开始月份', '结束月份']"
                              v-decorator="['jhksyf',{}]"
                              :value="value"
                              :mode="mode2"
                              name="jhksyf"
                              format="YYYY-MM"
                              style="width: 100%;"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="计划结束月份" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
              <a-range-picker :placeholder="['开始月份', '结束月份']" v-decorator="['jhjsyf',{}]"
                                name="jhksyf" format="YYYY-MM" :value="value" :mode="mode2" style="width: 100%;" />
            </a-form-item></a-col>
          </template>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator" style="border-top: 5px">
      <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
      <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px;">重置</a-button>
      <a-button type="primary" @click="handleExportXls('客户计划回访明细')" icon="download" style="margin-left: 8px;">导出</a-button>
      <a @click="handleToggleSearch" style="margin-left: 8px;">
        {{ toggleSearchStatus ? '收起' : '展开' }}
        <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
      </a>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a> 项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
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
               :scroll="{ x: 1600 }"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">完成回访</a>
          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="handleDetail(record)">详情</a>
              </a-menu-item>
              <a-menu-item v-if="record.status==1"><a-popconfirm title="确定提交吗?" @confirm="() => handleSubm(record.id,2)">
                  <a>提交</a>
              </a-popconfirm></a-menu-item>
              <a-menu-item v-if="record.status==2"><a-popconfirm title="确定撤销提交吗?" @confirm="() => handleSubm(record.id,1)">
                <a>撤销提交</a>
              </a-popconfirm></a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <customerVisit-modal ref="modalForm" @ok="modalFormOk"/>
  </a-card>
</template>

<script>
  import {putAction} from '@/api/manage';
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import customerVisitModal from './modules/CustomerVisitModal'
  import JTreeSelect from '../../components/jeecg/JTreeSelect'
  import JSelectYgxx from '../../components/jeecgbiz/JSelectYgxx'
  import JInput from '../../components/jeecg/JInput'

  export default {
    name: "VisitPlanCustomerList",
    mixins: [JeecgListMixin],
    components: {
      JSelectYgxx,
      JTreeSelect,
      customerVisitModal,
      JInput
    },
    data() {
      return {
        description: '回访计划详情',
        queryParam: {},
        mode2: ['month', 'month'],
        value: [],
        isorter: {
          column: 'hfrq',
          order: 'desc',
        },
        columns: [
          {
            title: '机构名称',
            align: "center",
            dataIndex: 'jgmc',
            width: 100,
          },
          {
            title: '营销单元',
            align: "center",
            dataIndex: 'yxdy',
            width: 100,
          },
          {
            title: '客户经理',
            align: "center",
            dataIndex: 'khjl',
            width: 100,
          },
          {
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc',
            width: 100,
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            width: 100,
          },
          {
            title: '客户性质',
            align: "center",
            dataIndex: 'khxz_dictText',
            width: 80,
          },
          {
            title: '客户类型',
            align: "center",
            dataIndex: 'khlx_dictText',
            width: 80,
          },
          {
            title: '是否完成回访',
            align: "center",
            dataIndex: 'sfwchf_dictText',
            width: 120,
          },
          {
            title: '回访日期',
            align: "center",
            dataIndex: 'hfrq',
            sorter: (a, b) => b.hfrq.replace(/-/g, '/') - a.hfrq.replace(/-/g, '/'),
            width: 100,
          },
          {
            title: '回访方式',
            align: "center",
            dataIndex: 'hffs_dictText',
            width: 100,
          },
          {
            title: '计划开始月份',
            align: "center",
            dataIndex: 'jhksyf',
            width: 120,
          },
          {
            title: '计划结束月份',
            align: "center",
            dataIndex: 'jhjsyf',
            width: 120,
          },
          {
            title: '创建人',
            align: "center",
            width: 100,
            dataIndex: 'cjr'
          },
          {
            title: '创建时间',
            align: "center",
            width: 170,
            dataIndex: 'cjsj'
          },
          {
            title: '操作',
            fixed: 'right',
            dataIndex: 'action',
            scopedSlots: {customRender: 'action'},
            align: "center",
            width: 150
          }
        ],
        url: {
          imgerver: window._CONFIG['domianURL'] + "/sys/common/view",
          list: "/api/json/visitPlanCustomerList",
          delete: "/api/json/customerVisitDelete",
          deleteBatch: "/sys/user/deleteBatch",
          exportXlsUrl: "/sys/user/exportXls",
          importExcelUrl: "sys/user/importExcel",
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
      handleSubm: function (id, status) {
        let that = this;
        that.$message.success("操作成功！");
      },
      handlePanelChange2 (value, mode) {
        this.value = value
        this.mode2 = [
          mode[0] === 'date' ? 'month' : mode[0],
          mode[1] === 'date' ? 'month' : mode[1],
        ]
      },
      handleEditCheck(record) {
        // if (record.sfwchf == 1) {
        //   this.$message.info("")
        // }
        handleEdit(record)
      },
    },
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>