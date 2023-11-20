<style lang="less">
@import "../../../../../styles/tree-common.less";
@import "../../../../../styles/single-common.less";
</style>
<template>
  <j-modal
    :title="title"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :okButtonProps="{ props: {disabled: true} }"
    :destroyOnClose="true"
    :fullscreen="true"
    :disableSubmit="true"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <Row type="flex" style="height: 400px" >
        <Col :md="8" :lg="8" :xl="4">
          <Alert show-icon>
            任务机构
          </Alert>
          <div class="tree-bar">
            <a-directory-tree
              style="height: 680px"
              selectable
              :defaultExpandAll="true"
              :checkable="true"
              :checkStrictly="false"
              v-model="checkedKeys"
              @check="onSelect"
              :dropdownStyle="{maxHeight:'200px',overflow:'auto'}"
              :treeData="departTree"
            />
          </div>
        </Col>
        <Col :md="8" :lg="8" :xl="18" style="margin-left:10px;">
          <a-card :bordered="false">
            <!-- 查询区域 -->
            <div v-show="rwlx==1" class="table-page-search-wrapper">
              <a-form layout="inline" @keyup.enter.native="searchQuery">
                <a-row :gutter="24">
                  <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="原支行">
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

                  <template v-if="toggleSearchStatus">

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

            <div v-show="rwlx==2" class="table-page-search-wrapper">
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
                  <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="归属机构">
                      <j-tree-select placeholder="请选择所属机构"
                                     v-model="queryParam.jgdm"
                                     treeNodeFilterProp="title"
                                     pid-field="sjywjgdm"
                                     dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                                     :showSearch="true"
                                     :getAllZzjg="qybm=='400' ||qybm=='375'? '1' : '2'"
                                     :isAll="qybm=='400'||qybm=='375'"
                                     :treeDefaultExpandAll="true"/>
                    </a-form-item>
                  </a-col>
                  <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="户号编码">
                      <a-input placeholder="请输入户号编码" v-model="queryParam.hhbm"></a-input>
                    </a-form-item>
                  </a-col>
                  <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="姓名">
                      <a-input placeholder="请输入姓名" v-model="queryParam.khmc"></a-input>
                    </a-form-item>
                  </a-col>
                  <a-col :xl="6" :lg="7" :md="8" :sm="24">
                    <a-form-item label="证件号码">
                      <a-input placeholder="请输入证件号码" v-model="queryParam.zjhm"></a-input>
                    </a-form-item>
                  </a-col>
                  <template v-if="toggleSearchStatus">
                    <a-col :xl="6" :lg="7" :md="8" :sm="24">
                      <a-form-item label="客户类型">
                        <j-dict-select-tag v-model="queryParam.xtpdjg" placeholder="请选择客户类型" dictCode="xtpdjg" allowClear/>
                      </a-form-item>
                    </a-col>
                    <a-col :xl="6" :lg="7" :md="8" :sm="24">
                      <a-form-item label="是否采集">
                        <j-dict-select-tag v-model="queryParam.sfcj" placeholder="请选择是否采集" dictCode="sfbz"/>
                      </a-form-item>
                    </a-col>
                    <a-col :xl="6" :lg="7" :md="8" :sm="24">
                      <a-form-item label="是否上传附件">
                        <j-dict-select-tag v-model="queryParam.sfscfj" placeholder="请选择是否上传附件" dictCode="sfbz"/>
                      </a-form-item>
                    </a-col>
                    <a-col :xl="6" :lg="7" :md="8" :sm="24">
                      <a-form-item label="是否有效走访">
                        <j-dict-select-tag v-model="queryParam.sfyxzf" placeholder="请选择是否有效走访" dictCode="sfbz"/>
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


            <!-- table区域-begin -->
            <div>
              <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
                <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
                <a style="margin-left: 24px" @click="onClearSelected">清空</a>
              </div>

              <a-table
                ref="table"
                size="middle"
                bordered
                :rowKey="rowKey"
                :columns="columns"
                :dataSource="dataSource"
                :pagination="ipagination"
                :loading="loading"
                :scroll="{ x: 2000 }"
                :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
                @change="handleTableChange">

                  <span  slot="detail" slot-scope="khmc,record">
                    <a @click="handlepjsxjdmxEdit(record)">{{khmc}}</a>
                  </span>

              </a-table>
            </div>

          </a-card>
        </Col>
      </Row>
    </a-spin>
    <nhjbxxx-xq-modal ref="NhjbxxxXqModal" />

  </j-modal>
</template>

<script>
import { deleteAction, getAction, httpAction, postAction } from '@/api/manage'
import {queryDepartTreeList, searchByKeywords} from '@/api/api'
import { getDictDataByType, updateInfo } from '@/api/activiti'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
import JInput from '@/components/jeecg/JInput'
import NhjbxxxXqModal from '@views/cmms/khxxgl/khflgl/nhxq/modules/NhjbxxxXqModal'

export default {
  components: {
    JTreeSelect,JInput,NhjbxxxXqModal
  },
  mixins:[JeecgListMixin],
  name: "TaskMxsjModal",
  data () {
    return {
      rwlx:0,
      loading:false,
      spinning:true,
      current:0,
      disableSubmit:false,
      title:"任务明细数据",
      visible: false,
      model: {},
      id:'',
      checkedKeys:[],
      treeData: [],
      departTree: [],
      selectedKeys: [],
      fzglValue: '1',
      checkStrictly: false,
      dictTable: [],
      dictForm: [],
      /* 分页参数 */
      ipagination:{
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total, range) => {
          return range[0] + "-" + range[1] + " 共" + total + "条"
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      },
      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules:{
      },
      dataSource:[],
      selectedRowKeys: [],
      // 表头
      columns:[],
      columnsDklsh: [
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
      columnsNhxx: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: "center",
          customRender: function (t, r, index) {
            return parseInt(index) + 1;
          }
        },
        {
          title: '归属网格',
          align: "center",
          dataIndex: 'wgbh_dictText',
        },
        {
          title: '归属机构',
          align: "center",
          dataIndex: 'jgdm_dictText'
        },
        {
          title: '客户类型',
          align: "center",
          dataIndex: 'xtpdjg_dictText',
        },
        {
          title: '户号编码',
          align: "center",
          dataIndex: 'hhbm'
        },
        {
          title: '姓名',
          align: "center",
          dataIndex: 'khmc',
          scopedSlots: {customRender: 'detail'}
        },
        {
          title: '证件号码',
          align: "center",
          dataIndex: 'zjhm'
        },
        {
          title: '民族',
          align: "center",
          dataIndex: 'mz_dictText'
        },
        {
          title: '婚姻状况',
          align: "center",
          dataIndex: 'hyzk_dictText'
        },
        {
          title: '户口性质',
          align: "center",
          dataIndex: 'hkxz_dictText'
        },
        {
          title: '与户主关系',
          align: "center",
          dataIndex: 'yhzgx_dictText'
        },
        {
          title: '文化程度',
          align: "center",
          dataIndex: 'whcd_dictText'
        },
        {
          title: '职业',
          align: "center",
          dataIndex: 'cshygz_dictText', width: 200,
        },
        {
          title: '联系方式',
          align: "center",
          dataIndex: 'sjhm'
        },
        {
          title: '户籍地址',
          align: "center",
          dataIndex: 'hjdz'
        },
        {
          title: '常住地址',
          align: "center",
          dataIndex: 'zz'
        },
        {
          title: '备注',
          align: "center",
          dataIndex: 'bz'
        },
        {
          title: '原所属乡镇',
          align: "center",
          dataIndex: 'yssxz'
        },
        {
          title: '原行政村',
          align: "center",
          dataIndex: 'yxzc'
        },

      ],
      url: {
        add: "/khlc/khfagl/pmaAScheme/add",
        addObj: "/khfagl/pmaASchemeOrgRel/add",
        edit: "/khlc/khfagl/pmaAScheme/edit",
        list:"/rwmxsj/taskRwmxDklsh/list",
        listDklsh:"/rwmxsj/taskRwmxDklsh/list",
        listNhxx:'/rwmxsj/taskRwmxEczf/list',
        queryNhxqOne: "/dklsh/vKhxxglJzyxDklsh/queryNhxqOne",
        treeUrl:"/khlc/jczbgl/vpmaFBaseIndexType/queryTreeList",
        addIndexInfo: "/khfagl/pmaAShemeIndexRel/add",
        getOrgAndPost:"/khfagl/pmaASchemeOrgRel/getOrgAndPost",
        getkhdxList:"/khfagl/pmaASchemeEvlobjRel/queryList",
      },
    }
  },
  created () {
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getDictDataType();
    },
    handlepjsxjdmxEdit(record) {
      if(this.rwlx==1){
        var params={zjhm:record.identNo};
        getAction(this.url.queryNhxqOne, params).then((res) => {
          if (res.success) {
            if(res.result.zjhm){
              this.$refs.NhjbxxxXqModal.edit(res.result)
              this.$refs.NhjbxxxXqModal.title = '详情'
              this.$refs.NhjbxxxXqModal.disableSubmit = false
            }else{
              this.$message.error("农户信息中暂无该客户信息！")
            }
          } else {
            this.$message.error(res.message)

          }
        })
      }else if(this.rwlx==2){
        this.$refs.NhjbxxxXqModal.edit(record);
        this.$refs.NhjbxxxXqModal.title = "详情";
        this.$refs.NhjbxxxXqModal.disableSubmit = true;
      }

    },
    edit (record) {
      console.log(record);
      if(record.rwlx==1){
        this.queryParam.rwid=record.id;
        this.rwlx=1;
        this.url.list=this.url.listDklsh;
        this.columns=this.columnsDklsh;
      }else if(record.rwlx==2){
        this.queryParam.rwid=record.id;
        this.rwlx=2;
        this.url.list=this.url.listNhxx;
        this.columns=this.columnsNhxx;
      }else if(record.rwlx==3){
        this.queryParam.rwid=record.id;
        this.rwlx=3;
        this.url.list=this.url.listNhxx;
        this.columns=this.columnsNhxx;
      }
      this.checkedKeys=record.dxid.split(',');
      this.getDictDataType();
      this.form.resetFields();
      this.visible = true;
    },
    close () {
      this.current=this.current*0;
      this.id='';
      this.selectedRowKeys = [];
      this.checkedKeys = []
      this.dataSource=[];
      this.$emit('ok');
      this.visible = false;
    },
    handleOk () {
      const that = this;
      // 触发表单验证
     /* this.form.validateFields((err, values) => {
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
      })*/
    },
    handleCancel () {
      this.close()
    },


    getDictDataType() {
      this.loadTree();
    },

    loadTree(){
      queryDepartTreeList().then((res) => {
        this.departTree = res.result
      })
    },
    onSelect(checkedKeys, e) {
      console.log('onSelect', checkedKeys, e)
      if (this.checkStrictly) {
        this.checkedKeys = checkedKeys.checked
      } else {
        this.checkedKeys=checkedKeys;
      }

    },
    handelSubmit(){
      this.close();
    },
  }
}
</script>

<style lang="less" scoped>

</style>