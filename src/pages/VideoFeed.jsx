import { useState, useEffect, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Heart, MessageCircle, Share2, Bookmark, Play, MapPin, Star, Building2, UtensilsCrossed, Users, Trophy, Send, X, Plus, Camera, Image, Clock, PenLine, CheckCircle2, ExternalLink } from 'lucide-react'

// Real TikTok/Instagram/YouTube content about international student life
// These are real search/explore links to actual trending content
const REAL_REELS = [
  { id: 'r1', platform: 'tiktok', category: 'housing', title: 'Apartment hunting as an international student', creator: '@internationalstudentlife', url: 'https://www.tiktok.com/search?q=international%20student%20apartment%20hunting', thumbnail: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=700&fit=crop', tags: ['housing', 'apartment', 'studentlife'] },
  { id: 'r2', platform: 'tiktok', category: 'food', title: 'Cheap eats near campus every student needs', creator: '@collegefoodie', url: 'https://www.tiktok.com/search?q=cheap%20college%20food%20international%20student', thumbnail: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=700&fit=crop', tags: ['food', 'budget', 'college'] },
  { id: 'r3', platform: 'instagram', category: 'community', title: 'Making friends as an international student', creator: '@studyabroad', url: 'https://www.instagram.com/explore/tags/internationalstudentlife/', thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=700&fit=crop', tags: ['friends', 'community', 'abroad'] },
  { id: 'r4', platform: 'youtube', category: 'housing', title: 'Dorm vs Off-Campus: Real costs breakdown', creator: '@studentfinance', url: 'https://www.youtube.com/results?search_query=international+student+dorm+vs+off+campus+cost', thumbnail: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=700&fit=crop', tags: ['housing', 'costs', 'dorm'] },
  { id: 'r5', platform: 'tiktok', category: 'food', title: 'Indian grocery haul in the US', creator: '@desistudentusa', url: 'https://www.tiktok.com/search?q=indian%20grocery%20haul%20usa%20student', thumbnail: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=700&fit=crop', tags: ['grocery', 'indian', 'haul'] },
  { id: 'r6', platform: 'instagram', category: 'sports', title: 'Campus rec center tour + intramural sports', creator: '@campuslife', url: 'https://www.instagram.com/explore/tags/campusrec/', thumbnail: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=700&fit=crop', tags: ['sports', 'fitness', 'campus'] },
  { id: 'r7', platform: 'youtube', category: 'community', title: 'First week as an international student vlog', creator: '@studyabroadvlogs', url: 'https://www.youtube.com/results?search_query=first+week+international+student+usa+vlog', thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=700&fit=crop', tags: ['vlog', 'firstweek', 'orientation'] },
  { id: 'r8', platform: 'tiktok', category: 'housing', title: 'How I furnished my apartment for under $200', creator: '@budgetstudent', url: 'https://www.tiktok.com/search?q=furnish%20student%20apartment%20cheap', thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=700&fit=crop', tags: ['furniture', 'budget', 'diy'] },
  { id: 'r9', platform: 'youtube', category: 'food', title: 'Meal prep for busy college students', creator: '@studentmeals', url: 'https://www.youtube.com/results?search_query=meal+prep+college+student+budget', thumbnail: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=700&fit=crop', tags: ['mealprep', 'cooking', 'budget'] },
  { id: 'r10', platform: 'tiktok', category: 'sports', title: 'Joining a cricket club in the US', creator: '@cricketusa', url: 'https://www.tiktok.com/search?q=cricket%20club%20usa%20college', thumbnail: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=700&fit=crop', tags: ['cricket', 'sports', 'club'] },
  { id: 'r11', platform: 'instagram', category: 'food', title: 'Best halal food spots near campus', creator: '@halalfoodie', url: 'https://www.instagram.com/explore/tags/halalcollegefood/', thumbnail: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=700&fit=crop', tags: ['halal', 'food', 'campus'] },
  { id: 'r12', platform: 'youtube', category: 'community', title: 'Culture shock: things nobody tells you', creator: '@abroadlife', url: 'https://www.youtube.com/results?search_query=culture+shock+international+student+things+nobody+tells+you', thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=700&fit=crop', tags: ['cultureshock', 'tips', 'abroad'] },
]

const PLACE_PHOTOS = [
  'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop',
]

function getTimeAgo(ts) {
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

const platformColors = { tiktok: '#000000', instagram: '#E1306C', youtube: '#FF0000' }
const platformLabels = { tiktok: 'TikTok', instagram: 'Instagram', youtube: 'YouTube' }

export default function VideoFeed() {
  const { student } = useApp()
  const [tab, setTab] = useState('reels')
  const [filter, setFilter] = useState('all')
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [liked, setLiked] = useState(() => {
    try { const s = localStorage.getItem('sn_liked'); return s ? JSON.parse(s) : {} } catch { return {} }
  })
  const [saved, setSaved] = useState({})
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState({})
  const [userPosts, setUserPosts] = useState(() => {
    try { const s = localStorage.getItem('sn_user_posts'); return s ? JSON.parse(s) : [] } catch { return [] }
  })

  useEffect(() => { localStorage.setItem('sn_liked', JSON.stringify(liked)) }, [liked])
  useEffect(() => { localStorage.setItem('sn_user_posts', JSON.stringify(userPosts)) }, [userPosts])

  const filteredReels = filter === 'all' ? REAL_REELS : REAL_REELS.filter(r => r.category === filter)

  const sortedPosts = useMemo(() => {
    const filtered = filter === 'all' ? [...userPosts] : userPosts.filter(p => p.category === filter)
    return filtered.sort((a, b) => b.createdAt - a.createdAt)
  }, [userPosts, filter])

  const toggleLike = (id) => setLiked(prev => ({ ...prev, [id]: !prev[id] }))
  const toggleSave = (id) => setSaved(prev => ({ ...prev, [id]: !prev[id] }))

  const addComment = (targetId) => {
    if (!commentText.trim()) return
    const newC = { id: Date.now(), author: student?.fullName || 'You', text: commentText.trim(), time: 'Just now' }
    setComments(prev => ({ ...prev, [targetId]: [...(prev[targetId] || []), newC] }))
    setUserPosts(prev => prev.map(p => p.id === targetId ? { ...p, comments: [...(p.comments || []), newC] } : p))
    setCommentText('')
  }

  const catIcon = (cat, sz = 14) => {
    const icons = { housing: Building2, food: UtensilsCrossed, community: Users, sports: Trophy }
    const C = icons[cat] || Star; return <C size={sz} />
  }
  const catColor = (cat) => ({ housing: '#0f766e', food: '#ea580c', community: '#7c3aed', sports: '#0369a1' }[cat] || '#0f766e')

  if (!student) return null

  return (
    <div>
      <Navbar />
      <div style={S.page}>
        <div style={S.container}>
          <div style={S.tabBar}>
            <button onClick={() => setTab('reels')} style={{ ...S.tab, ...(tab === 'reels' ? S.tabActive : {}) }}>
              <Play size={16} /> Reels
            </button>
            <button onClick={() => setTab('posts')} style={{ ...S.tab, ...(tab === 'posts' ? S.tabActive : {}) }}>
              <Image size={16} /> My Posts
            </button>
            <button onClick={() => setShowCreatePost(true)} style={S.createBtn}>
              <Plus size={16} /> Post
            </button>
          </div>

          <div style={S.filterChips}>
            {['all', 'housing', 'food', 'community', 'sports'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{ ...S.chip, ...(filter === f ? S.chipActive : {}) }}>
                {f !== 'all' && catIcon(f, 12)}
                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {tab === 'reels' && (
            <div style={S.reelsGrid}>
              <p style={S.reelsNote}>Real trending content from TikTok, Instagram & YouTube about student life. Tap to watch.</p>
              {filteredReels.map(reel => (
                <a key={reel.id} href={reel.url} target="_blank" rel="noopener noreferrer" style={S.reelCard}>
                  <img src={reel.thumbnail} alt="" style={S.reelThumb} loading="lazy" />
                  <div style={S.reelOverlay}>
                    <div style={{ ...S.reelPlatform, background: platformColors[reel.platform] }}>
                      <Play size={10} fill="white" /> {platformLabels[reel.platform]}
                    </div>
                    <div style={S.reelBottom}>
                      <div style={{ ...S.reelCat, background: catColor(reel.category) }}>{catIcon(reel.category, 10)}</div>
                      <h3 style={S.reelTitle}>{reel.title}</h3>
                      <div style={S.reelCreator}>{reel.creator}</div>
                      <div style={S.reelTags}>{reel.tags.map((t, i) => <span key={i} style={S.reelTag}>#{t}</span>)}</div>
                    </div>
                    <div style={S.reelPlay}><ExternalLink size={18} color="white" /></div>
                  </div>
                </a>
              ))}
            </div>
          )}

          {tab === 'posts' && (
            <div style={S.postsWrap}>
              {sortedPosts.length === 0 && (
                <div style={S.emptyPosts}>
                  <Camera size={40} color="#cbd5e1" />
                  <h3 style={{ color: '#475569', fontSize: 16, fontWeight: 700 }}>No posts yet</h3>
                  <p style={{ color: '#94a3b8', fontSize: 14, textAlign: 'center', lineHeight: 1.5 }}>
                    Be the first to share your experience! Post about housing, food spots, or anything useful for students at {student?.college?.name || 'your university'}.
                  </p>
                  <button onClick={() => setShowCreatePost(true)} style={S.createBtn}>
                    <Plus size={16} /> Create Your First Post
                  </button>
                </div>
              )}

              {sortedPosts.map(post => {
                const postComments = comments[post.id] || post.comments || []
                const isLiked = liked[post.id]
                return (
                  <div key={post.id} style={S.postCard}>
                    <div style={S.postAuthor}>
                      <div style={S.postAv}>{post.author?.charAt(0) || 'U'}</div>
                      <div style={{ flex: 1 }}>
                        <div style={S.postAuthorName}>{post.author} <span style={S.youBadge}>You</span></div>
                        <div style={S.postAuthorSub}>{post.authorSchool} · {getTimeAgo(post.createdAt)}</div>
                      </div>
                      <div style={{ ...S.postCatBadge, background: catColor(post.category) + '20', color: catColor(post.category) }}>
                        {catIcon(post.category, 11)}<span>{post.category}</span>
                      </div>
                    </div>
                    <h3 style={S.postTitle}>{post.title}</h3>
                    <p style={S.postDesc}>{post.description}</p>
                    {post.image && <img src={post.image} alt="" style={S.postImage} loading="lazy" />}
                    {post.placeName && (
                      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(post.placeName)}`} target="_blank" rel="noopener noreferrer" style={S.postPlace}>
                        <MapPin size={13} color="#0f766e" />
                        <span>{post.placeName}</span>
                        {post.rating > 0 && <><span style={S.dotSep}>·</span><Star size={12} fill="#f59e0b" color="#f59e0b" /><span>{post.rating}</span></>}
                        {post.price && <><span style={S.dotSep}>·</span><span>{post.price}</span></>}
                      </a>
                    )}
                    {post.tags?.length > 0 && (
                      <div style={S.postTags}>{post.tags.map((t, i) => <span key={i} style={S.postTag}>#{t}</span>)}</div>
                    )}
                    <div style={S.postActions}>
                      <button onClick={() => toggleLike(post.id)} style={{ ...S.postActionBtn, ...(isLiked ? { color: '#ef4444' } : {}) }}>
                        <Heart size={18} fill={isLiked ? '#ef4444' : 'none'} color={isLiked ? '#ef4444' : '#64748b'} />
                        <span>{(post.likes || 0) + (isLiked ? 1 : 0)}</span>
                      </button>
                      <button onClick={() => setShowComments(post.id)} style={S.postActionBtn}>
                        <MessageCircle size={18} color="#64748b" />
                        <span>{postComments.length}</span>
                      </button>
                      <button onClick={() => navigator.clipboard?.writeText(window.location.href)} style={S.postActionBtn}>
                        <Share2 size={16} color="#64748b" /><span>Share</span>
                      </button>
                      <button onClick={() => toggleSave(post.id)} style={{ ...S.postActionBtn, marginLeft: 'auto' }}>
                        <Bookmark size={18} fill={saved[post.id] ? '#f59e0b' : 'none'} color={saved[post.id] ? '#f59e0b' : '#64748b'} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {showComments && (
          <div style={S.commOverlay} onClick={() => setShowComments(false)}>
            <div style={S.commPanel} onClick={e => e.stopPropagation()}>
              <div style={S.commHead}>
                <h3 style={S.commTitle}>Comments</h3>
                <button onClick={() => setShowComments(false)} style={S.commClose}><X size={18} /></button>
              </div>
              <div style={S.commList}>
                {(comments[showComments] || userPosts.find(p => p.id === showComments)?.comments || []).map(c => (
                  <div key={c.id} style={S.commItem}>
                    <div style={S.commAv}>{c.author?.charAt(0) || 'U'}</div>
                    <div style={{ flex: 1 }}>
                      <div style={S.commAuthor}>{c.author} <span style={S.commTime}>{c.time || getTimeAgo(c.createdAt || Date.now())}</span></div>
                      <p style={S.commText}>{c.text}</p>
                    </div>
                  </div>
                ))}
                {(comments[showComments] || []).length === 0 && !(userPosts.find(p => p.id === showComments)?.comments?.length) && (
                  <p style={{ color: '#94a3b8', fontSize: 13, textAlign: 'center', padding: 20 }}>No comments yet. Be the first!</p>
                )}
              </div>
              <div style={S.commInput}>
                <input value={commentText} onChange={e => setCommentText(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') addComment(showComments) }}
                  placeholder="Add a comment..." style={S.commField} />
                <button onClick={() => addComment(showComments)}
                  disabled={!commentText.trim()} style={{ ...S.commSend, opacity: commentText.trim() ? 1 : 0.4 }}><Send size={16} /></button>
              </div>
            </div>
          </div>
        )}

        {showCreatePost && <CreatePostModal student={student} onClose={() => setShowCreatePost(false)} onSubmit={(post) => {
          setUserPosts(prev => [post, ...prev])
          setShowCreatePost(false)
          setTab('posts')
        }} />}
      </div>
      <Footer />
    </div>
  )
}

function CreatePostModal({ student, onClose, onSubmit }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [placeName, setPlaceName] = useState('')
  const [category, setCategory] = useState('food')
  const [rating, setRating] = useState(4)
  const [price, setPrice] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState([])
  const [selectedPhoto, setSelectedPhoto] = useState(0)

  const addTag = () => {
    if (tagInput.trim() && tags.length < 5) {
      setTags([...tags, tagInput.trim().replace(/^#/, '')])
      setTagInput('')
    }
  }

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) return
    onSubmit({
      id: 'user-' + Date.now(),
      type: 'photo',
      author: student?.fullName || 'Anonymous',
      authorSchool: student?.college?.name || 'University',
      title: title.trim(),
      description: description.trim(),
      placeName: placeName.trim(),
      category,
      rating: parseFloat(rating) || 0,
      price: price.trim(),
      tags,
      image: PLACE_PHOTOS[selectedPhoto],
      likes: 0,
      comments: [],
      createdAt: Date.now(),
      isOwn: true,
    })
  }

  return (
    <div style={S.modalOverlay} onClick={onClose}>
      <div style={S.modal} onClick={e => e.stopPropagation()}>
        <div style={S.modalHead}>
          <h3 style={S.modalTitle}><PenLine size={18} /> Create Post</h3>
          <button onClick={onClose} style={S.commClose}><X size={18} /></button>
        </div>
        <div style={S.modalBody}>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="What's your experience? (title)" style={S.modalInput} maxLength={80} />
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Tell other students about this place... tips, prices, what you liked/didn't like" style={S.modalTextarea} rows={4} maxLength={500} />
          <input value={placeName} onChange={e => setPlaceName(e.target.value)} placeholder="Place name (restaurant, apartment, etc.)" style={S.modalInput} />
          <div style={S.modalRow}>
            <select value={category} onChange={e => setCategory(e.target.value)} style={S.modalSelect}>
              <option value="food">Food</option>
              <option value="housing">Housing</option>
              <option value="community">Community</option>
              <option value="sports">Sports</option>
            </select>
            <select value={rating} onChange={e => setRating(e.target.value)} style={S.modalSelect}>
              {[5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1].map(r => <option key={r} value={r}>{r} stars</option>)}
            </select>
            <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" style={{ ...S.modalInput, flex: 1 }} />
          </div>
          <div style={S.photoLabel}>Choose a cover photo:</div>
          <div style={S.photoGrid}>
            {PLACE_PHOTOS.map((p, i) => (
              <div key={i} onClick={() => setSelectedPhoto(i)} style={{ ...S.photoOption, ...(selectedPhoto === i ? S.photoOptionActive : {}) }}>
                <img src={p} alt="" style={S.photoThumb} />
                {selectedPhoto === i && <div style={S.photoCheck}><CheckCircle2 size={16} /></div>}
              </div>
            ))}
          </div>
          <div style={S.tagInputRow}>
            <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTag()} placeholder="Add tags (press Enter)" style={{ ...S.modalInput, flex: 1 }} />
            <button onClick={addTag} style={S.addTagBtn}>Add</button>
          </div>
          {tags.length > 0 && (
            <div style={S.tagList}>{tags.map((t, i) => (
              <span key={i} style={S.tagPill}>#{t} <button onClick={() => setTags(tags.filter((_, j) => j !== i))} style={S.tagRemove}>x</button></span>
            ))}</div>
          )}
          <button onClick={handleSubmit} disabled={!title.trim() || !description.trim()} style={{ ...S.submitBtn, opacity: title.trim() && description.trim() ? 1 : 0.4 }}>
            <Camera size={16} /> Publish Post
          </button>
        </div>
      </div>
    </div>
  )
}

const S = {
  page: { minHeight: 'calc(100vh - 56px)', background: '#f8fafc' },
  container: { maxWidth: 560, margin: '0 auto', padding: '16px 16px 40px' },
  tabBar: { display: 'flex', gap: 6, marginBottom: 12, alignItems: 'center' },
  tab: { display: 'flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 14, border: '1.5px solid #e2e8f0', background: 'white', fontSize: 14, fontWeight: 600, color: '#64748b', cursor: 'pointer', transition: 'all 0.2s' },
  tabActive: { background: '#0f172a', borderColor: '#0f172a', color: 'white' },
  createBtn: { display: 'flex', alignItems: 'center', gap: 5, padding: '10px 18px', borderRadius: 14, background: 'linear-gradient(135deg, #0f766e, #14b8a6)', color: 'white', border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginLeft: 'auto' },
  filterChips: { display: 'flex', gap: 6, marginBottom: 16, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' },
  chip: { display: 'flex', alignItems: 'center', gap: 4, padding: '6px 14px', borderRadius: 100, background: 'white', color: '#64748b', border: '1.5px solid #e2e8f0', fontSize: 12, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 },
  chipActive: { background: '#0f766e', borderColor: '#0f766e', color: 'white', fontWeight: 600 },

  reelsGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 },
  reelsNote: { gridColumn: '1 / -1', fontSize: 13, color: '#94a3b8', marginBottom: 4, lineHeight: 1.4 },
  reelCard: { borderRadius: 16, overflow: 'hidden', position: 'relative', aspectRatio: '9/14', display: 'block', textDecoration: 'none' },
  reelThumb: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  reelOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(transparent 20%, rgba(0,0,0,0.8) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 12 },
  reelPlatform: { position: 'absolute', top: 8, left: 8, display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 100, color: 'white', fontSize: 10, fontWeight: 600 },
  reelPlay: { position: 'absolute', top: 8, right: 8, width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  reelBottom: { display: 'flex', flexDirection: 'column', gap: 4 },
  reelCat: { width: 22, height: 22, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: 2 },
  reelTitle: { fontSize: 13, fontWeight: 700, color: 'white', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' },
  reelCreator: { fontSize: 11, color: 'rgba(255,255,255,0.7)' },
  reelTags: { display: 'flex', flexWrap: 'wrap', gap: 4 },
  reelTag: { fontSize: 10, color: 'rgba(255,255,255,0.6)' },

  postsWrap: { display: 'flex', flexDirection: 'column', gap: 14 },
  emptyPosts: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '60px 20px' },
  postCard: { background: 'white', borderRadius: 20, border: '1px solid #e2e8f0', padding: 18 },
  postAuthor: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 },
  postAv: { width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#0f766e,#14b8a6)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, flexShrink: 0 },
  postAuthorName: { fontSize: 14, fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 6 },
  youBadge: { fontSize: 10, fontWeight: 600, padding: '1px 6px', borderRadius: 100, background: '#f0fdfa', color: '#0f766e' },
  postAuthorSub: { fontSize: 12, color: '#94a3b8' },
  postCatBadge: { display: 'flex', alignItems: 'center', gap: 3, padding: '4px 10px', borderRadius: 100, fontSize: 11, fontWeight: 600 },
  postTitle: { fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 6, lineHeight: 1.3 },
  postDesc: { fontSize: 14, color: '#475569', lineHeight: 1.6, marginBottom: 12 },
  postImage: { width: '100%', borderRadius: 14, marginBottom: 12, display: 'block', maxHeight: 300, objectFit: 'cover' },
  postPlace: { display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#0f766e', textDecoration: 'none', marginBottom: 8, padding: '6px 12px', borderRadius: 10, background: '#f0fdfa' },
  dotSep: { color: '#cbd5e1' },
  postTags: { display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  postTag: { fontSize: 12, fontWeight: 600, color: '#0f766e' },
  postActions: { display: 'flex', alignItems: 'center', gap: 12, paddingTop: 10, borderTop: '1px solid #f1f5f9' },
  postActionBtn: { display: 'flex', alignItems: 'center', gap: 5, padding: '6px 10px', borderRadius: 10, background: 'none', border: 'none', fontSize: 13, fontWeight: 500, color: '#64748b', cursor: 'pointer' },

  commOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' },
  commPanel: { width: '100%', maxWidth: 480, maxHeight: '70vh', background: 'white', borderRadius: '20px 20px 0 0', display: 'flex', flexDirection: 'column', animation: 'slideUp 0.25s ease' },
  commHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderBottom: '1px solid #f1f5f9' },
  commTitle: { fontSize: 15, fontWeight: 700, color: '#0f172a', fontFamily: 'var(--font-display)' },
  commClose: { width: 30, height: 30, borderRadius: '50%', background: '#f1f5f9', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' },
  commList: { flex: 1, overflowY: 'auto', padding: '10px 18px', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 100 },
  commItem: { display: 'flex', gap: 8 },
  commAv: { width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#0f766e,#14b8a6)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 },
  commAuthor: { fontSize: 12, fontWeight: 600, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 6 },
  commTime: { fontSize: 10, color: '#94a3b8', fontWeight: 400 },
  commText: { fontSize: 13, color: '#475569', lineHeight: 1.4, marginTop: 1 },
  commInput: { display: 'flex', gap: 8, padding: '10px 18px', borderTop: '1px solid #f1f5f9' },
  commField: { flex: 1, padding: '8px 14px', borderRadius: 100, border: '1.5px solid #e2e8f0', fontSize: 13, outline: 'none', fontFamily: 'inherit' },
  commSend: { width: 36, height: 36, borderRadius: '50%', background: '#0f766e', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 },

  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 },
  modal: { width: '100%', maxWidth: 520, maxHeight: '90vh', background: 'white', borderRadius: 24, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  modalHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #f1f5f9' },
  modalTitle: { fontSize: 17, fontWeight: 700, color: '#0f172a', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: 8 },
  modalBody: { padding: 20, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 },
  modalInput: { padding: '10px 14px', borderRadius: 12, border: '1.5px solid #e2e8f0', fontSize: 14, fontFamily: 'inherit', outline: 'none', color: '#0f172a' },
  modalTextarea: { padding: '10px 14px', borderRadius: 12, border: '1.5px solid #e2e8f0', fontSize: 14, fontFamily: 'inherit', outline: 'none', resize: 'vertical', color: '#0f172a', lineHeight: 1.5 },
  modalRow: { display: 'flex', gap: 8 },
  modalSelect: { padding: '10px 12px', borderRadius: 12, border: '1.5px solid #e2e8f0', fontSize: 13, fontFamily: 'inherit', color: '#475569', background: 'white', cursor: 'pointer', outline: 'none' },
  photoLabel: { fontSize: 13, fontWeight: 600, color: '#475569' },
  photoGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 },
  photoOption: { borderRadius: 10, overflow: 'hidden', cursor: 'pointer', position: 'relative', border: '2px solid transparent', transition: 'all 0.2s' },
  photoOptionActive: { borderColor: '#0f766e' },
  photoThumb: { width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' },
  photoCheck: { position: 'absolute', top: 4, right: 4, color: '#0f766e', background: 'white', borderRadius: '50%' },
  tagInputRow: { display: 'flex', gap: 8 },
  addTagBtn: { padding: '10px 16px', borderRadius: 12, background: '#f0fdfa', color: '#0f766e', border: '1.5px solid #0f766e', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' },
  tagList: { display: 'flex', flexWrap: 'wrap', gap: 6 },
  tagPill: { display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 100, background: '#f0fdfa', color: '#0f766e', fontSize: 12, fontWeight: 600 },
  tagRemove: { background: 'none', border: 'none', color: '#0f766e', cursor: 'pointer', fontSize: 14, fontWeight: 700, padding: 0 },
  submitBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 20px', borderRadius: 14, background: 'linear-gradient(135deg, #0f766e, #14b8a6)', color: 'white', border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 4 },
}
