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
      <a-form-item label="请输入加密密码">
        <a-input-password v-model="password"></a-input-password>
      </a-form-item>
  </a-modal>
</template>

<script>
  import AInputPassword from "ant-design-vue/es/input/Password";
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import pick from 'lodash.pick'
  import {getAction} from "@/api/manage";

  export default {
    name: "jiamiModal",
    components: {JeecgListMixin, AInputPassword},
    data(){
      return{
        wjlj:'',
        title:'加密',
        visible: false,
        confirmLoading: false,
        password: '',
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
        this.password='';
      },
      handleCancel() {
        this.close()
      },
      handleOk() {
        console.log(this.password)
        if(this.password==null||this.password==""){
          this.$message.warning("请输入密码！")
        }else{
          this.$emit('ok',this.password);
          this.visible = false;
          this.password='';
        }

      }
    }
  }

</script>

<style scoped>

</style>