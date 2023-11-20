<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="计划月份">
              <a-month-picker placeholder="请输入计划月份" v-model="queryParam.jhyf"></a-month-picker>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="回访客户等级类型">
              <j-dict-select-tag placeholder="请选择客户类型查询" v-model="queryParam.hfkhdjlx" dict-code="KHDJ_KHDJSZ,DJMC,DJBH"/>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="客户经理工号">
              <a-input placeholder="请输入客户经理" v-model="queryParam.khjl"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">
          <a-col :md="6" :sm="8">
            <a-form-item label="客户经理姓名">
              <j-dict-select-tag
                v-model="queryParam.khjl"
                placeholder="请选择客户经理姓名"
                dictCode="HR_BAS_STAFF,ygxm,yggh"
                :showSearch="true"
                treeNodeFilterProp="title"
              />
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8"><a-form-item label="明细是否已生成">
            <j-dict-select-tag placeholder="明细是否已生成"
                               v-model="queryParam.sfmxsc"
                               dict-code="sfbz"/>
          </a-form-item></a-col>

          </template>
          <a-col :md="6" :sm="8" >
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
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('客户回访计划')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
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
        rowKey="khjl"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => delete12(record)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>

              <a-menu-item v-if="record.sfmxsc == '2'">
                <a-popconfirm title="确定生成客户回访明细?" @confirm="() => initData(record)">
                  <a>生成明细</a>
                </a-popconfirm>
              </a-menu-item>

            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <yxglKhhfjh-modal ref="modalForm" @ok="modalFormOk"></yxglKhhfjh-modal>
  </a-card>
</template>

<script>
  import YxglKhhfjhModal from './modules/YxglKhhfjhModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util';
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'




  export default {
    name: "YxglKhhfjhList",
    mixins:[JeecgListMixin],
    components: {
      YxglKhhfjhModal,JTreeSelect
    },
    data () {
      return {
        description: '客户回访计划管理页面',
        // 表头
        columns: [
          {
            title: '计划月份',
            align:"center",
            dataIndex: 'jhyf'
          },
		   {
            title: '计划开始时间',
            align:"center",
            dataIndex: 'jhkssj'
           },
		   {
            title: '计划结束时间',
            align:"center",
            dataIndex: 'jhjssj'
           },

		   {
            title: '客户经理',
            align:"center",
            dataIndex: 'khjl_dictText'
           },
		   {
            title: '回访客户等级类型',
            align:"center",
            dataIndex: 'hfkhdjlx_dictText'
           },
		   {
            title: '计划概叙',
            align:"center",
            dataIndex: 'jhgx'
           },
		   {
            title: '明细是否已生成',
            align:"center",
            dataIndex: 'sfmxsc_dictText'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/yxgl.khhfjh/yxglKhhfjh/list",
          delete: "/yxgl.khhfjh/yxglKhhfjh/delete",
          deleteBatch: "/yxgl.khhfjh/yxglKhhfjh/deleteBatch",
          exportXlsUrl: "yxgl.khhfjh/yxglKhhfjh/exportXls",
          importExcelUrl: "yxgl.khhfjh/yxglKhhfjh/importExcel",
          init:"yxgl.khhfjh/yxglKhhfjh/extract",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {

      delete12(record) {

          var parm = {'khjl': record.khjl, "jhkssj": record.jhkssj, "jhjssj": record.jhjssj};
          putAction(this.url.delete,parm, 'put').then((res) => {
            if (res.success) {
              this.$message.success(res.message);
              this.loadData(1);
            } else {
              this.$message.warning(res.message,5);
            }
          })
        },


      initData(record) {
        var params = {"khjl":record.khjl,"jhkssj": record.jhkssj, "jhjssj": record.jhjssj,"hfkhdjlx": record.hfkhdjlx };

        //let tjyfstr=params.jhkssj.format("YYYYMM")+'01';
        this.loading = true;
        putAction(this.url.init, params,'put').then((res) => {
          if(res.success){
            this.loadData();
            this.$message.success(res.message);
          }else{
            this.$message.warning(res.message,5);
          }
          this.loading = false;
        })
      },

      getQueryParams(){
        let tjrqment = "";
        if(this.queryParam.jhyf) {
          tjrqment = this.queryParam.jhyf.format("YYYY-MM")+'-01';
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.jhyf     = tjrqment;
        return filterObj(param);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>