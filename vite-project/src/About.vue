<template>
    <div class="about">
        <Loading style="width: 100vw; height: 100vh;" v-show="isLoading"></Loading>
        <div v-show="!isLoading">
            <div class="tabbar">
                <div class="tabbarName">Star</div>
                <div class="link">
                    <router-link to="/">
                        <div class="linkUrl">Home</div>
                    </router-link>
                    <router-link to="/recommend">
                        <div class="linkUrl">Recommend</div>
                    </router-link>
                </div>
            </div>
            <div class="photoBox">
                <div class="photoCell" style="height: 100%; width: 1260px;">
                    <img class="photo" src="http://xuanxiaocheng.top/img/me.png" />
                    <div class="bottomCell">个人简介</div>
                </div>
                <div class="photoCell" style="height: 100%; width: 900px;">
                    <a target="_blank" href="https://gitee.com/cr231">
                        <img class="photo" src="http://xuanxiaocheng.top/img/git.png" />
                        <div class="bottomCell">Git仓库 | 码云Gitee</div>
                    </a>
                </div>
                <div class="photoCell" style="height: 360px;width: 360px;">
                    <a target="_blank" href="https://segmentfault.com/u/cr_5fb500e16f8fd">
                        <img class="photo" src="http://xuanxiaocheng.top/img/sifou.png" />
                        <div class="bottomCell">思否segmentfault | 个人主页</div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { getCurrentInstance, ref, reactive, defineComponent } from "vue";
import Loading from './components/Loading.vue'
export default defineComponent({
    components: {
        Loading
    },
    setup() {
        let isLoading = ref(true)
        const imgArray = [
            'http://xuanxiaocheng.top/img/me.png',
            'http://xuanxiaocheng.top/img/git.png',
            'http://xuanxiaocheng.top/img/sifou.png'
        ]
        let count = 0
        for (let item of imgArray) {
            let img = new Image()
            console.log(item)
            img.src = item
            img.onload = function () {
                count++
                console.log(count)
                if (count == imgArray.length) {
                    setTimeout(() => {
                        isLoading.value = false
                    }, 500);
                }
            }
        }

        return {
            isLoading
        };
    },
})
</script>

<style lang="less" scoped>
@keyframes mymove {
    from {
        width: 100%;
    }
    to {
        width: 0%;
    }
}
.photoBox {
    .photoCell {
        display: inline-block;
        position: relative;
        overflow: hidden;

        &::before {
            content: "";
            position: absolute;
            top: 0;
            height: 100%;
            right: 0;
            background: #fff;
            animation: mymove 2s;
        }
        .photo {
            width: 100%;
            height: 100%;
            padding: 2px;
            transition: transform 2s;

            &:hover {
                transform: scale(1.05);
            }
        }

        .bottomCell {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 50px;
            font-size: 20px;
            color: #000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: "STHeiti";
        }
    }
}
.tabbar {
    padding: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tabbarName {
        font-size: 50px;
        font-weight: 600;
        font-style: italic;
    }
    .link {
        display: flex;
        align-items: center;
        font-size: 20px;
        font-weight: bold;

        .linkUrl {
            margin-left: 50px;
            color: #000;
            position: relative;
            cursor: pointer;
            &:hover:after {
                position: absolute;
                content: "";
                bottom: 0px;
                height: 3px;
                left: 0;
                width: 100%;
                background: #000;
            }
        }
    }
}
.about {
    width: 1300px;
    left: 50%;
    padding-bottom: 50px;
    position: relative;
    transform: translate(-50%, 0%);
}

body /deep/ {
    width: 1300px;
}
</style>