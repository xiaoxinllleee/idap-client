<style lang="less">
@import "../../../styles/tree-common.less";
@import "./categoryManage.less";
</style>
<template>
  <div class="search">
    <Card>
      <Row class="operation">
        <Button @click="add" type="primary" icon="md-add">添加子类别</Button>
        <Button @click="addRoot" icon="md-add">添加一级类别</Button>
        <Button @click="delAll" icon="md-trash">批量删除</Button>
        <Button @click="getParentList" icon="md-refresh">刷新</Button>
        <i-switch v-model="strict" size="large" style="margin-left:5px">
          <span slot="open">级联</span>
          <span slot="close">单选</span>
        </i-switch>
      </Row>
      <Row type="flex" justify="start">
        <Col :md="8" :lg="8" :xl="6">
          <Alert show-icon>
            当前选择编辑：
            <span class="select-title">{{editTitle}}</span>
            <a class="select-clear" v-if="form.id" @click="cancelEdit">取消选择</a>
          </Alert>
          <Input
            v-model="searchKey"
            suffix="ios-search"
            @on-change="search"
            placeholder="输入节点名搜索"
            clearable
          />
          <div class="tree-bar">
            <Tree
              ref="tree"
              :data="data"
              :load-data="loadData"
              :render="renderContent"
              show-checkbox
              @on-check-change="changeSelect"
              @on-select-change="selectTree"
              :check-strictly="!strict"
            ></Tree>
            <Spin size="large" fix v-if="loading"></Spin>
          </div>
        </Col>
        <Col :md="15" :lg="13" :xl="9" style="margin-left:10px;">
          <Form ref="form" :model="form" :label-width="85" :rules="formValidate">
            <FormItem label="上级节点" prop="parentTitle">
              <div style="display:flex;">
                <Input v-model="form.parentTitle" readonly style="margin-right:10px;" />
                <Poptip transfer trigger="click" placement="right-start" title="选择上级节点" width="250">
                  <Button icon="md-list">选择分类</Button>
                  <div slot="content" style="position:relative;min-height:5vh">
                    <Tree :data="dataEdit" :load-data="loadData" @on-select-change="selectTreeEdit"></Tree>
                    <Spin size="large" fix v-if="loadingEdit"></Spin>
                  </div>
                </Poptip>
              </div>
            </FormItem>
            <FormItem label="节点类型" prop="type">
              <Select v-model="form.type" placeholder="请选择" clearable>
                <Option value="0">分组</Option>
                <Option value="1">类别</Option>
              </Select>
            </FormItem>
            <FormItem label="类别名称" prop="title">
              <Input v-model="form.title" />
            </FormItem>
            <FormItem label="排序值" prop="sortOrder">
              <Tooltip trigger="hover" placement="right" content="值越小越靠前，支持小数">
                <InputNumber :max="1000" :min="0" v-model="form.sortOrder"></InputNumber>
              </Tooltip>
            </FormItem>
            <FormItem label="是否启用" prop="status">
              <i-switch size="large" v-model="form.status" :true-value="0" :false-value="-1">
                <span slot="open">启用</span>
                <span slot="close">禁用</span>
              </i-switch>
            </FormItem>
            <Form-item class="br">
              <Button
                @click="submitEdit"
                :loading="submitLoading"
                type="primary"
                icon="ios-create-outline"
              >修改并保存</Button>
              <Button @click="handleReset">重置</Button>
            </Form-item>
          </Form>
        </Col>
      </Row>
    </Card>

    <Modal :title="modalTitle" v-model="modalVisible" :mask-closable="false" :width="500">
      <Form ref="formAdd" :model="formAdd" :label-width="85" :rules="formValidate">
        <div v-if="showParent">
          <FormItem label="上级节点：">{{form.title}}</FormItem>
        </div>
        <FormItem label="节点类型" prop="type">
          <Select v-model="formAdd.type" placeholder="请选择" clearable>
            <Option value="0">分组</Option>
            <Option value="1">类别</Option>
          </Select>
        </FormItem>
        <FormItem label="类别名称" prop="title">
          <Input v-model="formAdd.title" />
        </FormItem>
        <FormItem label="排序值" prop="sortOrder">
          <Tooltip trigger="hover" placement="right" content="值越小越靠前，支持小数">
            <InputNumber :max="1000" :min="0" v-model="formAdd.sortOrder"></InputNumber>
          </Tooltip>
        </FormItem>
        <FormItem label="是否启用" prop="status">
          <i-switch size="large" v-model="formAdd.status" :true-value="0" :false-value="-1">
            <span slot="open">启用</span>
            <span slot="close">禁用</span>
          </i-switch>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancelAdd">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="submitAdd">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  initActCategory,
  loadActCategory,
  addActCategory,
  editActCategory,
  deleteActCategory,
  searchActCategory
} from "@/api/activiti";
export default {
  name: "category-manage",
  data() {
    return {
      strict: true,
      loading: true,
      loadingEdit: true,
      modalVisible: false,
      selectList: [],
      selectCount: 0,
      showParent: false,
      modalTitle: "",
      editTitle: "",
      searchKey: "",
      form: {
        id: "",
        title: "",
        parentId: "",
        parentTitle: "",
        type: null,
        sortOrder: 0,
        status: 0,
        url: ""
      },
      formAdd: {
        type: null
      },
      formValidate: {
        title: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        type: [{ required: true, message: "类型不能为空", trigger: "blur" }],
        sortOrder: [
          {
            required: true,
            type: "number",
            message: "排序值不能为空",
            trigger: "blur"
          }
        ]
      },
      submitLoading: false,
      data: [],
      dataEdit: []
    };
  },
  methods: {
    init() {
      this.getParentList();
      this.getParentListEdit();
    },
    renderContent(h, { root, node, data }) {
      let icon = "";
      if (data.type == "0") {
        icon = "md-folder-open";
      } else if (data.type == "1") {
        icon = "ios-bookmark-outline";
      }
      return h(
        "span",
        [
          h("span", [
            h("Icon", {
              props: {
                type: icon,
                size: "16"
              },
              style: {
                "margin-right": "8px",
                "margin-bottom": "3px"
              }
            }),
            h(
              "span",
              data.title
            )
          ])
        ]
      );
    },
    getParentList() {
      this.loading = true;
      initActCategory().then(res => {
        this.loading = false;
        if (res.success) {
          res.result.forEach(function(e) {
            if (e.isParent) {
              e.loading = false;
              e.children = [];
            }
          });
          this.data = res.result;
        }
      });
    },
    getParentListEdit() {
      this.loadingEdit = true;
      initActCategory().then(res => {
        this.loadingEdit = false;
        if (res.success) {
          res.result.forEach(function(e) {
            if (e.isParent) {
              e.loading = false;
              e.children = [];
            }
          });
          // 头部加入一级
          let first = {
            id: "0",
            title: "一级节点"
          };
          res.result.unshift(first);
          this.dataEdit = res.result;
        }
      });
    },
    loadData(item, callback) {
      loadActCategory(item.id).then(res => {
        if (res.success) {
          res.result.forEach(function(e) {
            if (e.isParent) {
              e.loading = false;
              e.children = [];
            }
          });
          callback(res.result);
        }
      });
    },
    search() {
      if (this.searchKey) {
        this.loading = true;
        searchActCategory({ title: this.searchKey }).then(res => {
          this.loading = false;
          if (res.success) {
            this.data = res.result;
          }
        });
      } else {
        this.getParentList();
      }
    },
    selectTree(v) {
      if (v.length > 0) {
        // 转换null为""
        for (let attr in v[0]) {
          if (v[0][attr] == null) {
            v[0][attr] = "";
          }
        }
        let str = JSON.stringify(v[0]);
        let data = JSON.parse(str);
        data.type += "";
        this.form = data;
        this.editTitle = data.title;
      } else {
        this.cancelEdit();
      }
    },
    cancelEdit() {
      let data = this.$refs.tree.getSelectedNodes()[0];
      if (data) {
        data.selected = false;
      }
      this.$refs.form.resetFields();
      this.form.id = "";
      delete this.form.id;
      this.editTitle = "";
    },
    selectTreeEdit(v) {
      if (v) {
        // 转换null为""
        for (let attr in v[0]) {
          if (v[0][attr] == null) {
            v[0][attr] = "";
          }
        }
        let str = JSON.stringify(v[0]);
        let data = JSON.parse(str);
        this.form.parentId = data.id;
        this.form.parentTitle = data.title;
      }
    },
    cancelAdd() {
      this.modalVisible = false;
    },
    handleReset() {
      this.$refs.form.resetFields();
      this.form.status = 0;
    },
    submitEdit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (!this.form.id) {
            this.$Message.warning("请先点击选择要修改的节点");
            return;
          }
          this.submitLoading = true;
          editActCategory(this.form).then(res => {
            this.submitLoading = false;
            if (res.success) {
              this.$Message.success("编辑成功");
              this.init();
              this.modalVisible = false;
            }
          });
        }
      });
    },
    submitAdd() {
      this.$refs.formAdd.validate(valid => {
        if (valid) {
          this.submitLoading = true;
          addActCategory(this.formAdd).then(res => {
            this.submitLoading = false;
            if (res.success) {
              this.$Message.success("添加成功");
              this.init();
              this.modalVisible = false;
            }
          });
        }
      });
    },
    add() {
      if (this.form.id == "" || this.form.id == null) {
        this.$Message.warning("请先点击选择一个节点");
        return;
      }
      this.modalTitle = "添加子类别";
      this.showParent = true;
      this.formAdd = {
        parentId: this.form.id,
        sortOrder: 0,
        status: 0,
        type: null
      };
      this.modalVisible = true;
    },
    addRoot() {
      console.log(11111111111111111)
      this.modalTitle = "添加一级类别";
      this.showParent = false;
      this.formAdd = {
        parentId: 0,
        sortOrder: 0,
        status: 0,
        type: null
      };
      this.modalVisible = true;
    },
    changeSelect(v) {
      this.selectCount = v.length;
      this.selectList = v;
    },
    delAll() {
      if (this.selectCount <= 0) {
        this.$Message.warning("您还未勾选要删除的数据");
        return;
      }
      this.$Modal.confirm({
        title: "确认删除",
        content:
          "您确认要删除所选的 " + this.selectCount + " 条数据及其下级所有数据?",
        loading: true,
        onOk: () => {
          let ids = "";
          this.selectList.forEach(function(e) {
            ids += e.id + ",";
          });
          ids = ids.substring(0, ids.length - 1);
          deleteActCategory("ids="+ids).then(res => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("删除成功");
              this.selectList = [];
              this.selectCount = 0;
              this.cancelEdit();
              this.init();
            }
          });
        }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>