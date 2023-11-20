<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计入账日期起">
              <a-date-picker placeholder="统计入账日期起"  :format="dateFormat" v-model="queryParam.tjrqq" style="width: 100%;" @change="tjrqqChange"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计入账日期止">
              <a-date-picker placeholder="统计入账日期止"  :format="dateFormat" v-model="queryParam.tjrqz" style="width: 100%;" @change="tjrqzChange"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="入账网点">
              <!--<a-input placeholder="请输入入账网点" v-model="queryParam.rzwd"></a-input>-->
              <j-tree-select placeholder="请选择机构代码"
                             v-model="queryParam.rzwd"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="校验标志">
                <a-select placeholder="请选择校验标志" v-model="queryParam.jybz">
                  <a-select-option value="1">
                    不通过
                  </a-select-option>
                  <a-select-option value="2">
                    通过
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="">
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="">
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="">
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
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <!--<a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('表外贷款收回统计')"
                v-has="'bwdkshtj:exportXls'">导出
      </a-button>
      <a-button icon="area-chart" @click="init" v-has="'bwdkshtj:init'">统计</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table ref="table"
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
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                  <a>删除</a>
            </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    </a-card>
</template>

<script>
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import moment from 'moment'
  import {postAction, getAction, downFile} from "../../../../api/manage";
  import {filterObj} from '@/utils/util';
  import {notification} from "ant-design-vue";

  export default {
    name: "BwdkshtjList",
    mixins: [JeecgListMixin],
    components: {
      JTreeSelect
    },
    data() {
      return {
        description: '表外贷款收回统计管理页面',
        dateFormat: 'YYYY-MM-DD',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '统计日期起',
            align: "center",
            dataIndex: 'tjrqq'
          },
          {
            title: '统计日期止',
            align: "center",
            dataIndex: 'tjrqz'
          },
          {
            title: '入账网点',
            align: "center",
            dataIndex: 'rzwd_dictText'
          },
          {
            title: '收回本息金额',
            align: "center",
            dataIndex: 'shbxje'
          },
          {
            title: '收回报表本金',
            align: "center",
            dataIndex: 'shbbbj'
          },
          {
            title: '收回核销本金',
            align: "center",
            dataIndex: 'shhxbj'
          },
          {
            title: '收回核销利息',
            align: "center",
            dataIndex: 'shhxlx'
          },
          {
            title: '收回利息',
            align: "center",
            dataIndex: 'shlx'
          },
          {
            title: '应入账核销贷款利息',
            align: "center",
            dataIndex: 'yrzhxdklx'
          },
          {
            title: '校验标识',
            align: "center",
            dataIndex: 'jybz_dictText'
          },
          {
            title: '统计人',
            align: "center",
            dataIndex: 'lrr'
          },
          {
            title: '统计时间',
            align: "center",
            dataIndex: 'lrsj'
          },
        ],
        url: {
          list: "/bwdkshtj/bwdkshtj/list",
          delete: "/bwdkshtj/bwdkshtj/delete",
          deleteBatch: "/bwdkshtj/bwdkshtj/deleteBatch",
          exportXlsUrl: "bwdkshtj/bwdkshtj/exportXls",
          importExcelUrl: "bwdkshtj/bwdkshtj/importExcel",
          init: "/bwdkshtj/bwdkshtj/init",
        },
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created() {
      this.rangeFC()
    },
    methods: {
      moment,

      //默认值
      rangeFC() {
        this.queryParam = {
          tjrqq: undefined,
          tjrqz: undefined
        }
        this.queryParam.tjrqq = moment(this.getCurrentDataFront()).format(this.dateFormat)
        this.queryParam.tjrqz = moment(this.getCurrentData()).format(this.dateFormat)
        console.info('统计入账日期起:',this.queryParam.tjrqq)
        console.info('统计入账日期止:',this.queryParam.tjrqz)
      },
      //统计入账日期-起
      getCurrentDataFront () {
        var date = new Date()
        date.setDate(1)
        var month = parseInt(date.getMonth() + 1)
        var day = date.getDate()
        if (month < 10) {
          month = '0' + month
        }
        if (day < 10) {
          day = '0' + day
        }
        const time = date.getFullYear() + '-' + month + '-' + day
        //console.info('本月月初日期：',time)
        return time
      },
      //统计入账日期-止
      getCurrentData () {
        let time = new Date().toLocaleDateString()
        return time
      },
      tjrqqChange(e) {
        // console.info('统计入账日期起-change:',e)
      },
      tjrqzChange(e) {
        // console.info('统计入账日期止-change:',e)
      },

      loadData(arg) {
        //this.getCurrentMonth()
        if (!this.url.list) {
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();//查询条件
        console.info(params)
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
            this.loading = false;
          } else {
            this.dataSource = [];
            this.ipagination.total = 0;
            this.loading = false;
          }
          if (res.code === 510) {
            this.$message.warning(res.message,5)
            this.loading = false;
          }
          this.loading = false;
        })
      },
      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        return filterObj(param);
      },
      handleExportXls(fileName) {
        if (!fileName || typeof fileName != "string") {
          fileName = "导出文件"
        }
        let param = this.getQueryParams();
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(",")
          param['rowKey'] = this.rowKey
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()));
        param.paramsStr = paramsStr
        console.log("导出参数", param)
        this.exportLoading = true
        downFile(this.url.exportXlsUrl, param).then((data) => {
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          var blob = new Blob([data]);
          if ('msSaveOrOpenBlob' in navigator) {
            window.navigator.msSaveOrOpenBlob(blob, fileName + '.xls');
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = fileName + '.xls';
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
          this.exportLoading = false
        })
      },
      init() {
        //查询条件
        var param = this.getQueryParams();
        console.info('统计入账日期-起:',param.tjrqq)
        console.info('统计入账日期-止:',param.tjrqz)
        console.info('查询条件',param)
        if (param.tjrqq === undefined || param.tjrqz === undefined) {
          notification.warning({message: '系统提示', description: '请选择统计入账日期！', duration: 4})
          return
        } else {
          param.tjrqq = moment(param.tjrqq).format(this.dateFormat)
          param.tjrqz = moment(param.tjrqz).format(this.dateFormat)
        }
        let params = {
         'tjrqq': param.tjrqq,
         'tjrqz': param.tjrqz,
         'rzwd' : param.rzwd == null ? "" : param.rzwd,
        }
        console.info('提取条件:',params)
        this.loading = true;
        postAction(this.url.init, params).then((res) => {
          if (res.success) {
            notification.success({message: '系统提示', description: '提取成功！', duration: 4})
            this.loadData(1)
          } else {
            notification.warning({message: '系统提示', description: '提取失败！', duration: 4})
          }
        }).catch((error) => {
          notification.error({message: '系统提示', description: '提取失败！'+error, duration: 4})
        }).finally(() => {
          this.loading = false
        })
      },
      searchReset() {
        this.queryParam = {
          tjrqq: undefined,
          tjrqz: undefined
        }
        this.rangeFC()
        this.loadData(1)
      }
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>