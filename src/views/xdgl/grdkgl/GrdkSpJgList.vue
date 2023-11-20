<template>
  <div>
    <a-card :bordered="false" v-show="!showspcypz">
      <!-- 查询区域 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline" @keyup.enter.native="searchQuery">
          <a-row :gutter="24">

            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="所属支行">
                <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh" dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz"
                               :tree-default-expand-all="true" treeNodeFilterProp="title" :filterTreeNode="true" :isAll="isAll"></j-tree-select>
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

            <template v-if="toggleSearchStatus">
              <a-col :xl="6" :lg="7" :md="8" :sm="24">
                <a-form-item label="审批确认状态">
                  <j-dict-select-tag placeholder="请选择审批确认状态" v-model="queryParam.jtspzzzt" dict-code="sfbz"/>
                </a-form-item>
              </a-col>
            </template>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
               {{ toggleSearchStatus ? '收起' : '展开' }}
               <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
             </a>
            </span>
            </a-col>

          </a-row>
        </a-form>
      </div>

      <!-- 操作按钮区域 -->
      <div class="table-operator">
        <a-button icon="download" :loading="exportLoading" @click="handleExportXls('个人贷款-已审批')" v-has="'GrdkSpJg:exp'">导出</a-button>
        <!-- <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
           <a-button type="primary" icon="import">导入</a-button>
         </a-upload>-->
        <!-- <a-dropdown v-if="selectedRowKeys.length > 0">
           <a-menu slot="overlay">
             <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
           </a-menu>
           <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
         </a-dropdown>-->
      </div>

      <!-- table区域-begin -->
      <div>
        <!-- <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
           <i class="anticon anticon-info-circle ant-alert-icon"></i>
           <span>已选择</span>
           <a style="font-weight: 600">
             {{ selectedRowKeys.length }}
           </a>
           <span>项</span>
           <a style="margin-left: 24px" @click="onClearSelected">清空</a>
         </div>
   -->
        <a-table
          ref="table"
          size="small"
          bordered
          rowKey="id"
          :columns="columns"
          :dataSource="dataSource"
          :pagination="ipagination"
          :loading="loading"
          :scroll="{ x: 1200 }"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          @change="handleTableChange">
        <span slot="action" slot-scope="text, record">
          <!--<Button   type="warning"  @click="handleJtsp(record)" size="small">集体审批</Button>
          <a-divider type="vertical" />-->
          <Button   type="primary"  @click="viewSp(record)" size="small" v-has="'GrdkSpJg:spxx'">审批信息</Button>
          <a-divider type="vertical" />
          <!--<Button   type="error"  @click="handleQrsp(record)" size="small">确认审批</Button>-->
          <Button   type="primary"  @click="handleSpcy(record)" size="small" v-has="'GrdkSpJg:cygl'">成员管理</Button>
          <a-divider type="vertical" />
         <a-dropdown>
           <a class="ant-dropdown-link">更多<a-icon type="down" /></a>
           <a-menu slot="overlay">
             <a-menu-item>
                <Button type="success" size="small" @click="ViewXxxx(record)" v-has="'GrdkSpJg:cjxq'">采集详情</Button>
             </a-menu-item>
             <a-menu-item>
                <Button    type="info"  @click="view(record)" size="small" v-has="'GrdkSpJg:ylwj'">预览文件</Button>
             </a-menu-item>
            <!-- <a-menu-item>
               <Button   type="primary"  @click="handleSpcy(record)" size="small">审批成员</Button>
             </a-menu-item>-->
           </a-menu>
         </a-dropdown>
       </span>


        </a-table>
      </div>
    </a-card>
    <grdk-sp-jg-modal ref="modalForm" @ok="modalFormOk"/>
    <grdk-jtsp-modal ref="jtspmodalForm" @ok="modalFormOk"></grdk-jtsp-modal>
    <jtspcypz-modal ref="jtspcyForm" @ok="modalFormOk"></jtspcypz-modal>
  </div>

</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import GrdkSpJgModal from './modules/GrdkSplcModal'
  import JtspcypzModal from './modules/JtspcypzModal'
  import { getAction, putAction } from '@/api/manage'
  import store from '@/store/'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import GrdkJtspModal from './modules/GrdkJtspModal'

  export default {
    name: "GrdkglList",
    mixins: [JeecgListMixin],
    components: {
      GrdkSpJgModal,JTreeSelect,GrdkJtspModal,JtspcypzModal
    },
    data () {
      return {
        isAll: false,
        description: '个人贷款-已审批',
        // 表头
        showspcypz:false,
        columns: [
          {
            title: '申请日期',
            align: "center",
            dataIndex: 'createTime',
            width: 100,
            customRender: function (text) {
              return !text ? "" : (text.length > 10 ? text.substr(0, 10) : text)
            },
          },
          {
            title: '所属支行',
            align: "center",
            dataIndex:'sszh_dictText',
            width:100
          },
          {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc',
            scopedSlots: { customRender: 'detail' },
            width:100
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
            title: '确认状态',
            align:"center",
            dataIndex: 'jtspzzzt_dictText',
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
            fixed: 'right',
            width:240
          }

        ],
        // 请求参数
    	url: {
              list: "/xdgl/grdkgl/vgrdkspjl/list",
              delete: "/xdgl/grdkgl/delete",
              deleteBatch: "/xdgl/grdkgl/deleteBatch",
              exportXlsUrl: "xdgl/grdkgl/vgrdkspjl/exportXls",
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
    },
    methods: {
      //查看集体审批表单pc暂时屏蔽
      handleJtsp: function(record) {
        if(record.jtspzzzt==1){
          this.$message.warning("终审已确认,不能重复审批!")
        }else {
          this.$refs.jtspmodalForm.edit(record);
        }

      },

      handleQrsp: function(record) {
        if(record.jtspzzzt==1){
          this.$message.warning("终审已确认,请勿重复操作!")
        }else {
          this.$Modal.confirm({
            title: "终审确认操作",
            // 记得确认修改此处
            content: "终审确认后无法再次进行审批操作！您确认操作 ?",
            loading: true,
            onOk: () => {
              putAction("xdgl/grdkgl/qrsp",{id:record.id} ,'put').then((res) => {
                if (!res.success){
                  this.$message.error(res.message,5)
                  loading: false
                  return
                }else {
                  this.$message.success("操作成功！")
                  this.loadData(1);
                  this.$Modal.remove();
                }
              });
            }
          });

        }

      },


      handleSpcy(record){
        this.$refs.jtspcyForm.visible=true;
        this.$refs.jtspcyForm.title = "集体审批人员配置";
        this.$refs.jtspcyForm.loadData(record);
      },

      handleEdit: function (record) {
        this.record=record;
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑";
        this.$refs.modalForm.disableSubmit = false;
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
      ViewXxxx: function (record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "详情";
        this.$refs.modalForm.disableSubmit = true;
        this.$refs.modalForm.activeTab = '10';
        this.$refs.modalForm.isfxjl = true;
        this.$refs.modalForm.showSpls = true;
        this.$refs.modalForm.iszhfxpj = true;
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
      }, view(record){
        let formData={};
        formData.id=record.id;
        var id = record.id;
        getAction('/wordinfo/camsZcsxWordinfo/grdkWord',formData).then((res)=>{
          if(res.success){
            var pdfname =id;
            getAction('/wordinfo/camsZcsxWordinfo/copyPdf',{name:pdfname}).then((res)=>{
              if(res.success){
                console.log(res.message)
              }
            })
            console.log(res.message)
            let url= `${window._CONFIG['staticDomainURL']}/`+ "grdk/"+id+"grdk.doc"
            window.open(
              //'http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(url)
              `${window._CONFIG['kkFileViewURL']}`+ '?url='+encodeURIComponent(url));
            console.log('--------------------------------------------------------')

          }else{
            this.$message.warning(res.message,5);
          }
        })
      },
      viewSp(record){
        let formData={};
        formData.id=record.id;
        getAction('/wordinfo/camsZcsxWordinfo/jtspWord',formData).then((res)=>{
          if(res.success){
            let url= `${window._CONFIG['staticDomainURL']}/`+ res.message
            window.open(
              `${window._CONFIG['kkFileViewURL']}`+ '?url='+encodeURIComponent(url));
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