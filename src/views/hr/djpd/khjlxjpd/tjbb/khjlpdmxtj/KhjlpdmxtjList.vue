<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="评定周期">
              <a-select placeholder="全部" v-model="queryParam.pdzq" :change="handlePdzq()">
                <a-select-option value="DD">
                  天
                </a-select-option>
                <a-select-option value="MM">
                  月
                </a-select-option>
                <a-select-option value="Q">
                  季
                </a-select-option>
                <a-select-option value="YYYY">
                  年
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item  label="评定年份" v-show="queryParam.pdzq=='YYYY'">
              <a-select placeholder="请选择评定年份" v-model="pdnf" :defaultValue="dateValue" @change="selectValue">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="评定季度" v-show="queryParam.pdzq=='Q'">
              <a-select placeholder="评定季度年份" v-model="jdssnf" :defaultValue="dateValue" @change="selectValue" style="width: 35%;">
                <a-select-option v-for="item in years" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
              <a-select placeholder="请选择评定季度" v-model="pdjd" @change="selectValue" style="width: 65%;">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="01">第一季度</a-select-option>
                <a-select-option value="04">第二季度</a-select-option>
                <a-select-option value="07">第三季度</a-select-option>
                <a-select-option value="10">第四季度</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item  label="评定月份" v-show="queryParam.pdzq=='MM'">
              <a-month-picker placeholder="请选择评定月份" v-model="queryParam.pdrq" @change="selectValue" style="width: 100%;" />
            </a-form-item>
            <a-form-item  label="评定日期" v-if="queryParam.pdzq=='DD'">
              <a-date-picker placeholder="请选择评定日期" v-model="queryParam.pdrq" @change="selectValue" style="width: 100%;" />
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="支行名称">
              <j-tree-select placeholder="请选择支行名称"
                             v-model="queryParam.sjzzbz"
                             treeNodeFilterProp="title"
                             pid-field="sjzzbz"
                             dict="v_hr_bas_organization_cmms, zzjc, zzbz"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="机构名称">
              <j-tree-select placeholder="请选择机构名称"
                             v-model="queryParam.zzbz"
                             treeNodeFilterProp="title"
                             pid-field="sjzzbz"
                             dict="v_hr_bas_organization_cmms, zzjc, zzbz"
                             :showSearch="true"
                             :treeDefaultExpandAll="true"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户经理标识">
              <a-input placeholder="请输入客户经理标识" v-model="queryParam.khjlbz"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户经理名称">
              <a-input placeholder="请输入客户经理名称" v-model="queryParam.ygxm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="支行级别">
              <j-dict-select-tag
                placeholder="请选择支行级别"
                v-model="queryParam.djbh"
                dictCode="eweb:v_grade_custstar_zhdj,djms,djbh"
              />
          <!--    <a-select placeholder="全部" v-model="queryParam.djms">
                <a-select-option value="1">
                  1A支行
                </a-select-option>
                <a-select-option value="2">
                  1B支行
                </a-select-option>
              </a-select>-->
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
      <!--<a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button icon="download" @click="handleExportXls('客户经理评定明细统计')" v-has="'Khjlpdmxtj:exp'">导出</a-button>
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
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
        :scroll="{x:6650}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" v-has="'Khjlpdmxtj:edit'">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a v-has="'Khjlpdmxtj:del'">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <khjlpdmxtj-modal ref="modalForm" @ok="modalFormOk"></khjlpdmxtj-modal>
  </a-card>
</template>

<script>
  import KhjlpdmxtjModal from './modules/KhjlpdmxtjModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import {filterObj} from "@/utils/util";
  import JTreeSelect from '@/components/jeecg/JTreeSelect'

  export default {
    name: "KhjlpdmxtjList",
    mixins:[JeecgListMixin],
    components: {
      KhjlpdmxtjModal,JTreeSelect
    },
    data () {
      return {
        description: '客户经理评定明细统计管理页面',
        dateValue: '',
        pdzqD: null,
        pdzqM: null,
        pdzqQ: null,
        pdzqY: null,
        pdnf:'',
        jdssnf:'',
        pdjd:'',
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
            title: '评定周期',
            align:"center",
            dataIndex: 'pdzq_dictText'
           },
		   {
            title: '评定日期',
            align:"center",
            dataIndex: 'pdrq'
           },
		   /*{
            title: '等级编号',
            align:"center",
            dataIndex: 'djbh'
           },*/
		   {
            title: '支行级别',
            align:"center",
            dataIndex: 'djms'
           },
		   {
            title: '支行名称',
            align:"center",
            dataIndex: 'zzbz_dictText'
           },
		   {
            title: '机构名称',
            align:"center",
            dataIndex: 'sjzzbz_dictText'
           },
		   /*{
            title: '岗位标识',
            align:"center",
            dataIndex: 'gwbz'
           },*/
		   /*{
            title: '员工工号',
            align:"center",
            dataIndex: 'yggh'
           },*/
		   {
            title: '客户经理标识',
            align:"center",
            dataIndex: 'khjlbz'
           },
		   {
            title: '客户经理名称',
            align:"center",
            dataIndex: 'ygxm'
           },


          {
            title:'岗位资质',
            children:[
          {
            title: '会计证',
            align: "center",
            dataIndex: 'kjz_dictText'
          },
          {
            title: '银行业从业资格证',
            align: "center",
            dataIndex: 'yhycyzgz_dictText'
          },
          {
            title: '计算机操作证',
            align: "center",
            dataIndex: 'jsjczz_dictText'
          },
          {
            title: '计分',
            align: "center",
            dataIndex: 'gwzzDf'
          },
          ]
      },

          {
            title:'考试培训',
            children:[
          {
            title: '测试成绩',
            align: "center",
            dataIndex: 'pxksJg'
          },
          {
            title: '平均分',
            align: "center",
            dataIndex: 'pxksRw'
          },
          {
            title: '计分',
            align: "center",
            dataIndex: 'pxksDf'
          }
          ]
      },


          {
            title:'存款管理',
            children:[
          {
            title: '存款日平',
            align: "center",
            dataIndex: 'cknrpJg'
          },
          {
            title: '平均存款日平',
            align: "center",
            dataIndex: 'cknrpRw'
          },
          {
            title: '计分',
            align: "center",
            dataIndex: 'cknrpDf'
          }
          ]
      },


          {
            title:'贷款管理',
            children:[

          {
            title: '贷款日平',
            align: "center",
            dataIndex: 'dknrpJg'
          },
          {
            title: '平均贷款日平',
            align: "center",
            dataIndex: 'dknrpRw'
          },
          {
            title: '计分',
            align: "center",
            dataIndex: 'dknrpDf'
          }
          ]
      },


          {
            title:'贷款户数',
            children:[
          {
            title: '贷款户数',
            align: "center",
            dataIndex: 'dkhsJg'
          },
          {
            title: '平均贷款户数',
            align: "center",
            dataIndex: 'dkhsRw'
          },
          {
            title: '计分',
            align: "center",
            dataIndex: 'dkhsDf'
          }
          ]
      },


          {
            title: '不良贷款管理',
            children: [
              {
                title: '表内不良占比（%）',
                align: "center",
                dataIndex: 'bndkzbJg'
              },
              {
                title: '平均不良占比（%）',
                align: "center",
                dataIndex: 'bndkzbRw'
              },
              {
                title: '计分',
                align: "center",
                dataIndex: 'bndkzbDf'
              }
            ]
          },

          {
            title:'表外不良收回',
            children:[
              {
                title: '表外不良收回',
                align: "center",
                dataIndex: 'bwbldkqsJg'
              },
              {
                title: '不良收回占比（%）',
                align: "center",
                dataIndex: 'bwbldkqszbRw'
              },
              {
                title: '支行年度任务（%）',
                align: "center",
                dataIndex: 'bwbldkqszbJg'
              },
              {
                title: '计分',
                align: "center",
                dataIndex: 'bwbldkqszbDf'
              }
            ]
          },

          {
            title: '贷款到期收回率',
            children: [
              {
                title: '以前年度发放当年到期（%）',
                align: "center",
                dataIndex: 'yqndqshlJg'
              },
              {
                title: '计分',
                align: "center",
                dataIndex: 'yqndqshlDf'
              },
              {
                title: '当年发放当年到期（%）',
                align: "center",
                dataIndex: 'dndqshlJg'
              },
              {
                title: '计分',
                align: "center",
                dataIndex: 'dndqshlDf'
              }
            ]
          },


          {
            title: '贷记卡管理',
            children: [
              {
                title: '贷记卡管理数',
                align: "center",
                dataIndex: 'djkhysJg'
              },
              {
                title: '平均管理数（%）',
                align: "center",
                dataIndex: 'djkhysRw'
              },
              {
                title: '计分',
                align: "center",
                dataIndex: 'djkhysDf'
              },

              {
                title: '贷记卡不良',
                align: "center",
                dataIndex: 'djkxzblJg'
              },
              {
                title: '计分',
                align: "center",
                dataIndex: 'djkxzblDf'
              }
            ]
          },


          {
            title: '新业务管理',
            children: [
              {
                title: '手机银行',
                align: "center",
                dataIndex: 'sjyhJg'
              },
              {
                title: '满分考核数',
                align: "center",
                dataIndex: 'sjyhRw'
              },
              {
                title: '计分',
                align: "center",
                dataIndex: 'sjyhDf'
              },

             /* {
                title: '口袋零钱',
                align: "center",
                dataIndex: 'kdlqJg'
              },
              {
                title: '满分考核数',
                align: "center",
                dataIndex: 'kdlqRw'
              },
              {
                title: '计分',
                align: "center",
                dataIndex: 'kdlqDf'
              },*/

              {
                title: 'ETC',
                align:"center",
                dataIndex: 'etcJg'
              },
              {
                title: '满分考核数',
                align:"center",
                dataIndex: 'etcRw'
              },
              {
                title: '计分',
                align:"center",
                dataIndex: 'etcDf'
              },
              {
                title: '贷记卡',
                align:"center",
                dataIndex: 'djkJg'
              },
               {
                title: '满分考核数',
                align:"center",
                dataIndex: 'djkRw'
              },
                 {
                title: '计分',
                align:"center",
                dataIndex: 'djkDf'
              },
              {
                title: '收单商户',
                align:"center",
                dataIndex: 'sdshJg'
              },
              {
                title: '满分考核数',
                align:"center",
                dataIndex: 'sdshRw'
              },
            {
                title: '计分',
                align:"center",
                dataIndex: 'sdshDf'
              },

            ]
          },

          {
            title: '支行评价',
            children: [
              {
                title: '评价结果',
                align: "center",
                dataIndex: 'zhzhpjJg_dictText'
              },
              {
                title: '计分',
                align: "center",
                dataIndex: 'zhzhpjDf'
              }
            ]
          },

          {
            title: '总部评价',
            children: [
              {
                title: '优秀得票率',
                align: "center",
                dataIndex: 'zbzhpjJg'
              },
              {
                title: '扣分',
                align: "center",
                dataIndex: 'zbzhpjkfJg'
              },
              {
                title: '计分',
                align: "center",
                dataIndex: 'zbzhpjDf'
              }
            ]
          },
		   /*{
            title: 'posJg',
            align:"center",
            dataIndex: 'posJg'
           },
		   {
            title: 'posDf',
            align:"center",
            dataIndex: 'posDf'
           },
		   {
            title: 'posRw',
            align:"center",
            dataIndex: 'posRw'
           },*/

		   {
            title: '加分项',
            align:"center",
            dataIndex: 'jfxDf'
           },
		   {
            title: '扣分项',
            align:"center",
            dataIndex: 'kfxDf'
           },
          {
            title: '总得分',
            align:"center",
            dataIndex: 'pjdf'
          },
          {
            title: '评定等级',
            align:"center",
            dataIndex: 'ssdj_dictText'
          },


          /*{
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }*/
        ],
		url: {
          list: "/khjlpdmxtj/khjlpdmxtj/list",
          delete: "/khjlpdmxtj/khjlpdmxtj/delete",
          deleteBatch: "/khjlpdmxtj/khjlpdmxtj/deleteBatch",
          exportXlsUrl: "khjlpdmxtj/khjlpdmxtj/exportXls",
          importExcelUrl: "khjlpdmxtj/khjlpdmxtj/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created(){
      this.dqnf();
    },

    methods: {
      // 评定周期下拉框选中项变更Func
      handlePdzq(){
        var param = this.queryParam
        if(param.pdzq=="DD"){
          this.pdzqD=true
          this.pdzqM=false
          this.pdzqQ=false
          this.pdzqY=false
        }else if(param.pdzq=="MM") {
          this.pdzqD=false
          this.pdzqM=true
          this.pdzqQ=false
          this.pdzqY=false
        } else if (param.pdzq=="Q") {
          this.pdzqD=false
          this.pdzqM=false
          this.pdzqQ=true
          this.pdzqY=false
        } else if (param.pdzq=="YYYY") {
          this.pdzqD=false
          this.pdzqM=false
          this.pdzqQ=false
          this.pdzqY=true
        }
      },

      // 获取当前年份
      dqnf(){
        var myDate = new Date;
        var year = myDate.getFullYear();
        this.initSelectYear(year)
      },
      // 初始化年份选择下拉框
      initSelectYear(year){
        this.years = [];
        for(let i=0; i<30; i++){
          this.years.push({value:((year - i)+''),label:((year - i)+'')});
        }
      },
      // 下拉选择Func
      selectValue(value){
        console.log('KhjlpdmxtjList => selectValue(value)')
        console.log('selectValue::::'+value)
        let val=value;
        this.$emit('change', val);
      },

      // 查询条件[pdrq]格式化Func
      getQueryParams() {
        console.log('KhjlpdmxtjList => getQueryParams()')
        console.log(this.pdnf)
        let pdzq=this.queryParam.pdzq
        let pdrqMoment=""
        if (this.queryParam.pdzq  || this.queryParam.pdrq) {
          if(pdzq=="DD"){
            if (this.queryParam.pdrq != null && this.queryParam.pdrq != 'undefined'){
              pdrqMoment=this.queryParam.pdrq.format("YYYY-MM-DD")
            }
          }else if(pdzq=="MM") {
            if (this.queryParam.pdrq != null && this.queryParam.pdrq != 'undefined') {
              pdrqMoment=this.queryParam.pdrq.format("YYYY-MM")+"-01"
            }
          } else if (pdzq=="Q") {
            if (this.jdssnf != '' && this.pdjd != '') {
              let day = new Date(this.jdssnf,this.pdjd,0)
              //let dayCount = day.getDate()
              pdrqMoment=this.jdssnf + '-' + this.pdjd + '-01'
            }
          } else if (pdzq=="YYYY") {
            if (this.pdnf != '') {
              pdrqMoment=this.pdnf + '-01-01'
            }
          }
        }
        console.log('查询 => pdzq::::::::::' + pdzq)
        console.log('查询 => pdrqMoment::::' + pdrqMoment)
        var param=Object.assign({},this.queryParam,this.isorter);
        param.field=this.getQueryField();
        param.pageNo=this.ipagination.current;
        param.pageSize=this.ipagination.pageSize;
        param.pdrq=pdrqMoment;
        return filterObj(param);
      },

      // 查询条件重置Func
      searchReset() {
        this.queryParam = {}
        // 重置时清除季度所属年份
        this.jdssnf=''
        // 重置时清除评定年份
        this.pdjd=''
        this.pdnf =''

        this.loadData(1)
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>