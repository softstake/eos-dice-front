const url = new URL(location.href)
const isTest = url.searchParams.get('test')

export const network = {
    blockchain: 'eos',
    protocol: 'https',
    host: isTest ? 'jungle2.cryptolions.io' : 'api.eosnewyork.io',
    port: 443,
    chainId: isTest ? 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473' : 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
}

export const apiUrl = isTest ? 'http://127.0.0.1:8080/bets' : 'http://eos777.io:8080/bets'