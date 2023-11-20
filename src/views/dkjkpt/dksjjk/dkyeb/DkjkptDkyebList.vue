<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8"><a-form-item label="统计日期">
            <a-date-picker placeholder="请选择统计日期" v-model="queryParam.tjyf" style="width: 100%;"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="所属机构">
            <j-tree-select placeholder="请选择所属机构" v-model="queryParam.jgdm" dict="V_HR_BAS_ORGANIZATION_CMMSZH,ZZJC,YWJGDM" pid-field="SJYWJGDM"
                           treeNodeFilterProp="title" :showSearch="true" :treeDefaultExpandAll="true"/>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="贷款账号">
            <a-input placeholder="请输入贷款账号" v-model="queryParam.dkzh"/>
          </a-form-item></a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item label="便民卡卡号">
              <a-input placeholder="请输入便民卡卡号" v-model="queryParam.bmkkh"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="客户姓名">
              <j-input placeholder="请输入客户姓名" v-model="queryParam.khmc" type="likemore"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="借款日期">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.jkrq" :format="DateFormat" @change="onJkrqChange" style="width: 100%;" />
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="到期日期">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.dqrq" :format="DateFormat" @change="onDqrqChange" style="width: 100%;" />
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="贷款金额">
              <a-input-group compact>
                <a-input-number placeholder="" v-model="queryParam.dkje_begin" :min="0" style=" width: 40%; text-align: center; "/>
                <a-input placeholder="<->" disabled style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "/>
                <a-input-number placeholder="" v-model="queryParam.dkje_end" :min="0" style="width: 40%; text-align: center; border-left: 0;"/>
              </a-input-group>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="贷款余额">
              <a-input-group compact>
                <a-input-number placeholder="" v-model="queryParam.dkye_begin" :min="0" style=" width: 40%; text-align: center; "/>
                <a-input placeholder="<->" disabled style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #FFF; "/>
                <a-input-number placeholder="" v-model="queryParam.dkye_end" :min="0" style="width: 40%; text-align: center; border-left: 0; "/>
              </a-input-group>
            </a-form-item></a-col>

            <a-col :md="6" :sm="8"><a-form-item label="第一责任人">
              <j-input placeholder="请输入第一责任人" v-model="queryParam.dyzrr" type="likemore"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="主客户经理">
              <j-input placeholder="请输入主客户经理" v-model="queryParam.khjlbz" type="likemore"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="贷款形态">
              <j-select-multiple v-model="queryParam.dkxt" :options="jselectMultiple.options1" placeholder="请选择贷款形态"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="担保方式">
              <j-dict-select-tag placeholder="请选择担保方式" v-model="queryParam.dbfs" dict-code="dbfs"/>
            </a-form-item></a-col>

            <a-col :md="6" :sm="8"><a-form-item label="贷款期限">
              <j-dict-select-tag placeholder="请选择贷款期限" v-model="queryParam.dkqx" dict-code="dkqx"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="客户类型">
              <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam.khlx" dict-code="dkjkpt_khlx"/>
            </a-form-item></a-col>
            <a-col :md="24" :sm="24"><a-form-item label="信贷贷款品种">
              <j-select-multiple v-model="queryParam.xddkpz" :options="jselectMultiple.options2" placeholder="请选择信贷贷款品种"/>
            </a-form-item></a-col>

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
      <a-button @click="handleInit" icon="area-chart" v-has="'dkyeb:InitData'">提取</a-button>
      <a-button icon="download" @click="handleExportXls('贷款余额表')" v-has="'dkyeb:exportXls'">导出</a-button>
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
               :scroll="{ x: 4000 }"
               @change="handleTableChange">
        <span slot="dz" slot-scope="text, record">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="dktx" slot-scope="text, record">
          <j-ellipsis :value="text" :length="8"/>
        </span>
        <span slot="xddkpz" slot-scope="text, record">
          <j-ellipsis :value="text" :length="8"/>
        </span>
<!--        <span slot="action" slot-scope="text, record">-->
<!--          <a @click="handleEdit(record)">编辑</a>-->
<!--          <a-divider type="vertical" />-->
<!--          <a-dropdown>-->
<!--            <a class="ant-dropdown-link">更多<a-icon type="down" /></a>-->
<!--            <a-menu slot="overlay">-->
<!--              <a-menu-item>-->
<!--                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">-->
<!--                  <a>删除</a>-->
<!--                </a-popconfirm>-->
<!--              </a-menu-item>-->
<!--            </a-menu>-->
<!--          </a-dropdown>-->
<!--        </span>-->
      </a-table>
    </div>
    <!-- table区域-end -->
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '../../../../components/jeecg/JTreeSelect'
  import JInput from '../../../../components/jeecg/JInput'
  import { filterObj } from '../../../../utils/util'
  import JEllipsis from '../../../../components/jeecg/JEllipsis'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import JSelectMultiple from "../../../../components/jeecg/JSelectMultiple";
  import {ajaxGetDictItems} from '@/api/api'

  export default {
    name: "DkjkptDkyebList",
    mixins:[JeecgListMixin],
    components: { JEllipsis, JInput, JTreeSelect,JSelectMultiple },
    data () {
      return {
        description: '贷款余额表 管理页面',
        DateFormat: "YYYY-MM-DD",
        isorter: {
          columns: 'tjyf',
          order: 'desc',
        },
        jkrq_begin:'',
        jkrq_end:'',
        jselectMultiple:{
          options1:[],
          options2:[],
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
          // },
          {
            title: '统计日期',
            align: "center",
            dataIndex: 'tjyf',
            customRender:function (text) {
              return !text?"":(text.length>10?text.substr(0,10):text)
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
            title: '客户姓名',
            align: "center",
            dataIndex: 'khmc'
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            width: 160
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
            title: '贷款账号',
            align: "center",
            dataIndex: 'dkzh'
          },
          {
            title: '便民卡卡号',
            align: "center",
            dataIndex: 'bmkkh'
          },
          {
            title: '贷款金额',
            align: "center",
            dataIndex: 'dkje',
            sorter: (a, b) => b.dkje - a.dkje,
          },
          {
            title: '贷款余额',
            align: "center",
            dataIndex: 'dkye',
            sorter: (a, b) => b.dkye - a.dkye,
          },
          {
            title: '借款日期',
            align: "center",
            dataIndex: 'jkrq',
            customRender:function (text) {
              return !text?"":(text.length>10?text.substr(0,10):text)
            },
          },
          {
            title: '到期日期',
            align: "center",
            dataIndex: 'dqrq',
            customRender:function (text) {
              return !text?"":(text.length>10?text.substr(0,10):text)
            },
          },
          {
            title: '起息日',
            align: "center",
            dataIndex: 'qxr'
          },
          {
            title: '结息日',
            align: "center",
            dataIndex: 'jxr'
          },
          {
            title: '贷款期限',
            align: "center",
            dataIndex: 'dkqx_dictText'
          },
          {
            title: '产品名称',
            align: "center",
            dataIndex: 'cpmc'
          },
          {
            title: '剩余天数',
            align: "center",
            dataIndex: 'syts',
            sorter: (a, b) => b.syts - a.syts,
          },
          // {
          //   title: '欠息天数',
          //   align: "center",
          //   dataIndex: 'qxts'
          // },
          // {
          //   title: '表内应计利息',
          //   align: "center",
          //   dataIndex: 'bnyjlx'
          // },
          // {
          //   title: '表内应收利息',
          //   align: "center",
          //   dataIndex: 'bnyslx'
          // },
          // {
          //   title: '表外应计利息',
          //   align: "center",
          //   dataIndex: 'bwyjlx'
          // },
          // {
          //   title: '表外应收利息',
          //   align: "center",
          //   dataIndex: 'bwyslx'
          // },
          // {
          //   title: '表内外欠息和',
          //   align: "center",
          //   dataIndex: 'bnwqxh'
          // },
          {
            title: '贷款利率(%)',
            align: "center",
            dataIndex: 'dkll',
            sorter: (a, b) => b.dkll - a.dkll,
          },
          {
            title: '担保方式',
            align: "center",
            dataIndex: 'dbfs_dictText'
          },
          {
            title: '第一责任人',
            align: "center",
            dataIndex: 'dyzrr'
          },
          {
            title: '主客户经理',
            align: "center",
            dataIndex: 'khjlbz'
          },
          {
            title: '所属行业类型',
            align: "center",
            dataIndex: 'khsshylx_dictText'
          },
          {
            title: '贷款投向',
            align: "center",
            dataIndex: 'dktx_dictText',
            scopedSlots: { customRender: 'dktx' },
          },
          {
            title: '贷款形态',
            align: "center",
            dataIndex: 'dkxt_dictText'
          },
          {
            title: '信贷贷款品种',
            align: "center",
            dataIndex: 'xddkpz_dictText',
            scopedSlots: { customRender: 'xddkpz' },
          },
          // {
          //   title: '到期情况监测',
          //   align: "center",
          //   dataIndex: 'dqqkjc'
          // },
          // {
          //   title: '客户经理员工工号',
          //   align: "center",
          //   dataIndex: 'khjlyggh'
          // },
          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   align: "center",
          //   scopedSlots: { customRender: 'action' },
          // }
        ],
        url: {
          init: "/dkjkpt/dksjjk/dkyeb/init",
          list: "/dkjkpt/dksjjk/dkyeb/list",
          delete: "/dkjkpt/dksjjk/dkyeb/delete",
          deleteBatch: "/dkjkpt/dksjjk/dkyeb/deleteBatch",
          exportXlsUrl: "dkjkpt/dksjjk/dkyeb/exportXls",
          importExcelUrl: "dkjkpt/dksjjk/dkyeb/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created() {
      this.initDictData('dkxt')
      this.initDictData('dkzl')
    },
    methods: {
      initDictData(dictCode) {
        //根据字典Code, 初始化字典数组
        ajaxGetDictItems(dictCode, null).then((res) => {
          if (res.success) {
            if (dictCode=='dkxt') {
              this.jselectMultiple.options1 = res.result;
            }
            if (dictCode=='dkzl') {
              this.jselectMultiple.options2 = res.result;
            }
          }
        })
      },
      handleInit: function() {
        if (this.queryParam.tjyf==null || this.queryParam.tjyf==undefined) {
          this.$message.error("请选择统计日期！");
          return;
        }
        this.loading = true;
        putAction(this.url.init, { "tjrq": this.queryParam.tjyf.format("YYYYMMDD") }).then((res) => {
          if (res.success) {
            this.$message.success(res.message);
            this.loadData();
          } else {
            this.$message.warning(res.message,5);
          }
          this.loading = false;
        })
      },
      getQueryParams: function() {
        let tjrqMoment = "";
        if (this.queryParam.tjyf) {
          tjrqMoment = this.queryParam.tjyf.format("YYYY-MM-DD");
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.tjyf     = tjrqMoment;
        delete param.jkrq;
        delete param.dqrq;
        return filterObj(param);
      },
      onJkrqChange: function(value, dateString) {
        let jkrqDateString         = dateString;
        this.queryParam.jkrq_begin = jkrqDateString[0];
        this.queryParam.jkrq_end   = jkrqDateString[1];
      },
      onDqrqChange: function(value, dateString) {
        let dqrqDateString         = dateString;
        this.queryParam.dqrq_begin = dqrqDateString[0];
        this.queryParam.dqrq_end   = dqrqDateString[1];
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
          param.tjyf=param.tjyf.format("YYYY-MM")+'-01'
        }
        delete param.jkrq;
        delete param.dqrq;
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