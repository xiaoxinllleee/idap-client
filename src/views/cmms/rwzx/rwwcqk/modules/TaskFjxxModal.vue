<template>
  <a-modal
    :title='title'
    :width='1000'
    :visible='visible'
    :confirmLoading='confirmLoading'
    @ok='handleOk'
    :ok-button-props='{ props: { disabled: true } }'
    @cancel='handleCancel'
    cancelText='关闭'>

    <a-spin :spinning='confirmLoading'>
      <a-form :form='form'>
        <a-row>
          <a-col :lg='24'>
            <a-form-item
              :labelCol='labelCol'
              :wrapperCol='wrapperCol'
              label='佐证附件信息'>
              <j-upload text='上传图片'
                        fileType='image'
                        listType='picture'
                        :disabled='true'
                        class='upload-list-inline'
                        :value='imagePaths'
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row v-show="isShow">
          <a-col :lg='24'>
            <a-form-item
              :labelCol='labelCol'
              :wrapperCol='wrapperCol'
              label='录音信息'>
              <j-upload text="上传录音"
                        fileType="file"
                        :disabled='true'
                        listType="text"
                        class="upload-list-inline"
                        :value="audioPaths"
                        />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction, getAction } from '@/api/manage'

import pick from 'lodash.pick'
import moment from 'moment'
import Vue from 'vue'
import JUpload from '@/components/jeecg/JUpload'
import AFormItem from 'ant-design-vue/lib/form/FormItem'

export default {
  name: 'TaskFjxxModal',
  components: { JUpload },
  data() {
    return {
      audioPaths:'',
      title: '操作',
      visible: false,
      model: {},
      headers: {},
      imagePaths: '',
      videoPaths: '',
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
      row: {},
      customerVisitModel: {
        customerVisitFjxxImage: [{}], //图片
        customerVisitFjxxVideo: [{}], //视频
        customerVisitFjxxAudio: [{}] //音频
      },
      isShow:false,
    }
  },
  created() {
  },
  methods: {
    add() {
      this.edit({})
    },
    edit(record) {
      console.log(record)
      this.row = record
      if (record.yxfs=='2'){
        this.isShow=true
      }
      let params = { id: record.id, fjlx: this.row.yxlx }
      this.visible = true
      this.$nextTick(() => {
        getAction('/zfyxmx/taskZfyxmx/queryFjxx', params).then((res) => {
          if (res.success) {
            let path = ''
            let arr = []
            arr = res.result
            if (arr.length > 0) {
              path = arr.join(',')
            }
            this.imagePaths = path
            this.$forceUpdate()
          }
        }).finally(()=>{
          if (record.yxfs=='2') {
            getAction('/zfyxmx/taskZfyxmx/queryFjxx', { id: record.id, fjlx: 3 }).then((res) => {
              if (res.success) {
                let path = ''
                let arr = [];
                arr = res.result;
                if (arr.length > 0) {
                  path = arr.join(",")
                }
                this.audioPaths = path;
              }
            })
          }
        })
        //时间格式化
      })

    },
    close() {
      this.audioPaths=''
      this.imagePaths=''
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
    },
    handleCancel() {
      this.close()
    },

  }
}
</script>

<style lang='less' scoped>

</style>