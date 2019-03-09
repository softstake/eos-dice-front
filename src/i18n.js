import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
    'en': {
        affiliate: "Affiliate",
        howToPlay: "How to play",
        tokensAirdrop: "Tokens airdrop",
        betAmount: "BET AMOUNT",
        payoutOnWin: "PAYOUT ON WIN",
        rollunderToWin: "ROLLUNDER",
        ratio: "PAYOUT",
        winChance: "WIN CHANCE",
        rollDice: "ROLL DICE",
        allBets: "All Bets",
        myBets: "My Bets",
        time: "TIME",
        bettor: "BETTOR",
        rollunder: "ROLL UNDER",
        bet: "BET",
        roll: "ROLL",
        payout: "PAYOUT",
        getStarted: "LOGIN",
        login: "Login",
        logout: "Logout {acc_name}"
    },
    'ru': {
        affiliate: "Партнерская программа",
        howToPlay: "Как играть",
        tokensAirdrop: "Начисление токенов",
        betAmount: "РАЗМЕР СТАВКИ",
        payoutOnWin: "ВЫИГРЫШ",
        rollunderToWin: "СЧАСТЛИВОЕ ЧИСЛО",
        ratio: "КОЭФФИЦИЕНТ",
        winChance: "ШАНС ВЫИГРЫША",
        rollDice: "РАЗЫГРАТЬ",
        allBets: "Все ставки",
        myBets: "Мои ставки",
        time: "ВРЕМЯ",
        bettor: "ИГРОК",
        rollunder: "ЧИСЛО ИГРОКА",
        bet: "СТАВКА",
        roll: "ВЫПАЛО",
        payout: "ВЫИГРЫШ",
        getStarted: "НАЧАТЬ",
        login: "Войти",
        logout: "Выйти {acc_name}"
    }
}

export default new VueI18n({
    locale: 'ru',
    fallbackLocale: 'en',
    messages,
})
