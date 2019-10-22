// Copyright (c) 2017-2019, The Vircle Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/vircle/vircle-market/blob/develop/LICENSE

/**
 * CountryNotFoundException
 * ----------------------------------------
 *
 * This should be used if country
 * not found in country code conversion.
 */

import { Exception } from '../../core/api/Exception';


export class CountryNotFoundException extends Exception {
    constructor(country: string) {
        super(404, `Country ${country} was not found!`);
    }
}
