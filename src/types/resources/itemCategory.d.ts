// Copyright (c) 2017-2019, The Vircle Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/vircle/vircle-market/blob/develop/LICENSE

declare module 'resources' {

    interface ItemCategory {
        id: number;
        key: string;
        name: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        parentItemCategoryId: number;
        ChildItemCategories: ItemCategory[];
        ParentItemCategory: ItemCategory;
    }

}
