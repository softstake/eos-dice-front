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
                <input
                  class="input"
                  type="number"
                  v-model.trim="bet"
                  @blur="betLargerMin"
                  @input="betLessMax"
                >
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
                <input class="input" type="number" v-model="payWin" readonly>
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
            <span
              :class="{
              'animateUp': this.showUpAnimation, 
              'animateDown': this.showDownAnimation
            }"
              class="title is-5 eos-animation"
            >{{ animationText }}</span>
            <span class="title is-5">{{Number(currentEOS).toFixed(4)}} EOS</span>
          </div>
          <div class="column has-text-centered">
            <button
              v-if="account.name"
              @click="roll"
              :class="{ 'is-loading': this.isLoading  }"
              class="button"
            >ROLL DICE</button>
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
import { sha256 } from "js-sha256";
import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs2";
import eventHub from "../event.js";

ScatterJS.plugins(new ScatterEOS());
const scatter = ScatterJS.scatter;

const endpoint = network.protocol + "://" + network.host + ":" + network.port;
const rpc = new JsonRpc(endpoint);

const url = new URL(location.href);
const ref = url.searchParams.get("ref");

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
  },
  data() {
    return {
      rollUnder: 50,
      bet: 1,
      minBet: 0.1,
      maxFlag: false,
      currentEOS: 0,
      availableBalance: 0,
      ref: "",
      showAffiliateModal: false, // SHOW_AFF_EV
      showScatterModal: false, // SHOW_SCATTER_EV
      showHelpModal: false, // SHOW_HELP_EV
      showAirdropModal: false, // SHOW_AIRDROP_EV
      isLoading: false,
      showUpAnimation: false,
      showDownAnimation: false,
      animationText: "",
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
      return Promise.all([
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

    getRef(name) {
      if (!name || !this.account.name) {
        this.ref = "";
        return;
      }

      return rpc
        .get_account(name)
        .then(res => {
          let ref = res["account_name"];
          if (ref != this.account.name && ref != this.$contractAccount) {
            this.ref = ref;
          } else {
            this.ref = "";
          }
        })
        .catch(e => {
          const err = "Referrer account name doesn't exist";
          this.$snotify.error(err);
          console.log(err);
          this.ref = "";
        });
    },

    fetchResult(game_id) {
      rpc
        .get_table_rows({
          code: this.$contractAccount,
          scope: this.$contractAccount,
          table: "results",
          lower_bound: game_id.toString(),
          upper_bound: (game_id + 1).toString(),
          limit: 1,
          json: true
        })
        .then(log => {
          const result = log["rows"][0];
          if (!result) {
            setTimeout(() => {
              this.fetchResult(game_id);
            }, 2000);
          } else {
            this.betLessMax();
            this.betLargerMin();
            if (result["payout"] == "0.0000 EOS") {
              const msg = `Unfortunately, you bet ${result["amount"]}\n
                                Roll result ${result["random_roll"]}，lost ${
                result["amount"]
              }`;
              this.$snotify.error(msg);
              this.showDownAnimation = true;
              this.animationText = result["amount"];
            } else {
              const msg = `Congratulations, you bet ${result["amount"]}\n
                                  Roll result ${result["random_roll"]}，win ${
                result["payout"]
              }`;
              this.$snotify.success(msg);
              this.showUpAnimation = true;
              this.animationText = result["payout"];
            }
            setTimeout(() => {
              this.showDownAnimation = false;
              this.showUpAnimation = false;
            }, 3000);
            this.isLoading = false;
          }
        });
    },

    roll() {
      if (!this.account.name) {
        this.errors.push("Scatter not initialized");
        return;
      }

      this.isLoading = true;
      const api = scatter.eos(network, Api, { rpc });

      const gameID = this.getGameID();
      const memo = this.rollUnder + "-" + this.ref + "--" + gameID;
      (async () => {
        const result = await api
          .transact(
            {
              actions: [
                {
                  account: "eosio.token",
                  name: "transfer",
                  authorization: [
                    {
                      actor: this.account.name,
                      permission: this.account.authority
                    }
                  ],
                  data: {
                    from: this.account.name,
                    to: this.$contractAccount,
                    quantity: Number(this.bet).toFixed(4) + " EOS",
                    memo: memo
                  }
                }
              ]
            },
            {
              blocksBehind: 3,
              expireSeconds: 3600
            }
          )
          .catch(e => {
            this.$snotify.error(e.message);
            console.log(e);
            this.isLoading = false;
          });
        this.getBalance();
        this.fetchResult(gameID);
      })();
    },

    setBet(rate) {
      (async () => {
        await this.getBalance();
        await this.getPool();
        let maxBet = this.maxBetAmount();
        if (this.account.name && this.currentEOS < maxBet) {
          maxBet = this.currentEOS;
        }

        let bet = rate ? this.bet * rate : maxBet;

        if (bet < this.minBet) {
          bet = this.minBet;
        } else if (bet > maxBet) {
          bet = maxBet;
        }

        this.bet = Number(bet).toFixed(4);
      })();
    },

    betLessMax() {
      // triggered by input event of input bet field
      console.log("call betLessMax");
      (async () => {
        await this.getBalance();
        await this.getPool();
        if (
          (this.account.name && this.bet > this.currentEOS) ||
          this.bet > this.maxBetAmount()
        ) {
          this.setBet();
        }
      })();
    },

    // triggered by unfocus event of input bet field
    betLargerMin() {
      this.bet = this.bet < this.minBet ? this.minBet : this.bet;
    },

    getGameID() {
      return Number(window.crypto.getRandomValues(new Uint16Array(3)).join(""));
    },

    floor(value, decimals) {
      return Number(Math.floor(value + "e" + decimals) + "e-" + decimals);
    },

    maxBetAmount() {
      return this.floor(this.availableBalance / (5 * this.payOut - 1), 4);
    },

    login() {
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
      let house_fee = 2;
      if (this.ref) {
        house_fee -= 0.5;
      }
      return Math.trunc(((100 - house_fee) / this.winChance) * 10000) / 10000;
    },

    payWin() {
      return Math.trunc(this.bet * this.payOut * 10000) / 10000;
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
        await this.getRef(ref);
        if (this.currentEOS < this.minBet) {
          this.bet = this.minBet;
          this.maxFlag = false;
        } else {
          this.setBet();
          this.maxFlag = true;
        }
      })();
    },
    rollUnder: function() {
      if (this.maxFlag) {
        this.setBet();
      }
    }
  }
};
</script>

<style>
.eos-animation {
  opacity: 0;
  position: absolute;
}
.eos-animation.animateUp {
  -webkit-animation: fadeOutUp 3s;
  animation: fadeOutUp 3s;
  color: #02f292;
  text-shadow: 0 0 5px #02f292;
}
.eos-animation.animateDown {
  -webkit-animation: fadeOutDown 1s;
  animation: fadeOutDown 1s;
  color: #cd4263;
  text-shadow: 0 0 5px #cd4263;
}
@keyframes fadeOutUp {
  from {
    opacity: 1;
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  to {
    opacity: 0;
    -webkit-transform: translate(0, -100%);
    transform: translate(0, -100%);
  }
}
@keyframes fadeOutDown {
  from {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  to {
    opacity: 0;
    -webkit-transform: translate(0, 100%);
    transform: translate(0, 100%);
  }
}
</style>