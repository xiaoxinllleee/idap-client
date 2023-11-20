<template>
  <div>
    <a-card :bordered="false">


      <div>
        <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
          <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
          <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        </div>

        <a-table
          ref="table"
          size="middle"
          bordered
          rowKey="id"
          :columns="columns"
          :dataSource="dataSource"
          :pagination="ipagination"
          :loading="loading"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          @change="handleTableChange">
        <span slot="sfqy" slot-scope="text, record" >
          <a-switch v-model="record.sfqy=='1'"  @change="handleClickFlag(record)"  />
        </span>
          <span slot="action" slot-scope="text, record">
<!--          <Button   type="warning" size="small"  @click="viewRl(record)">查看日历</Button>-->
            <a @click="viewIndexInfo(record)">查看指标</a>
        </span>

        </a-table>
      </div>
      <!-- table区域-end -->

      <!-- 表单区域 -->
      <scheme-and-index-info-modal ref="indexInfo"></scheme-and-index-info-modal>

    </a-card>

  </div>

</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {getAction, postAction, deleteAction} from '@/api/manage'
  import {sfqyBatch} from '@/api/api'
  import SchemeAndIndexInfoModal from '@views/pams/khlc/khfagl/modules/SchemeAndIndexInfoModal'
  //import DpRwrlList from './DpRwrlList'

  export default {
    name: "DpJdrwglList",
    mixins:[JeecgListMixin],
    components: {
     SchemeAndIndexInfoModal
    },
    data () {
      return {
        nodeEditData:{},
        flag:true,
        description: '方案管理数据页面',
        currentDeptId:'',
        showKhfaEdit:false,
        // 表头
        columns: [
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

          /*{
            title: '考核方案ID',
            align:"center",
            dataIndex: 'schemeId'
          },*/
          {
            title: '所属考核目录',
            align:"center",
            dataIndex: 'menuId_dictText'
          },
          {
            title: '考核方案名称',
            align:"center",
            dataIndex: 'schemeName'
          },

          {
            title: '考核场景',
            align:"center",
            dataIndex: 'checkScene_dictText'
          },
          {
            title: '评价对象类型',
            align:"center",
            dataIndex: 'evlObjType_dictText'
          },
          {
            title: '生效日期',
            align:"center",
            dataIndex: 'startDate'
          },
          {
            title: '失效日期',
            align:"center",
            dataIndex: 'endDate'
          },
          {
            title: '创建人',
            align: "center",
            dataIndex: 'createBy',
          },
          {
            title: '创建时间',
            align: "center",
            dataIndex: 'createTime',
          },
          {
            title: '修改人',
            align: "center",
            dataIndex: 'updateBy',
          },
          {
            title: '修改时间',
            align: "center",
            dataIndex: 'updateTime',
          },

         /* {
            title: '机构等级',
            align:"center",
            dataIndex: 'orgLevel'
          },
          {
            title: '方案所属机构',
            align:"center",
            dataIndex: 'orgId'
          },*/

          /*{
            title: '业务条线编号',
            align:"center",
            dataIndex: 'bussSysNo'
          },*/
          /*{
            title: '描述',
            align:"center",
            dataIndex: 'remark'
          },*/
          /*{
            title: '生效日期',
            align:"center",
            dataIndex: 'startDate'
          },
          {
            title: '失效日期',
            align:"center",
            dataIndex: 'endDate'
          },
          {
            title: '考核场景',
            align:"center",
            dataIndex: 'checkScene'
          },
          {
            title: '评价对象类型',
            align:"center",
            dataIndex: 'evlObjType'
          },
          {
            title: '特殊规则类型',
            align:"center",
            dataIndex: 'speRuleType'
          },
          {
            title: '数据删除标志',
            align:"center",
            dataIndex: 'statFlag'
          },*/
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
            list: "/khlc/khfagl/vPmaAScheme/list",
            delete: "/khlc/khfagl/pmaAScheme/delete",
            deleteBatch: "/khlc/khfagl/pmaAScheme/deleteBatch",
            exportXlsUrl: "khlc/khfagl/pmaAScheme/exportXls",
            importExcelUrl: "khlc/khfagl/pmaAScheme/importExcel",
           },
        }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {

      searchReset() {
        this.queryParam = {}
        //this.currentDeptId = '';
        this.loadData(1);
        //this.$emit('clearSelectedDepartKeys')
      },
      loadData(arg) {
        if (!this.url.list) {
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        let params = this.getQueryParams();//查询条件
        params.menuId = this.currentDeptId;
        getAction(this.url.list, params).then((res) => {
          if (res.success && res.result) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          }
        })
      },
      open() {
        this.loadData(1);
      },
      clearList() {
        this.currentDeptId = '';
        this.dataSource = [];
      },
      viewIndexInfo: function (record) {
        this.$refs.indexInfo.title = "查看";
        this.$refs.indexInfo.disableSubmit = false;
        this.$refs.indexInfo.edit(record);
      },

      viewRl(record){
        this.$refs.rwrlForm.visible = true
        this.$refs.rwrlForm.open(record);
      },

      handleClickFlag(record){
        let that = this;
        console.log(record)
        if(record.sfqy=='1'){
          record.sfqy='2'
          sfqyBatch({id: record.id, sfqy: 2}).then((res) => {
            if (res.success) {
              that.$message.success(res.message);
              that.loadData();
            } else {
              that.$message.warning(res.message);
            }
          });
        }else{
          record.sfqy='1'
          sfqyBatch({id: record.id, sfqy: 1}).then((res) => {
            if (res.success) {
              that.$message.success(res.message);
              that.loadData();
            } else {
              that.$message.warning(res.message);
            }
          });

        }
      },

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>