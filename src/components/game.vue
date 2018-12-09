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
                                <button class="button" @click="setBet(0.5)">
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
                        <button v-if="account" class="button">ROLL DICE</button>
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
    import vueSlider from 'vue-slider-component'
    import {network} from '../network'
    import Eos from 'eosjs'
    import ScatterJS from 'scatterjs-core'
    import ScatterEOS from 'scatterjs-plugin-eosjs2'

    ScatterJS.plugins(new ScatterEOS())

    const endpoint = network.protocol + '://' + network.host + ':' + network.port
    const scatter = ScatterJS.scatter
    //const eos = scatter.eos(network, Eos, { expireInSeconds:60, debug: true })
    const eos = Eos({httpEndpoint:endpoint, signatureProvider:ScatterJS.scatter.eosHook(network)})


    export default {
        components: {
            vueSlider
        },
        mounted() {
            this.getBalance()
            console.log(network)
            //this.getPool()
        },
        data() {
            return {
                rollUnder: 50,
                bet: 1,
                currentEOS: 0,
                poolBalance: 100,
                account: this.$account ? this.$account.name : undefined,
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
                if (!this.account) {
                    this.currentEOS = 0;
                    return;
                }
                return api.getAccount(this.account.name).then(({
                    core_liquid_balance
                }) => {
                    this.currentEOS = Number(core_liquid_balance.replace(/\sEOS/, ''))
                })
            },
            getPool() {
                Promise.all([
                    api.getTableRows({
                        json: true,
                        code: 'eosio.token',
                        table: 'accounts',
                        scope: this.$contractAccount
                    }),
                    api.getTableRows({
                        json: true,
                        code: this.$contractAccount,
                        table: 'envs',
                        scope: this.$contractAccount
                    })
                ]).then(([accountBalance, poolBalance]) => {
                    this.poolBalance = accountBalance.rows[0].balance.slice(0, -4) -
                        poolBalance.rows[0].locked.slice(0, -4)
                });
            },
            setBet(rate) {
                const {
                    poolBalance,
                    currentEOS
                } = this
                let bet = rate ? this.bet * rate : this.currentEOS
                console.log("BET: " + bet, "max bet amount: " + this.maxBetAmount(), " current eos: ", currentEOS)
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
                console.log("Bet: ", bet)
                this.bet = Number(bet).toFixed(4)
            },

            floor(value, decimals) {
                return Number(Math.floor(value + 'e' + decimals) + 'e-' + decimals)
            },

            maxBetAmount() {
                return this.floor(this.poolBalance / 5 / (98 / this.winChance), 4)
            },

            login() {
                console.log(this.$contractAccount)
                const requiredFields = {
                    accounts: [network]
                }

                ScatterJS.scatter.connect(this.$contractAccount).then(connected => {
                    scatter.suggestNetwork(network).then(added => {
                        console.log('Network suggest ok')
                        scatter.getIdentity(requiredFields).then(() => {
                            console.log('Got identity success')
                            this.$account = scatter.identity.accounts.find(x => x.blockchain ===
                                'eos')
                            console.log("this account: " + this.$account.name)
                        }).catch(e => {
                            console.log('User rejected select identity')
                            console.log(e.message)
                        })
                        window.ScatterJS = null
                    }).catch(e => {
                        console.log(e.message)
                    })
                }).catch(e => {
                    console.log('Scatter Connecting issue')
                    console.log(e.message)
                    // Sent event to open Download scatter modal is here
                })
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
                return (this.bet * this.payOut).toFixed(4)
            },
           // account() {
                 ///console.log(" a Accosssssunt: " , this.$account ? false: this.$account.name)
            //     return this.$account 
            //}
        }
    }
</script>