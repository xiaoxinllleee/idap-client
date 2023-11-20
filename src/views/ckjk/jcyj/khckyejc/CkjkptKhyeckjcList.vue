<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="统计日期">
              <a-date-picker v-model="queryParam.tjrq" placeholder="请选择统计日期" style="width: 100%;"
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
            <a-form-item label="客户姓名">
              <j-input placeholder="请输入客户姓名" v-model="queryParam.khxm"></j-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="本月余额">
                <a-input placeholder="" v-model="queryParam.qmye_begin" style="width: 40%; text-align: center"/>
                <a-input placeholder="~" style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center" disabled/>
                <a-input placeholder="" v-model="queryParam.qmye_end" style="width: 40%; text-align: center; border-left: 0"/>
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
              <a-form-item label="上月年日平">
                <a-input placeholder="" v-model="queryParam.synrp_begin" style="width: 40%; text-align: center"/>
                <a-input placeholder="~" style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center" disabled/>
                <a-input placeholder="" v-model="queryParam.synrp_end" style="width: 40%; text-align: center; border-left: 0"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="余额占上月日平比例(%)">
                <a-input placeholder="" v-model="queryParam.yrpzjbl_begin" style="width: 40%; text-align: center"/>
                <a-input placeholder="~" style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center" disabled/>
                <a-input placeholder="" v-model="queryParam.yrpzjbl_end" style="width: 40%; text-align: center; border-left: 0"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="余额占上月年日平比例(%)">
                <a-input placeholder="" v-model="queryParam.nrpzjbl_begin" style="width: 40%; text-align: center"/>
                <a-input placeholder="~" style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center" disabled/>
                <a-input placeholder="" v-model="queryParam.nrpzjbl_end" style="width: 40%; text-align: center; border-left: 0"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="月日平增减标识">
                <j-dict-select-tag placeholder="请选择" v-model="queryParam.yrpzjbs" dict-code="zjbz"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="年日平增减标识">
                <j-dict-select-tag placeholder="请选择" v-model="queryParam.nrpzjbs" dict-code="zjbz"/>
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
      <a-button  icon="download" :loading="exportLoading" @click="handleExportXls('客户存款余额监测')" v-has="'khckyejc:exportXls'">导出</a-button>
      <a-button  icon="area-chart" @click="initData" v-has="'khckyejc:init'">提取</a-button>
     <!-- <a @click="handleToggleSearch" style="margin-left: 8px">
        {{ toggleSearchStatus ? '收起' : '展开' }}
        <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
      </a>-->
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
        :scroll="{x:2350}"
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

  </a-card>
</template>

<script>
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {getAction, putAction, httpAction} from '@/api/manage'
  import {filterObj} from '@/utils/util';
  import moment from 'moment'
  import JInput from "../../../../components/jeecg/JInput";
  import JEllipsis from "../../../../components/jeecg/JEllipsis";
  import store from '@/store/'
  import { downFile, postAction } from '@/api/manage'

  export default {
    name: "CkjkptKhyeckjcList",
    mixins: [JeecgListMixin],
    components: {
      JEllipsis,
      JInput,
      JTreeSelect
    },
    data() {
      return {
        description: '客户存款余额监测管理页面',
        monthFormat: 'YYYY-MM-DD',
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
            title: '统计日期',
            align: "center",
            dataIndex: 'tjrq',
            customRender: function (text) {
              return !text ? "" : (text.length > 10 ? text.substr(0, 10) : text)
            },
            sorter: true,
            width: 100,
          },
          {
            title: '机构代码',
            align: "center",
            dataIndex: 'jgdm',
            width: 100,
          },
          {
            title: '机构名称',
            align: "center",
            dataIndex: 'jgdm_dictText',
            width: 100,
          },
          {
            title: '员工工号',
            align:"center",
            dataIndex: 'yggh',
            width: 100,
          },
          {
            title: '员工姓名',
            align:"center",
            dataIndex: 'yggh_dictText',
            width: 100,
          },
          {
            title: '客户姓名',
            align: "center",
            dataIndex: 'khxm',
            scopedSlots: { customRender: 'customerName' },
            width: 100,
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            scopedSlots: { customRender: 'identNo' },
            width: 180,
          },
          {
            title: '电话号码',
            align: "center",
            dataIndex: 'dhhm',
            width: 150
          },
          {
            title: '地址',
            align: "center",
            scopedSlots: { customRender: 'address' },
            dataIndex: 'dz'
          },
          {
            title: '上月',
            align: 'center',
            children: [
              {
                title: '余额',
                align: "center",
                dataIndex: 'syye',
                width: 100
              },
              {
                title: '月日平',
                align: "center",
                dataIndex: 'syyrp',
                width: 100
              },
              {
                title: '年日平',
                align: "center",
                dataIndex: 'synrp',
                width: 100
              },
            ]
          },
          {
            title: '本月',
            align: 'center',
            children: [
              {
                title: '余额',
                align: "center",
                dataIndex: 'qmye',
                width: 100
              },
              {
                title: '月日平',
                align: "center",
                dataIndex: 'qmyrp',
                width: 100
              },
              {
                title: '年日平',
                align: "center",
                dataIndex: 'qmnrp',
                width: 100
              },
            ]
          },
          {
            title: '余额占上月日平比例(%)',
            align: "center",
            dataIndex: 'yrpzjbl',
            sorter: true,
            width: 200
          },
          {
            title: '月日平增减标识',
            align: "center",
            dataIndex: 'yrpzjbs_dictText',
            width: 130
          },
          {
            title: '余额占上月年日平比例(%)',
            align: "center",
            dataIndex: 'nrpzjbl',
            sorter: true,
            width: 200
          },
          {
            title: '年日平增减标识',
            align: "center",
            dataIndex: 'nrpzjbs_dictText',
            width: 130
          },
        ],
        url: {
          list: "/CkjkptKhyeckjc/ckjkptKhyeckjc/list",
          delete: "/CkjkptKhyeckjc/ckjkptKhyeckjc/delete",
          deleteBatch: "/CkjkptKhyeckjc/ckjkptKhyeckjc/deleteBatch",
          exportXlsUrl: "CkjkptKhyeckjc/ckjkptKhyeckjc/exportXls",
          importExcelUrl: "CkjkptKhyeckjc/ckjkptKhyeckjc/importExcel",
          extract: "/CkjkptKhyeckjc/ckjkptKhyeckjc/extract",
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
        let curMonth = {year: curDate.getFullYear(), month: curDate.getMonth() + 1, }
        this.defaultMonthOpera = moment(new Date(), this.monthFormat);
        this.queryParam = {tjrq: undefined};
        this.queryParam.tjrq=this.defaultMonthOpera;
      },
      searchReset() {
        this.flag = false;
        this.queryParam = {tjrq: undefined, jgdm: undefined};
        this.queryParam.tjrq=this.defaultMonthOpera;
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
          this.ipagination.current = 1
        }
        var params = this.getQueryParams();//查询条件
        if ((params.tjrq != undefined && params.tjrq != null)) {
          params.tjrq = moment(params.tjrq).format("YYYY-MM-DD");
        }
        this.loading = true
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
        let tjrq=''
        var params = Object.assign({}, this.queryParam)
        if (params.tjrq === undefined || params.tjrq === null) {
          this.$message.warning("请选择统计日期！")
          return false
        }else {
          tjrq = moment(params.tjrq).format("YYYY-MM-DD")
        }
        this.loading = true
        putAction(this.url.extract, {'tjyf': tjrq}).then((res) => {
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
        let tjrqMoment = "";
        if (this.queryParam.tjrq) {
          tjrqMoment = moment(this.queryParam.tjrq).format("YYYY-MM-DD")
        }
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.tjrq = tjrqMoment;
        return filterObj(param);
      },
      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let tjrq = ''
        let param = Object.assign({}, this.queryParam)

        if (this.queryParam.tjrq !== undefined && this.queryParam.tjrq !== null) {
          tjrq = moment(param.tjrq).format("YYYY-MM-DD")
        }
        param.tjrq=tjrq;
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