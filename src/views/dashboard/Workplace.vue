<template>
  <page-layout :avatar="avatar">
    <div slot="headerContent" style="margin-top: 6%">
      <div class="title">{{ timeFix }}，{{ nickname() }}<span class="welcome-text" style="display: none">，{{ welcome() }}</span></div>
      <div>{{ this.roleName }} | {{ this.orgName }}</div>
    </div>

    <div slot="extra"  >
      <a-card title="快速入口" style="margin-bottom: 18px" :bordered="false" :body-style="{padding: 0}" >
        <div class="item-group" style="width: 1100px;">

          <span v-for="(item, i) in navList">
             <a-tag color="blue" @click="onTagClick(item.permissionIdPath_dictText)" style="margin:0 30px 20px 0;height: 24px"><span style="font-size: 14px;height:24px;">{{ item.permissionId_dictText }}</span></a-tag>
          </span>
<!--          <a-tag color="blue" @click="onTagClick('/gzap/gzrz/GzapRzglList/')" style="margin:0 30px 20px 0;height: 24px"><span style="font-size: 14px;height:24px;">工作日志</span></a-tag>
          <a-tag color="blue" @click="onTagClick('/gzap/gzrz/GzapRzglList/')" style="margin:0 30px 20px 0;height: 24px"><span style="font-size: 14px;height:24px;">个人设置</span></a-tag>
          <a-tag color="blue" @click="onTagClick('/marketing/CustomerVisit/')" style="margin:0 30px 20px 0;height: 24px"><span style="font-size: 14px;height:24px;">客户回访</span></a-tag>
          <a-tag color="blue" @click="onTagClick('/gridmap/mapview/')" style="margin:0 30px 20px 0;height: 24px"><span style="font-size: 14px;height:24px;">区域可视化</span></a-tag>
          <a-tag color="blue" @click="onTagClick('/khgl/khtycx/KhtycxList/')" style="margin:0 30px 20px 0;height: 24px"><span style="font-size: 14px;height:24px;">客户统一查询</span></a-tag>
          <a-tag color="blue" @click="onTagClick('/gzap/gzrz/GzapRzglList/')" style="margin:0 30px 20px 0;height: 24px"><span style="font-size: 14px;height:24px;">工作日志</span></a-tag>
          -->
          <a-button size="small" type="primary" ghost icon="edit" @click="handlePerssion">编辑</a-button>
          <a-button size="small" type="primary" ghost icon="delete" @click="handleDelAll" style="margin-left: 10px">清空</a-button>
        </div>
      </a-card>

    </div>

    <div>
      <a-row :gutter="8">
        <a-col :xl="14" :lg="24" :md="24" :sm="24" :xs="24">

          <a-card
            :loading="loading"
            title="消息提醒"
            >
            <div>
              <a-card-grid  :key="i" v-for="(item, i) in messageList">
                <a-card :bordered="false">
                  <a-card-meta>
                    <a-avatar size="large" slot="avatar" shape="square" :src="prefix+item.bz"></a-avatar>
                    <div slot="title"   style="font-size: 14px;color: rgba(0, 0, 0, 0.75)" >
                      {{ item.title }}
                    </div>
                    <div slot="description"  style="font-size: 30px;" >
                      <a @click="onTagClickWithParams(item)" >{{ item.content }}</a>
                    </div>
                  </a-card-meta>
                </a-card>
              </a-card-grid>

            </div>
          </a-card>
        </a-col>
        <a-col
          style="padding: 0 12px"
          :xl="10"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24">
          <a-card :loading="loading" style="height: 592px" title="通知/公告" :bordered="false" :body-style="{ padding: '8px' }">
            <a-list>
              <a-list-item :key="index" v-for="(item, index) in infoList">
                <a-list-item-meta>
                  <a-avatar slot="avatar"  icon="bell" style="backgroundColor:#FFD700"/>
                  <div slot="title">
                    <a-tag color="purple">
                      {{ item.titile }}
                    </a-tag>
                  </div>
                  <div slot="description">
                    <div v-html="item.msgContent"></div>
                    &nbsp;&nbsp;&nbsp;<span style="float: right">{{ item.endTime }}</span>
                  </div>
                </a-list-item-meta>
<!--                <a-tag color="red">紧急消息</a-tag>-->
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <user-role-nav-modal ref="modalUserRole" @ok="getNav"></user-role-nav-modal>
  </page-layout>
</template>

<script>
  import { timeFix } from "@/utils/util"
  import {mapGetters} from "vuex"

  import PageLayout from '@/components/page/PageLayout'
  import HeadInfo from '@/components/tools/HeadInfo'
  import Radar from '@/components/chart/Radar'
  import { getRoleList, getServiceList ,getAction} from "@/api/manage"
  import UserRoleNavModal from '@/views/system/modules/UserRoleNavModal'
  import ACol from "ant-design-vue/es/grid/Col";
  import ImagPreview from '@views/jeecg/ImagPreview'

  const DataSet = require('@antv/data-set')

  export default {
    name: "Workplace",
    components: {
      ImagPreview,
      ACol,
      PageLayout,
      HeadInfo,
      Radar,
      UserRoleNavModal
    },
    data() {
      return {

        timeFix: timeFix(),
        avatar: '',
        user: {},
        roleName: '',
        orgName: '',
        projects: [],
        loading: true,
        radarLoading: true,
        activities: [],
        teams: [],
        messageList:[],
        infoList: [],
        navList: [],
        axis1Opts: {
          dataKey: 'item',
          line: null,
          tickLine: null,
          grid: {
            lineStyle: {
              lineDash: null
            },
            hideFirstLine: false
          }
        },
        axis2Opts: {
          dataKey: 'score',
          line: null,
          tickLine: null,
          grid: {
            type: 'polygon',
            lineStyle: {
              lineDash: null
            }
          }
        },
        scale: [{
          dataKey: 'score',
          min: 0,
          max: 80
        }],
        axisData: [

        ],
        radarData: [],
        key: 'tab1',
        prefix:'',
      }
    },
    computed: {
      userInfo() {
        return this.$store.getters.userInfo
      }
    },
    created() {
      this.user = this.userInfo
      console.log(this.user);
      this.avatar = window._CONFIG['staticDomainURL'] +"/png/Avatar.png"
      this.prefix = window._CONFIG['staticDomainURL'] +"/png/"
      getRoleList().then(res => {
        console.log('workplace -> call getRoleList()', res)
      })
      getServiceList().then(res => {
        console.log('workplace -> call getServiceList()', res)
      })
    },
    mounted() {
      this.getNav()
      this.getAnnouncement();
      this.getXxzxList();
      this.getProjects()
      this.getActivity()
      this.getTeams()
      this.initRadar()
      this.getRoleNameAndOrgName();
    },
    methods: {
      ...mapGetters(["nickname", "welcome", "orgCode"]),
      getRoleNameAndOrgName() {
        this.$http.get('/workplace/getUserRoleNameAndOrgName').then((res) => {
          if (res.success) {
            this.roleName = res.result.roleName;
            this.orgName  = res.result.orgName;
            this.roleId  = res.result.roleId;
          }
        })
      },
      getNav(){
        getAction("/system/sysPermissionNav/listAll",{"sfly":"1"}).then(res=>{
          this.navList = res.result
        })
      },
      getAnnouncement(){
        getAction('/sys/annountCement/list').then(res=>{
          console.log(res)
          this.infoList = res.result.records;
        })
      },
      getXxzxList(){
        getAction("/xxzx/getXxzxList").then(res=>{
          this.messageList = res.result;
          console.log("this.messageList")
          console.log(this.messageList)
        })
      },
      getProjects() {
        this.$http.get('/api/list/search/projects')
          .then(res => {
            this.projects = res.result && res.result.data
            this.loading = false
          })
      },
      getActivity() {
        this.$http.get('/api/workplace/activity')
          .then(res => {
            this.activities = res.result
          })
      },
      getTeams() {
        this.$http.get('/api/workplace/teams')
          .then(res => {
            this.teams = res.result
          })
      },
      initRadar() {
        this.radarLoading = true

        this.$http.get('/api/workplace/radar')
          .then(res => {

            const dv = new DataSet.View().source(res.result)
            dv.transform({
              type: 'fold',
              fields: ['个人', '团队', '部门'],
              key: 'user',
              value: 'score'
            })

            this.radarData = dv.rows
            this.radarLoading = false
          })
      },
      onTabChange (key, type) {
        console.log(key, type)
        this[type] = key
      },
      onTagClick(path) {
        this.$router.push(path)
      },
      onTagClickWithParams(item) {
        console.log("onTagClickWithParams");
        console.log(item);
        if (item.content > 0){
          this.$router.push({path:item.path} )
        }else {
        }
        //this.$router.push(item.path)
      },
      handlePerssion: function(){
        this.$refs.modalUserRole.show(this.roleId);
      },
      handleDelAll: function(){
        this.$confirm({
          title: '提示',
          content: '是否清空所有快速入口',
          onOk() {
            getAction("/system/sysPermissionNav/delAll").then(res=>{
                if(res.success){
                  this.$message.success(res.message);
                  this.getNav();
                }
            })
          },
          onCancel() {
          },
        });
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