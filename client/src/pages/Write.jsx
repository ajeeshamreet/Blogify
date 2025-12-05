import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import api from "../api";
import { useLocation, useNavigate } from "react-router-dom";

const Write = () => {
    const state = useLocation().state;
    const [value, setValue] = useState(state?.content || "");
    const [title, setTitle] = useState(state?.title || "");
    const [coverImage, setCoverImage] = useState(state?.coverImage || "");
    const [cat, setCat] = useState(state?.categories?.[0]?.name || "");
    const [tags, setTags] = useState(state?.tags?.map(t => t.name).join(", ") || "");
    const [excerpt, setExcerpt] = useState(state?.excerpt || "");

    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();

        const tagsArray = tags.split(",").map(tag => tag.trim()).filter(tag => tag !== "");

        try {
            state
                ? await api.patch(`/posts/${state.id}`, {
                    title,
                    content: value,
                    excerpt,
                    categories: cat ? [cat] : [],
                    tags: tagsArray,
                    coverImage,
                })
                : await api.post(`/posts`, {
                    title,
                    content: value,
                    excerpt,
                    categories: cat ? [cat] : [],
                    tags: tagsArray,
                    coverImage,
                    published: true
                });
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
            ["link", "image", "video"],
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
        "video",
    ];

    return (
        <div className="add">
            <div className="content">
                <input
                    type="text"
                    placeholder="Title"
                    className="title-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Write a short excerpt..."
                    className="excerpt-input"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={2}
                />
                <div className="editorContainer">
                    <ReactQuill
                        className="editor"
                        theme="snow"
                        value={value}
                        onChange={setValue}
                        modules={modules}
                        formats={formats}
                        placeholder="Tell your story..."
                    />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publishing</h1>
                    <div className="status-item">
                        <b>Status:</b> <span>Draft</span>
                    </div>
                    <div className="status-item">
                        <b>Visibility:</b> <span>Public</span>
                    </div>

                    <div className="image-upload">
                        <label>Cover Image URL</label>
                        <input
                            type="text"
                            placeholder="https://images.unsplash.com/..."
                            value={coverImage}
                            onChange={(e) => setCoverImage(e.target.value)}
                            style={{ width: "100%", padding: "8px", marginTop: "5px", border: "1px solid #ddd", borderRadius: "4px" }}
                        />
                        {coverImage && (
                            <div className="preview" style={{ marginTop: "10px" }}>
                                <img src={coverImage} alt="Preview" style={{ maxWidth: "100%", borderRadius: "4px" }} />
                            </div>
                        )}
                        <p style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
                            Use Unsplash or other image URLs
                        </p>
                    </div>

                    <div className="buttons">
                        <button className="draft-btn">Save Draft</button>
                        <button className="publish-btn" onClick={handleClick}>
                            {state ? "Update" : "Publish"}
                        </button>
                    </div>
                </div>

                <div className="item">
                    <h1>Category</h1>
                    <div className="cat-list">
                        {["Technology", "Lifestyle", "Travel", "Food", "Art"].map((category) => (
                            <div className="cat" key={category}>
                                <input
                                    type="radio"
                                    checked={cat === category}
                                    name="cat"
                                    value={category}
                                    id={category}
                                    onChange={(e) => setCat(e.target.value)}
                                />
                                <label htmlFor={category}>{category}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="item">
                    <h1>Tags</h1>
                    <input
                        type="text"
                        placeholder="e.g., react, design, web"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="tags-input"
                    />
                    <p className="hint">Separate tags with commas</p>
                </div>
            </div>
        </div>
    );
};

export default Write;
