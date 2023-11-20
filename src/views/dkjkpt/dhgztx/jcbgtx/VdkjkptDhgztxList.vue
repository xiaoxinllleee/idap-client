<template>
  <a-card :bordered="false"  >

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="附件年份">
              <a-select    :defaultValue="dateValue" @change="selectValue"  placeholder="请选择">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构查询"
                             pid-field="sjywjgdm"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.jgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.khmc"></j-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :md="6" :sm="8">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="单户贷款金额">
              <a-input-group compact>
                <a-input placeholder="Min"
                         v-model="queryParam.dhdkje_begin"
                         style=" width: 40%; text-align: center; "/>
                <a-input placeholder="~"
                         disabled
                         style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "/>
                <a-input placeholder="Max"
                         v-model="queryParam.dhdkje_end"
                         style="width: 40%; text-align: center; border-left: 0;"/>
              </a-input-group>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="单户贷款余额">
              <a-input-group compact>
                <a-input placeholder="Min"
                         v-model="queryParam.dhdkye_begin"
                         style=" width: 40%; text-align: center; "/>
                <a-input placeholder="~"
                         disabled
                         style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "/>
                <a-input placeholder="Max"
                         v-model="queryParam.dhdkye_end"
                         style="width: 40%; text-align: center; border-left: 0;"/>
              </a-input-group>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('检查报告提醒')" v-has="'VdkjkptDhgztx:exp'">导出</a-button>
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

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'VdkjkptDhgztx:edit'">编辑</a>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <vdkjkptDhgztx-modal ref="modalForm" @ok="modalFormOk"></vdkjkptDhgztx-modal>
  </a-card>
</template>

<script>
  import VdkjkptDhgztxModal from './modules/VdkjkptDhgztxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JInput from '../../../../components/jeecg/JInput'

  export default {
    name: "VdkjkptDhgztxList",
    mixins:[JeecgListMixin],
    components: {
      JInput,
      VdkjkptDhgztxModal,JTreeSelect
    },
    data () {
      return {
        dateValue:'',
        description: '贷后检查管理',
        // 表头
        columns: [
		   {
            title: '提醒年份',
            align:"center",
            dataIndex: 'tjnf',
            customRender:function (text) {
              return !text?"":(text.length>8?text.substr(0,4):text)
            },
       },
          {
            title: '机构代码',
            align:"center",
            dataIndex: 'jgdm',
          },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText',
          },
         {
            title: '客户经理员工号',
            align:"center",
            dataIndex: 'khjlyggh'
          },
          {
            title: '客户经理姓名',
            align:"center",
            dataIndex: 'khjlyggh_dictText'
          },
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
           },
		   {
            title: '单户贷款金额',
            align:"center",
            dataIndex: 'dhdkje'
           },
		   {
            title: '单户贷款余额',
            align:"center",
            dataIndex: 'dhdkye'
           },
		   {
            title: '最新借款日期',
            align:"center",
            dataIndex: 'zxjkrq'
           },
          {
            title: '检查到期日期',
            align:"center",
            dataIndex: 'dqrq'
          },
		   {
            title: '附件类型',
            align:"center",
            dataIndex: 'txlx_dictText'
           },
		   {
            title: '未上传报告类型',
            align:"center",
            dataIndex: 'wsc'
           },

          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/dkjkpt/dhgztx/jcbgtx/vdkjkptDhgztx/list",
          delete: "/dkjkpt/dhgztx/jcbgtx/vdkjkptDhgztx/delete",
          deleteBatch: "/dkjkpt/dhgztx/jcbgtx/vdkjkptDhgztx/deleteBatch",
          exportXlsUrl: "dkjkpt/dhgztx/jcbgtx/vdkjkptDhgztx/exportXls",
          importExcelUrl: "dkjkpt/dhgztx/jcbgtx/vdkjkptDhgztx/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created() {
      this.init();
    },

    methods: {
      selectValue(val){
        console.log(val)
        this.queryParam.tjnf=val;
      },
      init(){
        var myDate = new Date;
        var year = myDate.getFullYear();//获取当前年
        this.dateValue=year;
        this.initSelectYear(year)
      },
      initSelectYear(year){
        this.years = [];
        for(let i=0;i<30;i++){
          this.years.push({value:((year - i)+'-01-01'),label:((year - i)+'')});
        }
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>