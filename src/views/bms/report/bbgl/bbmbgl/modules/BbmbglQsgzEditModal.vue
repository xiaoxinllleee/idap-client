<template>
  <a-modal
    :title="title"
    width="90%"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-divider orientation="left">
          正在编辑单元格[{{this.model.cell}}]的取数规则
        </a-divider>
        <a-row :gutter="20">
          <!--选择指标[类型,指标ID,指标纬度,指标日期,]-->
          <!--[类型,常量]-->
          <!--[类型,SQL语句]-->
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="取数规则">
              <a-textarea placeholder="请输入取数规则" v-decorator="['qsgz', {rules: [{ required: true, message: '请输入取数规则!' }]}]" :autoSize="true"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="取数类型">
              <a-radio-group v-model="qslx" default-value="1" size="large" @change="qslxChange">
                <a-radio-button value="1">
                  指标
                </a-radio-button>
                <a-radio-button value="2">
                  常量
                </a-radio-button>
                <!--<a-radio-button value="3">-->
                  <!--SQL-->
                <!--</a-radio-button>-->
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>


        <a-row :gutter="10" v-show="qslx=='1'">
          <a-col :span="12">
            <a-card title="请选择指标" :headStyle="{backgroundColor:'rgb(234, 234, 234)'}">
              <a-row :gutter="10">
                <a-col :span="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="指标ID">
                    <a-input placeholder="请输入指标ID" v-model="queryParam.zbid" />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label="指标名称">
                    <a-input placeholder="请输入指标名称" v-model="queryParam.zbmc" />
                  </a-form-item>
                </a-col>
                <a-col :span="8" >
                  <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                    <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                    <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
                  </span>
                </a-col>
              </a-row>
              <a-table
                ref="table"
                size="middle"
                bordered
                rowKey="zbid"
                :columns="zbxxTable.columns"
                :dataSource="zbxxTable.dataSource"
                :loading="zbxxTable.loading"
                :pagination="zbxxTable.ipagination"
                :rowSelection="{type: 'radio', selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
                @change="handleTableChange"
              >
              </a-table>
            </a-card>
          </a-col>
          <a-col :span="12" v-show="zdtjShow">
            <a-card title="请选择字段条件" :headStyle="{backgroundColor:'rgb(234, 234, 234)'}">
              <a-table
                ref="table"
                size="middle"
                bordered
                rowKey="columnName"
                :columns="zdtjTable.columns"
                :dataSource="zdtjTable.dataSource"
                :loading="zdtjTable.loading"
                :pagination="false"
                :rowSelection="{type: 'checkbox', onChange: onZdtjSelectChange}"
              >
                <span slot="lx" slot-scope="lx,record">
                  <a-select placeholder="全部" v-model="record.lx" @change="createQsgz">
                    <a-select-option value="null">
                      请选择
                    </a-select-option>
                    <a-select-option value="1">
                      条件
                    </a-select-option>
                    <a-select-option value="2">
                      结果
                    </a-select-option>
                  </a-select>
                </span>
                <span slot="tjlx" slot-scope="tjlx,record">
                  <a-select placeholder="请选择" v-model="record.tjlx" @change="createQsgz">
                    <a-select-option value="null">
                      请选择
                    </a-select-option>
                    <a-select-option value="=">
                      等于
                    </a-select-option>
                    <a-select-option value="!=">
                      不等于
                    </a-select-option>
                    <a-select-option value=">">
                      大于
                    </a-select-option>
                    <a-select-option value=">=">
                      大于等于
                    </a-select-option>
                    <a-select-option value="<">
                      小于
                    </a-select-option>
                    <a-select-option value="<=">
                      小于等于
                    </a-select-option>
                    <a-select-option value="in">
                      in
                    </a-select-option>
                  </a-select>
                </span>
                <span slot="tjz" slot-scope="tjz,record">
                  <a-input placeholder="请输入条件值" v-model="record.tjz" @blur="createQsgz"></a-input>
                </span>
              </a-table>
            </a-card>
          </a-col>
        </a-row>
        <a-row :gutter="10" v-show="qslx=='2'">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="常量值">
              <a-input placeholder="请输入常量值" v-model="cl" @change="clChange"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="10" v-show="qslx=='3'">
          <a-col :span="12">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="SQL">
              <a-input placeholder="请输入SQL" v-model="sql" @change="sqlChange" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { getAction} from "@/api/manage";

  export default {
    name: "BbmbglQsgzEditModal",
    components: {},

    data() {
      return {
        title:"操作",
        visible: false,
        model: {},
        confirmLoading: false,
        form: this.$form.createForm(this),
        queryParam: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 18 },
        },
        qslx: '1',
        cl: '',
        sql: '',
        selectedRowKeys: [],
        selectionRows: [],
        selectedZdtjRowKeys: [],
        selectedZdtjRows: [],
        zdtjShow: false,
        zbxxTable: {
          dataSource: [],
          columns: [
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
              title: '指标ID',
              align:"center",
              dataIndex: 'zbid'
            },
            {
              title: '指标名称',
              align:"center",
              dataIndex: 'zbmc'
            },
            {
              title: '指标维度',
              align:"center",
              dataIndex: 'zbwd_dictText'
            },
            {
              title: '指标类型',
              align:"center",
              dataIndex: 'zblx_dictText'
            },
          ],
          loading: false,
          ipagination:{
            current: 1,
            pageSize: 5,
            pageSizeOptions: ['10', '20', '30'],
            showTotal: (total, range) => {
              return range[0] + "-" + range[1] + " 共" + total + "条"
            },
            showQuickJumper: true,
            showSizeChanger: true,
            simple: true,
            total: 0
          },
        },
        zdtjTable: {
          dataSource: [],
          columns: [
            {
              title: '#',
              dataIndex: '',
              key:'rowIndex',
              width:50,
              align:"center",
              customRender:function (t,r,index) {
                return parseInt(index)+1;
              }
            },
            {
              title: '字段名称',
              align:"center",
              dataIndex: 'columnName'
            },
            {
              title: '字段描述',
              align:"center",
              dataIndex: 'comments'
            },
            {
              title: '字段类型',
              align:"center",
              dataIndex: 'lx',
              width: '100px',
              scopedSlots: { customRender: 'lx' }
            },
            {
              title: '条件类型',
              align:"center",
              dataIndex: 'tjlx',
              width: '150px',
              scopedSlots: { customRender: 'tjlx' }
            },
            {
              title: '条件值',
              align:"center",
              dataIndex: 'tjz',
              scopedSlots: { customRender: 'tjz' }
            },
          ],
          loading: false,
          selectZbid: '',
          selectGlbm: '',
        }
      }
    },
    methods: {
      init(model) {
        this.visible = true
        this.selectedRowKeys = []
        this.selectionRows = []
        this.selectZbid = ''
        this.selectGlbm = ''
        this.zdtjShow = false
        this.model = Object.assign({}, model)
        this.form.resetFields()
        this.$nextTick(() => {
          this.form.setFieldsValue({qsgz: model.text})
        })
      },
      searchQuery() {
        this.loadData(1);
      },
      searchReset() {
        this.queryParam = {}
        this.loadData(1);
      },
      handleTableChange(pagination, filters, sorter) {
        //分页、排序、筛选变化时触发
        this.zbxxTable.ipagination = pagination;
        this.loadData();
      },
      onSelectChange(selectedRowKeys, selectionRows) {
        console.log('onSelectChange', selectedRowKeys, selectionRows)
        this.selectedRowKeys = selectedRowKeys;
        this.selectionRows = selectionRows;
        this.selectZbid = this.selectionRows[0].zbid
        let qsgz = `$[1@1@${this.selectionRows[0].zbid}, $\{BQ\}]`
        this.zdtjShow = false
        //如果选择的是多维指标，则获取多维指标对应的明细表结构
        if(this.selectionRows[0].zblx == '2') {
          qsgz = `$[1@2@${this.selectionRows[0].zbid}@${this.selectionRows[0].glbm}@@]`
          this.getTableCols(this.selectionRows[0].glbm)
          this.selectGlbm = this.selectionRows[0].glbm
          this.zdtjShow = true
        }
        this.form.setFieldsValue({qsgz: qsgz})
      },
      onZdtjSelectChange(selectedRowKeys, selectionRows) {
        this.selectedZdtjRowKeys = selectedRowKeys
        this.selectedZdtjRows = selectionRows
        this.createQsgz()
      },
      createQsgz() {
        let selectedRows = this.zdtjTable.dataSource.filter(item => {
          return this.selectedZdtjRowKeys.includes(item.columnName)
        })
        console.log('selectedRows', selectedRows)
        let condition = ''
        let result = ''
        let tjzd = ''
        let tjlx = ''
        let tjz = ''
        selectedRows.forEach(row => {
          if (row.lx == '1' && row.tjlx != undefined && row.tjz != undefined) {
            //条件
            condition = `${condition}${row.columnName}${row.tjlx}${row.tjz}&`
            tjzd = `${tjzd}${row.columnName}|`
            tjlx = `${tjlx}${row.tjlx}|`
            tjz = `${tjz}${row.tjz}|`
          } else if (row.lx == '2') {
            //结果
            result = row.columnName
          }
        })
        // condition = `${tjzd}&${tjlx}&${tjz}`
        let qsgz = `$[1@2@'${this.selectZbid}'@${this.selectGlbm}@${condition}@${result}]`
        this.form.setFieldsValue({qsgz: qsgz})
      },
      getTableCols(tableName) {
        getAction("/tool/getTableCols", {tableName: tableName}).then(res => {
          console.log('getTableCols', res)
          this.zdtjTable.dataSource = res.result
        })
      },
      qslxChange(val) {
        console.log('qslxChange', val, this.qslx)

      },
      clChange(val) {
        let qsgz = `$[2@${this.cl}]`
        this.form.setFieldsValue({qsgz: qsgz})
      },
      sqlChange(val) {
        let qsgz = `$[3@${this.sql}]`
        this.form.setFieldsValue({qsgz: qsgz})
      },
      loadData(arg) {
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.zbxxTable.ipagination.current = 1;
        }
        this.zbxxTable.loading = true;
        this.queryParam.pageNo = this.zbxxTable.ipagination.current;
        this.queryParam.pageSize = this.zbxxTable.ipagination.pageSize;
        getAction('/zbgl/zbsjxgl/list', this.queryParam).then((res) => {
          if (res.success) {
            this.zbxxTable.dataSource = res.result.records;
            this.zbxxTable.ipagination.total = res.result.total;
            this.zbxxTable.loading = false;
          }else{
            this.zbxxTable.dataSource =[];
            this.zbxxTable.ipagination.total=0;
            this.zbxxTable.loading = false;
          }
          if(res.code===510){
            this.$message.warning(res.message,5)
            this.zbxxTable.loading = false;
          }
          this.zbxxTable.loading = false;
        })
      },
      //生成取数规则
      getRoll() {

      },
      handleOk () {
        console.log('this.form', this.form)
        let qsgz = this.form.getFieldValue('qsgz')
        let data = {'cell': this.model.cell, 'qsgz': qsgz}
        this.visible = false
        this.$emit('ok', data)
      },
      handleCancel () {
        this.$emit('close');
        this.visible = false;
      },
    }
  }
</script>

<style scoped>

</style>