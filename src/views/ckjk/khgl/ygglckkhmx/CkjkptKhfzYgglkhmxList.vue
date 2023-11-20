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
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属组织">
              <j-tree-select placeholder="请选择所属组织" v-model="queryParam.zzbz"
                             dict="v_hr_bas_organization_cmms, zzjc, zzbz" pidField="sjzzbz" treeNodeFilterProp="title"
                             :sszh="true" :showSearch="true" :treeDefaultExpandAll="true" :filterTreeNode="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属岗位">
              <j-dict-select-tag placeholder="请选择所属岗位" v-model="queryParam.gwbz" dictCode="hr_bas_post, gwmc, gwbz" :pleaseSelect="false"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="户名">
              <j-input placeholder="请输入户名" v-model="queryParam.khxm"></j-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="余额">
              <a-input placeholder="" v-model="queryParam.ckye_begin" style="width: 40%; text-align: center"/>
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled/>
              <a-input placeholder="" v-model="queryParam.ckye_end"
                       style="width: 40%; text-align: center; border-left: 0"/>
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
    <!--  <a-button type="primary" @click="searchReset" icon="reload">重置</a-button>
      <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>-->
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('员工关联存款客户明细')" v-has="'ygglckkhmx:exportXls'">导出</a-button>


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
        rowKey="zjhm"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x:2300}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleView(record)" v-has="'ygglckkhmx:handle'">查看</a>
          <a-divider type="vertical"/>
          <a @click="handleViewBalance(record)" v-has="'ygglckkhmx:handleBalance'">查看近十日余额</a>
          <!--<a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <ckjkptKhfzYgglkhmx-modal ref="modalForm" @ok="modalFormOk"></ckjkptKhfzYgglkhmx-modal>
    <jsrckyeqs ref="jsrckyeqsmModal" @ok="modalFormOk"></jsrckyeqs>
    <ygckkhfx ref="ygckkhfxModal" @ok="modalFormOk"></ygckkhfx>
  </a-card>
</template>

<script>
  import CkjkptKhfzYgglkhmxModal from './modules/CkjkptKhfzYgglkhmxModal'
  import jsrckyeqs from './modules/jsrckyeqs'
  import ygckkhfx from './modules/ygckkhfx'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import {filterObj} from '@/utils/util'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JInput from "../../../../components/jeecg/JInput";
  import moment from 'moment'
  import {putAction, getAction, downFile} from "../../../../api/manage";
  import store from '@/store/'

  export default {
    name: "CkjkptKhfzYgglkhmxList",
    mixins: [JeecgListMixin],
    components: {
      JInput,
      CkjkptKhfzYgglkhmxModal,
      JTreeSelect,
      jsrckyeqs,
      ygckkhfx
    },
    data() {
      return {
        description: '员工关联存款客户明细管理页面',
        monthFormat: 'YYYY-MM',
        defaultMonthOpera: '',
        isorter: {
          order: 'desc'
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
            title: '统计月份',
            align: "center",
            dataIndex: 'tjyf',
            width: 100,
            customRender(text) {
              return text.length > 7 ? text.substring(0, 7) : text
            },
            sorter: true
          },
          {
            title: '组织标识',
            align: "center",
            dataIndex: 'zzbz',
            width: 100,
            sorter: true
          },
          {
            title: '组织名称',
            align: "center",
            dataIndex: 'zzbz_dictText',
            width: 100
          },
          {
            title: '岗位标识',
            align: "center",
            dataIndex: 'gwbz',
            width: 100
          },
          {
            title: '岗位名称',
            align: "center",
            dataIndex: 'gwbz_dictText',
            width: 100
          },
          {
            title: '员工工号',
            align: "center",
            dataIndex: 'yggh',
            width: 80
          },
          {
            title: '员工姓名',
            align: "center",
            dataIndex: 'yggh_dictText',
            width: 100
          },
          {
            title: '户名',
            align: "center",
            dataIndex: 'khxm',
            width: 100
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            width: 180
          },
          {
            title: '联系电话',
            align: "center",
            dataIndex: 'dhhm',
            width: 150
          },
          {
            title: '年初',
            align: 'center',
            children: [
              {
                title: '余额',
                align: "center",
                dataIndex: 'clye',
                width: 100
              },
              {
                title: '月日平',
                align: "center",
                dataIndex: 'clyrp',
                width: 100
              },
              {
                title: '年日平',
                align: "center",
                dataIndex: 'clnrp',
                width: 100
              }
            ]
          },
          {
            title: '本月',
            align: 'center',
            children: [
              {
                title: '余额',
                align: "center",
                dataIndex: 'ckye',
                width: 100
              },
              {
                title: '月日平',
                align: "center",
                dataIndex: 'ckyrpye',
                width: 100
              },
              {
                title: '年日平',
                align: "center",
                dataIndex: 'cknrpye',
                width: 100
              }
            ]
          },
          {
            title: '关联考核数据',
            align: 'center',
            children: [
              {
                title: '余额',
                align: "center",
                dataIndex: 'zshckye',
                width: 100
              },
              {
                title: '月日平',
                align: "center",
                dataIndex: 'zshckyrpye',
                width: 100
              },
              {
                title: '年日平',
                align: "center",
                dataIndex: 'zhscknrpye',
                width: 100
              }
            ]
          },
          /**
           * TODO：因`查看`功能尚未完善，故暂时屏蔽
           */
           {
             title: '操作',
             dataIndex: 'action',
             align: "center",
            scopedSlots: {customRender: 'action'},
             fixed: 'right',
             width: '180px',
           }
        ],
        url: {
          list: "/ygglckkhmx/ckjkptKhfzYgglkhmx/list",
          jsryefxlist: "/ygglckkhmx/ckjkptKhfxYgglkhckqsfx/queryList",
          ygkhfxlist: "/ygglckkhmx/ckjkptKhfzYgglkhmx/queryList",
          delete: "/ygglckkhmx/ckjkptKhfzYgglkhmx/delete",
          deleteBatch: "/ygglckkhmx/ckjkptKhfzYgglkhmx/deleteBatch",
          exportXlsUrl: "ygglckkhmx/ckjkptKhfzYgglkhmx/exportXls",
          importExcelUrl: "ygglckkhmx/ckjkptKhfzYgglkhmx/importExcel",
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
        this.queryParam = {tjyf: undefined, zzbz: undefined};
        this.queryParam.tjyf = this.defaultMonthOpera;
        if(!store.getters.isRoot) {
          this.queryParam.zzbz = store.getters.userInfo.orgCode
        }
        this.loadData(1);
      },
      loadData(arg) {
        if(!this.url.list){
          this.$message.error("请设置url.list属性!")
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
          if(res.code===510){
            this.$message.warning(res.message,5)
          }
          this.loading = false
        })
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
      /**
       * 客户存款余额趋势分析 - 查看近十日余额
       * @param record
       */
      handleView: function (record) {
        this.$refs.ygckkhfxModal.visible=true;
        this.$refs.ygckkhfxModal.confirmLoading=true;
        putAction(this.url.ygkhfxlist, {zjhm:record.zjhm}).then((res) => {
          if (res.success) {
            this.$refs.ygckkhfxModal.dataRows=res.result;
            this.$refs.ygckkhfxModal.init();
            console.log(res.result)
          }

        }).finally(()=>{
          this.$refs.ygckkhfxModal.confirmLoading=false;
        })
      },
      /**
       * 客户`存款余额/月日平`趋势分析 - 查看
       * @param record
       */
      handleViewBalance: function (record) {
        putAction(this.url.jsryefxlist, {zzbz:record.zzbz,gwbz:record.gwbz,yggh:record.yggh,zjhm:record.zjhm }).then((res) => {
          if (res.success) {
            this.$refs.jsrckyeqsmModal.visible=true;
            this.$refs.jsrckyeqsmModal.dataRows=res.result;
            this.$refs.jsrckyeqsmModal.init();
            console.log(res.result)
          }

        })

      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>