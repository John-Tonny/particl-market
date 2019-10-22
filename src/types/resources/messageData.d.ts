// Copyright (c) 2017-2019, The Vircle Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/vircle/vircle-market/blob/develop/LICENSE

declare module 'resources' {

    interface MessageData {
        id: number;
        msgid: string;
        version: string;
        received: Date;
        sent: Date;
        from: string;
        to: string;
        createdAt: Date;
        updatedAt: Date;
    }

}
