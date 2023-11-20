<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" :defaultValue="defaultMonthOpera" :format="monthFormat" style="width: 100%;"/>
            </a-form-item>
          </a-col>
<!--          <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
<!--            <a-form-item label="机构代码">-->
<!--              <a-input placeholder="请输入机构代码" v-model="queryParam.jgdm"></a-input>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24"><a-form-item label="所属支行">
            <j-tree-select placeholder="请选择支行"
                           v-model="queryParam.jgdm"
                           treeNodeFilterProp="title"
                           pid-field="sjywjgdm"
                           dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                           :showSearch="true"
                           :treeDefaultExpandAll="true"/>
          </a-form-item></a-col>
          <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
          <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>

          <!--          <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
<!--            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">-->

<!--            </span>-->
<!--          </a-col>-->

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('网点存贷款统计')" v-has="'wdcdktj:exportXls'">导出</a-button>
      <a-button @click="count"  icon="area-chart" v-has="'wdcdktj:init'">提取</a-button>
      <!--<a-button type="primary" @click="dsjScript"  icon="search">大数据平台建表</a-button>-->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <div >
      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{ x: 2600 }"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'wdcdktj:edit'">编辑</a>

          <a-divider type="vertical" />
          <!--<a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                 </a-menu-item>
            </a-menu>
          </a-dropdown>-->
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)" v-has="'wdcdktj:delete'">
                  <a>删除</a>
                </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <erpYljcWdcdktj-modal ref="modalForm" @ok="modalFormOk"></erpYljcWdcdktj-modal>
  </a-card>
</template>

<script>
  import ErpYljcWdcdktjModal from './modules/ErpYljcWdcdktjModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import moment from 'moment'
  import { filterObj } from '@/utils/util';
  import { getAction,downFile } from '@/api/manage'
  import store from '@/store/'
  import notification from "ant-design-vue/lib/notification";

  export default {
    name: "ErpYljcWdcdktjList",
    mixins:[JeecgListMixin],
    components: {
      ErpYljcWdcdktjModal,JTreeSelect
    },
    data () {
      return {
        description: '网点存贷款统计管理页面',
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: '',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },
		   {
            title: '统计月份',
            align:"center",
            dataIndex: 'tjyf',
            customRender:function (text){
           return !text?"":(text.length>8?text.substr(0,7):text)
         }
           },
		   {
            title: '机构代码',
            align:"center",
            dataIndex: 'jgdm'
           },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
          },
		   {
            title: '存款余额',
            align:"center",
            dataIndex: 'ckye'
           },
		   {
            title: '贷款余额',
            align:"center",
            dataIndex: 'dkye'
           },
		   {
            title: '存款日平余额',
            align:"center",
            dataIndex: 'ckrpye'
           },
		   {
            title: '贷款日平余额',
            align:"center",
            dataIndex: 'dkrpye'
           },
		   {
            title: '存款年日平余额',
            align:"center",
            dataIndex: 'cknrpye'
           },
		   {
            title: '贷款年日平余额',
            align:"center",
            dataIndex: 'dknrpye'
           },
		   {
            title: '上期存款余额',
            align:"center",
            dataIndex: 'sqckye'
           },
		   {
            title: '上期贷款余额',
            align:"center",
            dataIndex: 'sqdkye'
           },
		   {
            title: '上期存款日平余额',
            align:"center",
            dataIndex: 'sqckrpye'
           },
		   {
            title: '上期贷款日平余额',
            align:"center",
            dataIndex: 'sqdkrpye'
           },
		   {
            title: '上期存款年日平余额',
            align:"center",
            dataIndex: 'sqcknrpye'
           },
		   {
            title: '上期贷款年日平余额',
            align:"center",
            dataIndex: 'sqdknrpye'
           },
        ],
        url: {
          list: "/wdcdktj/erpYljcWdcdktj/list",
          delete: "/wdcdktj/erpYljcWdcdktj/delete",
          deleteBatch: "/wdcdktj/erpYljcWdcdktj/deleteBatch",
          exportXlsUrl: "wdcdktj/erpYljcWdcdktj/exportXls",
          importExcelUrl: "wdcdktj/erpYljcWdcdktj/importExcel",
          count: "wdcdktj/erpYljcWdcdktj/count",
          //dsjScript:"wdcdktj/erpYljcWdcdktj/dsjScript",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
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

      loadData(arg) {
        if (!this.url.list) {
          this.$message.error("请设置url.list属性!")
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

      getQueryParams() {
        //获取查询条件
        let sqp = {}
        if (this.superQueryParams) {
          sqp['superQueryParams'] = encodeURI(this.superQueryParams)
        }
        //日期格式调整
        let tjrqment = ""
        if (this.queryParam.tjyf) {
          tjrqment = moment(this.queryParam.tjyf).format("YYYY-MM") + '-01'
        }
        var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf = tjrqment;
        }
        return filterObj(param);
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
        console.log("导出参数", param)
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

      count() {
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
            this.$message.success("提取成功！")
            this.loadData(1)
          } else {
            this.$message.warning("提取失败！")
          }
        }).catch((error) => {
          this.$message.error("提取失败", error)
        }).finally(() => {
          this.loading = false
        })
      },

      // dsjScript() {
      //   getAction(this.url.dsjScript, this.queryParam).then((res) => {
      //     if (res.code === 500) {
      //       this.$message.warning("建表成功")
      //     } else if (res.code === 200) {
      //       this.$message.success(建表失败)
      //     }
      //   }).finally((error) => {
      //     this.loading = false
      //   })
      // },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>