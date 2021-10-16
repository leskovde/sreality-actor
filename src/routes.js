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

    await Apify.pushData({ data: listings });
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
    log.info("Puštěno");
};
