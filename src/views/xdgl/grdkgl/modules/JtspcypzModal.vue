<template>
  <a-card :bordered="false">
    <a-modal centered
             :title="title"
             :width="1000"
             :visible="visible"
             @cancel="handleCancel"
             @ok="handleOk"
             cancelText="关闭">
        <j-editable-table rowKey="zrrid"
                          :disabled="this.row.jtspzzzt==1"
                          ref="jtspcyxx"
                          :loading="spcyTable.loading"
                          :columns="spcyTable.columns"
                          :dataSource="spcyTable.dataSource"
                          :maxHeight="300"
                          :rowNumber="true"
                          :rowSelection="true"
                          :actionButton="this.row.jtspzzzt!=1"/>
    </a-modal>
  </a-card>
</template>

<script>
  import {filterObj} from '@/utils/util'
  import { getAction, putAction, postAction, deleteAction, httpAction } from '@/api/manage'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import SelectUserModal from './jtspcpxx/SelectUserModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import { mapGetters } from 'vuex'
  import { FormTypes } from '@/utils/JEditableTableUtil'
  import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'

  export default {
    name: "JtspcypzModal",
    mixins: [JEditableTableMixin,JeecgListMixin],
    components:{JTreeSelect,SelectUserModal},
    data() {
      return {
        row:{jtspzzzt:''},
        tableid:'',
        sszhValue:'',
        visible: false,
        loading: false,
        model: [],
        title:'',
        spcyTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '员工姓名',
              placeholder: '请选择${title}',
              key: 'zrrid',
              type: FormTypes.select,
              options: [],
              allowSearch: true,
              validateRules: [
                {
                  required: true, // 必填
                  message: '${title}不能为空' // 提示的文本
                },
              ]
            },
            {
              title: '责任人类型',
              placeholder: '请选择${title}',
              key: 'zrrlx',
              type: FormTypes.select,
              align: "center",
              options: [],
              dictCode: 'zrrlx',
              allowSearch: true,
              validateRules: [
                {
                  required: true, // 必填
                  message: '${title}不能为空' // 提示的文本
                },

              ]
            },

          ]
        },
        spcyList:[],
        ygxxList:[],
        url: {
          edit: "/xdgl/jtspcy/editJtspcy",
          delete: "/xdgl/jtspcy/deleteJtspcy",
        }
      }
    },
    mounted() {
      // 初始化数据
      //this.columns[0].options = this.request(null)
    },
    methods: {
      loadData(record) {
        this.row=record;
        console.log(record)
        this.tableid=record.id;
        this.sszhValue=record.sszh;

        getAction('/xdgl/jtspcy/getYgxxList', {zzbz:record.sszh}).then((res) => {
          if (res.success && res.result) {
            //this.spcyTable.dataSource = res.result
            this.spcyTable.columns[0].options = res.result
            this.ygxxList=res.result;
          }
        })


        getAction('/xdgl/jtspcy/getSpcyList', {id:record.id}).then((res) => {
          if (res.success && res.result) {
            this.spcyTable.dataSource = res.result
            this.spcyList=res.result;
          }
        })
      },
      ...mapGetters(["nickname", "avatar","userInfo","orgCode"]),
      handleCancel() {
        this.visible = false;
      },

      handleOk(){
        console.log("11223344")
        this.$refs.jtspcyxx.getValues((error, values) => {
          // 错误数 = 0 则代表验证通过
          if (error === 0) {
            // 将通过后的数组提交到后台或自行进行其他处理
            console.log("------成员信息---------")
            console.log(values)
            let formData = {
              khmc:this.row.khmc,
              zjhm:this.row.zjhm,
              id:this.row.id,
              zzbz:this.row.sszh,
              jtspcyList:values,
            }
            console.log("---结果----")
            console.log(formData)

            httpAction('/xdgl/jtspcy/editJtspcy',formData,'post').then((res)=>{
              if(res.success){
                this.$message.success("保存成功",3);
                this.close();
              }else{
                this.$message.warning(res.message,3);
              }
            }).finally(() => {
              this.close();
            })
          } else {
            this.$message.error('表单验证失败，请检查！',5)
          }
        })
      },
      batchDel: function (record) {
        getAction('/xdgl/jtspcy/deleteJtspcy', {id: this.tableid, yggh: record.zrrid}).then((res) => {
          if (res.success) {
            this.$message.success("取消关联关系成功！");
            console.log(this.sszhValue)
            this.loadData({id:this.tableid,sszh:this.sszhValue});
          } else {
            this.$message.warning(res.message,5);
          }
        });

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