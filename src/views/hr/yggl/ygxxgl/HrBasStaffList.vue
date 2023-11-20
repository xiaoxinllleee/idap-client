<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工姓名">
              <j-input placeholder="请输入员工姓名" v-model="queryParam.ygxm"></j-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户经理标识">
              <a-input placeholder="请输入客户经理标识" v-model="queryParam.khjlbh"></a-input>
            </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="柜员号">
                <a-input placeholder="请输入柜员号" v-model="queryParam.gyh"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="员工类型">
                <j-dict-select-tag v-model="queryParam.yglx" placeholder="请选择员工类型" dictCode="yglx"/>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="员工状态">
                <j-dict-select-tag v-model="queryParam.ygzt" placeholder="请选择员工状态" dictCode="ygzt"/>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="身份证号">
                <j-input placeholder="请输入身份证号" v-model="queryParam.sfzh"></j-input>
              </a-form-item>
            </a-col>
          </template>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-s`earch-submitButtons">
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'ygxxgl:add'">新增</a-button>
      <a-button icon="download" @click="handleExportXls('员工信息管理')" v-has="'ygxxgl:export'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'ygxxgl:import'">导入</a-button>
      <a-tooltip>
        <template slot="title">
          提取新增的财务系统员工基本信息，更新最新的客户经理标识
        </template>
        <a-button @click="updateStaffInfo" icon="area-chart" v-has="'ygxxgl:extract'">提取</a-button>
      </a-tooltip>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel" v-has="'ygxxgl:delete'"><a-icon type="delete"/>删除</a-menu-item>
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
        rowKey="yggh"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{ x: 1500 }"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">
        <span slot="detail" slot-scope="ygxm, record">
          <a @click="handleView(record)">{{ygxm}}</a>
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'ygxxgl:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.yggh)">
            <a v-has="'ygxxgl:delete'">删除</a>
          </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <hrBasStaff-modal ref="modalForm" @ok="modalFormOk"></hrBasStaff-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"></excel-import>
  </a-card>
</template>

<script>
  import HrBasStaffModal from './modules/HrBasStaffModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getAction } from '@api/manage'
  import ExcelImport from '@/components/common/ExcelImport'
  import JInput from "@/components/jeecg/JInput";

  export default {
    name: "HrBasStaffList",
    mixins:[JeecgListMixin],
    components: {
      HrBasStaffModal, ExcelImport, JInput
    },
    data () {
      return {
        description: '员工信息管理管理页面',
        exportTemplateName: '员工信息导入模板',
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
            title: '员工工号',
            align:"center",
            dataIndex: 'yggh'
          },
          {
            title: '员工姓名',
            align:"center",
            dataIndex: 'ygxm',
            scopedSlots: { customRender: 'detail' },
          },
          {
            title: '员工类型',
            align:"center",
            dataIndex: 'yglx_dictText'
          },
          {
            title: '柜员号',
            align:"center",
            dataIndex: 'gyh'
          },
          {
            title: '客户经理标识',
            align:"center",
            dataIndex: 'khjlbh'
          },
          {
            title: '员工状态',
            align:"center",
            dataIndex: 'ygzt_dictText'
          },
          {
            title: '性别',
            align:"center",
            dataIndex: 'xb_dictText'
          },
          {
            title: '手机号码',
            align:"center",
            dataIndex: 'sjhm'
          },
          {
            title: '身份证号',
            align:"center",
            dataIndex: 'sfzh'
          },
          {
            title: '入职日期',
            align:"center",
            dataIndex: 'rzrq'
          },
          {
            title: '转正日期',
            align:"center",
            dataIndex: 'zzrq'
          },
          {
            title: '离职日期',
            align:"center",
            dataIndex: 'lzrq'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            fixed: 'right',
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
          list: "/ygxxgl/hrBasStaff/list",
          delete: "/ygxxgl/hrBasStaff/delete",
          deleteBatch: "/ygxxgl/hrBasStaff/deleteBatch",
          exportXlsUrl: "ygxxgl/hrBasStaff/exportXls",
          importExcelUrl: "ygxxgl/hrBasStaff/importExcel",
          exportTemplateUrl: "ygxxgl/hrBasStaff/exportTemplateXls",
          updateStaffInfo:"/ygxxgl/hrBasStaff/updateStaffIngo",
        }

      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {

      updateStaffInfo(){
        getAction(this.url.updateStaffInfo).then((res) => {
          this.$message.success(res.message);
        })
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>