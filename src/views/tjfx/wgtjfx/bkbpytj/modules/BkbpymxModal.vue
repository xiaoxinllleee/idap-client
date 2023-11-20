<template>
  <a-modal
    :title="title"
    :width="1450"
    :visible="visible"
    @ok="handleCancel"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    >
        <a-table ref="table"
                 size="middle"
                 bordered
                 :columns="colunms"
                 :dataSource="dataSource"
                 rowKey="id"
                 :pagination="ipagination"
                 :loading="loading"
                 v-if="this.lx =='1' || this.lx=='2'"
                 @change="handleTableChange"
        />
        <a-table ref="table"
                 size="middle"
                 bordered
                 :columns="bysx"
                 :dataSource="dataSource"
                 rowKey="id"
                 :pagination="ipagination"
                 :loading="loading"
                 v-if="this.lx == '3'"
                 @change="handleTableChange"
        />
        <a-table ref="table"
                 size="middle"
                 bordered
                 :columns="sxhs"
                 :dataSource="dataSource"
                 rowKey="id"
                 :pagination="ipagination"
                 :loading="loading"
                  v-if="this.lx == '4' || this.lx == '5'"
                  @change="handleTableChange"
        />

    <a-table ref="table"
             size="middle"
             bordered
             :columns="qxfkColunms"
             :dataSource="dataSource"
             rowKey="id"
             :pagination="ipagination"
             :loading="loading"
             v-if="this.lx == 'qxfk'"
             @change="handleTableChange"
    />
  </a-modal>
</template>

<script>
import { httpAction, putAction } from '@/api/manage'
import { getAction } from '@api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { filterObj } from '@/utils/util'

  export default {
    name: "BkbpymxModal",
    mixins:[JeecgListMixin],
    data () {
      return {
        title:"详情",
        dataSource: [],
        lx:'',
        // 分页参数
        ipagination: {
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
        wgbh:'',
        sszh:'',
        visible: false,
        loading: false,
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        confirmLoading: false,

        colunms: [
          { title: '所属网络', dataIndex: 'wgbh_dictText' },
          { title: '户号编码', dataIndex: 'hhbm' },
          { title: '户主姓名', dataIndex: 'hzxm' },
          { title: '户主证件号码', dataIndex: 'hzzjhm' },
          { title: '授信对象', dataIndex: 'sxdx' },
          { title: '评议次数', dataIndex: 'pycs' },
          { title: '评议额度', dataIndex: 'pyed' },
          { title: '评议员建议额度', dataIndex: 'pyyjyed' },
        ],
        bysx: [
          { title: '所属网络', dataIndex: 'wgbh_dictText' },
          { title: '户号编码', dataIndex: 'hhbm' },
          { title: '户主姓名', dataIndex: 'hzxm' },
          { title: '户主证件号码', dataIndex: 'hzzjhm' },
          { title: '授信对象', dataIndex: 'sxdx' },
          { title: '不予授信情形', dataIndex: 'bysxqx' },
        ],
        sxhs: [
          { title: '所属网络', dataIndex: 'wgbh_dictText' },
          { title: '户号编码', dataIndex: 'hhbm' },
          { title: '户主姓名', dataIndex: 'hzxm' },
          { title: '户主证件号码', dataIndex: 'hzzjhm' },
          { title: '授信对象', dataIndex: 'sxdx' },
          { title: '评议员建议额度', dataIndex: 'pyyjyed' },
          { title: '授信额度', dataIndex: 'sxed' },
          { title: '贷款金额', dataIndex: 'dkje' },
          { title: '贷款余额', dataIndex: 'dkye' },
        ],
        qxfkColunms: [
          { title: '所属网络', dataIndex: 'wgbh_dictText' },
          { title: '户号编码', dataIndex: 'hhbm' },
          { title: '户主姓名', dataIndex: 'hzxm' },
          { title: '户主证件号码', dataIndex: 'hzzjhm' },
          { title: '授信对象', dataIndex: 'sxdx' },
          { title: '评议员建议额度', dataIndex: 'pyyjyed' },
          { title: '风控等级', dataIndex: 'fkdj_dictText' },
        ],
        url: {
          list: "/wgtjfx/bkbpymx/list",
          edit: "/wgtjfx/bkbpymx/edit",
        },
      }
    },

    computed: {

    },

    created () {
    },
    methods: {
      init(record,lx, type){
        console.log(record+"init")
        this.visible = true;
        this.ypyhs(record,lx,type);
      },
      initParam(record, lx, type) {
        let params ={
          'lx': lx,
        }
        if (type == 1) {
          params.wgbh = record.wgbh
        } else if (type == 2) {
          params.sszh = record.sszh
        }
        return params
      },
      ypyhs (record,lx,type) {
        console.log(lx+"ypyhs11111")
          console.log(record+"ypyhs")
          this.lx = lx
          this.wgbh = record.wgbh
        this.sszh = record.sszh
          let params = this.initParam(record, lx, type)
        console.log('params', params)
            getAction(this.url.list,params).then((res)=>{
              console.log(res)
              this.dataSource = res.result.records;
              this.ipagination.total = res.result.total;
              this.loading = false;
            });
      },



      close () {
        this.visible = false;
        this.dataSource = []
        this.ipagination.current=1
        this.ipagination.pageSize=10
      },

      handleCancel () {
        this.visible = false
        this.close()
      },
      getQueryParams() {
        var param = Object.assign({'sszh': this.sszh, 'wgbh': this.wgbh,'lx':this.lx}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        return filterObj(param);
      },
      getQueryField() {
        //TODO 字段权限控制
      },
      handleTableChange(pagination, filters, sorter) {
        //分页、排序、筛选变化时触发
        //TODO 筛选
        if (Object.keys(sorter).length > 0) {
          this.isorter.column = sorter.field;
          this.isorter.order = "ascend" == sorter.order ? "asc" : "desc"
        }
        this.ipagination = pagination;
        this.loadData();
      },

    }
  }
</script>

<style lang="less" scoped>

</style>