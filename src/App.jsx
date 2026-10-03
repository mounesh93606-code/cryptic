import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Stories from './components/Stories';
import StoryViewer from './components/StoryViewer';
import Feed from './components/Feed';
import PostDetailModal from './components/PostDetailModal';
import CommentsModal from './components/CommentsModal';
import ShareModal from './components/ShareModal';
import CreatePostModal from './components/CreatePostModal';
import SearchPage from './components/SearchPage';
import ReelsPage from './components/ReelsPage';
import ShopPage from './components/ShopPage';
import ProductDetailsModal from './components/ProductDetailsModal';
import CartDrawer from './components/CartDrawer';
import ProfilePage from './components/ProfilePage';
import NotificationsDrawer from './components/NotificationsDrawer';
import DirectMessagesDrawer from './components/DirectMessagesDrawer';
import StatsModal from './components/StatsModal';
import BottomNavigation from './components/BottomNavigation';
import Toast from './components/Toast';

import {
  currentUser as defaultUser,
  initialStories,
  initialPosts,
  mockReels,
  mockProducts,
  mockNotifications,
  mockChats,
  mockStats
} from './data/mockData';
import { sound } from './utils/sound';
import './App.css';

export default function App() {
  // Persistence via localStorage with robust fallbacks
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('ig_user');
      return saved ? JSON.parse(saved) : defaultUser;
    } catch {
      return defaultUser;
    }
  });

  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem('ig_posts');
      return saved ? JSON.parse(saved) : initialPosts;
    } catch {
      return initialPosts;
    }
  });

  const [stories, setStories] = useState(() => {
    try {
      const saved = localStorage.getItem('ig_stories');
      return saved ? JSON.parse(saved) : initialStories;
    } catch {
      return initialStories;
    }
  });

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('ig_cart');
      return saved ? JSON.parse(saved) : [
        { ...mockProducts[0], quantity: 1, selectedColor: 'Crimson Red', selectedSize: 'US 10' }
      ];
    } catch {
      return [];
    }
  });

  // Current view: 'feed' | 'explore' | 'reels' | 'shop' | 'profile' | 'settings'
  const [currentView, setCurrentView] = useState('feed');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Panels state
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);
  const [commentingPost, setCommentingPost] = useState(null);
  const [sharingPost, setSharingPost] = useState(null);
  const [detailPost, setDetailPost] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  // App Settings state
  const [isFramed, setIsFramed] = useState(true); // Default matching the reference screenshot presentation frame!
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ig_posts', JSON.stringify(posts));
    } catch { /* ignore */ }
  }, [posts]);

  useEffect(() => {
    try {
      localStorage.setItem('ig_cart', JSON.stringify(cartItems));
    } catch { /* ignore */ }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('ig_user', JSON.stringify(currentUser));
    } catch { /* ignore */ }
  }, [currentUser]);

  // Dark mode class on root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [darkMode]);

  // Global Escape key listener to close any open modal
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveStoryIndex(null);
        setCommentingPost(null);
        setSharingPost(null);
        setDetailPost(null);
        setSelectedProduct(null);
        setIsCreateOpen(false);
        setIsNotificationsOpen(false);
        setIsMessagesOpen(false);
        setIsCartOpen(false);
        setIsStatsOpen(false);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2600);
  };

  // Like / Unlike Handler
  const handleToggleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          const likesCount = isLiked ? post.likesCount + 1 : Math.max(0, post.likesCount - 1);
          return { ...post, isLiked, likesCount };
        }
        return post;
      })
    );

    // Update detail post if open
    if (detailPost && detailPost.id === postId) {
      setDetailPost((prev) => {
        const isLiked = !prev.isLiked;
        const likesCount = isLiked ? prev.likesCount + 1 : Math.max(0, prev.likesCount - 1);
        return { ...prev, isLiked, likesCount };
      });
    }
  };

  // Save / Bookmark Handler
  const handleToggleSave = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const isSaved = !post.isSaved;
          showToast(isSaved ? 'Saved to your collection' : 'Removed from collection');
          return { ...post, isSaved };
        }
        return post;
      })
    );

    if (detailPost && detailPost.id === postId) {
      setDetailPost((prev) => ({ ...prev, isSaved: !prev.isSaved }));
    }
  };

  // Add Comment Handler
  const handleAddComment = (postId, newComment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const comments = [...(post.comments || []), newComment];
          return {
            ...post,
            comments,
            commentsCount: comments.length
          };
        }
        return post;
      })
    );

    if (detailPost && detailPost.id === postId) {
      setDetailPost((prev) => ({
        ...prev,
        comments: [...(prev.comments || []), newComment],
        commentsCount: (prev.comments || []).length + 1
      }));
    }

    if (commentingPost && commentingPost.id === postId) {
      setCommentingPost((prev) => ({
        ...prev,
        comments: [...(prev.comments || []), newComment],
        commentsCount: (prev.comments || []).length + 1
      }));
    }
    showToast('Comment posted!');
  };

  // Add Post Handler
  const handleAddPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
    setCurrentUser((prev) => ({
      ...prev,
      postsCount: prev.postsCount + 1
    }));
    setCurrentView('feed');
  };

  // Cart Handlers
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedColor === product.selectedColor &&
          item.selectedSize === product.selectedSize
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        return next;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`Added ${product.name} to cart!`);
  };

  const handleUpdateCartQty = (itemId, qty) => {
    if (qty <= 0) {
      handleRemoveCartItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveCartItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item removed from cart');
  };

  // Stories Watch All
  const handleWatchAllStories = () => {
    // Start with the first regular story
    const firstStoryIdx = stories.findIndex((s) => !s.isAddStory);
    setActiveStoryIndex(firstStoryIdx >= 0 ? firstStoryIdx : 1);
  };

  // Story Reply handler
  const handleStoryReply = (username, message) => {
    showToast(`Reply sent to @${username}`);
  };

  // User click navigation
  const handleUserClick = (username) => {
    sound.playPop();
    if (username.toLowerCase() === currentUser.username.toLowerCase()) {
      setCurrentView('profile');
    } else {
      setSearchQuery(username);
      setCurrentView('explore');
    }
  };

  // Extract all mock users for search
  const allUsers = [
    defaultUser,
    ...stories.filter((s) => !s.isAddStory).map((s) => ({
      id: s.user.username,
      username: s.user.username,
      name: s.user.name,
      avatar: s.user.avatar
    })),
    ...posts.map((p) => ({
      id: p.user.username,
      username: p.user.username,
      name: p.user.name,
      avatar: p.user.avatar
    }))
  ].filter((u, index, self) => index === self.findIndex((t) => t.username === u.username));

  // Compute unread badges
  const unreadNotifsCount = mockNotifications.filter((n) => n.unread).length;
  const unreadMessagesCount = mockChats.reduce((acc, c) => acc + c.unread, 0);
  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className={`app-viewport-wrapper ${!isFramed ? 'fullscreen-mode' : ''}`}>
      {/* Outer Presentation Header (Shown in Reference Mode) */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenCreate={() => setIsCreateOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenMessages={() => setIsMessagesOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        unreadNotifsCount={unreadNotifsCount}
        unreadMessagesCount={unreadMessagesCount}
        cartCount={totalCartCount}
        isFramed={isFramed}
        setIsFramed={setIsFramed}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onNavigate={setCurrentView}
      />

      {/* Main White Dashboard Card (The core Instagram recreation container) */}
      <main className="main-dashboard-card animate-slide-up">
        {/* Left Sidebar */}
        <Sidebar
          currentView={currentView}
          onNavigate={(view) => {
            setCurrentView(view);
            if (view === 'feed') setSearchQuery('');
          }}
          currentUser={currentUser}
          unreadNotifsCount={unreadNotifsCount}
          unreadMessagesCount={unreadMessagesCount}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenMessages={() => setIsMessagesOpen(true)}
          onOpenStats={() => setIsStatsOpen(true)}
          onLogout={() => showToast('Logged out of session')}
        />

        {/* Right Main Content Area */}
        <div className="main-content-area">
          {/* Main Top Header Bar (Inside the Dashboard Card) */}
          <Header
            searchQuery={searchQuery}
            setSearchQuery={(q) => {
              setSearchQuery(q);
              if (q && currentView !== 'explore') {
                setCurrentView('explore');
              }
            }}
            onOpenCreate={() => setIsCreateOpen(true)}
            onOpenNotifications={() => setIsNotificationsOpen(true)}
            onOpenMessages={() => setIsMessagesOpen(true)}
            onOpenCart={() => setIsCartOpen(true)}
            unreadNotifsCount={unreadNotifsCount}
            unreadMessagesCount={unreadMessagesCount}
            cartCount={totalCartCount}
            isFramed={false}
            soundEnabled={soundEnabled}
            setSoundEnabled={setSoundEnabled}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onNavigate={setCurrentView}
          />

          {/* Conditional View Rendering */}
          {currentView === 'feed' && (
            <>
              {/* Stories Bar Matching Reference */}
              <Stories
                stories={stories}
                onSelectStory={(idx) => setActiveStoryIndex(idx)}
                onAddStory={() => setIsCreateOpen(true)}
                onWatchAll={handleWatchAllStories}
              />

              {/* Feed Grid Matching Reference Screenshot */}
              <Feed
                posts={posts}
                onToggleLike={handleToggleLike}
                onToggleSave={handleToggleSave}
                onOpenComments={(post) => setCommentingPost(post)}
                onOpenShare={(post) => setSharingPost(post)}
                onOpenDetail={(post) => setDetailPost(post)}
                onUserClick={handleUserClick}
              />
            </>
          )}

          {currentView === 'explore' && (
            <SearchPage
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              posts={posts}
              users={allUsers}
              onSelectPost={(post) => setDetailPost(post)}
              onSelectUser={handleUserClick}
            />
          )}

          {currentView === 'reels' && (
            <ReelsPage
              reels={mockReels}
              onOpenComments={(post) => setCommentingPost(post)}
              onOpenShare={(post) => setSharingPost(post)}
              onUserClick={handleUserClick}
            />
          )}

          {currentView === 'shop' && (
            <ShopPage
              products={mockProducts}
              onSelectProduct={(product) => setSelectedProduct(product)}
              onAddToCart={handleAddToCart}
              cartCount={totalCartCount}
              onOpenCart={() => setIsCartOpen(true)}
            />
          )}

          {currentView === 'profile' && (
            <ProfilePage
              currentUser={currentUser}
              posts={posts}
              onOpenPostDetail={(post) => setDetailPost(post)}
              onEditProfile={() => setIsCreateOpen(true)}
            />
          )}

          {currentView === 'settings' && (
            <div className="settings-page-view animate-fade" style={{ padding: '20px 0' }}>
              <h2 className="section-title" style={{ marginBottom: '20px' }}>Account Settings</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '480px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: 'var(--bg-input)', borderRadius: '14px' }}>
                  <div>
                    <strong style={{ display: 'block', fontSize: '14px' }}>Dark Theme</strong>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Switch to sleek dark interface</span>
                  </div>
                  <button className="util-pill-btn" onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? 'Disable Dark' : 'Enable Dark'}
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: 'var(--bg-input)', borderRadius: '14px' }}>
                  <div>
                    <strong style={{ display: 'block', fontSize: '14px' }}>Interactive Sound Effects</strong>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Pops and chime feedback</span>
                  </div>
                  <button className="util-pill-btn" onClick={() => setSoundEnabled(!soundEnabled)}>
                    {soundEnabled ? 'Enabled' : 'Muted'}
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: 'var(--bg-input)', borderRadius: '14px' }}>
                  <div>
                    <strong style={{ display: 'block', fontSize: '14px' }}>Presentation Frame Canvas</strong>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Show exact competition screenshot frame</span>
                  </div>
                  <button className="util-pill-btn" onClick={() => setIsFramed(!isFramed)}>
                    {isFramed ? 'Framed View' : 'Fullscreen'}
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: 'var(--bg-input)', borderRadius: '14px' }}>
                  <div>
                    <strong style={{ display: 'block', fontSize: '14px' }}>Creator Analytics & Insights</strong>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>View weekly impressions & engagement</span>
                  </div>
                  <button className="util-pill-btn" onClick={() => setIsStatsOpen(true)}>
                    View Stats
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation
        currentView={currentView}
        onNavigate={setCurrentView}
        currentUser={currentUser}
      />

      {/* Story Viewer Modal */}
      {activeStoryIndex !== null && (
        <StoryViewer
          stories={stories}
          initialIndex={activeStoryIndex}
          onClose={() => setActiveStoryIndex(null)}
          onStoryReply={handleStoryReply}
        />
      )}

      {/* Post Detail Modal */}
      {detailPost && (
        <PostDetailModal
          post={detailPost}
          currentUser={currentUser}
          onClose={() => setDetailPost(null)}
          onToggleLike={handleToggleLike}
          onToggleSave={handleToggleSave}
          onOpenShare={(post) => setSharingPost(post)}
          onAddComment={handleAddComment}
        />
      )}

      {/* Comments Modal */}
      {commentingPost && (
        <CommentsModal
          post={commentingPost}
          currentUser={currentUser}
          onClose={() => setCommentingPost(null)}
          onAddComment={handleAddComment}
        />
      )}

      {/* Share Modal */}
      {sharingPost && (
        <ShareModal
          post={sharingPost}
          onClose={() => setSharingPost(null)}
          onShowToast={showToast}
        />
      )}

      {/* Create Post Modal */}
      {isCreateOpen && (
        <CreatePostModal
          currentUser={currentUser}
          onClose={() => setIsCreateOpen(false)}
          onAddPost={handleAddPost}
          onShowToast={showToast}
        />
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Shopping Cart Drawer */}
      {isCartOpen && (
        <CartDrawer
          cartItems={cartItems}
          onUpdateQty={handleUpdateCartQty}
          onRemoveItem={handleRemoveCartItem}
          onClearCart={() => setCartItems([])}
          onClose={() => setIsCartOpen(false)}
        />
      )}

      {/* Notifications Drawer */}
      {isNotificationsOpen && (
        <NotificationsDrawer
          notifications={mockNotifications}
          onClose={() => setIsNotificationsOpen(false)}
          onUserClick={handleUserClick}
        />
      )}

      {/* Direct Messages Drawer */}
      {isMessagesOpen && (
        <DirectMessagesDrawer
          chats={mockChats}
          currentUser={currentUser}
          onClose={() => setIsMessagesOpen(false)}
        />
      )}

      {/* Insights & Stats Modal */}
      {isStatsOpen && (
        <StatsModal
          stats={mockStats}
          onClose={() => setIsStatsOpen(false)}
        />
      )}

      {/* Toast Feedback */}
      <Toast message={toastMessage} />
    </div>
  );
}
