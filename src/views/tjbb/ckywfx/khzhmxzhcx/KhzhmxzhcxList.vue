<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="开户机构">
              <j-tree-select placeholder="请选择开户机构" v-model="queryParam.khjg" dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             pid-field="sjywjgdm" treeNodeFilterProp="title"
                              :tree-default-expand-all="true"></j-tree-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="账户">
              <a-input placeholder="请输入账户" v-model="queryParam.zh" allow-clear></a-input>
            </a-form-item>
          </a-col>
          <a-col  :span="8">
            <a-form-item label="账户类型">
              <j-dict-select-tag placeholder="请选择账户类型" v-model="queryParam.lx" dict-code="nbz_zhlx"></j-dict-select-tag>
            </a-form-item>
          </a-col>

        </a-row>

        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="交易日期">
              <a-date-picker placeholder="开始日期" v-model="queryParam.jyrq_begin" style="width: 45%;"></a-date-picker>
              <a-input placeholder="~" style="width: 10%; text-align: center;"></a-input>
              <a-date-picker placeholder="结束日期" v-model="queryParam.jyrq_end" :defaultValue="defaultDateOpera" style="width: 45%;" ></a-date-picker>
            </a-form-item>
          </a-col>
         <!-- <a-col :span="8"></a-col>
          <a-col :span="8"></a-col>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
             <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
            <a-button @click="searchReset" style="margin-left: 8px" icon="reload">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleExctract"  icon="area-chart" v-has="'khzhmxzhcx:init'">提取</a-button>
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('客户账户明细综合查询')" v-has="'khzhmxzhcx:exportXls'">导出</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
                @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
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
      </a-dropdown>-->

    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{
        selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table
        ref="table"
        size="small"
        bordered
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:4000,y:500}"
        @change="handleTableChange">

        <span slot="zh" slot-scope="text"><j-ellipsis :value="text" :length="17"></j-ellipsis></span>
        <span slot="hm" slot-scope="text"><j-ellipsis :value="text" :length="8"></j-ellipsis></span>
        <span slot="jymc" slot-scope="text"><j-ellipsis :value="text" :length="8"></j-ellipsis></span>
        <span slot="jygym" slot-scope="text"><j-ellipsis :value="text" :length="8"></j-ellipsis></span>
        <span slot="jyjgm" slot-scope="text"><j-ellipsis :value="text" :length="8"></j-ellipsis></span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
  </a-card>
</template>

<script>
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from "@/components/jeecg/JTreeSelect";
  import { downFile, getAction, postAction } from '@/api/manage'
  import JEllipsis from "@/components/jeecg/JEllipsis";
  import moment from "moment"
  import {notification} from "ant-design-vue";
  import store from '@/store/'

  export default {
    name: "KhzhmxzhcxList",
    mixins: [JeecgListMixin],
    components: {JEllipsis, JTreeSelect},
    data() {
      return {
        description: '客户账户明细综合查询管理页面',
        isorter: {
          order: 'desc'
        },
        defaultDateOpera:'',
        dateFormat: "YYYY-MM-DD",
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 50,
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '账户',
            align: "center",
            dataIndex: 'zh',
            scopedSlots: {customRender: 'zh'},
            width: 160,
          },
          {
            title: '户名',
            align: "center",
            dataIndex: 'hm',
            scopedSlots: {customRender: 'hm'},
            width: 150,
          },
          {
            title: '开户机构号',
            align: "center",
            dataIndex: 'khjg',
            width: 100,
          },
          {
            title: '开户机构名',
            align: "center",
            dataIndex: 'khjg_dictText',
            width: 100,
          },
          {
            title: '交易日期',
            align: "center",
            dataIndex: 'jyrq',
            sorter: true,
            width: 100,
          },
          {
            title: '交易时间',
            align: "center",
            dataIndex: 'jysj',
            width: 80,
          },
          {
            title: '流水号',
            align: "center",
            dataIndex: 'lsh',
            width: 100,
          },
          {
            title: '交易码',
            align: "center",
            dataIndex: 'jym',
            width: 100,
          },
          {
            title: '交易名称',
            align: "center",
            dataIndex: 'jymc',
            scopedSlots: {customRender: 'jymc'},
            width: 150,
          },
          {
            title: '交易金额',
            align: "center",
            dataIndex: 'jyje',
            width: 100,
            sorter: true
          },
          {
            title: '余额',
            align: "center",
            dataIndex: 'ye',
            width: 100,
            sorter: true
          },
          {
            title: '冲正标志',
            align: "center",
            dataIndex: 'czbz',
            width: 80,
          },
          {
            title: '交易柜员',
            align: "center",
            dataIndex: 'jygy',
            width: 100,
          },
          {
            title: '交易柜员名',
            align: "center",
            dataIndex: 'jygym',
            scopedSlots: {customRender: 'jygym'},
            width: 120,
          },
          {
            title: '交易机构',
            align: "center",
            dataIndex: 'jyjg',
            width: 100,
          },
          {
            title: '交易机构名',
            align: "center",
            dataIndex: 'jyjgm',
            scopedSlots: {customRender: 'jyjgm'},
            width: 150,
          },
          {
            title: '渠道类型',
            align: "center",
            dataIndex: 'qdlx',
            width: 80,
          },
          {
            title: '对方账户',
            align: "center",
            dataIndex: 'dfzh',
            scopedSlots: {customRender: 'jyjgm'},
            width: 160,
          },
          {
            title: '对方户名',
            align: "center",
            dataIndex: 'dfhm'
          },
          {
            title: '对方机构号',
            align: "center",
            dataIndex: 'dfjgh'
          },
          {
            title: '对方机构名',
            align: "center",
            dataIndex: 'dfjgm'
          },
          {
            title: '备注',
            align: "center",
            dataIndex: 'bz'
          },
          {
            title: '摘要',
            align: "center",
            dataIndex: 'zy'
          },
          {
            title: '渠道',
            align: "center",
            dataIndex: 'qd'
          },
          {
            title: '渠道流水号',
            align: "center",
            dataIndex: 'qdlsh'
          },
          {
            title: '渠道对方账户',
            align: "center",
            dataIndex: 'qddfzh'
          },
          {
            title: '渠道对方户名',
            align: "center",
            dataIndex: 'qddfhm'
          },
          {
            title: '渠道对方机构号',
            align: "center",
            dataIndex: 'qddfjgh'
          },
          {
            title: '渠道对方机构名',
            align: "center",
            dataIndex: 'qddfjgm'
          },
          {
            title: '渠道备注',
            align: "center",
            dataIndex: 'qdbz'
          },
          {
            title: '渠道附言',
            align: "center",
            dataIndex: 'qdfy'
          },
          {
            title: '账户类型',
            align: "center",
            dataIndex: 'lx_dictText'
          },
          // {
          //   title: '渠道交易金额',
          //   align: "center",
          //   dataIndex: 'qdjyje'
          // },
          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   align: "center",
          //   scopedSlots: {customRender: 'action'},
          // }
        ],
        url: {
          init: "/tjbb/ckywfx/khzhmxzhcx/init",
          list: "/tjbb/ckywfx/khzhmxzhcx/list",
          delete: "/tjbb/ckywfx/khzhmxzhcx/delete",
          deleteBatch: "/tjbb/ckywfx/khzhmxzhcx/deleteBatch",
          exportXlsUrl: "tjbb/ckywfx/khzhmxzhcx/exportXls",
          importExcelUrl: "tjbb/ckywfx/khzhmxzhcx/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created() {
      this.getCurrentMonth()
    },
    methods: {
      getCurrentMonth() {
        let curDate = new Date();
        //this.queryParam.jyrq_end = moment(curDate);
        console.info(curDate)
        this.defaultDateOpera = moment(curDate);
      },
    /*  initQueryParams() {
        if(!store.getters.isRoot) {
          this.queryParam.khjg = store.getters.userInfo.orgCode
          console.log(this.queryParam.khjg)
        }
        this.paramsInited = true
      },*/
      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let param = Object.assign({},this.queryParam)
        let jyrq_begin=''
        let jyrq_end=''
        if (this.queryParam.zh === undefined || this.queryParam.zh === "") {
          notification.warning({ message: '系统提示', description: '请填写账户！',duration: 4})
          return false
        }
        if (this.queryParam.jyrq_begin === undefined && this.queryParam.jyrq_begin === null&& this.queryParam.jyrq_end === undefined && this.queryParam.jyrq_end === null) {
          notification.warning({ message: '系统提示', description: '交易日期区间起止时间不能为空！',duration: 4})
          return false
        } else {
          jyrq_begin = moment(this.queryParam.jyrq_begin).format("YYYY-MM-DD")
          jyrq_end = moment(this.queryParam.jyrq_end).format("YYYY-MM-DD")
        }
        param.jyrq_begin=jyrq_begin
        param.jyrq_end=jyrq_end
        if (this.queryParam.lx === undefined || this.queryParam.lx === "") {
          notification.warning({ message: '系统提示', description: '请选择账户类型！',duration: 4})
          return false
        }

        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
          param['rowKey']=this.rowKey
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()));
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
        if ((params.jyrq_begin != undefined && params.jyrq_begin != null)) {
          params.jyrq_begin = moment(params.jyrq_begin).format("YYYY-MM-DD");
        }
        if ((params.jyrq_end != undefined && params.jyrq_end != null)) {
          params.jyrq_end = moment(params.jyrq_end).format("YYYY-MM-DD");
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
      searchQuery: function () {
        var params = this.getQueryParams();//查询条件
        console.info('查询校验条件', params.zh, params.lx, params.jyrq_begin, params.jyrq_end)
        if (params.zh === undefined || params.zh === "") {
          this.$message.warning("请填写账户！")
          return
        }
        if (params.jyrq_begin === undefined || params.jyrq_begin === null ) {
          this.$message.warning("交易日期区间起止时间不能为空！")
          return
        }
        if (params.lx === undefined || params.lx === "") {
          this.$message.warning("请选择账户类型！")
          return
        }
        this.loadData(1)
      },
      searchReset: function () {
        this.queryParam = {jgdm : "",jyrq_end : undefined}
        if (!store.getters.isRoot){
          this.queryParam.khjg=store.getters.ywjgdm
        }
        this.queryParam.jyrq_end = this.defaultDateOpera
        this.loadData(1)
      },
      handleExctract: function () {
        //查询条件
        var params = this.getQueryParams();
        if (params.zh === undefined || params.zh === "") {
          notification.warning({ message: '系统提示', description: '请填写账户！',duration: 4})
          return false
        }
        if (params.jyrq_begin === undefined || params.jyrq_begin === null || params.jyrq_end === undefined || params.jyrq_end === null) {
          notification.warning({ message: '系统提示', description: '交易日期区间起止时间不能为空！',duration: 4})
          return false
        }
        if (params.lx === undefined || params.lx === "") {
          notification.warning({ message: '系统提示', description: '请选择账户类型！',duration: 4})
          return false
        }
        let parameters = {
          'zh'   : params.zh,
          'zhlx' : params.lx,
          'jyrqQ': moment(params.jyrq_begin).format("YYYY-MM-DD"),
          'jyrqZ': moment(params.jyrq_end).format("YYYY-MM-DD")
        }
        this.loading = true
        postAction(this.url.init, parameters).then((response) => {
          if (response.success) {
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
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>