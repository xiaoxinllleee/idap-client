<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
          <a-form-item label="统计维度">
            <a-select placeholder="请选择统计维度" v-model="queryParam.tjwd" @change="changeTjwd">
              <a-select-option value="MM">月</a-select-option>
              <a-select-option value="Q">季</a-select-option>
              <a-select-option value="YYYY">年</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
          <a-col :md="6" :sm="8" >
            <a-form-item label="统计月份" v-if="tjwdM">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjrq" @change="selectValue" style="width: 230px;"/>
            </a-form-item>
            <a-form-item label="统计季度" v-if="tjwdQ">
              <a-select placeholder="所属年份" v-model="ssnf" :defaultValue="defaultYear" @change="selectValue" style="width: 80px;">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
              <a-select placeholder="统计季度" v-model="tjjd" @change="selectValue" style="width: 148px;">
                <a-select-option value="">请选择统计季度</a-select-option>
                <a-select-option value="01">第一季度</a-select-option>
                <a-select-option value="04">第二季度</a-select-option>
                <a-select-option value="07">第三季度</a-select-option>
                <a-select-option value="10">第四季度</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="统计年份" v-if="tjwdY">
              <a-select placeholder="请选择统计年份" v-model="tjnf" :defaultValue="defaultYear" @change="selectValue">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
         <!-- <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计日期">
              <a-date-picker v-model="queryParam.tjrq" placeholder="请选择统计日期" style="width: 100%;" :defaultValue="defaultMonthOpera" :format="monthFormat"/>
            </a-form-item>
          </a-col>-->

       <!--   <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构名称">
              <a-input placeholder="请输入机构名称" v-model="queryParam.jgdm"></a-input>
            </a-form-item>
          </a-col>-->
          <a-col :md="6" :sm="8"><a-form-item label="机构名称">
            <j-tree-select placeholder="请选择机构查询"
                           pid-field="sjywjgdm"
                           :showSearch="true"
                           treeNodeFilterProp="title"
                           v-model="queryParam.jgdm"
                           v-decorator="['jgdm', {rules: [{required: true, message: '请选择机构查询！'}]}]"
                           dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                           :tree-default-expand-all="true"/>
          </a-form-item></a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户类型">
              <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam.khlx" dict-code="khlx"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="任务">
              <a-input placeholder="请输入任务" v-model="queryParam.rw"></a-input>
            </a-form-item>
          </a-col>
         <!-- <template v-if="toggleSearchStatus">
          </template>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
             <!-- <a @click="handleToggleSearch" style="margin-left: 8px">
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'TjfxZfrwsz:add'">新增</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('走访任务设置')" v-has="'TjfxZfrwsz:exp'">导出</a-button>
   <!--   <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button icon="import">导入</a-button>
      </a-upload-->
      <a-button icon="import" @click="excelImport" v-has="'TjfxZfrwsz:imp'">导入</a-button>
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
          <a @click="handleEdit(record)" v-has="'TjfxZfrwsz:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown v-has="'TjfxZfrwsz:del'">
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
    <excel-import ref="excelImportModal" @ok="importComplete"/>
    <!-- 表单区域 -->
    <tjfxZfrwsz-modal ref="modalForm" @ok="modalFormOk"></tjfxZfrwsz-modal>
  </a-card>
</template>

<script>
  import TjfxZfrwszModal from './modules/TjfxZfrwszModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import moment from 'moment'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { getAction } from '@api/manage'
  import ExcelImport from '@/components/common/ExcelImport'
  import { filterObj } from '@/utils/util'
  import JInput from '@comp/jeecg/JInput'
  import { notification } from 'ant-design-vue'

  export default {
    name: "TjfxZfrwszList",
    mixins:[JeecgListMixin],
    components: {
      TjfxZfrwszModal,JTreeSelect,ExcelImport,moment,JInput
    },
    data () {
      return {
        description: '走访任务设置管理页面',
        monthFormat: 'YYYY-MM-DD',
        defaultMonthOpera: '',
        queryParam: {tjwd: 'MM'},
        tjwdM: null,
        tjwdQ: null,
        tjwdY: null,
        defaultYear: '',
        ssnf: '',
        tjjd: '',
        tjnf: '',
        isorter: {
          column: 'tjrq',
          order: 'desc',
        },
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
            title: '统计维度',
            align:"center",
            dataIndex: 'tjwd_dictText'
           },
		   {
            title: '统计日期',
            align:"center",
            dataIndex: 'tjrq',
            sorter: (a, b) => b.tjrq.replace(/-/g, '/') - a.tjrq.replace(/-/g, '/'),
           },
		   {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
           },
		   {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText'
           },
		   {
            title: '任务',
            align:"center",
            dataIndex: 'rw'
           },
		   {
            title: '录入标识',
            align:"center",
            dataIndex: 'lrbz_dictText'
           },
		   {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
           },
		   {
            title: '录入人',
            align:"center",
            dataIndex: 'lrr'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/zfrwsz/tjfxZfrwsz/list",
          delete: "/zfrwsz/tjfxZfrwsz/delete",
          deleteBatch: "/zfrwsz/tjfxZfrwsz/deleteBatch",
          exportXlsUrl: "zfrwsz/tjfxZfrwsz/exportXls",
          importExcelUrl: "zfrwsz/tjfxZfrwsz/importExcel",
          exportTemplateUrl: "/zfrwsz/tjfxZfrwsz/exportTemplateXls",
       },
        exportTemplateName: '走访任务设置导入模板'
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created() {
      this.init()
      this.tjwdM=true
      //this.getCurrentMonth()
    },
    methods: {
     /* getCurrentMonth() {
        let curDate = new Date();
        this.defaultMonthOpera = moment(curDate, this.monthFormat);
        this.queryParam = {tjrq: undefined};
        this.queryParam.tjrq=this.defaultMonthOpera;
      },*/
      /** 统计维度监听 */
      changeTjwd() {
        var param = this.queryParam
        if (param.tjwd=="MM") {
          this.tjwdM=true
          this.tjwdQ=false
          this.tjwdY=false
        } else if (param.tjwd=="Q") {
          this.tjwdM=false
          this.tjwdQ=true
          this.tjwdY=false
        } else if (param.tjwd=="YYYY") {
          this.tjwdM=false
          this.tjwdQ=false
          this.tjwdY=true
        }
      },
      /** 获取当前年份 */
      init() {
        let date = new Date
        let year = date.getFullYear()
        this.initYear(year)
      },
      /** 初始化年份下拉框 */
      initYear(year) {
        this.years = []
        for(let i=0; i<30; i++) {
          this.years.push({ value:((year-i)+''),label:((year-i)+'') });
        }
      },
      /** 下拉选择 */
      selectValue(value,date) {
        console.log('selectValue(value) => '+value,date)
        let val = value
        this.$emit('change', val)
      },

      /** queryParam格式化 */
      getQueryParams() {
        let tjwd=this.queryParam.tjwd
        let tjMoment=""
        console.log("| 查询 => tjwd："+tjwd+" |")

        if (tjwd) {
          if (tjwd=="MM"){
            if (this.queryParam.tjrq != null && this.queryParam.tjrq != 'undefined') {
              tjMoment=moment(this.queryParam.tjrq).format("YYYY-MM")+'-01'
            }
          } else if (tjwd=="Q"){
            if (this.ssnf != '' && this.tjjd != '') {
              let day = new Date(this.ssnf, this.tjjd, 0)
              let dayCount = day.getDate()
                tjMoment = this.ssnf + '-' + this.tjjd + '-01'
            }


          } else {
            if (this.tjnf != '') {
              tjMoment=this.tjnf + '-01-01'
            }
          }
        }/*else {
          this.$message.error("请选择统计维度!")
          return
       /!*   notification.warning({message: '系统提示', description: '请选择统计维度！', duration: 4})
          return*!/
        }*/

        console.log("查询 =>| 统计维度："+tjwd+" | 统计日期："+tjMoment+" |")
        var param = Object.assign({}, this.queryParam, this.isorter)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize=this.ipagination.pageSize
        param.tjrq = tjMoment
        return filterObj(param)
      },
      /** 重置查询条件 */
      searchReset() {
        this.queryParam = {tjwd:'MM'}
        this.ssnf = ''
        this.tjjd = ''
        this.tjnf = ''
        this.loadData(1)
      },
      loadData(arg) {
        if (!this.url.list) {
          this.$message.error("请设置url.list属性!")
          return
        }

        var params = this.getQueryParams();//查询条件
        console.info(params)
       /* if ((params.tjrq != undefined && params.tjrq != null)) {
          params.tjrq = moment(params.tjrq).format("YYYY-MM-DD");
        }*/
        if (this.queryParam.tjwd == null || this.queryParam.tjwd === undefined) {
          notification.warning({message: '系统提示', description: '请选择统计维度！', duration: 4})
          return false
        }else {
          if (this.queryParam.tjwd=="Q") {
            if (this.ssnf == '' && this.tjjd == '') {
              notification.warning({ message: '系统提示', description: '请选择所属年份和季度！', duration: 4 })
              return false
            }
          }
        }
        this.loading = true
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          }
          this.loading = false;
        })
      },
      handleAdd: function () {
        this.$refs.modalForm.add();
        this.$refs.modalForm.title = "新增";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = false;
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>