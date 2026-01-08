import { TuiStringHandler } from "@taiga-ui/cdk/types";


interface ICheckToken {
    label: string;
    value: string;
}

export enum CheckToken {
    YES = 'Y',
    NO = 'N'
}

export const CheckTokenMap: Record<string, ICheckToken> = {
    [CheckToken.YES]: { label: 'Yes', value: CheckToken.YES },
    [CheckToken.NO]: { label: 'No', value: CheckToken.NO }
}


export const checkTokenStringify: TuiStringHandler<string> = (value) => CheckTokenMap[value]?.label || '';
