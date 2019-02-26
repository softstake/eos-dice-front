<template>
  <div>
    <!-- Start footer -->
    <footer class="footer">
      <div class="container">
        <div class="columns is-vcentered is-mobile">
          <div class="column footer-column">
            <a class="footer-logo" href="#">
              <img class="logo" src="../images/logo.png">
            </a>
          </div>
          <div class="column has-text-right social-icons">
            <span class="icon is-medium has-text-primary">
              <span class="fa-stack">
                <a href="#" class="has-text-primary">
                  <i class="fas fa-circle fa-stack-2x"></i>
                  <i class="fab has-text-black fa-twitter fa-stack-1x fa-inverse"></i>
                </a>
              </span>
            </span>
            <span class="icon is-medium has-text-primary">
              <span class="fa-stack">
                <a href="#" class="has-text-primary">
                  <i class="fas fa-circle fa-stack-2x"></i>
                  <i class="fab has-text-black fa-medium-m fa-stack-1x fa-inverse"></i>
                </a>
              </span>
            </span>
            <span class="icon is-medium has-text-primary">
              <span class="fa-stack">
                <a href="#" class="has-text-primary">
                  <i class="fas fa-circle fa-stack-2x"></i>
                  <i class="fab has-text-black fa-telegram-plane fa-stack-1x fa-inverse"></i>
                </a>
              </span>
            </span>
            
            <span class="icon message_btn is-large has-text-primary" @click="showChat();">
              <figure class="image is-48x48">
                <img src="../images/message.png">
              </figure>
            </span>
          </div>
        </div>
      </div>
    </footer>
    <!-- End of footer -->
  </div>
</template>

<script>
import eventHub from "../event.js";

export default {
  methods: {
    showChat() {
      eventHub.$emit("SHOW_CHAT_EV");
    }
  }
};
</script>
