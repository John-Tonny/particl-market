// Copyright (c) 2017-2019, The Vircle Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/vircle/vircle-market/blob/develop/LICENSE

export class SmsgSendResponse {
    public result: string;
    public msgid?: string;
    public txid?: string;
    public fee?: number;
    public error?: string;

    public msgids?: string[]; // custom, for vote msgids
}
