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
        <a-row >
          <a-col >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户名称">
              <a-input placeholder="请输入客户名称" v-decorator="['khmc', {}]" />
            </a-form-item>
          </a-col>
          <a-col >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="证件号码">
              <a-input placeholder="请输入证件号码" v-decorator="['zjhm', validatorRules.zjhm ]"  />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row >
          <a-col >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否吸毒">
              <j-dict-select-tag  v-decorator="['sfxdry', {}]" :triggerChange="true" placeholder="请选择是否吸毒人员"
                                  dictCode="sfbz"/>
            </a-form-item>
          </a-col>

          <a-col >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否诉讼">
              <j-dict-select-tag  v-decorator="['sfss', {}]" :triggerChange="true" placeholder="请选择是否诉讼"
                                  dictCode="sfbz"/>
            </a-form-item>
          </a-col>


        </a-row>
        <a-row >
          <a-col >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否五保低保户">
              <j-dict-select-tag  v-decorator="['sfdb', {}]" :triggerChange="true" placeholder="请选择是否五保低保户"
                                  dictCode="sfbz"/>
            </a-form-item>
          </a-col>

          <a-col >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否特岗教师">
              <j-dict-select-tag  v-decorator="['sftgjs', {}]" :triggerChange="true" placeholder="请选择是否特岗教师"
                                  dictCode="sfbz"/>
            </a-form-item>
          </a-col>

        </a-row>
        <a-row >
          <a-col >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否党员">
              <j-dict-select-tag  v-decorator="['sfdy', {}]" :triggerChange="true" placeholder="请选择是否党员"
                                  dictCode="sfbz"/>
            </a-form-item>
          </a-col>


          <a-col >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否公职人员">
              <j-dict-select-tag  v-decorator="['sfgzry', {}]" :triggerChange="true" placeholder="请选择是否公职人员"
                                  dictCode="sfbz"/>
            </a-form-item>
          </a-col>

        </a-row>
        <a-row >


          <a-col >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否服刑人员">
              <j-dict-select-tag  v-decorator="['sffx', {}]" :triggerChange="true" placeholder="请选择是否服刑人员"
                                  dictCode="sfbz"/>
            </a-form-item>
          </a-col>


          <a-col >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否诈骗人员">
              <j-dict-select-tag  v-decorator="['sfzpry', {}]" :triggerChange="true" placeholder="请选择是否诈骗人员"
                                  dictCode="sfbz"/>
            </a-form-item>
          </a-col>

          <a-col >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否重大疾病">
              <j-dict-select-tag  v-decorator="['sfzdjb', {}]" :triggerChange="true" placeholder="请选择是否重大疾病"
                                  dictCode="sfbz"/>
            </a-form-item>
          </a-col>

          <a-col >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否涉案">
              <j-dict-select-tag  v-decorator="['sfsa', {}]" :triggerChange="true" placeholder="请选择是否涉案"
                                  dictCode="sfbz"/>
            </a-form-item>
          </a-col>
        </a-row>
<!--        <a-row >
          <a-col >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否开通POS机">
              <j-dict-select-tag  v-decorator="['sfktpos', {}]" :triggerChange="true" placeholder="请选择是否开通POS机"
                                  dictCode="sfbz"/>
            </a-form-item>
          </a-col>
          <a-col >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否开通聚合支付">
              <j-dict-select-tag  v-decorator="['sfktjhzf', {}]" :triggerChange="true" placeholder="请选择是否开通聚合支付"
                                  dictCode="sfbz"/>
            </a-form-item>
          </a-col>

        </a-row>
        <a-row >
          <a-col >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否办理E支付">
              <j-dict-select-tag  v-decorator="['sfblezf', {}]" :triggerChange="true" placeholder="请选择是否办理E支付"
                                  dictCode="sfbz"/>
            </a-form-item>
          </a-col>

          <a-col >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否办理E缴费">
              <j-dict-select-tag  v-decorator="['sfblejf', {}]" :triggerChange="true" placeholder="请选择是否办理E缴费"
                                  dictCode="sfbz"/>
            </a-form-item>
          </a-col>

        </a-row>
        <a-row >
          <a-col >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否办理助农终端">
              <j-dict-select-tag  v-decorator="['sfblznzd', {}]" :triggerChange="true" placeholder="请选择是否办理助农终端"
                                  dictCode="sfbz"/>
            </a-form-item>
          </a-col>
          <a-col >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否办理理财业务">
              <j-dict-select-tag  v-decorator="['sfbllcyw', {}]" :triggerChange="true" placeholder="请选择是否办理理财业务"
                                  dictCode="sfbz"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row >
          <a-col >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否办理代理保险业务">
              <j-dict-select-tag  v-decorator="['sfbldlbx', {}]" :triggerChange="true" placeholder="请选择是否办理代理保险业务"
                                  dictCode="sfbz"/>
            </a-form-item>
          </a-col>
          <a-col >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否关注我行公众号">
              <j-dict-select-tag  v-decorator="['sfgzgzh', {}]" :triggerChange="true" placeholder="请选择是否关注我行公众号"
                                  dictCode="sfbz"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row >
          <a-col >
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="患病记录">
              <a-input placeholder="请输入患病记录" v-decorator="['hbjl', {}]" />
            </a-form-item>
          </a-col>
        </a-row>-->
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "KhfjxxglModal",
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
        zjhm:{rules: [{ required: true, message: '请输入证件号码!' }]},
        },
        url: {
          add: "/khgl.khhmc/khfjxxgl/add",
          edit: "/khgl.khhmc/khfjxxgl/edit",
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
          this.form.setFieldsValue(pick(this.model,'khmc','sfsa','zjhm','sfxdry','sfpkh','sfdb','sfgzry','sfffjz','sfktxyk','sfktfmk','sfktsmf','sfktpos','sfktjhzf','sfblezf','sfblejf','sfblznzd','sfbllcyw','sfbldlbx','sfgzgzh','hbjl'))
		  //时间格式化
        });

      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        console.log(1111111111111111111)
        console.log(this.model.zjhm)
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.zjhm){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化

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