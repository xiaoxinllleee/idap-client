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
            <a-form-item label="客户类型">
              <j-dict-select-tag placeholder="请选择客户类型" v-model="queryParam.khlx" dictCode="lldj_khlx"/>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="贷款期限">
                <j-dict-select-tag placeholder="贷款期限" v-model="queryParam.dkqx" dictCode="dkqxly"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="是否便民卡">
                <j-dict-select-tag placeholder="请选择" v-model="queryParam.sfbmk" dictCode="sfbz"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="是否保证保险贷款">
                <j-dict-select-tag placeholder="请选择" v-model="queryParam.sfbzbxdk" dictCode="sfbz"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="是否享受`小微客户定价普惠措施`">
                <j-dict-select-tag placeholder="请选择" v-model="queryParam.sfjzxkh" dictCode="sfbz"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="是否高危行业">
                <j-dict-select-tag placeholder="请选择" v-model="queryParam.sfgwhy" dictCode="sfbz"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="农村三权抵（质）押贷款">
                <j-dict-select-tag placeholder="请选择" v-model="queryParam.ncsqdzydk" dictCode="sfbz"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="是否为花炮企业">
                <j-dict-select-tag placeholder="请选择" v-model="queryParam.sfhpqy" dictCode="sfbz"/>
              </a-form-item>
            </a-col>
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
      <a-button @click="handleAdd" type="primary" icon="plus" :loading="addLoading" v-has="'lldjsq:add'">{{this.addBtnText}}</a-button>
      <a-button icon="download" @click="handleExportXls('贷款利率定价申请信息')" v-has="'lldjsq:exportXls'">导出</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table ref="table"
               size="small"
               bordered
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :scroll="{ x: 2500, y: 400 }"
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
          <a-tag :key="dkqx" :color="dkqx==='1年期'?'#FB6241':dkqx==='5年期以上'?'#8A2BE2':'grey'">
            {{ dkqx }}
          </a-tag>
        </span>
        <span slot="sfbmk" slot-scope="sfbmk">
          <a-tag :key="sfbmk" :color="sfbmk==='是'?'#15D36A':sfbmk==='否'?'#DB5860':'grey'">
            {{ sfbmk }}
          </a-tag>
        </span>
        <span slot="sfbzbxdk" slot-scope="sfbzbxdk">
          <a-tag :key="sfbzbxdk" :color="sfbzbxdk==='是'?'#15D36A':sfbzbxdk==='否'?'#DB5860':'grey'">
            {{ sfbzbxdk }}
          </a-tag>
        </span>
        <span slot="sfjzxkh" slot-scope="sfjzxkh">
          <a-tag :key="sfjzxkh" :color="sfjzxkh==='是'?'#15D36A':sfjzxkh==='否'?'#DB5860':'grey'">
            {{ sfjzxkh }}
          </a-tag>
        </span>
        <span slot="sfgwhy" slot-scope="sfgwhy">
          <a-tag :key="sfgwhy" :color="sfgwhy==='是'?'#DB5860':sfgwhy==='否'?'#15D36A':'grey'">
            {{ sfgwhy }}
          </a-tag>
        </span>
        <span slot="ncsqdzydk" slot-scope="ncsqdzydk">
          <a-tag :key="ncsqdzydk" :color="ncsqdzydk==='是'?'#DB5860':ncsqdzydk==='否'?'#15D36A':'grey'">
            {{ ncsqdzydk }}
          </a-tag>
        </span>
        <span slot="sfhpqy" slot-scope="sfhpqy">
          <a-tag :key="sfhpqy" :color="sfhpqy==='是'?'#DB5860':sfhpqy==='否'?'#15D36A':'grey'">
            {{ sfhpqy }}
          </a-tag>
        </span>
        <span slot="lrbz" slot-scope="lrbz">
          <a-tag :key="lrbz" :color="lrbz==='导入'?'#24C780':lrbz==='录入'?'#108EE9':lrbz==='修改'?'#8A2BE2':lrbz==='调整'?'#002140':'grey'">
            {{ lrbz }}
          </a-tag>
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'lldjsq:edit'">修改</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'lldjsq:delete'">
            <a>删除</a>
          </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <lldjsq-modal ref="modalForm" @ok="modalFormOk"></lldjsq-modal>
  </a-card>
</template>

<script>
import LldjsqModal from './modules/LldjsqModal'
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
  name: "LldjsqList",
  mixins: [JeecgListMixin],
  components: {
    JEllipsis,
    JInput,
    LldjsqModal,
    JTreeSelect,
  },
  data() {
    return {
      description: '利率定价申请管理页面',
      addBtnText: '添加',
      // 表头
      years: '',
      djnf: '',
      addLoading: false,
      dataSource: [],
      isorter: {
        order: 'desc'
      },
      columns: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          customRender: function (t, r, index) {
            return parseInt(index) + 1;
          },
          align: "center",
        },
        {
          title: '所属组织',
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
          width: 100,
          scopedSlots: {customRender: 'dkqx'},
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
          width: 160,
          customRender:(text)=>{
            if (text != null) {
              return Number.parseFloat(text).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
            }
          },
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
          title: '上年贷款利率上浮幅度(%)',
          align: "center",
          dataIndex: 'sndkllsffd',
          width: 100,
          customRender:(text)=>{
            if (text != null) {
              return Number.parseFloat(text).toFixed(2) + '%'
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
          title: '是否保证保险贷款',
          align: "center",
          dataIndex: 'sfbzbxdk_dictText',
          width: 80,
          scopedSlots: {customRender: 'sfbzbxdk'},
        },
        {
          title: '是否享受`小微客户定价普惠措施`',
          align: "center",
          dataIndex: 'sfjzxkh_dictText',
          width: 120,
          scopedSlots: {customRender: 'sfjzxkh'},
        },
        {
          title: '是否高危行业',
          align: "center",
          dataIndex: 'sfgwhy_dictText',
          width: 80,
          scopedSlots: {customRender: 'sfgwhy'},
        },
        {
          title: '农村三权抵（质）押贷款',
          align: "center",
          dataIndex: 'ncsqdzydk_dictText',
          width: 80,
          scopedSlots: {customRender: 'ncsqdzydk'},
        },
        {
          title: '是否为花炮企业',
          align: "center",
          dataIndex: 'sfhpqy_dictText',
          width: 80,
          scopedSlots: {customRender: 'sfhpqy'},
        },
        {
          title: '录入标识',
          align: "center",
          dataIndex: 'lrbz_dictText',
          width: 80,
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
          width: 200
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: "center",
          scopedSlots: {customRender: 'action'},
          fixed: "right",
          width: 140,
        }
      ],
      url: {
        list: "/dklldj/lldjsq/list",
        delete: "/dklldj/lldjsq/delete",
        exportXlsUrl: "dklldj/lldjsq/exportXls",
        prepareDjData: "/dklldj/lldjsq/prepareDjData",
      },
    }
  },
  computed: {},
  created() {
    this.init()
  },
  methods: {

    init() {
      var date = new Date
      //console.info('date:',date)
      var year = date.getFullYear()
      //console.info('year:',year)
      this.djnf = year
      //console.info('djnf:',this.djnf)
      this.initSelectYear(year)
    },

    initSelectYear(year) {
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

    handleAdd: function () {
      var zzbz = this.queryParam.zzbz
      var djnf = this.djnf
      var zjhm = this.queryParam.zjhm
      console.info('新增时必输项校验', zzbz, djnf, zjhm)
      if (zzbz === undefined || zzbz === "") {
        this.$message.warning("请选择所属组织！")
        return false
      }
      if (djnf === undefined || djnf === "") {
        this.$message.warning("请选择定价年份！")
        return false
      }
      if (zjhm === undefined || zjhm === "") {
        this.$message.warning("请输入证件号码！")
        return false
      }
      let data = {
        zjhm: zjhm,
        zzbz: zzbz,
        djnf: djnf + '-01-01',
        flag: "add"
      }
      this.addLoading = true
      this.addBtnText = '正在初始化页面，请稍等'
      getAction(this.url.prepareDjData, data).then((res) => {
        if (res.success) {
          var param = Object.assign({}, res.result,{ djnf: djnf, flag: 'add' });
          this.$refs.modalForm.oprFlag = 'add'
          this.$refs.modalForm.title = "新增：贷款利率定价申请"
          this.$refs.modalForm.disableSubmit = false
          this.$refs.modalForm.edit(param)
        } else {
          notification.warning({ message: '系统提示', description: res.message,duration: 4})
        }
      }).catch((error) => {
        notification.error({ message: '系统提示', description: '添加失败!'+error,duration: 4})
      }).finally(() => {
        this.addLoading = false
        this.addBtnText = '添加'
      })
    },

    handleEdit: function (record) {
      let data = {
        'zjhm': record.zjhm,
        'zzbz': record.zzbz,
        'djnf': record.djnf,
        'flag': 'edit'
      }
      this.loading = true
      getAction(this.url.prepareDjData, data).then((res) => {
        if (res.success) {
          console.info('定价准备数据:',res.result)
          var param = Object.assign({}, res.result,{ djnf: record.djnf, flag: 'edit' })
          this.$refs.modalForm.oprFlag = 'edit'
          this.$refs.modalForm.title = "修改：贷款利率定价申请"
          this.$refs.modalForm.disableSubmit = false
          this.$refs.modalForm.edit(param)
        } else {
          this.$message.warning(res.message,5);
        }
      }).catch((error) => {
        console.info('贷款利率定价编辑失败！原因\n',error)
      }).finally(() => {
        this.loading = false
      })
    },

    handleDelete: function (record) {
      if (!this.url.delete) {
        this.$message.error("请设置url.delete属性!")
        return
      }
      console.log('待删除的定价申请信息\n',record)
      let data = {
        'id':   record.id,
        'djnf': record.djnf,
        'zjhm': record.zjhm
      }
      this.loading = true
      deleteAction(this.url.delete, data).then((res) => {
        if (res.success) {
          this.$message.success(res.message)
          this.loadData()
        } else {
          this.$message.warning(res.message,5)
        }
      }).finally(()=>{
        this.loading = false
        this.loadData()
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
