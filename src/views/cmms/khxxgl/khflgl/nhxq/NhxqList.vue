<template>
  <a-card :bordered="false">
    <a-spin :spinning='exportFxedLoading'>
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
          <a-form-item label="归属网格">
            <!--<JTreeSelectNotJg placeholder="请选择归属网格"-->
                              <!--v-model="queryParam.wgbh"-->
                              <!--treeNodeFilterProp="title"-->
                              <!--pidField="PARENT_ID"-->
                              <!--dict="YXDYGL_MAIN,WGMC,ID"-->
                              <!--pidValue="0"-->
                              <!--:showSearch="true"-->
                              <!--:treeDefaultExpandAll="true"/>-->
            <WgxxTreeSelect
              :options=sswgTreeDateoptions
              :replaceFields=replaceFields
              v-model="queryParam.wgbh"
              :loading="wgxxTreeLoading"
              :dropdownStyle="{maxHeight:'400px',overflow:'auto'}"
              showSearch
              treeNodeFilterProp="title"
            >
            </WgxxTreeSelect>
          </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="归属机构">
              <j-tree-select placeholder="请选择所属机构"
                             v-model="queryParam.jgdm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :getAllZzjg="qybm=='400' ||qybm=='375'? '1' : '2'"
                             :isAll="qybm=='400'||qybm=='375'"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="户号编码">
              <a-input placeholder="请输入户号编码" v-model="queryParam.hhbm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="姓名">
              <a-input placeholder="请输入姓名" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户类型">
              <j-dict-select-tag v-model="queryParam.xtpdjg" placeholder="请选择客户类型" dictCode="xtpdjg" allowClear/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="是否采集">
              <j-dict-select-tag v-model="queryParam.sfcj" placeholder="请选择是否采集" dictCode="sfbz"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="是否上传附件">
              <j-dict-select-tag v-model="queryParam.sfscfj" placeholder="请选择是否上传附件" dictCode="sfbz"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="是否有效走访">
              <j-dict-select-tag v-model="queryParam.sfyxzf" placeholder="请选择是否有效走访" dictCode="sfbz"/>
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
      <a-button type="primary" @click="handleAdd" v-has="'nhxq:add'" icon="plus">新增</a-button>
      <a-button icon="download" v-has="'nhxq:export'" @click="handleExportXls('农户信息')" :loading="exportLoading">导出</a-button>
      <a-button type="import" icon="import" v-has="'nhxq:import'" @click="excelImport">导入</a-button>
      <a-button type="import" icon="import" v-has="'nhxq:importZcsx'" @click="excelImport2">导入整村授信</a-button>
      <a-button icon="area-chart" v-has="'nhxq:init'" @click="initData" :loading="loadingInit">同步数据及户主信息</a-button>
      <a-button icon="download" v-has="'nhxq:exportPyb'" @click="exportXlsByUrl('评议信息表')" :loading="exportPyxxLoading">导出评议表</a-button>
      <a-button icon="import" v-has="'nhxq:importPyb'" @click="importXlsByUrl('评议信息表')">导入评议表</a-button>
      <a-button type="import" icon="import" @click="excelImport3" v-if="qybm == '020'">导入户籍数据</a-button>
      <a-button icon="download" v-has="'nhxq:exportZfxx'" @click="exportXlsByUrl('走访信息表')" :loading="exportPyxxLoading">导出走访信息表</a-button>
      <a-button type="import" icon="import" v-has="'nhxq:importZfxx'" @click="excelImportZfxx">导入走访信息表</a-button>
      <a-button type="download" icon="download" v-has="'nhxq:exporyCjxx'" @click="handleExportCjxxXls('农户采集信息')" :loading="exportCjxxLoading">导出采集信息</a-button>
      <a-button type="download" icon="download" v-has="'nhxq:exportXydjpdb'" @click="exportExportXydjpdbXls('农户信用等级评定表')" :loading="exportXydjpdbLoading">导出信用等级评定表</a-button>
      <a-button type="import" icon="import" @click="importExportZcsxXls('整村授信表')" v-if="qybm=='390'">导入整村授信数据</a-button>
      <a-button icon="download" @click="exportHmdXls('农户黑名单数据表')" v-if="qybm=='390'">导出黑名单数据</a-button>

      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
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
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :scroll="{ x: 2000 }"
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
              <a-menu-item v-if="qybm=='390'">
                <a @click="exportExportFxedXls('福祥e贷业务申请审批表',record)">导出福祥e贷</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
        <span slot="detail" slot-scope="khmc,record">
          <a @click="handlepjsxjdmxEdit(record)">{{khmc}}</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <nhxq-modal ref="modalForm" @ok="modalFormOk"></nhxq-modal>

    <excel-import ref="excelImportModal" @ok="importComplete"/>
    <nhjbxxx-xq-modal ref="NhjbxxxXqModal" />
    </a-spin>
  </a-card>
</template>


<script>
  import NhxqModal from './modules/NhxqModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import ExcelImport from '@/components/common/ExcelImport'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JTreeSelectNotJg from '@/components/jeecg/JTreeSelectNotJg'
  import WgxxTreeSelect from '@/components/jeecg/WgxxTreeSelect'
  import { downFile, putAction, getAction } from '@/api/manage'
  import NhjbxxxXqModal from '@views/cmms/khxxgl/khflgl/nhxq/modules/NhjbxxxXqModal'
  import store from '@/store/'
  export default {
    name: "NhxqList",
    mixins:[JeecgListMixin],
    components: {
      NhxqModal,ExcelImport,JTreeSelect,JTreeSelectNotJg,WgxxTreeSelect,NhjbxxxXqModal
    },
    data() {
      return {
        exportPyxxLoading: false,
        exportZfxxLoading: false,
        exportCjxxLoading: false,
        exportXydjpdbLoading: false,
        exportFxedLoading: false,
        wgxxTreeLoading: false,
        loadingInit: false,
        description: '农户信息管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '归属网格',
            align: "center",
            dataIndex: 'wgbh_dictText',
          },
          {
            title: '归属机构',
            align: "center",
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '客户类型',
            align: "center",
            dataIndex: 'xtpdjg_dictText',
          },
          {
            title: '户号编码',
            align: "center",
            dataIndex: 'hhbm'
          },
          {
            title: '姓名',
            align: "center",
            dataIndex: 'khmc',
            scopedSlots: {customRender: 'detail'}
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm'
          },
          {
            title: '民族',
            align: "center",
            dataIndex: 'mz_dictText'
          },
          {
            title: '婚姻状况',
            align: "center",
            dataIndex: 'hyzk_dictText'
          },
          {
            title: '户口性质',
            align: "center",
            dataIndex: 'hkxz_dictText'
          },
          {
            title: '与户主关系',
            align: "center",
            dataIndex: 'yhzgx_dictText'
          },
          {
            title: '文化程度',
            align: "center",
            dataIndex: 'whcd_dictText'
          },
          {
            title: '职业',
            align: "center",
            dataIndex: 'cshygz_dictText', width: 200,
          },
          {
            title: '联系方式',
            align: "center",
            dataIndex: 'sjhm'
          },
          {
            title: '户籍地址',
            align: "center",
            dataIndex: 'hjdz'
          },
          {
            title: '常住地址',
            align: "center",
            dataIndex: 'zz'
          },
          {
            title: '备注',
            align: "center",
            dataIndex: 'bz'
          },
          {
            title: '原所属乡镇',
            align: "center",
            dataIndex: 'yssxz'
          },
          {
            title: '原行政村',
            align: "center",
            dataIndex: 'yxzc'
          },
          /*{
               title: '住址1',
               align:"center",
               dataIndex: 'zz1'
              },
          {
               title: '住址2',
               align:"center",
               dataIndex: 'zz2'
              },
          {
               title: '是否不良贷款客户',
               align:"center",
               dataIndex: 'sfbldkh'
              },
          {
               title: '是否贫困户',
               align:"center",
               dataIndex: 'sfpkh'
              },
          {
               title: '是否低保户',
               align:"center",
               dataIndex: 'sfdbh'
              },
          {
               title: '系统评定结果：1-灰名单，2-白名单，3-黑名单',
               align:"center",
               dataIndex: 'xtpdjg'
              },
          {
               title: '系统评定说明',
               align:"center",
               dataIndex: 'xtpdsm'
              },
          {
               title: '关键人评定结果',
               align:"center",
               dataIndex: 'gjrpdjg'
              },
          {
               title: '关键人评定说明',
               align:"center",
               dataIndex: 'gjrpdsm'
              },
          {
               title: '最终评定结果',
               align:"center",
               dataIndex: 'zzpdjg'
              },
          {
               title: '最终评定说明',
               align:"center",
               dataIndex: 'zzpdsm'
              },
          {
               title: '是否外出务工',
               align:"center",
               dataIndex: 'sfycdg'
              },
          {
               title: '客户重要程度',
               align:"center",
               dataIndex: 'kfyyqk'
              },
          {
               title: '客户潜在业务',
               align:"center",
               dataIndex: 'kcqzyw'
              },
          {
               title: '客户授信情况',
               align:"center",
               dataIndex: 'khsxqk'
              },
          {
               title: '经度',
               align:"center",
               dataIndex: 'longitude'
              },
          {
               title: '纬度',
               align:"center",
               dataIndex: 'latitude'
              },
          {
               title: '电子签名1',
               align:"center",
               dataIndex: 'sign1'
              },
          {
               title: '电子签名2',
               align:"center",
               dataIndex: 'sign2'
              },
          {
               title: '备用号码',
               align:"center",
               dataIndex: 'byhm'
              },
          {
               title: '陪访人',
               align:"center",
               dataIndex: 'pfr'
              },
          {
               title: '客户类型1',
               align:"center",
               dataIndex: 'khlx1'
              },
          {
               title: '客户类型2',
               align:"center",
               dataIndex: 'khlx2'
              },
          {
               title: '有无子女',
               align:"center",
               dataIndex: 'ywzn'
              },
          {
               title: '健康状况',
               align:"center",
               dataIndex: 'jkzk'
              },
          {
               title: '劳动能力',
               align:"center",
               dataIndex: 'ldnl'
              },
          {
               title: '居住年限',
               align:"center",
               dataIndex: 'jznx'
              },
          {
               title: '最高学历',
               align:"center",
               dataIndex: 'zgxl'
              },
          {
               title: '最高学位',
               align:"center",
               dataIndex: 'zgxw'
              },
          {
               title: '道德品质综合评价',
               align:"center",
               dataIndex: 'ddpzzhpj'
              },
          {
               title: '居住状态',
               align:"center",
               dataIndex: 'jzzt'
              },
          {
               title: '证件签发日期',
               align:"center",
               dataIndex: 'zjqfrq'
              },
          {
               title: '证件到期日期',
               align:"center",
               dataIndex: 'zjdqrq'
              },
          {
               title: '返乡时间',
               align:"center",
               dataIndex: 'fxsj'
              },
          {
               title: '是否授信（1：是 2：否）',
               align:"center",
               dataIndex: 'sfsx'
              },
          {
               title: '评议信息有效标识：0-无效，1-有效',
               align:"center",
               dataIndex: 'pyxxFlag'
              },
          {
               title: '客户基础信息有效标识：0-无效，1-有效',
               align:"center",
               dataIndex: 'khxxFlag'
              },
          {
               title: '客户管理有效标识：0-无效，1-有效',
               align:"center",
               dataIndex: 'khglFlag'
              },
          {
               title: '客户签名标识：0-无效，1-有效',
               align:"center",
               dataIndex: 'signFlag'
              },
          {
               title: '所属客户经理',
               align:"center",
               dataIndex: 'sskhjl'
              },
          {
               title: '工作单位',
               align:"center",
               dataIndex: 'gzdw'
              },
          {
               title: '工作单位地址',
               align:"center",
               dataIndex: 'gzdwdz'
              },
          {
               title: '腾讯QQ号码',
               align:"center",
               dataIndex: 'qq'
              },
          {
               title: '务工城市',
               align:"center",
               dataIndex: 'wgcs'
              },
          {
               title: '是否吸毒人员',
               align:"center",
               dataIndex: 'sfxdry'
              },
          {
               title: '电子签名3',
               align:"center",
               dataIndex: 'sign3'
              },
          {
               title: '是否授信对象',
               align:"center",
               dataIndex: 'sfsxdx'
              },
          {
               title: '采集点（定位地址）',
               align:"center",
               dataIndex: 'gddz'
              },
          {
               title: '住地邮编',
               align:"center",
               dataIndex: 'zdyb'
              },
          {
               title: '不予授信情况',
               align:"center",
               dataIndex: 'bysxqx'
              },
          {
               title: '采集状态(1:采集户 ，2:收集户， 3:不予授信,)',
               align:"center",
               dataIndex: 'cjzt'
              },
          {
               title: '收集户原因',
               align:"center",
               dataIndex: 'sjhyy'
              },
          {
               title: '上传状态',
               align:"center",
               dataIndex: 'cjwczt'
              },
          {
               title: '具体从事经营项目',
               align:"center",
               dataIndex: 'jtcsxm'
              },
          {
               title: '务工地区',
               align:"center",
               dataIndex: 'wgdq'
              },
          {
               title: '务工类型',
               align:"center",
               dataIndex: 'wglx'
              },
          {
               title: '客户类型3',
               align:"center",
               dataIndex: 'khlx3'
              },
          {
               title: '录入标识',
               align:"center",
               dataIndex: 'lrbz'
              },
          {
               title: '录入时间',
               align:"center",
               dataIndex: 'lrsj'
              },
          {
               title: '录入人',
               align:"center",
               dataIndex: 'lrr'
              },
          {
               title: 'upDt',
               align:"center",
               dataIndex: 'upDt'
              },
          {
               title: 'upTm',
               align:"center",
               dataIndex: 'upTm'
              },
          {
               title: 'zdyzbm',
               align:"center",
               dataIndex: 'zdyzbm'
              },
          {
               title: 'khblsh',
               align:"center",
               dataIndex: 'khblsh'
              },
          {
               title: 'ddpzzhpj1',
               align:"center",
               dataIndex: 'ddpzzhpj1'
              },
          {
               title: 'ddpzzhpj2',
               align:"center",
               dataIndex: 'ddpzzhpj2'
              },
          {
               title: 'qzywyysj',
               align:"center",
               dataIndex: 'qzywyysj'
              },*/
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
            width: 120, fixed: 'right',
          }
        ],
        url: {
          list: "/khflgl/nhxq/list",
          delete: "/khflgl/nhxq/delete",
          deleteBatch: "/khflgl/nhxq/deleteBatch",
          exportXlsUrl: "khflgl/nhxq/exportXls",
          exportCjxxXlsUrl: "khflgl/nhxq/exportCjxxXls",
          xydjpdbExportXlsUrl: "khflgl/nhxq/xydjpdbExportXlsUrl",
          exportPyxxXlsUrl: "khflgl/nhxq/exportPyxxXls",
          importExcelUrl: "khflgl/nhxq/importExcel",
          exportTemplateUrl: "/khflgl/nhxq/exportTemplateXls",
          extract: "/khflgl/nhxq/extract",
          exportHmdXls: "/khflgl/nhxq/exportHmdXls",
        },
      }
    },
    created() {
      this.wgxxTreeLoading  = true
      getAction('/yxdyglmain/yxdyglMain/getWgxxTreeDateBySskhjl', {wgxz: '6,8', wgxzType: '2', maxLevel: '3'}).then(res => {
        if (res.success) {
          this.sswgTreeDateoptions = res.result
        }
      }).finally(() => {
        this.wgxxTreeLoading  = false
      })
      this.searchReset();
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      searchReset() {
        this.queryParam = {jgdm: undefined};
        if (!store.getters.isRoot && this.qybm != '400') {
          this.queryParam.jgdm = store.getters.ywjgdm
        }
        this.loadData(1);
      },

      excelImport() {
        let params = {}
        params.exportTemplateUrl = this.url.exportTemplateUrl
        params.importExcelUrl = this.importExcelUrl
        params.exportTemplateName = "农户信息导入模板"
        this.$refs.excelImportModal.showModal(params);
      },
      excelImport2() {
        let params = {}
        params.exportTemplateUrl = null
        params.importExcelUrl = "/nh/nhbkbpy/importExcel"
        this.$refs.excelImportModal.showModal(params);
      },
      excelImportZfxx() {
        let params = {}
        params.exportTemplateUrl = null
        params.importExcelUrl = "/khflgl/nhxq/importExcelZfxx"
        this.$refs.excelImportModal.showModal(params);
      },
      excelImport3() {
        let params = {}
        params.exportTemplateUrl = null
        params.importExcelUrl = "/khflgl/nhxq/impHjsj"
        this.$refs.excelImportModal.showModal(params);
      },
      importExportZcsxXls(exportTemplateName){
        let params = {}
        params.exportTemplateUrl = "/nh/nhbkbpy/importZcsxTemplateXls"
        params.exportTemplateName = exportTemplateName
        params.importExcelUrl = "/nh/nhbkbpy/importZcsxXls"
        this.$refs.excelImportModal.showModal(params);
      },
      exportExportFxedXls(fileName,record){
        this.exportFxedLoading=true
        getAction("/khglNhhzxxgl/khglNhhzxxgl/getHzxxByHhbm",{hhbm:record.hhbm}).then(con=>{
          if (con.success && con.result && con.result.sxdxzjh){
            downFile("/khflgl/nhxq/exportExportFxedXls",record).then(data=>{
                if (!data) {
                  this.$message.warning('文件下载失败')
                  return
                }
                var blob = new Blob([data])
                if ('msSaveOrOpenBlob' in navigator) {
                  window.navigator.msSaveOrOpenBlob(blob, fileName + '.docx')
                  return
                }
                var eleLink = document.createElement('a')
                eleLink.download = fileName + '.docx'
                eleLink.style.display = 'none'
                eleLink.href = URL.createObjectURL(blob)
                document.body.appendChild(eleLink)
                eleLink.click()
                document.body.removeChild(eleLink)
                this.exportFxedLoading = false
            })
          }else{
            this.$message.error("该户无授信对象！")
            this.exportFxedLoading=false
          }
        })
      },

      initData() {
        this.loadingInit = true
        putAction(this.url.extract, {}).then((res) => {
          if (res.success) {
            this.$message.success("提取成功")
          } else {
            this.$message.warning("提取失败")
          }
        }).catch((error) => {
          this.$message.error("提取失败", error)
        }).finally(() => {
          this.loadingInit = false
        })
      },

      handlepjsxjdmxEdit(record) {
        this.$refs.NhjbxxxXqModal.edit(record);
        this.$refs.NhjbxxxXqModal.title = "详情";
        this.$refs.NhjbxxxXqModal.disableSubmit = true;
      },
      importXlsByUrl(){
        let params = {}
        params.importExcelUrl = "/khflgl/nhxq/importPysjXtXls"
        this.$refs.excelImportModal.showModal(params);
      },
      exportHmdXls(fileName){
        if (!fileName || typeof fileName != 'string') {
          fileName = '导出文件'
        }

        //let param = {...this.queryParam};
        let param = this.getQueryParams();
        if(this.selectedRowKeys && this.selectedRowKeys.length>0) {
          param['selections'] = this.selectedRowKeys.join(",")
          param['rowKey'] = this.rowKey
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
        param.paramsStr = paramsStr
        console.log('导出参数', param)
        this.exportLoading = true
        downFile(this.url.exportHmdXls, param).then((data) => {
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
          this.exportLoading = false
        })
      },
      exportXlsByUrl(fileName) {
        if (!fileName || typeof fileName != "string") {
          fileName = "导出文件"
        }
        if (this.queryParam.wgbh == '' || this.queryParam.wgbh == undefined) {
          this.$message.warning("请选择网格！")
          return
        }
        if(this.qybm=='425'){
          getAction('/yxdyglmain/yxdyglMain/queryById', { id: this.queryParam.wgbh }).then(res => {
            if(res.success){
              if (res.result.wgxz != '2'){
                this.$message.warning('导入的评议数据必须以村为单位！请选择村!!!！')
              }else {
                let param = {wgbh: this.queryParam.wgbh};
                console.log("导出参数", param)
                this.exportPyxxLoading = true
                downFile(this.url.exportPyxxXlsUrl, param).then((data) => {
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
                }).finally(() => {
                  this.exportPyxxLoading = false
                })
              }
            }
          })
        }else {
          let param = {wgbh: this.queryParam.wgbh};
          console.log("导出参数", param)
          this.exportPyxxLoading = true
          downFile(this.url.exportPyxxXlsUrl, param).then((data) => {
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
          }).finally(() => {
            this.exportPyxxLoading = false
          })
        }
      },
      handleExportCjxxXls(fileName) {
        if (!fileName || typeof fileName != 'string') {
          fileName = '导出文件'
        }
        let param = this.getQueryParams();
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(",")
          param['rowKey'] = this.rowKey
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
        param.paramsStr = paramsStr
        console.log('导出参数', param)
        this.exportCjxxLoading = true
        downFile(this.url.exportCjxxXlsUrl, param).then((data) => {
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
          this.exportCjxxLoading = false
        })
      },
      exportExportXydjpdbXls() {
        // console.log('exportXydjpdb', this.queryParam)
        if (!this.queryParam.jgdm || this.queryParam.jgdm === undefined) {
          this.$message.warning("请选择归属机构！")
          return false
        }
        if (!this.queryParam.wgbh || this.queryParam.wgbh === undefined) {
          this.$message.warning("请选择归属网格！")
          return false
        }
        let fileName = '农户信用等级评定表'
        this.exportXydjpdbLoading = true
        downFile(this.url.xydjpdbExportXlsUrl, this.queryParam).then((data)=>{
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
          this.exportXydjpdbLoading = false
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>