<template>
  <div class="homePage">
    <!-- 头部 -->
    <div class="headWrap">
      <div class="btnList">
        <div class="ruleBtn1">红包攻略</div>
        <div class="ruleBtn2">活动规则</div>
      </div>
    </div>

    <!-- 竞猜区域 -->
    <div class="guessWrap">
      <div class="guessTime">本期竞猜截止时间，3月15日13:00</div>
      <!-- 猜涨跌 -->
      <div class="inner">
        <h2>上证指数  涨还是跌？</h2>
        <p>02月28日上证指数：3511.27-2.06%</p>
        <div class="guessBtns">
          <div class="riseBtn"><span>+</span>1</div>
          <div class="fallBtn"><span>+</span>1</div>
        </div>
      </div>
    </div>

    <!-- 邀请得红包 -->
    <Invite />

    <!-- 连胜得红包 -->
    <Streak/>

    <!-- 排行榜 -->
    <Rank/>
  </div>
</template>

<script>
import  Invite  from "./invite";
import  Streak  from "./streak";
import  Rank  from "./rank";
export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    Invite,
    Streak,
    Rank
  },
  mounted() {
    console.log("首页-------");
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>