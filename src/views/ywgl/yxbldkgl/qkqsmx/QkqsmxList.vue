<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据日期">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.dataDate"
                              @change="onDateChange" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.branchNo" dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             treeNodeFilterProp="title" pid-field="sjywjgdm" :showSearch="true" :treeDefaultExpandAll="true">
              </j-tree-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="最多欠款期数贷款账号">
              <a-input placeholder="请输入贷款账号" v-model="queryParam.acctNo"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="证件号码">
                <a-input placeholder="请输入证件号码" v-model="queryParam.identNo"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="借款人">
                <j-input placeholder="请输入借款人" v-model="queryParam.custName" type="likemore"></j-input>
              </a-form-item>
            </a-col>
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
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <!--<a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('欠款期数明细')" v-has="'qkqsmx:exportXls'">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>

      <a-table ref="table"
               size="small"
               bordered
               :rowKey="rowKey"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">

        <span slot="lrbz" slot-scope="lrbz">
          <a-tag :key="lrbz" :color="lrbz==='导入'?'#24C780':lrbz==='录入'?'#108EE9':lrbz==='修改'?'#8A2BE2':lrbz==='调整'?'#002140':'grey'">
            {{ lrbz }}
          </a-tag>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

  </a-card>
</template>

<script>
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from "@/components/jeecg/JTreeSelect";
  import JInput from "@/components/jeecg/JInput";

  export default {
    name: "QkqsmxList",
    mixins: [JeecgListMixin],
    components: {JInput, JTreeSelect},
    data() {
      return {
        description: '欠款期数明细管理页面',
        rowKey: 'dataDate,identNo,acctNo',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '数据日期',
            align: "center",
            dataIndex: 'dataDate',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 10) : text)
            }
          },
          {
            title: '机构代码',
            align: "center",
            dataIndex: 'branchNo'
          },
          {
            title: '机构名称',
            align: "center",
            dataIndex: 'branchNo_dictText'
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'identNo'
          },
          {
            title: '借款人',
            align: "center",
            dataIndex: 'custName'
          },
          {
            title: '最多欠款期数贷款账号',
            align: "center",
            dataIndex: 'acctNo'
          },
          {
            title: '利息欠款期数',
            align: "center",
            dataIndex: 'lxqkqs'
          },
          {
            title: '贷款余额(元)',
            align: "center",
            dataIndex: 'currBal',
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '操作标识',
            align: "center",
            dataIndex: 'lrbz_dictText',
            scopedSlots: {customRender: 'lrbz'},
          },
          {
            title: '操作员',
            align: "center",
            dataIndex: 'lrr'
          },
          {
            title: '操作时间',
            align: "center",
            dataIndex: 'lrsj'
          },
        ],
        url: {
          list: "/yxbldkgl/qkqsmx/list",
          delete: "/yxbldkgl/qkqsmx/delete",
          deleteBatch: "/yxbldkgl/qkqsmx/deleteBatch",
          exportXlsUrl: "yxbldkgl/qkqsmx/exportXls",
          importExcelUrl: "yxbldkgl/qkqsmx/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      onDateChange(value, dateString) {
        this.queryParam.dataDate_begin = dateString[0]
        this.queryParam.dataDate_end = dateString[1]
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>
