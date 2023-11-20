<template>
  <a-modal
    :title="title"
    width="85%"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    :body-style="{height: modalHeight, overflowY: 'auto'}"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <!--<a-divider orientation="left" style="color: #1890FF;">请选择调整类型</a-divider>-->
        <!--<a-row class="form-row" :gutter="8">-->
          <!--<a-col :span="12">-->
            <!--<a-form-item-->
              <!--:labelCol="labelCol"-->
              <!--:wrapperCol="wrapperCol"-->
              <!--label="调整类型">-->
              <!--<a-radio-group v-model="tzlx" @change="tzlxChange">-->
                <!--<a-radio :value="1">-->
                  <!--调整网格权限-->
                <!--</a-radio>-->
                <!--<a-radio :value="2">-->
                  <!--调整员工权限-->
                <!--</a-radio>-->
              <!--</a-radio-group>-->
            <!--</a-form-item>-->
          <!--</a-col>-->
        <!--</a-row>-->
        <a-row class="form-row" :gutter="8">
          <a-col :md="16" :sm="24">
            <a-card title="选择员工" :headStyle="{backgroundColor:'rgb(234, 234, 234)'}">
                  <div class="table-page-search-wrapper">
                    <a-form layout="horizontal">
                      <a-row>
                        <a-col :span="6">
                          <a-form-item label="所属支行" :label-col="{span: 8}"
                                       :wrapper-col="{span: 14}">
                            <j-tree-select placeholder="请选择所属支行" v-model="queryParam.zzbz"
                                           dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ" pidField="sjzzbz" treeNodeFilterProp="title"
                                           :sszh="true" :showSearch="false" :treeDefaultExpandAll="true" :filterTreeNode="true"/>
                          </a-form-item>
                        </a-col>
                        <a-col :span="6"><a-form-item label="员工工号" :label-col="{span: 8}" :wrapper-col="{span: 14}">
                          <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"/>
                        </a-form-item>
                        </a-col>
                        <a-col :span="6"><a-form-item label="员工姓名" :label-col="{span: 8}" :wrapper-col="{span: 14}">
                          <j-input placeholder="请输入员工姓名" v-model="queryParam.ygxm"/>
                        </a-form-item></a-col>
                        <a-col :span="6" ><span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                          <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                        </span>
                        </a-col>
                      </a-row>
                    </a-form>
                  </div>

                  <a-table bordered
                           ref="table"
                           size="middle"
                           rowKey="yggh"
                           :columns="columns"
                           :dataSource="dataSource"
                           :pagination="ipagination"
                           :loading="loading"
                           :rowSelection="{type: 'radio', selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
                           @change="handleTableChange"/>
                </a-card>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-card title="选择网格" :headStyle="{backgroundColor:'rgb(234, 234, 234)'}">
              <a-spin :spinning="treeDataLoading">
                <div style="background: #fff;padding-left:16px;height: 100%; margin-top: 5px">
                  <!-- 树-->
                  <a-tree
                    v-model="checkedKeys"
                    checkable
                    @check="onCheck"
                    :treeData="treeData"
                    :replaceFields="{ title:'wgmc', key:'id'}"
                  />
                </div>
              </a-spin>
            </a-card>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>

  </a-modal>
</template>

<script>
  import { httpAction,getAction,postAction } from '@/api/manage'
  import JInput from '@/components/jeecg/JInput'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  export default {
    name: "YxdyglPqqxglAdjust",
    components: {
      JInput, JTreeSelect
    },
    mixins: [JeecgListMixin],
    data() {
      return {
        title:"权限调整",
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        confirmLoading: false,
        form: this.$form.createForm(this),
        tzlx: undefined,
        treeDataLoading: false,
        checkedKeys: [],
        treeData:[],


        disableMixinCreated: true,
        columns: [
          {
            title: '所属支行',
            align: "center",
            dataIndex: 'zzbz_dictText',
            fixed: 'left',
            width: 200
          },
          {
            title: '员工工号',
            align: "center",
            dataIndex: 'yggh',
            fixed: 'left',
            width: 200
          },
          {
            title: '员工姓名',
            align: "center",
            dataIndex: 'ygxm',
          },
          {
            title: '客户经理编号',
            align: "center",
            dataIndex: 'khjlbz'
          },
        ],
        dataSource: [],

        url: {
          treeUrl:"/yxdyglmain/yxdyglMain/getYxdyglMaimTreeDate",
          list: "/hr/vhrbasstaffpost/list",
          pqqxglList: "/pqqxgl/yxdyglPqqxgl/getYgList",
          adjust: "/pqqxgl/yxdyglPqqxgl/adjust"
        },
      }
    },
    computed: {
      modalHeight: function() {
        return (document.documentElement.clientHeight - 200 - 50) + 'px';
      },
    },
    methods: {
      init(){
        this.visible = true
        this.selectedRowKeys = []
        this.selectionRows = []
        this.dataSource = []
        this.checkedKeys = []
        this.treeDataLoading = true
        getAction(this.url.treeUrl, {'queryOrganize': '2'}).then((res) => {
          this.treeData = res.result
        }).finally(()=>{
          this.treeDataLoading = false
        })
      },
      tzlxChange(val) {
        console.log('tzlxChange', val)
      },
      onCheck(checkedKeys) {
        console.log('onCheck', checkedKeys);
        if(this.checkStrictly){
          this.checkedKeys = checkedKeys.checked;
        }else{
          this.checkedKeys = checkedKeys
        }
      },
      onSelectChange(selectedRowKeys, selectionRows) {
        this.selectedRowKeys = selectedRowKeys;
        this.selectionRows = selectionRows;
        this.checkedKeys = []
        this.treeDataLoading = true
        //根据选择的员工获取起对应的权限网格
        getAction(this.url.pqqxglList, {yggh: selectedRowKeys[0]}).then(res => {
          console.log('getYgPqqxglList', res)
          if (res.result) {
            res.result.forEach(item => {
              this.checkedKeys.push(item.menuId)
            })
          }
        }).finally(() => {
          this.treeDataLoading = false
        })
      },
      handleOk () {
        if (this.selectedRowKeys.length < 1){
          this.$message.warning("未选择员工！");
          return
        }
        let formData = {"selectedRowKeys":this.selectedRowKeys
          ,"checkedKeys":this.checkedKeys}
        console.log(formData)
        postAction(this.url.adjust,formData).then((res)=>{
          if(res.success){
            this.$message.success(res.message);
            this.$emit('ok');
            this.close()
          }else{
            this.$message.warning(res.message,5);
          }
        })
      },
      handleCancel() {
        this.close()
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
    }
  }
</script>

<style scoped>

</style>