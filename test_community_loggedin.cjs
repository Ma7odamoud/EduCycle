const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', err => {
            console.log('PAGE ERROR:', err.toString());
        });
        
        // Go to login
        await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle0' });
        
        // Assuming there's a user 'test@test.com' 'password123' or we can just create one
        // Wait, I can register one first via api
        
        // Actually, since I don't know a valid credential, let's just create one!
        await page.evaluate(async () => {
            try {
                const res = await fetch('http://localhost:5173/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        name: "Test User", 
                        email: "test.community.crash@test.com", 
                        password: "password123", 
                        phoneNumber: "+201012345678" 
                    })
                });
                console.log("Register API status:", res.status);
            } catch (e) {
                console.log("Register API Error:", e.message);
            }
        });

        // Fill credentials
        await page.waitForSelector('input[name="email"]');
        await page.type('input[name="email"]', 'test.community.crash@test.com');
        await page.type('input[name="password"]', 'password123');
        await page.click('button[type="submit"]');
        
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
        console.log("LOGIN SUCCESSFUL");

        // Now go to community
        await page.goto('http://localhost:5173/community', { waitUntil: 'networkidle0' });
        console.log("NAVIGATED TO COMMUNITY");
        
        await new Promise(r => setTimeout(r, 2000));
        
        const bodyHTML = await page.evaluate(() => document.body.innerHTML);
        console.log("BODY HTML LENGTH:", bodyHTML.length);
        
        await browser.close();
    } catch (e) {
        console.error("Puppeteer Script Error:", e);
        process.exit(1);
    }
})();
