<template>
  <div>
    <j-modal
      :title="title"
      :width="1450"
      :visible="visible"
      :confirmLoading="confirmLoading"
      :destroyOnClose="true"
      switchFullscreen
      :fullscreen="false"
      @ok="handleOk"
      @cancel="handleCancel"
      cancelText="关闭">


      <div class="table-page-search-wrapper">
        <a-form layout="inline" @keyup.enter.native="searchQuery">
          <a-row :gutter="24">

            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="转移给客户经理工号">

                <a-select
                  v-model="queryParam.zz" >
                  <a-select-option v-for="(item, key) in users" :key="key" :value="item.workNo" >
                   {{item.realname}} - {{item.workNo}}
                  </a-select-option>
                </a-select>

              </a-form-item>
            </a-col>






            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="归属网格">
                <a-tree-select
                  :treeData=sswgTreeDateoptions
                  :replaceFields=replaceFields
                  v-model="queryParam.wgbh"
                  :dropdownStyle="{maxHeight:'400px',overflow:'auto'}"
                  allow-clear
                  treeNodeFilterProp="title"
                >

                </a-tree-select>

              </a-form-item>
            </a-col>

            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="证件号">
                <a-input placeholder="请输入证件号" v-model="queryParam.zjhm"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="姓名">
                <a-input placeholder="请输入姓名" v-model="queryParam.khmc"></a-input>
              </a-form-item>
            </a-col>

            <a-col :xl="6" :lg="7" :md="8" :sm="24" v-if="roles.indexOf('客户经理') == -1">
              <a-form-item label="原客户经理">

                <a-select
                  v-model="queryParam.sskhjl" >
                  <a-select-option v-for="(item, key) in users" :key="key" :value="item.workNo" >
                    {{item.realname}} - {{item.workNo}}
                  </a-select-option>
                </a-select>

              </a-form-item>
            </a-col>

            <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
            </a-col>

          </a-row>
        </a-form>
      </div>

      <div>
        <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
          <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
          <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        </div>

        <a-table
          ref="table"
          size="middle"
          bordered
          :rowKey="rowKey"
          :columns="columns"
          :dataSource="dataSource"
          :pagination="ipagination"
          :loading="loading"
          :scroll="{ x: 2000 }"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          @change="handleTableChange">

        </a-table>
      </div>

    </j-modal>

  </div>
</template>

<script>

  import {getAction,putAction} from '@/api/manage'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import { mapGetters } from 'vuex'
  import JTreeSelect from '@comp/jeecg/JTreeSelect.vue'
  import {Modal} from "antd"
  import store from '@/store'
  export default {
    name: "YjzyModal",
    mixins: [JeecgListMixin],
    components:{ JTreeSelect },
    data() {
      return {
        title:'客户转移',
        visible:false,
        confirmLoading:false,
        columns:[
          {
            title: '序号',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh_dictText',
          },
          {
            title: '所属网格',
            align:"center",
            dataIndex: 'wgbh_dictText',
          },
          {
            title: '所属客户经理',
            align:"center",
            dataIndex: 'sskhjl_dictText',
          },
          {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc',
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm',
          },
          {
            title: '手机号码',
            align:"center",
            dataIndex: 'sjhm',
          },
          {
            title: '地址',
            align:"center",
            dataIndex: 'hjdz',
          }
        ],
        url:{
          list:'/khflgl/nhxq/khzy020'
        },
        users:[],
        roles:''
      }
    },
    created() {

    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo","orgCode"]),

      handleOk () {
        console.log(this.queryParam.zz)
        if (this.queryParam.zz == undefined ||this.queryParam.zz == null || this.queryParam.zz == ''){
          this.errorInfo("请选择转移客户经理工号")
          return
        }else {
          if (this.qybm.sskhjl == this.queryParam.zz){
            this.errorInfo("原客户经理和转移客户经理不能相同")
            return
          }

        }
        let hs = 0;
        if (this.selectedRowKeys.length > 0){
          hs = this.selectedRowKeys.length
        }else {
          hs = this.ipagination.total
        }
        let that = this;
        Modal.confirm({
          title:"转移信息确认",
          content:"确定把 "+hs+" 条农户信息转移给 "+this.queryParam.zz+" 吗？",
          onOk(){
            var params = that.getQueryParams()//查询条件
            if(that.selectedRowKeys && that.selectedRowKeys.length>0) {
              params['selections'] = that.selectedRowKeys.join(",")
              params['rowKey'] = 'id'
            }
            getAction("/khflgl/nhxq/khzyok020",params).then(res=>{
              that.successInfo("转移成功")
            })
            that.close()
          }
        })


      },

      open(){
        this.queryParam={}
        this.selectedRowKeys=[]
        this.visible = true;
        this.loadData()
        this.getKhjl()
        this.roles = store.getters.userInfo.roles_dictText;
      },

      getKhjl(){
        getAction("/sys/user/getByOrgCode").then(res=>{
          if (res.success){
            this.users = res.result
          }
        })
      },

      handleCancel () {
        this.close()
      },

      close () {
        this.$emit('close')
        this.visible = false
      },
    }
  }
</script>
<style lang="less" scoped>
  .ant-card-body .table-operator {
    margin-bottom: 18px;
  }

  .ant-table-tbody .ant-table-row td {
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .anty-row-operator button {
    margin: 0 5px
  }

  .ant-btn-danger {
    background-color: #ffffff
  }

  .ant-modal-cust-warp {
    height: 100%
  }

  .ant-modal-cust-warp .ant-modal-body {
    height: calc(100% - 110px) !important;
    overflow-y: auto
  }

  .ant-modal-cust-warp .ant-modal-content {
    height: 90% !important;
    overflow-y: hidden
  }
</style>