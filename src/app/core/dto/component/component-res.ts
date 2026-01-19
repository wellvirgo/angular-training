import { IStatus } from "../../enums/component-status.enum";
import { MessageTypeRes } from "../message-type/message-type-res";

export interface DetailComponentRes {
    id: number;
    componentCode: string;
    componentName: string;
    effectiveDate: any;
    endEffectiveDate: any;
    checkToken: string;
    status: IStatus;
    connectionMethod: string;
    messageType: MessageTypeRes;
}

export interface FullComponentRes {
    id: number;
    componentCode: string;
    componentName: string;
    effectiveDate: any;
    endEffectiveDate: any;
    checkToken: string;
    connectionMethod: string;
    messageType: string;
    isDisplay: number;
    isActive: number;
    statusDetail: IStatus;
    newData?: string;
}