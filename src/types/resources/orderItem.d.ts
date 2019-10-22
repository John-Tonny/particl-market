// Copyright (c) 2017-2019, The Vircle Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/vircle/vircle-market/blob/develop/LICENSE

import { OrderStatus } from '../../api/enums/OrderStatus';

declare module 'resources' {

    interface OrderItem {
        id: number;
        status: OrderStatus;
        itemHash: string;
        Bid: Bid;
        OrderItemObjects: OrderItemObject[];
        Order: Order;
        createdAt: Date;
        updatedAt: Date;
    }

}
