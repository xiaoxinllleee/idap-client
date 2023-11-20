<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" style="width: 100%;"
                              :defaultValue="defaultMonthOpera" :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="所属机构">
              <j-tree-select placeholder="请选择所属机构" v-model="queryParam.jgdm" dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             pid-field="sjywjgdm" treeNodeFilterProp="title"
                             :showSearch="true" :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.khxm"></j-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="本月月日平">
                <a-input placeholder="" v-model="queryParam.qmyrp_begin" style="width: 40%; text-align: center"/>
                <a-input placeholder="~" style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center" disabled/>
                <a-input placeholder="" v-model="queryParam.qmyrp_end" style="width: 40%; text-align: center; border-left: 0"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="上月月日平">
                <a-input placeholder="" v-model="queryParam.syyrp_begin" style="width: 40%; text-align: center"/>
                <a-input placeholder="~" style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center" disabled/>
                <a-input placeholder="" v-model="queryParam.syyrp_end" style="width: 40%; text-align: center; border-left: 0"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="日平增减比例(%)">
                <a-input placeholder="" v-model="queryParam.yrpzjbl_begin" style="width: 40%; text-align: center"/>
                <a-input placeholder="~" style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center" disabled/>
                <a-input placeholder="" v-model="queryParam.yrpzjbl_end" style="width: 40%; text-align: center; border-left: 0"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="增减标识">
                <j-dict-select-tag placeholder="请选择增减标识" v-model="queryParam.zjbs" dict-code="zjbz"></j-dict-select-tag>
              </a-form-item>
            </a-col>
          </template>

          <a-col :md="6" :sm="8">
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
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('客户存款日平监测')" v-has="'hkckrpjc:exportXls'">导出</a-button>
      <a-button icon="area-chart" @click="initData" v-has="'hkckrpjc:init'">提取</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table
        bordered
        ref="table"
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:2500}"
        @change="handleTableChange">
        <span slot="customerName" slot-scope="text">
          <j-ellipsis :value="text" :length="10"></j-ellipsis>
        </span>
        <span slot="identNo" slot-scope="text">
          <j-ellipsis :value="text" :length="18"></j-ellipsis>
        </span>
        <span slot="address" slot-scope="text">
          <j-ellipsis :value="text" :length="10"></j-ellipsis>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->
    <!-- <a-table :columns="columns" :dataSource="dataSource" :scroll="{ x: 3500, y: 300 }" bordered>
     </a-table>-->

  </a-card>
</template>

<script>
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {filterObj} from '@/utils/util';
  import {getAction, putAction, httpAction} from '@/api/manage'
  import JInput from '../../../../components/jeecg/JInput'
  import moment from 'moment'
  import { downFile, postAction } from '../../../../api/manage'
  import JEllipsis from "../../../../components/jeecg/JEllipsis";
  import store from '@/store/'

  export default {
    name: "CkjkptKhckrpjcList",
    mixins: [JeecgListMixin],
    components: {
      JEllipsis,
      JInput,
      JTreeSelect
    },
    data() {
      return {
        description: '客户存款日平监测管理页面',
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: '',
        // 重置标识
        flag: true,
        show: true,
        isorter: {
          order: 'desc',
        },
        // 表头
        columns: [
          {
            title: '统计月份',
            align: "center",
            dataIndex: 'tjyf',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            },
            sorter: true,
            width: '100',
          },
          {
            title: '机构代码',
            align: "center",
            dataIndex: 'jgdm',
            width: '100',
          },
          {
            title: '机构名称',
            align: "center",
            dataIndex: 'jgdm_dictText',
            width: '100',
          },
          {
            title: '员工工号',
            align:"center",
            dataIndex: 'yggh',
            width: '80',
          },
          {
            title: '员工姓名',
            align:"center",
            dataIndex: 'yggh_dictText',
            width: '100',
          },
          {
            title: '客户姓名',
            align: "center",
            dataIndex: 'khxm',
            scopedSlots: { customRender: 'customerName' },
            width: '150',
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            scopedSlots: { customRender: 'identNo' },
            width: '150',
          },
          {
            title: '电话号码',
            align: "center",
            dataIndex: 'dhhm'
          },
          {
            title: '地址',
            align: "center",
            dataIndex: 'dz',
            scopedSlots: { customRender: 'address' },
            width: '150',
          },
          {
            title: '上月',
            align: 'center',
            children: [
              {
                title: '余额',
                align: "center",
                dataIndex: 'syye',
                sorter: true,
                width: '100',
              },
              {
                title: '月日平',
                align: "center",
                dataIndex: 'syyrp',
                sorter: true,
                width: '100',
              },
              {
                title: '年日平',
                align: "center",
                dataIndex: 'synrp',
                sorter: true,
                width: '100',
              },
            ],
          },
          {
            title: '本月',
            align: 'center',
            children: [
              {
                title: '余额',
                align: "center",
                dataIndex: 'qmye',
                sorter: true,
                width: '100',
              },
              {
                title: '月日平',
                align: "center",
                dataIndex: 'qmyrp',
                sorter: true,
                width: '100',
              },
              {
                title: '年日平',
                align: "center",
                dataIndex: 'qmnrp',
                sorter: true,
                width: '100',
              },
            ],
          },
          {
            title: '月日平增减比例',
            align: "center",
            dataIndex: 'yrpzjbl',
            sorter: true,
            width: '100',
          },
          {
            title: '增减标识',
            align: "center",
            dataIndex: 'zjbs_dictText',
            width: '100',
          },
        ],
        url: {
          list: "/CkjkptKhckrpjc/ckjkptKhckrpjc/list",
          delete: "/CkjkptKhckrpjc/ckjkptKhckrpjc/delete",
          deleteBatch: "/CkjkptKhckrpjc/ckjkptKhckrpjc/deleteBatch",
          exportXlsUrl: "CkjkptKhckrpjc/ckjkptKhckrpjc/exportXls",
          importExcelUrl: "CkjkptKhckrpjc/ckjkptKhckrpjc/importExcel",
          extract: "/CkjkptKhckrpjc/ckjkptKhckrpjc/extract"
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
        let curMonth = {year: curDate.getFullYear(), month: curDate.getMonth() + 1,}
        this.defaultMonthOpera = moment(curDate, this.monthFormat);
        this.queryParam = {tjyf: undefined};
        this.queryParam.tjyf=this.defaultMonthOpera;
      },
      searchReset() {
        this.flag = false;
        this.queryParam = {tjyf: undefined, jgdm: undefined};
        this.queryParam.tjyf = this.defaultMonthOpera;
        if(!store.getters.isRoot) {
          this.queryParam.jgdm = store.getters.ywjgdm
        }
        this.loadData(1);
      },
      loadData(arg) {
        if (!this.url.list) {
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          // this.ipagination.current = 1;
        }
        var params = this.getQueryParams();//查询条件
        if ((params.tjyf != undefined && params.tjyf != null)) {
          params.tjyf = moment(params.tjyf).format("YYYY-MM") + '-01';
        }
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          }
          if (res.code === 510) {
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })
      },
      initData() {
        let tjyf=''
        var params = Object.assign({}, this.queryParam)
        if (params.tjyf === undefined || params.tjyf === null) {
          this.$message.warning("请选择统计月份！")
          return false
        }else {
          tjyf = moment(params.tjyf).format("YYYY-MM")+"-01"
        }
        this.loading = true
        putAction(this.url.extract, {'tjyf': tjyf}).then((res) => {
          if (res.success) {
            this.$message.success("提取成功！")
            this.loadData(1)
          } else {
            this.$message.warning("提取失败！")
          }
        }).catch((error) => {
          this.$message.error("提取失败！", error)
        }).finally(() => {
          this.loading = false
        })
      },
      getQueryParams() {
        let tjyfMoment = "";
        if (this.queryParam.tjyf) {
          tjyfMoment = moment(this.queryParam.tjyf).format("YYYY-MM") + '-01';
        }
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf = tjyfMoment;
        }
        return filterObj(param);
      },

      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let tjyf = ''
        let param = Object.assign({}, this.queryParam)
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