const url = new URL(location.href)
const isMainNet = url.hostname.startsWith('eos777.io')

export const network = {
    blockchain: 'eos',
    protocol: 'https',
    host: isMainNet ? 'api.eosnewyork.io' : 'jungle2.cryptolions.io',
    port: 443,
    chainId: isMainNet ? 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906' : 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473'
}

export const apiUrl = isMainNet ? 'https://eos777.io/api/bets' : url.protocol + '//' + url.hostname + ':9999/bets'