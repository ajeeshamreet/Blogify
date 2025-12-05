import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import DOMPurify from "dompurify";
import moment from "moment";

import Menu from "../components/Menu";
import Comments from "../components/Comments";

const Single = () => {
    const [post, setPost] = useState({});
    const { slug } = useParams();
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(`/posts/${slug}`);
                setPost(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [slug]);

    const handleDelete = async () => {
        try {
            await api.delete(`/posts/${post.id}`);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;
    };

    return (
        <div className="single">
            <div className="content">
                <img src={post?.coverImage || "https://images.unsplash.com/photo-1499750310107-5fef28a66643"} alt="" loading="lazy" />
                <div className="user">
                    {post.author?.img && <img src={post.author.img} alt="" />}
                    <div className="info">
                        <span>{post.author?.username}</span>
                        <p>Posted {moment(post.createdAt).fromNow()}</p>
                    </div>
                    {currentUser?.username === post.author?.username && (
                        <div className="edit">
                            <Link to={`/write?edit=${post.id}`} state={post}>
                                <img src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png" alt="Edit" style={{ width: "20px", height: "20px" }} />
                            </Link>
                            <img onClick={handleDelete} src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" alt="Delete" style={{ width: "20px", height: "20px" }} />
                        </div>
                    )}
                </div>
                <h1>{post.title}</h1>
                <div
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(post.content),
                    }}
                ></div>

                <Comments postId={post.id} />
            </div>
            <Menu cat={post.categories?.[0]?.name} currentSlug={slug} />
        </div>
    );
};

export default Single;
