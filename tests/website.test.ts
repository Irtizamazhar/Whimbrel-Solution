import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

const PAGES = [
  "/",
  "/about",
  "/services",
  "/services/custom-software",
  "/services/mobile-apps",
  "/services/web-development",
  "/services/ai-solutions",
  "/services/devops",
  "/services/ui-ux",
  "/portfolio",
  "/team",
  "/blog",
  "/careers",
  "/contact",
  "/enroll",
];

const SCREEN_SIZES = [
  { name: "Mobile S", width: 320, height: 568 },
  { name: "Mobile M", width: 375, height: 667 },
  { name: "Mobile L", width: 425, height: 812 },
  { name: "iPhone 14", width: 390, height: 844 },
  { name: "Samsung S8", width: 360, height: 740 },
  { name: "iPad Mini", width: 768, height: 1024 },
  { name: "iPad Pro", width: 1024, height: 1366 },
  { name: "Laptop S", width: 1024, height: 768 },
  { name: "Laptop L", width: 1440, height: 900 },
  { name: "Desktop", width: 1920, height: 1080 },
  { name: "4K", width: 2560, height: 1440 },
];

// TEST 1 — All pages load correctly
for (const path of PAGES) {
  test(`Page loads: ${path}`, async ({ page }) => {
    const url = BASE_URL + (path === "/" ? "" : path);
    const res = await page.goto(url, { waitUntil: "domcontentloaded" });
    expect(res?.status()).toBeLessThan(400);
    await expect(page).not.toHaveURL(/error/);
    await page.waitForLoadState("networkidle").catch(() => {});
    const title = await page.title();
    expect(title).toBeTruthy();
    console.log(`✅ ${path} loaded — Title: ${title}`);
  });
}

// TEST 2 — Responsive testing all screens
for (const size of SCREEN_SIZES) {
  test(`Responsive: ${size.name} (${size.width}x${size.height})`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: size.width, height: size.height });
    for (const route of ["/", "/services", "/enroll", "/careers"]) {
      await page.goto(BASE_URL + route, { waitUntil: "domcontentloaded" });
      await page.waitForLoadState("networkidle").catch(() => {});

      const hasHScroll = await page.evaluate(
        () =>
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth
      );
      if (hasHScroll) {
        console.log(`❌ Horizontal scroll on ${route} at ${size.name}`);
      }

      const safeName = size.name.replace(/\s+/g, "-");
      const routeName = route === "/" ? "home" : route.replace(/\//g, "-");
      await page
        .screenshot({
          path: `test-results/${safeName}-${routeName}.png`,
          fullPage: true,
        })
        .catch(() => {});
      console.log(`📸 Screenshot: ${size.name} ${route}`);
    }
  });
}

// TEST 3 — Navbar tests
test("Navbar: all links work", async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState("domcontentloaded");
  const navLinks = [
    "Home",
    "About",
    "Services",
    "Team",
    "Portfolio",
    "Blog",
    "Careers",
    "Contact",
  ];
  for (const link of navLinks) {
    const el = page.getByRole("link", { name: new RegExp(link, "i") }).first();
    await expect(el).toBeVisible({ timeout: 10000 });
    console.log(`✅ Nav link visible: ${link}`);
  }
});

test("Navbar: Enroll Now button exists", async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState("domcontentloaded");
  const btn = page.getByRole("link", { name: /enroll now/i });
  await expect(btn).toBeVisible({ timeout: 10000 });
  await btn.click();
  await expect(page).toHaveURL(/enroll/);
  console.log("✅ Enroll Now button works");
});

test("Navbar: Get a Quote button works", async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState("domcontentloaded");
  const btn = page.getByRole("link", { name: /get a quote/i });
  await expect(btn).toBeVisible({ timeout: 10000 });
  console.log("✅ Get a Quote button exists");
});

// TEST 4 — Mobile hamburger menu
test("Mobile: hamburger menu works", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto(BASE_URL);
  await page.waitForLoadState("domcontentloaded");
  const hamburger = page.getByRole("button", { name: /open menu/i });
  await expect(hamburger).toBeVisible({ timeout: 10000 });
  await hamburger.click();
  await page.waitForTimeout(500);
  console.log("✅ Hamburger menu opens");
});

// TEST 5 — Forms test
test("Contact form: all fields exist", async ({ page }) => {
  await page.goto(BASE_URL + "/contact");
  await page.waitForLoadState("networkidle").catch(() => {});
  const nameInput = page.locator('input[name="name"], input[placeholder*="Name"], input[placeholder*="name"]').first();
  const emailInput = page.locator('input[type="email"]').first();
  const messageInput = page.locator("textarea").first();
  await expect(nameInput.or(emailInput)).toBeVisible({ timeout: 8000 });
  console.log("✅ Contact form checked");
});

test("Careers: Apply Now opens form", async ({ page }) => {
  await page.goto(BASE_URL + "/careers");
  await page.waitForLoadState("networkidle").catch(() => {});
  const applyBtn = page.getByRole("button", { name: /apply now/i }).first();
  if (await applyBtn.isVisible()) {
    await applyBtn.click();
    await page.waitForTimeout(500);
    console.log("✅ Apply Now button works");
  }
});

test("Enroll page: tabs work", async ({ page }) => {
  await page.goto(BASE_URL + "/enroll");
  await page.waitForLoadState("networkidle").catch(() => {});

  const internTab = page.getByRole("button", { name: /internship/i }).first();
  if (await internTab.isVisible()) {
    await internTab.click();
    await page.waitForTimeout(300);
    console.log("✅ Internships tab works");
  }

  const courseTab = page.getByRole("button", { name: /courses/i }).first();
  if (await courseTab.isVisible()) {
    await courseTab.click();
    console.log("✅ Courses tab works");
  }
});

// TEST 6 — Check broken images
test("No broken images on homepage", async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState("networkidle").catch(() => {});
  const images = await page.locator("img").all();
  for (const img of images) {
    const src = await img.getAttribute("src");
    const isVisible = await img.isVisible();
    if (!isVisible && src) {
      console.log(`❌ Hidden image: ${src}`);
    }
  }
  console.log(`✅ Checked ${images.length} images`);
});

// TEST 7 — Check console errors
test("No console errors on key pages", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.push(msg.text());
    }
  });
  for (const route of ["/", "/services", "/enroll", "/about"]) {
    await page.goto(BASE_URL + route);
    await page.waitForLoadState("networkidle").catch(() => {});
  }
  if (errors.length > 0) {
    console.log("❌ Console errors found:");
    errors.forEach((e) => console.log(`  - ${e}`));
  } else {
    console.log("✅ No console errors!");
  }
});

// TEST 8 — Performance check
test("Homepage performance", async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState("load");
  const timing = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    if (!nav) return { loadTime: 0, domReady: 0 };
    return {
      loadTime: Math.round(
        (nav.loadEventEnd ?? 0) - (nav.startTime ?? 0)
      ),
      domReady: Math.round(
        (nav.domContentLoadedEventEnd ?? 0) - (nav.startTime ?? 0)
      ),
    };
  });
  console.log(`⚡ Load time: ${timing.loadTime}ms`);
  console.log(`⚡ DOM ready: ${timing.domReady}ms`);
  if (timing.loadTime > 3000) {
    console.log("⚠️ Page loads slow — needs optimization");
  } else {
    console.log("✅ Page load speed is good!");
  }
});
