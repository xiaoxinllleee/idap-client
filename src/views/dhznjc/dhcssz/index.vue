<template>
  <!-- 查询区域 -->
  <div class='table-page-search-wrapper'>
    <a-card title='参数设置' style='width: 80%;height: 400px'>
      <div style='margin-top: 2%;margin-left: 5%'>
        <p style='color: red'><span style='color: red'>!!!</span>除针对每个客户进行单独设置预警短信通知的手机号，还可以在这里增加通用的号码。</p>
        <p><a-checkbox value='1'>新增监控客户都默认添加操作账号对应的手机号为预警通知号码。 当前用户预警接收短信手机号:15222226562<a-button type="primary" @click='mrsz'>默认设置</a-button></a-checkbox></p>
        <p><a-checkbox value='2'>短信通知到负责人号码：<a-input style='border:none; border-bottom:2px solid #eee;'/></a-checkbox></p>
        <p><a-checkbox value='3'>其他：<a-input style='border:none; border-bottom:2px solid #eee;'/></a-checkbox></p>
      </div>
      <div style='text-align: center; margin: auto'>
        <a-button type="primary" @click='szcs'>设置参数</a-button>
        <a-button style='background-color: #f7bf67;color: white;margin-left:10px;' @click="fhjky">返回监控页</a-button>
      </div>

      <grxx ref='grxx' />
    </a-card>
  </div>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JInput from '@/components/jeecg/JInput'
import { getAction } from '@api/manage'
import { syncGwxxZzbz } from '@api/api'
import grxx from './modules/grxx'

export default {
  name: 'VKhxxglKhxqNhJzyxList',
  mixins: [JeecgListMixin],
  components: { JInput ,grxx},
  data() {
    return {
      checked: ref(false)
    }
  },
  created() {

  },
  methods: {
    fhjky(){
      this.$router.push("/dhznjc/jkgl/JkglList")
    },
    szcs(){
      let that = this;
      that.$confirm({
        title:'系统消息',
        okText: '确定',
        cancelText: '取消',
        content: '确定要设置贷后参数吗？',
        onOk: () => {
          this.$message.success("设置成功")
        },
        onCancel: e => {
          if (e.triggerCancel) {
            // 点击x或者按键盘esc关闭的弹窗
            return
          }
          // 函数体 方法
          e()
        }
      })
    },
    mrsz(){
      this.$refs['grxx'].init()
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less'
</style>