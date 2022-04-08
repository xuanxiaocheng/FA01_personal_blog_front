<template>
  <div class="context">
    <span v-if="state.isloading">
      <loading></loading>
    </span>
    <span v-if="!state.isloading">
      <div class="top" v-if="state.articleDate.coverImgSrc">
        <img class="topImg" :src="state.articleDate.coverImgSrc" />
      </div>
      <div class="title">
        <i style="margin:0 10px;color:#2a85fa" class="fa fa-code"></i>
        {{ state.articleDate.articleTitle }}
      </div>
      <div class="content">
        <mavon-editor
          :externalLink="externalLink"
          style="z-index: 1;"
          :boxShadow="false"
          :ishljs="true"
          previewBackground="#fff"
          :toolbars="markdownOption"
          v-model="state.articleDate.markdown"
          :subfield="false"
          defaultOpen="preview"
          :editable="false"
        ></mavon-editor>
      </div>
    </span>
  </div>
</template>
<script lang="ts">
import loading from "../components/Loading.vue";
import { useRouter } from "vue-router";
import { getCurrentInstance, reactive } from "vue";
import { onMounted } from "@vue/runtime-core";

interface articleDate {
  articleTitle: string;
  markdown: string;
  articleId: number;
  createTime: string;
  coverImgSrc: string;
}

export default {
  setup() {
    const router = useRouter();
    const { proxy } = getCurrentInstance() as any;
    const markdownOption = {
      toolbarsFlag: false,
    };
    const state = reactive({
      textType: router.currentRoute.value.query.type,
      articleId: router.currentRoute.value.query.articleId,
      isloading: <boolean>true,
      articleDate: <articleDate>{},
    })
    const externalLink = {
      hljs_js() {
        // 这是你的hljs文件路径
        return '/img/highlight.min.js';
      },
      hljs_css() {
        // 这是你的代码高亮配色文件路径
        return '/img/github-markdown.min.css';
      },
      markdown_css: function () {
        // 这是你的markdown css文件路径
        return "img/vs2015.min.css";
      },
      katex_css: function () {
        // 这是你的katex配色方案路径路径
        return "/img/katex.min.css";
      },
      katex_js: function () {
        // 这是你的katex.js路径
        return "/img/katex.min.js";
      },
    }

    onMounted(() => {
      var URL = "/api/user/" + state.textType;
      proxy.$axios
        .get(URL + `?articleId=${state.articleId}`)
        .then(function (response: any) {
          state.articleDate = response.data[0];
          state.isloading = false;
        })
        .catch(function (error: any) {
          console.log(error);
        });
    });

    return {
      markdownOption,
      state,
      externalLink
    };
  },
  components: { loading },
};
</script>
<style lang="less" scoped>
.v-note-wrapper /deep/ {
  border-radius: 0;
}
.markdown-body /deep/ pre {
  background: #1e1e1e;
  font-size: 100%;
  color: #fff;
}
.context {
  min-height: 100vh;
  background: #f9f9f9;
  .top {
    width: 60%;
    border-top-left-radius: 1.5vw;
    border-top-right-radius: 1.5vw;
    overflow: hidden;
    display: flex;
    align-items: center;
    color: #fff;
    position: relative;
    margin: 0 auto;
    top: 20px;

    .topImg {
      width: 60vw;
      position: relative;
      height: 100%;
      z-index: 1;
    }
  }
  .content {
    width: 60%;
    margin: 0 auto;
  }

  .title {
    position: relative;
    margin: 0 auto;
    background: #fff;
    font-size: 25px;
    font-weight: 550;
    width: 60%;
    padding: 20px 10px 0 10px;
    top: 20px;
    z-index: 5;
    min-width: 300px;
    border-top: solid #f1f1f1 1px;
    border-left: solid #f1f1f1 1px;
    border-right: solid #f1f1f1 1px;
  }
}
//适配手机端
@media (max-width: 700px) {
  .context {
    .top {
      width: 100vw;
      overflow: hidden;
      display: block;
      color: #fff;
      position: relative;
      height: 50vw;
      margin: 0 auto;
      top: 0;
      min-width: 300px;

      .topImg {
        width: 100%;
      }
    }
    .content {
      position: relative;
      width: 100vw;
      top: -20px;
    }
    .title {
      width: 100vw;
      top: 0;
    }
  }
}
</style>
