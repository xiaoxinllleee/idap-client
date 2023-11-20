<!--Author： Penghr-->
<!--Date：2020-08-29-->
<!--Discription：工作台(浏阳“支行长”)-->

<template>
  <page-layout :avatar="avatar">
    <div slot="headerContent" style="margin-top: 20px;">
      <div class="title">{{ timeFix }}，{{ nickname() }}<span class="welcome-text" style="display: none">，{{ welcome() }}</span></div>
      <div>{{ this.roleName }} | {{ this.orgName }}</div>
    </div>

    <div slot="extra" >
      <a-row class="more-info" :gutter="0"  >
        <a-col :span="6"  >
          <head-info title="存款余额" :content="this.RightTopDataList.ckye | NumberFormat" :center="true" :bordered="false"/>
        </a-col>
        <a-col :span="6"  >
          <head-info title="其中定期余额" :content="this.RightTopDataList.qzdqckye | NumberFormat" :center="true" :bordered="false"/>
        </a-col>
        <a-col :span="6" >
          <head-info title="当年存款日平" :content="this.RightTopDataList.dnckrp | NumberFormat" :center="true" :bordered="false"/>
        </a-col>
        <a-col :span="6" >
          <head-info title="存款客户数" :content="this.RightTopDataList.ckkhs | NumberFormat" :center="true" :bordered="false"/>
        </a-col>
      </a-row>

      <a-divider style="margin-top: 10px; margin-bottom: 10px"/>

      <a-row style="margin-top: 10px; margin-bottom:15px" class="more-info" :gutter="0"  >
        <a-col :span="6">
          <head-info title="贷款余额" :content="this.RightTopDataList.dkye | NumberFormat" :center="true" :bordered="false"/>
        </a-col>
        <a-col :span="6" >
          <head-info title="表内不良余额" :content="this.RightTopDataList.bnbldkye | NumberFormat" :center="true" :bordered="false"/>
        </a-col>
        <a-col :span="6" >
          <head-info title="表外不良余额" :content="this.RightTopDataList.bwbldkye | NumberFormat" :center="true" :bordered="false"/>
        </a-col>
        <a-col :span="6" >
          <head-info title="贷款客户数" :content="this.RightTopDataList.dkkhs | NumberFormat" :center="true" :bordered="false"/>
        </a-col>
      </a-row>
    </div>

    <div>
      <a-row :gutter="8">
        <a-col :xl="14" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card title="快速开始 / 便捷导航" :bordered="false" :body-style="{padding: 0}" style="margin-bottom: 15px">
            <div class="item-group">
              <a-tag color="blue" @click="onTagClick('/activiti/apply-manage/applyManage')" style="margin:0 30px 20px 0;height: 24px"><span style="font-size: 14px;height:24px;">我的申请</span></a-tag>
              <a-tag color="blue" @click="onTagClick('/activiti/todo-manage/todoManage')" style="margin:0 30px 20px 0;height: 24px"><span style="font-size: 14px;height:24px;">我的待办</span></a-tag>
              <a-tag color="blue" @click="onTagClick('/GrkhpjsxList')" style="margin:0 30px 20px 0;height: 24px"><span style="font-size: 14px;height:24px;">小额农贷授信</span></a-tag>
              <a-tag color="blue" @click="onTagClick('/GrdkSplcList')" style="margin:0 30px 20px 0;height: 24px"><span style="font-size: 14px;height:24px;">个人贷款授信</span></a-tag>
              <a-tag color="blue" @click="onTagClick('/CamsZcsxGrpjsxxxSpjlList')" style="margin:0 30px 20px 0;height: 24px"><span style="font-size: 14px;height:24px;">小额农贷审批</span></a-tag>
              <a-tag color="blue" @click="onTagClick('/xdgl/grdkgl/GrdkSpJgList')" style="margin:0 30px 20px 0;height: 24px"><span style="font-size: 14px;height:24px;">个人贷款审批</span></a-tag>
            </div>
          </a-card>

          <a-card title="小额农贷" :loading="loading" :bordered="false" :body-style="{ padding: 0,backgroundColor: ' #E1FFFF'}" style="margin-bottom: 15px;">
            <router-link slot="extra" :to="{path: ''}"> ( </router-link>
            <router-link slot="extra" :to="{path: '/khgl/vKhglKrkhgl/list'}">调查</router-link>
            <router-link slot="extra" :to="{path: ''}"> / </router-link>
            <router-link slot="extra" :to="{path: '/GrkhpjsxList'}">授信</router-link>
            <router-link slot="extra" :to="{path: ''}"> / </router-link>
            <router-link slot="extra" :to="{path: '/CamsZcsxGrpjsxxxSpjlList'}">已审批</router-link>
            <router-link slot="extra" :to="{path: ''}"> ) </router-link>
            <div>
              <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in xendCardDataList">
                <a-card :bordered="false" :body-style="{ padding: 0, backgroundColor: ' #E1FFFF'}">
                  <a-card-meta>
                    <div slot="title" class="card-title" style="font-size: 14px;color: rgba(0, 0, 0, 0.75)" >
                      {{ item.title }}
                    </div>
                    <div slot="description" class="card-description" style="font-size: 30px;text-align: center;" >
                      <a @click="onTagClick(item.path)" >{{ item.value }}</a>
                    </div>
                  </a-card-meta>
                </a-card>
              </a-card-grid>
            </div>
          </a-card>

          <a-card title="个人贷款" :loading="loading" :bordered="false" :body-style="{ padding: 0,backgroundColor: '#E1FFFF'}" style="margin-bottom: 15px;">
            <router-link slot="extra" :to="{path: ''}"> ( </router-link>
            <router-link slot="extra" :to="{path: '/xdgl/grdkgl/GrdkglList'}">调查</router-link>
            <router-link slot="extra" :to="{path: ''}"> / </router-link>
            <router-link slot="extra" :to="{path: '/GrdkSplcList'}">授信</router-link>
            <router-link slot="extra" :to="{path: ''}"> / </router-link>
            <router-link slot="extra" :to="{path: '/xdgl/grdkgl/GrdkSpJgList'}">已审批</router-link>
            <router-link slot="extra" :to="{path: ''}"> ) </router-link>
            <div>
              <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in grdkCardDataList">
                <a-card :bordered="false" :body-style="{ padding: 0, backgroundColor: '#E1FFFF'}">
                  <a-card-meta>
                    <div slot="title" class="card-title" style="font-size: 14px;color: rgba(0, 0, 0, 0.75)" >
                      {{ item.title }}
                    </div>
                    <div slot="description" class="card-description" style="font-size: 30px;text-align: center;" >
                      <a @click="onTagClick(item.path)" >{{ item.value }}</a>
                    </div>
                  </a-card-meta>
                </a-card>
              </a-card-grid>
            </div>
          </a-card>
        </a-col>

        <a-col :xl="10" :lg="24" :md="24" :sm="24" :xs="24" style="padding: 0 12px">
          <a-card title="小额农贷" :loading="loading" :bordered="false" :body-style="{ padding: '8px' }" style="margin-bottom: 15px">
            <xend-khpddj-for-zhhz ref="EchartXendPddj" :zzbz="this.user.orgCode"/>
          </a-card>

          <a-card title="个人贷款" :loading="loading" :bordered="false" :body-style="{ padding: '8px' }" style="margin-bottom: 15px">
            <grdk-khpddj-for-zhhz ref="EchartGrdkPddj" :zzbz="this.user.orgCode"/>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <user-role-modal ref="modalUserRole"></user-role-modal>

  </page-layout>
</template>

<script>
  import { timeFix } from "@/utils/util"
  import {mapGetters} from "vuex"

  import PageLayout from '@/components/page/PageLayout'
  import HeadInfo from '@/components/tools/HeadInfo'
  import Radar from '@/components/chart/Radar'
  import { getRoleList, getServiceList, getAction } from "@/api/manage"
  import UserRoleModal from '@/views/system/modules/UserRoleModal'
  import ACol from "ant-design-vue/es/grid/Col"
  import XendKhpddjForZhhz from './tbsj/workplace/xendKhpddjForZhhz'
  import GrdkKhpddjForZhhz from './tbsj/workplace/grdkKhpddjForZhhz'

  const DataSet = require('@antv/data-set')

  export default {
    name: "Workplace",
    components: {
      GrdkKhpddjForZhhz,
      XendKhpddjForZhhz,
      ACol,
      PageLayout,
      HeadInfo,
      Radar,
      UserRoleModal
    },
    data() {
      return {
        loading: true,
        radarLoading: true,
        timeFix: timeFix(),
        avatar: '',
        roleName: '',
        orgName: '',
        user: {},
        projects: [],
        key: 'tab1',
        // 工作台右上角数据
        RightTopDataList: {},
        // 工作台左侧数据
        xendCardDataList: [
          {
            "id": 1,
            "title": "采集客户数",
            "value": 0,
            "path": "/khgl/vKhglKrkhgl/list"
          },
          {
            "id": 2,
            "title": "授信客户数",
            "value": 0,
            "path": '/GrkhpjsxList'
          },
          {
            "id": 3,
            "title": "用信客户数",
            "value": 0,
            "path": ''
          },
          {
            "id": 4,
            "title": "未授信客户数",
            "value": 0,
            "path": ''
          },
          {
            "id": 5,
            "title": "授信总金额",
            "value": 0,
            "path": ''
          },
          {
            "id": 6,
            "title": "用信总金额",
            "value": 0,
            "path": ''
          },
        ],
        grdkCardDataList: [
          {
            "id": 1,
            "title": "采集客户数",
            "value": 0,
            "path": "/xdgl/grdkgl/GrdkglList"
          },
          {
            "id": 2,
            "title": "授信客户数",
            "value": 0,
            "path": '/GrdkSplcList'
          },
          {
            "id": 3,
            "title": "用信客户数",
            "value": 0,
            "path": ''
          },
          {
            "id": 4,
            "title": "未授信客户数",
            "value": 0,
            "path": ''
          },
          {
            "id": 5,
            "title": "授信总金额",
            "value": 0,
            "path": ''
          },
          {
            "id": 6,
            "title": "用信总金额",
            "value": 0,
            "path": ''
          },
        ],
        xendDataList: {},
        grdkDataList: {},
      }
    },
    computed: {
      userInfo() {
        return this.$store.getters.userInfo
      }
    },
    created() {
      this.user = this.userInfo
      this.avatar = window._CONFIG['staticDomainURL'] +"/"+ this.userInfo.avatar
      // console.log('this.avatar :'+ this.avatar)
    },
    mounted() {
      this.getProjects();
      this.getRoleNameAndOrgName();
    },
    methods: {
      ...mapGetters(["nickname", "welcome"]),
      // 获取用户角色名称及所属组织简称
      getRoleNameAndOrgName() {
        this.$http.get('/workplace/getUserRoleNameAndOrgName').then((res) => {
          if (res.success) {
            this.roleName = res.result.roleName;
            this.orgName  = res.result.orgName;

            // 获取工作台右上角数据
            getAction("/workplace/getRightTopDataByYgghForZhhz", {zzbz: this.user.orgCode}).then((res) => {
              if (res.success) {
                this.RightTopDataList = res.result;
                // console.log("支行行长-存款余额："+this.RightTopDataList.ckye);
                // console.log("支行行长-其中定期余额："+this.RightTopDataList.qzdqckye);
                // console.log("支行行长-当年存款日平："+this.RightTopDataList.dnckrp);
                // console.log("支行行长-存款客户数："+this.RightTopDataList.ckkhs);
                // console.log("=================================================");
                // console.log("支行行长-贷款余额："+this.RightTopDataList.dkye);
                // console.log("支行行长-表内不良余额："+this.RightTopDataList.bnbldkye);
                // console.log("支行行长-表外不良余额："+this.RightTopDataList.bwbldkye);
                // console.log("支行行长-贷款客户数："+this.RightTopDataList.dkkhs);
                // console.log("=================================================");
              }
            })

            // 获取左侧小额农贷数据
            getAction("/workplace/getLeftXendDataForZhhz", {zzbz: this.user.orgCode}).then((res) => {
              if (res.success) {
                this.xendDataList = res.result;
                for (var i = 0; i <= this.xendCardDataList.length; i++) {
                  let obj = this.xendCardDataList[i];
                  if (obj.id == 1) {
                    obj.value = this.xendDataList.cjkhs;
                  } else if (obj.id == 2) {
                    obj.value = this.xendDataList.sxkhs;
                  } else if (obj.id == 3) {
                    obj.value = this.xendDataList.yxkhs;
                  } else if (obj.id == 4) {
                    obj.value = this.xendDataList.wsxkhs;
                  } else if (obj.id == 5) {
                    obj.value = this.xendDataList.sxje;
                  } else if (obj.id == 6) {
                    obj.value = this.xendDataList.yxje;
                  }
                }
              }
            })
            // 获取左侧个人贷款数据
            getAction("/workplace/getLeftGrdkDataForZhhz", {zzbz: this.user.orgCode}).then((res) => {
              if (res.success) {
                this.grdkDataList = res.result;
                for (var i = 0; i <= this.grdkCardDataList.length; i++) {
                  let obj = this.grdkCardDataList[i];
                  if (obj.id == 1) {
                    obj.value = this.grdkDataList.cjkhs;
                  } else if (obj.id == 2) {
                    obj.value = this.grdkDataList.sxkhs;
                  } else if (obj.id == 3) {
                    obj.value = this.grdkDataList.yxkhs;
                  } else if (obj.id == 4) {
                    obj.value = this.grdkDataList.wsxkhs;
                  } else if (obj.id == 5) {
                    obj.value = this.grdkDataList.sxje;
                  } else if (obj.id == 6) {
                    obj.value = this.grdkDataList.yxje;
                  }
                }
              }
            })
          }
        })
      },
      getProjects() {
        this.$http.get('/api/list/search/projects')
          .then(res => {
            this.projects = res.result && res.result.data
            this.loading = false
          })
      },
      onTabChange (key, type) {
        console.log(key, type)
        this[type] = key
      },
      onTagClick(path) {
        console.log(path);
        this.$router.push(path)
      },
      handlePerssion: function(roleId){
        // alert(roleId);
        this.$refs.modalUserRole.show(roleId);
      },
    }
  }
</script>

<style lang="less" scoped>
  .project-list {

    .project-card-grid {
      width: 100%;
      padding: 5px;
    }
    .card-title {
      font-size: 0;
      text-align: center;

      a {
        color: rgba(0, 0, 0, 0.85);
        margin-left: 12px;
        line-height: 24px;
        height: 24px;
        display: inline-block;
        vertical-align: top;
        font-size: 14px;

        &:hover {
          color: #1890ff;
        }
      }
    }
    .card-description {
      color: rgba(0, 0, 0, 0.45);
      min-height: 44px;
      line-height: 22px;
      overflow: hidden;
    }
    .list-item-actions{
      margin-right: 20px;
    }
    .project-item {
      display: flex;
      margin-top: 8px;
      overflow: hidden;
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      a {
        color: rgba(0, 0, 0, 0.45);
        display: inline-block;
        flex: 1 1 0;

        &:hover {
          color: #1890ff;
        }
      }
      .datetime {
        color: rgba(0, 0, 0, 0.25);
        flex: 0 0 auto;
        float: right;
      }
    }
    .ant-card-meta-description {
      color: rgba(0, 0, 0, 0.45);
      height: 44px;
      line-height: 22px;
      overflow: hidden;
    }
  }

  .item-group {
    padding: 20px 0 8px 24px;
    font-size: 0;
    a {
      color: rgba(0, 0, 0, 0.65);
      display: inline-block;
      font-size: 14px;
      margin-bottom: 13px;
      width: 25%;
    }
  }

  .members {
    a {
      display: block;
      margin: 12px 0;
      line-height: 24px;
      height: 24px;
      .member {
        font-size: 14px;
        color: rgba(0, 0, 0, .65);
        line-height: 24px;
        max-width: 100px;
        vertical-align: top;
        margin-left: 12px;
        transition: all 0.3s;
        display: inline-block;
      }
      &:hover {
        span {
          color: #1890ff;
        }
      }
    }
  }

  .mobile {

    .project-list {

      .project-card-grid {
        width: 100%;
      }
    }

    .more-info {
      border: 0;
      padding-top: 16px;
      margin: 16px 0 16px;
    }

    .headerContent .title .welcome-text {
      display: none;
    }
  }

</style>