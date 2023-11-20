<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="所属机构代码">
              <j-tree-select placeholder="请选择支行"
                             v-model="queryParam.ssjgdm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="用户Id">
              <a-input placeholder="请输入用户Id" v-model="queryParam.userId"></a-input>
            </a-form-item>
          </a-col>
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
      <a-button type="primary" icon="download" @click="handleExportXls('客户考勤打卡明细')">导出</a-button>
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
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
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
    <tjfx_kqdkbb_sign-modal ref="modalForm" @ok="modalFormOk"></tjfx_kqdkbb_sign-modal>
  </a-card>
</template>

<script>
  import Tjfx_kqdkbb_signModal from './modules/Tjfx_kqdkbb_signModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util';
  export default {
    name: "Tjfx_kqdkbb_signList",
    mixins:[JeecgListMixin],
    components: {
      Tjfx_kqdkbb_signModal,JTreeSelect
    },
    data () {
      return {
        description: '1管理页面',
        // 表头
        columns: [
		   {
            title: '所属机构',
            align:"center",
            dataIndex: 'ssjgdm_dictText'
           },
		   {
            title: '经度',
            align:"center",
            dataIndex: 'longitude'
           },
		   {
            title: '纬度',
            align:"center",
            dataIndex: 'latitude'
           },
		   {
            title: '用户Id',
            align:"center",
            dataIndex: 'userId'
           },
		   {
            title: '日期',
            align:"center",
            dataIndex: 'signDt'
           },
		   {
            title: '时间',
            align:"center",
            dataIndex: 'signTm'
           },
        ],
		url: {
          list: "/tjfx_kqdkbb_sign/tjfx_kqdkbb_sign/list",
          delete: "/tjfx_kqdkbb_sign/tjfx_kqdkbb_sign/delete",
          deleteBatch: "/tjfx_kqdkbb_sign/tjfx_kqdkbb_sign/deleteBatch",
          exportXlsUrl: "tjfx_kqdkbb_sign/tjfx_kqdkbb_sign/exportXls",
          importExcelUrl: "tjfx_kqdkbb_sign/tjfx_kqdkbb_sign/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      getQueryParams(){
        let tjrqment = "";
        let sszhvalue=this.$route.query.zzbz;
        let tjyfvalue=this.$route.query.tjrq;
        let useridvalue=this.$route.query.user_id;
        if(this.queryParam.tjrq) {
          tjrqment = this.queryParam.tjrq.format("YYYY-MM")+'-01';
        }
        if(tjyfvalue){
          tjrqment=tjyfvalue;
        }

        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if(sszhvalue){
          param.zzbz = sszhvalue;
        }
        if(useridvalue){
          param.userId = useridvalue;
        }

        return filterObj(param);
      },
      searchReset() {
        this.flag = false;
        this.$route.query.zzbz=null;
        this.$route.query.tjrq=null;
        this.$route.query.userId=null;
        this.queryParam = {};
        this.loadData(1);
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>