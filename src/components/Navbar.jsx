import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Home, Building2, UtensilsCrossed, Users, Trophy, Play, Compass, LogOut, ChevronDown, Sparkles, Tag } from 'lucide-react'

const NAV_LINKS = [
  { path: '/dashboard', label: 'Home', icon: Home },
  { path: '/housing', label: 'Housing', icon: Building2 },
  { path: '/food', label: 'Food', icon: UtensilsCrossed },
  { path: '/community', label: 'Community', icon: Users },
  { path: '/sports', label: 'Sports', icon: Trophy },
  { path: '/reviews', label: 'Reels', icon: Play },
  { path: '/discounts', label: 'Deals', icon: Tag },
  { path: '/settle', label: 'Settle In', icon: Compass },
]

// Bottom bar shows: Home, Reels, Deals, Community, Sports (most used)
const BOTTOM_LINKS = [
  { path: '/dashboard', label: 'Home', icon: Home },
  { path: '/reviews', label: 'Reels', icon: Play },
  { path: '/discounts', label: 'Deals', icon: Tag },
  { path: '/housing', label: 'Housing', icon: Building2 },
  { path: '/food', label: 'Food', icon: UtensilsCrossed },
]

export default function Navbar() {
  const { student, logout } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  if (!student) return null

  const handleLogout = () => { logout(); navigate('/') }
  const firstName = student.fullName?.split(' ')[0] || 'User'
  const initials = student.fullName?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U'
  const currentPage = NAV_LINKS.find(l => l.path === location.pathname)

  return (
    <>
      <nav style={st.nav}>
        <div style={st.inner}>
          {/* Logo */}
          <Link to="/dashboard" style={st.logo}>
            <div style={st.logoIcon}><Sparkles size={16} /></div>
            <span style={st.logoText}>StudentNest</span>
          </Link>

          {/* Desktop nav pills */}
          <div className="nav-links-desktop" style={st.pills}>
            {NAV_LINKS.map(link => {
              const Icon = link.icon
              const active = location.pathname === link.path
              return (
                <Link key={link.path} to={link.path} style={{ ...st.pill, ...(active ? st.pillActive : {}) }}>
                  <Icon size={15} />
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Right side - avatar dropdown */}
          <div style={st.right} ref={menuRef}>
            <button onClick={() => setMenuOpen(!menuOpen)} style={st.avatarBtn}>
              <div style={st.avatar}>{initials}</div>
              <ChevronDown size={14} color="#64748b" style={{ transition: 'transform 0.2s', transform: menuOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
            </button>

            {menuOpen && (
              <div style={st.dropdown}>
                <div style={st.dropdownHeader}>
                  <div style={st.dropdownAvatar}>{initials}</div>
                  <div>
                    <div style={st.dropdownName}>{student.fullName}</div>
                    <div style={st.dropdownEmail}>{student.email}</div>
                  </div>
                </div>
                <div style={st.dropdownDivider} />
                {/* Mobile nav links in dropdown */}
                <div className="nav-dropdown-links">
                  {NAV_LINKS.map(link => {
                    const Icon = link.icon
                    const active = location.pathname === link.path
                    return (
                      <Link key={link.path} to={link.path} onClick={() => setMenuOpen(false)} style={{ ...st.dropdownLink, ...(active ? st.dropdownLinkActive : {}) }}>
                        <Icon size={16} />
                        <span>{link.label}</span>
                      </Link>
                    )
                  })}
                </div>
                <div style={st.dropdownDivider} />
                <button onClick={handleLogout} style={st.logoutBtn}>
                  <LogOut size={15} />
                  <span>Sign out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div style={{ height: 56 }} />

      {/* Bottom mobile nav bar */}
      <div className="nav-bottom-bar" style={st.bottomBar}>
        {BOTTOM_LINKS.map(link => {
          const Icon = link.icon
          const active = location.pathname === link.path
          return (
            <Link key={link.path} to={link.path} style={{ ...st.bottomItem, ...(active ? st.bottomItemActive : {}) }}>
              <Icon size={20} />
              <span style={st.bottomLabel}>{link.label}</span>
            </Link>
          )
        })}
      </div>
    </>
  )
}

const st = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, height: 56,
    background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px) saturate(180%)',
    borderBottom: '1px solid rgba(0,0,0,0.06)', zIndex: 1000,
  },
  inner: {
    maxWidth: 1200, margin: '0 auto', padding: '0 20px', height: '100%',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  logo: { display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' },
  logoIcon: {
    width: 32, height: 32, borderRadius: 10,
    background: 'linear-gradient(135deg, #0f766e, #14b8a6)',
    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  logoText: { fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: '#0f172a', letterSpacing: '-0.02em' },
  pills: { display: 'flex', alignItems: 'center', gap: 2 },
  pill: {
    display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 100,
    fontSize: 13, fontWeight: 500, color: '#64748b', textDecoration: 'none', transition: 'all 0.2s',
    whiteSpace: 'nowrap',
  },
  pillActive: { color: '#0f766e', background: '#f0fdfa', fontWeight: 600 },
  right: { position: 'relative' },
  avatarBtn: {
    display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px 4px 4px',
    borderRadius: 100, border: '1.5px solid #e2e8f0', background: 'white', cursor: 'pointer',
    transition: 'all 0.2s',
  },
  avatar: {
    width: 28, height: 28, borderRadius: '50%',
    background: 'linear-gradient(135deg, #0f766e, #14b8a6)',
    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 11, fontWeight: 700,
  },
  dropdown: {
    position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: 260,
    background: 'white', borderRadius: 16, border: '1px solid #e2e8f0',
    boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 20px rgba(0,0,0,0.06)',
    padding: 8, zIndex: 2000, animation: 'fadeIn 0.15s ease',
  },
  dropdownHeader: { display: 'flex', alignItems: 'center', gap: 10, padding: '10px 10px 8px' },
  dropdownAvatar: {
    width: 36, height: 36, borderRadius: '50%',
    background: 'linear-gradient(135deg, #0f766e, #14b8a6)',
    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 13, fontWeight: 700, flexShrink: 0,
  },
  dropdownName: { fontSize: 14, fontWeight: 600, color: '#0f172a' },
  dropdownEmail: { fontSize: 12, color: '#94a3b8' },
  dropdownDivider: { height: 1, background: '#f1f5f9', margin: '6px 0' },
  dropdownLink: {
    display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 10,
    fontSize: 13, fontWeight: 500, color: '#475569', textDecoration: 'none', transition: 'all 0.15s',
  },
  dropdownLinkActive: { color: '#0f766e', background: '#f0fdfa', fontWeight: 600 },
  logoutBtn: {
    display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 10,
    fontSize: 13, fontWeight: 500, color: '#ef4444', background: 'none', border: 'none',
    cursor: 'pointer', width: '100%', transition: 'all 0.15s',
  },
  bottomBar: {
    display: 'none', position: 'fixed', bottom: 0, left: 0, right: 0, height: 64,
    background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px) saturate(180%)',
    borderTop: '1px solid rgba(0,0,0,0.06)', zIndex: 1000,
    justifyContent: 'space-around', alignItems: 'center', padding: '0 8px',
  },
  bottomItem: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
    padding: '6px 12px', borderRadius: 12, color: '#94a3b8', textDecoration: 'none',
    transition: 'all 0.2s', fontSize: 0,
  },
  bottomItemActive: { color: '#0f766e' },
  bottomLabel: { fontSize: 10, fontWeight: 600 },
}
