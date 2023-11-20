<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="组织标识">
              <a-input placeholder="请输入组织标识" v-model="queryParam.zzbz"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="组织名称">
              <a-input placeholder="请输入组织名称" v-model="queryParam.zzmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="上级组织标志">
              <a-input placeholder="请输入上级组织标志" v-model="queryParam.sjzzbz"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>

            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('组织机构管理')">导出</a-button>
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
        rowKey="zzbz"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{ x: 2500, y: 300 }"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
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
    <hrBasOrganization-modal ref="modalForm" @ok="modalFormOk"></hrBasOrganization-modal>
  </a-card>
</template>

<script>
  import HrBasOrganizationModal from './modules/HrBasOrganizationModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "HrBasOrganizationList",
    mixins:[JeecgListMixin],
    components: {
      HrBasOrganizationModal
    },
    data () {
      return {
        description: '组织机构管理管理页面',
        // 表头
        columns: [

		   {
            title: '组织标识',
            align:"center",
            dataIndex: 'zzbz',width: 140,
           },
		   {
            title: '组织名称',
            align:"center",
            dataIndex: 'zzmc',width: 320,
           },
		   {
            title: '组织类别',
            align:"center",
            dataIndex: 'zzlb',width: 140,
           customRender: (text) => {
            if(text==1){
              return "联社";
            }else if(text==2){
              return "分社";
            }else if(text==3){
              return "部门";
            }else if(text==4){
              return "支行/社";
            }else{
              return "网点/分社";
            }
         }

        },
		   {
            title: '组织级别',
            align:"center",
            dataIndex: 'zzjb',width: 140,
             customRender: (text) => {
               if(text==1){
                 return "省联社";
               }else if(text==2){
                 return "市联社";
               }else if(text==3){
                 return "农商行/县联社";
               }else if(text==4){
                 return "支行/社/部门";
               }else{
                 return "网点/分社";
               }
             }
		   },
		   {
            title: '启用标识',
            align:"center",
            dataIndex: 'qybz',width: 140,
           customRender: (text) => {
             if(text==1){
               return "是";
             }else if(text==2){
               return "否";
             }
           }
        },
		   {
            title: '上级组织标识',
            align:"center",
            dataIndex: 'sjzzbz',width: 140,
           },
		   {
            title: '组织简称',
            align:"center",
            dataIndex: 'zzjc',width: 140,
           },
		   {
            title: '业务机构代码',
            align:"center",
            dataIndex: 'ywjgdm',width: 140,
           },
		   {
            title: '报表权限机构代码',
            align:"center",
            dataIndex: 'bbqxjgdm',width: 160,
           },
		   {
            title: '业务机构类型',
            align:"center",
            dataIndex: 'ywjglx',width: 140,
             customRender: (text) => {
               if(text==1){
                 return "准柜员制";
               }else if(text==2){
                 return "复合制";
               }else if(text==3){
                 return "综合制";
               }
             }
       },
		   {
            title: '业务机构性质',
            align:"center",
            dataIndex: 'ywjgxz',width: 140,
             customRender: (text) => {
               if(text==1){
                 return "有贷款城区支行";
               }else if(text==2){
                 return "有贷款农村支行";
               }else if(text==3){
                 return "无贷款支行";
               }else if(text==4){
                 return "有不良贷款支行";
               }else if(text==5){
                 return "无不良贷款支行";
               }
             }
        },
		   {
            title: '业务机构标识',
            align:"center",
            dataIndex: 'ywjgbz',width: 140,
           customRender: (text) => {
             if(text==1){
               return "是";
             }else if(text==2){
               return "否";
             }
           }
      },
		   {
            title: '排序序号',
            align:"center",
            dataIndex: 'pxxh',width: 140,
           },
		   {
            title: '所在区域',
            align:"center",
            dataIndex: 'szqy',width: 140,
             customRender: (text) => {
               if(text==1){
                 return "城区社";
               }else if(text==2){
                 return "城郊社";
               }else if(text==3){
                 return "农村社";
               }else if(text==4){
                 return "农村一类";
               }else if(text==5){
                 return "农村二类";
               }else{
                 return "农村三类"
               }
             }
        },
		   {
            title: '机构经营类型',
            align:"center",
            dataIndex: 'jgjylx',width: 140,
             customRender: (text) => {
               if(text==1){
                 return "经营型";
               }else if(text==2){
                 return "服务型";
               }else if(text==3){
                 return "效益型";
               }
             }
       },
        {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },width: 140,
          fixed: 'right',
         }
        ],
		url: {
          list: "/sys/hrBasOrganization/list",
          delete: "/sys/hrBasOrganization/delete",
          deleteBatch: "/sys/hrBasOrganization/deleteBatch",
          exportXlsUrl: "sys/hrBasOrganization/exportXls",
          importExcelUrl: "sys/hrBasOrganization/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    initDictConfig() {
      console.log("--我才是真的方法!--")
      //初始化字典 - 性别
      initDictOptions('gzap_rwxfzt').then((res) => {
        if (res.success) {
          this.rwztDictOptions = res.result;
        }
      });
      initDictOptions('gzap_zyjb').then((res) => {
        if (res.success) {
          this.zyjbDictOptions = res.result;
        }
      });
    },
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>