declare interface Balance {
  [key: string]: {
    available: number;
    frozen: number;
  };
}

declare interface OrderTraits {
  amount: string;
  market: string;
}

declare interface OrderResponse {
  id: string;
  /** Date.now() */
  create_time: number;
  finished_time: number | null;
  amount: string;
  price: string;
  deal_amount: string;
  deal_money: string;
  deal_fee: string;
  stock_fee: string;
  money_fee: string;
  asset_fee: string;
  fee_asset: null;
  fee_discount: string;
  avg_price: string;
  market: string;
  left: string;
  maker_fee_rate: string;
  taker_fee_rate: string;
  order_type: string;
  type: string;
  status: string;
  client_id: string;
}

declare interface Ticker {
  date: 1620248202925,
  ticker: {
    vol: '40088507.87255443',
    low: '0.061500',
    open: '0.062245',
    high: '0.077000',
    last: '0.076991',
    buy: '0.076991',
    buy_amount: '19590.81253105',
    sell: '0.077000',
    sell_amount: '99438.99421605'
  }
}

interface FileTicker {
  price: number;
  /** NEXT ROUND SIGN >> on sell token we change type to BUY */
  type: 'SELL' | 'BUY';
  amount: number;
  round: number;
  /** Time from last buy >> Date.now() */ 
  date: number;
  profit: number;
  spend: number;
  max_rounds?: number;
  max_spend?: number;
}

// exmp
//   id: 45096745600,
//   create_time: 1619519456,
//   finished_time: null,
//   amount: '50.00000000',
//   price: '0',
//   deal_amount: '50',
//   deal_money: '3.00165000000000',
//   deal_fee: '0.009004950000000000000000',
//   stock_fee: '0',
//   money_fee: '0.009004950000000000000000',
//   asset_fee: '0',
//   fee_asset: null,
//   fee_discount: '1',
//   avg_price: '0.060033',
//   market: 'CETUSDT',
//   left: '0.00000000',
//   maker_fee_rate: '0',
//   taker_fee_rate: '0.0030',
//   order_type: 'market',
//   type: 'sell',
//   status: 'done',
//   client_id: ''
