import { promises } from 'fs';
import { defaultDataFileBuy } from './utils';

export const fileWrite = async (file: string, data: FileTicker) =>
  await promises.writeFile(file, JSON.stringify(data), 'utf8');

export async function fetchFile(file: string): Promise<FileTicker> {
  let jsonFile;
  try {
    jsonFile = await promises.readFile(file, 'utf8');
  } catch (error) {
    if (String(error).includes('no such file or directory')) {
      await promises.writeFile(file, JSON.stringify(defaultDataFileBuy), 'utf8');
    }
    console.log('error :>> ', error);
    return await fetchFile(file);
  }
  if (isJsonString(jsonFile)) {
    return JSON.parse(jsonFile);
  }
  return await fetchFile(file);
}

function isJsonString(json: any) {
  try {
    JSON.parse(json);
  } catch (error) {
    return false;
  }
  return true;
}