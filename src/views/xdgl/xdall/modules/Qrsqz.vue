<template>
<div style="width: 100%">
  <div style="text-align:right;padding-right: 10px;">
    <a-button type="primary" @click="innerVisible = true">签字</a-button>
  </div>
  <div  style="height:auto;background-color:#ffffff;padding-left: 0px;padding-right: 0px;padding-bottom: 0px;">
    <form id="signInfo">
      <div style="background-color:#F7F7F7;height:370px;">
        <div style="height:18px;"></div>
        <div style="background-color:#FFFFFF; margin-left:20px; margin-right:20px; padding-bottom:5px;">
          <div style="padding-left:20px; padding-right:20px;">
            <div style="overflow:auto;height: 330px;">
              <div style="font-size:16px; font-weight:bold; text-align:center; padding-bottom:20px; padding-top:20px;">信息提供者签字确认书</div>
              <div style="font-size:12px; padding-bottom:30px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;以上信息本人自愿提供，仅用于浏阳农商行评级授信，浏阳农商行将严格保护您的个人信息安全。</div>
              <div style="font-size:12px; text-align:right; padding-right:30px;padding-bottom:10px">信息提供者签章：
                <div id="myImg"><span @click="innerVisible = true"><img :src="value" width="120" height="50"></span></div>
              </div>
              <div style="font-size:16px; text-align:right; padding-right:40px;padding-bottom:10px">{{this.today}}</div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
  <div class="item" style="text-align: center">
    <a-modal
      width="900px"
      title="确认书签名"
      :visible.sync="innerVisible"
      @cancel="innerVisible = false"
      @ok="innerVisible = false"
      >
      <div id="app">
        <sign-canvas class="sign-canvas" ref="SignCanvas" :options="options" v-model="value"/>
        <div class="sign-btns">
          <span id="clear" @click="canvasClear()">清空</span>
          <span id="save" @click="saveAsImg()">生成</span>
        </div>
      </div>
    </a-modal>
  </div>
</div>

</template>

<script>
  import { getToken } from '@/utils/auth';

  export default {
    components: {  },
    bizPath: {
      type: String,
      required: false,
      default: " ",
    },
    props: {
      'xendId':String,
    },

    data() {
      return {
        today:'',
        imageBaseQrs:'',
        outerVisible: false,
        innerVisible: false,
        dialogVisible: false,
        value: null,
        options:{
          canvasWidth: 800, //canvas宽高 [Number] 可选
          canvasHeight: 300,  //高度  [Number] 可选
          isSign: true, //签名模式 [Boolean] 默认为非签名模式,有线框, 当设置为true的时候没有任何线框
          isShowBorder: false, //是否显示边框 [可选]
        },

      }
    },

    created() {
      // 设置文件按上传请求头
      this.requestHeader = { 'Authorization': 'Bearer ' + getToken('token') }
      this.initDate();
    },
    computed: {
    },
    methods: {
      initDate(){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        this.today = year + '-' + month + '-' + day;
      },
      /**
       * 清除画板
       */
      canvasClear(){
        this.$refs.SignCanvas.canvasClear();
      },

      /**
       * 保存图片
       */
      saveAsImg(){
        const img = this.$refs.SignCanvas.saveAsImg();
        this.innerVisible=false;
        this.imageBaseQrs=img;
        this.$emit('getQrsSignBase64', { imageBaseQrs: this.imageBaseQrs })
      },

    }
  }
</script>
<style lang="less" scoped>
  * {
    margin: 0;
    padding: 0;
  }
  .sign-canvas{
    display: block;
    margin: 0 auto;
    border: 1px dashed #f00;
  }
  .view-image{
    display: block;
    margin: 20px auto;
  }
  .sign-btns{
    width: 800px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    #clear,
    #clear1,
    #save {
      margin: 0 auto;
      display: inline-block;
      padding: 5px 10px;
      width: 150px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #eee;
      background: #e1e1e1;
      border-radius: 10px;
      text-align: center;
      margin: 20px auto;
      cursor: pointer;
    }
  }
</style>












