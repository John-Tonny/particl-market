// Copyright (c) 2017-2019, The Vpub Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/vpub/vpub-market/blob/develop/LICENSE

import * from 'jest';
import * as resources from 'resources';
import { app } from '../../../src/app';
import { Logger as LoggerType } from '../../../src/core/Logger';
import { Types, Core, Targets } from '../../../src/constants';
import { TestUtil } from '../lib/TestUtil';
import { TestDataService } from '../../../src/api/services/TestDataService';
import { MarketService } from '../../../src/api/services/MarketService';
import { ListingItemFactory } from '../../../src/api/factories/ListingItemFactory';
import { ListingItemMessage } from '../../../src/api/messages/ListingItemMessage';
import { GenerateListingItemTemplateParams } from '../../../src/api/requests/params/GenerateListingItemTemplateParams';
import { CreatableModel } from '../../../src/api/enums/CreatableModel';
import { TestDataGenerateRequest } from '../../../src/api/requests/TestDataGenerateRequest';
import { ProfileService } from '../../../src/api/services/ProfileService';
import { MarketplaceMessage } from '../../../src/api/messages/MarketplaceMessage';
import { ListingItemService } from '../../../src/api/services/ListingItemService';
import { ListingItemTemplateService } from '../../../src/api/services/ListingItemTemplateService';
import { IncomingSmsgMessage } from '../../../src/api/messages/IncomingSmsgMessage';
import { SmsgMessageStatus } from '../../../src/api/enums/SmsgMessageStatus';
import { SmsgMessageService } from '../../../src/api/services/SmsgMessageService';
import { SmsgMessageCreateRequest } from '../../../src/api/requests/SmsgMessageCreateRequest';
import { SmsgMessageFactory } from '../../../src/api/factories/SmsgMessageFactory';
import { MessageProcessor } from '../../../src/api/messageprocessors/MessageProcessor';
import { SmsgMessageSearchParams } from '../../../src/api/requests/SmsgMessageSearchParams';
import { SearchOrder } from '../../../src/api/enums/SearchOrder';
import { ListingItemMessageType } from '../../../src/api/enums/ListingItemMessageType';


describe('MessageProcessor', () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = process.env.JASMINE_TIMEOUT;

    const log: LoggerType = new LoggerType(__filename);
    const testUtil = new TestUtil();

    let testDataService: TestDataService;
    let marketService: MarketService;
    let profileService: ProfileService;
    let listingItemService: ListingItemService;
    let listingItemTemplateService: ListingItemTemplateService;
    let smsgMessageService: SmsgMessageService;
    let listingItemFactory: ListingItemFactory;
    let smsgMessageFactory: SmsgMessageFactory;
    let messageProcessor: MessageProcessor;

    let defaultMarket: resources.Market;
    let defaultProfile: resources.Profile;

    let listingItemTemplates: resources.ListingItemTemplate[];
    let smsgMessages: resources.SmsgMessage[] = [];

    // tslint:disable:max-line-length
    beforeAll(async () => {
        await testUtil.bootstrapAppContainer(app);  // bootstrap the app

        testDataService = app.IoC.getNamed<TestDataService>(Types.Service, Targets.Service.TestDataService);
        marketService = app.IoC.getNamed<MarketService>(Types.Service, Targets.Service.MarketService);
        profileService = app.IoC.getNamed<ProfileService>(Types.Service, Targets.Service.ProfileService);
        listingItemService = app.IoC.getNamed<ListingItemService>(Types.Service, Targets.Service.ListingItemService);
        listingItemTemplateService = app.IoC.getNamed<ListingItemTemplateService>(Types.Service, Targets.Service.ListingItemTemplateService);
        smsgMessageService = app.IoC.getNamed<SmsgMessageService>(Types.Service, Targets.Service.SmsgMessageService);
        listingItemFactory = app.IoC.getNamed<ListingItemFactory>(Types.Factory, Targets.Factory.ListingItemFactory);
        smsgMessageFactory = app.IoC.getNamed<SmsgMessageFactory>(Types.Factory, Targets.Factory.SmsgMessageFactory);
        messageProcessor = app.IoC.getNamed<MessageProcessor>(Types.MessageProcessor, Targets.MessageProcessor.MessageProcessor);

        // clean up the db, first removes all data and then seeds the db with default data
        await testDataService.clean();

        defaultMarket = await marketService.getDefault()
            .then(value => value.toJSON());

        defaultProfile = await profileService.getDefault()
            .then(value => value.toJSON());

    });
    // tslint:enable:max-line-length

    const createSmsgMessage = async (listingItemTemplate: resources.ListingItemTemplate, index: number): resources.SmsgMessage => {

        // prepare the message to be processed
        const listingItemMessage: ListingItemMessage = await listingItemFactory.getMessage(listingItemTemplate);

        const marketplaceMessage = {
            version: process.env.MARKETPLACE_VERSION,
            item: listingItemMessage,
            market: defaultMarket.address
        } as MarketplaceMessage;

        // put the MarketplaceMessage in SmsgMessage
        const listingItemSmsg = {
            msgid: 'TESTMESSAGE [' + index + '] : ' + new Date().getTime(),
            version: '0300',
            location: 'inbox',
            read: false,
            paid: false,
            payloadsize: 100,
            received: new Date().getTime(),
            sent: new Date().getTime(),
            expiration: new Date().getTime(),
            daysretention: 4,
            from: defaultProfile.address,
            to: defaultMarket.address,
            text: JSON.stringify(marketplaceMessage)
        } as IncomingSmsgMessage;

        const smsgMessageCreateRequest: SmsgMessageCreateRequest = await smsgMessageFactory.get(listingItemSmsg);
        return await smsgMessageService.create(smsgMessageCreateRequest)
            .then(async smsgMessageModel => {

                const smsgMessage: resources.SmsgMessage = smsgMessageModel.toJSON();
                log.debug('SAVED SMSGMESSAGE: '
                    + smsgMessage.from + ' => ' + smsgMessage.to
                    + ' : ' + smsgMessage.type
                    + ' : ' + smsgMessage.status
                    + ' : ' + smsgMessage.msgid);
                return smsgMessage;
            });
    };

    test('Should generate 10 ListingItemTemplates', async () => {

        const generateListingItemTemplateParams = new GenerateListingItemTemplateParams([
            true,   // generateItemInformation
            true,   // generateItemLocation
            true,   // generateShippingDestinations
            false, // true,   // generateItemImages
            true,   // generatePaymentInformation
            true,   // generateEscrow
            true,   // generateItemPrice
            true,   // generateMessagingInformation
            false,  // generateListingItemObjects
            false,  // generateObjectDatas
            defaultProfile.id,    // profileId
            false,  // generateListingItem
            defaultMarket.id     // marketId
        ]).toParamsArray();

        // generate 10 ListingItemTemplates without a ListingItem
        listingItemTemplates = await testDataService.generate({
            model: CreatableModel.LISTINGITEMTEMPLATE,
            amount: 10,
            withRelated: true,
            generateParams: generateListingItemTemplateParams
        } as TestDataGenerateRequest);

        expect(listingItemTemplates.length).toBe(10);
        log.debug('generated ' + listingItemTemplates.length + ' listingItemTemplates');

    }, 1200000); // timeout to 1200s

    test('Should process 10 SmsgMessages and set status PROCESSED', async () => {

        expect(smsgMessages.length).toBe(0);

        let i = 1;
        for (const listingItemTemplate of listingItemTemplates) {
            smsgMessages.push(await createSmsgMessage(listingItemTemplate, i));
            i++;
        }
        expect(smsgMessages.length).toBe(10);

        log.debug('CREATED ' + listingItemTemplates.length + ' SMSGMESSAGES ');

        // smsgMessages need to be 20++ seconds old to be found using polling
        await testUtil.waitFor(21);

        smsgMessages = await smsgMessageService.findAll()
            .then(value => value.toJSON());
        expect(smsgMessages.length).toBe(10);

        const newSearchParams = {
            order: SearchOrder.DESC,
            orderByColumn: 'received',
            types: [ListingItemMessageType.MP_ITEM_ADD],
            status: SmsgMessageStatus.NEW,
            page: 0,
            pageLimit: 101,
            age: 1000 * 20
        } as SmsgMessageSearchParams;

        const processingSearchParams = {
            order: SearchOrder.DESC,
            orderByColumn: 'received',
            types: [ListingItemMessageType.MP_ITEM_ADD],
            status: SmsgMessageStatus.PROCESSING,
            page: 0,
            pageLimit: 101,
            age: 1000 * 20
        } as SmsgMessageSearchParams;

        const processedSearchParams = {
            order: SearchOrder.DESC,
            orderByColumn: 'received',
            types: [ListingItemMessageType.MP_ITEM_ADD],
            status: SmsgMessageStatus.PROCESSED,
            page: 0,
            pageLimit: 101,
            age: 1000 * 20
        } as SmsgMessageSearchParams;

        const failedSearchParams = {
            order: SearchOrder.DESC,
            orderByColumn: 'received',
            types: [ListingItemMessageType.MP_ITEM_ADD],
            status: SmsgMessageStatus.PROCESSING_FAILED,
            page: 0,
            pageLimit: 101,
            age: 1000 * 20
        } as SmsgMessageSearchParams;

        // call poll for 10 times
        for (const smsgMessage of smsgMessages) {
            await messageProcessor.poll(true);
            await testUtil.waitFor(1);
        }

        let processedCount = 0;
        while (processedCount !== 10) {
            const newMessages: resources.SmsgMessage[] = await smsgMessageService.searchBy(newSearchParams)
                .then(value => value.toJSON());

            const processingMessages: resources.SmsgMessage[] = await smsgMessageService.searchBy(processingSearchParams)
                .then(value => value.toJSON());

            const processedMessages: resources.SmsgMessage[] = await smsgMessageService.searchBy(processedSearchParams)
                .then(value => value.toJSON());

            const failedMessages: resources.SmsgMessage[] = await smsgMessageService.searchBy(failedSearchParams)
                .then(value => value.toJSON());

            log.debug('new: ' + newMessages.length + ', processing: ' + processingMessages.length + ', failed: '
                + failedMessages.length + ', PROCESSED: ' + processedMessages.length);

            // TODO: this is commented out due to database locks, should uncomment after those are fixed
            // expect(failedMessages.length).toBe(0);
            processedCount = processedMessages.length;

            // expect(newMessages.length + processingMessages.length + processedMessages.length).toBe(100);

            await testUtil.waitFor(1);
        }

        await testUtil.waitFor(1);

        smsgMessages = await smsgMessageService.findAll()
            .then(value => value.toJSON());
        expect(smsgMessages.length).toBe(10);

        // expect all smsgmessages to have status PROCESSED
        for (const smsgMessage of smsgMessages) {
            expect(smsgMessage.status).toBe(SmsgMessageStatus.PROCESSED);
        }

    }, 1200000); // timeout to 1200s

});
