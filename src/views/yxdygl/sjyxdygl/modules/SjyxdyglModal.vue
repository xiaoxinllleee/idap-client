<template>
  <a-modal :title="title"
           :width="600"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="一级营销单元" hasFeedback>
          <j-dict-select-tag placeholder="请选择一级营销单元" v-decorator="['yjyxdybh', validatorRules.yjyxdybh]" dict-code="YXDYGL_YJYXDYGL,DYMC,DYBH" :show-search="true" :trigger-change="true"
                             @change="onchangeByYjyxdy"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="二级营销单元" hasFeedback>
          <j-dict-select-tag placeholder="请选择二级营销单元" v-decorator="['ejyxdybh', validatorRules.ejyxdybh]" :dict-code="this.ejyxdybh_dict_code" :show-search="true" :trigger-change="true"
                             @change="querySszhByEjyxdybh" :disabled="disabled_ejyxdy"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属支行" hasFeedback>
          <j-tree-select placeholder="请输入所属支行" v-decorator="['sszh', validatorRules.sszh]" dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ" pidField="sjzzbz" :treeDefaultExpandAll="true" :disabled="disabled"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="单元编号" hasFeedback>
          <a-input placeholder="请输入单元编号" v-decorator="['dybh', validatorRules.dybh]" :disabled="disabled_dybh"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="单元名称" hasFeedback>
          <a-input placeholder="请输入单元名称" v-decorator="['dymc', validatorRules.dymc]"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注" hasFeedback>
          <a-textarea placeholder="请输入备注" v-decorator="['bz', {}]"/>
        </a-form-item>

        <!--<a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="农户数">
          <a-input placeholder="请输入农户数" v-decorator="['nhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="农户建档数">
          <a-input placeholder="请输入农户建档数" v-decorator="['nhjds', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="农户建档覆盖率">
          <a-input placeholder="请输入农户建档覆盖率" v-decorator="['nhjdfgl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商户数">
          <a-input placeholder="请输入商户数" v-decorator="['shs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商户建档数">
          <a-input placeholder="请输入商户建档数" v-decorator="['shjds', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商户建档覆盖率">
          <a-input placeholder="请输入商户建档覆盖率" v-decorator="['shjdfgl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="城区居民">
          <a-input placeholder="请输入城区居民" v-decorator="['cqjm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="城区居民建档数">
          <a-input placeholder="请输入城区居民建档数" v-decorator="['cqjmjds', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="城区居民建档覆盖率">
          <a-input placeholder="请输入城区居民建档覆盖率" v-decorator="['cqjmjdfgl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="企业数">
          <a-input placeholder="请输入企业数" v-decorator="['qys', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="企业建档数">
          <a-input placeholder="请输入企业建档数" v-decorator="['qyjds', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="企业建档覆盖率">
          <a-input placeholder="请输入企业建档覆盖率" v-decorator="['qyjdfgl', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构数">
          <a-input placeholder="请输入机构数" v-decorator="['jgs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构建档数">
          <a-input placeholder="请输入机构建档数" v-decorator="['jgjds', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构建档覆盖率">
          <a-input placeholder="请输入机构建档覆盖率" v-decorator="['jgjdfgl', {}]" />
        </a-form-item>-->
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '../../../../components/jeecg/JTreeSelect'
  import { getAction, putAction } from '../../../../api/manage'
  import { duplicateCheck } from '@/api/api'

  export default {
    name: "YxdyglSjyxdyglModal",
    components: { JTreeSelect },
    data () {
      return {
        title:"操作",
        visible: false,
        disabled: false,
        disabled_ejyxdy: true,
        disabled_dybh: false,
        disableSubmit: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        model: {},
        // 1-新增/2-修改
        okType: "",
        sszh: "",
        yjyxdybh: "",
        ejyxdybh: "",
        ejyxdybh_dict_code: "YXDYGL_EJYXDYGL,DYMC,DYBH",
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        validatorRules:{
          sszh: {rules: [{ required: true, message: '请选择所属支行!😅' }]},
          yjyxdybh: {rules: [{ required: true, message: '请选择一级营销单元!😅' }]},
          ejyxdybh: {rules: [{ required: true, message: '请选择二级营销单元!😅' }]},
          dybh: {rules: [
            { required: true, message: '请输入单元编号!😅' },
            { validator: this.validataCode }
          ]},
          dymc: {rules: [{ required: true, message: '请输入单元名称!😅' }]},
        },
        url: {
          add: "/yxdygl/sjyxdygl/add",
          edit: "/yxdygl/sjyxdygl/edit",
          querySszh: "/yxdygl/sjyxdygl/querySszh",
        },
      }
    },
    created () {},
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(
            this.model,
            'sszh','yjyxdybh','ejyxdybh','dymc','dybh','bz'
            // ,'nhs','nhjds','nhjdfgl','shs','shjds','shjdfgl','cqjm','cqjmjds','cqjmjdfgl','qys','qyjds','qyjdfgl','jgs','jgjds','jgjdfgl'
          ))
		      // 时间格式化
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
      // TODO 获取一级单元编号作为二级营销单元下拉筛选条件
      onchangeByYjyxdy: function(value) {
        // TODO 重复选择一级营销单元时清除二级营销单元
        this.form.setFieldsValue({
          ejyxdybh: "",
          sszh: ""
        });
        if (value) {
          this.ejyxdybh_dict_code = "YXDYGL_EJYXDYGL,DYMC,DYBH,YJYXDYBH = " + value;
        }
        this.disabled_ejyxdy = false;
      },
      // TODO 查询二级营销单元所属支行
      querySszhByEjyxdybh: function(value) {
        getAction(this.url.querySszh, { ejyxdybh: value }).then((res) => {
          if (res.success) {
            this.form.setFieldsValue({
              sszh: res.result[0].sszh
            });
          }
        });
      },
      validataCode: function(rule, value, callback) {
        var params = {
          tableName: 'YXDYGL_SJYXDYGL',
          fieldName: 'dybh',
          fieldVal: value,
          dataId: this.model.dybh,
        };
        // 新增时
        if (this.okType == "1") {
          if (params.fieldVal != null && params.fieldVal != 'undefined') {
            duplicateCheck(params).then((res) => {
              if (res.success) {
                callback();
              } else {
                callback(res.message);
              }
            });
          } else {
            callback();
          }
        } else {
          callback();
        }
      },
    }
  }
</script>

<style lang="less" scoped>

</style>