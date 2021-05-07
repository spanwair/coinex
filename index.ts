/// <reference path="./type/types.d.ts" />

import { defaultDataFileBuy, getUserBalance, logger } from './utils';
import { client } from './createClient';
import { promises } from 'fs';
import { onBuy } from './onBuy';
import { onSell } from './onSell';
import { fetchFile } from './testingUtils';
import { changePercent, coinsUsdt } from './config';
const marketUrl = `/market/ticker?market=`;
let currentBalance = {};

async function init() {
  await promises.writeFile('config.json', JSON.stringify({ start: new Date() }), 'utf8');
  await run();
}

async function run() {
  const result: Balance = await getUserBalance();
  if (result) {
    const keys = Object.keys(result);
    for (const currencyKey of keys) {
      currentBalance[currencyKey] = result[currencyKey];
    }
  }
  const resultTickers = await checkCurrentValue();
  if (resultTickers) {
    const tickersKeys = Object.keys(resultTickers.ticker);
    const chosenPairKeys: { name: string, amount: number }[] = Object.keys(coinsUsdt).map(key => coinsUsdt[key]);
    for (const pairName of tickersKeys) {
      const foundChosenPair = chosenPairKeys.find(chosen => chosen.name === pairName);
      if (foundChosenPair) {
        const resultTicker = resultTickers.ticker[pairName];
        const dataReadFile = await fetchFile(`${pairName}-storage.json`);
        if (dataReadFile.type === 'SELL') {
          onSell(dataReadFile, resultTicker, changePercent, pairName);
        }
        if (dataReadFile.type === 'BUY') {
          onBuy(dataReadFile, resultTicker, foundChosenPair.amount, pairName);
        }
      }
    }
  }
  // await sell({
  //   amount: String(minAmount),
  //   market: cetUsdt
  // });
  goToNextRound();
}

async function checkCurrentValue(): Promise<{[key: string]: Ticker} | undefined> {
  let result;
  try {
    result = await client.getNoAuth('/market/ticker/all');
  } catch (error) {
    console.log('error :>> ', error);
  }
  if (result && 'data' in result) {
    return result.data;
  }
  return;
}

function goToNextRound() {
  setTimeout(() => {
    run();
  }, 15000);
}

init();
