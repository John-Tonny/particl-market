// Copyright (c) 2017-2019, The Vircle Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/vircle/vircle-market/blob/develop/LICENSE

import * from 'jest';
import { Environment } from '../../../src/core/helpers/Environment';

describe('Environment', () => {
    test('getName() should return the test env', () => {
        expect(Environment.getNodeEnv()).toBe('test');
    });

    test('isTest() should be true', () => {
        expect(Environment.isTest()).toBeTruthy();
    });

    test('isDevelopment() should be false', () => {
        expect(Environment.isDevelopment()).toBeFalsy();
    });

    test('isProduction() should be false', () => {
        expect(Environment.isProduction()).toBeFalsy();
    });
});
