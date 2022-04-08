<template>
  <div class="articalNav">
    <Loading v-if="state.isloading"></Loading>
    <span v-if="!state.isloading">
      <header>
        <div class="headerNav">
          <TopTabbar class="TopTabbar"></TopTabbar>
          <div class="mobileNav" @click="changeTab">
            <span id="goodText" ref="goodTextTab" class="mobileNavTitle active">精彩好文</span>
            <span id="goodQuestion" ref="goodQuestionTab" class="mobileNavTitle">精彩问答</span>
          </div>
        </div>
        <div class="mainCard">
          <div class="leftCard" ref="goodTextShow">
            <div class="textNav">
              <div style="background-color: #fff;">精彩好文</div>
              <a-divider dashed />
            </div>
            <div
              class="textCard"
              v-for="item in getGoodTextState.goodTextDate"
              :key="item.articleId"
            >
              <span @click="showContext(item.articleId, 'getGoodText')">
                <div class="leftCard">
                  <div class="textTitle">{{ item.articleTitle }}</div>
                  <div class="mainText">{{ item.markdown }}</div>
                  <div class="timeText"></div>
                </div>
                <img class="coverImg" :src="item.coverImgSrc" />
              </span>
              <div class="clear"></div>
              <a-divider class="moblieDivider" style="margin: 2vh 0"></a-divider>
            </div>
          </div>
          <div class="rightCard moblieUnDisplay" ref="goodQuestionShow">
            <div class="goodQuestion">
              <div style="font-size: 20px;padding:10px; margin-top: 50px;" class="moblieUnDisplay">
                <div>精彩问答</div>
                <a-divider dashed />
              </div>
              <div class="content-box">
                <el-skeleton class="rightCard_data" animated :count="3">
                  <div
                    class="Card"
                    v-for="(item, index) in getGoodQuestionState.goodQuestionDate"
                    :key="item.articleId"
                    @click="showContext(item.articleId, 'getquestion')"
                  >
                    <span class="indexNum">{{ index + 1 }}</span>
                    <span class="goodQuestionTitle">{{ item.articleTitle }}</span>
                  </div>
                </el-skeleton>
              </div>
            </div>
          </div>
          <div class="clear"></div>
        </div>
      </header>
      <footer>
        <a href="https://beian.miit.gov.cn">粤ICP备2020077344号</a>
      </footer>
    </span>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  getCurrentInstance,
  onMounted,
  nextTick,
  ref,
} from "vue";
import TopTabbar from "./TopTabbar.vue";
import Loading from "./Loading.vue";

interface goodQuestionDate {
  articleTitle: string;
  markdown: string;
  articleId: number;
  createTime: string;
}

interface goodTextDate extends goodQuestionDate {
  coverImgSrc: string;
}

interface getGoodTextState {
  curPage: number;
  goodTextDate: goodTextDate[];
}

export default defineComponent({
  components: {
    TopTabbar,
    Loading,
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance() as any;
    const state = reactive({
      isloading: true,
    });
    const goodQuestionTab: any = ref(null);
    const goodTextTab: any = ref(null)
    const goodTextShow: any = ref(null)
    const goodQuestionShow: any = ref(null)
    function changeTab(e: any) {
      nextTick(() => {
        if (e.target.id == "goodText") {
          goodQuestionShow.value.className = "rightCard moblieUnDisplay";
          goodTextShow.value.className = "leftCard";
          goodTextTab.value.className = "mobileNavTitle active";
          goodQuestionTab.value.className = "mobileNavTitle";
        }
        if (e.target.id == "goodQuestion") {
           goodQuestionShow.value.className = "rightCard";
          goodTextShow.value.className = "leftCard moblieUnDisplay";
          goodTextTab.value.className = "mobileNavTitle";
          goodQuestionTab.value.className = "mobileNavTitle active";
        }
      })
    }

    function showContext(id: number, type: string) {
      emit("showContext", id, type);
    }

    function getGoodtext() {
      const getGoodTextState: getGoodTextState = reactive({
        curPage: 1,
        goodTextDate: [],
      });

      function requestGoodText() {
        return new Promise((resolve, reject) => {
          proxy.$axios
            .get(
              `/api/user/getGoodText?curPage=${getGoodTextState.curPage}&pageSize=5`
            )
            .then(function (response: any) {
              getGoodTextState.goodTextDate = response.data;
              resolve(response);
            })
            .catch(function (error: any) {
              reject(error);
            });
        });
      }

      return { getGoodTextState, requestGoodText };
    }

    function getGoodQuestion() {
      const getGoodQuestionState: {
        goodQuestionDate: goodQuestionDate[];
        curPage: number;
      } = reactive({
        curPage: 1,
        goodQuestionDate: [],
      });

      function requestGoodQuestion() {
        return new Promise((resolve, reject) => {
          proxy.$axios
            .get(
              `/api/user/getquestion?curPage=${getGoodQuestionState.curPage}&pageSize=10`
            )
            .then(function (response: any) {
              getGoodQuestionState.goodQuestionDate = response.data;
              resolve(response);
            })
            .catch(function (error: any) {
              reject(error);
            });
        });
      }

      return { getGoodQuestionState, requestGoodQuestion };
    }

    const { getGoodTextState, requestGoodText } = getGoodtext();
    const { getGoodQuestionState, requestGoodQuestion } = getGoodQuestion();

    onMounted(() => {
      Promise.all([requestGoodText(), requestGoodQuestion()]).then(() => {
        state.isloading = false;
      });
    });

    return {
      state,
      getGoodTextState,
      getGoodQuestionState,
      showContext,
      requestGoodText,
      requestGoodQuestion,
      changeTab,
      goodQuestionTab,
      goodTextTab,
      goodTextShow,
      goodQuestionShow
    };
  },
});
</script>
<style lang="less" scoped>
.leftCard {
  position: inline-block;
  padding: 0 10px;
  width: 60%;
  float: left;
}
.rightCard {
  position: inline-block;
  width: 40%;
  overflow: hidden;
  float: right;
}
.clear {
  clear: both;
}
.mainCard {
  width: 992px;
  margin: 0 auto 50px auto;
  z-index: 1;
}
.goodQuestion {
  padding: 0 20px;
  position: fixed;
  top: 50px;
  width: 30%;
}
.textCard {
  height: 120px;
  margin: 30px 0;
  cursor: pointer;
}
.timeText {
  font-size: 10px;
  color: #acacac;
}
.mainText {
  white-space: normal;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
  margin-bottom: 20px;
  color: #888787;
}

.ant-divider-horizontal {
  margin: 0;
}
//文章顶部导航
.textNav {
  position: sticky;
  top: 0px;
  z-index: 1;
  width: 100%;
  color: #333333;
  font-size: 20px;
  background: #fff;
  padding: 60px 10px 10px 10px;
}
.indexNum {
  font-size: 30px;
  color: #acacac;
  margin-right: 10px;
}

.articalNav {
  background: #fff;
  &::after {
    clear: both;
    content: "";
    display: block;
  }
}
.content-box {
  position: relative;
  cursor: pointer;
}
.contentTitle {
  font-weight: 550;
  box-sizing: border-box;
  margin: 5%;
  height: 3em;
  line-height: 1.5;
  font-size: 3vw;
  overflow: hidden;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  display: -webkit-box;
  display: box;
}
.time {
  margin: 5%;
  color: #acacac;
  font-size: 3vw;
  overflow: hidden;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  display: -webkit-box;
  display: box;
}

footer {
  position: fixed;
  bottom: 0;
  background: #333333;
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: center;
  width: 100%;

  a {
    font-size: 14px;
    color: #acacac;
  }
}

header {
  min-height: 400px;
  max-width: 1920px;
  margin: 0 auto;
  &::after {
    clear: both;
    content: "";
    display: block;
  }
}
.Card {
  width: 100%;
  margin-right: 3.3%;
  margin-top: 1%;
  cursor: pointer;
  overflow: hidden;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  display: -webkit-box;
  display: box;
}

.coverImg {
  width: 40%;
  border-radius: 5px;
}
@media (min-width: 992px) {
  .headerNav {
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 10;
    height: 50px;
    box-shadow: 0px 3px 7px -7px #5e5e5e;
    .TopTabbar {
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 2;
    }

    .dropdownTabbar {
      display: none;
    }

    .mobileNav {
      display: none;
    }
  }
  .rightCard_data {
    width: 400px;
  }
  .moblieDivider {
    display: none;
  }
  .question {
    width: 500px;
    display: inline-block;
  }
  .textTitle {
    font-size: 18px;
    font-weight: 550;
    color: #555555;
    margin-bottom: 20px;
    overflow: hidden;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    box-orient: vertical;
    display: -webkit-box;
    display: box;
  }
  .goodQuestionTitle {
    font-size: 15px;
    color: #555555;
    margin-bottom: 20px;
  }

  .content-box {
    display: flex;
    height: auto;
    margin: 0 0 0 0;
    width: 100%;
    align-items: center;
  }

  .contentTitle {
    font-size: 15px;
    margin: 1% 0 1% 5%;
    line-height: 1.3;
    height: auto;
  }
  .time {
    font-size: 15px;
    margin: 0 0 0 5%;
  }

  .content-bigbox {
    width: 800px;
    height: auto;
    margin: 20px 20px;
    display: inline-block;
    align-items: center;
    background: #fff;
  }

  .phonetabbar {
    display: none;
  }
  .goodtext {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}

@media (max-width: 992px) {

  .goodQuestion{
    width: 95%;
  }
  .coverImg {
    width: 100%;
  }
  .goodQuestion {
    padding: 0 20px;
    position: relative;
    top: 0;
  }
  .headerNav {
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 1000;

    .TopTabbar {
      display: none;
    }

    .dropdownTabbar {
      top: 0;
      z-index: 100;
      font-weight: 550;
    }

    .mobileNav {
      display: flex;
      align-items: center;
      padding: 2vh 3vw;
      background: #fff;
      z-index: 10;
      width: 100%;

      .mobileNavTitle {
        margin: 0 4vw 0 0;
        font-weight: 550;
        font-size: 4vw;
      }
      .active {
        color: #1a87cf;
      }
    }
  }
  .goodQuestionTitle {
    font-size: 4vw;
    color: #555555;
    margin-bottom: 20px;
  }
  .textTitle {
    font-size: 2vw;
  }
  .icp {
    font-size: 1vw;
  }

  .indexNum {
    font-size: 8vw;
    color: #acacac;
    padding: 0 2vw;
  }
  .goodtext {
    margin: 0;
    height: 28vh;
    width: 100vw;
    display: flex;
    justify-content: center;
  }
  .phonetabbar {
    height: 10vh;
  }
  .mainCard {
    width: 100vw;
    margin: 0 auto 6vh auto;
  }
  .moblieUnDisplay {
    display: none;
  }
  .textNav {
    display: none;
  }
  .leftCard {
    width: 100%;
    padding: 0;
  }
  .rightCard {
    width: 100%;
  }
  footer {
    width: 100vw;
    height: 8vh;
    font-size: 4vw;
  }
  .textTitle {
    font-size: 5vw;
    margin-bottom: 1vh;
  }
  .timeText {
    margin-bottom: 1vh;
  }
  .textCard {
    height: auto;
    margin: 0 auto;
    padding: 0 2vw;
  }
}
</style>
