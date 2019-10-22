// Copyright (c) 2017-2019, The Vircle Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/vircle/vircle-market/blob/develop/LICENSE

import { VoteMessageType } from '../enums/VoteMessageType';

export interface VoteMessageInterface {
    action: VoteMessageType;
    item?: string;
    objects?: any;
}
