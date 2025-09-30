import { Page, Locator, FrameLocator } from '@playwright/test';

export class RandomDateGeneratorPage {
  readonly page: Page;
  readonly generateButton: Locator;
  readonly outputContainer: Locator;
  readonly startDateInput: Locator;
  readonly endDateInput: Locator;
  readonly acceptButton: Locator;
  readonly frame: FrameLocator;

  constructor(page: Page) {
    this.page = page;
    this.generateButton = page.locator('button:has-text("Generate Random Date")');
    this.outputContainer = page.locator('//textarea[@id="generatedRandomDateTextArea"]');
    this.startDateInput = page.locator('input[placeholder="Start date"]');
    this.endDateInput = page.locator('input[placeholder="End date"]');
    this.frame = page.frameLocator('iframe[id="sp_message_iframe_1231401"]');
    this.acceptButton = this.frame.locator('//button[@title="Zaakceptować"]');
  }

  async goto() {
    await this.page.goto('https://codebeautify.org/generate-random-date');
    await this.frame.locator('text=Cenimy Twoją Prywatność').waitFor({ state: 'visible'})
    await this.acceptButton.click();
  }

  async clickGenerate() {
    await this.generateButton.click();
  }

  async getDates(): Promise<string[]> {
    await this.outputContainer.first().waitFor({ state: 'visible' });
    const rawText = await this.outputContainer.evaluate(el => (el as HTMLTextAreaElement).value);
    const dates = rawText
    ?.trim()
    .split(/\s+/)
    .filter(date => /^\d{2}-\d{2}-\d{4}$/.test(date)) ?? [];

    return dates;
  }

  async setStartDate(date: string) {
    await this.startDateInput.fill(date);
  }

  async setEndDate(date: string) {
    await this.endDateInput.fill(date);
  }

  async clearEndDate() {
    await this.endDateInput.fill('');
  }
}
