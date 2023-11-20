<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="归属网格">
              <JTreeSelectNotJg placeholder="请选择归属网格"
                v-model="queryParam.wgbh"
                treeNodeFilterProp="title"
                pidField="PARENT_ID"
                dict="YXDYGL_MAIN,WGMC,ID"
                pidValue="0"
                :showSearch="true"
                :treeDefaultExpandAll="true"/>

            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="归属机构">
              <j-tree-select placeholder="请选择所属机构"
                             v-model="queryParam.jgdm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户性质">
              <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam.khxz" dict-code="khlx"/>
            </a-form-item>

          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户等级">
              <a-input placeholder="请选择客户类别" v-model="queryParam.khdj"></a-input>
            </a-form-item>

          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户类别">
              <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam.khlb" dict-code="khlb"/>
            </a-form-item>
          </a-col>

          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
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
      <!-- <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('客户画像')" v-has="'Khjlpdxjtj:exp'">导出</a-button>
      <a-button icon="area-chart" :loading="loadingInitJcsj" @click="initDataJcsj" v-has="'Khjlpdxjtj:init'">提取</a-button>
      <a-button icon="area-chart" :loading="loadingInit" @click="initData" v-has="'Khjlpdxjtj:initData'">同步业务数据</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
<!--      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
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
        :scroll="{ x : 'max-content' }"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleView(record)" v-has="'Khjlpdxjtj:view'">查看</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a v-has="'Khjlpdxjtj:del'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <khjbzl-modal ref="modalForm" @ok="modalFormOk"></khjbzl-modal>
  </a-card>
</template>

<script>
  import KhjbzlModal from './modules/KhjbzlModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JTreeSelectNotJg from '@/components/jeecg/JTreeSelectNotJg'
  import { putAction ,getAction} from '@api/manage'

  export default {
    name: "KhjbzlList",
    mixins:[JeecgListMixin],
    components: {
      KhjbzlModal,JTreeSelect,JTreeSelectNotJg
    },
    data () {
      return {
        description: '客户画像管理页面',
        loadingInit:false,
        loadingInitJcsj:false,
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
            title: '归属机构',
            align:"center",
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '归属网格',
            align:"center",
            dataIndex: 'wgbh_dictText'
          },

		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
           },
		   {
            title: '证件类型',
            align:"center",
            dataIndex: 'zjlx_dictText'
           },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
           },
		   {
            title: '联系方式',
            align:"center",
            dataIndex: 'lxfs'
           },
		   {
            title: '地址',
            align:"center",
            dataIndex: 'dz'
           },
		    {
            title: '客户性质',
            align:"center",
            dataIndex: 'khxz_dictText'
           },
		    {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText'
           },
		     {
            title: '客户等级',
            align:"center",
            dataIndex: 'khdj'
           },

          {
            title: '客户类别',
            align:"center",
            dataIndex: 'khlb_dictText'
          },

          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/khjbzl/khjbzl/list",
          delete: "/khjbzl/khjbzl/delete",
          deleteBatch: "/khjbzl/khjbzl/deleteBatch",
          exportXlsUrl: "khjbzl/khjbzl/exportXls",
          importExcelUrl: "khjbzl/khjbzl/importExcel",
          extract:"/khjbzl/khjbzl/extract",
          init:"/khjbzl/khjbzl/init",
          queryByzjhm: "/khjbzl/khjbzl/queryByzjhm",

    },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      initData() {
        this.loadingInit = true
        putAction(this.url.extract, {}).then((res) => {
          if (res.success) {
            this.$message.success("提取成功")
            this.loadData()
          } else {
            this.$message.warning("提取失败")
          }
        }).catch((error) => {
          this.$message.error("提取失败", error)
        }).finally(() => {
          this.loadingInit = false
        })
      },
      initDataJcsj(){
        this.loadingInitJcsj = true
        putAction(this.url.init, {}).then((res) => {
          if (res.success) {
            this.$message.success("提取成功")
            this.loadData()
          } else {
            this.$message.warning("提取失败")
          }
        }).catch((error) => {
          this.$message.error("提取失败", error)
        }).finally(() => {
          this.loadingInitJcsj = false
        })
      },

      searchQuery() {
        this.loadData(1);
      },
      loadData(arg){
        //在路由跳转过来时 附带所传参数
        let rzjhm = this.$route.query.zjhm;
        if (rzjhm != null && rzjhm != ''){
          this.queryParam.zjhm = rzjhm;
        }else{
        }
        this.$route.query.zjhm=null;

        if(!this.url.list){
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();//查询条件
        console.info(params)
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
            console.log(res.result.total)
            if(params.zjhm&&res.result.total==0){
              getAction(this.url.queryByzjhm, params).then((res) => {
                this.$confirm({
                  title: "提示信息",
                  content: res.message,
                  onOk: function () {

                  }
                });
              });
            }
            this.loading = false;
          }else{
            this.dataSource =[];
            this.ipagination.total=0;
            this.loading = false;
          }
          if(res.code===510){
            this.$message.warning(res.message,5)
            this.loading = false;
          }
          this.loading = false;
        })
      },
      handleView: function (record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "客户画像";
        this.$refs.modalForm.disableSubmit = true;
      },
      getRouteQuery(){
        console.log(this.$route.query.zjhm)
        this.queryParam.zjhm = this.$route.query.zjhm
      }
    },
    created() {
      console.log("mounted")
    },
    mounted() {
      console.log("mounted")
      //window.getRouteQuery=this.getRouteQuery()
    },
    beforeMount() {
      console.log("beforeMount")
    },
    updated() {
      console.log("updated")
    },
    beforeUpdate() {
      console.log("beforeUpdate")
    },
    beforeDestroy() {
      console.log("beforeDestroy")
    },
    destroyed() {
      console.log("destroyed")

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>