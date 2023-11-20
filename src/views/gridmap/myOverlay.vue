<template>
  <bm-overlay
    ref="customOverlay"
    :class="{sample: true, active}"
    pane="labelPane"
    :hidden="true"
    @draw="draw">
    <div v-html="text" @click="handleClick($event)"><div>{{text}}</div></div>
  </bm-overlay>
</template>

<script>
  import BmOverlay from 'vue-baidu-map/components/overlays/Overlay.vue'
  export default {
    name: 'myOverlay',
    components: {
      BmOverlay
    },
    props: ['text', 'position', 'active', 'showOverLay'],
    watch: {
      showOverLay: {
        handler () {
          this.$refs.customOverlay.reload()
        },
        deep: true
      }
    },
    methods: {
      handleClick (event) {
        if(event.target.nodeName === 'A' || event.target.nodeName === 'SPAN'){
          this.$emit('ontagclick','/tjfx/yxdytj/yxdytjList');
        }
      },
      detailClick(path) {
        console.log('detailClick')
      },
      onTagClick(path) {
        console.log(path);
        this.$router.push(path)
      },
      draw ({el, BMap, map}) {
        console.log('myoverlaydraw')
        const {lng, lat} = this.position
        const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
        el.style.left = pixel.x - 5 + 'px'
        el.style.top = pixel.y - 2 + 'px'
        if (this.showOverLay) {
          el.hidden = false;
        } else {
          el.hidden = true;
        }
      }
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