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

export interface FullComponentRes extends DetailComponentRes {
    isDisplay: number;
    isActive: number;
}