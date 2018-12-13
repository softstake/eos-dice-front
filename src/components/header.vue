<template>
  <header class="header">
    <nav class="navbar is-primary">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="#" style="font-weight:bold;">EOS777</a>
          <span
            class="navbar-burger burger"
            @click="showNav = !showNav"
            :class="{ 'is-active': showNav }"
          >
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div class="navbar-menu" :class="{ 'is-active': showNav }">
          <div class="navbar-end">
            <a @click="showAffiliateModal" href="JavaScript:;" class="navbar-item">Affiliate</a>
            <a @click="showAirdropModal" href="JavaScript:;"  class="navbar-item">Tokens Airdrop</a>
            <a @click="showHelpModal" href="JavaScript:;"  class="navbar-item">How to play</a>
            <span class="navbar-item">
              <a v-if="account.name" @click="logout" class="button is-link">Logout {{account.name}}</a>
              <a v-else @click="login" class="button is-link">Login</a>
            </span>
          </div>
        </div>
      </div>
    </nav>
  </header>
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
        eventHub.$emit('SHOW_AFF_EV'); 

    },
    showScatterModal() {
        eventHub.$emit('SHOW_SCATTER_EV'); 

    },
    showHelpModal() {
        eventHub.$emit('SHOW_HELP_EV'); 

    },
    showAirdropModal() {
        eventHub.$emit('SHOW_AIRDROP_EV'); 

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
                })
                .catch(e => {
                  console.log("User rejected select identity");
                  console.log(e.message);
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
          eventHub.$emit('SHOW_SCATTER_EV'); 
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