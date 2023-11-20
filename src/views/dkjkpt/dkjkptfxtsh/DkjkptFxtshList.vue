<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请输入统计月份" v-model="queryParam.tjyf" style="width: 100%;"
                              :defaultValue="defaultMonthOpera" :format="monthFormat" />

            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构名称">
              <j-tree-select placeholder="请选择机构查询"
                             pid-field="sjywjgdm"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.jgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            <!--  <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>-->
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleExtract" icon="area-chart" v-has="'fxtsh:extract'">统计</a-button>
<!--      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('风险提示函')">导出</a-button>-->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
    <!--  <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="exportExportFxtsjhXls('风险提示函',record)">导出风险提示函</a>

         <!-- <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dkjkptFxtsh-modal ref="modalForm" @ok="modalFormOk"></dkjkptFxtsh-modal>
  </a-card>
</template>

<script>
  import DkjkptFxtshModal from './modules/DkjkptFxtshModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import DkjkptFmkModal from '@views/dkjkpt/dkjkptfmk/modules/DkjkptFmkModal'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import ExcelImport from '@comp/common/ExcelImport'
  import { downFile, getAction, putAction } from '@api/manage'
  import moment from 'moment'
  import { filterObj } from '@/utils/util'

  export default {
    name: "DkjkptFxtshList",
    mixins:[JeecgListMixin],
    components: {
      DkjkptFxtshModal,JTreeSelect,ExcelImport
    },
    data () {
      return {
        description: '风险提示函管理页面',
        // 表头
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: '',
        columns: [
          {
            title: '统计月份',
            align: "center",
            dataIndex: 'tjyf',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            },
            sorter: true,
            width: '100',
          },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
          },
		   {
            title: '各项存款',
            align:"center",
            dataIndex: 'gxck'
           },
		   {
            title: '各项贷款',
            align:"center",
            dataIndex: 'gxdk'
           },
		   {
            title: '不良贷款',
            align:"center",
            dataIndex: 'bldk'
           },
		   {
            title: '新增不良贷款笔数',
            align:"center",
            dataIndex: 'xzbldkbs'
           },
		   {
            title: '新增不良贷款余额',
            align:"center",
            dataIndex: 'xzbldkye'
           },
		   {
            title: '逾期贷款余额',
            align:"center",
            dataIndex: 'yqdkye'
           },
		   {
            title: '新增逾期贷款笔数',
            align:"center",
            dataIndex: 'xzyqdkbs'
           },
		   {
            title: '新增逾期贷款余额',
            align:"center",
            dataIndex: 'xzyqdkye'
           },
	/*	   {
            title: '金卡逾期笔数',
            align:"center",
            dataIndex: 'jkyqbs'
           },
		   {
            title: '金卡透支金额',
            align:"center",
            dataIndex: 'jktzje'
           },
		   {
            title: '福民卡逾期笔数',
            align:"center",
            dataIndex: 'fmkyqbs'
           },
		   {
            title: '福民金卡透支金额',
            align:"center",
            dataIndex: 'fmktzje'
           },
		   {
            title: '本月至下月即将到期大额贷款',
            align:"center",
            dataIndex: 'dedk'
           },*/

          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/dkjkptfxtsh/dkjkptFxtsh/list",
          delete: "/dkjkptfxtsh/dkjkptFxtsh/delete",
          deleteBatch: "/dkjkptfxtsh/dkjkptFxtsh/deleteBatch",
          exportXlsUrl: "dkjkptfxtsh/dkjkptFxtsh/exportXls",
          importExcelUrl: "dkjkptfxtsh/dkjkptFxtsh/importExcel",
          init: "/dkjkptfxtsh/dkjkptFxtsh/init",
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
        let tjyfMoment = "";
        if(this.queryParam.tjyf) {
          tjyfMoment = moment(this.queryParam.tjyf).format("YYYY-MM")+'-01';
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf = tjyfMoment;
        }
        return filterObj(param);
      },

      handleExtract() {
        let tjyf=''
        var params = Object.assign({}, this.queryParam)
        if (params.tjyf === undefined || params.tjyf === null) {
          this.$message.warning("请选择统计月份！")
          return false
        }else {
          tjyf = moment(params.tjyf).format("YYYY-MM")+'-01'
        }
        this.loading = true
        putAction(this.url.init, {'tjyf': tjyf}).then((res) => {
          if (res.success) {
            this.$message.success("提取成功！")
            this.loadData(1)
          } else {
            this.$message.warning("提取失败！")
          }
        }).catch((error) => {
          this.$message.error(error, "提取失败！")
        }).finally(() => {
          this.loading = false
        })
      },

      exportExportFxtsjhXls(fileName,record){
        this.exportFxedLoading=true
            downFile("/dkjkptfxtsh/dkjkptFxtsh/exportExportFxedXls",record).then(data=>{
              if (!data) {
                this.$message.warning('文件下载失败')
                return
              }
              var blob = new Blob([data])
              if ('msSaveOrOpenBlob' in navigator) {
                window.navigator.msSaveOrOpenBlob(blob, fileName + '.docx')
                return
              }
              var eleLink = document.createElement('a')
              eleLink.download = fileName + '.docx'
              eleLink.style.display = 'none'
              eleLink.href = URL.createObjectURL(blob)
              document.body.appendChild(eleLink)
              eleLink.click()
              document.body.removeChild(eleLink)
              this.exportFxedLoading = false
            })
      },



    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>