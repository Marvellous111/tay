<script lang="ts" setup>


const { send, isStreaming, error } = useSendQuery();

</script>

<template>
  <div class="response">
    <div class="plans">
      <Steps />
    </div>
    <div class="clarifications">
      <ValueConfirmationClarification />
    </div>
    <div class="response-text">
      <span class="geist-regular">Hello from tay</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.response {
  text-align: left;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  row-gap: 20px;
  .response-text {
    display: flex;
    align-items: center;
    justify-content: left;
    text-align: left;
    span {
      font-size: 16px;
    }
  }
}
</style>