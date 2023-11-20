<template>
  <a-card class="card" :bordered="false">
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

          <a-col :md="6" :sm="8"><a-form-item label="所属支行">
            <j-tree-select placeholder="请选择所属支行" v-model="queryParam.zzbz" dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" :showSearch="true" pidField="sjzzbz"/>
          </a-form-item></a-col>

          <a-col :md="6" :sm="8"><a-form-item label="客户级别">
            <j-dict-select-tag placeholder="请选择客户级别" v-model="queryParam.khdj" dict-code="KHDJ_KHDJSZ,DJMC,DJBH" :show-search="true"/>
          </a-form-item></a-col>
        </a-row>
      </a-form>
    </div>
    <!--查询区域-->

    <!--操作按钮区域-->
    <div class="table-operator">
      <a-button type="primary" @click="extractData()" icon="cloud-download">统计</a-button>
      <a-button type="primary" @click="handleExportXls('客户等级分层统计：支行')" icon="download" style="margin-left: 8px;">导出</a-button>
      <a-button type="primary" @click="searchQuery" icon="search" style="margin-left: 8px;">查询</a-button>
      <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px;">重置</a-button>
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
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import moment from "moment"
  import { putAction } from '../../../../api/manage'
  import { filterObj } from '../../../../utils/util'
  import JTreeSelect from '../../../../components/jeecg/JTreeSelect'

  export default {
    name: "KhjbfctjZhModal",
    mixins:[JeecgListMixin],
    components: { JTreeSelect, moment, },
    data () {
      return {
        description: '客户级别分层统计(支行)',
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
          column: 'tjrq',
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
            title: '统计日期',
            align: 'center',
            dataIndex: 'tjrq',
            sorter: (a, b) => b.tjrq.replace(/-/g, '/') - a.tjrq.replace(/-/g, '/'),
          },
          {
            title: '所属支行',
            align: 'center',
            dataIndex: 'jgdm_dictText',
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
          },
          {
            title: '总人数',
            align: 'center',
            dataIndex: 'zrs',
          },
          {
            title: '占比(%)',
            align: 'center',
            dataIndex: 'rszb',
          },
          {
            title: '存款余额(元)',
            align: 'center',
            dataIndex: 'ckye',
          },
          {
            title: '贷款余额(元)',
            align: 'center',
            dataIndex: 'dkye',
          },
        ],
        url: {
          list: "/khfctj/KhjbfctjZh/list",
          exportXlsUrl: "/khfctj/KhjbfctjZh/exportXls",
          extract: "/khfctj/KhjbfctjZh/extract",
        },
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
      /** 客户级别分层数据提取：支行 */
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
        putAction(this.url.extract, { "tjwd": tjwdStr,"tjrq": tjrqStr }, 'put').then((res) => {
          if (res.success) {
            this.$message.success(res.message);
            this.loadData();
          } else {
            this.$message.warning(res.message,5);
          }
        })
      },
      /** queryParam格式化 */
      getQueryParams() {
        let tjwd=this.queryParam.tjwd
        let tjMoment=""
        console.log("| 查询 => tjwd："+tjwd+" |")
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
        this.queryParam = {}
        this.ssnf = ''
        this.tjjd = ''
        this.tjnf = ''
        this.loadData(1)
      },
    },
  }
</script>

<style lang="less" scoped>
</style>