<template>
  <div>
    <a-modal
      v-model:visible='visible'
      :title='Modal'
      ok-text='确认'
      cancel-text='取消'
      @ok='hideModal'
    >
      <p>{{message}}</p>

    </a-modal>
    <sure-modal ref='sure' @ok='ok'></sure-modal>
  </div>
</template>

<script>
import SureModal from './SureModal'
export default {
  name: 'SureRepeatModel',
  components:{
    SureModal
  },
  data() {
    return {
      message:'',
      record:{

      },
      Modal:'',
      visible: false
    }
  },
  methods: {
    ok() {

    },
    edit(record) {
      this.visible = true
      this.message="已经存在该用户的定价信息,是否覆盖";
      this.record=record;

    },
    hideModal() {
      this.$refs.sure.edit(record)
      this.$refs.sure.title = '特殊利率定价确认(宁远)'
      this.$refs.sure.disableSubmit = false

    }
  }
}
</script>

<style scoped>

</style>