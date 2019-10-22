// Copyright (c) 2017-2019, The Vircle Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/vircle/vircle-market/blob/develop/LICENSE

/**
 * core.api.HashableProposalOption
 *
 */
import { ProposalOptionCreateRequest } from '../../api/requests/ProposalOptionCreateRequest';

export class HashableProposalOption {

    public proposalHash: string;
    public optionId: number;
    public description: string;

    constructor(hashThis: ProposalOptionCreateRequest) {
        const input = JSON.parse(JSON.stringify(hashThis));

        if (input) {
            this.proposalHash = input.proposalHash;
            this.optionId = input.optionId;
            this.description = input.description;
        }
    }

}
