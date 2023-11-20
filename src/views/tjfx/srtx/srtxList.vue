<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属支行">
              <j-tree-select
                v-model="queryParam.sszh"
                placeholder="请选择支行"
                dict="hr_bas_organization,zzjc,zzbz"
                :sszh="true"
                pidField="sjzzbz"
                :showSearch="true"
                :treeDefaultExpandAll=true
              >
              </j-tree-select>

            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="姓名">
              <a-input placeholder="请输入姓名" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="户号编码">
                <a-input placeholder="请输入户号编码" v-model="queryParam.doornumbercode"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" md="6" :sm="8">
              <a-form-item label="日期">
                <a-range-picker
                  style="width: 300px"
                  :format="dateFormat"
                  :default-value="[moment(date_begin, dateFormat), moment(date_end, dateFormat)]"
                  :placeholder="['开始时间', '结束时间']"
                  @change="onDateChange"
                  v-model="queryParam.days"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="是否重要">
                <a-select
                  v-model:value="value"
                  label-in-value
                  style="width: 300px"
                  :options="options"
                  @change="handleChange"
                >
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
                <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
              </a>
            </span>
            <!--            <span style="float: left;overflow: hidden;margin-left: 50px" class="table-page-search-submitButtons">
                          <a-button type="primary" @click="handExportExcel('生日提醒')" icon="download">导出</a-button>
                        </span>-->
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handExportExcel('生日提醒')" icon="download" v-has="'srtx:exp'">导出</a-button>
      <a-button icon="area-chart" @click="initData" v-has="'srtx:init'">提取</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a
        style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">
         <span slot="operate" slot-scope="record,row">
           <a-button type="primary" @click="lockOperate(row)" v-has="'srtx:loke'">

             {{ row.operate == '0' ? '未锁定' : (row.operate == '1' && row.operatePeople == userName) ? '已锁定' : '他人锁定' }}
           </a-button>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->
    <srtxModel />

  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { filterObj } from '@/utils/util'
import { downFile, getAction, putAction } from '@api/manage'
import { getUserName, changeLockStatus } from '@api/api'
import store from '@/store/'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import moment from 'moment';

export default {
  name: 'srtxList',
  mixins: [JeecgListMixin],
  components: {
    JTreeSelect
  },
  data () {
    return {
      dateFormat:"YYYY-MM-DD",
      toggleSearchStatus: false,
      date_begin:'',
      date_end:'',
      queryParam: {
      },
      /* table选中keys*/
      selectedRowKeys: [],
      exportLoading: false,
      ifMaster: '',
      strValue: '',
      value: '',
      options: [

        {
          value: '0',
          label: '是'
        },
        {
          value: '1',
          label: '否'
        }

      ],

      userName: '1',
      description: 'xa管理页面',
      // 表头
      columns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function (t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '姓名',
          align: 'center',
          dataIndex: 'name'
        },
        {
          title: '日期',
          align: 'center',
          dataIndex: 'days'
        },
        {
          title: '性别',
          align: 'center',
          dataIndex: 'sex_dictText'
        },
        {
          title: '户号编码',
          align: 'center',
          dataIndex: 'doornumbercode'
        },
        {
          title: '年龄',
          align: 'center',
          dataIndex: 'age'
        },
        {
          title: '身份证',
          align: 'center',
          dataIndex: 'idnumber'
        },
        {
          title: '家庭地址',
          align: 'center',
          dataIndex: 'homeaddress'
        },
        {
          title: '是否重要',
          align: 'center',
          dataIndex: 'gzrwSfdb_dictText'
        },
        {
          title: '重要原因',
          align: 'center',
          dataIndex: 'standardcause'
        },
        {
          title: '操作',
          align: 'center',
          dataIndex: 'operate',
          scopedSlots: { customRender: 'operate' }
        }
      ],
      url: {
        list: '/zfcjyxkhstj/srtx/ipadListByTime',
        delete: '/com.de/srtx/delete',
        deleteBatch: '/com.de/srtx/deleteBatch',
        exportXlsUrl: '/zfcjyxkhstj/srtx/exportXls',
        importExcelUrl: 'com.de/srtx/importExcel'
      }
    }
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  created () {
    this.getUserNameByToken()
  },
  mounted: function () {
    /**
     * 查询当天日期
     */
    const timeOne = new Date()
    const year = timeOne.getFullYear()
    let month = timeOne.getMonth() + 1
    let day = timeOne.getDate()
    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day
    this.date_begin= `${year}-${month}-${day}`

    let now= new Date()
    now.setDate(now.getDate() + 30)
    const year1 = now.getFullYear()
    let month1 = now.getMonth() + 1
    let day1 = now.getDate()
    month1 = month1 < 10 ? '0' + month1 : month1
    day1 = day1 < 10 ? '0' + day1 : day1
    this.date_end= `${year1}-${month1}-${day1}`

    /*    this.searchQuery()*/
  },
  methods: {
    moment,
    disabledDate(current)
    {
      return current&&current < moment().subtract(1,'days').endOf('day')

    },
    initData () {

      this.loadData(1)

    },
    searchReset () {
      this.queryParam = {sszh: undefined}
      this.date_begin = null
      this.date_end = null
      if(!store.getters.isRoot) {
        this.queryParam.sszh = store.getters.userInfo.orgCode
      }
      this.loadData(1)
    },
    onDateChange (date, dateString) {
      if (date != null && date.length > 0) {
        this.date_begin = date[0].format('YYYY-MM-DD')
        this.date_end = date[1].format('YYYY-MM-DD')

      }

    },
    getUserNameByToken () {
      let that = this
      let param = {}
      getUserName(param).then(function (response) {
        that.userName = response.message
      }).catch(function (error) {
      })

    },
    getQueryParams () {
      //获取查询条件
      let param = Object.assign({}, this.queryParam)
      param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      return filterObj(param)

      /*      if (this.date_begin!=null&&this.date_end!=null){
              params.date_begin=this.date_begin;
              params.date_end=this.date_end;
            }
            params.date_begin = this.date_begin
            params.date_end = this.date_end


            /!* if(params.dateOne!=null) {
               params.dateOne = params.dateOne.format("YYYYMMDD");
             }
             if(params.dateTwo!=null) {
               params.dateTwo = params.dateTwo.format("YYYYMMDD");
             }*!/

            let param = Object.assign(sqp, params, this.isorter, this.filters)
            param.field = this.getQueryField()
            param.pageNo = this.ipagination.current
            param.pageSize = this.ipagination.pageSize

            return filterObj(param)*/
    },
    loadData (arg) {
      this.loading = true

      if (arg === 1) {
        this.ipagination.current = 1
      }
      let params = this.getQueryParams()//查询条件
      delete params.days // 时间参数不传递后台
      if (this.date_begin != null && this.date_end != null) {
        params.daysBegin = this.date_begin
        params.daysEnd = this.date_end
      }
      if (this.ifMaster != null && this.ifMaster != '') {
        params.ifMaster = this.ifMaster
      }

      getAction(this.url.list, params).then((res) => {
        if (res.success) {
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total
          this.loading = false
        }else{
          this.loading = false
        }
      })
    },
    searchQuery () {
      this.beforeSearchQuery()
      this.loadData(1)
    },
    initQueryParams() {
      if(!store.getters.isRoot) {
        this.queryParam.sszh = store.getters.userInfo.orgCode
      }
    },
    handExportExcel (fileName) {

      this.exportLoading = true
      if (!fileName || typeof fileName != 'string') {
        fileName = '导出文件'
      }
      let param = { ...this.queryParam }
      if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
        param['selections'] = this.selectedRowKeys.join(',')
      }
      let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
      param.paramsStr = paramsStr
      console.log('导出参数', param)
      downFile(this.url.exportXlsUrl, param).then((data) => {
        if (!data) {
          this.$message.warning('文件下载失败')
          return
        }
        /* if (typeof window.navigator.msSaveBlob !== 'undefined') {
           window.navigator.msSaveBlob(new Blob([data]), fileName+'.xls')
         }else{
           let url = window.URL.createObjectURL(new Blob([data]))
           let link = document.createElement('a')
           link.style.display = 'none'
           link.href = url
           link.setAttribute('download', fileName+'.xls')
           document.body.appendChild(link)
           link.click()
           document.body.removeChild(link); //下载完成移除元素
           window.URL.revokeObjectURL(url); //释放掉blob对象

         }*/
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
    handleChange (data) {

      if (data != null && data != undefined) {
        this.ifMaster = data.key
      }
    },
    async lockOperate (row) {

      let parma = {
        id: row.id,
        operate: row.operate,
        operatePeople: row.operatePeople
      }
      if (row.operate === '0') {

        parma.operate = '1'
        await changeLockStatus(parma).then(function (response) {
          if (response.message != undefined && response.message == 'lock') {
            this.$message.warning('他人已锁定，无法操作')
          }
          this.loadData(1)
        }).catch(function (error) {
        })
      } else if (row.operate === '1' && row.operatePeople == this.userName) {
        parma.operate = '0'
        await changeLockStatus(parma).then(function (response) {
          this.loadData(1)
        }).catch(function (error) {
        })
      } else {
        this.$message.warning('他人已锁定，无法操作')

      }
      this.loadData(1)

    }

  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>