<template>
  <page-layout :avatar="avatar">
    <div slot="headerContent" style="margin-top: 6%">
      <div class="title">{{ timeFix }}，{{ nickname() }}<span class="welcome-text" style="display: none">，{{ welcome() }}</span></div>
      <div>{{ this.roleName }} | {{ this.orgName }}</div>
    </div>

    <div slot="extra" >
      <a-row class="more-info" :gutter="0"  >

        <a-col :span="5"  >
          <head-info  title="客户数" content="50" :center="true" :bordered="false"/>
        </a-col>
        <a-col :span="6"  >
          <head-info   title="本月新增客户数" content="50" :center="true" :bordered="false"/>
        </a-col>
        <a-col :span="6" >
          <head-info title="存款金额" content="1000000.00" :center="true" :bordered="false"/>
        </a-col>
        <a-col :span="6" >
          <head-info title="本月新增存款" content="1000000.00" :center="true" :bordered="false"/>
        </a-col>
      </a-row>

      <a-divider style="margin-top: 10px; margin-bottom: 10px;"/>

      <a-row style="margin-top: 10px; margin-bottom:15px ;" class="more-info" :gutter="0"  >

        <a-col :span="5">
          <head-info  title="本月走访数" content="50" :center="true" :bordered="false"/>
        </a-col>
        <a-col :span="6" >
          <head-info   title="新增贷款户数" content="80" :center="true" :bordered="false"/>
        </a-col>
        <a-col :span="6" >
          <head-info title="贷款余额" content="5000000.00" :center="true" :bordered="false"/>
        </a-col>

        <a-col :span="6" >
          <head-info   title="本月新增贷款" content="5000000.00" :center="true" :bordered="false"/>
        </a-col>

      </a-row>

    </div>

    <div>
      <a-row :gutter="8">
        <a-col :xl="14" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            class="project-list"
            :loading="loading"
            style="margin-bottom: 12px;"
            :bordered="false"
            title="待办事项"
            :body-style="{ padding: 0 }">
            <router-link slot="extra" :to="{path: '/gzap/gzrl/rwrlList'}">工作日历</router-link>
            <div>
              <a-card-grid class="project-card-grid">
              <a-card :bordered="false" :body-style="{ padding: 0}">
              <a-card-meta>
              <div slot="title" class="card-title">
              <!--<a-avatar size="small" :src="item.cover"/>-->
              <a>本周任务</a>
              </div>
              <div slot="description" class="card-description">
                <a-tabs defaultActiveKey="1" tabPosition="left" :style="{ minHeight: '150px'}">
                  <a-tab-pane key="1">
                    <span slot="tab">
                      <a-icon type="clock-circle" />
                      进行中
                    </span>
                    <a-list>
                      <a-list-item :key="index" v-for="(item, index) in taskList">
                        <a-list-item-meta>
                          <div slot="title">
                            <span>{{ item.title }}</span>
                          </div>
                          <div slot="description">{{ item.content }}</div>
                        </a-list-item-meta>
                        <a class="list-item-actions" slot="actions">去完成</a>
                        <div style="width: 100px">
                          <a-tooltip>
                            <template slot="title">
                              <span>{{item.finished}} / {{item.value}}</span>
                            </template>
                            <a-progress
                              :percent="100"
                              :successPercent="item.finished/item.value*100"
                              :format="(percent,successPercent) => `${successPercent}%`"
                              size="small" />
                          </a-tooltip>
                        </div>
                      </a-list-item>
                    </a-list>

                  </a-tab-pane>
                  <a-tab-pane key="2">
                    <span slot="tab">
                      <a-icon type="check-circle" />
                      已完成
                    </span>
                    暂无数据
                  </a-tab-pane>
                </a-tabs>
              </div>
              </a-card-meta>
              </a-card>
              </a-card-grid>

              <a-card-grid class="project-card-grid">
              <a-card :bordered="false" :body-style="{ padding: 0}">
              <a-card-meta>
              <div slot="title" class="card-title">
              <!--<a-avatar size="small" :src="item.cover"/>-->
              <a>本周计划</a>
              </div>
              <div slot="description" class="card-description">
                <a-tabs defaultActiveKey="1" tabPosition="left" :style="{ minHeight: '150px'}">
                  <a-tab-pane key="1">
                    <span slot="tab">
                      <a-icon type="clock-circle" />
                      进行中
                    </span>
                    进行中
                  </a-tab-pane>
                  <a-tab-pane key="2">
                    <span slot="tab">
                      <a-icon type="check-circle" />
                      已完成
                    </span>
                    已完成
                  </a-tab-pane>
                </a-tabs>
              </div>
              </a-card-meta>
              </a-card>
              </a-card-grid>
                  <!--<a-card-grid class="project-card-grid">-->
                  <!--<a-card-->
                    <!--:bordered="false"-->
                    <!--:body-style="{ padding: 0 }"-->
                    <!--:head-style="{textAlign: 'center'}"-->
                    <!--:tabList="tabList"-->
                    <!--:activeTabKey="key"-->
                    <!--title="本周任务"-->
                    <!--@tabChange="key => onTabChange(key, 'key')"-->
                  <!--&gt;-->
                    <!--{{contentList[key]}}-->
                    <!--&lt;!&ndash;<a-card-meta>&ndash;&gt;-->
                      <!--&lt;!&ndash;<div slot="title" class="card-title">&ndash;&gt;-->
                        <!--&lt;!&ndash;&lt;!&ndash;<a-avatar size="small" :src="item.cover"/>&ndash;&gt;&ndash;&gt;-->
                        <!--&lt;!&ndash;<a>本周任务</a>&ndash;&gt;-->
                      <!--&lt;!&ndash;</div>&ndash;&gt;-->
                      <!--&lt;!&ndash;<div slot="description" class="card-description">&ndash;&gt;-->
                        <!--&lt;!&ndash;走访客户数&ndash;&gt;-->
                      <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;</a-card-meta>&ndash;&gt;-->

                    <!--&lt;!&ndash;<div class="project-item">&ndash;&gt;-->
                      <!--&lt;!&ndash;<a href="/#/">科学搬砖组</a>&ndash;&gt;-->
                      <!--&lt;!&ndash;<span class="datetime">9小时前</span>&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                  <!--</a-card>-->
                  <!--</a-card-grid>-->

                  <!--<a-card-grid class="project-card-grid">-->
                  <!--<a-card :bordered="false" :body-style="{ padding: 0}">-->
                    <!--<a-card-meta>-->
                      <!--<div slot="title" class="card-title">-->
                        <!--&lt;!&ndash;<a-avatar size="small" :src="item.cover"/>&ndash;&gt;-->
                        <!--<a>本周计划</a>-->
                      <!--</div>-->
                      <!--<div slot="description" class="card-description">-->
                        <!--拓展存款10万-->
                      <!--</div>-->
                    <!--</a-card-meta>-->
                    <!--<div class="project-item">-->
                      <!--<a href="/#/">科学搬砖组</a>-->
                      <!--<span class="datetime">9小时前</span>-->
                    <!--</div>-->
                  <!--</a-card>-->
                  <!--</a-card-grid>-->
              <!---->
              <!---->
              <!--<a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in projects">-->
                <!--<a-card :bordered="false" :body-style="{ padding: 0 }">-->
                  <!--<a-card-meta>-->
                    <!--<div slot="title" class="card-title">-->
                      <!--<a-avatar size="small" :src="item.cover"/>-->
                      <!--<a>{{ item.title }}</a>-->
                    <!--</div>-->
                    <!--<div slot="description" class="card-description">-->
                      <!--{{ item.description }}-->
                    <!--</div>-->
                  <!--</a-card-meta>-->
                  <!--<div class="project-item">-->
                    <!--<a href="/#/">科学搬砖组</a>-->
                    <!--<span class="datetime">9小时前</span>-->
                  <!--</div>-->
                <!--</a-card>-->
              <!--</a-card-grid>-->
            </div>
          </a-card>

          <a-card
            :loading="loading"
            title="消息提醒"
            :bordered="false"
            :body-style="{ padding: 0,backgroundColor: ' #E1FFFF'}">
            <div>
              <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in messageList">
                <a-card :bordered="false" :body-style="{ padding: 0, backgroundColor: ' #E1FFFF'}">
                  <a-card-meta>
                    <div slot="title"   class="card-title"  style="font-size: 14px;color: rgba(0, 0, 0, 0.75)" >
                      {{ item.title }}
                    </div>
                    <div slot="description" class="card-description" style="font-size: 30px;text-align: center;" >
                      <a @click="onTagClick(item.path)" >{{ item.value }}</a>
                    </div>
                  </a-card-meta>
                 <!-- <router-link slot="actions" :to="{path: item.path}">{{ item.value }}</router-link>-->
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
          <a-card title="快速开始 / 便捷导航" style="margin-bottom: 18px" :bordered="false" :body-style="{padding: 0}">
            <div class="item-group">
              <a-tag color="blue" @click="onTagClick('/gzap/gzrz/GzapRzglList/')" style="margin:0 30px 20px 0;height: 24px"><span style="font-size: 14px;height:24px;">工作日志</span></a-tag>
              <a-tag color="blue" @click="onTagClick('/gzap/gzrz/GzapRzglList/')" style="margin:0 30px 20px 0;height: 24px"><span style="font-size: 14px;height:24px;">个人设置</span></a-tag>
              <a-tag color="blue" @click="onTagClick('/marketing/CustomerVisit/')" style="margin:0 30px 20px 0;height: 24px"><span style="font-size: 14px;height:24px;">客户回访</span></a-tag>
              <a-tag color="blue" @click="onTagClick('/gridmap/mapview/')" style="margin:0 30px 20px 0;height: 24px"><span style="font-size: 14px;height:24px;">区域可视化</span></a-tag>
              <a-tag color="blue" @click="onTagClick('/khgl/khtycx/KhtycxList/')" style="margin:0 30px 20px 0;height: 24px"><span style="font-size: 14px;height:24px;">客户统一查询</span></a-tag>
              <a-tag color="blue" @click="onTagClick('/gzap/gzrz/GzapRzglList/')" style="margin:0 30px 20px 0;height: 24px"><span style="font-size: 14px;height:24px;">工作日志</span></a-tag>
              <a-button size="small" type="primary" ghost icon="edit" @click="handlePerssion('57f7b60bb587f2780dfc58f2fba5e8c1')">编辑</a-button>
            </div>
          </a-card>
          <a-card title="营销辅助" style="margin-bottom: 12px" :loading="loading" :bordered="false" :body-style="{ padding: '8px' }">
            <a-list>
              <a-list-item :key="index" v-for="(item, index) in marketingList">
                <a-list-item-meta>
                  <a-avatar slot="avatar" :icon="item.icon" style="backgroundColor:#87d068"/>
                  <div slot="title">
                    <span style="font-size: 16px;">{{ item.title }}</span>
                  </div>
                  <!--<div slot="description">{{ item.time }}</div>-->
                </a-list-item-meta>
                <!--<a class="list-item-actions" slot="actions">{{ item.value }}</a>-->
                <router-link slot="actions" :to="{path: item.path}">{{ item.value }}</router-link>
              </a-list-item>
            </a-list>
          </a-card>
          <a-card :loading="loading" title="通知/公告" :bordered="false" :body-style="{ padding: '8px' }">
            <router-link slot="extra" :to="{path: '/isps/userAnnouncement'}">更多</router-link>
            <a-list>
              <a-list-item :key="index" v-for="(item, index) in infoList">
                <a-list-item-meta>
                  <a-avatar slot="avatar" icon="info" style="backgroundColor:#FFD700"/>
                  <div slot="title">
                    <span style="font-size: 16px;">{{ item.title }}</span>
                  </div>
                  <div slot="description">{{item.submitter}}&nbsp;&nbsp;&nbsp;{{ item.time }}</div>
                </a-list-item-meta>
                <a-tag color="red">紧急消息</a-tag>
              </a-list-item>
            </a-list>
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
  import { getRoleList, getServiceList } from "@/api/manage"
  import UserRoleModal from '@/views/system/modules/UserRoleModal'
  import ACol from "ant-design-vue/es/grid/Col";

  const DataSet = require('@antv/data-set')

  export default {
    name: "Workplace",
    components: {
      ACol,
      PageLayout,
      HeadInfo,
      Radar,
      UserRoleModal
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
        taskList: [
          {
            "id": 1,
            "title": "存款任务",
            "content": "8月份总行下发存款任务",
            "value": "100000.00",
            "finished": "80000.00"
          },
          {
            "id": 2,
            "title": "贷款任务",
            "content": "8月份总行下发贷款任务",
            "value": "200000.00",
            "finished": "50000.00"
          }
        ],
        planList: [
          {
            "id": 1,
            "title": "存款任务",
            "content": "8月份下发存款任务",
            "value": "",
            "finished": "80000.00"
          }
        ],
        marketingList: [
          {
            "id": 1,
            "title": "存在潜在贷款需求的客户",
            "value": "10户",
            "avatar": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            "icon": "money-collect",
            "path": "/khgl/khtycx/KhtycxList"
          },
          {
            "id": 2,
            "title": "存在潜在存款需求的客户",
            "value": "10户",
            "avatar": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            "icon": "money-collect",
            "path": "/khgl/khtycx/KhtycxList"
          },
          {
            "id": 3,
            "title": "存在潜在ETC需求的客户",
            "value": "10户",
            "avatar": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            "icon": "car",
            "path": "/khgl/khtycx/KhtycxList"
          },
          {
            "id": 4,
            "title": "本月还未拜访的客户",
            "value": "10户",
            "avatar": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            "icon": "phone",
            "path": "/khgl/khtycx/KhtycxList"
          },
        ],
        messageList: [
          {
            "id": 1,
            "title": "定期存款即将到期客户",
            "value": "10",
            "path": "/ckjk/ckjkptdqckdqyj/VckjkptCkdqyjList"
          },
          {
            "id": 2,
            "title": "存款大额变动客户",
            "value": "20",
            "path": '/ckjk/jcyj/debdcx/'
          },
          {
            "id": 3,
            "title": "贷款即将到期客户",
            "value": "10",

            "path": '/dkjkpt/dksjjk/dkdqyj/'

          },
          {
            "id": 4,
            "title": "贷款逾期客户",
            "value": "10",
            "path": '/dkjkpt/dksjjk/yqdkjk/VdkjkptYqdkjkList/'
          },
          {
            "id": 5,
            "title": "贷后检查提醒",
            "value": "10",
            "path": '/dkjkpt/dhgztx/jcbgtx/VdkjkptDhgztxList/'
          },
          {
            "id": 6,
            "title": "生日提醒",
            "value": "10",
            "path": '/khgl/khsrtx/KhsrtxList/'
          },
        ],
        infoList: [
          {
            "id": 1,
            "title": "关于*******的通知",
            "content": "",
            "time": "2019-09-10 12:43:12",
            "submitter": "张三"
          },
          {
            "id": 2,
            "title": "关于*******的通知",
            "content": "",
            "time": "2019-09-10 12:43:12",
            "submitter": "张三"
          }
        ],
        // data
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
          { item: '引用', a: 70, b: 30, c: 40 },
          { item: '口碑', a: 60, b: 70, c: 40 },
          { item: '产量', a: 50, b: 60, c: 40 },
          { item: '贡献', a: 40, b: 50, c: 40 },
          { item: '热度', a: 60, b: 70, c: 40 },
          { item: '引用', a: 70, b: 50, c: 40 }
        ],
        radarData: [],
        tabList: [{
          key: 'tab1',
          tab: '进行中',
          scopedSlots: { tab: 'customRender'}
        }, {
          key: 'tab2',
          tab: '已完成',
        }],
        contentList: {
          tab1: 'content1',
          tab2: 'content2',
        },
        key: 'tab1',
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
      console.log('this.avatar :'+ this.avatar)

      getRoleList().then(res => {
        console.log('workplace -> call getRoleList()', res)
      })

      getServiceList().then(res => {
        console.log('workplace -> call getServiceList()', res)
      })
    },
    mounted() {
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