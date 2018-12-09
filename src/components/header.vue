<template>
    <header class="header">
        <nav class="navbar is-primary">
            <div class="container">
                <div class="navbar-brand">
                    <a class="navbar-item" href="#" style="font-weight:bold;">EOS777</a>
                    <span class="navbar-burger burger" @click="showNav = !showNav" :class="{ 'is-active': showNav }">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </div>
                <div class="navbar-menu" :class="{ 'is-active': showNav }">
                    <div class="navbar-end">
                        <a href="#" class="navbar-item">Affiliate</a>
                        <a href="#" class="navbar-item">Tokens Airdrop</a>
                        <a href="#" class="navbar-item">How to play</a>
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
    export default {
        data() {
            return {
                showNav: false
            }
        },
        methods: {
            login() {
                console.log("Login from header, no scatter object here")
                // need to use scatter here
            },
            logout() {
                //this.$scatter.forgetIdentity().then(() => {
                //    this.$message.success('User logout success')
                console.log("Logout from header, no scatter object here")
                this.$store.commit('UPDATE_ACCOUNT', {})
                //})
            }
        },
        computed: {
            account() {
                return this.$store.state.account
            }
        }
    }
</script>