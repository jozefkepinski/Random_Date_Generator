import { Given, When, Then} from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { RandomDateGeneratorPage } from '../pages/randomDateGeneratorPage';
import { chromium } from 'playwright';

let page;
let browser;
let context;
let generator: RandomDateGeneratorPage;
let firstBatch: string[];

Given('I am on the random date generator page', async () => {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
  generator = new RandomDateGeneratorPage(page);
  await generator.goto();
});

When('I click the generate button', async () => {
  await generator.clickGenerate();
});

Then('I should see at least 10 dates displayed', async () => {
  const dates = await generator.getDates();
  expect(dates.length).toBeGreaterThanOrEqual(10);
  browser.close()
});

Then('each generated date should match the format {string}', async (format) => {
  const dates = await generator.getDates();
  const regex = /^\d{2}-\d{2}-\d{4}$/;
  for (const date of dates) {
    expect(date).toMatch(regex);
  }
  browser.close()
});

When('I store the first batch of dates', async () => {
  firstBatch = await generator.getDates();
});

Then('the new batch of dates should be different from the first batch', async () => {
  const secondBatch = await generator.getDates();
  expect(secondBatch).not.toEqual(firstBatch);
  browser.close()
});

Given('I set start date to {string}', async (start) => {
  await generator.setStartDate(start);
});

Given('I set end date to {string}', async (end) => {
  await generator.setEndDate(end);
});

Then('all generated dates should be between {string} and {string}', async (start, end) => {
  const dates = await generator.getDates();
  const startDate = new Date(start);
  const endDate = new Date(end);
  for (const date of dates) {
    const parsed = new Date(date);
    expect(parsed >= startDate && parsed <= endDate).toBeTruthy();
  }
  browser.close()
});

Given('I clear the end date field', async () => {
  await generator.clearEndDate();
});

Then('I should see an error or no dates generated', async () => {
  const dates = await generator.getDates();
  expect(dates.length).toBeLessThan(1);
  browser.close()
});
