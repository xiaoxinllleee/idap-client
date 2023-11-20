<template>
  <a-modal :title='title'
           :width='600'
           :visible='visible'
           :confirmLoading='confirmLoading'
           @ok='handleCancel'
           @cancel='handleCancel'
           cancelText='关闭'>

    <div>
      <img :width='400'
           :src='srcUrl'
      />

    </div>
  </a-modal>
</template>

<script>
import JUpload from '@/components/jeecg/JUpload'

export default {
  name: 'FjModal',
  components: {
    JUpload
  },
  data() {
    return {
      confirmLoading: false,
      title: '图片',
      visible: false,
      srcUrl: ''
    }
  },
  created() {
  },
  methods: {
    view(record, lx) {
      if (lx == '1') {
        this.title = record.departId_dictText + '印章照片'
      } else {
        this.title = record.userId_dictText + '签字照片'
      }
      if (this.isCheck(record.fwlj)) {
        let tmpFwjlList = record.fwlj.split(',')
        this.srcUrl = window._CONFIG['staticDomainURL'] + '/' + tmpFwjlList[0]
      }
      this.visible = true
    },
    close() {
      this.visible = false
    },
    isCheck(e) {
      if (e == null || e == undefined || e == '') {
        return false
      }
      return true
    },
    handleCancel() {
      this.srcUrl = ''
      this.close()
    }
  }
}
</script>

<style scoped>

</style>