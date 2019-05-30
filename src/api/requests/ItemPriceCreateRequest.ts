// Copyright (c) 2017-2019, The Vpub Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/vpub/vpub-market/blob/develop/LICENSE

import {IsNotEmpty, IsEnum, IsPositive} from 'class-validator';
import { RequestBody } from '../../core/api/RequestBody';
import { Currency } from '../enums/Currency';

// tslint:disable:variable-name
export class ItemPriceCreateRequest extends RequestBody {

    @IsNotEmpty()
    public payment_information_id: number;

    @IsEnum(Currency)
    @IsNotEmpty()
    public currency: Currency;

    @IsNotEmpty()
    @IsPositive()
    public basePrice: number;

    public shippingPrice;

    public cryptocurrencyAddress;
}
// tslint:enable:variable-name
