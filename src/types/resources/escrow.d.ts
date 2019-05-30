// Copyright (c) 2017-2019, The Vpub Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/vpub/vpub-market/blob/develop/LICENSE

declare module 'resources' {

    interface Escrow {
        id: number;
        type: string;
        createdAt: Date;
        updatedAt: Date;
        Ratio: EscrowRatio;
    }

}
