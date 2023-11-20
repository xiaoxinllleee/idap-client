<template>
  <div class="mapbox">
    <baidu-map
      id="mapzone"
      ref="bmmap"
      :center="center"
      :zoom="zoom"
      :map-click="false"
      @mousemove="syncPolygon"
      @ready="handler"
      @click="paintPolygon"
      @rightclick ="newPolygon"
    >
      <bm-polygon
        v-for="(path,index) of polygonPath.paths"
        :path="path"
        :key="index"
        stroke-color="blue"
        fill-color="gray"
        :fill-opacity="0.3"
        :stroke-opacity="0.5"
        :stroke-weight="2"
        @click="alertpath"
        @mouseover="showPolygonInfo(index,$event)"
        @mouseout="hidePolygonInfo"
      />
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-point-collection :points="points" shape="BMAP_POINT_SHAPE_CIRCLE" color="blue" size="BMAP_POINT_SIZE_NORMAL" @click="clickHandler"></bm-point-collection>
      <bm-control>
        <a-button type="primary" size="large" icon="scissor" @click="toggle('polygonPath')">{{ polygonPath.editing ? '鼠标单击右键停止划分' : '开始划分' }}</a-button>
      </bm-control>
      <my-overlay
        :position="pathCenter"
        ref="myoverlay"
        :text="text"
        :active="active"
        :showOverLay="showOverLay"
        @mouseover.native="active = true"
        @mouseleave.native="active = false"
        @ontagclick="onTagClick">
      </my-overlay>
    </baidu-map>
    <map-zone-module ref="mapzoneModule"></map-zone-module>
    <yxdy-detail-module ref="yxdyDetailModule"></yxdy-detail-module>
  </div>
</template>

<script>
  import { getAction } from '@/api/manage'
  import MapZoneModule from './modules/mapZoneModule'
  import myOverlay from './myOverlay'
  import YxdyDetailModule from './modules/yxdyDetailModule'
  export default {
    name: 'mapzone',
    components: { MapZoneModule, myOverlay, YxdyDetailModule },
    data () {
      return {
        center: { lng: 0, lat: 0 },
        zoom: 18,
        polygonPath: {
          editing: false,
          paths: [
            []
          ] // 绘制完成后的经纬度，其实是在画的时候动态push的，因为在点击的时候触发了 paintPolygon 函数
        },
        url:{
          queryPathInfo:'api/json/mapPath',
          queryMapoverlayInfo:'api/mapoverlay/info'
        },
        newPath: false,
        editing: false,
        points: [],
        active: false,
        showOverLay: false,
        overLayOut: false,
        pathCenter: { lng: 0, lat: 0 },
        areaname:'',
        zkhs:0,
        qzkhs:0,
        hxkhs:0,
        ckhs:0,
        dkhs:0,
        ckje:0.00,
        ckrp:0.00,
        dkye:0.00,
        byzfcs:0,
        ljzfcs:0,
        text: '',
      }
    },
    mounted: function () {
    },
    points: [],
    methods: {
      handler ({ BMap, map }) {
        let _this = this;
        map.enableScrollWheelZoom(true)
        let point = new BMap.Point(111.598061,25.528598);
        map.centerAndZoom(point,18)
        _this.getPathDate()
      },
      getPathDate() {
        getAction(this.url.queryPathInfo).then((res)=>{
          // console.log(res);
          if (res.success) {
            this.polygonPath.paths = res.result.paths
            this.polygonPath.paths.push([])
            this.points = res.result.points
          }
        })
      },
      getClickInfo (e) {
        console.log(e.point.lng)
        console.log(e.point.lat)
      },
      // 开启多边形绘制
      toggle (name) {
        this[name].editing = !this[name].editing
        this.editing = !this.editing
        // 在这里做一步判断，如果有路径且开启绘制就把原来的路径清空
//        if (this.polygonPath.paths && this.polygonPath.editing) {
//          this.polygonPath.paths = []
//        }
      },
      // 鼠标移动时
      syncPolygon (e) {
        console.log("syncPolygon")
        if (!this.polygonPath.editing || !this.newPath) {
          return
        }
        const { paths } = this.polygonPath
        if (!paths.length) {
          return
        }
        const path = paths[paths.length - 1]
        console.log("path:" + path.length)
        if (!path.length) {
          return
        }
        if (path.length === 1) {
          path.push(e.point)
        }
        this.$set(path, path.length - 1, e.point)
      },
      // 鼠标右键多边形绘制完成
      newPolygon (e) {
        console.log("newPolygon")
        if (!this.polygonPath.editing) {
          return
        }
        // 当开始绘制后把按钮调回开始绘制状态，防止绘制多个图形
        this['polygonPath'].editing = !this['polygonPath'].editing
        const { paths } = this.polygonPath
        if (!paths.length) {
          paths.push([])
        }
        const path = paths[paths.length - 1]
        path.pop()
        if (path.length) {
          paths.push([])
        }
        this.newPath = false;
        console.log(paths)
        this.$refs.mapzoneModule.visible = true;
      },
      // 鼠标左键点击时往路径里push一个点
      paintPolygon (e) {
        console.log("paintPolygon")
        if (!this.polygonPath.editing) {
          return
        }
        const { paths } = this.polygonPath
        !paths.length && paths.push([])
        paths[paths.length - 1].push(e.point)
        this.newPath = true
      },
      alertpath (e) {
        console.log(e.currentTarget.so)
        console.log(this.polygonPath.paths[0])
      },
      clickHandler (e) {
        alert(`单击点的坐标为：${e.point.lng}, ${e.point.lat}`);
      },
      showPolygonInfo(index, e) {
        console.log("mouseover")
        // let point = this.getCenterPoint(e.currentTarget.zo)
        let point = this.points[index]
        console.log(index);
        console.log(point);
        this.pathCenter.lng = point.lng;
        this.pathCenter.lat = point.lat;

        var param  = {}
        param.index = index
        getAction(this.url.queryMapoverlayInfo, param).then((res)=>{
          // console.log(res);
          if (res.success) {
            this.areaname = res.result.areaname
            this.zkhs = res.result.zkhs
            this.qzkhs = res.result.qzkhs
            this.hxkhs = res.result.hxkhs
            this.ckhs = res.result.ckhs
            this.dkhs = res.result.dkhs
            this.ckje = res.result.ckje
            this.ckrp = res.result.ckrp
            this.dkye = res.result.dkye
            this.byzfcs = res.result.byzfcs
            this.ljzfcs = res.result.ljzfcs
            this.text = '<div >\n' +
              '          <p style="margin-bottom:15px;"><a href="#" @click.native="detailClick(\'/tjfx/xdgtzyb1/zhxdgt/ZhxdgtList\')"><span style="color: #2db7f5;text-decoration: underline;font-size:18px;">详细信息</span></a>' +
              '<span style="float:right;font-size:18px;">' + this.areaname + '</span></p>\n' +
              '          <p style="margin-bottom:15px;">总客户数：'+ this.zkhs +'</p>\n' +
              '          <p style="margin-bottom:15px;">潜在客户数：' + this.qzkhs + '</p>\n' +
              '          <p style="margin-bottom:15px;">核心客户数：' + this.hxkhs + '</p>\n' +
              '          <p style="margin-bottom:15px;">存款户数：' + this.ckhs + '</p>\n' +
              '          <p style="margin-bottom:15px;">贷款户数：' + this.dkhs + '</p>\n' +
              '          <p style="margin-bottom:15px;">存款金额：' + this.ckje + '</p>\n' +
              '          <p style="margin-bottom:15px;">存款日平：' + this.ckrp + '</p>\n' +
              '          <p style="margin-bottom:15px;">贷款余额：' + this.dkye + '</p>\n' +
              '          <p style="margin-bottom:15px;">本月走访次数：' + this.byzfcs + '</p>\n' +
              '          <p style="margin-bottom:15px;">累计走访次数：' + this.ljzfcs + '</p>\n' +
              '        </div>'
            this.showOverLay = true
          }
        })
        // this.$refs.myoverlay.reload()
        // this.infoWindow.show = true
      },
      hidePolygonInfo(e) {
        console.log("mouseout")
        this.overLayOut = true
        this.showOverLay = false
        // this.$refs.myoverlay.reload()
        this.overLayOut = false
      },
      onTagClick(path) {
        // console.log("path");
        // this.$router.push(path)
        this.$refs.yxdyDetailModule.edit({});
        this.$refs.yxdyDetailModule.title = "营销单元详情";
        this.$refs.yxdyDetailModule.disableSubmit = false;
      },
      handleChange(value) {
        let point = new BMap.Point(111.598061,25.528598);
        this.$refs.bmmap.map.centerAndZoom(point,18)
        this.hidePolygonInfo()
        this.showPolygonInfo(value)
        // let point = new BMap.Point(this.points[value].lng, this.points[value].lat);
        // this.pathCenter.lng = point.lng;
        // this.pathCenter.lat = point.lat;
        // this.showOverLay = true
        // this.$refs.bmoverlay.reload()
      }
    }
  }
</script>

<style scoped lang="less">
  .mapbox {
    /*width: 1350px;*/
    width: 90%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  #mapzone {
    width: 90%;
    height: 100%;
    margin: 0;
    font-family: "微软雅黑";
    position: absolute;
  }

  .anchorBL{
    display:none
  }

  .BMap_cpyCtrl{
    display:none;
  }
  .sample {
    width: 180px;
    height: 260px;
    line-height: 10px;
    background: rgba(0,0,0,0.5);
    overflow: hidden;
    box-shadow: 0 0 5px #000;
    color: #fff;
    text-align: left;
    padding: 10px;
    position: absolute;
  }
  .sample.active {
    background: rgba(0,0,0,0.75);
    color: #fff;
  }
</style>