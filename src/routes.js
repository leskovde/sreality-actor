const Apify = require('apify');

const { utils: { log } } = Apify;

exports.handleStart = async ({ request, page }) => {
    // Handle Start URLs
};

exports.handleList = async ({ request, page }) => {
    // Handle pagination
};

exports.handleDetail = async ({ request, page }) => {
    // Handle details
    log.info("[DETAIL]: Getting detail info.");

    let advertContainer = await page.$$eval(".advert-detail-fixed-top__content-info", $list => {
        const item = Array.from($list)[0];
        
        //return {"xd" : item.innerHTML};

        const headerText = item.querySelector("h4").textContent;
        const sellingType = headerText.split("-")[0].trim();

        const buildingType = headerText.split("-")[1].split(",")[0];
        const location = item.querySelector("p").textContent.trim();
        
        const highlight = item.querySelector("strong");
        const price = highlight.querySelector("span").textContent.trim();

        flag = true;

        return [
            {"sellingType" : sellingType}, 
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

    await Apify.pushData({"header" : advertContainer, "properties" : propertyElList});

    log.info("[DETAIL]: Detail info done.");
};
