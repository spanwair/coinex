export const coinsUsdt = {
  a1: { name: 'XLMUSDT', amount: 6 },
  a2: { name: 'XRPUSDT', amount: 3 },
  a3: { name: 'DOGEUSDT', amount: 7 },
  a4: { name: 'CETUSDT', amount: 50 },
  a5: { name: 'BTTUSDT', amount: 500 },
  a6: { name: 'ARRRUSDT', amount: 0.5 },
  a7: { name: 'VETUSDT', amount: 15 },
  a8: { name: 'SCUSDT', amount: 90 },
  a9: { name: 'XVGUSDT', amount: 70 },
  a10: { name: 'TRXUSDT', amount: 20 },
  a11: { name: 'XEMUSDT', amount: 10 },
  a12: { name: 'BATUSDT', amount: 3 },
  a13: { name: 'ADAUSDT', amount: 3 },
  a14: { name: 'IOTAUSDT', amount: 2 },
  a15: { name: 'MATICUSDT', amount: 5 },
}
const index = process.argv[3] || '1';
export const makerFee = 0.002; // 0.2%
export const takerFee = 0.002; // 0.2%
// question is that smaller is the amount, faster is turn the round with less profit
// we have accommodate this variable in count !! And if its more profitable smaller/bigger
export const tradesTurn = 1.2 // double its bigger than trade +- any over 1.2 e.g. is bigger
const choosedCoin = `a${index}`;
// export const cetUsdt = coinsUsdt[choosedCoin].name; // what pare
// export const minAmount = coinsUsdt[choosedCoin].amount; // min amount totrade
export const changePercent = 0.007; // 0.7%
// END CONFIG