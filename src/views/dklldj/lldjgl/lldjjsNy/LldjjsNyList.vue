<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属组织">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.zzbz" dict="hr_bas_organization,zzjc,zzbz" pidField="sjzzbz" treeNodeFilterProp="title"
                             :sszh="true" :showSearch="true" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="定价年份">
              <a-select placeholder="请选择定价年份" v-model="djnf" @change="selectValue" :allowClear="true">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称" v-model="queryParam.khmc"></j-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="定价编号">
              <a-input placeholder="请输入定价编号" v-model="queryParam.djid"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="确认状态">
              <j-dict-select-tag placeholder="请选择确认状态" v-model="queryParam.spzt" dict-code="confirm_status"></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
          <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleAdd" :loading="addLoading" v-has="'lldjjsNy:add'">{{this.addBtnText}}</a-button>
      <a-button icon="download" @click="handleExportXls('贷款利率定价计算信息')" v-has="'lldjjsNy:exportXls'">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table ref="lldjjsTable"
               size="small"
               bordered
               rowKey="djid"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :scroll="{ x: 2500, y: 400 }"
               @change="handleTableChange">

        <span slot="zzbz" slot-scope="text">
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

        <span slot="dkqx" slot-scope="dkqx">
          <a-tag :key="dkqx" :color="dkqx==='1年期'?'#FB6241':dkqx==='1年期以上'?'#8A2BE2':'grey'">
            {{ dkqx }}
          </a-tag>
        </span>
        <span slot="spzt" slot-scope="spzt">
          <a-tag :key="spzt" :color="spzt==='确认'?'#DB5860':spzt==='未确认'?'#15D36A':'grey'">
            {{ spzt }}
          </a-tag>
        </span>
        <span slot="xgzt" slot-scope="xgzt">
          <a-tag :key="xgzt" :color="xgzt==='已修改'?'#DB5860':xgzt==='未修改'?'#15D36A':'grey'">
            {{ xgzt }}
          </a-tag>
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'lldjjsNy:edit'">重新计算</a>
          <a-divider type="vertical"/>
          <a @click="print(record,'查看','view')" v-has="'lldjjsNy:view'">查看</a>
          <a-divider type="vertical" v-if="record.spzt != 1"/>
          <a @click="confirm(record)" v-if="record.spzt != 1" v-has="'lldjjsNy:confirm'">确认</a>
          <a-divider type="vertical" v-if="record.spzt == 1"/>
          <a @click="print(record,'打印','print')" v-if="record.spzt == 1" v-has="'lldjjsNy:print'">打印</a>
          <a-divider type="vertical"/>
           <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'lldjjsNy:delete'">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <lldjjs-ny-modal ref="modalForm" @ok="modalFormOk"></lldjjs-ny-modal>
    <lldjjs-ny-confirm-modal ref="sure"  @ok="ok"></lldjjs-ny-confirm-modal>
    <lldjjs-ny-print-modal ref="print" ></lldjjs-ny-print-modal>
  </a-card>
</template>

<script>
import {JeecgListMixin} from '@/mixins/JeecgListMixin'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import {notification} from "ant-design-vue"
import {deleteAction, downFile, getAction, postAction} from '@/api/manage'
import JInput from "../../../../components/jeecg/JInput";
import JDictSelectTag from '@/components/dict/JDictSelectTag'
import {filterObj} from "../../../../utils/util"
import JEllipsis from "@/components/jeecg/JEllipsis"
import lldjjsNyModal from "./modules/lldjjsNyModal"
import lldjjsNyConfirmModal from "./modules/lldjjsNyConfirmModal"
import lldjjsNyPrintModal from "./modules/lldjjsNyPrintModal"
import store from '@/store/'
import moment from "moment"

export default {
  name: "LldjjsNyList",
  mixins: [JeecgListMixin],
  components: {
    lldjjsNyModal,
    lldjjsNyConfirmModal,
    lldjjsNyPrintModal,
    JEllipsis,
    JInput,
    JTreeSelect,
    JDictSelectTag
  },
  data() {
    return {
      description: '利率定价计算管理页面（宁远）',
      dateValue: '',
      djnf: '',
      addBtnText: '添加',
      confirmeBtnText:'确认',
      calculatingInteresRateBtnText:'测算利率',
      addLoading: false,
      confirmdata: {
        'djnf': '',
        'dfhj': 0.00,
        'lprll': 0.00,
        'lprjd': 0.00,
        'zxll': 0.00
      },
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
          key: 'zzbz',
          dataIndex: 'zzbz',
          width: 80
        },
        {
          title: '组织名称',
          align: "center",
          dataIndex: 'zzbz_dictText',
          scopedSlots: {customRender: 'zzbz'},
          width: 100,
        },
        {
          title: '定价年份',
          align: "center",
          key: 'djnf',
          dataIndex: 'djnf',
          customRender: function (text) {
            return !text ? "" : (text.length > 4 ? text.substr(0, 4) : text)
          },
          width: 80
        },
        {
          title: '定价编号',
          align: "center",
          key: 'djid',
          dataIndex: 'djid',
          scopedSlots: {customRender: 'djid'},
          width: 120,
        },
        {
          title: '证件号码',
          align: "center",
          key: 'zjhm',
          dataIndex: 'zjhm',
          scopedSlots: {customRender: 'zjhm'},
          width: 160
        },
        {
          title: '客户名称',
          align: "center",
          key: 'khmc',
          dataIndex: 'khmc',
          scopedSlots: {customRender: 'khmc'},
          width: 240
        },
        {
          title: '贷款期限',
          align: "center",
          key: 'dkqx',
          dataIndex: 'dkqx_dictText',
          width: 80,
          scopedSlots: {customRender: 'dkqx'},
        },
        {
          title: '得分合计',
          align: "center",
          key: 'dfhj',
          dataIndex: 'dfhj',
          width: 120,
          customRender:(text)=>{
            if (text != null) {
              return Number.parseFloat(text).toFixed(2) + '分'
            }
          },
        },
        // {
        //   title: '报价日期',
        //   align: "center",
        //   key: 'bjrqi',
        //   dataIndex: 'bjrq',
        //   customRender: function (text) {
        //     return !text ? "" : (text.length > 4 ? text.substr(0, 4) : text)
        //   },
        //   width: 80
        // },
        // {
        //   title: ' 基点(加/减)BP',
        //   align: "center",
        //   key: 'jdjjbp',
        //   dataIndex: 'jdjjbp',
        //   width: 120,
        //   customRender:(text)=>{
        //     if (text != null) {
        //       return Number.parseFloat(text).toFixed(4) + '%'
        //     }
        //   },
        // },
        // {
        //   title: 'LPR利率(%)',
        //   align: "center",
        //   key: 'LPR',
        //   dataIndex: 'LPR',
        //   width: 100,
        //   customRender:(text)=>{
        //     if (text != null) {
        //       return Number.parseFloat(text).toFixed(4) + '%'
        //     }
        //   },
        // },
        {
          title: '执行利率',
          align: "center",
          key: 'zxll',
          dataIndex: 'zxll',
          width: 100,
          customRender:(text)=>{
            if (text != null) {
              return Number.parseFloat(text).toFixed(4) + '%'
            }
          },
        },
        {
          title: '定价人',
          align: "center",
          key: 'lrczy',
          dataIndex: 'lrczy',
          width: 80,
        },
        {
          title: '定价时间',
          align: "center",
          key: 'lrsj',
          dataIndex: 'lrsj',
          width: 160
        },
        {
          title: '确认状态',
          align: "center",
          key: 'spzt',
          dataIndex: 'spzt_dictText',
          width: 80,
          scopedSlots: {customRender: 'spzt'},
        },
        {
          title: '确认人',
          align: "center",
          key: 'spr',
          dataIndex: 'spr',
          width: 80
        },
        {
          title: '确认时间',
          align: "center",
          key: 'spsj',
          dataIndex: 'spsj',
          width: 160
        },
        {
          title: '备注',
          align: "center",
          key: 'note',
          dataIndex: 'note',
          width: 200
        },
        {
          title: '修改状态',
          align: "center",
          key: 'xgzt',
          dataIndex: 'xgzt_dictText',
          width: 80,
          scopedSlots: {customRender: 'xgzt'},
        },
        {
          title: '修改人',
          align: "center",
          key: 'xgczy',
          dataIndex: 'xgczy',
          width: 80
        },
        {
          title: '修改时间',
          align: "center",
          key: 'xgsj',
          dataIndex: 'xgsj',
          width: 160
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: "center",
          fixed: "right",
          scopedSlots: {customRender: 'action'},
          width: 230
        }
      ],
      url: {
        list: "/dklldj/lldjjsNy/list",
        add: "/dklldj/lldjjsNy/add",
        edit: "/dklldj/lldjjsNy/edit",
        delete: "/dklldj/lldjjsNy/delete",
        confirm: "/dklldj/lldjjsNy/confirm",
        viewPrint: "/dklldj/lldjjsNy/viewPrint",
        exportXlsUrl: "dklldj/lldjjsNy/exportXls",
      },
    }
  },
  computed: {},
  created() {
    this.init()
  },
  methods: {
    printMethod() {},
    deleteMethod() {},
    calculatingIntere() {},

    init() {
      var myDate = new Date;
      var year = myDate.getFullYear();
      this.djnf = year
      this.initSelectYear(year)
    },

    initSelectYear(year) {
      // 初始化年份选择下拉框
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
      param.djnf = djnf
      return filterObj(param);
    },

    ok() {
      this.loadData(1);
    },

    loadData(arg) {
      if (!this.url.list) {
        notification.error({message: '系统提示', description: '请设置url.list属性!', duration: 4})
        return
      }
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1;
      }
      //查询条件
      var params = this.getQueryParams();
      let djnf = ''
      if (params.djnf !== undefined && params.djnf !== null && params.djnf !== '') {
        djnf = moment(params.djnf).format('YYYY') + '-01-01'
      }
      params.djnf = djnf
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

    //添加计算
    handleAdd: function () {
      //在计算时 准备数据
      var zzbz = this.queryParam.zzbz
      var djnf = this.djnf
      var zjhm = this.queryParam.zjhm
      if (zzbz === undefined || zzbz === '') {
        notification.warning({message: '系统提示', description: '请选择组织标识！', duration: 4})
        return false
      }
      if (djnf === undefined || djnf === '') {
        notification.warning({message: '系统提示', description: '请选择定价年份！', duration: 4})
        return false
      }
      if (zjhm === undefined || zjhm === '') {
        notification.warning({message: '系统提示', description: '请输入证件号码！', duration: 4})
        return false
      }
      djnf = djnf.toString().length === 4 ? djnf.toString() + '-01-01' : djnf.toString();
      let param = {
        'djnf': djnf,
        'zjhm': zjhm
      }
      this.addLoading = true
      this.addBtnText = '正在初始化页面，请稍等'
      getAction(this.url.add, param).then((res) => {
        if (res.success) {
          console.info('贷款利率定价计算 / 添加：',res.result)
          this.$refs.modalForm.opration = 'add'
          this.$refs.modalForm.title = "新增：贷款利率定价计算"
          this.$refs.modalForm.edit(res.result.djsqxx)
        } else {
          notification.warning({message: '系统提示', description: '添加失败！'+res.message, duration: 4})
        }
      }).catch((error) => {
        notification.error({message: '系统提示', description: '添加失败,请联系系统管理员！'+error, duration: 4})
      }).finally(() => {
        this.addLoading = false
        this.addBtnText = '添加'
      })
    },

    //重新计算
    handleEdit(record) {
      var spzt = record.spzt
      spzt = Number.parseInt(spzt)
      if (spzt === 1) {
        notification.warning({message: '系统提示', description: '此定价信息已确认，不能重新计算！', duration: 4})
        return
      }
      var djid = record.djid
      if (djid === '' || djid === undefined) {
        notification.warning({message: '系统提示', description: '定价编号为空，请核实！', duration: 4})
        return
      }
      var djnf = record.djnf
      var zjhm = record.zjhm
      let djnfstr = djnf.toString().length === 4 ? djnf.toString() + '-01-01' : djnf.toString();
      let param = {
        'djnf': djnfstr,
        'zjhm': zjhm
      }
      this.addLoading = true
      getAction(this.url.edit, param).then((res) => {
        if (res.success) {
          console.info('贷款利率定价计算 / 重新计算：',res.result)
          this.$refs.modalForm.djid = djid
          this.$refs.modalForm.spzt = record.spzt
          this.$refs.modalForm.opration = "edit"
          this.$refs.modalForm.title = "重新计算：贷款利率定价"
          this.$refs.modalForm.edit(res.result.djsqxx)
        } else {
          notification.warning({message: '系统提示', description: '重新计算失败！'+res.message, duration: 4})
        }
      }).catch((error) => {
        notification.error({message: '系统提示', description: '重新计算失败,请联系系统管理员！'+error, duration: 4})
      }).finally(() => {
        this.addLoading = false
      })
    },

    //查看/打印
    print(record,title,opType) {},

    //确认
    confirm(record) {
      let that=this;
      that.$refs.sure.title = "利率定价确认";
      that.$refs.sure.disableSubmit = false
      that.$refs.sure.edit(record);

    },

    //删除
    handleDelete: function (record) {
      if (!this.url.delete) {
        notification.error({message: '系统提示', description: '请设置url.delete属性!', duration: 4})
        return
      }
      var that = this;
      var djid = record.djid
      if (!djid) {
        notification.warning({message: '系统提示', description: '定价编号为空，请核实！', duration: 4})
        return
      }
      that.loading = true
      deleteAction(that.url.delete, {'djid': djid}).then((res) => {
        if (res.success) {
          notification.success({message: '系统提示', description: res.message, duration: 4});
          that.loadData();
        } else {
          notification.warning({message: '系统提示', description: res.message, duration: 4});
        }
      }).finally(() => {
        that.loading = false
      })
    },

    handleExportXls(fileName) {
      // fileName = this.exportTemplateName;
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