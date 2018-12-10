<template>
  <section class="section">
    <div class="container">
      <div class="box">
        <div class="columns">
          <div class="column is-two-thirds">
            <label class="label is-small">BET AMOUNT</label>
            <div class="field has-addons">
              <div class="control is-expanded has-icon-right">
                <input class="input" type="text" v-model="bet">
              </div>

              <div class="control">
                <button class="button" @click="setBet(0.5)">1/2</button>
              </div>
              <div class="control">
                <button class="button" @click="setBet(2)">2X</button>
              </div>
              <div class="control">
                <button class="button" @click="setBet()">MAX</button>
              </div>
            </div>
          </div>
          <div class="column">
            <label class="label is-small">PAYOUT ON WIN</label>
            <div class="field has-addons">
              <div class="control is-expanded">
                <input class="input" type="text" v-model="payWin">
              </div>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="columns is-mobile">
            <div class="column has-text-centered">
              <label class="label is-small">ROLL UNDER TO WIN</label>
              <h3 class="title is-3">{{rollUnder}}↓</h3>
            </div>
            <div class="column has-text-centered">
              <label class="label is-small">PAYOUT</label>
              <h3 class="title is-3">{{Number(payOut).toFixed(2)}}x</h3>
            </div>
            <div class="column has-text-centered">
              <label class="label is-small">WIN CHANCE</label>
              <h3 class="title is-3">{{winChance}}%</h3>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column has-text-centered">
            <div class="field is-expanded">
              <vue-slider ref="slider" v-model="rollUnder" v-bind="sliderOptions"></vue-slider>
            </div>
          </div>
        </div>
        <div class="columns is-mobile is-vcentered">
          <div class="column has-text-centered">
            <span class="title is-5">{{Number(currentEOS).toFixed(4)}} EOS</span>
          </div>
          <div class="column has-text-centered">
            <button v-if="account.name" class="button">ROLL DICE</button>
            <button v-else @click="login" class="button">LOGIN</button>
          </div>
          <div class="column has-text-centered">
            <span class="title is-5"></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import vueSlider from "vue-slider-component";
import { network } from "../network.js";
import { Api, JsonRpc, JsSignatureProvider } from "eosjs";
import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs2";

//ScatterJS.plugins(new ScatterEOS());

const endpoint = network.protocol + "://" + network.host + ":" + network.port;
const rpc = new JsonRpc(endpoint);

export default {
  components: {
    vueSlider
  },
  mounted() {
    this.getBalance();
    console.log(network);
    this.getPool();
  },
  data() {
    return {
      rollUnder: 50,
      bet: 1,
      currentEOS: 0,
      availableBalance: 0,
      sliderOptions: {
        data: null,
        eventType: "auto",
        width: "auto",
        height: 10,
        dotSize: 20,
        dotHeight: null,
        dotWidth: null,
        min: 2,
        max: 96,
        interval: 1,
        show: true,
        speed: 0.1,
        disabled: false,
        piecewise: false,
        usdKeyboard: false,
        enableCross: true,
        piecewiseStyle: false,
        piecewiseLabel: false,
        tooltip: "always",
        tooltipDir: "top",
        reverse: false,
        data: null,
        clickable: true,
        realTime: false,
        lazy: false,
        formatter: null,
        bgStyle: null,
        sliderStyle: null,
        processStyle: null,
        piecewiseActiveStyle: null,
        piecewiseStyle: null,
        tooltipStyle: null,
        labelStyle: null,
        labelActiveStyle: null
      }
    };
  },
  methods: {
    getBalance() {
      if (!this.account.name) {
        this.currentEOS = 0;
        return;
      }
      rpc
        .get_table_rows({
          code: "eosio.token",
          scope: this.account.name,
          table: "accounts"
        })
        .then(accountBalance => {
          if (accountBalance.rows.length) {
            this.currentEOS = accountBalance.rows[0].balance.slice(0, -4);
          }
        });
    },
    getPool() {
      Promise.all([
        rpc.get_table_rows({
          code: "eosio.token",
          scope: this.$contractAccount,
          table: "accounts"
        }),
        rpc.get_table_rows({
          code: this.$contractAccount,
          scope: this.$contractAccount,
          table: "tabenvs"
        })
      ])
        .then(([accountBalance, locked]) => {
          this.availableBalance =
            accountBalance.rows[0].balance.slice(0, -4) -
            locked.rows[0].locked.slice(0, -4);
        })
        .catch(e => {
          console.log(e.message);
        });
    },
    setBet(rate) {
      let minBet = 0.1;
      const { availableBalance, currentEOS } = this;

      let maxBet = this.maxBetAmount();
      if (this.account.name && this.currentEOS < maxBet) {
        maxBet = this.currentEOS;
      }

      let bet = rate ? this.bet * rate : maxBet;

      console.log(
        "BET: " + bet,
        "max bet amount: " + this.maxBetAmount(),
        " current eos: ",
        currentEOS
      );

      if (bet < minBet) {
        bet = minBet;
      }
      if (bet > currentEOS && currentEOS > minBet) {
        bet = currentEOS;
      }
      if (bet > this.maxBetAmount() && this.maxBetAmount() > minBet) {
        bet = this.maxBetAmount();
      }

      console.log("Bet: ", bet);
      this.bet = Number(bet).toFixed(4);
    },

    floor(value, decimals) {
      return Number(Math.floor(value + "e" + decimals) + "e-" + decimals);
    },

    maxBetAmount() {
      return this.floor(this.availableBalance / 5 / (98 / this.winChance), 4);
    },

    login() {
      const scatter = ScatterJS.scatter;
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
        });
    }
  },
  computed: {
    winChance() {
      return this.rollUnder - 1;
    },

    payOut() {
      return 98 / this.winChance;
    },

    payWin() {
      return (this.bet * this.payOut).toFixed(4);
    },

    account() {
      return this.$store.state.account;
    }
  },
  watch: {
    account() {
      console.log("Hi from {account} property watcher");
      this.getBalance();
    }
  }
};
</script>