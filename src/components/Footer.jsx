import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        <div style={styles.left}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>SN</div>
            <span style={styles.logoText}>StudentNest</span>
          </div>
          <p style={styles.tagline}>Helping international students feel at home, anywhere in the world.</p>
        </div>
        <div style={styles.links}>
          <div style={styles.linkCol}>
            <h4 style={styles.colTitle}>Discover</h4>
            <Link to="/housing" style={styles.link}>Housing</Link>
            <Link to="/food" style={styles.link}>Food & Grocery</Link>
            <Link to="/community" style={styles.link}>Community</Link>
            <Link to="/sports" style={styles.link}>Sports</Link>
            <Link to="/reviews" style={styles.link}>Reels & Posts</Link>
            <Link to="/discounts" style={styles.link}>Student Deals</Link>
            <Link to="/settle" style={styles.link}>Settle In Guide</Link>
          </div>
          <div style={styles.linkCol}>
            <h4 style={styles.colTitle}>Company</h4>
            <a href="mailto:hello@studentnest.app" style={styles.link}>Contact Us</a>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
          </div>
          <div style={styles.linkCol}>
            <h4 style={styles.colTitle}>Legal</h4>
            <Link to="/dashboard" style={styles.link}>Privacy Policy</Link>
            <Link to="/dashboard" style={styles.link}>Terms of Service</Link>
          </div>
        </div>
      </div>
      <div style={styles.bottom}>
        <p style={styles.copyright}>
          &copy; {new Date().getFullYear()} StudentNest. Built with <Heart size={12} style={{ display: 'inline', verticalAlign: 'middle', color: '#ef4444' }} /> for international students worldwide.
        </p>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    background: '#0f172a',
    color: '#94a3b8',
    marginTop: 80,
  },
  inner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '60px 24px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 60,
    flexWrap: 'wrap',
  },
  left: {
    maxWidth: 300,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  logoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: 'linear-gradient(135deg, #0f766e, #14b8a6)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 14,
  },
  logoText: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 20,
    color: 'white',
  },
  tagline: {
    fontSize: 14,
    lineHeight: 1.6,
    color: '#64748b',
  },
  links: {
    display: 'flex',
    gap: 60,
    flexWrap: 'wrap',
  },
  linkCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  colTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: 'white',
    marginBottom: 4,
  },
  link: {
    fontSize: 13,
    color: '#64748b',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  bottom: {
    borderTop: '1px solid #1e293b',
    padding: '20px 24px',
    textAlign: 'center',
  },
  copyright: {
    fontSize: 13,
    color: '#475569',
  },
}
