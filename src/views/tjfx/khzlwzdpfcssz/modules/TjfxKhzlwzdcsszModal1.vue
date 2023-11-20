<template>
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
    <a-button @click='addNewList' type="danger">新增</a-button>
    <a-button  v-on:click='reduceList' type="danger">删除</a-button>
      <!--<a-button @click="addNewList" icon="plus"></a-button>&nbsp;
      <a-button v-on:click='lists.splice(index, 1)' icon="minus"></a-button>-->
      <a-form :form="form">
        <li v-for='(list,index) in lists' v-bind:key='list.id'>
          <a-row :gutter="24">

            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="客户类型">
                <j-dict-select-tag    placeholder="请选择客户类型"  :triggerChange="true" v-model="khlx" :disabled="true" dict-code="khlx"/>
              </a-form-item>
            </a-col>

            <!--<a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="客户类型">
                <j-dict-select-tag   @change="SelectkhlxChange" placeholder="请选择客户类型"  :triggerChange="true" v-decorator="['khlx'+index,{}]" dict-code="khlx"/>
              </a-form-item>
            </a-col>-->


            <a-col :lg="8">
              <a-form-item
                v-if="khlx==1"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="字段名称">
                <a-select
                  :allowClear="true"
                  style="width: 100%"
                  @change="SelectChange"
                  placeholder="请选择"
                  id="noticeType"

                >
                  <a-select-option v-for="(item,index2) in zdmc" :key= "item.COMMENTS+index+item.COLUMN_NAME"
                  >{{ item.COMMENTS }}
                  </a-select-option
                  >
                </a-select>
              </a-form-item>

              <a-form-item
                v-if="khlx==2"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="字段名称">
                <a-select
                  style="width: 100%"
                  @change="SelectChange"
                  placeholder="请选择"
                >
                  <a-select-option v-for="(item,index2) in shzdmc" :key= "item.COMMENTS+index+item.COLUMN_NAME"
                  >{{ item.COMMENTS }}
                  </a-select-option
                  >
                </a-select>
              </a-form-item>

              <a-form-item
                v-if="khlx==3"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="字段名称">
                <a-select
                  style="width: 100%"
                  @change="SelectChange"
                  placeholder="请选择"
                >
                  <a-select-option v-for="(item,index2) in cqjmzdmc" :key= "item.COMMENTS+index+item.COLUMN_NAME"
                  >{{ item.COMMENTS }}
                  </a-select-option
                  >
                </a-select>
              </a-form-item>

            </a-col>

            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="分值">
                <a-input placeholder="请输入分值"   v-model="codes[index]" >
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </li>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction,getAction,putAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import ACol from "ant-design-vue/es/grid/Col";
  export default {
    components: {ACol},
    questions : [],
    dataSource : [],
    name: "TjfxKhzlwzdcsszModal",
    data () {
      return {
        lists:[
          {id:1,title:''},
        ],
        sysNotice: {
          noticeId: 0,
          status:0,
          noticeType: ''  //默认未空,则选择框会自动默认为请选择
        },
        codes:[],
        zdmcFlag:"",
        zdmc:[],
        shzdmc:[],
        cqjmzdmc:[],
        zdmcValue:[],
        khlxValue:[],
        khlx:" ",
        reduceFlag:0,
        nextTodoId: 4,
        title:"操作",
        visible: false,
        xzIndex:0,
        model: {

        },
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 21 },
          sm: { span: 15 },
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        },
        url: {
          add: "/tjfx.khzlwzdpfcssz/tjfxKhzlwzdcssz/add",
          edit: "/tjfx.khzlwzdpfcssz/tjfxKhzlwzdcssz/edit",
          queryTable: "/tjfx.khzlwzdpfcssz/tjfxKhzlwzdcssz/querytable",
          queryshTable: "/tjfx.khzlwzdpfcssz/tjfxKhzlwzdcssz/queryshtable",
          querycqjmTable: "/tjfx.khzlwzdpfcssz/tjfxKhzlwzdcssz/querycqjmtable",


        },
      }
    },
    created () {
    },
    methods: {
      add () {
        this.xzIndex=0;
        this.lists=[{}];
        this.zdmcFlag="";
        this.codes=[];
        this.zdmc=[],
        this.shzdmc=[],
        this.cqjmzdmc=[],
        this.zdmcValue=[];
        this.khlxValue=[];
        this.khlx = " ";
        this.edit({});

        // 加载子表数据
        let params = {}
          /*let params = {csbm: this.model.csbm}*/
        getAction(this.url.queryTable,params).then((res) => {
            console.info(res)
            this.zdmc = res;
        });
        getAction(this.url.queryshTable,params).then((res) => {
          console.info(res)
          this.shzdmc = res;
        });

        getAction(this.url.querycqjmTable,params).then((res) => {
          console.info(res)
          this.cqjmzdmc = res;
        });

        },

      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'csbm','csm','fz'))
		  //时间格式化
        });

      },
      close () {
        this.reloadFlag = false
        let ToggleMultipage = "ToggleMultipage"
        this.$store.dispatch(ToggleMultipage,false)
        this.$nextTick(()=>{
          this.$store.dispatch(ToggleMultipage,true)
          this.reloadFlag = true
        })
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
            if(!this.model.csbm){
              let f = length => Array.from({length}).map((v, k) => k)
              putAction("/tjfx.khzlwzdpfcssz/tjfxKhzlwzdcssz/add",{"xzIndex":this.xzIndex,"zdList":this.zdmcValue,"ArrayIndex":f(this.xzIndex+1),"fzList":this.codes,"khlx":this.khlx}).then((res) => {
                if(res.success){
                  that.$emit('ok');
                  that.confirmLoading = false;
                  that.close();
                }
              })
            }else{
              httpurl+=this.url.edit;
               method = 'put';

            let formData = Object.assign(this.model, values);

            //时间格式化
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
            })   }
          }
        })
      },
      handleCancel () {
        this.close()
      },
      addNewList:function(){
        this.lists.push({
          id:this.nextTodoId++,
          title:this.newAddText
        })
        this.xzIndex=this.xzIndex+1;
      },
      reduceList:function(){
        this.lists.splice(this.xzIndex,1)
        this.zdmcValue.splice(this.xzIndex,1)
        this.codes.splice(this.xzIndex,1)
        this.xzIndex=this.xzIndex-1;
      },
      SelectChange(value) {
        this.zdmcValue.push(`${value}`)
        console.log(this.zdmcValue);

        // alert(`${value}`);
  },
      /*SelectkhlxChange(value){
        alert(value)
        this.khlx=value
        this.khlxValue.push(`${value}`)
        console.log(this.khlxValue);
      }*/
  }
  }
</script>

<style lang="less" scoped>

</style>