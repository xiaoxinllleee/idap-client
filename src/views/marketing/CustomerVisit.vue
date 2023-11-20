<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @submit.prevent="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8"><a-form-item label="所属机构">
            <j-tree-select placeholder="请选择机构查询"
                           v-model="queryParam.zzbz"
                           :showSearch="true"
                           treeNodeFilterProp="title"
                           dict="HR_BAS_ORGANIZATION,ZZJC,ZZBZ"
                           pidField="sjzzbz"
                           :treeDefaultExpandAll="true"/>
          </a-form-item></a-col>
         <!-- <a-col :md="6" :sm="8"><a-form-item label="员工工号">
            <a-input placeholder="请输入员工工号查询" v-model="queryParam.yggh"/>
          </a-form-item></a-col>-->
          <a-col :md="6" :sm="8"><a-form-item label="客户经理">
            <j-select-ygxx placeholder="请选择客户经理"
                           @selectComplete="selectComplete" ></j-select-ygxx>
          </a-form-item></a-col>
          <a-col :md="6" :sm="8"><a-form-item label="营销单元">
            <j-dict-select-tag placeholder="请选择营销单元查询"
                               v-model="queryParam.yxdy"
                               :show-search="true"
                               dictCode="YXDYGL_EJYXDYGL,dymc,dybh"/>
          </a-form-item></a-col>
          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8"><a-form-item label="客户名称">
              <j-input placeholder="请输入客户名称查询" v-model="queryParam.khmc" type="likemore"/>
            </a-form-item></a-col>
            <a-col :md="6" :sm="8"><a-form-item label="证件号码">
              <a-input placeholder="请输入证件号码查询" v-model="queryParam.zjhm"/>
            </a-form-item></a-col>
<!--            <a-col :md="6" :sm="8"><a-form-item label="邮箱">-->
<!--              <j-input placeholder="请输入邮箱查询" v-model="queryParam.email" type="likemore"/>-->
<!--            </a-form-item></a-col>-->
          </template>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator" style="border-top: 5px;">
      <a-button type="primary" @click="handleAdd" icon="plus">新增</a-button>
      <a-button type="primary" @click="handleExportXls('客户回访记录')" icon="download" style="margin-left: 8px;">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
      <a-button type="primary" @click="searchQuery" icon="search" style="margin-left: 8px;">查询</a-button>
      <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px;">重置</a-button>
      <a @click="handleToggleSearch" style="margin-left: 8px">
        {{ toggleSearchStatus ? '收起' : '展开' }}
        <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
      </a>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay" @click="handleMenuClick"><a-menu-item key="1">
          <a-icon type="delete" @click="batchDel"/>删除
        </a-menu-item></a-menu>
        <a-button style="margin-left: 8px;">
          批量操作<a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择
        <a style="font-weight: 600;">{{ selectedRowKeys.length }}</a> 项
        <a style="margin-left: 24px;" @click="onClearSelected">清空</a>
      </div>

      <a-table bordered
               ref="table"
               size="middle"
               rowKey="id"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="ipagination"
               @change="handleTableChange"
               :loading="loading"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
<!--        <template slot="avatarslot" slot-scope="text, record, index">-->
<!--          <div class="anty-img-wrap">-->
<!--            <a-avatar shape="square" :src="getAvatarView(record.avatar)" icon="user"/>-->
<!--          </div>-->
<!--        </template>-->
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link"> 更多 <a-icon type="down"/></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="handleDetail(record)">详情</a>
              </a-menu-item>
              <a-menu-item><a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
              </a-popconfirm></a-menu-item>
              <a-menu-item v-if="record.tjzt==1"><a-popconfirm title="确定提交吗?" @confirm="() => handleSubm(record.id,2)">
                <a>提交</a>
              </a-popconfirm></a-menu-item>
              <a-menu-item v-if="record.tjzt==2"><a-popconfirm title="确定撤销提交吗?" @confirm="() => handleSubm(record.id,1)">
                <a>撤销提交</a>
              </a-popconfirm></a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <customerVisit-modal ref="modalForm" @ok="modalFormOk"/>
  </a-card>
</template>

<script>
  import {putAction} from '@/api/manage';
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import customerVisitModal from './modules/CustomerVisitModal'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import JSelectYgxx from '@/components/jeecgbiz/JSelectYgxx'
  import JInput from '../../components/jeecg/JInput'

  export default {
    name: "CustomerVisitList",
    mixins: [JeecgListMixin],
    components: {
      customerVisitModal,
      JTreeSelect,
      JSelectYgxx,
      JInput
    },
    data() {
      return {
        description: '客户回访',
        queryParam: {},
        isorter: {
          column: 'hfrq',
          order: 'desc',
        },
        columns: [
          /*{
            title: '组织标识',
            align: "center",
            dataIndex: 'zzbz',
            width: 120
          },*/
          {
            title: '机构名称',
            align: "center",
            dataIndex: 'zzbz_dictText',
            width: 120
          },
          {
            title: '客户经理',
            align: "center",
            width: 100,
            dataIndex: 'yggh_dictText',
          },
          {
            title: '营销单元',
            align: "center",
            dataIndex: 'yxdy_dictText',
            width: 120,
          },
          {
            title: '客户名称',
            align: "center",
            dataIndex: 'khmc',
            width: 100,
          },
          {
            title: '证件号码',
            align: "center",
            dataIndex: 'zjhm',
            width: 100,
          },
          /*{
            title: '客户性质',
            align: "center",
            width: 80,
            dataIndex: 'khxz_dictText'
          },*/
          {
            title: '状态',
            align: "center",
            dataIndex: 'tjzt_dictText',
            width: 80,
          },
          {
            title: '回访日期',
            align: "center",
            dataIndex: 'hfrq',
            width: 150,
            sorter: (a, b) => b.hfrq.replace(/-/g, '/') - a.hfrq.replace(/-/g, '/'),
          },
          {
            title: '回访方式',
            align: "center",
            dataIndex: 'hffs_dictText',
            width: 120,
          },
          {
            title: '数据来源',
            align: "center",
            dataIndex: 'sjly_dictText',
            width: 120,
          },
          {
            title: '操作',
            dataIndex: 'action',
            scopedSlots: {customRender: 'action'},
            align: "center",
            width: 120
          }
        ],
        url: {
          list: "/yxgl/khhf/list",
          delete: "/yxgl/khhf/delete",
          deleteBatch: "/yxgl/khhf/deleteBatch",
          exportXlsUrl: "/yxgl/khhf/exportXls",
          importExcelUrl: "/yxgl/khhf/importExcel",
          imgerver: window._CONFIG['domianURL'] + "/sys/common/view",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      getAvatarView: function (avatar) {
        return this.url.imgerver + "/" + avatar;
      },
      handleMenuClick(e) {
        if (e.key == 1) {
          this.batchDel();
        }
      },
      handleSubm: function (id, status) {
        let that = this;
        putAction("/yxgl/khhf/submitBatch",{ids:id,status:status}).then((res) => {
          if (res.success) {
            that.$message.success(res.message);
            that.loadData();
            that.onClearSelected();
          } else {
            that.$message.warning(res.message);
          }
        })
      },
      selectComplete(selectedYgxxRows) {
        if (selectedYgxxRows[0]) {
          console.log(selectedYgxxRows[0].khjlbh)
          this.queryParam.yggh =  selectedYgxxRows[0].khjlbh
          /*this.queryParam.yggh = selectedYgxxRows[0].yggh*/
          //this.$refs.yhxx.ygxm= '123';
        }
      },
    }
  }
</script>

<style scoped>
  @import '~@assets/less/common.less'
</style>