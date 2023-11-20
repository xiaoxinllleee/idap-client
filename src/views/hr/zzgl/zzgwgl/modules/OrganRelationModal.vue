<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :destroyOnClose="true"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">



    <table>
      <tr>
        <td><div class="div1">
    <a-radio-group @change="onChange">
      <ol>
        <li v-for="todo in roles">

          <a-radio :value="todo.gwbz">
            {{ todo.gwmc }}
          </a-radio>
        </li>
      </ol>
    </a-radio-group>

        </div>
        </td>
        <td><div class="div2">
          <a-tree
            v-model="checkedKeys"
            checkable
            :expanded-keys="expandedKeys"
            :auto-expand-parent="autoExpandParent"
            :selected-keys="selectedKeys"
            :tree-data="treeData"
            @expand="onExpand"
            @select="onSelect"
          />
        </div></td>
      </tr>
    </table>


  </a-modal>
</template>

<script>
import { getAction, httpAction, postAction, putAction } from '@/api/manage'
import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import pick from 'lodash.pick'
  import moment from "moment"
import JSelectYgxx from '@views/khgl/glgxgl/modules/JSelectYgxx'

  export default {
    name: "HrBasOrganPostModal",
    components:{JTreeSelect,JSelectYgxx},
    data () {
      return {
        title:"操作",
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
        treeData:[],
        expandedKeys: [],
        autoExpandParent: true,
        checkedKeys: [],
        selectedKeys: [],
        roles: [],
        radioValue:""

      }
    },
    created () {
    },
    methods: {
      onExpand(expandedKeys) {
        console.log('onExpand', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.expandedKeys = expandedKeys;
        this.autoExpandParent = false;
      },
      onCheck(checkedKeys) {
        console.log('onCheck', checkedKeys);
        this.checkedKeys = checkedKeys;
      },
      onChange(e) {
        console.log(e);
        console.log('radio checked', e.target.value);
        this.radioValue=e.target.value;
        //console.log('radio checked', e.target.value);

      },
      onSelect(selectedKeys, info) {
        console.log('onSelect', info);
        this.selectedKeys = selectedKeys;
      },
      add () {
        this.edit({});
      },
      edit (record) {
        /*this.form.resetFields();
        this.model = Object.assign({}, record);*/

        getAction('/sys/hrBasOrganization/queryTreeList').then((res) => {
          if (res.success) {
            console.log(res.result)
            this.treeData = res.result
          }else{
            this.$message.error(res.message,5);
            this.loading = false;
          }
        })

        getAction('/gwxxgl/hrBasPost/listAll').then((res) => {
          if (res.success) {
            console.log(res.result)
            this.roles = res.result
          }else{
            this.$message.error(res.message,5);
            this.loading = false;
          }
        })


        this.visible = true;
        /*this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'zzbz','gwbz','sfqy'))
		  //时间格式化
        });*/

      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {

        if (this.radioValue == null || this.radioValue == ''){
          this.$message.error("未选择角色");
          return ;
        }

        if (this.checkedKeys == null || this.checkedKeys==''){
          this.$message.error("未选择银行");
          return ;
        }


        const params = {}
        params.radioValue = this.radioValue;
        params.checkedKeys =  this.checkedKeys;
        postAction('zzgwgl/hrBasOrganPost/relation', params).then((res) => {
          this.$message.info(res.message);
        })




      },
      handleCancel () {
        this.close()
      },


    },
    watch: {
      checkedKeys(val) {
        console.log('onCheck', val);
      },
    },
  }
</script>

<style lang="less" scoped>
.div1{
  height: 400px;
  width: 400px;
  overflow: scroll;
}
.div2{
  height: 400px;
  width: 370px;
  overflow: auto;
}
</style>