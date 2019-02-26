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
    <!-- Start Chat Box 
    <div id="mySidenav" class="sidenav" :class="{ 'openChat' : openChat }">
      <div class="chat-box hero">
        <div class="hero-head">
          <a class="icon has-text-primary is-pulled-right chat-close" @click="hideChat()">
            <i class="fas fa-times"></i>
          </a>
        </div>
        <div class="hero-body">
          <div class="msgbox">
            <div class="msg_status">
              <div class="msg_user">Dicer</div>
              <div class="msg_time">23:12:00</div>
            </div>
            <div
              class="msg"
            >I remember when I was betting ETH when it was at like $7, I was betting so much. Looking back at how much ETH is worth now its like I was betting thousands of USD per bet xD</div>
          </div>
          <div class="msgbox">
            <div class="msg_status">
              <div class="msg_user">Dicer</div>
              <div class="msg_time">23:12:00</div>
            </div>
            <div class="msg">
              I
              <a>remember</a> when I was betting ETH when it was at like $7, I was betting so much. Looking back at how much ETH is worth now its like I was betting thousands of USD per bet xD
            </div>
          </div>
          <div class="msgbox">
            <div class="msg_status">
              <div class="msg_user">Dicer</div>
              <div class="msg_time">23:12:00</div>
            </div>
            <div class="msg">
              I
              <a>remember</a> when I was betting ETH when it was at like $7, I was betting so much. Looking back at how much ETH is worth now its like I was betting thousands of USD per bet xD
            </div>
          </div>
          <div class="msgbox">
            <div class="msg_status">
              <div class="msg_user">Dicer</div>
              <div class="msg_time">23:12:00</div>
            </div>
            <div class="msg">
              I
              <a>remember</a> when I was betting ETH when it was at like $7, I was betting so much. Looking back at how much ETH is worth now its like I was betting thousands of USD per bet xD
            </div>
          </div>
          <div class="msgbox">
            <div class="msg_status">
              <div class="msg_user">Dicer</div>
              <div class="msg_time">23:12:00</div>
            </div>
            <div class="msg">
              I
              <a>remember</a> when I was betting ETH when it was at like $7, I was betting so much. Looking back at how much ETH is worth now its like I was betting thousands of USD per bet xD
            </div>
          </div>
          <div class="msgbox">
            <div class="msg_status">
              <div class="msg_user">Dicer</div>
              <div class="msg_time">23:12:00</div>
            </div>
            <div class="msg">
              I
              <a>remember</a> when I was betting ETH when it was at like $7, I was betting so much. Looking back at how much ETH is worth now its like I was betting thousands of USD per bet xD
            </div>
          </div>
          <div class="msgbox">
            <div class="msg_status">
              <div class="msg_user">Dicer</div>
              <div class="msg_time">23:12:00</div>
            </div>
            <div class="msg">
              I
              <a>remember</a> when I was betting ETH when it was at like $7, I was betting so much. Looking back at how much ETH is worth now its like I was betting thousands of USD per bet xD
            </div>
          </div>
          <div class="msgbox">
            <div class="msg_status">
              <div class="msg_user">Dicer</div>
              <div class="msg_time">23:12:00</div>
            </div>
            <div class="msg">
              I
              <a>remember</a> when I was betting ETH when it was at like $7, I was betting so much. Looking back at how much ETH is worth now its like I was betting thousands of USD per bet xD
            </div>
          </div>
          <div class="msgbox">
            <div class="msg_status">
              <div class="msg_user">Dicer</div>
              <div class="msg_time">23:12:00</div>
            </div>
            <div class="msg">
              I
              <a>remember</a> when I was betting ETH when it was at like $7, I was betting so much. Looking back at how much ETH is worth now its like I was betting thousands of USD per bet xD
            </div>
          </div>
        </div>
        <div class="hero-foot">
          <div class="field">
            <p class="control has-icons-right">
              <input class="input" type="text" placeholder="Hi" value="Hello">
              <span class="icon is-small is-right">
                <i class="fas fa-location-arrow has-text-primary" data-fa-transform="rotate-45"></i>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    End of Chat Box-->
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
