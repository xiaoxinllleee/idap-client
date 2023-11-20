<template>
  <div class="main">
    <a-form :form="form" class="user-layout-login" ref="formLogin" id="formLogin">

      <a-form-item>
        <a-input
          size="large"
          v-decorator="['username',validatorRules.username,{ validator: this.handleUsernameOrEmail }]"
          type="text"
          placeholder="请输入用户名" allow-clear>
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input-password
          v-decorator="['password',validatorRules.password]"
          size="large"
          type="password"
          autocomplete="false"
          placeholder="请输入密码">
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input-password>
      </a-form-item>


      <a-form-item>
        <!--<a-checkbox v-decorator="['rememberMe', {initialValue: true, valuePropName: 'checked'}]" >记住我</a-checkbox>
        <router-link :to="{ name: 'alteration'}" class="forge-password" style="float: right;">
          忘记密码
        </router-link>
        <router-link :to="{ name: 'register'}" class="forge-password" style="float: right;margin-right: 10px" >
          注册账户
        </router-link>-->
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="loginBtn"
          @click.stop.prevent="handleSubmit"
          :disabled="loginBtn">登录
        </a-button>
      </a-form-item>

      <!-- <div class="user-login-other">
        <span>其他登陆方式</span>
        <a><a-icon class="item-icon" type="alipay-circle"></a-icon></a>
        <a><a-icon class="item-icon" type="taobao-circle"></a-icon></a>
        <a><a-icon class="item-icon" type="weibo-circle"></a-icon></a>
        <router-link class="register" :to="{ name: 'register' }">
          注册账户
        </router-link>
      </div>-->
    </a-form>

    <two-step-captcha
      v-if="requiredTwoStepCaptcha"
      :visible="stepCaptchaVisible"
      @success="stepCaptchaSuccess"
      @cancel="stepCaptchaCancel"></two-step-captcha>

    <a-modal
      title="登录部门选择"
      :width="450"
      :visible="departVisible"
      :closable="false"
      :maskClosable="false">

      <template slot="footer">
        <a-button type="primary" @click="departOk">确认</a-button>
      </template>

      <a-form>
        <a-form-item
          :labelCol="{span:4}"
          :wrapperCol="{span:20}"
          style="margin-bottom:10px"
          :validate-status="validate_status">
          <a-tooltip placement="topLeft" >
            <template slot="title">
              <span>您隶属于多部门，请选择登录部门</span>
            </template>
            <a-avatar style="backgroundColor:#87d068" icon="gold" />
          </a-tooltip>
          <a-select @change="departChange" :class="{'valid-error':validate_status=='error'}" placeholder="请选择登录部门" style="margin-left:10px;width: 80%">
            <a-icon slot="suffixIcon" type="gold" />
            <a-select-option
              v-for="d in departList"
              :key="d.zzbz"
              :value="d.zzbz">
              {{ d.zzjc }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>



    </a-modal>
    <user-password :validatePassWordValue='validatePassWordValue' :validatePasswordMessage='validatePasswordMessage' ref="userPassword"></user-password>
  </div>
</template>

<script>
  import md5 from "md5"
  import api from '@/api'
  import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
  import { mapActions, mapGetters } from 'vuex'
  import { timeFix } from "@/utils/util"
  import Vue from 'vue'
  import { ACCESS_TOKEN ,ENCRYPTED_STRING,QYBM} from "@/store/mutation-types"
  import JGraphicCode from '@/components/jeecg/JGraphicCode'
  import { putAction } from '@/api/manage'
  import { postAction } from '@/api/manage'
  import { encryption , getEncryptedString } from '@/utils/encryption/aesEncrypt'
  import store from '@/store/'
  import router from '@/router'
  import { USER_INFO,IS_ROOT, SUB_SYSTEM_LIST } from "@/store/mutation-types"
  import Cookies from "js-cookie"
  import { encryptedData, decryptedData } from '@/utils/jsencrypt'
  import { generateIndexRouter } from "@/utils/util"
  import UserPassword from '@comp/tools/UserPassword'

  export default {
    components: {
      TwoStepCaptcha,
      JGraphicCode,
      UserPassword
    },
    data () {
      return {
        validatePassWordValue:'',
        validatePasswordMessage:'',
        customActiveKey: "tab1",
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        requiredTwoStepCaptcha: false,
        stepCaptchaVisible: false,
        form: this.$form.createForm(this),
        encryptedString:{
          key:"",
          iv:"",
        },
        state: {
          time: 60,
          smsSendBtn: false,
        },
        validatorRules:{
          username:{rules: [{ required: true, message: '请输入用户名!',validator: 'click'}]},
          password:{rules: [{ required: true, message: this.validatePasswordMessage,validator: this.validatePassWord}]},
          mobile:{rules: [{validator:this.validateMobile}]},
          captcha:{rule: [{ required: true, message: '请输入验证码!'}]},
          inputCode:{rules: [{ required: true, message: '请输入验证码!'},{validator: this.validateInputCode}]}
        },
        verifiedCode:"",
        inputCodeContent:"",
        inputCodeNull:true,
        departList:[],
        departVisible:false,
        departSelected:"",
        currentUsername:"",
        validate_status:""
      }
    },
    created () {
      Vue.ls.remove(ACCESS_TOKEN)
      this.getRouterData();
      this.getCookie()
      this.getValidate()
      // update-begin- --- author:scott ------ date:20190805 ---- for:密码加密逻辑暂时注释掉，有点问题
      //this.getEncrypte();
      // update-end- --- author:scott ------ date:20190805 ---- for:密码加密逻辑暂时注释掉，有点问题
    },
    methods: {
      ...mapGetters(["nickname", "welcome", "orgCode","userInfo"]),
      ...mapActions([ "Login", "Logout","PhoneLogin", "GetUserSubSystemList","getPasswordValidateRules"]),
      // handler
      handleUsernameOrEmail (rule, value, callback) {
        const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        if (regex.test(value)) {
          this.loginType = 0
        } else {
          this.loginType = 1
        }
        callback()
      },
      getValidate()
      {

        let that=this;
        that.getPasswordValidateRules().then((res)=>{
          this.validatePassWordValue=res.result.validateRule
          this.validatePasswordMessage=res.result.validatePasswordMessage
        }).catch((error)=>{
            that.requestFailed(error);
          }
        )
      },
      handleTabClick (key) {
        this.customActiveKey = key
        // this.form.resetFields()
      },
      getCookie() {
        const username = Cookies.get("idap_username");
        const password = Cookies.get("idap_password");
        const rememberMe = Cookies.get('idap_rememberMe')
        this.$nextTick(() => {
          this.form.setFieldsValue({
            username: username === undefined ? this.form.getFieldValue('username') : username,
            password: password === undefined ? this.form.getFieldValue('password') : decryptedData(password),
            rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
          })
        });

      },
      handleSubmit () {
        let that = this
        let loginParams = {};
        that.loginBtn = true;
        // 使用账户密码登陆
        if (that.customActiveKey === 'tab1') {
          that.form.validateFields([ 'username', 'password', 'inputCode', 'rememberMe' ], { force: true }, (err, values) => {
            if (!err) {
              if (values.rememberMe) {
                Cookies.set("idap_username", values.username, { expires: 30 });
                Cookies.set("idap_password", encryptedData(values.password), { expires: 30 });
                Cookies.set('idap_rememberMe', values.rememberMe, { expires: 30 });
              } else {
                Cookies.remove("idap_username");
                Cookies.remove("idap_password");
                Cookies.remove('idap_rememberMe');
              }
              loginParams.username = values.username
              // update-begin- --- author:scott ------ date:20190805 ---- for:密码加密逻辑暂时注释掉，有点问题
              loginParams.password = md5(values.password)
              //loginParams.password = encryption(values.password,that.encryptedString.key,that.encryptedString.iv)
              // loginParams.password = values.password
              loginParams.remember_me = values.rememberMe
              // update-begin- --- author:scott ------ date:20190805 ---- for:密码加密逻辑暂时注释掉，有点问题
              //验证码
              // let checkParams = this.$refs.jgraphicCodeRef.getLoginParam()
              // loginParams.captcha = checkParams.checkCode
              // loginParams.checkKey = checkParams.checkKey
              that.Login(loginParams).then((res) => {
                this.departConfirm(res);
                console.log(res)
                sessionStorage.setItem("qybm", res.result.qybm)
                sessionStorage.setItem("zdrkrq", res.result.zdrkrq)
                // this.getinfo();
              }).catch((err) => {
                that.requestFailed(err);
                console.log(err, 'err')
                sessionStorage.setItem("username", loginParams.username)
                if (err.message == '请修改密码') {
                  let username = loginParams.username
                  this.resetPassword(username)
                }else if(err.message=='已超过六个月没修改密码,请修改密码') {
                  let username = loginParams.username
                  this.resetPassword(username)
                }
              })
            } else {
              that.loginBtn = false;
            }
          })
          // 使用手机号登陆
        } else {
          that.form.validateFields([ 'mobile', 'captcha', 'rememberMe' ], { force: true }, (err, values) => {
            if (!err) {
              loginParams.mobile = values.mobile
              loginParams.captcha = values.captcha
              loginParams.remember_me = values.rememberMe
              that.PhoneLogin(loginParams).then((res) => {
                console.log(res.result);
                this.departConfirm(res)
              }).catch((err) => {
                that.requestFailed(err);
              })

            }
          })
        }
      },
      resetPassword(username){

        console.log(username,'username-----------')
        this.$refs.userPassword.init(username)
      },
      getCaptcha (e) {
        e.preventDefault();
        let that = this;
        this.form.validateFields([ 'mobile' ], { force: true },(err,values) => {
            if(!values.mobile){
              that.cmsFailed("请输入手机号");
            }else if (!err) {
              this.state.smsSendBtn = true;
              let interval = window.setInterval(() => {
                if (that.state.time-- <= 0) {
                  that.state.time = 60;
                  that.state.smsSendBtn = false;
                  window.clearInterval(interval);
                }
              }, 1000);

              const hide = this.$message.loading('验证码发送中..', 0);
              let smsParams = {};
              smsParams.mobile=values.mobile;
              smsParams.smsmode="0";
              postAction("/sys/sms",smsParams)
                .then(res => {
                  if(!res.success){
                    setTimeout(hide, 0);
                    this.cmsFailed(res.message);
                  }
                  console.log(res);
                  setTimeout(hide, 500);
                })
                .catch(err => {
                  setTimeout(hide, 1);
                  clearInterval(interval);
                  that.state.time = 60;
                  that.state.smsSendBtn = false;
                  this.requestFailed(err);
                });
            }
          }
        );
      },
      stepCaptchaSuccess () {
        this.loginSuccess()
      },
      stepCaptchaCancel () {
        this.Logout().then(() => {
          this.loginBtn = false
          this.stepCaptchaVisible = false
        })
      },
      loginSuccess () {
        // update-begin- author:sunjianlei --- date:20190812 --- for: 登录成功后不解除禁用按钮，防止多次点击
        // this.loginBtn = false
        // update-end- author:sunjianlei --- date:20190812 --- for: 登录成功后不解除禁用按钮，防止多次点击
        //获取用户子系统
        let _that = this
        this.GetUserSubSystemList().then((res) => {
          _that.loginBtn = false;
          let sysList= Vue.ls.get(SUB_SYSTEM_LIST);
          if(!sysList || sysList.length === 0) {
            this.$notification.error({
              message: '登录失败',
              description: `您的账号还未被授予任何菜单权限，请先联系管理员进行授权`,
              duration:3
            });
          } else {
            _that.$router.push({ name: "dashboard" })
            _that.$notification.success({
              message: `欢迎，${_that.nickname()} `,
              description: `${timeFix()}，欢迎回来`,
            });

            //初始化将所有菜单加载到router中，解决跨系统不能跳转菜单的问题
            let subSystemList = sysList.map(item=>item.id).join(',')
            store.dispatch('getAllPermissionList', {subSystemList: subSystemList}).then(res => {
              const menuData = res.result.menu;
              console.log(res.message)
              if (menuData === null || menuData === "" || menuData === undefined) {
                return;
              }
              let constRoutes = [];
              constRoutes = generateIndexRouter(menuData);
              // 添加主界面路由
              store.dispatch('UpdateAppRouter',  { constRoutes }).then(() => {
                // 根据roles权限生成可访问的路由表
                // 动态添加可访问路由表
                router.addRoutes(store.getters.addRouters)
              })
            })
          }
        })
      },
      cmsFailed(err){
        this.$notification[ 'error' ]({
          message: "登录失败",
          description:err,
          duration: 4,
        });
      },
      requestFailed (err) {
        this.$notification[ 'error' ]({
          message: '登录失败',
          description: ((err.response || {}).data || {}).message || err.message || "请求出现错误，请稍后再试",
          duration: 4,
        });
        this.loginBtn = false;
      },
      validateMobile(rule,value,callback){
        if (!value || new RegExp(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/).test(value)){
          callback();
        }else{
          callback("您的手机号码格式不正确!");
        }

      },
      validatePassWord(rule,value,callback){
        if(this.validatePassWordValue=='')
        {
          return 'click';
        }
        if (!value || new RegExp(this.validatePassWordValue).test(value)){
          callback();
        }else{
          callback(this.validatePasswordMessage);
        }

      },
      validateInputCode(rule,value,callback){
        if(!value || this.verifiedCode==this.inputCodeContent){
          callback();
        }else{
          callback("您输入的验证码不正确!");
        }
      },
      generateCode(value){
        this.verifiedCode = value.toLowerCase()
      },
      inputCodeChange(e){
        this.inputCodeContent = e.target.value
        if(!e.target.value||0==e.target.value){
          this.inputCodeNull=true
        }else{
          this.inputCodeContent = this.inputCodeContent.toLowerCase()
          this.inputCodeNull=false
        }
      },
      departConfirm(res){
        if(res.success){
          let multi_depart = res.result.multi_depart
          //0:无部门 1:一个部门 2:多个部门
          if(multi_depart==0){
            this.loginSuccess()
            this.$notification.warn({
              message: '提示',
              description: `您尚未归属部门,请确认账号信息`,
              duration:3
            });
          }else if(multi_depart==2){
            // this.departVisible=true
            // this.currentUsername=this.form.getFieldValue("username")
            // this.departList = res.result.departs
            this.loginSuccess()
          }else {
            this.loginSuccess()
          }
        }else{
          this.requestFailed(res)
          this.Logout();
        }
      },
      departOk(){
        if(!this.departSelected){
          this.validate_status='error'
          return false
        }
        let obj = {
          orgCode:this.departSelected,
          username:this.form.getFieldValue("username")
        }
        putAction("/sys/selectDepart",obj).then(res=>{
          if(res.success){
            const userInfo = res.result.userInfo;
            Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000);
            Vue.ls.set(IS_ROOT, res.result.isRoot, 7 * 24 * 60 * 60 * 1000)
            store.commit('SET_INFO', userInfo);
            store.commit('SET_ISROOT', res.result.isRoot);
            //console.log("---切换组织机构---userInfo-------",store.getters.userInfo.orgCode);
            this.departClear()
            this.loginSuccess()
          }else{
            this.requestFailed(res)
            this.Logout().then(()=>{
              this.departClear()
            });
          }
        })

      },
      getinfo(){
        putAction("/userinfo/yxdyqx",{});
      },
      departClear(){
        this.departList=[]
        this.departSelected=""
        this.currentUsername=""
        this.departVisible=false
        this.validate_status=''
      },
      departChange(value){
        this.validate_status='success'
        this.departSelected = value
      },
      getRouterData(){
        this.$nextTick(() => {
          this.form.setFieldsValue({
            'username': this.$route.params.username
          });
        })
      },
      //获取密码加密规则
      getEncrypte(){
        var encryptedString = Vue.ls.get(ENCRYPTED_STRING);
        if(encryptedString == null){
          getEncryptedString().then((data) => {
            this.encryptedString = data
          });
        }else{
          this.encryptedString = encryptedString;
        }
      },
    }
  }
</script>

<style lang="less" scoped>

  .user-layout-login {
    label {
      font-size: 14px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .forge-password {
      font-size: 14px;
    }

    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;
    }

    .user-login-other {
      text-align: left;
      margin-top: 24px;
      line-height: 22px;

      .item-icon {
        font-size: 24px;
        color: rgba(0,0,0,.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color .3s;

        &:hover {
          color: #1890ff;
        }
      }

      .register {
        float: right;
      }
    }
  }

</style>
<style>
  .valid-error .ant-select-selection__placeholder{
    color: #f5222d;
  }
</style>