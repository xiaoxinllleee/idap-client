<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属组织">
              <j-tree-select placeholder="请选择所属支行" v-model="queryParam.zzbz"
                             dict="hr_bas_organization,zzjc,zzbz" pidField="sjzzbz" treeNodeFilterProp="title"
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
              <j-dict-select-tag placeholder="请选择确认状态" v-model="queryParam.spzt"
                                 dict-code="confirm_status"></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="修改状态">
              <j-dict-select-tag placeholder="请选择修改状态" v-model="queryParam.xgzt"
                                 dict-code="modify_status"></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
          <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button type="primary" @click="handleAdd" icon="plus" :loading="addLoading" v-has="'dklldjjsxx:add'">{{this.addBtnText}}</a-button>
      <a-button icon="download" @click="handleExportXls('贷款利率定价计算信息')" v-has="'dklldjjsxx:exportXls'">导出</a-button>
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
               :scroll="{ x: 3500, y: 400 }"
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
        <span slot="note" slot-scope="text">
          <j-ellipsis :value="text" :length="12"></j-ellipsis>
        </span>

        <span slot="dkqx" slot-scope="dkqx">
          <a-tag :key="dkqx" :color="dkqx==='1年期'?'#FB6241':dkqx==='5年期以上'?'#8A2BE2':'grey'">
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
          <a @click="handleEdit(record)" v-has="'dklldjjsxx:edit'">重新计算</a>
          <a-divider type="vertical"/>
          <a @click="print(record,'查看','view')" v-has="'dklldjjsxx:view'">查看</a>
          <a-divider type="vertical" v-if="record.spzt != 1"/>
          <a @click="confirm(record)" v-if="record.spzt != 1" v-has="'dklldjjsxx:confirm'">确认</a>
          <a-divider type="vertical" v-if="record.spzt == 1"/>
          <a @click="print(record,'打印','print')" v-if="record.spzt == 1" v-has="'dklldjjsxx:print'">打印</a>
          <a-divider type="vertical"/>
           <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'dklldjjsxx:delete'">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <!--计算-->
    <lljs-modal ref="modalForm" @ok="ok" ></lljs-modal>
    <!--查看/打印-->
    <print-info ref="print"></print-info>
    <!--确认-->
    <sure-modal ref="sure" @ok="ok" ></sure-modal>
  </a-card>
</template>

<script>
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import LljsModal from './modules/LljsModal'
  import {notification} from "ant-design-vue";
  import PrintInfo from './modules/PrintInfo'
  import SureModal from './modules/SureModal'
  import {deleteAction, downFile, getAction, postAction} from '@/api/manage'
  import JInput from "../../../../components/jeecg/JInput";
  import JDictSelectTag from '@/components/dict/JDictSelectTag'
  import {filterObj} from "../../../../utils/util";
  import JEllipsis from "@/components/jeecg/JEllipsis";
  import store from '@/store/'
  import moment from "moment";

  export default {
    name: "RateZxlldjbList",
    mixins: [JeecgListMixin],
    components: {
      JEllipsis, JInput, JTreeSelect, PrintInfo, SureModal, JDictSelectTag, LljsModal
    },
    data() {
      return {
        description: '利率定价计算管理页面',
        dateValue: '',
        djnf: '',
        addBtnText: '添加',
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
            scopedSlots: {customRender: 'dkqx'},
            width: 120
          },
          {
            title: '综合授信额度(万元)',
            align: "center",
            dataIndex: 'zhsxed',
            width: 140,
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '其中:贷款授信+承兑敞口(万元)',
            align: "center",
            dataIndex: 'cdck',
            width: 200,
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '得分合计',
            align: "center",
            key: 'dfhj',
            dataIndex: 'dfhj',
            width: 80,
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(2) + '分'
              }
            },
          },
          {
            title: 'LPR利率',
            align: "center",
            key: 'lprll',
            dataIndex: 'lprll',
            width: 100,
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(2) + '%'
              }
            },
          },
          {
            title: '按LPR加基点(BP)',
            align: "center",
            key: 'jdbp',
            dataIndex: 'jdbp',
            width: 130,
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(2)
              }
            },
          },
          {
            title: '优惠后按LPR加基点(BP)',
            align: "center",
            key: 'yhhjdbp',
            dataIndex: 'yhhjdbp',
            width: 180,
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(2)
              }
            },
          },
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
            title: '优惠后执行利率',
            align: "center",
            key: 'yhhzxll',
            dataIndex: 'yhhzxll',
            width: 120,
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(4) + '%'
              }
            },
          },
          {
            title: '备注',
            align: "center",
            key: 'note',
            dataIndex: 'note',
            width: 200,
            scopedSlots: {customRender: 'note'},
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
          list: "/dklldj/lldjjs/list",
          delete: "/dklldj/lldjjs/delete",
          checkRepeAdd: '/dklldj/lldjjs/checkRepeAdd',
          getSqxx:"/dklldj/lldjjs/getSqxx",
          getSqxxByCxjs:"/dklldj/lldjjs/getSqxxByCxjs",
          viewPrint:"/dklldj/lldjjs/viewPrint",
          exportXlsUrl: "dklldj/lldjjs/exportXls",
          confirmCheck: "/dklldj/lldjjs/confirmCheck",
        },
      }
    },
    computed: {},
    created() {
      this.init()
    },
    methods: {
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
        var djnf = this.djnf
        var zzbz = this.queryParam.zzbz
        var zjhm = this.queryParam.zjhm
        console.info('新增时必输项校验', zzbz, djnf, zjhm)
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
        let data = {
          'djnf': djnf,
          'zjhm': zjhm
        }
        this.addLoading = true
        this.addBtnText = '正在初始化页面，请稍等'
        postAction(this.url.checkRepeAdd, data).then((res) => {
          if (res.success) {
            getAction(this.url.getSqxx, data).then((res) => {
              if (res.success) {
                this.$refs.modalForm.opType = "add"
                this.$refs.modalForm.title = "新增：利率定价计算"
                this.$refs.modalForm.edit(res.result)
              } else {
                notification.warning({message: '系统提示', description: '计算失败,请联系系统管理员！'+res.message, duration: 4})
              }
            }).catch((error) => {
              notification.error({message: '系统提示', description: '计算失败,请联系系统管理员！'+error, duration: 4})
            })
          } else {
            notification.warning({message: '系统提示', description: '计算失败！'+res.message, duration: 4})
          }
        }).catch((error) => {
          notification.error({message: '系统提示', description: '计算失败！'+error, duration: 4})
        }).finally(()=>{
          this.addLoading = false
          this.addBtnText = '添加'
        })
      },

      //重新计算
      handleEdit(record) {
        console.info('重新计算 record',record)
        var spzt = record.spzt
        spzt = Number.parseInt(spzt)
        if (spzt === 1) {
          notification.warning({message: '系统提示', description: '此定价信息已确认，不能重新计算！', duration: 4})
          return
        }
        var djnf = record.djnf
        var zzbz = record.zzbz
        var zjhm = record.zjhm
        let djnfstr = djnf.toString().length === 4 ? djnf.toString() + '-01-01' : djnf.toString();
        let data = {
          'djnf': djnfstr,
          'zzbz': zzbz,
          'zjhm': zjhm
        }
        console.log('重新计算请求参数',data)
        this.loading = true
        getAction(this.url.getSqxxByCxjs, data).then((res) => {
          if (res.success) {
            this.$refs.modalForm.spzt = record.spzt
            this.$refs.modalForm.edit(res.result)
            this.$refs.modalForm.title = "利率定价：重新计算"
            this.$refs.modalForm.opType = "edit"
            this.$refs.modalForm.disableSubmit = false
          } else {
            notification.warning({message: '系统提示', description: '重新计算失败！'+res.message, duration: 4})
          }
        }).catch((error) => {
          notification.error({message: '系统提示', description: '重新计算失败！'+error, duration: 4})
        }).finally(()=>{
          this.loading = false
        })
      },

      //查看/打印
      print(record,title,opType) {
        console.info('查看/打印',title,opType,record)
        var jsrq = record.spsj    // 计算日期
        var yxqz = '未确认定价信息' // 有效期限至
        if (jsrq) {
          jsrq = moment(jsrq).format('YYYY-MM-DD')
          //有效期限至3年以后
          var jsrqYear  = parseInt(record.spsj.substring(0,4)) + 3
          var jsrqMonth = record.spsj.substring(5,7)
          var jsrqDay   = record.spsj.substring(8);
          //考虑二月份场景，若N年后的二月份日期大于该年的二月份的最后一天，则取该年二月份最后一天
          if (jsrqMonth == '02' || jsrqMonth == '2') {
            var monthEndDate = new Date(jsrqYear ,jsrqMonth,0).getDate()
            if (parseInt(jsrqDay) > monthEndDate) {
              //若为月底时间，则取两年后的二月份最后一天
              jsrqDay = monthEndDate
            }
          }
          yxqz = jsrqYear + '-' + jsrqMonth + '-' + jsrqDay
          yxqz = moment(yxqz).format('YYYY-MM-DD')
        }
        let data = {
          'djnf': record.djnf,
          'zjhm': record.zjhm,
        }
        this.loading = true
        getAction(this.url.viewPrint, data).then((res) => {
          if (res.success) {
            console.log('查看/打印 方案请求返回\n',res.result.records)
            this.$refs.print.disableSubmit = false
            this.$refs.print.title = title
            this.$refs.print.spzt = "1"
            this.$refs.print.computeDate = jsrq
            this.$refs.print.EffectiveDateEnd = yxqz
            if (opType == 'view') {
              this.$refs.print.opType = 'view'
            } else {
              this.$refs.print.opType = 'print'
            }
            this.$refs.print.edit(res.result.records[0])
          } else {
            notification.error({message: '系统提示', description: '查看/打印失败！'+res.message, duration: 4})
          }
        }).finally(()=>{
          this.loading = false
        })
      },

      //确认
      confirm(record) {
        console.info('待确认的定价信息:',record)
        var djid = record.djid
        if (!djid) {
          notification.warning({message: '系统提示', description: '定价ID缺失，请联系系统管理员核实！', duration: 4})
          return
        }
        var spzt = record.spzt
        if (spzt == 1) {
          notification.warning({message: '系统提示', description: '该记录不允许重复确认！', duration: 4})
          return
        }
        let params = {
          'djid': djid,
          'djnf': record.djnf+'-01-01',
          'zjhm': record.zjhm
        }
        var that = this
        that.loading = true
        postAction(that.url.confirmCheck, params).then((res) => {
          if (res.success) {
            console.info('利率定价确认返回:',res.result)
            if (res.result != null) {
              //console.info('定价年份:',res.result.djnf)
              //console.info('定价得分:',res.result.dfhj)
              //console.info('LPR利率:',res.result.lprll)
              //console.info('LPR基点:',res.result.yhhjdbp)
              //console.info('执行利率:',res.result.yhhzxll)
              that.$set(that.confirmdata,'djnf',res.result.djnf == null ? '' : res.result.djnf.substr(0,4))
              that.$set(that.confirmdata,'dfhj',res.result.dfhj == null ? 0.00 : Number(res.result.dfhj).toFixed(2))
              that.$set(that.confirmdata,'lprll',res.result.lprll == null ? 0.0000 : Number(res.result.lprll).toFixed(4))
              that.$set(that.confirmdata,'lprjd',res.result.yhhjdbp == null ? 0.00 : Number(res.result.yhhjdbp).toFixed(2))
              that.$set(that.confirmdata,'zxll',res.result.yhhzxll == null ? 0.0000 : Number(res.result.yhhzxll).toFixed(4))
              that.$confirm({
                title: '已存在该客户的定价信息，是否确定覆盖？',
                content: h =>
                  <div>
                    定价年份：{that.confirmdata.djnf}&nbsp;&nbsp;年,<br/>
                    定价得分：{that.confirmdata.dfhj}&nbsp;&nbsp;分,<br/>
                    LPR利率：{that.confirmdata.lprll}&nbsp;&nbsp;%,<br/>
                    LPR基点：{that.confirmdata.lprjd},<br/>
                    执行利率：{that.confirmdata.zxll}&nbsp;&nbsp;%,<br/>
                  </div>,
                onOk() {
                  console.log('用户确认操作！');
                  that.$refs.sure.title = "利率定价确认";
                  that.$refs.sure.disableSubmit = false
                  that.$refs.sure.edit(record);
                },
                onCancel() {
                  console.log('用户取消操作！');
                },
                class: 'test',
              });
            } else {
              that.$refs.sure.title = "利率定价确认";
              that.$refs.sure.disableSubmit = false
              that.$refs.sure.edit(record);
            }
          } else {
            notification.warning({message: '系统提示', description: '利率定价确认失败！'+res.message, duration: 4})
          }
        }).catch((error) => {
          console.info(error)
          notification.error({message: '系统提示', description: '利率定价确认失败！'+error, duration: 4})
        }).finally(()=>{
          this.loading = false
        })
      },

      //删除
      handleDelete: function (record) {
        if (!this.url.delete) {
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        console.info('待删除的定价信息:',record)
        var djid = record.djid
        if (!djid) {
          notification.warning({message: '系统提示', description: '定价ID缺失，请联系系统管理员核实！', duration: 4})
          return
        }
        //var spzt = record.spzt
        //if (spzt == 1) {
        //  notification.warning({message: '系统提示', description: '只能删除未确认的定价信息！', duration: 4})
        //  return
        //}
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

      ok() {
        this.loadData(1);
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