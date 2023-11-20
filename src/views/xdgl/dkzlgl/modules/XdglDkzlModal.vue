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
        <a-form-item :show="showit">
          <a-button @click="addRowCustom" icon="plus">添加</a-button>&nbsp;
        </a-form-item>
        <div>
          <a-row type="flex" style="margin-bottom:10px" :gutter="16">
            <a-col :span="4">贷款类型</a-col>
            <a-col :span="4">资料类型</a-col>
            <a-col :span="7">备注</a-col>
            <a-col :span="4">附件</a-col>
            <a-col :span="4">操作</a-col>
          </a-row>
          <a-row type="flex" style="margin-bottom:10px" :gutter="16" v-for="(item, index) in orderMainModel.dkzlfjxxList" :key="index">
            <a-col :span="4">
              <a-form-item>
                <j-dict-select-tag  v-decorator="['dkzlfjxxList['+index+'].dklx', {'initialValue':item.dklx}]" :triggerChange="true" placeholder="请选择贷款类型" dictCode="xdgl_dklx"/>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item>
                <j-dict-select-tag  v-decorator="['dkzlfjxxList['+index+'].zllx', {'initialValue':item.zllx}]" :triggerChange="true" placeholder="请选择资料类型" dictCode="xdgl_zllx"/>
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item>
                <a-input placeholder="备注" v-decorator="['dkzlfjxxList['+index+'].bz', {'initialValue':item.bz}]"/>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item>
                <JUploadOne
                  v-decorator="['dkzlfjxxList['+index+'].fwlj', {'initialValue':item.fwlj},{rules: [{ required: true, message: '请上传附件!' }]}]"
                  text="上传附件"
                  bizPath="dkzl"
                  class="upload-list-inline"
                  @change="UploadChange"
                />
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item>
                <a-button @click="addRowCustom" icon="plus"></a-button>&nbsp;
                <a-button @click="delRowCustom(index)" icon="minus"></a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <!--<a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="贷款类型">
          <j-dict-select-tag  v-decorator="['dklx', {}]" :triggerChange="true" placeholder="请选择贷款类型" dictCode="xdgl_dklx"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资料类型">
          <j-dict-select-tag  v-decorator="['zllx', {}]" :triggerChange="true" placeholder="请选择资料类型" dictCode="xdgl_zllx"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注">
          <a-input placeholder="请输入备注" v-decorator="['bz', {}]" />
        </a-form-item>-->
<!--
        <a-tabs defaultActiveKey="1" >
          <a-tab-pane tab="客户信息" key="1">
            <div>
              <a-row type="flex" style="margin-bottom:10px" :gutter="16">
                <a-col :span="4">贷款类型</a-col>
                <a-col :span="4">资料类型</a-col>
                <a-col :span="7">备注</a-col>
                <a-col :span="4">附件</a-col>
                <a-col :span="4">操作</a-col>
              </a-row>
              <a-row type="flex" style="margin-bottom:10px" :gutter="16" v-for="(item, index) in orderMainModel.dkzlfjxxList" :key="index">
                <a-col :span="4">
                  <a-form-item>
                    <j-dict-select-tag  v-decorator="['dkzlfjxxList['+index+'].dklx', {'initialValue':item.dklx}]" :triggerChange="true" placeholder="请选择贷款类型" dictCode="xdgl_dklx"/>
                  </a-form-item>
                </a-col>
                <a-col :span="4">
                  <a-form-item>
                    <j-dict-select-tag  v-decorator="['dkzlfjxxList['+index+'].zlxl', {'initialValue':item.zlxl}]" :triggerChange="true" placeholder="请选择资料类型" dictCode="xdgl_zllx"/>
                  </a-form-item>
                </a-col>
                <a-col :span="7">
                  <a-form-item>
                    <a-input placeholder="备注" v-decorator="['dkzlfjxxList['+index+'].bz', {'initialValue':item.bz}]"/>
                  </a-form-item>
                </a-col>
                <a-col :span="4">
                  <a-form-item>
                    <JUploadOne
                      v-decorator="['dkzlfjxxList['+index+'].fwlj', {'initialValue':item.fwlj},{rules: [{ required: true, message: '请上传附件!' }]}]"
                      text="上传附件"
                      class="upload-list-inline"
                      @change="imageUploadChange"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="4">
                  <a-form-item>
                    <a-button @click="addRowCustom" icon="plus"></a-button>&nbsp;
                    <a-button @click="delRowCustom(index)" icon="minus"></a-button>
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </a-tab-pane>
        </a-tabs>-->


      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JUploadOne from '@/components/jeecg/JUploadOne'

  export default {
    name: "XdglDkzlModal",
    components: { JUploadOne,moment },
    data () {
      return {
        title:"操作",
        visible: false,
        showit :false,
        model: {},
        orderMainModel: {dkzlfjxxList: [{}], },
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
        },
        url: {
          add: "/xdgl/dkzlgl/xdglDkzl/add",
          edit: "/xdgl/dkzlgl/xdglDkzl/edit",
        },
      }
    },
    created () {
      this.init();
    },

    methods: {
      init(){
        this.showit=false;
      },
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.orderMainModel.dkzlfjxxList = [{}];
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'dklx','zllx','zlmc','bz'))
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


            let orderMainData = Object.assign(this.orderMainModel, values);

            var jsonObj=orderMainData.dkzlfjxxList;
            for (var i = 0; i < jsonObj.length; i++) {
              jsonObj[i].fwlj=jsonObj[i].fwlj?jsonObj[i].fwlj.path?jsonObj[i].fwlj.path:jsonObj[i].fwlj:'';
            }
            /*
                        let formData = Object.assign(this.model, values);
            */
            //时间格式化
            console.log(jsonObj)
            httpAction(httpurl,jsonObj,method).then((res)=>{
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
      addRowCustom () {
        this.orderMainModel.dkzlfjxxList.push({});
        this.$forceUpdate();
      },
      delRowCustom (index) {
        console.log(index)
        this.orderMainModel.dkzlfjxxList.splice(index,1);
        if(index==0){
          this.showit=true;
        }else{
          this.showit=false;
        }
        this.$forceUpdate();
      },

      UploadChange(data) {
        let path = data.path
        console.log(path)

      },

    }
  }
</script>

<style lang="less" scoped>

</style>