<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="操作账号">
              <a-select placeholder="请选择操作账号" v-model="queryParam.czzh" @change="updete">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="1">当前用户和下级子账号</a-select-option>
                <a-select-option value="2">当前用户</a-select-option>
                <a-select-option value="3">下级子账号</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="日期">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.khrq" :format="DateFormat"
                              @change="onKhrqDateChange" style="width: 100%;" :default-value="[moment(new Date(), 'YYYY-MM-DD'), undefined]"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="报告编号">
              <a-input placeholder="请输入报告编号" v-model="queryParam.custName"></a-input>
            </a-form-item>
          </a-col>

        <template v-if="toggleSearchStatus">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="姓名">
              <a-input placeholder="请输入姓名" v-model="queryParam.xm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="手机号码">
              <a-input placeholder="请输入手机号码" v-model="queryParam.sjhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="身份证号码">
              <a-input placeholder="请输入身份证号码" v-model="queryParam.sfzhm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="批次号">
              <a-input placeholder="请输入批次号" v-model="queryParam.pch"></a-input>
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
        :rowKey="rowKey"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
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
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'
  import { downFile, getAction, putAction } from '@api/manage'
  import moment from 'moment'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'

  export default {
    name: "DqfxsbmxList",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect
    },
    data () {
      return {
        description: '贷前风险识别明细',
        DateFormat: 'YYYY-MM-DD',
        confirmLoading: false,
        queryParam:{
          czzh:'1',
        },
        form: this.$form.createForm(this),
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        model: {},
        visible:false,
        // 表头
        columns: [
          {
            title: '序号',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },

          {
            title: '用户账号',
            align:"center",
            dataIndex: 'yhzh'
          },
          {
            title: '报告编号',
            align:"center",
            dataIndex: 'bgbh'
          },
		   {
            title: '姓名',
            align:"center",
            dataIndex: 'xm'
           },
          {
            title: '身份证号',
            align:"center",
            dataIndex: 'sfzh'
          },
		   {
            title: '手机号',
            align:"center",
            dataIndex: 'sjh'
           },
		   {
            title: '查询时间',
            align:"center",
            dataIndex: 'cxsj'
           },

        ],
		url: {
         /* list: "/ygghckmx/ygghckmx/list",
          delete: "/ygghckmx/ygghckmx/delete",
          deleteBatch: "/ygghckmx/ygghckmx/deleteBatch",
          exportXlsUrl: "ygghckmx/ygghckmx/exportXls",
          importExcelUrl: "ygghckmx/ygghckmx/importExcel",
          init: "/ygghckmx/ygghckmx/init",*/
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created() {
      this.getCurrentMonth()
    },
    methods: {
      updete(){
        this.$forceUpdate()
      },
      moment,
      searchQuery(){
        this.loading=true
        setTimeout(()=>{
          this.loading=false
        },1000)
      },
      onKhrqDateChange: function(value, dateString) {
        let khrqDateString = dateString
        this.queryParam.khrq_begin = khrqDateString[0]
        this.queryParam.khrq_end = khrqDateString[1]
      },

      initData(){
        this.model.tqrq_begin = moment(new Date()).format('YYYY-MM-DD');
        this.model.tqrq_end = moment(new Date()).format('YYYY-MM-DD');
        this.model.tqrq = [moment(`${this.model.tqrq_begin}`, 'YYYY-MM-DD'), moment(`${this.model.tqrq_end}`, 'YYYY-MM-DD')]
        this.visible = true;
      },
      initOk() {
        this.form.validateFields((err, values) => {
          if (!err) {
            var params = Object.assign({}, this.model,values)
            this.loading = true
            putAction(this.url.init, { 'ksrq': kssj, 'jsrq': jssj,'jgdm':params.jgdm,'yggh':params.yggh }).then((res) => {
              if (res.success) {
                this.$message.success("添加成功！")
                this.loadData(1)
              } else {
                this.$message.warning("添加失败！")
              }
            }).catch((error) => {
              this.$message.error("添加失败！", error)
            }).finally(() => {
              this.loading = false
            })
          }

        })


      },
      handleCancel() {
        console.log('Clicked cancel button');
        this.model={}
        this.visible = false;
      },

      searchReset() {
        this.queryParam = {}
        this.queryParam.czzh = '2'
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>