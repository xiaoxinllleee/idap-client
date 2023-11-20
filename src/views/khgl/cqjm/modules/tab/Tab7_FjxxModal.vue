<template>
  <a-tab-pane tab="房产信息" :key="4" :forceRender="true">
    <j-editable-table :ref="refKeys[0]"
                      :loading="FjxxColumn.loading"
                      :columns="FjxxColumn.columns"
                      :data-source="dataSource"
                      :max-height="350"
                      :row-number="false"
                      :row-selection="true"
                      :action-button="true">
      <span slot="action" slot-scope="text, record">
        <!--<photo-view-plugin ref="PhotoViewPlugin"/>
        <a-divider type="vertical"/>-->
        <a-button type="primary" class="orcodebtn" @click="ImageDownload(record)">下载</a-button>
      </span>
    </j-editable-table>
  </a-tab-pane>
</template>

<script>
  import JEditableTable from '../../../../../components/jeecg/JEditableTable'
  import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'
  import { FormTypes } from '../../../../../utils/JEditableTableUtil'
  //import PhotoViewPlugin from '../plugin/photoView'
  import { putAction } from '../../../../../api/manage'

  export default {
    name: 'FjxxModal',
    mixins: [JEditableTableMixin],
    //components: { JEditableTable, PhotoViewPlugin },
    components: { JEditableTable },
    data() {
      return {
        addDefaultRowNum: 1,
        validatorRules: {},
        activeKey: 'FjxxResultList',
        refKeys: ['FjxxResultList'],
        FjxxResultList: [],
        dataSource: [],
        FjxxColumn: {
          loading: false,
          columns: [
            {
              title: '附件编号',
              placeholder: '${title}',
              key: 'fjbh',
              align: "center",
              type: FormTypes.input,
              width: '15%',
            },
            {
              title: '附件名称',
              placeholder: '${title}',
              key: 'fjmc',
              align: "center",
              type: FormTypes.input,
              width: '15%',
            },
            {
              title: '访问路径',
              placeholder: '${title}',
              key: 'fwlj',
              align: "center",
              type: FormTypes.input,
              width: '15%',
            },
            {
              title: '备注',
              placeholder: '${title}',
              key: 'bz',
              align: "center",
              type: FormTypes.input,
              width: '15%',
            },
            {
              title: '上传人',
              placeholder: '${title}',
              key: 'scr',
              align: "center",
              type: FormTypes.input,
              width: '10%',
            },
            {
              title: '上传日期',
              placeholder: '${title}',
              key: 'scsj',
              align: "center",
              type: FormTypes.date,
              width: '15%',
            },
            {
              title: '操作',
              placeholder: '${title}',
              key: 'action',
              align: "center",
              type: FormTypes.slot,
              slotName: "action",
              width: '15%',
            },
          ],
        },
        url: {
          list: "/khgl.cqjm/cqjmJbxx/queryFjxx",
          add: "/khgl.cqjm/cqjmJbxx/addFjxx",
          edit: "/khgl.cqjm/cqjmJbxx/editFjxx",
          path: "/khgl.cqjm/cqjmJbxx/filePath",
        },
      }
    },
    methods: {
      add() {
        var that = this
        that.dataSource = [];
      },
      edit() {
        this.$refs.FjxxResultList.getValues((error, values) => {
          console.log(values)
          this.FjxxResultList = values
        })
      },
      ImageDownload(record) {
        this.HandlerImgDownload(this.orcode, record.fjmc, record.fjbh)
      },
      HandlerImgDownload(imgsrc, name, no) {
        let image = new Image();
        image.setAttribute("crossOrigin","anonymous")
        image.onload = function() {
          let canvas = document.createElement("canvas")
          canvas.width = image.width
          canvas.height = image.height
          let context = canvas.getContext("2d")
          context.drawImage(image, 0, 0, image.width, image.height)
          let url = canvas.toDataURL("image/png")
          let a = document.createElement("a")
          let event = new MouseEvent("click")
          a.download = name||"photo"
          a.href = url
          a.dispatchEvent(event)
        }
        // putAction(this.url, { fjbh: fjbh }).then((res) => {
        //   let result = eval(res)
        //   this.$refs.PhotoViewPlugin.studentImg = result.filePath
        //   image.src = result.filePath
        // })
      },
    },
  }
</script>

<style scoped>
</style>