<template>
  <a-modal :title="title"
           :width="1500"
           :visible="visible"
           :confirmLoading="confirmLoading"
           :keyboard="false"
           :maskClosable="false"
           @ok="handleOk"
           @cancel="handleCancel"
           okText="保存"
           cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-card :bordered="true" v-if="show">
          <a-divider style="font-size: 12pt;color: #398BF2">请选择需要转移的存款账号</a-divider>
          <a-table bordered
                   ref="tableOne"
                   rowKey="key"
                   size="small"
                   :pagination="false"
                   :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                   :columns="columnsOne"
                   :data-source="dataSourceOne">
            <template slot="glbl" slot-scope="text, record">
              <editable-cell :text="text" @change="onCellChange(record.key, 'glbl', $event)" />
            </template>
          </a-table>
        </a-card>

        <a-card :bordered="true" v-if="!show">
          <a-divider style="font-size: 12pt;color: #398BF2">待转移账号</a-divider>
          <a-row class="form-row" :gutter="24">
            <a-col :span="6">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="组织标识">
                <a-input placeholder="组织标识" v-model="dataSourceTwo.zzbz" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="组织名称">
                <a-input placeholder="组织名称" v-model="dataSourceTwo.zzmc" disabled/>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="岗位标识">
                <a-input placeholder="岗位标识" v-model="dataSourceTwo.gwbz" disabled/>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="岗位名称">
                <a-input placeholder="岗位名称" v-model="dataSourceTwo.gwmc" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :span="6">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="员工工号">
                <a-input placeholder="员工工号" v-model="dataSourceTwo.yggh" disabled/>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="员工姓名">
                <a-input placeholder="员工姓名" v-model="dataSourceTwo.name" disabled/>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item :labelCol="{xs: { span: 24 },sm: { span: 7 }}" :wrapperCol="{xs: { span: 24 },sm: { span: 14 }}" label="客户经理标识">
                <a-input placeholder="客户经理标识" v-model="dataSourceTwo.khjlbz" disabled/>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item :labelCol="{xs: { span: 24 },sm: { span: 7 }}" :wrapperCol="{xs: { span: 24 },sm: { span: 14 }}" label="待转移账号数">
                <a-input placeholder="待转移账号数" v-model="dataSourceTwo.rowCount" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-card :bordered="true">
          <a-divider style="font-size: 12pt;color: #398BF2">请选择转移的员工</a-divider>
          <a-row class="form-row" :gutter="24">
            <a-col :span="6">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="员工工号">
                <a-input placeholder="员工工号" v-model="dataSourceThree.yggh" disabled/>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="员工姓名">
                <a-input placeholder="员工姓名" v-model="dataSourceThree.ygxm" hidden/>
                <j-select-ygxx placeholder="请选择员工" ref="ygxm" v-model="dataSourceThree.ygxm"
                               @change="EmpInfoFeedBack" :treeDefaultExpandAll="true"/>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="组织标识">
                <a-input placeholder="组织标识" v-model="dataSourceThree.zzbz" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="组织名称">
                <a-input placeholder="组织名称" v-model="dataSourceThree.zzmc" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :span="6">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="岗位标识">
                <a-input placeholder="岗位标识" v-model="dataSourceThree.gwbz" disabled/>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="岗位名称">
                <a-input placeholder="岗位名称" v-model="dataSourceThree.gwmc" disabled/>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item :labelCol="{xs: { span: 24 },sm: { span: 7 }}" :wrapperCol="{xs: { span: 24 },sm: { span: 14 }}" label="客户经理标识">
                <a-input placeholder="客户经理标识" v-model="dataSourceThree.khjlbz" disabled/>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="柜员号">
                <a-input placeholder="柜员号" v-model="dataSourceThree.gyh" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-card :bordered="true" v-if="show">
          <a-divider style="font-size: 12pt;color: #398BF2">已添加的转移信息</a-divider>
          <p style="text-align: center"><a-button type="primary" style="margin: 0px 0px 15px 0px" @click="addTransferInfo">添加</a-button></p>
          <a-table bordered
                   ref="tableTwo"
                   size="small"
                   :pagination="false"
                   :columns="columnsTwo"
                   :data-source="dataSourceFour">
            <span slot="action" slot-scope="text, record">
              <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.key)">
                <a>删除</a>
              </a-popconfirm>
            </span>
          </a-table>
        </a-card>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import JSelectYgxx from "../plugin/JSelectYgxx"
  import moment from 'moment'
  import {postAction} from "../../../../../api/manage";

  const EditableCell = {
    template: `
      <div class="editable-cell">
        <div v-if="editable" class="editable-cell-input-wrapper">
          <a-input-number :value="value" @change="handleChange" @pressEnter="check" :min="0"/>
          <a-icon type="check" class="editable-cell-icon-check" @click="check" style="color: #FC1944" />
        </div>
        <div v-else class="editable-cell-text-wrapper">
          {{ value || ' ' }}
          <a-icon type="edit" class="editable-cell-icon" @click="edit" style="color: #FC1944" />
        </div>
      </div>
    `,
    props: {
      text: String,
    },
    data() {
      return {
        value: this.text,
        editable: false,
      };
    },
    methods: {
      handleChange(e) {
        const value = e;
        this.value = value+'';
        console.info('`关联比率`输入框值发生改变:e, value, this.value', e, value, this.value)
      },
      check() {
        this.editable = false;
        this.$emit('change', this.value);
      },
      edit() {
        this.editable = true;
      },
    },
  }

  export default {
    name: "CkzhTransferModal",
    components: {
      JSelectYgxx,
      EditableCell,
      moment
    },
    data() {
      return {
        title: '转移存款账号关联信息',
        visible: false,
        confirmLoading: false,
        show: false,
        model: {},
        form: this.$form.createForm(this),
        selectedRowKeys: [],
        selectedRecords: [],
        dataSourceOne: [],
        columnsOne: [
          {
            title: '账号',
            align: 'center',
            dataIndex: 'ckzh',
            width: 150
          },
          {
            title: '账号名称',
            align: 'center',
            dataIndex: 'zhmc',
            width: 100
          },
          {
            title: '账号性质',
            align: 'center',
            dataIndex: 'zhxz_dictText',
            width: 100
          },
          {
            title: '组织名称',
            align: 'center',
            dataIndex: 'zzmc',
            width: 100
          },
          {
            title: '岗位名称',
            align: 'center',
            dataIndex: 'gwmc',
            width: 100
          },
          {
            title: '工号',
            align: 'center',
            dataIndex: 'yggh',
            width: 100
          },
          {
            title: '员工姓名',
            align: 'center',
            dataIndex: 'ygxm',
            width: 100
          },
          {
            title: '关联比率(%)',
            align: 'center',
            dataIndex: 'glbl',
            scopedSlots: { customRender: 'glbl' },
            width: 200
          },
        ],
        columnsTwo: [
          {
            title: '员工工号',
            align: 'center',
            dataIndex: 'yggh',
          },
          {
            title: '员工姓名',
            align: 'center',
            dataIndex: 'ygxm',
          },
          {
            title: '组织名称',
            align: 'center',
            dataIndex: 'zzmc',
          },
          {
            title: '岗位名称',
            align: 'center',
            dataIndex: 'gwmc',
          },
          {
            title: '账号',
            align: 'center',
            dataIndex: 'ckzh',
          },
          {
            title: '账号名称',
            align: 'center',
            dataIndex: 'zhmc',
          },
          {
            title: '账号性质',
            align: 'center',
            dataIndex: 'zhxz_dictText',
          },
          {
            title: '关联比率(%)',
            align: 'center',
            dataIndex: 'glbl',
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
          },
        ],
        dataSourceTwo: {},
        dataSourceThree: {},
        dataSourceFour: [],
        StatisticsMonth: '',
        results: [],
        url: {
          save: "/ckzhglgl/ckjkptCkzhglxx/save",
        },
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      }
    },
    created () {},
    methods: {
      init(args) {
        console.log('args:',args)
        this.show = args.check
        this.StatisticsMonth = moment(args.tjyf).format('YYYY-MM') + '-01'
        this.results = args.transCheckResults
        if (args.check) {
          //转移条件含带了`存款账号`
          console.info('需转移的存款账号:', this.results.checktrue)
          for (let key in this.results.checktrue) {
            var dsOne = {}
            this.$set(dsOne, 'key', key)
            this.$set(dsOne, 'ckzh', this.results.checktrue[key].ckzh)
            this.$set(dsOne, 'gwmc', this.results.checktrue[key].gwmc)
            this.$set(dsOne, 'glbl', this.results.checktrue[key].yglbl)
            this.$set(dsOne, 'ygxm', this.results.checktrue[key].ygxm)
            this.$set(dsOne, 'zhmc', this.results.checktrue[key].zhmc)
            this.$set(dsOne, 'zhxz_dictText', this.results.checktrue[key].zhxz_dictText)
            this.$set(dsOne, 'zzmc', this.results.checktrue[key].zzmc)
            this.$set(dsOne, 'yggh', this.results.checktrue[key].yggh)
            this.dataSourceOne.push(dsOne)
          }
          console.info('*需转移的存款账号:', this.dataSourceOne)
        } else {
          //转移条件未含带`存款账号`
          //待转移账号SET
          this.$set(this.dataSourceTwo, 'zzbz', args.transCheckResults.checkfalse.zzbz)
          this.$set(this.dataSourceTwo, 'zzmc', args.transCheckResults.checkfalse.zzmc)
          this.$set(this.dataSourceTwo, 'gwbz', args.transCheckResults.checkfalse.gwbz)
          this.$set(this.dataSourceTwo, 'gwmc', args.transCheckResults.checkfalse.gwmc)
          this.$set(this.dataSourceTwo, 'yggh', args.transCheckResults.staffpost.yggh)
          this.$set(this.dataSourceTwo, 'name', args.transCheckResults.staffpost.ygxm)
          this.$set(this.dataSourceTwo, 'khjlbz', args.transCheckResults.staffpost.khjlbz)
          this.$set(this.dataSourceTwo, 'rowCount', args.transCheckResults.checkfalse.rowCount)
        }
      },
      close() {
        this.$emit("close")
        this.visible = false
      },
      handleOk() {
        let that = this
        //转移条件是否包含`存款账号`
        var ckzhTransfer = that.show
        if (ckzhTransfer) {

        } else {
          var dataSourceTh = that.dataSourceThree
          var dataSourceTw = that.dataSourceTwo
          var newYggh = dataSourceTh.yggh
          if (newYggh === undefined || newYggh === '') {
            this.$message.warning('请选择转移的员工！')
            return false
          }
          let requestparams = {
            'check': ckzhTransfer,
            'tjyf': this.StatisticsMonth,
            'zzbz': dataSourceTw.zzbz,
            'ywjgdm': dataSourceTw.ywjgdm, // 转移条件:账号所在机构
            'gwbz': dataSourceTw.gwbz,
            'yggh': dataSourceTw.yggh,
            'khjlbz': dataSourceTw.khjlbz,
            'glbz': dataSourceTw.glbz,
            'newZzbz': dataSourceTh.zzbz,
            'newGwbz': dataSourceTh.gwbz,
            'newYggh': dataSourceTh.yggh,
            'newGyh': dataSourceTh.gyh,
            'newKhjlbz': dataSourceTh.khjlbz,
          }
          console.info('存款账号关联信息转移 请求参数:',requestparams)
          this.confirmLoading = true
          postAction(this.url.save, requestparams).then((response) => {
            if (response.success) {
              this.$message.success(response.message)
            } else {
              this.$message.warning(response.message)
            }
          }).catch((error) => {
            this.$message.error('保存失败！请联系管理员处理！', error)
          }).finally(() => {
            this.confirmLoading = false
            //this.handleCancel()
          })
        }
      },
      handleCancel() {
        this.selectedRowKeys = []
        this.dataSourceOne = []
        this.dataSourceTwo = {}
        this.dataSourceThree = {}
        this.dataSourceFour = []
        this.model = {}
        this.close()
      },
      //选择需要转移的存款账号 - 监听事件
      onSelectChange(selectedRowKeys, record) {
        console.log('onSelectChange selectedRowKeys:', selectedRowKeys)
        console.log('onSelectChange record:', record)
        this.selectedRowKeys = selectedRowKeys
        this.selectedRecords = record
      },
      //选择需要转移的存款账号 - 关联比率 - 修改监听事件
      onCellChange(key, dataIndex, value) {
        console.info('onCellChange:', key, dataIndex, value)
        const dataSource = [...this.dataSourceOne];
        const target = dataSource.find(item => item.key === key)
        if (target) {
          target[dataIndex] = value;
          this.dataSourceOne = dataSource;
        }
        console.info('修改后`dataSourceOne`:', this.dataSourceOne)
      },
      //选择转移的员工 - 监听事件
      EmpInfoFeedBack: function (feedBackArray) {
        console.log('EmpInfoFeedBack feedBackArray:', feedBackArray)
        this.$set(this.dataSourceThree, 'yggh', feedBackArray.yggh)
        this.$set(this.dataSourceThree, 'ygxm', feedBackArray.ygxm)
        this.$set(this.dataSourceThree, 'zzbz', feedBackArray.zzbz)
        this.$set(this.dataSourceThree, 'zzmc', feedBackArray.zzmc)
        this.$set(this.dataSourceThree, 'gwbz', feedBackArray.gwbz)
        this.$set(this.dataSourceThree, 'gwmc', feedBackArray.gwmc)
        this.$set(this.dataSourceThree, 'khjlbz', feedBackArray.khjlbz)
        this.$set(this.dataSourceThree, 'gyh', feedBackArray.gyh)
      },
      //添加 - 已添加的转移信息
      addTransferInfo: function() {
        console.info('已选择需要转移的存款账号 rowkey:', this.selectedRowKeys)
        console.info('已选择需要转移的存款账号 record:', this.selectedRecords)
        if (this.selectedRecords.length <= 0 || this.selectedRecords === []) {
          this.$message.warning('请选择需要转移的存款账号！')
          return false
        }
        console.info('转移的目标员工:', this.dataSourceThree.yggh, this.dataSourceThree)
        if (this.dataSourceThree.yggh === undefined || this.dataSourceThree.yggh === '') {
          this.$message.warning('请选择转移的员工！')
          return false
        }
        var yggh   = this.dataSourceThree.yggh
        var ygxm   = this.dataSourceThree.ygxm
        var zzbz   = this.dataSourceThree.zzbz
        var zzmc   = this.dataSourceThree.zzmc
        var gwbz   = this.dataSourceThree.gwbz
        var gwmc   = this.dataSourceThree.gwmc
        var gyh    = this.dataSourceThree.gyh
        var khjlbz = this.dataSourceThree.khjlbz
        console.info('# 转移员工信息:', zzbz, zzmc, gwbz, gwmc, yggh, ygxm, gyh, khjlbz)
        var record = this.selectedRecords
        console.info('# 待转移账号信息:', record)
        for (let key in record) {
          var dsFour = {}
          this.$set(dsFour, 'key', key)
          this.$set(dsFour, 'yggh', record[key].yggh)
          this.$set(dsFour, 'ygxm', record[key].ygxm)
          this.$set(dsFour, 'zzmc', record[key].zzmc)
          this.$set(dsFour, 'gwmc', record[key].gwmc)
          this.$set(dsFour, 'zhmc', record[key].zhmc)
          this.$set(dsFour, 'ckzh', record[key].ckzh)
          this.$set(dsFour, 'zhxz_dictText', record[key].zhxz_dictText)
          this.$set(dsFour, 'glbl', record[key].glbl)
          console.info('dsFour', dsFour)
          this.dataSourceFour.push(dsFour)
        }
      },
      //移除 - 已添加的转移信息
      handleDelete: function (key) {
        console.info('key', key)
        console.info('dataSourceFour', this.dataSourceFour)
        this.dataSourceFour.filter((item, index) => {
          console.info('待删除的转移信息: index, item', index, item)
          if (item.key !== key) {
            var NewDS = []
            NewDS = NewDS.push(item)
          }
          console.info('NewDS:', NewDS)
        })
      },
    }
  }

</script>

<style scoped>

</style>