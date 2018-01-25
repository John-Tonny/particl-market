import { rpc, api } from './lib/api';
import * as crypto from 'crypto-js';
import { BlackBoxTestUtil } from './lib/BlackBoxTestUtil';
import { Commands } from '../../src/api/commands/CommandEnumType';

describe('ItemCategoryRemoveCommand', () => {

    const testUtil = new BlackBoxTestUtil();
    const method = Commands.CATEGORY_ROOT.commandName;
    const subCommand = Commands.CATEGORY_REMOVE.commandName;
    const makretMethod = Commands.MARKET_ROOT.commandName;
    const subCommandMarket = Commands.MARKET_ADD.commandName;

    const parentCategory = {
        id: 0,
        key: 'cat_high_real_estate'
    };

    let newCategory;
    let profileId;
    let marketId;
    let rootItemCategory;

    beforeAll(async () => {
        await testUtil.cleanDb();

        // create category
        const res = await rpc(method, [Commands.CATEGORY_ADD.commandName, parentCategory.key]);
        const categoryResult: any = res.getBody()['result'];
        // expect(categoryResult).toBe(1);
        rootItemCategory = categoryResult.ParentItemCategory;
        parentCategory.id = categoryResult.id;
        const addCategoryRes: any = await testUtil.addData('itemcategory', {
            name: 'sample category',
            description: 'sample category description',
            parent_item_category_id: parentCategory.id
        });
        newCategory = addCategoryRes.getBody()['result'];
        // expect(newCategory).toBe(1);
        // profile
        const defaultProfile = await testUtil.getDefaultProfile();
        profileId = defaultProfile.id;
        // expect(defaultProfile).toBe(1);

        // market
        const resMarket = await rpc(makretMethod, [subCommandMarket, 'Test Market', 'privateKey', 'Market Address']);
        const resultMarket: any = resMarket.getBody()['result'];
        marketId = resultMarket.id;
        // expect(resultMarket).toBe(1);
    });

    test('Should delete the category', async () => {
        // expect([subCommand, newCategory.id]).toBe(1);
        const res = await rpc(Commands.CATEGORY_ROOT.commandName, [Commands.CATEGORY_REMOVE.commandName, newCategory.id]);
        res.expectJson();
        res.expectStatusCode(200);
    });

    test('Should not delete the default category', async () => {
        const res = await rpc(method, [subCommand, rootItemCategory.id]);
        res.expectJson();
        res.expectStatusCode(404);
    });

    test('Should not delete the category if listing-item related with category', async () => {
        // create category
        const addCategoryRes: any = await testUtil.addData('itemcategory', {
            name: 'sample category 2',
            description: 'sample category description 2',
            parent_item_category_id: parentCategory.id
        });
        newCategory = addCategoryRes.getBody()['result'];

        const hash = crypto.SHA256(new Date().getTime().toString()).toString();
        const listingitemData = {
            market_id: marketId,
            hash,
            itemInformation: {
                title: 'item title',
                shortDescription: 'item short desc',
                longDescription: 'item long desc',
                itemCategory: {
                    id: newCategory.id
                }
            }
        };
        const listingItems = await testUtil.addData('listingitem', listingitemData);
        const res = await rpc(method, [subCommand, newCategory.id]);
        res.expectJson();
        res.expectStatusCode(404);
    });

    test('Should not delete the category if listing-item-template related with category', async () => {
        // create category
        const addCategoryRes: any = await testUtil.addData('itemcategory', {
            name: 'sample category 3',
            description: 'sample category description 3',
            parent_item_category_id: parentCategory.id
        });
        newCategory = addCategoryRes.getBody()['result'];
        // create listing-item-template with category
        const listingItemTemplate = {
            profile_id: profileId,
            itemInformation: {
                title: 'Item Information',
                shortDescription: 'Item short description',
                longDescription: 'Item long description',
                itemCategory: {
                    id: newCategory.id
                }
            }
        };
        const listingItems = await testUtil.addData('listingitemtemplate', listingItemTemplate);
        const res = await rpc(method, [subCommand, newCategory.id]);
        res.expectJson();
        res.expectStatusCode(404);
    });

});
