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
            <a-form-item label="列表排序">
              <a-select  v-model="queryParam.lbpx" @change="updete">
                <a-select-option value="1">默认</a-select-option>
                <a-select-option value="2">姓名</a-select-option>
                <a-select-option value="3">身份证</a-select-option>
                <a-select-option value="4">手机号</a-select-option>
                <a-select-option value="5">更新时间</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="加入系统时间">
              <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.khrq" :format="DateFormat"
                              @change="onKhrqDateChange" style="width: 100%;"/>
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
      <a-button style='background-color: #f7bf67;color: white;margin-left:10px;' @click="initData">新增客户</a-button>
      <a-button  style='background-color: #f7bf67;color: white;margin-left:10px;' @click="plAdd">批量新增客户</a-button>
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
        title="新增监控"
        :width="1800"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="initOk"
        @cancel="handleCancel">
        <a-form :form="form">
          <a-spin :spinning="confirmLoading">

            <a-divider orientation="left" style="color: #1890FF;">基本信息</a-divider>
            <a-row>
              <a-col :lg="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="姓名">
                  <a-input placeholder="请输入姓名" v-decorator="['xm', validatorRules.xm]" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :lg="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="身份证号码">
                  <a-input placeholder="请输入身份证号码" v-decorator="['sfzhm', validatorRules.sfzhm]" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :lg="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="手机号">
                  <a-input placeholder="请输入手机号" v-decorator="['sjh', validatorRules.sjh]" />
                </a-form-item>
              </a-col>
            </a-row>


            <a-divider orientation="left" style="color: #1890FF;">监控信息</a-divider>
            <a-row>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="监控时间">
                  <a-range-picker :placeholder="['开始日期', '结束日期']" v-model="queryParam.khrq" :format="DateFormat"
                                  @change="onKhrqDateChange" style="width: 100%;"/>
                </a-form-item>
              </a-col>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="监控周期">
                  <a-select  v-decorator="['jkzq', validatorRules.jkzq]">
                    <a-select-option value="0">--请选择--</a-select-option>
                    <a-select-option value="1">7天</a-select-option>
                    <a-select-option value="2">30天</a-select-option>
                    <a-select-option value="3">60天</a-select-option>
                    <a-select-option value="4">90天</a-select-option>
                    <a-select-option value="5">180天</a-select-option>
                    <a-select-option value="6">360天</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>


            <a-row>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="报告模板">
                  <a-select placeholder="请选择报告模板" v-decorator="['mbbg', validatorRules.mbbg]">
                    <a-select-option value="0">--请选择--</a-select-option>
                    <a-select-option value="1">贷后加强版</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :lg='1'>
                <a-button type="primary" @click="pdfPreview">预览</a-button>
              </a-col>
            </a-row>

            <a-row>
              <a-col :lg='12'>
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="预警短信通知">
                  <a-input  v-decorator="['yjdxtz', validatorRules.yjdxtz]" />
                </a-form-item>
              </a-col>

              <a-col :lg='1'>
                <a-button type="primary" @click="tysz">通用设置</a-button>
              </a-col>
            </a-row>

            <a-row>
              <a-col :lg="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="预警短信通知">
                  <p><span></span>当前暂无可分配支行长账号（您还没有创建支行长账号或者创建的支行长账号没有个人贷后查询权限）</p>
                </a-form-item>
              </a-col>

            </a-row>
            <a-row>
              <a-col :lg="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="分配客户经理">
                  <p><span></span>当前暂无可分配客户经理（您还没有创建客户经理账号或者创建的客户经理账号没有个人贷后查询权限）</p>
                </a-form-item>
              </a-col>
            </a-row>
             <a-row>
              <a-col :lg="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="注">
                  <p><span></span>监控分配后，报告高危时的预警短信会同步发送至被分配账号的手机号上</p>
                </a-form-item>
              </a-col>
            </a-row>

            <a-divider orientation="left" style="color: #1890FF;">备注【非必填】</a-divider>
            <a-row>
              <a-col :lg="12">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="备注">
                  <a-textarea placeholder="请输入备注" v-model="model.bz" />
                </a-form-item>
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
        title="通用设置"
        width="90%"
        :footer="null"
        :visible="visible3"
        @cancel="handleCancel3"
      >
        <a-spin :spinning="confirmLoading">
          <!-- 查询区域 -->
          <div class='table-page-search-wrapper'>
            <a-card title='参数设置' style='width: 80%;height: 400px'>
              <div style='margin-top: 2%;margin-left: 5%'>
                <p style='color: red'><span style='color: red'>!!!</span>除针对每个客户进行单独设置预警短信通知的手机号，还可以在这里增加通用的号码。</p>
                <p><a-checkbox value='1'>新增监控客户都默认添加操作账号对应的手机号为预警通知号码。 当前用户预警接收短信手机号:15222226562<a-button type="primary" @click='mrsz'>默认设置</a-button></a-checkbox></p>
                <p><a-checkbox value='2'>短信通知到负责人号码：<a-input style='border:none; border-bottom:2px solid #eee;'/></a-checkbox></p>
                <p><a-checkbox value='3'>其他：<a-input style='border:none; border-bottom:2px solid #eee;'/></a-checkbox></p>
              </div>
              <div style='text-align: center; margin: auto'>
                <a-button type="primary" @click='szcs'>设置参数</a-button>
                <a-button style='background-color: #f7bf67;color: white;margin-left:10px;'  @click='fhjky'>返回监控页</a-button>
              </div>

              <grxx ref='grxx' />
            </a-card>
          </div>
        </a-spin>
      </a-modal>

      <a-modal
        title="批量任务管理"
        width="90%"
        :footer="null"
        :visible="visible4"
        :confirm-loading="confirmLoading"
        @cancel="handleCancel4">

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
  import index from '@/views/dhznjc/dhcssz/index'
  import grxx from '@views/dhznjc/dhcssz/modules/grxx'
  import ExcelImport from '@comp/common/ExcelImport'

  export default {
    name: "DqfxsbList",
    mixins:[JeecgListMixin],
    components: {
      JTreeSelect,grxx,ExcelImport
    },
    data () {
      return {
        description: '客户管理',
        DateFormat: 'YYYY-MM-DD',
        confirmLoading: false,
        form: this.$form.createForm(this),
        queryParam: {
          czzh:'1',
          lbpx:'1',
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
        visible4:false,
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
            title: '机构',
            align:"center",
            dataIndex: 'jg'
          },
		   {
            title: '用户账号',
            align:"center",
            dataIndex: 'yhzh'
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
            title: '更新时间',
            align:"center",
            dataIndex: 'gxsj'
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
          jkzq: {rules: [{ required: true, message: '请选择监控周期' }]},
        },
		url: {
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
      plAdd(){
        this.visible4 = true;
      },
      fhjky(){
        this.visible3=false
      },
      szcs(){
        let that = this;
        that.$confirm({
          title:'系统消息',
          okText: '确定',
          cancelText: '取消',
          content: '确定要设置贷后参数吗？',
          onOk: () => {
            this.$message.success("设置成功")
          },
          onCancel: e => {
            if (e.triggerCancel) {
              // 点击x或者按键盘esc关闭的弹窗
              return
            }
            // 函数体 方法
          }
        })
      },
      mrsz(){
        this.$refs['grxx'].init()
      },
      tysz(){
        this.visible3=true
      },
      pdfPreview(){
        this.visible2=true
      },
      moment,
      onKhrqDateChange: function(value, dateString) {
        let khrqDateString = dateString
        this.queryParam.khrq_begin = khrqDateString[0]
        this.queryParam.khrq_end = khrqDateString[1]
      },
      onCjsjDateChange: function(value, dateString) {
        let cjsjDateString = dateString
        this.queryParam.cjsj_begin = cjsjDateString[0]
        this.queryParam.cjsj_end = cjsjDateString[1]
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
      handleCancel2() {
        this.visible2 = false;
      },
      handleCancel3() {
        this.visible3 = false;
      },
      handleCancel4() {
        this.visible4 = false;
      },
      searchReset() {
        this.queryParam = {}
        this.queryParam.lbpx = '1'
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>