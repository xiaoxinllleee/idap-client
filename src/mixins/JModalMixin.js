import store from '@/store/'
import { getAction } from '@api/manage'

/**
 * 用于弹出的j-modal
 *
 * */

export const JModalMixin = {
  data () {
    return {
      //弹窗的标题
      title: '',
      //modal是否谈出
      visible: false,
      //加载
      confirmLoading: false,
      //
      form: this.$form.createForm(this),

      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      userInfo: {},
      sswgTreeDateoptions: [],
      replaceFields:
        { children: 'children', title: 'wgmc', key: 'wgbh', value: 'wgbh' }
    }
  },
  created () {
    this.userInfo = store.getters.userInfo
    //this.getWgxxTreeDateBySskhjl()
  },
  methods: {

    getWgxxTreeDateBySskhjl () {
      getAction('/yxdyglmain/yxdyglMain/getWgxxTreeDateBySskhjl', { wgxz: '6,8', wgxzType: '2' }).then(res => {
        if (res.success) {
          this.sswgTreeDateoptions = res.result
        }
      })
    },
    handleOk () {
      console.log('===JModalMixin handleOk===')
    },
    handleCancel () {
      this.visible = false
    },
    errorInfo (val) {
      this.$message.error(val)
    },
    successInfo (val) {
      this.$message.success(val)
    }
  }
}