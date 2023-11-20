<template>
  <a-modal
    :title="title"
    :width="1500"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
      <a-row>
        <a-col :span="12" :gutter="8">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="指标ID">
            <a-input-group>
              <a-row :gutter="8">
                <a-col :span="8">
                  <a-input placeholder="请输入指标ID" v-decorator="['zbid', validatorRules.zbid ]" readOnly/>
                </a-col>
                <a-col :span="16">
                  <a-input-search placeholder="请输入指标名称" v-decorator="['zbmc', {}]" @search="FindBack" readOnly>
                    <a-button type="primary" slot="enterButton">
                      查找带回
                    </a-button>
                  </a-input-search>
                </a-col>
              </a-row>
            </a-input-group>
            <!--<a-button @click="FindBack" type="primary" icon="plus">查找带回</a-button>-->
          </a-form-item>
        </a-col>
      </a-row>

        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="指标维度">
              <j-dict-select-tag placeholder="请输入指标维度" v-decorator="['zbwd', {}]" :triggerChange="true" dictCode="zbwd"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="指标类型">
              <j-dict-select-tag placeholder="请输入指标类型" v-decorator="['zblx', {}]" :triggerChange="true" dict-code="jx_zblx"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="考核方式">
              <j-dict-select-tag placeholder="请输入考核方式" v-decorator="['khfs', {}]" :triggerChange="true" dict-code="khfs"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="区域代码">
              <a-input placeholder="请输入区域代码" v-decorator="['qydm', validatorRules.qydm ]" />
            </a-form-item>
          </a-col>
        </a-row>

          <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="明细计算sql">
              <a-textarea placeholder="请输入明细计算SQL" v-decorator="['mxjssql', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="结果计算sql">
              <a-textarea placeholder="请输入结果计算SQL" v-decorator="['jgjssql', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

          <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="得分计算SQL">
              <a-textarea placeholder="请输入得分计算SQL" v-decorator="['dfjssql', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="工资计算SQL">
              <a-textarea placeholder="请输入工资计算SQL" v-decorator="['gzjssql', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

          <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="明细计算说明">
              <a-input placeholder="请输入明细计算说明" v-decorator="['mxjssm', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="结果计算说明">
              <a-input placeholder="请输入结果计算说明" v-decorator="['jgjssm', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

         <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="得分计算说明">
              <a-input placeholder="请输入得分计算说明" v-decorator="['dfjssm', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="工资计算说明">
              <a-input placeholder="请输入工资计算说明" v-decorator="['gzsjsm', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

         <a-row>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否启用">
              <j-dict-select-tag placeholder="请选择是否启用" v-decorator="['sfqy', {}]" :triggerChange="true" dictCode="sfqy" />
            </a-form-item>
          </a-col>
          <a-col :span="12" :gutter="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="执行顺序">
              <a-input placeholder="请输入执行顺序" v-decorator="['zxsx', {}]" />
            </a-form-item>
          </a-col>
        </a-row>


      </a-form>
    </a-spin>

    <account-zbid ref="accountZbid" @close="colseZbid"></account-zbid>

  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@comp/jeecg/JTreeSelect'
  import AccountZbid from './AccountZbid'
  import ATextarea from "ant-design-vue/es/input/TextArea";
  import store from '@/store/'

  export default {
    name: "ErpBasSjxAreaModal",
    components: {
      ATextarea,
      JTreeSelect,AccountZbid
    },
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
        zbid:{rules: [{ required: true, message: '请输入指标ID!' }]},
        qydm:{rules: [{ required: true, message: '请输入区域代码!' }]},
        },
        url: {
          add: "/zbljgl/erpBasSjxArea/add",
          edit: "/zbljgl/erpBasSjxArea/edit",
        },
      }
    },
    created () {
      let qybm = store.getters.qybm
    },
    methods: {
      FindBack(){
        this.$refs.accountZbid.init()
      },
      add () {
        this.edit({qydm: store.getters.qybm, sfqy: '1', zxsx: 0});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'zbid','zbwd','zblx','khfs','qydm','mxjssql','jgjssql','dfjssql','gzjssql','mxjssm','jgjssm','dfjssm','gzsjsm','sfqy','zxsx'))
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
      colseZbid(args){
        console.log(args)
        this.queryParam=args
        this.model = Object.assign({}, this.queryParam)
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'zbid','zbmc'))  // loadsh的pick方法
        })
      },


    }
  }
</script>

<style lang="less" scoped>

</style>