 <template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
      <a-row :gutter="24">
            <a-col :md="6" :sm="8">
              <a-form-item label="所属支行">
                <j-tree-select placeholder="请选择所属支行查询"
                               pid-field="sjzzbz"
                               :showSearch="true"
                               treeNodeFilterProp="title"
                               v-model="queryParam.jgdm"
                               :sszh="true"
                               dict="hr_bas_organization, zzjc, zzbz"
                               :tree-default-expand-all="true"/>
              </a-form-item>
            </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="客户经理姓名">
              <j-dict-select-tag
                v-model="queryParam.zrre"
                placeholder="请选择客户经理姓名"
                dictCode="HR_BAS_STAFF,ygxm,yggh"
                :showSearch="true"
                treeNodeFilterProp="title"
              />
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="营销单元">
              <j-dict-select-tag
                v-model="queryParam.yxdy"
                placeholder="请选择查询"
                dictCode="yxdygl_czxxgl,organize,qybm"
                :showSearch="true"
                treeNodeFilterProp="title"
              />
            </a-form-item>
          </a-col>

        <a-col :md="6" :sm="8">
          <a-form-item label="客户名称">
           <j-input placeholder="请输入客户名称查询" v-model="queryParam.khmc" type="likemore"/>
          </a-form-item>
        </a-col>

        <a-col :md="6" :sm="8">
          <a-form-item label="证件号码">
          <a-input placeholder="请输入证件号码查询" v-model="queryParam.zjhm"/>
        </a-form-item>
        </a-col>

        <a-col :md="6" :sm="8">
          <a-form-item label="是否完成回访">
          <j-dict-select-tag placeholder="是否完成回访"
                             v-model="queryParam.sfwchf"
                             dict-code="sfbz"/>
        </a-form-item>
        </a-col>


        <a-col :md="6" :sm="8">
          <a-form-item label="回访方式">
            <j-dict-select-tag placeholder="请选择回访方式"
                               v-model="queryParam.hffs"
                               dict-code="khhf_hffs"/>
          </a-form-item>
        </a-col>



        <!--<a-col :md="6" :sm="8">
          <a-form-item label="回访日期" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-range-picker name="hfrq" style="width: 100%" v-decorator="['hfrq',{}]"/>
        </a-form-item>
        </a-col>-->


          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="回访客户等级">
                <j-dict-select-tag placeholder="请选择客户等级查询" v-model="queryParam.khdj" dict-code="KHDJ_KHDJSZ,DJMC,DJBH"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="计划开始日期" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
                <a-date-picker v-model="queryParam.jhkssj"
                               placeholder="请选择开始日期"
                               style="width: 230px;"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="计划结束日期" :labelCol="{lg: {span: 5}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
                <a-date-picker v-model="queryParam.jhjssj"
                               placeholder="请选择结束日期"
                               style="width: 230px;"/>
              </a-form-item>
            </a-col>
          </template>
      </a-row>

      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
      <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('客户回访明细')">导出</a-button>
      <a @click="handleToggleSearch" style="margin-left: 8px">
        {{ toggleSearchStatus ? '收起' : '展开' }}
        <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
      </a>

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
        <i class="anticon anticon-info-circle ant-alert-icon"></i>
        <span>已选择</span>
        <a style="font-weight: 600">
          {{ selectedRowKeys.length }}
        </a>
        <span>项</span>
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
        :scroll="{ x: 1600 }"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">完成回访</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="handleDetail(record)">详情</a>
              </a-menu-item>

              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <yxglKhhfmxb-modal ref="modalForm" @ok="modalFormOk"/>

  </a-card>
</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import YxglKhhfmxbModal from './modules/YxglKhhfmxbModal'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import { getAction,putAction,httpAction,downFile } from '@/api/manage'
  import JInput from '@/components/jeecg/JInput'
  import ARow from "ant-design-vue/es/grid/Row";
  import { filterObj } from '@/utils/util';




  export default {
    name: "YxglKhhfmxbList",
    mixins: [JeecgListMixin],
    components: {
      ARow,
      YxglKhhfmxbModal,JTreeSelect,JInput
    },
    data () {
      return {
        description: '客户回访明细管理页面',
        // 表头
        columns: [
          {
            title: '计划月份',
            align:"center",
            dataIndex: 'jhyf'
          },
          {
            title: '组织名称',
            align:"center",
            dataIndex: 'zzbz_dictText'
          },
          {
            title: '营销单元',
            align:"center",
            dataIndex: 'yxdy_dictText'
          },
          {
            title: '客户经理',
            align:"center",
            dataIndex: 'yggh_dictText'
          },

          {
            title: '客户名称',
            align:"center",
            dataIndex: 'khmc'
          },
          {
            title: '证件号码',
            align:"center",
            dataIndex: 'zjhm'
          },
          {
            title: '客户性质',
            align:"center",
            dataIndex: 'khxz_dictText'
          },
          {
            title: '客户等级',
            align:"center",
            dataIndex: 'khdj_dictText'
          },
          {
            title: '回访日期',
            align:"center",
            dataIndex: 'hfrq'
          },
          {
            title: '回访方式',
            align:"center",
            dataIndex: 'hffs_dictText'
          },

          {
            title: '计划开始时间',
            align:"center",
            dataIndex: 'jhkssj'
          },
          {
            title: '计划结束时间',
            align:"center",
            dataIndex: 'jhjssj'
          },
          {
            title: '回访目的',
            align:"center",
            dataIndex: 'hfmd_dictText'
          },

          {
            title: '是否完成回访',
            align:"center",
            dataIndex: 'sfwchf_dictText'
          },
          {
            title: '操作',
            fixed: 'right',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
            width: 150
          }
        ],
        // 请求参数
    	url: {
              list: "/yxgl.khhhmx/yxglKhhfmxb/list",
              delete: "/yxgl.khhhmx/yxglKhhfmxb/delete",
              deleteBatch: "/yxgl.khhhmx/yxglKhhfmxb/deleteBatch",
              exportXlsUrl: "yxgl.khhhmx/yxglKhhfmxb/exportXls",
              importExcelUrl: "yxgl.khhhmx/yxglKhhfmxb/importExcel",
           },
        }
      },
      computed: {
        importExcelUrl: function(){
          return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
        }
      },


    methods: {

      getQueryParams(){
        let tjrqment = "";
        let jhjssj ="";
        let useridvalue=this.$route.query.khjlbh;
        if(this.queryParam.jhkssj) {
          tjrqment = this.queryParam.jhkssj.format("YYYY-MM-DD");
        }
        if(this.queryParam.jhjssj) {
          jhjssj = this.queryParam.jhjssj.format("YYYY-MM-DD");
        }
        var param      = Object.assign({}, this.queryParam,this.isorter);
        param.field    = this.getQueryField();
        param.pageNo   = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        param.jhkssj     = tjrqment;
        param.jhjssj     = jhjssj;
        if(useridvalue){
          param.yggh = useridvalue;
        }

        return filterObj(param);
      },
      searchReset() {
        this.flag = false;
        this.$route.query.yggh=null;
        this.queryParam = {};
        this.loadData(1);
      },
      initDictConfig() {
      }

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>