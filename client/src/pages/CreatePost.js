import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  const [title, setTitle] = React.useState("");
  const [summary, setSummary] = React.useState("");
  const [content, setContent] = React.useState(null);
  const [files, setFiles] = React.useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const create = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    console.log(title, summary, content, files[0], data);
    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
    })
    console.log(await response.json());
  };

  return (
    <div>
      Create New Post
      <form onSubmit={create}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="summary"
          placeholder="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input type="file" onChange={(e) => setFiles(e.target.files)} />
        <ReactQuill
          formats={formats}
          modules={modules}
          value={content}
          onChange={(newValue) => setContent(newValue)}
        />
        <button style={{ marginTop: "5px" }}>Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
