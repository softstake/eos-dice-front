<template>
  <!-- Start navbar -->
  <header class="site-header has-background-dark">
    <div class="container">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="#">
            <img class="logo" src="../images/logo.png">
          </a>
          
          <a
            role="button"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            @click="showNav = !showNav"
            :class="{ 'is-active': showNav }"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': showNav }">
          <div class="navbar-end">
            <a
              class="navbar-item modal-button"
              aria-haspopup="true"
              @click="showAffiliateModal"
              href="JavaScript:;"
            >Affiliate</a>
            <a
              class="navbar-item modal-button"
              aria-haspopup="true"
              @click="showHelpModal"
              href="JavaScript:;"
            >How to play</a>
            <a
              class="navbar-item modal-button"
              aria-haspopup="true"
              @click="showAirdropModal"
              href="JavaScript:;"
            >Tokens Airdrop</a>

            <div class="navbar-item">
              <div class="buttons">
                <a
                  v-if="account.name"
                  @click="logout"
                  class="button signup-btn is-primary is-outlined is-medium"
                >Logout {{account.name}}</a>
                <a
                  v-else
                  @click="login"
                  class="button signup-btn is-primary is-outlined is-medium"
                >Login</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <vue-snotify></vue-snotify>
  </header>
  <!-- End of navbar -->
</template>

<script>
import ScatterJS from "scatterjs-core";
import { network } from "../network.js";
import eventHub from "../event.js";

const scatter = ScatterJS.scatter;

export default {
  data() {
    return {
      showNav: false
    };
  },
  mounted() {
    this.login();
  },
  methods: {
    showAffiliateModal() {
      eventHub.$emit("SHOW_AFF_EV");
    },
    showScatterModal() {
      eventHub.$emit("SHOW_SCATTER_EV");
    },
    showHelpModal() {
      eventHub.$emit("SHOW_HELP_EV");
    },
    showAirdropModal() {
      eventHub.$emit("SHOW_AIRDROP_EV");
    },
    login() {
      console.log("Login from header");
      const requiredFields = {
        accounts: [network]
      };

      scatter
        .connect(this.$contractAccount)
        .then(connected => {
          scatter
            .suggestNetwork(network)
            .then(added => {
              console.log("Network suggest ok");
              scatter
                .getIdentity(requiredFields)
                .then(() => {
                  console.log("Got identity success");
                  const account = scatter.identity.accounts.find(
                    x => x.blockchain === "eos"
                  );
                  console.log("this account: " + account.name);
                  this.$store.commit("UPDATE_ACCOUNT", account);
                  this.$snotify.success("Welcome back!");
                })
                .catch(e => {
                  console.log("User rejected select identity");
                  console.log(e.message);
                  this.$snotify.error(
                    "User rejected the provision of an Identity"
                  );
                });
              window.ScatterJS = null;
            })
            .catch(e => {
              console.log(e.message);
            });
        })
        .catch(e => {
          console.log("Scatter Connecting issue");
          console.log(e.message);
          // Sent event to open Download scatter modal is here
          eventHub.$emit("SHOW_SCATTER_EV");
        });
    },
    logout() {
      scatter.forgetIdentity().then(() => {
        console.log("User logout success from header");
        this.$store.commit("UPDATE_ACCOUNT", {});
      });
    }
  },
  computed: {
    account() {
      return this.$store.state.account;
    }
  }
};
</script>