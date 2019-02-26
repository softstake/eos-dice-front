<template>
  <!-- Start Chat Box -->
  <div id="mySidenav" class="sidenav" :class="{ 'openChat' : openChat }">
    <div class="chat-box hero">
      <div class="hero-head">
        <a class="icon has-text-primary is-pulled-right chat-close" @click="hideChat()">
          <i class="fas fa-times"></i>
        </a>
      </div>
      <div class="hero-body" v-html="chatContent"></div>
      <div class="hero-foot">
        <div class="field">
          <p class="control has-icons-right">
            <input class="input" type="text" placeholder="Hi" v-model="newMsg" @keyup.enter="send">
            <span class="icon is-small is-right">
              <i class="fas fa-location-arrow has-text-primary" data-fa-transform="rotate-45"></i>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
  <!-- End of Chat Box -->
</template>

<script>
import { chatUrl } from "../network.js";
import eventHub from "../event.js";

export default {
  data() {
    return {
      openChat: false,
      ws: null, // Our websocket
      newMsg: "", // Holds new messages to be sent to the server
      chatContent: "" // A running list of chat messages displayed on the screen
    };
  },
  created: function() {
    var self = this;
    this.ws = new WebSocket(chatUrl);
    this.ws.onmessage = function(e) {
      var msg = JSON.parse(e.data);
      //console.log(msg);
      self.chatContent += `<div class="msgbox">
          <div class="msg_status">
            <div class="msg_user">${msg.username}</div>
            <div class="msg_time">${self.dateFormat(msg.time)}</div>
          </div>
          <div
            class="msg"
          >${msg.message}</div>
        </div>`;
      var element = document.getElementsByClassName("hero-body")[0];
      element.scrollTop = element.scrollHeight; // Auto scroll to the bottom
    };
    this.ws.onerror = e => console.log("WS error:", e.data);
    this.ws.onopen = () => console.log("WS conn open");
    this.ws.onclose = () => console.log("WS conn close");
  },
  mounted() {
    eventHub.$on("SHOW_CHAT_EV", () => (this.openChat = true));
  },
  methods: {
    hideChat() {
      this.openChat = false;
      eventHub.$emit("HIDE_CHAT_EV");
    },
    send() {
      if (!this.account.name) {
        this.$snotify.error("You are not logged in");
        return;
      }

      this.newMsg = this.newMsg.replace(/(<([^>]+)>)/gi, ""); // Strip out html
      if (this.newMsg != "") {
        this.ws.send(
          JSON.stringify({
            account: this.account.name,
            username: this.account.name,
            message: this.newMsg,
            time: new Date().getTime()
          })
        );
        this.newMsg = ""; // Reset newMsg
      }
    },
    dateFormat(raw) {
      return new Date(raw).toLocaleTimeString();
    }
  },
  computed: {
    account() {
      return this.$store.state.account;
    }
  }
};
</script>
