<template>
  <a-modal
    :title="title"
    width="80%"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-tabs defaultActiveKey="1" >
      <a-tab-pane tab="任务创建" key="1">
        <a-spin :spinning="confirmLoading">
          <a-form :form="form" ref="form" :selfUpdate='true'>
            <a-row>
              <a-col :span="8">
                <a-form-item   :labelCol="labelCol"
                               :wrapperCol="wrapperCol"
                               label="任务类型">
                  <j-dict-select-tag   v-decorator="['rwlx', validatorRules.rwlx]"  @change="rwlxChange"  :triggerChange="true"  placeholder="请选择任务类型"  dictCode="marketing_type1" />
                </a-form-item>
              </a-col>
              <a-col :span="8" v-show="this.rwlx!=3 && this.qybm!='420'" >
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="任务名称">
                  <a-input   placeholder="请输入任务名称" v-decorator="['title', this.rwlx==3 && this.qybm!='420'?{}:validatorRules.title]" />
<!--                  <j-dict-select-tag   v-show="this.rwlx==3" v-decorator="['title', validatorRules.title]" :triggerChange="true" placeholder="请选择任务名称"
                                     dictCode="rwmc" />-->
                </a-form-item>
              </a-col>
              <a-col :span="8" v-show="this.qybm=='420'" >
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="任务名称">
                  <a-input   placeholder="请输入任务名称" v-decorator="['title',validatorRules.title]" />
                  <!--                  <j-dict-select-tag   v-show="this.rwlx==3" v-decorator="['title', validatorRules.title]" :triggerChange="true" placeholder="请选择任务名称"
                                                       dictCode="rwmc" />-->
                </a-form-item>
              </a-col>
              <a-col :span="8" v-show="this.rwlx!=3" >
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="营销类型">
                  <j-dict-select-tag v-decorator="['marketingType', this.rwlx==3?{}:validatorRules.marketingType]" :triggerChange="true" placeholder="请选择营销类型"
                                     dictCode="marketing_type" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="开始时间">
                  <a-date-picker v-decorator="[ 'startTime', validatorRules.startTime]" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="结束时间">
                  <a-date-picker v-decorator="[ 'endTime',validatorRules.endTime]" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="优先级">
                  <j-dict-select-tag v-decorator="['yxj', validatorRules.yxj]" :triggerChange="true" placeholder="请选择优先级"
                                     dictCode="yxj" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row   v-show="this.rwlx==3 && this.qybm!='420'" >
              <a-col :span="8"  >
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="自主下发任务数">
                  <a-input-number placeholder="自主下发任务数"  v-decorator="[ 'zzxfrws',this.rwlx==3 && this.qybm!='420'?validatorRules.zzxfrws:{}]"
                                  style="width: 40%; text-align: center" :min="0" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="失败任务回收">
                  <a-input-number placeholder="失败任务回收"  v-decorator="[ 'sbrwhs',this.rwlx==3 && this.qybm!='420'?validatorRules.sbrwhs:{}]"
                                  style="width: 40%; text-align: center" :min="0" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="失败任务重发">
                  <a-input-number placeholder="时间间隔"  v-decorator="[ 'sbrwcf',this.rwlx==3 && this.qybm!='420'?validatorRules.sbrwhs:{}]"
                                  style="width: 40%; text-align: center" :min="0" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row   v-show="this.rwlx==3 && this.qybm!='420'" >
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="不做处理任务回收">
                  <a-input-number placeholder="不做处理任务回收"  v-decorator="[ 'bzclrwhs',this.rwlx==3 && this.qybm!='420'?validatorRules.bzclrwhs:{}]"
                                  style="width: 40%; text-align: center" :min="0" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="不做处理任务重发">
                  <a-input-number placeholder="时间间隔"  v-decorator="[ 'bzclrwcf',this.rwlx==3 && this.qybm!='420'?validatorRules.bzclrwcf:{}]"
                                  style="width: 40%; text-align: center" :min="0" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="成功任务回收">
                  <a-input-number placeholder="成功任务回收"  v-decorator="[ 'cgrwhs',this.rwlx==3 && this.qybm!='420'?validatorRules.cgrwhs:{}]"
                                  style="width: 40%; text-align: center" :min="0" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="成功任务重发">
                  <a-input-number placeholder="时间间隔"  v-decorator="[ 'cgrwcf',this.rwlx==3 && this.qybm!='420'?validatorRules.cgrwcf:{}]"
                                  style="width: 40%; text-align: center" :min="0" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-radio-group name="radioGroup" :default-value="1" v-model="radioValue" @change="radioChange">
                  <a-radio :value="1">
                    所有支行
                  </a-radio>
                  <a-radio :value="2">
                    选择支行
                  </a-radio>
                  <a-radio :value="3"  v-show="this.rwlx==3" >
                    按个人
                  </a-radio>
                  <a-radio :value="4"  v-show="this.rwlx==3" >
                    系统默认
                  </a-radio>
                </a-radio-group>
              </a-col>
              <a-col :span="6"   v-show="showflag">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="指定支行">
                  <j-select-zzbz  :trigger-change="true"  @ok="zzbzChange"   customReturnField="departName"></j-select-zzbz>
                </a-form-item>
              </a-col>

              <a-col :span="6"   v-show="showYgxxflag">
                <a-form-item :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             label="指定员工">
                  <j-select-ygxx ref="zkhjl" :treeDefaultExpandAll="true" v-model="zygkhjlname"  @change="GetValueZkhjl"/>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>

          <a-divider>自定义名单筛选</a-divider>
          <a-card :bordered="false" v-show="this.rwlx==1">
            <!-- 查询区域 -->
            <div class="table-page-search-wrapper">
              <a-form layout="inline" @keyup.enter.native="searchQuery">
                <a-row :gutter="24">
                  <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="原机构">
                      <j-tree-select placeholder="请选择所属支行" v-model="queryParam.zzbz"
                                     dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                                     :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true"
                                     :isAll="true"/>
                    </a-form-item>
                  </a-col>
                  <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="网格所属支行">
                      <j-tree-select placeholder="请选择所属支行" v-model="queryParam.hjsszh"
                                     dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                                     :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true"
                                     :isAll="true"/>
                    </a-form-item>
                  </a-col>
                  <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="客户名称">
                      <a-input placeholder="请输入客户名称" v-model="queryParam.custName"></a-input>
                    </a-form-item>
                  </a-col>

                  <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="证件号码">
                      <a-input placeholder="请输入证件号码" v-model="queryParam.identNo"></a-input>
                    </a-form-item>
                  </a-col>

                  <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="归属网格">
                      <a-tree-select
                        :treeData=sswgTreeDateoptions
                        :replaceFields=replaceFields
                        v-model="queryParam.hjszwg"
                        :dropdownStyle="{maxHeight:'400px',overflow:'auto'}"
                        showSearch
                        treeNodeFilterProp="title"
                      >
                      </a-tree-select>
                    </a-form-item>
                  </a-col>

                  <a-col :xl="6" :lg="7" :md="8" :sm="24">
                <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                  <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                  <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
                </span>
                  </a-col>
                </a-row>
              </a-form>
            </div>


            <!-- table区域-begin -->
            <div>
              <a-table
                :scroll="{ x: 1500, y: 300 }"
                ref="table"
                size="middle"
                bordered
                :rowKey="rowKey"
                :columns="columns"
                :dataSource="dataSource"
                :pagination="ipagination"
                :loading="loading"
                @change="handleTableChange">
        <span slot="action" slot-scope="text, record">

        </span>

              </a-table>
            </div>

          </a-card>

          <a-card :bordered="false" v-show="this.rwlx==2">
            <!-- 查询区域 -->
            <div class="table-page-search-wrapper">
              <a-form layout="inline" @keyup.enter.native="searchQuery">
                <a-row :gutter="24">
                  <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="归属网格">
                      <!--<JTreeSelectNotJg placeholder="请选择归属网格"-->
                      <!--v-model="queryParam.wgbh"-->
                      <!--treeNodeFilterProp="title"-->
                      <!--pidField="PARENT_ID"-->
                      <!--dict="YXDYGL_MAIN,WGMC,ID"-->
                      <!--pidValue="0"-->
                      <!--:showSearch="true"-->
                      <!--:treeDefaultExpandAll="true"/>-->
                      <a-tree-select
                        :treeData=sswgTreeDateoptions
                        :replaceFields=replaceFields
                        v-model="queryParam.wgbh"
                        :dropdownStyle="{maxHeight:'400px',overflow:'auto'}"
                        showSearch
                        treeNodeFilterProp="title"
                      >
                      </a-tree-select>
                    </a-form-item>
                  </a-col>
<!--                  <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="客户类型">
                      <j-dict-select-tag v-model="queryParam.khlx" placeholder="请选择客户类型" dictCode="xtpdjg" allowClear />
                    </a-form-item>
                  </a-col>-->
                  <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="存款客户">
                      <j-dict-select-tag v-model="queryParam.sfckkh" placeholder="请选择存款客户" dictCode="sfbz" allowClear />
                    </a-form-item>
                  </a-col>

                  <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="存款区间">
                      <a-input-number v-model="queryParam.ckje_begin"></a-input-number>
                      -
                      <a-input-number v-model="queryParam.ckje_end"></a-input-number>
                    </a-form-item>
                  </a-col>

                  <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="贷款客户">
                      <j-dict-select-tag v-model="queryParam.sfdkkh" placeholder="请选择贷款客户" dictCode="sfbz" allowClear />
                    </a-form-item>
                  </a-col>

                  <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="贷款区间">
                      <a-input-number v-model="queryParam.dkje_begin"></a-input-number>
                      -
                      <a-input-number v-model="queryParam.dkje_end"></a-input-number>
                    </a-form-item>
                  </a-col>

                  <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="社保卡客户">
                      <j-dict-select-tag v-model="queryParam.sfblsbk" placeholder="请选择社保卡客户" dictCode="sfbz" allowClear />
                    </a-form-item>
                  </a-col>

                  <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="手机银行客户">
                      <j-dict-select-tag v-model="queryParam.sfktsjyhyw" placeholder="请选择手机银行客户" dictCode="sfbz"
                                         allowClear />
                    </a-form-item>
                  </a-col>

                  <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="客户年龄">
                      <a-input-number v-model="queryParam.nl_begin"></a-input-number>
                      -
                      <a-input-number v-model="queryParam.nl_end"></a-input-number>
                    </a-form-item>
                  </a-col>

                  <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                      <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                      <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
                    </span>
                  </a-col>
                </a-row>
              </a-form>
            </div>


            <!-- table区域-begin -->
            <div>
              <a-table
                :scroll="{ x: 1500, y: 300 }"
                ref="table"
                size="middle"
                bordered
                :rowKey="rowKey"
                :columns="columns"
                :dataSource="dataSource"
                :pagination="ipagination"
                :loading="loading"
                @change="handleTableChange">
        <span slot="action" slot-scope="text, record">

        </span>

              </a-table>
            </div>

          </a-card>

          <a-card :bordered="false" v-show="this.rwlx==3">
            <!-- 查询区域 -->
            <div class="table-page-search-wrapper">
              <a-form layout="inline" @keyup.enter.native="searchQuery">
                <a-row :gutter="24">
                  <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="任务名称">
                      <j-dict-select-tag placeholder='请选择任务名称' v-model='queryParam.rwmc' dict-code='rwmc'></j-dict-select-tag>
                    </a-form-item>
                  </a-col>
                  <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="所属支行">
                      <j-tree-select placeholder="请选择所属支行" v-model="queryParam.sszh"
                                     dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                                     :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true"
                                     :isAll="true"/>
                    </a-form-item>
                  </a-col>
                  <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="归属网格">
                      <a-tree-select
                        :treeData=sswgTreeDateoptions
                        :replaceFields=replaceFields
                        v-model="queryParam.sswg"
                        :dropdownStyle="{maxHeight:'400px',overflow:'auto'}"
                        showSearch
                        treeNodeFilterProp="title"
                      >
                      </a-tree-select>
                    </a-form-item>
                  </a-col>
                  <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="业务所属支行">
                      <j-tree-select placeholder="请选择业务所属支行" v-model="queryParam.ywsszh"
                                     dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                                     :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true"
                                     :isAll="true"/>
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
                  <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
                </span>
                  </a-col>
                </a-row>
              </a-form>
            </div>


            <!-- table区域-begin -->
            <div>
              <a-table
                :scroll="{ x: 1500, y: 300 }"
                ref="table"
                size="middle"
                bordered
                :rowKey="rowKey"
                :columns="columns"
                :dataSource="dataSource"
                :pagination="ipagination"
                :loading="loading"
                @change="handleTableChange">
        <span slot="action" slot-scope="text, record">

        </span>

              </a-table>
            </div>

          </a-card>

        </a-spin>
      </a-tab-pane>

    </a-tabs>

  </a-modal>
</template>

<script>
import { httpAction ,getAction,putAction} from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import JSelectZzbz from '@/components/jeecgbiz/JSelectZzbz'
import JSelectYgxx from '@/components/jeecgbiz/JSelectYgxx'
import store from '@/store/'

export default {
  name: 'taskCreateModal',
  components: {
    JTreeSelect,JSelectZzbz,JSelectYgxx
  },
  mixins: [JeecgListMixin],
  data () {
    return {
      rwlx:1,
      dxlx:'1',
      dxid:'',
      showflag:false,
      showYgxxflag:false,
      title: '操作',
      zygkhjlname:'',
      zygkhjlzh:'',
      radioValue:1,
      visible: false,
      model: {},
      sswgTreeDateoptions: [],
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },

      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {
        title: { rules: [{ required: true, message: '请输入任务名称!' }] },
        marketingType: { rules: [{ required: true, message: '请输入营销类型!' }] },
        rwlx: { rules: [{ required: true, message: '请选择任务类型!' }] },
        yxj: { rules: [{ required: true, message: '请选择优先级!' }] },
        startTime: { rules: [{ required: true, message: '请输入选择开始时间!' }] },
        endTime: { rules: [{ required: true, message: '请输入选择结束时间!' }] },
        zzxfrws:{rules: [{ required: true, message: '请设置自主下发任务数!' }]},
        sbrwhs:{rules: [{ required: true, message: '请设置失败任务回收天数!' }]},
        sbrwcf:{rules: [{ required: true, message: '请设置失败任务回收天数!' }]},

        bzclrwhs:{rules: [{ required: true, message: '请设置不做处理任务回收天数!' }]},
        bzclrwcf:{rules: [{ required: true, message: '请设置不做处理任务回收天数!' }]},

        cgrwhs:{rules: [{ required: true, message: '请设置成功任务回收天数!' }]},
        cgrwcf:{rules: [{ required: true, message: '请设置成功任务回收天数!' }]},

      },
      url: {
        list: '',
        listDklsh: "/dklshcmmon/dklsh/list",
        listnhxq: '/rwmxjs/eczfSjGlmx/list',
        listZzrwmx:'/zzrw/taskZzrwsjb/list',
        add: '/rwcj/taskCreate/add',
        edit: '/rwcj/taskCreate/edit'
      },
      columns:[],
      nhxxcolumns: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function (t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '归属网格',
          align: 'center',
          width: 100,
          dataIndex: 'wgbh_dictText'
        },
        {
          title: '归属机构',
          align: 'center', width: 100,
          dataIndex: 'jgdm_dictText'
        },
        {
          title: '客户类型',
          align: 'center', width: 100,
          dataIndex: 'xtpdjg_dictText'
        },
        {
          title: '户号编码',
          align: 'center', width: 100,
          dataIndex: 'hhbm'
        },
        {
          title: '姓名',
          align: 'center', width: 100,
          dataIndex: 'khmc',
          scopedSlots: { customRender: 'detail' }
        },
        {
          title: '证件号码',
          align: 'center', width: 100,
          dataIndex: 'zjhm'
        },
        {
          title: '民族',
          align: 'center', width: 100,
          dataIndex: 'mz_dictText'
        },
        {
          title: '婚姻状况',
          align: 'center', width: 100,
          dataIndex: 'hyzk_dictText'
        },
        {
          title: '户口性质',
          align: 'center', width: 100,
          dataIndex: 'hkxz_dictText'
        },
        {
          title: '与户主关系',
          align: 'center', width: 100,
          dataIndex: 'yhzgx_dictText'
        },
        {
          title: '文化程度',
          align: 'center', width: 100,
          dataIndex: 'whcd_dictText'
        },
        {
          title: '职业',
          align: 'center',
          dataIndex: 'cshygz_dictText', width: 200
        },
        {
          title: '联系方式',
          align: 'center', width: 100,
          dataIndex: 'sjhm'
        },
        {
          title: '户籍地址',
          align: 'center', width: 100,
          dataIndex: 'hjdz'
        },
        {
          title: '常住地址',
          align: 'center', width: 100,
          dataIndex: 'zz'
        },
        {
          title: '备注',
          align: 'center', width: 100,
          dataIndex: 'bz'
        },
        {
          title: '原所属乡镇',
          align: 'center', width: 100,
          dataIndex: 'yssxz'
        },
        {
          title: '原行政村',
          align: 'center', width: 100,
          dataIndex: 'yxzc'
        }
      ],
      dklshcolumns: [
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
          title: '原支行',
          align:"center",
          dataIndex: 'zzbz_dictText'
        },


        {
          title: '客户名称',
          align:"center",
          dataIndex: 'custName',
          scopedSlots: { customRender: 'detail' }
        },

        {
          title: '证件号码',
          align:"center",
          dataIndex: 'identNo'
        },
        {
          title: '电话号码',
          align:"center",
          dataIndex: 'dhhm'
        },
        {
          title: '合同号',
          align:"center",
          dataIndex: 'hth'
        },
        {
          title: '合同金额',
          align:"center",
          dataIndex: 'htje'
        },
        {
          title: '合同起始日期',
          align:"center",
          dataIndex: 'htqsrq'
        },
        {
          title: '合同到期日期',
          align:"center",
          dataIndex: 'htdqrq'
        },
        {
          title: '签约日期',
          align:"center",
          dataIndex: 'qyrq'
        },
        {
          title: '原担保方式',
          align:"center",
          dataIndex: 'dbfs_dictText'
        },
        {
          title: '借款原因',
          align:"center",
          dataIndex: 'jkyy'
        },
        {
          title: '第一责任人',
          align:"center",
          dataIndex: 'dyzrr'
        },

        {
          title: '客户类型',
          align:"center",
          dataIndex: 'khlx_dictText'
        },

        {
          title: '户籍所在网格',
          align:"center",
          dataIndex: 'hjszwg_dictText'
        },
        {
          title: '户籍所属支行',
          align:"center",
          dataIndex: 'hjsszh_dictText'
        },

        /*{
          title: '操作',
          dataIndex: 'action',
          align:"center",
          scopedSlots: { customRender: 'action' },
          width: 60
        }*/
      ],

      zzrwmxcolumns: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '任务名称',
          align: 'center',
          dataIndex: 'rwmc'
        },
        {
          title: '所属支行',
          align: 'center',
          dataIndex: 'sszh_dictText'
        },
        {
          title: '所属网格',
          align: 'center',
          dataIndex: 'sswg_dictText'
        },
        {
          title: '业务所属支行',
          align: 'center',
          dataIndex: 'ywsszh_dictText'
        },
        {
          title: '客户名称',
          align: 'center',
          dataIndex: 'khmc'
        },
        {
          title: '证件号码',
          align: 'center',
          dataIndex: 'zjhm'
        },
        {
          title: '联系方式',
          align: 'center',
          dataIndex: 'lxfs'
        },
        {
          title: '客户类型',
          align: 'center',
          dataIndex: 'khlx_dictText'
        },
        {
          title: '客户类型2',
          align: 'center',
          dataIndex: 'khlx2_dictText'
        },
        {
          title: '客户等级',
          align: 'center',
          dataIndex: 'khdj_dictText'
        },
      ],
      qybm:'',
    }
  },
  created() {
    this.isAll = store.getters.isRoot;
    this.sszh = store.getters.userInfo.orgCode;
    this.qybm = store.getters.qybm
    getAction('/yxdyglmain/yxdyglMain/getWgxxTreeDateBySskhjl', {wgxz: '6', wgxzType: '2'}).then(res => {
      if (res.success) {
        this.sswgTreeDateoptions = res.result
      }
    })
  },
  methods: {
    rwlxChange(val){
      this.rwlx=val;
      this.queryParam.rwlx=val;
      if(val==1){
        this.columns=this.dklshcolumns;
        this.url.list= this.url.listDklsh
        console.log(this.url.list)
      }else if(val==2){
        this.columns=this.nhxxcolumns;
        this.url.list= this.url.listnhxq
      }else if(val==3){
        this.columns=this.zzrwmxcolumns;
        this.url.list= this.url.listZzrwmx
      }
    },
    radioChange(e){
      if(e.target.value==1){
        this.showflag=false;
        this.dxlx=1;
        this.showYgxxflag=false;
      }else if(e.target.value==2){
        this.showflag=true;
        this.dxlx=1;
        this.showYgxxflag=false;
      }else if(e.target.value==3){
        this.dxlx=3;
        this.showflag=false;
        this.showYgxxflag=true;
      }else if(e.target.value==4){
        this.dxlx=0;
        this.showflag=false;
        this.showYgxxflag=false;
      }
      console.log('radio1 checked', e.target.value);    },
    add () {
      this.edit({})
    },

    edit (record) {
      this.dataSource = []
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'title', 'marketingType', 'status','rwlx','dxlx','yxj'))
        //时间格式化
        this.form.setFieldsValue({ startTime: this.model.startTime ? moment(this.model.startTime) : null })
        this.form.setFieldsValue({ endTime: this.model.endTime ? moment(this.model.endTime) : null })
      })

    },
    GetValueZkhjl(value){
      console.log(value.yggh)
      this.zygkhjlzh=value.yggh;
      this.zygkhjlname=value.ygxm;
      this.dxid=value.yggh;
    },
    close () {
      this.$emit('close')
      this.queryParam={};
      this.visible = false
    },
    zzbzChange(val){
      console.log(val)
      this.dxid=val;
      console.log(this.dxid)
    },

    handleOk () {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          //校验参数
          if (that.dataSource.length == 0) {
            that.errorInfo('请筛选名单')
            return
          }

          if(that.radioValue==2&!that.dxid){
            that.errorInfo('请选择任务接收支行');
            return
          }
          if(that.radioValue==3&!that.dxid){
            that.errorInfo('请选择任务接收员工');
            return
          }
          if(that.radioValue==1){
            that.dxid=1;
          }
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          if (!this.model.id) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          this.model.taskCreateQuery = this.queryParam
          this.model.dklshjTaskCreateQuery = this.queryParam
          let formData = Object.assign(this.model, values,{rwlx:this.rwlx,dxlx:this.dxlx,dxid:this.dxid})
          //时间格式化
          formData.startTime = formData.startTime ? formData.startTime.format() : null
          formData.endTime = formData.endTime ? formData.endTime.format() : null

          console.log(formData)
          httpAction(httpurl, formData, method).then((res) => {
            if (res.success) {
              that.$message.success(res.message)
              that.$emit('ok')
            } else {
              that.$message.warning(res.message)
            }
          }).finally(() => {
            that.confirmLoading = false
            that.close()
          })

        }
      })
    },
    handleCancel () {
      this.close()
    },
    searchReset () {
      this.queryParam = {rwlx:this.rwlx}
      this.beforeSearchQuery()
      this.loadData(1)
    },

  }
}
</script>

<style lang="less" scoped>
.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }

  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }

  .ant-modal-body {
    flex: 1;
  }
}
</style>