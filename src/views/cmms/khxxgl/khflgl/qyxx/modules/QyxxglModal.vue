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
                label="企业名称">
                <a-input placeholder="请输入企业名称" v-decorator="['qymc', {}]" />
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
                <j-dict-select-tag placeholder="请选择经营状态" v-decorator="['jyzt', {}]"  :triggerChange="true" dict-code="jyzt_qd"/>
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="注册资本">
                <a-input placeholder="请输入注册资本" v-decorator="['zczb', {}]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="注册时间">
                <a-date-picker v-decorator="[ 'zcsj', {}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="企业联系电话：">
                <a-input placeholder="请输入企业联系电话" v-decorator="['qylxdh', {}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="法人联系电话">
                <a-input placeholder="请输入法人联系电话" v-decorator="['frlxdh', {}]" />
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
                label="注册地址">
                <a-input placeholder="请输入注册地址" v-decorator="['zcdz', {}]" />
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
                label="企业类型">
                <j-dict-select-tag placeholder="请选择企业类型" v-decorator="['qylx', {}]"  :triggerChange="true" dict-code="qylx_qd"/>
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
  import JTreeSelect from "@comp/jeecg/JTreeSelect";
  import JTreeSelectNotJg from "@comp/jeecg/JTreeSelectNotJg";

  export default {
    name: "QyxxglModal",
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
          add: "/qyxx/qyxxgl/add",
          edit: "/qyxx/qyxxgl/edit",
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
          this.form.setFieldsValue(pick(this.model,'wgbh','jgdm','qymc','fddbr','frzjhm','tyshxydm','yyzz','nsrsbh','zzjgdm','zch','jyzt','zczb','qylxdh','frlxdh','yxdz','gdyxdz','zcdz','cbrs','qylx','sshy','cym','wz','jyfw','bz','dabh','infoRate','xtpdjg','xtpdsm','sszh','longitude','latitude','bysxqx','sxdxzjh','sxdxmc','lrr','xgr','zclx','zcpgj','zhpfr','pfr','fwgzr','khqzyw','dkxq','dkxqed','qyrs','qyjysr','thywqk','sszb','qyxdz','jbzhsfzwh','sfcx','jycdsyq','jycdmj','qyzc','qyfz','qyjylr','zyyecp','qyzcdjlx'))
		  //时间格式化
          this.form.setFieldsValue({zcsj:this.model.zcsj?moment(this.model.zcsj):null})
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
            formData.zcsj = formData.zcsj?formData.zcsj.format():null;

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