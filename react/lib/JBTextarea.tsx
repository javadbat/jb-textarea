/* eslint-disable no-inner-declarations */
import React, { useRef, useEffect, useImperativeHandle, useState, CSSProperties } from 'react';
import 'jb-textarea';
// eslint-disable-next-line no-duplicate-imports
import {JBTextareaWebComponent, type ValidationValue} from 'jb-textarea';
import { type ValidationItem } from "jb-validation";
import { EventProps, useEvents } from './events-hook.js';
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
      interface IntrinsicElements {
        'jb-textarea': JBTextareaType;
      }
      interface JBTextareaType extends React.DetailedHTMLProps<React.HTMLAttributes<JBTextareaWebComponent>, JBTextareaWebComponent> {
        class?:string,
        label?: string,
        name?:string,
        message?:string,
        placeholder?:string,
        // ref:React.RefObject<JBDateInputWebComponent>,
      }
    }
}
// eslint-disable-next-line react/display-name
const JBTextarea = React.forwardRef((props:Props, ref) => {
  {
    //we set this state so when ref change we have a render and our event listener will be updated
    const [refChangeCount , refChangeCountSetter] = useState(0);
    const element = useRef<JBTextareaWebComponent>(null);
    useImperativeHandle(
      ref,
      () => (element ? element.current : {}),
      [element],
    );
    useEffect(()=>{
      refChangeCountSetter(refChangeCount+1);
    },[element.current]);

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
    useEvents(element,props);
    return (
      <jb-textarea placeholder={props.placeholder} class={props.className} style={props.style} ref={element} label={props.label} message={props.message} name={props.name}></jb-textarea>
    );
  }
});

export type Props = EventProps & {
    label?: string,
    value?: string | null | undefined,
    placeholder?:string,
    className?: string,
    style?:CSSProperties,
    validationList?:ValidationItem<ValidationValue>[],
    autoHeight?: boolean,
    message?:string,
    name?:string,
    required?:boolean
}
export {JBTextarea};