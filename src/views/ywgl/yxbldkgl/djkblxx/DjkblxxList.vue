<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" style="width: 100%;" :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户机构">
              <j-tree-select placeholder="请选择开户机构" v-model="queryParam.branchNo" dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             treeNodeFilterProp="title" pid-field="sjywjgdm" :showSearch="true" :treeDefaultExpandAll="true">
              </j-tree-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款账号">
              <a-input placeholder="请输入贷款账号" v-model="queryParam.acctNo"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="户名">
                <j-input placeholder="模糊查询" v-model="queryParam.custName" type="likemore"></j-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="证件号码">
                <a-input placeholder="请输入证件号码" v-model="queryParam.identNo"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="借款日期">
                <date-picker placeholder="请选择借款日期" v-model="queryParam.qxDate" style="width: 100%"></date-picker>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="到期日期">
                <date-picker placeholder="请选择到期日期" v-model="queryParam.endDate" style="width: 100%"></date-picker>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="贷款期限">
                <j-dict-select-tag placeholder="请选择贷款期限" v-model="queryParam.dkqx" dict-code="yxbldkqx"></j-dict-select-tag>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="贷款形态">
                <j-dict-select-tag placeholder="请选择贷款形态" v-model="queryParam.fiveClassType" dict-code="wjflbz"></j-dict-select-tag>
              </a-form-item>
            </a-col>
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
      <a-button @click="handleExtraction" type="primary" icon="plus" v-has="'djkblxx:extraction'">数据抽取</a-button>
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('贷记卡不良信息')" v-has="'djkblxx:exportXls'">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel" v-has="'djkblxx:import'">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table ref="table"
               size="small"
               bordered
               :rowKey="rowKey"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               @change="handleTableChange">

        <span slot="dkqx" slot-scope="dkqx">
          <a-tag :key="dkqx" :color="dkqx==='短期贷款'?'#FB6241':dkqx==='中期贷款'?'#4FB2E9':dkqx==='长期贷款'?'#8A2BE2':'grey'">
            {{ dkqx }}
          </a-tag>
        </span>
        <span slot="fiveClassType" slot-scope="fiveClassType">
          <a-tag :key="fiveClassType"
                 :color="fiveClassType==='正常'?'#24C780':fiveClassType==='关注'?'#108EE9':fiveClassType==='次级'?'#8A2BE2':fiveClassType==='可疑'?'#002140':fiveClassType==='损失'?'#FFA500':'grey'">
            {{ fiveClassType }}
          </a-tag>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <djkblxx-modal ref="modalForm" @ok="modalFormOk"></djkblxx-modal>
  </a-card>
</template>

<script>
  import DjkblxxModal from './modules/DjkblxxModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JEllipsis from "@/components/jeecg/JEllipsis";
  import JTreeSelect from "@/components/jeecg/JTreeSelect";
  import JInput from "@/components/jeecg/JInput";
  import {downFile, getAction, postAction} from "@/api/manage";
  import notification from 'ant-design-vue/es/notification'
  import moment from "moment";
  import {filterObj} from "@/utils/util";

  export default {
    name: "DjkblxxList",
    mixins:[JeecgListMixin],
    components: {
      JEllipsis,JTreeSelect,JInput,
      DjkblxxModal
    },
    data () {
      return {
        description: '贷记卡不良信息管理页面',
        monthFormat: 'YYYY-MM',
        // 表头
        columns: [
          {
            title: '统计月份',
            align: "center",
            dataIndex: 'tjyf',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            }
          },
          {
            title: '开户机构号',
            align:"center",
            dataIndex: 'branchNo'
          },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'branchNo_dictText'
          },
          {
            title: '户名',
            align:"center",
            dataIndex: 'custName'
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'identNo'
          },
          {
            title: '贷款账号',
            align:"center",
            dataIndex: 'acctNo'
          },
          {
            title: '借款日期',
            align:"center",
            dataIndex: 'qxDate'
          },
          {
            title: '到期日期',
            align:"center",
            dataIndex: 'endDate'
          },
          {
            title: '贷款期限',
            align:"center",
            dataIndex: 'dkqx_dictText',
            scopedSlots: { customRender: 'dkqx' },
          },
          {
            title: '剩余天数',
            align:"center",
            dataIndex: 'syts'
          },
          {
            title: '贷款余额(元)',
            align:"center",
            dataIndex: 'currBal',
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '贷款形态',
            align:"center",
            dataIndex: 'fiveClassType_dictText',
            scopedSlots: { customRender: 'fiveClassType' },
          },
          /*{
            title: '录入标识',
            align:"center",
            dataIndex: 'lrbz_dictText'
          },
          {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr'
          },*/
          {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
          },
          /*{
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
        url: {
          list: "/yxbldkgl/djkblxx/list",
          Extraction: "/yxbldkgl/djkblxx/extraction",
          exportXlsUrl: "yxbldkgl/djkblxx/exportXls",
          importExcelUrl: "yxbldkgl/djkblxx/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created() {
      this.getCurrentMonth()
    },
    methods: {
      moment,

      getCurrentMonth() {
        this.queryParam = {
          tjyf: undefined
        }
        this.queryParam.tjyf = moment(this.getCurrentDataFront()).format(this.monthFormat)
        console.info('默认统计月份:',this.queryParam.tjyf)
      },

      getCurrentDataFront () {
        var date = new Date()
        date.setDate(1)
        var month = parseInt(date.getMonth() + 1)
        var day = date.getDate()
        if (month < 10) {
          month = '0' + month
        }
        if (day < 10) {
          day = '0' + day
        }
        const time = date.getFullYear() + '-' + month + '-' + day
        return time
      },

      loadData(arg) {
        if (!this.url.list) {
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();
        if (params.tjyf !== undefined && params.tjyf !== null && params.tjyf !== '') {
          params.tjyf = moment(params.tjyf).format('YYYY-MM') + '-01'
        }
        console.info(params)
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
            this.loading = false;
          } else {
            this.dataSource = [];
            this.ipagination.total = 0;
            this.loading = false;
          }
          if (res.code === 510) {
            this.$message.warning(res.message,5)
            this.loading = false;
          }
          this.loading = false;
        })
      },

      getQueryParams() {
        let tjyfMoment = '';
        if (this.queryParam.tjyf) {
          tjyfMoment = moment(this.queryParam.tjyf).format("YYYY-MM")+"-01";
        }
        var param      = Object.assign({},this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf = tjyfMoment;
        }
        return filterObj(param);
      },

      searchReset() {
        this.queryParam = {
          tjyf: undefined
        }
        this.getCurrentMonth()
        this.loadData(1)
      },

      handleExportXls(fileName) {
        if (!fileName || typeof fileName != 'string') {
          fileName = '导出文件'
        }
        let param = Object.assign({}, this.queryParam)
        let tjyf = ''
        if (param.tjyf !== undefined && param.tjyf !== null && param.tjyf !== '') {
          tjyf = moment(param.tjyf).format("YYYY-MM") + '-01'
        }
        param.tjyf = tjyf;
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(",")
        }
        param.paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
        console.log('下载参数:', param)
        downFile(this.url.exportXlsUrl, param).then((data) => {
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          console.log('handleExportXls data:', data)
          var blob = new Blob([data]);
          if ('msSaveOrOpenBlob' in navigator) {
            window.navigator.msSaveOrOpenBlob(blob, fileName + '.xls');
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = fileName + '.xls';
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
        })
      },

      handleExtraction() {
        var params = this.getQueryParams();
        if (!params.tjyf) {
          notification.warning({message: '系统提示', description: '请选择统计月份！', duration: 4})
          return
        }
        this.loading = true
        postAction(this.url.Extraction,{}).then((res) => {
          if (res.success) {
            notification.success({message: '系统提示', description: '提取成功！', duration: 4})
          } else {
            notification.warning({message: '系统提示', description: '提取失败！[INFO] '+res.message, duration: 4})
          }
        }).catch((error) => {
          notification.error({message: '系统提示', description: '提取失败！[ERROR] '+error, duration: 4})
        }).finally(() => {
          this.loading = false
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>
