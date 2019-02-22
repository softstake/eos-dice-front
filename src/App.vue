<template>
  <div id="main" :class="{ 'mainOpenChat' : mainOpenChat }">
    <dice-header/>
    <dice-game/>
    <dice-orders/>
    <dice-footer/>
  </div>
</template>

<script>
import eventHub from "./event.js";

export default {
  components: {
    diceHeader: require("./components/header.vue").default,
    diceGame: require("./components/game.vue").default,
    diceOrders: require("./components/orders.vue").default,
    diceFooter: require("./components/footer.vue").default
  },
  mounted() {
    eventHub.$on("SHOW_CHAT_EV", () => (this.mainOpenChat = true));
    eventHub.$on("HIDE_CHAT_EV", () => (this.mainOpenChat = false));
  },
  data() {
    return {
      mainOpenChat: false
    };
  }
};
</script>