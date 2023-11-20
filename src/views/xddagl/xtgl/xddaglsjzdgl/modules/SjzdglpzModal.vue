<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    

      <a-form :form="form">

        <a-tabs defaultActiveKey="1" >
          <a-tab-pane tab="" key="1">
            <a-form-item :show="showit"
                         :labelCol="labelCol"
                         :wrapperCol="wrapperCol">
              <a-button @click="addRowCustom" icon="plus">添加</a-button>&nbsp;
            </a-form-item>
            <a-form-item
              label="字典编码">
              <a-input  v-decorator="['dictCode',{} ]" disabled="disabled"/>
            </a-form-item>

            <div>
              <a-row type="flex" style="margin-bottom:10px" :gutter="16">
                <a-col :span="7">名称</a-col>
                <a-col :span="7">数据值</a-col>
                <a-col :span="4">操作</a-col>
              </a-row>
              <a-row type="flex" style="margin-bottom:10px" :gutter="16" v-for="(item, index) in sjzdglpzList" :key="index">

                <a-col :span="7">
                  <a-form-item>
                    <a-input placeholder="请输入名称" v-decorator="['sjzdglpzList['+index+'].dictKey',{'initialValue':item.dictKey,rules:[{ required: true, message: '请输入名称!'}]}]"/>
<!--
                    <a-input placeholder="请输入名称" v-model="item.dictKey"/>
-->
                  </a-form-item>
                </a-col>
                <a-col :span="7">
                  <a-form-item>
                    <a-input placeholder="请输入数据值" v-decorator="['sjzdglpzList['+index+'].dictValue', {'initialValue':item.dictValue,rules:[{ required: true, message: '请输入数据值!'}]}]"/>

                    <!--
                                        <a-input placeholder="请输入数据值" v-model="item.dictValue"/>
                    -->
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
        </a-tabs>
      </a-form>

  </a-modal>
</template>

<script>
  import { httpAction,getAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JUploadOne from '@/components/jeecg/JUploadOne'

  export default {
    name: "SjzdglpzModal",
    components: { JUploadOne,moment },
    data () {
      return {
        title:"操作",
        visible: false,
        showit :false,
        model: {},
        sjzdglpzList: [],
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
          add: "/sjzdglpz/sjzdglpz/add",
          edit: "/xddaglsjzdgl/xddaglsjzdgl/edit",
          listByDictCode:"/xddaglsjzdgl/xddaglsjzdgl/listByDictCode",
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
        //this.sjzdglpzList = [{}];
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'dictCode','dictKey','dictValue'))
		  //时间格式化
        });
        this.listByDictCode()

      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      listByDictCode(){
        getAction(this.url.listByDictCode,{"dictCode":this.model.dictCode}).then(res=>{
          console.log(res)
          this.sjzdglpzList = res.result;
        })
      },
      handleOk () {
        //console.log(this.sjzdglpzList)


        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.dictCode){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }


            let formData = Object.assign(that.model, values);
            console.log(formData);


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

      addRowCustom () {
        this.sjzdglpzList.push({});
        this.$forceUpdate();
      },
      delRowCustom (index) {
        console.log(index)
        this.sjzdglpzList.splice(index,1);
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