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
              <j-tree-select placeholder="请选择支行" v-model="queryParam.jgdm"
                             dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ywjgdm" pidField="sjywjgdm"
                             treeNodeFilterProp="title"
                              :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true" />
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户经理标识">
              <a-input placeholder="客户经理标识" v-model="queryParam.custid"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="员工工号">
                <a-input placeholder="员工工号" v-model="queryParam.yggh"></a-input>
              </a-form-item>
            </a-col>

            <!--          <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
            <!--            <a-form-item label="结息账号存款年日平余额">-->
            <!--              <a-input placeholder="请输入结息账号存款年日平余额" v-model="queryParam.jxcknrpye"></a-input>-->
            <!--            </a-form-item>-->
            <!--          </a-col>-->
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="开始日期">
                <a-range-picker @change="onChangeBeginday" v-model="queryParam.beginday" :default-value="[undefined, moment(new Date(), 'YYYY/MM/DD')]" />
              </a-form-item>
            </a-col>

            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="结束日期">
                <a-range-picker @change="onChangeEnd" v-model="queryParam.endday" :default-value="[undefined, moment(new Date(), 'YYYY/MM/DD')]"/>

              </a-form-item>
            </a-col>
            <!--          <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
            <!--            <a-form-item label="机构代码">-->
            <!--              <a-input placeholder="请输入机构代码" v-model="queryParam.jgdm"></a-input>-->
            <!--            </a-form-item>-->
            <!--          </a-col>-->
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="员工姓名">
                <a-input placeholder="员工姓名" v-model="queryParam.ygxm"></a-input>
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
          </a-col>

        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('客户经理存贷款统计')"
                v-has="'khjlcdktj:exportXls'">导出
      </a-button>
      <a-button @click="count" icon="area-chart" v-has="'khjlcdktj:init'">提取</a-button>
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
        :loading="loading"
        :scroll="{x:2650}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'khjlcdktj:edit'">编辑</a>

          <a-divider type="vertical" />
          <!--   <a-dropdown>
               <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
               <a-menu slot="overlay">
                 <a-menu-item>
                   </a-menu-item>
               </a-menu>
             </a-dropdown>-->
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)" v-has="'khjlcdktj:delete'">
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
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import moment from 'moment'
  import { filterObj } from '@/utils/util'
  import { getAction, downFile } from '@/api/manage'
  import store from '@/store/'
  export default {
    name: 'ErpYljcKhjldkkhzbtjList',
    mixins: [JeecgListMixin],
    components: {
      JTreeSelect
    },
    data () {

      return {
        description: '客户经理指标统计管理页面',
        defaultDateOpera:'',
        monthFormat: 'YYYY-MM',
        startTime: moment().subtract(2, "month").startOf("month").add(25, 'days'),
        endTime: moment().subtract(1, "month").startOf("month").add(24, 'days'),
        // 默认当前月份
        defaultMonthOpera: undefined,
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
            title: '开始日期',
            align: 'center',
            dataIndex: 'beginday'
          },
          {
            title: '结束日期',
            align: 'center',
            dataIndex: 'endday'
          },
          {
            title: '客户经理标识',
            align: 'center',
            dataIndex: 'custid'
          },
          {
            title: '员工工号',
            align: 'center',
            dataIndex: 'yggh'
          },
          {
            title: '员工姓名',
            align: 'center',
            dataIndex: 'ygxm'
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
            title: '存款年日平余额',
            align: 'center',
            dataIndex: 'cknrpye'
          },

          {
            title: '贷款当月日平余额',
            align: 'center',
            dataIndex: 'dkdyrp'
          },
          {
            title: '贷款年日平余额',
            align: 'center',
            dataIndex: 'dkrpye'
          },
          {
            title: '本月收回利息',
            align: 'center',
            dataIndex: 'byshlx'
          },
          {
            title: '权限内贷款户数',
            align: 'center',
            dataIndex: 'qxndkhs'
          },
          {
            title: '权限外贷款户数',
            align: 'center',
            dataIndex: 'qxwdkhs'
          },
          {
            title: '权限内贷款笔数',
            align: 'center',
            dataIndex: 'qxndkbs'
          },
          {
            title: '权限外贷款笔数',
            align: 'center',
            dataIndex: 'qxwdkbs'
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
            dataIndex: 'lrczy'
          }
        ],
        url: {
          list: '/khjlcdktj/erpYljcKhjldkkhzbtj/list',
          delete: '/khjlcdktj/erpYljcKhjldkkhzbtj/delete',
          deleteBatch: '/khjlcdktj/erpYljcKhjldkkhzbtj/deleteBatch',
          exportXlsUrl: 'khjlcdktj/erpYljcKhjldkkhzbtj/exportXls',
          importExcelUrl: 'khjlcdktj/erpYljcKhjldkkhzbtj/importExcel',
          count: 'khjlcdktj/erpYljcKhjldkkhzbtj/count'
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
      this.queryParam.beginday_end = moment(new Date()).format('YYYY-MM-DD');
      this.queryParam.endday_end = moment(new Date()).format('YYYY-MM-DD');
    },


    methods: {
      moment,
      count () {
        let params = this.queryParam
        var jgdm = params.jgdm
        var tjyf = ''
        if (this.queryParam.tjyf == null || this.queryParam.tjyf === '') {
          tjyf = moment(this.defaultMonthOpera).format('YYYY-MM') + '-01'
        } else {
          tjyf = moment(params.tjyf).format('YYYY-MM') + '-01'
        }
        //if (this.queryParam.jgdm == null || this.queryParam.jgdm === '') {
        //  this.$message.warning('请选择所属支行!')
        //  return
        //} else {
        //  jgdm = params.jgdm
        //}
        params = {
          tjyf: moment(params.tjyf).format('YYYY-MM') + '-01',
          jgdm: jgdm
        }
        params.tjyf = tjyf
        this.loading = true
        getAction(this.url.count, params).then((res) => {
          if (res.success) {
            this.$message.success('提取成功！')
            this.loadData(1)
          } else {
            this.$message.warning('提取失败！')
          }
        }).catch((error) => {
          this.$message.error('提取失败', error)
        }).finally(() => {
          this.loading = false
        })
      },
      onChangeBeginday: function (value, dateString) {
        let begindayString = dateString
        this.queryParam.beginday_begin = begindayString[0]
        this.queryParam.beginday_end = begindayString[1]
      },
      onChangeEnd: function (value, dateString) {
        let enddayString = dateString
        this.queryParam.endday_begin = enddayString[0]
        this.queryParam.endday_end = enddayString[1]
      },

      getCurrentMonth() {
        let curDate = new Date();
        let curMonth = {year: curDate.getFullYear(), month: curDate.getMonth() + 1,}
        this.defaultMonthOpera = moment(curDate, this.monthFormat);
        this.queryParam = {tjyf: undefined};
        this.queryParam.tjyf=this.defaultMonthOpera;
      },

      searchReset () {
        this.queryParam = { tjyf: undefined ,jgdm:''}
        this.queryParam.tjyf = this.defaultMonthOpera
        if(!store.getters.isRoot) {
          console.log( store.getters.ywjgdm)
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
        if ((params.tjyf != undefined && params.tjyf != null)) {
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
        delete param.beginday
        delete param.endday
        if (param.tjyf) {
          param.tjyf = tjrqment
        }
        return filterObj(param)
      },
      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let tjyf = ''
        let param = this.getQueryParams()
        if (this.queryParam.tjyf !== undefined && this.queryParam.tjyf !== null) {
          tjyf = moment(param.tjyf).format("YYYY-MM") + '-01'
        }
        param.tjyf=tjyf;
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
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
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>