<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="所属机构">
              <j-tree-select placeholder="请选择所属机构"
                             v-model="queryParam.jgdm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :sszh="true"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="评定类型">
              <a-select placeholder="全部" v-model="queryParam.pdlx" :change="handlePdzq()">
                <a-select-option value="MM">月</a-select-option>
                <a-select-option value="Q">季</a-select-option>
                <a-select-option value="YY">半年</a-select-option>
                <a-select-option value="YYYY">年</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="评定月份" v-if="pdlxM">
              <a-month-picker placeholder="评定月份" v-model="queryParam.pdzq" @change="selectValue"
                              style="width: 100%;"/>
            </a-form-item>
            <a-form-item label="评定季度" v-if="pdlxQ">
              <a-select placeholder="评定年份" v-model="jdssnf" :defaultValue="dateValue" @change="selectValue"
                        style="width: 35%;">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
              <a-select placeholder="评定季度" v-model="pdjd" @change="selectValue" style="width: 65%;">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="01">第一季度</a-select-option>
                <a-select-option value="04">第二季度</a-select-option>
                <a-select-option value="07">第三季度</a-select-option>
                <a-select-option value="10">第四季度</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="评定半年" v-if="pdlxYY">
              <a-select placeholder="评定年份" v-model="bnssnf" :defaultValue="dateValue" @change="selectValue"
                        style="width: 35%;">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
              <a-select placeholder="评定周期" v-model="pdbn" @change="selectValue" style="width: 65%;">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="01">上半年</a-select-option>
                <a-select-option value="07">下半年</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="评定年份" v-if="pdlxY">
              <a-select placeholder="请选择评定年份" v-model="pdnf" :defaultValue="dateValue" @change="selectValue">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="商户编码">
              <a-input placeholder="请输入商户编码" v-model="queryParam.shbm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="商户名称">
              <a-input placeholder="请输入商户名称" v-model="queryParam.shmc"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="等级是否调增">
                <a-select placeholder="全部" v-model="queryParam.djsfytz">
                  <a-select-option value="1">
                    是
                  </a-select-option>
                  <a-select-option value="2">
                    否
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="上期评定等级">
                <!--              <j-dict-select-tag placeholder="请选择上期评定等级"-->
                <!--                             v-model="queryParam.jgdm"-->
                <!--                             treeNodeFilterProp="title"-->
                <!--                             dict="Erp_shpj_shpjcssz, csmc, csbh"-->
                <!--                             :sszh="true"-->
                <!--                             :treeDefaultExpandAll="true"/>-->
                <j-dict-select-tag placeholder="请选择上期评定等级" v-model="queryParam.sqpddj"
                                   dictCode="Erp_shpj_shpjcssz, csmc, csbh"/>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="本期评定等级">
                <j-dict-select-tag placeholder="请选择本期评定等级" v-model="queryParam.bqpddj"
                                   dictCode="Erp_shpj_shpjcssz, csmc, csbh"/>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'shdjpd:add'">新增</a-button>
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('商户等级评定')" v-has="'shdjpd:exportXls'">导出</a-button>
      <a-button icon="import" @click="excelImport" v-has="'shdjpd:import'">导入</a-button>
      <a-button @click="init" icon="area-chart" v-has="'shdjpd:init'">提取</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x: 3000}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'shdjpd:edit'">编辑</a>

          <a-divider type="vertical"/>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'shdjpd:delete'">
                  <a>删除</a>
                </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <shdjpd-modal ref="modalForm" @ok="modalFormOk"></shdjpd-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import ShdjpdModal from './modules/ShdjpdModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import {filterObj} from "@/utils/util";
  import moment from 'moment'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import ExcelImport from '@/components/common/ExcelImport'
  import {deleteAction, putAction, downFile} from "../../../../../api/manage";
  import store from '@/store/'

  export default {
    name: "ShdjpdList",
    mixins: [JeecgListMixin],
    components: {
      ShdjpdModal, JTreeSelect,ExcelImport
    },
    data() {
      return {
        description: '商户等级评定管理页面',
        queryParam: {pdlx: 'MM'},
        dateValue: '',
        pdlxYY: null,
        pdlxM: true,
        pdlxQ: null,
        pdlxY: null,
        pdnf: '',
        jdssnf: '',
        pdjd: '',
        pdbn: '',
        bnssnf: '',
        pdzqParam: '',
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
            title: '评定类型',
            align: "center",
            width: 80,
            dataIndex: 'pdlx_dictText'
          },
          {
            title: '评定周期',
            align: "center",
            width: 120,
            dataIndex: 'pdzq'
          },
          {
            title: '机构名称',
            align: "center",
            width: 120,
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '商户编码',
            align: "center",
            dataIndex: 'shbm'
          },
          {
            title: '商户名称',
            align: "center",
            dataIndex: 'shmc'
          },
          {
            title: '客户经理标识',
            align: "center",
            dataIndex: 'khjlbz'
          },
          {
            title: '上期评定日平',
            align: "center",
            dataIndex: 'sqpdrp'
          },
          {
            title: '上期评定等级',
            align: "center",
            dataIndex: 'sqpddj_dictText'
          },
          {
            title: '本期评定日平',
            align: "center",
            dataIndex: 'bqpdrp'
          },
          {
            title: '本期评定等级',
            align: "center",
            dataIndex: 'bqpddj_dictText'
          },
          {
            title: '评定日期',
            align: "center",
            dataIndex: 'pdrq'
          },
          {
            title: '等级是否有调增',
            align: "center",
            dataIndex: 'djsfytz_dictText'
          },
          {
            title: '录入标志',
            align: "center",
            dataIndex: 'lrbz_dictText'
          },
          {
            title: '录入人',
            align: "center",
            dataIndex: 'lrr'
          },
          {
            title: '录入日期',
            align: "center",
            dataIndex: 'lrrq'
          },
          {
            title: '修改人',
            align: "center",
            dataIndex: 'xgr'
          },
          {
            title: '修改时间',
            align: "center",
            dataIndex: 'xgrq'
          },
          {
            title: '联系电话',
            align: "center",
            dataIndex: 'lxdh'
          },
          /*{
               title: '关联账户',
               align:"center",
               dataIndex: 'glzh'
              },*/
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            fixed: 'right',
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/shdjpd/shdjpd/list",
          delete: "/shdjpd/shdjpd/delete",
          deleteBatch: "/shdjpd/shdjpd/deleteBatch",
          exportXlsUrl: "shdjpd/shdjpd/exportXls",
          importExcelUrl: "shdjpd/shdjpd/importExcel",
          init: "/shdjpd/shdjpd/init",
          exportTemplateUrl: "/shdjpd/shdjpd/exportTemplateXls",
        },
        exportTemplateName: '商户等级评定导入模板'
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created() {
      this.dqnf();
    },
    methods: {
      handleAdd: function () {
        this.$refs.modalForm.add();
        this.$refs.modalForm.title = "新增";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = false;
      },
      handleEdit(record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = true;
      },
      handleDelete: function (record) {
        console.log(record)
        if (!this.url.delete) {
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        deleteAction(that.url.delete, {
          shbm: record.shbm,
          pdzq: record.pdzq,
          jgdm: record.jgdm,
          pdlx: record.pdlx
        }).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },
      handlePdzq() {
        let pdlx = this.queryParam.pdlx
        if (pdlx === 'MM') {
          this.pdlxYY = false
          this.pdlxM = true
          this.pdlxQ = false
          this.pdlxY = false
        }
        if (pdlx === 'Q') {
          this.pdlxYY = false
          this.pdlxM = false
          this.pdlxQ = true
          this.pdlxY = false
        }
        if (pdlx === 'YY') {
          this.pdlxYY = true
          this.pdlxM = false
          this.pdlxQ = false
          this.pdlxY = false
        }
        if (pdlx === 'YYYY') {
          this.pdlxYY = false
          this.pdlxM = false
          this.pdlxQ = false
          this.pdlxY = true
        }
      },
      // 获取当前年份
      dqnf() {
        var myDate = new Date;
        var year = myDate.getFullYear();
        this.initSelectYear(year)
      },
      // 初始化年份选择下拉框
      initSelectYear(year) {
        this.years = [];
        for (let i = 0; i < 30; i++) {
          this.years.push({value: ((year - i) + ''), label: ((year - i) + '')});
        }
      },
      // 下拉选择Func
      selectValue(value) {
        //console.log('ShdjpdList => selectValue(value)')
        //console.log('selectValue::::' + value)
        //let val = value;
        this.$emit('change', value);
      },

      // 查询条件[pdrq]格式化Func
      getQueryParams() {
        let pdzqMoment = ""
        let pdlx = this.queryParam.pdlx
        if (pdlx !== null && pdlx !== undefined) {
          if (pdlx === 'MM') {
            if (this.queryParam.pdzq) {
              pdzqMoment = moment(this.queryParam.pdzq).format("YYYY-MM") + "-01"
            }
          }
          if (pdlx === 'Q') {
            let day = new Date(this.jdssnf, this.pdjd, 0)
            let dayCount = day.getDate()
            if (this.jdssnf && this.pdjd) {
              pdzqMoment = this.jdssnf + '-' + this.pdjd + '-01'
            }
          }
          if (pdlx === 'YY') {
            let day = new Date(this.bnssnf, this.bnssnf, 0)
            let dayCount = day.getDate()
            if (this.bnssnf && this.pdbn) {
              pdzqMoment = this.bnssnf + "-" + this.pdbn + '-01'
            }
          }
          if (pdlx === 'YYYY') {
            if (this.pdnf) {
              pdzqMoment = this.pdnf + '-01-01'
            }
          }
        }
        console.log('查询条件 pdlx, pdzq', pdlx, pdzqMoment)
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.pdzq = pdzqMoment;
        this.pdzqParam = pdzqMoment
        return filterObj(param);
      },

      init() {
        console.log('ShdjpdList => init()')
        let pdzqStr
        let pdlxStr
        var params = this.queryParam;
        console.log("评定类型：：：" + params.pdlx)
        console.log("评定周期：：：" + params.pdzq)
        if (params.pdlx === null || params.pdlx === undefined) {
          this.$message.warning("请选择评定类型！")
          return
        }
        if (params.pdlx === 'MM') {
          if (params.pdzq === '' || params.pdzq === undefined) {
            this.$message.warning("请选择评定月份！")
            return
          } else {
            pdzqStr = moment(params.pdzq).format("YYYY-MM") + '-01'
          }
        } else if (params.pdlx === 'Q') {
          if (this.jdssnf === '' || this.pdjd === '') {
            this.$message.warning("季度所属年份与评定季度不能为空！")
            return
          } else {
            let day = new Date(this.jdssnf, this.pdjd, 0)
            let dayCount = day.getDate()
            pdzqStr = this.jdssnf + '-' + this.pdjd + '-01'
          }
        } else if (params.pdlx === 'YYYY') {
          if (this.pdnf === '' || this.pdnf === undefined) {
            this.$message.warning("评定年份不能为空！")
            return
          } else {
            pdzqStr = this.pdnf + '-01-01'
          }
        } else {
          if (this.bnssnf == null || this.pdbn == null) {
            this.$message.warning("评定年份和评定半年不能为空！")
            return
          } else {
            let day = new Date(this.bnssnf, this.bnssnf, 0)
            let dayCount = day.getDate()
            pdzqStr = this.bnssnf + "-" + this.pdbn + '-' +  '01'
          }



        }
        pdlxStr = params.pdlx
        console.log("提取 => 评定类型@@@@@@@@::" + pdlxStr)
        console.log("提取 => 评定周期@@@@@@@@::" + pdzqStr)

        this.loading = true
        putAction(this.url.init, {"pdlx": pdlxStr, "pdzq": pdzqStr}, 'put').then((res) => {
          if (res.success) {
            this.$message.success("提取成功！");
            this.loadData(1);
          } else {
            this.$message.warning("提取失败！");
          }
        }).finally(() => {
          this.loading = false
        })
      },


      // 查询条件重置Func
      searchReset() {
        this.queryParam = {jgdm: undefined};
        if(!store.getters.isRoot) {
          this.queryParam.jgdm = store.getters.ywjgdm
        }
        // 重置时清除季度所属年份
        this.jdssnf = ''
        // 重置时清除评定年份
        this.pdjd = ''
        this.pdnf = ''
        this.bnssnf = ''

        this.loadData(1)
      },

      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        this.getQueryParams()
        let tjyf = ''
        if (this.pdzqParam !== undefined && this.pdzqParam !== null) {
          tjyf = moment(this.pdzqParam).format("YYYY-MM-DD")
        }
        let param = {...this.queryParam,khlx:this.khlx,tjwd:this.tjwd};
        param.pdzq=tjyf;
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
          param['rowKey']=this.rowKey
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()));
        param.paramsStr = paramsStr
        console.log("导出参数",param)
        this.exportLoading=true
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
          this.exportLoading=false
        })
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>