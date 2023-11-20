<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker v-model="queryParam.tjyf" placeholder="请选择统计月份"
                              :defaultValue="defaultMonthOpera" :format="monthFormat" style="width: 100%;"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构代码" v-model="queryParam.jgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             pid-field="sjywjgdm" treeNodeFilterProp="title"
                             :showSearch="true" :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款账号">
              <a-input placeholder="请输入贷款账号" v-model="queryParam.dkzh"></a-input>
            </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="责任人工号">
                <a-input placeholder="请输入责任人工号" v-model="queryParam.jobnumberzr"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="责任客户经理标识">
                <a-input placeholder="请输入责任客户经理标识" v-model="queryParam.custidzr"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="工号">
                <a-input placeholder="请输入工号" v-model="queryParam.jobnumber"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="客户经理标识">
                <a-input placeholder="请输入客户经理标识" v-model="queryParam.custid"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="是否异议不接收">
                <a-select placeholder="全部" v-model="queryParam.sfyybjs">
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
              <a-form-item label="追责标记">
                <a-select placeholder="全部" v-model="queryParam.zzbz">
                  <a-select-option value="0">
                    未追责
                  </a-select-option>
                  <a-select-option value="1">
                    暂不追责
                  </a-select-option>
                  <a-select-option value="2">
                    认定免责
                  </a-select-option>
                  <a-select-option value="3">
                    认定有责已赔偿
                  </a-select-option>
                  <a-select-option value="4">
                    责成起诉
                  </a-select-option>
                  <a-select-option value="5">
                    责成执行
                  </a-select-option>
                  <a-select-option value="6">
                    责任待定
                  </a-select-option>
                  <a-select-option value="7">
                    暂不扣收
                  </a-select-option>
                  <a-select-option value="8">
                    赔偿款已退回
                  </a-select-option>
                </a-select>
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
      <a-button @click="handleAdd" type="primary" icon="plus" v-has="'dksjzrgl:add'">新增</a-button>
      <a-button :loading="exportLoading" icon="download" @click="handleExportXls('贷款数据责任管理')"
                v-has="'dksjzrgl:exportXls'">导出
      </a-button>
      <!-- <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
         <a-button type="primary" icon="import">导入</a-button>
       </a-upload>-->
      <a-button icon="import" @click="excelImport" v-has="'dksjzrgl:import'">导入</a-button>
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
        :scroll="{x:2500}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'dksjzrgl:edit'">编辑</a>

          <a-divider type="vertical"/>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'dksjzrgl:delete'">
                  <a>删除</a>
                </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <dksjzrgl-modal ref="modalForm" @ok="modalFormOk"></dksjzrgl-modal>
    <excel-import ref="excelImportModal" @ok="importComplete"/>
  </a-card>
</template>

<script>
  import DksjzrglModal from './modules/DksjzrglModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import ExcelImport from '@/components/common/ExcelImport'
  import moment from 'moment'
  import {filterObj} from '@/utils/util'
  import {deleteAction, getAction, downFile} from '@/api/manage'
  import store from '@/store/'

  export default {
    name: "DksjzrglList",
    mixins: [JeecgListMixin],
    components: {
      DksjzrglModal, JTreeSelect, ExcelImport
    },
    data() {
      return {
        description: '贷款数据责任管理管理页面',
        // 表头
        defaultMonthOpera: '',
        monthFormat: 'YYYY-MM',
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
            title: '机构代码',
            align: "center",
            dataIndex: 'jgdm'
          },
          {
            title: '机构名称',
            align: "center",
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '贷款账号',
            align: "center",
            dataIndex: 'dkzh'
          },
          {
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc'
          },
          {
            title: '工号',
            align: "center",
            dataIndex: 'jobnumber'
          },
          {
            title: '员工姓名',
            align: "center",
            dataIndex: 'jobnumber_dictText'
          },
          {
            title: '客户经理标识',
            align: "center",
            dataIndex: 'custid'
          },
          {
            title: '责任人工号',
            align: "center",
            dataIndex: 'jobnumberzr'
          },
          {
            title: '责任人姓名',
            align: "center",
            dataIndex: 'jobnumberzr_dictText'
          },
          {
            title: '责任客户经理标识',
            align: "center",
            dataIndex: 'custidzr'
          },
          {
            title: '是否异议不接收',
            align: "center",
            dataIndex: 'sfyybjs_dictText'
          },
          {
            title: '追责标记',
            align: "center",
            dataIndex: 'zzbz_dictText'
          },
          {
            title: '追责日期',
            align: "center",
            dataIndex: 'zzrq'
          },
          {
            title: '录入标识',
            align: "center",
            dataIndex: 'lrbz_dictText'
          },
          {
            title: '录入人',
            align: "center",
            dataIndex: 'lrczy'
          },

          {
            title: '录入时间',
            align: "center",
            dataIndex: 'lrsj'
          },
          /*{
               title: '证件号码',
               align:"center",
               dataIndex: 'zjhm'
              },
          {
               title: 'dflag',
               align:"center",
               dataIndex: 'dflag'
              },
          {
               title: '账号类型1贷款余额表2贴现信息表',
               align:"center",
               dataIndex: 'zhlx'
              },
          {
               title: '追责操作员',
               align:"center",
               dataIndex: 'zzczy'
              },
          {
               title: 'zbks',
               align:"center",
               dataIndex: 'zbks'
              },
          {
               title: '关联责任比率',
               align:"center",
               dataIndex: 'glzrbl'
              },*/
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            fixed:"right",
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/dksjzrgl/dksjzrgl/list",
          getByDkzh: "/dksjzrgl/dksjzrgl/getByDkzh",
          delete: "/dksjzrgl/dksjzrgl/delete",
          deleteBatch: "/dksjzrgl/dksjzrgl/deleteBatch",
          exportXlsUrl: "dksjzrgl/dksjzrgl/exportXls",
          importExcelUrl: "dksjzrgl/dksjzrgl/importExcel",
          exportTemplateUrl: "/dksjzrgl/dksjzrgl/exportTemplateXls",
        },
        exportTemplateName: '贷款数据责任管理导入模板'
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

      handleDelete: function (record) {
        console.log(record)
        if (!this.url.delete) {
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        deleteAction(that.url.delete, {dkzh: record.dkzh}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },
      searchQuery() {
        this.loadData(1);
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

      searchReset() {
        this.queryParam = {tjyf: undefined, jgdm: ''};
        this.queryParam.tjyf = this.defaultMonthOpera;
        if (!store.getters.isRoot) {
          this.queryParam.jgdm = store.getters.ywjgdm
        }
        this.loadData(1);
      },
      getCurrentMonth() {
        let curDate = new Date();
        let curMonth = {year: curDate.getFullYear(), month: curDate.getMonth() + 1,}
        this.defaultMonthOpera = moment(curDate, this.monthFormat);
        this.queryParam = {tjyf: undefined};
        this.queryParam.tjyf = this.defaultMonthOpera;
      },
      handleAdd: function () {
        if (!this.queryParam.dkzh) {
          this.$message.error("请输入贷款账号!")
          return
        }

        var params = this.getQueryParams();//查询条件
        console.log(params.tjyf);
        if (params.tjyf == null) {
          params.tjyf = moment(new Date()).format('YYYY-MM') + '-01';
        } else {
          params.tjyf = this.queryParam.tjyf.format("YYYY-MM") + '-01';
        }
        this.loading = true
        getAction(this.url.getByDkzh, params).then((res) => {
          if (!res.success) {
            if (res.message == '数据已存在') {
              this.$message.error("该贷款责任数据已存在，请勿重复添加!")
              this.loading = false
            } else {
              this.$message.error("该贷款贷款账号不存在，请输入正确的贷款账号!")
              this.loading = false
            }
            return
          } else {
            this.$refs.modalForm.add(res.result);
            this.$refs.modalForm.title = "新增";
            this.$refs.modalForm.disableSubmit = false;
          }
          this.loading = false;
        })

      },
      loadData(arg) {
        // 获取当前月份
        if (!this.url.list) {
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        //查询条件
        var params = this.getQueryParams();
        if (params.tjyf !== undefined && params.tjyf !== null) {
          params.tjyf = moment(params.tjyf).format("YYYY-MM") + '-01';
        } else {
          params.tjyf = moment(new Date()).format("YYYY-MM") + '-01';
        }
        // console.info(params)
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
      // handleExportXls(fileName){
      //   if(!fileName || typeof fileName != "string"){
      //     fileName = "导出文件"
      //   }
      //   let tjyf = ''
      //   let param = Object.assign({}, this.queryParam)
      //   if (this.queryParam.tjyf !== undefined && this.queryParam.tjyf !== null) {
      //     tjyf = moment(param.tjyf).format("YYYY-MM") + '-01'
      //   }
      //   param.tjyf=tjyf;
      //   if(this.selectedRowKeys && this.selectedRowKeys.length>0){
      //     param['selections'] = this.selectedRowKeys.join(",")
      //   }
      //   let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()));
      //   param.paramsStr = paramsStr
      //   console.log("导出参数",param)
      //   this.exportLoading = true
      //   downFile(this.url.exportXlsUrl,param).then((data)=>{
      //     if (!data) {
      //       this.$message.warning("文件下载失败")
      //       return
      //     }
      //     var blob = new Blob([data]);
      //     if('msSaveOrOpenBlob' in navigator){
      //       window.navigator.msSaveOrOpenBlob(blob, fileName+'.xls');
      //       return;
      //     }
      //     var eleLink = document.createElement('a');
      //     eleLink.download = fileName+'.xls';
      //     eleLink.style.display = 'none'
      //     eleLink.href = URL.createObjectURL(blob);
      //     document.body.appendChild(eleLink);
      //     eleLink.click();
      //     document.body.removeChild(eleLink);
      //   }).finally(()=>{
      //     this.exportLoading = false
      //     // this.loadData(1)
      //   })
      // },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>