import React, { useState } from 'react';
import {JBTextarea} from 'jb-textarea/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import "./styles/styles.css"
import { expect, userEvent, waitFor } from 'storybook/test';
import {
  appendEventTextarea,
  getLabelText,
  getMessageText,
  getNativeTextarea,
  getSlotWrapper,
  getTextarea,
  waitForTextareaValue,
} from './test-utils';
const meta = {
  title: "Components/form elements/JBTextarea",
  component: JBTextarea,
} satisfies Meta<typeof JBTextarea>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Normal:Story = {
  args:{
    label:'text',
    placeholder:'please type here'
  },
  play: async ({ canvasElement, args }) => {
    const textarea = getTextarea(canvasElement);
    const nativeTextarea = getNativeTextarea(textarea);

    await waitFor(() => {
      expect(getLabelText(textarea)).toBe(args.label);
      expect(nativeTextarea.placeholder).toBe(args.placeholder);
    });

    await userEvent.type(nativeTextarea, 'hello textarea');
    await waitForTextareaValue(textarea, 'hello textarea');
  }
};
export const Required:Story = {
  args:{
    label:'required text',
    message:'focus and unfocus to textarea to see the error',
    required:true
  },
  play: async ({ canvasElement, args }) => {
    const textarea = getTextarea(canvasElement);

    await waitFor(() => {
      expect(textarea.required).toBe(true);
      expect(getMessageText(textarea)).toBe(args.message);
      expect(textarea.reportValidity()).toBe(false);
      expect(getMessageText(textarea).length).toBeGreaterThan(0);
    });
  }
};
export const WithError:Story = {
  args:{
    label:'with error',
    message:'message under textarea',
    error:'error message',
  },
  play: async ({ canvasElement, args }) => {
    const textarea = getTextarea(canvasElement);

    await waitFor(() => {
      expect(textarea.reportValidity()).toBe(false);
      expect(getMessageText(textarea)).toBe(args.error);
      expect(textarea.validationMessage).toBe(args.error);
    });
  }
};
export const WithValidation:Story = {
  args:{
    label:'validation',
    placeholder:'10 char, and no f char',
    validationList:[
      {
        validator:/.{10}/g,
        message:"you must enter 10 char at least"
      },
      {
        validator:(value)=>{
          if(value.includes("f")){
            return false;
          }
          return true;
        },
        message:"you cant enter f char"
      }
    ]
  },
  play: async ({ canvasElement }) => {
    const textarea = getTextarea(canvasElement);

    textarea.value = 'abc';
    expect(textarea.reportValidity()).toBe(false);
    await waitFor(() => {
      expect(getMessageText(textarea)).toBe('you must enter 10 char at least');
    });

    textarea.value = 'abcdefghij';
    expect(textarea.reportValidity()).toBe(false);
    await waitFor(() => {
      expect(getMessageText(textarea)).toBe('you cant enter f char');
    });

    textarea.value = 'abcdeghijk';
    expect(textarea.reportValidity()).toBe(true);
    await waitFor(() => {
      expect(getMessageText(textarea)).toBe('');
    });
  }
};

export const OnEnterTest:Story = {
  args:{
    label:'text',
    placeholder:'please hit enter with shift key and without shift key',
    onEnter:(e)=>{
        alert("shift key:"+(e.shiftKey?'true':'false'))
    }
  }
};

export const Disabled:Story = {
  args:{
    label:'disabled',
    placeholder:'this textarea is disabled',
    disabled:true
  },
  play: async ({ canvasElement }) => {
    const textarea = getTextarea(canvasElement);
    const nativeTextarea = getNativeTextarea(textarea);

    await waitFor(() => {
      expect(textarea.disabled).toBe(true);
      expect(nativeTextarea.disabled).toBe(true);
    });
  }
};

export const DisabledWithValue:Story = {
  args:{
    label:'disabled',
    value:'here is the textarea value',
    disabled:true
  },
  play: async ({ canvasElement, args }) => {
    const textarea = getTextarea(canvasElement);

    await waitFor(() => {
      expect(textarea.disabled).toBe(true);
      expect(textarea.value).toBe(args.value);
      expect(getNativeTextarea(textarea).value).toBe(args.value);
    });
  }
};

export const ActionTest:Story = {
  render: (args) => {
     const [textVal, textValSetter] = useState('');
  const [autoGrowTextVal, autoGrowTextValSetter] = useState('');
  function onTextAreaKeydown(e){
    e.preventDefault();
  }
  return (
    <div>
      <h2>test grow ability</h2>
      <JBTextarea value={autoGrowTextVal} onChange={(e)=>{autoGrowTextValSetter(e.target.value);}} label="type to grow" autoHeight={true}></JBTextarea>
      <button onClick={()=>{autoGrowTextValSetter('');}}>clean</button>
      <button onClick={()=>{autoGrowTextValSetter('sss eeee ggggg'.repeat(200));}}>longText</button>
      <h3>grow with min and max height</h3>
      <div className="grow-with-custom-limit">
        <JBTextarea label="48 to 120" autoHeight={true}></JBTextarea>
      </div>
      <h3>test value binding to state</h3>
      <JBTextarea value={textVal} onChange={(e)=>{textValSetter(e.target.value);}} label="see the bottom"></JBTextarea>
      <p>{textVal}</p>
      <h3>test events (check console log)</h3>
      <JBTextarea onKeyDown={onTextAreaKeydown} onFocus={(e)=>{console.log(e);}} onBlur={(e)=>{console.log(e);}} label="see value after "></JBTextarea>
    </div>
  );
  },
  args:{
    label:'text',
    placeholder:'please type here'
  },
  play: async ({ canvasElement }) => {
    const textarea = getTextarea(canvasElement);
    const nativeTextarea = getNativeTextarea(textarea);

    await waitFor(() => {
      expect(textarea.autoHeight).toBe(true);
    });

    const initialHeight = nativeTextarea.style.height;
    textarea.value = 'long text '.repeat(100);

    await waitFor(() => {
      expect(nativeTextarea.style.height).not.toBe(initialHeight);
    });
  }
};
export const InlineStart:Story = {
  render: (args) => <JBTextarea {...args}>
    <div style={{width:'100%', height:'100%', backgroundColor:'red'}} slot="inline-start-section"></div>
  </JBTextarea>,
  args:{
    label:'text',
    placeholder:'please type here'
  },
  play: async ({ canvasElement }) => {
    const textarea = getTextarea(canvasElement);

    expect(getSlotWrapper(textarea, '.inline-start-section-wrapper').querySelector('slot')?.name).toBe('inline-start-section');
  }
};
export const InlineEnd:Story = {
  render: (args) => <JBTextarea {...args}>
    <div style={{width:'100%', height:'100%', backgroundColor:'red'}} slot="inline-end-section"></div>
  </JBTextarea>,
  args:{
    label:'text',
    placeholder:'please type here'
  },
  play: async ({ canvasElement }) => {
    const textarea = getTextarea(canvasElement);

    expect(getSlotWrapper(textarea, '.inline-end-section-wrapper').querySelector('slot')?.name).toBe('inline-end-section');
  }
};

export const BlockStart:Story = {
  render: (args) => <JBTextarea {...args}>
    <div style={{width:'100%', height:'2rem', backgroundColor:'red'}} slot="block-start-section"></div>
  </JBTextarea>,
  args:{
    label:'text',
    placeholder:'please type here'
  },
  play: async ({ canvasElement }) => {
    const textarea = getTextarea(canvasElement);

    expect(getSlotWrapper(textarea, '.block-start-section-wrapper').querySelector('slot')?.name).toBe('block-start-section');
  }
};

export const BlockEnd:Story = {
  render: (args) => <JBTextarea {...args}>
    <div style={{width:'100%', height:'2rem', backgroundColor:'red'}} slot="block-end-section"></div>
  </JBTextarea>,
  args:{
    label:'text',
    placeholder:'please type here'
  },
  play: async ({ canvasElement }) => {
    const textarea = getTextarea(canvasElement);

    expect(getSlotWrapper(textarea, '.block-end-section-wrapper').querySelector('slot')?.name).toBe('block-end-section');
  }
};

export const RTL = {
  args:{
    label:'متن',
    placeholder:'لطفا وارد کنید'
  },
  parameters: {
    themes:{
      themeOverride:'rtl'
    }
  },
  play: async ({ canvasElement, args }) => {
    const textarea = getTextarea(canvasElement);

    await waitFor(() => {
      expect(getLabelText(textarea)).toBe(args.label);
      expect(getNativeTextarea(textarea).placeholder).toBe(args.placeholder);
    });
  }
};

export const EventTest: Story = {
  render: () => <JBTextarea label="event test" required />,
  play: async ({ canvasElement }) => {
    const { textarea, events } = await appendEventTextarea(canvasElement);
    const nativeTextarea = getNativeTextarea(textarea);

    expect(textarea.reportValidity()).toBe(false);

    nativeTextarea.dispatchEvent(new InputEvent('beforeinput', { data: 'a', inputType: 'insertText', bubbles: true, cancelable: true, composed: true }));
    nativeTextarea.value = 'a';
    nativeTextarea.dispatchEvent(new InputEvent('input', { data: 'a', inputType: 'insertText', bubbles: true, composed: true }));
    nativeTextarea.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    nativeTextarea.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter', bubbles: true, cancelable: true }));
    nativeTextarea.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true, cancelable: true }));
    nativeTextarea.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));

    await waitFor(() => {
      expect(textarea.value).toBe('a');
      expect(events).toEqual(expect.arrayContaining([
        'invalid',
        'beforeinput',
        'input',
        'keydown',
        'keypress',
        'enter',
        'keyup',
        'change',
      ]));
    });
  },
};
