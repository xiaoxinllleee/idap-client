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
          label="统计月份">
          <a-date-picker v-decorator="[ 'tjyf', validatorRules.tjyf ]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="宏观产业政策户数">
          <a-input placeholder="请输入宏观产业政策户数" v-decorator="['hgcyzchs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="宏观产业政策金额">
          <a-input placeholder="请输入宏观产业政策金额" v-decorator="['hgcyzcje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="企业经营管理户数">
          <a-input placeholder="请输入企业经营管理户数" v-decorator="['qyjyglhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="企业经营管理金额">
          <a-input placeholder="请输入企业经营管理金额" v-decorator="['qyjyglje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其客户涉及民间融资户数">
          <a-input placeholder="请输入其客户涉及民间融资户数" v-decorator="['khsjmjrzhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其客户涉及民间融资金额">
          <a-input placeholder="请输入其客户涉及民间融资金额" v-decorator="['khsjmjrzje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其它客观性因素户数">
          <a-input placeholder="请输入其它客观性因素户数" v-decorator="['qtkgyshs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其它客观性因素金额">
          <a-input placeholder="请输入其它客观性因素金额" v-decorator="['qtkgysje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="制度缺失户数">
          <a-input placeholder="请输入制度缺失户数" v-decorator="['zdqshshs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="制度缺失金额">
          <a-input placeholder="请输入制度缺失金额" v-decorator="['zdqshsje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="决策失误户数">
          <a-input placeholder="请输入决策失误户数" v-decorator="['jcswhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="决策失误金额">
          <a-input placeholder="请输入决策失误金额" v-decorator="['jcswje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="信贷人员违规户数">
          <a-input placeholder="请输入信贷人员违规户数" v-decorator="['xdrywghs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="信贷人员违规金额">
          <a-input placeholder="请输入信贷人员违规金额" v-decorator="['xdrywgje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="风险意识淡薄户数">
          <a-input placeholder="请输入风险意识淡薄户数" v-decorator="['fxysdbhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="风险意识淡薄金额">
          <a-input placeholder="请输入风险意识淡薄金额" v-decorator="['fxysdbje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="管理交接不规范户数">
          <a-input placeholder="请输入管理交接不规范户数" v-decorator="['gljjbgfhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="管理交接不规范金额">
          <a-input placeholder="请输入管理交接不规范金额" v-decorator="['gljjbgfje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其它主观原因户数">
          <a-input placeholder="请输入其它主观原因户数" v-decorator="['qtzgyyhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="其它主观原因金额">
          <a-input placeholder="请输入其它主观原因金额" v-decorator="['qtzgyyje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="企业户数">
          <a-input placeholder="请输入企业户数" v-decorator="['qyhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="企业金额">
          <a-input placeholder="请输入企业金额" v-decorator="['qyje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="农户户数">
          <a-input placeholder="请输入农户户数" v-decorator="['nhhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="农户金额">
          <a-input placeholder="请输入农户金额" v-decorator="['nhje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="自然人户数">
          <a-input placeholder="请输入自然人户数" v-decorator="['zrrhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="自然人金额">
          <a-input placeholder="请输入自然人金额" v-decorator="['zrrje', {}]" />
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
          label="其他金额">
          <a-input placeholder="请输入其他金额" v-decorator="['qtje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公司类客户户数">
          <a-input placeholder="请输入公司类客户户数" v-decorator="['gslhs', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="公司类客户金额">
          <a-input placeholder="请输入公司类客户金额" v-decorator="['gslje', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="新型农业经营主体户数">
          <a-input placeholder="请输入新型农业经营主体户数" v-decorator="['xxnyjyzths', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="新型农业经营主体金额">
          <a-input placeholder="请输入新型农业经营主体金额" v-decorator="['xxnyjyztje', {}]" />
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
    name: "QhBnbldkJgqkb2Modal",
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
        tjyf:{rules: [{ required: true, message: '请输入统计月份!' }]},
        },
        url: {
          add: "/dkjkpt.tjcx.sgqfgtj.qhbnbldkjgqkb2/qhBnbldkJgqkb2/add",
          edit: "/dkjkpt.tjcx.sgqfgtj.qhbnbldkjgqkb2/qhBnbldkJgqkb2/edit",
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
          this.form.setFieldsValue(pick(this.model,'hgcyzchs','hgcyzcje','qyjyglhs','qyjyglje','khsjmjrzhs','khsjmjrzje','qtkgyshs','qtkgysje','zdqshshs','zdqshsje','jcswhs','jcswje','xdrywghs','xdrywgje','fxysdbhs','fxysdbje','gljjbgfhs','gljjbgfje','qtzgyyhs','qtzgyyje','qyhs','qyje','nhhs','nhje','zrrhs','zrrje','qths','qtje','gslhs','gslje','xxnyjyzths','xxnyjyztje'))
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