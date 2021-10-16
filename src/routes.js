const Apify = require('apify');

const { utils: { log } } = Apify;

exports.handleStart = async({ request, $ }) => {
    // Handle Start URLs
    log.info("[START]: Start")
        // log.debug(request)
        // for (const [key, value] of Object.entries(request)) {
        //     log.debug(`${key}: ${value}`);
        // }
        // log.debug("-----------HEADERS------------")
        // for (const [key, value] of Object.entries(request['headers'])) {
        //     log.debug(`${key}: ${value}`);
        // }
        // log.debug("------------userData-------------")
        // for (const [key, value] of Object.entries(request['userData'])) {
        //     log.debug(`${key}: ${value}`);
        // }
    log.debug($)
    log.info("[START]: End")
};

exports.handleList = async({ request, $ }) => {
    // Handle pagination

    log.info("[LIST]: Start")

    log.info("[LIST]: End")
};

exports.handleDetail = async({ request, $ }) => {
    // Handle 

    log.info("[DETAIL]: Start")

    log.info("[DETAIL]: End")
};