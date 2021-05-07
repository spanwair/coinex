import { apiKey, client } from './createClient';
const balanceUserUrl = '/balance/info';

export async function getUserBalance() {
  let resultBalance;
  try {
    resultBalance = await client.request(balanceUserUrl, 'GET');
  } catch (error) {
    await getUserBalance();
  }

  if (resultBalance && 'data' in resultBalance) {
    return resultBalance.data;
  }
  return null;
}

export const logger = {
  log: (value: string) => console.log(value),
};

export async function buy(traits: OrderTraits): Promise<OrderResponse | null> {
  // mock
  return null;
  let result;
  try {
    result = await client.request('/order/market', 'POST', {
      type: 'buy',
      ...traits
    })
  } catch (error) {
    logger.log(`error buy: >> ${error}`);
  }
  if (result && 'data' in result) {
    return result.data;
  }
  return null;
}

export async function sell(traits: OrderTraits): Promise<OrderResponse | null> {
  // mock
  return null;
  let result;
  try {
    result = await client.request('/order/market', 'POST', {
      ...traits,
      type: 'sell',
      access_id: apiKey,
    })
  } catch (error) {
    logger.log(`error buy: >> ${error}`);
  }
  if (result && 'data' in result) {
    return result.data;
  }
  return null;
}

export function isJsonString(str: string): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const defaultDataFile: FileTicker = {
  type: 'BUY',
  amount: 0,
  date: Date.now(),
  price: 0,
  round: 1,
  profit: 0,
  spend: 0,
  max_rounds: 1,
  max_spend: 0,
};
/** ALWAYS SET PRICE */
export const defaultDataFileBuy: FileTicker = {
  ...defaultDataFile,
  type: 'BUY',
};
/** ALWAYS SET PRICE */
export const defaultDataFileSell: FileTicker = {
  ...defaultDataFile,
  type: 'SELL',
};
