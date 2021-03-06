// Copyright (c) 2017-2019, The Particl Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/particl/particl-market/blob/develop/LICENSE

import * from 'jest';
import { BlackBoxTestUtil } from '../lib/BlackBoxTestUtil';
import { Commands } from '../../../src/api/commands/CommandEnumType';
import {Logger as LoggerType} from '../../../src/core/Logger';

describe('ItemCategoryAddCommand', () => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = process.env.JASMINE_TIMEOUT;

    const log: LoggerType = new LoggerType(__filename);
    const testUtil = new BlackBoxTestUtil();

    const categoryCommand = Commands.CATEGORY_ROOT.commandName;
    const categoryAddCommand = Commands.CATEGORY_ADD.commandName;

    beforeAll(async () => {
        await testUtil.cleanDb();
    });

    const parentCategory = {
        id: 0,
        key: 'cat_high_real_estate'
    };

    test('Should create the ItemCategory with parent category key', async () => {
        //  test default category data
        const categoryData = {
            name: 'Sample Category 1',
            description: 'Sample Category Description 1'
        };
        const res = await testUtil.rpc(categoryCommand, [categoryAddCommand,
            categoryData.name,
            categoryData.description,
            parentCategory.key
        ]);
        res.expectJson();
        res.expectStatusCode(200);
        const result: any = res.getBody()['result'];
        parentCategory.id = result.parentItemCategoryId;
        expect(result.name).toBe(categoryData.name);
        expect(result.description).toBe(categoryData.description);
        expect(result.ParentItemCategory.key).toBe(parentCategory.key);
    });

    test('Should create the ItemCategory with parent category Id', async () => {
        //  test default category data
        const categoryData = {
            name: 'Sample Category 2',
            description: 'Sample Category Description 2'
        };
        const res = await testUtil.rpc(categoryCommand, [categoryAddCommand,
            categoryData.name,
            categoryData.description,
            parentCategory.id
        ]);
        res.expectJson();
        res.expectStatusCode(200);
        const result: any = res.getBody()['result'];
        expect(result.name).toBe(categoryData.name);
        expect(result.description).toBe(categoryData.description);
        expect(result.parentItemCategoryId).toBe(parentCategory.id);
        expect(result.ParentItemCategory.key).toBe(parentCategory.key);
    });

    test('Should fail to create the ItemCategory without passing category', async () => {
        const categoryData = {
            name: 'Sample Category 3',
            description: 'Sample Category Description 3'
        };
        const res = await testUtil.rpc(categoryCommand, [categoryAddCommand,
            categoryData.name,
            categoryData.description
        ]);
        res.expectJson();
        res.expectStatusCode(404);
        expect(res.error.error.message).toBe(`Parent category can't be null or undefined!`);
    });
});
