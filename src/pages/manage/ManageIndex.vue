<template>
  <div class="rightContainer">
    <article-nav class="articleNav" @showContext="showContext"></article-nav>
  </div>
  <a-menu
    id="dddddd"
    style="width: 256px; position: fixed; top: 50px; left: 0; height: 100vh;"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    @click="handleClick"
  >
    <a-menu-item key="1">
      <template #icon>
        <AppstoreOutlined />
      </template>
      <span>文章编辑</span>
    </a-menu-item>
    <a-sub-menu key="sub2" @titleClick="titleClick">
      <template #icon>
        <PlusSquareOutlined />
      </template>
      <template #title>新增文章</template>
      <a-menu-item key="2" @click="addNew('goodText')">精彩好文</a-menu-item>
      <a-menu-item key="3" @click="addNew('goodQuestion')">精彩问答</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub4">
      <template #icon>
        <SettingOutlined />
      </template>
      <template #title>管理</template>
      <a-menu-item key="4">密码管理</a-menu-item>
      <a-menu-item key="5">浏览量查看</a-menu-item>
    </a-sub-menu>
  </a-menu>
  <!--   <a-dropdown-button class="dropAdd">
    新建文章
    <template #overlay>
      <a-menu>
        <a-menu-item key="1" @click="addNew('goodText')">精彩好文</a-menu-item>
        <a-menu-item key="2" @click="addNew('goodQuestion')">精彩问答</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown-button>-->
</template>
<script lang="ts">
import { useRouter } from "vue-router";
import articleNav from "../article/ArticalNav.vue";
import TopTabbar from "../../components/TopTabbar.vue";
import { defineComponent, ref, watch } from 'vue';
import { MailOutlined, QqOutlined, AppstoreOutlined, SettingOutlined, PlusSquareOutlined } from '@ant-design/icons-vue';
export default defineComponent({

  setup() {
    const router = useRouter();
    const selectedKeys = ref<string[]>(['1']);
    const openKeys = ref<string[]>(['']);
    const handleClick = (e: Event) => {
      console.log('click', e);
    };
    const titleClick = (e: Event) => {
      console.log('titleClick', e);
    };
    const showContext = (id: number, type: string) => {
      router.push({
        name: "ArticleWrite",
        query: { type: type, id: id },
      });
    };

    const addNew = (type: string) => {
      router.push({
        name: "ArticleWrite",
        query: { type: type, control: "addArtical" },
      });
    };
    watch(
      () => openKeys,
      val => {
        console.log('openKeys', val);
      },
    );
    return {
      selectedKeys,
      openKeys,
      showContext,
      addNew,
      handleClick,
      titleClick,
    };
  },
  components: {
    MailOutlined,
    QqOutlined,
    AppstoreOutlined,
    SettingOutlined,
    PlusSquareOutlined,
    TopTabbar,
    articleNav,
  }
  /*  components: {
     articleNav,
   },
   setup() {
     const router = useRouter();
     const showContext = (id: number, type: string) => {
       router.push({
         name: "ArticleWrite",
         query: { type: type, id: id },
       });
     };
 
     const addNew = (type: string) => {
       router.push({
         name: "ArticleWrite",
         params: { writeType: "addArtical", type: type },
       });
     };
     return {
       showContext,
       addNew,
     };
   }, */
});
</script>
<style lang="less" scoped>
.rightContainer {
  position: relative;
  left: 256px;
  width: 80vw;
}
.articleNav {
  /deep/ .topContainer {
    .websiteName {
      position: relative;
      left: -250px;
    }
  }
}
</style>