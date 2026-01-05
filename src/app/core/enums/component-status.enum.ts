class Status {
    value: number;
    label: string;

    constructor(value: number, label: string) {
        this.value = value;
        this.label = label;
    }
}

export enum ComponentStatus {
    NEW = 1,
    PENDING = 3,
    APPROVED = 4,
    REJECTED = 5,
    CANCELLED = 7
}

export const ComponentStatusMap: Record<number, Status> = {
    [ComponentStatus.NEW]: new Status(ComponentStatus.NEW, 'New'),
    [ComponentStatus.PENDING]: new Status(ComponentStatus.PENDING, 'Pending'),
    [ComponentStatus.APPROVED]: new Status(ComponentStatus.APPROVED, 'Approved'),
    [ComponentStatus.REJECTED]: new Status(ComponentStatus.REJECTED, 'Rejected'),
    [ComponentStatus.CANCELLED]: new Status(ComponentStatus.CANCELLED, 'Cancelled'),
};