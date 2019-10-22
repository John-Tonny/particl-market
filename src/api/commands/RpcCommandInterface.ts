// Copyright (c) 2017-2019, The Vircle Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/vircle/vircle-market/blob/develop/LICENSE

import { RpcRequest } from '../requests/RpcRequest';
import { Command } from './Command';
import { CommandEnumType } from './CommandEnumType';
import { RpcCommandFactory } from '../factories/RpcCommandFactory';

export interface RpcCommandInterface<T> {

    commands: CommandEnumType;
    command: Command;

    execute(data: RpcRequest, rpcCommandFactory?: RpcCommandFactory): Promise<T>;
    validate(data: RpcRequest): Promise<RpcRequest>;
    getName(): string;
    getCommand(): Command;
    getChildCommands(): Command[];

    help(): string;
    usage(): string;
    example(): any;
    description(): string;
}
