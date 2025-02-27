import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  const apiKey = "6hxd54c8x17rc1pbg2uenxn1y98q6dzrymx0z0srcs42fxjl"; // Replace with your actual API key

  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1 text-white font-semibold">
          {label}
        </label>
      )}
      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, onBlur, value } }) => (
          <Editor
            apiKey={apiKey}
            value={value}
            init={{
              height: 600,
              menubar: true,
              skin: "oxide-dark",
              content_css: "dark",

              // 🔹 ALLOW INLINE STYLES
              forced_root_block: "p",
              extended_valid_elements: "*[*]", // allow all elements + attributes
              valid_styles: {
                // Define which inline styles are permitted
                "*": "font-size,color,background-color,text-align,text-decoration,font-weight,font-style",
              },

              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
                "emoticons",
                "codesample",
                "pageembed",
                "autosave",
                "quickbars",
                "directionality",
                "mentions",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic underline strikethrough forecolor backcolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | blockquote subscript superscript | " +
                "removeformat | code codesample | link image media table | " +
                "emoticons charmap pageembed | fullscreen | help",
              content_style: `
                body {
                  font-family: Helvetica, Arial, sans-serif;
                  font-size: 16px;
                  background-color: #1e1e2e;
                  color: white;
                  padding: 15px;
                  border-radius: 8px;
                }
                pre {
                  background: #2e2e3e;
                  padding: 10px;
                  border-radius: 5px;
                  overflow-x: auto;
                }
                code {
                  background: #282c34;
                  color: #e06c75;
                  padding: 2px 5px;
                  border-radius: 3px;
                }
              `,
              quickbars_insert_toolbar: "quickimage quicktable media codesample",
              quickbars_selection_toolbar:
                "bold italic underline | quicklink blockquote",
              autosave_interval: "30s",

              branding: false, // Remove TinyMCE branding
            }}
            onEditorChange={(content) => onChange(content)}
            onBlur={onBlur}
          />
        )}
      />
    </div>
  );
}
