<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="任务年份">
              <a-select placeholder="请选择任务年份" v-model="rwnf" :allowClear="true" >
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属机构">
              <j-tree-select placeholder="请选择" v-model="queryParam.jgbm" dict="v_hr_bas_organization_cmms,zzjc,ywjgdm"
                             treeNodeFilterProp="title" pid-field="sjywjgdm" :showSearch="true" :treeDefaultExpandAll="true"></j-tree-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <!--<a-button @click="handleAdd" type="primary" icon="plus" v-has="'dkyejzrwfp:add'">新增</a-button>-->
      <a-button type="primary" icon="download" :loading="exportLoading" @click="handleExportXls('贷款余额净增任务分配表')">导出</a-button>
      <a-button type="primary" icon="import" @click="excelImport" v-has="'dkyejzrwfp:import'">导入</a-button>
      <span style="float: right; font-size: 10pt;font-weight: bold;">单元/万元</span>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>-->

      <a-table bordered
               ref="table"
               size="small"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :scroll="{x: 2400}"
               @change="handleTableChange">

        <span slot="jgmc" slot-scope="text">
          <j-ellipsis :value="text" :length="5"/>
        </span>
        <span slot="bz" slot-scope="text">
          <j-ellipsis :value="text" :length="8"/>
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'dkyejzrwfp:edit'">编辑</a>
          <a-divider type="vertical" v-has="'dkyejzrwfp:edit'"/>
          <a-dropdown v-has="'dkyejzrwfp:delete'">
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dkyejzrwfp-modal ref="modalForm" @ok="modalFormOk"></dkyejzrwfp-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import DkyejzrwfpModal from './modules/DkyejzrwfpModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {filterObj} from "@/utils/util";
  import moment from "moment";
  import JEllipsis from "@/components/jeecg/JEllipsis";
  import {deleteAction, downFile} from "@/api/manage";
  import {notification} from "ant-design-vue"
  import JTreeSelect from "@/components/jeecg/JTreeSelect";
  import ExcelImport from '@/components/common/ExcelImport'

  export default {
    name: "DkyejzrwfpList",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect,
      JEllipsis,
      DkyejzrwfpModal,
      ExcelImport
    },
    data () {
      return {
        description: '贷款余额净增任务分配管理页面',
        dateValue: '',
        years: '',
        rwnf: '',
        // 表头
        columns: [
          // {
          //   title: '#',
          //   dataIndex: '',
          //   key:'rowIndex',
          //   width:60,
          //   align:"center",
          //   customRender:function (t,r,index) {
          //     return parseInt(index)+1;
          //   }
          // },
          {
            title: '任务年份',
            align: "center",
            dataIndex: 'dataDate',
            customRender: function (text) {
              return !text ? "" : (text.length > 4 ? text.substr(0, 4) : text)
            },
          },
          {
            title: '序号',
            align: "center",
            dataIndex: 'xh'
          },
          {
            title: '机构编码',
            align: "center",
            dataIndex: 'jgbm'
          },
          {
            title: '机构名称',
            align: "center",
            dataIndex: 'jgmc',
            scopedSlots: {customRender: 'jgmc'},
          },
          {
            title: '全年贷款净投放任务',
            align: "center",
            dataIndex: 'qndkjtfrw',
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '开门红贷款净投放（一季度）',
            align: "center",
            dataIndex: 'kmhdkjtfQone',
            width: 140,
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '二季度任务',
            align: "center",
            dataIndex: 'kmhdkjtfQtwo',
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '二季度时序任务',
            children: [
              {
                title: '4月份',
                align: "center",
                dataIndex: 'xsrwOneQtwo',
                customRender:(text)=>{
                  if (text != null) {
                    return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                  }
                },
              },
              {
                title: '5月份',
                align: "center",
                dataIndex: 'xsrwTwoQtwo',
                customRender:(text)=>{
                  if (text != null) {
                    return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                  }
                },
              },
              {
                title: '6月份',
                align: "center",
                dataIndex: 'xsrwThrQtwo',
                customRender:(text)=>{
                  if (text != null) {
                    return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                  }
                },
              },
            ]
          },
          {
            title: '三季度任务',
            align: "center",
            dataIndex: 'kmhdkjtfQthr',
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '三季度序时任务',
            children: [
              {
                title: '7月份',
                align: "center",
                dataIndex: 'xsrwOneQthr',
                customRender:(text)=>{
                  if (text != null) {
                    return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                  }
                },
              },
              {
                title: '8月份',
                align: "center",
                dataIndex: 'xsrwTwoQthr',
                customRender:(text)=>{
                  if (text != null) {
                    return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                  }
                },
              },
              {
                title: '9月份',
                align: "center",
                dataIndex: 'xsrwThrQthr',
                customRender:(text)=>{
                  if (text != null) {
                    return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                  }
                },
              },
            ]
          },
          {
            title: '四季度任务',
            align: "center",
            dataIndex: 'kmhdkjtfQfou',
            customRender:(text)=>{
              if (text != null) {
                return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
              }
            },
          },
          {
            title: '四季度序时任务',
            children: [
              {
                title: '10月份',
                align: "center",
                dataIndex: 'xsrwOneQfou',
                customRender:(text)=>{
                  if (text != null) {
                    return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                  }
                },
              },
              {
                title: '11月份',
                align: "center",
                dataIndex: 'xsrwTwoQfou',
                customRender:(text)=>{
                  if (text != null) {
                    return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                  }
                },
              },
              {
                title: '12月份',
                align: "center",
                dataIndex: 'xsrwThrQfou',
                customRender:(text)=>{
                  if (text != null) {
                    return Number.parseFloat(text).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                  }
                },
              },
            ]
          },
          {
            title: '备注',
            align: "center",
            dataIndex: 'bz',
            width: 160,
            scopedSlots: {customRender: 'bz'},
          },
          {
            title: '操作标识',
            align: "center",
            dataIndex: 'lrbz_dictText'
          },
          {
            title: '操作人',
            align: "center",
            dataIndex: 'lrr'
          },
          {
            title: '操作时间',
            align: "center",
            dataIndex: 'lrsj',
            width: 160,
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            fixed: 'right',
            width: 120,
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/tjbb/tjfz/sgtzdr/dkyejzrwfp/list",
          delete: "/tjbb/tjfz/sgtzdr/dkyejzrwfp/delete",
          // deleteBatch: "/tjbb/tjfz/sgtzdr/dkyejzrwfp/deleteBatch",
          exportXlsUrl: "tjbb/tjfz/sgtzdr/dkyejzrwfp/exportXls",
          importExcelUrl: "tjbb/tjfz/sgtzdr/dkyejzrwfp/importExcel",
          exportTemplateUrl: "tjbb/tjfz/sgtzdr/dkyejzrwfp/exportTemplateXls",
        },
        exportTemplateName: '贷款余额净增任务分配导入模板',
      }
    },
    created() {
      this.getCurrentYear()
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      moment,
      getCurrentYear() {
        let date = new Date
        let year = date.getFullYear()
        // this.rwnf = year
        this.initYear(year)
      },
      /**
       * 初始化年份下拉框
       * @param year
       */
      initYear(year) {
        this.years = []
        for(let i=0; i<30; i++) {
          this.years.push({ value:((year-i)+''),label:((year-i)+'') });
        }
      },
      /**
       * 年份下拉选择
       * @param value
       * @param date
       */
      selectValue(value,date) {
        console.log('年份下拉选择:',value,date)
        this.$emit('change', value)
      },
      searchReset() {
        this.queryParam = {
          dataDate: undefined
        }
        this.getCurrentYear()
        this.loadData(1)
      },
      getQueryParams() {
        var param = Object.assign({}, this.queryParam)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize=this.ipagination.pageSize
        var rwnf = ''
        if (this.rwnf) {
          rwnf = this.rwnf+'-01-01'
        }
        param.dataDate = rwnf
        return filterObj(param)
      },
      handleAdd: function () {
        this.$refs.modalForm.opType = 'add'
        this.$refs.modalForm.add()
        this.$refs.modalForm.title = '新增'
        this.$refs.modalForm.disableSubmit = false
      },
      handleEdit: function (record) {
        this.$refs.modalForm.opType = 'edit'
        this.$refs.modalForm.edit(record)
        this.$refs.modalForm.title = '编辑'
        this.$refs.modalForm.disableSubmit = false
      },
      handleDelete: function (record) {
        if (!this.url.delete) {
          notification.error({ message: '系统提示', description: '请设置url.delete属性!',duration: 4})
          return
        }
        var that = this
        deleteAction(that.url.delete, { 'dataDate': record.dataDate,'jgbm': record.jgbm }).then((res) => {
          if (res.success) {
            that.$message.success(res.message)
            that.loadData()
          } else {
            that.$message.warning(res.message)
          }
        })
      },
      importComplete (filePath) {
        let fileName = '导入结果'
        let param = {}
        console.log('filePath:', filePath)
        downFile('/sys/common/download/' + filePath, param).then((data) => {
          if (!data) {
            notification.error({message: '系统提示', descriptions: '文件下载失败！', duration: 4})
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
        })
        this.loadData(1)
      },
      excelImport(){
        if (this.rwnf == undefined || this.rwnf == '') {
          this.$message.error("请选择年份!")
          return
        } else {
          let params = {}
          params.exportTemplateUrl = this.url.exportTemplateUrl
          params.importExcelUrl = `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}?fiscalDate=${this.rwnf+"-01-01"}`
          params.exportTemplateName = this.exportTemplateName
          var param = Object.assign({}, this.queryParam, params);
          this.$refs.excelImportModal.showModal(param);
        }
      },
      yearChange(){
        this.rwnf = this.queryParam.dataDate.format("YYYY-MM-DD");
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>
