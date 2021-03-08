<template>
  <div class="inviteWrap">
    <!-- 价格 -->
    <div class="moneyList">
      <div class="money" v-for="(item,index) of inviteRule" :key="index">{{item.money}}</div>
    </div>
    <!-- 人数 -->
    <div class="peopleList">
      <div class="people" v-for="(item,index) of inviteRule" :key="index">
        <div class="dot"></div>
        <p>{{item.people}}</p>
      </div>
    </div>

    <div class="inviteBtn">立即邀请好友竞猜</div>
    <div class="line"></div>
  </div>
</template>
<script>
import { inviteRule } from "./config";
export default {
  name: "Invite",
  data() {
    return {
      inviteRule
    };
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>