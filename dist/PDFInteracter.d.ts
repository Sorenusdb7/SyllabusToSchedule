import { ClassEventList } from "./public/ClassEventList.js";
export declare class PDFInteracter {
    private eventList;
    private processed;
    getEventList(): ClassEventList;
    setEventList(eventList: ClassEventList): void;
    getProcessed(): boolean;
    setProcessed(processed: boolean): void;
    processPDF(filePath: string): Promise<void>;
}
//# sourceMappingURL=PDFInteracter.d.ts.map