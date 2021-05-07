/// <reference path="./type/types.d.ts" />

import { readdir, promises } from 'fs';
import { fetchFile } from './testingUtils';
import { find } from 'find-in-files';

readdir('.', async (err, files) => {
  if (err) {
    throw new Error(String(err));
  }
  let completeProfit = 0;
  let maxSpend = 0;
  let completeMaxSpend = 0;
  let spendMax = 0;
  let maxProfit = 0;
  let lowProfit = 0;
  for (const file of files) {
    if (file.endsWith('-storage.json')) {
      let jsonFile: FileTicker | undefined;
      try {
        jsonFile = await fetchFile(file);
      } catch (error) {
        throw new Error(String(error));
      }
      completeProfit = completeProfit + jsonFile.profit;
      completeMaxSpend = completeMaxSpend + jsonFile.max_spend;
      spendMax = jsonFile.spend > spendMax ? jsonFile.spend : spendMax;
      maxSpend = jsonFile.max_spend > maxSpend ? jsonFile.max_spend : maxSpend;
      maxProfit = jsonFile.profit > maxProfit ? jsonFile.profit : maxProfit;
      lowProfit = jsonFile.profit < lowProfit ? jsonFile.profit : lowProfit;
    }
  }
  console.log('completeProfit :>> ', completeProfit, completeProfit * 22);
  console.log('completeMaxSpend :>> ', completeMaxSpend, completeMaxSpend * 22);
  console.log('maxSpend :>> ', maxSpend, maxSpend * 22, await findInFiles(maxSpend));
  console.log('spendMax :>> ', spendMax, spendMax * 22, await findInFiles(spendMax));
  console.log('maxProfit :>> ', maxProfit, maxProfit * 22, await findInFiles(maxProfit));
  console.log('lowProfit :>> ', lowProfit, lowProfit * 22);
});

async function findInFiles(pattern: string | number) {
  let resultFound;
  try {
    resultFound = await find(String(pattern), '.', '.json$');
  } catch (error) {
    throw new Error(`finInFiles ${error}`);
  }
  return Object.keys(resultFound)[0].split('-')[0];
}
