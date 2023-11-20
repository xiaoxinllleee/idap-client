<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="帐号">
              <a-input placeholder="请输入帐号" v-model="queryParam.zh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易码">
              <a-input placeholder="请输入交易码" v-model="queryParam.jym"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="交易日期">
              <a-range-picker @change="onChangezjjyrq" v-model="queryParam.jyrq" :format="dateFormat"/>
            </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="科目号">
                <a-input placeholder="请输入科目号" v-model="queryParam.kmh"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="对方科目号">
                <a-input placeholder="请输入对方科目号" v-model="queryParam.dfkmh"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="机构码">
                <a-input placeholder="请输入机构码" v-model="queryParam.jgdm"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="代理机构码">
                <a-input placeholder="请输入代理机构码" v-model="queryParam.dljg"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="货币号">
                <a-input placeholder="请输入货币号" v-model="queryParam.hbh"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="柜员流水号">
                <a-input placeholder="请输入柜员流水号" v-model="queryParam.gylsh"></a-input>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table
        ref="table"
        size="middle"
        bordered
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="{x : 'max-content'}"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
  </a-card>
</template>

<script>
import {JeecgListMixin} from '@/mixins/JeecgListMixin';
import {notification} from "ant-design-vue";
import {filterObj} from '@/utils/util';
import {getAction} from "@/api/manage";


export default {
  name: "LmzhLslsbList",
  mixins: [JeecgListMixin],
  components: {},
  data() {
    return {
      dateFormat: 'YYYY-MM-DD',
      description: '历史数据查询管理页面',
      // 表头
      columns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: "center",
          customRender: function (t, r, index) {
            return parseInt(index) + 1;
          }
        },

        {
          title: '货币号',
          align:"center",
          dataIndex: 'hbh'
        },
        {
          title: '帐号',
          align:"center",
          dataIndex: 'zh'
        },
        {
          title: '科目号',
          align:"center",
          dataIndex: 'kmh'
        },
        {
          title: '对方科目号',
          align:"center",
          dataIndex: 'dfkmh'
        },
        {
          title: '余额',
          align:"center",
          dataIndex: 'zmye'
        },
        {
          title: '帐户序号',
          align:"center",
          dataIndex: 'zhxh'
        },
  /*      {
          title: 'zl',
          align:"center",
          dataIndex: 'zl'
        },*/
        {
          title: '机构码',
          align:"center",
          dataIndex: 'jgdm'
        },
        {
          title: '代理机构码',
          align:"center",
          dataIndex: 'dljg'
        },
        {
          title: '交易日期',
          align:"center",
          dataIndex: 'jyrq'
        },
        {
          title: '交易时间',
          align:"center",
          dataIndex: 'jysj'
        },
        {
          title: '交易码',
          align:"center",
          dataIndex: 'jym'
        },
        {
          title: '交易金额',
          align:"center",
          dataIndex: 'jyje'
        },
        {
          title: '积数',
          align:"center",
          dataIndex: 'zhjs'
        },
        {
          title: '摘要',
          align:"center",
          dataIndex: 'zy'
        },
        {
          title: '打印次数',
          align:"center",
          dataIndex: 'dycs'
        },
        {
          title: '凭证种类',
          align:"center",
          dataIndex: 'pzzl'
        },
        {
          title: '凭证号码',
          align:"center",
          dataIndex: 'pzhm'
        },
        {
          title: '借贷标志',
          align:"center",
          dataIndex: 'jdbz'
        },
        {
          title: '平账标志',
          align:"center",
          dataIndex: 'pzbz'
        },
        {
          title: '通兑标志',
          align:"center",
          dataIndex: 'tdbz'
        },
        {
          title: '记账柜员',
          align:"center",
          dataIndex: 'jzgy'
        },
        {
          title: '复核柜员',
          align:"center",
          dataIndex: 'fhgy'
        },
        {
          title: '柜员流水号',
          align:"center",
          dataIndex: 'gylsh'
        },
        {
          title: '对应帐号',
          align:"center",
          dataIndex: 'dyzh'
        },
        {
          title: '信息代码',
          align:"center",
          dataIndex: 'dac'
        },
        {
          title: '系统日期',
          align:"center",
          dataIndex: 'xtrq'
        }


      /*  {
          title: '帐户序号',
          align: "center",
          dataIndex: 'zhxh'
        },
        {
          title: '帐号',
          align: "center",
          dataIndex: 'zh'
        },*/
   /*     {
          title: '科目号',
          align: "center",
          dataIndex: 'kmh'
        },*/
       /* {
          title: '对方科目号',
          align: "center",
          dataIndex: 'dfkmh'
        },
        {
          title: '机构码',
          align: "center",
          dataIndex: 'jgdm'
        },
        {
          title: '代理机构码',
          align: "center",
          dataIndex: 'dljg'
        },
        {
          title: '货币号',
          align: "center",
          dataIndex: 'hbh'
        },
        {
          title: '对应帐号',
          align: "center",
          dataIndex: 'dyzh'
        },
        {
          title: '信息代码',
          align: "center",
          dataIndex: 'dac'
        },
        {
          title: '交易码',
          align: "center",
          dataIndex: 'jym'
        },
        {
          title: '交易金额',
          align: "center",
          dataIndex: 'jyje'
        },
        {
          title: '交易日期',
          align: "center",
          dataIndex: 'jyrq'
        },
        {
          title: '交易时间',
          align: "center",
          dataIndex: 'jysj'
        },
      /!*  {
          title: '余额',
          align: "center",
          dataIndex: 'zhye'
        },*!/
        {
          title: '积数',
          align: "center",
          dataIndex: 'zhjs'
        },
        {
          title: '摘要',
          align: "center",
          dataIndex: 'zy'
        },
        {
          title: '凭证种类',
          align: "center",
          dataIndex: 'pzzl'
        },
        {
          title: '凭证号码',
          align: "center",
          dataIndex: 'pzhm'
        },
        {
          title: '借贷标志',
          align: "center",
          dataIndex: 'jdbz'
        },
        {
          title: '平账标志',
          align: "center",
          dataIndex: 'pzbz'
        },
        {
          title: '通兑标志',
          align: "center",
          dataIndex: 'tdbz'
        },
        // {
        //   title: '系统日期',
        //   align: "center",
        //   dataIndex: 'xtrq'
        // },
        {
          title: '记账柜员',
          align: "center",
          dataIndex: 'jzgy'
        },
        {
          title: '复核柜员',
          align: "center",
          dataIndex: 'fhgy'
        },
        {
          title: '柜员流水号',
          align: "center",
          dataIndex: 'gylsh'
        },
        // {
        //   title: '中心流水号',
        //   align: "center",
        //   dataIndex: 'zxlsh'
        // },
        {
          title: '打印次数',
          align: "center",
          dataIndex: 'dycs'
        },*/
      ],
      url: {
        list: "/lssjcx/lmzhLslsb/list",
      },
    }
  },
  computed: {},
  methods: {
    loadData(arg) {
      if (!this.url.list) {
        this.$message.error("请设置url.list属性!")
        return
      }
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1;
      }
      var params = this.getQueryParams();//查询条件
      this.loading = true;
      getAction(this.url.list, params).then((res) => {
        if (res.success) {
          this.dataSource = res.result.records;
          this.ipagination.total = res.result.total;
          this.loading = false;
        } else {
          notification.warning({ message: '系统提示', description: res.message,duration: 4})
          this.dataSource = [];
          this.ipagination.total = 0;
          this.loading = false;
        }
        if (res.code === 510) {
          notification.warning({ message: '系统提示', description: res.message,duration: 4})
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
      delete param.jyrq;
      return filterObj(param);
    },
    onChangezjjyrq(value, dateString) {
      let trnDateString = dateString
      this.queryParam.jyrq_begin = trnDateString[0]
      this.queryParam.jyrq_end = trnDateString[1]
    },
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>