<template>
  <section class="section">
    <b-modal :active.sync="showAffiliateModal" has-modal-card>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title is-centered">Get Rewarded With Referrals!</p>
          <button class="delete" aria-label="close" @click="showAffiliateModal = false"></button>
        </header>
        <section class="modal-card-body">
          <p>
            Refer a friend and receive 0.5% of their bets! Additionally, the receiver of the referral will
            get a 0.5% bonus towards their wins. There's no reason not to get referred and receive bigger
            wins for each bet placed, so join our Telegram chat and hunt for a link.
          </p>
        </section>
      </div>
    </b-modal>

    <b-modal :active.sync="showScatterModal" has-modal-card>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Run Scatter</p>
          <button class="delete" aria-label="close" @click="showScatterModal = false"></button>
        </header>
        <section class="modal-card-body">
          <p class="is-centered">Please download Scatter if it is not installed</p>
          <a class="button is-link" href="https://get-scatter.com/" target="_blank">Download</a>
        </section>
      </div>
    </b-modal>

    <b-modal :active.sync="showHelpModal" has-modal-card>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">How to play</p>
          <button class="delete" aria-label="close" @click="showHelpModal = false"></button>
        </header>
        <section class="modal-card-body">
          <ol>
            <li>
              Make sure you have an EOS account. For more information on how to create one,
              <a
                href="//medium.com/dapppub/create-your-own-eos-account-easily-using-the-non-service-fee-dapp-signupeoseos-b15c5347f2fc"
                target="_blank"
              >click here</a>.
            </li>
            <li>
              If you haven’t already, download and install
              <a
                href="//get-scatter.com/"
                target="_blank"
              >Scatter</a>,
              an EOS wallet that facilitates interaction between users and dApps.
            </li>
            <li>Set your BET AMOUNT. This is the amount of EOS you will be wagering.</li>
            <li>Adjust the slider to change your chance of winning.</li>
            <li>Click ROLL DICE to place your bet.</li>
            <li>If your number is lower than your ROLL UNDER TO WIN number, you win!</li>
            <li>
              If you get a notice that your transaction failed, please check that you have enough CPU
              & bandwidth to make the transaction! Please use
              <a
                href="//eostoolkit.io/home"
                target="_blank"
              >EOSToolkit</a>
              to make any changes to your account!
            </li>
          </ol>
          <p>
            You can view your EOS balance next to the ROLL DICE button. The table below the slider bar shows
            recent bets from all players across the world.
          </p>
          <p>
            Still have questions? Reach out to us at
            <a
              href="//discordapp.com/channels/482077322070196225/487187255065313292"
              target="_blank"
            >Discord</a> and we’ll be happy to help!
          </p>
        </section>
      </div>
    </b-modal>

    <b-modal :active.sync="showAirdropModal" has-modal-card>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title is-centered">7.7 Million SEVENS Token Giveaway!</p>
          <button class="delete" aria-label="close" @click="showAirdropModal = false"></button>
        </header>
        <section class="modal-card-body">
          <p class="is-centered">
            BET tokens grant you instant dividend payouts based on house profit. 100% of
            house profit is distributed to BET token holders, so the more BET you have, the more EOS you
            receive!
            Currently, we are airdropping BET tokens at a rate of 20:1 for out bettors. This means that for
            every 20 EOS wagered you will receive 1 BET token. These tokens grant you dividends for life,
            and there is a fixed supply of 88,000,000 tokens in existence.
          </p>
        </section>
      </div>
    </b-modal>

    <div class="container">
      <div class="box">
        <div class="columns">
          <div class="column is-two-thirds">
            <label class="label is-small">BET AMOUNT</label>
            <div class="field has-addons">
              <div class="control is-expanded has-icon-right">
                <input class="input" type="text" v-model="bet" @blur="validBet">
              </div>

              <div class="control">
                <button class="button" @click="setBet(0.5); maxFlag=false;">1/2</button>
              </div>
              <div class="control">
                <button class="button" @click="setBet(2); maxFlag=false;">2X</button>
              </div>
              <div class="control">
                <button class="button" @click="setBet(); maxFlag=true;">MAX</button>
              </div>
            </div>
          </div>
          <div class="column">
            <label class="label is-small">PAYOUT ON WIN</label>
            <div class="field has-addons">
              <div class="control is-expanded">
                <input class="input" type="text" v-model="payWin" readonly>
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
    <vue-snotify></vue-snotify>
  </section>
</template>

<script>
import vueSlider from "vue-slider-component";
import { network } from "../network.js";
import { Api, JsonRpc, JsSignatureProvider } from "eosjs";
import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs2";
import eventHub from "../event.js";

const endpoint = network.protocol + "://" + network.host + ":" + network.port;
const rpc = new JsonRpc(endpoint);

export default {
  components: {
    vueSlider
  },
  mounted() {
    eventHub.$on("SHOW_AFF_EV", () => (this.showAffiliateModal = true));
    eventHub.$on("SHOW_SCATTER_EV", () => (this.showScatterModal = true));
    eventHub.$on("SHOW_HELP_EV", () => (this.showHelpModal = true));
    eventHub.$on("SHOW_AIRDROP_EV", () => (this.showAirdropModal = true));
    this.getBalance();
    this.getPool();
  },
  data() {
    return {
      rollUnder: 50,
      bet: 1,
      minBet: 0.1,
      maxFlag: false,
      currentEOS: 0,
      availableBalance: 0,
      showAffiliateModal: false, // SHOW_AFF_EV
      showScatterModal: false, // SHOW_SCATTER_EV
      showHelpModal: false, // SHOW_HELP_EV
      showAirdropModal: false, // SHOW_AIRDROP_EV
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
      }
      return rpc
        .get_table_rows({
          code: "eosio.token",
          scope: this.account.name,
          table: "accounts"
        })
        .then(accountBalance => {
          if (accountBalance.rows.length) {
            this.currentEOS = Number(
              accountBalance.rows[0].balance.slice(0, -4)
            );
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
          table: "envs"
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
      let maxBet = this.maxBetAmount();
      if (this.account.name && this.currentEOS < maxBet) {
        maxBet = this.currentEOS;
      }

      let bet = rate ? this.bet * rate : maxBet;

      console.log(
        "RATE: " + rate,
        "BET: " + bet,
        "max bet amount: " + this.maxBetAmount(),
        " current eos: ",
        this.currentEOS
      );

      if (bet < this.minBet) {
        bet = this.minBet;
      }

      console.log("Bet: ", bet);
      this.bet = Number(bet).toFixed(4);
    },

    // triggered by unfocus event of input bet field
    validBet() {
      this.bet = this.bet < this.minBet ? this.minBet : this.bet;
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
      // if the player is logged in, set max bet:
      (async () => {
        await this.getBalance();
        if (this.currentEOS < this.minBet) {
          this.bet = this.minBet;
          this.maxFlag = false;
        } else {
          this.setBet();
          this.maxFlag = true;
        }
      })();
    },
    bet: function() {
      // limit bet by currentEOS (if logged in) or maxBetAmount:
      if (
        (this.account.name && this.bet > this.currentEOS) ||
        this.bet > this.maxBetAmount()
      ) {
        this.setBet();
      }
    },
    rollUnder: function() {
      if (this.maxFlag) {
        this.setBet();
      }
    }
  }
};
</script>