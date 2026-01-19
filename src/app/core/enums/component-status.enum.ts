import { TuiStringHandler } from "@taiga-ui/cdk/types";

export interface IStatus {
    value: number;
    label: string;
}

export const statusStringify: TuiStringHandler<IStatus> = (status) => status?.label ?? '';