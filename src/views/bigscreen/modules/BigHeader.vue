<template>

  <div class="headerdp clearfix">
    <img src="/static/logo.png" class="img_1 leftfix" />
    <!-- <img src="./static/L.png" class="img_l" /> -->
    <div class="img_l leftfix" @click="toPage">
          <span class="zysj" :style="{ color: index=='1'?'#fff':'gray' }">
            主页数据
          </span>
    </div>
    <img src="/static/M.png" alt="" class="img_m leftfix">

    <div class="img_r leftfix" @click="goToXzxx">
          <span class="zysj" :style="{ color: index=='2'?'#fff':'gray' }">
            网格数据
          </span>
    </div>

    <img src="/static/time.png" alt="" class="img_time leftfix">

    <div class="showTime leftfix">
      {{FormateTime(nowtime)}}
    </div>

    <img src="/static/user.png" alt="" class="img_user leftfix">

    <div class="username leftfix">
      管理员
    </div>
  </div>

</template>

<script>
export default {
  props:{
    index:{
      type:String,
      default:'1'
    }
  },
  data () {
    return {
      nowtime: '',
      textColor: '#fff',
    }
  },
  mounted () {
    // 显示时间1s1s的显示
    let that = this
    this.timer = setInterval(function () {
      that.nowtime = new Date().toLocaleString()
    })
  },
  methods: {
    FormateTime () {
      var date = new Date();
      var year = this.formateTime(date.getFullYear())
      var month = this.formateTime(date.getMonth() + 1)
      var day = this.formateTime(date.getDate())
      var hour = this.formateTime(date.getHours())
      var minute = this.formateTime(date.getMinutes())
      var second = this.formateTime(date.getSeconds())
      var weekday = date.getDay();
      var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
      var week = weeks[weekday];
      return year + '.' + month + '.' + day + '  ' + week + '  ' + hour + ":" + minute + ":" + second
    },
    formateTime (n) {
      if (n < 10) {
        return '0' + n
      } else {
        return n
      }
    },
    toPage(){
      this.$router.push({name:'bigc'})
    },
    goToXzxx(name){
      this.$router.push({name:'wgxz'})
    },
    changeColor(refName,isHovered) {
      if (isHovered) {
        // 鼠标移入时的逻辑，可以在这里改变文本颜色
        this.$refs[refName].style.color = '#adffff';
      } else {
        // 鼠标移出时的逻辑，可以在这里恢复默认文本颜色
        this.$refs[refName].style.color = '#fff';

      }
    }
  },
}
</script>

<style scoped>
.headerdp {
  height: 100px;
  width: 100%;
  background-color: rgba(255, 255, 0, 0);
}

.leftfix {
  float: left;
}

.rightfix {
  float: right;
}

.clearfix::after {
  content: '';
  display: block;
  clear: both;
}

.username {
  width: 70px;
  height: 66px;
  line-height: 66px;
  font-size: 18px;
  color: #fff;
  margin-left: 5px;
}

.img_user {
  width: 24px;
  height: 24px;
  margin-left: 20px;
  margin-top: 21px;
}

.showTime {
  height: 18px;
  margin-top: 27px;
  margin-left: 15px;
  font-family: 'AlibabaSans-Medium';
  font-size: 18px;
  font-weight: 500;
  color: #fff;
}

.img_time {
  width: 22px;
  height: 18px;
  margin-top: 26px;
}

.img_r {
  width: 245px;
  height: 58px;
  background-image: url(/static/R.png);
  text-align: center;
  margin-left: -70px;
}

.img_m {
  width: 768px;
  height: 121px;
  margin-top: -20px;
  margin-left: -70px;
}

.zysj {
  font-size: 22px;
  font-family: 'SourceHanSansCN-Medium';
  line-height: 58px;
}

.zysj:hover {
    color: #5698ff  !important;
    font-size: 26px;
}



.img_l {
  width: 245px;
  height: 58px;
  margin-left: 155px;
  background-image: url(/static/L.png);
  text-align: center;
}

.img_1 {
  width: 236px;
  height: 47px;
  margin-top: 15px;
  margin-left: 16px;
}



</style>