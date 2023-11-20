<template>
  <div>
    <a-modal centered
             :title="title"
             :width="1200"
             :visible="visible"
             @ok="handleOk"
             @cancel="handleCancel"
             cancelText="关闭">

      <!-- 查询区域 -->
      <div class="table-page-search-wrapper">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="24">
              <a-col :span="6">
                <a-form-item label="归属网格">
                  <JTreeSelectNotJg placeholder="请选择归属网格"
                                    v-model="queryParam.wgbh"
                                    treeNodeFilterProp="title"
                                    pidField="PARENT_ID"
                                    dict="YXDYGL_MAIN,WGMC,ID"
                                    pidValue="0"
                                    :showSearch="true"
                                    :treeDefaultExpandAll="true"/>

                </a-form-item>
              </a-col>

              <a-col :span="6">
                <a-form-item label="归属机构">
                  <j-tree-select placeholder="请选择所属机构"
                                 v-model="queryParam.jgdm"
                                 treeNodeFilterProp="title"
                                 pid-field="sjywjgdm"
                                 dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                                 :showSearch="true" getAllZzjg="1"
                                 :treeDefaultExpandAll="false"/>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="客户名称">
                  <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="证件号码">
                  <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
                </a-form-item>
              </a-col>
            </a-row>
           <a-row>
              <a-col :span="8">
                <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                  <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                  <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              </span>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </div>

      <!-- table区域-begin -->
      <div>
        <a-table bordered
                 size="small"
                 rowKey="zjhm"
                 :columns="columns1"
                 :dataSource="dataSource1"
                 :pagination="ipagination"
                 :loading="loading"
                 :scroll="{ y: 240 }"
                 :rowSelection="{selectedRowKeys: selectedRowKeys,onSelectAll:onSelectAll,onSelect:onSelect,onChange: onSelectChange}"
                 @change="handleTableChange"/>
      </div>

      <a-card class="card" :bordered="true" style="height:250px;background-color: #FFF;">
        <div style="margin-bottom: 10px">
          <a-button type="primary" :disabled="!hasSelected" :loading="loading" @click="start">
            取消选中
          </a-button>
          <span style="margin-left: 8px">
            <template v-if="hasSelected">
              {{ `已选中客户数： ${selectedRowKeys.length} ` }}
            </template>
           </span>
<!--          <a-row>
            <a-col :span="20">
              <a-form-item label="请选择归属网格">
                <JTreeSelectNotJg placeholder="请选择归属网格"
                                  style="width: 50%"
                                  v-model="gswg"
                                  treeNodeFilterProp="title"
                                  pidField="PARENT_ID"
                                  dict="YXDYGL_MAIN,WGMC,ID"
                                  pidValue="0"
                                  :showSearch="true"
                                  :treeDefaultExpandAll="true"/>
              </a-form-item>
            </a-col>
          </a-row>-->
          <a-row :gutter="24">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="所属类型">
                <j-dict-select-tag placeholder="请选所属类型" v-model="sslx"  style="width: 100%" dict-code="sslx"/>
              </a-form-item>
            </a-col>

          </a-row>
          <a-row :gutter="24">

            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="接收客户经理">
                <j-select-ygxx ref="zkhjl" :treeDefaultExpandAll="true" v-model="zygkhjlname"  @change="GetValueZkhjl"/>
              </a-form-item>
            </a-col>
          </a-row>

        </div>
      </a-card>


    </a-modal>
  </div>
</template>

<script>
  import {filterObj} from '@/utils/util'
  import {getAction,putAction} from '@/api/manage'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import store from '@/store/'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import { mapGetters } from 'vuex'
  import JTreeSelectNotJg from '@/components/jeecg/JTreeSelectNotJg'
  import JSelectYgxx from './JSelectYgxx'

  export default {
    name: "SelectUserModal",
    components:{JTreeSelect,JTreeSelectNotJg,JSelectYgxx},
    mixins: [JeecgListMixin],
    data() {
      return {
        title: "客户经理归属分配",
        placement: 'right',
        gswg:'',
        description: '',
        zygkhjlzh: "",
        zygkhjlname:"",
        sslx:'',
        visible: false,
        loading: false,
        selectedRowKeys: [],
        selectedRows: [],
        names: [],
        model: [],
        show:false,
        // 表头
        isAll:false,
        columns1: [
          {
            title: '#',
            dataIndex: 'xh',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title: '归属机构',
            align:"center",
            dataIndex: 'jgdm_dictText'
          },
          {
            title: '归属网格',
            align:"center",
            dataIndex: 'wgbh_dictText'
          },

          {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
          },
          {
            title: '证件类型',
            align:"center",
            dataIndex: 'zjlx_dictText'
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
          },
          {
            title: '联系方式',
            align:"center",
            dataIndex: 'lxfs'
          },
          {
            title: '地址',
            align:"center",
            dataIndex: 'dz'
          },
          {
            title: '客户类型',
            align:"center",
            dataIndex: 'khlx_dictText'
          },
        ],
        disableMixinCreated: true,
        //数据集
        dataSource1: [],
        dataSource2:[],
        // 查询条件
        sfjsejyxdy:true,
        sfjssjyxdy:true,
        ejyxdyDictCode:'YXDYGL_EJYXDYGL,DYMC,DYBH',
        sjyxdyDictCode:'YXDYGL_SJYXDYGL,DYMC,DYBH',
        // 分页参数
        ipagination: {
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['10', '50', '100'],
          showTotal: (total, range) => {
            return range[0] + "-" + range[1] + " 共" + total + "条"
          },
          total: 0
        },

        url: {
          list: "/khjbzl/khjbzl/list",
        }
      }
    },
    created() {
      this.isAll = store.getters.isRoot
      this.loadData(1);
    },
    computed: {
      hasSelected() {
        return this.selectedRowKeys.length > 0;
      },
    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo"]),
      init() {
        this.loadData(1)
      },
      /*initQueryParams() {
        if(!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
      },

      searchReset() {
        this.queryParam = {}
        if(!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
      },*/
      searchReset() {
        this.queryParam = {}
        this.selectedRowKeys = [];
        this.dataSource2=[];
        this.selectionRows=[];
        this.loadData(1);
      },
      start() {
        this.loading = true;
        // ajax request after empty completing
        setTimeout(() => {
          this.loading = false;
          this.selectedRowKeys = [];
          this.dataSource2=[];
          this.selectionRows=[];
        }, 1000);
      },

      ceshi(){
        setTimeout(() =>{
          this.$refs.zkhjl.clearName();
        },3000);
        this.$emit('searchQuery');
      },
      searchQuery() {
        this.loadData(1);
      },

      handleCancel() {
        this.onClearSelected();
        this.visible = false;
      },
      handleOk() {
        let _this=this;
        if(_this.sslx==null||_this.sslx==""){
          _this.$message.warning('请选择所属类型！');
        }else{
          if(_this.zygkhjlzh==null||_this.zygkhjlzh==""){
            _this.$message.warning('请选择所属客户经理！');
            return;
          }
          _this.$confirm({
            title: '确认分配客户经理?',
            content: h => <div style="color:red;">分配客户数:{_this.selectedRowKeys.length}</div>,
            onOk() {
              putAction("/khgs/khsskhjl/khjlfp",{"rows":_this.dataSource2,"sslx":_this.sslx,"yggh":_this.zygkhjlzh}).then((res)=>{
                if(res.success){
                  _this.$message.success('转移成功！');
                  _this.onClearSelected();
                  _this.visible = false;
                  _this.$emit('ok');
                }else{
                  _this.$message.error('转移失败！');
                }
              })
            },
            onCancel() {
              console.log('Cancel');
            },
            class: 'test',
          });

        }

      },
      add() {
        this.visible = true;
      },
      loadData(arg) {
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        this.loading = true;
        var params = this.getQueryParams();//查询条件
        params.getAll = '1'
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource1 = res.result.records;
            this.ipagination.total = res.result.total;
            this.loading = false;
          }else{
            this.$message.error(res.message,5);
            this.loading = false;
          }
        })
      },
      getQueryParams() {
        var param = Object.assign({}, this.queryParam);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        return filterObj(param);
      },
      getQueryField() {
        //TODO 字段权限控制
      },

      onSelectAll(selected, selectedRows, changeRows) {
        if (selected === true) {
          for (var a = 0; a < changeRows.length; a++) {
            this.dataSource2.push(changeRows[a]);
          }
        } else {
          for (var b = 0; b < changeRows.length; b++) {
            this.dataSource2.splice(this.dataSource2.indexOf(changeRows[b]), 1);
          }
        }
        // console.log(selected, selectedRows, changeRows);
      },
      onSelect(record, selected) {
        if (selected === true) {
          this.dataSource2.push(record);
        } else {
          var index = this.dataSource2.indexOf(record);
          //console.log();
          if (index >= 0) {
            this.dataSource2.splice(this.dataSource2.indexOf(record), 1);
          }

        }
      },
      onSelectChange(selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys;
        this.selectionRows = selectedRows;
        console.log(this.dataSource2)
      },
      onClearSelected() {
        this.selectedRowKeys = [];
        this.selectionRows = [];
        this.dataSource2=[];
      },
      handleDelete: function (record) {
        this.dataSource2.splice(this.dataSource2.indexOf(record), 1);
      },


      handleTableChange(pagination, filters, sorter) {
        //TODO 筛选
        if (Object.keys(sorter).length > 0) {
        }
        this.ipagination = pagination;
        this.loadData();
      },
      getyjyxdybh(value) {
        if (value) {
          let yjyxdybh = value;
          this.ejyxdyDictCode = "YXDYGL_EJYXDYGL,DYMC,DYBH,YJYXDYBH = " + yjyxdybh;
          this.sfjsejyxdy=false
        }
      },
      getejyxdybh(value){
        if(value) {
          let ejyxdybh=value;
          this.sjyxdyDictCode = "YXDYGL_SJYXDYGL,DYMC,DYBH,EJYXDYBH = "+ejyxdybh;
        }
      },
      getsjyxdybh(value){
        this.sfjssjyxdy=false
      },
      GetValueZkhjl(value){
        this.zygkhjlzh=value.yggh;
        this.zygkhjlname=value.ygxm;

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