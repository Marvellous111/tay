<script lang="ts" setup>
const props = defineProps({
  step_type: {
    type: String
  },
  step_task: {
    type: String
  }
})
</script>

<template>
  <div class="plan-wrapper">
    <div class="plan-state">
      <span class="geist-medium">Pending</span>
    </div>
    <span class="plan-text geist-regular">Searching for emails</span>
  </div>
</template>


<style lang="scss" scoped>
.plan-wrapper {
  background: #FFFFFF;
  border: 1px solid rgba(128, 128, 128, 0.5);
  border-radius: 15px;
  height: 32px;
  width: 290px;
  display: flex;
  align-items: start;
  column-gap: 10px;
  padding: 5px;
  .plan-state {
    border-radius: 20px;
    height: stretch;
    width: fit-content;
    max-width: 50px;
    border: 1px solid white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    background: #fafafa;
    span {
      font-size: 14px;
    }
  }
  span {
    display: flex;
    height: stretch;
    align-items: center;
    text-align: left;
    font-size: 16px;
    letter-spacing: -0.5px;
  }
}
</style>