import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface QuotationRecord {
    id: string;
    customerName: string;
    bankDataJson: string;
    panelBrand: string;
    savedAt: string;
    salePrice: bigint;
    customerDataJson: string;
    mobile: string;
    quotationNumber: string;
    capacity: bigint;
    channelPartnerName: string;
    systemType: string;
}
export interface backendInterface {
    deleteQuotation(id: string): Promise<boolean>;
    getAllQuotations(): Promise<Array<QuotationRecord>>;
    getQuotationCount(): Promise<bigint>;
    saveQuotation(customerName: string, quotationNumber: string, capacity: bigint, salePrice: bigint, mobile: string, panelBrand: string, systemType: string, channelPartnerName: string, customerDataJson: string, bankDataJson: string): Promise<string>;
}
