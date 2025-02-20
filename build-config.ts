import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [
  {
    name: "jb-textarea",
    path: "./lib/jb-textarea.ts",
    outputPath: "./dist/jb-textarea.js",
    umdName: "JBTextarea",
    external: ["jb-validation", "jb-core"],
    globals: {
      "jb-validation": "JBValidation",
      "jb-core": "JBCore"
    },
  },
];
export const reactComponentList: ReactComponentBuildConfig[] = [
  {
    name: "jb-textarea-react",
    path: "./react/lib/JBTextarea.tsx",
    outputPath: "./react/dist/JBTextarea.js",
    external: ["react", "prop-types", "jb-textarea", "jb-validation", "jb-core", "jb-core/react"],
    globals: {
      react: "React",
      "jb-textarea": "JBTextarea",
      "jb-validation": "JBValidation",
      "jb-core": "JBCore",
      "jb-core/react":"JBCoreReact",
    },
    umdName: "JBTextareaReact",
    dir: "./react"
  },
];