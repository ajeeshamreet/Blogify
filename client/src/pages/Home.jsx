import React, { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams, useNavigate } from "react-router-dom";
import api from "../api";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchInput, setSearchInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchTimeout, setSearchTimeout] = useState(null);
    const location = useLocation();

    const navigate = useNavigate();
    
    const page = parseInt(searchParams.get("page")) || 1;
    const category = searchParams.get("cat") || "";
    const tag = searchParams.get("tag") || "";
    const search = searchParams.get("search") || "";
    const sort = searchParams.get("sort") || "newest";

    useEffect(() => {
        setSearchInput(search);
    }, [search]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (sort === "title") {
                    params.append("page", 1);
                    params.append("limit", 1000);
                } else {
                    params.append("page", page);
                    params.append("limit", 6);
                }
                if (category) params.append("category", category);
                if (tag) params.append("tag", tag);
                if (search) params.append("search", search);
                if (sort === "oldest") params.append("sort", "oldest");

                const res = await api.get(`/posts?${params.toString()}`);
                let fetchedPosts = res.data.posts || [];
                
                if (sort === "title") {
                    fetchedPosts = [...fetchedPosts].sort((a, b) => a.title.localeCompare(b.title));
                    const startIndex = (page - 1) * 6;
                    const endIndex = startIndex + 6;
                    setPosts(fetchedPosts.slice(startIndex, endIndex));
                    setPagination({
                        page,
                        limit: 6,
                        total: fetchedPosts.length,
                        totalPages: Math.ceil(fetchedPosts.length / 6)
                    });
                } else {
                    setPosts(fetchedPosts);
                    setPagination(res.data.pagination || {});
                }
            } catch (err) {
                console.error("Error fetching posts:", err);
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [page, category, tag, search, sort]);

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;
    };

    const handleSearch = (e) => {
        e.preventDefault();
        
        const params = new URLSearchParams();
        if (searchInput.trim()) params.set("search", searchInput.trim());
        if (category) params.set("cat", category);
        if (tag) params.set("tag", tag);
        params.set("page", "1");
        
        setSearchParams(params);
        setShowSuggestions(false);
    };

    const handleSearchInputChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);

        // Clear previous timeout
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        if (value.trim().length >= 2) {
            // Set new timeout for debouncing (300ms delay)
            const timeout = setTimeout(async () => {
                try {
                    const res = await api.get(`/posts?search=${value}&limit=5`);
                    setSuggestions(res.data.posts || []);
                    setShowSuggestions(true);
                } catch (err) {
                    console.error(err);
                    setSuggestions([]);
                }
            }, 300);
            setSearchTimeout(timeout);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (slug) => {
        setShowSuggestions(false);
        setSearchInput("");
        navigate(`/post/${slug}`);
    };

    const clearFilters = () => {
        setSearchParams({});
    };

    const goToPage = (newPage) => {
        const params = new URLSearchParams();
        params.set("page", newPage);
        if (category) params.set("cat", category);
        if (tag) params.set("tag", tag);
        if (search) params.set("search", search);
        if (sort) params.set("sort", sort);
        setSearchParams(params);
    };

    const handleSortChange = (e) => {
        const params = new URLSearchParams();
        params.set("page", "1");
        if (category) params.set("cat", category);
        if (tag) params.set("tag", tag);
        if (search) params.set("search", search);
        params.set("sort", e.target.value);
        setSearchParams(params);
    };

    return (
        <div className="home">
            <div className="search-filter-section" style={{ padding: "20px", background: "#f5f5f5", marginBottom: "20px", borderRadius: "8px" }}>
                <div style={{ display: "flex", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
                    <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px", flex: "1", minWidth: "300px", position: "relative" }}>
                        <div style={{ flex: 1, position: "relative" }}>
                            <input
                                type="text"
                                value={searchInput}
                                onChange={handleSearchInputChange}
                                onFocus={() => searchInput.length >= 2 && setShowSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                placeholder="Search posts by title or content..."
                                style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "14px" }}
                            />
                            {showSuggestions && suggestions.length > 0 && (
                                <div style={{
                                    position: "absolute",
                                    top: "100%",
                                    left: 0,
                                    right: 0,
                                    background: "white",
                                    border: "1px solid #ddd",
                                    borderTop: "none",
                                    borderRadius: "0 0 4px 4px",
                                    maxHeight: "300px",
                                    overflowY: "auto",
                                    zIndex: 1000,
                                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                                }}>
                                    {suggestions.map((post) => (
                                        <div
                                            key={post.id}
                                            onClick={() => handleSuggestionClick(post.slug)}
                                            style={{
                                                padding: "10px",
                                                borderBottom: "1px solid #f0f0f0",
                                                cursor: "pointer",
                                                display: "flex",
                                                gap: "10px",
                                                alignItems: "center"
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = "#f5f5f5"}
                                            onMouseLeave={(e) => e.currentTarget.style.background = "white"}
                                        >
                                            <img 
                                                src={post.coverImage} 
                                                alt={post.title}
                                                style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }}
                                            />
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: "500", fontSize: "14px", marginBottom: "2px" }}>
                                                    {post.title}
                                                </div>
                                                <div style={{ fontSize: "12px", color: "#666" }}>
                                                    {post.categories?.[0]?.name} • {post.readingTime} min read
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button type="submit" style={{ padding: "10px 20px", background: "#333", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                            Search
                        </button>
                    </form>
                    
                    <select 
                        value={sort} 
                        onChange={handleSortChange}
                        style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "4px", cursor: "pointer", fontSize: "14px" }}
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="title">Title (A-Z)</option>
                    </select>

                    {(category || tag || search) && (
                        <button type="button" onClick={clearFilters} style={{ padding: "10px 20px", background: "#666", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                            Clear Filters
                        </button>
                    )}
                </div>
                
                {(category || tag || search) && (
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        <span style={{ fontWeight: "500", color: "#666" }}>Active Filters:</span>
                        {category && <span style={{ padding: "5px 10px", background: "#333", color: "white", borderRadius: "2px", fontSize: "13px" }}>Category: {category}</span>}
                        {tag && <span style={{ padding: "5px 10px", background: "#555", color: "white", borderRadius: "2px", fontSize: "13px" }}>Tag: {tag}</span>}
                        {search && <span style={{ padding: "5px 10px", background: "#777", color: "white", borderRadius: "2px", fontSize: "13px" }}>Search: "{search}"</span>}
                    </div>
                )}
            </div>

            {loading ? (
                <div style={{ textAlign: "center", padding: "40px" }}>
                    <p>Loading posts...</p>
                </div>
            ) : (
                <>
                    {posts.length > 0 && (
                        <div style={{ padding: "10px 20px", background: "#e9ecef", borderRadius: "4px", marginBottom: "20px" }}>
                            <p style={{ margin: 0, fontSize: "14px", color: "#495057" }}>
                                Showing {((page - 1) * 6) + 1} - {Math.min(page * 6, pagination.total)} of {pagination.total} posts
                                {category && ` in "${category}"`}
                                {tag && ` tagged with "${tag}"`}
                                {search && ` matching "${search}"`}
                            </p>
                        </div>
                    )}

                    <div className="posts">
                        {posts.length === 0 ? (
                            <div className="no-posts">
                                <h2>No posts found</h2>
                                {category && <p>No posts in "{category}" category</p>}
                                {tag && <p>No posts with tag "{tag}"</p>}
                                {search && <p>No posts matching "{search}"</p>}
                                <Link to="/write">
                                    <button>Write a Post</button>
                                </Link>
                            </div>
                        ) : (
                            posts.map((post) => (
                                <div className="post" key={post.id}>
                                    <div className="img">
                                        <img src={post.coverImage || "https://images.unsplash.com/photo-1499750310107-5fef28a66643"} alt="" loading="lazy" />
                                    </div>
                                    <div className="content">
                                        <Link className="link" to={`/post/${post.slug}`}>
                                            <h1 dangerouslySetInnerHTML={{ 
                                                __html: search ? post.title.replace(
                                                    new RegExp(search, 'gi'), 
                                                    match => `<mark style="background: yellow; padding: 2px;">${match}</mark>`
                                                ) : post.title 
                                            }} />
                                        </Link>
                                        {post.categories && post.categories.length > 0 && (
                                            <div style={{ marginBottom: "10px" }}>
                                                {post.categories.map((cat) => (
                                                    <Link 
                                                        key={cat.id} 
                                                        to={`/?cat=${cat.name}`}
                                                        style={{ 
                                                            display: "inline-block",
                                                            padding: "4px 8px", 
                                                            background: "#007bff", 
                                                            color: "white", 
                                                            borderRadius: "4px", 
                                                            fontSize: "12px",
                                                            marginRight: "5px",
                                                            textDecoration: "none"
                                                        }}
                                                    >
                                                        {cat.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                        {post.tags && post.tags.length > 0 && (
                                            <div style={{ marginBottom: "10px" }}>
                                                {post.tags.map((t) => (
                                                    <Link 
                                                        key={t.id} 
                                                        to={`/?tag=${t.name}`}
                                                        style={{ 
                                                            display: "inline-block",
                                                            padding: "2px 6px", 
                                                            background: "transparent", 
                                                            color: "#666", 
                                                            border: "1px solid #ddd",
                                                            borderRadius: "2px", 
                                                            fontSize: "11px",
                                                            marginRight: "5px",
                                                            textDecoration: "none"
                                                        }}
                                                    >
                                                        {t.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                        <p>{getText(post.content).substring(0, 150)}...</p>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                                            <span style={{ fontSize: "12px", color: "#666" }}>
                                                By {post.author?.username} • {post.readingTime} min read
                                            </span>
                                            <Link className="link" to={`/post/${post.slug}`}>
                                                <button>Read More</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {pagination.totalPages > 1 && (
                        <div className="pagination" style={{ 
                            display: "flex", 
                            justifyContent: "center", 
                            alignItems: "center",
                            gap: "10px", 
                            padding: "30px 0",
                            marginTop: "20px"
                        }}>
                            <button
                                onClick={() => goToPage(page - 1)}
                                disabled={page === 1}
                                style={{
                                    padding: "10px 20px",
                                    background: page === 1 ? "#ccc" : "#333",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: page === 1 ? "not-allowed" : "pointer"
                                }}
                            >
                                Previous
                            </button>
                            
                            <div style={{ display: "flex", gap: "5px" }}>
                                {[...Array(pagination.totalPages)].map((_, index) => {
                                    const pageNum = index + 1;
                                    // Show first page, last page, current page, and pages around current
                                    if (
                                        pageNum === 1 ||
                                        pageNum === pagination.totalPages ||
                                        (pageNum >= page - 2 && pageNum <= page + 2)
                                    ) {
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => goToPage(pageNum)}
                                                style={{
                                                    padding: "8px 12px",
                                                    background: page === pageNum ? "#333" : "white",
                                                    color: page === pageNum ? "white" : "#333",
                                                    border: "1px solid #ddd",
                                                    borderRadius: "2px",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    } else if (pageNum === page - 3 || pageNum === page + 3) {
                                        return <span key={pageNum} style={{ padding: "10px 5px" }}>...</span>;
                                    }
                                    return null;
                                })}
                            </div>

                            <button
                                onClick={() => goToPage(page + 1)}
                                disabled={page === pagination.totalPages}
                                style={{
                                    padding: "10px 20px",
                                    background: page === pagination.totalPages ? "#ccc" : "#333",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: page === pagination.totalPages ? "not-allowed" : "pointer"
                                }}
                            >
                                Next
                            </button>

                            <span style={{ marginLeft: "20px", color: "#666" }}>
                                Page {page} of {pagination.totalPages} ({pagination.total} posts)
                            </span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Home;
