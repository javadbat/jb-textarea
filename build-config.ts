import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [
  {
    name: "jb-textarea",
    path: "./lib/jb-textarea.ts",
    outputPath: "./dist/jb-textarea.js",
    umdName: "JBTextarea",
    external: ["jb-validation"],
    globals: {
      "jb-validation": "JBValidation",
    },
  },
];
export const reactComponentList: ReactComponentBuildConfig[] = [
  {
    name: "jb-textarea-react",
    path: "./react/lib/JBTextarea.tsx",
    outputPath: "./react/dist/JBTextarea.js",
    external: ["react", "prop-types", "jb-textarea", "jb-validation"],
    globals: {
      react: "React",
      "jb-textarea": "JBTextarea",
      "jb-validation": "JBValidation"
    },
  },
];