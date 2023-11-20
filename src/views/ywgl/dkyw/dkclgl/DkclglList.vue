<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="组织标识">
<!--            <j-tree-select placeholder="请选择组织标识"
                           v-model="queryParam.zzbz"
                           treeNodeFilterProp="title"
                           pid-field="sjywjgdm"
                           dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                           :showSearch="true"
                           :treeDefaultExpandAll="true"/>-->
              <j-tree-select placeholder="请选择机构代码" v-model="queryParam.zzbz" dict="v_hr_bas_organization_cmms, zzjc, zzbz"
                             pid-field="sjzzbz" treeNodeFilterProp="title"
                             :showSearch="true" :tree-default-expand-all="true"/>
          </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="存量年份">
              <!--<a-month-picker placeholder="请选择存量年份" v-model="queryParam.clnf" />-->
              <a-select placeholder="请选择存量年份" v-model="queryParam.clnf" :defaultValue="dateValue" @change="selectValue">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
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
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button icon="download" @click="handleExportXls('贷款存量管理')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button icon="import">导入</a-button>
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
        rowKey="id"
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
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dkclgl-modal ref="modalForm" @ok="modalFormOk"></dkclgl-modal>
  </a-card>
</template>

<script>
  import DkclglModal from './modules/DkclglModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {filterObj} from "@/utils/util";
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {deleteAction} from "@/api/manage";
  import store from '@/store/'


  export default {
    name: "DkclglList",
    mixins:[JeecgListMixin],
    components: {
      DkclglModal,JTreeSelect
    },
    data () {
      return {
        description: '贷款存量管理管理页面',
        dateValue:'',
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
            title: '组织标识',
            align:"center",
            dataIndex: 'zzbz'
          },
          {
            title: '组织名称',
            align:"center",
            dataIndex: 'zzbz_dictText'
          },
          {
            title: '员工工号',
            align:"center",
            dataIndex: 'yggh'
          },
          {
            title: '员工姓名',
            align:"center",
            dataIndex: 'yggh_dictText'
          },
          {
            title: '存量年份',
            align:"center",
            dataIndex: 'clnf'
          },
		   {
            title: '存量日期',
            align:"center",
            dataIndex: 'clrq'
           },
          {
            title: '贷款余额',
            align:"center",
            dataIndex: 'dkye'
          },
		   {
            title: '不良余额',
            align:"center",
            dataIndex: 'blye'
           },
          {
            title: '户数',
            align:"center",
            dataIndex: 'hs'
          },
          {
            title: '月贷款日平余额',
            align:"center",
            dataIndex: 'mdkrpye'
          },
		   {
            title: '季贷款日平余额',
            align:"center",
            dataIndex: 'qdkrpye'
           },
		   {
            title: '年贷款日平余额',
            align:"center",
            dataIndex: 'ydkrpye'
           },
		   {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr'
           },
          {
            title: '录入标志',
            align:"center",
            dataIndex: 'lrbz_dictText'
          },
		   {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/dkclgl/dkclgl/list",
          delete: "/dkclgl/dkclgl/delete",
          deleteBatch: "/dkclgl/dkclgl/deleteBatch",
          exportXlsUrl: "dkclgl/dkclgl/exportXls",
          importExcelUrl: "dkclgl/dkclgl/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created(){
      this.dqnf();
    },
    methods: {
      getQueryParams(){
        let tjrqment = "";
        if(this.queryParam.clnf) {
          tjrqment = this.queryParam.clnf.format("YYYY");
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.clnf) {
          param.clnf = tjrqment;
        }
        return filterObj(param);
      },
      handleDelete: function (record) {
        console.log(record)
        if(!this.url.delete){
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        deleteAction(that.url.delete, {zzbz: record.zzbz,yggh: record.yggh,clnf: record.clnf}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },

      // 获取当前年份
      dqnf(){
        var myDate = new Date;
        var year = myDate.getFullYear();
        this.initSelectYear(year)
      },
      // 初始化年份选择下拉框
      initSelectYear(year){
        this.years = [];
        for(let i=0; i<30; i++){
          this.years.push({value:((year - i)+''),label:((year - i)+'')});
        }
      },
      // 下拉选择Func
      selectValue(value){
        console.log('DkclglList => selectValue(value)')
        console.log('selectValue::::'+value)
        let val=value;
        this.$emit('change', val);
      },

      searchReset() {
        this.queryParam={zzbz:''};
        if(!store.getters.isRoot) {
          this.queryParam.zzbz = store.getters.userInfo.orgCode
        }
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>