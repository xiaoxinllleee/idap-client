<template>
  <j-modal
    :title="title"
    width="75%"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :okButtonProps="{ props: {disabled: true} }"
    :destroyOnClose="true"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <Row type="flex" justify="center" style="height: 400px">
        <Col :md="8" :lg="8" :xl="5">
          <Alert show-icon>
            机构选择：
          </Alert>
          <div class="tree-bar">
            <a-input-search style="margin-bottom: 8px" placeholder="Search" @change="onChange" />
            <a-directory-tree
              style="height: 680px"
              selectable
              :defaultExpandAll="true"
              :checkable="true"
              :checkStrictly="true"
              v-model="checkedKeys"
              @check="onSelect"
              :dropdownStyle="{maxHeight:'200px',overflow:'auto'}"
              :treeData="departTree"
            />
          </div>
        </Col>
        <Col :md="8" :lg="8" :xl="9" style="margin-left:10px;">
          <Alert type="warning" show-icon >岗位选择</Alert>
          <div class="tree-bar" >
            <div>
              <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
                <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
                <a style="margin-left: 24px" @click="onClearSelected">清空</a>
              </div>
              <a-table
                :pagination="{ pageSize: 50 }"
                :scroll="{ y: 400 }"
                ref="table"
                size="small"
                bordered
                rowKey="gwbz"
                :columns="columns"
                :dataSource="dataSource"
                :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
              >
              </a-table>
            </div>
          </div>
        </Col>
      </Row>
    </a-spin>
  </j-modal>
</template>

<script>
  export default {
    name: "SelectGwModal",
    data () {
      return {
        title: '岗位选择',
        visible: false,
        model: {},
        confirmLoading: false,
        departTree: [],
        checkedKeys:[],
        checkedNodes: [],
        selectedRowKeys: [],
        selectionRows: [],
        dataSource:[],
        columns: [
          {
            title: '岗位标识',
            align:"center",
            dataIndex: 'gwbz',
            width: 150,
          },
          {
            title: '岗位名称',
            align:"center",
            dataIndex: 'gwmc',
            width: 150,
          },

        ],
      }
    },
    methods: {
      init(departTree, dataSource){
        this.visible = true
        this.departTree = departTree
        this.dataSource = dataSource
      },
      onSelect(checkedKeys, e) {
        console.log('onSelect', checkedKeys, e.checkedNodes)
        this.checkedKeys=checkedKeys;
        this.checkedNodes = e.checkedNodes

      },
      onClearSelected() {
        this.selectedRowKeys = [];
        this.selectionRows = [];
      },
      onSelectChange(selectedRowKeys, selectionRows) {
        this.selectedRowKeys = selectedRowKeys;
        this.selectionRows = selectionRows;
      },
      onChange(e) {
        const value = e.target.value;
        const expandedKeys = this.departTree
          .map(item => {
            if (item.title.indexOf(value) > -1) {
              return this.getParentKey(item.key, gData);
            }
            return null;
          })
          .filter((item, i, self) => item && self.indexOf(item) === i);
        Object.assign(this, {
          expandedKeys,
          searchValue: value,
          autoExpandParent: true,
        });
      },
      getParentKey(key, tree) {
        let parentKey;
        for (let i = 0; i < tree.length; i++) {
          const node = tree[i];
          if (node.children) {
            if (node.children.some(item => item.key === key)) {
              parentKey = node.key;
            } else if (this.getParentKey(key, node.children)) {
              parentKey = this.getParentKey(key, node.children);
            }
          }
        }
        return parentKey;
      },
      handleOk () {
        console.log('this.selectionRows', this.selectionRows)
        let array = []
        this.checkedNodes.forEach(node => {
          let zzxx = node.data.props
          this.selectionRows.forEach(gwxx => {
            let obj = {id: zzxx.zzbz + '-' + gwxx.gwbz, zzbz: zzxx.zzbz, zzbz_dictText: zzxx.zzjc, gwbz: gwxx.gwbz, gwbz_dictText: gwxx.gwmc}
            array.push(obj)
          })
        })
        console.log('array', array)
        this.$emit("selectFinished", array)
        this.handleCancel()
      },
      handleCancel() {
        this.onClearSelected()
        this.checkedKeys = []
        this.checkedNodes = []
        this.visible = false
      }
    }
  }
</script>

<style scoped>

</style>