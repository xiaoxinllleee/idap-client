<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="等级评定年份">
<!--              <a-input placeholder="请输入等级评定年份" v-model="queryParam.djpdnf"></a-input>-->
              <a-select placeholder="请选择等级评定年份" v-model="pdnf" @change="selectValue" :allowClear="true">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="支行">
<!--              <a-input placeholder="请输入支行机构代码" v-model="queryParam.jgdm"></a-input>-->
              <j-tree-select placeholder="请选择支行"
                             pid-field="sjywjgdm_b"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.jgdm"
                             dict="v_hr_bas_organization,zzjc,ywjgdm"
                             condition='{"sjywjgdm": "ywjgdm"}'
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl='6' :lg='7' :md='8' :sm='24'>
            <a-form-item label='支行等级'>
              <j-dict-select-tag placeholder='请选择' v-model='queryParam.level' dict-code='jylrhs_zhdj'></j-dict-select-tag>
            </a-form-item>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
      <a-button type="primary" @click="searchReset" icon="reload">重置</a-button>
      <a-button  type="primary" icon="plus" :loading="initDataLoading" @click="handleInitData" v-has="'jylrhsywjgrank:initdata'">
        {{ initDataBtnName }}
      </a-button>
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('支行等级评定')"  v-has="'jylrhsywjgrank:export'">导出</a-button>
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
      </a-table>
    </div>
    <!-- table区域-end -->
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import notification from 'ant-design-vue/lib/notification'
  import moment from 'moment'
  import { downFile, postAction } from '@api/manage'
  import JTreeSelect from '@comp/jeecg/JTreeSelect.vue'
  import { filterObj } from '@/utils/util'

  export default {
    name: "JylrhsYwjgRankList",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect
    },
    data () {
      return {
        description: '支行等级评定管理页面',
        rowKey: 'djpdnf,jgdm',
        initDataLoading: false,
        initDataBtnName: '统计',
        pdnf: undefined,
        years: undefined,
        // 表头
        columns: [
          {
            title: '等级评定年份',
            align: 'center',
            dataIndex: 'djpdnf',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 4) : text)
            },
          },
          {
            title: '支行',
            align: 'center',
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '本年度存款日平',
            align: 'center',
            dataIndex: 'bndCkrp'
          },
          {
            title: '本年度贷款日平',
            align: 'center',
            dataIndex: 'bndDkrp'
          },
          {
            title: '本年度存贷款日平之和',
            align: 'center',
            dataIndex: 'bndCdkrpSum'
          },
          {
            title: '支行排名',
            align: 'center',
            dataIndex: 'rank'
          },
          {
            title: '支行等级',
            align: 'center',
            dataIndex: 'levels_dictText'
          },
          {
            title: '数据日期',
            align: 'center',
            dataIndex: 'dataDate'
          },
          {
            title: '统计时间',
            align: 'center',
            dataIndex: 'createTime'
          },
          {
            title: '操作员',
            align: 'center',
            dataIndex: 'operator'
          },
        ],
        url: {
          list: '/jylrhs/csgl/zhdjpd/list',
          exportXlsUrl: 'jylrhs/csgl/zhdjpd/exportXls',
          initData: 'jylrhs/csgl/zhdjpd/initData',
        }
      }
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        var date = new Date
        var year = date.getFullYear()
        this.pdnf = year
        this.initSelectYear(year)
      },
      initSelectYear(year) {
        this.years = [];
        for (let i = 0; i < 30; i++) {
          this.years.push({value: ((year - i) + ''), label: ((year - i) + '')});
        }
      },
      selectValue(value) {
        this.$emit('change', value)
      },

      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        let pdnf = undefined
        if (this.pdnf) {
          pdnf = this.pdnf + '-01-01'
        }
        param.djpdnf = pdnf
        return filterObj(param);
      },
      searchReset() {
        this.queryParam = {djpdnf: undefined}
        var date = new Date
        var year = date.getFullYear()
        this.pdnf = year
        this.queryParam.djpdnf = moment(this.pdnf).format("YYYY")+"-01-01"
        this.loadData(1)
      },

      handleInitData: function() {
        var params = this.getQueryParams();
        if (!params.djpdnf) {
          notification.warning({message: '系统提示', description: '请选择等级评定年份！', duration: 4})
          return
        }
        var djpdnf = moment(params.djpdnf).format("YYYY")
        var dqnf = moment(new Date()).format("YYYY")
        if (djpdnf > dqnf) {
          notification.warning({message: '系统提示', description: '等级评定年份不得大于当前年份！', duration: 4})
          return
        }
        var djpdnf = moment(params.djpdnf).format("YYYY")+'-01-01'
        console.log('当前等级评定年份:',djpdnf)
        this.loading = true
        this.initDataLoading = true
        this.initDataBtnName = '正在统计，请稍等...'
        postAction(this.url.initData,{'djpdnf': djpdnf}).then((res) => {
          if (res.success) {
            notification.success({message: '系统提示', description: '统计成功！', duration: 4})
          } else {
            notification.warning({message: '系统提示', description: res.message, duration: 4})
          }
        }).catch((error) => {
          notification.error({message: '系统提示', description: '统计失败，请联系系统管理员！', duration: 4})
          console.error("统计失败！",error)
        }).finally(() => {
          this.loading = false
          this.initDataLoading = false
          this.initDataBtnName = '统计'
          this.loadData()
        })
      },
      handleExportXls (fileName) {
        if (!fileName || typeof fileName != 'string') {
          fileName = '导出文件'
        }
        fileName = fileName + '导出_' + moment(new Date()).format('YYYYMMDDHHmmss')
        let param = this.getQueryParams();
        if(this.selectedRowKeys && this.selectedRowKeys.length>0) {
          param['selections'] = this.selectedRowKeys.join(",")
          param['rowKey'] = this.rowKey
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
        param.paramsStr = paramsStr
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
          this.exportLoading = false
        })
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>