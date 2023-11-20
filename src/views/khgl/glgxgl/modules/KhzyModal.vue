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
                <a-form-item label="所属支行">
                  <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh"
                                 dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                                 :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true" :isAll="isAll"/>
                </a-form-item>
              </a-col>

              <a-col :span="6">
                <a-form-item label="客户经理">
                    <j-dict-select-tag :disabled="showKhjl" placeholder="请选择客户经理" v-model="queryParam.sskhjl" dictCode="HR_BAS_STAFF,YGXM,YGGH"  />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="客户名称">
                  <a-input placeholder="请输入客户名称" v-model="queryParam.khmc" />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="客户证件">
                  <a-input placeholder="请输入客户证件" v-model="queryParam.zjhm" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="6">
                <a-form-item label="镇">
                  <j-dict-select-tag placeholder="镇" v-model="queryParam.yjyxdy"  @input="getyjyxdybh" dict-code="YXDYGL_YJYXDYGL,DYMC,DYBH"  />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="村">
                  <j-dict-select-tag placeholder="村" v-model="queryParam.ejyxdy"  :disabled=this.sfjsejyxdy  @input="getejyxdybh" :dict-code="this.ejyxdyDictCode"  />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="组">
                  <j-dict-select-tag placeholder="组" v-model="queryParam.sjyxdy"   @input="getsjyxdybh"  :dict-code="this.sjyxdyDictCode" />
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
                 rowKey="xh"
                 :columns="columns1"
                 :dataSource="dataSource1"
                 :pagination="ipagination"
                 :loading="loading"
                 :scroll="{ y: 240 }"
                 :rowSelection="{selectedRowKeys: selectedRowKeys,onSelectAll:onSelectAll,onSelect:onSelect,onChange: onSelectChange}"
                 @change="handleTableChange"/>
      </div>

      <a-card class="card" :bordered="true" style="height:140px;background-color: #FFF;">
        <div style="margin-bottom: 16px">
          <a-button type="primary" :disabled="!hasSelected" :loading="loading" @click="start">
            取消选中
          </a-button>
          <span style="margin-left: 8px">
            <template v-if="hasSelected">
              {{ `已选中客户数： ${selectedRowKeys.length} ` }}
            </template>
           </span>
          <a-row>
            <a-col :span="10">
              <a-form-item label="接收客户经理">
                <j-select-ygxx ref="zkhjl" :treeDefaultExpandAll="true" v-model="zygkhjlname" @change="GetValueZkhjl"/>
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
  import JSelectYgxx from './JSelectYgxx'
  import store from '@/store/'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import { mapGetters } from 'vuex'

  export default {
    name: "SelectUserModal",
    components:{JTreeSelect,JSelectYgxx},
    mixins: [JeecgListMixin],
    data() {
      return {
        title: "客户转移",
        placement: 'right',
        description: '',
        zygkhjlzh: "",
        zygkhjlname:"",
        visible: false,
        loading: false,
        selectedRowKeys: [],
        selectedRows: [],
        names: [],
        model: [],
        show:false,
        showKhjl:false,
        // 表头
        isAll:false,
        columns1: [
          {
            title: '#',
            dataIndex: 'xh',
            key: 'rowIndex',
            width: 50,
            align: "center",

          },
          {
            title: '所属支行',
            align:"center",
            dataIndex: 'sszh_dictText'
            ,width:120
          },
          {
            title: '所属客户经理',
            align:"center",
            dataIndex: 'sskhjl_dictText'
            ,width:100
          },
          {
            title: '客户姓名',
            align:"center",
            dataIndex: 'khmc'
            ,width:160
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
            ,width:160
          },

          {
            title: '镇',
            align:"center",
            dataIndex: 'yjyxdy_dictText'
            ,width:100
          },
          {
            title: '村',
            align:"center",
            dataIndex: 'ejyxdy_dictText'
            ,width:100
          },
          {
            title: '组',
            align:"center",
            dataIndex: 'sjyxdy_dictText'
            ,width:100
          },
        ],
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
          list: "/khgl/khglgx/vglgxmx/list",
        }
      }
    },
    created() {
      this.khjlQx();
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
      initQueryParams() {
        if(!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.khjlQx();
        this.paramsInited = true
      },

      searchReset() {
        this.queryParam = {}
        if(!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.khjlQx();
      },
      khjlQx(){
        let _this=this;
        putAction('/sys/user/getUserRole',{},'put').then((res) => {
          if(res.success){
            if(res.message=='true'){
              _this.showKhjl=true;
              let yggh = this.userInfo().workNo;
              this.queryParam.sskhjl=yggh;
              this.loadData(1);
            }else{
              _this.showKhjl=false;
            }
          }else{
            _this.$message.warning(res.message,5);
          }
        })
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
      GetValueZkhjl(value){
        this.zygkhjlzh=value.yggh;
        this.zygkhjlname=value.ygxm;

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
        if(_this.zygkhjlzh==null||_this.zygkhjlzh==""){
          _this.$message.warning('请选择接收转移的客户经理！');
        }else{
          _this.$confirm({
            title: '确认转移客户?',
            content: h => <div style="color:red;">转移客户数:{_this.selectedRowKeys.length}</div>,
            onOk() {
              putAction("/khgl/khglgx/glgxgl/zykhAction",{"rows":_this.dataSource2,"transferTo":_this.zygkhjlzh}).then((res)=>{
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
        getAction('/khgl/khglgx/vglgxmx/list', params).then((res) => {
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