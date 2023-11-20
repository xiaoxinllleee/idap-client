<template>
  <a-modal
    :title="title"
    :width="500"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row class="form-row" :gutter="0">
          <a-col :lg="24">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="关联网格">
              <a-tree-select
                style="width:100%"
                show-search
                :dropdownStyle="{maxHeight:'200px',overflow:'auto'}"
                :treeData="gridTree"
                v-decorator="['wgbh', {}]"
                placeholder="请选择所属网格"
                treeNodeFilterProp="title"
                :replaceFields="{ title:'wgmc', key:'id', value:'id'}"
                :loadData="loadGridData"
                @change="treeChange"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { getAction, postAction } from '@/api/manage'
  export default {
    name: 'mapZoneModule',
    data() {
      return {
        title:"操作",
        visible: false,
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
        gridTree: [],
        path: [],
        point: {},
        wgbh: '',
        wgmc: '',
        url: {
          add: '/wghgl/wgzbxx/add',
          queryAreaTreeList: '/yxdyglmain/yxdyglMain/getYxdyglMaimTreeDate',
        },
      }
    },
    methods: {
      init(path, point) {
        //获取网格树
        getAction(this.url.queryAreaTreeList, {previousLevel: '1', pId: '0'}).then(res => {
          if (res.success) {
            // this.expandedAreaKeys.push(res.result[0].id)
            this.gridTree = res.result
          }
        })
        this.path = path
        this.point = point
        this.visible = true
      },
      loadGridData(treeNode) {
        return new Promise(resolve => {
          console.log('loadGridData', treeNode, treeNode.dataRef)
          const {id} = treeNode.dataRef
          //获取网格树
          getAction(this.url.queryAreaTreeList, {previousLevel: '1', pId: id}).then(res => {
            if (res.success) {
              treeNode.dataRef.children = res.result
              this.gridTree = [...this.gridTree]
              // this.expandedAreaKeys.push(res.result[0].id)
            }
            console.log('gridTree', this.gridTree)
            resolve()
          })
        })

      },
      treeChange(value, label, extra) {
        console.log('treeChange', value, label, extra)
        this.wgbh = value
        this.wgmc = label[0]
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        //保存网格信息
        let params = {}
        let paths = []
        this.path.forEach(item => {
          paths.push(`[${item.lng},${item.lat}]`)
        })
        params.polygon = `[${paths.join(',')}]`
        params.longitude = this.point.lng
        params.latitude = this.point.lat
        params.wglx = '4'
        params.wgbh = this.wgbh
        params.wgmc = this.wgmc
        console.log('params', params)
        postAction(this.url.add, params).then(res => {
          if(res.success){
            this.$message.success(res.message);
            this.close();
            this.$emit('ok');
          }else{
            this.$message.warning(res.message,5);
          }
        })
      },
      handleCancel() {
        this.close();
      }
    }
  }
</script>

<style scoped>

</style>