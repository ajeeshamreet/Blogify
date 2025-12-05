import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";
import api from "../api";

const Comments = ({ postId }) => {
    const { currentUser } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [desc, setDesc] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editContent, setEditContent] = useState("");

    useEffect(() => {
        const fetchComments = async () => {
            if (!postId) return;
            try {
                const res = await api.get(`/posts/${postId}/comments`);
                setComments(res.data.comments || res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchComments();
    }, [postId]);

    const handleClick = async (e) => {
        e.preventDefault();
        if (!desc.trim()) return;
        if (!currentUser) {
            alert('Please login to comment');
            return;
        }
        try {
            const res = await api.post(`/posts/${postId}/comments`, { content: desc });
            setComments((prev) => [...prev, res.data]);
            setDesc("");
        } catch (err) {
            console.error('Comment error:', err);
            if (err.response?.status === 401) {
                alert('Please login to comment');
            } else {
                alert('Failed to post comment. Please try again.');
            }
        }
    };

    const handleEdit = (comment) => {
        setEditingCommentId(comment.id);
        setEditContent(comment.content);
    };

    const handleUpdate = async (id) => {
        try {
            const res = await api.patch(`/posts/comments/${id}`, { content: editContent });
            setComments(comments.map((c) => (c.id === id ? res.data : c)));
            setEditingCommentId(null);
            setEditContent("");
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/posts/comments/${id}`);
            setComments(comments.filter((c) => c.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const handleCancelEdit = () => {
        setEditingCommentId(null);
        setEditContent("");
    };

    return (
        <div className="comments">
            {currentUser ? (
                <div className="write">
                    <img src={currentUser.img || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="" />
                    <input
                        type="text"
                        placeholder="write a comment"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                    <button onClick={handleClick}>Send</button>
                </div>
            ) : (
                <div className="login-prompt">Please login to write a comment</div>
            )}
            {comments.map((comment) => (
                <div className="comment" key={comment.id}>
                    <img src={comment.author.img || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="" />
                    <div className="info">
                        <span>{comment.author.username}</span>
                        {editingCommentId === comment.id ? (
                            <div className="edit-mode">
                                <input
                                    type="text"
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                />
                                <button onClick={() => handleUpdate(comment.id)}>Save</button>
                                <button onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        ) : (
                            <p>{comment.content}</p>
                        )}
                    </div>
                    <div className="actions">
                        <span className="date">{moment(comment.createdAt).fromNow()}</span>
                        {currentUser && currentUser.username === comment.author.username && !editingCommentId && (
                            <>
                                <span className="edit-btn" onClick={() => handleEdit(comment)}>Edit</span>
                                <span className="delete-btn" onClick={() => handleDelete(comment.id)} style={{ color: "red", cursor: "pointer", marginLeft: "10px" }}>Delete</span>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Comments;
