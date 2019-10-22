// Copyright (c) 2017-2019, The Vircle Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/vircle/vircle-market/blob/develop/LICENSE

import { IsEnum, IsNotEmpty } from 'class-validator';
import { EscrowMessageType } from '../enums/EscrowMessageType';
import { ActionMessageInterface } from './ActionMessageInterface';
import { MessageBody } from '../../core/api/MessageBody';

export class EscrowMessage extends MessageBody implements ActionMessageInterface {

    @IsNotEmpty()
    @IsEnum(EscrowMessageType)
    public action: EscrowMessageType;

    @IsNotEmpty()
    public item: string;    // using listing instead of item

    @IsNotEmpty()
    public escrow: any;

    public nonce?: string;
    public memo?: string;
    public info?: any;
    public accepted?: boolean;

}
