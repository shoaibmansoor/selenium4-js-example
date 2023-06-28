const { Builder, Capabilities, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

(async function example() {
  try {
    const options = new chrome.Options();
    options.addArguments([
        '--window-size=1920,1080',
        '--auth-server-whitelist="_"',
    ]);

    let driver = await new Builder()
        .usingServer("http://YOUR_IP:4444/wd/hub")
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    const pageCdpConnection = await driver.createCDPConnection("page");
    console.log(await driver.getCurrentUrl());
    console.log(JSON.stringify(await driver.getCapabilities(), null, 2));
    await driver.register("user", "pass", pageCdpConnection);
    await driver.get("https://authenticationtest.com");
    await driver.findElement(By.xpath("//a[.='HTTP/NTLM Auth']")).click();
    await driver.quit();
  } catch (e) {
    console.log(e);
  }
})();
