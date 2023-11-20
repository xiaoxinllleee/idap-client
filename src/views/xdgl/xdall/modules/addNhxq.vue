<template>
  <j-modal
    :title="title"
    :width="1450"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :destroyOnClose="true"
    switchFullscreen
    :fullscreen="false"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-form>
      <a-row class="form-row" :gutter="16">
        <a-col :xl="6" :lg="7" :md="8" :sm="24">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="所属网格">
            <JTreeSelectNotJg placeholder="请选择所属网格"
                              v-model="fromData.wgbh"
                              treeNodeFilterProp="title"
                              pidField="PARENT_ID"
                              dict="YXDYGL_MAIN,WGMC,ID"
                              pidValue="0"
                              :showSearch="showSearch"
                              treeDefaultExpandAll="true"
                              />

<!--            <a-tree-select-->
<!--              :treeData=sswgTreeDateoptions-->
<!--              :replaceFields=replaceFields-->
<!--              v-model="form.wgbh"-->
<!--              :dropdownStyle="{maxHeight:'400px',overflow:'auto'}"-->
<!--              showSearch-->
<!--              treeNodeFilterProp="title"-->
<!--            >-->
<!--            </a-tree-select>-->
          </a-form-item>
        </a-col>
        <a-col :xl="6" :lg="7" :md="8" :sm="24">

          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属支行">
            <j-tree-select placeholder="请选择所属支行查询"
                           pid-field="sjzzbz"
                           :showSearch="showSearch"
                           treeNodeFilterProp="title"
                           v-model="fromData.sszh"
                           dict="hr_bas_organization, zzjc, zzbz"
                           :tree-default-expand-all="true"/>
          </a-form-item>
        </a-col>
        <a-col :xl="6" :lg="7" :md="8" :sm="24">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属客户经理">
            <a-input v-model="userInfo.realname" disabled></a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row >
        <a-col :xl="6" :lg="7" :md="8" :sm="24">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="姓名">
            <a-input v-model="fromData.khmc" ></a-input>
          </a-form-item>
        </a-col>



        <a-col :xl="6" :lg="7" :md="8" :sm="24">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件号码">
            <a-input v-model="fromData.zjhm" ></a-input>
          </a-form-item>
        </a-col>

        <a-col :xl="6" :lg="7" :md="8" :sm="24">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="与户主关系">
            <j-dict-select-tag size="small" style="width: 140px;" v-model="fromData.yhzgx" dictCode="yhzgx" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :xl="6" :lg="7" :md="8" :sm="24">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="年龄">
            <a-input v-model="fromData.nl" disabled></a-input>
          </a-form-item>
        </a-col>
        <a-col :xl="6" :lg="7" :md="8" :sm="24">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系方式">
            <a-input v-model="fromData.sjhm" ></a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :xl="6" :lg="7" :md="8" :sm="24">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="性别">
            <j-dict-select-tag size="small" style="width: 140px;" v-model="fromData.xb" dictCode="sex" :disabled="true" />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="地址">
            <a-input v-model="fromData.hjdz" ></a-input>
          </a-form-item>
        </a-col>

      </a-row>

    </a-form>
  </j-modal>
</template>

<script>
import { JModalMixin } from '@/mixins/JModalMixin'
import JTreeSelectNotJg from '@/components/jeecg/JTreeSelectNotJg'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import { getAction, postActionJson } from '@/api/manage'
import { IdCardValidate, getIdCardInfo } from "@/utils/idValidate"

export default {
  name: 'addNhxq',
  mixins: [JModalMixin],
  components: { JTreeSelectNotJg,JTreeSelect },
  data () {
    return {
      showSearch:true,
      fromData:{},
      // rules:{
      //   wgbh: [{ required: true, message: '所属网格不能为空！', trigger: 'change' }],
      //   zjhm: [{ required: true, message: '证件号码不能为空！', trigger: 'change' }],
      //   khmc: [{ required: true, message: '客户名称不能为空！', trigger: 'change' }],
      // }
    }
  },
  watch:{
    'fromData.zjhm': {
      handler: function(val) {
        if (val && IdCardValidate(val)) {
          let idCardInfo = getIdCardInfo(val)
          this.$set(this.fromData, 'xb', idCardInfo.sex)
          this.$set(this.fromData, 'nl', idCardInfo.age)
        }
      },
    },
  },
  methods: {
    add () {
      this.visible = true
      this.fromData = {}
    },

    //添加家庭成员
    addJtcy (val) {
      //this.fromData = val;
      //重置id khmc zjhm
      this.fromData.wgbh = val.wgbh
      this.fromData.sszh = val.sszh
      this.fromData.hjdz = val.hjdz
      this.fromData.hhbm = val.hhbm
      this.visible = true
    },
    treeChange (node) {
      console.log('treeChange', node)
      //getSswgGszhOption /yxdyglmain/yxdyglMain/getSswgSszh
      getAction('/yxdyglmain/yxdyglMain/getSswgSszh', { 'sswg': node.wgbh }).then(response => {
        console.log(response.result)
        this.$set(this.fromData, 'sszh', response.result.zzbz)
        this.$set(this.fromData, 'zzjc', response.result.zzjc)

      })
    },
    handleOk () {
      if (this.fromData.wgbh == undefined || this.fromData.wgbh == null || this.fromData.wgbh == ''){
        this.errorInfo("请选择所属网格")
        return
      }
      if (this.fromData.sszh == undefined || this.fromData.sszh == null || this.fromData.sszh == ''){
        this.errorInfo("请选择所属支行")
        return
      }
      if (this.fromData.khmc == undefined || this.fromData.khmc == null || this.fromData.khmc == ''){
        this.errorInfo("请填写客户名称")
        return
      }
      if (this.fromData.zjhm == undefined || this.fromData.zjhm == null || this.fromData.zjhm == ''){
        this.errorInfo("请填写证件号码")
        return
      }


      let formData = {
        ...this.fromData
      }

      postActionJson('/khflgl/nhxq/addNhxq', formData).then((res) => {
        if (res.success) {
          this.$message.success('成功')
          this.visible = false;
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {

      })
      this.$emit('ok')
    },
  }
}
</script>

<style scoped>

</style>