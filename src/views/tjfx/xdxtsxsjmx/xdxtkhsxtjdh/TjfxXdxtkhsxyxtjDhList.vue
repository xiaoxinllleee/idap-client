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
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh"
                             dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true"
                             :isAll="isAll"/>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="证件号码">
                <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="户主名称">
                <a-input placeholder="请输入户主名称" v-model="queryParam.hzmc"></a-input>
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
      <a-button type="primary" icon="download" @click="handleExportXls('单户授信用信数据')">导出</a-button>
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
        @change="handleTableChange">
        <span slot="detail" slot-scope="hhbm, record">
          <a @click="handlerDetailToGr(record, '/tjfx/xdxtsxsjmx/xdxtkhsxtjgr/TjfxXdxtkhsxyxtjGrList')">{{hhbm}}</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <tjfxXdxtkhsxyxtjDh-modal ref="modalForm" @ok="modalFormOk"></tjfxXdxtkhsxyxtjDh-modal>
  </a-card>
</template>

<script>
  import TjfxXdxtkhsxyxtjDhModal from './modules/TjfxXdxtkhsxyxtjDhModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'
  import moment from 'moment'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { getAction, putAction, httpAction, downFile } from '@/api/manage'
  import { mapGetters } from 'vuex'
  import store from '@/store/'

  export default {
    name: 'TjfxXdxtkhsxyxtjDhList',
    mixins: [JeecgListMixin],
    components: {
      TjfxXdxtkhsxyxtjDhModal, JTreeSelect
    },
    data() {
      return {
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: undefined,
        description: ' 单户授信用信数据管理页面',
        sfktsjyxdy: 1,
        isorter: {
          column: 'tjyf',
          order: 'desc'
        },
        flag: true,
        // 表头
        isAll: false,
        sszh: '',
        columns: [
          {
            title: '统计月份',
            align: 'center',
            dataIndex: 'tjyf',
            width: 100,
            customRender: function(text) {
              return !text ? '' : (text.length > 8 ? text.substr(0, 7) : text)
            }
          },
          {
            title: '组织标识',
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
            title: '证件号码',
            align: 'center',
            dataIndex: 'zjhm'
          },
          {
            title: '户主名称',
            align: 'center',
            dataIndex: 'hzmc'
          },
          {
            title: '户号编码',
            align: 'center',
            dataIndex: 'hhbm',
            scopedSlots: { customRender: 'detail' }
          },
          {
            title: '客户类型',
            align: 'center',
            dataIndex: 'khlx_dictText'
          },
          {
            title: '授信额度',
            align: 'center',
            dataIndex: 'sxed'
          },
          {
            title: '授信户数',
            align: 'center',
            dataIndex: 'sxhs'
          },
          {
            title: '用信额度',
            align: 'center',
            dataIndex: 'yxed'
          },
          {
            title: '用信户数',
            align: 'center',
            dataIndex: 'yxhs'
          },
          {
            title: '合同可用金额',
            align: 'center',
            dataIndex: 'htkyje'
          }

        ],
        url: {
          list: '/TjfxXdxtkhsxyxtjDh/tjfxXdxtkhsxyxtjDh/list',
          delete: '/TjfxXdxtkhsxyxtjDh/tjfxXdxtkhsxyxtjDh/delete',
          deleteBatch: '/TjfxXdxtkhsxyxtjDh/tjfxXdxtkhsxyxtjDh/deleteBatch',
          exportXlsUrl: 'TjfxXdxtkhsxyxtjDh/tjfxXdxtkhsxyxtjDh/exportXls',
          importExcelUrl: 'TjfxXdxtkhsxyxtjDh/tjfxXdxtkhsxyxtjDh/importExcel'
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
      moment,
      getCurrentMonth() {
        let curDate = new Date();
        let curMonth= { year : curDate.getFullYear(), month: curDate.getMonth() + 1, }
        this.defaultMonthOpera = moment(curDate);
      },
      loadData(arg) {
        this.getCurrentMonth();
        if(!this.url.list){
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();//查询条件
        if ((params.tjyf=='undefined' || params.tjyf==null) && this.flag==true) {
          params.tjyf = this.defaultMonthOpera.format("YYYY-MM")+'-01';
        }
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          }
          if(res.code===510){
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })
      },
      ...mapGetters(['nickname', 'avatar', 'userInfo']),
      initQueryParams() {
        if (!store.getters.isRoot) {
          //this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.paramsInited = true
      },
      searchReset() {

        this.flag = false
        this.$route.query.tjyf = null
        this.$route.query.sszh = null
        this.$route.query.xzc = null
        this.queryParam = {}
        if(!store.getters.isRoot) {
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
      handleExportXls(fileName) {
        var param = this.getQueryParams();//查询条件
        if ((param.tjyf=='undefined' || param.tjyf==null) && this.flag==true) {
          param.tjyf = this.defaultMonthOpera.format("YYYY-MM")+'-01';
        }
        if (!fileName || typeof fileName != 'string') {
          fileName = '导出文件'
        }
        //let param = { ...this.queryParam }
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(',')
        }
        // if (param.tjyf != null) {
        //   param.tjyf = param.tjyf.format('YYYY-MM') + '-01'
        // }
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
      getQueryParams() {
        //获取查询条件
        let sqp = {}
        if (this.superQueryParams) {
          sqp['superQueryParams'] = encodeURI(this.superQueryParams)
        }
        let tjyfMoment = ''
        if (this.queryParam.tjyf) {
          tjyfMoment = this.queryParam.tjyf.format('YYYY-MM') + '-01'
        }
        var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        param.tjyf = tjyfMoment
        return filterObj(param)
      },
      handlerDetailToGr: function(record, path) {
        // 获取月初、月末日期
        this.beginDay = moment(record.tjyf, this.dateFormat).startOf('month').format('YYYY-MM-DD')
        this.endDay = moment(record.tjyf, this.dateFormat).endOf('month').format('YYYY-MM-DD')
        console.log('月初日期：' + this.beginDay)
        console.log('月末日期：' + this.endDay)
        this.$router.push({
          path: path,
          query: {
            beginDay: this.beginDay, endDay: this.endDay,
            tjyf: record.tjyf, sszh: record.sszh, szc: record.xzc, xzz: record.xzz, hhbm: record.hhbm
          }
        })
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>