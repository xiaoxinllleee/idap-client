<template lang="">
  <dv-full-screen-container>
    <div class="contains">

    <BigHeader></BigHeader>

      <div class="dkywxxdiv">

        <div class="qdiv">
          <div class="font14 cfff">业务机构：</div>
          <div class="item2">
            <a-input>

            </a-input>
          </div>
          <div class="item3 font14 cfff">查询</div>
          <div class="item4 font14 cfff">重置</div>
        </div>

        <div style="margin: 20px 10px 0 10px;">
          <table id="t1">
            <thead>
              <tr>
                <th>序号</th>
                <th>机构代码</th>
                <th>机构简称</th>
                <th>系统初筛白名单</th>
                <th>支行审定白名单</th>
                <th>系统初筛白名单</th>
                <th>系统初筛白名单</th>
                <th>系统初筛白名单</th>
                <th>系统初筛白名单</th>
                <th>系统初筛白名单</th>
                <th>系统初筛白名单</th>
                <th>系统初筛白名单</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item,index in 20">
                <td>{{index+1}}</td>
                <td>{{index+11}}</td>
                <td>{{index+12}}</td>
                <td>{{index+13}}</td>
                <td>{{index+144}}</td>
                <td>{{index+155}}</td>
                <td>{{index+166}}</td>
                <td>{{index+177}}</td>
                <td>{{index+188}}</td>
                <td>{{index+199}}</td>
                <td>{{index+122}}</td>
                <td>{{index+123}}</td>

              </tr>
            </tbody>
          </table>
        </div>

        <div class="qdiv">
          <a-pagination class="cfff" size="small" :total="50" show-size-changer show-quick-jumper
            :show-total="total => `显示20条记录，共3页，共50条记录`" />
        </div>

      </div>


    </div>
  </dv-full-screen-container>
</template>
<script>
import BigHeader from './BigHeader.vue'
  export default {
  components:{BigHeader},
    data () {
      return {
       
      }
    },
    mounted () {
      
    },
    methods: {
      
    },
  }
</script>
<style scoped>
  @import '../common.css';

  .contains {
    background-image: url(/static/bj.png);
    background-size: cover;
    width: 1920px;
    height: 1080px;
  }

  .img_l {
    width: 245px;
    height: 58px;
    margin-left: 155px;
    background-image: url(/public/static/L.png);
    text-align: center;
  }

  .dkywxxdiv {
    width: 1881px;
    height: 971px;
    margin: 0 auto;
    background-image: url(/static/dkbk.png);
  }

  .csbk {
    border: 1px #fff solid;
  }

  .qdiv {
    display: flex;
    justify-content: center;
    align-items: end;
    height: 80px;
    width: 100%;
  }

  .item2 {
    width: 160px;
    height: 30px;
  }

  .item3 {
    width: 60px;
    height: 30px;
    background: #008AFF;
    text-align: center;
    line-height: 30px;
    margin-left: 10px;
  }

  .item4 {
    width: 60px;
    height: 30px;
    line-height: 29px;
    background: rgba(0, 138, 255, 0.4);
    border: 1px solid #008AFF;
    text-align: center;
    margin-left: 10px;
  }

  table {
    text-align: center;
    color: #fff;
    width: 100%;
  }

  th {
    background-color: rgba(0, 138, 255, 0.4);
    height: 40px;
  }

  td {
    height: 36px;
  }

  #t1 tr:nth-child(even) {
    background-color: rgba(0, 138, 255, 0.15);
  }
</style>