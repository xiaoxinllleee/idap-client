<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8" >
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'Khfjxxgl:add'">新增</a-button>
      <a-button icon="download" @click="handleExportXls('客户附加信息管理')" v-has="'Khfjxxgl:exp'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'Khfjxxgl:imp'">导入</a-button>

<!--      <a-button @click="handleUpdateKhhmcxx" type="primary" icon="cloud-download">更新花名册数据</a-button>-->
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
        :scroll="{ x: 1600 }"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'Khfjxxgl:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.zjhm)">
                  <a v-has="'Khfjxxgl:del'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <khfjxxgl-modal ref="modalForm" @ok="modalFormOk"></khfjxxgl-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"></excel-import>

  </a-card>
</template>

<script>
  import KhfjxxglModal from './modules/KhfjxxglModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getAction, downFile } from '@/api/manage'
  import ExcelImport from '@/components/common/ExcelImport'

  export default {
    name: "KhfjxxglList",
    mixins:[JeecgListMixin],
    components: {
      KhfjxxglModal,ExcelImport
    },
    data () {
      return {
        description: '客户附加信息管理管理页面',
        exportTemplateName : '客户附加信息导入模板',

        // 表头
        columns: [
		   {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc',
            width: 100,

       },
		   {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm',
             width: 160,

       },
          {
            title: '是否吸毒',
            align:"center",
            dataIndex: 'sfxdry_dictText'
          },

          {
            title: '是否诉讼',
            align:"center",
            dataIndex: 'sfss_dictText'
          },
          {
            title: '是否涉案',
            align:"center",
            dataIndex: 'sfsa_dictText'
          },
          {
            title: '是否五保低保户',
            align:"center",
            dataIndex: 'sfdb_dictText'
          },

          {
            title: '是否特岗教师',
            align:"center",
            dataIndex: 'sftgjs_dictText'
          },

          {
            title: '是否党员',
            align:"center",
            dataIndex: 'sfdy_dictText'
          },

          {
            title: '是否公职人员',
            align:"center",
            dataIndex: 'sfgzry_dictText',

          },

          {
            title: '是否服刑人员',
            align:"center",
            dataIndex: 'sffx_dictText'
          },


          {
            title: '是否诈骗人员',
            align:"center",
            dataIndex: 'sfzpry_dictText'
          },

          {
            title: '是否重大疾病',
            align:"center",
            dataIndex: 'sfzdjb_dictText'
          },

/*
		    {
            title: '是否贫困户',
            align:"center",
            dataIndex: 'sfpkh_dictText'
           },



          {
            title: '是否非法集资',
            align:"center",
            dataIndex: 'sfffjz_dictText',

          },
		   {
            title: '是否开通信用卡',
            align:"center",
            dataIndex: 'sfktxyk_dictText'
           },
		   {
            title: '是否开通福民卡',
            align:"center",
            dataIndex: 'sfktfmk_dictText'
           },

          {
            title: '是否开通扫码付',
            align:"center",
            dataIndex: 'sfktsmf_dictText'
          },

          {
            title: '是否开通POS机',
            align:"center",
            dataIndex: 'sfktpos_dictText'
          },
          {
            title: '是否开通聚合支付',
            align:"center",
            dataIndex: 'sfktjhzf_dictText'
          },

          {
            title: '是否办理E支付',
            align:"center",
            dataIndex: 'sfblezf_dictText'
          },
          {
            title: '是否办理E缴费',
            align:"center",
            dataIndex: 'sfblejf_dictText'
          },
          {
            title: '是否办理助农终端',
            align:"center",
            dataIndex: 'sfblznzd_dictText'
          },
          {
            title: '是否办理理财业务',
            align:"center",
            dataIndex: 'sfbllcyw_dictText'
          },

          {
            title: '是否办理代理保险业务',
            align:"center",
            dataIndex: 'sfbldlbx_dictText'
          },
          {
            title: '是否关注我行公众号',
            align:"center",
            dataIndex: 'sfgzgzh_dictText'
          },
		   {
            title: '患病记录',
            align:"center",
            dataIndex: 'hbjl',
            width: 200,
           },*/
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
            width: 120,
          }
        ],
		url: {
          list: "/khgl.khhmc/khfjxxgl/list",
          delete: "/khgl.khhmc/khfjxxgl/delete",
          deleteBatch: "/khgl.khhmc/khfjxxgl/deleteBatch",
          exportXlsUrl: "khgl.khhmc/khfjxxgl/exportXls",
          importExcelUrl: "khgl.khhmc/khfjxxgl/importExcel",
          updateKhhmcxx: "khgl.khhmc/khfjxxgl/updateKhhmc",
          exportTemplateUrl: "khgl.khhmc/khfjxxgl/exportTemplateXls",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      handleUpdateKhhmcxx() {
        let params = {}
        this.loading = true;
        getAction(this.url.updateKhhmcxx, params).then((res) => {
          if (res.success) {
            this.loadData()
            this.$message.success(res.message)
          } else {
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>