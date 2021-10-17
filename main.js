const Apify = require('apify');
const { getAndValidateInput } = require('./src/tools');
const { handleStart, handleList, handleDetail } = require('./src/routes');

const { utils: { log } } = Apify;

Apify.main(async () => {
    const {
        state,
        priceStart,
        priceEnd,
        layout,
        advertType,
        buildingType,
        areaFrom,
        areaTo,
        levelFrom,
        levelTo,
        ownershipType,
        pageNumber
    } = await getAndValidateInput();

    let startUrl = `https://realitymix.cz/vypis-nabidek/?form%5Badresa_kraj_id%5D[]=${state}&form%5Badresa_obec_id%5D=&form%5Bcena_mena%5D=&form%5Bcena_normalizovana__from%5D=${priceStart}&form%5Bcena_normalizovana__to%5D=${priceEnd}&form%5Bdispozice%5D[]=${layout}&form%5Bexclusive%5D=&form%5Bfk_rk%5D=&form%5Binzerat_typ%5D=${advertType}&form%5Bnemovitost_typ%5D[]=${buildingType}&form%5Bplocha__from%5D=${areaFrom}&form%5Bplocha__to%5D=${areaTo}&form%5Bpodlazi_cislo__from%5D=${levelFrom}&form%5Bpodlazi_cislo__to%5D=${levelTo}&form%5Bprojekt_id%5D=&form%5Bsearch_in_city%5D=&form%5Bsearch_in_text%5D=&form%5Bstari_inzeratu%5D=&form%5Bstav_objektu%5D=&form%5Btop_nabidky%5D=&form%5Bvlastnictvi%5D[]=${ownershipType}&stranka=${pageNumber}`

    log.info(`Starting at url: ${startUrl}`);

    const requestList = await Apify.openRequestList('start-urls', [ startUrl ]);
    const requestQueue = await Apify.openRequestQueue();
    const proxyConfiguration = await Apify.createProxyConfiguration();

    const crawler = new Apify.PuppeteerCrawler({
        requestList,
        requestQueue,
        proxyConfiguration,
        launchContext: {
            useChrome: false,
            stealth: true,
        },
        handlePageFunction: async (context) => {
            const { url, userData: { label } } = context.request;
            log.info('Page opened.', { label, url });
            switch (label) {
                case 'DETAIL':
                    return handleDetail(context);
                default:
                    return handleList(context);
            }
        },
    });

    log.info('Starting the crawl.');
    await crawler.run();
    log.info('Crawl finished.');
});
