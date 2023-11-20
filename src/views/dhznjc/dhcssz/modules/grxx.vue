<template>
  <j-modal
    title='个人参数信息设置'
    width='100%'
    :height='1024'
    :visible='visible'
    :confirmLoading='confirmLoading'
    :okButtonProps='{ props: {disabled: true} }'
    :destroyOnClose='true'
    @cancel='close'
    @ok='ok'
    cancelText='关闭'
    okText="保存"
  >
    <div class='table-page-search-wrapper'>
      <div style='color: red'>您的账号信息以及个人资料，若有误请联系管理员。</div>
      <a-card style='width: 80%;height: 100%'>
        <div>
              <span>员工头像：</span>
          <a-upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            list-type="picture-card"
            v-model:file-list="fileList"
            @preview="handlePreview"
          >
            <div v-if="fileList.length < 8">
              <plus-outlined />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
              <span style='display:inline-block;'>提示:照片或者扫描件，内容必须清晰可见且完整。</span>
              <span>支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过2M。</span>
        </div>

        <a-form layout='inline' @keyup.enter.native='searchQuery'>
          <a-row :gutter='24'>
            <a-col :span='24'>
              <a-form-item label='姓名：'>
                <span>蔡徐坤</span>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter='24'>
            <a-col :span='24'>
              <a-form-item label='所属机构：'>
                <span>厦门市七星通联科技有限公司(市场)</span>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter='24'>
            <a-col :span='24'>
              <a-form-item label='当前状态：'>
                <span>在职</span>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter='24'>
            <a-col :span='24'>
              <a-form-item label='角色：'>
                <span>[贷后智能监测-管理 - ORG_ADMIN, 员工画像-管理 - YGHX_ADMIN, 贷前风险识别-管理 - ORG_ADMIN]</span>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter='24'>
            <a-col :span='24'>
              <a-form-item label='手机号码：'>
                <span>15222226562</span>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter='24'>
            <a-col :span='24'>
              <a-form-item label='邮箱：'>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter='24'>
            <a-col :span='24'>
              <a-form-item>
                <span><i style='color: red'>*</i>接收短信手机号：</span>
                <a-input v-model='sjhm' style='width: 20%;'></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter='24'>
            <a-col :span='24'>
              <a-form-item label='QQ：'>
                <a-input style='width: 20%;'></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter='24'>
            <a-col :span='24'>
              <a-form-item label='原始密码：'>
                <a-input style='width: 20%;'></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter='24'>
            <a-col :span='24'>
              <a-form-item label='修改密码：'>
                <a-input style='width: 20%;'></a-input>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter='24'>
            <a-col :span='24'>
              <a-form-item label='密码强度：'>
                <span><a-checkbox value='1' disabled>弱</a-checkbox><a-checkbox value='2' disabled>中</a-checkbox><a-checkbox value='3' disabled>强</a-checkbox></span>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter='24'>
            <a-col :span='24'>
              <a-form-item label='确认密码：'>
                <a-input style='width: 20%;'></a-input>
              </a-form-item>
            </a-col>
          </a-row>

        </a-form>
      </a-card>
    </div>
  </j-modal>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JInput from '@/components/jeecg/JInput'
import { getAction } from '@api/manage'
import { syncGwxxZzbz } from '@api/api'

export default {
  name: 'VKhxxglKhxqNhJzyxList',
  mixins: [JeecgListMixin],
  components: { JInput },
  data() {
    return {
      visible: false,
      confirmLoading: false,
      sjhm:'',
      fileList:[]
    }
  },
  created() {

  },
  methods: {
    init() {
      this.visible = true
    },
    close() {
      this.visible = false
    },
    ok(){
     if (this.sjhm==null || this.sjhm=='' || this.sjhm==undefined){
       this.$message.error("手机号码不能为空")
       return
     }
     this.$message.success("保存成功")
      this.visible=false
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>