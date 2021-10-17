const Apify = require('apify');
const { STATES, LAYOUTS, ADVERTTYPES, BUILDINGTYPES, OWNERSHIPTYPES } = require('./consts');

const { utils: { log } } = Apify;

const getAndValidateInput = async () => {
    const input = await Apify.getInput();

    const stateToInt = (x) => {
        if (x in STATES)
            return STATES[x];
        throw new Error("Invalid state.");
    }

    const layoutToInt = (x) => {
        if (x in LAYOUTS)
            return LAYOUTS[x];
        throw new Error("Invalid layout.");
    }

    const advertTypeToInt = (x) => {
        if (x in ADVERTTYPES)
            return ADVERTTYPES[x];
        throw new Error("Invalid advert type.");
    }

    const buildingTypeToInt = (x) => {
        if (x in BUILDINGTYPES)
            return BUILDINGTYPES[x];
        throw new Error("Invalid building type.");
    }

    const ownershipTypeToInt = (x) => {
        if (x in OWNERSHIPTYPES)
            return OWNERSHIPTYPES[x];
        throw new Error("Invalid ownership type.");
    }

    const maybeThis = (x) => { 
        return (x === undefined) ? "" : x;
    }

    let {
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
    } = input;

    state = stateToInt(state);
    layout = layoutToInt(layout);
    advertType = advertTypeToInt(advertType);
    buildingType = buildingTypeToInt(buildingType);
    ownershipType = ownershipTypeToInt(ownershipType);

    priceStart = maybeThis(priceStart);
    priceEnd = maybeThis(priceEnd);
    areaFrom = maybeThis(areaFrom);
    areaTo = maybeThis(areaTo);
    levelFrom = maybeThis(levelFrom);
    levelTo = maybeThis(levelTo);

    log.info("----- Input overview -----");
    log.info(`Search state: ${state}`);
    log.info(`Search priceStart: ${priceStart}`);
    log.info(`Search priceEnd: ${priceEnd}`);
    log.info(`Search layout: ${layout}`);
    log.info(`Search advertType: ${advertType}`);
    log.info(`Search buildingType: ${buildingType}`);
    log.info(`Search areaFrom: ${areaFrom}`);
    log.info(`Search areaTo: ${areaTo}`);
    log.info(`Search levelFrom: ${levelFrom}`);
    log.info(`Search levelTo: ${levelTo}`);
    log.info(`Search ownershipType: ${ownershipType}`);
    log.info("----- End of input overview -----");

    return {
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
    };
}

module.exports = {
    getAndValidateInput
};