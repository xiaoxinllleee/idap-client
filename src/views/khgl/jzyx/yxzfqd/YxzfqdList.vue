<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.hjsszh"
                             dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true"
                             :isAll="true"/>
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
            <a-form-item label="名单情况">
              <j-dict-select-tag v-model="queryParam.khlx" placeholder="请选择名单情况" dictCode="xtpdjg"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="走访支行">
              <j-tree-select placeholder="请选择走访支行" v-model="queryParam.zfzh"
                             dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true"
                             :isAll="true"/>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="是否走访">
              <j-dict-select-tag v-model="queryParam.sfzf" placeholder="请选择是否走访" dictCode="sfbz"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="是否有效走访">
              <j-dict-select-tag v-model="queryParam.sfyxzf" placeholder="请选择是否有效走访" dictCode="sfbz"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="优先类型">
              <j-dict-select-tag v-model="queryParam.yxlx" placeholder="请选择优先类型" dictCode="jzyx_yxlx"/>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'yxzfqd:add'">新增</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('优先走访清单')" v-has="'yxzfqd:exp'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'yxzfqd:imp'">导入</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
<!--        <a-menu slot="overlay">
          <a-menu-item key="1"  @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>-->
        <a-button style="margin-left: 8px" icon="delete" v-has="'yxzfqd:delete'"  @click="batchDel">删除</a-button>

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
          <a @click="handleEdit(record)" v-has="'yxzfqd:edit'">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a v-has="'yxzfqd:delete'">删除</a>
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
    <yxzfqd-modal ref="modalForm" @ok="modalFormOk"></yxzfqd-modal>
    <nhxq-modal ref="nhxqModalForm"></nhxq-modal>
  </a-card>
</template>

<script>
  import YxzfqdModal from './modules/YxzfqdModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@comp/common/ExcelImport'
  import NhjbxxxXqModal from '@views/cmms/khxxgl/khflgl/nhxq/modules/NhjbxxxXqModal'
  import NhxqModal from '@views/cmms/khxxgl/khflgl/nhxq/modules//NhxqModal'
  import { getAction } from '@/api/manage'
  import store from '@/store/'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JInput from '@/components/jeecg/JInput'

  export default {
    name: "YxzfqdList",
    mixins:[JeecgListMixin],
    components: {
      JInput,YxzfqdModal,ExcelImport,NhjbxxxXqModal,NhxqModal,JTreeSelect
    },
    data () {
      return {
        isAll: false,
        sszh: '',
        description: '优先走访清单管理页面',
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
            title: '一卡通账号',
            align:"center",
            dataIndex: 'yktzh'
           },
		   {
            title: '种植地址',
            align:"center",
            dataIndex: 'zzdd'
           },
		   {
            title: '租赁稻田面积',
            align:"center",
            dataIndex: 'zldtmj'
           },
		   {
            title: '补贴金额',
            align:"center",
            dataIndex: 'btje'
           },
		   {
            title: '镇办核实双季稻种植',
            align:"center",
            dataIndex: 'zbhssjdzz'
           },
		   {
            title: '优先类型',
            align:"center",
            dataIndex: 'yxlx_dictText'
           },
		   {
            title: '其他',
            align:"center",
            dataIndex: 'qt'
           },
		   {
            title: '年龄',
            align:"center",
            dataIndex: 'nl'
           },
          {
            title: '文化程度',
            align:"center",
            dataIndex: 'whcd_dictText'
          },
		   {
            title: '名单情况',
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
            title: '走访支行',
            align:"center",
            dataIndex: 'zfzh_dictText'
          },
		   {
            title: '走访人',
            align:"center",
            dataIndex: 'lrr_dictText'
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
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
            width: 100
          }
        ],
		url: {
          list: "/jzyx/vYxzfqd/list",
          delete: "/jzyx/yxzfqd/delete",
          deleteBatch: "/jzyx/yxzfqd/deleteBatch",
          exportXlsUrl: "/jzyx/vYxzfqd/exportXls",
          importExcelUrl: "/jzyx/vYxzfqd/importExcel",
          exportTemplateUrl:"/jzyx/vYxzfqd/exportTemplateXls",
    },
        exportTemplateName: '优先走访清单导入模板'

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
        getAction('/khflgl/nhxq/queryByZjhm', params).then((res) => {
          if (res.success) {
            if(res.result && res.result.zjhm){
              this.$refs.nhxqModalForm.edit(res.result)
              this.$refs.nhxqModalForm.title = '编辑'
              this.$refs.nhxqModalForm.disableSubmit = false
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
        this.loadData()
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>