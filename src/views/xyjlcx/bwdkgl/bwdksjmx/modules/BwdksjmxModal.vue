<template>
  <a-modal
    :title="title"
    :width="1100"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-card class="card" :bordered="false">
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构代码">
          <!--<a-input placeholder="请输入机构代码" v-decorator="['jgdm', {}]" />-->
          <j-tree-select
            v-decorator="['jgdm',{}]"
            placeholder="请选择机构"
            treeNodeFilterProp="title"
            dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
            :sszh="true"
            pid-field="sjywjgdm"
            :showSearch="true"
            :treeDefaultExpandAll=true
            :disabled="this.disabled"
          />
        </a-form-item>
            </a-col>
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户名称">
          <a-input placeholder="请输入客户名称" v-decorator="['khmc', {}]" :disabled="this.disabled" />
        </a-form-item>
            </a-col>
          </a-row>
            <a-row class="form-row" :gutter="24">
              <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件类型">
          <!--<a-input placeholder="请输入证件类型" v-decorator="['zjlx', {}]" />-->
          <j-dict-select-tag v-decorator="[ 'zjlx', {}]" :triggerChange="true" placeholder="请选择证件类型"
                             dictCode="dkjkpt_zjlx"/>
        </a-form-item>
              </a-col>
              <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" />
        </a-form-item>
              </a-col>
            </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系方式">
          <a-input placeholder="请输入联系方式" v-decorator="['lxfs', {}]" />
        </a-form-item>
            </a-col>
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户地址">
          <a-input placeholder="请输入客户地址" v-decorator="['khdz', {}]" />
        </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户状况">
          <a-input placeholder="请输入客户状况" v-decorator="['khzk', {}]" />
        </a-form-item>
            </a-col>
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款账号">
          <a-input placeholder="请输入贷款账号" v-decorator="['dkzh', validatorRules.dkzh ]" :disabled="this.disabled" />
        </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款日期">
          <a-date-picker v-decorator="[ 'dkrq', {}]" style="width: 100%" />
        </a-form-item>
            </a-col>
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="到期日期">
          <a-date-picker v-decorator="[ 'dqrq', {}]" style="width: 100%" />
        </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="借款金额">
          <a-input placeholder="请输入借款金额" v-decorator="['jkje', {}]" />
        </a-form-item>
            </a-col>
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="核心余额">
          <a-input placeholder="请输入核心余额" v-decorator="[ 'hxye', {}]" :disabled="this.disabled" />
        </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="转入表外日期">
          <a-date-picker v-decorator="[ 'zrbwrq', {}]" style="width: 100%" />
        </a-form-item>
            </a-col>
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="转入表外类型">
          <!--<a-input placeholder="请输入转入表外类型" v-decorator="['zrbwlx', {}]" />-->
          <j-dict-select-tag v-decorator="['zrbwlx', {}]" :triggerChange="true" placeholder="请选择转入表外类型"
                             dictCode="zrbw"/>
        </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款投向">
          <a-input placeholder="请输入贷款投向" v-decorator="['dktx', {}]" />
        </a-form-item>
            </a-col>
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="包收责任人">
          <a-input placeholder="请输入包收责任人" v-decorator="['bszrr', {}]" />
        </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="管理责任人">
          <a-input placeholder="请输入管理责任人" v-decorator="['glzrr', {}]" />
        </a-form-item>
            </a-col>
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最近催收日期">
          <a-date-picker v-decorator="[ 'zjcsrq', {}]" style="width: 100%" />
        </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="诉讼时效">
          <!--<a-input placeholder="请输入诉讼时效" v-decorator="['sssx', {}]" />-->
          <j-dict-select-tag v-decorator="['sssx', {}]" :triggerChange="true" placeholder="请选择诉讼时效"
                             dictCode="sssx"/>
        </a-form-item>
            </a-col>
            <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="诉讼时效到期日">
          <a-date-picker v-decorator="[ 'sssxdqr', {}]" style="width: 100%" />
        </a-form-item>
            </a-col>
          </a-row>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="情况说明">
          <a-input placeholder="请输入情况说明" v-decorator="['qksm', {}]" />
        </a-form-item>
        </a-card>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import ACol from "ant-design-vue/es/grid/Col";
  import JTreeSelect from '@/components/jeecg/JTreeSelect'

  export default {
    name: "BwdksjmxModal",
    components: {
      ACol,JTreeSelect
    },
    data () {
      return {
        title:"操作",
        visible: false,
        disabled:false,
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
        dkzh:{rules: [{ required: true, message: '请输入贷款账号!' }]},
        },
        url: {
          add: "/bwdksjmx/bwdksjmx/add",
          edit: "/bwdksjmx/bwdksjmx/edit",
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
          this.form.setFieldsValue(pick(this.model,'jgdm','khmc','zjlx','zjhm','lxfs','khdz','khzk','dkzh','jkje','hxye','zrbwlx','dktx','bszrr','glzrr','sssx','qksm'))
		  //时间格式化
          this.form.setFieldsValue({dkrq:this.model.dkrq?moment(this.model.dkrq):null})
          this.form.setFieldsValue({dqrq:this.model.dqrq?moment(this.model.dqrq):null})
          this.form.setFieldsValue({zrbwrq:this.model.zrbwrq?moment(this.model.zrbwrq):null})
          this.form.setFieldsValue({zjcsrq:this.model.zjcsrq?moment(this.model.zjcsrq):null})
          this.form.setFieldsValue({sssxdqr:this.model.sssxdqr?moment(this.model.sssxdqr):null})
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
            if(!this.model.dkzh){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.dkrq = formData.dkrq?formData.dkrq.format():null;
            formData.dqrq = formData.dqrq?formData.dqrq.format():null;
            formData.zrbwrq = formData.zrbwrq?formData.zrbwrq.format():null;
            formData.zjcsrq = formData.zjcsrq?formData.zjcsrq.format():null;
            formData.sssxdqr = formData.sssxdqr?formData.sssxdqr.format():null;
            
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