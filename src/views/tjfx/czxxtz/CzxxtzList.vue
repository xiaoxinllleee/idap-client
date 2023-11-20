<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属网格">
              <a-tree-select
                :treeData=sswgTreeDateoptions
                :replaceFields=replaceFields
                v-model="queryParam.wgbh"
                :dropdownStyle="{maxHeight:'400px',overflow:'auto'}"
                showSearch
                treeNodeFilterProp="title"
              >
              </a-tree-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh"
                             dict="hr_bas_organization,zzjc,zzbz" pidField="sjzzbz" treeNodeFilterProp="title"
                             show-search :showSearch="true" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="false"/>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="户号编码">
              <a-input placeholder="请输入户号编码" v-model="queryParam.hhbm"></a-input>
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
      <a-button icon="area-chart" :loading="loadingInit" @click="init()" v-has="'Czxxtz:init'">提取</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('村组信息台账')" v-has="'Czxxtz:exp'">导出</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleDownload('导出客户画像')" v-has="'Czxxtz:download'">导出客户画像</a-button>
      <!--<a-dropdown v-if="selectedRowKeys.length > 0">-->
        <!--<a-menu slot="overlay">-->
          <!--<a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>-->
        <!--</a-menu>-->
        <!--<a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
      <!--</a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table
        ref="table"
        size="small"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'Czxxtz:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown v-has="'Czxxtz:del'">
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
    <czxxtz-modal ref="modalForm" @ok="modalFormOk"></czxxtz-modal>
  </a-card>
</template>

<script>
  import CzxxtzModal from './modules/CzxxtzModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelectNotJg from '@/components/jeecg/JTreeSelectNotJg'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { downFile, putAction, getAction } from '@/api/manage'
  import store from '@/store/'

  export default {
    name: "CzxxtzList",
    mixins:[JeecgListMixin],
    components: {
      CzxxtzModal, JTreeSelectNotJg, JTreeSelect
    },
    data () {
      return {
        description: '村组信息台账管理页面',
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
            title: '所属网格',
            align:"center",
            dataIndex: 'wgbh_dictText'
           },
          {
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh_dictText'
          },
		   {
            title: '户号编码',
            align:"center",
            dataIndex: 'hhbm'
           },
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
           },
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
            title: '联系方式',
            align:"center",
            dataIndex: 'sjhm'
           },
		   {
            title: '定期存款余额',
            align:"center",
            dataIndex: 'dqckye'
           },
		   {
            title: '活期存款余额',
            align:"center",
            dataIndex: 'hqckye'
           },
		   {
            title: '贷款余额',
            align:"center",
            dataIndex: 'dkye'
           },
		   {
            title: '表外贷款余额',
            align:"center",
            dataIndex: 'bwbldkye'
           },
		   {
            title: '便民卡卡号',
            align:"center",
            dataIndex: 'bmkkh'
           },
		   {
            title: '便民卡余额',
            align:"center",
            dataIndex: 'bmkye'
           },
		   {
            title: '按揭贷款余额',
            align:"center",
            dataIndex: 'ajdkye'
           },
		   {
            title: '是否符合行内白名单',
            align:"center",
            dataIndex: 'hnbmd_dictText'
           },
		   {
            title: '是否符合村组白名单',
            align:"center",
            dataIndex: 'czbmd_dictText'
           },
		   {
            title: '村组授信金额',
            align:"center",
            dataIndex: 'jysxed'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'bz'
           },
          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   align:"center",
          //   scopedSlots: { customRender: 'action' },
          // }
        ],
		url: {
          list: "/tjfx/czxxtz/list",
          delete: "/tjfx/czxxtz/delete",
          deleteBatch: "/tjfx/czxxtz/deleteBatch",
          exportXlsUrl: "tjfx/czxxtz/exportXls",
          importExcelUrl: "tjfx/czxxtz/importExcel",
       },
        loadingInit: false
    }
  },
    created() {
      getAction('/yxdyglmain/yxdyglMain/getWgxxTreeDateBySskhjl', {wgxz: '6,8', wgxzType: '2'}).then(res => {
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
      searchReset() {
        this.queryParam = {sszh: undefined};
        if(!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.loadData(1);
      },
      handleDownload() {
        if (!this.queryParam.wgbh) {
          this.$message.warning("请选择所属网格")
          return false
        }
        this.exportLoading = true;
        let fileName = "客户画像报告"
        let param = {wgbh: this.queryParam.wgbh};
        console.log("导出参数",param)
        downFile('/tjfx/khhxXzc/download',param).then((data)=>{
          console.log('downFile', data)
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          let type = data.type
          //如果返回的json，说明失败
          if("application/json" == type) {
            let that = this
            let reader = new FileReader();
            reader.readAsText(data)
            reader.onload = function(result) {
              let resultData = JSON.parse(result.target.result)
              that.$message.error(resultData.message)
            }
          } else {
            var blob = new Blob([data]);
            if('msSaveOrOpenBlob' in navigator){
              window.navigator.msSaveOrOpenBlob(blob, fileName+'.docx');
              return;
            }
            var eleLink = document.createElement('a');
            eleLink.download = fileName+'.docx';
            eleLink.style.display = 'none'
            eleLink.href = URL.createObjectURL(blob);
            document.body.appendChild(eleLink);
            eleLink.click();
            document.body.removeChild(eleLink);
          }
        }).finally(()=>{
          this.exportLoading = false
        })
      },
      init() {
        this.loadingInit = true
        putAction('/tjfx/khhxXzc/extract', {}).then((res) => {
          if (res.success) {
            this.$message.success("提取成功")
          } else {
            this.$message.warning("提取失败")
          }
        }).catch((error) => {
          this.$message.error("提取失败", error)
        }).finally(() => {
          this.loadingInit = false
        })
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>