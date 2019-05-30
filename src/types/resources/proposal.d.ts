// Copyright (c) 2017-2019, The Vpub Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/vpub/vpub-market/blob/develop/LICENSE

import { ProposalType } from '../../api/enums/ProposalType';

declare module 'resources' {

    interface Proposal {
        id: number;
        submitter: string;
        hash: string;
        item: string;
        type: ProposalType;
        title: string;
        description: string;

        timeStart: number;
        receivedAt: number;
        postedAt: number;
        expiredAt: number;

        createdAt: Date;
        updatedAt: Date;
        ProposalOptions: ProposalOption[];
        ProposalResults: ProposalResult[];
        ListingItem: ListingItem;
    }

}
