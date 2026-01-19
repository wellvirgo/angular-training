import { IStatus } from "../../enums/component-status.enum";

export interface DetailComponentRes {
    id: number;
    componentCode: string;
    componentName: string;
    effectiveDate: any;
    endEffectiveDate: any;
    checkToken: string;
    status: number;
    connectionMethod: string;
    messageType: string;
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