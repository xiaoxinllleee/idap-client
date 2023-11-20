<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="日期查询">
              <a-range-picker :placeholder="['开始日期', '结束日期']" :format="DateFormat"
                              @change="onChange" style="width: 100%;"/>
            </a-form-item>

          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="请选择所属支行">
              <j-tree-select placeholder="请选择机构查询"
                             pid-field="sjywjgdm"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.jgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工编号">
              <a-input placeholder="请输入员工编号" v-model="queryParam.evlObjId"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button icon="download" @click="handleExportXls('派生指标结果')">导出</a-button>
      <a-button icon="area-chart" @click="handleCount()">工资提取</a-button>

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

      <a-table ref="table"
               size="middle"
               bordered
               rowKey="khbh"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">


        <span slot="action" type="primary" slot-scope="text, record">
          <Button type="primary" size="small" @click="handleEdit(record)">查看方案明细</Button>
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
    <paramFEvInRe-modal ref="modalForm" @ok="modalFormOk"></paramFEvInRe-modal>
    <param-f-ev-in-re-count-gz-modal ref="modalCountForm" @ok="modalFormOk"></param-f-ev-in-re-count-gz-modal >
  </a-card>
</template>

<script>
  import ParamFEvInReModal from './modules/ParamFEvInReModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import ParamFEvInReCountGzModal from '@views/pams/khjg/gzjg/modules/ParamFEvInReCountGzModal'


  export default {
    name: "ParamFEvInReList",
    mixins:[JeecgListMixin],
    components: {
      ParamFEvInReModal,JTreeSelect,ParamFEvInReCountGzModal
    },
    data () {
      return {
        description: '派生指标结果管理页面',
        DateFormat:'yyyyMMDD',
        // 表头
        columns: [
          /*{
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },*/
          {
            title: '日期',
            align:"center",
            dataIndex: 'statDate'
          },
          /*{
            title: '方案名称',
            align:"center",
            dataIndex: 'schemeId_dictText'
          },
          {
            title: '所属机构',
            align:"center",
            dataIndex: 'jgdm_dictText'
          },*/
          /*{
            title: '派生指标编号',
            align:"center",
            dataIndex: 'indexId'
          },
          {
            title: '派生指标编号',
            align:"center",
            dataIndex: 'indexId_dictText'
          },*/
          {
            title: '员工工号',
            align:"center",
            dataIndex: 'evlObjId'
          },
          {
            title: '员工姓名',
            align:"center",
            dataIndex: 'evlObjId_dictText'
          },
          {
            title: '工资',
            align:"center",
            dataIndex: 'indexValue'
          },
          /*{
            title: '余额类型',
            align:"center",
            dataIndex: 'balTypeId_dictText'
           },
		   {
            title: '考核对象',
            align:"center",
            dataIndex: 'evlObjType_dictText'
           },
		   {
            title: '币种',
            align:"center",
            dataIndex: 'curTypeId_dictText'
           },
		   {
            title: '应用类型',
            align:"center",
            dataIndex: 'applyTypeId_dictText'
           },*/
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/khjg/gzjg/list",
          delete: "/qqqqq/paramFEvInRe/delete",
          deleteBatch: "/qqqqq/paramFEvInRe/deleteBatch",
          exportXlsUrl: "qqqqq/paramFEvInRe/exportXls",
          importExcelUrl: "qqqqq/paramFEvInRe/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      onChange(date, dateString) {
        this.queryParam.startTime = dateString[0];
        this.queryParam.endTime = dateString[1];
      },

      handleEdit: function (record) {
        console.log(record)
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
      },

      handleCount: function (record) {
        console.log(record)
        this.$refs.modalCountForm.edit(record);
        this.$refs.modalCountForm.title = "工资提取";
        this.$refs.modalCountForm.disableSubmit = false;
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>