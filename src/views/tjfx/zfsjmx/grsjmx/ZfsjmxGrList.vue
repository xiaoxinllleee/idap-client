<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="走访日期">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.tjrq" :format="DateFormat"
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
          <a-col :md="6" :sm="8">
            <a-form-item label="行政村">
              <j-input placeholder="请输入行政村" v-model="queryParam.xzc" type="likemore"/>
            </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="行政组" v-if="this.sfktsjyxdy==1">
                <!--<j-dict-select-tag placeholder="请输入行政组" v-model="queryParam.xzz" dict-code="V_CZXXGL_ORGANIZE,ORGANIZE,QYBM"/>-->
                <j-input placeholder="请输入行政组" v-model="queryParam.xzz"/>
              </a-form-item>
            </a-col>

            <a-col :md="6" :sm="8">
              <a-form-item label="责任人">
                <j-dict-select-tag placeholder="请选择责任人" v-model="queryParam.zkhjl" dict-code="HR_BAS_STAFF,YGXM,YGGH"
                                   :show-search="true"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="户号编码">
                <j-input placeholder="请输入户号编码" v-model="queryParam.hhbm"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="客户名称">
                <j-input placeholder="请输入客户名称" v-model="queryParam.khmc" type="likemore"/>
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
      <a-button type="primary" icon="download" @click="handleExportXls('个人走访数据统计')">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{
        selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table ref="table"
               size="middle"
               bordered
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               :scroll="{ x: 2300 }"
               @change="handleTableChange">
        <!--        <span slot="action" slot-scope="text, record">-->
        <!--          <a @click="handleEdit(record)">编辑</a>-->
        <!--          <a-divider type="vertical" />-->
        <!--          <a-dropdown>-->
        <!--            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>-->
        <!--            <a-menu slot="overlay">-->
        <!--              <a-menu-item>-->
        <!--                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">-->
        <!--                  <a>删除</a>-->
        <!--                </a-popconfirm>-->
        <!--              </a-menu-item>-->
        <!--            </a-menu>-->
        <!--          </a-dropdown>-->
        <!--        </span>-->
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <zfsjmxGr-modal ref="modalForm" @ok="modalFormOk"></zfsjmxGr-modal>
  </a-card>
</template>

<script>
  import ZfsjmxGrModal from './modules/ZfsjmxGrModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../components/jeecg/JTreeSelect'
  import JInput from '../../../../components/jeecg/JInput'
  import { filterObj } from '@/utils/util'
  import { getAction, putAction, httpAction, downFile } from '@/api/manage'
  import { mapGetters } from 'vuex'
  import store from '@/store/'


  export default {
    name: 'ZfsjmxGrList',
    mixins: [JeecgListMixin],
    components: {
      JInput,
      JTreeSelect,
      ZfsjmxGrModal
    },
    data() {
      return {
        DateFormat: 'YYYY-MM-DD',
        sfktsjyxdy: 1,
        description: '个人走访数据统计管理页面',
        isorter: {
          column: 'tjrq',
          order: 'desc'
        },
        // 表头
        isAll: false,
        sszh: '',
        columns: [
          {
            title: '走访日期',
            align: 'center',
            dataIndex: 'tjrq',
            customRender: function(text) {
              return !text ? '' : (text.length > 10 ? text.substr(0, 10) : text)
            },
            sorter: (a, b) => b.tjrq.replace(/-/g, '/') - a.tjrq.replace(/-/g, '/')
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
            title: '行政组',
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
            dataIndex: 'sfhz_dictText',
            filters: [
              { text: '是', value: '1' },
              { text: '否', value: '2' }
            ],
            onFilter: (value, record) => record.sfhz.indexOf(value) === 0
          },
          {
            title: '客户类型',
            align: 'center',
            dataIndex: 'khlx_dictText'
          },
          {
            title: '客户名称',
            align: 'center',
            dataIndex: 'khmc'
          },
          {
            title: '证件号码',
            align: 'center',
            dataIndex: 'zjhm'
          },
          {
            title: '是否上传附件',
            align: 'center',
            dataIndex: 'sfscfj_dictText'
          },
          {
            title: '符合采集标准家庭人数',
            align: 'center',
            dataIndex: 'jtrs'
          },
          {
            title: '实际采集人数',
            align: 'center',
            dataIndex: 'cjrs'
          },
          {
            title: '采集字段达标家庭人数',
            align: 'center',
            dataIndex: 'zddbjtrs'
          },
          {
            title: '单户附件数量',
            align: 'center',
            dataIndex: 'dhfjsl'
          },
          {
            title: '采集人',
            align: 'center',
            dataIndex: 'cjr_dictText'
          },
          {
            title: '手机号码',
            align: 'center',
            dataIndex: 'sjhm'
          },
          {
            title: '是否外出打工',
            align: 'center',
            dataIndex: 'sfycdg_dictText'
          },
          {
            title: '客户重要程度',
            align: 'center',
            dataIndex: 'kfyyqk_dictText'
          },
          {
            title: '备用号码',
            align: 'center',
            dataIndex: 'byhm'
          },
          {
            title: '住址',
            align: 'center',
            dataIndex: 'zz'
          }
        ],
        url: {
          list: '/tjfx.zfsjmx/grsjmx/list',
          delete: '/tjfx.zfsjmx/grsjmx/delete',
          deleteBatch: '/tjfx.zfsjmx/grsjmx/deleteBatch',
          exportXlsUrl: 'tjfx.zfsjmx/grsjmx/exportXls',
          importExcelUrl: 'tjfx.zfsjmx/grsjmx/importExcel'
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
      this.querycsz()
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
        this.queryParam.tjrq_begin = dqrqDateString[0]
        this.queryParam.tjrq_end = dqrqDateString[1]
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
        let sszhValue = this.$route.query.sszh
        let xzcValue = this.$route.query.xzc
        let xzzValue = this.$route.query.xzz
        let hhbmValue = this.$route.query.hhbm

        var param = Object.assign({}, this.queryParam, this.isorter)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        if (sszhValue) {
          param.sszh = sszhValue
        }
        if (xzcValue) {
          param.xzc = xzcValue
        }
        if (xzzValue) {
          param.xzz = xzzValue
        }
        if (hhbmValue) {
          param.hhbm = hhbmValue
        }
        delete param.tjrq
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

        delete param.tjrq
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
        this.$route.query.beginDay = null
        this.$route.query.endDay = null
        this.$route.query.sszh = null
        this.$route.query.xzc = null
        this.$route.query.xzz = null
        this.$route.query.hhbm = null
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