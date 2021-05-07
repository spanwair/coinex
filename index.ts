/// <reference path="./type/types.d.ts" />

import { defaultDataFileBuy, getUserBalance, logger } from './utils';
import { client } from './createClient';
import { promises } from 'fs';
import { onBuy } from './onBuy';
import { onSell } from './onSell';
import { fetchFile } from './testingUtils';
import { cetUsdt, changePercent, minAmount } from './config';
const marketUrl = `/market/ticker?market=`;
let currentBalance = {};

async function fileRead() {
  return await fetchFile(`${cetUsdt}-storage.json`);
};

async function init() {
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
  const resultTicker: Ticker = await checkCurrentValue();
  if (resultTicker) {
    const dataReadFile = await fileRead();
    if (dataReadFile.type === 'SELL') {
      onSell(dataReadFile, resultTicker, changePercent, cetUsdt);
    }
    if (dataReadFile.type === 'BUY') {
      console.log('resultTicker :>> ', resultTicker);
      onBuy(dataReadFile, resultTicker, minAmount, cetUsdt);
    }
  }
  // await sell({
  //   amount: String(minAmount),
  //   market: cetUsdt
  // });
  goToNextRound();
}

async function checkCurrentValue(): Promise<Ticker | undefined> {
  let result;
  try {
    result = await client.getNoAuth(`${marketUrl}${cetUsdt}`);
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
  }, 6000);
}

init();
