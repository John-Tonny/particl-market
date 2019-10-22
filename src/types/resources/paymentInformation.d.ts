// Copyright (c) 2017-2019, The Vircle Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/vircle/vircle-market/blob/develop/LICENSE

declare module 'resources' {

    interface PaymentInformation {
        id: number;
        type: string;
        Escrow: Escrow;
        ItemPrice: ItemPrice;
        createdAt: Date;
        updatedAt: Date;
    }

}
