<template>
  <div class="index">
    <IndexAnimation>
    <template v-slot:content>
      <article>
        <p>Uh oh!欢迎进入【星辰Zone】</p>
        <router-link to="/recommend"><button>enter</button></router-link>
      </article>
    </template>
    </IndexAnimation>
  </div>
</template>


<script>
import IndexAnimation from './components/IndexAnimation.vue'
export default {
  setup() {
  },
  components: { IndexAnimation }
}
</script>


<style lang="less" scoped>
article {
  @keyframes textWordAnimation {
    0% {
      opacity: 0;
      transform: translateY(40px);
    }
  }

  display: flex;
  flex-flow: column;
  align-items: center;
  position: relative;
  width: 100%;
  animation: textWordAnimation 0.6s 1.8s ease backwards;

  p {
    color: white;
    font-size: 18px;
    letter-spacing: 0.6px;
    margin-bottom: 40px;
    text-shadow: 6px 6px 10px #32243e;
  }

  button {
    height: 40px;
    padding: 0 30px;
    border-radius: 50px;
    cursor: pointer;
    box-shadow: 0px 15px 20px rgba(54, 24, 79, 0.5);
    z-index: 10;
    color: #695681;
    background-color: white;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 12px;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0px 10px 10px -10px rgba(54, 24, 79, 0.5);
      transform: translateY(5px);
      background: #fb8a8a;
      color: white;
    }
  }
}
</style>