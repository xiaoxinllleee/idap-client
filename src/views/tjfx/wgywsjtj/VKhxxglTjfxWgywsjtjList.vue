<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

<!--          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据日期">
              <a-date-picker v-model="queryParam.tjrq" placeholder="请选择数据日期" style="width: 100%;"
                             :format="monthFormat" />
            </a-form-item>
          </a-col>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属支行">
              <j-tree-select placeholder="请选择所属支行"
                             v-model="queryParam.zzbz"
                             treeNodeFilterProp="title"
                             pid-field="sjzzbz"
                             dict="v_hr_bas_organization_cmms, zzjc, zzbz"
                             :showSearch="true"
                             :treeDefaultExpandAll="true" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="归属网格">
              <!--              <JTreeSelectNotJg placeholder="请选择归属网格"-->
              <!--                                v-model="queryParam.wgbh"-->
              <!--                                treeNodeFilterProp="title"-->
              <!--                                pidField="PARENT_ID"-->
              <!--                                dict="YXDYGL_MAIN,WGMC,ID"-->
              <!--                                pidValue="0"-->
              <!--                                :showSearch="true"-->
              <!--                                :treeDefaultExpandAll="true"/>-->

              <a-tree-select
                :treeData=sswgTreeDateoptions
                :replaceFields=replaceFields
                v-model="queryParam.wgbh"
                defaultExpandAll="false"
                allow-clear
                :dropdownStyle="{maxHeight:'400px',overflow:'auto'}"
                showSearch
                treeNodeFilterProp="title"
              />
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <!--              <a @click="handleToggleSearch" style="margin-left: 8px">-->
              <!--                {{ toggleSearchStatus ? '收起' : '展开' }}-->
              <!--                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>-->
              <!--              </a>-->
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('网格信息统计')" v-has="'VKhxxglTjfxWgywsjtj:exp'">导出</a-button>
      <a-button icon="download" :loading="exportLoading2" @click="handleExportXls2('客户附加信息管理')" v-has="'VKhxxglTjfxWgywsjtj:exp2'">导出附加信息
      </a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a
        style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :scroll="{ x: 3500, y: 500 }"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

        <span slot="detail" slot-scope="ckkhs,record">
          <a @click="handlepjsxjdmxEdit(record)">{{ ckkhs }}</a>
        </span>
        <span slot="detail2" slot-scope="dkkhs,record">
          <a @click="handlepjsxjdmxEdit2(record,'1')">{{ dkkhs }}</a>
        </span>
        <span slot="detail3" slot-scope="bldkkhs,record">
          <a @click="handlepjsxjdmxEdit2(record,'2')">{{ bldkkhs }}</a>
        </span>
        <span slot="detail4" slot-scope="bwbldkkhs,record">
          <a @click="handlepjsxjdmxEdit2(record,'3')">{{ bwbldkkhs }}</a>
        </span>

        <span slot="detail5" slot-scope="sjyhkhs,record">
          <a @click="handlepjsxjdmxEdit3(record,'sjyh')">{{ sjyhkhs }}</a>
        </span>
        <span slot="detail6" slot-scope="wsyhkhs,record">
          <a @click="handlepjsxjdmxEdit3(record,'wsyh')">{{ wsyhkhs }}</a>
        </span>
        <span slot="detail7" slot-scope="etckhs,record">
          <a @click="handlepjsxjdmxEdit3(record,'etc')">{{ etckhs }}</a>
        </span>
        <span slot="detail8" slot-scope="xykkhs,record">
          <a @click="handlepjsxjdmxEdit3(record,'xyk')">{{ xykkhs }}</a>
        </span>
<!--        <span slot="detail9" slot-scope="fxezkhs,record">
          <a @click="handlepjsxjdmxEdit3(record,'fxezf')">{{ fxezkhs }}</a>
        </span>-->

        <span slot="detail10" slot-scope="ssrs,record">
          <a @click="handlepjsxjdmxEdit4(record,'10')">{{ ssrs }}</a>
        </span>
        <span slot="detail11" slot-scope="dyrs,record">
          <a @click="handlepjsxjdmxEdit4(record,'11')">{{ dyrs }}</a>
        </span>
        <span slot="detail12" slot-scope="gzryrs,record">
          <a @click="handlepjsxjdmxEdit4(record,'12')">{{ gzryrs }}</a>
        </span>
        <span slot="detail13" slot-scope="tgjsrs,record">
          <a @click="handlepjsxjdmxEdit4(record,'13')">{{ tgjsrs }}</a>
        </span>
        <span slot="detail14" slot-scope="tpjch,record">
          <a @click="handlepjsxjdmxEdit3(record,'tpjjch')">{{ tpjch }}</a>
        </span>
        <span slot="detail15" slot-scope="wbdbh,record">
          <a @click="handlepjsxjdmxEdit4(record,'15')">{{ wbdbh }}</a>
        </span>
        <span slot="detail16" slot-scope="zdjbrs,record">
          <a @click="handlepjsxjdmxEdit4(record,'16')">{{ zdjbrs }}</a>
        </span>
        <span slot="detail17" slot-scope="zpry,record">
          <a @click="handlepjsxjdmxEdit4(record,'17')">{{ zpry }}</a>
        </span>
        <span slot="detail18" slot-scope="ffjzrs,record">
          <a @click="handlepjsxjdmxEdit4(record,'18')">{{ ffjzrs }}</a>
        </span>
        <span slot="detail19" slot-scope="xdry,record">
          <a @click="handlepjsxjdmxEdit4(record,'19')">{{ xdry }}</a>
        </span>
        <span slot="detail20" slot-scope="fxry,record">
          <a @click="handlepjsxjdmxEdit4(record,'20')">{{ fxry }}</a>
        </span>
        <span slot="detail21" slot-scope="sars,record">
          <a @click="handlepjsxjdmxEdit4(record,'21')">{{ sars }}</a>
        </span>

        <span slot="detail22" slot-scope="wbsbk,record">
          <a @click="handlepjsxjdmxEdit5(record)">{{ wbsbk }}</a>
        </span>

        <span slot="whsbk" slot-scope="sbkkhs,record">
                  <a @click="handlepjsxjdmxEdit6(record)">{{ sbkkhs }}</a>
                </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <Ckxx ref="ckxx"></Ckxx>
    <Dkxx ref="dkxx"></Dkxx>
    <Dzyh ref="dzyh"></Dzyh>
    <Fjxx ref="fjxx"></Fjxx>
    <sbkbh ref="sbkbh"></sbkbh>
    <sbkwb ref="sbkwb"></sbkwb>
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import JTreeSelectNotJg from '@/components/jeecg/JTreeSelectNotJg'
import Ckxx from '@views/tjfx/wgywsjtj/module/Ckxx'
import Dkxx from '@views/tjfx/wgywsjtj/module/Dkxx'
import Dzyh from '@views/tjfx/wgywsjtj/module/Dzyh'
import Fjxx from '@views/tjfx/wgywsjtj/module/Fjxx'
import Sbkbh from '@views/tjfx/wgywsjtj/module/Sbkbh'
import Sbkwb from '@views/tjfx/wgywsjtj/module/Sbkwb'
import { downFile, getAction } from '@api/manage'
import store from '@/store/'
import { filterObj } from '@/utils/util'

export default {
  name: 'VKhxxglTjfxWgywsjtjList',
  mixins: [JeecgListMixin],
  components: {
    JTreeSelect, JTreeSelectNotJg, Ckxx, Dkxx, Dzyh, Fjxx, Sbkbh, Sbkwb
  },
  data () {
    return {
      description: '网格业务数据统计管理页面',
      monthFormat: 'YYYY-MM-DD',
      queryType: '',
      exportLoading2: false,
      sswgTreeDateoptions: [],
      replaceFields:
        { children: 'children', title: 'wgmc', key: 'wgbh', value: 'wgbh' },
      // 表头
      columns: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          fixed: 'left',
          customRender: function (t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '数据日期',
          align: 'center',
          dataIndex: 'tjrq',
          fixed: 'left',
          width: 100
        },
        {
          title: '所属支行',
          align: 'center',
          dataIndex: 'zzbz_dictText',
          fixed: 'left',
          width: 100
        },
        {
          title: '网格名称',
          align: 'center',
          dataIndex: 'wgbh_dictText',
          fixed: 'left',
          width: 100
        },
        {
          title: '主客户经理',
          align: 'center',
          dataIndex: 'khjl_dictText',
          width: 100
        },
        {
          title: '总户数',
          align: 'center',
          dataIndex: 'zhs'
        },
        {
          title: '总人数',
          align: 'center',
          dataIndex: 'zkhs'
        },

        {
          title: '我行客户',
          align: 'center',
          children: [
            {
              title: '客户数',
              align: 'center',
              dataIndex: 'clkhs',
              width: '100'
            },
            {
              title: '占比(%)',
              align: 'center',
              dataIndex: 'clkhszb',
              width: '100',
              customRender (text) {
                return (text * 100).toFixed(2)
              }
            }
          ]
        },

        {
          title: '潜在客户',
          align: 'center',
          children: [
            {
              title: '客户数',
              align: 'center',
              dataIndex: 'qzkhs',
              width: '100'
            },
            {
              title: '占比(%)',
              align: 'center',
              dataIndex: 'qzkhszb',
              width: '100',
              customRender (text) {
                return (text * 100).toFixed(2)
              }
            }
          ]
        },

        {
          title: '存款',
          align: 'center',
          children: [
            {
              title: '余额(万元)',
              align: 'center',
              dataIndex: 'ckye',
              width: '100',
              customRender (text) {
                return (text / 10000).toFixed(2)
              }
            },
            {
              title: '客户数',
              align: 'center',
              dataIndex: 'ckkhs',
              width: '100',
              scopedSlots: { customRender: 'detail' }
            }
          ]
        },

        {
          title: '贷款',
          align: 'center',
          children: [
            {
              title: '余额(万元)',
              align: 'center',
              dataIndex: 'dkye',
              width: '100',
              customRender (text) {
                return (text / 10000).toFixed(2)
              }
            },
            {
              title: '客户数',
              align: 'center',
              dataIndex: 'dkkhs',
              width: '100',
              scopedSlots: { customRender: 'detail2' }
            }
          ]
        },
        {
          title: '表内不良贷款',
          align: 'center',
          children: [
            {
              title: '余额(万元)',
              align: 'center',
              dataIndex: 'bldkye',
              width: '100',
              customRender (text) {
                return (text / 10000).toFixed(2)
              }
            },
            {
              title: '客户数',
              align: 'center',
              dataIndex: 'bldkkhs',
              width: '100',
              scopedSlots: { customRender: 'detail3' }
            }
          ]
        },

        {
          title: '表外不良贷款',
          align: 'center',
          children: [
            {
              title: '余额(万元)',
              align: 'center',
              dataIndex: 'bwbldkye',
              width: '100',
              customRender (text) {
                return (text / 10000).toFixed(2)
              }
            },
            {
              title: '客户数',
              align: 'center',
              dataIndex: 'bwbldkkhs',
              width: '100',
              scopedSlots: { customRender: 'detail4' }
            }
          ]
        },

        {
          title: '电子银行业务',
          align: 'center',
          children: [
            {
              title: '手机银行',
              align: 'center',
              dataIndex: 'sjyhkhs',
              width: '100',
              scopedSlots: { customRender: 'detail5' }
            },
            {
              title: '网上银行',
              align: 'center',
              dataIndex: 'wsyhkhs',
              width: '100',
              scopedSlots: { customRender: 'detail6' }
            }
            ,
            {
              title: 'ETC',
              align: 'center',
              dataIndex: 'etckhs',
              width: '100',
              scopedSlots: { customRender: 'detail7' }
            }
            ,
            {
              title: '信用卡',
              align: 'center',
              dataIndex: 'xykkhs',
              width: '100',
              scopedSlots: { customRender: 'detail8' }
            }
            ,
            {
              title: '福祥E支付',
              align: 'center',
              dataIndex: 'ezfkhs',
              width: '100',
              //scopedSlots: { customRender: 'detail9' }
            }
          ]
        },
        {
          title: '我行诉讼',
          align: 'center',
          dataIndex: 'ssrs',
          scopedSlots: { customRender: 'detail10' }
        },
        {
          title: '我行社保卡',
          align: 'center',
          dataIndex: 'sbkkhs',
          scopedSlots: { customRender: 'whsbk' }

        },
        {
          title: '外部社保卡',
          align: 'center',
          dataIndex: 'wbsbk',
          scopedSlots: { customRender: 'detail22' }
        },
        {
          title: '共产党员',
          align: 'center',
          dataIndex: 'dyrs',
          scopedSlots: { customRender: 'detail11' }
        },
        {
          title: '公职人员',
          align: 'center',
          dataIndex: 'gzryrs',
          scopedSlots: { customRender: 'detail12' }

        },
        {
          title: '特岗教师',
          align: 'center',
          dataIndex: 'tgjsrs',
          scopedSlots: { customRender: 'detail13' }
        },
        {
          title: '脱贫及监测户',
          align: 'center',
          dataIndex: 'tpjch',
          scopedSlots: { customRender: 'detail14' }
        },
        {
          title: '五保、低保户',
          align: 'center',
          dataIndex: 'wbdbh',
          scopedSlots: { customRender: 'detail15' }
        },
        {
          title: '重大疾病',
          align: 'center',
          dataIndex: 'zdjbrs',
          scopedSlots: { customRender: 'detail16' }
        },
        {
          title: '诈骗人员',
          align: 'center',
          dataIndex: 'zpry',
          scopedSlots: { customRender: 'detail17' }
        },
        {
          title: '非法集资',
          align: 'center',
          dataIndex: 'ffjzrs',
          scopedSlots: { customRender: 'detail18' }
        },
        {
          title: '吸毒人员',
          align: 'center',
          dataIndex: 'xdry',
          scopedSlots: { customRender: 'detail19' }
        },
        {
          title: '服刑人员',
          align: 'center',
          dataIndex: 'fxry',
          scopedSlots: { customRender: 'detail20' }
        },
        {
          title: '涉案人员',
          align: 'center',
          dataIndex: 'sars',
          scopedSlots: { customRender: 'detail21' }

        }
        // {
        //   title: '操作',
        //   dataIndex: 'action',
        //   align:"center",
        //   scopedSlots: { customRender: 'action' },
        // }
      ],

      url: {
        list: '/tjfx/vKhxxglTjfxWgywsjtj/list',
        delete: '/tjfx/vKhxxglTjfxWgywsjtj/delete',
        deleteBatch: '/tjfx/vKhxxglTjfxWgywsjtj/deleteBatch',
        exportXlsUrl: 'tjfx/vKhxxglTjfxWgywsjtj/exportXls',
        exportXlsUrl2: 'khgl.khhmc/khfjxxgl/exportXls2',
        importExcelUrl: 'tjfx/vKhxxglTjfxWgywsjtj/importExcel'
      }
    }
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  created () {
    getAction('/yxdyglmain/yxdyglMain/getWgxxTreeDateBySskhjl').then(res => {
      if (res.success) {
        this.sswgTreeDateoptions = res.result
      }
    })
  },
  methods: {
    searchReset () {
      this.queryParam = { zzbz: undefined }
      if (!store.getters.isRoot) {
        this.queryParam.zzbz = store.getters.userInfo.orgCode
      }
      this.loadData(1)
    },
    getQueryParams () {
      //获取查询条件
      let sqp = {}
      if (this.queryParam.tjrq) {
        this.queryParam.tjrq = this.queryParam.tjrq.format("YYYY-MM-DD");
      }
      if (this.superQueryParams) {
        sqp['superQueryParams'] = encodeURI(this.superQueryParams)
      }
      var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
      param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      return filterObj(param)
    },
    handlepjsxjdmxEdit (record) {
      this.$refs.ckxx.view(record)
      this.$refs.ckxx.title = '存款信息'
      this.$refs.ckxx.disableSubmit = true
    },
    handlepjsxjdmxEdit2 (record, val) {
      this.$refs.dkxx.view(record, val)
      this.$refs.dkxx.title = '贷款信息'
      this.$refs.dkxx.disableSubmit = true
    },
    handlepjsxjdmxEdit3 (record, val) {
      this.$refs.dzyh.view(record, val)
      //this.$refs.dzyh.title = "电子银行信息";
      if (val == 'sjyh') {
        this.$refs.dzyh.title = '手机银行'
      }
      if (val == 'wsyh') {
        this.$refs.dzyh.title = '网上银行'
      }
      if (val == 'etc') {
        this.$refs.dzyh.title = 'ETC'
      }
      if (val == 'xyk') {
        this.$refs.dzyh.title = '信用卡'
      }
      if (val == 'fxezf') {
        this.$refs.dzyh.title = '福祥E支付'
      }
      if (val == 'tpjjch') {
        this.$refs.dzyh.title = '脱贫及检测户'
      }
      this.$refs.dzyh.disableSubmit = true
    },

    handlepjsxjdmxEdit4 (record, val) {
      this.$refs.fjxx.view(record, val)
      //this.$refs.dzyh.title = "电子银行信息";
      if (val == '10') {
        this.$refs.fjxx.title = '我行诉讼'
      }
      if (val == '11') {
        this.$refs.fjxx.title = '共产党员'
      }
      if (val == '12') {
        this.$refs.fjxx.title = '公职人员'
      }
      if (val == '13') {
        this.$refs.fjxx.title = '退岗教师'
      }
      // if (val == '14') {
      //   this.$refs.fjxx.title = '脱贫及监测户'
      // }
      if (val == '15') {
        this.$refs.fjxx.title = '五保、低保户'
      }
      if (val == '16') {
        this.$refs.fjxx.title = '重大疾病'
      }
      if (val == '17') {
        this.$refs.fjxx.title = '诈骗人员'
      }
      if (val == '18') {
        this.$refs.fjxx.title = '非法集资'
      }
      if (val == '19') {
        this.$refs.fjxx.title = '吸毒人员'
      }
      if (val == '20') {
        this.$refs.fjxx.title = '服刑人员'
      }
      if (val == '21') {
        this.$refs.fjxx.title = '涉案人员'
      }
      this.$refs.fjxx.disableSubmit = true
    },

    handlepjsxjdmxEdit5 (record) {
      this.$refs.sbkwb.view(record)
      this.$refs.sbkwb.disableSubmit = true
    },

    //我行社保卡
    handlepjsxjdmxEdit6 (record) {
      this.$refs.sbkbh.view(record)
      this.$refs.sbkbh.disableSubmit = true
    },

    handleExportXls2 (fileName) {
      if (!fileName || typeof fileName != 'string') {
        fileName = '导出文件'
      }
      let param = { ...this.queryParam }
      if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
        param['selections'] = this.selectedRowKeys.join(',')
        param['rowKey'] = this.rowKey
      }
      let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
      param.paramsStr = paramsStr
      console.log('导出参数', param)
      this.exportLoading2 = true
      downFile(this.url.exportXlsUrl2, param).then((data) => {
        if (!data) {
          this.$message.warning('文件下载失败')
          return
        }
        var blob = new Blob([data])
        if ('msSaveOrOpenBlob' in navigator) {
          window.navigator.msSaveOrOpenBlob(blob, fileName + '.xls')
          return
        }
        var eleLink = document.createElement('a')
        eleLink.download = fileName + '.xls'
        eleLink.style.display = 'none'
        eleLink.href = URL.createObjectURL(blob)
        document.body.appendChild(eleLink)
        eleLink.click()
        document.body.removeChild(eleLink)
        this.exportLoading2 = false
      })
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>