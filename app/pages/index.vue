<script lang="ts" setup>

definePageMeta({
  layout: ''
})

useSeoMeta({
  title: "Tay | Tame your day"
})

const apps = [
  "Notion", "Gmail", "Google Calender", "Google Docs", "Slack"
]

const stateStore = useStateStore();

const connectWrapper = ref<HTMLElement|null>(null);
const connectSpan = ref<HTMLElement|null>(null);
const connectOption = ref<HTMLElement|null>(null);

const isAuthToast = computed(() => stateStore.authToast)

const openAuth = () => {
  stateStore.changeAuthToast()
  // alert(isAuthToast)
}

</script>

<template>
  <div class="homepage">
    <img src="~/assets/images/Frame1.png" class="mail" />
    <img src="~/assets/images/Frame2.png" class="notion" />
    <img src="~/assets/images/Frame3.png" class="slack" />
    <img src="~/assets/images/Frame4.png" class="calender" />
    <img src="~/assets/images/Frame5.png" class="docs" />
    <img src="~/assets/images/Frame6.png" class="bbase" />
    <h1 class="geist-semibold">Tame your day with Tay</h1>
    <p class="geist-regular">
      Boost your productivity and tame your day with tay.
      Organise your busy day, schedule, plan and work on created actions tailored for you and many more.
    </p>
    <button @click="openAuth" ref="connectWrapper" class="divbutton">
      <span class="geist-medium" ref="connectSpan">Start using tay</span>
    </button>
    <div class="auth-toast" ref="authToast" v-if="stateStore.authToast">
      <AuthSignIn v-if="stateStore.authToastType === 'SIGNIN'" />
      <AuthSignUp v-if="stateStore.authToastType === 'SIGNUP'" />
    </div>
    <img src="~/assets/images/Gradient.png" class="gradient" />
  </div>
</template>

<style lang="scss" scoped>
.homepage {
  width: stretch;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  row-gap: 15px;
  background: #FAFAFA;
  img {
    position: absolute;
    height: 28px;
    width: auto;
    z-index: 10;
    // animation: infinite;
  }
  .gradient {
    height: 1000px;
    width: auto;
    position: absolute;
    z-index: 0;
    border: 0;
    animation: scales 4.5s ease-in infinite;
  }
  .mail {
    top: 450px;
    left: 300px;
    animation: updown 2.0s ease-in-out infinite;
  }
  .calender {
    top: 275px;
    left: 150px;
    animation: updown 2.5s ease-in-out infinite;
  }
  .docs {
    top: 150px;
    left: 400px;
    animation: updown 2.25s ease-in-out infinite;
  }
  .bbase {
    top: 500px;
    right: 350px;
    animation: updown 2.4s ease-in-out infinite;
  }
  .notion {
    top: 325px;
    right: 150px;
    animation: updown 2.5s ease-in-out infinite;
  }
  .slack {
    top: 125px;
    right: 300px;
    animation: updown 2.3s ease-in-out infinite;
  }
  h1 {
    letter-spacing: -2px;
    font-weight: normal;
    font-size: 46px;
    width: 350px;
    text-align: center;
    margin-bottom: 0;
    z-index: 10;
  }
  p {
    text-align: center;
    width: 450px;
    letter-spacing: -0.5px;
    font-size: 20px;
    line-height: 24px;
    margin: 0;
    z-index: 10;
  }
  .auth-toast {
    display: flex;
    position: absolute;
    z-index: 30;
    align-items: center;
    justify-content: center;
    width: stretch;
    height: stretch;
    background: rgba(128, 128, 128, 0.1);
    transition: 0.5s ease;
  }
  .divbutton {
    position: relative;
    z-index: 10;
    cursor: pointer;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 38px;
    padding: 0px 30px;
    width: fit-content;
    background-color: #121212;
    color: #FFFFFF;
    border: 0;
    outline: 0;
    border-radius: 40px;
    transition: 0.3s ease-out;
    span {
      font-size: 16px;
      font-weight: normal;
    }
  }
}

@keyframes updown {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }

}
@keyframes scales {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
}
</style>