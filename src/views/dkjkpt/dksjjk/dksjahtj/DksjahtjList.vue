<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8"><a-form-item label="统计月份">
            <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" style="width: 100%;"
                            :defaultValue="defaultMonthOpera" :format="monthFormat"/>
          </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8"><a-form-item label="所属机构">
            <j-tree-select placeholder="请选择所属机构" v-model="queryParam.jgdm" dict="V_HR_BAS_ORGANIZATION_CMMSZH,ZZJC,YWJGDM" pid-field="SJYWJGDM"
                           treeNodeFilterProp="title" :showSearch="true" :treeDefaultExpandAll="true"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="客户类型">
            <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam.khlx" dict-code="dkjkpt_khlx"/>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.khmc" type="likemore"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="客户类型1">
              <j-dict-select-tag placeholder="请选择客户类型1" v-model="queryParam.khlx1" dict-code="dkjkpt_khlx1"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="客户类型2">
              <j-dict-select-tag placeholder="请选择客户类型2" v-model="queryParam.khlx2" dict-code="dkjkpt_khlx2"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="客户类型3">
              <j-dict-select-tag placeholder="请选择客户类型3" v-model="queryParam.khlx3" dict-code="dkjkpt_khlx3"/>
            </a-form-item></a-col>


            <a-col :md="6" :sm="8"><a-form-item label="贷款金额合计">
              <a-input-group compact>
                <a-input-number placeholder="" v-model="queryParam.dkjehj_begin" :min="0" style=" width: 40%; text-align: center; "/>
                <a-input placeholder="<->" disabled style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "/>
                <a-input-number placeholder="" v-model="queryParam.dkjehj_end" :min="0" style="width: 40%; text-align: center; border-left: 0;"/>
              </a-input-group>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="贷款余额合计">
              <a-input-group compact>
                <a-input-number placeholder="" v-model="queryParam.dkyehj_begin" :min="0" style=" width: 40%; text-align: center; "/>
                <a-input placeholder="<->" disabled style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "/>
                <a-input-number placeholder="" v-model="queryParam.dkyehj_end" :min="0" style="width: 40%; text-align: center; border-left: 0; "/>
              </a-input-group>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="企业规模">
              <j-dict-select-tag placeholder="请选择企业规模" v-model="queryParam.qygm" dict-code="qygm"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="是否跨机构">
              <j-dict-select-tag placeholder="请选择是否跨机构" v-model="queryParam.sfcf" dict-code="sfbz"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item></a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item></a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item></a-form-item></a-col>
          </template>

          <a-col :md="6" :sm="8" >
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
      <a-button @click="handleInit" icon="area-chart" v-has="'dksjahtj:InitData'">提取</a-button>
      <a-button icon="download" @click="handleExportXls('贷款数据按户统计')" v-has="'dksjahtj:exportXls'">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>


      <a-table ref="table"
               size="middle"
               bordered
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :scroll="{ x: 2000 }"
               @change="handleTableChange">
        <span slot="action" slot-scope="text, record">
          <a @click="handleView(record)" v-has="'dksjahtj:view'">详情</a>
<!--          <a-divider type="vertical" />-->
<!--          <a-dropdown>-->
<!--            <a class="ant-dropdown-link">更多<a-icon type="down" /></a>-->
<!--            <a-menu slot="overlay">-->
<!--              <a-menu-item>-->
<!--                <a-popconfirm title="确定导出吗?" @confirm="() => handleExportXlsDhdkmx('单户贷款数据明细', record.id)">-->
<!--                  <a>导出单户贷款数据明细</a>-->
<!--                </a-popconfirm>-->
<!--              </a-menu-item>-->
<!--            </a-menu>-->
<!--          </a-dropdown>-->
        </span>
        <span slot="dz" slot-scope="text, record">
          <j-ellipsis :value="text" :length="10"/>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dksjahtj-modal ref="modalForm" @ok="modalFormOk"></dksjahtj-modal>
  </a-card>
</template>

<script>
  import DksjahtjModal from './modules/DksjahtjModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../components/jeecg/JTreeSelect'
  import JInput from '../../../../components/jeecg/JInput'
  import JEllipsis from '../../../../components/jeecg/JEllipsis'
  import { putAction,getAction,downFile } from '../../../../api/manage'
  import moment from 'moment'
  import { filterObj } from '../../../../utils/util'

  export default {
    name: "DksjahtjList",
    mixins:[JeecgListMixin],
    components: {
      JEllipsis,
      JInput,
      JTreeSelect,
      DksjahtjModal
    },
    data () {
      return {
        description: '贷款数据按户统计 管理页面',
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: undefined,
        // 重置标识
        flag: true,
        isorter: {
          column: 'tjyf',
          order: 'desc',
        },
        // 表头
        columns: [
          // {
          //   title: '#',
          //   dataIndex: '',
          //   key: 'rowIndex',
          //   width: 60,
          //   align: "center",
          //   customRender:function (t,r,index) {
          //     return parseInt(index)+1;
          //   }
          //  },
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
            title: '机构代码',
            align: "center",
            dataIndex: 'jgdm'
          },
          {
            title: '机构名称',
            align: "center",
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc'
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm'
          },
          {
            title: '客户类型',
            align: "center",
            dataIndex: 'khlx_dictText'
          },
          {
            title: '地址',
            align: "center",
            dataIndex: 'dz',
            scopedSlots: { customRender: 'dz' },
          },
          {
            title: '笔数',
            align: "center",
            dataIndex: 'bs'
          },
          {
            title: '贷款金额合计',
            align: "center",
            dataIndex: 'dkjehj',
            sorter: (a,b) => b.dkjehj - a.dkjehj,
          },
          {
            title: '贷款余额合计',
            align: "center",
            dataIndex: 'dkyehj',
            sorter: (a,b) => b.dkyehj - a.dkyehj,
          },
          {
            title: '客户类型1',
            align: "center",
            dataIndex: 'khlx1_dictText'
          },
          {
            title: '客户类型2',
            align: "center",
            dataIndex: 'khlx2_dictText'
          },
          {
            title: '客户类型3',
            align: "center",
            dataIndex: 'khlx3_dictText'
          },
          {
            title: '企业规模',
            align: "center",
            dataIndex: 'qygm_dictText'
          },
          {
            title: '是否多机构有贷款',
            align: "center",
            dataIndex: 'sfcf_dictText'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: { customRender: 'action' },
            fixed: "right",
            width: 100,
          }
        ],
        url: {
          init: "/dkjkpt/dksjjk/dksjahtj/init",
          list: "/dkjkpt/dksjjk/dksjahtj/list",
          delete: "/dkjkpt/dksjjk/dksjahtj/delete",
          deleteBatch: "/dkjkpt/dksjjk/dksjahtj/deleteBatch",
          exportXlsUrl: "dkjkpt/dksjjk/dksjahtj/exportXls",
          importExcelUrl: "dkjkpt/dksjjk/dksjahtj/importExcel",
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
        this.defaultMonthOpera = moment(curDate);
      },
      searchReset() {
        this.flag = false;
        this.queryParam = {tjyf: undefined};
        this.queryParam.tjyf = this.defaultMonthOpera;
        this.loadData(1);
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
      getQueryParams() {
        let tjyfMoment = "";
        if (this.queryParam.tjyf) {
          tjyfMoment = this.queryParam.tjyf.format("YYYY-MM")+'-01';
        }
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf = tjyfMoment;
        }
        return filterObj(param);
      },
      handleInit: function() {
        let tjyfMoment = "";
        if (this.queryParam.tjyf==null || this.queryParam.tjyf==undefined) {
          tjyfMoment = this.defaultMonthOpera.format("YYYY-MM")+'-01';
        } else {
          tjyfMoment = this.queryParam.tjyf.format("YYYY-MM") +'-01';
        }
        this.loading = true;
        putAction(this.url.init, { tjyf: tjyfMoment }).then((res) => {
          if (res.success) {
            this.$message.success("提取成功！");
            this.loadData();
          } else {
            this.$message.warning("提取失败！");
          }
          this.loading = false;
        })
      },
      handleView: function(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title="单户贷款数据明细";
        this.$refs.modalForm.disableSubmit = true;
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>