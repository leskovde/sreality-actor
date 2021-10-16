/**
 * This template is a production ready boilerplate for developing with `CheerioCrawler`.
 * Use this to bootstrap your projects using the most up-to-date code.
 * If you're looking for examples or want to learn more, see README.
 */

const Apify = require('apify');
const { handleStart, handleList, handleDetail } = require('./src/routes');

const { utils: { log } } = Apify;

Apify.main(async() => {
    log.setLevel(log.LEVELS.DEBUG);
    const myRequest = new Apify.Request({
        url: 'https://www.sreality.cz/api/cs/v2/estates?building_condition=11&category_main_cb=2&category_type_cb=1&czk_price_summary_order2=5000000&locality_region_id=10&per_page=100&room_count_cb=1&tms=1634393131332',
        headers: { Accept: 'application/json' },
    });



    const { startUrls } = await Apify.getInput();




    const requestList = await Apify.openRequestList('start-urls', startUrls);
    const requestQueue = await Apify.openRequestQueue();
    const proxyConfiguration = await Apify.createProxyConfiguration();

    const additionalMimeTypes = ["application/hal+json"]

    await requestQueue.addRequest(myRequest);

    const crawler = new Apify.CheerioCrawler({
        requestList,
        requestQueue,
        proxyConfiguration,
        // Be nice to the websites.
        // Remove to unleash full power.
        maxConcurrency: 50,
        additionalMimeTypes: additionalMimeTypes,
        postNavigationHooks: [
            async(crawlingContext) => {
                // var request = crawlingContext.response;
                // log.debug(request)
                // for (const [key, value] of Object.entries(request)) {
                //     log.debug(`${key}: ${value}`);
                // }
                // log.debug("-----------_readableState------------")
                // for (const [key, value] of Object.entries(request['_readableState'])) {
                //     log.debug(`${key}: ${value}`);
                // }
            },
        ],
        handlePageFunction: async(context) => {
            const { url, userData: { label } } = context.request;
            log.info('Page opened.', { label, url });
            log.info(label)
            switch (label) {
                case 'LIST':
                    return handleList(context);
                case 'DETAIL':
                    return handleDetail(context);
                default:
                    return handleStart(context);
            }
        },
    });

    log.info('Starting the crawl.');
    await crawler.run();
    log.info('Crawl finished.');
});