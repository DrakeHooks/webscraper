const puppeteer = require('puppeteer');
const CronJob = require('cron').CronJob; 
const Discord = require("discord.js");
const client = new Discord.Client();
const webhook = new Discord.WebhookClient('848012550196166676','k9OXmd97Pzpfg9jzT7656alynv0gwRM62r6xsgcmIuIIQsmiAN6lYnM31APguPBa-6is');
const Cheerio = require('cheerio');



async function monitor() {


    try {
        const browser = await puppeteer.launch({ headless: false });
        let page = await browser.newPage();
        await page.goto('https://www.amazon.com/AMD-Ryzen-5950X-32-Thread-Processor/dp/B0815Y8J9N/ref=sr_1_2?dchild=1&keywords=AMD+Ryzen+9+5950X&qid=1622423644&s=electronics&sr=1-2');       
        page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36');
        // page.setDefaultTimeout(0);
       while(true) {
        const $ = Cheerio.load(page);
        await page.reload();
        let html = await page.evaluate(() => document.body.innerHTML);
        

        $('#priceblock_ourprice', html).each(function() {
            let dollarPrice = $(this).text();
            const myEmbed = {
                "embeds": [
                    {
                        "author": {
                          
    
                        },
                        "title": "AMD Ryzen 9 5950X 16-core, 32-Thread Unlocked Desktop Processor",
                        "url": "https://www.amazon.com/AMD-Ryzen-5950X-32-Thread-Processor/dp/B0815Y8J9N/ref=sr_1_3?crid=DFH0HWFHOQUB&dchild=1&keywords=amd+ryzen+9+5900x&qid=1622431413&s=electronics&sprefix=amd+%2Celectronics%2C207&sr=1-3",
                        "description": "",
                        "thumbnail": {
                        "url" : "https://images-na.ssl-images-amazon.com/images/I/41rLUI4FOAL.jpg"},   
                        "color": 258703,
                        "fields" : [
                          {
                            "name": "SKU",
                            "value": "BO8PCF3Z7X",
                            "inline": true
                          },
                          {
                            "name": "Price",
                            "value": "799.00 USD",
                            "inline": true
                          },
                          {
                            "name": "Status",
                            "value": "In Stock",
                            "inline": false
                          },
                          {
                            "name": "Links",
                            "title": "Add To Cart",
                            "url": "https://www.amazon.com/gp/aws/cart/add-res.html?OfferListingId.1=5btZEewQDxU33C8zJrXzr%2FBcR8hmW%2F%2FF7EGJlgtPZMWxUCuQepCVOZWJx6NwW0X3LOSTbZIN%2FVVq%2F1fa%2FQPn1f7FNlWQjTX%2F%2FGkZbq2Ntj1f6%2B9SWuFO4LYRf4gsbWecuEAxKxkJsrfx%2FPfUNV5W7L8s7o7qsHJBY8L%2BOVzWrh2Mf5rVpQ3AMau%2Bf56xS46V&Quantity.1=1&AssociateTag=ssdcky0d-20",
                          }
                        ],
                          "footer": {
                          "text": "@DrizzyMonitors 🙄✌️",
                          "icon_url": "https://images.vexels.com/media/users/3/128243/isolated/preview/a1a5b9494d50bb3754bba547f2d88487-computer-monitor-flat-icon-by-vexels.png"
                          
                          }
                    }]
                    
            
            }
            let currentPrice = Number(dollarPrice.replace(/[^0-9.-]+/g,""));


            if(currentPrice > 830) {
              console.log("Out of Stock!");
              page.reload();
            }

            

            else if (currentPrice < 1000) {
                console.log("In stock! " + currentPrice);
                webhook.send(myEmbed);
                
            }
        })
      }     
} catch (e) {
    console.log('our error', e);

}
    
    };
    
monitor();

// // Every 5 seconds it checks if it is in-stock // 
// async function startTracking() {
//     const page = await monitor();

//     let job = new CronJob('* */20 * * * * ', function() {
//         monitor(page)
//     }, null, true, null, null, true);
//     job.start();
//  }

// startTracking();


// #outOfStock//
// #add-to-cart-button//

// https://www.amazon.com/dp/B08FC5L3RG?_encoding=UTF8&aod=1&linkCode=sl1&tag=ssdcky0d-20&linkId=e003c4cff1e4b856a308df53c89495c2&language=en_US&ref_=as_li_ss_tl');//
// https://www.amazon.com/PULSE-3D-Wireless-Headset-PlayStation-5/dp/B08FC6QLKN/ref=sr_1_1?dchild=1&keywords=ps5&qid=1622262855&sr=8-1//


      
