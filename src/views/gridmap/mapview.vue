<template>
  <div class="mapbox">
    <baidu-map
      id="mapview"
      ref="bmmap"
      ak="Kx4kgzyIuH3RkkWC7dqGUFuzYP59DFkc"
      :center="center"
      :zoom="zoom"
      :map-click="false"
      @mousemove="syncPolygon"
      @ready="handler"
      @click="paintPolygon"
      @rightclick="newPolygon"
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
      <!--<bm-overlay-->
        <!--v-for="(desc,index) of descriptions"-->
        <!--:key="index"-->
        <!--ref="bmoverlaydesc"-->
        <!--pane="markerPane"-->
        <!--@draw="drawdesc">-->
        <!--<div>-->
          <!--<p>{{desc}}</p>-->
        <!--</div>-->
      <!--</bm-overlay>-->
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

      <!--<bm-overlay-->
        <!--ref="bmoverlay"-->
        <!--pane="labelPane"-->
        <!--:class="{sample: true, active}"-->
        <!--:hidden=true-->
        <!--@draw="draw"-->
        <!--@mouseover.native="active = true"-->
        <!--@mouseleave.native="active = false">-->
        <!--<div >-->
          <!--<p style="margin-bottom:15px;"><a href="#" @click="onTagClick('/tjfx/xdgtzyb1/zhxdgt/ZhxdgtList')"><span style="color: #fff;text-decoration: underline">详细信息</span></a></p>-->
          <!--<p style="margin-bottom:15px;">总客户数：1123</p>-->
          <!--<p style="margin-bottom:15px;">潜在客户数：1123</p>-->
          <!--<p style="margin-bottom:15px;">核心客户数：1123</p>-->
          <!--<p style="margin-bottom:15px;">存款户数：1123</p>-->
          <!--<p style="margin-bottom:15px;">贷款户数：1123</p>-->
          <!--<p style="margin-bottom:15px;">存款金额：1123</p>-->
          <!--<p style="margin-bottom:15px;">存款日平：1123</p>-->
          <!--<p style="margin-bottom:15px;">贷款余额：1123</p>-->
          <!--<p style="margin-bottom:15px;">本月走访次数：1123</p>-->
          <!--<p style="margin-bottom:15px;">累计走访次数：1123</p>-->
        <!--</div>-->
      <!--</bm-overlay>-->
      <bm-control>
        <div>
          <a-radio-group  style="width: 150px;" v-model="radioValue" >
            <a-radio-button value="1">
              营销单元
            </a-radio-button>
            <!--<a-radio-button value="2">-->
              <!--支行-->
            <!--</a-radio-button>-->
          </a-radio-group>
          <a-select placeholder="请选择营销单元" v-show="this.radioValue ==1" style="width: 100%;margin-right:10px;" @change="handleChange">
            <a-select-option value="">
              请选择营销单元
            </a-select-option>
            <a-select-option value="0">
              营业部
            </a-select-option>
            <a-select-option value="1">
              濂溪南街
            </a-select-option>
            <a-select-option value="2">
              西洲街道
            </a-select-option>
            <a-select-option value="3">
              宝珍西街
            </a-select-option>
            <a-select-option value="4">
              宝珍东街
            </a-select-option>
            <a-select-option value="5">
              家居广场
            </a-select-option>
            <a-select-option value="6">
              家电市场
            </a-select-option>
            <a-select-option value="7">
              爱莲商圈
            </a-select-option>
            <a-select-option value="8">
              批发市场
            </a-select-option>
          </a-select>
          <j-tree-select v-show="this.radioValue == 2" placeholder="请选择支行"
                         dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                         :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="true" />
        </div>
      </bm-control>
    </baidu-map>
    <!--<yxdy-detail-module ref="yxdyDetailModule"></yxdy-detail-module>-->
    <yxdytj-modal ref="yxdytjModal"></yxdytj-modal>
  </div>
</template>

<script>
  import { getAction } from '@/api/manage'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import myOverlay from './myOverlay'
  import YxdyDetailModule from './modules/yxdyDetailModule'
  import YxdytjModal from '../tjfx/yxdytj/modules/yxdytjModal'

  export default {
    name: 'mapview',
    components: {
      YxdytjModal,
      YxdyDetailModule,
      JTreeSelect, myOverlay
    },
    data () {
      return {
        // center: { lng: 116.412732, lat: 39.911707 },
        center: { lng: 111.598061, lat: 25.528598 },
        zoom: 18,
        polygonPath: {
          editing: false,
          paths: [
            // [
            //   {lng: 116.362571, lat: 39.951764},
            //   {lng: 116.459156, lat: 39.934726},
            //   {lng: 116.365158, lat: 39.902409},
            //   {lng: 116.319452, lat: 39.919012}
            // ],
            // [
            //   {lng: 116.26656, lat: 39.971231},
            //   {lng: 116.303067, lat: 39.958401},
            //   {lng: 116.272021, lat: 39.94579}
            // ],
            []
          ] // 绘制完成后的经纬度，其实是在画的时候动态push的，因为在点击的时候触发了 paintPolygon 函数
        },
        url:{
          queryPathInfo:'api/json/mapPath',
          queryMapoverlayInfo:'api/mapoverlay/info'
        },
        points: [],
        markPoint: {
          x: 112.952333,
          y: 28.224706
        },
        active: false,
        showOverLay: false,
        overLayOut: false,
        pathCenter: { lng: 0, lat: 0 },
        radioValue: '1',
        descriptions: [],
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
        zzbz: '',
        dybh: '',
      }
    },
    mounted: function () {
    },
    methods: {
      handler ({ BMap, map }) {
        let _this = this;
        console.log(BMap, map)
        map.enableScrollWheelZoom(true)
        // map.centerAndZoom('青岛市', 13)
        let point = new BMap.Point(111.598061,25.528598);
        map.centerAndZoom(point,18)
        console.log(this.$refs.bmoverlay)

        // var myGeo = new BMap.Geocoder();
        // // 将地址解析结果显示在地图上,并调整地图视野
        // myGeo.getPoint("北京市海淀区上地10街", function(point){
        //   if (point) {
        //     map.centerAndZoom(point, 16);
        //     map.addOverlay(new BMap.Marker(point));
        //   }else{
        //     alert("您选择地址没有解析到结果!");
        //   }
        // }, "北京市");

        //获取当前位置的经纬度
        // let geolocation = new BMap.Geolocation();
        // geolocation.getCurrentPosition(function (r) {
        //   if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        //     let point = r.point.lng + ',' + r.point.lat;
        //
        //   }else {
        //     console.log('failed' + this.getStatus());
        //   }
        // }, { enableHighAccuracy: true })

        // var marker = new BMap.Marker(new BMap.Point(this.markPoint.x, this.markPoint.y));
        // map.addOverlay(marker)
        _this.getPathDate()
      },
      getPathDate() {
        getAction(this.url.queryPathInfo).then((res)=>{
          // console.log(res);
          if (res.success) {
            this.polygonPath.paths = res.result.paths
            this.points = res.result.points
            this.descriptions = res.result.descriptions
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
        // 在这里做一步判断，如果有路径且开启绘制就把原来的路径清空
//        if (this.polygonPath.paths && this.polygonPath.editing) {
//          this.polygonPath.paths = []
//        }
      },
      // 鼠标移动时
      syncPolygon (e) {
        if (!this.polygonPath.editing) {
          return
        }
        const { paths } = this.polygonPath
        if (!paths.length) {
          return
        }
        const path = paths[paths.length - 1]
        // console.log("path:" + path.length)
        if (!path.length) {
          return
        }
        if (path.length === 1) {
          path.push(e.point)
        }
        this.$set(path, path.length - 1, e.point)
      },
      // 鼠标左键点击时往路径里push一个点
      newPolygon (e) {
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
        var marker = new BMap.Marker(this.getCenterPoint(path));
        console.log(this.$refs.bmmap)
        this.$refs.bmmap.addOverlay(marker);
        path.pop()
        if (path.length) {
          paths.push([])
        }
      },
      // 鼠标右键多边形绘制完成
      paintPolygon (e) {
        if (!this.polygonPath.editing) {
          return
        }
        const { paths } = this.polygonPath
        !paths.length && paths.push([])
        paths[paths.length - 1].push(e.point)
      },
      alertpath (e) {
        console.log("click");
        console.log(e.currentTarget.so)
        const { paths } = this.polygonPath
        this.$refs.bmoverlay.reload()
        paths.forEach((value, key)=>{
          // console.log("#####" + key);
          value.forEach((value1,key1)=>{
            // console.log("{lng: " + value1.lng + ", lat:" + value1.lat + "}");
          })
        })
      },
      // 打开信息窗口
      infoWindowClose(e) {
        this.infoWindow.show = false
      },
      // 关闭集中器信息窗口
      infoWindowOpen(e) {
        this.infoWindow.show = true
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
            this.zzbz = res.result.zzbz
            this.dybh = res.result.dybh
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
      draw ({el, BMap, map}) {
        console.log("draw")
        const pixel = map.pointToOverlayPixel(new BMap.Point(this.pathCenter.lng, this.pathCenter.lat))
        el.style.left = pixel.x - 5 + 'px'
        el.style.top = pixel.y - 2 + 'px'
        if (this.showOverLay) {
          el.hidden = false;
        } else {
          el.hidden = true;
        }
      },
      drawdesc ({el, BMap, map}) {
        console.log("drawdesc")
        const pixel = map.pointToOverlayPixel(new BMap.Point(this.pathCenter.lng, this.pathCenter.lat))
        el.style.left = pixel.x - 5 + 'px'
        el.style.top = pixel.y - 2 + 'px'
        if (this.showOverLay) {
          el.hidden = false;
        } else {
          el.hidden = true;
        }
      },
      getCenterPoint(path) {
        //var path =e.;//Array<Point> 返回多边型的点数组
        //var ret=parseFloat(num1)+parseFloat(num2);
        var x = 0.0;
        var y = 0.0;
        for (var i = 0; i < path.length; i++) {
          x = x + parseFloat(path[i].lng);
          y = y + parseFloat(path[i].lat);
        }
        x = x / path.length;
        y = y / path.length;
        //return new BMap.Point(path[0].lng,path[0].lat);
        return new BMap.Point(x, y);
        //return path[0];
      },
      clickHandler (e) {
        alert(`单击点的坐标为：${e.point.lng}, ${e.point.lat}`);
      },
      onTagClick(path) {
        // console.log("path");
        // this.$router.push(path)
        let param = {}
        param.zzbz = this.zzbz
        param.dybh = this.dybh
        this.$refs.yxdytjModal.edit(param);
        this.$refs.yxdytjModal.title = "营销单元详情";
        this.$refs.yxdytjModal.disableSubmit = false;
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
    width: 90%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  #mapview {
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
    height: 300px;
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