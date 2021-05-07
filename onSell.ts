import { promises } from 'fs';
import { cetUsdt, makerFee, takerFee, tradesTurn } from './config';
import { fileWrite } from './testingUtils';
import { buy, defaultDataFileBuy, defaultDataFileSell, sell } from './utils';

export async function onSell(
  dataReadFile: FileTicker,
  resultTicker: Ticker,
  changePercent: number,
  market: string,
) {
  const last = Number(resultTicker.ticker.last);
  const increasedRound = dataReadFile.round * tradesTurn;
  console.log('netPrice, myPrice :>> ', last, dataReadFile.price);
  console.log('change :>> ', cetUsdt, (((last-dataReadFile.price)/dataReadFile.price)*100).toFixed(5));
  if (last > (dataReadFile.price + (last * changePercent))) {
    await sell({
      amount: String(dataReadFile.amount),
      market,
    });
    await fileWrite(`${cetUsdt}-storage.json`, {
      ...defaultDataFileBuy,
      price: Number(last),
      profit: dataReadFile.profit + (() => {
        const profitCount = ((dataReadFile.amount * last) - dataReadFile.spend);
        const withFees = profitCount - (profitCount * takerFee)
        return withFees;
      })(),
      max_rounds: dataReadFile.max_rounds,
      max_spend: dataReadFile.max_spend,
    });
    console.log('sell onSell :>> ', dataReadFile.amount, resultTicker.ticker.last);
  } else if (last < (dataReadFile.price - (last * changePercent))) {
    const upBuyAmount = dataReadFile.amount * increasedRound;
    const spend = dataReadFile.spend + (upBuyAmount * last);
    await buy({
      amount: String(upBuyAmount),
      market,
    });
    await fileWrite(`${cetUsdt}-storage.json`, {
      ...defaultDataFileSell,
      price: Number(last),
      round: increasedRound,
      amount: dataReadFile.amount + (upBuyAmount - (upBuyAmount * makerFee)),
      profit: dataReadFile.profit,
      spend,
      max_rounds: dataReadFile.max_rounds < increasedRound ? increasedRound : dataReadFile.max_rounds,
      max_spend: dataReadFile.max_spend < spend ? spend : dataReadFile.max_spend,
    });
    console.log('buy onSell :>> ', upBuyAmount, resultTicker.ticker.last);
  }
}