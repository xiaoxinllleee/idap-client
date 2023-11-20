<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="定价年份">
              <a-select placeholder="请选择定价年份" v-model="djnf" @change="selectValue" :allowClear="true">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="组织标识">
              <j-tree-select placeholder="请选择支行查询" v-model="queryParam.zzbz"
                             dict="hr_bas_organization,zzjc,zzbz" pidField="sjzzbz"
                             :sszh="true" :showSearch="true" :treeDefaultExpandAll="true" treeNodeFilterProp="title"/><!-- getAllZzjg="1" 获取所有组织机构-->
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="客户名称">
                <j-input placeholder="请输入客户名称" v-model="queryParam.khmc"></j-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="定价编号">
                <a-input placeholder="请输入定价编号" v-model="queryParam.djid"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="定价类别">
                <j-dict-select-tag placeholder="定价类别" v-model="queryParam.djbs" dict-code="djbs"></j-dict-select-tag>
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
      <a-button icon="download" @click="handleExportXls('客户历史定价查询')" v-has="'khlsdjcx:exportXls'">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>

      <a-table
        ref="table"
        size="small"
        bordered
        rowKey="djid"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{ x: 2000, y: 500 }"
        @change="handleTableChange">

        <span slot="zzmc" slot-scope="text">
          <j-ellipsis :value="text" :length="5"></j-ellipsis>
        </span>
        <span slot="djid" slot-scope="text">
          <j-ellipsis :value="text+''" :length="10"></j-ellipsis>
        </span>
        <span slot="zjhm" slot-scope="text">
          <j-ellipsis :value="text" :length="18"></j-ellipsis>
        </span>
        <span slot="khmc" slot-scope="text">
          <j-ellipsis :value="text" :length="18"></j-ellipsis>
        </span>

        <span slot="djbs" slot-scope="djbs">
          <a-tag :key="djbs" :color="djbs==='特殊定价'?'#FB6241':djbs==='普通定价'?'#8A2BE2':'grey'">
            {{ djbs }}
          </a-tag>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

  </a-card>
</template>

<script>
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JInput from '@/components/jeecg/JInput'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {filterObj} from "../../../../utils/util";
  import store from '@/store/'
  import moment from "moment";
  import {downFile} from "@/api/manage";
  import JEllipsis from "@/components/jeecg/JEllipsis";

  export default {
    name: "RateLsdjcxList",
    mixins: [JeecgListMixin],
    components: {
      JEllipsis,
      JTreeSelect,
      JInput
    },
    data() {
      return {
        description: '客户历史定价查询',
        dateValue: '',
        years: '',
        djnf: '',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            align: "center",
            width: 60,
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '所属组织',
            align: "center",
            dataIndex: 'zzbz',
            width: 100
          },
          {
            title: '组织名称',
            align: "center",
            dataIndex: 'zzbz_dictText',
            scopedSlots: {customRender: 'zzmc'},
            width: 100
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            scopedSlots: {customRender: 'zjhm'},
            width: 160
          },
          {
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc',
            scopedSlots: {customRender: 'khmc'},
            width: 240
          },
          {
            title: '定价年份',
            align: "center",
            customRender: function (text) {
              return !text ? "" : (text.length > 4 ? text.substr(0, 4) : text)
            },
            dataIndex: 'djnf',
            width: 100,
          },
          {
            title: '定价编号',
            align: "center",
            dataIndex: 'djid',
            scopedSlots: {customRender: 'djid'},
            width: 120,
          },
          {
            title: '定价得分',
            align: "center",
            dataIndex: 'dfhj',
            width: 100,
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(2) + '分'
              }
            },
          },
          {
            title: '基准利率',
            align: "center",
            dataIndex: 'jjll',
            width: 80,
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(4) + '%'
              }
            },
          },
          {
            title: '上浮幅度',
            align: "center",
            dataIndex: 'sffd',
            width: 100,
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(2) + '%'
              }
            },
          },
          {
            title: '执行利率',
            align: "center",
            dataIndex: 'zxll',
            width: 100,
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(4) + '%'
              }
            },
          },
          {
            title: '优惠后执行利率',
            align: "center",
            dataIndex: 'yhhzxll',
            width: 140,
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(4) + '%'
              }
            },
          },
          {
            title: '按LPR加基点(BP)',
            align: "center",
            dataIndex: 'jdbp',
            width: 150,
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(2)
              }
            },
          },
          {
            title: '优惠后按LPR加基点(BP)',
            align: "center",
            dataIndex: 'yhhjdbp',
            width: 200,
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(2)
              }
            },
          },
          {
            title: '定价时间',
            align: "center",
            dataIndex: 'djrq',
            width: 160
          },
          {
            title: '定价类别',
            align: "center",
            dataIndex: 'djbs_dictText',
            scopedSlots: {customRender: 'djbs'},
            width: 100,
          },
          {
            title: '录入人',
            align: "center",
            dataIndex: 'lrczy',
            width: 100,
          },
          {
            title: '录入时间',
            align: "center",
            dataIndex: 'lrsj',
            width: 160
          },
        ],
        url: {
          list: "/rate_lsdjcx/rateLsdjcx/list",
          delete: "/rate_lsdjcx/rateLsdjcx/delete",
          deleteBatch: "/rate_lsdjcx/rateLsdjcx/deleteBatch",
          exportXlsUrl: "rate_lsdjcx/rateLsdjcx/exportXls",
          importExcelUrl: "rate_lsdjcx/rateLsdjcx/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        var date = new Date
        var year = date.getFullYear()
        this.djnf = year
        this.initSelectYear(year)
      },

      initSelectYear(year) {
        this.years = [];
        for (let i = 0; i < 30; i++) {
          this.years.push({value: ((year - i) + ''), label: ((year - i) + '')});
        }
      },

      selectValue(value) {
        this.$emit('change', value)
      },

      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        let djnf = ''
        if (this.djnf) {
          djnf = this.djnf + '-01-01';
        }
        param.djnf = djnf;
        return filterObj(param);
      },

      initQueryParams() {
        if (!store.getters.isRoot) {
          this.queryParam.zzbz = store.getters.userInfo.orgCode
        }
        this.paramsInited = true
      },

      searchReset() {
        this.queryParam = {djnf: undefined}
        var date = new Date
        var year = date.getFullYear()
        this.djnf = year
        this.queryParam.djnf = moment(this.djnf).format("YYYY")+"-01-01"
        if(!store.getters.isRoot) {
          this.queryParam.zzbz = store.getters.orgCode
        }
        this.loadData(1)
      },

      handleExportXls(fileName) {
        if (!fileName || typeof fileName != 'string') {
          fileName = '导出文件'
        }
        let param = this.getQueryParams()
        let djnf = ''
        if (param.djnf !== undefined && param.djnf !== null && param.djnf !== '') {
          djnf = moment(param.djnf).format("YYYY") + '-01-01'
        }
        param.djnf = djnf;
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(",")
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
        param.paramsStr = paramsStr
        console.log('下载参数:', param)
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
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>