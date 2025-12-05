import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const Menu = ({ cat, currentSlug }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(`/posts/?category=${cat}`);
                
                const filteredPosts = res.data.posts.filter(post => post.slug !== currentSlug);
                setPosts(filteredPosts);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [cat, currentSlug]);

    if (posts.length === 0) return null;

    return (
        <div className="menu">
            <h1>Other posts you may like</h1>
            {posts.map((post) => (
                <div className="post" key={post.id}>
                    <img src={post.coverImage || "https://images.unsplash.com/photo-1499750310107-5fef28a66643"} alt="" loading="lazy" />
                    <h2>{post.title}</h2>
                    <Link to={`/post/${post.slug}`}>
                        <button>Read More</button>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Menu;
