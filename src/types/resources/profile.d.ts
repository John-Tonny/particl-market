// Copyright (c) 2017-2019, The Vpub Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/vpub/vpub-market/blob/develop/LICENSE

declare module 'resources' {

    interface Profile {
        id: number;
        name: string;
        address: string;
        createdAt: Date;
        updatedAt: Date;
        ShippingAddresses: Address[];
        CryptocurrencyAddresses: CryptocurrencyAddress[];
        FavoriteItems: FavoriteItem[];
        ShoppingCart: ShoppingCart[];
    }

}
