import React, { useEffect, useState } from "react";
import { convertToRaw, ContentState, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const NewsEditor = ({ getContent, content }) => {
  const [editorState, setEditorState] = useState("");

  useEffect(() => {
    // html -> draft
    const html = content;
    if (html === undefined) return;
    // console.log(html);
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [content]);

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
