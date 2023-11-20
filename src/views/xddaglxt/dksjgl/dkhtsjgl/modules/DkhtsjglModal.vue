<template>
  <a-modal
    :title="title"
    :width="1600"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :okButtonProps="{ props: {disabled: disableSubmit} }"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row class="form-row" :gutter="24">
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构代码">
          <j-tree-select
            v-decorator="['jgdm',{}]"
            placeholder="请选择机构"
            treeNodeFilterProp="title"
            dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
            :sszh="true"
            pid-field="sjywjgdm"
            :showSearch="true"
            :treeDefaultExpandAll=true
            :disabled="true"
          />
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户姓名">
          <a-input placeholder="请输入客户姓名" v-decorator="['khmc', {}]" :disabled="true"/>
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件号码">
          <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" :disabled="true"/>
        </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="客户类型">
          <j-dict-select-tag placeholder="请输入客户类型" v-decorator="['khlx', {}]" dictCode="dkjkpt_khlx" :disabled="true"/>
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系电话">
          <a-input placeholder="请输入联系电话" v-decorator="['lxdh', {}]" />
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系地址">
          <a-input placeholder="请输入联系地址" v-decorator="['lxdz', {}]" />
        </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="签约日期">
          <a-date-picker v-decorator="[ 'qyrq', {}]" style="width: 100%" :disabled="true"/>
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同号">
          <a-input placeholder="请输入合同号" v-decorator="['hth', validatorRules.hth ]" :disabled="true"/>
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务编号">
          <a-input placeholder="请输入业务编号" v-decorator="['ywbh', {}]" :disabled="true"/>
        </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同开始日期">
          <a-date-picker v-decorator="[ 'fkrq', {}]" style="width: 100%" :disabled="true"/>
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="合同到期日期">
          <a-date-picker v-decorator="[ 'dqrq', {}]" style="width: 100%" :disabled="true"/>
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="签约期限">
          <a-input placeholder="请输入签约期限" v-decorator="['qyqx', {}]" :disabled="true"/>
        </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="签约金额">
          <a-input placeholder="请输入签约金额" v-decorator="['qyje', {}]" :disabled="true"/>
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据日期">
          <a-date-picker v-decorator="[ 'sjrq', {}]" style="width: 100%" :disabled="true"/>
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款金额">
          <a-input placeholder="请输入贷款金额" v-decorator="['dkje', {}]" :disabled="true"/>
        </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款余额">
          <a-input placeholder="请输入贷款余额" v-decorator="['dkye', {}]" :disabled="true"/>
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最早贷款日期">
          <a-date-picker v-decorator="[ 'zzdkrq', {}]" style="width: 100%" :disabled="true"/>
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最早到期日期">
          <a-date-picker v-decorator="[ 'zzdqrq', {}]" style="width: 100%" :disabled="true"/>
        </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款品种">
          <j-dict-select-tag placeholder="请选择贷款品种" v-decorator="['dkpz', {}]" :triggerChange="true" dictCode="dkzl"/>
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款品种(补充)">
          <j-dict-select-tag placeholder="请选择贷款品种(补充)" v-decorator="['dkpzbc', {}]" :triggerChange="true" dictCode="dkzlbc"/>
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="担保方式">
          <j-dict-select-tag placeholder="请选择担保方式" v-decorator="['dbfs', {}]" dictCode="dbfs" :disabled="true"/>
        </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款责任人工号">
          <a-input placeholder="请输入贷款责任人工号" v-decorator="['dkzrr', {}]" />
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否用信">
          <j-dict-select-tag placeholder="请输入是否用信" v-decorator="['sfsx', {}]" dictCode="yxzt" :disabled="true"/>
        </a-form-item>
          </a-col>
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="档案编号">
          <a-input placeholder="请输入档案编号" v-decorator="['dabh', {}]" :disabled="true"/>
        </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :lg="8">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否上传档案">
          <a-input placeholder="请输入是否上传档案" v-decorator="['sfscda', {}]" :disabled="true"/>
        </a-form-item>
          </a-col>
        </a-row>


        <!--<a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="类型">
          <a-input placeholder="请输入类型" v-decorator="['lx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="提取日期">
          <a-date-picker v-decorator="[ 'tqrq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款形态">
          <a-input placeholder="请输入贷款形态" v-decorator="['dkxt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="businessStatus">
          <a-input placeholder="请输入businessStatus" v-decorator="['businessStatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否启用授信">
          <a-input placeholder="请输入是否启用授信" v-decorator="['sfqysx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="审核状态">
          <a-input placeholder="请输入审核状态" v-decorator="['shzt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="录入时间">
          <a-date-picker v-decorator="[ 'lrsj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="录入标志">
          <a-input placeholder="请输入录入标志" v-decorator="['lrbz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="录入人">
          <a-input placeholder="请输入录入人" v-decorator="['lrr', {}]" />
        </a-form-item>-->

		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "DkhtsjglModal",
    components:{ JTreeSelect },
    data () {
      return {
        title:"操作",
        visible: false,
        disableSubmit: true,
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
        hth:{rules: [{ required: true, message: '请输入合同号!' }]},
        },
        url: {
          add: "/dkhtsjgl/dkhtsjgl/add",
          edit: "/dkhtsjgl/dkhtsjgl/edit",
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
          this.form.setFieldsValue(pick(this.model,'dkpzbc','dbfs','sfscda','dabh','jgdm','zjhm','khmc','khlx','lxdh','lxdz',
                                                    'hth','ywbh','qyqx','qyje','dkje','dkye','sfsx','dkzrr','dkpz'))
		  //时间格式化
          this.form.setFieldsValue({sjrq:this.model.sjrq?moment(this.model.sjrq):null})
          this.form.setFieldsValue({qyrq:this.model.qyrq?moment(this.model.qyrq):null})
          this.form.setFieldsValue({fkrq:this.model.fkrq?moment(this.model.fkrq):null})
          this.form.setFieldsValue({dqrq:this.model.dqrq?moment(this.model.dqrq):null})
          this.form.setFieldsValue({zzdkrq:this.model.zzdkrq?moment(this.model.zzdkrq):null})
          this.form.setFieldsValue({zzdqrq:this.model.zzdqrq?moment(this.model.zzdqrq):null})
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
            if(!this.model.hth){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.tqrq = formData.tqrq?formData.tqrq.format():null;
            formData.sjrq = formData.sjrq?formData.sjrq.format():null;
            formData.qyrq = formData.qyrq?formData.qyrq.format():null;
            formData.fkrq = formData.fkrq?formData.fkrq.format():null;
            formData.dqrq = formData.dqrq?formData.dqrq.format():null;
            formData.zzdkrq = formData.zzdkrq?formData.zzdkrq.format():null;
            formData.zzdqrq = formData.zzdqrq?formData.zzdqrq.format():null;
            //formData.lrsj = formData.lrsj?formData.lrsj.format():null;
            
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