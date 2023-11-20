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
                             dict="v_hr_bas_organization_cmms,zzjc,zzbz" pidField="sjzzbz" treeNodeFilterProp="title"
                             :sszh="true" :showSearch="true" :treeDefaultExpandAll="true" :filterTreeNode="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="本月月日平">
              <a-input placeholder="" v-model="queryParam.ckyrpye_begin" style="width: 40%;"/>
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled/>
              <a-input placeholder="" v-model="queryParam.ckyrpye_end" style="width: 40%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="本月年日平">
              <a-input placeholder="" v-model="queryParam.cknrpye_begin" style="width: 40%;"/>
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled/>
              <a-input placeholder="" v-model="queryParam.cknrpye_end" style="width: 40%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="本月余额">
              <a-input placeholder="" v-model="queryParam.ckye_begin"
                       style="width: 40%;"/>
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled/>
              <a-input placeholder="" v-model="queryParam.ckye_end" style="width: 40%;"/>
            </a-form-item>
          </a-col>

      <a-col :md="6" :sm="8">
        <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
        </span>
      </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <!--<a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->

      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('机构存款汇总统计')" v-has="'jgckhztj:exportXls'">导出</a-button>
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
        rowKey="zzbz"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleView(record)" v-has="'jgckhztj:handle'">查看</a>
          <!--<a-divider type="vertical"/>
          <a-dropdown>
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
    <ckjkptKhfzJgckhz-modal ref="modalForm" @ok="modalFormOk"></ckjkptKhfzJgckhz-modal>
    <jgckqsfx ref="jgckqsfxModal" @ok="modalFormOk"></jgckqsfx>

  </a-card>
</template>

<script>
  import CkjkptKhfzJgckhzModal from './modules/CkjkptKhfzJgckhzModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import {filterObj} from '@/utils/util'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import moment from 'moment'
  import { getAction, putAction, downFile} from '../../../../api/manage'
  import jgckqsfx from './modules/jgckqsfx'
  import store from '@/store/'

  export default {
    name: "CkjkptKhfzJgckhzList",
    mixins: [JeecgListMixin],
    components: {
      CkjkptKhfzJgckhzModal,
      JTreeSelect,
      jgckqsfx
    },
    data() {
      return {
        description: '机构存款汇总统计管理页面',
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
            customRender(text) {
              return text.length > 7 ? text.substring(0, 7) : text
            },
            sorter: true
          },
          {
            title: '组织标识',
            align: "center",
            dataIndex: 'zzbz'
          },
          {
            title: '组织名称',
            align: "center",
            dataIndex: 'zzbz_dictText'
          },
          {
            title: '年初',
            align: 'center',
            children: [
              {
                title: '余额',
                align: "center",
                dataIndex: 'clye'
              },
              {
                title: '月日平',
                align: "center",
                dataIndex: 'clyrp'
              },
              {
                title: '年日平',
                align: "center",
                dataIndex: 'clnrp'
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
                dataIndex: 'ckye'
              },
              {
                title: '月日平',
                align: "center",
                dataIndex: 'ckyrpye'
              },
              {
                title: '年日平',
                align: "center",
                dataIndex: 'cknrpye'
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
                dataIndex: 'zshckye'
              },
              {
                title: '月日平',
                align: "center",
                dataIndex: 'zshckyrpye'
              },
              {
                title: '年日平',
                align: "center",
                dataIndex: 'zhscknrpye'
              }
            ]
          },
          /**
           * TODO：因`查看`功能尚未完善，故暂时屏蔽
           */
          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   align: "center",
          //   scopedSlots: {customRender: 'action'},
          //   fixed: 'right',
          //   width: '100',
          // }
        ],
        url: {
          list: "/jgckhztj/ckjkptKhfzJgckhz/list",
          jgckqsfxlist:"/jgckhztj/ckjkptKhfzJgckhz/queryList",
          delete: "/jgckhztj/ckjkptKhfzJgckhz/delete",
          deleteBatch: "/jgckhztj/ckjkptKhfzJgckhz/deleteBatch",
          exportXlsUrl: "jgckhztj/ckjkptKhfzJgckhz/exportXls",
          importExcelUrl: "jgckhztj/ckjkptKhfzJgckhz/importExcel",
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
      /**
       * 机构存款汇总统计趋势分析 - 查看
       * @param record
       */
      handleView: function (record) {
        putAction(this.url.jgckqsfxlist, {zzbz:record.zzbz}).then((res) => {
          if (res.success) {
            this.$refs.jgckqsfxModal.visible=true;
            this.$refs.jgckqsfxModal.dataRows=res.result;
            this.$refs.jgckqsfxModal.init();
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