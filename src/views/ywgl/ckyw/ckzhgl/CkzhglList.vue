<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="组织标识">
            <j-tree-select placeholder="请选择组织标识" v-model="queryParam.zzbz"
                           dict="V_HR_BAS_ORGANIZATION_CMMS,ZZJC,ZZBZ"
                           pidField="sjzzbz"
                           treeNodeFilterProp="title"
                           :sszh="true"
                           :showSearch="false"
                           :treeDefaultExpandAll="true"
                           :filterTreeNode="true" />
          </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="岗位标识">
              <j-dict-select-tag
                placeholder="全部"
                v-model="queryParam.gwbz"
                dictCode="Hr_bas_post,gwmc,gwbz"
              />
            </a-form-item>
          </a-col>
         <!-- <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="存量存款余额">
              <a-input style="width: 46%" v-model="queryParam.clckyeS"></a-input>
              至
              <a-input style="width: 46%" v-model="queryParam.clckyeE"></a-input>
            </a-form-item>
          </a-col>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="存量存款余额">
              <a-input-number placeholder="Minimum" v-model="queryParam.clckye_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.clckye_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="员工工号">
              <a-input placeholder="请输入员工工号" v-model="queryParam.yggh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="存款账号">
              <a-input placeholder="请输入存款账号" v-model="queryParam.ckzh"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号名称">
              <a-input placeholder="请输入账号名称" v-model="queryParam.zhmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号所在机构码">
              <j-tree-select placeholder="请选择账号所在机构码"
                             v-model="queryParam.ywjgdm"
                             treeNodeFilterProp="title"
                             pid-field="sjywjgdm"
                             dict="v_hr_bas_organization_cmms, zzjc, ywjgdm"
                             :sszh="true"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
        <!--  <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="存量存款年日平余额">
              <a-input style="width: 46%" v-model="queryParam.clckrpyeS"></a-input>
              至
              <a-input style="width: 46%" v-model="queryParam.clckrpyeE"></a-input>
            </a-form-item>
          </a-col>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="存量存款年日平余额">
              <a-input-number placeholder="Minimum" v-model="queryParam.clckrpye_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.clckrpye_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户经理标识">
              <a-input placeholder="请输入客户经理标识" v-model="queryParam.khjlbz"></a-input>
            </a-form-item>
          </a-col>
        <!--  <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="月存款日平余额">
              <a-input style="width: 46%" v-model="queryParam.ckrpyeS"></a-input>
              至
              <a-input style="width: 46%" v-model="queryParam.ckrpyeE"></a-input>
            </a-form-item>
          </a-col>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="月存款日平余额">
              <a-input-number placeholder="Minimum" v-model="queryParam.ckrpye_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.ckrpye_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="关联标识">
              <a-select placeholder="全部" v-model="queryParam.glbz">
                <a-select-option value="0">
                  自动关联
                </a-select-option>
                <a-select-option value="1">
                  手动关联
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
         <!-- <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="年存款日平余额">
              <a-input style="width: 46%" v-model="queryParam.nckrpyeS"></a-input>
              至
              <a-input style="width: 46%" v-model="queryParam.nckrpyeE"></a-input>
            </a-form-item>
          </a-col>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="年存款日平余额">
              <a-input-number placeholder="Minimum" v-model="queryParam.nckrpye_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.nckrpye_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="账号性质">
              <a-select placeholder="全部" v-model="queryParam.zhxz">
                <a-select-option value="1">
                  对私活期
                </a-select-option>
                <a-select-option value="2">
                  对公活期
                </a-select-option>
                <a-select-option value="3">
                  定期
                </a-select-option>
                <a-select-option value="4">
                  一本通
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!--<a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="存款余额">
              <a-input style="width: 46%" v-model="queryParam.ckyeS"></a-input>
              至
              <a-input style="width: 46%" v-model="queryParam.ckyeE"></a-input>
            </a-form-item>
          </a-col>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="存款余额">
              <a-input-number placeholder="Minimum" v-model="queryParam.ckye_begin"
                              style="width: 40%; text-align: center" :min="0" />
              <a-input placeholder="~"
                       style="width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff; text-align: center"
                       disabled />
              <a-input-number placeholder="Maximum" v-model="queryParam.ckye_end"
                              style="width: 40%; text-align: center; border-left: 0" :min="0" />
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

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button icon="download" @click="handleExportXls('存款账号关联管理')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
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
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :scroll="{x:4050}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
              <a-menu-item>
                <a @click="handleDetail(record)">详情</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <ckzhgl-modal ref="modalForm" @ok="modalFormOk"></ckzhgl-modal>
  </a-card>
</template>

<script>
  import CkzhglModal from './modules/CkzhglModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import {deleteAction} from "@/api/manage";

  export default {
    name: "CkzhglList",
    mixins:[JeecgListMixin],
    components: {
      CkzhglModal,JTreeSelect
    },
    data () {
      return {
        description: '存款账号关联管理管理页面',
        // 表头
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
            title: '组织标识',
            align:"center",
            dataIndex: 'zzbz'
          },
          {
            title: '组织名称',
            align:"center",
            dataIndex: 'zzbz_dictText'
          },
          {
            title: '岗位标识',
            align:"center",
            dataIndex: 'gwbz'
          },
          {
            title: '岗位名称',
            align:"center",
            dataIndex: 'gwbz_dictText'
          },
          {
            title: '员工工号',
            align:"center",
            dataIndex: 'yggh'
          },
          {
            title: '员工姓名',
            align:"center",
            dataIndex: 'yggh_dictText'
          },
          {
            title: '柜员号',
            align:"center",
            dataIndex: 'gyh'
          },
          {
            title: '客户经理标识',
            align:"center",
            dataIndex: 'khjlbz'
          },
          {
            title: '存款账号',
            align:"center",
            dataIndex: 'ckzh'
          },
          {
            title: '账号名称',
            align:"center",
            dataIndex: 'zhmc'
          },
          {
            title: '账号所在机构码',
            align:"center",
            dataIndex: 'ywjgdm'
          },
          {
            title: '账号所在机构名称',
            align:"center",
            dataIndex: 'ywjgdm_dictText'
          },
          {
            title: '对应贷款账号',
            align:"center",
            dataIndex: 'dkzh'
          },
          {
            title: '账号性质',
            align:"center",
            dataIndex: 'zhxz_dictText'
          },
          {
            title: '关联比率(%)',
            align:"center",
            dataIndex: 'glbl'
          },
          {
            title: '关联标识',
            align:"center",
            dataIndex: 'glbz_dictText'
          },
          {
            title: '存量存款余额',
            align:"center",
            dataIndex: 'clckye'
          },
          {
            title: '存量存款年日平余额',
            align:"center",
            dataIndex: 'clckrpye'
          },
          {
            title: '存款余额',
            align:"center",
            dataIndex: 'ckye'
          },
          {
            title: '月存款日平余额',
            align:"center",
            dataIndex: 'ckrpye'
          },
          {
            title: '年存款日平余额',
            align:"center",
            dataIndex: 'nckrpye'
          },
          {
            title: '录入标识',
            align:"center",
            dataIndex: 'lrbz_dictText'
          },
          {
            title: '录入人',
            align:"center",
            dataIndex: 'lrczy'
          },
          {
            title: '录入时间',
            align:"center",
            dataIndex: 'lrsj'
          },
          {
            title: '修改人',
            align:"center",
            dataIndex: 'xgczy'
          },
          {
            title: '修改时间',
            align:"center",
            dataIndex: 'xgsj'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/ckzhgl/ckzhgl/list",
          delete: "/ckzhgl/ckzhgl/delete",
          deleteBatch: "/ckzhgl/ckzhgl/deleteBatch",
          exportXlsUrl: "ckzhgl/ckzhgl/exportXls",
          importExcelUrl: "ckzhgl/ckzhgl/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      handleDelete: function (record) {
        console.log(record)
        if(!this.url.delete){
          this.$message.error("请设置url.delete属性!")
          return
        }
        var that = this;
        deleteAction(that.url.delete, {glid :record.glid}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
          } else {
            that.$message.warning(res.message);
          }
        });
      },

      handleView: function (record) {
        console.log('CkzhglList => handleView: function (record)')
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "详情";
        this.$refs.modalForm.disableSubmit = true;
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>