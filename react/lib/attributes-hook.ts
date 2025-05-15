import { JBTextareaWebComponent, type ValidationValue } from "jb-textarea";
import { type ValidationItem } from "jb-validation";
import { RefObject, useEffect } from "react";

export type JBTextareaAttributes = {
  value?: string | null | undefined,
  validationList?:ValidationItem<ValidationValue>[],
  autoHeight?: boolean,
  required?:boolean
  error?: string,
  name?:string,

}
export function useJBTextareaAttribute(element: RefObject<JBTextareaWebComponent>, props: JBTextareaAttributes) {

  useEffect(() => {
    const value:string = props.value || '';
    if(element.current){
      element.current.value = value;
    }
  }, [props.value]);

  useEffect(() => {
    if(element.current){
      element.current.validation.list = props.validationList || [];
    }
  }, [props.validationList]);
  useEffect(() => {
    if(element.current && props.required!== undefined){
      props.required?element.current.setAttribute("required",''):element.current.removeAttribute("required");
    }
  }, [props.required]);

  useEffect(() => {
    if(element.current){
      element.current.autoHeight = props.autoHeight || false;
    }
  }, [props.autoHeight]);
  
  useEffect(() => {
    if (props.error) {
      element?.current?.setAttribute('error', props.error);
    } else {
      element?.current?.removeAttribute('error');
    }
  }, [props.error]);

    useEffect(() => {
    if (props.name) {
      element?.current?.setAttribute('name', props.name || '');
    } else {
      element?.current?.removeAttribute('name');
    }
  }, [props.name]);

}