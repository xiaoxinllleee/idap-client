<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
<div>
    <a-form :form="form">
      <a-divider orientation="left" style="color: #1890FF;">房产情况</a-divider>
      <a-card class="card" :bordered="false">
        <a-table bordered
             size="middle"
             :dataSource="this.dataSource"
             :columns="Cams_Zcsx_NhfxxxTable.columns"
              rowKey="id"
             :loading="loading"
             :pagination="ipagination"
        />
      </a-card>

      <a-divider orientation="left" style="color: #1890FF;">资产情况</a-divider>
      <a-card class="card" :bordered="false">
        <a-table size="middle"
             :pagination="false"
              rowKey="zclx"
             :dataSource="this.zcqkdataSource"
             :columns="Cams_Zcsx_NhzcqkTable.columns"/>
      </a-card>
      <a-divider orientation="left" style="color: #1890FF;">负债情况</a-divider>
      <a-card class="card" :bordered="false">
        <a-table size="middle"
             rowKey="jkfs"
             :pagination="false"
             :dataSource="this.fzqkdataSource"
             :columns="Cams_Zcsx_NhfzqkTable.columns"/>
      </a-card>

      <a-divider orientation="left" style="color: #1890FF;">总评打分</a-divider>
      <a-row class="form-row" :gutter="16">
        <a-col :lg="8">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="谈话综合素质">
            <span slot="label">谈话综合素质({{pjsxpfData.thzhszdf}}分):</span>
            <j-dict-select-tag  size="mini" style="width: 260px;" v-model="pjsxxxFormData.thzhsz" dictCode="shgl_thzhsz"/>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="当前经营项目从业时间">
            <span slot="label">当前经营项目从业时间({{pjsxpfData.dqjyxmcysjdf}}分):</span>
            <j-dict-select-tag  size="mini" style="width: 260px;" v-model="pjsxxxFormData.dqjyxmcysj" dictCode="shgl_dqjyxmcysj"/>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="经营证照齐全、合法性">
            <span slot="label">经营证照齐全、合法性({{pjsxpfData.jyzjqqhfxdf}}分):</span>
            <j-dict-select-tag  size="mini" style="width: 260px;" v-model="pjsxxxFormData.jyzjqqhfx" dictCode="shgl_jyzzqqhfx"/>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="银行贷款情况">
            <span slot="label">银行贷款情况({{pjsxpfData.yhdkqkdf}}分):</span>
            <j-dict-select-tag  size="mini" style="width: 260px;" v-model="pjsxxxFormData.yhdkqk" dictCode="shgl_yhdkqk"/>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="银行利息偿还记录">
            <span slot="label">银行利息偿还记录({{pjsxpfData.yhlxchjldf}}分):</span>
            <j-dict-select-tag  size="mini" style="width: 260px;" v-model="pjsxxxFormData.yhlxchjl" dictCode="shgl_yhlxchjl"/>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="经营创收能力">
            <span slot="label">经营创收能力({{pjsxpfData.jycsnldf}}分):</span>
            <j-dict-select-tag  size="mini" style="width: 260px;" v-model="pjsxxxFormData.jycsnl" dictCode="shgl_jycsnl"/>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="资产负债率">
            <span slot="label">资产负债率({{pjsxpfData.zcfzldf}}分):</span>
            <j-dict-select-tag  size="mini" style="width: 260px;" v-model="pjsxxxFormData.zcfzl" dictCode="shgl_zcfzl"/>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="自有资金占比">
            <span slot="label">自有资金占比({{pjsxpfData.zyzjzbdf}}分):</span>
            <j-dict-select-tag  size="mini" style="width: 260px;" v-model="pjsxxxFormData.zyzjzb" dictCode="shgl_zyzjzb"/>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="年收入增长率">
            <span slot="label">年收入增长率({{pjsxpfData.nsrzzldf}}分):</span>
            <j-dict-select-tag  size="mini" style="width: 260px;" v-model="pjsxxxFormData.nsrzzl" dictCode="shgl_nsrzzl"/>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="国家产业政策">
            <span slot="label">国家产业政策({{pjsxpfData.gjcyzcdf}}分):</span>
            <j-dict-select-tag  size="mini" style="width: 260px;" v-model="pjsxxxFormData.gjcyzc" dictCode="shgl_gjcyzc"/>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="对客户依赖度">
            <span slot="label">对客户依赖度({{pjsxpfData.dkhylddf}}分):</span>
            <j-dict-select-tag  size="mini" style="width: 260px;" v-model="pjsxxxFormData.dkhyld" dictCode="shgl_dkhyld"/>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="对供应商依赖度">
            <span slot="label">对供应商依赖度({{pjsxpfData.dgysylddf}}分):</span>
            <j-dict-select-tag  size="mini" style="width: 260px;" v-model="pjsxxxFormData.dgysyld" dictCode="shgl_dgysyld"/>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="综合竞争势力">
            <span slot="label">综合竞争势力({{pjsxpfData.zhjzsldf}}分):</span>
            <j-dict-select-tag  size="mini" style="width: 260px;" v-model="pjsxxxFormData.zhjzsl" dictCode="shgl_zhjzsl"/>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="与信用社往来时间">
            <span slot="label">与信用社往来时间({{pjsxpfData.yxyswlsjdf}}分):</span>
            <j-dict-select-tag  size="mini" style="width: 260px;" v-model="pjsxxxFormData.yxyswlsj" dictCode="shgl_yxyswlsj"/>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="人身保险">
            <span slot="label">人身保险({{pjsxpfData.rsbxdf}}分):</span>
            <j-dict-select-tag  size="mini" style="width: 260px;" v-model="pjsxxxFormData.rsbx" dictCode="ywbz"/>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="财产保险">
            <span slot="label">财产保险({{pjsxpfData.ccbxdf}}分):</span>
            <j-dict-select-tag  size="mini" style="width: 260px;" v-model="pjsxxxFormData.ccbx" dictCode="ywbz"/>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="总评得分小计">
            <a-input placeholder=""  v-model="pjsxxxFormData.zpdfxj" :disabled="true" style="width: 260px;">
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="家庭总资产">
            <a-input placeholder=""  v-model="pjsxxxFormData.jtzzc" :disabled="true" style="width: 260px;"></a-input>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="负债">
            <a-input placeholder=""  v-model="pjsxxxFormData.fz" :disabled="true" style="width: 260px;"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider orientation="left" style="color: #1890FF;">评级授信</a-divider>
      <a-row class="form-row" :gutter="16">
        <a-col :lg="8">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="系统测算等级">
            <a-input placeholder=""  v-model="pjsxxxFormData.xtcspddj" :disabled="true" style="width: 260px;"></a-input>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="系统测算授信额度">
            <a-input placeholder=""  v-model="pjsxxxFormData.xtcssxed" :disabled="true" style="width: 260px;"></a-input>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="等级调整事项">
            <a-input placeholder="请输入等级调整事项" v-model="pjsxxxFormData.djtzsx" style="width: 260px;"></a-input>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="调整后等级">
            <j-dict-select-tag placeholder="请选择调整后等级" style="width: 260px;" v-model="pjsxxxFormData.tzhdj" :triggerChange="true" dictCode="tzhdj"/>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户经理评定等级">
            <j-dict-select-tag placeholder="请选择客户经理评定等级" style="width: 260px;" v-model="pjsxxxFormData.khjlpddj" :triggerChange="true" dictCode="tzhdj"/>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="客户经理授信额度">
            <a-input placeholder="请输入客户经理授信额度" v-model="pjsxxxFormData.khjlsxed" style="width: 260px;"></a-input>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="最终评定等级">
            <j-dict-select-tag style="width: 260px;" placeholder="请选择最终评定等级" v-model="pjsxxxFormData.zzpddj" :triggerChange="true" dictCode="tzhdj"/>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="最终授信额度">
            <a-input placeholder="请输入最终授信额度" v-model="pjsxxxFormData.zzsxed" style="width: 260px;"></a-input>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注">
            <a-input placeholder="请输入最终授信额度" v-model="pjsxxxFormData.bz" style="width: 260px;"></a-input>
          </a-form-item>
        </a-col>
      </a-row>

    </a-form>
</div>
</template>

<script>
  import ARow from "ant-design-vue/es/grid/Row";
  import JSelectUserByDep from '@/components/jeecgbiz/JSelectUserByDep'
  import JDictSelectTag from '@/components/dict/JDictSelectTag'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JEllipsis from '@/components/jeecg/JEllipsis'
  import XEUtils from 'xe-utils'
  import pick from 'lodash.pick'


  export default {
    components: {
      ARow,JSelectUserByDep,JDictSelectTag,JEllipsis
    },
    name: 'glrxx',
    mixins: [JeecgListMixin],
    data() {
      return {
        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        validatorRules: {
        },
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8},
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        form: this.$form.createForm(this),
        dataSource:[],
        zcqkdataSource:[],
        fzqkdataSource:[],
        jyqkdataSource:[],
        pjsxpfData: {
          thzhszdf: 0,
          dqjyxmcysjdf: 0,
          jyzjqqhfxdf: 0,
          yhdkqkdf: 0,
          yhlxchjldf: 0,
          jycsnldf: 0,
          zcfzldf: 0,
          zyzjzbdf: 0,
          nsrzzldf: 0,
          gjcyzcdf: 0,
          dkhylddf: 0,
          dgysylddf: 0,
          zhjzsldf: 0,
          yxyswlsjdf: 0,
          rsbxdf: 0,
          ccbxdf: 0
        },
        pjsxxxFormData:{},
        refKeys: ['Jtxgqk'],
        activeKey: 'Jtxgqk',
        //家庭情况
          loading: false,
        // 房产情况
        Cams_Zcsx_NhfxxxTable : {
          columns: [
            {
              title: '房产位置',
              dataIndex: 'fcwz',
              key: 'fcwz',
              width: '10%',
              align: "center",
              scopedSlots: {customRender: 'fcwz'}
            },
            {
              title: '房产性质',
              dataIndex: 'fcxz',
              key: 'fcxz',
              width: '10%',
              align: "center",
              scopedSlots: {customRender: 'fcxz'}
            },
            {
              title: '房产面积(平方)',
              dataIndex: 'fcmj',
              key: 'fcmj',
              width: '20%',
              align: "center",
              scopedSlots: {customRender: 'fcmj'}
            },
            {
              title: '单价(元)',
              dataIndex: 'fcdj',
              key: 'fcdj',
              width: '10%',
              align: "center",
              scopedSlots: {customRender: 'fcdj'}
            },
            {
              title: '房产价值(元)',
              dataIndex: 'fcjz',
              key: 'fcjz',
              width: '10%',
              align: "center",
              scopedSlots: {customRender: 'fcjz'}
            },
            {
              title: '备注',
              dataIndex: 'bz',
              key: 'bz',
              width: '10%',
              align: "center",
              scopedSlots: {customRender: 'bz'}
            },

          ],
        },
        // 资产情况
        Cams_Zcsx_NhzcqkTable : {
          columns: [
            {
              title: '资产类型',
              dataIndex: 'zclx',
              key: 'zclx',
              width: '25%',
              align: "center",
              scopedSlots: {customRender: 'zclx'}
            },
            {
              title: '资产数量',
              dataIndex: 'zcsl',
              key: 'zcsl',
              width: '25%',
              align: "center",
              scopedSlots: {customRender: 'zcsl'}
            },
            {
              title: '资产价格(元)',
              dataIndex: 'zcjz',
              key: 'zcjz',
              width: '25%',
              align: "center",
              scopedSlots: {customRender: 'zcjz'}
            },
            {
              title: '资产说明',
              dataIndex: 'zcsm',
              key: 'zcsm',
              width: '25%',
              align: "center",
              scopedSlots: {customRender: 'zcsm'}
            },
          ],
        },
        // 负债情况
        Cams_Zcsx_NhfzqkTable : {
          columns: [
            {
              title: '借款方式',
              dataIndex: 'jkfs',
              key: 'jkfs',
              width: '25%',
              align: "center",
              scopedSlots: {customRender: 'jkfs'}
            },
            {
              title: '债权人',
              dataIndex: 'zqr',
              key: 'zqr',
              width: '25%',
              align: "center",
              scopedSlots: {customRender: 'zqr'}
            },
            {
              title: '借款金额(元)',
              dataIndex: 'jkje',
              key: 'jkje',
              width: '25%',
              align: "center",
              scopedSlots: {customRender: 'jkje'}
            },
            {
              title: '借款说明',
              dataIndex: 'jksm',
              key: 'jksm',
              width: '25%',
              align: "center",
              scopedSlots: {customRender: 'jksm'}
            },
          ],
        },
        // 经营情况
        Cams_Zcsx_NhjyqkTable : {
          columns: [
            {
              title: '项目类型',
              dataIndex: 'xmlx',
              key: 'xmlx',
              width: '25%',
              align: "center",
              scopedSlots: {customRender: 'xmlx'}
            },
            {
              title: '项目情况',
              dataIndex: 'xmqk',
              key: 'xmqk',
              width: '40%',
              align: "center",
              scopedSlots: {customRender: 'xmqk'}
            },
            {
              title: '项目净收入(元)',
              dataIndex: 'xmjsr',
              key: 'xmjsr',
              width: '35%',
              align: "center",
              scopedSlots: {customRender: 'xmjsr'}
            },
          ],
        },
        url: {
          list: "sh/vShxxgl/query",
        }
      }
    },
    watch: {
      'pjsxxxFormData.thzhsz'(val) {
        console.log('谈话综合素质')
        console.log(val)
        if(val == 1) {
          this.pjsxpfData.thzhszdf = 5
        } else if (val == 2) {
          this.pjsxpfData.thzhszdf = 2
        } else if (val == 3) {
          this.pjsxpfData.thzhszdf = 1
        }
      },
      'pjsxxxFormData.dqjyxmcysj'(val) {
        console.log('当前经营项目从业时间')
        console.log(val)
        if(val == 1) {
          this.pjsxpfData.dqjyxmcysjdf = 5
        } else if (val == 2) {
          this.pjsxpfData.dqjyxmcysjdf = 3
        } else if (val == 3) {
          this.pjsxpfData.dqjyxmcysjdf = 2
        } else {
          this.pjsxpfData.dqjyxmcysjdf = 0
        }
      },
      'pjsxxxFormData.jyzjqqhfx'(val) {
        console.log('经营证照齐全、合法性')
        console.log(val)
        if(val == 1) {
          this.pjsxpfData.jyzjqqhfxdf = 2
        } else {
          this.pjsxpfData.jyzjqqhfxdf = 0
        }
      },
      'pjsxxxFormData.yhdkqk'(val) {
        console.log('银行贷款情况')
        console.log(val)
        if(val == 1) {
          this.pjsxpfData.yhdkqkdf = 10
        } else if (val == 2) {
          this.pjsxpfData.yhdkqkdf = 8
        } else if (val == 3) {
          this.pjsxpfData.yhdkqkdf = 8
        } else if (val == 4) {
          this.pjsxpfData.yhdkqkdf = 3
        } else {
          this.pjsxpfData.yhdkqkdf = 0
        }
      },
      'pjsxxxFormData.yhlxchjl'(val) {
        console.log('银行利息偿还记录')
        console.log(val)
        if(val == 1) {
          this.pjsxpfData.yhlxchjldf = 10
        } else if (val == 2) {
          this.pjsxpfData.yhlxchjldf = 8
        } else if (val == 3) {
          this.pjsxpfData.yhlxchjldf = 8
        } else if (val == 4) {
          this.pjsxpfData.yhlxchjldf = 3
        } else {
          this.pjsxpfData.yhlxchjldf = 0
        }
      },
      'pjsxxxFormData.jycsnl'(val) {
        console.log('经营创收能力')
        console.log(val)
        if(val == 1) {
          this.pjsxpfData.jycsnldf = 5
        } else if (val == 2) {
          this.pjsxpfData.jycsnldf = 2
        } else {
          this.pjsxpfData.jycsnldf = 0
        }
      },
      'pjsxxxFormData.zcfzl'(val) {
        console.log('资产负债率')
        console.log(val)
        if(val == 1) {
          this.pjsxpfData.zcfzldf = 10
        } else if (val == 2) {
          this.pjsxpfData.zcfzldf = 7
        } else if (val == 3) {
          this.pjsxpfData.zcfzldf = 4
        } else if (val == 4) {
          this.pjsxpfData.zcfzldf = 1
        } else {
          this.pjsxpfData.zcfzldf = 0
        }
      },
      'pjsxxxFormData.zyzjzb'(val) {
        console.log('自有资金占比')
        console.log(val)
        if(val == 1) {
          this.pjsxpfData.zyzjzbdf = 10
        } else if (val == 2) {
          this.pjsxpfData.zyzjzbdf = 8
        } else if (val == 3) {
          this.pjsxpfData.zyzjzbdf = 3
        }
      },
      'pjsxxxFormData.nsrzzl'(val) {
        console.log('年收入増长率')
        console.log(val)
        if(val == 1) {
          this.pjsxpfData.nsrzzldf = 10
        } else if (val == 2) {
          this.pjsxpfData.nsrzzldf = 5
        } else if (val == 3) {
          this.pjsxpfData.nsrzzldf = 3
        }
      },
      'pjsxxxFormData.gjcyzc'(val) {
        console.log('国家产业政策')
        console.log(val)
        if(val == 1) {
          this.pjsxpfData.gjcyzcdf = 3
        } else if (val == 2) {
          this.pjsxpfData.gjcyzcdf = 1
        } else if (val == 3) {
          this.pjsxpfData.gjcyzcdf = 0
        }
      },
      'pjsxxxFormData.dkhyld'(val) {
        console.log('对客户依赖度')
        console.log(val)
        if(val == 1) {
          this.pjsxpfData.dkhylddf = 2
        } else if (val == 2) {
          this.pjsxpfData.dkhylddf = 4
        } else if (val == 3) {
          this.pjsxpfData.dkhylddf = 7
        }
      },
      'pjsxxxFormData.dgysyld'(val) {
        console.log('对供应商依赖度')
        console.log(val)
        if(val == 1) {
          this.pjsxpfData.dgysylddf = 2
        } else if (val == 2) {
          this.pjsxpfData.dgysylddf = 4
        } else if (val == 3) {
          this.pjsxpfData.dgysylddf = 5
        }
      },
      'pjsxxxFormData.zhjzsl'(val) {
        console.log('综合竞争势力')
        console.log(val)
        if(val == 1) {
          this.pjsxpfData.zhjzsldf = 10
        } else if (val == 2) {
          this.pjsxpfData.zhjzsldf = 5
        } else if (val == 3) {
          this.pjsxpfData.zhjzsldf = 0
        }
      },
      'pjsxxxFormData.yxyswlsj'(val) {
        console.log('与信用社往来时间')
        console.log(val)
        if(val == 1) {
          this.pjsxpfData.yxyswlsjdf = 4
        } else if (val == 2) {
          this.pjsxpfData.yxyswlsjdf = 2
        } else if (val == 3) {
          this.pjsxpfData.yxyswlsjdf = 0
        }
      },
      'pjsxxxFormData.rsbx'(val) {
        console.log('人身保险')
        console.log(val)
        if(val == 1) {
          this.pjsxpfData.rsbxdf = 2
        } else {
          this.pjsxpfData.rsbxdf = 0
        }
      },
      'pjsxxxFormData.ccbx'(val) {
        console.log('财产保险')
        console.log(val)
        if(val == 1) {
          this.pjsxpfData.ccbxdf = 2
        } else {
          this.pjsxpfData.ccbxdf = 0
        }
      },
     /* pjsxpfData : {
        handler(val1,val2) {
          console.log("this.pjsxpfData")
          console.log(this.pjsxpfData)
          this.computeSxed()
        },
        deep: true
      }*/

    },

    methods: {
      //计算授信额度
      computeSxed() {
        console.log('计算授信额度')
        let dfhj = XEUtils.sum(this.pjsxpfData)
        let djxs = 0
        this.pjsxxxFormData.zpdfxj = dfhj
        //TODO 通过参数表配置
        if (dfhj >= 90) {
          this.pjsxxxFormData.xtcspddj = '一级'
          djxs = 0.9
        } else if (dfhj >= 75) {
          this.pjsxxxFormData.xtcspddj = '二级'
          djxs = 0.7
        } else if (dfhj >= 60) {
          this.pjsxxxFormData.xtcspddj = '三级'
          djxs = 0.5
        } else {
          this.pjsxxxFormData.xtcspddj = '四级'
          djxs = 0
        }

        let data = [this.fcxxZchj, this.zcqkHj]
        let zchj = XEUtils.sum(data)
        console.log(data)
        let shjzc = XEUtils.subtract(zchj, this.fzqkHj) //商户净资产
        //系统测算授信额度 = 商户净资产 * 等级系数
        this.$set(this.pjsxxxFormData, 'xtcssxed', XEUtils.multiply(shjzc, djxs))
        // this.pjsxxxFormData.xtcssxed = XEUtils.multiply(shjzc, djxs)
      },

      add(){
        var that = this
        that.dataSource =[];
      },


    }
  }
</script>

<style lang="less" scoped>
  .ant-form .ant-form-item {
    margin-bottom: 10px;
  }

</style>