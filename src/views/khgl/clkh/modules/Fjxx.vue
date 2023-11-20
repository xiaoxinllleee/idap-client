<template>
  <a-card class="card" :bordered="false">
    <a-list-item class="DefaultListItem" term="图片上传">图片上传</a-list-item>
    <a-divider style="margin-top: 5px; margin-bottom: 5px;"/>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="16">
        <a-form-item :labelCol="labelCol"
                     :wrapperCol="wrapperCol"
                     label="上传图片">
          <j-upload
            text="上传图片"
            listType="picture"
            class="upload-list-inline"
            @change="imageUploadChange"
            :value="imagePaths"
            fileType="image"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-list-item class="DefaultListItem" term="文件上传">文件上传</a-list-item>
    <a-divider style="margin-top: 5px; margin-bottom: 5px;"/>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="16">
        <a-form-item :labelCol="labelCol"
                     :wrapperCol="wrapperCol"
                     label="上传文件">
          <j-upload
            text="上传文件"
            listType="text"
            @change="fileUploadChange"
            :value="filePaths"
            fileType="file"
          />
        </a-form-item>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
  import JUpload from '@/components/jeecg/JUpload'

  export default {
    name: 'Fjxx',
    components: {
      JUpload
    },
    data () {
      return {
        model: {
          zlxxImage: [{}],
          zlxxFile: [{}],
        },
        imagePaths: "",
        filePaths: "",
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      }
    },
    methods: {
      imageUploadChange(data) {
        // this.customerVisitModel.customerVisitFjxxImage = [];
        let path = data.path
        let deletePath = data.deletePath
        let paths = path.split(',');
        console.log("path")
        console.log(path)
        console.log(paths)
        if (deletePath.length > 0) {
          let deletePaths = deletePath.split(',')
          deletePaths.forEach((value, index)=>{
            let image = this.customerVisitModel.customerVisitFjxxImage.find((item)=>{
              return item.fwlj===value;
            })
            if (image) {
              image.lrbz = 3
            }
          })
        }
        paths.forEach((value, index)=>{
          if (value.length > 0) {
            if(this.customerVisitModel.customerVisitFjxxImage.find((item)=>{
              return item.fwlj===value;
            })) {
              console.log("已经存在的图片")
            } else {
              let fjxx = {};
              fjxx.fjlx = 1;
              fjxx.fwlj = value;
              this.customerVisitModel.customerVisitFjxxImage.push(fjxx)
            }
          }

        })
      },
      fileUploadChange(data) {
        let path = data.path
        let deletePath = data.deletePath
        let paths = path.split(',');
        if (deletePath.length > 0) {
          let deletePaths = deletePath.split(',')
          deletePaths.forEach((value, index)=>{
            let image = this.customerVisitModel.customerVisitFjxxVideo.find((item)=>{
              return item.fwlj===value;
            })
            if (image) {
              image.lrbz = 3
            }
          })
        }
        paths.forEach((value, index)=>{
          if (value.length > 0) {
            if(this.customerVisitModel.customerVisitFjxxVideo.find((item)=>{
              return item.fwlj===value;
            })) {
              console.log("已经存在的图片")
            } else {
              let fjxx = {};
              fjxx.fjlx = 2;
              fjxx.fwlj = value;
              this.customerVisitModel.customerVisitFjxxVideo.push(fjxx)
            }
          }
        })
      }
    },
  }
</script>

<style scoped>
  .ant-btn {
    padding: 0 10px;
    margin-left: 3px;
  }
  .ant-form-item-control {
    line-height: 0px;
  }
  /** 主表单行间距 */
  .ant-form .ant-form-item {
    margin-bottom: 10px;
  }
  /** Tab页面行间距 */
  .ant-tabs-content .ant-form-item {
    margin-bottom: 0px;
  }

  .upload-list-inline >>> .ant-upload-list-item {
    float: left;
    width: 200px;
    margin-right: 8px;
  }
  .upload-list-inline >>> .ant-upload-animate-enter {
    animation-name: uploadAnimateInlineIn;
  }
  .upload-list-inline >>> .ant-upload-animate-leave {
    animation-name: uploadAnimateInlineOut;
  }
  .DefaultListItem {
    color: #1890FF;
    font-weight: 500;
    font-size: 14px;
  }
</style>