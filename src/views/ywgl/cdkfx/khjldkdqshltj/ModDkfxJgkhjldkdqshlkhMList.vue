<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="统计月份">
              <a-month-picker placeholder="请选择统计月份" v-model="queryParam.tjyf" style="width: 100%;"
                              :defaultValue="defaultMonthOpera" :format="monthFormat"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="支行代码">
<!--              <j-tree-select placeholder="请选择支行" v-model="queryParam.zhjgdm"
                             dict="v_hr_bas_organization_cmms,ZZJC,ywjgdm" pidField="sjywjgdm" treeNodeFilterProp="title"
                             :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true"/>-->

              <j-tree-select placeholder="请选择支行"
                             pid-field="sjywjgdm_b"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.zhjgdm"
                             v-decorator="['zhjgdm', {rules: [{required: true, message: '请选择机构查询！'}]}]"
                             dict="v_hr_bas_organization, zzjc, ywjgdm"
                             condition='{"sjywjgdm": "ywjgdm"}'
                             :tree-default-expand-all="true"/>

            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构代码">
              <j-tree-select placeholder="请选择机构查询"
                             pid-field="sjywjgdm"
                             :showSearch="true"
                             treeNodeFilterProp="title"
                             v-model="queryParam.jgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :tree-default-expand-all="true"/>
            </a-form-item>
          </a-col>
          <!--          <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
          <!--            <a-form-item label="客户经理标识">-->
          <!--              <a-input placeholder="请输入客户经理标识" v-model="queryParam.custid"></a-input>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->

        </a-row>

        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户经理姓名">
              <j-dict-select-tag placeholder="请输入客户经理姓名" v-model="queryParam.custid" dict-code="view_staff_dict,khjl,khjlbh" :show-search="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>

      </a-form>
    </div>
    <div class="table-operator">
      <a-button style="margin-left: 7px" :loading="exportLoading" icon="download"
                @click="handleExportXls('客户经理贷款到期收回率统计')" v-has="'khjldkdqshltj:exportXls'">导出</a-button>
    </div>

    <a-table ref="table"
             size="middle"
             bordered
             rowKey="id"
             :columns="columns"
             :dataSource="dataSource"
             :pagination="ipagination"
             :loading="loading"
             :scroll="{x:2000}"
             @change="handleTableChange">

      <span slot="dndqshlkk" slot-scope="dndqshlkk">
        {{ dndqshlkk == null ? "" : Number(dndqshlkk).toFixed(2) }}
      </span>
      <span slot="yqndffdqshlkk" slot-scope="yqndffdqshlkk">
        {{ yqndffdqshlkk == null ? "" : Number(yqndffdqshlkk).toFixed(2) }}
      </span>

      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)" v-has="'khjldkdqshltj:edit'">编辑</a>
        <a-divider type="vertical"/>
        <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)" v-has="'khjldkdqshltj:delete'">
          <a>删除</a>
        </a-popconfirm>
      </span>

    </a-table>

  </a-card>
</template>

<script>
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import {filterObj} from '@/utils/util';
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {getAction, downFile} from '@/api/manage'
  import moment from 'moment'
  import {notification} from "ant-design-vue";
  import store from '@/store/'


  export default {
    name: "ModDkfxJgkhjldkdqshlkhMList",
    mixins: [JeecgListMixin],
    components: {
      JTreeSelect
    },
    data() {
      return {
        description: '客户经理贷款到期收回率统计管理页面',
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: '',
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
            title: '统计月份',
            align: "center",
            dataIndex: 'tjyf',
            customRender: function (text) {
              return !text ? "" : (text.length > 8 ? text.substr(0, 7) : text)
            },
          },
          {
            title: '支行代码',
            align: "center",
            dataIndex: 'zhjgdm'
          },
          {
            title: '支行名称',
            align: "center",
            dataIndex: 'zhjgdm_dictText'
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
            title: '客户经理标识',
            align: "center",
            dataIndex: 'custid'
          },
          {
            title: '客户经理姓名',
            align: "center",
            dataIndex: 'custid_dictText'
          },
          {
            title: '本年到期贷款',
            align: "center",
            dataIndex: 'ffysh'
          }
          ,
          {
            title: '其中',
            children: [
              {
                title: '本年发放',
                align: "center",
                dataIndex: 'dnffysh'
              },
              {
                title: '本年前发放',
                align: "center",
                dataIndex: 'yqnffysh'
              }
            ]
          },

          {
            title: '本年到期收回',
            align: "center",
            dataIndex: 'ffyish'
          },
          {
            title: '其中',
            children: [
              {
                title: '本年发放',
                align: "center",
                dataIndex: 'dnffyish'
              },
              {
                title: '本年前发放',
                align: "center",
                dataIndex: 'yqnffyish'
              }
            ]
          },
          {
            title: '到期贷款收回率',
            align: "center",
            dataIndex: 'ffdqshl'
          },
          {
            title: '其中',
            children: [
              {
                title: '本年发放',
                align: "center",
                key: "dnffdqshl_1",
                dataIndex: 'dnffdqshl'
              },
              {
                title: '本年前发放',
                align: "center",
                key: "yqnffdqshl_1",
                dataIndex: 'yqnffdqshl'
              }
            ]
          },
          {
            title: '当年到期收回率扣款',
            align: "center",
            key: "dndqshlkk",
            dataIndex: 'dndqshlkk',
            scopedSlots: { customRender: "dndqshlkk" }
          },
          {
            title: '以前年度发放到期收回率扣款',
            align: "center",
            key: "yqndffdqshlkk",
            dataIndex: 'yqndffdqshlkk',
            scopedSlots: { customRender: "yqndffdqshlkk" }
          },
        ],
        url: {
          list: "/khjldkdqshltj/modDkfxJgkhjldkdqshlkhM/list",
          delete: "/khjldkdqshltj/modDkfxJgkhjldkdqshlkhM/delete",
          deleteBatch: "/khjldkdqshltj/modDkfxJgkhjldkdqshlkhM/deleteBatch",
          exportXlsUrl: "khjldkdqshltj/modDkfxJgkhjldkdqshlkhM/exportXls",
          importExcelUrl: "khjldkdqshltj/modDkfxJgkhjldkdqshlkhM/importExcel",
        },
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
      // getCurrentMonth() {
      //   let curDate = new Date();
      //   curDate.setMonth(curDate.getMonth() - 1);
      //   this.defaultMonthOpera = moment(curDate);
      // },
      getCurrentMonth() {
        let curDate = new Date();
        let curMonth = {year: curDate.getFullYear(), month: curDate.getMonth() + 1,}
        this.defaultMonthOpera = moment(curDate, this.monthFormat);
        this.queryParam = {tjyf: undefined};
        this.queryParam.tjyf=this.defaultMonthOpera;
      },
      searchReset () {
        this.queryParam = { tjyf: undefined ,jgdm:''}
        this.queryParam.tjyf = this.defaultMonthOpera
        if(!store.getters.isRoot) {
          console.log( store.getters.ywjgdm)
          this.queryParam.jgdm = store.getters.ywjgdm
        }
        this.loadData(1)
      },

      loadData(arg) {
        if (!this.url.list) {
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1
        }
        var params = this.getQueryParams();//查询条件
        if (params.tjyf !== undefined && params.tjyf !== null) {
          params.tjyf = moment(params.tjyf).format("YYYY-MM") + '-01';
        }
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

      getQueryParams() {
        //获取查询条件
        let sqp = {}
        if (this.superQueryParams) {
          sqp['superQueryParams'] = encodeURI(this.superQueryParams)
        }
        console.info('统计月份:',this.queryParam.tjyf)
        //日期格式调整
        let tjyf = ""
        if (this.queryParam.tjyf) {
          tjyf = moment(this.queryParam.tjyf).format("YYYY-MM") + '-01'
        }
        var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        if (param.tjyf) {
          param.tjyf = tjyf;
        }
        return filterObj(param);
      },

      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "导出文件"
        }
        let tjyf = ''
        let param = Object.assign({}, this.queryParam)
        if (this.queryParam.tjyf !== undefined && this.queryParam.tjyf !== null) {
          tjyf = moment(param.tjyf).format("YYYY-MM") + '-01'
        }
        param.tjyf=tjyf;
        if(this.selectedRowKeys && this.selectedRowKeys.length>0){
          param['selections'] = this.selectedRowKeys.join(",")
        }
        let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()));
        param.paramsStr = paramsStr
        console.log("导出参数",param)
        this.exportLoading = true
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
        }).finally(()=>{
          this.exportLoading = false
          // this.loadData(1)
        })
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>