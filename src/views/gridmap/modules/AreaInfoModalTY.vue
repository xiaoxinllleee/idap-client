<template>
  <!-- 信息窗体-->
  <a-modal
    :title="title"
    :width="1000"
    :visible="visible"
    :footer="null"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <div class="info-window">
        <a-descriptions title="网格基本信息" :column="3" bordered>
          <a-descriptions-item label="网格编号">
            {{model.wgbh}}
          </a-descriptions-item>
          <a-descriptions-item label="网格名称">
            {{model.wgmc}}
          </a-descriptions-item>
          <a-descriptions-item label="金融村官" v-if="model.wgxx.level == 3">
            {{model.wgxx.wggjr1}}
          </a-descriptions-item>
          <a-descriptions-item label="行政村数量" v-if="cunNum > 0">
            {{cunNum}}
          </a-descriptions-item>
          <a-descriptions-item label="社区数量" v-if="sqNum > 0">
            {{sqNum}}
          </a-descriptions-item>
          <a-descriptions-item label="村组数量" v-if="zuNum > 0">
            {{zuNum}}
          </a-descriptions-item>
          <a-descriptions-item label="总户籍">
            {{model.wgxxModel.zhs}}
          </a-descriptions-item>
          <a-descriptions-item label="总人口">
            {{model.wgxxModel.zrs}}
          </a-descriptions-item>
          <a-descriptions-item label="存款客户数">
            {{model.wgywxxModel.ckkhs}}
          </a-descriptions-item>
          <a-descriptions-item label="贷款客户数">
            {{model.wgywxxModel.dkkhs}}
          </a-descriptions-item>
        </a-descriptions>

        <a-descriptions title="电子银行业务情况" :column="3" bordered>
          <a-descriptions-item label="手机银行">
            {{model.wgywxxModel.sjyhkhs}}
          </a-descriptions-item>
          <a-descriptions-item label="社保卡">
            {{model.wgywxxModel.sbkkhs}}
          </a-descriptions-item>
          <a-descriptions-item label="信用卡">
            {{model.wgywxxModel.xykkhs}}
          </a-descriptions-item>
          <a-descriptions-item label="福祥e支付">
            {{model.wgOtherInfoModel.fxezf}}
          </a-descriptions-item>
          <a-descriptions-item label="福祥e站">
            {{model.wgOtherInfoModel.znzd}}
          </a-descriptions-item>
        </a-descriptions>
      </div>
      <div style="float: right" slot="footer">
        <a-button @click="handleCancel" style="margin: 0;">关闭</a-button>
      </div>
    </a-spin>
  </a-modal>
</template>

<script>
  import { getAction } from '@/api/manage'
  export default {
    name: 'AreaInfoModalTY',
    data () {
      return {
        visible: false,
        confirmLoading: false,
        title: '详情',
        url: {
          getOrgInfo: '/jgtjfx/jghztj/getLatestInfo',
          getGridInfo: '/wgtjfx/wghztj/getLatestInfo',
          getWgxx: '/wgtjfx/wgxxtj/queryByWgbh',
          getWgywxx: '/wgtjfx/wgywtj/queryByWgbh',
          getWgxxOtherInfo: '/wgtjfx/wgywtj/getWgxxOtherInfo',
        },
        gridInfo: {},
        model: {wgbh:'', wgmc:'', wgxx: {}, wgxxModel:{},wgywxxModel:{}, wgOtherInfoModel: {}},
        zhenNum:0,
        cunNum:0,
        zuNum:0,
        sqNum:0,
      }
    },
    methods: {
      // 关闭信息窗口
      infoWindowClose(e) {
        this.visible = false
      },
      // 打开信息窗口
      infoWindowShow(wgmc) {
        this.visible = true
        this.title=wgmc + '详情'
      },
      getAreaInfo(wgxx) {
        this.confirmLoading = true
        this.model.wgbh = wgxx.wgbh
        this.model.wgmc = wgxx.wgmc
        this.model.wgxx = Object.assign({}, wgxx)
        this.zhenNum = 0
        this.cunNum = 0
        this.zuNum = 0
        this.sqNum = 0
        getAction(this.url.getWgxx, {wgbh: wgxx.wgbh}).then(res => {
          if (res.success && res.result) {
            this.model.wgxxModel = Object.assign({}, res.result)
            console.log('this.model.wgxxModel', this.model.wgxxModel)
          }
        })
        getAction(this.url.getWgywxx, {wgbh: wgxx.wgbh}).then(res => {
          if (res.success && res.result) {
            this.model.wgywxxModel = Object.assign({}, res.result)
            console.log('this.model.wgxxModel', this.model.wgxxModel)
          }
        })
        getAction(this.url.getWgxxOtherInfo, {wgbh: wgxx.wgbh}).then(res => {
          if (res.success && res.result) {
            this.model.wgOtherInfoModel = Object.assign({}, res.result)
            console.log('this.model.wgOtherInfoModel', this.model.wgOtherInfoModel)

            res.result.wgsl.forEach(e=>{
              if (e.wgxz=='1'){
                this.zhenNum=e.wgsl
              }else if(e.wgxz=='2'){
                this.cunNum=e.wgsl
              }else if(e.wgxz=='3'){
                this.zuNum=e.wgsl
              }else{
                this.sqNum=e.wgsl
              }
            })
          }
        }).finally(() => {
          this.confirmLoading = false
        })
      },
      handleCancel () {
        this.infoWindowClose()
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