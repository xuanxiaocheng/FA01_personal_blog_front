<template>
    <IndexAnimation>
      <template v-slot:content>
        <div style="width: 100%">
          <a-form :model="state.ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo_ruleForm">
            <a-form-item name="userName">
              <a-input type="text" v-model:value="state.ruleForm.userName" placeholder="请输入账号">
              </a-input>
            </a-form-item>
            <a-form-item name="password">
              <a-input type="password" v-model:value="state.ruleForm.password" placeholder="请输入密码"></a-input>
            </a-form-item>
            <a-form-item>
              <a-button  html-type="submit" type="primary" class="submitBtn" @click="methods.submitForm()">登录</a-button>
            </a-form-item>
          </a-form>
        </div>
      </template>
    </IndexAnimation>
</template>

<script lang="ts">
import IndexAnimation from "./components/IndexAnimation.vue";
import { getCurrentInstance, ref, reactive, defineComponent } from "vue";
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
export default defineComponent ({
  setup() {
    const { proxy } = getCurrentInstance() as any;
    const ruleForm = ref(null)
    const router = useRouter()

    const rules = {
      userName: [{ required: true, trigger: 'blur', message:'用户名不能为空' }],
      password: [{ required: true, trigger: 'blur', message:'密码不能为空'  }]
    };

    const state = reactive({
      ruleForm: {
        userName: "",
        password: "",
      },
    });

    const methods = {
      submitForm() {
            console.log(proxy.$axios)
            proxy.$axios.post("/api/user/getmanage", state.ruleForm).then((res:any) => {
              console.log(res)
                document.cookie = "token" + "=" + res.data.token;
                if (res.status === 200 && res.data.length != 0) {
                  message.success('登录成功',2);
                  router.push({ path: "/manage" });
                } else {
                  message.error('账号或密码错误',2)
                }
              }).catch((err:any) => console.log(err));
      },
    };
    return {
      ruleForm,
      state,
      methods,
      rules
    };
  },
  components: {
    IndexAnimation
  },
})
</script>
<style lang="less" scoped>
.demo_ruleForm {
  @keyframes textWordAnimation {
    0% {
      opacity: 0;
      transform: translateY(40px);
    }
  }

  width: 30%;
  margin: 0px auto;
  z-index: 100;
  text-align: center;
  animation: textWordAnimation 0.6s 1.8s ease backwards;

  .submitBtn {
    width: 100%;
    outline: none;
  }
}
</style>
