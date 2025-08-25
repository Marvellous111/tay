<script lang="ts" setup>
const props = defineProps({
  user_guidance: {
    type: String
  },
  link: {
    type: String
  }
})
</script>

<template>
  <div class="action-wrapper">
    <section class="header">
      {{ props.details.user_guidance }}
    </section>
    <section class="bottom">
      <NuxtLink class="click-link geist-medium">{{ props.details.link }}</NuxtLink>
    </section>
  </div>
</template>


<style lang="scss" scoped>
.action-wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 5px 7.5px 7.5px 7.5px;
  border-radius: 15px;
  background: #FFFFFF;
  border: 1px solid rgba(128, 128, 128, 0.5);
  height: fit-content;
  width: 400px;
  max-width: 400px;
  animation: scaleFade 0.3s ease;
  .header {
    display: flex;
    width: stretch;
    align-items: center;
    justify-content: left;
  }
  .bottom {
    display: flex;
    width: stretch;
    justify-content: right;
    align-items: center;
    .click-link {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0px 15px;
      width: fit-content;
      height: 28px;
      border: 0;
      outline: 0;
      border-radius: 24px;
      text-decoration: none;
      color: #FFFFFF;
      background: #121212;
      font-size: 13px;
    }
  }
}
</style>