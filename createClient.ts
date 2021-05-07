import { get, post } from 'superagent';
import { createHash } from 'crypto';
import { stringify } from 'querystring';
import axios from 'axios';

const baseUrl = 'https://api.coinex.com/v1';

export const apiKey = 'EC2F3B0256EC4E2DB737D6BEA15CF6E6';
export const apiSecret  = '87D6AC9CF7785205240C71CFAA1DC7C7EF2DAB8B666577AB';

const userAgent =
  'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36';

export const client = {
  request: async (url: string, type: 'POST' | 'GET', fields = {}) => {
    const tonce = Date.now().toString();
    const completeUrl = baseUrl + url;

    const body = {
      access_id: apiKey,
      tonce,
      ...fields,
    };

    const bodySorted = Object.keys(body)
      .slice()
      .sort()
      .reduce(
        (prev, key) => ({
          ...prev,
          [key]: body[key],
        }),
        {}
      );

    const bodyAsQueryString = stringify(bodySorted);

    const bodyAsQueryStringWithSecret =
      bodyAsQueryString + '&secret_key=' + apiSecret;

    const signature = createHash('md5')
      .update(bodyAsQueryStringWithSecret)
      .digest('hex')
      .toUpperCase();

    let requestPromise = get(completeUrl + '?' + bodyAsQueryString)
      .set('authorization', signature)
      .set('User-Agent', userAgent);
    if (type === 'POST') {
      requestPromise = post(completeUrl)
        .send({
          ...fields,
          tonce,
        })
        .set('authorization', signature)
        .set('User-Agent', userAgent);
    }

    try {
      const response = await requestPromise;
      const { body } = response;
      const { code } = body;

      if (code) {
        throw new Error(`Coinex error code: ${code}`);
      }

      return body;
    } catch (error) {
      if (error.response) {
        console.error('Coinex request failed:');
        console.error(error.response.body);
      }
      throw error;
    }
  },
  getNoAuth: async (url: string) => {
    let response;
    try {
      response = await axios.get(`${baseUrl}${url}`);
    } catch (error) {
      console.log('error getNoAuth :>> ', error);
    }
    if (response && 'data' in response) {
      return response.data;
    }
    throw new Error(`error code getNoAuth ${url}`);
  }
}
