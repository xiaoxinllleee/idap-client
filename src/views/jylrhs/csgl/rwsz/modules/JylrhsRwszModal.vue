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
          label="任务年份">
<!--          <a-date-picker v-decorator="[ 'missionYear', validatorRules.missionYear ]" />-->
          <a-select placeholder="请选择任务年份" v-decorator="['missionYear', validatorRules.missionYear]" @change="selectValue" :allowClear="true" :disabled='opEdit'>
            <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务机构">
<!--          <a-input placeholder="请输入业务机构" v-decorator="['jgdm', validatorRules.jgdm ]" />-->
          <a-input v-if='opEdit' placeholder='业务机构' v-decorator="['jgdm_dictText', validatorRules.jgdm ]" disabled/>
          <j-tree-select v-else
                         placeholder="请选择业务机构"
                         pid-field="sjywjgdm_b"
                         :showSearch="true"
                         treeNodeFilterProp="title"
                         v-decorator="['jgdm', validatorRules.jgdm ]"
                         dict="v_hr_bas_organization,zzjc,ywjgdm"
                         condition='{"sjywjgdm": "ywjgdm"}'
                         :tree-default-expand-all="true"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="任务阈值(万元)">
<!--          <a-input placeholder="请输入任务阈值" v-decorator="['missionValue', {}]" />-->
          <a-input-number placeholder="请输入任务阈值" v-decorator="['missionValue', validatorRules.missionValue]" :step='1' :precision='2' style='width: 100%;'/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注">
<!--          <a-input placeholder="请输入备注" v-decorator="['remark', {}]" />-->
          <a-textarea placeholder="请输入备注" v-decorator="['remark', {}]" :row='4'/>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JTreeSelect from '@comp/jeecg/JTreeSelect.vue'
  import notification from 'ant-design-vue/lib/notification'

  export default {
    name: "JylrhsRwszModal",
    components: { JTreeSelect },
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
        opEdit: true,
        triggerChange: true,
        rwnf: undefined,
        defaultYear: undefined,

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
          missionYear:{rules: [{ required: true, message: '请选择任务年份!' }]},
          jgdm:{rules: [{ required: true, message: '请选择业务机构!' }]},
        },
        url: {
          add: "/jylrhs/csgl/rwsz/add",
          edit: "/jylrhs/csgl/rwsz/edit",
        },
      }
    },
    created () {
      this.init();
    },
    methods: {
      add () {
        this.opEdit = false
        this.edit({});
      },
      edit (record) {
        this.rwnf = record.missionYear;
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'jgdm_dictText','missionValue','remark'))
          this.form.setFieldsValue({ sxed: this.model.sxed ? this.model.sxed : 0 })
		      //时间格式化
          let date = new Date
          let year = date.getFullYear()
          // this.form.setFieldsValue({missionYear:this.model.missionYear?moment(this.model.missionYear):null})
          this.form.setFieldsValue({ missionYear: this.model.missionYear ? record.missionYear.slice(0, 4) : year })
        });

      },
      close () {
        this.opEdit = true
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
            if(!this.opEdit){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            // formData.missionYear = formData.missionYear?formData.missionYear.format():null;
            // formData.oprationTime = formData.oprationTime?formData.oprationTime.format():null;
            formData.missionYear = formData.missionYear ? moment(formData.missionYear+'-01-01').format('YYYY-MM-DD') : null
            console.log(formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                // that.$message.success(res.message);
                notification.success({ message: '系统提示', description:res.message, duration: 4})
                that.close()
                that.$emit('ok')
              }else{
                // that.$message.warning(res.message);
                notification.warning({ message: '系统提示', description:res.message, duration: 4})
              }
            }).finally(() => {
              that.confirmLoading = false;
              // that.close();
            })
          }
        })
      },
      handleCancel () {
        this.close()
      },

      //获取当前年份
      init() {
        let date = new Date
        let year = date.getFullYear()
        this.initYear(year)
      },
      //初始化年份下拉框
      initYear(year) {
        this.years = []
        for (let i = 0; i < 30; i++) {
          this.years.push({ value: ((year - i) + ''), label: ((year - i) + '') })
        }
      },
      //年份下拉选择
      selectValue(value) {
        this.$emit('change', value)
      },
    }
  }
</script>

<style lang="less" scoped>

</style>