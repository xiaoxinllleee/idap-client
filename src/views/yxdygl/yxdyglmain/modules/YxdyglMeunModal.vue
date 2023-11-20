<template>
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">


        <!--        <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="菜单类型"
                >
                  <a-select :value="selectValue"  :disabled="selectDisable" v-decorator="['menuType', {}]">
                    <a-select-option value="0">菜单目录</a-select-option>
                    <a-select-option value="1">菜单分类</a-select-option>
                  </a-select>

                </a-form-item>-->
        <a-row class="form-row">
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="网格名称">
              <a-input placeholder="请输入网格名称" v-decorator="['wgmc', {rules: [{ required: true, message: '请输入网格名称!' }]}]"/>
            </a-form-item>
          </a-col>

          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="网格编号">
              <a-input placeholder="请输入网格编号" :disabled=disWgbh v-decorator="['wgbh', {rules: [{ required: true, message: '请输入网格编号!' }]}]"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="单元性质">
              <j-dict-select-tag placeholder="请选择单元性质" style="width: 100%;"
                                 v-decorator="['wgxz', {rules: [{ required: true, message: '请选择单元性质!' }]}]" :triggerChange="true" dictCode="wgxz"/>
            </a-form-item>
          </a-col>


          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="网格面积(㎡)">
              <a-input placeholder="请输入网格面积" v-decorator="['wgmj', {}]" type="number"/>
            </a-form-item>
          </a-col>
        </a-row>


        <a-row>
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="所属支行">
              <j-tree-select placeholder="请选择所属支行" v-decorator="['zzbz', {}]"
                             dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                             :showSearch="true" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="false"/>

            </a-form-item>
          </a-col>


          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="上级网格名称">
              <a-input  disabled v-model="parentId_dictText" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="网格情况">
              <a-input placeholder="请输入网格情况" v-decorator="['wgqk', {}]" />
            </a-form-item>
          </a-col>


          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="网格痛点分析">
              <a-input placeholder="请输入网格痛点分析" v-decorator="['wgtdfx', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="网格位置">
              <a-input placeholder="请输入网格位置" v-decorator="['wgwz', {}]" />
            </a-form-item>
          </a-col>


          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="备注">
              <a-input placeholder="请输入备注" v-decorator="['bz', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="网格关键人1">
              <a-input placeholder="请输入网格关键人1" v-decorator="['wggjr1', {}]" />
<!--              <a-input-search  v-decorator="['wggjr1_dictText', ]"
                               placeholder="选择网格关键人1"
                               readOnly
                               @search="handleAddUserDepart(1)" >
                <a-button slot="enterButton" icon="search"></a-button>
              </a-input-search>-->
            </a-form-item>
          </a-col>


          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="关键人1联系方式">
              <a-input placeholder="请输入网格关键人1联系方式" v-decorator="['gjrlxfs1', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="网格关键人2">

              <a-input placeholder="请输入网格关键人2" v-decorator="['wggjr2', {}]" />

<!--              <a-input-search  v-decorator="['wggjr2_dictText', ]"
                               placeholder="选择网格关键人2"
                               readOnly
                               @search="handleAddUserDepart(2)" >
                <a-button slot="enterButton" icon="search"></a-button>
              </a-input-search>-->
            </a-form-item>
          </a-col>


          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="关键人2联系方式">
              <a-input placeholder="请输入网格关键人2联系方式" v-decorator="['gjrlxfs2', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="网格关键人3">
              <a-input placeholder="请输入网格关键人3" v-decorator="['wggjr3', {}]" />

<!--              <a-input-search  v-decorator="['wggjr3_dictText', ]"
                               placeholder="选择网格关键人3"
                               readOnly
                               @search="handleAddUserDepart(3)" >
                <a-button slot="enterButton" icon="search"></a-button>
              </a-input-search>-->
            </a-form-item>
          </a-col>


          <a-col :lg="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="关键人3联系方式">
              <a-input placeholder="请输入网格关键人3联系方式" v-decorator="['gjrlxfs3', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

      </a-form>
    </a-spin>
    <Select-User-Modal ref="selectUserModal" @selectFinished="selectOK"></Select-User-Modal>

  </a-modal>
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import JTreeSelect from '../../../../components/jeecg/JTreeSelect'
import SelectUserModal from '../../../hr/yggl/ygrggl/modules/SelectUserModal'
export default {
  name: 'PmaFBaseIndexTypeModal',
  components:{JTreeSelect,SelectUserModal},
  data() {
    return {
      selectValue: '',
      title: '操作',
      visible: false,
      model: {},
      isWho:'',
      parentId_dictText: '',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },

      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {},
      url: {
        add: '/yxdyglmain/yxdyglMain/add',
        edit: '/yxdyglmain/yxdyglMain/edit'
      },
      disWgbh:true
    }
  },
  created() {
  },
  methods: {
    selectOK(data) {
      if (this.isWho == 1){
        this.model.wggjr1 = data[0].yggh;
        this.form.setFieldsValue({wggjr1_dictText:data[0].ygxm})
      }else if (this.isWho == 2){
        this.model.wggjr2 = data[0].yggh;
        this.form.setFieldsValue({wggjr2_dictText:data[0].ygxm})
      }else if (this.isWho == 3){
        this.model.wggjr3 = data[0].yggh;
        this.form.setFieldsValue({wggjr3_dictText:data[0].ygxm})
      }
    },
    handleAddUserDepart(data) {
      this.isWho = data;
      this.$refs.selectUserModal.visible = true;
    },
    selectValueFunction(value) {
    },
    add(data) {
      this.form.resetFields()
      this.visible = true
      this.selectValue = '0'
      if (data.length == 0){
        this.model.parentId = 0;
      }else {
        this.model.parentId = data.id
        this.parentId_dictText = data.wgmc
      }
      this.disWgbh = false;

    },
    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.parentId_dictText = record.parentId_dictText
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model,'wgmc','wgbh','wgxz','wgmj','wgqk','wgtdfx','wgwz','wggjr1','gjrlxfs1','wggjr2','gjrlxfs2','wggjr3','gjrlxfs3','bz','parentId','menuId','zzbz'))
        //时间格式化
      });
      this.selectValue = record.dirType

    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          if (this.model.id == null || this.model.id == '') {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          httpAction(httpurl, formData, method).then((res) => {
            if (res.success) {
              that.$message.success(res.message)
              that.$emit('ok')
            } else {
              that.$message.warning(res.message)
            }
          }).finally(() => {
            that.confirmLoading = false
            that.close()
          })
        }
      })
    },
    handleCancel() {
      this.close()
    }
  }
}
</script>

<style lang="less" scoped>

</style>