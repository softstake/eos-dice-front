<template>
    <main id="app">
        <dice-header />
        <dice-game />
        <dice-orders />
        <dice-footer />
    </main>
</template>

<script>
    export default {
        mounted() {
            console.log("mounted!")
            this.$store.commit('UPDATE_ACCOUNT', {})

        },

        components: {
            diceHeader: require('./components/header.vue').default,
            diceGame: require('./components/game.vue').default,
            diceOrders: require('./components/orders.vue').default,
            diceFooter: require('./components/footer.vue').default,
        }
    }
</script>