<template>


  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择支行查询" v-model="queryParam.sszh"
                             dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz"
                             :showSearch="true" :treeDefaultExpandAll=true treeNodeFilterProp="title" />
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
            <a-col :md="6" :sm="8">
              <a-form-item label="日期">
                <a-range-picker
                  style="width: 300px"
                  format="YYYY-MM-DD"
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
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
            <!--            <span style="float: left;overflow: hidden;margin-left: 50px" class="table-page-search-submitButtons">
                          <a-button type="primary" @click="exportExcel('已庆生客户')" icon="download">导出</a-button>
                        </span>-->
          </a-col>

        </a-row>
      </a-form>
    </div>
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="exportExcel('已庆生客户')" icon="download" v-has="'yqskh:exp'">导出</a-button>
      <a-button icon="area-chart" @click="initDatas" v-has="'yqskh:init'">提取</a-button>
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
      <span slot="operate" slot-scope="text,record">


            <a-upload

              :showUploadList="true"
              :disabled="true"
              list-type="picture-card"
              :file-list="record.imgList"
              @change="handleChange">
        </a-upload>
        </span>

    </a-table>
    <!--    </div>-->
    <!-- table区域-end -->


  </a-card>
</template>

<script>

import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { downFile, getAction } from '@api/manage'
import { filterObj } from '@/utils/util'
import JImageUpload from '@/components/jeecg/JImageUpload'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
/*import JTreeSelectJg from '@/components/jeecg/JTreeSelectJg'*/
import store from '@/store/'

export default {
  name: 'srtxList',
  mixins: [JeecgListMixin],
  components: {
    JImageUpload,
    JTreeSelect,
/*    JTreeSelectJg*/
  },
  data () {
    return {
      toggleSearchStatus:false,
      date_begin: null,
      date_end: null,
      queryParam: {},
      previewImage: '',
      previewVisible: false,
      previewTitle: '',
      imagePath: window._CONFIG['staticDomainURL'] + '//',
      imagePaths: '',
      dataSource: [],
      imageList: [],
      strValue: '',
      value: '',
      ifMaster: '',
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

      userName: '',
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
          dataIndex: 'sex'
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
          dataIndex: 'gzrwSfdb'
        },
        {
          title: '重要原因',
          align: 'center',
          dataIndex: 'standardcause'
        },
        {
          title: '备注',
          align: 'center',
          dataIndex: 'bz'
        },
       /* {
          title: '操作',
          align: 'center',
          dataIndex: 'operate',
          scopedSlots: { customRender: 'operate' }
        }*/

      ],
      url: {
        init: '/zfcjyxkhstj/srtx/getUploadPictureImfomation',
        list: '/zfcjyxkhstj/srtx/ipadListByTime',
        delete: '/com.de/srtx/delete',
        deleteBatch: '/com.de/srtx/deleteBatch',
        exportXlsUrl: '/zfcjyxkhstj/srtx/historyExportExl',
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
    /*    this.initData()*/
  },
  methods: {

    disabledDate(current)
    {
      return current&&current < moment().subtract(1,'days').endOf('day')

    },
    initDatas()
    {

      this.loadData(1);
    },
    searchReset() {
      this.queryParam = {}
      this.date_begin=null;
      this.date_end=null;
      if(!store.getters.isRoot) {
        this.queryParam.sszh = store.getters.userInfo.orgCode
      }
      this.loadData(1);
    },
    onDateChange (date) {
      if (date != null && date.length > 0) {
        this.date_begin = date[0].format('YYYY-MM-DD')
        this.date_end = date[1].format('YYYY-MM-DD')

      }

    },

    getQueryParams () {
      //获取查询条件
      let param = Object.assign({}, this.queryParam)
      param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      return filterObj(param)
    },
    initData (params) {
      this.loading = true
      getAction(this.url.init, params).then((res) => {
        if (res.success) {

          let record = res.result.result.records
          console.log(record)

          for (let i = 0; i < record.length; i++) {
            let imgList = new Array()
            for (let j = 0; j < record[i].imgList.length; j++) {

              let img = {
                uid: record[i].imgList[j].id,
                name: record[i].imgList[j].name,
                status: 'done',
                url: this.imagePath + record[i].imgList[j].fwlj

              }
              imgList.push(img)

            }

            record[i].imgList = imgList
          }

          console.log('record', record)

          this.dataSource = record
          this.$message.success(res.message)
        } else {
          this.$message.warning(res.message,5)
        }
        this.loading = false
      })

    },
    initQueryParams() {
      if(!store.getters.isRoot) {
        this.queryParam.sszh = store.getters.userInfo.orgCode
      }
    },
    loadData (arg) {
      if (arg === 1) {
        this.ipagination.current = 1
      }
      let params = this.getQueryParams()//查询条件
      delete params.days // 时间参数不传递后台
      if (this.ifMaster != null && this.ifMaster != '') {
        params.ifMaster = this.ifMaster
      }
      if (this.date_begin != null && this.date_end != null) {
        params.daysBegin = this.date_begin
        params.daysEnd = this.date_end
      }
      this.initData(params)

    },
    exportExcel (fileName) {

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
    lockOperate (data) {

    }

  }
}
</script>
<style scoped>
/*@import '~@assets/less/common.less'*/
</style>