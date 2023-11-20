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

        <div style="overflow: auto">

        <a-directory-tree
          style="height: 600px"
          selectable
          :defaultExpandAll="true"
          :checkable="true"
          :checkStrictly="false"
          v-model="checkedKeys"
          @check="onSelect"
          :dropdownStyle="{maxHeight:'200px',overflow:'auto'}"
          :treeData="departTree"
          v-if="!spinningZzjg"
        />
        </div>

		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import { getAction } from '../../../../../api/manage'
  import { queryDepartTreeList, searchByKeywords } from '@/api/api'
  export default {
    name: "PmaGwkhszModal",
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
        departTree: [],
        spinningZzjg: true,
        checkedKeys: [],
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        },
        url: {
          list:"gwxxgl/hrBasPost/listAll",
          add: "/jxkh/pmaGwkhsz/add",
          edit: "/jxkh/pmaGwkhsz/edit",
        },
      }
    },
    created () {
    },
    methods: {
      loadTree() {
        queryDepartTreeList().then((res) => {
          this.departTree = res.result
          this.spinningZzjg = false
        })
      },

      add () {
        this.loadTree()
        this.edit({});
      },
      edit (record) {
        this.loadTree()
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;


      },
      close () {
        this.$emit('close');
        this.visible = false;
      },

      onSelect(checkedKeys, e) {
        this.checkedKeys = checkedKeys
      },
      handleOk () {
        this.$emit('jgdm',this.checkedKeys)
        this.close()

        /*const that = this;
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
        })*/
      },
      handleCancel () {
        this.close()
      },


    }
  }
</script>

<style lang="less" scoped>

</style>