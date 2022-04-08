<template>
  <div class="index">
    <div class="top_container">
      <p class="website_name">StarPavilion</p>
      <div class="menu_links">
        <router-link class="link" to="/recommend">日志Develop</router-link>
        <router-link class="link" to="/about">关于About</router-link>
      </div>
    </div>
    <div class="TransparentCircle">
      <p class="titleWord">Welcome</p>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.index {
  position: relative;
  background: #000;
  height: 100vh;
  overflow: hidden;

  .menu_links {
    z-index: 10;
    transition: all 0.4s ease;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }

    .link {
      color: white;
      text-transform: uppercase;
      font-weight: 500;
      margin-right: 50px;
      letter-spacing: 2px;
      position: relative;
      transition: all 0.3s 0.2s ease;

      &:hover {
        opacity: 1;
        color: #fb8a8a;
      }

      &:before {
        content: "";
        position: absolute;
        width: 0px;
        height: 4px;
        background: linear-gradient(90deg, #ffedc0 0%, #ff9d87 100%);
        bottom: -10px;
        border-radius: 4px;
        transition: all 0.4s cubic-bezier(0.82, 0.02, 0.13, 1.26);
        left: 100%;
      }
    }
  }

  .top_container {
    width: 100vw;
    padding: 10px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .website_name {
      color: #695681;
      font-weight: 600;
      font-size: 20px;
      letter-spacing: 1px;
      background: white;
      padding: 4px 8px;
      border-radius: 2px;
      cursor: default;
      transition: all 0.4s ease;
      z-index: 10;
      display: inline;
    }

    .website_name:hover {
      opacity: 1;
    }
  }

  .TransparentCircle {
    @keyframes circleAnimation {
      0% {
        width: 0;
        height: 0;
      }
    }

    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    flex-direction: column;
    width: 800px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 800px;
    background-color: rgba(7, 7, 7, 0.89);
    border-radius: 100%;
    box-shadow: inset 5px 20px 40px rgba(186, 178, 200, 0.5); 
    animation: circleAnimation 0.8s 0.4s cubic-bezier(1, 0.06, 0.25, 1)backwards; //cubic-bezier不同阶段的动画速度

    .titleWord {
      font-size: 100px;
      font-weight: 700;
      letter-spacing: 4px;
      color: white;
      display: flex !important;
      justify-content: center;
      align-items: center;
      z-index: 10;
      margin: 50px 0;
      animation: titleWordAnimation 0.6s cubic-bezier(0.3, 0.8, 1, 1.05) both;
      animation-delay: 1.2s;
      font-family: "Courier New", Courier, monospace;

      .titleWord:nth-of-type(2) {
        color: #36184f;
        z-index: 1;
        animation-delay: 1s;
        filter: blur(10px);
        opacity: 0.8;
      }

      @keyframes titleWordAnimation {
        0% {
          opacity: 0;
          transform: scale(10) skew(20deg, 20deg);
        }
      }
    }

  }
}

//适配移动端
@media (max-width: 992px) {
  .index {
    position: relative;
    background: #000;
    min-height: 500px;
    overflow: hidden;

    .titleWord {
      font-size: 15vw !important;
    }

    article p {
      font-size: 4vw !important;
    }

    .menu_links {
      display: none;
    }
    .TransparentCircle {
      width: 500px;
      height: 500px;
    }
  }
}
</style>
