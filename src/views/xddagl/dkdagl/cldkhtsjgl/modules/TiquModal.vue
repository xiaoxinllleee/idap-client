<template>
  <a-modal
    :title="title"
    :width="500"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :keyboard="false"
    :maskClosable="false"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="确认"
    cancelText="取消">
      <a-form-item label="请输入页码范围">
        <a-input-number placeholder="Minimum" v-model="ymbegin"
                        style="width: 40%; text-align: center" :min="0" />
        <a-input placeholder="~"
                 style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                 disabled />
        <a-input-number placeholder="Maximum" v-model="ymend"
                        style="width: 40%; text-align: center; border-left: 0" :min="0" />
      </a-form-item>
      <a-form-item label="请输入加密密码">
        <a-input-password v-model="password"></a-input-password>
      </a-form-item>
  </a-modal>
</template>

<script>
  import AInputPassword from "ant-design-vue/es/input/Password";
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import pick from 'lodash.pick'

  export default {
    name: "jiamiModal",
    components: {JeecgListMixin, AInputPassword},
    data() {
      return {
        wjlj: '',
        title: '提取',
        visible: false,
        confirmLoading: false,
        password: '',
        ymbegin: '',
        ymend: '',
        form: this.$form.createForm(this),
      }
    },
    methods: {
      init() {
        this.visible = true
      },
      close() {
        this.$emit('close');
        this.visible = false;
        this.record = {};
        this.password = '';
      },
      handleCancel() {
        this.close()
      },
      // handleOk() {
      //   let password = this.password
      //   let ymbegin = this.ymbegin
      //   let ymend = this.ymend
      //   console.log(this.password)
      //   if (this.ymbegin == null || this.ymbegin == "" || this.ymend == null || this.ymend == ""){
      //     this.$message.warning("请输入页面范围！")
      //   }else if(this.password==null||this.password==""){
      //     this.$message.warning("请输入密码！")
      //   }else{
      //     window.open(
      //       `${window._CONFIG['downloadJmtqWJDomainURL']}/`+ this.wjlj+"?passWord="+password+"&ymbegin="+ymbegin+"&ymend="+ymend
      //     )
      //     this.visible = false;
      //     this.password='';
      //   }
      //
      // }
      handleOk() {
        console.log(this.password)
        if (this.ymbegin == null || this.ymbegin == ""||this.ymend == null || this.ymend == ""){
          this.$message.warning("请输入页码范围！")
        }
        if (this.password == null || this.password == "") {
          this.$message.warning("请输入密码！")
        } else {
          this.$emit('ok', {password: this.password,ymbegin:this.ymbegin,ymend:this.ymend,wjlj: this.wjlj});
          this.visible = false;
          this.password = '';
          this.ymbegin = '';
          this.ymend = ''
        }
      }
    }
  }
</script>

<style scoped>

</style>