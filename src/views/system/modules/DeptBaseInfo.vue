<template>
  <a-card :visible="visible">
    <a-form :form="form">
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="组织标志">
        <a-input style="border:0px;" placeholder="" v-decorator="['zzbz', {}]"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="组织名称">
        <a-input style="border:0px;" placeholder="" v-decorator="['zzmc', {}]"/>
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="上级部门">
        <a-tree-select
          disabled
          style="width:100%;border: 0px;border: none;outline:none;"
          :dropdownStyle="{maxHeight:'200px',overflow:'auto'}"
          :treeData="treeData"
          v-model="model.sjzzbz"
          placeholder="无">
        </a-tree-select>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="业务机构代码">
        <a-input style="border:0px;" placeholder="" v-decorator="['ywjgdm', {}]"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="排序">
        <a-input-number style="border:0px;" v-decorator="[ 'pxxh',{}]"/>
      </a-form-item>


    </a-form>
  </a-card>
</template>
<script>
  import pick from 'lodash.pick'
  import {queryIdTree} from '@/api/api'

  export default {
    name: 'DeptBaseInfo',
    components: {},
    data() {
      return {
        departTree: [],
        id: '',
        model: {},
        visible: false,
        disable: true,
        treeData: [],
        form: this.$form.createForm(this),
        labelCol: {
          xs: {span: 24},
          sm: {span: 3}
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16}
        },
      }
    },
    created() {
      this.loadTreeData();
    },
    methods: {
      loadTreeData() {
        queryIdTree().then((res) => {
          if (res.success) {
            for (let i = 0; i < res.result.length; i++) {
              let temp = res.result[i];
              this.treeData.push(temp);
            }
          }

        })
      },
      open(record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        console.log("record:");
        console.log(record);
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(record, 'zzbz', 'zzmc', 'pxxh','ywjgdm', 'sjzzbz'));
        });
      },
      clearForm() {
        this.form.resetFields();
        this.treeData = [];
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>