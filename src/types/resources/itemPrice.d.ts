// Copyright (c) 2017-2019, The Vircle Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/vircle/vircle-market/blob/develop/LICENSE

declare module 'resources' {

    interface ItemPrice {
        id: number;
        currency: string;
        basePrice: number;
        createdAt: Date;
        updatedAt: Date;
        ShippingPrice: ShippingPrice;
        CryptocurrencyAddress: CryptocurrencyAddress;
    }

}
