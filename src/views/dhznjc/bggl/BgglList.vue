<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="操作账号">
              <a-select  v-model="queryParam.czzh" @change="updete">
                <a-select-option value="1">当前用户和下级子账号</a-select-option>
                <a-select-option value="2">当前用户</a-select-option>
                <a-select-option value="3">下级子账号</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="高危状态">
              <a-select  v-model="queryParam.gwzt" @change="updete">
                <a-select-option value="1">全部</a-select-option>
                <a-select-option value="2">是</a-select-option>
                <a-select-option value="3">否</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="报告状态">
              <a-select  v-model="queryParam.bgzt" @change="updete">
                <a-select-option value="1">全部</a-select-option>
                <a-select-option value="2">成功</a-select-option>
                <a-select-option value="3">失败</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="列表排序">
              <a-select  v-model="queryParam.lbpx" @change="updete">
                <a-select-option value="1">全部</a-select-option>
                <a-select-option value="2">批次</a-select-option>
                <a-select-option value="3">手机号</a-select-option>
                <a-select-option value="4">手机号</a-select-option>
                <a-select-option value="5">报告创建时间</a-select-option>
                <a-select-option value="6">身份证</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="高危分类">
              <a-select  v-model="queryParam.gwfl" @change="updete">
                <a-select-option value="0">请选择</a-select-option>
                <a-select-option value="1">手机异常</a-select-option>
                <a-select-option value="2">公安负面信息</a-select-option>
                <a-select-option value="3">失信被执行人</a-select-option>
                <a-select-option value="4">被执行人</a-select-option>
                <a-select-option value="5">特殊名单核验</a-select-option>
                <a-select-option value="6">7天内多次申请</a-select-option>
                <a-select-option value="7">1个月内多次申请</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="时间范围">
              <a-select  v-model="queryParam.sjfw" @change="updete">
                <a-select-option value="0">请选择</a-select-option>
                <a-select-option value="1">本月新增高危</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="查询时间">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.khrq" :format="DateFormat"
                              @change="onKhrqDateChange" style="width: 100%;" :default-value="[moment(new Date(), 'YYYY-MM-DD'), undefined]"/>
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
      <a-button style='background-color: #f7bf67;color: white;margin-left: 10px'  @click='down'>批量下载报告</a-button>
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
<index ref="index"></index>
    <!-- 表单区域 -->
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'
  import { downFile, getAction, putAction } from '@api/manage'
  import moment from 'moment'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import index from '@/views/dhznjc/dhcssz/index'

  export default {
    name: "DqfxsbList",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect
    },
    data () {
      return {
        description: '客户管理',
        DateFormat: 'YYYY-MM-DD',
        confirmLoading: false,
        form: this.$form.createForm(this),
        queryParam: {
          czzh:'1',
          gwzt:'1',
          bgzt:'1',
          lbpx:'1',
          gwfl:'0',
          sjfw:'0',
        },
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
            title: '操作',
            align:"center",
            dataIndex: 'cz'
           },
          {
            title: '用户账号',
            align:"center",
            dataIndex: 'jg'
          },
		   {
            title: '报告编号',
            align:"center",
            dataIndex: 'yhzh'
           },
          {
            title: '批次号',
            align:"center",
            dataIndex: 'xm'
           },
          {
            title: '申请人姓名',
            align:"center",
            dataIndex: 'sfzh'
          },
		   {
            title: '申请人身份证号',
            align:"center",
            dataIndex: 'sjh'
           },
		   {
            title: '申请人手机号',
            align:"center",
            dataIndex: 'gxsj'
           },
          {
            title: '高危预警项',
            align:"center",
            dataIndex: 'gxsj'
           },
          {
            title: '高危状态',
            align:"center",
            dataIndex: 'gxsj'
           },
          {
            title: '查询状态',
            align:"center",
            dataIndex: 'gxsj'
           },
          {
            title: '报告生成时间',
            align:"center",
            dataIndex: 'gxsj'
           },

        ],
        validatorRules:{
          mbbg: {rules: [{ required: true, message: '请选择模板报告' }]},
          xm: {rules: [{ required: true, message: '请输入姓名' }]},
          sfzhm: {rules: [{ required: true, message: '请输入身份证号码' }]},
          sjh: {rules: [{ required: true, message: '请输入手机号' }]},
          jkzq: {rules: [{ required: true, message: '请选择监控周期' }]},
        },
		url: {

       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created() {

    },
    methods: {
      updete(){
        this.$forceUpdate()
      },
      searchQuery(){
        this.loading=true
        setTimeout(()=>{
          this.loading=false
        },1000)
      },

      moment,
      onKhrqDateChange: function(value, dateString) {
        let khrqDateString = dateString
        this.queryParam.khrq_begin = khrqDateString[0]
        this.queryParam.khrq_end = khrqDateString[1]
      },


      initData(){
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
        this.queryParam.lbpx = '1'
        this.queryParam.czzh='2'
        this.queryParam.gwzt='1'
        this.queryParam.bgzt='1'
        this.queryParam.gwfl='0'
        this.queryParam. sjfw='0'
      },
      down() {
        let that = this
        that.$confirm({
          title: '系统消息',
          okText: '确定',
          content: '请勾选需要下载报告!'
        })
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>