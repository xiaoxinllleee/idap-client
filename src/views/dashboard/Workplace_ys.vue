<template>
  <page-layout :avatar="avatar">
    <div slot="headerContent" style="margin-top: 6%;">
      <div class="title">{{ timeFix }}，{{ nickname() }}<span class="welcome-text" style="display: none;">，{{ welcome() }}</span></div>
      <div>{{ this.roleName }} | {{ this.orgName }}</div>
    </div>

    <div slot="extra">
      <a-row class="more-info" :gutter="0">
        <a-col :span="5" ><head-info  title="客户数" content="232" :center="true" :bordered="false"/></a-col>
        <a-col :span="6" ><head-info   title="本月新增客户数" content="67" :center="true" :bordered="false"/></a-col>
        <a-col :span="6"><head-info title="存款金额" content="1211988.00" :center="true" :bordered="false"/></a-col>
        <a-col :span="6" ><head-info title="本月新增存款" content="206723.00" :center="true" :bordered="false"/></a-col>
      </a-row>

      <a-divider style="margin-top: 10px; margin-bottom: 10px;"/>

      <a-row style="margin-top: 10px; margin-bottom:15px;" class="more-info" :gutter="0"  >
        <a-col :span="5"><head-info  title="本月走访数" content="107" :center="true" :bordered="false"/></a-col>
        <a-col :span="6" ><head-info   title="新增贷款户数" content="56" :center="true" :bordered="false"/></a-col>
        <a-col :span="6" ><head-info title="贷款余额" content="13681768.00" :center="true" :bordered="false"/></a-col>
        <a-col :span="6" ><head-info   title="本月新增贷款" content="781236.00" :center="true" :bordered="false"/></a-col>
      </a-row>
    </div>

    <div>
      <a-row :gutter="8">
        <a-col :xl="14" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card title="走访进度" class="project-list" :body-style="{ padding: 0 }" :loading="loading" :bordered="false" style="margin-bottom: 12px;">
            <div>
              <a-card-grid class="project-card-grid">
                <a-card :bordered="false" :body-style="{ padding: 0}">
                  <a-card-meta>
                    <div slot="title" class="card-title">
                      <a>走访进度</a>
                    </div>
                    <div slot="description" class="card-description">
                      <a-tabs defaultActiveKey="1" tabPosition="left" :style="{ minHeight: '150px'}">
                        <a-tab-pane key="1"> <!--style="height:150px;overflow-y:auto;overflow-x:hidden;"-->
                          <span slot="tab"><a-icon type="clock-circle" />进行中</span>
                          <a-list>
                            <a-list-item :key="index" v-for="(item, index) in visitList_Processing">
                              <a-list-item-meta>
                                <div slot="title"><span>{{ item.title }}</span></div>
                                <div slot="description">{{ item.content }}</div>
                              </a-list-item-meta>
                              <div><span style="padding-right: 80px;">{{ item.finished }} / {{ item.value }}</span></div>
                              <a class="list-item-actions" slot="actions" @click="onTagClick(item.url)">详情</a>
                              <div style="width: 300px;">
                                <a-tooltip>
                                  <template slot="title"><span>{{item.finished}} / {{item.value}}</span></template>
                                  <a-progress :percent="100" :successPercent="item.finished/item.value*100" :format="(percent,successPercent) => `${successPercent}%`"/>
                                </a-tooltip>
                              </div>
                            </a-list-item>
                          </a-list>
                        </a-tab-pane>

                        <a-tab-pane key="2">
                          <span slot="tab"><a-icon type="check-circle" />已完成</span>
                          <a-list>
                            <a-list-item :key="index" v-for="(item, index) in visitList_Completed">
                              <a-list-item-meta>
                                <div slot="title"><span>{{ item.title }}</span></div>
                                <div slot="description">{{ item.content }}</div>
                              </a-list-item-meta>
                              <div><span style="padding-right: 80px;">{{ item.finished }} / {{ item.value }}</span></div>
                              <a class="list-item-actions" slot="actions" @click="onTagClick(item.url)">详情</a>
                              <div style="width: 300px;">
                                <a-tooltip>
                                  <template slot="title"><span>{{item.finished}} / {{item.value}}</span></template>
                                  <a-progress :percent="100" :successPercent="item.finished/item.value*100" :format="(percent,successPercent) => `${successPercent}%`"/>
                                </a-tooltip>
                              </div>
                            </a-list-item>
                          </a-list>
                        </a-tab-pane>
                      </a-tabs>
                    </div>
                  </a-card-meta>
                </a-card>
              </a-card-grid>
            </div>
          </a-card>

          <a-card title="待办事项" class="project-list" :body-style="{ padding: 0 }" :loading="loading" :bordered="false" style="margin-bottom: 12px;">
            <router-link slot="extra" :to="{path: '/gzap/gzrl/rwrlList'}">工作日历</router-link>
            <div>
              <a-card-grid class="project-card-grid">
                <a-card :bordered="false" :body-style="{ padding: 0}">
                  <a-card-meta>
                    <div slot="title" class="card-title">
                      <a>本周任务</a>
                    </div>
                    <div slot="description" class="card-description">
                      <a-tabs defaultActiveKey="1" tabPosition="left" :style="{ minHeight: '150px'}">
                        <a-tab-pane key="1">
                          <span slot="tab"><a-icon type="clock-circle" />进行中</span>
                          <a-list>
                            <a-list-item :key="index" v-for="(item, index) in taskList">
                              <a-list-item-meta>
                                <div slot="title"><span>{{ item.title }}</span></div>
                                <div slot="description">{{ item.content }}</div>
                              </a-list-item-meta>
                              <div><span style="padding-right: 80px;">{{ item.finished }} / {{ item.value }}</span></div>
                              <a class="list-item-actions" slot="actions" @click="onTagClick(item.url)">详情</a>
                              <div style="width: 300px;">
                                <a-tooltip>
                                  <template slot="title"><span>{{item.finished}} / {{item.value}}</span></template>
                                  <a-progress :percent="100" :successPercent="item.finished/item.value*100" :format="(percent,successPercent) => `${successPercent}%`"/>
                                </a-tooltip>
                              </div>
                            </a-list-item>
                          </a-list>
                        </a-tab-pane>

                        <a-tab-pane key="2">
                          <span slot="tab"><a-icon type="check-circle" />已完成</span>
                          <a-list>
                            <a-list-item :key="index" v-for="(item, index) in tsakList_Completed">
                              <a-list-item-meta>
                                <div slot="title"><span>{{ item.title }}</span></div>
                                <div slot="description">{{ item.content }}</div>
                              </a-list-item-meta>
                              <div><span style="padding-right: 80px;">{{ item.finished }} / {{ item.value }}</span></div>
                              <a class="list-item-actions" slot="actions" @click="onTagClick(item.url)">详情</a>
                              <div style="width: 300px;">
                                <a-tooltip>
                                  <template slot="title"><span>{{item.finished}} / {{item.value}}</span></template>
                                  <a-progress :percent="100" :successPercent="item.finished/item.value*100" :format="(percent,successPercent) => `${successPercent}%`"/>
                                </a-tooltip>
                              </div>
                            </a-list-item>
                          </a-list>
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
                      <a>本周计划</a>
                    </div>
                    <div slot="description" class="card-description">
                      <a-tabs defaultActiveKey="1" tabPosition="left" :style="{ minHeight: '150px'}">
                        <a-tab-pane key="1">
                          <span slot="tab"><a-icon type="clock-circle" />进行中</span>
                          <a-list>
                            <a-list-item :key="index" v-for="(item, index) in planList">
                              <a-list-item-meta>
                                <div slot="title"><span>{{ item.title }}</span></div>
                                <div slot="description">{{ item.content }}</div>
                              </a-list-item-meta>
                              <div><span style="padding-right: 80px;">{{ item.finished }} / {{ item.value }}</span></div>
                              <a class="list-item-actions" slot="actions" @click="onTagClick(item.url)">详情</a>
                              <div style="width: 300px;">
                                <a-tooltip>
                                  <template slot="title"><span>{{item.finished}} / {{item.value}}</span></template>
                                  <a-progress :percent="100" :successPercent="(item.finished/item.value)*100" :format="(percent,successPercent) => `${successPercent}%`"/>
                                </a-tooltip>
                              </div>
                            </a-list-item>
                          </a-list>
                        </a-tab-pane>
                        <a-tab-pane key="2">
                          <span slot="tab"><a-icon type="check-circle" />已完成</span>
                          <a-list>
                            <a-list-item :key="index" v-for="(item, index) in planList_Completed">
                              <a-list-item-meta>
                                <div slot="title"><span>{{ item.title }}</span></div>
                                <div slot="description">{{ item.content }}</div>
                              </a-list-item-meta>
                              <div><span style="padding-right: 80px;">{{ item.finished }} / {{ item.value }}</span></div>
                              <a class="list-item-actions" slot="actions" @click="onTagClick(item.url)">详情</a>
                              <div style="width: 300px;">
                                <a-tooltip>
                                  <template slot="title"><span>{{item.finished}} / {{item.value}}</span></template>
                                  <a-progress :percent="100" :successPercent="(item.finished/item.value)*100" :format="(percent,successPercent) => `${successPercent}%`"/>
                                </a-tooltip>
                              </div>
                            </a-list-item>
                          </a-list>
                        </a-tab-pane>
                      </a-tabs>
                    </div>
                  </a-card-meta>
                </a-card>
              </a-card-grid>
            </div>
          </a-card>

          <a-card title="消息提醒" :loading="loading" :bordered="false" :body-style="{ padding: 0,backgroundColor: ' #E1FFFF'}">
            <div>
              <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in messageList">
                <a-card :bordered="false" :body-style="{ padding: 0, backgroundColor: ' #E1FFFF'}">
                  <a-card-meta>
                    <div slot="title" class="card-title" style="font-size: 14px;color: rgba(0, 0, 0, 0.75)" >
                      {{ item.title }}
                    </div>
                    <div slot="description" class="card-description" style="font-size: 30px;text-align: center;" >
                      <a @click="onTagClick(item.path)">{{ item.value }}</a>
                    </div>
                  </a-card-meta>
                </a-card>
              </a-card-grid>
            </div>
          </a-card>
        </a-col>

        <a-col style="padding: 0 12px" :xl="10" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card title="快速开始 / 便捷导航" style="margin-bottom: 18px" :bordered="false" :body-style="{padding: 0}">
            <div class="item-group">
              <a-tag color="blue" @click="onTagClick('/gzap/gzrz/GzapRzglList/')" style="margin:0 30px 20px 0;height: 24px"><span style="font-size: 14px;height:24px;">工作日志</span></a-tag>
              <a-tag color="blue" @click="onTagClick('/gzap/gzrz/GzapRzglList/')" style="margin:0 30px 20px 0;height: 24px"><span style="font-size: 14px;height:24px;">个人设置</span></a-tag>
              <a-tag color="blue" @click="onTagClick('/marketing/CustomerVisit/')" style="margin:0 30px 20px 0;height: 24px"><span style="font-size: 14px;height:24px;">客户回访</span></a-tag>
              <a-tag color="blue" @click="onTagClick('/gridmap/mapview/')" style="margin:0 30px 20px 0;height: 24px"><span style="font-size: 14px;height:24px;">区域可视化</span></a-tag>
              <a-tag color="blue" @click="onTagClick('/khgl/khtycx/KhtycxList/')" style="margin:0 30px 20px 0;height: 24px"><span style="font-size: 14px;height:24px;">客户统一查询</span></a-tag>

              <!--<a-button size="small" type="primary" ghost icon="edit" @click="handlePerssion('57f7b60bb587f2780dfc58f2fba5e8c1')">编辑</a-button>-->
            </div>
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

          <a-card :loading="loading" title="白名单/灰名单/黑名单占比" :bordered="false">
            <mdzb></mdzb>
          </a-card>

          <a-card title="营销辅助" style="margin-bottom: 12px;" :loading="loading" :bordered="false" :body-style="{ padding: '8px' }">
            <a-list>
              <a-list-item :key="index" v-for="(item, index) in marketingList">
                <a-list-item-meta>
                  <a-avatar slot="avatar" :icon="item.icon" style="backgroundColor:#87d068"/>
                  <div slot="title">
                    <span style="font-size: 16px;">{{ item.title }}</span>
                  </div>
                </a-list-item-meta>
                <router-link slot="actions" :to="{path: item.path}">{{ item.value }}</router-link>
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
  import mdzb from './tbsj/gzt/pieChart/mdzb'

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
      mdzb,
      ACol, PageLayout, HeadInfo, Radar, UserRoleModal
    },
    data() {
      return {
        timeFix: timeFix(),
        avatar: '',
        roleName: '',
        orgName: '',
        user: {},
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
            "finished": "80000.00",
            "url": "/gzap/gzrw/GzapGzrwList/"
          },
          {
            "id": 2,
            "title": "贷款任务",
            "content": "8月份总行下发贷款任务",
            "value": "200000.00",
            "finished": "50000.00",
            "url": "/gzap/gzrw/GzapGzrwList/"
          }
        ],
        tsakList_Completed: [
          {
            "id": 1,
            "title": "存款任务",
            "content": "7月份总行下发存款任务",
            "value": "100000.00",
            "finished": "100000.00",
            "url": "/gzap/gzrw/GzapGzrwList/"
          },
          {
            "id": 2,
            "title": "贷款任务",
            "content": "7月份总行下发贷款任务",
            "value": "200000.00",
            "finished": "200000.00",
            "url": "/gzap/gzrw/GzapGzrwList/"
          }
        ],
        planList: [
          {
            "id": 1,
            "title": "授信任务",
            "content": "8月份下发授信任务",
            "value": "150",
            "finished": "96",
            "url": "/gzap/gzjh/Gzap_gzjhList/"
          },
          {
            "id": 2,
            "title": "用信任务",
            "content": "8月份下发用信任务",
            "value": "120",
            "finished": "60",
            "url": "/gzap/gzjh/Gzap_gzjhList/"
          }
        ],
        planList_Completed: [
          {
            "id": 1,
            "title": "走访任务",
            "content": "8月份下发走访任务",
            "value": "300",
            "finished": "300",
            "url": "/gzap/gzjh/Gzap_gzjhList/"
          },
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
            "value": "12",
            "path": "/ckjk/ckjkptdqckdqyj/VckjkptCkdqyjList"
          },
          {
            "id": 2,
            "title": "存款大额变动客户",
            "value": "09",
            "path": '/ckjk/jcyj/debdcx/'
          },
          {
            "id": 3,
            "title": "贷款即将到期客户",
            "value": "13",

            "path": '/dkjkpt/dksjjk/dkdqyj/'

          },
          {
            "id": 4,
            "title": "贷款逾期客户",
            "value": "12",
            "path": '/dkjkpt/dksjjk/yqdkjk/VdkjkptYqdkjkList/'
          },
          {
            "id": 5,
            "title": "贷后检查提醒",
            "value": "08",
            "path": '/dkjkpt/dhgztx/jcbgtx/VdkjkptDhgztxList/'
          },
          {
            "id": 6,
            "title": "生日提醒",
            "value": "06",
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
        visitList_Processing: [
          {
            "id": 1,
            "title": "授信进度",
            "content": "授信户数/总户数",
            "value": "200",
            "finished": "100",
            "discription": "完成数/任务总数/剩余数",
            "url": "/tjfx/sxsjmx/tjfx_khsxyxtj_gr/Tjfx_khsxyxtj_grList/"
          },
          {
            "id": 2,
            "title": "用信进度",
            "content": "用信户数/授信户数",
            "value": "100",
            "finished": "78",
            "discription": "完成数/任务总数/剩余数",
            "url": "/tjfx/sxsjmx/tjfx_khsxyxtj_gr/Tjfx_khsxyxtj_grList/"
          },
          {
            "id": 3,
            "title": "用信额",
            "content": "用信额/授信额",
            "value": "200000.00",
            "finished": "150000.00",
            "discription": "完成数/任务总数/剩余数",
            "url": "/tjfx/sxsjmx/tjfx_khsxyxtj_gr/Tjfx_khsxyxtj_grList/"
          },
        ],
        visitList_Completed: [
          {
            "id": 1,
            "title": "走访覆盖率",
            "content": "走访户数/总户数",
            "value": "200",
            "finished": "200",
            "url": "/tjfx/zfsjmx/grsjmx/ZfsjmxGrList/"
          },
          {
            "id": 2,
            "title": "建档覆盖率",
            "content": "建档户数/总户数",
            "value": "200",
            "finished": "200",
            "url": "/tjfx/jdsjmx/tjfx_khjdltj_gr/Tjfx_khjdltj_grList/"
          },
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
        scale: [
          {
            dataKey: 'score',
            min: 0,
            max: 80
          }
        ],
        radarData: [],
        tabList: [
          {
            key: 'tab1',
            tab: '进行中',
            scopedSlots: { tab: 'customRender'}
          },
          {
            key: 'tab2',
            tab: '已完成',
          }
        ],
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
      // console.log('this.avatar :'+ this.avatar)
      getRoleList().then(res => {
        console.log('workplace -> call getRoleList()', res)
      })
      getServiceList().then(res => {
        console.log('workplace -> call getServiceList()', res)
      })
    },
    mounted() {
      this.getProjects();
      this.getActivity();
      this.getTeams();
      this.initRadar();
      this.getRoleNameAndOrgName();
    },
    methods: {
      ...mapGetters(["nickname", "welcome"]),
      getRoleNameAndOrgName() {
        this.$http.get('/workplace/getUserRoleNameAndOrgName').then((res) => {
          if (res.success) {
            this.roleName = res.result.roleName;
            this.orgName = res.result.orgName;
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