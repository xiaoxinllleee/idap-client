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
          label="组合户数">
          <a-input placeholder="请输入组合户数" v-decorator="['zhhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="组合余额">
          <a-input placeholder="请输入组合余额" v-decorator="['zhye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="统计月份">
          <a-date-picker v-decorator="[ 'tjyf', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构代码">
          <a-input placeholder="请输入机构代码" v-decorator="['jgdm', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="表内贷款总户数">
          <a-input placeholder="请输入表内贷款总户数" v-decorator="['bndkzhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="表内贷款总额">
          <a-input placeholder="请输入表内贷款总额" v-decorator="['bndkzje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="个人客户贷款总户数">
          <a-input placeholder="请输入个人客户贷款总户数" v-decorator="['grkhdkzhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="个人客户贷款总余额">
          <a-input placeholder="请输入个人客户贷款总余额" v-decorator="['grkhdkzye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="个人客户贷款其中农户贷款户数">
          <a-input placeholder="请输入个人客户贷款其中农户贷款户数" v-decorator="['grkhdkqznhdkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="个人客户贷款其中农户贷款余额">
          <a-input placeholder="请输入个人客户贷款其中农户贷款余额" v-decorator="['grkhdkqznhdkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人客户贷款总户数">
          <a-input placeholder="请输入法人客户贷款总户数" v-decorator="['frkhdkzhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人客户贷款总余额">
          <a-input placeholder="请输入法人客户贷款总余额" v-decorator="['frkhdkzye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人客户贷款其中公司类贷款户数">
          <a-input placeholder="请输入法人客户贷款其中公司类贷款户数" v-decorator="['frkhdkqzgsldkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="法人客户贷款其中公司类贷款余额">
          <a-input placeholder="请输入法人客户贷款其中公司类贷款余额" v-decorator="['frkhdkqzgsldkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="农业类贷款户数">
          <a-input placeholder="请输入农业类贷款户数" v-decorator="['nyldkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="农业类贷款余额">
          <a-input placeholder="请输入农业类贷款余额" v-decorator="['nyldkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="制造业贷款户数">
          <a-input placeholder="请输入制造业贷款户数" v-decorator="['zzydkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="制造业贷款余额">
          <a-input placeholder="请输入制造业贷款余额" v-decorator="['zzydkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="服务业贷款户数">
          <a-input placeholder="请输入服务业贷款户数" v-decorator="['fwydkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="服务业贷款余额">
          <a-input placeholder="请输入服务业贷款余额" v-decorator="['fwydkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="房地产开发贷户数">
          <a-input placeholder="请输入房地产开发贷户数" v-decorator="['fdckfdhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="房地产开发贷余额">
          <a-input placeholder="请输入房地产开发贷余额" v-decorator="['fdckfdye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="政府公共服务类户数">
          <a-input placeholder="请输入政府公共服务类户数" v-decorator="['zfggfwlhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="政府公共服务类余额">
          <a-input placeholder="请输入政府公共服务类余额" v-decorator="['zfggfwlye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="基础设施建设贷款户数">
          <a-input placeholder="请输入基础设施建设贷款户数" v-decorator="['jcssjsdkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="基础设施建设贷款余额">
          <a-input placeholder="请输入基础设施建设贷款余额" v-decorator="['jcssjsdkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="县市及以上政府重点项目贷款户数">
          <a-input placeholder="请输入县市及以上政府重点项目贷款户数" v-decorator="['xsjyszfzdxmdkhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="县市及以上政府重点项目贷款余额">
          <a-input placeholder="请输入县市及以上政府重点项目贷款余额" v-decorator="['xsjyszfzdxmdkye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其他户数">
          <a-input placeholder="请输入其他户数" v-decorator="['qths', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其他余额">
          <a-input placeholder="请输入其他余额" v-decorator="['qtye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单户50万以下户数">
          <a-input placeholder="请输入单户50万以下户数" v-decorator="['dhwswyxhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单户50万以下余额">
          <a-input placeholder="请输入单户50万以下余额" v-decorator="['dhwswyxye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单户50万元至500万户数">
          <a-input placeholder="请输入单户50万元至500万户数" v-decorator="['dhwswzwbwhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单户50万元至500万余额">
          <a-input placeholder="请输入单户50万元至500万余额" v-decorator="['dhwswzwbwye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单户500万元至1000万户数">
          <a-input placeholder="请输入单户500万元至1000万户数" v-decorator="['dhwbwzyqwhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单户500万元至1000万余额">
          <a-input placeholder="请输入单户500万元至1000万余额" v-decorator="['dhwbwzyqwye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单户1000万元以上户数">
          <a-input placeholder="请输入单户1000万元以上户数" v-decorator="['dhyqwyxhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单户1000万元以上余额">
          <a-input placeholder="请输入单户1000万元以上余额" v-decorator="['dhyqwyxye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="信用户数">
          <a-input placeholder="请输入信用户数" v-decorator="['xyhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="信用余额">
          <a-input placeholder="请输入信用余额" v-decorator="['xyye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="保证户数">
          <a-input placeholder="请输入保证户数" v-decorator="['bzhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="保证余额">
          <a-input placeholder="请输入保证余额" v-decorator="['bzye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="抵押户数">
          <a-input placeholder="请输入抵押户数" v-decorator="['dyhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="抵押余额">
          <a-input placeholder="请输入抵押余额" v-decorator="['dyye', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="质押户数">
          <a-input placeholder="请输入质押户数" v-decorator="['zyhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="质押余额">
          <a-input placeholder="请输入质押余额" v-decorator="['zyye', {}]" />
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
    name: "RepYwbbZhzcdkjgqkbModal",
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
          add: "/dkjkpt.tjcx.sgqfgtj.zhzcdkjgqkb/repYwbbZhzcdkjgqkb/add",
          edit: "/dkjkpt.tjcx.sgqfgtj.zhzcdkjgqkb/repYwbbZhzcdkjgqkb/edit",
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
          this.form.setFieldsValue(pick(this.model,'zhhs','zhye','jgdm','bndkzhs','bndkzje','grkhdkzhs','grkhdkzye','grkhdkqznhdkhs','grkhdkqznhdkye','frkhdkzhs','frkhdkzye','frkhdkqzgsldkhs','frkhdkqzgsldkye','nyldkhs','nyldkye','zzydkhs','zzydkye','fwydkhs','fwydkye','fdckfdhs','fdckfdye','zfggfwlhs','zfggfwlye','jcssjsdkhs','jcssjsdkye','xsjyszfzdxmdkhs','xsjyszfzdxmdkye','qths','qtye','dhwswyxhs','dhwswyxye','dhwswzwbwhs','dhwswzwbwye','dhwbwzyqwhs','dhwbwzyqwye','dhyqwyxhs','dhyqwyxye','xyhs','xyye','bzhs','bzye','dyhs','dyye','zyhs','zyye'))
		  //时间格式化
          this.form.setFieldsValue({tjyf:this.model.tjyf?moment(this.model.tjyf):null})
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
            formData.tjyf = formData.tjyf?formData.tjyf.format():null;
            
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