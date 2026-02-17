import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Building2, UtensilsCrossed, Users, Trophy, MapPin, GraduationCap, Globe, Mail, ArrowRight, TrendingUp, Clock, Star, Play, Smartphone, CreditCard, Bus, Wifi, ShoppingBag, Compass, Tag, MessageCircle, Languages } from 'lucide-react'

const QUICK_LINKS = [
  { path: '/housing', icon: Building2, title: 'Housing', desc: 'Find affordable apartments and rooms near campus', color: '#0f766e', bg: '#f0fdfa' },
  { path: '/food', icon: UtensilsCrossed, title: 'Food & Grocery', desc: 'Discover restaurants and stores with your national cuisine', color: '#ea580c', bg: '#fff7ed' },
  { path: '/community', icon: Users, title: 'Community', desc: 'Join groups and events with students from your country', color: '#7c3aed', bg: '#f5f3ff' },
  { path: '/sports', icon: Trophy, title: 'Sports', desc: 'Find sports leagues, pickup games, and fitness groups', color: '#0369a1', bg: '#f0f9ff' },
  { path: '/reviews', icon: Play, title: 'Reels & Posts', desc: 'Watch student reels, share your experiences, and discover trending places', color: '#dc2626', bg: '#fef2f2' },
  { path: '/discounts', icon: Tag, title: 'Student Deals', desc: 'Browse verified student discounts from top brands like Apple, Spotify, GitHub, and more', color: '#f59e0b', bg: '#fffbeb' },
]

const SETTLEMENT_ACTIONS = [
  { icon: Smartphone, title: 'Get a Phone Plan', desc: 'Compare Mint Mobile, T-Mobile, Visible & more. From $15/mo.', color: '#0f766e', bg: '#f0fdfa', tab: 'sim', type: 'settle' },
  { icon: CreditCard, title: 'Open a Bank Account', desc: 'Chase, Bank of America — $0 monthly fee for students. $100 bonus.', color: '#7c3aed', bg: '#f5f3ff', tab: 'bank', type: 'settle' },
  { icon: Bus, title: 'Get a Transit Pass', desc: 'Open Google Maps with transit directions from your campus.', color: '#0369a1', bg: '#f0f9ff', tab: 'transit', type: 'transit' },
  { icon: Wifi, title: 'Set Up Internet', desc: 'Compare Xfinity, AT&T, T-Mobile 5G. Student deals from $25/mo.', color: '#ea580c', bg: '#fff7ed', tab: 'internet', type: 'settle' },
  { icon: ShoppingBag, title: 'Buy Essentials', desc: 'Kitchen, bedroom, tech — what to buy, where, and how much.', color: '#dc2626', bg: '#fef2f2', tab: 'essentials', type: 'settle' },
]

const TIPS = [
  { icon: Clock, text: 'Start your housing search at least 2 months before your arrival date' },
  { icon: TrendingUp, text: 'Prices are usually lower during summer months for most college towns' },
  { icon: Star, text: 'Check video reviews from other international students for the most relevant feedback' },
  { icon: Globe, text: 'Join your national community group early — they often help with airport pickups' },
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

export default function Dashboard() {
  const { student } = useApp()
  const [recentReviews, setRecentReviews] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('sn_user_posts')
      if (raw) {
        const posts = JSON.parse(raw)
        setRecentReviews(posts.sort((a, b) => b.createdAt - a.createdAt).slice(0, 3))
      }
    } catch {}
    // Listen for storage changes from other tabs/components
    const handler = () => {
      try {
        const raw = localStorage.getItem('sn_user_posts')
        if (raw) setRecentReviews(JSON.parse(raw).sort((a, b) => b.createdAt - a.createdAt).slice(0, 3))
      } catch {}
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  if (!student) return null

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="dashboard-welcome" style={styles.welcome}>
          <div style={styles.welcomeLeft}>
            <h1 style={styles.welcomeTitle}>
              Welcome, {student.fullName?.split(' ')[0]}
            </h1>
            <p style={styles.welcomeDesc}>
              Here's everything you need to settle in near <strong>{student.college?.name || student.collegeName}</strong>. 
              Explore housing, food, community groups, and sports activities tailored for you.
            </p>
          </div>
          <div style={styles.welcomeRight}>
            <div style={styles.idCard}>
              <div style={styles.idCardHeader}>Signed in as</div>
              <div style={styles.idCardValue}>
                <Mail size={14} color="#0f766e" />
                <span>{student.email}</span>
              </div>
              <div style={styles.idCardHint}>{student.fullName}</div>
            </div>
          </div>
        </div>

        <div className="dashboard-profile-cards" style={styles.profileCards}>
          <div style={styles.profileCard}>
            <GraduationCap size={20} color="#0f766e" />
            <div>
              <div style={styles.profileLabel}>College</div>
              <div style={styles.profileValue}>{student.college?.name || student.collegeName}</div>
            </div>
          </div>
          <div style={styles.profileCard}>
            <MapPin size={20} color="#0f766e" />
            <div>
              <div style={styles.profileLabel}>Location</div>
              <div style={styles.profileValue}>{student.college?.city}, {student.college?.country}</div>
            </div>
          </div>
          <div style={styles.profileCard}>
            <Globe size={20} color="#0f766e" />
            <div>
              <div style={styles.profileLabel}>Nationality</div>
              <div style={styles.profileValue}>{student.nationality}</div>
            </div>
          </div>
        </div>

        <h2 style={styles.sectionTitle}>Explore Near Your Campus</h2>
        <div className="dashboard-quick-links" style={styles.quickLinks}>
          {QUICK_LINKS.map((link, i) => {
            const Icon = link.icon
            return (
              <Link key={i} to={link.path} style={styles.quickCard}>
                <div style={{ ...styles.quickIcon, background: link.bg, color: link.color }}>
                  <Icon size={28} />
                </div>
                <h3 style={styles.quickTitle}>{link.title}</h3>
                <p style={styles.quickDesc}>{link.desc}</p>
                <div style={{ ...styles.quickArrow, color: link.color }}>
                  Explore <ArrowRight size={14} />
                </div>
              </Link>
            )
          })}
        </div>

        <h2 style={{ ...styles.sectionTitle, marginTop: 48 }}>Your Settlement Kit</h2>
        <p style={{ fontSize: 14, color: '#64748b', marginBottom: 16, marginTop: -12 }}>
          Set up your life in {student.college?.city || 'your new city'} — real plans, real prices, real links
        </p>
        <div style={styles.settlementGrid}>
          {SETTLEMENT_ACTIONS.map((action, i) => {
            const Icon = action.icon
            if (action.type === 'transit') {
              const college = student?.college
              const transitUrl = college
                ? `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(college.name + ', ' + (college.city || ''))}&destination=${encodeURIComponent(college.city || '')}&travelmode=transit`
                : 'https://www.google.com/maps/?travelmode=transit'
              return (
                <a key={i} href={transitUrl} target="_blank" rel="noopener noreferrer" style={styles.settlementCard}>
                  <div style={{ ...styles.settlementIcon, background: action.bg, color: action.color }}>
                    <Icon size={22} />
                  </div>
                  <div style={styles.settlementContent}>
                    <h3 style={styles.settlementTitle}>{action.title}</h3>
                    <p style={styles.settlementDesc}>{action.desc}</p>
                  </div>
                  <ArrowRight size={16} color="#94a3b8" style={{ flexShrink: 0 }} />
                </a>
              )
            }
            return (
              <Link key={i} to={`/settle?tab=${action.tab}`} style={styles.settlementCard}>
                <div style={{ ...styles.settlementIcon, background: action.bg, color: action.color }}>
                  <Icon size={22} />
                </div>
                <div style={styles.settlementContent}>
                  <h3 style={styles.settlementTitle}>{action.title}</h3>
                  <p style={styles.settlementDesc}>{action.desc}</p>
                </div>
                <ArrowRight size={16} color="#94a3b8" style={{ flexShrink: 0 }} />
              </Link>
            )
          })}
        </div>
        <Link to="/settle" style={styles.settleAllBtn}>
          <Compass size={16} />
          <span>View Full Settlement Guide</span>
          <ArrowRight size={14} />
        </Link>

        {/* Student Reviews Section */}
        {recentReviews.length > 0 && (
          <>
            <h2 style={{ ...styles.sectionTitle, marginTop: 48 }}>
              <MessageCircle size={20} color="#0f766e" style={{ marginRight: 6 }} />
              Recent Student Reviews
            </h2>
            <div style={styles.reviewsGrid}>
              {recentReviews.map(review => (
                <div key={review.id} style={styles.reviewCard}>
                  <div style={styles.reviewHeader}>
                    <div style={styles.reviewAvatar}>{review.author?.charAt(0) || 'U'}</div>
                    <div style={{ flex: 1 }}>
                      <div style={styles.reviewAuthor}>{review.author}</div>
                      <div style={styles.reviewMeta}>{review.authorSchool} · {getTimeAgo(review.createdAt)}</div>
                    </div>
                    {review.rating > 0 && (
                      <div style={styles.reviewRating}>
                        <Star size={12} fill="#f59e0b" color="#f59e0b" />
                        <span>{review.rating}</span>
                      </div>
                    )}
                  </div>
                  <h4 style={styles.reviewTitle}>{review.title}</h4>
                  <p style={styles.reviewDesc}>{review.description}</p>
                  {review.image && <img src={review.image} alt="" style={styles.reviewImage} loading="lazy" />}
                  {review.placeName && (
                    <div style={styles.reviewPlace}>
                      <MapPin size={12} color="#0f766e" />
                      <span>{review.placeName}</span>
                      {review.verified && <span style={styles.verifiedBadge}>✓ Verified</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Link to="/reviews" style={styles.viewAllReviews}>
              View All Reviews & Post Yours <ArrowRight size={14} />
            </Link>
          </>
        )}

        <h2 style={{ ...styles.sectionTitle, marginTop: 48 }}>Tips for New Students</h2>
        <div className="dashboard-tips-grid" style={styles.tipsGrid}>
          {TIPS.map((tip, i) => {
            const Icon = tip.icon
            return (
              <div key={i} style={styles.tipCard}>
                <Icon size={18} color="#0f766e" style={{ flexShrink: 0, marginTop: 2 }} />
                <span style={styles.tipText}>{tip.text}</span>
              </div>
            )
          })}
        </div>
      </div>
      <Footer />
    </div>
  )
}

const styles = {
  welcome: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 32,
    padding: '40px 0 24px',
    flexWrap: 'wrap',
  },
  welcomeLeft: {
    flex: 1,
    minWidth: 300,
  },
  welcomeTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 32,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 8,
  },
  welcomeDesc: {
    fontSize: 16,
    lineHeight: 1.7,
    color: '#64748b',
    maxWidth: 520,
  },
  welcomeRight: {},
  idCard: {
    background: '#f0fdfa',
    border: '1px solid #99f6e4',
    borderRadius: 14,
    padding: '16px 20px',
    minWidth: 240,
  },
  idCardHeader: {
    fontSize: 11,
    fontWeight: 600,
    color: '#0f766e',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: 6,
  },
  idCardValue: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 15,
    fontWeight: 600,
    color: '#0f172a',
  },
  idCardHint: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 6,
  },
  profileCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 16,
    marginBottom: 40,
  },
  profileCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '18px 20px',
    background: 'white',
    borderRadius: 14,
    border: '1px solid #e2e8f0',
  },
  profileLabel: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: 500,
  },
  profileValue: {
    fontSize: 15,
    fontWeight: 600,
    color: '#1e293b',
  },
  sectionTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 22,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 20,
  },
  quickLinks: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: 16,
  },
  quickCard: {
    background: 'white',
    borderRadius: 16,
    padding: 24,
    border: '1px solid #e2e8f0',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
  },
  quickIcon: {
    width: 56,
    height: 56,
    borderRadius: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  quickTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 18,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 6,
  },
  quickDesc: {
    fontSize: 13,
    lineHeight: 1.6,
    color: '#64748b',
    flex: 1,
    marginBottom: 14,
  },
  quickArrow: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 13,
    fontWeight: 600,
  },
  settlementGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 10,
    marginBottom: 16,
  },
  settlementCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '16px 20px',
    background: 'white',
    borderRadius: 12,
    border: '1px solid #e2e8f0',
    textDecoration: 'none',
    transition: 'all 0.2s',
    cursor: 'pointer',
  },
  settlementIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  settlementContent: {
    flex: 1,
  },
  settlementTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 2,
    fontFamily: 'var(--font-display)',
  },
  settlementDesc: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 1.4,
  },
  settleAllBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 22px',
    borderRadius: 10,
    background: '#0f766e',
    color: 'white',
    fontSize: 14,
    fontWeight: 600,
    textDecoration: 'none',
    marginBottom: 16,
  },
  tipsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 14,
    marginBottom: 40,
  },
  tipCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    padding: '16px 20px',
    background: 'white',
    borderRadius: 12,
    border: '1px solid #e2e8f0',
  },
  tipText: {
    fontSize: 14,
    lineHeight: 1.5,
    color: '#475569',
  },
  reviewsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 16,
    marginBottom: 16,
  },
  reviewCard: {
    background: 'white',
    borderRadius: 16,
    border: '1px solid #e2e8f0',
    padding: 18,
  },
  reviewHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  reviewAvatar: {
    width: 34,
    height: 34,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #0f766e, #14b8a6)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 700,
    flexShrink: 0,
  },
  reviewAuthor: {
    fontSize: 13,
    fontWeight: 700,
    color: '#0f172a',
  },
  reviewMeta: {
    fontSize: 11,
    color: '#94a3b8',
  },
  reviewRating: {
    display: 'flex',
    alignItems: 'center',
    gap: 3,
    fontSize: 13,
    fontWeight: 600,
    color: '#f59e0b',
  },
  reviewTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 4,
    fontFamily: 'var(--font-display)',
  },
  reviewDesc: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 1.5,
    marginBottom: 8,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  reviewImage: {
    width: '100%',
    borderRadius: 10,
    maxHeight: 160,
    objectFit: 'cover',
    marginBottom: 8,
  },
  reviewPlace: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    fontSize: 12,
    color: '#0f766e',
    padding: '4px 10px',
    borderRadius: 8,
    background: '#f0fdfa',
  },
  verifiedBadge: {
    fontSize: 10,
    fontWeight: 600,
    color: '#0f766e',
    marginLeft: 'auto',
  },
  viewAllReviews: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 14,
    fontWeight: 600,
    color: '#0f766e',
    textDecoration: 'none',
    marginBottom: 16,
  },
}

