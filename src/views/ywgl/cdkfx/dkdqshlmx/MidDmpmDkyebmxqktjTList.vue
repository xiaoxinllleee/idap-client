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
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户经理姓名">
              <j-dict-select-tag placeholder="请输入客户经理姓名" v-model="queryParam.custid" dict-code="view_staff_dict,khjl,khjlbh" :show-search="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="发放标志">
              <a-select v-model="queryParam.ffbz" placeholder="全部" style="width: 120px">
                <a-select-option value="0">
                  以前年发放
                </a-select-option>
                <a-select-option value="1">
                  当年发放
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="到期标志">
              <a-select v-model="queryParam.dqbz" placeholder="全部" style="width: 120px">
                <a-select-option value="0">
                  未到期
                </a-select-option>
                <a-select-option value="1">
                  已到期
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="收回标志">
              <j-dict-select-tag v-model="queryParam.shbz" placeholder="全部" style="width: 120px" dict-code="shbz"></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="责任客户经理标识">
              <a-input placeholder="请输入责任客户经理标识" v-model="queryParam.custidzr"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款账号">
              <a-input placeholder="请输入贷款账号" v-model="queryParam.dkzh"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户名称">
              <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款发放日期">
              <a-range-picker @change="onChangeBeginday" v-model="queryParam.dkffrq" :default-value="[undefined, moment(new Date(), 'YYYY/MM/DD')]"  />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="贷款到期日期">
              <a-range-picker @change="onChangeEnd"  v-model="queryParam.dkdqrq"  :default-value="[undefined, moment(new Date(), 'YYYY/MM/DD')]"/>
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
    <div>
    <div class="table-operator">
      <a-button icon="download" :loading="exportLoading" @click="handleExportXls('贷款到期收回率明细')" v-has="'dkdqshlmx:exportXls'">导出</a-button>
    </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :scroll="{x:3000}"
        :loading="loading"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'dkdqshlmx:edit'">编辑</a>

          <a-divider type="vertical" />
          <!--<a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                  </a-menu-item>
            </a-menu>
          </a-dropdown>-->
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)" v-has="'dkdqshlmx:delete'">
                  <a>删除</a>
                </a-popconfirm>

        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <midDmpmDkyebmxqktjT-modal ref="modalForm" @ok="modalFormOk"></midDmpmDkyebmxqktjT-modal>
  </a-card>
</template>

<script>
  import MidDmpmDkyebmxqktjTModal from './modules/MidDmpmDkyebmxqktjTModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { filterObj } from '@/utils/util';
  import { getAction,downFile } from '@/api/manage'
  import moment from 'moment'
  import store from '@/store/'
  export default {
    name: "MidDmpmDkyebmxqktjTList",
    mixins:[JeecgListMixin],
    components: {
      MidDmpmDkyebmxqktjTModal,JTreeSelect
    },
    watch: {
      queryParam: {
        handler(value) {
          console.log('@@@@@@@@@@@@@@@@@-',value);
        },
        deep: true,
      },
    },
    data () {
      return {
        description: '贷款到期收回率明细管理页面',
        monthFormat: 'YYYY-MM',
        // 默认当前月份
        defaultMonthOpera: '',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            },
          },

          {
            title: '支行代码',
            align:"center",
            dataIndex: 'zhjgdm'
          },
          {
            title: '支行名称',
            align:"center",
            dataIndex: 'zhjgdm_dictText'
          },
          {
            title: '机构代码',
            align:"center",
            dataIndex: 'jgdm'
          },
          {
            title: '机构名称',
            align:"center",
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '客户经理标识',
            align:"center",
            dataIndex: 'custid'
          },
          {
            title: '客户经理姓名',
            align:"center",
            dataIndex: 'custid_dictText'
          },
          {
            title: '责任客户经理标识',
            align:"center",
            dataIndex: 'custidzr'
          },
          {
            title: '统计月份',
            align:"center",
            dataIndex: 'tjyf',
            customRender(text){
              return text.length>7?text.substring(0,7):text;
            }
          },
          {
            title: '贷款账号',
            align:"center",
            dataIndex: 'dkzh'
          },
          {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
          },
          {
            title: '科目号',
            align:"center",
            dataIndex: 'kmh'
          },
          {
            title: '贷款金额(元)',
            align:"center",
            dataIndex: 'dkje'
          },
          {
            title: '贷款余额(元)',
            align:"center",
            dataIndex: 'dkye'
          },
          {
            title: '贷款发放日期',
            align:"center",
            dataIndex: 'dkffrq'
          },
          {
            title: '贷款到期日期',
            align:"center",
            dataIndex: 'dkdqrq'
          },
          {
            title: '发放标志',
            align:"center",
            dataIndex: 'ffbz_dictText'
          },
          {
            title: '到期标志',
            align:"center",
            dataIndex: 'dqbz_dictText'
          },
          {
            title: '收回标志',
            align:"center",
            dataIndex: 'shbz_dictText'
          },
        ],
		url: {
          list: "/dkdqshlmx/midDmpmDkyebmxqktjT/list",
          delete: "/dkdqshlmx/midDmpmDkyebmxqktjT/delete",
          deleteBatch: "/dkdqshlmx/midDmpmDkyebmxqktjT/deleteBatch",
          exportXlsUrl: "dkdqshlmx/midDmpmDkyebmxqktjT/exportXls",
          importExcelUrl: "dkdqshlmx/midDmpmDkyebmxqktjT/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created () {
        this.getCurrentMonth()
        this.queryParam.dkffrq_end = moment(new Date()).format('YYYY-MM-DD');
        this.queryParam.dkdqrq_end = moment(new Date()).format('YYYY-MM-DD');
    },

    methods: {
      moment,
      onChangeBeginday: function(value, dateString){
        let dkffrqString = dateString
        this.queryParam.dkffrq_begin = dkffrqString[0]
        this.queryParam.dkffrq_end = dkffrqString[1]
      },
      onChangeEnd: function(value, dateString){
        let dkdqrqString = dateString
        this.queryParam.dkdqrq_begin = dkdqrqString[0]
        this.queryParam.dkdqrq_end = dkdqrqString[1]
      },
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
        if(!this.url.list){
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1
        }
        var params = this.getQueryParams();//查询条件
        if ((params.tjyf != undefined && params.tjyf != null)) {
          params.tjyf = moment(params.tjyf).format("YYYY-MM") + '-01';
        }
        this.loading = true
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records
            this.ipagination.total = res.result.total
          }
          if(res.code===510){
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
        //日期格式调整
        let tjrqment = ""
        if (this.queryParam.tjyf) {
          tjrqment = moment(this.queryParam.tjyf).format("YYYY-MM") + '-01'
        }
        var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        delete param.dkffrq
        delete param.dkdqrq
        if (param.tjyf) {
          param.tjyf = tjrqment;
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