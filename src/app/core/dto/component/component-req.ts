import { TuiDay } from "@taiga-ui/cdk";
import { IStatus } from "../../enums/component-status.enum";

export interface SearchComponentReq {
    componentCode?: string;
    componentName?: string;
    effectiveDateFrom?: string;
    effectiveDateTo?: string;
    endEffectiveDateFrom?: string;
    endEffectiveDateTo?: string;
    checkToken?: string;
    status?: number;
}

export interface SearchComponentCriteria {
    componentCode?: string;
    componentName?: string;
    effectiveDateFrom?: string;
    effectiveDateTo?: string;
    endEffectiveDateFrom?: string;
    endEffectiveDateTo?: string;
    checkToken?: string;
    status?: IStatus;
}

export interface SearchComponentReqWithPagination extends SearchComponentReq {
    page?: number;
    size?: number;
    searchTech: string;
    sortField?: string;
    sortDirection?: string;
}

export interface CreateComponentReq {
    componentCode?: string;
    componentName?: string;
    messageType?: string;
    connectionMethod?: string;
    effectiveDate?: string;
    checkToken?: string;
}

export interface UpdateComponentReq {
    componentCode?: string;
    componentName?: string;
    effectiveDate?: TuiDay;
    endEffectiveDate?: TuiDay;
    checkToken?: string;
    status?: number;
    connectionMethod?: string;
    messageType?: string;
    isDisplay?: number | boolean;
    isActive?: number | boolean;
}

export interface UpdateComponentFormValue {
    componentCode?: string;
    componentName?: string;
    effectiveDate?: TuiDay;
    endEffectiveDate?: TuiDay;
    checkToken?: string;
    statusDetail?: IStatus;
    connectionMethod?: string;
    messageType?: string;
    isDisplay?: number | boolean;
    isActive?: number | boolean;
}