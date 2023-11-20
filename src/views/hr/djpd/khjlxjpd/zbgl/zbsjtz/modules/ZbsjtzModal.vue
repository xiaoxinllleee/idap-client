<template>
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-row>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="评定周期">
              <j-dict-select-tag  placeholder="请选择评定周期" v-decorator="['pdzq', validatorRules.pdzq]"  dictCode="rqwd"  :disabled="this.disabled" />
              <a-button @click="FindBack" type="primary" icon="plus" v-show="model.tzlx === undefined">查找带回</a-button>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="评定日期">
              <a-date-picker v-decorator="[ 'pdrq', validatorRules.pdrq ]" style="width: 100%" :disabled="this.disabled" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="组织标识">
              <a-input placeholder="请输入组织标识" v-decorator="['zzbz',{} ]" :disabled="this.disabled" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="组织名称">
              <j-tree-select
                v-decorator="['zzbz',validatorRules.zzbz]"
                placeholder="请选择组织名称"
                treeNodeFilterProp="title"
                dict="v_hr_bas_organization_cmms, zzjc, zzbz"
                :sszh="true"
                pid-field="sjzzbz"
                :showSearch="true"
                :treeDefaultExpandAll=true
                :disabled="this.disabled"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="岗位标识">
              <a-input placeholder="请输入岗位标识" v-decorator="['gwbz',{} ]" :disabled="this.disabled" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="岗位名称">
              <j-dict-select-tag
                v-decorator="['gwbz',validatorRules.gwbz]"
                placeholder="请选择岗位名称"
                dictCode="Hr_bas_post,gwmc,gwbz"
                :triggerChange="true"
                :disabled="this.disabled"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="员工工号">
              <a-input placeholder="请输入员工工号" v-decorator="['yggh', validatorRules.yggh ]" :disabled="this.disabled" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="员工姓名">
              <a-input placeholder="请输入员工姓名" v-decorator="['ygxm', {}]" :disabled="this.disabled" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="指标标识">
              <a-input placeholder="请输入指标标识" v-decorator="['sjxid', validatorRules.sjxid ]" :disabled="this.disabled" />
              <a-button @click="FindBackZbid" type="primary" icon="plus" v-show="model.tzlx === undefined">查找带回</a-button>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="指标名称">
              <a-input placeholder="请输入指标名称" v-decorator="['sjxmc', {}]" :disabled="this.disabled" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="调整类型">
              <j-dict-select-tag v-decorator="['tzlx', validatorRules.tzlx]" :triggerChange="true" placeholder="请选择调整类型"
                                 dictCode="tzlx"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="调整值">
              <a-input placeholder="请输入调整值" v-decorator="['tzz', validatorRules.tzz]" />
            </a-form-item>
          </a-col>
        </a-row>


      </a-form>
    </a-spin>


    <account-info ref="accountInfo" @close="colseWindow"></account-info>
    <account-info-zbid ref="accountInfoZbid" @close="colseZbid"></account-info-zbid>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import AccountInfo from './AccountInfo'
  import AccountInfoZbid from './AccountInfoZbid'

  export default {
    name: "ZbsjtzModal",
    components: {
      JTreeSelect,AccountInfo,AccountInfoZbid
    },
    data () {
      return {
        title:"操作",
        visible: false,
        disabled: false,
        flag: false,
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
        pdzq:{rules: [{ required: true, message: '请输入评定周期!' }]},
        pdrq:{rules: [{ required: true, message: '请输入评定日期!' }]},
        zzbz:{rules: [{ required: true, message: '请输入组织标识!' }]},
        gwbz:{rules: [{ required: true, message: '请输入岗位标识!' }]},
        yggh:{rules: [{ required: true, message: '请输入员工工号!' }]},
        sjxid:{rules: [{ required: true, message: '请输入数据项ID!' }]},
        tzlx:{rules: [{ required: true, message: '请选择调整类型!' }]},
          tzz:{rules: [{ required: true, message: '请输入调整值!' }]},
        },
        url: {
          add: "/zbsjtz/zbsjtz/add",
          edit: "/zbsjtz/zbsjtz/edit",
        },
      }
    },
    created () {
    },
    methods: {

      FindBack () {
        this.$refs.accountInfo.init()
      },

      colseWindow (args) {
        console.log(args)
       this.queryParam=args
        // this.queryParam.pdzq = args.pdzq
        // this.queryParam.pdrq = args.pdrq
        // this.queryParam.zzbz=args.zzbz
        // this.queryParam.zzbz_dictText=args.zzbz_dictText
        // this.queryParam.gwbz = args.gwbz
        // this.queryParam.gwbz_dictText = args.gwbz_dictText
        // this.queryParam.yggh = args.yggh
        // this.queryParam.ygxm = args.ygxm
        this.model = Object.assign({}, this.queryParam)
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'pdzq','pdrq','zzbz','zzbz_dictText','ygxm', 'yggh', 'gwbz','gwbz_dictText'))  // loadsh的pick方法
        })
      },
      FindBackZbid () {
        this.$refs.accountInfoZbid.init()
      },
      colseZbid(args){
        console.log(args)
        this.queryParam=args
        // this.queryParam.sjxid=args.sjxid
        // this.queryParam.sjxmc=args.sjxmc
        this.model = Object.assign({}, this.queryParam)
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'sjxid','sjxmc'))  // loadsh的pick方法
        })
      },



      add () {
        this.flag= true;
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'pdzq','zzbz','gwbz','yggh','khjlbz','ygxm','sjxid','sjxmc','tzz','tzlx'))
		  //时间格式化
          this.form.setFieldsValue({pdrq:this.model.pdrq?moment(this.model.pdrq):null})
          /*this.form.setFieldsValue({lrsj:this.model.lrsj?moment(this.model.lrsj):null})*/
        });

      },
      close () {
        this.$emit('close');
        this.visible = false;
        this.flag= false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(this.flag){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            console.log(httpurl)
            console.log(this.url.edit)
            if (httpurl==this.url.edit){
              formData.pdrq = formData.pdrq?formData.pdrq.format():null;
            }

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