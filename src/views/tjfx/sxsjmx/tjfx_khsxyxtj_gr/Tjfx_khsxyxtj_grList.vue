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
            <a-col :md="6" :sm="8">
              <a-form-item label="证件号码">
                <j-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></j-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="客户名称">
                <j-input placeholder="请输入客户名称" v-model="queryParam.khmc" type="likemore"></j-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="客户类型">
                <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam.khlx" dict-code="khlx"/>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="6" :sm="8">
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
      <!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button type="primary" icon="download" @click="handleExportXls('个人用信授信')">导出</a-button>
      <!--  <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
          <a-button type="primary" icon="import">导入</a-button>
        </a-upload>-->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
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
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
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

    <!-- 表单区域 -->
    <tjfx_khsxyxtj_gr-modal ref="modalForm" @ok="modalFormOk"></tjfx_khsxyxtj_gr-modal>
  </a-card>
</template>

<script>
  import Tjfx_khsxyxtj_grModal from './modules/Tjfx_khsxyxtj_grModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util'
  import JInput from '@/components/jeecg/JInput'
  import { getAction, putAction, httpAction, downFile } from '@/api/manage'
  import { mapGetters } from 'vuex'
  import store from '@/store/'


  export default {
    name: 'Tjfx_khsxyxtj_grList',
    mixins: [JeecgListMixin],
    components: {
      Tjfx_khsxyxtj_grModal, JTreeSelect, JInput
    },
    data() {
      return {
        DateFormat: 'YYYY-MM-DD',
        isAll: false,
        sszh: '',
        sfktsjyxdy: 1,
        description: '1管理页面',
        // 表头
        columns: [
          {
            title: '评级日期',
            align: 'center',
            dataIndex: 'pjrq'
          },
          {
            title: '所属支行',
            align: 'center',
            dataIndex: 'sszh_dictText'
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
            title: '是否户主',
            align: 'center',
            dataIndex: 'sfhz_dictText'
          },
          {
            title: '授信额度',
            align: 'center',
            dataIndex: 'sxed'
          },
          {
            title: '预授信额度',
            align: 'center',
            dataIndex: 'ysxed'
          },
          {
            title: '预授信户数',
            align: 'center',
            dataIndex: 'ysxhs'
          },
          {
            title: '用信额度',
            align: 'center',
            dataIndex: 'yxed'
          },
          // {
          //   title: '评议附件数量',
          //   align: 'center',
          //   dataIndex: 'pyfjsl'
          // },
          // {
          //   title: '评议记录',
          //   align: 'center',
          //   dataIndex: 'pyjl'
          // },
          {
            title: '合同可用金额',
            align: 'center',
            dataIndex: 'htkyje'
          }
        ],
        url: {
          list: '/tjfx_khsxyxtj_gr/tjfx_khsxyxtj_gr/list',
          delete: '/tjfx_khsxyxtj_gr/tjfx_khsxyxtj_gr/delete',
          deleteBatch: '/tjfx_khsxyxtj_gr/tjfx_khsxyxtj_gr/deleteBatch',
          exportXlsUrl: 'tjfx_khsxyxtj_gr/tjfx_khsxyxtj_gr/exportXls',
          importExcelUrl: 'tjfx_khsxyxtj_gr/tjfx_khsxyxtj_gr/importExcel'
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
      //this.sszh = store.getters.userInfo.orgCode
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
      //查询是否显示三级营销单元字段1：是 2：否
      querycsz() {
        let params = { 'csbm': 'CS0004' }
        putAction('/yxdygl/yxdyglPqzrrgl/querycsz', params).then(res => {
          console.log('---------')
          if (res.result.csz == 2) {
            this.columns.splice(6, 1)
          }
          this.sfktsjyxdy = res.result.csz
        })
      },
      getQueryParams() {
        let sszhvalue = this.$route.query.sszh
        let xzcvalue = this.$route.query.xzc
        let xzzvalue = this.$route.query.xzz
        let hhbmvalue = this.$route.query.hhbm

        var param = Object.assign({}, this.queryParam, this.isorter)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        delete param.pjrq

        if (sszhvalue) {
          param.sszh = sszhvalue
        }
        if (xzcvalue) {
          param.xzc = xzcvalue
        }
        if (xzzvalue) {
          param.xzz = xzzvalue
        }
        if (hhbmvalue) {
          param.hhbm = hhbmvalue
        }

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

        this.flag = false
        this.$route.query.pjrq = null
        this.$route.query.sszh = null
        this.$route.query.xzc = null
        this.$route.query.xzz = null
        this.$route.query.hhbm = null
        this.$route.query.beginDay = null
        this.$route.query.endDay = null
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