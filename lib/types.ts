export type JBTextareaElements = {
    textarea: HTMLTextAreaElement;
    label: HTMLLabelElement;
    labelValue: HTMLSpanElement;
    messageBox: HTMLDivElement;
}
export type ValidationResultSummary = {
    isValid:boolean | null;
    message:string | null;
}
export type ValidationResultItem = {
    isValid:boolean | null;
    message:string | null;
    validation:JBTextareaValidationItem;
}
export type ValidationResult = {
    validationList:ValidationResultItem[];
    isAllValid:boolean;
}
export type JBTextareaValidationItem = {
    validator: RegExp | ((value:string)=>boolean);
    message:string;
}