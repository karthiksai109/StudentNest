import { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Tag, ExternalLink, Search, Filter, CheckCircle2, Star, Percent, ShoppingBag, Laptop, Music, Plane, BookOpen, Utensils, Shirt, Dumbbell, CreditCard, Smartphone, Gift, ChevronDown, BadgeCheck, Sparkles, Clock, RefreshCw } from 'lucide-react'

// Daily rotation: use day-of-year as seed to pick different featured deals each day
function getDaySeed() {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now - start
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

function shuffleWithSeed(arr, seed) {
  const shuffled = [...arr]
  let s = seed
  for (let i = shuffled.length - 1; i > 0; i--) {
    s = (s * 16807 + 0) % 2147483647
    const j = s % (i + 1)
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const DISCOUNT_CATEGORIES = [
  { id: 'all', label: 'All Deals', icon: Sparkles },
  { id: 'tech', label: 'Tech', icon: Laptop },
  { id: 'food', label: 'Food', icon: Utensils },
  { id: 'shopping', label: 'Shopping', icon: ShoppingBag },
  { id: 'entertainment', label: 'Entertainment', icon: Music },
  { id: 'travel', label: 'Travel', icon: Plane },
  { id: 'education', label: 'Education', icon: BookOpen },
  { id: 'fitness', label: 'Fitness', icon: Dumbbell },
  { id: 'fashion', label: 'Fashion', icon: Shirt },
  { id: 'finance', label: 'Finance', icon: CreditCard },
]

const STUDENT_DISCOUNTS = [
  // Tech
  { id: 'd1', brand: 'Apple', title: 'Apple Education Pricing', discount: 'Up to $300 off', description: 'MacBook Air from $899, MacBook Pro from $1,199, iPad from $329. Free AirPods with Mac or iPad purchase during Back to School.', category: 'tech', verification: '.edu email', url: 'https://www.apple.com/us-edu/store', logo: '🍎', rating: 4.9, claims: 12400, trending: true, expiry: 'Ongoing' },
  { id: 'd2', brand: 'Microsoft', title: 'Microsoft 365 Education', discount: 'FREE', description: 'Full Microsoft 365 suite including Word, Excel, PowerPoint, OneNote, Teams, and 1TB OneDrive storage. Completely free with .edu email.', category: 'tech', verification: '.edu email', url: 'https://www.microsoft.com/en-us/education/products/office', logo: '🪟', rating: 4.8, claims: 28500, trending: true, expiry: 'Ongoing' },
  { id: 'd3', brand: 'GitHub', title: 'GitHub Student Developer Pack', discount: 'FREE - $200+ value', description: 'Free GitHub Pro, $200 DigitalOcean credits, free .me domain, Canva Pro, JetBrains IDEs, MongoDB Atlas, and 80+ developer tools.', category: 'tech', verification: '.edu email + ID', url: 'https://education.github.com/pack', logo: '🐙', rating: 4.9, claims: 19200, trending: true, expiry: 'Ongoing' },
  { id: 'd4', brand: 'Adobe', title: 'Adobe Creative Cloud', discount: '60% off - $19.99/mo', description: 'Full Creative Cloud with Photoshop, Illustrator, Premiere Pro, After Effects, and 20+ apps. Regular price $54.99/mo.', category: 'tech', verification: '.edu email', url: 'https://www.adobe.com/creativecloud/buy/students.html', logo: '🎨', rating: 4.7, claims: 8900, trending: false, expiry: 'Ongoing' },
  { id: 'd5', brand: 'Samsung', title: 'Samsung Education Store', discount: 'Up to 30% off', description: 'Galaxy laptops, tablets, phones, and accessories. Galaxy Book from $699, Galaxy Tab S9 from $599 with student discount.', category: 'tech', verification: 'UNiDAYS / .edu email', url: 'https://www.samsung.com/us/shop/discount-program/education/', logo: '📱', rating: 4.5, claims: 5600, trending: false, expiry: 'Ongoing' },
  { id: 'd6', brand: 'Dell', title: 'Dell University', discount: 'Up to 20% off', description: 'XPS, Inspiron, and Latitude laptops. Extra 10% off select models. Free shipping on all student orders.', category: 'tech', verification: '.edu email', url: 'https://www.dell.com/en-us/lp/students', logo: '💻', rating: 4.4, claims: 4200, trending: false, expiry: 'Ongoing' },
  { id: 'd7', brand: 'Notion', title: 'Notion Personal Pro', discount: 'FREE', description: 'Notion Personal Pro plan free for students and educators. Unlimited file uploads, unlimited guests, 30-day version history.', category: 'tech', verification: '.edu email', url: 'https://www.notion.so/product/notion-for-education', logo: '📝', rating: 4.8, claims: 15600, trending: true, expiry: 'Ongoing' },
  { id: 'd8', brand: 'Figma', title: 'Figma Education', discount: 'FREE', description: 'Figma Professional plan free for students. Unlimited projects, team libraries, branching, and dev mode.', category: 'tech', verification: '.edu email', url: 'https://www.figma.com/education/', logo: '🎯', rating: 4.9, claims: 11300, trending: true, expiry: 'Ongoing' },

  // Food
  { id: 'd9', brand: 'Chipotle', title: 'Chipotle Student BOGO', discount: 'Buy 1 Get 1 Free', description: 'Show valid student ID at checkout for BOGO entrée during Student Appreciation events. Check app for dates.', category: 'food', verification: 'Student ID', url: 'https://www.chipotle.com/rewards', logo: '🌯', rating: 4.6, claims: 7800, trending: false, expiry: 'Periodic events' },
  { id: 'd10', brand: 'Chick-fil-A', title: 'Chick-fil-A Student Discount', discount: 'Free drink with meal', description: 'Show student ID at participating locations for a free small drink with any entrée purchase.', category: 'food', verification: 'Student ID', url: 'https://www.chick-fil-a.com/', logo: '🐔', rating: 4.5, claims: 9200, trending: false, expiry: 'Varies by location' },
  { id: 'd11', brand: 'Dominos', title: "Domino's Student Deal", discount: '20% off online orders', description: 'Use student discount code or verify through UNiDAYS for 20% off all online orders. Mix & match deals stack.', category: 'food', verification: 'UNiDAYS', url: 'https://www.dominos.com/', logo: '🍕', rating: 4.3, claims: 14500, trending: true, expiry: 'Ongoing' },
  { id: 'd12', brand: 'Grubhub', title: 'Grubhub+ Student', discount: 'FREE Grubhub+ ($9.99/mo value)', description: 'Free Grubhub+ membership with Amazon Prime Student. $0 delivery fees, lower service fees, 5% back on pickup.', category: 'food', verification: 'Amazon Prime Student', url: 'https://www.grubhub.com/plus/student', logo: '🛵', rating: 4.7, claims: 18900, trending: true, expiry: 'Ongoing' },
  { id: 'd13', brand: 'Panera Bread', title: 'Panera Student Sip Club', discount: 'Free 3 months unlimited drinks', description: 'Free trial of Unlimited Sip Club — unlimited coffee, tea, lemonade, and fountain drinks. Then $11.99/mo.', category: 'food', verification: '.edu email', url: 'https://www.panerabread.com/en-us/mypanera/sip-club.html', logo: '☕', rating: 4.4, claims: 6700, trending: false, expiry: 'Ongoing' },
  { id: 'd14', brand: 'DoorDash', title: 'DashPass Student', discount: '50% off DashPass - $4.99/mo', description: '$0 delivery fees and reduced service fees on eligible orders. Half price for verified students.', category: 'food', verification: '.edu email', url: 'https://www.doordash.com/dashpass/student/', logo: '🚗', rating: 4.5, claims: 21300, trending: true, expiry: 'Ongoing' },

  // Shopping
  { id: 'd15', brand: 'Amazon', title: 'Amazon Prime Student', discount: '50% off - $7.49/mo', description: 'Free 6-month trial, then $7.49/mo (reg $14.99). Free 2-day shipping, Prime Video, Prime Music, Prime Gaming, Grubhub+.', category: 'shopping', verification: '.edu email', url: 'https://www.amazon.com/amazonprime?tag=studentdiscount', logo: '📦', rating: 4.9, claims: 45200, trending: true, expiry: 'Ongoing' },
  { id: 'd16', brand: 'Target', title: 'Target Circle Student', discount: 'Extra 20% off', description: 'Verify student status for an extra 20% off one purchase. Plus ongoing deals on dorm essentials and school supplies.', category: 'shopping', verification: 'UNiDAYS', url: 'https://www.target.com/circle', logo: '🎯', rating: 4.3, claims: 8900, trending: false, expiry: 'Back to school season' },
  { id: 'd17', brand: 'Best Buy', title: 'Best Buy Student Deals', discount: 'Up to $150 off laptops', description: 'Exclusive student pricing on laptops, tablets, headphones, and accessories. Price match guarantee included.', category: 'shopping', verification: '.edu email', url: 'https://www.bestbuy.com/site/back-to-school/college-student-deals/pcmcat748300659876.c', logo: '🏪', rating: 4.4, claims: 6100, trending: false, expiry: 'Ongoing' },

  // Entertainment
  { id: 'd18', brand: 'Spotify', title: 'Spotify Premium Student', discount: '$5.99/mo (reg $11.99)', description: 'Spotify Premium, Hulu (with ads), and Showtime all included for $5.99/mo. Ad-free music, offline downloads.', category: 'entertainment', verification: 'SheerID', url: 'https://www.spotify.com/us/student/', logo: '🎵', rating: 4.9, claims: 38700, trending: true, expiry: 'Up to 4 years' },
  { id: 'd19', brand: 'Apple Music', title: 'Apple Music Student', discount: '$5.99/mo (reg $10.99)', description: 'Full Apple Music catalog, Apple TV+ included free, Spatial Audio, lossless quality. Verify annually.', category: 'entertainment', verification: 'UNiDAYS', url: 'https://music.apple.com/subscribe/student', logo: '🎧', rating: 4.7, claims: 22100, trending: true, expiry: 'Up to 4 years' },
  { id: 'd20', brand: 'YouTube', title: 'YouTube Premium Student', discount: '$7.99/mo (reg $13.99)', description: 'Ad-free YouTube, YouTube Music Premium, background play, offline downloads. Verify through SheerID.', category: 'entertainment', verification: 'SheerID', url: 'https://www.youtube.com/premium/student', logo: '▶️', rating: 4.6, claims: 16400, trending: false, expiry: 'Up to 4 years' },
  { id: 'd21', brand: 'AMC Theatres', title: 'AMC Student Discount', discount: '$4 off tickets on Thursdays', description: 'Show valid student ID on Thursdays for discounted tickets. Combine with AMC Stubs for extra savings.', category: 'entertainment', verification: 'Student ID', url: 'https://www.amctheatres.com/', logo: '🎬', rating: 4.2, claims: 5400, trending: false, expiry: 'Ongoing' },

  // Travel
  { id: 'd22', brand: 'Amtrak', title: 'Amtrak Student Discount', discount: '15% off tickets', description: '15% off the lowest available rail fare on most Amtrak trains. Book through StudentUniverse or use student advantage card.', category: 'travel', verification: 'Student ID', url: 'https://www.amtrak.com/', logo: '🚂', rating: 4.3, claims: 3200, trending: false, expiry: 'Ongoing' },
  { id: 'd23', brand: 'Greyhound', title: 'Greyhound Student Discount', discount: '10-40% off bus tickets', description: 'Student discount on bus tickets across the US. Extra savings on advance bookings. Free WiFi on board.', category: 'travel', verification: 'Student ID', url: 'https://www.greyhound.com/en/deals-and-savings', logo: '🚌', rating: 4.0, claims: 2800, trending: false, expiry: 'Ongoing' },
  { id: 'd24', brand: 'StudentUniverse', title: 'StudentUniverse Flights', discount: 'Up to $30 off flights', description: 'Exclusive student fares on major airlines. Extra baggage allowance on some international flights. Price alerts.', category: 'travel', verification: '.edu email + ID', url: 'https://www.studentuniverse.com/', logo: '✈️', rating: 4.5, claims: 7600, trending: true, expiry: 'Ongoing' },

  // Education
  { id: 'd25', brand: 'Coursera', title: 'Coursera for Campus', discount: 'FREE courses', description: 'Access to 3,000+ courses and guided projects. Many universities provide free Coursera access — check with your school.', category: 'education', verification: '.edu email', url: 'https://www.coursera.org/campus', logo: '🎓', rating: 4.7, claims: 14200, trending: true, expiry: 'Ongoing' },
  { id: 'd26', brand: 'Grammarly', title: 'Grammarly Premium Student', discount: 'Up to 40% off', description: 'Advanced grammar, plagiarism detection, tone suggestions, and full-sentence rewrites. Essential for papers.', category: 'education', verification: '.edu email', url: 'https://www.grammarly.com/edu', logo: '✍️', rating: 4.6, claims: 9800, trending: false, expiry: 'Ongoing' },
  { id: 'd27', brand: 'Canva', title: 'Canva Pro for Education', discount: 'FREE', description: 'Full Canva Pro free for students. 100M+ templates, brand kit, background remover, magic resize, 1TB storage.', category: 'education', verification: '.edu email', url: 'https://www.canva.com/education/', logo: '🎨', rating: 4.8, claims: 17500, trending: true, expiry: 'Ongoing' },

  // Fitness
  { id: 'd28', brand: 'Planet Fitness', title: 'Planet Fitness Student', discount: '$1 enrollment + $15/mo', description: 'No enrollment fee promotions for students. Classic membership at $15/mo with access to any location.', category: 'fitness', verification: 'Student ID', url: 'https://www.planetfitness.com/', logo: '💪', rating: 4.2, claims: 4500, trending: false, expiry: 'Ongoing' },
  { id: 'd29', brand: 'Headspace', title: 'Headspace Student Plan', discount: '$9.99/year (reg $69.99)', description: 'Full Headspace library — meditation, sleep, focus music, and mindfulness exercises. 85% off for students.', category: 'fitness', verification: 'SheerID', url: 'https://www.headspace.com/studentplan', logo: '🧘', rating: 4.7, claims: 8200, trending: true, expiry: 'Ongoing' },

  // Fashion
  { id: 'd30', brand: 'Nike', title: 'Nike Student Discount', discount: '10% off', description: '10% off full-price items at Nike.com and Nike stores. Verify through UNiDAYS. Stacks with sale items sometimes.', category: 'fashion', verification: 'UNiDAYS', url: 'https://www.nike.com/help/a/student-discount', logo: '👟', rating: 4.4, claims: 11200, trending: false, expiry: 'Ongoing' },
  { id: 'd31', brand: 'Adidas', title: 'Adidas Student Discount', discount: '30% off', description: '30% off full-price items with UNiDAYS verification. One of the best student fashion discounts available.', category: 'fashion', verification: 'UNiDAYS', url: 'https://www.adidas.com/us/discount-programs', logo: '👟', rating: 4.6, claims: 9800, trending: true, expiry: 'Ongoing' },
  { id: 'd32', brand: 'ASOS', title: 'ASOS Student Discount', discount: '10% off everything', description: '10% off all orders with ASOS student discount. Verify through UNiDAYS. Free shipping on orders over $50.', category: 'fashion', verification: 'UNiDAYS', url: 'https://www.asos.com/us/student-discount/', logo: '👗', rating: 4.3, claims: 7400, trending: false, expiry: 'Ongoing' },

  // Finance
  { id: 'd33', brand: 'Chase', title: 'Chase College Checking', discount: '$100 bonus', description: '$100 bonus for opening a Chase College Checking account. No monthly fee for 5 years. Free debit card, Zelle, mobile deposit.', category: 'finance', verification: 'Student ID + .edu email', url: 'https://account.chase.com/consumer/banking/college', logo: '🏦', rating: 4.5, claims: 6700, trending: true, expiry: 'Ongoing' },
  { id: 'd34', brand: 'Discover', title: 'Discover Student Card', discount: '$20 cashback + 5% rotating', description: 'No annual fee, $20 statement credit, 5% cashback on rotating categories, 1% on everything else. Good Match guarantee.', category: 'finance', verification: 'Student status', url: 'https://www.discover.com/credit-cards/student/', logo: '💳', rating: 4.6, claims: 5400, trending: false, expiry: 'Ongoing' },
]

export default function StudentDiscounts() {
  const { student } = useApp()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [showVerified, setShowVerified] = useState(false)
  const [sortBy, setSortBy] = useState('trending')
  const [expandedId, setExpandedId] = useState(null)
  const [claimedDeals, setClaimedDeals] = useState(() => {
    const saved = localStorage.getItem('studentnest_claimed_deals')
    return saved ? JSON.parse(saved) : []
  })

  const isVerified = student?.email?.endsWith('.edu')

  const filteredDeals = useMemo(() => {
    let deals = [...STUDENT_DISCOUNTS]
    if (category !== 'all') deals = deals.filter(d => d.category === category)
    if (search.trim()) {
      const q = search.toLowerCase()
      deals = deals.filter(d =>
        d.brand.toLowerCase().includes(q) ||
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
      )
    }
    if (showVerified) deals = deals.filter(d => d.verification.includes('.edu'))
    if (sortBy === 'trending') deals.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0))
    else if (sortBy === 'az') deals.sort((a, b) => a.brand.localeCompare(b.brand))
    else if (sortBy === 'category') deals.sort((a, b) => a.category.localeCompare(b.category))
    return deals
  }, [category, search, showVerified, sortBy])

  const claimDeal = (dealId) => {
    const updated = claimedDeals.includes(dealId)
      ? claimedDeals.filter(id => id !== dealId)
      : [...claimedDeals, dealId]
    setClaimedDeals(updated)
    localStorage.setItem('studentnest_claimed_deals', JSON.stringify(updated))
  }

  // Daily rotation — different featured deals every day
  const daySeed = getDaySeed()
  const todaysDeals = useMemo(() => {
    const shuffled = shuffleWithSeed(STUDENT_DISCOUNTS, daySeed)
    return shuffled.slice(0, 6)
  }, [daySeed])
  const dailyDealOfDay = todaysDeals[0]
  const nextRefresh = useMemo(() => {
    const now = new Date()
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    const diff = tomorrow - now
    const hrs = Math.floor(diff / (1000 * 60 * 60))
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${hrs}h ${mins}m`
  }, [])

  if (!student) return null

  return (
    <div>
      <Navbar />
      <div style={S.page}>
        <div className="container">
          {/* Hero */}
          <div style={S.hero}>
            <div style={S.heroContent}>
              <div style={S.heroBadge}>
                <Tag size={14} />
                <span>Student Exclusive</span>
              </div>
              <h1 style={S.heroTitle}>Student Discounts</h1>
              <p style={S.heroDesc}>
                Save hundreds with verified student deals from top brands. All you need is your <strong>.edu email</strong> or student ID.
              </p>
              <div style={S.heroStats}>
                <div style={S.heroStat}>
                  <span style={S.heroStatNum}>{STUDENT_DISCOUNTS.length}</span>
                  <span style={S.heroStatLabel}>Real Deals</span>
                </div>
                <div style={S.heroStatDivider} />
                <div style={S.heroStat}>
                  <span style={S.heroStatNum}>{DISCOUNT_CATEGORIES.length - 1}</span>
                  <span style={S.heroStatLabel}>Categories</span>
                </div>
                <div style={S.heroStatDivider} />
                <div style={S.heroStat}>
                  <span style={S.heroStatNum}>{claimedDeals.length}</span>
                  <span style={S.heroStatLabel}>Your Claims</span>
                </div>
              </div>
              {isVerified && (
                <div style={S.verifiedBadge}>
                  <BadgeCheck size={16} />
                  <span>Verified Student — {student.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Deal of the Day */}
          {dailyDealOfDay && (
            <div style={S.dealOfDay}>
              <div style={S.dealOfDayHeader}>
                <div style={S.dealOfDayBadge}>
                  <Sparkles size={14} />
                  <span>Deal of the Day</span>
                </div>
                <div style={S.dealOfDayTimer}>
                  <Clock size={12} />
                  <span>Refreshes in {nextRefresh}</span>
                </div>
              </div>
              <div style={S.dealOfDayContent}>
                <div style={S.dealOfDayLogo}>{dailyDealOfDay.logo}</div>
                <div style={{ flex: 1 }}>
                  <div style={S.dealOfDayBrand}>{dailyDealOfDay.brand}</div>
                  <div style={S.dealOfDayTitle}>{dailyDealOfDay.title}</div>
                  <div style={S.dealOfDayDiscount}>{dailyDealOfDay.discount}</div>
                </div>
                <a href={dailyDealOfDay.url} target="_blank" rel="noopener noreferrer" style={S.dealOfDayBtn}>
                  Get Deal <ExternalLink size={12} />
                </a>
              </div>
            </div>
          )}

          {/* Today's Picks — rotates daily */}
          <div style={S.section}>
            <h2 style={S.sectionTitle}>
              <RefreshCw size={16} color="#f59e0b" />
              Today's Picks
              <span style={S.dailyNote}>Updates daily</span>
            </h2>
            <div style={S.trendingScroll}>
              {todaysDeals.map(deal => (
                <a key={deal.id} href={deal.url} target="_blank" rel="noopener noreferrer" style={S.trendingCard}>
                  <div style={S.trendingLogo}>{deal.logo}</div>
                  <div style={S.trendingBrand}>{deal.brand}</div>
                  <div style={S.trendingDiscount}>{deal.discount}</div>
                  <div style={S.trendingClaims}>{deal.verification}</div>
                </a>
              ))}
            </div>
          </div>

          {/* Search & Filters */}
          <div style={S.controls}>
            <div style={S.searchWrap}>
              <Search size={16} color="#94a3b8" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search brands, deals..."
                style={S.searchInput}
              />
            </div>
            <div style={S.filterRow}>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={S.select}>
                <option value="trending">Trending First</option>
                <option value="az">A → Z</option>
                <option value="category">By Category</option>
              </select>
              <button
                onClick={() => setShowVerified(!showVerified)}
                style={{ ...S.filterToggle, ...(showVerified ? S.filterToggleActive : {}) }}
              >
                <BadgeCheck size={14} />
                <span>.edu only</span>
              </button>
            </div>
          </div>

          {/* Category chips */}
          <div style={S.categories}>
            {DISCOUNT_CATEGORIES.map(cat => {
              const Icon = cat.icon
              const active = category === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  style={{ ...S.catChip, ...(active ? S.catChipActive : {}) }}
                >
                  <Icon size={14} />
                  <span>{cat.label}</span>
                </button>
              )
            })}
          </div>

          {/* Results count */}
          <div style={S.resultCount}>
            {filteredDeals.length} deal{filteredDeals.length !== 1 ? 's' : ''} found
          </div>

          {/* Deals grid */}
          <div style={S.grid}>
            {filteredDeals.map(deal => {
              const claimed = claimedDeals.includes(deal.id)
              const expanded = expandedId === deal.id
              return (
                <div key={deal.id} style={S.card}>
                  <div style={S.cardTop}>
                    <div style={S.cardLogo}>{deal.logo}</div>
                    <div style={S.cardMeta}>
                      <div style={S.cardBrand}>
                        {deal.brand}
                        {deal.trending && <span style={S.trendBadge}>🔥 Trending</span>}
                      </div>
                      <div style={S.cardTitle}>{deal.title}</div>
                    </div>
                  </div>

                  <div style={S.discountBanner}>
                    <Percent size={14} />
                    <span>{deal.discount}</span>
                  </div>

                  <p style={{ ...S.cardDesc, ...(expanded ? { WebkitLineClamp: 'unset' } : {}) }}>
                    {deal.description}
                  </p>

                  {deal.description.length > 100 && (
                    <button onClick={() => setExpandedId(expanded ? null : deal.id)} style={S.readMore}>
                      {expanded ? 'Show less' : 'Read more'}
                    </button>
                  )}

                  <div style={S.cardInfo}>
                    <div style={S.cardInfoItem}>
                      <CheckCircle2 size={12} color="#0f766e" />
                      <span>Verify: {deal.verification}</span>
                    </div>
                    <div style={S.cardInfoItem}>
                      <span>Expires: {deal.expiry}</span>
                    </div>
                  </div>

                  <div style={S.cardActions}>
                    <a href={deal.url} target="_blank" rel="noopener noreferrer" style={S.getBtn}>
                      <ExternalLink size={14} />
                      <span>Get Deal</span>
                    </a>
                    <button onClick={() => claimDeal(deal.id)} style={{ ...S.claimBtn, ...(claimed ? S.claimedBtn : {}) }}>
                      {claimed ? <CheckCircle2 size={14} /> : <Gift size={14} />}
                      <span>{claimed ? 'Claimed' : 'Claim'}</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredDeals.length === 0 && (
            <div style={S.empty}>
              <Search size={40} color="#cbd5e1" />
              <p style={S.emptyText}>No deals found. Try a different search or category.</p>
            </div>
          )}

          {/* Info section */}
          <div style={S.infoSection}>
            <h3 style={S.infoTitle}>How to Verify Your Student Status</h3>
            <div style={S.infoGrid}>
              <div style={S.infoCard}>
                <div style={S.infoIcon}>📧</div>
                <h4 style={S.infoCardTitle}>.edu Email</h4>
                <p style={S.infoCardDesc}>Most deals verify instantly with your university email address ending in .edu</p>
              </div>
              <div style={S.infoCard}>
                <div style={S.infoIcon}>🪪</div>
                <h4 style={S.infoCardTitle}>Student ID</h4>
                <p style={S.infoCardDesc}>Upload a photo of your valid student ID card for in-store and some online deals</p>
              </div>
              <div style={S.infoCard}>
                <div style={S.infoIcon}>✅</div>
                <h4 style={S.infoCardTitle}>UNiDAYS / SheerID</h4>
                <p style={S.infoCardDesc}>Many brands use UNiDAYS or SheerID to verify — create a free account once</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

const S = {
  page: { paddingBottom: 60 },
  hero: {
    background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 50%, #14b8a6 100%)',
    borderRadius: 24, padding: '40px 32px', marginBottom: 32, marginTop: 24,
  },
  heroContent: { maxWidth: 600 },
  heroBadge: {
    display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px',
    borderRadius: 100, background: 'rgba(255,255,255,0.2)', color: 'white',
    fontSize: 13, fontWeight: 600, marginBottom: 16,
  },
  heroTitle: {
    fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800,
    color: 'white', marginBottom: 12, letterSpacing: '-0.02em',
  },
  heroDesc: { fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: 24 },
  heroStats: { display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16 },
  heroStat: { display: 'flex', flexDirection: 'column' },
  heroStatNum: { fontSize: 22, fontWeight: 800, color: 'white', fontFamily: 'var(--font-display)' },
  heroStatLabel: { fontSize: 12, color: 'rgba(255,255,255,0.7)' },
  heroStatDivider: { width: 1, height: 32, background: 'rgba(255,255,255,0.2)' },
  verifiedBadge: {
    display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px',
    borderRadius: 100, background: 'rgba(255,255,255,0.2)', color: 'white',
    fontSize: 13, fontWeight: 600, marginTop: 8,
  },
  dealOfDay: {
    background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderRadius: 18,
    padding: 20, marginBottom: 28, border: '1px solid rgba(245,158,11,0.3)',
  },
  dealOfDayHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14,
  },
  dealOfDayBadge: {
    display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700,
    color: '#92400e', fontFamily: 'var(--font-display)',
  },
  dealOfDayTimer: {
    display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#a16207', fontWeight: 500,
  },
  dealOfDayContent: {
    display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
  },
  dealOfDayLogo: { fontSize: 40 },
  dealOfDayBrand: { fontSize: 13, fontWeight: 600, color: '#92400e' },
  dealOfDayTitle: { fontSize: 17, fontWeight: 700, color: '#78350f', fontFamily: 'var(--font-display)' },
  dealOfDayDiscount: { fontSize: 14, fontWeight: 700, color: '#b45309', marginTop: 2 },
  dealOfDayBtn: {
    display: 'flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 12,
    background: '#92400e', color: 'white', fontSize: 14, fontWeight: 600,
    textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0,
  },
  dailyNote: {
    fontSize: 11, fontWeight: 500, color: '#94a3b8', marginLeft: 4,
    padding: '2px 8px', borderRadius: 100, background: '#f1f5f9',
  },
  section: { marginBottom: 32 },
  sectionTitle: {
    fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700,
    color: '#0f172a', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8,
  },
  trendingScroll: {
    display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8,
    scrollbarWidth: 'none', msOverflowStyle: 'none',
  },
  trendingCard: {
    minWidth: 140, padding: '16px 14px', borderRadius: 16,
    background: 'linear-gradient(135deg, #fef3c7, #fde68a)', textDecoration: 'none',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
    transition: 'transform 0.2s', cursor: 'pointer', flexShrink: 0,
    border: '1px solid rgba(245,158,11,0.2)',
  },
  trendingLogo: { fontSize: 28 },
  trendingBrand: { fontSize: 13, fontWeight: 700, color: '#92400e' },
  trendingDiscount: { fontSize: 11, fontWeight: 600, color: '#b45309', textAlign: 'center' },
  trendingClaims: { fontSize: 10, color: '#a16207' },
  controls: { display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 },
  searchWrap: {
    display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px',
    borderRadius: 14, border: '1.5px solid #e2e8f0', background: 'white',
  },
  searchInput: {
    flex: 1, border: 'none', outline: 'none', fontSize: 14,
    fontFamily: 'inherit', color: '#0f172a', background: 'transparent',
  },
  filterRow: { display: 'flex', gap: 8, alignItems: 'center' },
  select: {
    padding: '8px 12px', borderRadius: 10, border: '1.5px solid #e2e8f0',
    fontSize: 13, fontFamily: 'inherit', color: '#475569', background: 'white',
    cursor: 'pointer', outline: 'none',
  },
  filterToggle: {
    display: 'flex', alignItems: 'center', gap: 5, padding: '8px 14px',
    borderRadius: 10, border: '1.5px solid #e2e8f0', background: 'white',
    fontSize: 13, fontWeight: 500, color: '#64748b', cursor: 'pointer',
  },
  filterToggleActive: {
    background: '#f0fdfa', borderColor: '#0f766e', color: '#0f766e', fontWeight: 600,
  },
  categories: {
    display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 8, marginBottom: 16,
    scrollbarWidth: 'none', msOverflowStyle: 'none',
  },
  catChip: {
    display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px',
    borderRadius: 100, border: '1.5px solid #e2e8f0', background: 'white',
    fontSize: 12, fontWeight: 500, color: '#64748b', cursor: 'pointer',
    whiteSpace: 'nowrap', transition: 'all 0.2s', flexShrink: 0,
  },
  catChipActive: {
    background: '#0f766e', borderColor: '#0f766e', color: 'white', fontWeight: 600,
  },
  resultCount: { fontSize: 13, color: '#94a3b8', marginBottom: 16 },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: 16, marginBottom: 40,
  },
  card: {
    background: 'white', borderRadius: 18, border: '1px solid #e2e8f0',
    padding: 20, transition: 'all 0.2s',
  },
  cardTop: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 },
  cardLogo: {
    width: 48, height: 48, borderRadius: 14, background: '#f8fafc',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 24, flexShrink: 0, border: '1px solid #f1f5f9',
  },
  cardMeta: { flex: 1, minWidth: 0 },
  cardBrand: {
    fontSize: 13, fontWeight: 700, color: '#0f172a',
    display: 'flex', alignItems: 'center', gap: 8,
  },
  trendBadge: {
    fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 100,
    background: '#fef3c7', color: '#92400e',
  },
  cardTitle: { fontSize: 12, color: '#64748b', marginTop: 2 },
  discountBanner: {
    display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px',
    borderRadius: 10, background: '#f0fdfa', color: '#0f766e',
    fontSize: 15, fontWeight: 700, marginBottom: 12,
    fontFamily: 'var(--font-display)',
  },
  cardDesc: {
    fontSize: 13, color: '#475569', lineHeight: 1.6, marginBottom: 8,
    display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  readMore: {
    background: 'none', border: 'none', color: '#0f766e', fontSize: 12,
    fontWeight: 600, cursor: 'pointer', padding: 0, marginBottom: 12,
  },
  cardInfo: {
    display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14,
    flexWrap: 'wrap',
  },
  cardInfoItem: {
    display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#64748b',
  },
  claimCount: { color: '#94a3b8' },
  cardActions: { display: 'flex', gap: 8, marginBottom: 8 },
  getBtn: {
    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    padding: '10px 16px', borderRadius: 12, background: '#0f766e', color: 'white',
    fontSize: 13, fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s',
    border: 'none', cursor: 'pointer',
  },
  claimBtn: {
    display: 'flex', alignItems: 'center', gap: 5, padding: '10px 16px',
    borderRadius: 12, border: '1.5px solid #e2e8f0', background: 'white',
    fontSize: 13, fontWeight: 600, color: '#475569', cursor: 'pointer',
    transition: 'all 0.2s',
  },
  claimedBtn: {
    background: '#f0fdfa', borderColor: '#0f766e', color: '#0f766e',
  },
  cardExpiry: { fontSize: 11, color: '#94a3b8' },
  empty: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: 12, padding: '60px 20px',
  },
  emptyText: { fontSize: 14, color: '#94a3b8' },
  infoSection: { marginBottom: 40 },
  infoTitle: {
    fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700,
    color: '#0f172a', marginBottom: 16,
  },
  infoGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12,
  },
  infoCard: {
    padding: 20, borderRadius: 16, background: '#f8fafc',
    border: '1px solid #f1f5f9', textAlign: 'center',
  },
  infoIcon: { fontSize: 32, marginBottom: 8 },
  infoCardTitle: { fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 4 },
  infoCardDesc: { fontSize: 12, color: '#64748b', lineHeight: 1.5 },
}
