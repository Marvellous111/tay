<script lang="ts" setup>
import { ChevronDown } from 'lucide-vue-next';

const props = defineProps({
  task_app: {
    type: String
  }
})

</script>

<template>
  <div class="action-toast-wrapper">
    <section class="top-section">
      <div class="loader-icon-wrapper">
        <div class="loader">
          <img src="~/assets/images/docs.png" />
        </div>      
      </div>
      <span class="geist-medium">Tay is requesting access to docs</span>
    </section>
    <section class="bottom-section">
      <button class="action">
        <span class="geist-medium">See action</span>
        <ChevronDown
          :size="13"
          :stroke-width="1.5"
          absoluteStrokeWidth
        />
      </button>
      <div class="ad-button">
        <button class="allow-button">
          <span class="geist-medium">Allow</span>
        </button>
        <button class="deny-button">
          <span class="geist-medium">Deny</span>
        </button>
      </div>
    </section>
  </div>
</template>


<style lang="scss" scoped>
.action-toast-wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 5px 7.5px 7.5px 7.5px;
  border-radius: 15px;
  background: #FFFFFF;
  border: 1px solid rgba(128, 128, 128, 0.5);
  height: fit-content;
  width: fit-content;
  .top-section {
    display: flex;
    width: stretch;
    align-items: center;
    justify-content: space-between;
    column-gap: 10px;
    .loader-icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      .loader {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          height: 14px;
          width: auto;
        }
      }
    }
    span {
      font-size: 18px;
    }
  }
  .bottom-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .action {
      border: 20px;
      height: 24px;
      // border: 1px solid rgba(128, 128, 128, 0.5);
      width: fit-content;
      padding: 0px 7.5px;
      background: #FAFAFA;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 24px;
      column-gap: 5px;
      span {
        font-size: 13px;
      }
    }
    .ad-button {
      display: flex;
      align-items: center;
      column-gap: 10px;
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0px 15px;
        width: fit-content;
        height: 28px;
        border: 0;
        outline: 0;
        border-radius: 24px;
        &.allow-button {
          background: #121212;
          color: #FFFFFF;
        }
        &.deny-button {
          background: #FAFAFA;
          color: #121212;
        }
        span {
          font-size: 13px;
        }
      }
    }
  }
}
</style>