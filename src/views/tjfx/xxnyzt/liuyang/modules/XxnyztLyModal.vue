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
      
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="创建人">
          <a-input placeholder="请输入创建人" v-decorator="['creator', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="修改人">
          <a-input placeholder="请输入修改人" v-decorator="['updatot', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="网格编号">
          <a-input placeholder="请输入网格编号" v-decorator="['wgbh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="经营主体名称">
          <a-input placeholder="请输入经营主体名称" v-decorator="['ztmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="主体类别 家庭农场，专业合作社，农业产业化企业，农村集体经济组织，种养大户，其他">
          <a-input placeholder="请输入主体类别 家庭农场，专业合作社，农业产业化企业，农村集体经济组织，种养大户，其他" v-decorator="['ztlb', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="经营年限">
          <a-input placeholder="请输入经营年限" v-decorator="['jynx', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="社会信用代码">
          <a-input placeholder="请输入社会信用代码" v-decorator="['shxydm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="负责人名称">
          <a-input placeholder="请输入负责人名称" v-decorator="['khmc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="身份证号码">
          <a-input placeholder="请输入身份证号码" v-decorator="['zjhm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="婚姻状况">
          <a-input placeholder="请输入婚姻状况" v-decorator="['hyzk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系方式">
          <a-input placeholder="请输入联系方式" v-decorator="['sjhm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="认定情况 国家级，省级，市级，县级，无">
          <a-input placeholder="请输入认定情况 国家级，省级，市级，县级，无" v-decorator="['rdqk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="经营状态 存续，停业，注销，其他">
          <a-input placeholder="请输入经营状态 存续，停业，注销，其他" v-decorator="['jxzt', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否首贷户">
          <a-input placeholder="请输入是否首贷户" v-decorator="['sfsdh', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="经营地址">
          <a-input placeholder="请输入经营地址" v-decorator="['jydz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="经营用地根源">
          <a-input placeholder="请输入经营用地根源" v-decorator="['jyydgy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="流转土地面积（亩）">
          <a-input placeholder="请输入流转土地面积（亩）" v-decorator="['lztdmj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="流转土地成本（元/亩）">
          <a-input placeholder="请输入流转土地成本（元/亩）" v-decorator="['lztdcb', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="流转土地限期起">
          <a-date-picker v-decorator="[ 'lztdqxq', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="流转土地限期止">
          <a-date-picker v-decorator="[ 'lztdqxz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="经营行业：粮食栽种，畜牧水产养殖，菜果茶栽种，农资丶农机丶农机等社会化服务，药材丶花卉丶林木栽种，家庭休闲丶观光农业，农产品加工，贸易流通，其他">
          <a-input placeholder="请输入经营行业：粮食栽种，畜牧水产养殖，菜果茶栽种，农资丶农机丶农机等社会化服务，药材丶花卉丶林木栽种，家庭休闲丶观光农业，农产品加工，贸易流通，其他" v-decorator="['jyhy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其他经营品种及产值">
          <a-input placeholder="请输入其他经营品种及产值" v-decorator="['qtjypzjcz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="年经营收入">
          <a-input placeholder="请输入年经营收入" v-decorator="['njysr', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="利润总额">
          <a-input placeholder="请输入利润总额" v-decorator="['lrze', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="现金及存款">
          <a-input placeholder="请输入现金及存款" v-decorator="['xjjck', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应收账款">
          <a-input placeholder="请输入应收账款" v-decorator="['yszk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其他固定资产">
          <a-input placeholder="请输入其他固定资产" v-decorator="['qtgdzc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其他流动资产">
          <a-input placeholder="请输入其他流动资产" v-decorator="['qtldzc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资产合计">
          <a-input placeholder="请输入资产合计" v-decorator="['zchj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="本行借款">
          <a-input placeholder="请输入本行借款" v-decorator="['bhjk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="他行借款">
          <a-input placeholder="请输入他行借款" v-decorator="['thjk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其他借款">
          <a-input placeholder="请输入其他借款" v-decorator="['qtjk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="应付账款">
          <a-input placeholder="请输入应付账款" v-decorator="['yfzk', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其他负责">
          <a-input placeholder="请输入其他负责" v-decorator="['qtfz', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="为他人担保">
          <a-input placeholder="请输入为他人担保" v-decorator="['wtrdb', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="有无违法行为">
          <a-input placeholder="请输入有无违法行为" v-decorator="['ywwfxw', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="行业评价 好，较好，一般，差">
          <a-input placeholder="请输入行业评价 好，较好，一般，差" v-decorator="['hypj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="近2年人行征信逾期次数">
          <a-input placeholder="请输入近2年人行征信逾期次数" v-decorator="['rhyqcs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="内部征信逾期次数">
          <a-input placeholder="请输入内部征信逾期次数" v-decorator="['nbzxyqcs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否小额农贷">
          <a-input placeholder="请输入是否小额农贷" v-decorator="['sfxend', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评定等级">
          <a-input placeholder="请输入评定等级" v-decorator="['pddj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="授信金额">
          <a-input placeholder="请输入授信金额" v-decorator="['sxje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="初评等级">
          <a-input placeholder="请输入初评等级" v-decorator="['cpdj', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="初评金额">
          <a-input placeholder="请输入初评金额" v-decorator="['cpje', {}]" />
        </a-form-item>
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "XxnyztLyModal",
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
          add: "/qqq/xxnyztLy/add",
          edit: "/qqq/xxnyztLy/edit",
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
          this.form.setFieldsValue(pick(this.model,'creator','updatot','wgbh','ztmc','ztlb','jynx','shxydm','khmc','zjhm','hyzk','sjhm','rdqk','jxzt','sfsdh','jydz','jyydgy','lztdmj','lztdcb','jyhy','qtjypzjcz','njysr','lrze','xjjck','yszk','qtgdzc','qtldzc','zchj','bhjk','thjk','qtjk','yfzk','qtfz','wtrdb','ywwfxw','hypj','rhyqcs','nbzxyqcs','sfxend','pddj','sxje','cpdj','cpje'))
		  //时间格式化
          this.form.setFieldsValue({lztdqxq:this.model.lztdqxq?moment(this.model.lztdqxq):null})
          this.form.setFieldsValue({lztdqxz:this.model.lztdqxz?moment(this.model.lztdqxz):null})
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
            formData.lztdqxq = formData.lztdqxq?formData.lztdqxq.format():null;
            formData.lztdqxz = formData.lztdqxz?formData.lztdqxz.format():null;
            
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