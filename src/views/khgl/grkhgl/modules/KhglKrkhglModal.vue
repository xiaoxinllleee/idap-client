<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <j-modal :title="title"
           :width="1350"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           switchFullscreen
           :fullscreen="false"
           :destroyOnClose="true"
           @ok="handleOk"
           @cancel="handleCancel"
           cancelText="关闭">

    <template slot="footer">
      <a-button key="back" @click="handleCancel">取消</a-button>
      <a-button key="submit" :disabled="disableSubmit" type="primary" :loading="loading" @click="handleOk">保存</a-button>
    </template>

    <a-spin :spinning="confirmLoading">
      <!-- 主表单区域 -->
      <a-form :form="form">
        <a-tabs default-active-key="1">
          <a-tab-pane tab="农户基本信息" key="1" :forceRender="true">
            <a-divider orientation="left" style="color: #1890FF;">客户基本信息</a-divider>
            <a-row class="form-row" :gutter="16">
              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属支行">
                <a-input hidden="true" v-model="this.model.sszh"/>
                <a-input v-model="this.sszhmc" :disabled="true" />
              </a-form-item></a-col>

              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="区域代码">
                <a-input hidden="true" v-model="this.model.ssyxdy" :disabled="true"/>
                <a-input v-model="this.model.qydm" :disabled="true"/>
              </a-form-item></a-col>

<!--              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="镇">-->
<!--               <a-input hidden="true" v-model="this.model.yjyxdybh"/>-->
<!--                <a-select placeholder="请选择镇"  v-decorator="[ 'yjyxdymc',  { rules: [{ required: true, message: '请选择镇!', whitespace: true }],}, ]"  @change="ssxzChange"  >-->
<!--                  <a-select-option v-for="item in yjxydyOptions" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>-->
<!--                </a-select>-->
<!--              </a-form-item></a-col>-->

<!--              <a-col :lg="8" ><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="村">-->
<!--                <a-input hidden="true" v-model="this.model.ejyxdybh"/>-->
<!--                <a-select placeholder="请选择村" v-decorator="[ 'ejyxdymc',  { rules: [{ required: true, message: '请选择村!', whitespace: true }],}, ]"   @change="xzcChange" >-->
<!--                  <a-select-option v-for="item in ejxydyOptions" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>-->
<!--                </a-select>-->
<!--              </a-form-item></a-col>-->

<!--              <a-col :lg="8" ><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="组">-->
<!--                <a-input  hidden="true" v-model="this.model.sjyxdybh" />-->
<!--                <a-select placeholder="请选择组"  v-decorator="[ 'sjyxdymc',  { rules: [{ required: true, message: '请选择村!', whitespace: true }],}, ]"    @change="xzzChange" >-->
<!--                  <a-select-option v-for="item in sjxydyOptions" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>-->
<!--                </a-select>-->
<!--              </a-form-item></a-col>-->


              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属网格">
                <a-tree-select
                  :treeData=sswgTreeDateoptions
                  :replaceFields=replaceFields
                  v-model="model.ssyxdy"
                  allow-clear
                  tree-default-expand-all
                >
                </a-tree-select>
              </a-form-item></a-col>

              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户经理">
                <a-input hidden="true" v-model="this.model.sskhjl" />
                <j-dict-select-tag :disabled="true" style="width: 100%;" v-decorator="['khjl', {} ]" :triggerChange="true" dict-code="HR_BAS_STAFF,YGXM,YGGH"/>
              </a-form-item></a-col>

              <a-col :lg="8"><a-form-item   :labelCol="labelCol" :wrapperCol="wrapperCol" label="户号编码">
                <a-input :disabled="true" placeholder="请输入户号编码" v-decorator="['hhbm', {} ]" />
              </a-form-item></a-col>

              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户名称">
                <a-input placeholder="请输入客户名称"style="width: 100%;" v-decorator="['khmc', { rules: [{ required: true, message: '请输入客户名称!', whitespace: true }],},]" />
              </a-form-item></a-col>

              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件号码">
                <a-input   placeholder="请输入身份证号码" v-decorator="['zjhm', {} ]" @change="getzjhm" disabled/>
              </a-form-item></a-col>

              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户性别">
                <j-dict-select-tag placeholder="请选择客户性别" style="width: 100%;" v-decorator="['xb', {rules: [{  }]}]" :triggerChange="true" dictCode="sex"/>
              </a-form-item></a-col>

              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="婚姻状况">
                <j-dict-select-tag placeholder="请选择婚姻状况" style="width: 100%;" v-decorator="['hyzk', { rules: [{ required: true, message: '请选择婚姻状况!', whitespace: true }],},]" :triggerChange="true" dict-code="hyzk_cj"/>
              </a-form-item></a-col>

              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="手机号码">
                <a-input placeholder="请输入手机号码" style="width: 100%;" v-decorator="['lxfs', {}]" />
              </a-form-item></a-col>

              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="居住地址">
                <a-input placeholder="请输入居住地址" style="width: 100%;" v-decorator="['zz',  { rules: [{ required: true, message: '请填写居住地址!', whitespace: true }],}]"/>
              </a-form-item></a-col>

              <a-col :lg="8"> <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户身份">
                <a-input hidden style="width: 100%;" v-decorator="['khlx1', {}]" />
                <j-multi-select-tag placeholder="请选择客户身份" v-decorator="['khlx', {}]" dict-code="khsf" style="width: 100%;"/>
              </a-form-item></a-col>

              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="从事职业">
                <j-dict-select-tag placeholder="请选择从事职业" v-decorator="['cszy', {}]" style="width: 100%;" :showSearch="true" :triggerChange="true" dict-code="cszy"/>
              </a-form-item></a-col>

              <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否授信对象">
                <j-dict-select-tag placeholder="是否授信对象" v-decorator="['sfsxdx',validatorRules.sfsxdx]" :triggerChange="true" dictCode="sfbz" @change="getsfsxdx"/>
              </a-form-item></a-col>
            </a-row>

            <a-divider orientation="left" style="color: #1890FF;">家庭主要成员信息</a-divider>
            <a-card class="card" :bordered="false">
              <j-editable-table rowKey="zjhm"
                                ref="jtzycyxx"
                                :loading="jtzycyxxTable.loading"
                                :columns="jtzycyxxTable.columns"
                                :dataSource="jtzycyxxTable.dataSource"
                                :maxHeight="300"
                                :rowNumber="true"
                                :rowSelection="true"
                                :actionButton="true"/>
            </a-card>

            <a-divider orientation="left" style="color: #1890FF;">家庭资产情况(截至日期: {{this.jzrq}})<font style="color: red">总资产合计: {{this.zzchj}} </font></a-divider>

            <span slot="tab"><a-icon type="book"/>固定资产</span>
            <a-card class="card" :bordered="false">
              <a-table bordered
                       size="middle"
                       :pagination="false"
                       :columns="jtzcqkTable.columns"
                       :dataSource="jtzcqkTable.dataSource">
                <template v-for="col in ['gdzcZfts', 'gdzcZfmj', 'gdzcZfjz','gdzcQt']" :slot="col" slot-scope="text, record, index">
                  <div :key="col"><a-input style="margin: -5px 0" :value="text" @change="e => handleChange(e.target.value, record.key, col)"/></div>
                </template>
              </a-table>

              <a-table size="middle"
                       :pagination="false"
                       :columns="jtzcqkldzcTable.columns"
                       :dataSource="jtzcqkldzcTable.dataSource"
                       bordered>
                <template v-for="colname in ['ldzcXjjwhck', 'ldzcQt', 'ldzcYsk','ldzcThckje','ldzcSfthkh','ldzcSfthyck']" :slot="colname" slot-scope="text, record, index">
                  <div :key="colname" v-if="colname=='ldzcSfthkh'">
                    <a-select v-model="ldzcsfbz" style="margin: -5px 0" @change="getsfbz">
                      <a-select-option value="1"> 是 </a-select-option>
                      <a-select-option value="2"> 否 </a-select-option>
                    </a-select>
                  </div>
                  <div :key="colname" v-if="colname=='ldzcSfthyck'">
                    <a-select v-model="ldzcSfthyck" style="margin: -5px 0" @change="getldzcSfthyck">
                      <a-select-option value="1"> 是 </a-select-option>
                      <a-select-option value="2"> 否 </a-select-option>
                    </a-select>
                  </div>

                  <template v-if="colname=='ldzcXjjwhck'||colname=='ldzcQt'||colname=='ldzcYsk'||colname=='ldzcThckje'" >
                    <a-input style="margin: -5px 0" :value="text" @change="e => handldzcChange(e.target.value, record.key, colname)"/>
                  </template>

                </template>
              </a-table>
            </a-card>
            <a-divider orientation="left" style="color: #1890FF;">家庭负债情况(截至日期:{{this.jzrq}})</a-divider>
            <a-card class="card" :bordered="false">
              <a-table size="middle"
                       :pagination="false"
                       :columns="jtfzqkTable.columns"
                       :dataSource="jtfzqkTable.dataSource"
                       bordered>
                <template v-for="jtfzqkcolname in ['fzWhjk', 'fzQtyhjk', 'fzSrjkhqtjk','fzYfk','fzQtfz','fzWtrdb']" :slot="jtfzqkcolname" slot-scope="text, record, index">
                  <template><a-input :value="text" @change="e => handjtfzqkChange(e.target.value, record.key, jtfzqkcolname)" style="margin: -5px 0"/></template>
                </template>
              </a-table>
            </a-card>

            <a style="width:300px;margin-left:82.6%;" > <font style="color: red">家庭净资产(万元) : </font> <a-input style="width: 100px" v-model="this.jtjzc" /></a>
            <a-divider orientation="left" style="color: #1890FF;">家庭收支情况(调查日前一年度或预测本年度家庭收入支出情况)</a-divider>
            <a-card class="card" :bordered="false">
              <a-table size="middle"
                       :pagination="false"
                       :columns="jtszqkTable.columns"
                       :dataSource="jtszqkTable.dataSource"
                       bordered>
                <template v-for="jtszqkcolname in ['srZz', 'srYz','srLw','srGsy','srQtsr','zcJy','zcYl','zcYlao','zcSccb','zcRcsh','zcQtzc']" :slot="jtszqkcolname" slot-scope="text, record, index"><template >
                  <a-input style="margin: -5px 0" :value="text" @change="e => handjtszqkChange(e.target.value, record.key, jtszqkcolname)"/>
                </template></template>
              </a-table>
            </a-card>

            <a style="width:300px;margin-left:82.6%;"> <font style="color: red">家庭净收入(万元) : </font> <a-input readonly style="width: 100px" v-model="this.jtszqkTable.dataSource[0].jtjsr"  /></a>

            <a-divider orientation="left" style="color: #1890FF;">社会声誉情况</a-divider>
            <div>
              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">家庭成员是否有不良嗜好（黄赌毒、酗酒、偷盗、传销、沉迷于其他不良活动）:</a-col>
                <a-col :span="11" :offset="0"><a-form-item>
                  <a-radio-group v-decorator="['shsyBlsh', {}]" :options="sfblshOptions"/>
                </a-form-item></a-col>
              </a-row>

              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">家庭成员是否勤快:</a-col>
                <a-col :span="11" :offset="0"><a-form-item >
                  <a-radio-group v-decorator="['shsySfqk', {}]" :options="jtcysfqkOptions"/>
                </a-form-item></a-col>
              </a-row>

              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">家庭成员是否有民间高息贷款:</a-col>
                <a-col :span="11" :offset="0"><a-form-item >
                  <a-radio-group   v-decorator="['shsySfygld', {}]" :options="jtcysfgxdkOptions"/>
                </a-form-item></a-col>
              </a-row>

              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">家庭成员是否有打架，闹事等不良行为:</a-col>
                <a-col :span="11" :offset="0"><a-form-item >
                  <a-radio-group   v-decorator="['shsySfdjns', {}]" :options="jtcysfyblxwOptions"/>
                </a-form-item></a-col>
              </a-row>

              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">家庭成员领取补助情况</a-col>
                <a-col :span="11" :offset="0"><a-form-item >
                  <a-checkbox-group   v-model="jtcylqbzqkList" :options="plainOptions"/>
                  <a-input    v-decorator="['qtbzqk', {}]"  size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 100px"/>
                </a-form-item></a-col>
              </a-row>

              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">是否建档立卡贫困户:</a-col>
                <a-col :span="11" :offset="0"><a-form-item >
                  <a-radio-group   v-decorator="['sfjdlkpkh', {}]" :options="sfjdlkpkhOptions"/>
                </a-form-item></a-col>
              </a-row>

              <a-row type="flex"  justify="center" align="middle">
                <a-col :span="10" :offset="1">家庭成员是否有刑事犯罪记录:</a-col>
                <a-col :span="11" :offset="0"><a-form-item >
                  <a-radio-group  v-model="shsySfxsfz" >
                    <a-radio  :value="1">是<!--<a-input v-if="shsySfxsfz === 1" v-decorator="['fzlx', {}]" size="small" style="border:0;border-bottom: 1px solid #ddd;;width: 100px"/>--></a-radio>
                    <a-radio  :value="2">否</a-radio>
                    </a-radio-group>
                </a-form-item></a-col>
              </a-row>

              <a-row type="flex" justify="center"  align="middle">
                <a-col :span="10" :offset="1">家庭成员是否涉诉:</a-col>
                <a-col :span="11" :offset="0"><a-form-item >
                  <a-radio-group    v-decorator="['shsySfss', {}]" :options="sfbzOptions"/>
                </a-form-item></a-col>
              </a-row>
            </div>

            <a-divider orientation="left" style="color: #1890FF;">对户主评价</a-divider>
            <div>
              <a-row type="flex" justify="start" align="middle">
                <a-col :span="4" :offset="2">品行评价:</a-col>
                <a-col :span="6"><a-form-item >
                  <a-radio-group v-decorator="['dhzpjPxpj', {}]" :options="pxpjOptions"/>
                </a-form-item></a-col>
              </a-row>

              <a-row type="flex" justify="start" align="middle">
                <a-col :span="4" :offset="2">信用评价</a-col>
                <a-col :span="6"><a-form-item >
                  <a-radio-group v-decorator="['dhzpjXypj', {}]" :options="xypjOptions"/>
                </a-form-item></a-col>
              </a-row>
            </div>

            <a-divider orientation="left" style="color: #1890FF;">初评等级</a-divider>
            <a-row type="flex" justify="start" align="middle">
              <a-col :span="4" :offset="2">初评等级:</a-col>
              <a-col :span="8"><a-form-item >
                <a-radio-group v-decorator="['cpdj', {}]" :options="cpdjoptions"/>
              </a-form-item></a-col>
            </a-row>

            <a-divider orientation="left" style="color: #1890FF;">备注信息</a-divider>
            <a-row class="form-row" :gutter="16">
              <a-col :span="24" :pull="2"><a-form-item :labelCol="{ xs: { span: 24 }, sm: { span: 4} }" :wrapperCol="{ xs: { span: 24 }, sm: { span: 20 }}" label="备注信息">
                <a-textarea placeholder="请填备注信息" v-decorator="['bz', {rules: [{  }]}]" :autosize="{ minRows: 2, maxRows: 4 }"/>
              </a-form-item></a-col>
            </a-row>
            <!--<a-row type="flex" justify="start" align="middle">
              <a-col :span="4" :offset="2">
                采集备注信息:
              </a-col>
              <a-col :span="16">
                <a-textarea   autoSize  v-decorator="['bz', { }]" :autosize="{ minRows: 2, maxRows: 4 }"/>
              </a-col>
            </a-row>-->
          </a-tab-pane>

          <a-tab-pane tab="附件信息" key="2" :forceRender="true">
            <photo-view   :bizPath="bizPath" ref="photoView" @ok="modalFormOk" />
          </a-tab-pane>

         <!-- <a-tab-pane tab="文档信息补录" key="3" :forceRender="true">
            <a-divider orientation="left" style="color: #1890FF;">农户小额申请书</a-divider>
            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="借款用途">
              <a-input placeholder="请输入借款用途"style="width: 100%;" v-decorator="['jkyt', {}]" />
            </a-form-item></a-col>

            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款金额">
              <a-input placeholder="请输入贷款金额(元)"style="width: 100%;" v-decorator="['dkje', {}]" />
            </a-form-item></a-col>

            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="贷款期限">
              <a-input placeholder="请输入贷款金额(月)"style="width: 100%;" v-decorator="['dkqx', {}]" />
            </a-form-item></a-col>

            <a-col :lg="8"><a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="还款来源">
              <a-input placeholder="请输入还款来源(月)"style="width: 100%;" v-decorator="['hkly', {}]" />
            </a-form-item></a-col>
          </a-tab-pane>-->

      </a-tabs>
      </a-form>
    </a-spin>
  </j-modal>
</template>

<script>
  import moment from 'moment'
  import pick from 'lodash.pick'
  import { FormTypes } from '@/utils/JEditableTableUtil'
  import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'
  import ARow from "ant-design-vue/es/grid/Row";
  import JSelectUserByDep from '@/components/jeecgbiz/JSelectUserByDep'
  import JDictSelectTag from '@/components/dict/JDictSelectTag'
  import JSelectYgxx from '@/components/jeecgbiz/JSelectYgxx'
  import JSelectEjyxdy from '../../../yxdygl/pqzrrgl/modules/JSelectEjyxdy'
  import JSelectSjyxdy from '../../../yxdygl/pqzrrgl/modules/JSelectSjyxdy'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { httpAction,putAction,getAction } from '@/api/manage'
  import { mapGetters } from 'vuex'
  import photoView from './photoView.vue'
  import JMultiSelectTag from '../../../../components/dict/JMultiSelectTag'
  import { getYjyxdyOption, getEjyxdyOption, getSjyxdyOption} from '@/api/area'

  export default {
    components: {ARow,JSelectUserByDep,JSelectYgxx,JSelectEjyxdy,JSelectSjyxdy,JDictSelectTag,photoView,JMultiSelectTag},
    name: 'KhglKrkhglModal',
    mixins: [JEditableTableMixin,JeecgListMixin],
    data() {
      return {
        loadWgxxBySskhjl:true,
        sfjdlkpkh:"",
        zkhjl:"",
        cpdj:" ",
        sszhmc:"",
        yjyxdymc:'',
        ejyxdymc:'',
        sjyxdymc:'',
        sfktsjyxdy:" ",
        sfsxdx:2,
        shsyBlsh: ' ',
        jzrq:" ",
        sfdk:false,
        gdzchj:0,
        ldzchj:0,
        fzhj:0,
        zzchj:0,
        jtjzc:0,
        ldzcsfbz:'',
        ldzcSfthyck:'',
        zjhm:'',
        bizPath:'',
        Img:{},
        nhcjxxb:{},
        khjbxx:{},
        nhgrpjsxx:{},
        jtzycyxx:[],
        shsySfxsfz:1,
        jtcylqbzqkList:[],
        addzjhm:'',
        fzlx:'',
        labelCol: {
          xs: {span: 24},
          sm: {span: 8},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },
        cpdjoptions:[
          { label: '级外', value: 'E' },
          { label: '一般', value: 'D' },
          { label: '较好', value: 'C' },
          { label: '优秀', value: 'B' },
          { label: '特级', value: 'A' },
        ],
        plainOptions : [
          { label: '低保', value: '1' },
          { label: '五保', value: '2' },
          { label: '幼保', value: '3' },
          { label: '其他', value: '4' }
        ],
        jtcysfqkOptions:[
          { label: '否'     , value: '3' },
          { label: '一般勤快', value: '2' },
          { label: '非常勤快', value: '1' },
        ],
        sfbzOptions:[
          { label: '是', value: '1' },
          { label: '不了解'   , value: '3' },
          { label: '否', value: '2' },
        ],
        sfblshOptions:[
          { label: '是', value: '1' },
          { label: '否', value: '2' },
        ],
        sfjdlkpkhOptions:[
          { label: '是', value: '1' },
          { label: '否', value: '2' },
        ],
        pxpjOptions:[
          { label: '差', value: '4' },
          { label: '一般', value: '3' },
          { label: '较好', value: '2' },
          { label: '良好', value: '1' },
        ],
        xypjOptions:[
          { label: '差', value: '4' },
          { label: '一般', value: '3' },
          { label: '较好', value: '2' },
          { label: '良好', value: '1' },
        ],
        jtcysfgxdkOptions:[
          { label: '是', value: '1' },
          { label: '不了解'   , value: '3' },
          { label: '否', value: '2' },

        ],
        jtcysfyblxwOptions:[
          { label: '偶尔', value: '1' },
          { label: '经常', value: '2' },
          { label: '否'   , value: '3' }
        ],
        yjxydyOptions: [{value:'', label: '请选择'}],
        ejxydyOptions: [{value:'', label: '请选择'}],
        sjxydyOptions: [{value:'', label: '请选择'}],
        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        validatorRules: {
          zjhm: {rules: [{ required: true, message: '请输入证件号码!'}]},
          sfsxdx: {rules: [{ required: true, message: '请选择是否授信对象!'}]},
        },
        // 家庭主要成员信息
        jtzycyxxTable: {
          loading: false,
          dataSource: [ ],
          columns: [
            {
              title: '姓名',
              key: 'khmc',
              type: FormTypes.input,
              defaultValue: '',
              align: "center",
              placeholder: '请输入${title}',
              validateRules: [
                {
                  required: true, // 必填
                  message: '${title}不能为空' // 提示的文本
                },
              ]
            },
            {
              title: '身份证号',
              key: 'zjhm',
              type: FormTypes.input,
              defaultValue: '',
              align: "center",
              placeholder: '请输入${title}',
              validateRules: [
                {
                  // 自定义函数校验 handler
                  handler(type, value, row, column, callback, target) {
                    if (type === 'input'||type === 'blur') {
                      if (value === '') {
                        callback(false, '${title}不能为空') // false = 未通过，可以跟自定义提示
                        return
                      }else{
                        var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
                        var tip = ""
                        var pass = true
                        if (!value || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)) {
                          tip = "身份证格式错误"
                          pass = false;
                        } else if (!city[value.substr(0, 2)]) {
                          // tip = "地址编码错误"
                          tip="身份证输入错误"
                          pass = false
                        } else {
                          // 18位身份证需要验证最后一位校验位
                          if (value.length === 18) {
                            value = value.split('')
                            // ∑(ai×Wi)(mod 11)
                            // 加权因子
                            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
                            // 校验位
                            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
                            var sum = 0
                            var ai = 0
                            var wi = 0
                            for (var i = 0; i < 17; i++) {
                              ai = value[i]
                              wi = factor[i]
                              sum += ai * wi
                            }
                            var last = parity[sum % 11];
                            if (parity[sum % 11] != value[17]) {
                              // tip = "校验位错误"
                              tip="身份证输入错误"
                              pass = false
                            }
                          }
                        }
                        if (!pass) {
                          callback(false,tip)
                        } else {
                          callback(true)
                        }

                      }
                      callback(true) // true = 通过验证
                    } else {
                      callback() // 不填写或者填写 null 代表不进行任何操作
                    }
                  },
                  message: '${title}默认提示'
                }
              ]
            },
            {
              title: '从事职业',
              placeholder: '请选择${title}',
              key: 'cszy',
              type: FormTypes.select,
              options: [],
              dictCode: 'cszy',
              allowSearch: true,

            },
            {
              title: '联系电话',
              key: 'lxfs',
              type: FormTypes.input,
              defaultValue: '',
              align: "center",
              placeholder: '请输入${title}',
            },
            {
              title: '与被评价人关系',
              placeholder: '请选择${title}',
              key: 'yhzgx',
              type: FormTypes.select,
              align: "center",
              options: [],
              dictCode: 'yhzgx',
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
        jtzcqkTable: {
          loading: false,
          dataSource: [{ }],
          columns: [
            {
              title: '固定资产',
              children:[
                {
                  title: '住房套数',
                  placeholder: '请输入${title}',
                  key: 'gdzcZfts',
                  dataIndex: 'gdzcZfts',
                  align: "center",
                  scopedSlots: { customRender: 'gdzcZfts' },
                },
                {
                  title: '面积',
                  placeholder: '请输入${title}',
                  key: 'gdzcZfmj',
                  dataIndex: 'gdzcZfmj',
                  align: "center",
                  scopedSlots: { customRender: 'gdzcZfmj' },
                },
                {
                  title: '价值',
                  key: 'gdzcZfjz',
                  dataIndex: 'gdzcZfjz',
                  type: FormTypes.inputNumber,
                  align: "center",
                  placeholder: '请输入${title}',
                  scopedSlots: { customRender: 'gdzcZfjz' },
                },
                {
                  title: '其他固定资产',
                  placeholder: '请输入${title}',
                  key: 'gdzcQt',
                  dataIndex: 'gdzcQt',
                  type: FormTypes.inputNumber,
                  align: "center",
                  scopedSlots: { customRender: 'gdzcQt' },
                },
                {
                  title: '合计',
                  key: 'gdzcHj',
                  dataIndex: 'gdzcHj',
                  width: 200,
                  align: "center",
                  scopedSlots: { customRender: 'gdzcHj' },
                },
              ]
            },
          ]
        },
        jtzcqkldzcTable: {
          loading: false,
          dataSource: [{ }],
          columns: [
            {
              title: '流动资产',
              children:[
                {
                  title: '现金及我行存款',
                  placeholder: '请输入${title}',
                  key: 'ldzcXjjwhck',
                  dataIndex: 'ldzcXjjwhck',
                  width: 100,
                  align: "center",
                  scopedSlots: { customRender: 'ldzcXjjwhck' },
                },
                {
                  title: '应收款',
                  placeholder: '请输入${title}',
                  key: 'ldzcYsk',
                  dataIndex: 'ldzcYsk',
                  width: 100,
                  align: "center",
                  scopedSlots: { customRender: 'ldzcYsk' },
                },
                {
                  title: '是否在他行开户',
                  placeholder: '请选择${title}',
                  key: 'ldzcSfthkh',
                  dataIndex: 'ldzcSfthkh',
                  width: 100,
                  align: "center",
                  scopedSlots: { customRender: 'ldzcSfthkh' },
                },
                /*{
                  title: '是否在他行有存款',
                  placeholder: '请选择${title}',
                  key: 'ldzcSfthyck',
                  dataIndex: 'ldzcSfthyck',
                  width: 100,
                  align: "center",
                  scopedSlots: { customRender: 'ldzcSfthyck' },
                },*/
                {
                  title: '他行存款金额',
                  placeholder: '请输入${title}',
                  key: 'ldzcThckje',
                  dataIndex: 'ldzcThckje',
                  width: 100,
                  align: "center",
                  scopedSlots: { customRender: 'ldzcThckje' },
                },
                {
                  title: '其他流动资产',
                  placeholder: '请输入${title}',
                  key: 'ldzcQt',
                  dataIndex: 'ldzcQt',
                  width: 100,
                  align: "center",
                  scopedSlots: { customRender: 'ldzcQt' },
                },
                {
                  title: '合计',
                  key: 'ldzcHj',
                  dataIndex: 'ldzcHj',
                  width: 100,
                  align: "center",
                  scopedSlots: { customRender: 'ldzcHj' },
                },
              ]
            },
          ]
        },
        jtfzqkTable: {
          loading: false,
          dataSource: [
            { }
          ],
          columns: [
                {
                  title: '我行借款',
                  key: 'fzWhjk',
                  align: "center",
                  dataIndex: 'fzWhjk',
                  scopedSlots: { customRender: 'fzWhjk' },
                  width: 100,
                  placeholder: '请输入${title}',
                },

                {
                  title: '其他银行借款',
                  key: 'fzQtyhjk',
                  align: "center",
                  dataIndex: 'fzQtyhjk',
                  scopedSlots: { customRender: 'fzQtyhjk' },
                  width: 100,
                  placeholder: '请输入${title}',
                },
                {
                  title: '私人借款和其他借款',
                  key: 'fzSrjkhqtjk',
                  align: "center",
                  dataIndex: 'fzSrjkhqtjk',
                  scopedSlots: { customRender: 'fzSrjkhqtjk' },
                  width: 100,
                  placeholder: '请输入${title}',
                },
                {
                  title: '应付款',
                  key: 'fzYfk',
                  align: "center",
                  dataIndex: 'fzYfk',
                  scopedSlots: { customRender: 'fzYfk'},
                  width: 100,
                  placeholder: '请输入${title}',
                },
              {
                title: '为他人提供担保',
                key: 'fzWtrdb',
                align: "center",
                dataIndex: 'fzWtrdb',
                scopedSlots: { customRender: 'fzWtrdb'},
                width: 100,
                placeholder: '请输入${title}',
              },
              {
                title: '其他负债',
                key: 'fzQtfz',
                align: "center",
                dataIndex: 'fzQtfz',
                scopedSlots: { customRender: 'fzQtfz'},
                width: 100,
                placeholder: '请输入${title}',
              },
            {
                title: '负债合计',
                key: 'fzHj',
                type: FormTypes.input,
                align: "center",
                dataIndex: 'fzHj',
                width: 100,
                placeholder: '请输入${title}',
            },
          ]
        },
        jtszqkTable:{
          loading: false,
          dataSource: [
            { }
          ],
          columns: [
            {
              title: '收入',
              children: [
                {
                  title: '种植',
                  key: 'srZz',
                  align: "center",
                  dataIndex: 'srZz',
                  scopedSlots: { customRender: 'srZz'},
                  width: 100,
                  placeholder: '请输入${title}',
                },

                {
                  title: '养殖',
                  key: 'srYz',
                  align: "center",
                  dataIndex: 'srYz',
                  scopedSlots: { customRender: 'srYz'},
                  width: 100,
                  placeholder: '请输入${title}',
                },
                {
                  title: '劳务',
                  key: 'srLw',
                  align: "center",
                  dataIndex: 'srLw',
                  scopedSlots: { customRender: 'srLw'},
                  width: 100,
                  placeholder: '请输入${title}',
                },
                {
                  title: '经营收入',
                  placeholder: '请选择${title}',
                  key: 'srGsy',
                  dataIndex: 'srGsy',
                  scopedSlots: { customRender: 'srGsy'},
                  align: "center",
                  width: 100,
                },
                {
                  title: '其他收入',
                  placeholder: '请选择${title}',
                  key: 'srQtsr',
                  align: "center",
                  scopedSlots: { customRender: 'srQtsr'},
                  dataIndex: 'srQtsr',
                  width: 100,
                },
                {
                  title: '合计',
                  key: 'srHj',
                  align: "center",
                  dataIndex: 'srHj',
                  width: 100,
                  placeholder: '请输入${title}',
                },
              ]
            },
            {
              title: '支出',
              children: [
                {
                  title: '教育',
                  key: 'zcJy',
                  dataIndex: 'zcJy',
                  align: "center",
                  scopedSlots: { customRender: 'zcJy'},
                  width: 100,
                  placeholder: '请输入${title}',
                },

                {
                  title: '医疗',
                  key: 'zcYl',
                  dataIndex: 'zcYl',
                  align: "center",
                  width: 100,
                  scopedSlots: { customRender: 'zcYl'},
                  placeholder: '请输入${title}',
                },
                {
                  title: '养老',
                  key: 'zcYlao',
                  dataIndex: 'zcYlao',
                  align: "center",
                  width: 100,
                  scopedSlots: { customRender: 'zcYlao'},
                  placeholder: '请输入${title}',
                },
                {
                  title: '生产成本',
                  placeholder: '请选择${title}',
                  key: 'zcSccb',
                  dataIndex: 'zcSccb',
                  align: "center",
                  scopedSlots: { customRender: 'zcSccb'},
                  width: 100,
                },
                {
                  title: '日常生活',
                  placeholder: '请选择${title}',
                  key: 'zcRcsh',
                  scopedSlots: { customRender: 'zcRcsh'},
                  dataIndex: 'zcRcsh',
                  align: "center",
                  width: 100,
                },
                {
                  title: '其他支出',
                  placeholder: '请选择${title}',
                  key: 'zcQtzc',
                  dataIndex: 'zcQtzc',
                  scopedSlots: { customRender: 'zcQtzc'},
                  align: "center",
                  width: 100,
                },
                {
                  title: '合计',
                  key: 'zcHj',
                  type: FormTypes.input,
                  dataIndex: 'zcHj',
                  align: "center",
                  width: 100,
                  placeholder: '请输入${title}',
                },
              ],
            },

            ]
        },

        disableSubmit: false,
        confirmLoading: false,

        url: {
          list: "/khgl/vKhglKrkhgl/list",
          add: "/khgl/vKhglKrkhgl/add",
          edit: "/khgl/vKhglKrkhgl/edit",
        }
      }
    },

    created () {
      this.init();
    },


    methods: {
      ...mapGetters(["nickname", "avatar","userInfo"]),

      add (value) {
        this.addzjhm = value.zjhm
        this.zjhm=this.addzjhm
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        if(this.addzjhm===null||this.addzjhm===''||this.addzjhm===undefined){
          this.model.qydm = record.ssyxdy;
          this.model.sskhjl = record.khjl
          this.zjhm= record.zjhm
          this.zkhjl = record.khjl_dictText
          this.sszhmc=this.model.sszh_dictText
          this.$nextTick(() => {
            this.form.setFieldsValue(pick(this.model, 'sszh', 'ssyxdy', 'hhbm','khjl', 'yhzgx', 'sfhz', 'khmc', 'zjhm', 'khlx', 'lxfs', 'dz', 'xb', 'nl', 'mz', 'hyzk', 'bz', 'lrbz', 'lrr', 'yssxz', 'yxzc', 'sflqsbk', 'sfktsbk', 'jgdm', 'xtpdjg', 'xtpdsm', 'xgr', 'sfxdry', 'sfpkh', 'sfdb', 'sfgzry', 'sfffjz', 'hbjl', 'infoRate', 'cszy', 'sfzkhjl', 'yjyxdybh', 'ejyxdybh', 'sjyxdybh', 'khjl', 'cjr', 'sfcj','zz','sfsxdx','csny'))
            //时间格式化
            this.form.setFieldsValue({yjyxdymc:record.yjyxdybh,ejyxdymc:record.ejyxdybh,sjyxdymc:record.sjyxdybh});

            //this.form.setFieldsValue({ csny: this.model.csny ? moment(this.model.csny) : null })
          });

          //获取附件信息
          this.bizPath =this.model.ssyxdy +"/"+ this.model.hhbm
          if (this.model.zjhm) {
            console.log(record.zjhm +"--------------zjhm")
            let params = { "zjhm": record.zjhm }
            getAction("khgl/vKhglKrkhgl/img", params).then((res) => {
              if (res.success) {
                console.log("===============")
                console.log(res.result)
                this.$refs.photoView.showImg(res.result)
              }
            });
          }
          //家庭成员信息
          if (this.model.zjhm) {
            let params = {"zjhm":record.zjhm}
            putAction("khgl/vKhglKrkhgl/jtcyxx", params).then(res => {
              if (res.success) {
                this.jtzycyxxTable.dataSource = res.result.jtcylist
                console.log("---家庭成员信息-----")
                console.log(this.jtzycyxxTable.dataSource)
              }
            });
          }
          //家庭资产情况
          if (this.model.zjhm) {
            let params = { "zjhm": record.zjhm }
            getAction("khgl/vKhglKrkhgl/jtzcqk", params).then(res => {
              if (res.success) {
                if (JSON.stringify(res.result) != "{}") {
                  this.jtzcqkTable.dataSource = res.result.list
                  this.jtzcqkldzcTable.dataSource = res.result.list
                  this.jtfzqkTable.dataSource = res.result.list
                  this.jtszqkTable.dataSource = res.result.list
                  this.ldzcsfbz = res.result.ldzcSfthkh
                  this.ldzcSfthyck = res.result.ldzcSfthyck
                  console.log("---家庭资产情况-----")
                  console.log(this.jtzcqkTable.dataSource)
                  this.nhgrpjsxx = Object.assign({}, res.result.objet);
                  this.zzchj = this.nhgrpjsxx.zzchj
                  this.jtjzc = this.nhgrpjsxx.jtjzc
                  this.jtjsr = this.nhgrpjsxx.jtjsr
                  this.jzrq=this.nhgrpjsxx.createTime;
                  this.jtcylqbzqkList=this.nhgrpjsxx.shsySflqbz==null ? []:this.nhgrpjsxx.shsySflqbz.split(',');
                  console.log(this.jtcylqbzqkList)
                 // this.sfjdlkpkh=this.nhgrpjsxx.sfjdlkpkh;
                  // this.shsySfxsfz=this.nhgrpjsxx.shsySfxsfz=="1"?1:2;
                  console.log("---个人评价授信信息-----")
                  console.log(this.nhgrpjsxx)
                  this.$nextTick(() => {
                    let fieldgrpjsxx = pick(this.nhgrpjsxx, 'shsyBlsh', 'shsySfqk', 'shsySfygld', 'shsySfdjns', 'shsySflqbz','shsySfxsfz', 'shsySfss', 'dhzpjPxpj', 'dhzpjXypj', 'cpdj', 'bz','createTime','qtbzqk','sfjdlkpkh','fzlx')
                    this.form.setFieldsValue(fieldgrpjsxx)
                  })
                }
              }
            });
          }
        }else{
            this.$nextTick(() => {
              let csnystr=this.addzjhm.substr(6,8);
              console.log(csnystr)
              this.form.setFieldsValue({zjhm:this.addzjhm,sfsxdx:this.sfsxdx,csny:this.addzjhm.substr(6,8)})
            })

          let username = this.userInfo().workNo
          let realname = this.userInfo().realname
          let params = {"zjhm":this.addzjhm}

          //获取户号编码
          getAction("/khgl/vKhglKrkhgl/jbxx", params).then(res => {
            if (res.success) {
              this.model.hhbm = res.result.hhbm
              this.form.setFieldsValue({ hhbm: res.result.hhbm })
              console.log("---res.result.hhbm-----")
              console.log(res.result.hhbm)
            }
          })
          getAction("/khgl/vKhglKrkhgl/jbxx", params).then(res => {
            if (res.success) {
              if (JSON.stringify(res.result) != "{}") {
                this.$nextTick(()=>{
                  this.khjbxx = Object.assign({} ,res.result.jbxx)
                  this.model.qydm =  this.khjbxx.ssyxdy;
                  this.model.sskhjl =  this.khjbxx.khjl
                  this.zkhjl = res.result.khjl_dictText
                  if((this.khjbxx.khjl===null||this.khjbxx.khjl===''||this.khjbxx.khjl===undefined)){
                    this.model.sskhjl = username
                    this.zkhjl=realname;
                  }
                  this.form.setFieldsValue({yjyxdymc:res.result.yjyxdybh,ejyxdymc:res.result.ejyxdybh,sjyxdymc:res.result.sjyxdybh});
                  console.log("---客户基本信息-----")
                  console.log(this.khjbxx)
                  let fieldkhjbxx = pick(this.khjbxx,'sszh', 'ssyxdy', 'hhbm', 'yhzgx', 'sfhz', 'khmc', 'zjhm', 'khlx', 'lxfs', 'dz', 'xb', 'nl', 'mz', 'hyzk', 'bz', 'lrbz', 'lrr', 'yssxz', 'yxzc', 'sflqsbk', 'sfktsbk', 'jgdm', 'xtpdjg', 'xtpdsm', 'xgr', 'sfxdry', 'sfpkh', 'sfdb', 'sfgzry', 'sfffjz', 'hbjl', 'infoRate', 'cszy', 'sfzkhjl', 'yjyxdybh', 'ejyxdybh', 'sjyxdybh', 'khjl', 'cjr', 'sfcj','zz','csny')
                  this.form.setFieldsValue(fieldkhjbxx)
                  //时间格式化
                  //this.form.setFieldsValue({csny:  this.khjbxx.csny ? moment( this.khjbxx.csny) : null })
                })
              }else{
                this.model.sskhjl = username
                this.zkhjl=realname;
              }
            }
          })
          //家庭成员信息
          putAction("khgl/vKhglKrkhgl/jtcyxx", params).then(res => {
              if (res.success) {
                if (JSON.stringify(res.result) != "{}") {
                  console.log(res.result)
                  this.jtzycyxxTable.dataSource = res.result.jtcylist
                  console.log("---家庭成员信息-----")
                  console.log(this.jtzycyxxTable.dataSource)
                }
              }
            });
          //家庭资产情况
          getAction("khgl/vKhglKrkhgl/jtzcqk", params).then(res => {
            if (res.success) {
              if (JSON.stringify(res.result) != "{}") {
                this.jtzcqkTable.dataSource = res.result.list
                this.jtzcqkldzcTable.dataSource = res.result.list
                this.jtfzqkTable.dataSource=res.result.list
                this.jtszqkTable.dataSource=res.result.list
                this.ldzcsfbz = res.result.list[0].ldzcSfthkh
                this.ldzcSfthyck = res.result.list[0].ldzcSfthyck
                console.log("---家庭资产情况-----")
                console.log(res.result.list)
                this.nhgrpjsxx = Object.assign({}, res.result.objet);
                this.cpdj=this.nhgrpjsxx.cpdj
                console.log("---个人评价授信信息-----")
                console.log(this.nhgrpjsxx)
                this.$nextTick(() => {
                  let fieldgrpjsxx = pick(this.nhgrpjsxx,'shsyBlsh','shsySfqk','shsySfygld','shsySfdjns','shsySflqbz','shsySfxsfz','shsySfss','dhzpjPxpj','dhzpjXypj','cpdj','xtpddj','xtpddf','xtsxed','zzpddj','zzpddf','zzsxed','bz','gdzcZfts','gdzcZfmj','gdzcZfjz','gdzcQt','gdzcHj','ldzcXjjwhck','ldzcQt','ldzcYsk','ldzcSfthkh','ldzcSfthyck','ldzcThckje','ldzcHj','zzchj','fzWhjk','fzQtyhjk','fzSrjkhqtjk','fzYfk','fzQtfz','fzWtrdb','fzHj','jtjzc','srZz','srYz','srLw','srGsy','srQtsr','srHj','zcJy','zcYl','zcYlao','zcSccb','zcRcsh')
                  this.form.setFieldsValue(fieldgrpjsxx)
                })
              }
            }
          });

        }
      },
      handleCancel () {
        this.close()
      },

      onChangeSfxsfz(e) {
        console.log('radio checked', e.target.value);
      },
      close () {
        this.jtzycyxxTable.dataSource=[],
        this.jtzcqkTable.dataSource = [{}],
        this.jtzcqkldzcTable.dataSource = [{}],
        this.jtfzqkTable.dataSource=[{}],
        this.jtszqkTable.dataSource=[{}],
        this.addzjhm ="",
        this.cpdj="",
        this.ldzcsfbz = " ",
        this.ldzcSfthyck = " ",
        this.zjhm = " ",
        this.sfsxdx=2,
        this.jtjzc = " ",
        this.zzchj=" ",
        this.$refs.photoView.close();
        this.zkhjl = null;
        this.yjyxdymc= null;
        this.ejyxdymc= null;
        this.sjyxdymc= null;
        this.$emit('close');
        this.visible = false;
      },
      init() {
        //获取一级营销单元下拉列表数据
        getYjyxdyOption().then(response => {
          let list = response.result
          list.forEach(item => {
            this.yjxydyOptions.push({
              value: item.dybh,
              label: item.dymc
            })
          })
        })

        getEjyxdyOption({}).then(response => {
          console.log(response)
          let list = response.result
          list.forEach(item => {
            this.ejxydyOptions.push({
              value: item.dybh,
              label: item.dymc
            })
          })
        })

        getSjyxdyOption({}).then(response => {
          let list = response.result
          list.forEach(item => {
            this.sjxydyOptions.push({
              value: item.dybh,
              label: item.dymc
            })
          })
        })
      },
      //查询是否开通三级营销单元
      querycsz(){
        let params = { "csbm":"CS0004"}
        putAction("/yxdygl/yxdyglPqzrrgl/querycsz", params).then(res => {
          if (res.success) {
            console.log("---------")
            console.log(res.result.csz)
            this.sfktsjyxdy =res.result.csz
          }
        });
      },
      GetValueZkhjl(value){
        console.log(value)
        this.zkhjl = value.ygxm
        this.model.sskhjl= value.yggh
      },
      ssxzChange(value) {
          console.log('ssxzChange')
          console.log(value)
        //先清空下级的数据
          this.$set(this.model, 'yjyxdybh', value)
          this.ejxydyOptions = [{value:'', label: '请选择'}],
          this.sjxydyOptions = [{value:'', label: '请选择'}],
          this.form.setFieldsValue({ejyxdymc:''});
        this.model.ejyxdybh='';
          if(value){
            getEjyxdyOption({'yjyxdybh': value}).then(response => {
              console.log(response)
              let list = response.result
              list.forEach(item => {
                this.ejxydyOptions.push({
                  value: item.dybh,
                  label: item.dymc
                })
              })
              console.log(this.ejxydyOptions)
            })
          }

      },
      xzcChange(value) {
          console.log('xzcChange')
          console.log(value)
          this.$set(this.model, 'ejyxdybh', value)
          //先清空下级的数据
          this.sjxydyOptions = [{value:'', label: '请选择'}],
          this.form.setFieldsValue({sjyxdymc:''});
          if(value){
            getSjyxdyOption({'yjyxdybh': this.model.yjyxdybh, 'ejyxdybh': value}).then(response => {
              console.log(response)
              let list = response.result
              list.forEach(item => {
                this.sjxydyOptions.push({
                  value: item.dybh,
                  label: item.dymc
                })
              })
              console.log(this.sjxydyOptions)
            })
          }
      },
      xzzChange(value) {
        console.log(value)
        this.$set(this.model, 'sjyxdybh',value);
        this.$set(this.model, 'ssyxdy', value);
        getSjyxdyOption({'sjyxdybh': this.model.sjyxdybh}).then(response => {
          console.log(1111)
          this.$set(this.model, 'sszh', response.result[0].sszh)
        })
      },

      getValueejdybh(value){
        console.log(value)
        this.model.yjyxdybh=value.yjdybh
        this.yjyxdymc = value.yjdymc
        this.model.ejyxdybh=value.dybh
        this.ejyxdymc = value.dymc
        this.model.sszh=value.sszh
        this.sszhmc=value.sszhmc
        this.model.qydm = value.dybh
        this.model.ssyxdy = value.dybh
        this.bizPath =this.model.ssyxdy +"/"+ this.model.hhbm

      },
      getValuesjdybh(value){
        console.log(value)
        this.model.yjyxdybh=value.yjdybh
        this.yjyxdymc = value.yjdymc
        console.log(value)
        this.model.ejyxdybh=value.ejdybh
        this.ejyxdymc = value.ejdymc
        this.model.sjyxdybh=value.dybh
        this.sjyxdymc = value.dymc
        this.model.sszh=value.sszh
        this.sszhmc=value.sszhmc
        this.model.qydm = value.dybh
        this.model.ssyxdy = value.dybh
        this.bizPath =this.model.ssyxdy +"/"+ this.model.hhbm
      },

      onChange1(e) {
        this.cpdj = e.target.value
        this.model.cpdj = e.target.value
        console.log('radio1 checked', e.target.value);
      },


      handleOk () {
        const that = this;
        // 触发表单验证
        if(!this.model.zjhm){
          if(this.checkBirthday(this.zjhm)==false){
            this.$message.error("您输入的证件号不合法")
            return;
          }
        }
        this.$refs.jtzycyxx.getValues((error, values) => {
          // 错误数 = 0 则代表验证通过
          if (error === 0) {
            let flag=true;
            values.forEach((data,index) => {
              if(!this.validateIdCard(data.zjhm)){
                try{
                  this.$message.error('家庭成员['+data.khmc+']证件号输入错误，请检查！',5)
                  flag=false;
                  throw Error();
                }catch(err){
                  console.log(err)
                }
              }
            })
            if(flag){
              this.form.validateFields((err, values) => {
                if (!err) {
                  that.confirmLoading = true;
                  let httpurl = '';
                  let method = '';
                  if(!this.model.zjhm){
                    httpurl+=this.url.add;
                    method = 'post';
                  }else{
                    httpurl+=this.url.edit;
                    method = 'put';
                  }


                  let zbtable = Object.assign(this.model, values);
                  let jtcylist = [];
                  console.log("------主表结果---------")
                  console.log(zbtable)



                  //把数组转换成对象
                  var grpjsxqk ={}
                  var gdzctable ={}
                  let gdzc = this.jtzcqkTable.dataSource
                  console.log("------固定资产---------")
                  for (let i=0;i < this.jtzcqkTable.dataSource.length;i++ ){
                    gdzctable= {"gdzcZfts":gdzc[i].gdzcZfts,"gdzcZfmj":gdzc[i].gdzcZfmj,"gdzcZfjz":gdzc[i].gdzcZfjz,"gdzcQt":gdzc[i].gdzcQt,'gdzcHj':gdzc[i].gdzcHj}
                    grpjsxqk=Object.assign({}, gdzctable);
                  }
                  console.log(gdzc)

                  var ldzctable = {}
                  let ldzc = this.jtzcqkldzcTable.dataSource
                  console.log("------流动资产---------")
                  ldzctable={"ldzcXjjwhck":ldzc[0].ldzcXjjwhck,"ldzcQt":ldzc[0].ldzcQt,"ldzcYsk":ldzc[0].ldzcYsk,"ldzcSfthkh":this.ldzcsfbz,
                    "ldzcSfthyck":this.ldzcSfthyck,"ldzcThckje":ldzc[0].ldzcThckje,"ldzcHj":ldzc[0].ldzcHj,"zzchj":this.zzchj}
                  grpjsxqk = Object.assign(grpjsxqk,ldzctable)
                  console.log(ldzctable)

                  var jtfzqktable={};
                  let jtfzqk = this.jtfzqkTable.dataSource
                  console.log("------家庭负债情况---------")
                  jtfzqktable={
                    "fzWhjk":jtfzqk[0].fzWhjk,
                    "fzQtyhjk":jtfzqk[0].fzQtyhjk,
                    "fzSrjkhqtjk":jtfzqk[0].fzSrjkhqtjk,
                    "fzYfk":jtfzqk[0].fzYfk,
                    "fzQtfz":jtfzqk[0].fzQtfz,
                    "fzWtrdb":jtfzqk[0].fzWtrdb,
                    "fzHj":jtfzqk[0].fzHj,
                    "jtjzc":this.jtjzc }
                  grpjsxqk= Object.assign(grpjsxqk,jtfzqktable)
                  console.log(jtfzqk)


                  var jtszqktable = {}
                  let jtszqk = this.jtszqkTable.dataSource
                  console.log("------家庭收支情况---------")
                  jtszqktable={
                    "srZz":jtszqk[0].srZz,
                    "srYz":jtszqk[0].srYz,
                    "srLw":jtszqk[0].srLw,
                    "srGsy":jtszqk[0].srGsy,
                    "srQtsr":jtszqk[0].srQtsr,
                    "srHj":jtszqk[0].srHj,
                    "zcJy":jtszqk[0].zcJy,
                    "zcYl":jtszqk[0].zcYl,
                    "zcYlao":jtszqk[0].zcYlao,
                    "zcSccb":jtszqk[0].zcSccb,
                    "zcRcsh":jtszqk[0].zcRcsh,
                    "zcQtzc":jtszqk[0].zcQtzc,
                    "zcHj":jtszqk[0].zcHj,
                    "jtjsr":jtszqk[0].jtjsr}
                  grpjsxqk= Object.assign(grpjsxqk,jtszqktable)
                  console.log(jtszqk)

                  let cs1 ={"jtcylqbzqkList":this.jtcylqbzqkList,"shsySfxsfz":this.shsySfxsfz,"fzlx":this.model.fzlx}

                  console.log("------测试结果cs1---------")
                  console.log(cs1)
                  console.log("------测试结果cs1---------")

                  let jtcylqbzqkstr="";
                  this.jtcylqbzqkList.forEach((value, index)=>{
                    if (value.length > 0) {
                      jtcylqbzqkstr+=value+","
                    }
                  });
                  console.log("jtcylqbzqkstr")
                  console.log(jtcylqbzqkstr)


                  let qyzd ={"shsyBlsh":zbtable.shsyBlsh,"shsySfqk":zbtable.shsySfqk,"shsySfygld":zbtable.shsySfygld,"shsySfdjns":zbtable.shsySfdjns,
                    "shsySfss":zbtable.shsySfss,"dhzpjPxpj":zbtable.dhzpjPxpj,
                    "dhzpjXypj":zbtable.dhzpjXypj,"cpdj":zbtable.cpdj,"bz":zbtable.bz,'hhbm':zbtable.hhbm,'khmc':zbtable.khmc,'zjhm':zbtable.zjhm,
                    "shsySflqbz":jtcylqbzqkstr,"shsySfxsfz":this.shsySfxsfz,"sfjdlkpkh":zbtable.sfjdlkpkh,"fzlx":zbtable.fzlx,"qtbzqk":zbtable.qtbzqk}
                  grpjsxqk= Object.assign(grpjsxqk,qyzd)
                  let grpjsx = []
                  grpjsx.push(grpjsxqk)
                  console.log("------测试结果啊啊---------")
                  console.log(grpjsx)


                  //获取附件信息表数据
                  console.log("------附件信息表数据---------")
                  this.$refs.photoView.add()
                  console.log(this.$refs.photoView.imgdate)
                  let imgdate = {"imgdate":this.$refs.photoView.imgdate}
                  zbtable= Object.assign(zbtable,imgdate)



                  this.$refs.jtzycyxx.getValues((error, values) => {
                    this.jtzycyxx=values
                    console.log("------家庭主要成员信息---------")
                    console.log(this.jtzycyxx)

                    let formData = {
                      ...zbtable,
                      khhmcxxList:this.jtzycyxx,
                      camsZcsxGrpjsxxxList:grpjsx,
                    }
                    console.log("---结果----")
                    console.log(formData)

                    httpAction(httpurl,formData,method).then((res)=>{
                      if(res.success){
                        that.$message.success("保存成功",3);
                        that.$emit('ok');
                      }else{
                        that.$message.warning(res.message,3);
                      }
                    }).finally(() => {
                      that.confirmLoading = false;
                      that.close();
                    })

                  })

                }
              })
            }
            // 将通过后的数组提交到后台或自行进行其他处理
            console.log(values)
          } else {
            values.forEach((data,index) => {
              if(this.validateIdCard(data.zjhm)){
                this.$message.error('家庭成员表单验证失败，请检查！',5)
                return;
              }
            })

          }
        })
      },


      //固定资产
      handleChange(value, key, column) {
        const newData = [...this.jtzcqkTable.dataSource];
        console.log(newData)
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target[column] = value;
          //汇总固定资产合计
          newData[0].gdzcHj =parseInt(newData[0].gdzcZfjz == null ? '0' : newData[0].gdzcZfjz ) +parseInt(newData[0].gdzcQt == null ? '0' : newData[0].gdzcQt )
          this.jtzcqkTable.dataSource = newData;
          this.gdzchj=newData[0].gdzcHj;

          //汇总总资产合计
          this.zzchj= parseInt(this.gdzchj == " " ? '0' : this.gdzchj)+ parseInt(this.ldzchj == " " ? '0' : this.ldzchj)
          this.jtjzc= parseInt(this.gdzchj == " "? '0' : this.gdzchj)+ parseInt(this.ldzchj == " " ? '0' : this.ldzchj)-
            parseInt(this.fzhj == " " ? '0' : this.fzhj)
          console.log("----------")
          console.log(this.jtzcqkTable.dataSource)
          console.log("----------")
        }
      },

      //流动资产
      handldzcChange(value, key, column) {
        const newData = [...this.jtzcqkldzcTable.dataSource];
        console.log(newData)
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target[column] = value;
          //汇总流动资产合计
          newData[0].ldzcHj = parseInt(newData[0].ldzcXjjwhck == null ? '0' : newData[0].ldzcXjjwhck )+parseInt(newData[0].ldzcQt == null ? '0' : newData[0].ldzcQt )+
            parseInt(newData[0].ldzcYsk == null ? '0' : newData[0].ldzcYsk ) + parseInt(newData[0].ldzcThckje == null ? '0' : newData[0].ldzcThckje )
          this.jtzcqkldzcTable.dataSource = newData;
          this.ldzchj=newData[0].ldzcHj
          //汇总总资产合计
          this.zzchj= parseInt(this.gdzchj == " " ? '0' : this.gdzchj)+ parseInt(this.ldzchj == " " ? '0' : this.ldzchj)
          //汇总家庭净资产合计
          this.jtjzc= parseInt(this.gdzchj == " " ? '0': this.gdzchj)+ parseInt(this.ldzchj == " " ? '0' : this.ldzchj)-
            parseInt(this.fzhj == " " ? '0' : this.fzhj)
          console.log("----------")
          console.log(this.jtzcqkldzcTable.dataSource)
          console.log("----------")
        }
      },

      //家庭负债情况
      handjtfzqkChange(value, key, column) {
        const newData = [...this.jtfzqkTable.dataSource];
        console.log(newData)
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target[column] = value;
          //汇总负债合计
          newData[0].fzHj = parseInt(newData[0].fzWhjk == null ? '0' : newData[0].fzWhjk )+parseInt(newData[0].fzQtyhjk == null ? '0' : newData[0].fzQtyhjk )+
            parseInt(newData[0].fzSrjkhqtjk ==null? '0' : newData[0].fzSrjkhqtjk ) +parseInt(newData[0].fzYfk == null ? '0' : newData[0].fzYfk )+
            parseInt(newData[0].fzQtfz == null ? '0' : newData[0].fzQtfz )+parseInt(newData[0].fzWtrdb == null ? '0' : newData[0].fzWtrdb )
          this.jtfzqkTable.dataSource = newData;
          this.fzhj=newData[0].fzHj
          //汇总总支出合计
          this.zzchj= parseInt(this.gdzchj == " " ? '0' : this.gdzchj)+ parseInt(this.ldzchj == " " ? '0' : this.ldzchj)
          //汇总家庭净资产
          this.jtjzc= parseInt(this.gdzchj == " " ? '0' : this.gdzchj)+ parseInt(this.ldzchj == " " ? '0' : this.ldzchj)-
            parseInt(this.fzhj == " " ? '0' : this.fzhj)
        }
      },
      //家庭收支情况
      handjtszqkChange(value, key, column) {
        const newData = [...this.jtszqkTable.dataSource];
        console.log(newData)
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target[column] = value;
          //汇总收入合计
          newData[0].srHj = parseInt(newData[0].srZz == null ? '0' : newData[0].srZz )+parseInt(newData[0].srYz == null ? '0' : newData[0].srYz )+
            parseInt(newData[0].srLw ==null? '0' : newData[0].srLw ) + parseInt(newData[0].srGsy==null ? '0' : newData[0].srGsy) +
            parseInt(newData[0].srQtsr == null ? '0' : newData[0].srQtsr )
          //汇总支出合计
          newData[0].zcHj = parseInt(newData[0].zcJy == null ? '0' : newData[0].zcJy )+ parseInt(newData[0].zcYl==null ? '0' : newData[0].zcYl)+
            parseInt(newData[0].zcYlao == null ? '0' : newData[0].zcYlao )+parseInt(newData[0].zcSccb ==null? '0' : newData[0].zcSccb ) +
            parseInt(newData[0].zcRcsh == null ? '0' : newData[0].zcRcsh )+parseInt(newData[0].zcQtzc == null ? '0' : newData[0].zcQtzc )
          //家庭净收入
          newData[0].jtjsr = newData[0].srHj - newData[0].zcHj
          this.jtszqkTable.dataSource = newData;
          console.log("----------")
          console.log( this.jtszqkTable.dataSource)
          console.log("----------")
        }
      },


      getzjhm(e){
        this.zjhm = e.target.value
        console.log("zjhm"+this.zjhm)
        this.form.setFieldsValue({csny:this.zjhm.substr(6,8)})

        //this.zjhm = value
       /* if(!this.checkBirthday(this.zjhm)){
          this.$message.error("请先填写证件号码后在进行操作")
        }*/


      },
      getsfsxdx(value){
        if (value ==1 ) {
          let param = { zjhm:this.zjhm }
          if ((this.zjhm === null || this.zjhm === '' || this.zjhm === undefined)) {
            this.$message.error("请先填写证件号码后在进行操作")
          }
          else {
          getAction("khgl/vKhglKrkhgl/jtzcqk",param).then((res) => {
            if (res.result) {
            if (JSON.stringify(res.result) != "{}") {
              if(res.result.objet.zjhm&&res.result.objet.zjhm!=this.zjhm){
                this.$message.error("该客户户下已存在授信人:" + res.result.khmc + "证件号码:"+res.result.objet.zjhm+",如需操作请先去修改原授信人为否")
                this.form.setFieldsValue({sfsxdx:2})
                this.model.sfsxdx = 2
                this.sfsxdx = 2;
                this.sfdk =false;
              }else{
                this.form.setFieldsValue({sfsxdx:1})
                this.model.sfsxdx = 1
                this.sfsxdx = 1;
                this.sfdk =true;
              }
            }else {
              this.form.setFieldsValue({sfsxdx:1})
              this.model.sfsxdx = 1
              this.sfsxdx = 1;
              this.sfdk =true;
            }
            }
          })
        }
        }else {
          this.form.setFieldsValue({sfsxdx:2})
          this.model.sfsxdx = 2
          this.sfsxdx = 2;
          this.sfdk =false;
        }
      },

      getsfbz(value){
        this.ldzcsfbz=value;
        if (value== 2) {
          this.ldzcSfthyck = '2'
        }
      },
      getldzcSfthyck(value){
        this.ldzcSfthyck = value;
      }

    }
  }
</script>

<style scoped>
  .ant-form .ant-form-item {
    margin-bottom: 10px;
  }

</style>