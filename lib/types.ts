import type {EventTypeWithTarget} from "jb-core";
import type { JBTextareaWebComponent } from "./jb-textarea";

export type JBTextareaElements = {
    textarea: HTMLTextAreaElement;
    label: HTMLLabelElement;
    labelValue: HTMLSpanElement;
    messageBox: HTMLDivElement;
}

export type ValidationValue = string;

export type JBTextareaEventType<TEvent> = EventTypeWithTarget<TEvent,JBTextareaWebComponent>
