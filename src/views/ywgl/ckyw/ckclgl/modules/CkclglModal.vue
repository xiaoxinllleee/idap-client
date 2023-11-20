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
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="组织标识">
        <a-input placeholder="请输入组织标识" v-decorator="['zzbz', {}]" :disabled="true"/>
      </a-form-item>
      <a-form :form="form">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组织名称">
          <!--<j-tree-select
            v-decorator="['zzbz',{}]"
            placeholder="请选择组织名称"
            treeNodeFilterProp="title"
            dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
            :sszh="true"
            pid-field="sjywjgdm"
            :showSearch="true"
            :treeDefaultExpandAll=true
          />-->
          <a-input placeholder="请输入组织名称" v-decorator="['zzbz_dictText', {}]" :disabled="true"/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工工号">
          <a-input placeholder="请输入员工工号" v-decorator="['yggh', validatorRules.yggh ]" :disabled="true"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="员工姓名">
          <a-input placeholder="请输入员工姓名" v-decorator="['yggh_dictText', validatorRules.yggh ]" :disabled="true"/>
          <a-button @click="findback" type="primary" icon="plus">查找带回</a-button>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存量年份">
          <!--<a-select placeholder="请选择存量年份" v-decorator="[ 'clnf', validatorRules.clnf ]" :defaultValue="dateValue" @change="selectValue">
            <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
          </a-select>-->
          <a-month-picker placeholder="请选择存量年份" v-decorator="[ 'clnf', validatorRules.clnf ]"></a-month-picker>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="存款余额">
          <a-input placeholder="请输入存款余额" v-decorator="['ckye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月存款日平余额">
          <a-input placeholder="请输入月存款日平余额" v-decorator="['mckrpye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="季存款日平余额">
          <a-input placeholder="请输入季存款日平余额" v-decorator="['qckrpye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="年存款日平余额">
          <a-input placeholder="请输入年存款日平余额" v-decorator="['yckrpye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="户数">
          <a-input placeholder="请输入户数" v-decorator="['hs', {}]" />
        </a-form-item>
      </a-form>
    </a-spin>
    <account-info ref="accountInfo" @close="colseWindow"></account-info>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import AccountInfo from './AccountInfo.vue'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "CkclglModal",
    components:{
      JTreeSelect,AccountInfo
    },
    data () {
      return {
        title:"操作",
        visible: false,
        dateValue: '',
        queryParam: {},
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        records:{
          zzbz:'',
          ywjgdm: '',
          zzbz_dictText: '',
          yggh:'',
          yggh_dictText: '',
          khjlbz:'',
          rglx: '',
          gwbz: '',
          lrsj:'',
          lrczy:'',
          lrbz:''
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        zzbz:{rules: [{ required: true, message: '请输入组织标识!' }]},
        yggh:{rules: [{ required: true, message: '请输入员工工号!' }]},
        //clnf:{rules: [{ required: true, message: '请输入存量年份!' }]},
        },
        url: {
          add: "/ckclgl/ckclgl/add",
          edit: "/ckclgl/ckclgl/edit",
        },
      }
    },
    created () {
      this.dqnf();
    },
    methods: {
      colseWindow(args){
        this.records.ywjgdm = args.ywjgdm
        this.records.yggh = args.yggh
        this.records.yggh_dictText = args.yggh_dictText
        this.records.zzbz = args.zzbz
        this.records.zzbz_dictText=args.zzbz_dictText
        this.records.gwbz = args.gwbz
        this.records.khjlbz = args.khjlbz
        this.records.rglx = args.rglx
        this.model = Object.assign({}, this.records)
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'ywjgdm','yggh_dictText', 'yggh',  'khjlbz', 'zzbz', 'gwbz','zzbz_dictText','rglx'))  // loadsh的pick方法
        })
      },
      findback() {
        this.$refs.accountInfo.init()
      },
      // 获取当前年份
      dqnf(){
        var myDate = new Date;
        var year = myDate.getFullYear();
        this.initSelectYear(year)
      },
      // 初始化年份选择下拉框
      initSelectYear(year){
        this.years = [];
        for(let i=0; i<30; i++){
          this.years.push({value:((year - i)+''),label:((year - i)+'')});
        }
      },
      // 下拉选择Func
      selectValue(value){
        console.log('DkclglModalList => selectValue(value)')
        console.log('selectValue::::'+value)
        let val=value;
        this.$emit('change', val);
      },

      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'qckrpye','yckrpye','lrr','lrbz','hs','zzbz','zzbz_dictText','yggh','yggh_dictText','ckye','mckrpye'))
		  //时间格式化
          this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})
          this.form.setFieldsValue({clnf:this.model.clnf?moment(this.model.clnf):null})
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
            formData.lrsj = formData.lrsj?formData.lrsj.format():null;
            formData.clnf = formData.clnf?formData.clnf.format():null;
            
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