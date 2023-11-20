<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="入账网点">
              <!--<a-input placeholder="请输入入账网点" v-model="queryParam.rzwd"></a-input>-->
              <j-tree-select placeholder="请选择机构代码"
                             v-model="queryParam.rzwd"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="入账时间">
              <a-range-picker :format="dateFormat" v-model="rangePickerDateFC" @change="onChangeBeginday"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号">
              <a-input placeholder="请输入账号" v-model="queryParam.zh"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="借款人姓名">
                <a-input placeholder="请输入借款人姓名" v-model="queryParam.jkrxm"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="证件号码">
                <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
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
      <!--<a-button @click="handleAdd" icon="laptop" v-has="'bwdkshmx:add'">修改</a-button>
      <a-button @click="handleSuperEdit" icon="laptop" v-has="'bwdkshmx:superEdit'">超级修改</a-button>-->
      <a-button icon="download" @click="handleExportXls('表外贷款收回明细')" v-has="'bwdkshmx:exportXls'">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
                @change="handleImportExcel">
        <a-button icon="import" v-has="'bwdkshmx:import'">导入</a-button>
      </a-upload>
      <a-button @click="init" icon="area-chart" v-has="'bwdkshmx:init'">提取</a-button>
    </div>

    <!-- table区域-begin -->
    <div>

      <a-table bordered
               ref="table"
               size="middle"
               rowKey=""
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               :loading="loading"
               :scroll="{x:3000}"
               @change="handleTableChange">

        <span slot="zh" slot-scope="text, record">
        <j-ellipsis :value="text" :length="10"/>
        </span>
        <span slot="jkrxm" slot-scope="text, record">
        <j-ellipsis :value="text" :length="10"/>
        </span>
        <span slot="zjhm" slot-scope="text, record">
        <j-ellipsis :value="text" :length="15"/>
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'bwdkshmx:edit'">修改</a><!--调整-->
          <a-divider type="vertical"/>
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)" v-has="'bwdkshmx:delete'">
                  <a>删除</a>
            </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <bwdkshmx-modal ref="modalForm" @ok="modalFormOk"></bwdkshmx-modal>
    <add-modal ref="addModalForm" @ok="modalFormOk"/>
    <edit-modal ref="editModalForm" @ok="modalFormOk"/>
    <super-edit-modal ref="superEditModalForm" @ok="modalFormOk"/>
  </a-card>
</template>

<script>
  import BwdkshmxModal from './modules/BwdkshmxModal'
  import AddModal from "@/views/xyjlcx/bwdkgl/bwdkshmx/modules/AddModal";
  import EditModal from "@/views/xyjlcx/bwdkgl/bwdkshmx/modules/EditModal";
  import SuperEditModal from "@/views/xyjlcx/bwdkgl/bwdkshmx/modules/SuperEditModal";
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {deleteAction, getAction} from '@/api/manage'
  import {filterObj} from '@/utils/util'
  import moment from 'moment'
  import {postAction,downFile} from "../../../../api/manage"
  import {notification} from "ant-design-vue"
  import JEllipsis from "@/components/jeecg/JEllipsis";

  export default {
    name: "BwdkshmxList",
    mixins: [JeecgListMixin],
    components: {
      JEllipsis,
      JTreeSelect,
      BwdkshmxModal,
      AddModal,EditModal,SuperEditModal,
    },
    data() {
      return {
        description: '表外贷款收回明细管理页面',
        defaultMonthOpera:'',
        dateFormat: 'YYYY-MM-DD',
        exportTemplateName: '表外贷款收回明细导入模板',
        rangePickerDate: [],
        rangePickerDateFC: [],
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
            title: '入账网点',
            align: "center",
            dataIndex: 'rzwd_dictText'
          },
          {
            title: '入账时间',
            align: "center",
            dataIndex: 'rzsj'
          },
          {
            title: '清收员工工号',
            align: "center",
            dataIndex: 'qsyggh'
          },
          {
            title: '清收员工姓名',
            align: "center",
            dataIndex: 'qskhjl'
          },
          {
            title: '账号',
            align: "center",
            dataIndex: 'zh',
            scopedSlots: {customRender: 'zh'},
          },
          {
            title: '借款人姓名',
            align: "center",
            dataIndex: 'jkrxm',
            scopedSlots: {customRender: 'jkrxm'},
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            scopedSlots: {customRender: 'zjhm'},
          },
          {
            title: '借款日期',
            align: "center",
            dataIndex: 'jkrq'
          },
          {
            title: '到期日期',
            align: "center",
            dataIndex: 'dqrq'
          },
          {
            title: '收回本息金额',
            align: "center",
            dataIndex: 'shbxje'
          },
          {
            title: '收回报表本金',
            align: "center",
            dataIndex: 'shbbbj'
          },
          {
            title: '收回核销本金',
            align: "center",
            dataIndex: 'shhxbj'
          },
          {
            title: '收回核销利息',
            align: "center",
            dataIndex: 'shhxlx'
          },
          {
            title: '收回利息',
            align: "center",
            dataIndex: 'shlx'
          },
          {
            title: '备注',
            align: "center",
            dataIndex: 'bz'
          },
          {
            title: '录入人',
            align: "center",
            dataIndex: 'lrr'
          },
          {
            title: '录入标识',
            align: "center",
            dataIndex: 'lrbz_dictText'
          },
          {
            title: '录入时间',
            align: "center",
            dataIndex: 'lrsj'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            fixed: "right",
            width: 220,
            scopedSlots: {customRender: 'action'},
          }
        ],
        url: {
          list: "/bwdkshmx/bwdkshmx/list",
          add: "/bwdkshmx/bwdkshmx/add",
          superedit: "/bwdkshmx/bwdkshmx/superedit",
          init: "/bwdkshmx/bwdkshmx/init",
          delete: "/bwdkshmx/bwdkshmx/delete",
          deleteBatch: "/bwdkshmx/bwdkshmx/deleteBatch",
          exportXlsUrl: "bwdkshmx/bwdkshmx/exportXls",
          importExcelUrl: "bwdkshmx/bwdkshmx/importExcel"
        },
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    mounted() {
      this.rangeFC()
      //默认格式是YYYY/MM/DD不是后端要的，就自己转换YYYY-MM-DD
      this.rangePickerDate = [this.getCurrentDataFront().split('/').join('-'), this.getCurrentData().split('/').join('-')]
    },
    methods: {
      moment,

      //默认值
      rangeFC() {
        this.rangePickerDateFC = []
        this.rangePickerDateFC = [
          moment(this.getCurrentDataFront(), this.dateFormat),
          moment(this.getCurrentData(), this.dateFormat)
        ]
        //console.info('@',this.rangePickerDateFC)
        this.queryParam.rzsj_begin = moment(this.rangePickerDateFC[0]._i).format("YYYY-MM-DD")
        this.queryParam.rzsj_end   = moment(this.rangePickerDateFC[1]._i).format("YYYY-MM-DD")
        //console.info('入账日期起:',this.queryParam.rzsj_begin)
        //console.info('入账日期止:',this.queryParam.rzsj_end)
      },

      //入账日期-起
      getCurrentDataFront () {
        var date = new Date()
        date.setDate(1)
        var month = parseInt(date.getMonth() + 1)
        var day = date.getDate()
        if (month < 10) {
          month = '0' + month
        }
        if (day < 10) {
          day = '0' + day
        }
        const time = date.getFullYear() + '-' + month + '-' + day
        //console.info('本月月初日期：',time)
        return time
      },

      //入账日期-止
      getCurrentData () {
        let time = new Date().toLocaleDateString()
        return time
      },

      //入账日期改变监听事件
      onChangeBeginday: function(value, dateString) {
        var date = dateString
        this.queryParam.rzsj_begin = date[0]
        this.queryParam.rzsj_end = date[1]
      },

      searchReset() {
        this.queryParam = {}
        this.rangeFC()
        this.loadData(1)
      },

      loadData(arg) {
        //this.getCurrentMonth()
        if(!this.url.list){
          notification.error({message: '系统提示', description: '请设置url.list属性!', duration: 4})
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        //查询条件
        var params = this.getQueryParams();
        //console.info('入账日期-起:',params.rzsj_begin)
        //console.info('入账日期-止:',params.rzsj_end)
        console.info('查询条件',params)
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
            this.loading = false;
          }else{
            this.dataSource =[];
            this.ipagination.total=0;
            this.loading = false;
          }
          if(res.code===510){
            this.$message.warning(res.message,5)
            this.loading = false;
          }
          this.loading = false;
        })
      },

      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.rzsj;
        return filterObj(param);
      },

      init() {
        //查询条件
        var params = this.getQueryParams();
        console.info('入账日期-起:',params.rzsj_begin)
        console.info('入账日期-止:',params.rzsj_end)
        console.info('查询条件',params)
        if (params.rzsj_begin === undefined || params.rzsj_end === undefined) {
          notification.warning({message: '系统提示', description: '请选择入账日期！', duration: 4})
          return
        }
        let param = {
          'rzsjBegin': params.rzsj_begin,
          'rzsjEnd'  : params.rzsj_end
        }
        this.loading = true;
        postAction(this.url.init, param).then((res) => {
          if (res.success) {
            notification.success({message: '系统提示', description: '提取成功！', duration: 4})
            this.loadData(1);
          } else {
            notification.warning({message: '系统提示', description: '提取失败！', duration: 4})
          }
        }).catch((error) => {
          notification.error({message: '系统提示', description: '提取失败！'+error, duration: 4})
        }).finally(() => {
          this.loading = false;
        })
      },

      handleExportXls(fileName) {
        if (!fileName || typeof fileName != "string") {
          fileName = "导出文件"
        }
        let param = Object.assign({}, this.queryParam)
        console.info('导出条件',param)
        delete param.rzsj;
        if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
          param['selections'] = this.selectedRowKeys.join(",")
          param['rowKey'] = this.rowKey
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()));
        param.paramsStr = paramsStr
        console.log("导出参数", param)
        this.exportLoading = true
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
          this.exportLoading = false
        })
      },

      //修改：（老系统的修改配置的add方法）
      handleAdd() {
        var params = this.getQueryParams();
        console.info('修改-record:',params.rzwd)
        var rzwd = params.rzwd
        if (rzwd === undefined) {
          notification.warning({message: '系统提示', description: '请选择入账网点', duration: 4})
          return
        }
        getAction(this.url.add, {'rzwd': rzwd}).then((res) => {
          if (res.success) {
            console.info('修改 response:',res.result)
            this.$refs.addModalForm.disableSubmit = false;
            this.$refs.addModalForm.disabled = true;
            this.$refs.addModalForm.edit(res.result);
          } else {
            notification.warning({message: '系统提示', description: res.message, duration: 4})
          }
        }).catch((error) => {
          notification.error({message: '系统提示', description: error, duration: 4})
        })
      },
      //超级修改
      handleSuperEdit() {
        var params = this.getQueryParams();
        console.info('超级修改-record:',params.rzwd)
        var rzwd  = params.rzwd
      },
      //调整
      handleEdit(record) {
        console.info('调整-record:',record)
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.disabled = true;
      },
      //删除
      handleDelete: function (record) {
        console.log('待删除信息：',record)
        if (!this.url.delete) {
          notification.error({message: '系统提示', description: '请设置url.delete属性!', duration: 4})
          return
        }
        console.info('入账网点：',record.rzwd)
        if (record.rzwd === undefined || record.rzwd === '') {
          notification.error({message: '系统提示', description: '入账网点为空，请核实!', duration: 4})
          return
        }
        console.info('入账时间：',record.rzwd)
        if (record.rzsj === undefined || record.rzsj === '') {
          notification.error({message: '系统提示', description: '入账时间为空，请核实!', duration: 4})
          return
        }
        console.info('账号：',record.rzwd)
        if (record.zh === undefined || record.zh === '') {
          notification.error({message: '系统提示', description: '账号为空，请核实!', duration: 4})
          return
        }
        console.info('收回日期：',record.rzwd)
        if (record.shrq === undefined || record.shrq === '') {
          notification.error({message: '系统提示', description: '收回日期为空，请核实!', duration: 4})
          return
        }
        var params = {
          'rzwd': record.rzwd,
          'rzsj': record.rzsj,
          'zh': record.zh,
          'shrq': record.shrq
        }
        console.info('delete params：',params)
        var that = this;
        deleteAction(that.url.delete, params).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>