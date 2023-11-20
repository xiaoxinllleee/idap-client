<template>
  <div>
    <a-modal centered
             :title="title"
             :width="1000"
             :visible="visible"
             @ok="handleOk"
             @cancel="handleCancel"
             cancelText="关闭">

      <!-- 查询区域 -->
      <div class="table-page-search-wrapper">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="24">
              <a-col :span="10">
                <a-form-item label="客户经理">
                  <j-select-ygxx :disabled="this.showKhjl" ref="zkhjl" :treeDefaultExpandAll="true" v-model="queryParam.sskhjl"  @change="GetValueSskhjl"/>
                </a-form-item>
              </a-col>
              <a-col :span="10">
                <a-form-item label="接收客户经理">
                  <j-select-ygxx ref="zkhjl" :treeDefaultExpandAll="true" v-model="queryParam.zyhkhjl" @change="savekhjl"/>
                </a-form-item>
              </a-col>
              <a-col :span="8"><span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">

            </span></a-col>
            </a-row>
          </a-form>
        </div>
      </div>

      <a-card v-if="show" class="card" :bordered="true" style="background-color: #FFF;">
         <p>客户经理[{{queryParam.sskhjl}}]:待转移片区数:{{pqs}},待转移客户数:{{khs}}</p>
      </a-card>

    </a-modal>
  </div>
</template>

<script>
  import {filterObj} from '@/utils/util'
  import {getAction,putAction} from '@/api/manage'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JSelectYgxx from './JSelectYgxx'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import { mapGetters } from 'vuex'

  export default {
    name: "SelectUserModal",
    mixins: [JeecgListMixin],
    components:{JTreeSelect,JSelectYgxx},
    data() {
      return {
        showKhjl:false,
        title: "一键转移",
        placement: 'right',
        description: '',
        zyqkhjl:"",
        zyhkhjl:"",
        visible: false,
        loading: false,
        model: [],
        show:false,
        pqs:0,
        khs:0,
        // 表头
        //数据集
        // 查询条件
        queryParam: {
          sskhjl:"",
          zyhkhjl:"",
        },
        text:"",
        url: {
          list: "/khglgx/khgl_khglgx/list",
        }
      }
    },
    created() {
      this.loadData();
      this.khjlQx();
    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo","orgCode"]),
      searchQuery() {
        this.loadData(1);
      },
      searchReset() {
        this.queryParam = {};
        this.loadData(1);
      },
      handleCancel() {
        this.visible = false;
      },
      handleOk() {
        let _this=this;
        if(_this.zyhkhjl==null||_this.zyhkhjl==""){
          this.$message.warning('请选择接收客户经理！');
        }else{

          _this.$confirm({
            title: '确认意见转移?',
            content: h => <div style="color:red;">确认转移:[{_this.queryParam.sskhjl}]的片区权限及客户给[{_this.queryParam.zyhkhjl}]</div>,
            onOk() {
              putAction("/khgl/khglgx/glgxgl/yjzyAction",{"ykhjl":_this.zyqkhjl,"zyhkhjl":_this.zyhkhjl}).then((res)=>{
                if(res.success){
                  _this.$message.success('转移成功！');
                  _this.visible = false;
                  _this.$emit('ok');
                }else{
                  _this.$message.warning('转移失败！');
                  _this.visible = false;

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

      loadData(arg) {

      },
      khjlQx(){
        let _this=this;
        putAction('/sys/user/getUserRole',{},'put').then((res) => {
          if(res.success){
            if(res.message=='true'){
              _this.showKhjl=true;
              let yggh = this.userInfo().workNo;
              let ygxm = this.userInfo().realname;
              let value={  yggh:yggh, ygxm:ygxm}
              this.GetValueSskhjl(value);
            }else{
              _this.showKhjl=false;
            }
          }else{
            _this.$message.warning(res.message,5);
          }
        })
      },
      getQueryParams() {
        var param = Object.assign({}, this.queryParam);
        return filterObj(param);
      },
      getQueryField() {
        //TODO 字段权限控制
      },

      GetValueSskhjl(value){
        console.log(value)
        this.zyqkhjl=value.yggh;
        this.queryParam.sskhjl=value.ygxm;
        putAction("/khgl/khglgx/glgxgl/queryKhjlPqKh",{"ykhjl":this.zyqkhjl}).then((res)=>{
          if(res.success){
            this.pqs = res.result.pqs;
            this.khs = res.result.khs;
            this.show=true;
          }else{
            this.$message.warning('查询该客户经理片区和客户失败！');
          }
         })
      },

      savekhjl(value){
        this.zyhkhjl=value.yggh;
        this.queryParam.zyhkhjl=value.ygxm;
      }
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