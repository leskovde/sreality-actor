const Apify = require("apify");

const {
    utils: { log },
} = Apify;

exports.handleStart = async ({ request, page }) => {
    log.info("[START]: Start");
    // Handle Start URLs
    log.info("[START]: End");
};

exports.handleList = async ({ request, page, crawler }) => {
    log.info("[LIST]: Start");
    const listings = await page.$$eval(
        ".advert-list-items__content",
        ($listing) => {
            const items = [];
            $listing.forEach(($item) => {
                const link = $item.querySelector("h2 > a").getAttribute("href");
                items.push({
                    userData: {
                        label: "DETAIL",
                    },
                    url: link,
                });
            });
            return items;
        }
    );
    log.info("[LIST]: Scraped");

    //await Apify.pushData({ data: listings });
    for (let index = 0; index < listings.length; index++) {
        const request = listings[index];
        await crawler.requestQueue.addRequest(request);
    }
    /*for (const listing of listings) {
        const dataObj = Object.assign({}, request.userData.user, listing);
        await Apify.pushData(dataObj);
    }*/
    log.info("[LIST]: Listings pushed");
};

exports.handleDetail = async ({ request, page }) => {
    // Handle details
    log.info("[DETAIL]: Getting detail info.");

    let advertContainer = await page.$$eval(".advert-detail-fixed-top__content-info", $list => {
        const item = Array.from($list)[0];
        
        const headerText = item.querySelector("h4").textContent.trim();
        const buildingType = headerText.split(",")[0].trim();
        const location = item.querySelector("p").textContent.trim();
        
        const highlight = item.querySelector("strong");
        const price = highlight.querySelector("span").textContent.trim();

        flag = true;

        return [
            {"buildingType" : buildingType},
            {"location" : location},
            {"price" : price}
        ]
    });

    let propertyElList = await page.$$eval(".detail-information__data-item", $list => {
        const items = [];

        $list.forEach($item => {
            const key = $item.querySelector("span:nth-child(1)").textContent.trim();
            const value = $item.querySelector("span:nth-child(2)").textContent.trim();

            items.push({ 'key': key, 'value' : value });
        });
        
        return items;
    });

    let description = await page.$$eval(".advert-description__text-inner-inner", $list => {
        const item = Array.from($list)[0];

        return {"description" : item.textContent.trim()};
    });

    await Apify.pushData({"header" : advertContainer, "properties" : propertyElList, "description" : description});

    log.info("[DETAIL]: Detail info done.");
};
