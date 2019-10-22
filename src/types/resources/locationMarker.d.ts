// Copyright (c) 2017-2019, The Vircle Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/vircle/vircle-market/blob/develop/LICENSE

declare module 'resources' {

    interface LocationMarker {
        id: number;
        markerTitle: string;
        markerText: string;
        lat: number;
        lng: number;
        createdAt: Date;
        updatedAt: Date;
    }

}
