// Copyright (c) 2017-2019, The Vpub Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/vpub/vpub-market/blob/develop/LICENSE

import { IsNotEmpty } from 'class-validator';
import { RequestBody } from '../../core/api/RequestBody';

// tslint:disable:variable-name
export class ListingItemTemplateCreateRequest extends RequestBody {

    @IsNotEmpty()
    public profile_id: number;

    public hash: string;
    public itemInformation;
    public paymentInformation;
    public messagingInformation;
    public listingItemObjects;

}
// tslint:enable:variable-name
