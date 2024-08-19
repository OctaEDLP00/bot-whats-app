import { join } from 'path'

/**
 * @type {import("puppeteer-core").Configuration}
 */
export default {
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};