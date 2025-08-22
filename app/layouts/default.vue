<script lang="ts" setup>

import { History, AudioLines, SquarePen, AlarmClockCheck, Box, ChevronsRight } from 'lucide-vue-next';

const navBar = ref<HTMLElement|null>(null);
const sideBarFeatures = ref<HTMLElement|null>(null);
const body = ref<HTMLElement|null>(null);
const feature = ref<HTMLElement|null>(null);
const featureSpan = ref<HTMLElement|null>(null);
const featureVoice = ref<HTMLElement|null>(null);
const featureVoiceSpan = ref<HTMLElement|null>(null);
const featureChat = ref<HTMLElement|null>(null);
const featureChatSpan = ref<HTMLElement|null>(null);
const accountExpand = ref<HTMLElement|null>(null);
const accountImage = ref<HTMLElement|null>(null);
const accountName = ref<HTMLElement|null>(null);
const accountDetails = ref<HTMLElement|null>(null);

const expandSideBar = () => {
  if (!navBar) return
  if(!feature) return
  if(!featureSpan) return
  if(!featureVoice) return
  if(!featureVoiceSpan) return
  if(!featureChat) return
  if(!featureChatSpan) return
  if(!accountExpand) return
  if(!accountDetails) return
  if(!accountName) return
  if(!accountImage) return


  featureSpan.value.style.width = "0";
  featureSpan.value.style.transform = "translateX(-10px)"
  featureSpan.value.style.visibility = "hidden";
  featureSpan.value.style.opacity = "0";

  featureVoiceSpan.value.style.transition = "0.1s ease"
  featureVoiceSpan.value.style.width = "0";
  featureVoiceSpan.value.style.transform = "translateX(-10px)"
  featureVoiceSpan.value.style.visibility = "hidden";
  featureVoiceSpan.value.style.opacity = "0";
  featureVoiceSpan.value.style.transition = "0.1s ease"

  featureChatSpan.value.style.width = "0";
  featureChatSpan.value.style.transform = "translateX(-10px)"
  featureChatSpan.value.style.visibility = "hidden";
  featureChatSpan.value.style.opacity = "0";
  featureChatSpan.value.style.transition = "0.1s ease"

  feature.value.style.width = "fit-content";
  feature.value.style.paddingRight = "0";
  feature.value.style.transition = "0.2s ease"

  featureChat.value.style.width = "fit-content";
  featureChat.value.style.paddingRight = "0";
  featureChat.value.style.transition = "0.2s ease"

  featureVoice.value.style.width = "fit-content";
  featureVoice.value.style.paddingRight = "0";
  featureVoice.value.style.transition = "0.2s ease"

  accountExpand.value.style.flexDirection="column";
  accountDetails.value.style.width="fit-content";
  accountName.value.style.opacity="0"
  accountName.value.style.visibility="hidden"
  accountName.value.style.display="none"
  accountExpand.value.style.transition = "0.2s ease"
  
  navBar.value.style.width = "fit-content"
  // navBar.value.style.opacity = "0"
  // navBar.value.style.visibility = "hidden"
  // navBar.value.style.transform = "translateX(-30px)"
  navBar.value.style.transition = "width 0.9s ease, visibility 0.4s ease, opacity 0.4s ease, translate 0.7s ease, padding 0.9s ease";
}

const route = useRoute()
const router = useRouter()

const goto = (arg: string) => {
  router.push(arg)
}

</script>

<template>
  <div class="layout-section">
    <nav ref="navBar">
      <div class="sidebar-features" ref="sidebarFeatures">
        <div class="feature" ref="featureChat" @click="goto('taychat')">
          <SquarePen
            :size="16"
            :stroke-width="1.5"
            absoluteStrokeWidth
          />
          <span class="geist-medium" ref="featureChatSpan">Chat</span>
        </div>
        <div class="feature" ref="featureVoice">
          <AudioLines
            :size="16"
            :stroke-width="1.5"
            absoluteStrokeWidth
          />
          <span class="geist-medium" ref="featureVoiceSpan">Voice</span>
        </div>
        <div class="feature" ref="feature" @click="goto('tasks')">
          <AlarmClockCheck
            :size="16"
            :stroke-width="1.5"
            absoluteStrokeWidth
          />
          <span class="geist-medium" ref="featureSpan">Tasks</span>
        </div>
        <!-- <div class="feature" ref="feature">
          <Box
            :size="16"
            :stroke-width="1.5"
            absoluteStrokeWidth
          />
          <span class="geist-medium" ref="featureSpan">Projects</span>
        </div> -->
        <!-- <div class="feature" ref="feature">
          <History
            :size="16"
            :stroke-width="1.5"
            absoluteStrokeWidth
          />
          <span class="geist-medium" ref="featureSpan">History</span>
        </div> -->
      </div>
      <div class="account-expand" ref="accountExpand">
        <div class="account-details" ref="accountDetails">
          <div class="account-image" ref="accountImage"></div>
          <div class="account-name" ref="accountName">
            <span class="geist-regular">Marvellous111</span>
          </div>
        </div>
        <button class="expand-button" @click="expandSideBar">
          <ChevronsRight
            :size="16"
            :stroke-width="1.5"
            absoluteStrokeWidth
          />
        </button>
      </div>
    </nav>
    <section class="body" ref="body">
      <slot />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.layout-section {
  position: relative;
  height: 100vh;
  background: #FAFAFA;
  display: flex;
  align-items: end;
  justify-content: space-between;
  nav {
    border-right: 1px solid rgba(128, 128, 128, 0.5);
    height: stretch;
    width: 20vw;
    display: flex;
    flex-direction: column;
    padding: 10px;
    row-gap: 15px;
    justify-content: space-between;
    transition: width 0.9s ease, visibility 0.4s ease, opacity 0.4s ease, translate 0.7s ease, padding 0.9s ease; 
    .sidebar-features {
      display: flex;
      flex-direction: column;
      row-gap: 15px;
      div {
        cursor: pointer;
        display: flex;
        column-gap: 10px;
        align-items: center;
        border: 1px solid rgba(128, 128, 128, 0.5);
        background: #FFFFFF;
        border-radius: 7.5px;
        height: 32px;
        padding: 0px 10px;
      }
    }
    .account-expand {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .account-details {
        display: flex;
        align-items: center;
        column-gap: 10px;
        .account-image {
          border: 1px solid rgba(128, 128, 128, 0.5);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .account-name {
          display: flex;
          align-items: center;
          justify-content: left;
          span {
            font-size: 16px;
          }
        }
      }
      .expand-button {
        display: flex;
        align-items:center;
        justify-content: center;
        background: inherit;
        padding: 7.5px;
        border: 0px;
        outline: 0;
        border-radius: 50%;
        transition: 0.2s ease-in;
      }
      .expand-button:hover {
        background: rgba(128, 128, 128, 0.3);
      }
    }
  }
  .body {
    width: stretch;
    height: stretch;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: all 0.5s ease;
  }
}
</style>