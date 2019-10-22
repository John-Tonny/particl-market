// Copyright (c) 2017-2019, The Vircle Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/vircle/vircle-market/blob/develop/LICENSE

declare module 'resources' {

    interface ProposalOptionResult {
        id: number;
        weight: number;
        voters: number;
        ProposalOption: ProposalOption;
        ProposalResult: ProposalResult;

        createdAt: Date;
        updatedAt: Date;
    }

}
