<template>
  <div class="mapbox">
    <a-row :gutter="20" style="height: 100%">
      <!-- 左侧搜索框-->
      <a-col :span="4" style="height: 100%">
        <a-card :style="{height: mapHeight, overflow: 'auto'}">
          <a-radio-group  style="width: 150px;height: 100%" v-model="radioValue" @change="radioChange">
            <a-radio-button value="1">
              机构
            </a-radio-button>
            <a-radio-button value="2">
              网格
            </a-radio-button>
          </a-radio-group>

          <a-input-search @change="orgSelectChange" v-show="this.radioValue == 1" style="width:100%;margin-top: 10px" placeholder="输入机构名称查询..." allowClear enterButton />
          <a-tree
            v-show="radioValue == 1"
            v-if="organizationTreeData.length > 0"
            showLine
            checkStrictly
            :defaultExpandedKeys="expandedKeys"
            :selectedKeys="selectedKeys"
            :treeData="organizationTreeData"
            :autoExpandParent="autoExpandParent"
            @select="handleOrgTreeSelect"
          />
          <a-input-search @change="areaSelectChange" v-show="this.radioValue == 2" style="width:100%;margin-top: 10px" placeholder="输入网格名称查询..." allowClear enterButton />
          <a-tree
            v-show="this.radioValue == 2"
            v-if="areaTreeData.length > 0"
            showLine
            checkStrictly
            :selectedKeys="selectedAreaKeys"
            :treeData="areaTreeData"
            :defaultExpandedKeys="expandedAreaKeys"
            @select="handleAreaTreeSelect"
            :replaceFields="{ title:'wgmc', key:'id'}"
          />
        </a-card>
      </a-col>
      <!-- 右侧地图-->
      <a-col :span="20">
        <baidu-map
          id="mapview"
          :style="{height: mapHeight}"
          ref="bmmap"
          ak="Kx4kgzyIuH3RkkWC7dqGUFuzYP59DFkc"
          :center="center"
          :zoom="zoom"
          @mousemove="syncPolygon"
          @ready="handler"
          @click="paintPolygon"
          @rightclick="newPolygon"
        >
          <bm-marker :position="centerPoint" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
          <!-- 机构坐标点-->
          <bml-marker-clusterer :averageCenter="true" :styles="[{url: clustererImgUrl, size: {width: 53, height: 53}, textColor:'#ffffff', opt_textSize: 15 }]">
            <div v-for="(item, index) in organizationMarkers" :key="index">
              <bm-marker :position="item.position" :title="item.wgmc" :icon="{url: markerImgUrl, size: {width: 20, height: 25}, opts: {imageSize: {width: 20, height: 25}}}" @click="orgMarkerClick(item, $event)">
                <bm-label :content="item.wgmc" :offset="{width: -10, height: 25}" :labelStyle="{border: '1px solid #e8e8e8',backgroundColor:'rgba(0,0,0,0~1)'}"/>
              </bm-marker>
            </div>
          </bml-marker-clusterer>

          <bml-marker-clusterer   :averageCenter="true" :styles="[{url: clustererImgUrl, size: {width: 53, height: 53}, textColor:'#ffffff', opt_textSize: 15 }]">
            <div v-for="(cunitem, index) in cunMarkers" :key="index">
              <bm-marker :position="cunitem.position" :title="cunitem.wgmc" :icon="{url: cunmarkerImgUrl, size: {width: 20, height: 25}, opts: {imageSize: {width: 20, height: 25}}}" @click="cunMarkerClick(cunitem, $event)">
                <bm-label :content="cunitem.wgmc" :offset="{width: -10, height: 25}" :labelStyle="{border: '1px solid #e8e8e8',backgroundColor:'rgba(0,0,0,0~1)'}"/>
              </bm-marker>
            </div>
          </bml-marker-clusterer>

          <!-- 县边界-->
          <bm-polygon
            v-for="(path, index) of countyPath"
            :path="path"
            stroke-color="blue" fill-color="#A6FFFF" :fill-opacity="0.2" :stroke-opacity="0.5" :stroke-weight="1"
          />
          <!-- 乡镇边界-->
          <bm-polygon
            v-for="(areaInfo, index) of areaPolygonPath"
            :path="areaInfo.paths"
            stroke-color="black"
            fill-color="gray"
            :fill-opacity="0.3"
            :stroke-opacity="0.5"
            :stroke-weight="2"
            @click="showPolygonInfo(areaInfo, $event)"
          />
          <!-- 已绘制村边界-->
          <bm-polygon
            v-for="(villageInfo, index) of villagePolygonPath"
            :path="villageInfo.paths"
            stroke-color="black"
            :fill-color="fillColorList[index]"
            :fill-opacity="0.3"
            :stroke-opacity="0.5"
            :stroke-weight="2"
            @click="showPolygonInfo(villageInfo, $event)"
          />
          <!--绘制边界 -->
          <bm-polygon
            v-for="(path,index) of polygonPath.paths"
            :path="path"
            :key="index"
            stroke-color="blue"
            fill-color="#EE3B3B"
            :fill-opacity="0.3"
            :stroke-opacity="0.5"
            :stroke-weight="2"
            @click="alertpath"
            @mouseout="hidePolygonInfo"
          />
          <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
          <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
          <bm-control>
            <a-button type="primary" v-show="this.radioValue == 2" icon="scissor" @click="toggle('polygonPath')">{{ polygonPath.editing ? '鼠标单击右键停止绘制' : '绘制网格' }}</a-button>
            <a-button type="danger" v-show="this.radioValue == 2" :disabled="deleteGridDisabled" ghost @click="deleteGrid">删除网格</a-button>
          </bm-control>
          <!-- 信息窗体-->
          <grid-info-window ref="gridInfoWindow"/>
          <area-info-window  ref="areaInfoWindow"/>
          <area-info-window-y-x  ref="areaInfoWindowYX"/>
          <area-info-window-t-y  ref="areaInfoWindowTY"/>
          <area-info-modal-t-y ref="areaInfoModalTY"/>
        </baidu-map>
      </a-col>
    </a-row>
    <grid-choose-module ref="gridChooseModule" @ok="gridChooseOk"/>
  </div>
</template>

<script>
  import { getAction } from '@/api/manage'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import GridChooseModule from './modules/GridChooseModule'
  import { BmlMarkerClusterer } from 'vue-baidu-map'
  import BaiduMap from "vue-baidu-map/components/map/Map.vue"
  import BmBoundary from 'vue-baidu-map/components/others/Boundary.vue'
  import BmPolygon from 'vue-baidu-map/components/overlays/Polygon.vue'
  import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue'
  import BmGeolocation from 'vue-baidu-map/components/controls/Geolocation.vue'
  import BmLabel from 'vue-baidu-map/components/overlays/Label.vue'
  import BmScale from 'vue-baidu-map/components/controls/Scale.vue'
  import BmNavigation from 'vue-baidu-map/components/controls/Navigation.vue'
  import BmPointCollection from 'vue-baidu-map/components/overlays/PointCollection.vue'
  import BmControl from 'vue-baidu-map/components/controls/Control.vue'
  import BmView from 'vue-baidu-map/components/map/MapView.vue'
  import GridInfoWindow from "./modules/GridInfoWindow";
  import AreaInfoWindow from "./modules/AreaInfoWindow";
  import AreaInfoWindowYX from "./modules/AreaInfoWindowYX";
  import AreaInfoWindowTY from "./modules/AreaInfoWindowTY";
  import AreaInfoModalTY from "./modules/AreaInfoModalTY";
  import store from '@/store/'

  export default {
    name: 'wgksh',
    components: {
      GridInfoWindow,AreaInfoWindow,AreaInfoWindowYX,AreaInfoWindowTY,AreaInfoModalTY,
      GridChooseModule,
      JTreeSelect, BmlMarkerClusterer,
      BaiduMap, BmBoundary, BmPolygon, BmMarker, BmGeolocation, BmLabel, BmScale, BmNavigation, BmPointCollection, BmControl,BmView
    },
    data () {
      return {
        qybm:'',
        center: {lng: 0, lat: 0},
        zoom: 11,
        polygonPath: {
          editing: false,
          paths: [
            []
          ] // 绘制完成后的经纬度，其实是在画的时候动态push的，因为在点击的时候触发了 paintPolygon 函数
        },
        areaPolygonPath: [],
        areaPolygonTotalPath: [],
        villagePolygonPath: [],
        url:{
          queryAreaInfo: '/wghgl/wgzbxx/queryByWglx',
          queryOrganizationTreeList: '/sys/hrBasOrganization/queryTreeList',
          queryAreaTreeList: '/yxdyglmain/yxdyglMain/getYxdyglMaimTreeDate',
        },
        newPath: false,
        showOverLay: false,
        radioValue: '1',
        organizationTotalData: [],
        organizationTreeData: [],
        areaTreeData: [],
        areaTotalData: [],
        organizationMarkers: [],
        cunMarkers: [],
        cunTotalMarkers: [],
        organizationTotalMarkers: [],
        selectedKeys: [],
        selectedAreaKeys: [],
        expandedKeys: ['1'],
        expandedAreaKeys: [],
        autoExpandParent: true,
        infoWindow: {
          show: false,
          position: undefined,
          contents: undefined
        },
        countyPath: [],
        deleteGridDisabled: true,
        map: undefined,
        selectedGrid: undefined,
        centerPoint: { lng: 0, lat: 0 },
        fillColorList: ['#FFDEAD', '#FFE1FF', '#C6E2FF', '#EEE9BF', '#CDC8B1', '#B4EEB4'],
        markerImgUrl: require('@/assets/mark/mark_b.png'),
        cunmarkerImgUrl: require('@/assets/mark/mark_y.png'),
        clustererImgUrl: require('@/assets/mark/clusterer.png')
      }
    },
    computed: {
        // 滚动区高度
        // (业务需求：手机屏幕高度减去头部标题和底部tabbar的高度，当然这2个高度也是可以动态获取的)
        mapHeight: function() {
          console.log('window.clientHeight', document.documentElement.clientHeight)
          return (document.documentElement.clientHeight - 120 - 50) + 'px';
        },
        fillColor: function() {
          return this.fillColorList[Math.round(Math.random()*5)]
        }
    },
    mounted: function () {
      this.init()
    },
    created () {
      this.qybm = store.getters.qybm
    },
    methods: {
      init() {
        //查询
        getAction(this.url.queryOrganizationTreeList, {ywjgQuery: '1'}).then(res => {
          if (res.success) {
            this.organizationTreeData = res.result
            this.organizationTotalData = res.result
          }
        })
        getAction(this.url.queryAreaTreeList, {previousLevel: '3'}).then(res => {
          if (res.success) {
            this.expandedAreaKeys.push(res.result[0].id)
            this.areaTreeData = res.result
            this.areaTotalData = res.result
          }
        })
      },
      handler ({ BMap, map }) {
        let _this = this;
        console.log(BMap, map)
        this.map = map
        map.enableScrollWheelZoom(true)
        //获取中心点与区域
        this.getCountyInfo()
        this.getOrganizationInfo()
        this.getAreaInfo()
        //获取所有村的打点
        getAction(this.url.queryAreaInfo, {wglx: 4}).then((res) => {
          if (res.success) {
            let areaList = res.result
            areaList.forEach(item => {
              let marker = {}
              marker.wgbh = item.wgbh
              marker.wgmc = item.wgmc
              marker.wglx = 4
              marker.position = {lng: item.longitude, lat: item.latitude}
              this.cunMarkers.push(marker)
            })
            console.log('this.cunMarkers', this.cunMarkers)
            this.cunTotalMarkers = [...this.cunMarkers]
          }
        })





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

      },
      getCountyInfo() {
        getAction(this.url.queryAreaInfo, {wglx: 1}).then((res) => {
          console.log('getCountyInfo', res)
          if (res.success) {
            let countyInfo = res.result[0]
            this.center = {lng: countyInfo.longitude, lat: countyInfo.latitude}
            let polygon = eval('(' + countyInfo.polygon + ')')
            console.log('polygon', polygon)
            //有的区县边界坐标是列表，因为有多个地块

            polygon.forEach(item => {
              let polygonPath = []
              item.forEach(path => {
                polygonPath.push({lng: path[0], lat: path[1]})
              })
              this.countyPath.push(polygonPath)
            })
            console.log('this.countyPath', this.countyPath)
          }
        })
      },
      getOrganizationInfo() {
        getAction(this.url.queryAreaInfo, {wglx: 2}).then((res) => {
          console.log('getOrganizationInfo', res)
          if (res.success) {
            let organizationList = res.result
            organizationList.forEach(item => {
              let marker = {}
              marker.wgbh = item.wgbh
              marker.wgmc = item.wgmc
              marker.wglx = 2
              marker.position = {lng: item.longitude, lat: item.latitude}
              this.organizationMarkers.push(marker)
            })
            console.log('this.organizationMarkers', this.organizationMarkers)
            this.organizationTotalMarkers = [...this.organizationMarkers]
          }
        })
      },
      getAreaInfo() {
        //获取乡镇坐标与边界
        getAction(this.url.queryAreaInfo, {wglx: 3}).then((res) => {
          console.log('getAreaInfo', res)
          if (res.success) {
            let areaList = res.result
            areaList.forEach(item => {
              let polygon = eval('(' + item.polygon + ')')
              console.log('polygon', polygon)
              let polygonPath = []
              polygon.forEach(item => {
                polygonPath.push({lng: item[0], lat: item[1]})
              })
              this.areaPolygonTotalPath.push({wgmc: item.wgmc, wgbh: item.wgbh, lng: item.longitude, lat: item.latitude, paths: polygonPath})
            })
            console.log('areaPolygonPath', this.areaPolygonTotalPath)
          }
        })
      },
      //获取乡镇下所有村的坐标与边界
      getVillageInfo(wgxx) {
        console.log('getVillageInfo', wgxx)
        this.villagePolygonPath = []
        getAction(this.url.queryAreaInfo, {wglx: 4, sjwgbh: wgxx.parentId}).then((res) => {
          console.log('getAreaInfo', res)
          if (res.success) {
            let areaList = res.result

            areaList.forEach(item => {
              let polygon = eval('(' + item.polygon + ')')
              console.log('polygon', polygon)
              let polygonPath = []
              if(polygon){
                polygon.forEach(item => {
                  polygonPath.push({lng: item[0], lat: item[1]})
                })
              }
              this.villagePolygonPath.push({wgmc: item.wgmc, wgbh: item.wgbh, lng: item.longitude, lat: item.latitude, paths: polygonPath})
            })
            console.log('villagePolygonPath', this.villagePolygonPath)
            let area = this.villagePolygonPath.filter(item => {
              return item.wgbh == wgxx.wgbh
            })
            if (area && area.length > 0) {
              this.showPolygonInfo(area[0])
            } else {
              if(this.qybm == '095'){
                //没有村的坐标点，直接展示窗口
                this.$refs['areaInfoModalTY'].infoWindowClose()
                this.$refs['areaInfoModalTY'].getAreaInfo(wgxx)
                this.$refs['areaInfoModalTY'].infoWindowShow(wgxx.wgmc)
              }
            }
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
        if (!this.polygonPath.editing || !this.newPath) {
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
      // 鼠标右键多边形绘制完成
      newPolygon (e) {
        console.log("newPolygon", e)
        if (!this.polygonPath.editing) {
          return
        }
        // e.domEvent.preventDefault()
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
          let centerPoint = this.getCenterPoint(path)
          console.log('centerPoint', centerPoint)
          this.centerPoint = centerPoint
          this.$refs.gridChooseModule.init(path, centerPoint)
        }
        this.newPath = false;
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
        if (this.polygonPath.editing) {
          return
        }
        console.log("PolygonClick", e);
        this.deleteGridDisabled = false
        this.selectedGrid = e.target
      },
      // 打开信息窗口
      infoWindowClose(e) {
        this.infoWindow.show = false
      },
      // 关闭集中器信息窗口
      infoWindowShow(position) {
        this.center = position
        this.infoWindow.show = true
        this.infoWindow.position = position
      },
      showPolygonInfo(areaInfo, e) {
        if (this.polygonPath.editing) {
          return
        }
        console.log("showPolygonInfo", areaInfo)
        let position = {lng: areaInfo.lng, lat: areaInfo.lat}
        if(this.qybm=='350'){
          this.$refs['areaInfoWindowYX'].infoWindowClose()
          this.center = position
          this.$refs['areaInfoWindowYX'].getAreaInfo(areaInfo.wgbh, areaInfo.wgmc)
          this.$refs['areaInfoWindowYX'].infoWindowShow(position, areaInfo.wgmc)
        }else if(this.qybm == '095'){
          this.$refs['areaInfoWindowTY'].infoWindowClose()
          this.center = position
          this.$refs['areaInfoWindowTY'].getAreaInfo(areaInfo.wgbh, areaInfo.wgmc)
          this.$refs['areaInfoWindowTY'].infoWindowShow(position, areaInfo.wgmc)
        } else{
          this.$refs['areaInfoWindow'].infoWindowClose()
          this.center = position
          this.$refs['areaInfoWindow'].getAreaInfo(areaInfo.wgbh, areaInfo.wgmc)
          this.$refs['areaInfoWindow'].infoWindowShow(position, areaInfo.wgmc)
        }

      },
      hidePolygonInfo(e) {
        if (this.polygonPath.editing) {
          return
        }
        console.log("mouseout")
        this.showOverLay = false
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
        return {lng: x, lat: y}
        //return path[0];
      },
      clickHandler (e) {
        alert(`单击点的坐标为：${e.point.lng}, ${e.point.lat}`);
      },

      getWgxx(wgbh, treeData) {
        for (let i = 0; i < treeData.length; i++) {
          const node = treeData[i]
          if(node.wgbh == wgbh) {
            return node
          }
          if(node.children && node.children.length > 0) {
            let wgxx = this.getWgxx(wgbh, node.children)
            if (wgxx) {
              return wgxx
            }
          }
        }
      },

      handleAreaTreeSelect(selectedKeys, e) {
        console.log('handleAreaTreeSelect', selectedKeys, e)
        let wgbh = selectedKeys[0]
        let wgxx = this.getWgxx(wgbh, this.areaTotalData)
        console.log('wgxx', wgxx)
        if(wgxx.level == '3') {
          //选择的是村
          this.getVillageInfo(wgxx)
          return
        }
        console.log('wgxx', wgxx)
        let area = this.areaPolygonPath.filter(item => {
          return item.wgbh == wgbh
        })
        if (area && area.length > 0) {
          this.showPolygonInfo(area[0])
        }

        // if(this.qybm=='350'){
        //   this.$refs['areaInfoWindowYX'].infoWindowClose();
        //   if (area && area.length > 0) {
        //     let position = {lng: area[0].lng, lat: area[0].lat}
        //     this.center = position
        //     this.$refs['areaInfoWindowYX'].getAreaInfo(wgbh, area[0].wgmc)
        //     this.$refs['areaInfoWindowYX'].infoWindowShow(position, area[0].wgmc)
        //   }
        // }else{
        //   this.$refs['areaInfoWindow'].infoWindowClose();
        //   if (area && area.length > 0) {
        //     let position = {lng: area[0].lng, lat: area[0].lat}
        //     this.center = position
        //     this.$refs['areaInfoWindow'].getAreaInfo(wgbh, area[0].wgmc)
        //     this.$refs['areaInfoWindow'].infoWindowShow(position, area[0].wgmc)
        //   }
        // }


      },

      handleOrgTreeSelect(selectedKeys, e) {
        console.log('handleOrgTreeSelect', selectedKeys, e)
        let zzbz = selectedKeys[0]
        console.log('organizationMarkers', this.organizationMarkers)
        let marker = this.organizationMarkers.filter(item => {
          return item.wgbh == zzbz
        })
        console.log('marker', marker)
        this.$refs['gridInfoWindow'].infoWindowClose()
        if(marker && marker.length > 0) {
          this.center = marker[0].position
          this.$refs['gridInfoWindow'].getOrgInfo(zzbz)
          this.$refs['gridInfoWindow'].infoWindowShow(marker[0].position, marker[0].wgmc)
        }
      },
      orgMarkerClick(marker, e) {
        console.log(marker)
        console.log('orgMarkerClick', marker, e)
        this.$refs['gridInfoWindow'].infoWindowClose()
        this.center = marker.position
        this.$refs['gridInfoWindow'].getOrgInfo(marker.wgbh)
        this.$refs['gridInfoWindow'].infoWindowShow(marker.position, marker.wgmc)
      },

      cunMarkerClick(marker, e) {
        console.log(marker)
        console.log('orgMarkerClick', marker, e)
        let wgxx = this.getWgxx(marker.wgbh, this.areaTotalData)
        if(wgxx.level == '3') {
          //选择的是村
          this.getVillageInfo(wgxx)
          return
        }
        console.log('wgxx', wgxx)
        let area = this.areaPolygonPath.filter(item => {
          return item.wgbh == wgbh
        })
        if (area && area.length > 0) {
          this.showPolygonInfo(area[0])
        }
      },

      radioChange(e) {
        console.log('radioChange', e)
        this.$refs['gridInfoWindow'].infoWindowClose()
        if(this.qybm=='350'){
          this.$refs['areaInfoWindowYX'].infoWindowClose()

        }else{
          this.$refs['areaInfoWindow'].infoWindowClose()

        }
        let value = e.target.value
        if (value == '1') {
          //机构
          //显示机构坐标
          this.organizationMarkers = [...this.organizationTotalMarkers]
          this.areaPolygonPath = []
        } else if (value == '2') {
          //网格
          //显示网格坐标
          this.cunMarkers = [...this.cunTotalMarkers]
          console.log(this.cunMarkers)
          this.areaPolygonPath = [...this.areaPolygonTotalPath]
        }
      },
      orgSelectChange(e) {
        const value = e.target.value
        let keyList = []
        this.getKey(value, this.organizationTotalData, keyList, 'title', 'key')

        this.organizationTreeData = this.filterKey(keyList, this.organizationTotalData, 'key')
        console.log('getKey', keyList, this.organizationTreeData)

      },
      filterKey(keyList, tree, keyProp) {
        let newList = []
        for (let i = 0; i < tree.length; i++) {
          const node = Object.assign({}, tree[i])
          if(keyList.includes(node[keyProp])) {
            newList.push(node)
            if (node.children) {
              node.children = this.filterKey(keyList, node.children, keyProp)
            }
          }
        }
        return newList
      },

      //根据输入的值获取所有对应的树节点
      getKey(value, tree, keyList, titleProp, keyProp) {
        let match = false
        for (let i = 0; i < tree.length; i++) {
          const node = tree[i]
          if (node[titleProp].indexOf(value) > -1 ) {
            keyList.push(node[keyProp])
            match = true
          }
          if (node.children) {
            if(this.getKey(value, node.children, keyList, titleProp, keyProp) && ! match) {
              keyList.push(node[keyProp])
              match = true
            }
          }
        }
        return match
      },
      areaSelectChange(e) {
        console.log('areaSelectChange', e)
        const value = e.target.value
        let keyList = []
        this.getKey(value, this.areaTotalData, keyList,'wgmc', 'id')

        this.areaTreeData = this.filterKey(keyList, this.areaTotalData, 'id')
        console.log('getKey', keyList, this.areaTreeData)
      },
      deleteGrid() {
        console.log('deleteGrid', this.selectedGrid)
        let _that = this
        this.$confirm({
          title: "确认删除",
          content: "是否删除选中数据?",
          onOk: function () {
            getAction(_that.url.deleteBatch,).then((res) => {
              if (res.success) {
                _that.$message.success(res.message);
                _that.map.removeOverlay(this.selectedGrid)
              } else {
                _that.$message.warning(res.message);
              }
            }).finally(() => {
            });
          }
        })
      },
      gridChooseOk() {
        this.centerPoint = { lng: 0, lat: 0 }
      },
    }
  }
</script>

<style lang="less">
  .mapbox {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  #mapview {
    width: 100%;
    height: 800px;
    margin: 0;
    font-family: "微软雅黑";
    position: absolute;

    /*/deep/ .BMap_pop :not(.BMap_center) {*/
      /*background: rgba(255, 255, 255, 0) !important;*/
    /*}*/

    /deep/ .BMap_pop * {
      //
      background: rgba(255, 255, 255, 1) !important;
      /*color: #0000ff;*/

      /** {*/
        /*background: rgba(76, 175, 80, 0) !important;*/
      /*}*/
    }

    .info-window {
      //color: rgb(0, 220, 255);
      font-size: 1vw;
      width: 700px;
      //background-color: rgb(3, 8, 41);

      p {
        margin: 0;
      }

      .ant-descriptions-title {
        margin-botton: 5px;
      }
      .ant-descriptions-item-label {
        padding: 8px 8px;
      }

      .ant-descriptions-item-content {
        padding: 8px 8px;
      }
    }
    //设置百度地图pop消息框样式
    /deep/ .BMap_pop .BMap_center {
      //width: 730px !important;
      /*background: rgba(255, 255, 255, 1) !important;*/
      /*color: black !important;*/
    }
    //
    ///deep/ .BMap_pop .BMap_bottom {
    //  background-color: rgb(3, 8, 41);
    //  color: rgb(0, 220, 255);
    //}
    //
    ///deep/ .BMap_pop div:not(:nth-child(8)) {
    //  background-color: rgb(3, 8, 41);
    //  color: rgb(0, 220, 255);
    //
    //  div {
    //    background-color: rgb(3, 8, 41) !important;
    //    color: rgb(0, 220, 255) !important;
    //  }
    //}
    //
    //此处修改百度地图信息窗口的小箭头样式,里面的图标也可以在这里自定义,直接添加 img{}自定义就好了
    /deep/ .BMap_pop div:nth-child(8) {
      background-color: rgb(255, 255, 255, 0) !important;
      color: rgb(0, 220, 255) !important;
      //设置透明度
      opacity: 0.6;
    }

    /*.BMap_bottom {*/
      /*display: none;*/
    /*}*/
    /*.BMap_pop {*/
      /*> div,*/
      /*> img:nth-child(10) {*/
        /*display: none;*/
        /*overflow: unset;*/
      /*}*/
      /*> div:nth-child(9) {*/
        /*display: block;*/
        /*overflow: unset;*/
        /*width: 340px !important;*/
      /*}*/
      /*> div:nth-child(8){*/
        /*!*display: block;*!*/
      /*}*/
      /*.BMap_top {*/
        /*display: none;*/
      /*}*/
      /*.BMap_center {*/
        /*background: transparent;*/
        /*border: none;*/
        /*position: sticky !important;*/
        /*height: 100%;*/
      /*}*/
    /*}*/
    /*.BMap_bubble_content{*/
      /*background: rgba(0, 0, 0, .5);*/
      /*border-radius: 5px;*/
      /*padding: 20px;*/
      /*.info-window{*/
        /*padding-right: 8px;*/
        /*width: 100%;*/
        /*height: 350px;*/
        /*overflow: auto;*/
        /*.el-divider{*/
          /*background: #ccccccbf;*/
        /*}*/
        /*.address{*/
          /*color: #fff;*/
        /*}*/
      /*}*/
      /*//自定义滚动条样式*/
      /*.info-window::-webkit-scrollbar{*/
        /*width: 6px;*/
        /*height: 1px;*/
      /*}*/
      /*.info-window::-webkit-scrollbar-thumb{*/
        /*border-radius: 6px;*/
        /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
        /*background: #535353;*/
      /*}*/
      /*.info-window::-webkit-scrollbar-track{*/
        /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
        /*border-radius: 6px;*/
        /*background: #EDEDED;*/
      /*}*/
    /*}*/
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