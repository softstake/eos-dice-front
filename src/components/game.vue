<template>
  <div>
    <!-- Start Modals -->
    <b-modal :active.sync="showAffiliateModal" has-modal-card>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title is-centered">Get Rewarded With Referrals!</p>
          <a class="icon has-text-primary modal-close-btn" @click="showAffiliateModal = false">
            <i class="fas fa-times"></i>
          </a>
        </header>
        <section class="modal-card-body">
          <p>
            Make sure you have an EOS account. For more information on how to create one,
            <a
              class="has-text-primary"
            >click here.</a>
          </p>
          <p>
            If you haven’t already, download and install Scatter, an EOS wallet that facilitates interaction between
            users and dApps.
          </p>
          <p>
            Set your BET AMOUNT. This is the amount of EOS you will be wagering.
            Adjust the slider to change your chance of winning.
            Click ROLL DICE to place your bet.
          </p>
          <p>
            If your number is lower than your ROLL UNDER TO WIN number, you win!
            If you get a notice that your transaction failed, please check that you have enough CPU & bandwidth to make
            the transaction! Please use EOSToolkit to make any changes to your account!
            You can view your EOS balance next to the ROLL DICE button. The table below the slider bar shows recent bets
            from all players across the world.
          </p>
          <p>Still have questions? Reach out to us at Discord and we’ll be happy to help!</p>
          <button class="button is-primary">DOWNLOAD</button>
        </section>
      </div>
    </b-modal>

    <b-modal :active.sync="showScatterModal" has-modal-card>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title is-centered">Run Scatter</p>
          <a class="icon has-text-primary modal-close-btn" @click="showScatterModal = false">
            <i class="fas fa-times"></i>
          </a>
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
          <p class="modal-card-title is-centered">How to play</p>
          <a class="icon has-text-primary modal-close-btn" @click="showHelpModal = false">
            <i class="fas fa-times"></i>
          </a>
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
          <a class="icon has-text-primary modal-close-btn" @click="showAirdropModal = false">
            <i class="fas fa-times"></i>
          </a>
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
    <!-- End of Modals -->
    <!-- Start Betbox -->
    <section class="bet-section">
      <div class="container betbox">
        <figure class="image bet_logo">
          <img src="../images/icon.png">
        </figure>
        <div class="columns">
          <div class="column is-three-fifths has-text-white">
            <label class="label has-text-white">{{ $t('betAmount') }}</label>
            <div class="field has-addons">
              <div class="control has-icons-left width100">
                <input
                  class="input is-medium has-text-weight-semibold"
                  type="number"
                  placeholder="Bet Amount"
                  v-model.trim="bet"
                  @blur="betLargerMin"
                  @input="betLessMax"
                >
                <span class="icon is-left">
                  <figure class="image eos-icon">
                    <img src="../images/eos-icon.png">
                  </figure>
                </span>
              </div>
              <div class="control">
                <a
                  class="button is-medium has-text-weight-semibold"
                  @click="setBet(0.5); maxFlag=false;"
                  id="halfBetBtn"
                >
                  <span>&#189;</span>
                </a>
              </div>
              <div class="control">
                <a
                  class="button is-medium has-text-weight-semibold"
                  @click="setBet(2); maxFlag=false;"
                  id="twiceBetBtn"
                >x2</a>
              </div>
              <div class="control">
                <a
                  class="button is-medium has-text-weight-semibold"
                  @click="setBet(); maxFlag=true;"
                  id="maxBetBtn"
                >MAX</a>
              </div>
            </div>
          </div>
          <div class="column has-text-white">
            <label class="label has-text-white">{{ $t('payoutOnWin') }}</label>
            <div class="field">
              <div class="control is-expanded has-icons-left">
                <input
                  class="input is-medium has-text-weight-semibold"
                  type="number"
                  v-model="payWin"
                  readonly
                >
                <span class="icon is-left">
                  <figure class="image eos-icon">
                    <img src="../images/eos-icon.png">
                  </figure>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="columns is-mobile">
          <div class="column">
            <div class="range-slide">
              <div class="columns has-text-centered is-mobile">
                <div class="column">
                  <span
                    class="is-size-7 is-block"
                    style="color: rgba(216, 216, 216, 0.5);"
                  >{{ $t('rollunderToWin') }}</span>
                  <span class="is-size-4 has-text-weight-semibold">
                    {{rollUnder}}
                    <i class="fas fa-arrow-down"></i>
                  </span>
                </div>
                <div class="column payout">
                  <span
                    class="is-size-7 is-block"
                    style="color: rgba(216, 216, 216, 0.5);"
                  >{{ $t('ratio') }}</span>
                  <span class="is-size-4 has-text-weight-semibold">x{{Number(payOut).toFixed(2)}}</span>
                </div>
                <div class="column">
                  <span
                    class="is-size-7 is-block"
                    style="color: rgba(216, 216, 216, 0.5);"
                  >{{ $t('winChance') }}</span>
                  <span class="is-size-4 has-text-weight-semibold">{{winChance}}%</span>
                </div>
              </div>
              <div class="columns has-text-centered">
                <div class="column">
                  <div class="bet-slider">
                    <span class="is-size-7 slider-min">2</span>
                    <vue-slider
                      style="width: 100%;"
                      ref="slider"
                      v-model="rollUnder"
                      v-bind="sliderOptions"
                    >
                      <div class="slider-custom-dot" slot="dot" slot-scope="{ value }">{{ value }}</div>
                    </vue-slider>
                    <span class="is-size-7 slider-max">96</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="columns is-mobile is-vcentered">
          <div class="column has-text-centered has-text-white">
            <span class="icon">
              <figure class="image eos-icon">
                <img src="../images/eos-icon.png">
              </figure>
            </span>
            <span
              :class="{
              'animateUp': this.showUpAnimation, 
              'animateDown': this.showDownAnimation
            }"
              class="is-block is-size-5 eos-animation"
            >{{ animationText }}</span>
            <span
              class="is-block is-size-5 has-text-weight-semibold"
            >{{Number(currentEOS).toFixed(4)}} EOS</span>
          </div>
          <div class="column">
            <a
              class="button is-primary is-fullwidth is-medium get_started_btn"
              v-if="account.name"
              @click="roll"
              :class="{ 'is-loading': this.isLoading  }"
              id="rollBtn"
            >{{ $t('rollDice') }}</a>
            <a
              class="button is-primary is-fullwidth is-medium get_started_btn"
              v-else
              @click="login"
              id="loginBtn"
            >{{ $t('getStarted') }}</a>
          </div>
          <div class="column has-text-centered has-text-white">
            <span class="icon">
              <figure class="image is-16x16">
                <img src="../images/token.png">
              </figure>
            </span>
            <span
              class="is-block is-size-5 has-text-weight-semibold"
            >{{Number(currentSVNS).toFixed(4)}} SEVENS</span>
          </div>
        </div>
      </div>
    </section>
    <!-- End of Betbox -->
  </div>
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
    this.getBalanceEOS();
  },
  data() {
    return {
      rollUnder: 50,
      bet: 1,
      minBet: 0.1,
      maxFlag: false,
      currentEOS: 0,
      currentSVNS: 0,
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
        dotSize: 40,
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
        tooltip: false,
        reverse: false,
        data: null,
        clickable: true,
        realTime: false,
        lazy: false,
        formatter: null,
        bgStyle: {
          backgroundColor: "#191D21"
          //boxShadow: "inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)"
        },
        sliderStyle: {
          backgroundColor: "#30B988"
        },
        processStyle: {
          backgroundColor: "#30B988"
        },
        piecewiseActiveStyle: null,
        piecewiseStyle: null,
        tooltipStyle: {
          backgroundColor: "#30B988",
          borderColor: "#30B988"
        },
        labelStyle: null,
        labelActiveStyle: null
      }
    };
  },
  methods: {
    getBalanceEOS() {
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

    getBalanceSVNS() {
      if (!this.account.name) {
        this.currentSVNS = 0;
        return;
      }

      return rpc
        .get_table_rows({
          code: "sevenstokens",
          scope: this.account.name,
          table: "accounts"
        })
        .then(accountBalance => {
          if (accountBalance.rows.length) {
            this.currentSVNS = Number(
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
            }, 1000);
          } else {
            this.getBalanceSVNS();
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
            this.betLargerMin();
            (async () => {
              await this.betLessMax();
              this.isLoading = false;
            })();
          }
        });
    },

    roll() {
      if (!this.account.name) {
        this.$snotify.error("Scatter not initialized");
        return;
      } else if (this.currentEOS < 0.1) {
        this.$snotify.error("Your EOS balance must be greater than 0.1");
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
        this.getBalanceEOS();
        this.fetchResult(gameID);
      })();
    },

    setBet(rate) {
      return (async () => {
        await this.getBalanceEOS();
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
      return (async () => {
        await this.getBalanceEOS();
        await this.getPool();
        if (
          (this.account.name && this.bet > this.currentEOS) ||
          this.bet > this.maxBetAmount()
        ) {
          await this.setBet();
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
      this.getBalanceSVNS();
      // if the player is logged in, set max bet:
      (async () => {
        await this.getBalanceEOS();
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
  left: 50px;
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