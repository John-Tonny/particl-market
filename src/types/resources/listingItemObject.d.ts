// Copyright (c) 2017-2019, The Vpub Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/vpub/vpub-market/blob/develop/LICENSE

declare module 'resources' {

    interface ListingItemObject {
        id: number;
        type: string;
        description: string;
        order: number;
        forceInput: boolean;
        objectId: string;
        createdAt: Date;
        updatedAt: Date;
        ListingItemObjectDatas: ListingItemObjectData[];

    }

}
