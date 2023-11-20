<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="统计日期">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.tjyf" :format="DateFormat"
                              @change="onEndDateChange" style="width: 100%;"/>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.jgdm"
                             dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             :jgdm="true" :showSearch="true" :treeDefaultExpandAll="true" :filterTreeNode="true"
                             :isAll="isAll"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="贷款金额">
                <a-input-group compact>
                  <a-input-number placeholder="" v-model="queryParam.dkje_begin" :min="0"
                                  style=" width: 40%; text-align: center; "/>
                  <a-input placeholder="<->" disabled
                           style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "/>
                  <a-input-number placeholder="" v-model="queryParam.dkje_end" :min="0"
                                  style="width: 40%; text-align: center; border-left: 0;"/>
                </a-input-group>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="贷款余额">
                <a-input-group compact>
                  <a-input-number placeholder="" v-model="queryParam.dkye_begin" :min="0"
                                  style=" width: 40%; text-align: center; "/>
                  <a-input placeholder="<->" disabled
                           style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "/>
                  <a-input-number placeholder="" v-model="queryParam.dkye_end" :min="0"
                                  style="width: 40%; text-align: center; border-left: 0; "/>
                </a-input-group>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button icon="download" @click="handleExportXls('贷款金额分层_个人')" v-has="'dkjefc_gr:exportXls'">导出</a-button>
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
        @change="handleTableChange">


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util'
  import { downFile } from '@/api/manage'
  import { mapGetters } from 'vuex'
  import store from '@/store/'
  import JEllipsis from '../../../../../components/jeecg/JEllipsis'

  export default {
    name: 'Dkjkpt_grdkjefcmxList',
    mixins: [JeecgListMixin],
    components: {
      JTreeSelect, JEllipsis
    },
    data() {
      return {
        description: '贷款金额分层_个人管理页面',
        DateFormat: 'YYYY-MM-DD',
        isorter: {
          order: 'desc'
        },
        // 表头
        isAll: false,
        jgdm: '',
        // 表头
        columns: [
          {
            title: '统计日期',
            align: 'center',
            dataIndex: 'tjyf',
            customRender: function(text) {
              return !text ? '' : (text.length > 10 ? text.substr(0, 10) : text)
            },
            sorter: (a, b) => b.tjyf.replace(/-/g, '/') - a.tjyf.replace(/-/g, '/')
          },
          {
            title: '所属支行',
            align: 'center',
            dataIndex: 'jgdm_dictText',
            sorter: true,
          },
          {
            title: '证件号码',
            align: 'center',
            dataIndex: 'zjhm'
          },
          {
            title: '客户名称',
            align: 'center',
            dataIndex: 'khmc'
          },
          {
            title: '客户类型',
            align: 'center',
            dataIndex: 'khlx_dictText'
          },
          {
            title: '贷款金额',
            align: 'center',
            dataIndex: 'dkje',
            sorter: true,
          },
          {
            title: '贷款余额',
            align: 'center',
            dataIndex: 'dkye',
            sorter: true,
          }
        ],
        url: {
          list: '/dkjkpt.dksjjk.dkjefc.dkjefc_gr/dkjkpt_grdkjefcmx/list',
          delete: '/dkjkpt.dksjjk.dkjefc.dkjefc_gr/dkjkpt_grdkjefcmx/delete',
          deleteBatch: '/dkjkpt.dksjjk.dkjefc.dkjefc_gr/dkjkpt_grdkjefcmx/deleteBatch',
          exportXlsUrl: 'dkjkpt.dksjjk.dkjefc.dkjefc_gr/dkjkpt_grdkjefcmx/exportXls',
          importExcelUrl: 'dkjkpt.dksjjk.dkjefc.dkjefc_gr/dkjkpt_grdkjefcmx/importExcel'
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
      onEndDateChange: function(value, dateString) {
        let dqrqDateString = dateString
        this.queryParam.tjyf_begin = dqrqDateString[0]
        this.queryParam.tjyf_end = dqrqDateString[1]
      },


      getQueryParams() {
        let sszhValue = this.$route.query.jgdm

        var param = Object.assign({}, this.queryParam, this.isorter)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        if (sszhValue) {
          param.jgdm = sszhValue
        }
        delete param.tjyf
        return filterObj(param)
      },
      handleExportXls(fileName) {
        if (!fileName || typeof fileName != 'string') {
          fileName = '导出文件'
        }
        let param = { ...this.queryParam }
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(',')
        }

        delete param.tjyf
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
        param.paramsStr = paramsStr
        console.log('导出参数', param)
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
        })
      },
      searchReset() {
        this.$route.query.tjyf = null
        this.$route.query.jgdm = null
        this.queryParam = {}
        if (!store.getters.isRoot) {
          //this.queryParam.jgdm = store.getters.userInfo.orgCode
        }
        this.loadData(1)
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>