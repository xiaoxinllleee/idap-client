<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
            <a-col :md="6" :sm="8"><a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" :defaultValue="defaultMonthOpera"
                              :format="monthFormat" style="width: 100%;"/>
            </a-form-item></a-col>
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
          <a-col :md="6" :sm="8">
            <a-form-item label="所属机构">
              <j-tree-select v-model="queryParam.jgdm"
                             :showSearch="true"
                             placeholder="请选择支行"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmmszh, zzjc, ywjgdm"
                             treeNodeFilterProp="title"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>

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
      <a-button type="primary" icon="area-chart" @click="initData">提取</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('支行存款结构情况表')">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }} </a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{ x: 3000 }"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <repYwbbZhckjgqkb-modal ref="modalForm" @ok="modalFormOk"></repYwbbZhckjgqkb-modal>
  </a-card>
</template>

<script>
  import RepYwbbZhckjgqkbModal from './modules/RepYwbbZhckjgqkbModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../../../components/jeecg/JTreeSelect'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import { filterObj } from '@/utils/util';
  import moment from 'moment'

  export default {
    name: "RepYwbbZhckjgqkbList",
    mixins:[JeecgListMixin],
    components: {
      RepYwbbZhckjgqkbModal,JTreeSelect
    },
    data () {
      return {
        description: '支行存款结构情况表管理页面',
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
            align: "center",
            dataIndex: 'jgdm',
            onFilter: (value, record) => record.jgdm.indexOf(value) === 0,
            sorter: (a, b) => b.jgdm - a.jgdm,
            sortDirections: ['descend', 'ascend'],
          },
          {
            title: '机构名称',
            align: "center",
            dataIndex: 'jgdm_dictText'
          },
          {
            title:'存款总量',
            children:[
              {
                title: '存款总余额',
                align: "center",
                dataIndex: 'ckzye',
                sorter: (a, b) => b.ckzye - a.ckzye,
              },
              {
                title: '有余额户数',
                align: "center",
                dataIndex: 'yyehs',
                sorter: (a, b) => b.yyehs - a.yyehs,
              },
            ]
          },
          {
            title:'按客户性质分',
            children:[
              {
                title:'储蓄',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'cxhs',
                    sorter: (a, b) => b.cxhs - a.cxhs,
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'cxye',
                    sorter: (a, b) => b.cxye - a.cxye,
                  },
                ]
              },
              {
                title:'对公',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'dghs',
                    sorter: (a, b) => b.dghs - a.dghs,
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'dgye',
                    sorter: (a, b) => b.dgye - a.dgye,
                  },
                ]
              },
            ]
          },
          {
            title:'个人客户按年龄分类',
            children:[
              {
                title:'30岁以下',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'sssyxhs',
                    sorter: (a, b) => b.sssyxhs - a.sssyxhs,
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'sssyxye',
                    sorter: (a, b) => b.sssyxye - a.sssyxye,
                  },
                ]
              },
              {
                title:'30岁到50岁',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'sszwsshs',
                    sorter: (a, b) => b.sszwsshs - a.sszwsshs,
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'sszwssye',
                    sorter: (a, b) => b.sszwssye - a.sszwssye,
                  },
                ]
              },
              {
                title:'50岁到65岁',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'wszlsshs',
                    sorter: (a, b) => b.wszlsshs - a.wszlsshs,
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'wszlssye',
                    sorter: (a, b) => b.wszlssye - a.wszlssye,
                  },
                ]
              },
              {
                title:'65岁以上',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'lswsyshs',
                    sorter: (a, b) => b.lswsyshs - a.lswsyshs,
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'lswsysye',
                    sorter: (a, b) => b.lswsysye - a.lswsysye,
                  },
                ]
              },
            ]
          },
          {
            title:'按单户存款余额分类',
            children:[
              {
                title:'1万元以下',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'ywyyxhs',
                    sorter: (a, b) => b.ywyyxhs - a.ywyyxhs,
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'ywyyxye',
                    sorter: (a, b) => b.ywyyxye - a.ywyyxye,
                  },
                ]
              },
              {
                title:'1万元至5万元',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'ywzwwyhs',
                    sorter: (a, b) => b.ywzwwyhs - a.ywzwwyhs,
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'ywzwwyye',
                    sorter: (a, b) => b.ywzwwyye - a.ywzwwyye,
                  },
                ]
              },
              {
                title:'5万元至10万元',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'wwzswyhs',
                    sorter: (a, b) => b.wwzswyhs - a.wwzswyhs,
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'wwzswyye',
                    sorter: (a, b) => b.wwzswyye - a.wwzswyye,
                  },
                ]
              },
              {
                title:'10万元至50万元',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'swzwswyhs',
                    sorter: (a, b) => b.swzwswyhs - a.swzwswyhs,
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'swzwswyye',
                    sorter: (a, b) => b.swzwswyye - a.swzwswyye,
                  },
                ]
              },
              {
                title:'50万元以上',
                children:[
                  {
                    title: '户数',
                    align: "center",
                    dataIndex: 'wswyyshs',
                    sorter: (a, b) => b.wswyyshs - a.wswyyshs,
                  },
                  {
                    title: '余额',
                    align: "center",
                    dataIndex: 'wswyysye',
                    sorter: (a, b) => b.wswyysye - a.wswyysye,
                  },
                ]
              },
            ]
          },
        ],
        url: {
          list: "/dkjkpt.tjcx.sgqfgtj.zhckjgqkb/repYwbbZhckjgqkb/list",
          delete: "/dkjkpt.tjcx.sgqfgtj.zhckjgqkb/repYwbbZhckjgqkb/delete",
          deleteBatch: "/dkjkpt.tjcx.sgqfgtj.zhckjgqkb/repYwbbZhckjgqkb/deleteBatch",
          exportXlsUrl: "dkjkpt.tjcx.sgqfgtj.zhckjgqkb/repYwbbZhckjgqkb/exportTemplateXls",
          importExcelUrl: "dkjkpt.tjcx.sgqfgtj.zhckjgqkb/repYwbbZhckjgqkb/importExcel",
          init:"/dkjkpt.tjcx.sgqfgtj.zhckjgqkb/repYwbbZhckjgqkb/extract",
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
        var params =this.queryParam;
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