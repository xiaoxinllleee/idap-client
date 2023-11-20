<template>
  <a-modal
    :title="title"
    :width="500"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row class="form-row" :gutter="0">
          <a-col :lg="24">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="营销单元">
              <a-select placeholder="请选择营销单元" style="width: 100%;margin-right:10px;">
                <a-select-option value="">
                  请选择营销单元
                </a-select-option>
                <a-select-option value="9">
                  工业品批发市场
                </a-select-option>
                <a-select-option value="10">
                  秀水街道
                </a-select-option>
                <a-select-option value="11">
                  奥苑社区
                </a-select-option>
                <a-select-option value="0">
                  营业部
                </a-select-option>
                <a-select-option value="1">
                  濂溪南街
                </a-select-option>
                <a-select-option value="2">
                  西洲街道
                </a-select-option>
                <a-select-option value="3">
                  宝珍西街
                </a-select-option>
                <a-select-option value="4">
                  宝珍东街
                </a-select-option>
                <a-select-option value="5">
                  家居广场
                </a-select-option>
                <a-select-option value="6">
                  家电市场
                </a-select-option>
                <a-select-option value="7">
                  爱莲商圈
                </a-select-option>
                <a-select-option value="8">
                  批发市场
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  export default {
    name: 'mapZoneModule',
    data() {
      return {
        title:"操作",
        visible: false,
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

      }
    },
    methods: {
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        this.close();
      },
      handleCancel() {
        this.close();
      }
    }
  }
</script>

<style scoped>

</style>