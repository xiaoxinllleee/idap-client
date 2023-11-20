<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="归属机构">
              <j-tree-select placeholder="请选择所属机构"
                             v-model="queryParam.sszh"
                             treeNodeFilterProp="title"
                             pid-field="sjzzbz"
                             dict="v_hr_bas_organization_cmms, zzjc, zzbz"
                             :showSearch="true"
                             :treeDefaultExpandAll="true" />
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="归属网格">
              <a-tree-select
                :treeData=sswgTreeDateoptions
                :replaceFields=replaceFields
                v-model="queryParam.wgbh"
                :dropdownStyle="{maxHeight:'400px',overflow:'auto'}"
                allow-clear
                showSearch
                treeNodeFilterProp="title"
              >

              </a-tree-select>

            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>


        <template v-if="toggleSearchStatus">

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
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
<!--      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('年审信息')">导出</a-button>-->
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-button @click="tq" type="primary" :loading="tqLoading" v-has="'nsb:tbsjdnh'">同步数据到农户</a-button>
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
        :rowKey="rowKey"
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
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getAction } from '@api/manage'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'

  export default {
    name: "CamsNhpjsxNsbList",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect
    },
    data () {
      return {
        description: '年审信息管理页面',
        sswgTreeDateoptions: [],
        tqLoading:false,
        qybm:'',
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
            title: '授信年份',
            align:"center",
            dataIndex: 'synf'
           },
		   // {
       //      title: '网格编号',
       //      align:"center",
       //      dataIndex: 'wgbh'
       //     },
		   {
            title: '导入网格名称',
            align:"center",
            dataIndex: 'drwgmc'
           },
		   {
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh_dictText'
           },
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
           },
/*		   {
            title: '所属客户经理',
            align:"center",
            dataIndex: 'sskhjl'
           },*/
		   // {
       //      title: '导入客户经理名称',
       //      align:"center",
       //      dataIndex: 'drsskhjl'
       //     },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
           },
		   {
            title: '与户主关系',
            align:"center",
            dataIndex: 'yhzgx_dictText'
           },
		   {
            title: '手机号码',
            align:"center",
            dataIndex: 'sjhm'
           },
		   {
            title: '初评等级',
            align:"center",
            dataIndex: 'cpdj'
           },
		   {
            title: '初评金额万元',
            align:"center",
            dataIndex: 'cpje'
           },
		   {
            title: '复评等级',
            align:"center",
            dataIndex: 'fpdj'
           },
		   {
            title: '复评金额',
            align:"center",
            dataIndex: 'fpje'
           },
		   // {
       //      title: '产品类型',
       //      align:"center",
       //      dataIndex: 'cplx'
       //     },
		   // {
       //      title: '导入产品类型',
       //      align:"center",
       //      dataIndex: 'drcplx'
       //     },
		    {
            title: '导入情况',
            align:"center",
            dataIndex: 'bz'
           },
		   // {
       //      title: '错误类型',
       //      align:"center",
       //      dataIndex: 'errortype'
       //     },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/nsb/camsNhpjsxNsb/list",
          delete: "/nsb/camsNhpjsxNsb/delete",
          deleteBatch: "/nsb/camsNhpjsxNsb/deleteBatch",
          exportXlsUrl: "nsb/camsNhpjsxNsb/exportXls",
          importExcelUrl: "nsb/camsNhpjsxNsb/importExcel2",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created () {
      getAction('/yxdyglmain/yxdyglMain/getWgxxTreeDateBySskhjl',{wgxz: '6,8', wgxzType: '2'}).then(res => {
        if (res.success) {
          this.sswgTreeDateoptions = res.result
        }
      })
    },
    methods: {
      tq(){
        this.tqLoading = true;
        getAction("/nsb/camsNhpjsxNsb/tq").then(res=>{
          this.successInfo("提取成功")
          this.tqLoading = false;
        })
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>