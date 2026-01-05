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