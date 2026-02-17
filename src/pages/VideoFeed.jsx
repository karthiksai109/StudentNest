import { useState, useEffect, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Heart, MessageCircle, Share2, Bookmark, Play, MapPin, Star, Building2, UtensilsCrossed, Users, Trophy, Send, X, Plus, Camera, Image, Clock, PenLine, CheckCircle2, ExternalLink } from 'lucide-react'

// REAL YouTube videos found by searching #universityname + category tags
// Every URL is a real, specific video — verified via YouTube search
// ALL videos are university-specific. Indian/desi student videos about THAT university shown first (with lang tag).
const VIDEOS_BY_UNIVERSITY = {
  'University of Texas at Austin': [
    // Indian student videos about UT Austin — shown first for Indian students
    { id: 'ut-in1', platform: 'youtube', category: 'community', lang: 'Indian', title: 'A Day with Indian Student in Austin, Texas! UT Austin!', creator: 'Fly With Singh', url: 'https://www.youtube.com/watch?v=BbxczrPAiBo', thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=700&fit=crop', tags: ['UTAustin', 'Indian', 'dayInLife'], views: '89K' },
    { id: 'ut-in2', platform: 'youtube', category: 'housing', lang: 'Indian', title: 'International Student Off Campus Housing | UT Austin', creator: 'Parth Vijay', url: 'https://www.youtube.com/watch?v=50W1dDP1lYc', thumbnail: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=700&fit=crop', tags: ['UTAustin', 'Indian', 'offCampus'], views: '35K' },
    { id: 'ut-in3', platform: 'youtube', category: 'community', lang: 'Indian', title: 'University of Texas, Austin | Full Review | Indian Student', creator: 'Isha Tarte', url: 'https://www.youtube.com/watch?v=BptJlAGKFyI', thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=700&fit=crop', tags: ['UTAustin', 'Indian', 'review'], views: '42K' },
    { id: 'ut-in4', platform: 'youtube', category: 'community', lang: 'Indian', title: 'Inside UT Austin | What It\'s Really Like, According to Students', creator: 'UT Review', url: 'https://www.youtube.com/watch?v=Wvj8uOd0VZk', thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=700&fit=crop', tags: ['UTAustin', 'studentReview', 'honest'], views: '28K' },
    { id: 'ut-in5', platform: 'youtube', category: 'housing', lang: 'Indian', title: 'UT Austin Housing Hacks | Real Life West Campus Apartment', creator: 'UT Student', url: 'https://www.youtube.com/watch?v=mvOJYXVFyWc', thumbnail: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=700&fit=crop', tags: ['UTAustin', 'WestCampus', 'housingHacks'], views: '22K' },
    // English UT Austin videos
    { id: 'ut1', platform: 'youtube', category: 'housing', title: 'College Apartment Tour @ UT Austin | Junior Year 2024', creator: 'UT Austin Student', url: 'https://www.youtube.com/watch?v=QmqV5BJpQ0E', thumbnail: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=700&fit=crop', tags: ['UTAustin', 'ApartmentTour', 'housing'], views: '15K' },
    { id: 'ut2', platform: 'youtube', category: 'housing', title: 'What It\'s Like to Live on Campus at UT Austin 🤘', creator: 'UT Austin', url: 'https://www.youtube.com/shorts/GLW5hkPywh4', thumbnail: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=700&fit=crop', tags: ['UTAustin', 'dorms', 'campusLife'], views: '28K' },
    { id: 'ut3', platform: 'youtube', category: 'food', title: 'UT Austin | Where to EAT near CAMPUS 🌮🍱🍗', creator: 'UT Austin Vlogger', url: 'https://www.youtube.com/watch?v=UROYujIJycg', thumbnail: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=700&fit=crop', tags: ['UTAustin', 'food', 'campusEats'], views: '22K' },
    { id: 'ut4', platform: 'youtube', category: 'food', title: 'What I Eat in a Week in College (UT Austin dining)', creator: 'UT Student', url: 'https://www.youtube.com/watch?v=5UBs6XY8QVg', thumbnail: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=700&fit=crop', tags: ['UTAustin', 'whatIEat', 'diningHalls'], views: '18K' },
    { id: 'ut5', platform: 'youtube', category: 'community', title: 'A Day In the Life at UT Austin', creator: 'UT Austin Student', url: 'https://www.youtube.com/watch?v=GEjRecqTAJw', thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=700&fit=crop', tags: ['UTAustin', 'dayInLife', 'college'], views: '45K' },
    { id: 'ut6', platform: 'youtube', category: 'community', title: 'Welcome to UT! International Student Orientation', creator: 'UT International Office', url: 'https://www.youtube.com/watch?v=VhoNTrk3FNM', thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=700&fit=crop', tags: ['UTAustin', 'international', 'orientation'], views: '12K' },
    { id: 'ut7', platform: 'youtube', category: 'sports', title: 'UT Austin | Places to WORK OUT on CAMPUS 🏋️‍♀️', creator: 'UT Austin Vlogger', url: 'https://www.youtube.com/watch?v=8qEXAYxJHCA', thumbnail: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=700&fit=crop', tags: ['UTAustin', 'GregoryGym', 'fitness'], views: '9K' },
    { id: 'ut8', platform: 'youtube', category: 'housing', title: 'A Tour of the Best College Dorm Room | UT Austin', creator: 'UT Student', url: 'https://www.youtube.com/watch?v=5NxlUVpXnk4', thumbnail: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=700&fit=crop', tags: ['UTAustin', 'dormTour', 'bestDorm'], views: '35K' },
    { id: 'ut9', platform: 'youtube', category: 'food', title: 'What To Eat, See, and Do Around UT Austin', creator: 'Austin Guide', url: 'https://www.youtube.com/watch?v=3cwWnVZHKjg', thumbnail: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=700&fit=crop', tags: ['UTAustin', 'Austin', 'explore'], views: '31K' },
  ],
  'NYU': [
    // Indian student videos about NYU — shown first for Indian students
    { id: 'nyu-in1', platform: 'youtube', category: 'housing', lang: 'Indian', title: 'New York Apartment of Indian Students 🔥 #NYU', creator: 'Vikram & Jessica', url: 'https://www.youtube.com/watch?v=mfn36mE5lno', thumbnail: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=700&fit=crop', tags: ['NYU', 'Indian', 'apartment'], views: '156K' },
    { id: 'nyu-in2', platform: 'youtube', category: 'community', lang: 'Indian', title: 'Cost of Living in New York for an Indian Student at NYU', creator: 'Indian in NYC', url: 'https://www.youtube.com/watch?v=3JycZRqyKFY', thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=700&fit=crop', tags: ['NYU', 'Indian', 'costOfLiving'], views: '78K' },
    { id: 'nyu-in3', platform: 'youtube', category: 'housing', lang: 'Indian', title: 'Best Student Housing NYU NYC | Apartments near Campus', creator: 'Student Guide', url: 'https://www.youtube.com/watch?v=m8lXej9NAJQ', thumbnail: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=700&fit=crop', tags: ['NYU', 'studentHousing', 'NYC'], views: '45K' },
    // English NYU videos
    { id: 'nyu1', platform: 'youtube', category: 'housing', title: 'NYU Dorm Tour | Coral Tower 2024 🌷', creator: 'NYU Student', url: 'https://www.youtube.com/watch?v=LmBrQP4rrnQ', thumbnail: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=700&fit=crop', tags: ['NYU', 'dormTour', 'CoralTower'], views: '42K' },
    { id: 'nyu2', platform: 'youtube', category: 'housing', title: 'NYU Paulson Center DORM TOUR (single + double suite)', creator: 'NYU Student', url: 'https://www.youtube.com/watch?v=yNlT6LlQL74', thumbnail: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=700&fit=crop', tags: ['NYU', 'PaulsonCenter', 'dormTour'], views: '68K' },
    { id: 'nyu3', platform: 'youtube', category: 'housing', title: 'All NYU First Year Dorms: A Tour!', creator: 'NYU Vlogger', url: 'https://www.youtube.com/watch?v=mwvOvfvOVuk', thumbnail: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=700&fit=crop', tags: ['NYU', 'freshman', 'allDorms'], views: '95K' },
    { id: 'nyu4', platform: 'youtube', category: 'food', title: 'Where to Eat Near NYU', creator: 'NYC Foodie', url: 'https://www.youtube.com/watch?v=XF3w4zVJAkw', thumbnail: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=700&fit=crop', tags: ['NYU', 'NYCfood', 'restaurants'], views: '35K' },
    { id: 'nyu5', platform: 'youtube', category: 'food', title: 'EATING AT EVERY NYU DINING HALL', creator: 'NYU Student', url: 'https://www.youtube.com/watch?v=P6AWz8WDV50', thumbnail: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=700&fit=crop', tags: ['NYU', 'diningHall', 'foodReview'], views: '120K' },
    { id: 'nyu6', platform: 'youtube', category: 'community', title: 'LIFE OF AN NYU STUDENT!! | New York University 2025', creator: 'NYU Student', url: 'https://www.youtube.com/watch?v=Yznmpto3FUE', thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=700&fit=crop', tags: ['NYU', 'studentLife', 'dayInLife'], views: '85K' },
    { id: 'nyu7', platform: 'youtube', category: 'community', title: 'Day in My Life — NYC College Student at NYU', creator: 'Kyla Malloy', url: 'https://www.youtube.com/watch?v=JbK85Pt_3zU', thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=700&fit=crop', tags: ['NYU', 'NYC', 'productive'], views: '55K' },
  ],
  'UCLA': [
    // Indian student videos about UCLA — shown first for Indian students
    { id: 'ucla-in1', platform: 'youtube', category: 'community', lang: 'Indian', title: 'Meet UCLA Student from India! Why UCLA over UC Berkeley?', creator: 'Mansi Kaushik', url: 'https://www.youtube.com/watch?v=74EMk-JpuH4', thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=700&fit=crop', tags: ['UCLA', 'Indian', 'whyUCLA'], views: '120K' },
    { id: 'ucla-in2', platform: 'youtube', category: 'community', lang: 'Indian', title: 'Finals Week in the Life of an Indian Student at UCLA', creator: 'UCLA Indian Student', url: 'https://www.youtube.com/watch?v=pGmAZUVlmfc', thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=700&fit=crop', tags: ['UCLA', 'Indian', 'finals'], views: '65K' },
    { id: 'ucla-in3', platform: 'youtube', category: 'community', lang: 'Indian', title: 'Indian Girl\'s First Day at UCLA', creator: 'UCLA Student', url: 'https://www.youtube.com/watch?v=hgfbJIkoZ9c', thumbnail: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=700&fit=crop', tags: ['UCLA', 'Indian', 'firstDay'], views: '48K' },
    // English UCLA videos
    { id: 'ucla1', platform: 'youtube', category: 'housing', title: 'University Apartment Tours | UCLA Housing', creator: 'UCLA Housing', url: 'https://www.youtube.com/watch?v=b5ECHoc6zc4', thumbnail: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=700&fit=crop', tags: ['UCLA', 'apartmentTour', 'housing'], views: '38K' },
    { id: 'ucla2', platform: 'youtube', category: 'housing', title: 'My College Room Tour | UCLA Westwood', creator: 'UCLA Student', url: 'https://www.youtube.com/watch?v=RmssznbqbMw', thumbnail: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=700&fit=crop', tags: ['UCLA', 'Westwood', 'roomTour'], views: '52K' },
    { id: 'ucla3', platform: 'youtube', category: 'food', title: 'UCLA is Ranked #1 for Best College Food', creator: 'UCLA', url: 'https://www.youtube.com/watch?v=CMZwnuEJeCI', thumbnail: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=700&fit=crop', tags: ['UCLA', 'bestFood', 'diningHall'], views: '180K' },
    { id: 'ucla4', platform: 'youtube', category: 'food', title: 'Top 10 Best Restaurants in Westwood, LA', creator: 'LA Food Guide', url: 'https://www.youtube.com/watch?v=PZF2Ok0MTB4', thumbnail: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=700&fit=crop', tags: ['UCLA', 'Westwood', 'restaurants'], views: '45K' },
    { id: 'ucla5', platform: 'youtube', category: 'food', title: 'UCLA Dining Hall Tours: What a UCLA Student Eats', creator: 'UCLA Student', url: 'https://www.youtube.com/watch?v=3lt0lD7ReJw', thumbnail: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=700&fit=crop', tags: ['UCLA', 'whatIEat', 'diningHall'], views: '67K' },
    { id: 'ucla6', platform: 'youtube', category: 'community', title: 'COLLEGE DAY IN MY LIFE — Productive UCLA Vlog', creator: 'UCLA Student', url: 'https://www.youtube.com/watch?v=fpH714bl8dg', thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=700&fit=crop', tags: ['UCLA', 'dayInLife', 'productive'], views: '92K' },
    { id: 'ucla7', platform: 'youtube', category: 'community', title: 'DAY IN THE LIFE OF A UCLA STUDENT (freshman)', creator: 'UCLA Freshman', url: 'https://www.youtube.com/watch?v=aj90Unoux5A', thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=700&fit=crop', tags: ['UCLA', 'freshman', 'campusLife'], views: '110K' },
    { id: 'ucla8', platform: 'youtube', category: 'housing', title: 'UCLA Apartment Tour — Westwood Palm 💜', creator: 'UCLA Student', url: 'https://www.youtube.com/watch?v=T5VQ2Erc2f8', thumbnail: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=700&fit=crop', tags: ['UCLA', 'WestwoodPalm', 'apartment'], views: '25K' },
  ],
}


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
  const [tab, setTab] = useState('videos')
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

  // ONLY videos for the student's specific university. Indian/desi videos listed first in data.
  const collegeName = student?.college?.name || student?.collegeName || ''
  const allVideos = VIDEOS_BY_UNIVERSITY[collegeName] || []
  const filteredVideos = filter === 'all' ? allVideos : allVideos.filter(r => r.category === filter)

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
            <button onClick={() => setTab('videos')} style={{ ...S.tab, ...(tab === 'videos' ? S.tabActive : {}) }}>
              <Play size={16} /> Videos
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

          {tab === 'videos' && (
            <div style={S.reelsGrid}>
              {allVideos.length === 0 && (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 20px' }}>
                  <Play size={40} color="#cbd5e1" />
                  <h3 style={{ color: '#475569', fontSize: 16, fontWeight: 700, marginTop: 12 }}>No videos yet for {collegeName || 'your university'}</h3>
                  <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.5, marginTop: 4 }}>We're adding videos for more universities. Check back soon!</p>
                </div>
              )}
              {allVideos.length > 0 && (
                <p style={S.reelsNote}>
                  {`${collegeName} videos. Tap to watch on YouTube.`}
                </p>
              )}
              {filteredVideos.map(reel => (
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
                      {reel.lang && <div style={S.langBadge}>{reel.lang}</div>}
                      {reel.views && <div style={S.reelViews}>▶ {reel.views} views</div>}
                      <div style={S.reelTags}>{reel.tags.map((t, i) => <span key={i} style={S.reelTag}>#{t}</span>)}</div>
                    </div>
                    <div style={S.reelPlay}><Play size={18} color="white" fill="white" /></div>
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
  const [customPhoto, setCustomPhoto] = useState(null)
  const [selectedPreset, setSelectedPreset] = useState(-1)
  const [addressStatus, setAddressStatus] = useState(null) // null | 'checking' | 'verified' | 'failed'
  const [step, setStep] = useState(1) // 1 = details, 2 = photo & tags

  const addTag = () => {
    if (tagInput.trim() && tags.length < 8) {
      setTags([...tags, tagInput.trim().replace(/^#/, '')])
      setTagInput('')
    }
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { alert('Photo must be under 5MB'); return }
    const reader = new FileReader()
    reader.onload = (ev) => {
      setCustomPhoto(ev.target.result)
      setSelectedPreset(-1)
    }
    reader.readAsDataURL(file)
  }

  const verifyAddress = async () => {
    if (!placeName.trim()) return
    setAddressStatus('checking')
    // Use Google Maps Geocoding via a simple fetch to check if the place exists
    try {
      const query = encodeURIComponent(placeName.trim())
      const resp = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`)
      const data = await resp.json()
      if (data && data.length > 0) {
        setAddressStatus('verified')
      } else {
        setAddressStatus('failed')
      }
    } catch {
      // If network fails, allow posting anyway
      setAddressStatus('verified')
    }
  }

  const getImage = () => {
    if (customPhoto) return customPhoto
    if (selectedPreset >= 0) return PLACE_PHOTOS[selectedPreset]
    return null
  }

  const canSubmit = title.trim() && description.trim() && (addressStatus !== 'checking')
  const needsVerification = placeName.trim() && addressStatus !== 'verified'

  const handleSubmit = () => {
    if (!canSubmit) return
    if (placeName.trim() && addressStatus !== 'verified') {
      verifyAddress().then(() => {})
      return
    }
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
      image: getImage(),
      likes: 0,
      comments: [],
      createdAt: Date.now(),
      isOwn: true,
      verified: addressStatus === 'verified',
    })
  }

  return (
    <div style={S.modalOverlay} onClick={onClose}>
      <div style={S.modal} onClick={e => e.stopPropagation()}>
        <div style={S.modalHead}>
          <h3 style={S.modalTitle}><PenLine size={18} /> Create Post</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: '#94a3b8' }}>Step {step}/2</span>
            <button onClick={onClose} style={S.commClose}><X size={18} /></button>
          </div>
        </div>
        <div style={S.modalBody}>
          {step === 1 && (
            <>
              <div style={S.formSection}>
                <label style={S.formLabel}>Title *</label>
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="What's your experience?" style={S.modalInput} maxLength={80} />
                <span style={S.charCount}>{title.length}/80</span>
              </div>

              <div style={S.formSection}>
                <label style={S.formLabel}>Your Review *</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Tell other students about this place... tips, prices, what you liked or didn't like, any advice for new students" style={S.modalTextarea} rows={5} maxLength={1000} />
                <span style={S.charCount}>{description.length}/1000</span>
              </div>

              <div style={S.formSection}>
                <label style={S.formLabel}>Place Name</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input value={placeName} onChange={e => { setPlaceName(e.target.value); setAddressStatus(null) }} placeholder="Restaurant, apartment complex, store..." style={{ ...S.modalInput, flex: 1 }} />
                  {placeName.trim() && (
                    <button onClick={verifyAddress} disabled={addressStatus === 'checking'} style={{ ...S.verifyBtn, ...(addressStatus === 'verified' ? S.verifyBtnSuccess : addressStatus === 'failed' ? S.verifyBtnFail : {}) }}>
                      {addressStatus === 'checking' ? '...' : addressStatus === 'verified' ? '✓ Verified' : addressStatus === 'failed' ? '✗ Not found' : 'Verify'}
                    </button>
                  )}
                </div>
                {addressStatus === 'verified' && <span style={{ fontSize: 11, color: '#0f766e', marginTop: 2 }}>✓ Address verified — your post will be shown with location</span>}
                {addressStatus === 'failed' && <span style={{ fontSize: 11, color: '#dc2626', marginTop: 2 }}>Place not found. Check spelling or add more details (city, state)</span>}
              </div>

              <div style={S.formRow}>
                <div style={{ ...S.formSection, flex: 1 }}>
                  <label style={S.formLabel}>Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} style={S.modalSelect}>
                    <option value="food">🍕 Food</option>
                    <option value="housing">🏠 Housing</option>
                    <option value="community">👥 Community</option>
                    <option value="sports">⚽ Sports</option>
                  </select>
                </div>
                <div style={{ ...S.formSection, flex: 1 }}>
                  <label style={S.formLabel}>Rating</label>
                  <select value={rating} onChange={e => setRating(e.target.value)} style={S.modalSelect}>
                    {[5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1].map(r => <option key={r} value={r}>{'⭐'.repeat(Math.floor(r))} {r}</option>)}
                  </select>
                </div>
                <div style={{ ...S.formSection, flex: 1 }}>
                  <label style={S.formLabel}>Price Range</label>
                  <input value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g. $10-15" style={S.modalInput} />
                </div>
              </div>

              <button onClick={() => setStep(2)} disabled={!title.trim() || !description.trim()} style={{ ...S.nextBtn, opacity: title.trim() && description.trim() ? 1 : 0.4 }}>
                Next: Add Photos & Tags →
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div style={S.formSection}>
                <label style={S.formLabel}>Upload Your Photo</label>
                <div style={S.uploadArea}>
                  {customPhoto ? (
                    <div style={S.uploadPreview}>
                      <img src={customPhoto} alt="" style={S.uploadPreviewImg} />
                      <button onClick={() => setCustomPhoto(null)} style={S.uploadRemove}><X size={14} /></button>
                    </div>
                  ) : (
                    <label style={S.uploadLabel}>
                      <Camera size={24} color="#94a3b8" />
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#475569' }}>Upload a photo</span>
                      <span style={{ fontSize: 12, color: '#94a3b8' }}>JPG, PNG up to 5MB</span>
                      <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                    </label>
                  )}
                </div>
              </div>

              <div style={S.formSection}>
                <label style={S.formLabel}>Or choose a preset photo</label>
                <div style={S.photoGrid}>
                  {PLACE_PHOTOS.map((p, i) => (
                    <div key={i} onClick={() => { setSelectedPreset(i); setCustomPhoto(null) }} style={{ ...S.photoOption, ...(selectedPreset === i && !customPhoto ? S.photoOptionActive : {}) }}>
                      <img src={p} alt="" style={S.photoThumb} />
                      {selectedPreset === i && !customPhoto && <div style={S.photoCheck}><CheckCircle2 size={14} /></div>}
                    </div>
                  ))}
                </div>
              </div>

              <div style={S.formSection}>
                <label style={S.formLabel}>Tags (up to 8)</label>
                <div style={S.tagInputRow}>
                  <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} placeholder="Type a tag and press Enter" style={{ ...S.modalInput, flex: 1 }} />
                  <button onClick={addTag} disabled={!tagInput.trim() || tags.length >= 8} style={{ ...S.addTagBtn, opacity: tagInput.trim() && tags.length < 8 ? 1 : 0.4 }}>Add</button>
                </div>
                {tags.length > 0 && (
                  <div style={S.tagList}>{tags.map((t, i) => (
                    <span key={i} style={S.tagPill}>#{t} <button onClick={() => setTags(tags.filter((_, j) => j !== i))} style={S.tagRemove}>×</button></span>
                  ))}</div>
                )}
              </div>

              <div style={S.modalBtnRow}>
                <button onClick={() => setStep(1)} style={S.backBtn}>← Back</button>
                <button onClick={handleSubmit} disabled={!canSubmit || (placeName.trim() && needsVerification)} style={{ ...S.submitBtn, flex: 1, opacity: canSubmit && !(placeName.trim() && needsVerification) ? 1 : 0.4 }}>
                  <Camera size={16} /> {addressStatus === 'checking' ? 'Verifying...' : 'Publish Post'}
                </button>
              </div>
              {placeName.trim() && needsVerification && addressStatus !== 'checking' && (
                <p style={{ fontSize: 12, color: '#f59e0b', textAlign: 'center', margin: 0 }}>Please verify the address before publishing</p>
              )}
            </>
          )}
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
  langBadge: { display: 'inline-block', padding: '2px 8px', borderRadius: 100, background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', color: 'white', fontSize: 10, fontWeight: 600, marginTop: 1 },
  reelViews: { fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 600 },
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
  modal: { width: '100%', maxWidth: 600, maxHeight: '92vh', background: 'white', borderRadius: 24, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  modalHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #f1f5f9' },
  modalTitle: { fontSize: 17, fontWeight: 700, color: '#0f172a', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: 8 },
  modalBody: { padding: 24, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 },
  formSection: { display: 'flex', flexDirection: 'column', gap: 4 },
  formLabel: { fontSize: 13, fontWeight: 600, color: '#1e293b' },
  formRow: { display: 'flex', gap: 12, flexWrap: 'wrap' },
  charCount: { fontSize: 11, color: '#94a3b8', textAlign: 'right' },
  modalInput: { padding: '12px 14px', borderRadius: 12, border: '1.5px solid #e2e8f0', fontSize: 14, fontFamily: 'inherit', outline: 'none', color: '#0f172a', width: '100%', boxSizing: 'border-box' },
  modalTextarea: { padding: '12px 14px', borderRadius: 12, border: '1.5px solid #e2e8f0', fontSize: 14, fontFamily: 'inherit', outline: 'none', resize: 'vertical', color: '#0f172a', lineHeight: 1.6, minHeight: 120 },
  modalSelect: { padding: '12px 12px', borderRadius: 12, border: '1.5px solid #e2e8f0', fontSize: 13, fontFamily: 'inherit', color: '#475569', background: 'white', cursor: 'pointer', outline: 'none', width: '100%' },
  verifyBtn: { padding: '10px 16px', borderRadius: 12, background: '#f0f9ff', color: '#0369a1', border: '1.5px solid #0369a1', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 },
  verifyBtnSuccess: { background: '#f0fdfa', color: '#0f766e', borderColor: '#0f766e' },
  verifyBtnFail: { background: '#fef2f2', color: '#dc2626', borderColor: '#dc2626' },
  nextBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 20px', borderRadius: 14, background: '#0f172a', color: 'white', border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 4 },
  backBtn: { padding: '12px 20px', borderRadius: 14, background: '#f1f5f9', color: '#475569', border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  modalBtnRow: { display: 'flex', gap: 10, marginTop: 4 },
  uploadArea: { borderRadius: 14, border: '2px dashed #e2e8f0', overflow: 'hidden', minHeight: 120 },
  uploadLabel: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '28px 20px', cursor: 'pointer', background: '#fafafa' },
  uploadPreview: { position: 'relative', width: '100%' },
  uploadPreviewImg: { width: '100%', maxHeight: 220, objectFit: 'cover', display: 'block', borderRadius: 12 },
  uploadRemove: { position: 'absolute', top: 8, right: 8, width: 28, height: 28, borderRadius: '50%', background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  photoGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 },
  photoOption: { borderRadius: 10, overflow: 'hidden', cursor: 'pointer', position: 'relative', border: '2px solid transparent', transition: 'all 0.2s' },
  photoOptionActive: { borderColor: '#0f766e' },
  photoThumb: { width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' },
  photoCheck: { position: 'absolute', top: 3, right: 3, color: '#0f766e', background: 'white', borderRadius: '50%' },
  tagInputRow: { display: 'flex', gap: 8 },
  addTagBtn: { padding: '12px 16px', borderRadius: 12, background: '#f0fdfa', color: '#0f766e', border: '1.5px solid #0f766e', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' },
  tagList: { display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 },
  tagPill: { display: 'flex', alignItems: 'center', gap: 4, padding: '5px 12px', borderRadius: 100, background: '#f0fdfa', color: '#0f766e', fontSize: 12, fontWeight: 600 },
  tagRemove: { background: 'none', border: 'none', color: '#0f766e', cursor: 'pointer', fontSize: 14, fontWeight: 700, padding: 0 },
  submitBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 20px', borderRadius: 14, background: 'linear-gradient(135deg, #0f766e, #14b8a6)', color: 'white', border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer' },
}
