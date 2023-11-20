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
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="报告模板">
              <a-select placeholder="请选择报告模板" v-model="queryParam.bgmb" @change="updete">
                <a-select-option value="1">全部</a-select-option>
                <a-select-option value="2">贷前测试模板(司法全量)</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="查询状态">
              <a-select placeholder="请选择查询状态" v-model="queryParam.cxzt" @change="updete">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="1">全部</a-select-option>
                <a-select-option value="2">成功</a-select-option>
                <a-select-option value="3">失败</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>


        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="高危预警">
              <a-select placeholder="请选择高危预警" v-model="queryParam.gwyj" @change="updete">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="1">全部</a-select-option>
                <a-select-option value="2">是</a-select-option>
                <a-select-option value="3">否</a-select-option>
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
              <a-button @click="searchReset" icon="reload" type="primary" style="margin-left: 8px">重置</a-button>
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
      <a-button  @click="initData" style='background-color: #f7bf67;color: white;margin-left: 10px'>新增</a-button>
      <a-button  style='background-color: #f7bf67;color: white;margin-left: 10px' @click="plAdd">批量新增</a-button>
      <a-button  style='background-color: #f7bf67;color: white;margin-left: 10px' @click='down'>批量下载报告</a-button>
      <a-button  style='background-color: #f7bf67;color: white;margin-left: 10px' :loading="exportLoading" @click="exp('贷前风险识别')">导出客户信息</a-button>
      <a-button  style='background-color: #f7bf67;color: white;margin-left: 10px' :loading="exportLoading" @click="exp('贷前风险识别')">导出报告数据信息</a-button>
      <a-button  style='background-color: #f7bf67;color: white;margin-left: 10px' @click='down'>下载模型数据</a-button>
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
      <a-modal
        title="新增"
        :width="1800"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="initOk"
        @cancel="handleCancel">
        <a-form :form="form">
          <a-spin :spinning="confirmLoading">

            <a-divider orientation="left" style="color: #1890FF;">报告模板</a-divider>
            <a-row>
                <a-col :lg='12'>
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="报告模板">
                    <a-select placeholder="请选择报告模板" v-decorator="['mbbg', validatorRules.mbbg]">
                      <a-select-option value="">--请选择--</a-select-option>
                      <a-select-option value="1">贷前测试模板(司法全量)</a-select-option>
                    </a-select>

                  </a-form-item>
                </a-col>
              <a-col :lg='1'>
                <a-button type="primary" @click="pdfPreview">预览</a-button>
                </a-col>
            </a-row>

            <a-divider orientation="left" style="color: #1890FF;">个人信息</a-divider>
            <a-row>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="姓名">
                  <a-input placeholder="请输入姓名" v-decorator="['xm', validatorRules.xm]" />
                </a-form-item>
              </a-col>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="身份证号码">
                  <a-input placeholder="请输入身份证号码" v-decorator="['sfzhm', validatorRules.sfzhm]" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="手机号">
                  <a-input placeholder="请输入手机号" v-decorator="['sjh', validatorRules.sjh]" />
                </a-form-item>
              </a-col>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="企业名称">
                  <a-input placeholder="请输入企业名称" v-model="model.qymc" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="备注">
                  <a-textarea placeholder="请输入备注" v-model="model.bz" />
                </a-form-item>
              </a-col>
              <a-col :lg='12'>

              </a-col>
            </a-row>

          </a-spin>
        </a-form>

      </a-modal>

      <a-modal
        title="预览"
        :width="800"
        :footer="null"
        :visible="visible2"
        :confirm-loading="confirmLoading"
        @cancel="handleCancel2">
        <a-form :form="form">
          <a-spin :spinning="confirmLoading">
            <img alt="profile" src="@/views/cmms/yjzrbg/assetsfile/4301032022060610880.jpg" width="100%"
                 height="100%" />
          </a-spin>
        </a-form>
      </a-modal>

      <a-modal
        title="批量任务管理"
        width="90%"
        :footer="null"
        :visible="visible3"
        :confirm-loading="confirmLoading"
        @cancel="handleCancel3">

        <a-form :form="form">
          <a-spin :spinning="confirmLoading">
          <a-row>
                <a-col :lg="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="批次号">
                  <a-input placeholder="请输入批次号" v-model="queryParam.pch"></a-input>
                </a-form-item>
            </a-col>
                <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
          </a-row>
            <a-row>
              <a-col :lg="8">
                <a-button type="primary" style="background-color: #5cb85c;" @click="excelImport">新增批量任务</a-button>
              </a-col>
            </a-row>

            <a-table
              ref="table"
              size="middle"
              bordered
              :rowKey="rowKey"
              :columns="columns2"
              :dataSource="dataSource"
              :pagination="ipagination"
              :loading="loading"
              :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
              @change="handleTableChange">

            </a-table>

          </a-spin>
        </a-form>
      </a-modal>


    </div>
    <!-- table区域-end -->
    <excel-import ref="excelImportModal" @ok="importComplete"/>
    <!-- 表单区域 -->
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { filterObj } from '@/utils/util'
  import { downFile, getAction, putAction } from '@api/manage'
  import moment from 'moment'
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import ExcelImport from '@comp/common/ExcelImport'

  export default {
    name: "DqfxsbList",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect,ExcelImport
    },
    data () {
      return {
        description: '贷前风险识别',
        DateFormat: 'YYYY-MM-DD',
        confirmLoading: false,
        form: this.$form.createForm(this),
        queryParam: {
          czzh:'1',
          bgmb:'1',
          cxzt:'1',
          gwyj:'1',
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
        visible2:false,
        visible3:false,
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
            title: '高危预警',
            align:"center",
            dataIndex: 'gwyj'
           },
		   {
            title: '查询状态',
            align:"center",
            dataIndex: 'cxzt'
           },
		   {
            title: '查询时间',
            align:"center",
            dataIndex: 'cxsj'
           },
		   {
            title: '备注',
            align:"center",
            dataIndex: 'bz'
           },

        ],
        columns2: [
          {
            title: '操作',
            align:"center",
            dataIndex: 'cz'
          },

          {
            title: '批次编号',
            align:"center",
            dataIndex: 'bgbh'
          },
          {
            title: '文件总条数',
            align:"center",
            dataIndex: 'xm'
          },
          {
            title: '有效条数',
            align:"center",
            dataIndex: 'sfzh'
          },
          {
            title: '无效条数',
            align:"center",
            dataIndex: 'sjh'
          },
          {
            title: '查询报告成功数',
            align:"center",
            dataIndex: 'gwyj'
          },
          {
            title: '查询报告失败数',
            align:"center",
            dataIndex: 'cxzt'
          },
          {
            title: '状态',
            align:"center",
            dataIndex: 'cxsj'
          },
          {
            title: '创建任务时间',
            align:"center",
            dataIndex: 'bz'
          },

        ],
        validatorRules:{
          mbbg: {rules: [{ required: true, message: '请选择模板报告' }]},
          xm: {rules: [{ required: true, message: '请输入姓名' }]},
          sfzhm: {rules: [{ required: true, message: '请输入身份证号码' }]},
          sjh: {rules: [{ required: true, message: '请输入手机号' }]},
        },
		url: {
         /* list: "/ygghckmx/ygghckmx/list",
          delete: "/ygghckmx/ygghckmx/delete",
          deleteBatch: "/ygghckmx/ygghckmx/deleteBatch",
          exportXlsUrl: "ygghckmx/ygghckmx/exportXls",
          importExcelUrl: "ygghckmx/ygghckmx/importExcel",
          init: "/ygghckmx/ygghckmx/init",*/
          exportTemplateName: '导入模板',
          exportTemplateUrl: "bwkmb/bwkmb/exportTemplateXls",
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
      searchQuery(){
        this.loading=true
        setTimeout(()=>{
          this.loading=false
        },1000)
      },
      moment,
      pdfPreview(){
        this.visible2=true
      },
      handleCancel2() {
        this.visible2 = false;
      },
      handleCancel3() {
        this.visible3 = false;
      },
      onKhrqDateChange: function(value, dateString) {
        let khrqDateString = dateString
        this.queryParam.khrq_begin = khrqDateString[0]
        this.queryParam.khrq_end = khrqDateString[1]
      },
      plAdd(){
        this.visible3 = true;
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
      updete(){
        this.$forceUpdate()
      },
      searchReset() {
        this.queryParam = {}
        this.queryParam.czzh = '2'
        this.queryParam.bgmb = '1'
        this.queryParam.cxzt = '1'
        this.queryParam.gwyj = '1'
      },
      down() {
        let that = this
        that.$confirm({
          title: '系统消息',
          okText: '确定',
          content: '请勾选需要下载报告!'
        })
      },
      down2() {
        let that = this
        that.$confirm({
          title: '系统消息',
          okText: '确定',
          content: '请勾选需要下载的数据!'
        })
      },
      exp() {
        let that = this
        that.$confirm({
          title: '系统消息',
          okText: '确定',
          content: '确定导出报告信息吗？'
        })
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>