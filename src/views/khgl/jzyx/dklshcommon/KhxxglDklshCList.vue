<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="原支行">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.zzbz"
                             dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true"
                             :isAll="true"/>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="网格所属支行">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.hjsszh"
                             dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true"
                             :isAll="true"/>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.custName"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.identNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="归属网格">
              <a-tree-select
                :treeData=sswgTreeDateoptions
                :replaceFields=replaceFields
                v-model="queryParam.hjszwg"
                :dropdownStyle="{maxHeight:'400px',overflow:'auto'}"
                showSearch
                treeNodeFilterProp="title"
              >
              </a-tree-select>
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('贷款流失户')" v-has="'VKhxxglJzyxDklsh:exp'">导出</a-button>
      <a-button type="primary" icon="area-chart" :loading="initflag" @click="initData">提取</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-button style="margin-left: 8px" icon="delete" v-has="'dklsh:delete'"  @click="batchDel">删除</a-button>
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
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a >删除</a>
          </a-popconfirm>
        </span>
        <span slot="detail" slot-scope="khmc,record">
          <a @click="handlepjsxjdmxEdit(record)">{{khmc}}</a>
        </span>
      </a-table>
    </div>

    <nhxq-modal ref="modalForm" @ok="modalFormOk"></nhxq-modal>
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import NhxqModal from '@views/cmms/khxxgl/khflgl/nhxq/modules//NhxqModal'
  import { getAction,putAction } from '@/api/manage'
  import store from '@/store/'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JInput from '@/components/jeecg/JInput'

  export default {
    name: "KhxxglDklshCList",
    mixins:[JeecgListMixin],
    components: {
      JInput,NhxqModal,JTreeSelect
    },
    data () {
      return {
        isAll: false,
        loading:false,
        sszh: '',
        initflag:false,
        description: '贷款流失户管理页面',
        // 表头
        sswgTreeDateoptions: [],
        replaceFields:
          { children: 'children', title: 'wgmc', key: 'wgbh', value: 'wgbh' },
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
            title: '原支行',
            align:"center",
            dataIndex: 'zzbz_dictText'
           },


          {
            title: '客户名称',
            align:"center",
            dataIndex: 'custName',
            scopedSlots: { customRender: 'detail' }
          },

		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'identNo'
           },
		   {
            title: '电话号码',
            align:"center",
            dataIndex: 'dhhm'
           },
		   {
            title: '合同号',
            align:"center",
            dataIndex: 'hth'
           },
		   {
            title: '合同金额',
            align:"center",
            dataIndex: 'htje'
           },
		   {
            title: '合同起始日期',
            align:"center",
            dataIndex: 'htqsrq'
           },
		   {
            title: '合同到期日期',
            align:"center",
            dataIndex: 'htdqrq'
           },
		   {
            title: '签约日期',
            align:"center",
            dataIndex: 'qyrq'
           },
		   {
            title: '原担保方式',
            align:"center",
            dataIndex: 'dbfs_dictText'
           },
		   {
            title: '借款原因',
            align:"center",
            dataIndex: 'jkyy'
           },
          {
            title: '第一责任人',
            align:"center",
            dataIndex: 'dyzrr'
          },

		   {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText'
           },

		   {
            title: '户籍所在网格',
            align:"center",
            dataIndex: 'hjszwg_dictText'
           },
		   {
            title: '户籍所属支行',
            align:"center",
            dataIndex: 'hjsszh_dictText'
           },

          /*{
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
            width: 60
          }*/
        ],
		url: {
          list: "/dklshcmmon/dklsh/list",
          queryNhxqOne: "/dklsh/vKhxxglJzyxDklsh/queryNhxqOne",
          delete: "/dklshcmmon/dklsh/delete",
          deleteBatch: "/dklshcmmon/dklsh/deleteBatch",
          exportXlsUrl: "dklshcmmon/dklsh/exportXls",
           init:"/dklshcmmon/dklsh/extract",
          //importExcelUrl: "dklsh/vKhxxglJzyxDklsh/importExcel",
          //exportTemplateUrl:"/dklsh/vKhxxglJzyxDklsh/exportTemplateXls",
    },
        exportTemplateName: '贷款流失户导入模板'

    }
  },

    created() {
      this.isAll = store.getters.isRoot;
      this.sszh = store.getters.userInfo.orgCode;
      getAction('/yxdyglmain/yxdyglMain/getWgxxTreeDateBySskhjl', {wgxz: '6', wgxzType: '2'}).then(res => {
        if (res.success) {
          this.sswgTreeDateoptions = res.result
        }
      })
    },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      /*searchReset() {
        this.queryParam = {hjsszh:undefined};
        if(!store.getters.isRoot) {
          this.queryParam.hjsszh = store.getters.orgCode
        }
        this.loadData(1);
      },*/
      handlepjsxjdmxEdit(record){
        var params={zjhm:record.identNo};
        getAction(this.url.queryNhxqOne, params).then((res) => {
          if (res.success) {
            if(res.result.zjhm){
              this.$refs.modalForm.edit(res.result)
              this.$refs.modalForm.title = '编辑'
              this.$refs.modalForm.disableSubmit = false
            }else{
              this.$message.error("农户信息中暂无该客户信息！")
            }
          } else {
            this.$message.error(res.message)

          }
        })
      },

      loadData (arg) {
        if (!this.url.list) {
          this.$message.error('请设置url.list属性!')
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1
        }
        var params = this.getQueryParams()//查询条件
        console.log('ysszh')
        console.log(params.zzbz)
        console.log('hjsszh')
        console.log(params.hjsszh)

        console.log(this.isAll)
        console.log(this.sszh)
        if(!this.isAll){
          if (params.zzbz!=this.sszh&&params.hjsszh!=this.sszh) {
            this.$message.error('原支行和户籍所属支行必须有一个是本支行,请重新选择支行条件！')
            return
          }
        }

        console.info(params)
        this.loading = true
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records
            this.ipagination.total = res.result.total
            this.loading = false
          } else {
            this.dataSource = []
            this.ipagination.total = 0
            this.loading = false
          }
          if (res.code === 510) {
            this.$message.warning(res.message,5)
            this.loading = false
          }
          this.loading = false
        })
      },
      initData() {
        this.initflag=true;
        putAction(this.url.init).then((res) => {
          if(res.success){
            this.initflag=false;
            this.loadData();
            this.$message.success(res.message);
          }else{
            this.initflag=false;
            this.$message.warning(res.message,5);
          }
          this.loading = false;
          this.initflag=false;

        })
      },
      modalFormOk(){
        this.$message.success("操作成功！")

      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>