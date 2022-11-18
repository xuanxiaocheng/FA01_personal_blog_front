<template>
  <div class="aboutContainer">
    <div class="card">
      <h1>Xuan Xiaocheng</h1>
      <h2>2313821795@qq.com</h2>
      <h3>Contact me by mail</h3>
      <h4>11 / 29</h4>
    </div>
    <div class="circle"></div>
    <div
      class="rect"
      v-for="item in svgConfig"
      :key="item.svgName"
      @click="item.clickEvent"
    >
      <SvgIcon :name="item.svgName" class="githubIcon"></SvgIcon>
      <div class="svgText">{{ item.svgText }}</div>
    </div>
    <footer>
      <a href="https://beian.miit.gov.cn">粤ICP备2020077344号</a>
    </footer>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, ref, reactive, defineComponent } from "vue";
import Loading from "../../components/Loading.vue";
import githubIcon from "./assets/svg/github.svg";
import { useRouter } from "vue-router";
import { useCounterStore } from "../../store";

export default defineComponent({
  components: {
    Loading,
  },
  setup() {
    const data = useCounterStore();
    data.$patch((state) => {
      console.log(state.count);
    });
    const router = useRouter();
    const svgConfig = [
      {
        svgName: "article",
        svgText: "Article",
        clickEvent: () => {
          router.push({ path: "/article", query: { type: "recommend" } });
        },
      },
      {
        svgName: "github",
        svgText: "Github",
        clickEvent: () => {
          window.open("https://github.com/xuanxiaocheng");
        },
      },
      {
        svgName: "npm",
        svgText: "NPM",
        clickEvent: () => {
          window.open("https://www.npmjs.com/~xuanxiaocheng");
        },
      },
    ];

    return {
      svgConfig,
    };
  },
});
</script>

<style lang="less" scoped>
.card {
  color: #fff;
  position: absolute;
  right: 100px;
  bottom: 100px;
  z-index: 10;
  font-family: sans-serif;
  text-align: center;
  width: 300px;
  height: 500px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  border-left: 1px solid rgba(255, 255, 255, 0.4);
  background: linear-gradient(
    to top right,
    rgba(90, 149, 207, 0.5),
    rgba(58, 76, 99, 0.8)
  );
  box-shadow: 10px -10px 20px rgba(0, 0, 0, 0.2),
    -10px 10px 20px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(6px);
  border-radius: 20px;
  transform: rotate(-15deg);
}

h1 {
  color: #fff;
  margin-top: 50px;
}

h2 {
  color: #fff;
  margin-top: 250px;
}

h3,
h4 {
  color: #fff;
  padding-left: 60px;
  text-align: left;
}

h3 {
  margin-top: 40px;
  text-transform: uppercase;
}

h4 {
  margin-top: 10px;
}

.circle {
  width: 160px;
  height: 160px;
  position: absolute;
  right: 240px;
  bottom: 20px;
  background: linear-gradient(to top left, rgb(135 116 249), rgb(75 162 237));
  border-radius: 80px;
}

.rect {
  width: 160px;
  height: 160px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1000;
}

.rect:hover {
  transform: scale(1.08);
  cursor: pointer;
}

.aboutContainer {
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(
      circle at 60% 90%,
      rgba(46, 103, 161, 1),
      transparent 60%
    ),
    radial-gradient(
      circle at 20px 20px,
      rgba(46, 103, 161, 0.8),
      transparent 25%
    ),
    #182336;

    footer{
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translate(-50%, 0);
      color: #fff;

      a{
        color: #fff;
      }
    }
}

.githubIcon {
  height: 100px;
  width: 100px;
}

.svgText {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
}

//适配移动端
@media (max-width: 992px) {
  .card {
    bottom: 0;
    right: 0;
    height: 400px;
  }

  h2 {
    margin-top: 100px;
  }

  .rect {
    width: 50vw;
    display: inline-flex;
  }
}
</style>
