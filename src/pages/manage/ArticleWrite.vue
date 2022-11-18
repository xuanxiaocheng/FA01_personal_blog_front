<template>
  <div class="write">
    <!--网站名称-->
    <div class="topControl">
      <p class="websiteName">StarPavilion</p>
      <!--精彩问答不需要上传封面图-->
      <a-button
        v-if="writeTextType == 'goodquestion' || writeTextType == 'goodQuestion'"
        class="updateButton"
        @click="update().updateQuestion()"
      >发布文章</a-button>
      <!--精彩好文需要上传封面图-->
      <a-popover
        placement="bottomLeft"
        style="z-index: 10;"
        trigger="click"
        v-if="writeTextType == 'getGoodText' || writeTextType == 'goodText'"
      >
        <template #content>
          <div class="pictureCard">
            <span v-show="!coverImgSrc">请上传封面图，推荐比例2:1</span>
            <img :src="coverImgSrc" v-show="coverImgSrc" id="cropperImg" style="width: 100%;" />
          </div>
          <el-divider></el-divider>
          <div class="popoverControl">
            <a href="javascript:;" class="file">
              设置封面
              <input
                type="file"
                class="avatar-input"
                @change="cropper().getImgFile"
                id="fileUpload"
                name="file"
              />
            </a>
            <a-button
              @click="update().updateArtical()"
              type="primary"
              size="mini"
              style="position: absolute; right: 2vw"
            >确定发布</a-button>
          </div>
        </template>
        <a-button class="updateButton">
          发布文章
          <i class="el-icon-caret-bottom"></i>
        </a-button>
      </a-popover>
      <a-input v-model:value="articleTitle" style="padding: 10px;">
        <template #addonBefore>
          <div>文章标题</div>
        </template>
        <template #addonAfter></template>
      </a-input>
    </div>
    <mavon-editor
      style="z-index: 1;"
      @imgAdd="markdownMain().markdownImgAdd"
      :ishljs="true"
      codeStyle="vs2015"
      :toolbars="markdownMain().markdownOption"
      v-model="markdown"
      ref="markDown"
    />
  </div>
</template>

<script lang="ts">
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import loading from "../../components/Loading.vue";
import { onMounted } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { getCurrentInstance, defineComponent, reactive, ref, nextTick } from "vue";
import { message } from "ant-design-vue"

export default defineComponent({
  setup() {
    let markDown = ref();
    const route = useRoute();
    const router = useRouter();
    let myCropper = ref()
    const { proxy } = getCurrentInstance() as any;
    let markdown = ref('')
    let articleTitle = ref('')
    let coverImgSrc = ref('')
    let coverImgName = reactive({})
    let articleId = ref('')
    const writeTextType = route.query.type;

    function markdownMain() {

      const markdownOption = {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      };
      /*
      *imgAdd() markdown文章插图上传
      *
      */
      function markdownImgAdd(pos: any, file: any) {
        let formData = new FormData();
        formData.append("image", file);
        let params = {
          imgData: file.miniurl,
          imgMessage: { name: file.name, lastModified: file.lastModified },
        };
        proxy.$axios.post("/api/file/upload", params).then((res: any) => {
          markDown.value.$img2Url(pos, res.data.downloadUrl);
          /*    self.$message({
                  message: "添加成功!",
                  type: "success",
                }); */
        });
      }

      return { markdownOption, markdownImgAdd }
    }

    function update() {

      function successMessage(res: any) {
        if (res.status == 200) {
          router.push({
            name: "Manage"
          });
          message.info('修改成功');
        }
      }

      function updateArtical() {
        if (route.query.id) {
          proxy.$axios.post(`/api/manage/updateGoodText`, {
            markdown: markdown.value,
            articleTitle: articleTitle.value,
            coverImgSrc: coverImgSrc.value,
            articleId: articleId.value
          }).then((res: any) => {
            successMessage(res)
          })
        } else {
          const { myCropper } = cropper()
          let afterCutImg = myCropper.value.getCroppedCanvas({ imageSmoothingQuality: "high" }).toDataURL("image/jpeg")
          proxy.$axios.post("/api/file/upload", { imgData: afterCutImg, imgMessage: coverImgName }).then((res: any) => {
            proxy.$axios.post(`/api/manage/addGoodText`, {
              markdown: markdown.value,
              articleTitle: articleTitle.value,
              coverImgSrc: res.data.downloadUrl,
              articleId: (new Date()).valueOf(),
              createTime: new Date()
            }).then((res: any) => {
              successMessage(res)
            })
          });
        }
      }

      function updateQuestion() {
        let url = route.query.id ? `/api/manage/updateGoodQuestion` : `/api/manage/addGoodQuestion`
        let data = route.query.id ? {
          markdown: markdown.value,
          articleTitle: articleTitle.value,
          articleId: articleId.value
        } : {
          markdown: markdown.value,
          articleTitle: articleTitle.value,
          articleId: (new Date()).valueOf(),
          createTime: new Date()
        }
        proxy.$axios.post(url, data).then((res: any) => {
          successMessage(res)
        })

      }

      return { updateArtical, updateQuestion }

    }

    function cropper() {
      function cropperInit() {
        const image: any = document.getElementById('cropperImg');
        myCropper.value = new Cropper(image, {
          viewMode: 1,
          dragMode: "move",
          initialAspectRatio: 1,
          aspectRatio: 2,
          preview: ".before",
          background: false,
          autoCropArea: 0.6,
          zoomOnWheel: true,
        });
      }

      function getImgFile(e: any) {
        coverImgSrc.value = window.URL.createObjectURL(e.target.files[0])
        coverImgName = { name: e.target.files[0].name, name2: 123 }
        nextTick(() => { cropperInit() })
      }

      return { getImgFile, cropperInit, myCropper }
    }

    onMounted(() => {
      if (route.query.id) {
        proxy.$axios
          .get(`/api/user/${writeTextType}` + `?articleId=${route.query.id}`)
          .then(function (response: any) {
            /*           ({markdown, articleTitle, coverImgSrc} = response.data[0]) */
            ({ articleTitle: articleTitle.value, markdown: markdown.value, coverImgSrc: coverImgSrc.value, articleId: articleId.value } = response.data[0])
          });
      }

    })

    return {
      writeTextType,
      markdown,
      articleTitle,
      coverImgSrc,
      markDown,
      update,
      markdownMain,
      cropper
    };
  },
  components: {
    loading,
  },
})
</script>

<style lang="less" scoped>
.topControl {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: white;
  box-shadow: 0px 3px 7px -7px #5e5e5e;

  &::after {
    clear: both;
    content: "";
    display: block;
  }
}
.v-note-op/deep/ {
  position: sticky;
  top: 94px;
}
div.v-show-content.scroll-style.scroll-style-border-radius pre/deep/ {
  background: #1e1e1e;
  font-size: 100%;
  color: #fff;
}
.popoverControl {
  display: flex;
  align-items: center;
}
.titleInput {
  padding: 10px;
  width: 100%;
}
.updateButton {
  position: relative;
  margin: 10px 10px 0 0;
  z-index: 100;
  float: right;
}
.pictureCard {
  position: relative;
  width: 370px;
  overflow: hidden;
  height: 185px;
  background: #e9ecef;
}
.pictureButton {
  position: absolute;
  right: 5px;
  bottom: 5px;
}
.swiper {
  margin: 2.5vw 2vw;
}
.file {
  position: relative;
  display: inline-block;
  background: #d0eeff;
  border: 1px solid #99d3f5;
  border-radius: 4px;
  padding: 4px 12px;
  overflow: hidden;
  color: #1e88c7;
  text-decoration: none;
  text-indent: 0;
  line-height: 20px;

  &:hover {
    background: #aadffd;
    border-color: #78c3f3;
    color: #004974;
    text-decoration: none;
  }
}
.file input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}

.websiteName {
  color: #000;
  font-weight: 600;
  font-size: 20px;
  letter-spacing: 1px;
  background: white;
  padding: 4px 8px;
  border-radius: 2px;
  position: relative;
  top: 10px;
  left: 10px;
  //opacity: 0.5;
  transition: all 0.4s ease;
  z-index: 2;
  display: inline;
}
.TopCard {
  padding: 10px;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
}
</style>
