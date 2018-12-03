<template>
    <section class="section">
        <div class="container">
            <div class="box">
                <div class="columns">
                    <div class="column is-two-thirds">
                        <label class="label is-small">BET AMOUNT</label>
                        <div class="field has-addons">
                            <div class="control is-expanded has-icon-right">
                                <input class="input" type="text" v-model="bet" />
                            </div>

                            <div class="control">
                                <button class="button" @click="setBet(.5)">
                                    1/2
                                </button>
                            </div>
                            <div class="control">
                                <button class="button" @click="setBet(2)">
                                    2X
                                </button>
                            </div>
                            <div class="control">
                                <button class="button" @click="setBet()">
                                    MAX
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <label class="label is-small">PAYOUT ON WIN</label>
                        <div class="field has-addons">
                            <div class="control is-expanded">
                                <input class="input" type="text" placeholder="">
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
                        <button v-if="account" class="button">ROLL DICE</button>
                        <button v-else @click="login" class="button">LOGIN</button>
                    </div>
                    <div class="column has-text-centered">
                        <span class="title is-5">0.00 SVNS</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import vueSlider from 'vue-slider-component'

    export default {
        components: {
            vueSlider
        },
        data() {
            return {
                rollUnder: 50,
                bet: 1,
                currentEOS: 0,
                poolBalance: 0,
                //account: {name: true},
                sliderOptions: {
                    data: null,
                    eventType: 'auto',
                    width: 'auto',
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
                    tooltip: 'always',
                    tooltipDir: 'top',
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
            }
        },
        methods: {
            getBalance() {
                if (!this.account.name) {
                    this.currentEOS = 0;
                    return;
                }
                return api.getAccount(this.account.name).then(({
                    core_liquid_balance
                }) => {
                    this.currentEOS = Number(core_liquid_balance.replace(/\sEOS/, ''));
                });
            },
            setBet(rate) {
                const {
                    poolBalance,
                    currentEOS
                } = this
                let bet = rate ? this.bet * rate : this.currentEOS
                switch (true) {
                    case (bet < 0.1):
                        bet = 0.1
                        break
                    case (bet > currentEOS):
                        bet = currentEOS
                        break
                    case (bet > this.maxBetAmount()):
                        bet = this.maxBetAmount()
                        break
                }
                this.bet = Number(bet).toFixed(4)
            },
            maxBetAmount() {
                return this.floor(this.poolBalance / 100 / (98 / this.winChance) * 0.9, 4)
            },
            login() {
                scatter.getIdentity({
                    accounts: [network]
                }).then(() => {
                    const account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
                    if (!account) return;
                    this.$store.commit('UPDATE_ACCOUNT', account);
                }).catch(e => {
                    this.$message.warning(e.message);
                });
            },
        },
        computed: {
            winChance() {
                return this.rollUnder - 1
            },

            payOut() {
                return 98 / this.winChance
            },

            payWin() {
                return (this.eos * this.payOut).toFixed(4)
            },

            account() {
                return false;
                //return this.$store.state.account
            }
        }
    }
</script>