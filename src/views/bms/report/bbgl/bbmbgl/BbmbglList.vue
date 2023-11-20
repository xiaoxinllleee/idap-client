<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="报表编号">
              <a-input placeholder="请输入报表编号" v-model="queryParam.bbbh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="报表名称">
              <j-input placeholder="请输入报表名称" v-model="queryParam.bbmc"></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="报表类型">
              <j-dict-select-tag  v-model="queryParam.bblx" placeholder="请选择报表类型"
                                  dictCode="rep_bblx"/>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="是否启用">
              <j-dict-select-tag  v-model="queryParam.sfqy" placeholder="请选择是否启用"
                                  dictCode="sfbz"/>
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
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button icon="download" @click="handleExportXls('报表模板管理')">导出</a-button>
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
          <a @click="handleQsgzEdit(record)">取数规则</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="downloadTemplate(record)">下载模板文件</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="getHistoryList(record)">查看历史版本</a>
              </a-menu-item>
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
    <bbmbgl-modal ref="modalForm" @ok="modalFormOk"></bbmbgl-modal>
    <bbmbgl-qsgz-modal ref="qsgzModalForm" />
    <bbmbgl-ls-modal ref="bbmbglLsModal" />
  </a-card>
</template>

<script>
  import BbmbglModal from './modules/BbmbglModal'
  import BbmbglQsgzModal from './modules/BbmbglQsgzModal'
  import BbmbglLsModal from './modules/BbmbglLsModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { downFile } from '@/api/manage'
  import JInput from "@/components/jeecg/JInput"

  export default {
    name: "BbmbglList",
    mixins:[JeecgListMixin],
    components: {
      BbmbglModal, BbmbglQsgzModal, BbmbglLsModal, JInput
    },
    data () {
      return {
        description: '报表模板管理管理页面',
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
            title: '报表编号',
            align:"center",
            dataIndex: 'bbbh'
           },
		   {
            title: '报表名称',
            align:"center",
            dataIndex: 'bbmc'
           },
		   {
            title: '报表类型',
            align:"center",
            dataIndex: 'bblx_dictText'
           },
          {
            title: '时间类型',
            align:"center",
            dataIndex: 'sjlx_dictText'
          },
          {
            title: '是否启用',
            align:"center",
            dataIndex: 'sfqy_dictText'
          },
		   {
            title: '报表顺序',
            align:"center",
            dataIndex: 'bbsx'
           },
		   {
            title: '版本号',
            align:"center",
            dataIndex: 'bbh'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/bbgl/bbmbgl/list",
          delete: "/bbgl/bbmbgl/delete",
          deleteBatch: "/bbgl/bbmbgl/deleteBatch",
          exportXlsUrl: "bbgl/bbmbgl/exportXls",
          importExcelUrl: "bbgl/bbmbgl/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      handleQsgzEdit: function (record) {
        this.$refs.qsgzModalForm.edit(record);
        this.$refs.qsgzModalForm.title = "编辑";
        this.$refs.qsgzModalForm.disableSubmit = false;
      },
      downloadTemplate(row){
        console.log('downloadTemplate', row)
        let fileName = row.wjmc
        downFile('/sys/common/download/' + row.bblj, {}).then((data)=>{
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          var blob = new Blob([data]);
          if('msSaveOrOpenBlob' in navigator){
            window.navigator.msSaveOrOpenBlob(blob, fileName);
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = fileName;
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
          this.exportLoading=false
        })
      },
      getHistoryList(record) {
        this.$refs['bbmbglLsModal'].view(record)
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>