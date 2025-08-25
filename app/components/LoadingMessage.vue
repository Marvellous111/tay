<template>
  <div class="leading-message">
    <LoaderDark />
    <span class="geist-medium">loading steps and message</span>
  </div>
</template>

<style lang="scss" scoped>
.leading-message {
  display: flex;
  align-items: center;
  column-gap: 10px;
  animation: scaleFade 0.8s ease;
  span {
    font-size: 16px;
    color: #121212;
  }
}
</style>