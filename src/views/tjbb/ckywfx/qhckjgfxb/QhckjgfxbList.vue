<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计日期">
              <a-date-picker placeholder="请选择统计日期" v-model="queryParam.tjrq" style="width: 100%;"
                             :defaultValue="defaultMonthOpera" :format="monthFormat"/><!--:defaultValue="defaultMonthOpera" :format="monthFormat"-->
            </a-form-item>
          </a-col>
          <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
          <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button icon="download"  :loading="exportLoading" @click="handleExportXls('全行存款结构分析表')" v-has="'qhckjgfxb:exportXls'">导出</a-button>
      <a-button icon="area-chart" @click="init" v-has="'qhckjgfxb:init'">提取</a-button>

      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
      <!--<a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:3960}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'qhckjgfxb:edit'">编辑</a>

          <a-divider type="vertical" />

            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)" v-has="'qhckjgfxb:delete'">
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
  import moment from 'moment'
  import {filterObj} from "@/utils/util";
  import { downFile, getAction, putAction } from '@/api/manage'
  import {notification} from "ant-design-vue";
  import store from '@views/tjbb/ckywfx/ckjgfxb/CkjgfxbList'

  export default {
    name: "QhckjgfxbList",
    mixins:[JeecgListMixin],
    components: {},
    data () {
      return {
        description: '全行存款结构分析表管理页面',
        defaultMonthOpera: '',
        monthFormat: 'YYYY-MM-DD',
        flag: true,
        isorter: {
          columns: 'tjrq',
          order: 'desc',
        },
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
            title: '统计日期',
            align: "center",
            dataIndex: 'tjrq',
            width: 100
          },

          {
            title: '存量总额',
            children: [
              {
                title: '存款余额',
                align: "center",
                dataIndex: 'ckye',
                width: 100
              },
              {
                title: '户数',
                align: "center",
                dataIndex: 'hs',
                width: 100
              }
            ]
          },

          {
            title: '按客户性质划分',
            children: [
              {
                title: '对私户数',
                align: "center",
                dataIndex: 'dshs',
                width: 100
              },
              {
                title: '对私余额',
                align: "center",
                dataIndex: 'dsye',
                width: 100
              },
              {
                title: '对公户数',
                align: "center",
                dataIndex: 'dghs',
                width: 100
              },
              {
                title: '对公余额',
                align: "center",
                dataIndex: 'dgye',
                width: 100
              },
            ]
          },

          {
            title: '按年龄划分',
            children: [
              {
                title: '<30岁(含)户数',
                align: "center",
                dataIndex: 'anlhs1',
                width: 120
              },
              {
                title: '<30岁(含)余额',
                align: "center",
                dataIndex: 'anlye1',
                width: 120
              },
              {
                title: '30-50(含)岁户数',
                align: "center",
                dataIndex: 'anlhs2',
                width: 130
              },
              {
                title: '30-50(含)岁余额',
                align: "center",
                dataIndex: 'anlye2',
                width: 130
              },
              {
                title: '50-65(含)岁户数',
                align: "center",
                dataIndex: 'anlhs3',
                width: 130
              },
              {
                title: '50-65(含)岁余额',
                align: "center",
                dataIndex: 'anlye3',
                width: 130
              },
              {
                title: '>65岁户数',
                align: "center",
                dataIndex: 'anlhs4',
                width: 100
              },
              {
                title: '>65岁余额',
                align: "center",
                dataIndex: 'anlye4',
                width: 100
              }
            ]
          },


          {
            title: '按余额划分',
            children:[
          {
            title: '<1万元(含)户数',
            align: "center",
            dataIndex: 'ayehs1',
            width: 130
          },
          {
            title: '<1万元(含)余额',
            align: "center",
            dataIndex: 'ayeye1',
            width: 130
          },
          {
            title: '1-5(含)万户数',
            align: "center",
            dataIndex: 'ayehs2',
            width: 130
          },
          {
            title: '1-5(含)万余额',
            align: "center",
            dataIndex: 'ayeye2',
            width: 130
          },
          {
            title: '5-10(含)万户数',
            align: "center",
            dataIndex: 'ayehs3',
            width: 130
          },
          {
            title: '5-10(含)万余额',
            align: "center",
            dataIndex: 'ayeye3',
            width: 130
          },
          {
            title: '10-50(含)万户数',
            align: "center",
            dataIndex: 'ayehs4',
            width: 130
          },
          {
            title: '10-50(含)万余额',
            align: "center",
            dataIndex: 'ayeye4',
            width: 130
          },
          {
            title: '>50万户数',
            align: "center",
            dataIndex: 'ayehs5',
            width: 100
          },
          {
            title: '>50万余额',
            align: "center",
            dataIndex: 'ayeye5',
            width: 100
          }
        ]
      },


      {
        title: '按活期/定期划分',
        children:[
          {
            title: '活期户数',
            align: "center",
            dataIndex: 'hqhs',
            width: 100
          },
          {
            title: '其中财政性资金户数',
            align: "center",
            dataIndex: 'hqCzxzjhs',
            width: 150
          },
          {
            title: '活期余额',
            align: "center",
            dataIndex: 'hqye',
            width: 100
          },
          {
            title: '其中财政性资金余额',
            align: "center",
            dataIndex: 'hqCzxzjye',
            width: 150
          },
          {
            title: '定期户数',
            align: "center",
            dataIndex: 'dqhs',
            width: 100
          },
          {
            title: '其中财政性资金户数',
            align: "center",
            dataIndex: 'dqCzxzjhs',
            width: 150
          },
          {
            title: '定期余额',
            align: "center",
            dataIndex: 'dqye',
            width: 100
          },
          {
            title: '其中财政性资金余额',
            align: "center",
            dataIndex: 'dqCzxzjye',
            width: 150
          }
        ]
      },

          /*{
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/qhckjgfxb/qhckjgfxb/list",
          delete: "/qhckjgfxb/qhckjgfxb/delete",
          deleteBatch: "/qhckjgfxb/qhckjgfxb/deleteBatch",
          exportXlsUrl: "qhckjgfxb/qhckjgfxb/exportXls",
          importExcelUrl: "qhckjgfxb/qhckjgfxb/importExcel",
          init: "/qhckjgfxb/qhckjgfxb/init",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created () {
      this.getCurrentDate()
    },
    methods: {
      getCurrentDate() {
        let curDate = new Date()
        this.defaultMonthOpera = moment(curDate,this.monthFormat)
        this.queryParam = {tjrq :undefined};
        this.queryParam.tjrq = this.defaultMonthOpera;
      },
      getQueryParams(){
        let tjrqment = "";
        if(this.queryParam.tjrq) {
          tjrqment = moment(this.queryParam.tjrq).format('YYYY-MM-DD');
        }
        var param = Object.assign({}, this.queryParam,this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjrq) {
          param.tjrq = tjrqment;
        }
        return filterObj(param);
      },

      init(){
        if (this.queryParam.tjrq === undefined || this.queryParam.tjrq === null) {
          notification.warning({ message: '系统提示', description: '请选择统计日期！',duration: 4})
          return false
        }
        let params = {'tjrq': moment(this.queryParam.tjrq).format("YYYY-MM-DD"),}
        this.loading = true
        putAction(this.url.init, params).then((res) => {
          if (res.success) {
            notification.success({ message: '系统提示', description: '提取成功！',duration: 4})
            this.loadData(1)
          } else {
            notification.warning({ message: '系统提示', description: '提取失败，请联系系统管理员！',duration: 4})
          }
        }).catch((error) => {
          notification.warning({ message: '系统提示', description: '提取失败，请联系系统管理员！'+error,duration: 4})
        }).finally(() => {
          this.loading = false
        })
      },
      handleExportXls(fileName){

        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let param = Object.assign({}, this.queryParam)
        let tjrq=''
        if (this.queryParam.tjrq === undefined && this.queryParam.tjrq === null) {
          notification.warning({ message: '系统提示', description: '请选择统计日期！',duration: 4})
          return false
        }else {
          tjrq = moment(this.queryParam.tjrq).format('YYYY-MM-DD');
        }
        param.tjrq=tjrq
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
          param['rowKey']=this.rowKey
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()));
        console.log(paramsStr)
        param.paramsStr = paramsStr
        console.log("导出参数",param)
        this.exportLoading=true
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
          this.exportLoading=false
        })
      },
      searchReset() {
        this.queryParam = {tjrq :undefined}
        this.queryParam.tjrq = this.defaultMonthOpera;
        this.loadData(1);
      },
      loadData(arg) {
        if(!this.url.list){
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();//查询条件
        if ((params.tjrq != undefined && params.tjrq != null)) {
          params.tjrq = moment(params.tjrq).format("YYYY-MM-DD");
        }
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
            this.loading = false;
          }
          if(res.code===510){
            this.$message.warning(res.message,5)
            this.loading = false;
          }
          this.loading = false;
        })
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>