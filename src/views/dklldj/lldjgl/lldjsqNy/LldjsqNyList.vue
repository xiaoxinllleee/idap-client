<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="所属组织">
              <j-tree-select placeholder="请选择所属组织" v-model="queryParam.zzbz" dict="hr_bas_organization,zzjc,zzbz" pidField="sjzzbz" treeNodeFilterProp="title"
                             :sszh="true" :showSearch="true" :treeDefaultExpandAll="true" :filterTreeNode="true"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="定价年份">
              <a-select placeholder="请选择定价年份" v-model="djnf" @change="selectValue" :allowClear="true">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称模糊查询" v-model="queryParam.khmc"></j-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="贷款期限">
              <j-dict-select-tag placeholder="请选择" v-model="queryParam.dkqx" dictCode="dkqx"/>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="客户类型">
                <j-dict-select-tag placeholder="请选择" v-model="queryParam.khlx" dictCode="lldj_khlx"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="是否便民卡">
                <j-dict-select-tag placeholder="请选择" v-model="queryParam.sfbmk" dictCode="sfbz"/>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
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
      <a-button type="primary" @click="handleAdd" icon="plus" :loading="addLoading" v-has="'lldjsqNy:add'">{{this.addBtnText}}</a-button>
      <a-button @click="handleExportXls('贷款利率定价申请信息')" icon="download" v-has="'lldjsqNy:exportXls'">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table ref="table"
               size="small"
               bordered
               rowKey="zzbz,zjhm,djnf"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :scroll="{ x: 2400, y: 400 }"
               @change="handleTableChange">

        <span slot="zzbz" slot-scope="text">
          <j-ellipsis :value="text" :length="5"/>
        </span>
        <span slot="zjhm" slot-scope="text">
          <j-ellipsis :value="text" :length="18"/>
        </span>
        <span slot="khmc" slot-scope="text">
          <j-ellipsis :value="text" :length="18"/>
        </span>

        <span slot="khlx" slot-scope="khlx">
          <a-tag :key="khlx" :color="khlx==='个人'?'#FB6241':khlx==='企业'?'#8A2BE2':'grey'">
            {{ khlx }}
          </a-tag>
        </span>
        <span slot="dkqx" slot-scope="dkqx">
          <a-tag :key="dkqx" :color="dkqx==='五年以上'?'#FB6241':dkqx==='一至五年（含）'?'#8A2BE2':dkqx==='一年（含）以内'?'#FB325F':'grey'">
            {{ dkqx }}
          </a-tag>
        </span>
        <span slot="lrbz" slot-scope="lrbz">
          <a-tag :key="lrbz" :color="lrbz==='导入'?'#24C780':lrbz==='录入'?'#108EE9':lrbz==='修改'?'#8A2BE2':lrbz==='调整'?'#002140':'grey'">
            {{ lrbz }}
          </a-tag>
        </span>
        <span slot="sfbmk" slot-scope="sfbmk">
          <a-tag :key="sfbmk" :color="sfbmk==='是'?'#15D36A':sfbmk==='否'?'#DB5860':'grey'">
            {{ sfbmk }}
          </a-tag>
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'lldjsqNy:edit'">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'lldjsqNy:delete'">
            <a>删除</a>
          </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <lldjsq-ny-modal ref="modalNyForm" @ok="modalFormOk"></lldjsq-ny-modal>
  </a-card>
</template>

<script>
  import LldjsqNyModal from "@/views/dklldj/lldjgl/lldjsqNy/modules/LldjsqNyModal";
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util'
  import { deleteAction, getAction,downFile,postAction } from '@/api/manage'
  import JInput from "@/components/jeecg/JInput";
  import JEllipsis from "@/components/jeecg/JEllipsis";
  import store from '@/store/'
  import moment from "moment";
  import {notification} from "ant-design-vue";

  export default {
    name: "LldjsqNyList",
    mixins: [JeecgListMixin],
    components: {
      JEllipsis,
      JInput,
      JTreeSelect,
      LldjsqNyModal,
    },
    data() {
      return {
        description: '利率定价申请管理页面（宁远）',
        addBtnText: '添加',
        addLoading: false,
        years: '',
        djnf: '',
        dataSource: [],
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            align: "center",
            width: 60,
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            },
          },
          {
            title: '组织标识',
            align: "center",
            dataIndex: 'zzbz',
            width: 80
          },
          {
            title: '组织名称',
            align: "center",
            dataIndex: 'zzbz_dictText',
            scopedSlots: {customRender: 'zzbz'},
            width: 100
          },
          {
            title: '定价年份',
            align: "center",
            dataIndex: 'djnf',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 4) : text)
            },
            width: 80,
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            scopedSlots: {customRender: 'zjhm'},
            width: 160
          },
          {
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc',
            scopedSlots: {customRender: 'khmc'},
            width: 240
          },
          {
            title: '客户类型',
            align: "center",
            dataIndex: 'khlx_dictText',
            width: 80,
            scopedSlots: {customRender: 'khlx'},
          },
          {
            title: '法人代表',
            align: "center",
            dataIndex: 'frdb',
            width: 100
          },
          {
            title: '贷款期限',
            align: "center",
            dataIndex: 'dkqx_dictText',
            width: 120,
            scopedSlots: {customRender: 'dkqx'},
          },
          {
            title: '信贷贷款品种',
            align: "center",
            dataIndex: 'xddkpz_dictText',
            width: 120,
            scopedSlots: {customRender: 'xkdkpz'},
          },
          {
            title: '上年授信额度(万元)',
            align: "center",
            dataIndex: 'snsxed',
            width: 100,
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '上年贷款基点(加/减)BP',
            align: "center",
            dataIndex: 'sndkjdbp',
            width: 100
          },
          {
            title: '综合授信额度(万元)',
            align: "center",
            dataIndex: 'zhsxed',
            width: 100,
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
            width: 170,
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '是否便民卡',
            align: "center",
            dataIndex: 'sfbmk_dictText',
            width: 100,
            scopedSlots: {customRender: 'sfbmk'},
          },
          {
            title: '录入标识',
            align: "center",
            dataIndex: 'lrbz_dictText',
            width: 100,
            scopedSlots: {customRender: 'lrbz'},
          },
          {
            title: '录入人',
            align: "center",
            dataIndex: 'lrr',
            width: 120
          },
          {
            title: '录入时间',
            align: "center",
            dataIndex: 'lrsj',
            width: 140
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
            fixed: "right",
            width: 160,
          }
        ],
        url: {
          list: "/dklldj/lldjsqNy/list",
          addDjsq: "/dklldj/lldjsqNy/addDjsq",
          editDjsq: "/dklldj/lldjsqNy/editDjsq",
          delete: "/dklldj/lldjsqNy/delete",
          exportXlsUrl: "/dklldj/lldjsqNy/exportXls",
        },
      }
    },
    computed: {},
    created() {
      this.init()
    },
    methods: {
      //获取当前年份
      init() {
        var date = new Date
        var year = date.getFullYear()
        this.djnf = year
        this.initSelectYear(year)
      },
      /**
       * 初始化年份选择
       * @param year 当前年份 / 年份下拉框只加载截止到该年份以前的年份
       */
      initSelectYear(year) {
        this.years = [];
        for (let i = 0; i < 30; i++) {
          this.years.push({value: ((year - i) + ''), label: ((year - i) + '')});
        }
      },
      /**
       * 定价年份选择监听事件
       * @param value 选择的年份
       */
      selectValue(value) {
        this.$emit('change', value)
      },
      //初始化查询条件参数
      initQueryParams() {
        if (!store.getters.isRoot) {
          this.queryParam.zzbz = store.getters.userInfo.orgCode
        }
        this.paramsInited = true
      },
      //获取查询条件参数
      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);let djnf = ''
        if (this.djnf) {
          djnf = this.djnf + '-01-01';
        }
        param.djnf = djnf
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        return filterObj(param);
      },
      //数据查询方法
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
        this.loading = true
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records
            this.ipagination.total = res.result.total
          }
          if (res.code === 510) {
            this.$message.warning(res.message,5)
          }
          this.loading = false
        })
      },
      //重置查询条件
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
      /**
       * 添加定价申请
       * @param record 当前选中数据
       */
      handleAdd() {
        var zzbz = this.queryParam.zzbz
        var djnf = this.djnf
        var zjhm = this.queryParam.zjhm
        if (zzbz === undefined || zzbz === "") {
          notification.warning({message: '系统提示', description: '请选择所属组织!', duration: 4})
          return false
        }
        if (djnf === undefined || djnf === "") {
          notification.warning({message: '系统提示', description: '请选择定价年份!', duration: 4})
          return false
        }
        if (zjhm === undefined || zjhm === "") {
          notification.warning({message: '系统提示', description: '请输入证件号码!', duration: 4})
          return false
        }
        this.addLoading = true
        this.addBtnText = '正在初始化页面，请稍等'
        //通过所属组织、证件号码获取:申请客户名称、客户类型、法人代表、上年授信额度、上年执行利率
        let params = {
          'zzbz': zzbz,
          'djnf': djnf+'-01-01',
          'zjhm': zjhm,
        }
        getAction(this.url.addDjsq, params).then((res) => {
          if (res.success) {
            console.info('addDjsq:',res.result)
            var record = Object.assign(
              {}, res.result, {'djnf': djnf, 'zzbz': zzbz, 'zjhm': zjhm}
            )
            this.$refs.modalNyForm.title = "添加：贷款利率定价申请"
            this.$refs.modalNyForm.opration = 'add'
            this.$refs.modalNyForm.edit(record)
          } else {
            notification.warning({ message: '系统提示', description: res.message, duration: 4})
          }
        }).catch((error) => {
          notification.error({message: '系统提示', description: '添加失败!' + error, duration: 4})
        }).finally(() => {
          this.addLoading = false
          this.addBtnText = '添加'
        })
      },
      /**
       * 修改定价申请
       * @param record 当前选中数据
       */
      handleEdit(record) {
        console.log('待修改的定价申请信息',record)
        if (record.djnf === undefined || record.djnf === "") {
          notification.warning({message: '系统提示', description: '定价年份为空，请核实!', duration: 4})
          return false
        }
        if (record.zjhm === undefined || record.zjhm === "") {
          notification.warning({message: '系统提示', description: '证件号码为空，请核实!', duration: 4})
          return false
        }
        let data = {
          'zzbz': record.zzbz,
          'djnf': record.djnf,
          'zjhm': record.zjhm,
        }
        this.loading = true
        getAction(this.url.editDjsq, data).then((res) => {
          if (res.success) {
            var record = Object.assign({}, res.result)
            console.info('编辑-定价申请:',record)
            this.$refs.modalNyForm.title = "修改：贷款利率定价申请"
            this.$refs.modalNyForm.opration = 'edit'
            this.$refs.modalNyForm.edit(record)
          } else {
            notification.warning({ message: '系统提示', description: res.message,duration: 4})
          }
        }).catch((error) => {
          notification.error({ message: '系统提示', description: '修改失败!'+error,duration: 4})
        }).finally(() => {
          this.loading = false
        })
      },
      /**
       * 删除定价申请信息
       * @param record 当前选中数据
       */
      handleDelete(record) {
        if (!this.url.delete) {
          notification.error({message: '系统提示', description: '请设置url.delete属性!', duration: 4})
          return
        }
        console.log('待删除的定价申请信息\n',record)
        if (record.djnf === undefined || record.djnf === "") {
          notification.warning({message: '系统提示', description: '定价年份为空，请核实!', duration: 4})
          return false
        }
        if (record.zjhm === undefined || record.zjhm === "") {
          notification.warning({message: '系统提示', description: '证件号码为空，请核实!', duration: 4})
          return false
        }
        let data = {
          'djnf': record.djnf,
          'zjhm': record.zjhm
        }
        this.loading = true
        deleteAction(this.url.delete, data).then((res) => {
          if (res.success) {
            notification.success({message: '系统提示', description: res.message, duration: 4})
            this.loadData()
          } else {
            notification.warning({message: '系统提示', description: res.message, duration: 4})
          }
        }).finally(()=>{
          this.loading = false
          this.loadData()
        })
      },
      /**
       * 导出定价申请信息
       * @param fileName 导出文件名称
       */
      handleExportXls(fileName) {
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
        console.log('导出文件下载参数:', param)
        downFile(this.url.exportXlsUrl, param).then((data) => {
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          console.log('handleExportXls data:', data)
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