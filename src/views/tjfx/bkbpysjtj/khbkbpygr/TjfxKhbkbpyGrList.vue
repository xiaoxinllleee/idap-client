<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="评级日期">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.pjrq" :format="DateFormat"
                              @change="onEndDateChange" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh"
                             dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true"
                             :isAll="isAll"/>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="行政村">
                <a-input placeholder="请输入行政村" v-model="queryParam.xzc"></a-input>
              </a-form-item>
            </a-col>

            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="组" v-if="this.sfktsjyxdy==1">
                <a-input placeholder="请输入组" v-model="queryParam.xzz"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="责任人">
                <j-dict-select-tag placeholder="请选择责任人" v-model="queryParam.zkhjl" dict-code="HR_BAS_STAFF,YGXM,YGGH"
                                   :show-search="true"/>
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
      <a-button type="primary" icon="download" @click="handleExportXls('个人背靠背评议明细')">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{
        selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
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


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <tjfxKhbkbpyGr-modal ref="modalForm" @ok="modalFormOk"></tjfxKhbkbpyGr-modal>
  </a-card>
</template>

<script>
  import TjfxKhbkbpyGrModal from './modules/TjfxKhbkbpyGrModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'
  import { getAction, putAction, httpAction, downFile } from '@/api/manage'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { mapGetters } from 'vuex'

  import store from '@/store/'

  export default {
    name: 'TjfxKhbkbpyGrList',
    mixins: [JeecgListMixin],
    components: {
      TjfxKhbkbpyGrModal, JTreeSelect
    },
    data() {
      return {
        DateFormat: 'YYYY-MM-DD',
        sfktsjyxdy: 1,
        description: '个人背靠背评议明细管理页面',
        isorter: {
          column: 'pjrq',
          order: 'desc'
        },
        // 表头
        isAll: false,
        sszh: '',
        columns: [
          {
            title: '走访日期',
            align: 'center',
            dataIndex: 'pjrq',
            customRender: function(text) {
              return !text ? '' : (text.length > 10 ? text.substr(0, 10) : text)
            },
            sorter: (a, b) => b.pjrq.replace(/-/g, '/') - a.pjrq.replace(/-/g, '/')
          },
          {
            title: '所属支行',
            align: 'center',
            dataIndex: 'sszh_dictText'
          },
          {
            title: '行政村',
            align: 'center',
            dataIndex: 'xzc_dictText'
          },
          {
            title: '组',
            align: 'center',
            dataIndex: 'xzz_dictText'
          },
          {
            title: '责任人',
            align: 'center',
            dataIndex: 'zkhjl_dictText'
          },
          {
            title: '户号编码',
            align: 'center',
            dataIndex: 'hhbm'
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
            title: '是否户主',
            align: 'center',
            dataIndex: 'sfhz'
          },
          {
            title: '评议员证件号码',
            align: 'center',
            dataIndex: 'pyyzjhm'
          },
          {
            title: '评议类型',
            align: 'center',
            dataIndex: 'pylx_dictText'
          },
          {
            title: '评议附件数量',
            align: 'center',
            dataIndex: 'pyfjsl'
          },
          {
            title: '评议记录数量',
            align: 'center',
            dataIndex: 'pyjlsl'
          },
          {
            title: '评议得分',
            align: 'center',
            dataIndex: 'pydf'
          }
        ],
        url: {
          list: '/TjfxKhbkbpyGr/tjfxKhbkbpyGr/list',
          delete: '/TjfxKhbkbpyGr/tjfxKhbkbpyGr/delete',
          deleteBatch: '/TjfxKhbkbpyGr/tjfxKhbkbpyGr/deleteBatch',
          exportXlsUrl: 'TjfxKhbkbpyGr/tjfxKhbkbpyGr/exportXls',
          importExcelUrl: 'TjfxKhbkbpyGr/tjfxKhbkbpyGr/importExcel'
        }
      }
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    created() {
      this.querycsz()
      this.isAll = store.getters.isRoot
      this.sszh = store.getters.userInfo.orgCode
    },
    methods: {
      ...mapGetters(['nickname', 'avatar', 'userInfo']),
      initQueryParams() {
        if (!store.getters.isRoot) {
          //this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.paramsInited = true
      },
      onEndDateChange: function(value, dateString) {
        let dqrqDateString = dateString
        this.queryParam.pjrq_begin = dqrqDateString[0]
        this.queryParam.pjrq_end = dqrqDateString[1]
      },
      searchReset: function() {
        this.queryParam = {}
        if (!store.getters.isRoot) {
          //this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.loadData(1)
      },
      //查询是否显示三级营销单元字段1：是 2：否
      querycsz() {
        let params = { 'csbm': 'CS0004' }
        putAction('/yxdygl/yxdyglPqzrrgl/querycsz', params).then(res => {
          console.log('---------')
          if (res.result.csz == 2) {
            this.columns.splice(3, 1)
          }
          this.sfktsjyxdy = res.result.csz
        })
      },


      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        delete param.pjrq
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

        delete param.pjrq
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
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>