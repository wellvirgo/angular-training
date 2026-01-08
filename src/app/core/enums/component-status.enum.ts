import { TuiStringHandler } from "@taiga-ui/cdk/types";

interface IStatus {
    value: number;
    label: string;
}

export enum ComponentStatus {
    NEW = 1,
    PENDING = 3,
    APPROVED = 4,
    REJECTED = 5,
    CANCELLED = 7
}

export const ComponentStatusMap: Record<number, IStatus> = {
    [ComponentStatus.NEW]: { value: ComponentStatus.NEW, label: 'New' },
    [ComponentStatus.PENDING]: { value: ComponentStatus.PENDING, label: 'Pending' },
    [ComponentStatus.APPROVED]: { value: ComponentStatus.APPROVED, label: 'Approved' },
    [ComponentStatus.REJECTED]: { value: ComponentStatus.REJECTED, label: 'Rejected' },
    [ComponentStatus.CANCELLED]: { value: ComponentStatus.CANCELLED, label: 'Cancelled' },
};

export const statusStringify: TuiStringHandler<number> = (value) => ComponentStatusMap[value]?.label || '';