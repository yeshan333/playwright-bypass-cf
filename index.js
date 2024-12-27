// playwright-extra is a drop-in replacement for playwright,
// it augments the installed playwright with plugin functionality
const { chromium } = require('playwright-extra')
const fs = require('fs');
const path = require('path');
// Load the stealth plugin and use defaults (all tricks to hide playwright usage)
// Note: playwright-extra is compatible with most puppeteer-extra plugins
const stealth = require('puppeteer-extra-plugin-stealth')()

// Add the plugin to playwright (any number of plugins can be added)
chromium.use(stealth)

// That's it, the rest is playwright usage as normal 😊
chromium.launch({ headless: true }).then(async browser => {
    const page = await browser.newPage();
    const url = 'https://pythoncat.substack.com/feed';
    const savePath = path.resolve('rss.xml');
  
    const response = await page.goto(url);
    if (response.ok()) {
      const buffer = await response.body();
      fs.writeFileSync(savePath, buffer);
      console.log(`xml save to ${savePath}`);
    } else {
      console.log(`download failed: ${response.status()}`);
    }
  
    await browser.close();
})