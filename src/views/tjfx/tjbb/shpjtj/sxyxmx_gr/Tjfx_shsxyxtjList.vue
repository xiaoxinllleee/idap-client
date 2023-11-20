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
              <a-form-item label="法人证件号码">
                <a-input placeholder="请输入法人证件号码" v-model="queryParam.frzjhm"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="商户名称">
                <a-input placeholder="请输入商户名称" v-model="queryParam.shmc"></a-input>
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
      <a-button type="primary" icon="download" @click="handleExportXls('商户授信用信明细')">导出</a-button>
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
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :scroll="{ x: 2400 }"
        @change="handleTableChange">
      <span slot="shmc" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="fddbr" slot-scope="text">
          <j-ellipsis :value="text" :length="6"/>
        </span>
        <span slot="frzjhm" slot-scope="text">
          <j-ellipsis :value="text" :length="15"/>
        </span>
        <span slot="tyshxydm" slot-scope="text">
          <j-ellipsis :value="text" :length="15"/>
        </span>
        <span slot="dz" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>
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
  import { getAction, putAction, httpAction, downFile } from '@/api/manage'
  import { mapGetters } from 'vuex'
  import store from '@/store/'
  import JEllipsis from '../../../../../components/jeecg/JEllipsis'

  export default {
    name: 'Tjfx_shsxyxtjList',
    mixins: [JeecgListMixin],
    components: {
      JTreeSelect,JEllipsis
    },
    data() {
      return {
        description: '商户授信用信明细管理页面',
        DateFormat: 'YYYY-MM-DD',
        isorter: {
          column: 'pjrq',
          order: 'desc'
        },
        // 表头
        isAll: false,
        sszh: '',
        // 表头
        columns: [
          {
            title: '评级日期',
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
            title: '责任人',
            align: 'center',
            dataIndex: 'khjl_dictText'
          },
          {
            title: '商户名称',
            align: 'center',
            dataIndex: 'shmc',
            scopedSlots: { customRender: 'shmc' }
          },
          {
            title: '法定代表人',
            align: 'center',
            dataIndex: 'fddbr',
            scopedSlots: { customRender: 'fddbr' }
          },
          {
            title: '法人证件号码',
            align: 'center',
            dataIndex: 'frzjhm',
            scopedSlots: { customRender: 'frzjhm' }
          },
          {
            title: '统一社会信用代码',
            align: 'center',
            dataIndex: 'tyshxydm',
            scopedSlots: { customRender: 'tyshxydm' }
          },
          {
            title: '成立日期',
            align: 'center',
            dataIndex: 'clrq'
          },
          {
            title: '联系方式',
            align: 'center',
            dataIndex: 'lxfs'
          },
          {
            title: '商户类型',
            align: 'center',
            dataIndex: 'shlx'
          },
          {
            title: '地址',
            align: 'center',
            dataIndex: 'dz',
            scopedSlots: { customRender: 'dz' }
          },
          {
            title: '授信额度',
            align: 'center',
            dataIndex: 'sxed'
          },
          {
            title: '用信额度',
            align: 'center',
            dataIndex: 'yxed'
          },
          {
            title: '预授信额度',
            align: 'center',
            dataIndex: 'ysxed'
          },
        ],
        url: {
          list: '/tjbb.shpjtj.sxyxmx_gr/tjfx_shsxyxtj/list',
          delete: '/tjbb.shpjtj.sxyxmx_gr/tjfx_shsxyxtj/delete',
          deleteBatch: '/tjbb.shpjtj.sxyxmx_gr/tjfx_shsxyxtj/deleteBatch',
          exportXlsUrl: 'tjbb.shpjtj.sxyxmx_gr/tjfx_shsxyxtj/exportXls',
          importExcelUrl: 'tjbb.shpjtj.sxyxmx_gr/tjfx_shsxyxtj/importExcel'
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


      getQueryParams() {
        let sszhValue = this.$route.query.sszh

        var param = Object.assign({}, this.queryParam, this.isorter)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        if (sszhValue) {
          param.sszh = sszhValue
        }
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
      },
      searchReset() {
        this.$route.query.pjrq = null
        this.$route.query.sszh = null
        this.queryParam = {}
        if (!store.getters.isRoot) {
          //this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.loadData(1)
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>