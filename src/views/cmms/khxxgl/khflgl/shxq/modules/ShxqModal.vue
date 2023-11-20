<template>
  <j-modal :title="title"
           :visible="visible"
           :width="1400"
           :confirmLoading="confirmLoading"
           switchFullscreen
           :fullscreen="true"
           :destroyOnClose="true"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-card  title="基本信息">
          <a-row :gutter="24">
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="归属网格">
                <JTreeSelectNotJg placeholder="请选择归属网格"
                                  v-decorator="['wgbh', {}]"
                                  treeNodeFilterProp="title"
                                  pidField="PARENT_ID"
                                  dict="YXDYGL_MAIN,WGMC,ID"
                                  pidValue="0"
                                  :showSearch="true"
                                  :treeDefaultExpandAll="true"/>
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="归属机构">
                <j-tree-select placeholder="请选择所属机构"
                               v-decorator="['jgdm', {}]"
                               treeNodeFilterProp="title"
                               pid-field="sjywjgdm"
                               dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                               :showSearch="true"
                               :treeDefaultExpandAll="true"/>
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="商户名称">
                <a-input placeholder="请输入商户名称" v-decorator="['shmc', {}]" />
              </a-form-item>
            </a-col>

          </a-row>
          <a-row :gutter="24">
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="法定代表人">
                <a-input placeholder="请输入法定代表人" v-decorator="['fddbr', {}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="法人证件号码">
                <a-input placeholder="请输入法人证件号码" v-decorator="['frzjhm', {}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="统一社会信用代码">
                <a-input placeholder="请输入统一社会信用代码" v-decorator="['tyshxydm', {}]" />
              </a-form-item>
            </a-col>

          </a-row>
          <a-row :gutter="24">
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="营业执照">
                <a-input placeholder="请输入营业执照" v-decorator="['yyzz', {}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="纳税人识别号">
                <a-input placeholder="请输入纳税人识别号" v-decorator="['nsrsbh', {}]" />
              </a-form-item>
            </a-col>

            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="组织机构代码">
                <a-input placeholder="请输入组织机构代码" v-decorator="['zzjgdm', {}]" />
              </a-form-item>
            </a-col>

          </a-row>
          <a-row :gutter="24">
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="注册号">
                <a-input placeholder="请输入注册号" v-decorator="['zch', {}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="经营状态">
                <j-dict-select-tag placeholder="请选择经营状态" v-decorator="['jyzt', {}]"  :triggerChange="true" dict-code="jyzt"/>
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="注册资本">
                <a-input placeholder="请输入注册资本" v-decorator="['zccb', {}]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="成立日期">
                <a-date-picker v-decorator="[ 'clrq', {}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="联系方式">
                <a-input placeholder="请输入联系方式" v-decorator="['lsfs', {}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="更多联系方式">
                <a-input placeholder="请输入更多联系方式" v-decorator="['gdlsfs', {}]" />
              </a-form-item>
            </a-col>

          </a-row>
          <a-row :gutter="24">
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="邮箱地址">
                <a-input placeholder="请输入邮箱地址" v-decorator="['yxdz', {}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="更多邮箱地址">
                <a-input placeholder="请输入更多邮箱地址" v-decorator="['gdyxdz', {}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="地址">
                <a-input placeholder="请输入地址" v-decorator="['dz', {}]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="参保人数">
                <a-input placeholder="请输入参保人数" v-decorator="['cbrs', {}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="商户类型">
                <j-dict-select-tag placeholder="请选择商户类型" v-decorator="['shlx', {}]"  :triggerChange="true" dict-code="qylx"/>
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="所属行业">
                <a-input placeholder="请输入所属行业" v-decorator="['sshy', {}]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24" >
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="曾用名">
                <a-input placeholder="请输入曾用名" v-decorator="['cym', {}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="网址">
                <a-input placeholder="请输入网址" v-decorator="['wz', {}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="经营范围">
                <a-input placeholder="请输入经营范围" v-decorator="['jyfw', {}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="商户分类">
                <j-dict-select-tag placeholder="请输入商户分类" v-decorator="['shfl', {}]"  :triggerChange="true" dict-code="shgl_shfl"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :lg="24">
              <a-form-item
                label="备注">
                <a-input placeholder="请输入备注" v-decorator="['bz', {}]" />
              </a-form-item>
            </a-col>

          </a-row>



        </a-card>

      </a-form>
    </a-spin>
  </j-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JTreeSelectNotJg from '@/components/jeecg/JTreeSelectNotJg'
  export default {
    name: "ShcjxxModal",
    components: {
      JTreeSelect,JTreeSelectNotJg
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
        },
        url: {
          add: "/khflgl/shxq/add",
          edit: "/khflgl/shxq/edit",
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
          this.form.setFieldsValue(pick(this.model,'wgbh','jgdm','shmc','fddbr','frzjhm','tyshxydm','yyzz','nsrsbh','zzjgdm','zch','jyzt','zccb','lsfs','gdlsfs','yxdz','gdyxdz','dz','cbrs','shlx','sshy','cym','wz','jyfw','bz','dabh'))
		  //时间格式化
          this.form.setFieldsValue({clrq:this.model.clrq?moment(this.model.clrq):null})
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
            formData.clrq = formData.clrq?formData.clrq.format():null;

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