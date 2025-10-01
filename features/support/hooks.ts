import { Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { CustomWorld } from './world';

import dotenv from 'dotenv';
dotenv.config();


Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({
    headless: process.env.HEADLESS !== 'false',
    slowMo: parseInt(process.env.SLOW_MO || '0')
  });

  this.page = await this.browser.newPage();
  await this.page.goto(process.env.BASE_URL || 'https://codebeautify.org/generate-random-date');
});

After(async function (this: CustomWorld) {
  if (this.page) {
    await this.page.close();
  }
  if (this.browser) {
    await this.browser.close();
  }
});
