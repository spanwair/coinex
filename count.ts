/// <reference path="./type/types.d.ts" />

import { readdir, promises } from 'fs';
import { fetchFile } from './testingUtils';

readdir('.', async (err, files) => {
  if (err) {
    throw new Error(String(err));
  }
  let completeCount = 0;
  let maxSpend = 0;
  for (const file of files) {
    if (file.endsWith('-storage.json')) {
      let jsonFile: FileTicker | undefined;
      try {
        jsonFile = await fetchFile(file);
      } catch (error) {
        throw new Error(String(error));
      }
      completeCount = completeCount + jsonFile.profit;
      maxSpend = jsonFile.max_spend > maxSpend ? jsonFile.max_spend : maxSpend;
    }
  }
  console.log('completeCount :>> ', completeCount, completeCount * 22);
  console.log('maxSpend :>> ', maxSpend, maxSpend * 22);
});
