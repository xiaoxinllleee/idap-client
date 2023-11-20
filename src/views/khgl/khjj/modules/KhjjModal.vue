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
        <!--  <a-row class="form-row" :gutter="16">
            <a-col :lg="8">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="所属支行">
            <a-input placeholder="请输入所属支行" v-decorator="['sszh', {}]" />
          </a-form-item>
            </a-col>
            <a-col :lg="8">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="所属营销单元">
            <a-input placeholder="请输入所属营销单元" v-decorator="['ssyxdy', {}]" />
          </a-form-item>
            </a-col>
          </a-row>-->


        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="原客户经理">
          <a-input placeholder="请输入原客户经理" v-decorator="['ykhjl', {}]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="新客户经理">
          <a-input placeholder="请输入新客户经理" v-decorator="['xkhjl', {}]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="新营销单元">
          <a-select :defaultValue="provinceData[0]" style="width: 120px"  @change="handleProvinceChange" v-decorator="['xyxdy', {}]">
            <a-select-option  v-for="province in provinceData" :key="province">{{province}}</a-select-option>
          </a-select>
          <a-select v-model="secondCity" style="width: 120px" v-decorator="['xyxdy', {}]">
            <a-select-option v-for="city in cities" :key="city">{{city}}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="变更原因">
          <a-textarea  placeholder="请输入变更原因" v-decorator="['bgyy', {}]" />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import ATextarea from "ant-design-vue/es/input/TextArea";

  const provinceData = ['Zhejiang', 'Jiangsu'];
  const cityData = {
    Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
    Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
  };

  export default {
    components: {ATextarea},
    name: "KhjjModal",
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },

        provinceData,
        cityData,
        cities: cityData[provinceData[0]],
        secondCity: cityData[provinceData[0]][0],

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        },
        url: {
          add: "/khgl.khjj/khjj/add",
          edit: "/khgl.khjj/khjj/edit",
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
          this.form.setFieldsValue(pick(this.model,'sszh','ssyxdy','ykhjl','xkhjl','xyxdy','bgyy'))
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
      handleProvinceChange(value) {
        this.cities = cityData[value]
        this.secondCity = cityData[value][0]
      }

    }
  }
</script>

<style lang="less" scoped>

</style>