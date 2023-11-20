<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="原支行">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.ysszh"
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
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
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
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="是否走访">
              <j-dict-select-tag v-model="queryParam.sfzf" placeholder="请选择是否走访" dictCode="sfbz"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">

            <a-form-item label="建议授信额度">
              <a-input-number placeholder="Minimum" v-model="queryParam.jysxed_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.jysxed_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="走访人员">
              <j-input placeholder="请输入走访人员" v-model="queryParam.zfry"></j-input>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'VKhxxglJzyxDklsh:add'">新增</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('贷款流失户')" v-has="'VKhxxglJzyxDklsh:exp'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'VKhxxglJzyxDklsh:imp'">导入</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
<!--        <a-menu slot="overlay">
          <a-menu-item key="1"  @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>-->
        <a-button style="margin-left: 8px" icon="delete" v-has="'dklsh:delete'"  @click="batchDel">删除</a-button>

<!--        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
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
    <!-- table区域-end -->
    <excel-import ref="excelImportModal" @ok="importComplete"/>

    <!-- 表单区域 -->
    <vKhxxglJzyxDklsh-modal ref="modalForm" @ok="modalFormOk"></vKhxxglJzyxDklsh-modal>
<!--    <nhjbxxx-xq-modal ref="NhjbxxxXqModal" />-->
    <nhxq-modal ref="modalForm" @ok="modalFormOk"></nhxq-modal>
  </a-card>
</template>

<script>
  import VKhxxglJzyxDklshModal from './modules/VKhxxglJzyxDklshModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@comp/common/ExcelImport'
  import NhjbxxxXqModal from '@views/cmms/khxxgl/khflgl/nhxq/modules/NhjbxxxXqModal'
  import NhxqModal from '@views/cmms/khxxgl/khflgl/nhxq/modules//NhxqModal'
  import { getAction } from '@/api/manage'
  import store from '@/store/'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JInput from '../../../components/jeecg/JInput'

  export default {
    name: "VKhxxglJzyxDklshList",
    mixins:[JeecgListMixin],
    components: {
      JInput,
      VKhxxglJzyxDklshModal,ExcelImport,NhjbxxxXqModal,NhxqModal,JTreeSelect
    },
    data () {
      return {
        isAll: false,
        sszh: '',
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
            dataIndex: 'ysszh_dictText'
           },


          {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc',
            scopedSlots: { customRender: 'detail' }
          },

		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
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
            dataIndex: 'ydbfs'
           },
		   {
            title: '借款原因',
            align:"center",
            dataIndex: 'jkyy'
           },
		   {
            title: '原客户经理',
            align:"center",
            dataIndex: 'ykhjl_dictText'
           },
		   {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText'
           },
		   {
            title: '是否走访',
            align:"center",
            dataIndex: 'sfzf_dictText'
           },
		   {
            title: '是否有效走访',
            align:"center",
            dataIndex: 'sfyxzf_dictText'
           },
		   {
            title: '走访人员',
            align:"center",
            dataIndex: 'zfry'
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
		   {
            title: '不予授信情形',
            align:"center",
            dataIndex: 'bysxqx_dictText'
           },
		   {
            title: '建议授信额度',
            align:"center",
            dataIndex: 'jysxed'
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
          list: "/dklsh/vKhxxglJzyxDklsh/list",
          queryNhxqOne: "/dklsh/vKhxxglJzyxDklsh/queryNhxqOne",
          delete: "/dklsh/vKhxxglJzyxDklsh/delete",
          deleteBatch: "/dklsh/vKhxxglJzyxDklsh/deleteBatch",
          exportXlsUrl: "dklsh/vKhxxglJzyxDklsh/exportXls",
          importExcelUrl: "dklsh/vKhxxglJzyxDklsh/importExcel",
          exportTemplateUrl:"/dklsh/vKhxxglJzyxDklsh/exportTemplateXls",
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
        var params={zjhm:record.zjhm};
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
            this.$message.error("操作失败，请联系管理员！")

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
        console.log(params.ysszh)
        console.log('hjsszh')
        console.log(params.hjsszh)

        console.log(this.isAll)
        console.log(this.sszh)
        if(!this.isAll){
          if (params.ysszh!=this.sszh&&params.hjsszh!=this.sszh) {
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
      modalFormOk(){
        this.$message.success("操作成功！")

      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>