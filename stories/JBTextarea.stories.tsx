import React, { useState } from 'react';
import {JBTextarea, Props} from 'jb-textarea/react';
import type { Meta, StoryObj } from '@storybook/react';
import "./styles/styles.css"
const meta: Meta<Props> = {
  title: "Components/form elements/JBTextarea",
  component: JBTextarea,
};
export default meta;
type Story = StoryObj<typeof JBTextarea>;

export const Normal:Story = {
  args:{
    label:'text',
    placeholder:'please type here'
  }
};
export const Required:Story = {
  args:{
    label:'required text',
    message:'focus and unfocus to textarea to see the error',
    required:true
  }
};
export const WithError:Story = {
  args:{
    label:'with error',
    message:'message under textarea',
    error:'error message',
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
  }
};

export const DisabledWithValue:Story = {
  args:{
    label:'disabled',
    value:'here is the textarea value',
    disabled:true
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
  }
};
export const InlineStart:Story = {
  render: (args) => <JBTextarea {...args}>
    <div style={{width:'100%', height:'100%', backgroundColor:'red'}} slot="inline-start-section"></div>
  </JBTextarea>,
  args:{
    label:'text',
    placeholder:'please type here'
  }
};
export const InlineEnd:Story = {
  render: (args) => <JBTextarea {...args}>
    <div style={{width:'100%', height:'100%', backgroundColor:'red'}} slot="inline-end-section"></div>
  </JBTextarea>,
  args:{
    label:'text',
    placeholder:'please type here'
  }
};

export const BlockStart:Story = {
  render: (args) => <JBTextarea {...args}>
    <div style={{width:'100%', height:'2rem', backgroundColor:'red'}} slot="block-start-section"></div>
  </JBTextarea>,
  args:{
    label:'text',
    placeholder:'please type here'
  }
};

export const BlockEnd:Story = {
  render: (args) => <JBTextarea {...args}>
    <div style={{width:'100%', height:'2rem', backgroundColor:'red'}} slot="block-end-section"></div>
  </JBTextarea>,
  args:{
    label:'text',
    placeholder:'please type here'
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
  }
};