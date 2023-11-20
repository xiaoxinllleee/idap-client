<template>
  <a-card class="card" :bordered="false">
    <!-- 图表区域 -->
    <div class="page-header-index-wide">
      <!--<a-row><p>( 图表数据以最新客户等级数据为准! )</p></a-row>-->
      <a-row :gutter="24">
        <a-col :lg="8" :style="{ marginBottom: '10px'}">
          <a-card :loading="loading" :bordered="true" :body-style="{ padding: '0' }" style="border: 1px dashed #E8E8E8; border-radius: 5px;">
            <qh-echarts-y ref="qhEchartsY"></qh-echarts-y>
          </a-card>
        </a-col>
        <a-col :lg="8" :style="{ marginBottom: '10px'}">
          <a-card :loading="loading" :bordered="true" :body-style="{ padding: '0' }" style="border: 1px dashed #E8E8E8; border-radius: 5px;">
            <qh-echarts-q ref="qhEchartsQ"></qh-echarts-q>
          </a-card>
        </a-col>
        <a-col :lg="8" :style="{ marginBottom: '10px'}">
          <a-card :loading="loading" :bordered="true" :body-style="{ padding: '0' }" style="border: 1px dashed #E8E8E8; border-radius: 5px;">
            <qh-echarts-m ref="qhEchartsM"></qh-echarts-m>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <!-- 图表区域 -->

    <!--查询区域-->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8"><a-form-item label="统计维度">
            <a-select placeholder="请选择统计维度" v-model="queryParam.tjwd" @change="changeTjwd">
              <a-select-option value="">请选择统计维度</a-select-option>
              <a-select-option value="MM">月</a-select-option>
              <a-select-option value="Q">季</a-select-option>
              <a-select-option value="YYYY">年</a-select-option>
            </a-select>
          </a-form-item></a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="统计月份" v-if="tjwdM">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjrq" @change="selectValue" style="width: 100%;"/>
            </a-form-item>
            <a-form-item label="统计季度" v-if="tjwdQ">
              <a-select placeholder="所属年份" v-model="ssnf" :defaultValue="defaultYear" @change="selectValue" style="width: 35%;">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
              <a-select placeholder="统计季度" v-model="tjjd" @change="selectValue" style="width: 65%;">
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
          <a-col :md="6" :sm="8"><a-form-item label="客户等级">
            <j-dict-select-tag placeholder="请选择客户等级" v-model="queryParam.khdj" dict-code="KHDJ_KHDJSZ,DJMC,DJBH" :show-search="true"/>
          </a-form-item></a-col>
        </a-row>
      </a-form>
    </div>
    <!--查询区域-->

    <!--操作按钮区域-->
    <div class="table-operator">
      <a-button  @click="extractData()" icon="cloud-download" v-has="'Khjbfctj:tj'">统计</a-button>
      <!--<a-button type="primary" @click="handleExportXls('客户等级分层统计：全行')" icon="download" style="margin-left: 8px;">导出</a-button>-->
      <a-button type="primary" @click="searchQuery" icon="search" style="margin-left: 8px;">查询</a-button>
      <a-button  @click="searchReset" icon="reload" style="margin-left: 8px;">重置</a-button>
      <a-button  @click="queryEchart" icon="reload" style="margin-left: 8px;">图表刷新</a-button>
    </div>
    <!--操作按钮区域-->

    <!--TABLE区域-->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600;">{{ selectedRowKeys.length }}</a> 项
        <a style="margin-left: 25px;" @click="onClearSelected">清空</a>
      </div>
      <a-table bordered
               ref="table"
               size="middle"
               :columns="columns"
               :loading="loading"
               :dataSource="dataSource"
               :pagination="ipagination"
               @change="handleTableChange"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"/>
    </div>
    <!--TABLE区域-->
  </a-card>
</template>

<script>
  import moment from "moment"
  import JTreeSelect from '../../../../components/jeecg/JTreeSelect'
  import { filterObj } from '../../../../utils/util'
  import { getAction, putAction } from '../../../../api/manage'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import qhEchartsM from './qhfc/qhEchartsM'
  import qhEchartsQ from './qhfc/qhEchartsQ'
  import qhEchartsY from './qhfc/qhEchartsY'

  export default {
    name: "KhjbfctjQhModal",
    mixins:[JeecgListMixin],
    components: {
      moment,
      JTreeSelect,
      qhEchartsM,
      qhEchartsQ,
      qhEchartsY,
    },
    data () {
      return {
        description: '客户级别分层统计(全行)',
        khdj: '',
        queryParam: {tjwd: 'MM'},
        tjwdM: null,
        tjwdQ: null,
        tjwdY: null,
        defaultYear: '',
        ssnf: '',
        tjjd: '',
        tjnf: '',
        loading: true,
        isorter: {
          order: 'desc',
        },
        // TABLE表头
        columns: [
          {
            title: '统计维度',
            align: 'center',
            dataIndex: 'tjwd_dictText',
          },
          {
            title: '统计时间',
            align: 'center',
            dataIndex: 'tjrq',
            customRender:function (text) {
              return !text ? "" : (text.length>7?text.substr(0,7):text)
            },
            sorter: true
          },
          {
            title: '客户级别',
            align: 'center',
            dataIndex: 'khdj_dictText',
          },
          {
            title: '客户数',
            align: 'center',
            dataIndex: 'khs',
            sorter: true
          },
          {
            title: '占比(%)',
            align: 'center',
            dataIndex: 'rszb',
            sorter: true
          },
          {
            title: '存款余额(元)',
            align: 'center',
            dataIndex: 'ckye',
            sorter: true
          },
          {
            title: '贷款余额(元)',
            align: 'center',
            dataIndex: 'dkye',
            sorter: true
          },
        ],
        url: {
          list: "/khfctj/khfctjQh/list",
          exportXlsUrl: "/khfctj/khfctjQh/exportXls",
          extract: "/khfctj/khfctjQh/extract",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created() {
      this.tjwdM=true;
      this.init();
      this.queryEchart();
    },
    methods: {
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
          this.years.push({ value:((year-i)+''),label:((year-i)+'') })
        }
      },
      /** 下拉选择 */
      selectValue(value) {
        console.log('selectValue(value) => '+value)
        let val = value
        this.$emit('change', val)
      },
      /** 客户级别分层数据提取：全行 */
      extractData() {
        let tjrqStr
        let tjwdStr
        var params = this.queryParam
        if (params.tjwd==null||params.tjwd=='undefined'||params.tjwd=='') {
          this.$message.error("请选择统计维度！")
          return
        }
        if (params.tjwd=='MM') {
          if (params.tjrq==null || params.tjrq=='undefined') {
            this.$message.error("统计月份不能为空！")
            return
          } else {
            tjrqStr = moment(params.tjrq).format("YYYYMM")+"01"
          }
        } else if (params.tjwd=='Q') {
          if (this.ssnf=='' || this.tjjd=='') {
            this.$message.error("统计年份与统计季度不能为空！")
            return
          } else {
            let day = new Date(this.ssnf,this.tjjd,0)
            let dayCount = day.getDate()
            tjrqStr = this.ssnf + this.tjjd + dayCount
          }
        } else {
          if (this.tjnf=='') {
            this.$message.error("统计年份不能为空！")
            return
          } else {
            tjrqStr = this.tjnf + "1201"
          }
        }
        tjwdStr = params.tjwd
        console.log("提取 =>| TJWD："+tjwdStr+" | TJRQ："+params.tjrq+" |")
        console.log("提取 =>| 统计维度："+tjwdStr+" | 统计日期："+tjrqStr+" |")
        this.loading = true
        putAction(this.url.extract, { "tjwd": tjwdStr,"tjrq": tjrqStr }, 'put').then((res) => {
          if (res.success) {
            this.$message.success(res.message);
            this.loadData();
          } else {
            this.$message.warning(res.message,5);
          }
          this.loading = false
        })
      },
      /** queryParam格式化 */
      getQueryParams() {
        let tjwd=this.queryParam.tjwd
        let tjMoment=""
        if (tjwd) {
          if (tjwd=="MM"){
            if (this.queryParam.tjrq != null && this.queryParam.tjrq != 'undefined') {
              tjMoment=this.queryParam.tjrq.format("YYYY-MM-01")
            }
          } else if (tjwd=="Q"){
            if (this.ssnf != '' && this.tjjd != '') {
              let day = new Date(this.ssnf,this.tjjd,0)
              let dayCount = day.getDate()
              tjMoment=this.ssnf + '-' + this.tjjd + '-' + dayCount
            }
          } else {
            if (this.tjnf != '') {
              tjMoment=this.tjnf + '-12-01'
            }
          }
        }
        var param = Object.assign({}, this.queryParam, this.isorter)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize=this.ipagination.pageSize
        param.tjrq = tjMoment
        return filterObj(param)
      },
      /** 重置查询条件 */
      searchReset() {
        this.queryParam = {}
        this.ssnf = ''
        this.tjjd = ''
        this.tjnf = ''
        this.loadData(1)
      },
      /** 查询图表数据 */
      queryEchart(){
        let tjwd = this.queryParam.tjwd
        if (tjwd === 'MM') {
          this.$refs.qhEchartsM.initEchartM()
        } else if (tjwd === 'Q') {
          this.$refs.qhEchartsQ.initEchartQ()
        } else if (tjwd === 'YYYY') {
          this.$refs.qhEchartsY.initEchartY()
        }
        this.loadData()
      }
    },
  }
</script>

<style lang="less" scoped>
</style>