modules
ZhBnbldkJgqkb1List.vue<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" :defaultValue="defaultMonthOpera"
                              :format="monthFormat" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <!--<a-col :md="6" :sm="8">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构查询"
                             pid-field="sjzzbz"
                             showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.jgdm"
                             dict="hr_bas_organization, zzjc, ywjgdm"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>-->
          <a-col :md="6" :sm="8"><a-form-item label="所属机构">
            <j-tree-select placeholder="请选择支行" v-model="queryParam.jgdm" dict="v_hr_bas_organization_cmmszh, zzjc, ywjgdm"
                           pid-field="sjywjgdm" treeNodeFilterProp="title" :showSearch="true" :treeDefaultExpandAll="true"/>
          </a-form-item></a-col>

          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <!--<a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>-->
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button type="primary"
                icon="area-chart"
                @click="initData">提取</a-button>
      <a-button type="primary"
                icon="download"
                @click="handleExportXls('支行表内不良贷款结构情况表1')">导出</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px;"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a> 项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table bordered
               rowKey="id"
               ref="table"
               size="middle"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :scroll="{ x: 6000 }"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <zhBnbldkJgqkb1-modal ref="modalForm" @ok="modalFormOk"/>
  </a-card>
</template>

<script>
  import ZhBnbldkJgqkb1Modal from './modules/ZhBnbldkJgqkb1Modal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../components/jeecg/JTreeSelect'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import { filterObj } from '@/utils/util';
  import moment from "moment"

  export default {
    name: "ZhBnbldkJgqkb1List",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect,
      ZhBnbldkJgqkb1Modal
    },
    data () {
      return {
        description: '支行表内不良贷款结构情况表1管理页面',
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: undefined,
        // 重置标识
        flag: true,
        isorter: {
          columns: 'tjyf',
          order: 'desc',
        },
        // 表头
        columns: [
          {
            title: '统计月份',
            align: "center",
            dataIndex: 'tjyf',
            customRender:function (text) {
              return !text?"":(text.length>8?text.substr(0,7):text)
            },
            width: 120,
            sorter: (a, b) => b.tjyf.replace(/-/g, '/') - a.tjyf.replace(/-/g, '/'),
          },
		      {
            title: '机构代码',
            align:"center",
            dataIndex: 'jgdm',
            sorter: (a, b) => b.jgdm - a.jgdm,
          },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
          },

          {
            title:'表内贷款总额',
            children:[
              {
                title: '户数',
                align:"center",
                dataIndex: 'bwdkzhs',
                rowSpan:1
              },
              {
                title: '金额',
                align:"center",
                dataIndex: 'bwdkzje'
              },
            ]
          },


          {
            title: '按放款年份分类',
            children:[
              {
                title:'农商银行改制前',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'nshgzqhs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'nshgzqje'
                  },
                ]
              },
              {
                title:'农商银行改制后',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'nshgzhhs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'nshgzhje'
                  },
                ]
              }
            ]
          },


          {
            title:'按贷款方式分类',
            children:[
              {
                title:'信用',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'xyhs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'xyje'
                  },
                ]
              },
              {
                title:'保证',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'bzhs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'bzje'
                  },
                ]
              },
              {
                title:'抵押',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'dyhs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'dyje'
                  },
                ]
              },
              {
                title:'质押',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'zyhs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'zyje'
                  },
                ]
              },
              {
                title:'组合',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'zhhs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'zhje'
                  },
                ]
              },

            ]
          },

          {
            title:'按贷款行业分类',
            children:[
              {
                title:'农业类贷款',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'nyldkhs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'nyldkdkje'
                  },
                ]
              },
              {
                title:'制造业贷款',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'zzykhs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'zzydkje'
                  },
                ]
              },
              {
                title:'服务业贷款',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'fwydkhs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'fwydkje'
                  },
                ]
              },
              {
                title:'房地产开发贷',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'fdckfdkhs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'fdckfdkje'
                  },
                ]
              },
              {
                title:'实质用于政府公共服务类贷款',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'zfggfwldkhs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'zfggfwldkje'
                  },
                ]
              },

              {
                title:'基础设施建设贷款',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'jcssjsdkhs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'jcssjsdkje'
                  },
                ]
              },

              {
                title:'县市及以上政府重点项目贷款',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'zfzdxmdkhs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'zfzdxmdkje'
                  },
                ]
              },

              {
                title:'其它',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'qtdkhs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'qtdkje'
                  },
                ]
              },
            ]
          },

          {
            title:'按单户贷款合同金额分类',
            children:[
              {
                title:'单户50万元以下',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'dhqj1hs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'dhqj1je'
                  },
                ]
              },
              {
                title:'单户50万元至500万元',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'dhqj2hs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'dhqj2je'
                  },
                ]
              },
              {
                title:'单户500万元至1000万元',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'dhqj3hs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'dhqj3je'
                  },
                ]
              },
              {
                title:'单户1000万元以上',
                children:[
                  {
                    title: '户数',
                    align:"center",
                    dataIndex: 'dhqj4hs'
                  },
                  {
                    title: '金额',
                    align:"center",
                    dataIndex: 'dhqj4je'
                  },
                ]
              },

            ]
          },
        ],
        url: {
          list: "/dkjkpt.tjcx.sgqfgtj.zhbnbldkjgqkb1/zhBnbldkJgqkb1/list",
          delete: "/dkjkpt.tjcx.sgqfgtj.zhbnbldkjgqkb1/zhBnbldkJgqkb1/delete",
          deleteBatch: "/dkjkpt.tjcx.sgqfgtj.zhbnbldkjgqkb1/zhBnbldkJgqkb1/deleteBatch",
          exportXlsUrl: "dkjkpt.tjcx.sgqfgtj.zhbnbldkjgqkb1/zhBnbldkJgqkb1/exportTemplateXls",
          importExcelUrl: "dkjkpt.tjcx.sgqfgtj.zhbnbldkjgqkb1/zhBnbldkJgqkb1/importExcel",
          init:"/dkjkpt.tjcx.sgqfgtj.zhbnbldkjgqkb1/zhBnbldkJgqkb1/extract"
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
      getCurrentMonth() {
        let curDate = new Date();
        let curMonth= { year : curDate.getFullYear(), month: curDate.getMonth() + 1, }
        this.defaultMonthOpera = moment(curMonth.year+'-'+0+curMonth.month, this.monthFormat);
      },
      searchReset() {
        this.flag = false;
        this.queryParam = {};
        this.loadData(1);
      },
      loadData(arg) {
        this.getCurrentMonth();
        if(!this.url.list){
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();//查询条件
        if ((params.tjyf=='undefined' || params.tjyf==null) && this.flag==true) {
          params.tjyf = this.defaultMonthOpera.format("YYYY-MM")+'-01';
        }
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
      getQueryParams(){
        let tjrqment = "";
        if(this.queryParam.tjyf) {
          tjrqment = this.queryParam.tjyf.format("YYYY-MM")+'-01';
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf = tjrqment;
        }
        return filterObj(param);
      },
      initData() {
        var params = this.queryParam;
        if( params.tjyf==null || params.tjyf=='undefined'){
          this.$message.error("请选择统计月份!")
          return
        }
        let tjyfstr=params.tjyf.format("YYYYMM")+'01';
        this.loading = true;
        putAction(this.url.init, 'TJYF='+tjyfstr).then((res) => {
            if(res.success){
              this.loadData()
              this.$message.success(res.message);
            }else{
              this.$message.warning(res.message,5);
            }
            this.loading = false;
          })
      },
      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let param = {...this.queryParam};
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }
        if (param.tjyf != null){
          param.tjyf=param.tjyf.format("YYYY-MM")+'-01'}
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