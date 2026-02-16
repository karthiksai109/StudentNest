import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Smartphone, CreditCard, Bus, Wifi, ShoppingBag, Users, Building2, GraduationCap, ExternalLink, Star, Check, ChevronDown, ChevronUp, DollarSign, MapPin, Clock, ArrowRight, Shield } from 'lucide-react'

const SIM_PLANS = [
  {
    carrier: 'Mint Mobile',
    logo: '🟢',
    plans: [
      { name: 'Starter', data: '5GB', price: 15, features: ['Unlimited Talk & Text', '5G Access', 'Free Hotspot'] },
      { name: 'Unlimited', data: '15GB', price: 20, features: ['Unlimited Talk & Text', '5G Access', '10GB Hotspot', 'Free Intl Calls to 80+ countries'] },
      { name: 'Premium', data: '20GB', price: 25, features: ['Unlimited Talk & Text', '5G Access', '15GB Hotspot', 'Free Intl Calls'] },
      { name: 'Unlimited Premium', data: '40GB', price: 30, features: ['Unlimited Talk & Text', '5G Access', '20GB Hotspot', 'Free Intl Calls', '3 months free trial'] },
    ],
    pros: ['Cheapest plans available', 'Runs on T-Mobile network', '3-month free trial for new users', 'No contract'],
    cons: ['Must prepay 3-12 months for best rates', 'No physical stores'],
    bestFor: 'Budget-conscious students who want the cheapest reliable plan',
    link: 'https://www.mintmobile.com',
    rating: 4.5,
  },
  {
    carrier: 'T-Mobile',
    logo: '🟣',
    plans: [
      { name: 'Essentials', data: '50GB', price: 50, features: ['Unlimited Talk, Text & Data', '5G Access', 'Scam Shield', 'T-Mobile Tuesdays'] },
      { name: 'Go5G', data: '100GB', price: 60, features: ['Unlimited Talk, Text & Data', '5G Access', '15GB Hotspot', 'Netflix Basic included'] },
      { name: 'Go5G Plus', data: 'Unlimited', price: 75, features: ['Unlimited Everything', '50GB Hotspot', 'Netflix Standard', 'Intl Data & Text'] },
    ],
    pros: ['Best 5G coverage', 'Netflix included on higher plans', 'Physical stores everywhere', 'International roaming'],
    cons: ['More expensive than MVNOs', 'Essentials plan deprioritized'],
    bestFor: 'Students who want reliable coverage and don\'t mind paying more',
    link: 'https://www.t-mobile.com',
    rating: 4.3,
  },
  {
    carrier: 'Visible (by Verizon)',
    logo: '🔵',
    plans: [
      { name: 'Visible', data: 'Unlimited', price: 25, features: ['Unlimited Talk, Text & Data', '5G Access', '5GB Hotspot', 'No contract'] },
      { name: 'Visible+', data: 'Unlimited', price: 45, features: ['Unlimited Everything', '50GB Premium Data', 'Intl Calling to 30+ countries', '10GB Intl Data'] },
    ],
    pros: ['Runs on Verizon network', 'Truly unlimited data', 'No contract', 'eSIM support'],
    cons: ['Data may be deprioritized', 'Online-only (no stores)'],
    bestFor: 'Students who want unlimited data on Verizon\'s network at a low price',
    link: 'https://www.visible.com',
    rating: 4.2,
  },
  {
    carrier: 'Google Fi',
    logo: '🔴',
    plans: [
      { name: 'Flexible', data: 'Pay per GB', price: 20, features: ['$10/GB used', 'Bill protection at $60', 'Free intl texting', 'Works in 200+ countries'] },
      { name: 'Simply Unlimited', data: 'Unlimited', price: 35, features: ['Unlimited Data', '5G Access', '5GB Hotspot', 'Intl texting'] },
      { name: 'Unlimited Plus', data: 'Unlimited', price: 50, features: ['Unlimited Data', '50GB Full Speed', 'Intl Data in 200+ countries', '100GB Google One'] },
    ],
    pros: ['Works internationally in 200+ countries', 'Flexible pay-per-use option', 'Google One storage included', 'eSIM support'],
    cons: ['Best with Google Pixel phones', 'Flexible plan can get expensive with heavy use'],
    bestFor: 'Students who travel internationally or want flexibility',
    link: 'https://fi.google.com',
    rating: 4.4,
  },
]

const BANK_ACCOUNTS = [
  {
    bank: 'Chase',
    logo: '🏦',
    type: 'Chase College Checking',
    monthlyFee: '$0 (for students under 24)',
    minBalance: '$0',
    features: ['No monthly fee for 5 years', 'Zelle built-in', '16,000 ATMs nationwide', 'Mobile check deposit', 'Chase QuickPay', 'Apple/Google Pay'],
    bonus: '$100 sign-up bonus with direct deposit',
    requirements: ['Valid passport or ID', 'Student visa (F-1/J-1)', 'University enrollment letter', 'SSN or ITIN (can apply without)'],
    pros: ['Largest ATM network', 'Great mobile app', 'Easy to open in-branch', 'Sign-up bonus'],
    cons: ['$12/mo fee after graduation', 'International wire fees $45'],
    link: 'https://www.chase.com/personal/checking/student-checking',
    rating: 4.4,
  },
  {
    bank: 'Bank of America',
    logo: '🏛️',
    type: 'Advantage SafePass for Students',
    monthlyFee: '$0 (for students under 24)',
    minBalance: '$0',
    features: ['No monthly fee while enrolled', 'Zelle built-in', '16,000 ATMs', 'Mobile banking', 'Customizable alerts', 'Virtual card numbers'],
    bonus: '$100 bonus with qualifying direct deposit',
    requirements: ['Valid passport', 'Student visa', 'I-20 form', 'University acceptance letter'],
    pros: ['No overdraft fees', 'Good mobile app', 'Many branches', 'Student credit card available'],
    cons: ['$12/mo fee after student status ends', 'Limited international features'],
    link: 'https://www.bankofamerica.com/deposits/student-banking/',
    rating: 4.2,
  },
  {
    bank: 'Discover',
    logo: '🟠',
    type: 'Discover Cashback Debit',
    monthlyFee: '$0',
    minBalance: '$0',
    features: ['1% cashback on debit purchases', 'No monthly fees ever', '60,000+ fee-free ATMs', 'No overdraft fees', 'Mobile deposit', 'FDIC insured'],
    bonus: 'No sign-up bonus, but 1% cashback on all debit purchases',
    requirements: ['SSN required', 'Valid ID', 'US address'],
    pros: ['1% cashback on debit', 'No fees ever', 'Great customer service', 'Large ATM network'],
    cons: ['Need SSN to open', 'No physical branches', 'Fewer international features'],
    link: 'https://www.discover.com/online-banking/checking/',
    rating: 4.3,
  },
  {
    bank: 'Mercury (for entrepreneurs)',
    logo: '🚀',
    type: 'Mercury Checking',
    monthlyFee: '$0',
    minBalance: '$0',
    features: ['No monthly fees', 'Virtual & physical debit cards', 'Team banking', 'API access', 'FDIC insured up to $5M', 'International wires'],
    bonus: 'No sign-up bonus',
    requirements: ['US-based business or LLC', 'EIN number', 'Valid ID'],
    pros: ['Best for student startups', 'Modern interface', 'Free international wires', 'Great API'],
    cons: ['Business account only', 'No physical branches', 'Need EIN'],
    link: 'https://mercury.com',
    rating: 4.6,
  },
]

const TRANSIT_GUIDES = {
  Austin: { system: 'Capital Metro', pass: 'Student Semester Pass', price: '$0 (included in tuition at UT)', features: ['All local buses', 'MetroRail Red Line', 'MetroRapid routes', 'Night Owl service'], app: 'CapMetro App', link: 'https://www.capmetro.org', tips: ['Route 801/803 MetroRapid is fastest', 'Night Owl runs Fri/Sat until 3 AM', 'Bike racks on all buses', 'Free with UT student ID'] },
  Cambridge: { system: 'MBTA (The T)', pass: 'Student CharlieCard', price: '$90/month (Semester pass ~$405)', features: ['All subway lines', 'Local buses', 'Commuter rail zones 1-2', 'Ferry'], app: 'mTicket App', link: 'https://www.mbta.com', tips: ['Red Line connects Harvard/MIT to Boston', 'Get a CharlieCard (not CharlieTicket) for lower fares', 'Bus 1 runs along Mass Ave', 'Semester pass saves ~30%'] },
  'New York': { system: 'MTA', pass: 'OMNY / MetroCard', price: '$33/week unlimited or $127/month', features: ['All subway lines', 'Local buses', 'Staten Island Railway', 'OMNY tap-to-pay'], app: 'MYmta App', link: 'https://new.mta.info', tips: ['Get unlimited monthly MetroCard', 'OMNY auto-caps at $33/week', 'Express buses cost extra', 'Citibike $8.95/mo for students'] },
  'Ann Arbor': { system: 'TheRide (AAATA)', pass: 'MCard Bus Pass', price: '$0 (included in tuition at UMich)', features: ['All local routes', 'Express routes', 'Night Ride service', 'AirRide to DTW airport'], app: 'TheRide App', link: 'https://www.theride.org', tips: ['Free with UMich MCard', 'Route 4 goes to Briarwood Mall', 'AirRide to Detroit Airport is $12', 'Blue buses run every 10 min on campus'] },
  'Los Angeles': { system: 'LA Metro', pass: 'Student TAP Card', price: '$50/month (reduced fare)', features: ['All Metro Rail lines', 'Metro buses', 'Reduced fare', 'TAP card'], app: 'Transit App', link: 'https://www.metro.net', tips: ['Get reduced fare TAP card with student ID', 'Expo Line connects UCLA area to downtown', 'Big Blue Bus also serves Westwood', 'Metro Bike Share $5/month for students'] },
  Atlanta: { system: 'MARTA', pass: 'Breeze Card', price: '$68.50/month (Student discount available)', features: ['All rail lines', 'Local buses', 'Paratransit', 'Breeze Card'], app: 'MARTA On The Go', link: 'https://www.itsmarta.com', tips: ['GT offers Stinger shuttle for free', 'Midtown station is closest to GT', 'MARTA connects to airport', 'Monthly pass saves vs per-ride'] },
  Seattle: { system: 'King County Metro + Sound Transit', pass: 'ORCA Card', price: '$0 (U-PASS included at UW)', features: ['All Metro buses', 'Link Light Rail', 'Sound Transit Express', 'Water Taxi'], app: 'Transit App', link: 'https://www.orcacard.com', tips: ['U-PASS is free with UW enrollment', 'Link Light Rail to airport is $3', 'Route 44 connects U-District to Ballard', 'Water Taxi to West Seattle is fun'] },
  default: { system: 'Local Transit', pass: 'Student Pass', price: 'Check with your university', features: ['Local buses', 'Rail if available', 'Student discounts'], app: 'Google Maps / Transit App', link: 'https://www.google.com/maps', tips: ['Most universities offer discounted transit', 'Download Transit or Google Maps for real-time arrivals', 'Check if your tuition includes a transit pass'] },
}

const INTERNET_PROVIDERS = [
  { name: 'Xfinity (Comcast)', speed: '200-1200 Mbps', price: '$25-$80/mo', studentDeal: '$25/mo for 200 Mbps (student deal)', features: ['Free Peacock Premium', 'xFi Gateway router included', 'No contract options', 'Nationwide hotspots'], link: 'https://www.xfinity.com', rating: 3.8 },
  { name: 'AT&T Fiber', speed: '300-5000 Mbps', price: '$55-$180/mo', studentDeal: '$55/mo for 300 Mbps', features: ['Symmetric upload/download', 'No data caps on fiber', 'HBO Max included on some plans', 'Free equipment'], link: 'https://www.att.com/internet/', rating: 4.1 },
  { name: 'T-Mobile 5G Home Internet', speed: '33-245 Mbps', price: '$50/mo', studentDeal: '$50/mo flat (no student discount but no contract)', features: ['No contract', 'No installation needed', 'Plug-and-play gateway', 'Price lock guarantee'], link: 'https://www.t-mobile.com/home-internet', rating: 4.0 },
  { name: 'Starry Internet', speed: '200-1000 Mbps', price: '$30-$80/mo', studentDeal: '$30/mo for 200 Mbps in select buildings', features: ['No contracts', 'No hidden fees', 'Free equipment', 'Available in select cities'], link: 'https://www.starry.com', rating: 4.3 },
]

const ESSENTIALS_CHECKLIST = [
  { category: 'Kitchen Basics', items: [
    { name: 'Rice Cooker (Instant Pot Duo)', price: '$60-$90', where: 'Amazon, Target, Walmart', tip: 'The Instant Pot is the #1 international student purchase. Makes rice, dal, soup, and more.' },
    { name: 'Basic Cookware Set', price: '$30-$50', where: 'Walmart, IKEA, Amazon', tip: 'Get a non-stick pan, saucepan, and a pot. IKEA 365+ set is great value.' },
    { name: 'Spice Starter Kit', price: '$15-$25', where: 'Indian/Asian grocery store', tip: 'Buy from ethnic grocery stores — 3x cheaper than Walmart for spices.' },
    { name: 'Electric Kettle', price: '$15-$25', where: 'Amazon, Walmart', tip: 'Essential for tea, instant noodles, and quick boiling water.' },
    { name: 'Food Storage Containers', price: '$10-$15', where: 'IKEA, Dollar Tree, Walmart', tip: 'Glass containers are better for reheating. Get a 10-piece set.' },
  ]},
  { category: 'Bedroom & Living', items: [
    { name: 'Mattress Topper', price: '$30-$60', where: 'Amazon, Walmart', tip: 'University mattresses are thin. A 2-inch memory foam topper makes a huge difference.' },
    { name: 'Bedding Set (Twin XL)', price: '$25-$40', where: 'Amazon, Target, Walmart', tip: 'Most dorm beds are Twin XL. Check before buying.' },
    { name: 'Desk Lamp', price: '$15-$25', where: 'IKEA, Amazon', tip: 'Get one with adjustable brightness. LED saves electricity.' },
    { name: 'Power Strip with USB', price: '$10-$15', where: 'Amazon, Walmart', tip: 'Get one with surge protection and USB-A/C ports.' },
  ]},
  { category: 'Tech & Connectivity', items: [
    { name: 'Universal Power Adapter', price: '$10-$15', where: 'Amazon', tip: 'If bringing devices from home, get a universal adapter with USB ports.' },
    { name: 'Portable Charger (10000mAh+)', price: '$15-$25', where: 'Amazon, Best Buy', tip: 'Anker PowerCore is the most reliable. Get 10000mAh minimum.' },
    { name: 'Ethernet Cable (6ft)', price: '$5-$8', where: 'Amazon, Walmart', tip: 'Wired internet is faster and more reliable for classes and exams.' },
  ]},
  { category: 'Winter Gear (Cold Cities)', items: [
    { name: 'Winter Jacket', price: '$50-$150', where: 'Uniqlo, Amazon, Burlington', tip: 'Uniqlo Ultra Light Down is great value. Layer with a windbreaker.' },
    { name: 'Thermal Base Layer', price: '$15-$25', where: 'Uniqlo, Amazon', tip: 'Uniqlo Heattech is the gold standard for affordable thermals.' },
    { name: 'Waterproof Boots', price: '$40-$80', where: 'Amazon, DSW, Walmart', tip: 'Essential for snow. Columbia and Sorel are popular student choices.' },
  ]},
]

const CATEGORIES = [
  { id: 'sim', icon: Smartphone, label: 'SIM & Phone', color: '#0f766e', bg: '#f0fdfa' },
  { id: 'bank', icon: CreditCard, label: 'Bank Account', color: '#7c3aed', bg: '#f5f3ff' },
  { id: 'transit', icon: Bus, label: 'Transit Pass', color: '#0369a1', bg: '#f0f9ff' },
  { id: 'internet', icon: Wifi, label: 'Internet', color: '#ea580c', bg: '#fff7ed' },
  { id: 'essentials', icon: ShoppingBag, label: 'Essentials', color: '#dc2626', bg: '#fef2f2' },
]

export default function SettlementGuide() {
  const { student } = useApp()
  const [activeTab, setActiveTab] = useState('sim')
  const [expandedItems, setExpandedItems] = useState({})

  const toggleExpand = (key) => {
    setExpandedItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const city = student?.college?.city || 'Austin'
  const transit = TRANSIT_GUIDES[city] || TRANSIT_GUIDES.default

  if (!student) return null

  return (
    <div>
      <Navbar />
      <div className="container" style={{ paddingTop: 32, paddingBottom: 60 }}>
        <div style={s.header}>
          <h1 style={s.title}>Settlement Guide</h1>
          <p style={s.subtitle}>Everything you need to set up your life in {city}. Real prices, real links, real recommendations.</p>
        </div>

        {/* Category Tabs */}
        <div style={s.tabs}>
          {CATEGORIES.map(cat => {
            const Icon = cat.icon
            const active = activeTab === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                style={{
                  ...s.tab,
                  ...(active ? { background: cat.color, color: 'white', borderColor: cat.color } : {}),
                }}
              >
                <Icon size={16} />
                <span>{cat.label}</span>
              </button>
            )
          })}
        </div>

        {/* SIM Plans */}
        {activeTab === 'sim' && (
          <div>
            <div style={s.sectionIntro}>
              <Smartphone size={20} color="#0f766e" />
              <div>
                <h2 style={s.sectionTitle}>Phone Plans for Students</h2>
                <p style={s.sectionDesc}>Compare the best prepaid and postpaid plans. No SSN needed for most prepaid carriers.</p>
              </div>
            </div>
            <div style={s.tipBanner}>
              <Shield size={16} color="#0f766e" />
              <span><strong>Pro tip:</strong> Start with a prepaid plan (Mint Mobile or Visible). You can port your number to any carrier later. Most prepaid plans don't require SSN or credit history.</span>
            </div>
            <div style={s.cardGrid}>
              {SIM_PLANS.map((carrier, ci) => (
                <div key={ci} style={s.card}>
                  <div style={s.cardHeader}>
                    <div style={s.cardHeaderLeft}>
                      <span style={{ fontSize: 28 }}>{carrier.logo}</span>
                      <div>
                        <h3 style={s.cardName}>{carrier.carrier}</h3>
                        <div style={s.ratingRow}>
                          <Star size={13} fill="#f59e0b" color="#f59e0b" />
                          <span style={s.ratingText}>{carrier.rating}</span>
                        </div>
                      </div>
                    </div>
                    <a href={carrier.link} target="_blank" rel="noopener noreferrer" style={s.visitBtn}>
                      Visit <ExternalLink size={12} />
                    </a>
                  </div>

                  <p style={s.bestFor}><strong>Best for:</strong> {carrier.bestFor}</p>

                  <div style={s.plansGrid}>
                    {carrier.plans.map((plan, pi) => (
                      <div key={pi} style={s.planCard}>
                        <div style={s.planName}>{plan.name}</div>
                        <div style={s.planPrice}>${plan.price}<span style={s.planPer}>/mo</span></div>
                        <div style={s.planData}>{plan.data} data</div>
                        <div style={s.planFeatures}>
                          {plan.features.map((f, fi) => (
                            <div key={fi} style={s.planFeature}><Check size={11} color="#0f766e" /> {f}</div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button onClick={() => toggleExpand(`sim-${ci}`)} style={s.expandBtn}>
                    {expandedItems[`sim-${ci}`] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    {expandedItems[`sim-${ci}`] ? 'Less details' : 'Pros & Cons'}
                  </button>

                  {expandedItems[`sim-${ci}`] && (
                    <div style={s.prosConsGrid}>
                      <div style={s.prosCol}>
                        <h4 style={{ ...s.prosTitle, color: '#047857' }}>✅ Pros</h4>
                        {carrier.pros.map((p, i) => <div key={i} style={s.proItem}>{p}</div>)}
                      </div>
                      <div style={s.consCol}>
                        <h4 style={{ ...s.prosTitle, color: '#dc2626' }}>❌ Cons</h4>
                        {carrier.cons.map((c, i) => <div key={i} style={s.proItem}>{c}</div>)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bank Accounts */}
        {activeTab === 'bank' && (
          <div>
            <div style={s.sectionIntro}>
              <CreditCard size={20} color="#7c3aed" />
              <div>
                <h2 style={s.sectionTitle}>Student Bank Accounts</h2>
                <p style={s.sectionDesc}>Open a US bank account as an international student. Most banks accept passport + I-20.</p>
              </div>
            </div>
            <div style={s.tipBanner}>
              <Shield size={16} color="#0f766e" />
              <span><strong>Pro tip:</strong> Open your bank account within the first week. You'll need it for rent, groceries, and getting paid. Chase and Bank of America are easiest for international students — you can walk into a branch with your passport and I-20.</span>
            </div>
            <div style={s.cardGrid}>
              {BANK_ACCOUNTS.map((bank, bi) => (
                <div key={bi} style={s.card}>
                  <div style={s.cardHeader}>
                    <div style={s.cardHeaderLeft}>
                      <span style={{ fontSize: 28 }}>{bank.logo}</span>
                      <div>
                        <h3 style={s.cardName}>{bank.bank}</h3>
                        <div style={s.cardSubname}>{bank.type}</div>
                      </div>
                    </div>
                    <a href={bank.link} target="_blank" rel="noopener noreferrer" style={s.visitBtn}>
                      Apply <ExternalLink size={12} />
                    </a>
                  </div>

                  <div style={s.bankHighlights}>
                    <div style={s.bankHighlight}>
                      <DollarSign size={14} color="#0f766e" />
                      <span>Monthly Fee: <strong>{bank.monthlyFee}</strong></span>
                    </div>
                    <div style={s.bankHighlight}>
                      <DollarSign size={14} color="#0f766e" />
                      <span>Min Balance: <strong>{bank.minBalance}</strong></span>
                    </div>
                  </div>

                  {bank.bonus && <div style={s.bonusBadge}>🎁 {bank.bonus}</div>}

                  <div style={s.featuresList}>
                    {bank.features.map((f, fi) => (
                      <div key={fi} style={s.featureItem}><Check size={12} color="#0f766e" /> {f}</div>
                    ))}
                  </div>

                  <button onClick={() => toggleExpand(`bank-${bi}`)} style={s.expandBtn}>
                    {expandedItems[`bank-${bi}`] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    {expandedItems[`bank-${bi}`] ? 'Less details' : 'Requirements & Pros/Cons'}
                  </button>

                  {expandedItems[`bank-${bi}`] && (
                    <div>
                      <h4 style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>📋 Requirements</h4>
                      <div style={{ marginBottom: 16 }}>
                        {bank.requirements.map((r, ri) => (
                          <div key={ri} style={s.featureItem}><ArrowRight size={11} color="#64748b" /> {r}</div>
                        ))}
                      </div>
                      <div style={s.prosConsGrid}>
                        <div style={s.prosCol}>
                          <h4 style={{ ...s.prosTitle, color: '#047857' }}>✅ Pros</h4>
                          {bank.pros.map((p, i) => <div key={i} style={s.proItem}>{p}</div>)}
                        </div>
                        <div style={s.consCol}>
                          <h4 style={{ ...s.prosTitle, color: '#dc2626' }}>❌ Cons</h4>
                          {bank.cons.map((c, i) => <div key={i} style={s.proItem}>{c}</div>)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transit */}
        {activeTab === 'transit' && (
          <div>
            <div style={s.sectionIntro}>
              <Bus size={20} color="#0369a1" />
              <div>
                <h2 style={s.sectionTitle}>Transit Guide — {city}</h2>
                <p style={s.sectionDesc}>How to get around {city} as a student. Your transit system, passes, and tips.</p>
              </div>
            </div>

            <div style={s.transitCard}>
              <div style={s.transitHeader}>
                <div>
                  <h3 style={s.transitSystem}>{transit.system}</h3>
                  <div style={s.transitPass}>{transit.pass}</div>
                </div>
                <div style={s.transitPrice}>
                  <DollarSign size={16} />
                  <span>{transit.price}</span>
                </div>
              </div>

              <div style={s.transitFeatures}>
                <h4 style={s.transitFeatTitle}>What's Included</h4>
                {transit.features.map((f, i) => (
                  <div key={i} style={s.featureItem}><Check size={12} color="#0369a1" /> {f}</div>
                ))}
              </div>

              <div style={s.transitTips}>
                <h4 style={s.transitFeatTitle}>💡 Student Tips</h4>
                {transit.tips.map((t, i) => (
                  <div key={i} style={s.tipItem}>{t}</div>
                ))}
              </div>

              <div style={s.transitActions}>
                <a href={transit.link} target="_blank" rel="noopener noreferrer" style={s.transitBtn}>
                  Visit {transit.system} Website <ExternalLink size={14} />
                </a>
                <div style={s.transitApp}>
                  <Smartphone size={14} />
                  <span>Download: <strong>{transit.app}</strong></span>
                </div>
              </div>
            </div>

            <div style={s.tipBanner}>
              <Shield size={16} color="#0f766e" />
              <span><strong>Also consider:</strong> A bicycle is often the fastest way around campus. Check if your university has a bike-share program or buy a used bike from Facebook Marketplace ($50-$100).</span>
            </div>
          </div>
        )}

        {/* Internet */}
        {activeTab === 'internet' && (
          <div>
            <div style={s.sectionIntro}>
              <Wifi size={20} color="#ea580c" />
              <div>
                <h2 style={s.sectionTitle}>Home Internet Plans</h2>
                <p style={s.sectionDesc}>Set up WiFi at your apartment. Compare speeds, prices, and student deals.</p>
              </div>
            </div>
            <div style={s.tipBanner}>
              <Shield size={16} color="#0f766e" />
              <span><strong>Pro tip:</strong> If you live in student housing, WiFi is usually included. Only set up internet if you're in an off-campus apartment. T-Mobile 5G Home Internet requires no installation — just plug in the gateway.</span>
            </div>
            <div style={s.cardGrid}>
              {INTERNET_PROVIDERS.map((isp, ii) => (
                <div key={ii} style={s.card}>
                  <div style={s.cardHeader}>
                    <div>
                      <h3 style={s.cardName}>{isp.name}</h3>
                      <div style={s.ratingRow}>
                        <Star size={13} fill="#f59e0b" color="#f59e0b" />
                        <span style={s.ratingText}>{isp.rating}</span>
                      </div>
                    </div>
                    <a href={isp.link} target="_blank" rel="noopener noreferrer" style={s.visitBtn}>
                      Visit <ExternalLink size={12} />
                    </a>
                  </div>

                  <div style={s.ispHighlights}>
                    <div style={s.ispStat}><strong>Speed:</strong> {isp.speed}</div>
                    <div style={s.ispStat}><strong>Price:</strong> {isp.price}</div>
                    <div style={{ ...s.ispStat, color: '#0f766e', fontWeight: 600 }}>🎓 {isp.studentDeal}</div>
                  </div>

                  <div style={s.featuresList}>
                    {isp.features.map((f, fi) => (
                      <div key={fi} style={s.featureItem}><Check size={12} color="#ea580c" /> {f}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Essentials */}
        {activeTab === 'essentials' && (
          <div>
            <div style={s.sectionIntro}>
              <ShoppingBag size={20} color="#dc2626" />
              <div>
                <h2 style={s.sectionTitle}>Student Essentials Shopping Guide</h2>
                <p style={s.sectionDesc}>Everything you need to buy when you arrive. Real prices and where to get the best deals.</p>
              </div>
            </div>
            <div style={s.tipBanner}>
              <Shield size={16} color="#0f766e" />
              <span><strong>Pro tip:</strong> Don't buy everything new. Check Facebook Marketplace, Craigslist, and your university's buy/sell groups first. Graduating students sell furniture and appliances for 50-80% off.</span>
            </div>
            {ESSENTIALS_CHECKLIST.map((cat, ci) => (
              <div key={ci} style={s.essentialCategory}>
                <h3 style={s.essentialCatTitle}>{cat.category}</h3>
                <div style={s.essentialItems}>
                  {cat.items.map((item, ii) => (
                    <div key={ii} style={s.essentialItem}>
                      <div style={s.essentialTop}>
                        <div style={s.essentialName}>{item.name}</div>
                        <div style={s.essentialPrice}>{item.price}</div>
                      </div>
                      <div style={s.essentialWhere}>
                        <MapPin size={11} /> {item.where}
                      </div>
                      <div style={s.essentialTip}>💡 {item.tip}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

const s = {
  header: { marginBottom: 32 },
  title: { fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: '#0f172a', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#64748b', lineHeight: 1.6 },
  tabs: { display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' },
  tab: { display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 100, border: '1.5px solid #e2e8f0', background: 'white', color: '#475569', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' },
  sectionIntro: { display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 20 },
  sectionTitle: { fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: '#0f172a', marginBottom: 4 },
  sectionDesc: { fontSize: 14, color: '#64748b', lineHeight: 1.5 },
  tipBanner: { display: 'flex', gap: 10, alignItems: 'flex-start', padding: '14px 18px', borderRadius: 12, background: '#f0fdfa', border: '1px solid #99f6e4', marginBottom: 24, fontSize: 13, color: '#475569', lineHeight: 1.5 },
  cardGrid: { display: 'grid', gap: 20 },
  card: { background: 'white', borderRadius: 16, padding: 24, border: '1px solid #e2e8f0' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  cardHeaderLeft: { display: 'flex', alignItems: 'center', gap: 12 },
  cardName: { fontSize: 18, fontWeight: 700, color: '#0f172a', fontFamily: 'var(--font-display)' },
  cardSubname: { fontSize: 13, color: '#64748b' },
  ratingRow: { display: 'flex', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 13, fontWeight: 600, color: '#475569' },
  visitBtn: { display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, background: '#0f766e', color: 'white', fontSize: 13, fontWeight: 600, textDecoration: 'none' },
  bestFor: { fontSize: 13, color: '#475569', lineHeight: 1.5, marginBottom: 16, padding: '10px 14px', borderRadius: 8, background: '#f8fafc' },
  plansGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12, marginBottom: 14 },
  planCard: { padding: 14, borderRadius: 10, border: '1px solid #e2e8f0', background: '#fafafa' },
  planName: { fontSize: 13, fontWeight: 600, color: '#1e293b', marginBottom: 4 },
  planPrice: { fontSize: 24, fontWeight: 700, color: '#0f766e', marginBottom: 2 },
  planPer: { fontSize: 13, fontWeight: 400, color: '#64748b' },
  planData: { fontSize: 12, color: '#64748b', marginBottom: 8 },
  planFeatures: { display: 'flex', flexDirection: 'column', gap: 3 },
  planFeature: { fontSize: 11, color: '#475569', display: 'flex', alignItems: 'center', gap: 4 },
  expandBtn: { display: 'flex', alignItems: 'center', gap: 6, padding: '8px 0', background: 'none', border: 'none', color: '#0f766e', fontSize: 13, fontWeight: 600, cursor: 'pointer' },
  prosConsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 12 },
  prosCol: { padding: 12, borderRadius: 8, background: '#f0fdf4' },
  consCol: { padding: 12, borderRadius: 8, background: '#fef2f2' },
  prosTitle: { fontSize: 13, fontWeight: 600, marginBottom: 8 },
  proItem: { fontSize: 12, color: '#475569', lineHeight: 1.5, marginBottom: 4 },
  bankHighlights: { display: 'flex', gap: 20, marginBottom: 12, flexWrap: 'wrap' },
  bankHighlight: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#475569' },
  bonusBadge: { padding: '8px 14px', borderRadius: 8, background: '#fef3c7', color: '#92400e', fontSize: 13, fontWeight: 600, marginBottom: 14 },
  featuresList: { display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  featureItem: { display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#475569' },
  transitCard: { background: 'white', borderRadius: 16, padding: 28, border: '1px solid #e2e8f0', marginBottom: 20 },
  transitHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap', gap: 12 },
  transitSystem: { fontSize: 22, fontWeight: 700, color: '#0f172a', fontFamily: 'var(--font-display)' },
  transitPass: { fontSize: 14, color: '#64748b' },
  transitPrice: { display: 'flex', alignItems: 'center', gap: 4, padding: '10px 18px', borderRadius: 10, background: '#f0f9ff', color: '#0369a1', fontSize: 15, fontWeight: 700 },
  transitFeatures: { marginBottom: 20 },
  transitFeatTitle: { fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 10 },
  transitTips: { marginBottom: 20 },
  tipItem: { fontSize: 13, color: '#475569', lineHeight: 1.6, padding: '6px 0', borderBottom: '1px solid #f1f5f9' },
  transitActions: { display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' },
  transitBtn: { display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 10, background: '#0369a1', color: 'white', fontSize: 14, fontWeight: 600, textDecoration: 'none' },
  transitApp: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#475569' },
  ispHighlights: { display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14, padding: '12px 14px', borderRadius: 8, background: '#f8fafc' },
  ispStat: { fontSize: 13, color: '#475569' },
  essentialCategory: { marginBottom: 28 },
  essentialCatTitle: { fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 14 },
  essentialItems: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 },
  essentialItem: { padding: 16, borderRadius: 12, border: '1px solid #e2e8f0', background: 'white' },
  essentialTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  essentialName: { fontSize: 14, fontWeight: 600, color: '#1e293b' },
  essentialPrice: { fontSize: 14, fontWeight: 700, color: '#0f766e' },
  essentialWhere: { display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#64748b', marginBottom: 6 },
  essentialTip: { fontSize: 12, color: '#475569', lineHeight: 1.5, padding: '8px 10px', borderRadius: 6, background: '#f8fafc' },
}
