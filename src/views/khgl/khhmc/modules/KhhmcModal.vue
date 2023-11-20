<template>
  <a-modal :title="title"
           :width="1200"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleOk"
           @cancel="handleCancel"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-row :gutter="16">
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="所属支行">
              <j-tree-select
                v-decorator="['sszh',{rules: [{ required: true, message: '请选择机构!' }]}]"
                placeholder="请选择机构"
                dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ"
                pidField="sjzzbz"
                :treeDefaultExpandAll=true
              >
              </j-tree-select>
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="所属乡镇">
              <a-select placeholder="请选择所属乡镇"  style="width: 220px" @change="ssxzChange"  v-decorator="['ssxz', {}]">
                <a-select-option
                  v-for="item in yjxydyOptions"
                  :value="item.value">
                  {{item.label}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="村委/社区">
              <a-select placeholder="请选择村委/社区"  style="width: 220px" @change="xzcChange"  v-decorator="['xzc', {}]">
                <a-select-option
                  v-for="item in ejxydyOptions"
                  :value="item.value">
                  {{item.label}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :lg="8" v-if="sfktsjyxdy == '1'">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="村组/片区">
              <a-select placeholder="请选择村组/片区"  style="width: 220px" :required="true"  v-decorator="['xzz', {}]">
                <a-select-option
                  v-for="item in sjxydyOptions"
                  :value="item.value">
                  {{item.label}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!--<a-col :lg="8">-->
            <!--<a-form-item-->
              <!--:labelCol="labelCol"-->
              <!--:wrapperCol="wrapperCol"-->
              <!--label="所属营销单元">-->
              <!--<j-dict-select-tag  v-decorator="['ssyxdy', {rules: [{ required: true, message: '请选择所属营销单元!' }]}]" :triggerChange="true" placeholder="请选择所属营销单元"-->
                                  <!--dictCode="v_yxdygl_czxxgl,VILLAGE,VILLAGE"/>-->
             <!--&lt;!&ndash; <j-dict-select-tag-->
                <!--v-model="queryParam.ssyxdy"-->
                <!--placeholder="请选择行政村查询"-->
                <!--dictCode="v_yxdygl_czxxgl,VILLAGE,VILLAGE"-->
                <!--:showSearch="true"-->
                <!--treeNodeFilterProp="title"-->
              <!--/>&ndash;&gt;-->
            <!--</a-form-item>-->
          <!--</a-col>-->
<!--          <a-col :lg="8">-->
<!--            <a-form-item-->
<!--              :labelCol="labelCol"-->
<!--              :wrapperCol="wrapperCol"-->
<!--              label="户号编码">-->
<!--              <a-input placeholder="请输入户号编码" v-decorator="['hhbm', {}]" />-->
<!--            </a-form-item>-->
<!--          </a-col>-->
        </a-row>

        <a-row :gutter="24">

          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="与户主关系">
              <j-dict-select-tag  v-decorator="['yhzgx', {}]" :triggerChange="true" placeholder="请选择与户主关系"
                                  dictCode="yhzgx"/>
            </a-form-item>
          </a-col>

          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否户主">
              <j-dict-select-tag  v-decorator="['sfhz', {}]" :triggerChange="true" placeholder="请选择是否户主"
                                  dictCode="sfbz"/>
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户名称">
              <a-input placeholder="请输入客户名称" v-decorator="['khmc', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="证件号码">
              <a-input placeholder="请输入证件号码" v-decorator="['zjhm', {}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="客户类型">
              <j-dict-select-tag  v-decorator="['khlx', {}]" :triggerChange="true" placeholder="请选择客户类型"
                                  dictCode="khlx"/>
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="性别">
              <j-dict-select-tag  v-decorator="['xb', {}]" :triggerChange="true" placeholder="请选择性别"
                                  dictCode="sex"/>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="年龄">
              <a-input placeholder="请输入年龄" v-decorator="['nl', {}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="联系方式">
              <a-input placeholder="请输入联系方式" v-decorator="['lxfs', {}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="地址">
              <a-input placeholder="请输入地址" v-decorator="['dz', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="民族">
              <j-dict-select-tag  v-decorator="['mz', {}]" :triggerChange="true" placeholder="请选择民族"
                                  dictCode="mz" />
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="婚姻状况">
              <j-dict-select-tag  v-decorator="['hyzk', {}]" :triggerChange="true" placeholder="请选择婚姻状况"
                                  dictCode="hyzk"/>
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="备注">
              <a-input placeholder="请输入备注" v-decorator="['bz', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="原所属乡镇">
              <a-input placeholder="请输入原所属乡镇" v-decorator="['yssxz', {}]" />
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="原行政村">
              <a-input placeholder="请输入原行政村" v-decorator="['yxzc', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <div v-show="disableSubmit">
          <a-list-item class="DefaultListItem" term="存贷款情况">存贷款情况</a-list-item>
          <a-divider style="margin-top: 5px; margin-bottom: 5px;"/>
          <a-row :gutter="24">
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="是否开通存款业务">
                <j-dict-select-tag  v-decorator="['sfktckyw', {}]" :triggerChange="true" placeholder="请选择是否开通存款业务"
                                    dictCode="sfbz"/>
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="存款余额">
                <a-input placeholder="请输入存款余额" v-decorator="['ckye', {}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="存款日平余额">
                <a-input placeholder="请输入存款日平余额" v-decorator="['ckrpye', {}]" />
              </a-form-item>
            </a-col>
          </a-row>
          <!--<a-row :gutter="24">-->
            <!--<a-col :lg="8">-->
              <!--<a-form-item-->
                <!--:labelCol="labelCol"-->
                <!--:wrapperCol="wrapperCol"-->
                <!--label="存款年日平余额">-->
                <!--<a-input placeholder="请输入存款年日平余额" v-decorator="['cknrpye', {}]" />-->
              <!--</a-form-item>-->
            <!--</a-col>-->
            <!--<a-col :lg="8">-->
              <!--<a-form-item-->
                <!--:labelCol="labelCol"-->
                <!--:wrapperCol="wrapperCol"-->
                <!--label="活期存款余额">-->
                <!--<a-input placeholder="请输入活期存款余额" v-decorator="['hqckye', {}]" />-->
              <!--</a-form-item>-->
            <!--</a-col>-->
            <!--<a-col :lg="8">-->
              <!--<a-form-item-->
                <!--:labelCol="labelCol"-->
                <!--:wrapperCol="wrapperCol"-->
                <!--label="定期存款余额">-->
                <!--<a-input placeholder="请输入定期存款余额" v-decorator="['dqckye', {}]" />-->
              <!--</a-form-item>-->
            <!--</a-col>-->
          <!--</a-row>-->
          <!--<a-row :gutter="24">-->
            <!--<a-col :lg="8">-->
              <!--<a-form-item-->
                <!--:labelCol="labelCol"-->
                <!--:wrapperCol="wrapperCol"-->
                <!--label="活期存款日平余额">-->
                <!--<a-input placeholder="请输入活期存款日平余额" v-decorator="['hqckrpye', {}]" />-->
              <!--</a-form-item>-->
            <!--</a-col>-->
            <!--<a-col :lg="8">-->
              <!--<a-form-item-->
                <!--:labelCol="labelCol"-->
                <!--:wrapperCol="wrapperCol"-->
                <!--label="定期存款日平余额">-->
                <!--<a-input placeholder="请输入定期存款日平余额" v-decorator="['dqckrpye', {}]" />-->
              <!--</a-form-item>-->
            <!--</a-col>-->
            <!--<a-col :lg="8">-->
              <!--<a-form-item-->
                <!--:labelCol="labelCol"-->
                <!--:wrapperCol="wrapperCol"-->
                <!--label="活期存款年日平余额">-->
                <!--<a-input placeholder="请输入活期存款年日平余额" v-decorator="['hqcknrpye', {}]" />-->
              <!--</a-form-item>-->
            <!--</a-col>-->
          <!--</a-row>-->
          <a-row :gutter="24">
            <!--<a-col :lg="8">-->
              <!--<a-form-item-->
                <!--:labelCol="labelCol"-->
                <!--:wrapperCol="wrapperCol"-->
                <!--label="定期存款年日平余额">-->
                <!--<a-input placeholder="请输入定期存款年日平余额" v-decorator="['dqcknrpye', {}]" />-->
              <!--</a-form-item>-->
            <!--</a-col>-->
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="是否开通贷款业务">
                <j-dict-select-tag  v-decorator="['sfktdkyw', {}]" :triggerChange="true" placeholder="请选择是否开通贷款业务"
                                    dictCode="sfbz"/>
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="贷款金额">
                <a-input placeholder="请输入贷款金额" v-decorator="['dkje', {}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="贷款余额">
                <a-input placeholder="请输入贷款余额" v-decorator="['dkye', {}]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <!--<a-col :lg="8">-->
              <!--<a-form-item-->
                <!--:labelCol="labelCol"-->
                <!--:wrapperCol="wrapperCol"-->
                <!--label="最近贷款到期日期">-->
                <!--<a-date-picker v-decorator="[ 'zjdkdqrq', {}]" />-->
              <!--</a-form-item>-->
            <!--</a-col>-->
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="不良贷款余额">
                <a-input placeholder="请输入不良贷款余额" v-decorator="['bldkye', {}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="表外不良贷款余额">
                <a-input placeholder="请输入表外不良贷款余额" v-decorator="['bwbldkye', {}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="是否开通手机银行">
                <j-dict-select-tag  v-decorator="['sfktsjyhyw', {}]" :triggerChange="true" placeholder="请选择是否开通手机银行"
                                    dictCode="sfbz"/>
              </a-form-item>
            </a-col>
          </a-row>
          <!--<a-row :gutter="24">-->
            <!--<a-col :lg="8">-->
              <!--<a-form-item-->
                <!--:labelCol="labelCol"-->
                <!--:wrapperCol="wrapperCol"-->
                <!--label="是否开通网上银行业务">-->
                <!--<a-input placeholder="请输入是否开通网上银行业务" v-decorator="['sfktwsyhyw', {}]" />-->
              <!--</a-form-item>-->
            <!--</a-col>-->
          <!--</a-row>-->
          <a-row :gutter="24">
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="是否办理ETC">
                <j-dict-select-tag  v-decorator="['sfbletcyw', {}]" :triggerChange="true" placeholder="请选择是否办理ETC"
                                    dictCode="sfbz"/>
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="是否开通社保卡">
                <j-dict-select-tag  v-decorator="['sfktsbk', {}]" :triggerChange="true" placeholder="请选择是否开通社保卡"
                                    dictCode="sfbz"/>
              </a-form-item>
            </a-col>
            <a-col :lg="8">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="是否领取社保卡">
                <j-dict-select-tag  v-decorator="['sflqsbk', {}]" :triggerChange="true" placeholder="请选择是否领取社保卡"
                                    dictCode="khgl_sbklqzt"/>
              </a-form-item>
            </a-col>
          </a-row>
        </div>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction, putAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import JDate from '@/components/jeecg/JDate'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { getYjyxdyOption, getEjyxdyOption, getSjyxdyOption,getHhbmOption} from '@/api/area'

  export default {
    name: "KhhmcModal",
    components: {
      JDate,JTreeSelect
    },
    data () {
      return {
        title:"操作",
        visible: false,
        disableSubmit: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        },
        url: {
          add: "/khgl/khhmc/add",
          edit: "/khgl/khhmc/edit",
        },
        yjxydyOptions: [{value:'', label: '请选择'}],
        ejxydyOptions: [{value:'', label: '请选择'}],
        sjxydyOptions: [{value:'', label: '请选择'}],
        sfktsjyxdy: 1,
      }
    },
    created () {
      this.querycsz()
    },
    methods: {
      //查询是否显示三级营销单元字段1：是 2：否
      querycsz(){
        let params = { "csbm":"CS0004"}
        putAction("/yxdygl/yxdyglPqzrrgl/querycsz", params).then(res => {
          this.sfktsjyxdy =res.result.csz
        });
      },
      add () {
        this.edit({});
      },
      edit (record) {
        console.log('record', record)
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.yjxydyOptions = [{value:'', label: '请选择'}]
        //获取一级营销单元下拉列表数据
        getYjyxdyOption().then(response => {
          console.log(response)
          let list = response.result
          list.forEach(item => {
            this.yjxydyOptions.push({
              value: item.dybh,
              label: item.dymc
            })
          })
          console.log(this.yjxydyOptions)
          let _that = this
        })
        if (record.ssxz) {
          this.getEjyxdyOption(record.ssxz)
        }
        if (record.ssxz && record.xzc && this.sfktsjyxdy == '1') {
          this.getSjyxdyOption(record.ssxz, record.xzc)
        }
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'sszh','ssxz','xzc','hhbm','yhzgx','sfhz','khmc','zjhm','khlx','xb','nl','lxfs','dz','mz','hyzk','bz','yssxz','yxzc',
            'sfktckyw','ckye','ckrpye','sfktdkyw','dkje','dkye','bldkye','bwbldkye','sfktsjyhyw','sfbletcyw','sflqsbk','sfktsbk'
          ))
          if (this.sfktsjyxdy == '1') {
            this.form.setFieldsValue(pick(this.model, 'xzz'))
          }
        });
      },
      getEjyxdyOption(value) {
        getEjyxdyOption({'yjyxdybh': value}).then(response => {
          console.log(response)
          let list = response.result
          list.forEach(item => {
            this.ejxydyOptions.push({
              value: item.dybh,
              label: item.dymc,
              sszh: item.sszh,
              zzjc: item.sszh_dictText
            })
          })
          console.log(this.ejxydyOptions)
        })
      },
      getSjyxdyOption(ssxz, xzc) {
        getSjyxdyOption({'yjyxdybh': ssxz, 'ejyxdybh': xzc}).then(response => {
          console.log(response)
          let list = response.result
          list.forEach(item => {
            this.sjxydyOptions.push({
              value: item.dybh,
              label: item.dymc,
              sszh: item.sszh,
              zzjc: item.sszh_dictText
            })
          })
          console.log(this.sjxydyOptions)
        })
      },
      ssxzChange(value) {
        console.log('ssxzChange')
        console.log(value)
        //先清空下级的数据
        this.ejxydyOptions = [{value:'', label: '请选择'}]
        this.sjxydyOptions = [{value:'', label: '请选择'}]
        this.form.setFieldsValue({xzc: ''})
        if (this.sfktsjyxdy == '1') {
          this.form.setFieldsValue({xzz: ''})
        }
        if(!value) return false
        this.getEjyxdyOption(value)
      },
      xzcChange(value) {
        console.log('xzcChange')
        console.log(value)
        //this.HzxxformInline.hhbm = obj.value + this.hhbm
        //先清空下级的数据
        this.sjxydyOptions = [{value:'', label: '请选择'}]
        if(!value) return false
        if(this.sfktsjyxdy == '1') {
          this.form.setFieldsValue({xzz: ''})
          this.getSjyxdyOption(this.form.getFieldValue('ssxz'), value)
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
            console.log(formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.close();
                that.$emit('ok');
              }else{
                that.$message.error(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
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
  .DefaultListItem {
    color: #1890FF;
    font-weight: 500;
    font-size: 14px;
  }
</style>