// Copyright (c) 2017-2019, The Vircle Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/vircle/vircle-market/blob/develop/LICENSE

declare module 'resources' {

    interface ItemInformation {
        id: number;
        title: string;
        shortDescription: string;
        longDescription: string;
        createdAt: Date;
        updatedAt: Date;
        ShippingDestinations: ShippingDestination[];
        ItemCategory: ItemCategory;
        ItemImages: ItemImage[];
        ItemLocation: ItemLocation;
    }

}
