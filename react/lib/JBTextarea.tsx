/* eslint-disable no-inner-declarations */
import React, { useRef, useImperativeHandle, CSSProperties, type PropsWithChildren } from 'react';
import 'jb-textarea';
// eslint-disable-next-line no-duplicate-imports
import {JBTextareaWebComponent} from 'jb-textarea';
import { EventProps, useEvents } from './events-hook.js';
import { JBTextareaAttributes, useJBTextareaAttribute } from './attributes-hook.js';
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
    const element = useRef<JBTextareaWebComponent>(null);
    useImperativeHandle(
      ref,
      () => (element ? element.current : undefined),
      [element],
    );
    useJBTextareaAttribute(element, props);
    useEvents(element,props);
    return (
      <jb-textarea placeholder={props.placeholder} class={props.className} style={props.style} ref={element} label={props.label} message={props.message}>
        {props.children}
      </jb-textarea>
    );
  }
});

type JBTextareaProps = EventProps & JBTextareaAttributes & {
    label?: string,
    placeholder?:string,
    className?: string,
    message?:string,
    style?:CSSProperties,
}
export type Props = PropsWithChildren<JBTextareaProps> & React.HTMLAttributes<JBTextareaWebComponent>;
// export type Props = PropsWithChildren<JBTextareaProps> & React.HTMLAttributes<JBTextareaWebComponent>;
export {JBTextarea};