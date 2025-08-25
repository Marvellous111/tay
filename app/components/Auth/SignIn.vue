<script lang="ts" setup>
import { X } from 'lucide-vue-next';
import { signIn } from '../../../server/lib/auth-client';

const stateStore = useStateStore()
const router = useRouter()

const changeAuth = (args: String) => {
  console.info(stateStore.authToastType)
  stateStore.changeAuthToastType(args)
  console.info(stateStore.authToastType)
}

const closeAuth = () => {
  stateStore.changeAuthToast()
}

const isLoading = ref(false);
const username = ref("")
const password = ref("")

const authSignIn = async() => {
  const { data, error } = await signIn.username({
    username: username.value,
    password: password.value,
  }, {
    onRequest: (ctx) => {
      isLoading.value = true
    },
    onSuccess: (ctx) => {
      //redirect to the dashboard or sign in page
      router.push("taychat")
      isLoading.value = false
    },
    onError: (ctx) => {
      // display the error message
      alert(ctx.error.message);
      isLoading.value = false
    },
  });
}

</script>

<template>
  <div class="auth-form">
    <section class="header">
      <span class="geist-medium title">Sign in to your account</span>
      <button class="close-button" @click="closeAuth">
        <X :size="16" :stroke-width="1.5" absoluteStrokeWidth />
      </button>
    </section>
    <section class="form">
      <div class="input-form">
        <label class="geist-medium">username</label>
        <input type="text" class="geist-regular input" placeholder="Username" v-model="username" />
      </div>
      <div class="input-form">
        <label class="geist-medium">password</label>
        <input type="password" class="geist-regular input" placeholder="Password" v-model="password" />
      </div>
    </section>
    <section class="bottom">
      <span class="geist-regular ac-wrapper">
        Don't have an account yet?
        <button class="ac geist-medium" @click="changeAuth('SIGNUP')">Signup</button> 
      </span>
      <div class="button-wrapper">
        <button class="auth-button" @click="authSignIn">
          <span class="geist-medium" v-if="isLoading == false">Sign in to use tay</span>
          <Loader v-if="isLoading == true" />
        </button>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.auth-form {
  background: #FFFFFF;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding: 20px;
  width: 300px;
  height: fit-content;
  row-gap: 15px;
  transition: 0.5s ease;
  .header {
    margin-bottom: 5px;
    display: flex;
    width: stretch;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 18px;
      letter-spacing: -0.3px;
    }
    button {
      width: 28px;
      height: 28px;
      padding: 5px;
      border-radius: 50%;
      border: 0;
      outline: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(128, 128, 128, 0.2);
    }
  }
  .form {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    width: stretch;
    div {
      width: stretch;
      display: flex;
      flex-direction: column;
      row-gap: 7.5px;
      align-items: start;
      label {
        font-size: 13px;
      }
      input {
        border: 1px solid rgba(128, 128, 128, 0.5);
        outline: 0;
        width: stretch;
        height: 32px;
        padding: 0px 5px;
        border-radius: 7.5px;
        font-size: 16px;
      }
      input::placeholder {
        font-size: 13px;
      }
    }
  }
  .bottom {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    .ac-wrapper {
      width: 300px;
      text-align: right;
      display: flex;
      align-items: center;
      justify-content: right;
      font-size: 15px;
      letter-spacing: -0.5px;
      button {
        background: inherit;
        border: 0;
        outline: 0;
        display: flex;
        cursor: pointer;
        align-items: center;
        justify-content:center;
        font-size: 15px;
        text-decoration: underline;
      }
    }
    .button-wrapper {
      width: stretch;
      display: flex;
      align-items: center;
      justify-content: right;
      .auth-button {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 0;
        outline: 0;
        padding: 0px 20px;
        padding-bottom: 1.5px;
        height: 32px;
        width: fit-content;
        background: #121212;
        border-radius: 30px;
        span {
          color: #FFFFFF;
          font-size: 15px;
        }
      }
    }

  }
}
</style>