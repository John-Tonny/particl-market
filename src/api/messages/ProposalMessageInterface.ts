// Copyright (c) 2017-2019, The Vpub Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/vpub/vpub-market/blob/develop/LICENSE

import { ProposalMessageType } from '../enums/ProposalMessageType';

export interface ProposalMessageInterface {
    action: ProposalMessageType;
    item?: string;
    objects?: any;
}
