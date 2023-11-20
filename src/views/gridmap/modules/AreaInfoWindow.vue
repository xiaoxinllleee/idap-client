<template>
  <!-- 信息窗体-->
  <bm-info-window :position="infoWindow.position" :show="infoWindow.show" @close="infoWindowClose" @open="infoWindowOpen" :width="0" :height="0">
    <div class="info-window">
      <a-descriptions :title="title" :column="3" bordered>
        <a-descriptions-item label="网格编号">
          {{model.wgbh}}
        </a-descriptions-item>
        <a-descriptions-item label="网格名称">
          {{model.wgmc}}
        </a-descriptions-item>
        <a-descriptions-item label="总户籍">
          {{model.wgxxModel.zhs}}
        </a-descriptions-item>
        <a-descriptions-item label="总人口">
          {{model.wgxxModel.zrs}}
        </a-descriptions-item>
        <a-descriptions-item label="我行客户数/占比">
          {{model.wgywxxModel.clkhs}} / {{clkhszb}}
        </a-descriptions-item>
        <a-descriptions-item label="潜在客户数/占比">
          {{model.wgywxxModel.qzkhs}} / {{qzkhszb}}
        </a-descriptions-item>
        <a-descriptions-item label="共产党员">
          {{model.wgxxModel.dyrs}}
        </a-descriptions-item>
        <a-descriptions-item label="公职人员">
          {{model.wgxxModel.gzryrs}}
        </a-descriptions-item>
        <a-descriptions-item label="特岗教师">
          {{model.wgxxModel.tgjsrs}}
        </a-descriptions-item>
        <a-descriptions-item label="外部社保卡">
          {{model.wgxxModel.wbsbk}}
        </a-descriptions-item>
        <a-descriptions-item label="脱贫及检测户">
          {{model.wgxxModel.tpjch}}
        </a-descriptions-item>
        <a-descriptions-item label="五保、低保">
          {{model.wgxxModel.wbdbh}}
        </a-descriptions-item>
        <a-descriptions-item label="重大疾病">
          {{model.wgxxModel.zdjbrs}}
        </a-descriptions-item>
        <a-descriptions-item label="诈骗人员">
          {{model.wgxxModel.zpry}}
        </a-descriptions-item>
        <a-descriptions-item label="非法集资">
          {{model.wgxxModel.ffjzrs}}
        </a-descriptions-item>
        <a-descriptions-item label="吸毒人员">
          {{model.wgxxModel.xdry}}
        </a-descriptions-item>
        <a-descriptions-item label="服刑人员">
          {{model.wgxxModel.fxry}}
        </a-descriptions-item>
        <a-descriptions-item label="我行诉讼">
          {{model.wgxxModel.ssrs}}
        </a-descriptions-item>
        <a-descriptions-item label="涉案人数">
          {{model.wgxxModel.sfsa}}
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <div style="float: right">
      <!--<a-button type="primary" @click="infoWindowClose" style="margin: 5px 5px;">详情</a-button>-->
      <a-button @click="infoWindowClose" style="margin: 0;">关闭</a-button>
    </div>
  </bm-info-window>
</template>

<script>
  import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow.vue'
  import { getAction } from '@/api/manage'
  import { formatDecimals } from '@/utils/util'
  export default {
    name: 'GridInfoWindow',
    components: {
      BmInfoWindow
    },
    computed: {
      clkhszb() {
        return formatDecimals(this.model.wgywxxModel.clkhs/this.model.wgxxModel.zrs*100)+'%'
      },
      qzkhszb(){
        return formatDecimals(this.model.wgywxxModel.qzkhs/this.model.wgxxModel.zrs*100)+'%'
      },
      ckhszb() {
        return formatDecimals(this.model.wgywxxModel.ckhs/this.model.wgxxModel.zhs*100)+'%'
      },
      dkhszb() {
        return formatDecimals(this.model.wgywxxModel.dkhs/this.model.wgxxModel.zhs*100)+'%'
      },
      bldkhszb() {
        return formatDecimals(this.model.wgywxxModel.bldkhs/this.model.wgxxModel.zhs*100)+'%'
      },
      bwbldkhszb() {
        return formatDecimals(this.model.wgywxxModel.bwbldkhs/this.model.wgxxModel.zhs*100)+'%'
      },
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

          getWgxx: '/wgtjfx/wgxxtj/queryByWgbh',
          getWgywxx: '/wgtjfx/wgywtj/queryByWgbh',
        },
        gridInfo: {},
        model: {wgbh:'', wgmc:'', wgxxModel:{},wgywxxModel:{}},
        //model1: {wgxxModel:{},wgywxxModel:{},type:""},
        wgywxxData: [],
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
      getAreaInfo(wgbh, wgmc) {
        this.model.wgbh = wgbh
        this.model.wgmc = wgmc
        getAction(this.url.getWgxx, {wgbh: wgbh}).then(res => {
          if (res.success && res.result) {
            this.model.wgxxModel = Object.assign({}, res.result)
            console.log('this.model.wgxxModel', this.model.wgxxModel)
          }
        })
        getAction(this.url.getWgywxx, {wgbh: wgbh}).then(res => {
          if (res.success && res.result) {
            this.model.wgywxxModel = Object.assign({}, res.result)
            console.log('this.model.wgxxModel', this.model.wgxxModel)
            this.wgywxxData.push(res.result)
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
  .ant-descriptions-title {
    margin-bottom: 5px;
  }
</style>