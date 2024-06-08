import React from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";

import * as S from "./styles";

const CodeSnippet= ({
  type = "default",
  key,
  fragment,
  disabled = false,
  onChange,
}) => {
  const customStyles = {
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: "100%",
    borderRadius: "0.25rem",
    fontSize: 14,
    padding: "1rem",
    minHeight: "20rem",
    fontFamily:
      "Source Code Pro, ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
  };

  return (
    <S.Content key={key}>
      <div data-color-mode="light">
        <CodeEditor
          value={fragment}
          language="jsx"
          padding={0}
          disabled={disabled}
          onChange={evn => onChange(evn.target.value)}
          style={customStyles}
        />
      </div>
    </S.Content>
  );
};

export default CodeSnippet;