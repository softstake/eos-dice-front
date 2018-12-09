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
        components: {
            diceHeader: require('./components/header.vue').default,
            diceGame: require('./components/game.vue').default,
            diceOrders: require('./components/orders.vue').default,
            diceFooter: require('./components/footer.vue').default,
        }
    }
</script>