<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择" v-model="queryParam.tjyf" style="width: 100%;" :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属机构">
              <j-tree-select placeholder="请选择" v-model="queryParam.sszh" dict="v_hr_bas_organization, zzjc, ywjgdm"
                             treeNodeFilterProp="title" pid-field="sjywjgdm_b" :showSearch="true" :treeDefaultExpandAll="true"
                             condition='{"sjywjgdm": "ywjgdm"}'>
              </j-tree-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开户机构">
              <j-tree-select placeholder="请选择" v-model="queryParam.branchNo" dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             treeNodeFilterProp="title" pid-field="sjywjgdm" :showSearch="true" :treeDefaultExpandAll="true">
              </j-tree-select>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="贷款账号">
                <a-input placeholder="请输入贷款账号" v-model="queryParam.acctNo" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="户名">
                <j-input placeholder="模糊查询" v-model="queryParam.custName" type="likemore"></j-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="证件号码">
                <a-input placeholder="请输入证件号码" v-model="queryParam.identNo" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="借款日期">
                <date-picker placeholder="请选择" v-model="queryParam.qxDate" style="width: 100%"></date-picker>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="到期日期">
                <date-picker placeholder="请选择" v-model="queryParam.endDate" style="width: 100%"></date-picker>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="贷款期限">
                <j-dict-select-tag placeholder="请选择" v-model="queryParam.dkqx" dict-code="yxbldkqx"></j-dict-select-tag>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="贷款形态">
                <j-dict-select-tag placeholder="请选择" v-model="queryParam.fiveClassType" dict-code="wjflbz"></j-dict-select-tag>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="主客户经理">
                <j-dict-select-tag placeholder="请输入主客户经理姓名" v-model="queryParam.zkhjl" dict-code="hr_bas_staff,ygxm || khjlbh,khjlbh,khjlbh is not null" :showSearch="true" >
                </j-dict-select-tag>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="建议解除手工标记">
                <j-dict-select-tag placeholder="请选择" v-model="queryParam.sfjcsgbj"  :showSearch="true" dict-code="sfbz">
                </j-dict-select-tag>
              </a-form-item>
            </a-col>
            <!--<a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="建议手工下调">
                <j-dict-select-tag placeholder="请选择" v-model="queryParam.sfsgxt"  :showSearch="true" dict-code="sfbz">
                </j-dict-select-tag>
              </a-form-item>
            </a-col>-->
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="五级分类人工复核">
                <j-dict-select-tag placeholder="请选择" v-model="queryParam.wjflrgfh"  :showSearch="true" dict-code="dkxt">
                </j-dict-select-tag>
              </a-form-item>
            </a-col>
            <!--<a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="一户多形态">
                <j-dict-select-tag placeholder="一户多形态" v-model="queryParam.sfyhdxt"  :showSearch="true" dict-code="yxbldk_yhdxt">
                </j-dict-select-tag>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="隐性不良">
                <j-dict-select-tag placeholder="是否隐性不良" v-model="queryParam.sfyxbl"  :showSearch="true" dict-code="sfbz">
                </j-dict-select-tag>
              </a-form-item>
            </a-col>-->
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
      <a-button  type="primary" icon="plus" :loading="extractionLoading" @click="handleExtraction" v-has="'lxqkbjyqtz:extraction'">{{extractionBtnName}}</a-button>
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('浏阳农商银行贷款五级分类人工复核')" v-has="'lxqkbjyqtz:exportXls'">导出</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table ref="table"
               size="small"
               bordered
               :rowKey="rowKey"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :scroll="{x:3500,y:500}"
               @change="handleTableChange">

        <span slot="sszh" slot-scope="text">
          <j-ellipsis :value="text" :length="5"></j-ellipsis>
        </span>
        <span slot="branchName" slot-scope="text">
          <j-ellipsis :value="text" :length="5"></j-ellipsis>
        </span>
        <span slot="custName" slot-scope="text">
          <j-ellipsis :value="text" :length="5"></j-ellipsis>
        </span>
        <span slot="identNo" slot-scope="text">
          <j-ellipsis :value="text" :length="18"></j-ellipsis>
        </span>
        <span slot="acctNo" slot-scope="text">
          <j-ellipsis :value="text" :length="18"></j-ellipsis>
        </span>
        <span slot="bz" slot-scope="text">
          <j-ellipsis :value="text" :length="14"></j-ellipsis>
        </span>

        <!--<span slot="fiveClassType" slot-scope="fiveClassType">
          <a-tag :key="fiveClassType"
                 :color="fiveClassType==='正常'?'#24C780':fiveClassType==='关注'?'#108EE9':fiveClassType==='次级'?'#8A2BE2':fiveClassType==='可疑'?'#002140':fiveClassType==='损失'?'#FFA500':'white'">
            {{ fiveClassType }}
          </a-tag>
        </span>
        <span slot="dkqx" slot-scope="dkqx">
          <a-tag :key="dkqx" :color="dkqx==='短期贷款'?'#FB6241':dkqx==='中期贷款'?'#4FB2E9':dkqx==='长期贷款'?'#8A2BE2':'white'">
            {{ dkqx }}
          </a-tag>
        </span>
        <span slot="sfsgxt" slot-scope="sfsgxt">
          <a-tag :key="sfsgxt" :color="sfsgxt==='是'?'#57DB92':sfsgxt==='否'?'#FB325F':'white'">
            {{ sfsgxt }}
          </a-tag>
        </span>
        <span slot="sfyhdxt" slot-scope="sfyhdxt">
          <a-tag :key="sfyhdxt" :color="sfyhdxt==='关注类'?'#57DB92':sfyhdxt==='不良类'?'#FB325F':'white'">
            {{ sfyhdxt }}
          </a-tag>
        </span>-->
<!--        <span slot="sfjcsgbj" slot-scope="sfjcsgbj">
          <a-tag :key="sfjcsgbj" :color="sfjcsgbj==='是'?'#57DB92':sfjcsgbj==='否'?'#FB325F':'white'">
            {{ sfjcsgbj }}
          </a-tag>
        </span>-->
        <!--<span slot="sfyxbl" slot-scope="sfyxbl">
          <a-tag :key="sfyxbl" :color="sfyxbl==='是'?'#57DB92':sfyxbl==='否'?'#FB325F':'white'">
            {{ sfyxbl }}
          </a-tag>
        </span>-->
<!--        <span slot="wjflrgfh" slot-scope="wjflrgfh">
          <a-tag :key="wjflrgfh"
                 :color="wjflrgfh==='正常'?'#00B050':wjflrgfh==='关注'?'#F4B084':wjflrgfh==='次级'?'red':'white'">
            {{ wjflrgfh }}
          </a-tag>
        </span>-->

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'lxqkbjyqtz:edit'">编辑</a>
          <!--<a @click="handleView(record)" v-has="'lxqkbjyqtz:view'">欠款期数明细</a>
          <a-divider type="vertical" v-has="'lxqkbjyqtz:cancelmark'" v-if="Number.parseInt(record.sfjcsgbj) === 2"/>
          <a-popconfirm title="确定解除吗?" @confirm="() => handleCancelMark(record)" v-has="'lxqkbjyqtz:cancelmark'" v-if="Number.parseInt(record.sfjcsgbj) === 1">
            <a>解除手工标记</a>
          </a-popconfirm>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dklxqkbjyqtz-modal ref="modalForm" @ok="modalFormOk"></dklxqkbjyqtz-modal>
  </a-card>
</template>

<script>
  import DklxqkbjyqtzModal from './modules/DklxqkbjyqtzModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JEllipsis from "@/components/jeecg/JEllipsis";
  import JTreeSelect from "@/components/jeecg/JTreeSelect";
  import JInput from "@/components/jeecg/JInput";
  import {downFile, getAction, postAction, putAction} from "@/api/manage";
  import notification from 'ant-design-vue/es/notification'
  import moment from "moment";
  import {filterObj} from "@/utils/util";

  export default {
    name: "LxqkbjyqtzList",
    mixins:[JeecgListMixin],
    components: {
      JEllipsis,JInput, JTreeSelect, DklxqkbjyqtzModal
    },
    data () {
      return {
        description: '贷款五级分类人工复核管理页面',
        monthFormat: 'YYYY-MM',
        exportLoading: false,
        extractionLoading: false,
        extractionBtnName: '数据抽取',
        // 表头
        columns: [
          {
            title: '统计月份',
            align: "center",
            dataIndex: 'tjyf',
            width: 100,
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            }
          },
          {
            title: '所属机构代码',
            align: "center",
            dataIndex: 'sszh',
            width: 110,
          },
          {
            title: '所属机构名称',
            align: "center",
            dataIndex: 'sszh_dictText',
            width: 110,
            scopedSlots: { customRender: 'sszh' },
          },
          {
            title: '开户机构代码',
            align: "center",
            dataIndex: 'branchNo',
            width: 110,
          },
          {
            title: '开户机构名称',
            align: "center",
            dataIndex: 'branchNo_dictText',
            width: 110,
            scopedSlots: { customRender: 'branchName' },
          },
          {
            title: '户名',
            align: "center",
            dataIndex: 'custName',
            scopedSlots: { customRender: 'custName' },
            width: 110,
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'identNo',
            scopedSlots: { customRender: 'identNo' },
            width: 180,
          },
          {
            title: '贷款账号',
            align: "center",
            dataIndex: 'acctNo',
            scopedSlots: { customRender: 'acctNo' },
            width: 180,
          },
          {
            title: '借款日期',
            align: "center",
            dataIndex: 'qxDate',
            width: 120,
          },
          {
            title: '到期日期',
            align: "center",
            dataIndex: 'endDate',
            width: 120,
          },
          {
            title: '贷款期限',
            align: "center",
            dataIndex: 'dkqx_dictText',
            width: 90,
            //scopedSlots: { customRender: 'dkqx' },
          },
          {
            title: '剩余天数',
            align: "center",
            dataIndex: 'syts',
            width: 90,
          },
          {
            title: '贷款余额(元)',
            align: "center",
            dataIndex: 'currBal',
            width: 120,
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '贷款形态',
            align: "center",
            dataIndex: 'fiveClassType_dictText',
            width: 90,
            //scopedSlots: { customRender: 'fiveClassType' },
          },
          {
            title: '主客户经理',
            align: "center",
            dataIndex: 'zkhjl_dictText',
            width: 110,
          },
          {
            title: '利息欠款(1)',
            children: [
              {
                title: '日期',
                align: 'center',
                dataIndex: 'lxqkrqOne',
                width: 120,
              },
              {
                title: '期数',
                align: 'center',
                dataIndex: 'lxqkqsOne',
                width: 80,
              }
            ]
          },
          {
            title: '利息欠款(2)',
            children: [
              {
                title: '日期',
                align: 'center',
                dataIndex: 'lxqkrqTwo',
                width: 120,
              },
              {
                title: '期数',
                align: 'center',
                dataIndex: 'lxqkqsTwo',
                width: 80,
              }
            ]
          },
          {
            title: '利息欠款(3)',
            children: [
              {
                title: '日期',
                align: 'center',
                dataIndex: 'lxqkrqThree',
                width: 120,
              },
              {
                title: '期数',
                align: 'center',
                dataIndex: 'lxqkqsThree',
                width: 80,
              }
            ]
          },
          {
            title: '利息欠款(4)',
            children: [
              {
                title: '日期',
                align: 'center',
                dataIndex: 'lxqkrqFour',
                width: 120,
              },
              {
                title: '期数',
                align: 'center',
                dataIndex: 'lxqkqsFour',
                width: 80,
              }
            ]
          },
          {
            title: '利息欠款(5)',
            children: [
              {
                title: '日期',
                align: 'center',
                dataIndex: 'lxqkrqFive',
                width: 120,
              },
              {
                title: '期数',
                align: 'center',
                dataIndex: 'lxqkqsFive',
                width: 80,
              }
            ]
          },
          {
            title: '利息欠款(6)',
            children: [
              {
                title: '日期',
                align: 'center',
                dataIndex: 'lxqkrqSix',
                width: 120,
              },
              {
                title: '期数',
                align: 'center',
                dataIndex: 'lxqkqsSix',
                width: 80,
              }
            ]
          },
          {
            title: '贷款逾期',
            children: [
              {
                title: '日期至',
                align: "center",
                dataIndex: 'dkyqrqz',
                width: 120,
              },
              {
                title: '天数',
                align: "center",
                dataIndex: 'dkyqts',
                width: 90,
              },
            ]
          },
          {
            title: '最近利息逾期四期及以上日期',
            align: "center",
            dataIndex: 'zjlxyqrq',
            width: 140,
          },
          {
            title: '建议解除手工标记',
            align: "center",
            dataIndex: 'sfjcsgbj_dictText',
            /*scopedSlots: { customRender: 'sfjcsgbj' },*/
            width: 80,
          },
          // {
          //   title: '解除手工标记日期',
          //   align: "center",
          //   dataIndex: 'jcsgbjrq',
          //   width: 90,
          // },
          // {
          //   title: '建议手工下调',
          //   align: "center",
          //   dataIndex: 'sfsgxt_dictText',
          //   scopedSlots: { customRender: 'sfsgxt' },
          //   width: 60,
          // },
          // {
          //   title: '一户多形态',
          //   align: "center",
          //   dataIndex: 'sfyhdxt_dictText',
          //   scopedSlots: { customRender: 'sfyhdxt' },
          //   width: 80,
          // },
          // {
          //   title: '隐性不良',
          //   align: "center",
          //   dataIndex: 'sfyxbl_dictText',
          //   scopedSlots: { customRender: 'sfyxbl' },
          //   width: 50,
          // },
          {
            title: '五级分类人工复核',
            align: "center",
            dataIndex: 'wjflrgfh_dictText',
            /*scopedSlots: { customRender: 'wjflrgfh' },*/
            width: 80,
          },
          {
            title: '备注',
            align: "left",
            dataIndex: 'bz',
            scopedSlots: { customRender: 'bz' },
            width: 240,
          },
          {
            title: '操作标识',
            align: "center",
            dataIndex: 'lrbz_dictText',
            width: 80,
          },
          {
            title: '操作人',
            align: "center",
            dataIndex: 'lrr',
            width: 80,
          },
          {
            title: '操作时间',
            align: "center",
            dataIndex: 'lrsj',
            width: 150,
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: { customRender: 'action' },
            width: 80,
            fixed: 'right',
          }
        ],
        url: {
          list: "/yxbldkgl/dklxqkbjyqtz/list",
          extraction: "/yxbldkgl/dklxqkbjyqtz/extraction",
          cancelMark: "/yxbldkgl/dklxqkbjyqtz/cancelMark",
          exportXlsUrl: "yxbldkgl/dklxqkbjyqtz/exportXls",
          importExcelUrl: "yxbldkgl/dklxqkbjyqtz/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created() {
      this.getCurrentMonth()
    },
    methods: {
      moment,
      getCurrentMonth() {
        this.queryParam = {
          tjyf: undefined
        }
        this.queryParam.tjyf = moment(this.getCurrentDataFront()).format(this.monthFormat)
        console.info('默认统计月份:',this.queryParam.tjyf)
      },
      getCurrentDataFront () {
        var date = new Date()
        date.setDate(1)
        var month = parseInt(date.getMonth() + 1)
        var day = date.getDate()
        if (month < 10) {
          month = '0' + month
        }
        if (day < 10) {
          day = '0' + day
        }
        const time = date.getFullYear() + '-' + month + '-' + day
        return time
      },
      loadData(arg) {
        if (!this.url.list) {
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();
        if (params.tjyf !== undefined && params.tjyf !== null && params.tjyf !== '') {
          params.tjyf = moment(params.tjyf).format('YYYY-MM') + '-01'
        }
        console.info(params)
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
            this.loading = false;
          } else {
            this.dataSource = [];
            this.ipagination.total = 0;
            this.loading = false;
          }
          if (res.code === 510) {
            this.$message.warning(res.message,5)
            this.loading = false;
          }
          this.loading = false;
        })
      },
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
        if (param.qxDate) {
          param.qxDate = moment(param.qxDate).format("YYYY-MM-DD")
        }
        if (param.endDate) {
          param.endDate = moment(param.endDate).format("YYYY-MM-DD")
        }
        if (param.dkqx === undefined || param.dkqx == 'undefined') {
          delete param.dkqx
        }
        if (param.fiveClassType === undefined || param.fiveClassType == 'undefined') {
          delete param.fiveClassType
        }
        if (param.sfjcsgbj === undefined || param.sfjcsgbj == 'undefined') {
          delete param.sfjcsgbj
        }
        if (param.wjflrgfh === undefined || param.wjflrgfh == 'undefined') {
          delete param.wjflrgfh
        }
        return filterObj(param);
      },
      searchReset() {
        this.queryParam = {
          tjyf: undefined
        }
        this.getCurrentMonth()
        this.loadData(1)
      },
      handleExportXls(fileName) {
        if (!fileName || typeof fileName != 'string') {
          fileName = '导出文件'
        }
        let param = Object.assign({}, this.queryParam)
        let tjyf = ''
        if (param.tjyf !== undefined && param.tjyf !== null && param.tjyf !== '') {
          tjyf = moment(param.tjyf).format("YYYY-MM") + '-01'
        }
        param.tjyf = tjyf;
        if (param.dkqx === undefined || param.dkqx == 'undefined') {
          delete param.dkqx
        }
        if (param.fiveClassType === undefined || param.fiveClassType == 'undefined') {
          delete param.fiveClassType
        }
        if (param.sfjcsgbj === undefined || param.sfjcsgbj == 'undefined') {
          delete param.sfjcsgbj
        }
        if (param.wjflrgfh === undefined || param.wjflrgfh == 'undefined') {
          delete param.wjflrgfh
        }
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(",")
        }
        param.paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
        console.log('下载参数:', param)
        this.exportLoading = true
        downFile(this.url.exportXlsUrl, param).then((data) => {
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          console.log('handleExportXls data:', data)
          var blob = new Blob([data]);
          if ('msSaveOrOpenBlob' in navigator) {
            window.navigator.msSaveOrOpenBlob(blob, fileName + '.xlsx');
            return;
          }
          var eleLink = document.createElement('a');
          eleLink.download = fileName + '.xlsx';
          eleLink.style.display = 'none'
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
        }).finally(()=>{
          this.exportLoading = false
        })
      },
      //数据抽取
      handleExtraction() {
        var params = this.getQueryParams();
        if (!params.tjyf) {
          notification.warning({message: '系统提示', description: '请选择统计月份！', duration: 4})
          return
        }
        var tjyf = Number.parseInt(moment(params.tjyf).format('YYYYMMDD').toString().substring(0,6))
        var dqyf = Number.parseInt(moment(new Date()).format("YYYYMMDD").toString().substring(0,6))
        console.log('统计月份:',tjyf)
        console.log('当前月份:',dqyf)
        if (tjyf > dqyf) {
          notification.warning({message: '系统提示', description: '统计月份不得大于当前月份！', duration: 4})
          return
        }
        this.loading = true
        this.extractionLoading = true
        this.extractionBtnName = '正在抽取，请稍等...'
        postAction(this.url.extraction,{'tjyf': params.tjyf}).then((res) => {
          if (res.success) {
            notification.success({message: '系统提示', description: '操作成功！', duration: 4})
          } else {
            notification.warning({message: '系统提示', description: res.message, duration: 4})
          }
        }).catch((error) => {
          notification.error({message: '系统提示', description: error, duration: 4})
        }).finally(() => {
          this.loading = false
          this.extractionLoading = false
          this.extractionBtnName = '数据抽取'
          this.loadData(1)
        })
      },

      //查看欠款期数明细（弃用）
      // handleView(record) {
      //   console.info('待查看欠款期数明细',record)
      //   console.info('统计月份',record.tjyf)
      //   console.info('证件号码',record.zjhm)
      // },
      //解除手工标记（弃用）
      // handleCancelMark(record) {
      //   console.info('待解除手工标记',record)
      //   var jcsgbjrq = record.jcsgbjrq
      //   if (jcsgbjrq) {
      //     notification.warning({message: '系统提示', description: '已解除手工标记，请勿重复操作！', duration: 4})
      //     return
      //   }
      //   // var sfjcsgbj = Number.parseInt(record.sfjcsgbj)
      //   // if (sfjcsgbj === 1) {
      //   //   notification.warning({message: '系统提示', description: '手工标记已解除，请勿重复操作！', duration: 4})
      //   //   return
      //   // }
      //   var dkyqts = Number.parseInt(record.dkyqts)
      //   if (dkyqts !== 0) {
      //     notification.warning({message: '系统提示', description: '贷款逾期天数为0方可建议解除！', duration: 4})
      //     return
      //   }
      //   this.loading = true
      //   console.info('解除手工标记',record)
      //   putAction(this.url.cancelMark,record).then((res) => {
      //     if (res.success) {
      //       notification.success({message: '系统提示', description: '操作成功！', duration: 4})
      //     } else {
      //       notification.warning({message: '系统提示', description: '操作失败！'+res.message, duration: 4})
      //     }
      //   }).catch((error) => {
      //     notification.error({message: '系统提示', description: '操作失败！'+error, duration: 4})
      //   }).finally(() => {
      //     this.loading = false
      //     this.loadData(1)
      //   })
      // },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>
