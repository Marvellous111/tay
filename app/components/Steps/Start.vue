<script lang="ts" setup>
const props = defineProps({
  details: {
    type: String
  },
  category: {
    type: String
  }
})
</script>

<template>
  <div class="plan-wrapper">
    <div class="start-plan-state" v-if="props.category == 'START'">
      <span class="geist-medium">Pending</span>
    </div>
    <div class="finished-plan-state" v-if="props.category == 'RESULT'">
      <span class="geist-medium">Finished</span>
    </div>
    <div class="plan-text-wrapper">
      <span class="plan-text geist-regular">{{ props.details }}</span>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.plan-wrapper {
  background: #FFFFFF;
  animation: scaleFade 1s ease;
  border: 1px solid rgba(128, 128, 128, 0.5);
  border-radius: 15px;
  min-height: 32px;
  height: fit-content;
  width: 290px;
  display: flex;
  align-items: start;
  column-gap: 10px;
  overflow: hidden;
  padding: 5px;
  
  .start-plan-state {
    border-radius: 10px;
    height: fit-content;
    width: fit-content;
    max-width: 50px;
    border: 1px solid white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 15px;
    background: rgba(243, 232, 1, 0.2);
    // border: 1px solid rgba(128, 128, 128, 0.4);
    span {
      font-size: 14px;
    }
  }
  .finished-plan-state {
    border-radius: 10px;
    height: fit-content;
    width: fit-content;
    max-width: 50px;
    border: 1px solid white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 15px;
    background: rgba(144, 238, 144, 0.5);
    // border: 1px solid rgba(128, 128, 128, 0.4);
    span {
      font-size: 14px;
    }
  }
  .plan-text-wrapper {
    display: flex;
    height: stretch;
    width: 195px;
    align-items: center;
    overflow: hidden;
    // border: 1px solid black;
    span {
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 190px;
      overflow: hidden;
      display: flex;
      height: stretch;
      align-items: center;
      text-align: left;
      font-size: 16px;
      letter-spacing: -0.5px;
    }
  }
}
</style>