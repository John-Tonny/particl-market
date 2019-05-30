// Copyright (c) 2017-2019, The Vpub Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/vpub/vpub-market/blob/develop/LICENSE

declare module 'resources' {

    interface LockedOutput {
        id: number;
        txid: string;
        vout: number;
        amount: number;
        data: string;
        address: string;
        scriptPubKey: string;
        createdAt: Date;
        updatedAt: Date;

        bid_id: number;
    }

}
