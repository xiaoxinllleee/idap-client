<template>
  <a-modal :title="title"
           :width="1000"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="一级营销单元" hasFeedback>
              <j-dict-select-tag placeholder="请选择一级营销单元" v-decorator="['yjyxdybh', validatorRules.yjyxdybh]" dict-code="YXDYGL_YJYXDYGL,DYMC,DYBH" :show-search="true" :trigger-change="true"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属支行" hasFeedback>
              <j-tree-select placeholder="请输入所属支行" v-decorator="['sszh', validatorRules.sszh]" dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ" pidField="sjzzbz" :treeDefaultExpandAll="true"></j-tree-select>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="单元性质" hasFeedback>
              <j-dict-select-tag placeholder="请选择单元性质" v-decorator="['dyxz', validatorRules.dyxz]" dict-code="ejyxdyxz" :trigger-change="true"></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="单元编号" hasFeedback>
              <a-input placeholder="请输入单元编号" v-decorator="['dybh', validatorRules.dybh]" :disabled="this.disabled_dybh"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="单元名称" hasFeedback>
              <a-input placeholder="请输入单元名称" v-decorator="['dymc', validatorRules.dymc]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="责任部室" hasFeedback>
              <j-multi-select-tag placeholder="请选择责任部室(可多选)" v-decorator="['zrbs', {}]" dict-code="HR_BAS_ORGANIZATION,ZZJC,ZZBZ,ZZLB=3"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="责任领导" hasFeedback>
              <a-input hidden="true" v-model="this.model.zrld"/>
              <j-select-zrld-list placeholder="请选择责任领导(可多选)" ref="zrld" v-model="zrld" @change="GetValueForZrld" :treeDefaultExpandAll="true" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="村委书记" hasFeedback>
              <a-input placeholder="请输入村委书记" v-decorator="['cwsj', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="村委主任" hasFeedback>
              <a-input placeholder="请输入村委主任" v-decorator="['cwzr', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="村委办公室主任" hasFeedback>
              <a-input placeholder="请输入村委办公室主任" v-decorator="['cwbgszr', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="网格位置" hasFeedback>
              <a-input placeholder="请输入网格位置" v-decorator="['wgwz', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="网格面积" hasFeedback>
              <a-input placeholder="请输入网格面积" v-decorator="['wgmj', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="网格情况" hasFeedback>
              <a-textarea placeholder="请输入网格情况" v-decorator="['wgqk', {}]" :rows="5"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="网格痛点分析" hasFeedback>
              <a-textarea placeholder="请输入网格痛点分析" v-decorator="['wgtdfx', {}]" :rows="5"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注" hasFeedback>
              <a-textarea placeholder="请输入备注" v-decorator="['bz', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

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
  import { duplicateCheck } from '@/api/api'
  import JMultiSelectTag from '../../../../components/dict/JMultiSelectTag'
  import JSelectZrldList from '../../YxdyglComponents/JSelectZrldList'
  import JSelectYgxx from '../../../../components/jeecgbiz/JSelectYgxx'

  export default {
    name: "YxdyglEjyxdyglModal",
    components: { JMultiSelectTag, JTreeSelect, JSelectZrldList, JSelectYgxx },
    data () {
      return {
        title:"操作",
        visible: false,
        disabled: false,
        disableSubmit: false,
        disabled_dybh: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        okType: "",
        zrld: "",
        model: {},
        labelCol: {
          xs: { span: 12 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 12 },
          sm: { span: 18 },
        },
        validatorRules:{
          yjyxdybh: {rules: [{ required: true, message: '请选择所属一级营销单元!😅' }]},
          sszh: {rules: [{ required: true, message: '请选择营销单元所属支行!😅' }]},
          dyxz: {rules: [{ required: true, message: '请选择单元性质!😅' }]},
          dybh: {rules: [
            { required: true, message: '请输入单元编号!😅' },
            { validator: this.validataCode }
          ]},
          dymc: {rules: [{ required: true, message: '请输入单元名称!😅' }]},
        },
        url: {
          add: "/yxdygl/ejyxdygl/add",
          edit: "/yxdygl/ejyxdygl/edit",
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
        this.zrld = this.model.zrld_dictText;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,
            'yjyxdybh','sszh','dyxz','dybh','dymc','zrbs','zrld','bz',
            'cwsj','cwzr','cwbgszr','wgwz','wgmj','wgqk','wgtdfx'
            // ,'nhs','nhjds','nhjdfgl','shs','shjds','shjdfgl','cqjm','cqjmjds','cqjmjdfgl','qys','qyjds','qyjdfgl','jgs','jgjds','jgjdfgl'
          ))
        });
      },
      close () {
        this.$emit('close');
        this.visible = false;
        this.zrld = null;
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
              httpurl +=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
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
      // TODO 表单字段重复校验
      validataCode: function(rule, value, callback) {
        var params = {
          tableName: 'YXDYGL_EJYXDYGL',
          fieldName: 'dybh',
          fieldVal: value,
          dataId: this.model.dybh,
        };
        // TODO 新增时,若单元编号未填入任何值,则无需发送表单字段重复验证
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
      GetValueForZrld: function(value) {
        console.log("责任领导工号：["+this.model.zrld+"]");
        console.log("责任领导姓名：["+this.zrld+"]");
        this.zrld = value.ygxm;
        this.model.zrld = value.yggh;
      },
    }
  }
</script>

<style lang="less" scoped>

</style>