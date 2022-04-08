<template>
  <div class="topContainer">
    <router-link class="link" to="/">
      <p class="websiteName">StarPavilion</p>
    </router-link>
    <div class="menuLinks">
      <router-link class="link" to="/recommend">日志Develop</router-link>
      <router-link class="link" to="/about">关于About</router-link>
    </div>
  </div>
</template>
<style lang="less" scoped>
.topContainer {
  background: #fff;
  width: 100%;
  padding: 10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .websiteName {
    color: #000;
    font-weight: 600;
    font-size: 20px;
    letter-spacing: 1px;
    padding: 4px 8px;
    border-radius: 2px;
    opacity: 0.5;
    transition: all 0.4s ease;
    cursor: pointer;
    display: inline;

    &:hover {
      opacity: 1;
    }
  }

  .menuLinks {
    transition: all 0.4s ease;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }

    .link {
      color: black;
      text-transform: uppercase;
      font-weight: 550;
      margin-right: 50px;
      letter-spacing: 2px;
      position: relative;
      transition: all 0.3s 0.2s ease;

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

      &:hover {
        opacity: 1;
        color: #fb8a8a;
      }

      &:hover:after {
        position: absolute;
        content: "";
        bottom: -10px;
        left: 50%;
        height: 5px;
        width: 50px;
        background: #fb8a8a;
        border-radius: 10px;
      }
    }
  }
}
</style>
