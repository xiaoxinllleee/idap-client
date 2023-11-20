<template>
  <a-modal :title="title"
           :width="1200"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleOk"
           @cancel="handleCancel"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="16">
          <!--<a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="组织标识">
            <a-input placeholder="请输入组织标识" v-decorator="['zzbz', {}]" />
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属营销单元">
            <a-input placeholder="请输入所属营销单元" v-decorator="['ssyxdy', {}]" />
          </a-form-item></a-col>-->
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户编号" hasFeedback>
            <a-input placeholder="请输入客户编号" v-decorator="['custid', {}]" />
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="户主客户编号" hasFeedback>
            <a-input placeholder="请输入户主客户编号" v-decorator="['hzcustid', {}]" />
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="与户主关系" hasFeedback>
            <j-dict-select-tag placeholder="请选择与户主关系" v-decorator="['yhzgx', {}]" dictCode="yhzgx" :triggerChange="true"/>
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否户主" hasFeedback>
            <j-dict-select-tag placeholder="请选择是否户主" v-decorator="['sfhz', {}]" dictCode="sfbz" :triggerChange="true"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户名称" hasFeedback>
            <a-input placeholder="请输入客户名称" v-decorator="['khmc', {}]" />
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件号码" hasFeedback>
            <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="性别" hasFeedback>
            <j-dict-select-tag placeholder="请选择性别" v-decorator="['xb', {}]" :triggerChange="true" dictCode="sex"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="年龄" hasFeedback>
            <a-input placeholder="请输入年龄" v-decorator="['nl', {}]" />
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系方式" hasFeedback>
            <a-input placeholder="请输入联系方式" v-decorator="['lxfs', {}]" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="住址" hasFeedback>
            <a-input placeholder="请输入住址" v-decorator="['zz', {}]" />
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否用信" hasFeedback>
            <j-dict-select-tag placeholder="请选择是否用信" v-decorator="['sfyx', {}]" dictCode="sfbz" :triggerChange="true"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款余额" hasFeedback>
            <a-input-number placeholder="请输入贷款余额" v-decorator="['dkye', {}]" :min="0" style="width: 100%;" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否开通存款业务" hasFeedback>
            <j-dict-select-tag placeholder="请选择是否开通存款业务" v-decorator="['sfktckyw', {}]" :triggerChange="true" dictCode="sfbz"/>
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="存款余额" hasFeedback>
            <a-input-number placeholder="请输入存款余额" v-decorator="['ckye', {}]" :min="0" style="width: 100%;" />
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="存款日平余额" hasFeedback>
            <a-input-number placeholder="请输入存款日平余额" v-decorator="['ckrpye', {}]" :min="0" style="width: 100%;" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <!--<a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="最近贷款到期日期">
            <a-date-picker v-decorator="[ 'zjdkdqrq', {}]" />
          </a-form-item></a-col>-->
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="不良贷款余额" hasFeedback>
            <a-input-number placeholder="请输入不良贷款余额" v-decorator="['bldkye', {}]" :min="0" style="width: 100%;" />
          </a-form-item></a-col>
          <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="表外不良贷款余额" hasFeedback>
            <a-input-number placeholder="请输入表外不良贷款余额" v-decorator="['bwbldkye', {}]" :min="0" style="width: 100%;" />
          </a-form-item></a-col>
        </a-row>
        <a-list-item class="DefaultListItem" term="家庭成员情况">家庭成员情况</a-list-item>
        <a-divider style="margin-top: 5px; margin-bottom: 5px;"/>
        <a-table size="middle"
                 :columns="columns"
                 :dataSource="data"
                 rowKey="zjhm"
                 :pagination="false"
                 :bordered="true"/>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction, getAction } from '@/api/manage'
  import pick from 'lodash.pick'

  export default {
    name: "WyxkhxxModal",
    data () {
      return {
        title:"操作",
        visible: false,
        disableSubmit: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
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
          add: "/khgl/wyxkhxx/add",
          edit: "/khgl/wyxkhxx/edit",
          queryByHzcustid: "/khgl/wyxkhxx/queryByHzcustid",
        },
        columns: [
          {
            title: '客户编号',
            dataIndex: 'custid',
            key: 'custid',
            width: '10%',
            align: "center",
          },
          {
            title: '客户名称',
            dataIndex: 'khmc',
            key: 'khmc',
            width: '10%',
            align: "center",
          },
          {
            title: '证件号码',
            dataIndex: 'zjhm',
            key: 'zjhm',
            width: '15%',
            align: "center",
          },
          {
            title: '与户主关系',
            dataIndex: 'yhzgx_dictText',
            key: 'yhzgx_dictText',
            width: '10%',
            align: "center",
          },
          {
            title: '联系方式',
            dataIndex: 'lxfs',
            key: 'lxfs',
            width: '15%',
            align: "center",
          },
          {
            title: '是否用信',
            dataIndex: 'sfyx_dictText',
            key: 'sfyx_dictText',
            width: '10%',
            align: "center",
          },
          {
            title: '贷款余额',
            dataIndex: 'dkye',
            key: 'dkye',
            width: '15%',
            align: "center",
          },
        ],
        data: [],
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
        if (this.model.hzcustid) {
          //查询家庭成员
          let params = {hzcustid: this.model.hzcustid}
          //获取家庭成员信息
          getAction(this.url.queryByHzcustid, params).then((res)=>{
            if(res.success) {
              this.data = res.result
            }
          })
        }
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'custid','hzcustid','yhzgx','sfhz','khmc','zjhm','xb','nl','lxfs','zz','sfyx','dkye',
            'sfktckyw','ckye','ckrpye','cknrpye','bldkye','bwbldkye'
          ))
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
            formData.lrsj = formData.lrsj?formData.lrsj.format():null;

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
  .DefaultListItem {
    color: #1890FF;
    font-weight: 500;
    font-size: 14px;
  }
</style>