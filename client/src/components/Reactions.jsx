import React, { useState, useEffect } from "react";
import api from "../api";

const Reactions = ({ postId, initialLikes, initialBookmarks }) => {
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    
    
    

    const handleLike = async () => {
        try {
            const res = await api.post(`/reactions/${postId}/like`);
            setLiked(res.data.liked);
        } catch (err) {
            console.log(err);
        }
    };

    const handleBookmark = async () => {
        try {
            const res = await api.post(`/reactions/${postId}/bookmark`);
            setBookmarked(res.data.bookmarked);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="reactions">
            <button onClick={handleLike} className={liked ? "active" : ""}>
                {liked ? "❤️ Liked" : "🤍 Like"}
            </button>
            <button onClick={handleBookmark} className={bookmarked ? "active" : ""}>
                {bookmarked ? "🔖 Bookmarked" : "🏷️ Bookmark"}
            </button>
        </div>
    );
};

export default Reactions;
