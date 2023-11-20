<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" style="width: 100%;"
                              :defaultValue="defaultMonthOpera" :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <!--          <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
          <!--            <a-form-item label="机构代码">-->
          <!--              <a-input placeholder="请输入机构代码" v-model="queryParam.jgdm"></a-input>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择机构代码" v-model="queryParam.jgdm" dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             pid-field="sjywjgdm" treeNodeFilterProp="title"
                             :showSearch="true" :tree-default-expand-all="true"/>

            </a-form-item>
          </a-col>
          <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
          <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>

          <!--          <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
          <!--            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">-->
          <!--              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>-->
          <!--              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>-->
          <!--            </span>-->
          <!--          </a-col>-->

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('支行存贷款统计')"
                v-has="'zhcdktj:exportXls'">导出
      </a-button>
      <a-button @click="count" icon="area-chart" v-has="'zhcdktj:init'">提取</a-button>
      <!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
      <!--        <a-menu slot="overlay">-->
      <!--          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>-->
      <!--        </a-menu>-->
      <!--        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
      <!--      </a-dropdown>-->
    </div>

    <div>
      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :scroll="{x:2700}"
        :loading="loading"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'zhcdktj:edit'">编辑</a>

          <a-divider type="vertical" />
          <!--  <a-dropdown>
              <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
              <a-menu slot="overlay">
                <a-menu-item>
                   </a-menu-item>
              </a-menu>
            </a-dropdown>-->
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)" v-has="'zhcdktj:delete'">
                  <a>删除</a>
                </a-popconfirm>

        </span>

      </a-table>
    </div>
    <!-- table区域-end -->
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'
  import moment from 'moment'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { getAction, downFile } from '@/api/manage'
  import store from '@/store/'
  import notification from 'ant-design-vue/es/notification'

  export default {
    name: 'ErpYljcZhcdktjList',
    mixins: [JeecgListMixin],
    components: {
      JTreeSelect
    },
    data () {
      return {
        description: '支行存贷款统计管理页面',
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: '',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: function (t, r, index) {
              return parseInt(index) + 1
            }
          },
          {
            title: '统计月份',
            align: 'center',
            dataIndex: 'tjyf',
            customRender: function (text) {
              return !text ? '' : (text.length > 8 ? text.substr(0, 7) : text)
            }
          },
          {
            title: '机构代码',
            align: 'center',
            dataIndex: 'jgdm'
          },
          {
            title: '机构名称',
            align: 'center',
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '存款余额',
            align: 'center',
            dataIndex: 'ckye'
          },
          {
            title: '贷款余额',
            align: 'center',
            dataIndex: 'dkye'
          },
          {
            title: '存款日平余额',
            align: 'center',
            dataIndex: 'ckrpye'
          },
          {
            title: '贷款日平余额',
            align: 'center',
            dataIndex: 'dkrpye'
          },
          {
            title: '存款年日平余额',
            align: 'center',
            dataIndex: 'cknrpye'
          },
          {
            title: '贷款年日平余额',
            align: 'center',
            dataIndex: 'dknrpye'
          },
          {
            title: '上期存款余额',
            align: 'center',
            dataIndex: 'sqckye'
          },
          {
            title: '上期贷款余额',
            align: 'center',
            dataIndex: 'sqdkye'
          },
          {
            title: '上期存款日平余额',
            align: 'center',
            dataIndex: 'sqckrpye'
          },
          {
            title: '上期贷款日平余额',
            align: 'center',
            dataIndex: 'sqdkrpye'
          },
          {
            title: '上期存款年日平余额',
            align: 'center',
            dataIndex: 'sqcknrpye'
          },
          {
            title: '上期贷款年日平余额',
            align: 'center',
            dataIndex: 'sqdknrpye'
          },
          {
            title: '录入时间',
            align: 'center',
            dataIndex: 'lrsj'
          },
          {
            title: '录入标识',
            align: 'center',
            dataIndex: 'lrbz'
          },
          {
            title: '录入人',
            align: 'center',
            dataIndex: 'lrr'
          }

        ],
        url: {
          list: '/zhcdktj/erpYljcZhcdktj/list',
          delete: '/zhcdktj/erpYljcZhcdktj/delete',
          deleteBatch: '/zhcdktj/erpYljcZhcdktj/deleteBatch',
          exportXlsUrl: 'zhcdktj/erpYljcZhcdktj/exportXls',
          importExcelUrl: 'zhcdktj/erpYljcZhcdktj/importExcel',
          count: 'zhcdktj/erpYljcZhcdktj/count'
        }
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    created() {
      this.getCurrentMonth()
    },
    methods: {
      getCurrentMonth() {
        this.defaultMonthOpera = moment(new Date(), this.monthFormat);
        this.queryParam = {tjyf: undefined};
        this.queryParam.tjyf = this.defaultMonthOpera;
      },

      searchReset() {
        this.queryParam = {
          tjyf: undefined,
          jgdm: ''
        }
        this.queryParam.tjyf = this.defaultMonthOpera
        if (!store.getters.isRoot) {
          this.queryParam.jgdm = store.getters.ywjgdm
        }
        this.loadData(1)
      },

      loadData (arg) {
        if (!this.url.list) {
          this.$message.error('请设置url.list属性!')
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1
        }
        var params = this.getQueryParams();//查询条件
        console.info('loadData - 当前选择月份',params.tjyf)
        if (params.tjyf !== undefined && params.tjyf !== null) {
          params.tjyf = moment(params.tjyf).format("YYYY-MM") + '-01';
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

      getQueryParams () {
        //获取查询条件
        let sqp = {}
        if (this.superQueryParams) {
          sqp['superQueryParams'] = encodeURI(this.superQueryParams)
        }
        //日期格式调整
        let tjrqment = ''
        if (this.queryParam.tjyf) {
          tjrqment = moment(this.queryParam.tjyf).format('YYYY-MM') + '-01'
        }
        var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        if (param.tjyf) {
          param.tjyf = tjrqment
        }
        return filterObj(param)
      },

      handleExportXls(fileName) {
        if (!fileName || typeof fileName != "string") {
          fileName = "导出文件"
        }
        let tjyf = ''
        let param = Object.assign({}, this.queryParam)
        if (this.queryParam.tjyf !== undefined && this.queryParam.tjyf !== null) {
          tjyf = moment(param.tjyf).format("YYYY-MM") + '-01'
        }
        param.tjyf = tjyf;
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(",")
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()));
        param.paramsStr = paramsStr
        console.log("导出参数",param)
        this.exportLoading = true
        downFile(this.url.exportXlsUrl,param).then((data)=>{
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          var blob = new Blob([data]);
          if('msSaveOrOpenBlob' in navigator){
            window.navigator.msSaveOrOpenBlob(blob, fileName+'.xls');
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = fileName+'.xls';
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
        }).finally(()=>{
          this.exportLoading = false
          // this.loadData(1)
        })
      },

      count () {
        var params = this.getQueryParams()
        console.info('当前所选统计月份',params.tjyf)
        if (params.tjyf === undefined || params.tjyf === '') {
          notification.warning({message: '系统提示', description: '请选择统计月份！', duration:4})
          return
        }
        var param = {
          'tjyf': params.tjyf,
          'jgdm': params.jgdm === null ? "":params.jgdm
        }
        this.loading = true
        getAction(this.url.count, param).then((res) => {
          if (res.success) {
            notification.success({message: '系统提示', description: '提取成功！', duration:4})
            this.loadData(1)
          } else {
            notification.warning({message: '系统提示', description: '提取失败！'+res.message, duration:4})
          }
        }).catch((error) => {
          notification.error({message: '系统提示', description: '提取失败！'+error, duration:4})
        }).finally(() => {
          this.loading = false
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>