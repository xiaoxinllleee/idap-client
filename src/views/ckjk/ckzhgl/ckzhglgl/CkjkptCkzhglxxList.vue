<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" style="width: 100%;"
                              :defaultValue="defaultMonthOpera" :format="monthFormat" @change="monthChange"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sjzzbzQuery"
                             dict="v_hr_bas_organization, zzjc, zzbz"
                             pid-field="sjzzbz" treeNodeFilterProp="title" :showSearch="true"
                             condition='{"sjywjgdm": "ywjgdm"}'
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属组织">
              <j-tree-select ref="zzbzTreeSelect" placeholder="请选择所属组织" v-model="queryParam.zzbzQuery"
                             dict="v_hr_bas_organization_cmms, zzjc, zzbz"
                             pidField="sjzzbz" treeNodeFilterProp="title" :showSearch="true"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属岗位">
              <j-dict-select-tag placeholder="请选择所属岗位" v-model="queryParam.gwbz"
                                 dictCode="hr_bas_post, gwmc, gwbz"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="存款账号">
              <a-input placeholder="请输入存款账号" v-model="queryParam.ckzh"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="卡号">
                <a-input placeholder="请输入卡号" v-model="queryParam.kh"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="账号名称">
                <j-input placeholder="请输入账号名称" v-model="queryParam.zhmc"></j-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="证件号码">
                <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="账号所在机构">
                <j-tree-select placeholder="请选择账号所在机构" v-model="queryParam.ywjgdm"
                               dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                               pid-field="sjywjgdm" treeNodeFilterProp="title" :showSearch="true"
                               :tree-default-expand-all="true"/>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="账号性质">
                <j-dict-select-tag placeholder="请选择账号性质" v-model="queryParam.zhxz" dict-code="zhxz"></j-dict-select-tag>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="关联标识">
                <j-dict-select-tag placeholder="请选择关联标识" v-model="queryParam.glbz" dict-code="glbz"></j-dict-select-tag>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="存款余额">
                <a-input-number placeholder="Minimum" v-model="queryParam.ckye_begin" :min="0"
                                style="width: 40%; text-align: center"/>
                <a-input placeholder="~" disabled
                         style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"/>
                <a-input-number placeholder="Maximum" v-model="queryParam.ckye_end" :min="0"
                                style="width: 40%; text-align: center; border-left: 0"/>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="月存款日平余额">
                <a-input-number placeholder="Minimum" v-model="queryParam.ckrpye_begin" :min="0"
                                style="width: 40%; text-align: center"/>
                <a-input placeholder="~" disabled
                         style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"/>
                <a-input-number placeholder="Maximum" v-model="queryParam.ckrpye_end" :min="0"
                                style="width: 40%; text-align: center; border-left: 0"/>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="年存款日平余额">
                <a-input-number placeholder="Minimum" v-model="queryParam.nckrpye_begin" :min="0"
                                style="width: 40%; text-align: center"/>
                <a-input placeholder="~" disabled
                         style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"/>
                <a-input-number placeholder="Maximum" v-model="queryParam.nckrpye_end" :min="0"
                                style="width: 40%; text-align: center; border-left: 0"/>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="批次号">
                <a-input placeholder="请输入批次号" v-model="queryParam.pch"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="">
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="">
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="">
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
      <a-button @click="add" type="primary" icon="plus" v-has="'ckzhglgl:add'">新增</a-button>
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('存款账号关联管理')" v-has="'ckzhglgl:exportXls'">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
                @change="handleImportExcel" v-has="'ckzhglgl:import'">
        <a-button icon="import">导入</a-button>
      </a-upload>
      <a-button @click="claimPage" icon="highlight" v-has="'ckzhglgl:claim'">认领</a-button>
      <a-button @click="transfer" icon="box-plot" :loading="tansferLoading" v-has="'ckzhglgl:transfer'">转移</a-button>
      <a-button @click="extract" icon="highlight" v-has="'ckzhglgl:extract'">同步待分配</a-button>
     <!-- <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
      <a-button type="primary" @click="searchReset" icon="reload">重置</a-button>-->
     <!-- <a @click="handleToggleSearch">
        {{ toggleSearchStatus ? '收起' : '展开' }}
        <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
      </a>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table ref="table"
               size="middle"
               bordered
               rowKey="glid"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :scroll="{ x: 4000 }"
               @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'ckzhglgl:edit'">修改</a>
          <a-divider type="vertical"/>

                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.glid)" v-has="'ckzhglgl:delete'">
                  <a>删除</a>
                </a-popconfirm>

        </span>

        <span slot="DepositAccountNumber" slot-scope="text">
        <j-ellipsis :value="text" :length="17"></j-ellipsis>
      </span>
        <span slot="AccountNumber" slot-scope="text">
        <j-ellipsis :value="text" :length="17"></j-ellipsis>
      </span>
        <span slot="AccountName" slot-scope="text">
        <j-ellipsis :value="text" :length="8"></j-ellipsis>
      </span>
        <span slot="IdentNo" slot-scope="text">
        <j-ellipsis :value="text" :length="18"></j-ellipsis>
      </span>
        <span slot="LoanAccountNumber" slot-scope="text">
        <j-ellipsis :value="text" :length="17"></j-ellipsis>
      </span>
        <span slot="Address" slot-scope="text">
        <j-ellipsis :value="text" :length="8"></j-ellipsis>
      </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <ckjkptCkzhglxx-modal ref="modalForm" @ok="modalFormOk"></ckjkptCkzhglxx-modal>

    <claim-page ref="claimpage" @close="handlerColseWindow"/>

    <add ref="add" @close="addClose"></add>

    <!--存款账号关联转移-->
    <ckzh-transfer-modal ref="transferModal" @close="transferClose"></ckzh-transfer-modal>

  </a-card>
</template>

<script>
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {getAction} from "@/api/manage";
  import {filterObj} from "@/utils/util";
  import moment from 'moment'
  import ClaimPage from './modules/ClaimPage'
  import CkjkptCkzhglxxModal from './modules/CkjkptCkzhglxxModal'
  import CkzhTransferModal from "./modules/CkzhTransferModal";
  import Add from './modules/add'
  import JInput from "@/components/jeecg/JInput";
  import JEllipsis from "../../../../components/jeecg/JEllipsis";
  import { downFile, postAction } from '../../../../api/manage'
  import store from '@/store/'

  export default {
    name: "CkjkptCkzhglxxList",
    mixins: [JeecgListMixin],
    components: {
      JEllipsis,
      JInput,
      JTreeSelect,
      ClaimPage,
      CkjkptCkzhglxxModal,
      Add,
      CkzhTransferModal
    },
    data() {
      return {
        description: '存款账号关联管理管理页面',
        monthFormat: 'YYYY-MM',
        defaultMonthOpera: '',
        // 重置标识
        flag: true,
        show: true,
        tansferLoading: false,
        isorter: {
          order: 'desc',
        },
        dataSource: [],
        transCheckResults: [],
        empResults: [],
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 50,
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '支行代码',
            align: 'center',
            dataIndex: 'sjzzbz_dictText',
            width: 100
          },
          {
            title: '支行名称',
            align: 'center',
            dataIndex: 'sjzzmc_dictText',
            width: 120
          },
          {
            title: '组织标识',
            align: "center",
            dataIndex: 'zzbz',
            width: 100
          },
          {
            title: '组织名称',
            align: "center",
            dataIndex: 'zzbz_dictText',
            width: 120
          },
          {
            title: '岗位标识',
            align: "center",
            dataIndex: 'gwbz',
            width: 80
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
            title: '柜员号',
            align: "center",
            dataIndex: 'gyh',
            width: 80
          },
          {
            title: '客户经理标识',
            align: "center",
            dataIndex: 'khjlbz',
            width: 120
          },
          {
            title: '存款账号',
            align: "center",
            dataIndex: 'ckzh',
            scopedSlots: {customRender: 'DepositAccountNumber'},
            width: 170
          },
          {
            title: '卡号',
            align: "center",
            dataIndex: 'kh',
            scopedSlots: {customRender: 'AccountNumber'},
            width: 170
          },
          {
            title: '账号名称',
            align: "center",
            dataIndex: 'zhmc',
            scopedSlots: {customRender: 'AccountName'},
            width: 150
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            scopedSlots: {customRender: 'IdentNo'},
            width: 180
          },
          {
            title: '账号所在机构代码',
            align: "center",
            dataIndex: 'ywjgdm',
            width: 120
          },
          {
            title: '账号所在机构名称',
            align: "center",
            dataIndex: 'ywjgdm_dictText',
            width: 120
          },
          {
            title: '对应贷款账号',
            align: "center",
            dataIndex: 'dkzh',
            scopedSlots: {customRender: 'LoanAccountNumber'},
            width: 170
          },
          {
            title: '账号性质',
            align: "center",
            dataIndex: 'zhxz_dictText',
            width: 80
          },
          {
            title: '存期',
            align: "center",
            dataIndex: 'cq',
            width: 80
          },
          {
            title: '本期起息日',
            align: "center",
            dataIndex: 'bqqxr',
            width: 100
          },
          {
            title: '本期截至日',
            align: "center",
            dataIndex: 'bqjzr',
            width: 100
          },
          {
            title: '关联比率(%)',
            align: "center",
            dataIndex: 'glbl',
            width: 100
          },
          {
            title: '关联标识',
            align: "center",
            dataIndex: 'glbz_dictText',
            width: 80
          },
          {
            title: '存款余额',
            align: "center",
            dataIndex: 'ckye',
            width: 80
          },
          {
            title: '月存款日平余额',
            align: "center",
            dataIndex: 'ckrpye',
            width: 120
          },
          {
            title: '年存款日平余额',
            align: "center",
            dataIndex: 'nckrpye',
            width: 120
          },
          {
            title: '地址',
            align: "center",
            dataIndex: 'dz',
            scopedSlots: {customRender: 'Address'},
            width: 150
          },
          {
            title: '录入标志',
            align: "center",
            dataIndex: 'lrbz_dictText',
            width: 80
          },
          {
            title: '录入人',
            align: "center",
            dataIndex: 'lrczy',
            width: 80
          },
          {
            title: '录入时间',
            align: "center",
            dataIndex: 'lrsj',
            width: 100
          },
          {
            title: '修改人',
            align: "center",
            dataIndex: 'xgczy',
            width: 80
          },
          {
            title: '修改时间',
            align: "center",
            dataIndex: 'xgsj',
            width: 100
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            fixed: 'right',
            scopedSlots: {customRender: 'action'},
            width: 120
          }
        ],
        url: {
          list: "/ckzhglgl/ckjkptCkzhglxx/list",
          delete: "/ckzhglgl/ckjkptCkzhglxx/delete",
          extract: "/ckzhglgl/ckjkptCkzhglxx/extract",
          deleteBatch: "/ckzhglgl/ckjkptCkzhglxx/deleteBatch",
          exportXlsUrl: "ckzhglgl/ckjkptCkzhglxx/exportXls",
          importExcelUrl: "ckzhglgl/ckjkptCkzhglxx/importExcel",
          TransferCheck: "/ckzhglgl/ckjkptCkzhglxx/TransferCheck",
          EmpCheck: "/ckzhglgl/ckjkptCkzhglxx/EmpCheck",
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
      handleEdit: function (record) {
        this.$refs.modalForm.edit(record, moment(this.queryParam.tjyf).format("YYYY-MM") + '-01');
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
      },
      add() {
        this.$refs.add.queryParam.tjyf = moment(this.queryParam.tjyf).format("YYYY-MM") + '-01'
        this.$refs.add.add();
      },
      /**
       * 存款账号关联管理 - 同步待分配
       */
      extract() {
        this.loading = true
        getAction(this.url.extract, {}).then((res) => {
          if (res.code === 500) {
            this.$message.warning("提取失败！")
          } else if (res.code === 200) {
            this.$message.success("提取成功！")
            this.loadData(1)
          }
        }).catch((error) => {
          this.$message.error("提取失败！", error)
        }).finally(() => {
          this.loading = false
        })
      },
      /**
       * 存款账号关联管理 -认领
       */
      claimPage() {
        var params = this.getQueryParams();
        if ((params.tjyf === undefined || params.tjyf == null) && this.flag == true) {
          params.tjyf = moment(this.defaultMonthOpera).format("YYYY-MM") + '-01';
        }
        this.$refs.claimpage.init(params);
      },
      getCurrentMonth() {
        let curDate = new Date();
        let curMonth = {year: curDate.getFullYear(), month: curDate.getMonth() + 1,}
        this.defaultMonthOpera = moment(curDate, this.monthFormat);
        this.queryParam = {tjyf: undefined};
        this.queryParam.tjyf=this.defaultMonthOpera;
      },
      searchReset() {
        this.flag = false;
        this.queryParam = {tjyf: undefined,zzbzQuery: undefined, sjzzbzQuery: undefined};
        this.queryParam.tjyf = this.defaultMonthOpera;
        if(!store.getters.isRoot) {
          this.queryParam.zzbzQuery = store.getters.userInfo.orgCode
          this.queryParam.sjzzbzQuery = store.getters.userInfo.orgCode
        }
        // this.$refs['zzbzTreeSelect'].loadRoot()
        this.loadData(1);
        this.$forceUpdate();
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
        var params = this.getQueryParams();//查询条件
        if ((params.tjyf != undefined && params.tjyf != null)) {
          params.tjyf = moment(params.tjyf).format("YYYY-MM") + '-01';
        }
        this.loading = true;
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
      getQueryParams() {
        let tjyfMoment = "";
        if (this.queryParam.tjyf) {
          tjyfMoment = moment(this.queryParam.tjyf).format("YYYY-MM") + '-01';
        }
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf = tjyfMoment;
        }
        return filterObj(param);
      },
      handlerColseWindow() {
        this.searchReset();
        console.log("认领窗口已关闭")
      },
      addClose() {
        console.log('添加窗口已关闭')
        this.searchQuery()
      },
      /**
       * 存款账号转移
       */
      transfer: function () {
        var params = this.getQueryParams()
        console.log('查询条件', params.tjyf, params.zzbz, params.gwbz, params.yggh)
        var ParamsTjyf = moment(params.tjyf).format("YYYY-MM")
        var CurrentMonth = moment(this.defaultMonthOpera).format("YYYY-MM")
        let sysMonth = Number(moment(this.defaultMonthOpera).format('YYYY-MM').replace('-',''))
        let chooseMonth = Number(moment(this.queryParam.tjyf).format('YYYY-MM').replace('-',''))
        var TableName = 'ckjkpt_ckzhglxx'
        var DepAccNumCheck = false
        if (params.tjyf === undefined || params.tjyf === "") {
          this.$message.warning("请选择统计月份！")
          return false
        }
        if (chooseMonth > sysMonth) {
          this.$message.warning("统计月份不能大于当前系统月份！")
          return false
        }
        if (params.zzbzQuery === undefined || params.zzbzQuery === "") {
          this.$message.warning("请选择所属组织！")
          return false
        }
        if (params.gwbz === undefined || params.gwbz === "") {
          this.$message.warning("请选择所属岗位！")
          return false
        }
        if (params.yggh === undefined || params.yggh === "") {
          this.$message.warning("请输入员工工号！")
          return false
        }
        if (params.ckzh !== undefined && params.ckzh !== "") {
          var ckzh = params.ckzh
          DepAccNumCheck = true
        }
        var ywjgdm, glbz, CkyeBegin, CkyeEnd, CkrpyeBegin, CkrpyeEnd, NckrpyeBegin, NckrpyeEnd
        // 若所选统计月份不等于当前系统月份，则将`存款关联信息`表名变更为所选月份表名
        if (ParamsTjyf !== CurrentMonth) TableName = TableName.concat("_").concat(ParamsTjyf.substr(0,4)).concat(ParamsTjyf.substr(5,7))
        if (params.ywjgdm !== undefined && params.ywjgdm !== "") ywjgdm = params.ywjgdm
        if (params.glbz !== undefined && params.glbz !== "") glbz = params.glbz
        if (params.ckye_begin !== undefined && params.ckye_begin !== "") CkyeBegin = params.ckye_begin
        if (params.ckye_end !== undefined && params.ckye_end !== "") CkyeEnd = params.ckye_end
        if (params.ckrpye_begin !== undefined && params.ckrpye_begin !== "") CkrpyeBegin = params.ckrpye_begin
        if (params.ckrpye_end !== undefined && params.ckrpye_end !== "") CkrpyeEnd = params.ckrpye_end
        if (params.nckrpye_begin !== undefined && params.nckrpye_begin !== "") NckrpyeBegin = params.nckrpye_begin
        if (params.nckrpye_end !== undefined && params.nckrpye_end !== "") NckrpyeEnd = params.nckrpye_end
        let param = {
          'tjyf': params.tjyf,
          'zzbz': params.zzbzQuery,
          'gwbz': params.gwbz,
          'yggh': params.yggh,
          'ckzh': ckzh,
          'TableName': TableName,
          'check': DepAccNumCheck,
          'ywjgdm': ywjgdm,
          'glbz': glbz,
          'CkyeBegin': CkyeBegin,
          'CkyeEnd': CkyeEnd,
          'CkrpyeBegin': CkrpyeBegin,
          'CkrpyeEnd': CkrpyeEnd,
          'NckrpyeBegin': NckrpyeBegin,
          'NckrpyeEnd': NckrpyeEnd
        }
        console.log('请求参数', param)
        if (param) {
          var open = true
          this.tansferLoading = true
          postAction(this.url.TransferCheck, param).then((response) => {
            if (response.success) {
              console.log('校验存款关联信息返回:', response.result)
              this.transCheckResults = response.result
              // this.$message.warning(response.message)
            } else {
              open = false
              this.$message.warning(response.message)
            }
          }).catch((error) => {
            this.$message.error('系统错误，请联系管理员！原因:', error)
          }).finally(() => {
            this.tansferLoading = false
            if (open) {
              console.log('转移校验返回:', this.transCheckResults)
              let args = {
                'tjyf': params.tjyf,
                'check': DepAccNumCheck,
                'transCheckResults': this.transCheckResults
              }
              this.$refs['transferModal'].visible = true
              this.$refs['transferModal'].init(args)
            }
            // postAction(this.url.EmpCheck, {'zzbz': params.zzbz, 'gwbz': params.gwbz, 'yggh': params.yggh}).then((response) => {
            //   if (response.success) {
            //     console.log('校验员工信息返回:', response.result)
            //     this.empResults = response.result
            //     // this.$message.warning(response.message)
            //   } else {
            //     open = false
            //     this.$message.warning(response.message)
            //   }
            // }).catch((error) => {
            //   this.$message.error('系统错误，请联系管理员！原因:', error)
            // })
          })
        } else {
          console.log('请求参数传递有误！',param)
        }
      },
      /**
       * 存款账号转移 - 窗口关闭
       */
      transferClose() {
        console.log('账号转移已关闭！')
      },
      monthChange() {
        let sysMonth = Number(moment(this.defaultMonthOpera).format('YYYY-MM').replace('-',''))
        let chooseMonth = Number(moment(this.queryParam.tjyf).format('YYYY-MM').replace('-',''))
        if (chooseMonth > sysMonth) this.$message.warning("统计月份不能大于当前系统月份！")
        console.log('统计月份:', chooseMonth, '系统月份:', sysMonth)
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