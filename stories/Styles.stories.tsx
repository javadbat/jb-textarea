import React from 'react';
import { JBTextarea } from 'jb-textarea/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '../../../docs/styles/ant-design.css';
import '../../../docs/styles/aurora.css';
import '../../../docs/styles/bootstrap.css';
import '../../../docs/styles/candy.css';
import '../../../docs/styles/carbon.css';
import '../../../docs/styles/cupertino.css';
import '../../../docs/styles/fluent.css';
import '../../../docs/styles/forest.css';
import '../../../docs/styles/material.css';
import '../../../docs/styles/porcelain.css';
import '../../../docs/styles/sunset.css';
import '../../../docs/styles/terminal.css';
import './styles/style-ant-design.css';
import './styles/style-aurora.css';
import './styles/style-bootstrap.css';
import './styles/style-candy.css';
import './styles/style-carbon.css';
import './styles/style-cupertino.css';
import './styles/style-fluent.css';
import './styles/style-forest.css';
import './styles/style-material.css';
import './styles/style-porcelain.css';
import './styles/style-sunset.css';
import './styles/style-terminal.css';

const meta = {
  title: "Components/form elements/JBTextarea/Style",
  component: JBTextarea,
} satisfies Meta<typeof JBTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

const styleSamples = [
  { name: "Carbon", className: "carbon-style" },
  { name: "Aurora", className: "aurora-style aurora-textarea" },
  { name: "Forest", className: "forest-style forest-textarea" },
  { name: "Sunset", className: "sunset-style sunset-textarea" },
  { name: "Porcelain", className: "porcelain-style porcelain-textarea" },
  { name: "Candy", className: "candy-style candy-textarea" },
  { name: "Terminal", className: "terminal-style terminal-textarea" },
  { name: "Material", className: "material-style material-textarea" },
  { name: "Fluent", className: "fluent-style fluent-textarea" },
  { name: "Bootstrap", className: "bootstrap-style bootstrap-textarea" },
  { name: "Cupertino", className: "cupertino-style cupertino-textarea" },
  { name: "Ant Design", className: "ant-design-style ant-textarea" },
];

function TextareaAdornment({ children, slot }: { children: React.ReactNode; slot: string }) {
  return (
    <span slot={slot} style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "1.5rem",
      minHeight: "1.5rem",
      fontSize: "0.75rem",
      fontWeight: 700,
      color: "var(--jb-primary, #2563eb)",
    }}>
      {children}
    </span>
  );
}

function TextareaStyleSample({ className }: { className: string }) {
  return (
    <div style={{
      display: "grid",
      gap: "0.75rem",
      width: "100%",
    }}>
      <JBTextarea className={className} label="Project notes" placeholder="Write a short update" message="Multiline helper text" />
      <JBTextarea className={className} label="Review summary" value={"Ready for design review.\nIncludes accessibility notes."}>
        <TextareaAdornment slot="inline-start-section">#</TextareaAdornment>
        <TextareaAdornment slot="inline-end-section">OK</TextareaAdornment>
      </JBTextarea>
      <JBTextarea className={className} label="Validation error" value="Too short" error="Write at least 24 characters" />
      <JBTextarea className={className} label="Disabled" value="This content is locked." disabled />
    </div>
  );
}

export const Gallery: Story = {
  name: "Gallery",
  render: () => (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
      gap: "1.25rem",
      alignItems: "start",
      width: "min(100%, 76rem)",
    }}>
      {styleSamples.map((sample) => (
        <section
          key={sample.className}
          style={{
            display: "grid",
            gap: "0.75rem",
            minWidth: 0,
            padding: "1rem",
            background: "var(--jb-surface, #ffffff)",
            border: "1px solid var(--jb-border-color, #e5e7eb)",
            borderRadius: "0.75rem",
            boxShadow: "0 0.75rem 1.75rem oklch(0% 0 0 / 0.08)",
          }}
          className={sample.className.split(" ")[0]}
        >
          <div style={{
            width: "100%",
            color: "var(--jb-text-primary, #334155)",
            fontSize: "0.875rem",
            fontWeight: 700,
            lineHeight: 1.4,
            textAlign: "center",
          }}>
            {sample.name}
          </div>
          <TextareaStyleSample className={sample.className} />
        </section>
      ))}
    </div>
  ),
};

export const Carbon: Story = { name: "Carbon", render: () => <TextareaStyleSample className="carbon-style" /> };
export const Aurora: Story = { name: "Aurora", render: () => <TextareaStyleSample className="aurora-style aurora-textarea" /> };
export const Forest: Story = { name: "Forest", render: () => <TextareaStyleSample className="forest-style forest-textarea" /> };
export const Sunset: Story = { name: "Sunset", render: () => <TextareaStyleSample className="sunset-style sunset-textarea" /> };
export const Porcelain: Story = { name: "Porcelain", render: () => <TextareaStyleSample className="porcelain-style porcelain-textarea" /> };
export const Candy: Story = { name: "Candy", render: () => <TextareaStyleSample className="candy-style candy-textarea" /> };
export const Terminal: Story = { name: "Terminal", render: () => <TextareaStyleSample className="terminal-style terminal-textarea" /> };
export const Material: Story = { name: "Material", render: () => <TextareaStyleSample className="material-style material-textarea" /> };
export const Fluent: Story = { name: "Fluent", render: () => <TextareaStyleSample className="fluent-style fluent-textarea" /> };
export const Bootstrap: Story = { name: "Bootstrap", render: () => <TextareaStyleSample className="bootstrap-style bootstrap-textarea" /> };
export const Cupertino: Story = { name: "Cupertino", render: () => <TextareaStyleSample className="cupertino-style cupertino-textarea" /> };
export const AntDesign: Story = { name: "Ant Design", render: () => <TextareaStyleSample className="ant-design-style ant-textarea" /> };
