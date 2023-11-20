<template>
  <div>
    <historicDetail v-if="showHistory" @close="showHistory=false" :procInstId="procInstId" />
    <a-card :bordered="false" v-show="!showHistory">
      <!-- 查询区域 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline" @keyup.enter.native="searchQuery">
          <a-row :gutter="24">

            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="所属支行">
                <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh" dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz"
                               :tree-default-expand-all="true" treeNodeFilterProp="title"  :filterTreeNode="true" :isAll="isAll"></j-tree-select>
              </a-form-item>
            </a-col>

            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="客户名称">
                <a-input placeholder="请输入客户名称" v-model="queryParam.khmc"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="证件号码">
                <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
            </a-col>

          </a-row>
        </a-form>
      </div>

      <!-- 操作按钮区域 -->
      <div class="table-operator">

        <a-button icon="download" :loading="exportLoading" @click="handleExportXls('个人贷款-授信')" v-has="'GrdkSplc:exp'">导出</a-button>

      </div>

      <div>


        <a-table ref="table"
                 size="small"
                 bordered
                 :SrowKey="id"
                 :columns="columns"
                 :dataSource="dataSource"
                 :pagination="ipagination"
                 :loading="loading"
                 :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
                 @change="handleTableChange">

          <span slot="tjspzt" slot-scope="tjspzt">
            <a-tag :key="tjspzt" :color="tjspzt === '未提交' ? 'grey' : tjspzt==='审批中' ? 'blue' : tjspzt==='已通过' ? '#87d068' : tjspzt==='未通过'? 'red' : '#87d068'">
              {{ tjspzt}}
            </a-tag>
          </span>


          <span slot="action" type="primary" slot-scope="text, record">
            <Button v-if="(isAll||iskhjl)&&record.tjspzt==1" type="warning" size="small" @click="handleFxspTj(record)" v-has="'GrdkSplc:fxsptj'">提交风险审批</Button>
            <Button v-if="(isAll||iskhjl)&&record.tjspzt!=1&&record.tjspzt!=4&&record.tjspzt!=3" type="info" size="small" @click="handleFxspXq(record)" v-has="'GrdkSplc:fxspxq'">风险审批详情</Button>
            <Button v-if="(isAll||iskhjl)&&(record.tjspzt==4||record.tjspzt==3)" type="error" size="small" @click="handleFxspCxtj(record)" v-has="'GrdkSplc:cxtjsp'">重新提交审批</Button>
            <Button v-if="isfxjl&&(record.scjl!=3||record.scjl==3)" :disabled="record.tjspzt==1||record.scjl!=3" type="warning" size="small" @click="handleFxsp(record)" v-has="'GrdkSplc:fxsp'">风险审批</Button>
            <a-divider v-if="(isfxjl||isAll||iskhjl)" type="vertical"/>
            <a-dropdown >
               <a class="ant-dropdown-link">更多<a-icon type="down"/></a>
               <a-menu slot="overlay">
                 <a-menu-item key="3"  @click="ViewXxxx(record)">
                   <Button type="success" size="small" v-has="'GrdkSplc:xq'">详情</Button>
                 </a-menu-item>
                 <a-menu-item key="5"  @click="handleLldjxq(record)">
                   <Button  type="info" size="small" v-has="'GrdkSplc:djxq'">定价详情</Button>
                 </a-menu-item>
                 <a-menu-item key="6"   @click="grdkfj(record)">
                   <Button  type="info" size="small" v-has="'GrdkSplc:fjxq'">附件详情</Button>
                 </a-menu-item>
                 <a-menu-item key="7" @click="grdksx(record)">
                   <Button type="info" size="small" v-has="'GrdkSplc:xdzl'">信贷资料</Button>
                 </a-menu-item>
                 <a-menu-item key="8" @click="handleGrdkInfo(record)">
                   <Button  type="info" size="small" v-has="'GrdkSplc:zlbl'">资料补录</Button>
                 </a-menu-item>
               </a-menu>
             </a-dropdown>
          </span>
        </a-table>
      </div>
      <!-- table区域-end -->

      <!-- 表单区域 -->
      <grdkgl-modal ref="modalForm" @ok="modalFormOk"  @apply="apply"/>
      <lldjxq-modal ref="lldjxq" @ok="modalFormOk" />
      <!--<grdk-fxsp-modal ref="fxspModalForm" @ok="fxspFormOk" />-->
      <grdkbll-modal ref="blForm"/>
    </a-card>

    <Modal title="提交申请" v-model="modalVisible" :mask-closable="false" :width="500">
      <Form ref="form" :model="form" :label-width="85" :rules="formValidate">
        <FormItem label="选择审批人" prop="assignees" v-show="showAssign" :error="error">
          <Select
            v-model="form.assignees"
            placeholder="请选择或输入搜索"
            filterable
            clearable
            multiple
            :loading="userLoading"
          >
            <Option
              v-for="(item, i) in assigneeList"
              :key="i"
              :value="item.id"
              :label="item.realname"
            >
              <span style="margin-right:10px;">{{ item.realname }}</span>
              <span style="color:#ccc;">{{ item.username }}</span>
            </Option>
          </Select>
        </FormItem>
        <FormItem label="自定义搜索选择审批人" prop="assignees" v-show="isCustom" :error="error">
          <Select
            v-model="form.assignees"
            placeholder="请输入用户名搜索选择用户"
            filterable
            remote
            multiple
            :remote-method="searchUser"
            :loading="userLoading"
          >
            <Option v-for="(item, i) in userList" :value="item.id" :key="i" :label="item.realname">
              <span style="margin-right:10px;">{{ item.realname }}</span>
              <span style="color:#ccc;">{{ item.username }}</span>
            </Option>
          </Select>
        </FormItem>
        <FormItem label="下一审批人" v-show="isGateway">
          <span>分支网关处暂不支持自定义选择下一审批人，将发送给下一节点所有人</span>
        </FormItem>
        <FormItem label="优先级" prop="priority">
          <Select v-model="form.priority" placeholder="请选择" clearable>
            <Option v-for="(item, i) in dictPriority" :key="i" :value="item.value">{{item.title}}</Option>
          </Select>
        </FormItem>
        <!-- <FormItem label="消息通知">
           <Checkbox v-model="form.sendMessage">站内消息通知</Checkbox>
           <Checkbox v-model="form.sendSms">短信通知</Checkbox>
           <Checkbox v-model="form.sendEmail">邮件通知</Checkbox>
         </FormItem>-->
      </Form>
      <div slot="footer">
        <Button type="text" @click="handelCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" :disabled="true" @click="handelSubmit">提交</Button>
      </div>
    </Modal>
    <Modal title="确认撤回" v-model="modalCancelVisible" :mask-closable="false" :width="500">
      <Form ref="delForm" v-model="cancelForm" :label-width="70">
        <FormItem label="撤回原因" prop="reason">
          <Input type="textarea" v-model="cancelForm.reason" :rows="4" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="modalCancelVisible=false">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handelSubmitCancel">提交</Button>
      </div>
    </Modal>
    <print-info ref="print"></print-info>
  </div>

</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import GrdkglModal from './modules/GrdkSplcModal'
  import GrdkFxspModal from './modules/GrdkFxspModal'
  import {putAction,getAction} from '@/api/manage'
  import store from '@/store/'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import historicDetail from '@/views/activiti/historic-detail/historicDetail';
  import LldjxqModal from './modules/LldjxqModal'
  import GrdkbllModal from './modules/GrdkbllModal'
  import PrintInfo from './modules/PrintInfo'
  import {
    getFirstNode,
    applyBusiness,
    cancelApply,
    searchUserByName
  } from "@/api/activiti";
  export default {
    name: "GrdkglList",
    mixins: [JeecgListMixin],
    components: {
       GrdkglModal,JTreeSelect,historicDetail,GrdkFxspModal,LldjxqModal,GrdkbllModal,PrintInfo
    },
    data () {
      return {
        description: '个人贷款-授信',
        loading:false,
        form: {
          sendMessage: true,
          sendSms: true,
          sendEmail: true,
          procDefId: "",
          assignees: [],
          priority: "0"
        },
        formValidate: {
          // 表单验证规则
          procDefId: [{ required: true, message: "不能为空", trigger: "blur" }],
          priority: [{ required: true, message: "不能为空", trigger: "blur" }]
        },
        dictPriority: [
          {
            value: "0",
            title: "普通"
          },
          {
            value: "1",
            title: "重要"
          },
          {
            value: "2",
            title: "紧急"
          }
        ],
        cancelForm: {
          reason: ""
        },
        showHistory: false,
        procInstId:"",
        modalCancelVisible: false,
        error: "",
        assigneeList: [],
        submitLoading: false, // 添加或编辑提交状态
        modalVisible: false, // 提交审批窗口
        userList: [],
        userLoading: false,
        showAssign: false,
        isGateway: false,
        isCustom: false,
        isAll: false,
        iskhjl:false,
        isfxjl:false,
        // 表头
        columns: [
          {
            title: '所属支行',
            align: "center",
            dataIndex:'sszh_dictText',
          },
          {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc',
            scopedSlots: { customRender: 'detail' },
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm',
            width:160
          },

          {
            title: '镇',
            align:"center",
            dataIndex: 'yjyxdybh_dictText',
          },
          {
            title: '村',
            align:"center",
            dataIndex: 'ejyxdybh_dictText',
          },
          {
            title: '组',
            align:"center",
            dataIndex: 'sjyxdybh_dictText',
          },
          {
            title: '客户经理',
            align:"center",
            dataIndex: 'sskhjl_dictText',
          },

          {
            title: '评定等级',
            align:"center",
            dataIndex: 'pddj_dictText',
          },
          {
            title: '授信金额',
            align:"center",
            dataIndex: 'sxje',
          },
          {
            title: '风险审批',
            align:"center",
            dataIndex: 'tjspzt_dictText',
            key:'tjspzt',
            scopedSlots: { customRender: 'tjspzt' },
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }

        ],
        // 请求参数
    	url: {
              list: "/xdgl/grdkgl/grdksplc/list",
              getZxxlldjb:"/dklldj/lldjjs/getZxxlldjb",
              delete: "/xdgl/grdkgl/delete",
              deleteBatch: "/xdgl/grdkgl/deleteBatch",
              exportXlsUrl: "xdgl/grdkgl/grdksplc/exportXls",
              importExcelUrl: "xdgl/grdkgl/importExcel",
           },
        }
      },
      computed: {
        importExcelUrl: function(){
          return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
        }
      },

    created(){
      this.isAll = store.getters.isRoot
      this.khjlQx();
      this.fxjlQx();

    },
    methods: {
      fxspFormOk(){
        this.loadData(1);
      },
      khjlQx(){
        let _this=this;
        putAction('/sys/user/getUserRole',{},'put').then((res) => {
          if(res.success){
            if(res.message=='true'){
               this.iskhjl=true;
            }else{
               this.iskhjl=false;
            }
            console.log('iskhjl:')
            console.log(this.iskhjl)
          }else{
            _this.$message.warning(res.message,5);
          }
        })
      },
      fxjlQx(){
        let _this=this;
        putAction('/sys/user/getUserFxjlRole',{},'put').then((res) => {
          if(res.success){
            if(res.message=='true'){
              this.isfxjl=true;
            }else{
              this.isfxjl=false;
            }
            console.log('isfxjl:')
            console.log(this.isfxjl)
          }else{
            _this.$message.warning(res.message,5);
          }
        })
      },
      handleFxsp: function(record) {
        this.record=record;
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.activeTab='10';
        this.$refs.modalForm.isShowFxsp=true;
        this.$refs.modalForm.isfxjl=this.isfxjl;
        this.$refs.modalForm.isCxtj=false;
        this.$refs.modalForm.showSpls = false;
        this.$refs.modalForm.iszhfxpj = true;
        this.$refs.modalForm.istfxjlysj = false;
        this.$refs.modalForm.showButton= false;

      },
      handleFxspXq: function(record) {
        /*this.$refs.fxspModalForm.edit(record);
        this.$refs.fxspModalForm.disableSubmit = true;*/
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "详情";
        this.$refs.modalForm.disableSubmit = true;
        this.$refs.modalForm.activeTab = '10';
        this.$refs.modalForm.isfxjl = this.isfxjl;
        this.$refs.modalForm.showSpls = false;
        this.$refs.modalForm.iszhfxpj = true;

      },
      handleGrdkInfo: function(record) {
        this.$refs.blForm.edit(record);
        this.$refs.blForm.disableSubmit = true;
      },

      grdkfj(record){
        let formData={};
        formData.zjhm=record.zjhm;
        formData.hhbm=record.hhbm;
        getAction('/wordinfo/camsZcsxWordinfo/grdkfujian',formData).then((res)=>{
          if(res.success){
            if (res.message == "fail"){
              this.$message.warning("该用户未上传资料");
              return;
            }

            if(res.message.indexOf("grdkfj") != -1){
              let url= `${window._CONFIG['staticDomainURL']}/`+ "grdkfj/"+res.message
              window.open(
                //'http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(url)
                `${window._CONFIG['kkFileViewURL']}`+ '?url='+encodeURIComponent(url))
            }

          }else{
            this.$message.warning(res.message,5);
          }
        })
      },
      handleEdit: function (record) {
        if(record.scjl!=1){
          if(record.scjl==2){
            this.$message.warning("风险审批未通过,不能进入流程！")
            return
          }else if(record.scjl==3){
            this.$message.warning("未进行风险审批,不能进入流程！")
            return
          }
        }
       /* putAction("/xdgl/grdkgl/grdksplc/querylldjxq", {zjhm: record.zjhm, sszh:record.sszh}).then((res) => {
          if (!res.success) {
            this.$message.warning("未进行利率定价,不能进入流程！");
          }else{
            console.log('111111111111')
            this.record=record;
            this.$refs.modalForm.edit(record);
            this.$refs.modalForm.title = "编辑";
            this.$refs.modalForm.disableSubmit = false;
            this.$refs.modalForm.activeTab='10';
            this.$refs.modalForm.isShowFxsp=false;
            this.$refs.modalForm.isfxjl=this.isfxjl;
            this.$refs.modalForm.isCxtj=false;
            this.$refs.modalForm.iszhfxpj = true;
            this.$refs.modalForm.iszhfxpj =true;

          }
        });*/
        this.record=record;
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.activeTab='10';
        this.$refs.modalForm.isShowFxsp=false;
        this.$refs.modalForm.isfxjl=this.isfxjl;
        this.$refs.modalForm.isCxtj=false;
        this.$refs.modalForm.iszhfxpj = true;
        this.$refs.modalForm.iszhfxpj =true;

      },

      handleFxspCxtj: function (record) {
        this.record=record;
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.activeTab='10';
        this.$refs.modalForm.isShowFxsp=true;
        this.$refs.modalForm.isfxjl=this.isfxjl;
        this.$refs.modalForm.isCxtj=true;
        this.$refs.modalForm.showSpls = false;
        this.$refs.modalForm.iszhfxpj = false;
        this.$refs.modalForm.istfxjlysj = true;

      },

      handleFxspTj: function (record) {
        this.record=record;
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.activeTab='10';
        this.$refs.modalForm.isShowFxsp=true;
        this.$refs.modalForm.isfxjl=this.isfxjl;
        this.$refs.modalForm.isCxtj=false;
        this.$refs.modalForm.showSpls = false;
        this.$refs.modalForm.iszhfxpj = false;
        this.$refs.modalForm.istfxjlysj = true;
      },
      handleLldjxq:function(record){
        //this.$refs.lldjxq.edit(record);
        var now = new Date();
        var year = now.getFullYear(); //得到年份
        var zjhm = record.zjhm;
        var djnf = year+'-01-01';
        let data = {"zjhm": zjhm,"djnf": djnf}
        let this_=this;
        getAction(this.url.getZxxlldjb, data).then((res) => {
          if (res.success) {
            console.log(res.result.records);
            this_.$refs.print.edit(res.result.records[0]);
            this_.$refs.print.title = '查看';
            this_.$refs.print.spzt = "1";
            this_.$refs.print.disableSubmit = false
          } else {
            this_.$message.error(res.message)
          }
        })
      },
      initQueryParams() {
        if(!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.paramsInited = true
      },
      searchReset: function() {
        this.queryParam = {}
        if(!store.getters.isRoot) {
          this.queryParam.sszh = store.getters.userInfo.orgCode
        }
        this.loadData(1);
      },
      initDictConfig() {
      },
      handleAdd: function () {
        var params = this.queryParam;
        console.info(params.zjhm)
        if( params.zjhm==null || params.zjhm=='undefined'||params.zjhm==''){
          this.$message.error("请先输入证件号码!")
          return
        }
        let zjhm=params.zjhm;

        if (this.validateIdCard(zjhm)==false){
          this.$message.error("请输入正确证件号码!")
          return
        }
        let param = { "zjhm":zjhm }
        putAction("xdgl/grdkgl/grdkcj",param ,'put').then((res) => {
          console.log(res.result)
          if (res.result){
            this.$message.error(res.message,5)
            return
          }else {
            this.$refs.modalForm.add(param);
            this.$refs.modalForm.title = "新增";
            this.$refs.modalForm.disableSubmit = false;
          }
        })

      },

      validateIdCard(idCard){
        var vcity={ 11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
          21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",
          33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",
          42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",
          51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",
          63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"
        };
        //是否为空
        if(idCard === ''){
          return false;
        }
        //校验长度，类型
        if(this.isCardNo(idCard) === false){
          return false;
        }
        //检查省份
        if(this.checkProvince(idCard,vcity) === false){
          return false;
        }
        //校验生日
        if(this.checkBirthday(idCard) === false){
          return false;
        }
        //检验位的检测
        if(this.checkParity(idCard) === false){
          return false;
        }
        return true;
      },
      //检查号码是否符合规范，包括长度，类型
      isCardNo(card){
        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
        var reg = /(^\d{15}$)|(^\d{17}(\d|X|x)$)/;
        if(reg.test(card) === false){
          return false;
        }
        return true;
      },
      //取身份证前两位,校验省份
      checkProvince(card,vcity){
        var province = card.substr(0,2);
        if(vcity[province] == undefined){
          return false;
        }
        return true;
      },

//检查生日是否正确
      checkBirthday(card){
        var len = card.length;
        //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
        if(len == '15'){
          var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
          var arr_data = card.match(re_fifteen);
          var year = arr_data[2];
          var month = arr_data[3];
          var day = arr_data[4];
          var birthday = new Date('19'+year+'/'+month+'/'+day);
          return this.verifyBirthday('19'+year,month,day,birthday);
        }
        //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
        if(len == '18'){
          var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/;
          var arr_data = card.match(re_eighteen);
          var year = arr_data[2];
          var month = arr_data[3];
          var day = arr_data[4];
          var birthday = new Date(year+'/'+month+'/'+day);
          return this.verifyBirthday(year,month,day,birthday);
        }
        return false;
      },

//校验日期
      verifyBirthday(year,month,day,birthday)
      {
        var now = new Date();
        var now_year = now.getFullYear();
        //年月日是否合理
        if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day)
        {
          //判断年份的范围（0岁到100岁之间)
          var time = now_year - year;
          if(time >= 0 && time <= 100)
          {
            return true;
          }
          return false;
        }
        return false;
      },

      //校验位的检测
      checkParity(card){
        //15位转18位
        card = this.changeFivteenToEighteen(card);
        var len = card.length;
        if(len == '18'){
          var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
          var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
          var cardTemp = 0, i, valnum;
          for(i = 0; i < 17; i ++) {
            cardTemp += card.substr(i, 1) * arrInt[i];
          }
          valnum = arrCh[cardTemp % 11];
          if (valnum == card.substr(17, 1).toLocaleUpperCase())
          {
            return true;
          }
          return false;
        }
        return false;
      },
      //15位转18位身份证号
      changeFivteenToEighteen(card){
        if(card.length == '15')
        {
          var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
          var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
          var cardTemp = 0, i;
          card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
          for(i = 0; i < 17; i ++)
          {
            cardTemp += card.substr(i, 1) * arrInt[i];
          }
          card += arrCh[cardTemp % 11];
          return card;
        }
        return card;
      },

      searchUser(v) {
        if (!v) {
          return;
        }
        this.userLoading = true;
        searchUserByName(v).then(res => {
          this.userLoading = false;
          if (res.success) {
            this.userList = res.result;
          }
        });
      },

      handelCancel() {
        this.modalVisible = false;
      },
      handelSubmit() {
        this.loading=true;
        this.$refs.form.validate(valid => {
          if (valid) {
            if (
              (this.showAssign || this.isCustom) &&
              this.form.assignees.length < 1
            ) {
              this.error = "请至少选择一个审批人";
              return;
            } else {
              this.error = "";
            }
            this.submitLoading = true;
            let ret = '';
            for (let it in this.form) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(this.form[it]) + '&';
            }
            ret = ret.substring(0, ret.length - 1);
            applyBusiness(ret).then(res => {
              this.submitLoading = false;
              if (res.success) {
                this.$Message.success("操作成功");
                this.modalVisible = false;
                this.loadData(1);
              }
            });
          }
        });
      },
      apply(v) {
        console.log('====进入提交审批=====')
        console.log(v)
        if (!v.procDefId || v.procDefId == "null") {
          this.$Message.error("流程定义为空");
          return;
        }
        this.form.id = v.bussinessId;
        console.log("提交申请时id："+v.bussinessId)
        this.form.procDefId = v.procDefId;
        this.form.title = v.title;
        // 加载审批人
        this.userLoading = true;
        getFirstNode(v.procDefId).then(res => {
          this.userLoading = false;
          if (res.success) {
            this.error = "";
            if (res.result.type == 3 || res.result.type == 4) {
              this.isGateway = true;
              this.form.firstGateway = true;
              this.showAssign = false;
              this.isCustom = false;
              return;
            }
            if (res.result.type == 5) {
              this.isCustom = true;
              this.isGateway = false;
              this.form.firstGateway = false;
              this.showAssign = false;
              return;
            }
            if (res.result.type == 1) {
              this.showAssign = true;
              this.isGateway = false;
              this.form.firstGateway = false;
              this.isCustom = false;
              if (res.result.users && res.result.users.length > 0) {
                this.assigneeList = res.result.users;
                // 默认勾选
                let ids = [];
                res.result.users.forEach(e => {
                  ids.push(e.id);
                });
                this.form.assignees = ids;
                this.showAssign = true;
              } else {
                this.form.assignees = [];
                this.showAssign = true;
                this.error = '请进入"流程管理"为审批节点分配候选审批人员';
              }
            }
            /*setTimeout(() =>{
              this.handelSubmit();
            },1000);*/
            this.handelSubmit();
          }
        });
        this.modalVisible = false;
        this.loading=true;
      },

      //撤回
      cancel(v) {
        this.cancelForm.id = v.bussinessId;
        this.cancelForm.procInstId = v.procInstId;
        this.modalCancelVisible = true;
      },
      handelSubmitCancel() {
        this.submitLoading = true;
        let ret = '';
        for (let it in this.cancelForm) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(this.cancelForm[it]) + '&';
        }
        ret = ret.substring(0, ret.length - 1);
        cancelApply(ret).then(res => {
          this.submitLoading = false;
          if (res.success) {
            this.$Message.success("操作成功");
            this.modalCancelVisible = false;
            this.loadData(1);
          }
        });
      },
      showmysqjd(v) {
        if (!v.procInstId) {
          this.$Message.error("此审批为直接过,无审批历史 "+v.procInstId);
          return;
        }
        console.log(v.procInstId)
        this.procInstId = v.procInstId;
        this.showHistory = true;
      },
      ViewXxxx: function (record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "详情";
        this.$refs.modalForm.disableSubmit = true;
        this.$refs.modalForm.activeTab = '10';
        this.$refs.modalForm.isfxjl = this.isfxjl;
        this.$refs.modalForm.showSpls = true;
        this.$refs.modalForm.iszhfxpj = true;
      },

      grdksx(record){
        let formData={};
        formData.id=record.id;
        var id = record.id;
        getAction('/wordinfo/camsZcsxWordinfo/grdkWordSx',formData).then((res)=>{
          if(res.success){
            let url= `${window._CONFIG['staticDomainURL']}/`+ "grdksx/"+id+"grdk.doc"
            window.open(
              //'http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(url)
              `${window._CONFIG['kkFileViewURL']}`+ '?url='+encodeURIComponent(url));
            console.log('--------------------------------------------------------')
          }else{
            this.$message.warning(res.message,5);
          }
        })
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>