<template>
    <main id="app">
        <dice-header />
        <dice-game />
        <dice-orders />
        <dice-footer />
    </main>
</template>

<script>
    /* global scatter */
    
    const task = new Promise(r => {
        document.addEventListener('scatterLoaded', r)
    })

    export default {
        mounted() {
            task.then(() => {
                if (!scatter.identity) return;
                const account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
                if (!account) return;
                this.$store.commit('UPDATE_ACCOUNT', account);
            });
        },

        components: {
            diceHeader: require('./components/header.vue').default,
            diceGame: require('./components/game.vue').default,
            diceOrders: require('./components/orders.vue').default,
            diceFooter: require('./components/footer.vue').default,
        }
    }
</script>