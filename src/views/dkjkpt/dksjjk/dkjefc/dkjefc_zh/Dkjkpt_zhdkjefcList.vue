<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" style="width: 100%;"
                              :defaultValue="defaultMonthOpera" :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.jgdm"
                             dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ywjgdm" pidField="sjywjgdm" treeNodeFilterProp="title"
                             :jgdm="true" :showSearch="true" :treeDefaultExpandAll="true" :filterTreeNode="true"
                             :isAll="isAll"/>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
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
      <a-button @click="handleInit" icon="area-chart" v-has="'dkjefc_zh:InitDataToQh'">提取</a-button>
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('贷款金额分层_支行')" v-has="'dkjefc_zh:exportTemplateXls'">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>


      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{ x: 2400 }"
        @change="handleTableChange">

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import moment from 'moment'
  import { filterObj } from '@/utils/util'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { getAction, putAction, httpAction, downFile } from '@/api/manage'
  import { mapGetters } from 'vuex'
  import store from '@/store/'

  export default {
    name: 'Dkjkpt_zhdkjefcList',
    mixins: [JeecgListMixin],
    components: {
      JTreeSelect
    },
    data() {
      return {
        description: '贷款金额分层_支行管理页面',
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: undefined,
        // 重置标识
        flag: true,
        isorter: {
          order: 'desc'
        },
        // 表头
        isAll: false,
        sszh: '',
        // 表头
        columns: [
          {
            title: '统计月份',
            align: 'center',
            dataIndex: 'tjyf',
            customRender: function(text) {
              return !text ? '' : (text.length > 7 ? text.substr(0, 7) : text)
            },
            sorter: (a, b) => b.tjyf.replace(/-/g, '/') - a.tjyf.replace(/-/g, '/')
          },
          {
            title: '所属支行',
            align: 'center',
            dataIndex: 'jgdm_dictText',
            scopedSlots: { customRender: 'detail' },
            sorter: true
          },
          {
            title: '贷款总余额',
            align: 'center',
            dataIndex: 'dkzye',
            sorter: true,
          },
          {
            title: '贷款总户数',
            align: 'center',
            dataIndex: 'dkzhs',
            sorter: true,
          },
          {
            title: '50W-100W以下',
            children: [
              {
                title: '余额',
                align: 'center',
                dataIndex: 'wwzybye'
              },
              {
                title: '户数',
                align: 'center',
                dataIndex: 'wwzybhs'
              },
              {
                title: '比上月户数',
                align: 'center',
                dataIndex: 'wwzybbsyhs'
              },
            ]
          },
          {
            title: '100W-300W含以下',
            children: [
              {
                title: '余额',
                align: 'center',
                dataIndex: 'ybzsbye'
              },
              {
                title: '户数',
                align: 'center',
                dataIndex: 'ybzsbhs'
              },
              {
                title: '比上月户数',
                align: 'center',
                dataIndex: 'ybzsbbsyhs'
              },
            ]
          },
          {
            title: '300W-500W含以下',
            children: [
              {
                title: '余额',
                align: 'center',
                dataIndex: 'sbzwbye'
              },
              {
                title: '户数',
                align: 'center',
                dataIndex: 'sbzwbhs'
              },
              {
                title: '比上月户数',
                align: 'center',
                dataIndex: 'sbzwbbsyhs'
              },
            ]
          },
          {
            title: '500W-1000W含以下',
            children: [
              {
                title: '余额',
                align: 'center',
                dataIndex: 'wbzyqye'
              },
              {
                title: '户数',
                align: 'center',
                dataIndex: 'wbzyqhs'
              },
              {
                title: '比上月户数',
                align: 'center',
                dataIndex: 'wbzyqbsyhs'
              },
            ]
          },
          {
            title: '1000W以上',
            children: [
              {
                title: '余额',
                align: 'center',
                dataIndex: 'yqysye'
              },
              {
                title: '户数',
                align: 'center',
                dataIndex: 'yqyshs'
              },
              {
                title: '比上月户数',
                align: 'center',
                dataIndex: 'yqysbsyhs'
              },
            ]
          }
        ],
        url: {
          init: '/dkjkpt.dksjjk.dkjefc.dkjefc_zh/dkjkpt_zhdkjefc/init',
          list: '/dkjkpt.dksjjk.dkjefc.dkjefc_zh/dkjkpt_zhdkjefc/list',
          delete: '/dkjkpt.dksjjk.dkjefc.dkjefc_zh/dkjkpt_zhdkjefc/delete',
          deleteBatch: '/dkjkpt.dksjjk.dkjefc.dkjefc_zh/dkjkpt_zhdkjefc/deleteBatch',
          exportXlsUrl: 'dkjkpt.dksjjk.dkjefc.dkjefc_zh/dkjkpt_zhdkjefc/exportTemplateXls',
          importExcelUrl: 'dkjkpt.dksjjk.dkjefc.dkjefc_zh/dkjkpt_zhdkjefc/importExcel'
        }
      }
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    created() {
      this.isAll = store.getters.isRoot
      this.jgdm = store.getters.userInfo.orgCode
    },
    methods: {
      ...mapGetters(['nickname', 'avatar', 'userInfo']),
      initQueryParams() {
        if (!store.getters.isRoot) {
          //this.queryParam.jgdm = store.getters.userInfo.orgCode
        }
        this.paramsInited = true
      },
      searchReset: function() {
        this.flag = false
        this.queryParam = {tjyf: undefined}
        if (!store.getters.isRoot) {
          //this.queryParam.jgdm = store.getters.userInfo.orgCode
        }
        this.queryParam.tjyf = this.defaultMonthOpera
        this.loadData(1)
      },
      handleInit() {
        let tjyf =''
        var params = this.queryParam
        if (this.queryParam.tjyf == null || this.queryParam.tjyf == undefined) {
          tjyf = moment(this.defaultMonthOpera).format("YYYY-MM") + '-01'
        }else {
          tjyf = moment(params.tjyf).format("YYYY-MM") + '-01'
        }
        params = {
          tjyf: moment(this.queryParam.tjyf).format("YYYY-MM") + '-01'
        }
        this.loading = true
        putAction(this.url.init, params).then((res) => {
          console.log(res)
          if (res.success) {
            this.$message.success("提取成功！")
            this.loadData()
          } else {
            this.$message.warning("提取失败！")
          }
          this.loading = false
        })
      },
      moment,
      getCurrentMonth() {
        let curDate = new Date()
        let curMonth = { year: curDate.getFullYear(), month: curDate.getMonth() + 1 }
        this.defaultMonthOpera = moment(curDate)
      },

      loadData(arg) {
        this.getCurrentMonth()
        if (!this.url.list) {
          this.$message.error('请设置url.list属性!')
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1
        }
        var params = this.getQueryParams()//查询条件
        if ((params.tjyf == 'undefined' || params.tjyf == null) && this.flag == true) {
          params.tjyf = this.defaultMonthOpera.format('YYYY-MM') + '-01'
        }
        this.loading = true
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records
            this.ipagination.total = res.result.total
          }
          if (res.code === 510) {
            this.$message.warning(res.message,5)
          }
          this.loading = false
        })
      },
      getQueryParams() {
        let tjyfMoment = ''
        let tjyfValue = this.$route.query.tjyf
        if (this.queryParam.tjyf) {
          tjyfMoment = this.queryParam.tjyf.format('YYYY-MM') + '-01'
        }
        if (tjyfValue) {
          tjyfMoment = tjyfValue
        }
        var param = Object.assign({}, this.queryParam, this.isorter)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        param.tjyf = tjyfMoment
        this.$route.query.tjyf = null
        return filterObj(param)
      },
      handleDetailToXzc: function(record, path) {
        this.$router.push({
          path: path,
          query: { tjyf: record.tjyf, jgdm: record.jgdm }
        })
      },

      handleExportXls(fileName) {
        if (!fileName || typeof fileName != 'string') {
          fileName = '导出文件'
        }
        let tjyf = ''
        let param = this.queryParam

        // if (param.tjyf != null) {
        //   param.tjyf = param.tjyf.format('YYYY-MM') + '-01'
        // }
        if (this.queryParam.tjyf === '' || this.queryParam.tjyf === undefined){
          tjyf = moment(this.defaultMonthOpera).format("YYYY-MM") + '-01'
        }else {
          tjyf = moment(param.tjyf).format("YYYY-MM") + '-01'
        }
        param.tjyf = tjyf
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(',')
        }
        console.log('导出参数', param)
        this.exportLoading = true
        downFile(this.url.exportXlsUrl, param).then((data) => {
          if (!data) {
            this.$message.warning('文件下载失败')
            return
          }
          var blob = new Blob([data])
          if ('msSaveOrOpenBlob' in navigator) {
            window.navigator.msSaveOrOpenBlob(blob, fileName + '.xls')
            return
          }
          var eleLink = document.createElement('a')
          eleLink.download = fileName + '.xls'
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob)
          document.body.appendChild(eleLink)
          eleLink.click()
          document.body.removeChild(eleLink)
        }).finally(()=>{
          this.exportLoading = false
          this.loadData(1)
        })
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>