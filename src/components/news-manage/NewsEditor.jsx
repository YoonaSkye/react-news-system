import React, { useState } from "react";
import { convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const NewsEditor = ({ getContent }) => {
  const [editorState, setEditorState] = useState("");
  // console.log(editorState);
  return (
    <div>
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={(editorState) => setEditorState(editorState)}
        onBlur={() =>
          getContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        }
      />
    </div>
  );
};

export default NewsEditor;
