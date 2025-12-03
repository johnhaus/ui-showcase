import fs from 'fs';
import path from 'path';
import { getStoryContext } from '@storybook/test-runner';

export default {
  async setup() {
    process.env.TEST_RUNNER_BROWSER = 'chromium';
  },

  async postVisit(page, story) {
    const context = await getStoryContext(page, story);

    const shouldScreenshot = context.parameters?.screenshot === true;

    if (!shouldScreenshot) return;

    const outputDir = path.join(process.cwd(), 'storyshots');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const fileName = `${story.id}.png`;
    const filePath = path.join(outputDir, fileName);

    await page.screenshot({
      path: filePath,
      fullPage: true,
    });
  },
};
