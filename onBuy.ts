import { promises } from 'fs';
import { cetUsdt, makerFee } from './config';
import { fileWrite } from './testingUtils';
import { buy, defaultDataFileSell } from './utils';

export async function onBuy(
  dataReadFile: FileTicker,
  resultTicker: Ticker,
  minAmount: number,
  market: string,
) {
  const price = Number(resultTicker.ticker.last);
  await buy({
    amount: String(minAmount),
    market,
  });
  await fileWrite(`${cetUsdt}-storage.json`, {
    ...defaultDataFileSell,
    price,
    profit: dataReadFile.profit,
    amount: minAmount - (minAmount * makerFee),
    spend: minAmount * price,
    max_rounds: dataReadFile.max_rounds,
    max_spend: dataReadFile.max_spend,
  });
  console.log('bought onBuy :>> ', minAmount, price);
}