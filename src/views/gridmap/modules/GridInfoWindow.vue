<template>
  <!-- 信息窗体-->
  <bm-info-window :position="infoWindow.position" :show="infoWindow.show" @close="infoWindowClose" @open="infoWindowOpen">
    <div class="info-window">
      <a-descriptions :title="title" :column="2" bordered>
        <!--<a-descriptions-item label="总客户数">-->
          <!--{{gridInfo.zkhs}}-->
        <!--</a-descriptions-item>-->
        <!--<a-descriptions-item label="存量客户数">-->
          <!--{{gridInfo.clkhs}}-->
        <!--</a-descriptions-item>-->
        <!--<a-descriptions-item label="潜在客户数">-->
          <!--{{gridInfo.qzkhs}}-->
        <!--</a-descriptions-item>-->
        <a-descriptions-item label="存款户数">
          {{gridInfo.ckkhs}}
        </a-descriptions-item>
        <a-descriptions-item label="贷款户数">
          {{gridInfo.dkkhs}}
        </a-descriptions-item>
        <a-descriptions-item label="存款余额">
          {{gridInfo.ckye}}
        </a-descriptions-item>
        <a-descriptions-item label="存款日平">
          {{gridInfo.ckyrp}}
        </a-descriptions-item>
        <a-descriptions-item label="贷款余额">
          {{gridInfo.dkye}}
        </a-descriptions-item>
        <a-descriptions-item label="不良贷款余额">
          {{gridInfo.bldkye}}
        </a-descriptions-item>
        <a-descriptions-item label="表外不良贷款余额">
          {{gridInfo.bwbldkye}}
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <div style="float: right">
      <!--<a-button type="primary" @click="infoWindowClose" style="margin: 5px 5px;">详情</a-button>-->
      <a-button @click="infoWindowClose" style="margin: 5px 0;">关闭</a-button>
    </div>
  </bm-info-window>
</template>

<script>
  import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow.vue'
  import { getAction } from '@/api/manage'
  export default {
    name: 'GridInfoWindow',
    components: {
      BmInfoWindow
    },
    data () {
      return {
        infoWindow: {
          show: false,
          position: undefined,
          contents: undefined
        },
        title: '详情',
        url: {
          getOrgInfo: '/jgtjfx/jghztj/getLatestInfo',
          getGridInfo: '/wgtjfx/wghztj/getLatestInfo',
        },
        gridInfo: {}
      }
    },
    methods: {
      // 关闭信息窗口
      infoWindowClose(e) {
        this.infoWindow.show = false
      },
      infoWindowOpen(e) {
        this.infoWindow.show = true
      },
      // 打开信息窗口
      infoWindowShow(position, wgmc) {
        console.log('infoWindowShow', position)
        this.infoWindow.show = true
        this.infoWindow.position = position
        this.title=wgmc + '详情'
      },
      //获取机构业务数据
      getOrgInfo(zzbz) {
        console.log('getOrgInfo', zzbz)
        getAction(this.url.getOrgInfo, {zzbz: zzbz}).then(res => {
          console.log(res)
          if(res.success) {
            this.gridInfo = Object.assign({}, res.result)
          }
        })
      },
      //获取网格业务数据
      getAreaInfo(wgbh) {
        console.log('getAreaInfo', wgbh)
        getAction(this.url.getGridInfo, {wgbh: wgbh}).then(res => {
          console.log(res)
          if(res.success) {
            this.gridInfo = Object.assign({}, res.result)
          }
        })
      },
    }
  }
</script>

<style>
  .sample {
    width: 120px;
    height: 40px;
    line-height: 40px;
    background: rgba(0,0,0,0.5);
    overflow: hidden;
    box-shadow: 0 0 5px #000;
    color: #fff;
    text-align: center;
    padding: 10px;
    position: absolute;
  }
  .sample.active {
    background: rgba(0,0,0,0.75);
    color: #fff;
  }
</style>