<template>
  <a-modal
    :title="title"
    :width="1300"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    :okButtonProps="{ props: {disabled: true} }"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
          <!--Tab 1：农户基本信息\Begin-->
              <a-row class="form-row" :gutter="24">
                <a-col :lg="8">   <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="统计日期">
                  <a-date-picker v-decorator="[ 'tjyf', {}]" style="width: 270px" />
                </a-form-item></a-col>
                <a-col :lg="8"> <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属支行">
                  <j-dict-select-tag placeholder="请输入所属支行" v-decorator="['zzbz', {} ]" dict-code="HR_BAS_ORGANIZATION,zzjc,zzbz"/>
                </a-form-item></a-col>
                <a-col :lg="8"> <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="营销单元编号">
                  <a-input placeholder="请输入营销单元编号" v-decorator="['dybh', validatorRules.dybh ]" />
                </a-form-item></a-col>
                <a-col :lg="8"> <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="营销单元名称">
                  <a-input placeholder="请输入营销单元名称" v-decorator="['dymc', {}]" />
                </a-form-item></a-col>
                <a-col :lg="8"> <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="营销单元性质">
                  <j-dict-select-tag placeholder="请选择营销单元性质" v-decorator="['dyxz', {rules: [{  message: '请选择营销单元性质!' }]}]" :triggerChange="true" dictCode="yjyxdyxz"/>
                </a-form-item></a-col>
                <a-col :lg="8">  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="归属客户经理编号">
                  <a-input placeholder="请输入归属客户经理编号" v-decorator="['khjlbz', {}]" />
                </a-form-item></a-col>
                <a-col :lg="8">  <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="归属客户经理名称">
                  <j-dict-select-tag placeholder="请输入归属客户经理名称" v-decorator="['khjlbz', {} ]" dict-code="HR_BAS_staff,ygxm,yggh"/>
                </a-form-item></a-col>
                <a-col :lg="8"> <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="总户数">
<!--                  <a-input placeholder="请输入总户数" v-decorator="['zhs', {}]" />-->
                  <a @click="routerIndex(0,0,0)"   >{{this.model.zhs}}</a>
                </a-form-item></a-col>
                <a-col :lg="8"> <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="潜在客户数">
<!--                  <a-input placeholder="请输入潜在客户数" v-decorator="['qzkhs', {}]" />-->
                  <a @click="routerIndex(0,0,1)"   >{{this.model.qzkhs}}</a>
                </a-form-item></a-col>
                <a-col :lg="8"> <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="普通客户数">
<!--                  <a-input placeholder="请输入普通客户数" v-decorator="['ptkhs', {}]" />-->
                  <a @click="routerIndex(0,0,2)"   >{{this.model.ptkhs}}</a>
                </a-form-item></a-col>
                <a-col :lg="8"> <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="核心客户数">
<!--                  <a-input placeholder="请输入核心客户数" v-decorator="['hxkhs', {}]" />-->
                  <a @click="routerIndex(0,0,3)"   >{{this.model.hxkhs}}</a>
                </a-form-item></a-col>
                <a-col :lg="8"> <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="高端客户数">
<!--                  <a-input placeholder="请输入高端客户数" v-decorator="['gdkhs', {}]" />-->
                  <a @click="routerIndex(0,0,4)"   >{{this.model.gdkhs}}</a>
                </a-form-item></a-col>
                <a-col :lg="8"> <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="手机银行户数">
                  <a @click="routerIndex(1,0,0)"   >{{this.model.sjyhhs}}</a>
<!--                  <a-input @focus="sjyh()" ref="sjyh" placeholder="请输入手机银行户数" v-decorator="['sjyhhs', {}]" />-->
                </a-form-item></a-col>
               <a-col :lg="8"> <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="ETC户数">
<!--                  <a-input @focus="setc()" ref="setc" placeholder="请输入ETC户数" v-decorator="['etchs', {}]" />-->
                 <a @click="routerIndex(2,0,0)"   >{{this.model.etchs}}</a>
                </a-form-item></a-col>
                <a-col :lg="8"> <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="信用卡户数">
<!--                  <a-input @focus="sxyk()" ref="sxyk" placeholder="请输入信用卡户数" v-decorator="['xykhs', {}]" />-->
                  <a @click="routerIndex(4,0,0)"   >{{this.model.xykhs}}</a>
                </a-form-item></a-col>
                <a-col :lg="8"> <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="福民卡户数">
<!--                  <a-input @focus="sfmk()" ref="sfmk" placeholder="请输入福民卡户数" v-decorator="['fmkhs', {}]" />-->
                  <a @click="routerIndex(3,0,0)"   >{{this.model.fmkhs}}</a>
                </a-form-item></a-col>
                <a-col :lg="8"> <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="社保卡户数">
                  <!--                  <a-input @focus="sfmk()" ref="sfmk" placeholder="请输入福民卡户数" v-decorator="['fmkhs', {}]" />-->
                  <a @click="routerIndex(5,0,0)"   >{{this.model.sbkhs}}</a>
                </a-form-item></a-col>
                <a-col :lg="8"> <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="扫码付户数">
<!--                  <a-input @focus="routerIndex(6,0,0)" ref="ssmf" placeholder="请输入扫码付户数" v-decorator="['smfhs', {}]" />-->
                  <a @click="routerIndex(6,0,0)"   >{{this.model.smfhs}}</a>
                </a-form-item></a-col>
                <a-col :lg="8"> <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="吸毒人员数">
<!--                  <a-input @focus="sxdry()" ref="sxdry" placeholder="请输入吸毒人员数" v-decorator="['xdrys', {}]" />-->
                  <a @click="routerIndex(0,3,0)"   >{{this.model.xdrys}}</a>
                </a-form-item></a-col>
                <a-col :lg="8"> <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贫困户户数">
<!--                  <a-input @focus="spkh()" ref="spkh" placeholder="请输入贫困户户数" v-decorator="['pkhhs', {}]" />-->
                  <a @click="routerIndex(0,1,0)"   >{{this.model.pkhhs}}</a>
                </a-form-item></a-col>
                <a-col :lg="8"> <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="低保户户数">
<!--                  <a-input @focus="sdbh()" ref="sdbh" placeholder="请输入低保户户数" v-decorator="['dbhhs', {}]" />-->
                  <a @click="routerIndex(0,2,0)"   >{{this.model.dbhhs}}</a>
                </a-form-item></a-col>
                <a-col :lg="8"> <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="非法集资人数">
<!--                  <a-input @focus="sffjz()" ref="sffjz" placeholder="请输入非法集资人数" v-decorator="['ffjzrs', {}]" />-->
                  <a @click="routerIndex(0,4,0)"   >{{this.model.ffjzrs}}</a>
                </a-form-item></a-col>
                <a-col :lg="8"> <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="重大疾病人数">
<!--                  <a-input @focus="szdjb()" ref="szdjb" placeholder="请输入重大疾病人数" v-decorator="['zdjbrs', {}]" />-->
                  <a @click="routerIndex(0,5,0)"   >{{this.model.zdjbrs}}</a>
                </a-form-item></a-col>

              </a-row>
          <a-tabs defaultActiveKey="1" >
            <a-tab-pane tab="存贷款情况" key="1">
              <div>
                <a-table bordered
                         size="middle"
                         :dataSource="this.khywxx"
                         :columns="cdkywqkTable.columns"
                         rowKey="id"
                         ></a-table>
              </div>
            </a-tab-pane>
            <a-tab-pane tab="电子银行业务情况" key="2" forceRender>
              <a-table bordered
                       size="middle"
                       :dataSource="this.khywxx"
                       :columns="dzyhywqkTable.columns"
                       rowKey="id"
                       ></a-table>
            </a-tab-pane>
            <a-tab-pane tab="授信用信情况" key="3" forceRender>
                <a-table bordered
                         size="middle"
                         :dataSource="this.khywxx"
                         :columns="sxyxTable.columns"
                         rowKey="id"
                         ></a-table>
            </a-tab-pane>
          </a-tabs>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction,putAction,getAction  } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "yxdytjModal",
    data () {
      return {
        title:"操作",
        visible: false,
        disableSubmit: false,
        khywxx:[],
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        cdkywqkTable : {
          columns: [
            {
              title: '统计日期',
              dataIndex: 'tjyf',
              key: 'tjyf',
              width: '10%',
              align: "center",
            },

            {
              title:'存款 ',
              children:[
                {
                  title: '余额',
                  align:"center",
                  dataIndex: 'ckye',
                },
                {
                  title: '户数',
                  align:"center",
                  dataIndex: 'ckhs',
                },
                {
                  title: '占比',
                  align:"center",
                  dataIndex: 'ckyezb',
                },
              ]
            },
            {
              title:'贷款 ',
              children:[
                {
                  title: '余额',
                  align:"center",
                  dataIndex: 'dkye',
                },
                {
                  title: '户数',
                  align:"center",
                  dataIndex: 'dkhs',
                },
                {
                  title: '占比',
                  align:"center",
                  dataIndex: 'dkyezb',
                },
              ]
            },
            {
              title:'表内不良贷款 ',
              children:[
                {
                  title: '余额',
                  align:"center",
                  dataIndex: 'bldkye',
                },
                {
                  title: '户数',
                  align:"center",
                  dataIndex: 'bldkhs',
                },
                {
                  title: '占比',
                  align:"center",
                  dataIndex: 'bnblyezb',
                },
              ]
            },
            {
              title:'表外不良贷款 ',
              children:[
                {
                  title: '余额',
                  align:"center",
                  dataIndex: 'bwbldkye',
                },
                {
                  title: '户数',
                  align:"center",
                  dataIndex: 'bwbldkhs',
                },
                {
                  title: '占比',
                  align:"center",
                  dataIndex: 'bwblyezb',
                },
              ]
            },

          ],
        },
        sxyxTable : {
          columns: [
            {
              title: '统计日期',
              dataIndex: 'tjyf',
              key: 'tjyf',
              width: '10%',
              align: "center",
            },

            {
              title:'走访 ',
              children:[
                {
                  title: '本月户数',
                  align:"center",
                  dataIndex: 'byzfhs',
                },
                {
                  title: '累计户数',
                  align:"center",
                  dataIndex: 'ljzfhs',
                },
              ]
            },
            {
              title:'评级 ',
              children:[
                {
                  title: '本月户数',
                  align:"center",
                  dataIndex: 'bypjhs',
                },
                {
                  title: '累计户数',
                  align:"center",
                  dataIndex: 'ljpjhs',
                },
              ]
            },
            {
              title:'建档 ',
              children:[
                {
                  title: '本月户数',
                  align:"center",
                  dataIndex: 'byjdrs',
                },
                {
                  title: '累计户数',
                  align:"center",
                  dataIndex: 'ljjdrs',
                },
              ]
            },
            {
              title:'授信 ',
              children:[
                {
                  title: '本月户数',
                  align:"center",
                  dataIndex: 'bysxkhs',
                },
                {
                  title: '累计户数',
                  align:"center",
                  dataIndex: 'ljsykhs',
                },
                {
                  title: '本月金额',
                  align:"center",
                  dataIndex: 'bysxje',
                },
                {
                  title: '累计金额',
                  align:"center",
                  dataIndex: 'ljsxje',
                },
              ]
            },
            {
              title:'用信 ',
              children:[
                {
                  title: '本月户数',
                  align:"center",
                  dataIndex: 'byyxkhs',
                },
                {
                  title: '累计户数',
                  align:"center",
                  dataIndex: 'ljyxkhs',
                },
                {
                  title: '本月金额',
                  align:"center",
                  dataIndex: 'byyxje',
                },
                {
                  title: '累计金额',
                  align:"center",
                  dataIndex: 'ljyxje',
                },
              ]
            },
          ],
        },
        //电子银行业务情况
        dzyhywqkTable : {
          columns: [
            {
              title: '统计日期',
              dataIndex: 'tjyf',
              key: 'tjyf',
              width: '10%',
              align: "center",
            },
            {
              title: '手机银行户数',
              dataIndex: 'sjyhhs',
              key: 'sjyhhs',
              width: '10%',
              align: "center",
            },
            {
              title: '网上银行户数',
              dataIndex: 'wsyhhs',
              key: 'wsyhhs',
              width: '10%',
              align: "center",
            },
            {
              title: '社保卡（张）',
              dataIndex: 'sbkhs',
              key: 'sbkhs',
              width: '20%',
              align: "center",
            },
            {
              title: 'ETC（个）',
              dataIndex: 'etchs',
              key: 'etchs',
              width: '10%',
              align: "center",
            },
            {
              title: '信用卡（张）',
              dataIndex: 'xykhs',
              key: 'xykhs',
              width: '10%',
              align: "center",
            },
            {
              title: '福民卡（张）',
              dataIndex: 'fmkhs',
              key: 'fmkhs',
              width: '10%',
              align: "center",
            },
            {
              title: '扫码付（个）',
              dataIndex: 'smfhs',
              key: 'smfhs',
              width: '10%',
              align: "center",
            },
            {
              title: 'POS机（个）',
              dataIndex: 'posjhs',
              key: 'posjhs',
              width: '10%',
              align: "center",
            },
          ],
        },
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        tjyf:{rules: [{ required: true, message: '请输入统计月份!' }]},
        dybh:{rules: [{ required: true, message: '请输入营销单元编号!' }]},
        },
        url: {
          add: "/tjfxyxdytj/yxdytj/add",
          edit: "/tjfxyxdytj/yxdytj/edit",
        },
      }
    },
    created () {
    },
    methods: {
      routerIndex(ktyw,khlx,khjb){
        this.$router.push({path: '/tjfx/yxdytjmx/TjfxYxdytjmxList', query: {yxktyw: ktyw,yxkhlx:khlx,yxkhjb:khjb}})
        // this.$refs.sxyk.blur();
      },
    /* sjyh(){
        this.$router.push({path: '/tjfx/yxdytjmx/TjfxYxdytjmxList', query: {ktyw: '1'}})
        // this.$refs.sxyk.blur();
      },
      setc(){
        this.$router.push({path: '/tjfx/yxdytjmx/TjfxYxdytjmxList', query: {ktyw: '2'}})
        // this.$refs.sxyk.blur();
      },
      sxyk(){
        this.$router.push({path: '/tjfx/yxdytjmx/TjfxYxdytjmxList', query: {ktyw: '4'}})
        // this.$refs.sxyk.blur();
      },
      qzkh(){
        this.$router.push({path: '/tjfx/yxdytjmx/TjfxYxdytjmxList', query: {yxkhjb: '1'}})
      },
      ptkh(){
        this.$router.push({path: '/tjfx/yxdytjmx/TjfxYxdytjmxList', query: {yxkhjb: '2'}})
      },
      hxkh(){
        this.$router.push({path: '/tjfx/yxdytjmx/TjfxYxdytjmxList', query: {yxkhjb: '3'}})
      },
      gdkh(){
        this.$router.push({path: '/tjfx/yxdytjmx/TjfxYxdytjmxList', query: {yxkhjb: '4'}})
      },*/
      add () {
        this.edit({});
      },
      edit (record) {
        this.khywxx=[];
        this.form.resetFields();
       this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'ptkhs','hxkhs','gdkhs','ckyezb','dkyezb','bnblyezb','bwblyezb','ffjzrs','zdjbrs','ckye','ckhs','dkye','ckje','dkhs','bldkye','bldkhs','bwbldkhs','bwbldkye','sjyhhs','etchs','wsyhhs','fmkhs','sbkhs','xykhs','posjhs','smfhs','qzkhs','xdrys','pkhhs','dbhhs','dybh','dymc','dyxz','zzbz','khjlbz','zhs','byzfhs','ljzfhs','bypjhs','ljpjhs','byjdrs','ljjdrs','bysxkhs','ljsykhs','byyxkhs','ljyxkhs','bysxje','ljsxje','byyxje','ljyxje','sxhs','ysxhs','yxhs'))
		  //时间格式化
          this.form.setFieldsValue({tjyf:this.model.tjyf?moment(this.model.tjyf):null})
        });


        // 加载业务信息数据
        if (record.zzbz) {
          let params = {"zzbz":record.zzbz,"dybh": record.dybh}
          putAction("/tjfxyxdytj/yxdytj/khywxx", params).then(res => {
            if(res.success) {
              this.khywxx.push(res.result)  ;
              console.log("---业务信息-----")
              console.log(this.khywxx)
              this.model = Object.assign(this.model, this.khywxx[0]);
              this.form.setFieldsValue(pick(res.result,'ptkhs','hxkhs','gdkhs','ckyezb','dkyezb','bnblyezb','bwblyezb','ffjzrs','zdjbrs','ckye','ckhs','dkye','ckje','dkhs','bldkye','bldkhs','bwbldkhs','bwbldkye','sjyhhs','etchs','wsyhhs','fmkhs','sbkhs','xykhs','posjhs','smfhs','qzkhs','xdrys','pkhhs','dbhhs','dybh','dymc','dyxz','zzbz','khjlbz','zhs','byzfhs','ljzfhs','bypjhs','ljpjhs','byjdrs','ljjdrs','bysxkhs','ljsykhs','byyxkhs','ljyxkhs','bysxje','ljsxje','byyxje','ljyxje','sxhs','ysxhs','yxhs'))
              //时间格式化
              this.form.setFieldsValue({tjyf:res.result.tjyf?moment(res.result.tjyf):null})
            }
          });
        }
      },
      close () {
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
            formData.tjyf = formData.tjyf?formData.tjyf.format():null;
            
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


    }
  }
</script>

<style lang="less" scoped>

</style>