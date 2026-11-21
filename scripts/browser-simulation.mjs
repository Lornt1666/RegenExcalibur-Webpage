/*
 * RegenExcalibur simulated browser-audit matrix
 * Public-safe, on a loopback server, with no external app credentials.
 * Role coverage:
 *   Green: navigation, responsive business presentation, converted-inquiry helper
 *   Blue: input handling, content isolation, no unauthorized form POST
 *   Red: hostile strings, impact/consent gating, stale-result invalidation
 *   Purple: runtime errors, release-gate aggregation
 *   AER: screenshot evidence and test receipt
 *   Tetrad-1: deterministic job order / no live agent dispatch
 */
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { strict as assert } from "node:assert";
import { chromium } from "playwright-core";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const out = resolve(process.env.RUNNER_TEMP || "/tmp", "regen-site-audit");
await mkdir(out, {recursive:true});
const mime = { ".html":"text/html; charset=utf-8",".mjs":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".png":"image/png",".jpg":"image/jpeg",".svg":"image/svg+xml",".pdf":"application/pdf" };
let methods = [];
const server = createServer(async (req,res) => {
  methods.push(req.method || "UNKNOWN");
  if(req.method!=="GET" && req.method!=="HEAD") {res.writeHead(405).end("Method not allowed");return;}
  let url;
  try{url=new URL(req.url || "/", "http://127.0.0.1");}catch{res.writeHead(400).end();return;}
  if(url.pathname==="/favicon.ico"){res.writeHead(204).end();return;}
  const name=decodeURIComponent(url.pathname==="/" ? "/index.html":url.pathname);
  const target=resolve(root,"."+name);
  if(!target.startsWith(root+"/")){res.writeHead(403).end();return;}
  try {
    const content=await readFile(target);
    res.writeHead(200,{"Content-Type":mime[extname(target)] || "application/octet-stream","X-Content-Type-Options":"nosniff","Cache-Control":"no-store"});
    res.end(content);
  }catch{res.writeHead(404).end("Not found");}
});
await new Promise((ok,reject) => {server.once("error", reject);server.listen(0,"127.0.0.1",ok);});
const addr=server.address();
const base="http://127.0.0.1:"+addr.port;
const bin=process.env.CHROME_PATH || ["/usr/bin/google-chrome","/usr/bin/chromium","/usr/bin/chromium-browser"].find(existsSync);
if (!bin) throw new Error("A Chrome/Chromium executable is required for browser simulation.");
let browser;
const findings=[];
const errors=[];
try {
  browser=await chromium.launch({headless:true,executablePath:bin,args:["--no-sandbox","--disable-dev-shm-usage"]});
  for (const width of [320,390,768,1440]) {
    const context=await browser.newContext({viewport:{width,height:900},acceptDownloads:true,reducedMotion:"reduce"});
    const page=await context.newPage();
    page.on("pageerror",e=>errors.push("JS "+e.message));
    page.on("console",m=>{if(m.type()==="error") errors.push("CONSOLE "+m.text());});
    for(const slug of ["index.html","conscience.html","contact.html","privacy.html"]) {
      const response=await page.goto(base+"/"+slug,{waitUntil:"networkidle",timeout:30000});
      assert.equal(response.status(),200,slug);
      assert.equal(await page.locator("h1").count(),1,"exactly one primary heading: "+slug);
      const metric=await page.evaluate(() => ({
        width:innerWidth, scroll:document.documentElement.scrollWidth,
        main:!!document.querySelector("main#main"),
        content:!!document.querySelector("main#main")?.textContent?.trim()
      }));
      assert.ok(metric.main && metric.content,"Missing main content: "+slug);
      assert.ok(metric.scroll<=metric.width+2,slug+" at "+width+"px horizontally overflows by "+(metric.scroll-metric.width)+"px");
      await page.screenshot({path:out+"/"+slug.replace(".html","")+"-"+width+".png",fullPage:true,animations:"disabled"});
      findings.push({role:"GREEN",scenario:slug+"@"+width,status:"PASS",scrollWidth:metric.scroll});
    }
    if(width===390){
      await page.goto(base+"/index.html");
      await page.locator('a[href="#services"]').first().click();
      assert.equal(new URL(page.url()).hash,"#services");
      assert.equal(await page.locator(".engagement-card").count(),3);
      assert.equal(await page.locator(".project-card").count(),3);
      findings.push({role:"GREEN",scenario:"Business conversion and project visibility",status:"PASS"});

      await page.goto(base+"/conscience.html");
      await page.locator("#case-title").fill("<img src=x onerror=alert(1)> simulated input");
      for (const key of ["evidence","consent","oversight","security","reversibility","impactAssessment"]){
        await page.locator('input[name="'+key+'"]').check();
      }
      await page.locator('button[type="submit"]').click();
      assert.match(await page.locator("#decision-status").innerText(),/HUMAN REVIEW/);
      assert.equal(await page.locator("#download-report").isEnabled(),true);
      assert.equal(await page.locator("#finding-list img").count(),0);
      assert.ok((await page.locator("#report-code").innerText()).includes("<img src=x onerror=alert(1)>"));
      await page.locator('input[name="consent"]').uncheck();
      assert.equal(await page.locator("#download-report").isEnabled(),false);
      assert.match(await page.locator("#decision-status").innerText(),/INPUTS CHANGED/);
      await page.locator('button[type="submit"]').click();
      assert.match(await page.locator("#decision-status").innerText(),/HOLD/);
      const downloadPromise=page.waitForEvent("download");
      await page.locator("#download-report").click();
      const download=await downloadPromise;
      assert.match(download.suggestedFilename(),/regenexcalibur-conscience-demo-/);
      const saved=out+"/report.json";
      await download.saveAs(saved);
      const report=JSON.parse((await readFile(saved)).toString());
      assert.equal(report.disposition,"HOLD");
      assert.ok(report.missingCritical.includes("consent"));
      findings.push({role:"RED/BLUE",scenario:"XSS-like input, stale-result block, no-consent HOLD and JSON export",status:"PASS"});

      await page.goto(base+"/contact.html");
      await page.locator("#inquiry-name").fill("Demonstration research brief");
      await page.locator("#inquiry-goal").fill("Explore a public dataset without uploading confidential details");
      await page.locator('#inquiry-form button[type="submit"]').click();
      assert.ok((await page.locator("#inquiry-preview").inputValue()).includes("Demonstration research brief"));
      assert.equal(await page.locator("#copy-inquiry").isEnabled(),true);
      await page.locator("#inquiry-goal").fill("Updated goal");
      assert.equal(await page.locator("#copy-inquiry").isEnabled(),false);
      assert.equal(await page.locator("#inquiry-preview").inputValue(),"");
      findings.push({role:"GREEN/BLUE",scenario:"Inquiry preview, no-submit boundary and stale-draft block",status:"PASS"});
    }
    await context.close();
  }
  assert.equal(methods.every(x=>x==="GET"||x==="HEAD"),true,"An unexpected HTTP write occurred.");
  assert.deepEqual(errors,[],"Browser runtime errors were observed.");
  findings.push({role:"PURPLE",scenario:"No browser console errors, no non-GET requests",status:"PASS"});
  console.log(JSON.stringify({status:"PASS",cases:findings.length,findings,screenshots:16,output:out},null,2));
} catch(error) {
  console.error("BROWSER SIMULATION FAILED: "+(error.stack||String(error)));
  console.error(JSON.stringify({findings,errors},null,2));
  process.exitCode=1;
} finally {
  await browser?.close();
  await new Promise(resolve=>server.close(resolve));
}
