const Apify = require("apify");

const {
    utils: { log },
} = Apify;

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
        });

    log.info("[LIST]: Scraped");

    for (let index = 0; index < listings.length; index++) {
        const request = listings[index];
        await crawler.requestQueue.addRequest(request);
    }

    log.info("[LIST]: Listings pushed");
};

exports.handleDetail = async ({ request, page }) => {
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

    let mainImage = await page.$$eval(".gallery__main-img-inner", $list => {
        const item = Array.from($list)[0];

        const imageUrl = item.querySelector("img").src;

        return { "imageUrl" : imageUrl }
    });

    let smallImages = await page.$$eval(".gallery__item--image", $list => {
        const items = [];

        $list.forEach($item => {
            const imageContainer = $item.querySelector("a");
            const imageUrl = imageContainer.querySelector("img").src;

            items.push({ "imageUrl" : imageUrl });
        });
        
        return items;
    });

    let images = [ mainImage ].concat(smallImages);

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

    await Apify.pushData({"header" : advertContainer, "images" : images, "properties" : propertyElList, "description" : description });

    log.info("[DETAIL]: Detail info done.");
};
