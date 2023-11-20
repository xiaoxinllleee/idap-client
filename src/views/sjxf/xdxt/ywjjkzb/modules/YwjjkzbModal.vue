<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
      
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="删除标志">
          <a-input placeholder="请输入删除标志" v-decorator="['dataFlag', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="itemInfoId">
          <a-input placeholder="请输入itemInfoId" v-decorator="['itemInfoId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="itemInfoType">
          <a-input placeholder="请输入itemInfoType" v-decorator="['itemInfoType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="itemRelaId">
          <a-input placeholder="请输入itemRelaId" v-decorator="['itemRelaId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="itemRelaNo">
          <a-input placeholder="请输入itemRelaNo" v-decorator="['itemRelaNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="调整前五级分类形态">
          <a-input placeholder="请输入调整前五级分类形态" v-decorator="['item001', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="学生证号">
          <a-input placeholder="请输入学生证号" v-decorator="['item002', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="助学贷款类型">
          <a-input placeholder="请输入助学贷款类型" v-decorator="['item003', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否小额贷款公司经营贷款1:是2:否">
          <a-input placeholder="请输入是否小额贷款公司经营贷款1:是2:否" v-decorator="['item004', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item005">
          <a-input placeholder="请输入item005" v-decorator="['item005', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="学校行政区码[省]">
          <a-input placeholder="请输入学校行政区码[省]" v-decorator="['item006', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="学校行政区码[市]">
          <a-input placeholder="请输入学校行政区码[市]" v-decorator="['item007', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="学校行政区码[县]">
          <a-input placeholder="请输入学校行政区码[县]" v-decorator="['item008', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款时家庭住址行政区码[县]">
          <a-input placeholder="请输入贷款时家庭住址行政区码[县]" v-decorator="['item009', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款时家庭住址行政区码[省]">
          <a-input placeholder="请输入贷款时家庭住址行政区码[省]" v-decorator="['item010', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="学校名称">
          <a-input placeholder="请输入学校名称" v-decorator="['item011', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="学校地址">
          <a-input placeholder="请输入学校地址" v-decorator="['item012', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="学校地址[部分]">
          <a-input placeholder="请输入学校地址[部分]" v-decorator="['item013', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款时家庭住址">
          <a-input placeholder="请输入贷款时家庭住址" v-decorator="['item014', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款时家庭住址[部分]">
          <a-input placeholder="请输入贷款时家庭住址[部分]" v-decorator="['item015', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款时家庭住址行政区码[市]">
          <a-input placeholder="请输入贷款时家庭住址行政区码[市]" v-decorator="['item016', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="水利建设贷款类型1">
          <a-input placeholder="请输入水利建设贷款类型1" v-decorator="['item017', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="水利建设贷款类型2">
          <a-input placeholder="请输入水利建设贷款类型2" v-decorator="['item018', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="融资平台贷款类型1">
          <a-input placeholder="请输入融资平台贷款类型1" v-decorator="['item019', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="融资平台贷款类型2">
          <a-input placeholder="请输入融资平台贷款类型2" v-decorator="['item020', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="融资平台贷款投向1">
          <a-input placeholder="请输入融资平台贷款投向1" v-decorator="['item021', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="融资平台贷款投向2">
          <a-input placeholder="请输入融资平台贷款投向2" v-decorator="['item022', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="融资平台贷款投向3">
          <a-input placeholder="请输入融资平台贷款投向3" v-decorator="['item023', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="融资平台贷款偿债资金来源">
          <a-input placeholder="请输入融资平台贷款偿债资金来源" v-decorator="['item024', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="融资平台按隶属关系分类">
          <a-input placeholder="请输入融资平台按隶属关系分类" v-decorator="['item025', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item026">
          <a-input placeholder="请输入item026" v-decorator="['item026', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item027">
          <a-input placeholder="请输入item027" v-decorator="['item027', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item028">
          <a-input placeholder="请输入item028" v-decorator="['item028', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item029">
          <a-input placeholder="请输入item029" v-decorator="['item029', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item030">
          <a-input placeholder="请输入item030" v-decorator="['item030', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否铁路、公路基础设施建设贷款">
          <a-input placeholder="请输入是否铁路、公路基础设施建设贷款" v-decorator="['item031', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item032">
          <a-input placeholder="请输入item032" v-decorator="['item032', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item033">
          <a-input placeholder="请输入item033" v-decorator="['item033', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item034">
          <a-input placeholder="请输入item034" v-decorator="['item034', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item035">
          <a-input placeholder="请输入item035" v-decorator="['item035', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item036">
          <a-input placeholder="请输入item036" v-decorator="['item036', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item037">
          <a-input placeholder="请输入item037" v-decorator="['item037', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item038">
          <a-input placeholder="请输入item038" v-decorator="['item038', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item039">
          <a-input placeholder="请输入item039" v-decorator="['item039', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item040">
          <a-input placeholder="请输入item040" v-decorator="['item040', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item100">
          <a-input placeholder="请输入item100" v-decorator="['item100', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item101">
          <a-input placeholder="请输入item101" v-decorator="['item101', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item102">
          <a-input placeholder="请输入item102" v-decorator="['item102', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item111">
          <a-input placeholder="请输入item111" v-decorator="['item111', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item112">
          <a-input placeholder="请输入item112" v-decorator="['item112', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item200">
          <a-input placeholder="请输入item200" v-decorator="['item200', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item201">
          <a-input placeholder="请输入item201" v-decorator="['item201', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item202">
          <a-input placeholder="请输入item202" v-decorator="['item202', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item203">
          <a-input placeholder="请输入item203" v-decorator="['item203', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item204">
          <a-input placeholder="请输入item204" v-decorator="['item204', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item205">
          <a-input placeholder="请输入item205" v-decorator="['item205', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item300">
          <a-input placeholder="请输入item300" v-decorator="['item300', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item301">
          <a-input placeholder="请输入item301" v-decorator="['item301', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item302">
          <a-input placeholder="请输入item302" v-decorator="['item302', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item303">
          <a-input placeholder="请输入item303" v-decorator="['item303', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item304">
          <a-input placeholder="请输入item304" v-decorator="['item304', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item305">
          <a-input placeholder="请输入item305" v-decorator="['item305', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item306">
          <a-input placeholder="请输入item306" v-decorator="['item306', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item307">
          <a-input placeholder="请输入item307" v-decorator="['item307', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item308">
          <a-input placeholder="请输入item308" v-decorator="['item308', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item309">
          <a-input placeholder="请输入item309" v-decorator="['item309', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item310">
          <a-input placeholder="请输入item310" v-decorator="['item310', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item311">
          <a-input placeholder="请输入item311" v-decorator="['item311', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item312">
          <a-input placeholder="请输入item312" v-decorator="['item312', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item313">
          <a-input placeholder="请输入item313" v-decorator="['item313', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item314">
          <a-input placeholder="请输入item314" v-decorator="['item314', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item315">
          <a-input placeholder="请输入item315" v-decorator="['item315', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item400">
          <a-input placeholder="请输入item400" v-decorator="['item400', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item401">
          <a-input placeholder="请输入item401" v-decorator="['item401', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item402">
          <a-input placeholder="请输入item402" v-decorator="['item402', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item403">
          <a-input placeholder="请输入item403" v-decorator="['item403', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="约定还款日">
          <a-input placeholder="请输入约定还款日" v-decorator="['item404', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item405">
          <a-input placeholder="请输入item405" v-decorator="['item405', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item500">
          <a-input placeholder="请输入item500" v-decorator="['item500', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item501">
          <a-input placeholder="请输入item501" v-decorator="['item501', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item502">
          <a-input placeholder="请输入item502" v-decorator="['item502', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item503">
          <a-input placeholder="请输入item503" v-decorator="['item503', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="item504">
          <a-input placeholder="请输入item504" v-decorator="['item504', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="userId">
          <a-input placeholder="请输入userId" v-decorator="['userId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务编号">
          <a-input placeholder="请输入业务编号" v-decorator="['businessNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="updateDate">
          <a-input placeholder="请输入updateDate" v-decorator="['updateDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借据号码">
          <a-input placeholder="请输入借据号码" v-decorator="['voucherNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="起始日期">
          <a-input placeholder="请输入起始日期" v-decorator="['sDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="结束日期">
          <a-input placeholder="请输入结束日期" v-decorator="['eDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="加载时间">
          <a-input placeholder="请输入加载时间" v-decorator="['loadDate', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人编号">
          <a-input placeholder="请输入法人编号" v-decorator="['legalNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="天入库表编号-对不同的表名唯一">
          <a-input placeholder="请输入天入库表编号-对不同的表名唯一" v-decorator="['dtnum', validatorRules.dtnum ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="dttime">
          <a-date-picker v-decorator="[ 'dttime', {}]" />
        </a-form-item>
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "YwjjkzbModal",
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        dtnum:{rules: [{ required: true, message: '请输入天入库表编号-对不同的表名唯一!' }]},
        },
        url: {
          add: "/ywjjkzb/ywjjkzb/add",
          edit: "/ywjjkzb/ywjjkzb/edit",
        },
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'dataFlag','itemInfoId','itemInfoType','itemRelaId','itemRelaNo','item001','item002','item003','item004','item005','item006','item007','item008','item009','item010','item011','item012','item013','item014','item015','item016','item017','item018','item019','item020','item021','item022','item023','item024','item025','item026','item027','item028','item029','item030','item031','item032','item033','item034','item035','item036','item037','item038','item039','item040','item100','item101','item102','item111','item112','item200','item201','item202','item203','item204','item205','item300','item301','item302','item303','item304','item305','item306','item307','item308','item309','item310','item311','item312','item313','item314','item315','item400','item401','item402','item403','item404','item405','item500','item501','item502','item503','item504','userId','businessNo','updateDate','voucherNo','sDate','eDate','loadDate','legalNo','dtnum'))
		  //时间格式化
          this.form.setFieldsValue({dttime:this.model.dttime?moment(this.model.dttime):null})
        });

      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.dttime = formData.dttime?formData.dttime.format():null;
            
            console.log(formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })



          }
        })
      },
      handleCancel () {
        this.close()
      },


    }
  }
</script>

<style lang="less" scoped>

</style>