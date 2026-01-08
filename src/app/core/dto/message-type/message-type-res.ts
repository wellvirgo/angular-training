import { TuiStringHandler } from "@taiga-ui/cdk/types";

export interface MessageTypeRes {
    msgType?: string;
    description?: string;
    activeStatus?: number;
}

export const msgTypeStringify: TuiStringHandler<MessageTypeRes> = (msgType) => msgType?.description || '';
