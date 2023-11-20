<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8"><a-form-item label="统计月份">
            <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" style="width: 100%;"
                            :format="monthFormat"/>
          </a-form-item></a-col>
          <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
          <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button icon="download" @click="handleExportXls('全行上浮统计')" style="margin-left: 8px" v-has="'qhsftj:exportXls'">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
         :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      </div>-->

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
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多<a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <!--<qhsftj-modal ref="modalForm" @ok="modalFormOk"></qhsftj-modal>-->
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {downFile, getAction, putAction} from '../../../../api/manage'
  import moment from 'moment'
  import { filterObj } from '@/utils/util';

  export default {
    name: "QhsftjList",
    mixins:[JeecgListMixin],
    components: {},
    data () {
      return {
        description: '全行上浮统计 管理页面',
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: '',
        // 重置标识
        flag: true,
        isorter: {
          columns: 'tjyf',
          order: 'desc',
        },
        // 表头
        columns: [
          {
            title: '序号',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title: '统计月份',
            align: "center",
            dataIndex: 'tjyf',
            customRender:function (text) {
              return !text?"":(text.length>8?text.substr(0,7):text)
            },
            sorter: (a, b) => b.tjyf.replace(/-/g, '/') - a.tjyf.replace(/-/g, '/'),
          },
          {
            title: '测算笔数',
            align: "center",
            dataIndex: 'csbs'
          },
          {
            title: '发放笔数',
            align: "center",
            dataIndex: 'ffbs'
          },
          {
            title: '最高上浮幅度(%)',
            align: "center",
            dataIndex: 'zgsffd'
          },
          {
            title: '最低上浮幅度(%)',
            align: "center",
            dataIndex: 'zdsffd'
          },
          {
            title: '平均上浮幅度(%)',
            align: "center",
            dataIndex: 'pjsffd'
          },
          {
            title: '最高得分',
            align: "center",
            dataIndex: 'zgdf'
          },
          {
            title: '最低得分',
            align: "center",
            dataIndex: 'zddf'
          },
          {
            title: '平均得分',
            align: "center",
            dataIndex: 'pjdf'
          },
          // {
          //   title: '最高基点(加/减)BP',
          //   align: "center",
          //   dataIndex: 'zgjdbp'
          // },
          // {
          //   title: '最低基点(加/减)BP',
          //   align: "center",
          //   dataIndex: 'zdjdbp'
          // },
          // {
          //   title: '平均基点(加/减)BP',
          //   align: "center",
          //   dataIndex: 'pjjdbp'
          // },
          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   align: "center",
          //   scopedSlots: { customRender: 'action' },
          // }
        ],
        url: {
          list: "/tjfxgl/qhsftj/list",
          delete: "/tjfxgl/qhsftj/delete",
          deleteBatch: "/tjfxgl/qhsftj/deleteBatch",
          exportXlsUrl: "tjfxgl/qhsftj/exportXls",
          importExcelUrl: "tjfxgl/qhsftj/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      moment,
      searchReset() {
        this.flag = false;
        this.queryParam = {tjyf: undefined};
        this.queryParam.tjyf = this.defaultMonthOpera;
        this.loadData(1);
      },
    /*  getCurrentMonth() {
        let curDate = new Date();
        // let curMonth= { year : curDate.getFullYear(), month: curDate.getMonth() + 1, }
        // this.defaultMonthOpera = moment(curMonth.year+'-'+0+curMonth.month, this.monthFormat);
        this.defaultMonthOpera=moment(curDate.getFullYear()+'-'+(curDate.getMonth()+1),this.monthFormat); //当前月份
      },*/
      getQueryParams() {
        let tjyfMoment = '';
        if (this.queryParam.tjyf) {
          tjyfMoment = moment(this.queryParam.tjyf).format("YYYY-MM")+"-01";
        }
        var param      = Object.assign({},this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf = tjyfMoment;
        }
        return filterObj(param);
      },
      loadData(arg) {
        // 获取当前月份
        //this.getCurrentMonth();
        if (!this.url.list){
          this.$message.error("请设置url.list属性!");
          return;
        }
        // 加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        // 查询条件
        var params = this.getQueryParams();
       /* if ((params.tjyf=='undefined' || params.tjyf==null)) {
          params.tjyf = moment(this.defaultMonthOpera).format("YYYY-MM")+'-01';
        }*/
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          }
          if(res.code===510){
            this.$message.warning(res.message,5)
          }
          this.loading = false;
        })
      },
      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let tjyf = ''
        let param = this.queryParam
        if (this.queryParam.tjyf === undefined || this.queryParam.tjyf === "") {
          //this.$message.warning("统计月份不能为空！")
          tjyf = moment(this.defaultMonthOpera).format("YYYY-MM") + '-01'
        }else {
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
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>