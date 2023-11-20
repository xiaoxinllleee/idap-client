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
        <a-row class="form-row" :gutter="0">
          <a-col :lg="12"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属支行">
            <a-input hidden="true"  v-model="this.model.sszh" />
            <a-input  v-model="this.sszhmc" :disabled="true" />
          </a-form-item>
          </a-col>
        <a-col :lg="12">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="区域代码">
          <a-input  v-model="this.model.qydm"  :disabled="true"/>
        </a-form-item>
        </a-col>

          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="一级营销单元编号">
              <a-input  hidden="true" v-model="this.model.yjyxdybh" />
              <a-input  v-model="this.yjyxdymc"  :disabled="true"  />
            </a-form-item>
          </a-col>
         <a-col :lg="12" v-if="sfktsjyxdy==1">
          <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="二级营销单元编号">
            <a-input  hidden="true" v-model="this.model.ejyxdybh" />
            <a-input  v-model="this.ejyxdymc" :disabled="true" />
        </a-form-item>
        </a-col>
          <a-col :lg="12" v-if="sfktsjyxdy!=1">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="二级营销单元编号">
              <a-input  hidden="true" v-model="this.model.ejyxdybh" />
              <j-select-ejyxdy :treeDefaultExpandAll="true"
                               v-model="ejyxdymc" @change="getValueejdybh"  />
            </a-form-item>
          </a-col>

          <a-col :lg="12" v-if="sfktsjyxdy==1">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="三级营销单元编号">
              <a-input  hidden="true" v-model="this.model.sjyxdybh" />
              <j-select-sjyxdy treeDefaultExpandAll="true"
                               v-model="sjyxdymc" @change="getValuesjdybh" />
            </a-form-item>
          </a-col>
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户经理">
              <a-input  hidden="true" v-model="this.model.khjl" />
              <j-select-ygxx    :treeDefaultExpandAll="true" ref="zkhjl"
                                v-model="zkhjl" @change="GetValueZkhjl"  ></j-select-ygxx>
            </a-form-item>
          </a-col>

          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否主客户经理">
              <j-dict-select-tag placeholder="请选择是否主客户经理"   v-decorator="['sfzkhjl', validatorRules.sfzkhjl]" :triggerChange="true" dictCode="sfbz"/>
            </a-form-item>
          </a-col>
        </a-row>


      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction,getAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JSelectYgxx from '@/components/jeecgbiz/JSelectYgxx'
  import JSelectEjyxdy from "./JSelectEjyxdy"
  import JSelectSjyxdy from "./JSelectSjyxdy"
  import { putAction } from '../../../../api/manage'


  export default {
    components:{JSelectYgxx,JSelectEjyxdy,JSelectSjyxdy},
    name: "YxdyglPqzrrglModal",
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        zkhjl: "",
        sszhmc: "",
        yjyxdymc: "",
        ejyxdymc: "",
        sjyxdymc: "",
        sfktsjyxdy: "",
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
          sfzkhjl:{rules: [{ required: true, message: '请输入是否主客户经理!' }]},
        },
        url: {
          add: "/yxdygl/yxdyglPqzrrgl/add",
          edit: "/yxdygl/yxdyglPqzrrgl/edit",
          queryCsz: "/yxdygl/yxdyglPqzrrgl/querycsz",
        },
      }
    },
    created () {},
    methods: {
      add () {

        this.edit({});
      },
      add2 () {
        this.sfktsjyxdy=2;
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.zkhjl=this.model.khjl_dictText
        this.sszhmc=this.model.sszh_dictText
        this.yjyxdymc=this.model.yjyxdybh_dictText
        this.ejyxdymc=this.model.ejyxdybh_dictText
        this.sjyxdymc=this.model.sjyxdybh_dictText
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'sszh','qydm','sfzkhjl','yjyxdybh','ejyxdybh','sjyxdybh'))
        });
      },
      //查询是否开通三级营销单元
      querycsz(){
        putAction(this.url.queryCsz,{"csbm":"CS0004"}).then(res => {
          console.log("---------")
          console.log(res.result.csz)
          this.sfktsjyxdy =res.result.csz
        });
      },
      close () {
        this.$emit('close');
        this.visible = false;
        this.zkhjl = null;
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
      GetValueZkhjl(value){
        console.log(value)
        this.zkhjl = value.ygxm
        this.model.khjl = value.yggh
      },
      getValueejdybh(value){
        this.model.yjyxdybh=value.yjdybh
        this.yjyxdymc = value.yjdymc
        this.model.ejyxdybh=value.dybh
        this.ejyxdymc = value.dymc
        this.model.sszh=value.sszh
        this.sszhmc=value.sszhmc
        // this.model.qydm = value.yjdybh+value.dybh
        this.model.qydm = value.dybh
      },
      getValuesjdybh(value){
        console.log(value)
        this.model.yjyxdybh=value.yjdybh
        this.yjyxdymc = value.yjdymc
        this.model.ejyxdybh=value.ejdybh
        this.ejyxdymc = value.ejdymc
        this.model.sjyxdybh=value.dybh
        this.sjyxdymc = value.dymc
        this.model.sszh=value.sszh
        this.sszhmc=value.sszhmc
        // this.model.qydm = value.yjdybh+value.ejdybh+value.dybh
        this.model.qydm = value.dybh
      },
      cs(){
        alert(1)
      }


    }
  }
</script>

<style lang="less" scoped>

</style>