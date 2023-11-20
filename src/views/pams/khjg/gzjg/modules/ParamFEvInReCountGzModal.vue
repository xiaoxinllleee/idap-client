<template>
  <div>
    <a-modal centered
             :title="title"
             :width="1400"
             :visible="visible"
             :destroyOnClose="true"
             @ok="handleOk"
             @cancel="handleCancel"
             cancelText="关闭">


      <!-- table区域-begin -->
      <div>

        <div class="table-page-search-wrapper">
          <a-form layout="inline" @keyup.enter.native="searchQuery">
            <a-row :gutter="24">

              <a-col >
                <a-form-item label="执行日期">
                  <a-range-picker :placeholder="['开始日期', '结束日期']"  :format="DateFormat" @change="onQxDateChange" style="width: 25%;" />
                  <a-button type="primary" :loading="loadingBt" icon="area-chart" @click="initData">提取</a-button>{{this.showMsg}}
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>


        <a-card title="基础数据及方案加工" >
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

             <span slot="action" slot-scope="text, record">
              <Button   type="warning" size="small"  @click="viewRl(record)">查看日历</Button>
                  <!--<a-divider type="vertical" />
                  <Button   type="warning" size="small"  @click="viewRl(record)">批量提取</Button>-->
            </span>

          </a-table>

          <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
            <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys1.length }}</a>项
            <a style="margin-left: 24px" @click="onClearSelected">清空</a>
          </div>
          <a-table
            ref="table"
            size="middle"
            bordered
            rowKey="id"
            :columns="columns1"
            :dataSource="dataSource1"
            :pagination="ipagination"
            :loading="loading1"
            :rowSelection="{selectedRowKeys1: selectedRowKeys1, onChange: onSelectChange1}"
            @change="handleTableChange">
               <span slot="action" slot-scope="text, record">
                 <Button   type="warning" size="small"  @click="viewKhfajg(record)">查看日历</Button>
<!--                  <a @click="viewIndexInfo(record)">查看指标</a>-->
              </span>

          </a-table>
          <a-card-meta title="提取说明：">
            <template slot="description">
              可以按需勾选需要提取的任务数据,注:未勾选代表提取该时间区间内的所有数据。
            </template>
          </a-card-meta>

        </a-card>

        <!--<a-card title="方案数据提取" >
          <PmaAShemeList ref="pmaAShemeList" ></PmaAShemeList>
        </a-card>-->

      </div>
      <dp-rwrl-list ref="rwrlForm" @ok="modalFormOk"></dp-rwrl-list>
      <KhfajgList ref="khfajgForm" > </KhfajgList>


    </a-modal>
  </div>
</template>

<script>
  import { getAction, httpAction,putAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import ParamFEvInReModalJG from './ParamFEvInReModalJG'
  import DpRwrlList from '@views/basic/sjjggl/sjjg/modules/DpRwrlList'
  import  KhfajgList from './KhfajgList'
  import { updateInsStatus } from '@api/activiti'
  //import PmaAShemeList from './PmaAShemeList'


  export default {
    mixins: [JeecgListMixin],
    components: {
      ParamFEvInReModalJG,DpRwrlList ,KhfajgList //PmaAShemeList
    },
    name: "ParamFEvInReModal",
    data () {
      return {
        title:"操作",
        visible: false,
        loadingBt:false,
        model: [],
        tjrq:'',
        tjrq_begin:'',
        tjrq_end:'',
        tjrqB:'',
        tjrqE:'',
        showMsg:'',
        DateFormat: 'YYYY-MM-DD',
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        dataSource:[],
        dataSource1:[],
        selectedRowKeys: [],
        selectedRowKeys1: [],
        selectedRows: [],
        selectionRows:[],
        selectionRows1:[],
        confirmLoading: false,
        form: this.$form.createForm(this),
        url: {
          list: "/gztq/vDpJdrwgl/list",
          list1: "/khlc/khfagl/vPmaAScheme/list",
          init:"/gztq/vDpJdrwgl/init",
          delete: "/system/dpJdrwgl/delete",
          deleteBatch: "/system/dpJdrwgl/deleteBatch",
          exportXlsUrl: "system/dpJdrwgl/exportXls",
          importExcelUrl: "system/dpJdrwgl/importExcel",
        },
        loading: false,
        loading1:false,
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title: '节点目录',
            align:"center",
            dataIndex: 'jdid_dictText'
          },
          {
            title: '任务名称',
            align:"center",
            dataIndex: 'rwmc'
          },
          {
            title: '任务存储过程',
            align:"center",
            dataIndex: 'rwgc'
          },
          {
            title: '最大成功统计日期',
            align:"center",
            dataIndex: 'statDate'
          },
          {
            title: '执行开始时间',
            align:"center",
            dataIndex: 'startTime'
          },
          {
            title: '执行结束时间',
            align:"center",
            dataIndex: 'endTime'
          },
          {
            title: '执行耗时',
            align:"center",
            dataIndex: 'zxhs'
          },
          /*{
            title: '执行状态',
            align:"center",
            dataIndex: 'zjyczxzt_dictText'
          },*/
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        columns1: [
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
            title: '评价对象类型',
            align:"center",
            dataIndex: 'evlObjType_dictText'
          },

          {
            title: '最大成功统计日期',
            align:"center",
            dataIndex: 'statDate'
          },
          {
            title: '执行开始时间',
            align:"center",
            dataIndex: 'startTime'
          },
          {
            title: '执行结束时间',
            align:"center",
            dataIndex: 'endTime'
          },
          {
            title: '执行耗时',
            align:"center",
            dataIndex: 'zxhs'
          },

          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
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

        // 分页参数
        ipagination1: {
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['10', '50', '100'],
          showTotal: (total, range) => {
            return range[0] + "-" + range[1] + " 共" + total + "条"
          },
          total: 0
        },
      }
    },
    created () {
      this.tjrq_begin = '';
      this.tjrq_end   = '';
    },
    methods: {
      onQxDateChange: function(dateString) {
        let qxDateString   = dateString;
        this.tjrq_begin = qxDateString[0];
        this.tjrq_end   = qxDateString[1];
        this.tjrqB=moment(this.tjrq_begin).format('YYYY-MM-DD');
        this.tjrqE=moment(this.tjrq_end).format('YYYY-MM-DD');


        console.log(moment(this.tjrq_begin).format('YYYY-MM-DD'));
        console.log(moment(this.tjrq_end).format('YYYY-MM-DD'));
        let params = {tjrqBegin:moment(this.tjrq_begin).format('YYYY-MM-DD'),tjrqEnd:moment(this.tjrq_end).format('YYYY-MM-DD')};//查询条件
        this.loadData1(1,params);
      },

      handleTableChange(pagination, filters, sorter) {
        //分页、排序、筛选变化时触发
        //TODO 筛选
        if (Object.keys(sorter).length > 0) {
          this.isorter.column = sorter.field;
          this.isorter.order = "ascend" == sorter.order ? "asc" : "desc"
        }
        this.ipagination = pagination;
        this.loadData();
      },
      onSelectChange(selectedRowKeys, selectedRows) {
        console.log(selectedRows)
        this.selectedRowKeys = selectedRowKeys;
        this.selectionRows = selectedRows;
      },
      onSelectChange1(selectedRowKeys, selectedRows) {
        this.selectedRowKeys1 = selectedRowKeys;
        this.selectionRows1 = selectedRows;
      },
      add () {
        this.edit({});
      },
      edit () {
        this.loadData(1);
        this.visible = true;
        //this.$refs.pmaAShemeList.open();
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
        let params = {};//查询条件
        getAction(this.url.list, params).then((res) => {
          if (res.success && res.result) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          }
        })
      },
      loadData1(arg,params) {
        if (!this.url.list1) {
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination1.current = 1;
        }
        getAction(this.url.list1, params).then((res) => {
          if (res.success && res.result) {
            this.dataSource1 = res.result.records;
            this.ipagination1.total = res.result.total;
          }
        })
      },
      viewRl(record){
        this.$refs.rwrlForm.visible = true
        this.$refs.rwrlForm.open(record);
      },
      viewKhfajg(record){
        this.$refs.khfajgForm.visible = true
        this.$refs.khfajgForm.open(record.schemeId);
      },
      handleEdit: function (record) {
        console.log(record)
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
      },
      close () {
        this.tjrq_begin = '';
        this.tjrq_end   = '';
        this.dataSource1=[];
        this.selectedRowKeys=[];
        this.selectedRowKeys1=[];
        this.selectionRows=[];
        this.selectionRows1=[];
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化

            console.log(formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })



          }
        })
      },
      handleCancel () {
        this.close()
      },
      initData(){
        if(this.tjrq_begin==''||this.tjrq_end ==''){
          this.$message.warning("请选择需要提取的数据日期区间");
          return;
        } ;
        if(this.dataSource1.length==0||this.dataSource1==[]){
          this.$message.warning("考核方案数据不存在,请核对！");
          return;
        }
        console.log(this.selectedRowKeys)
        console.log(this.selectedRowKeys1)

        if((this.selectedRowKeys.length==0||this.selectedRowKeys==[])&(this.selectedRowKeys1.length==0||this.selectedRowKeys1==[])){
          this.$message.warning("请勾选需要提取的数据！");
          return;
        }else{
          let dpJdrwgl={dpJdrwgl:this.selectionRows}
          let pmaASchemes={pmaASchemes:this.selectionRows1}
          let params=Object.assign({tjrqBegin:moment(this.tjrq_begin).format('YYYY-MM-DD'),tjrqEnd:moment(this.tjrq_end).format('YYYY-MM-DD')}, dpJdrwgl,pmaASchemes);
          let _this= this;
          this.loadingBt=true;
          this.showMsg='正在提取'+this.tjrqB+'-'+this.tjrqE+'的数据';
          putAction(this.url.init, params).then((res) => {
            if(res.success){
              _this.$notification.success({
                message: `基础数据及方案加工`,
                description: `${moment(this.tjrq_begin).format('YYYY-MM-DD')}至${moment(this.tjrq_end).format('YYYY-MM-DD')}数据加工完成！`,
              });
            }else{
              _this.$notification.error({
                message: `基础数据及方案加工 `,
                description: res.message,
              });
            }
          }).finally(() => {
            let params = {tjrqBegin:moment(this.tjrq_begin).format('YYYY-MM-DD'),tjrqEnd:moment(this.tjrq_end).format('YYYY-MM-DD')};//查询条件
            _this.loadingBt=false;
            _this.showMsg='';
            _this.loadData(1);
            _this.loadData1(1,params);
          })
          _this.$message.success("数据加工中，请稍后手动刷新查看加工结果！");
        }
      }

    }
  }
</script>

<style lang="less" scoped>

</style>