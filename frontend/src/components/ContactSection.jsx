import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, ArrowRight } from 'lucide-react';

const PURPLE = '#360153';
const GOLD   = '#cd9623';

const ContactSection = () => {
  const [focused, setFocused] = useState(null);

  const inputStyle = (name) => ({
    width: '100%', padding: '14px 16px',
    background: '#fff',
    border: `1.5px solid ${focused === name ? PURPLE : '#e8dff0'}`,
    borderRadius: 12, fontSize: 14, color: '#1a0030',
    outline: 'none',
    boxShadow: focused === name ? `0 0 0 3px rgba(54,1,83,0.08)` : 'none',
    transition: 'border 0.2s, box-shadow 0.2s',
  });

  const labelStyle = {
    display: 'block', fontSize: 11, fontWeight: 700,
    letterSpacing: '0.12em', textTransform: 'uppercase',
    color: '#6b5a8a', marginBottom: 6,
  };

  return (
    <section style={{ background: 'linear-gradient(160deg, #fdfbff 0%, #f8f2ff 50%, #fffdf5 100%)', position: 'relative', overflow: 'hidden', padding: '96px 0 112px' }}>

      {/* Background decoration */}
      <div style={{ position: 'absolute', top: '5%', right: '-6%', width: 480, height: 480, borderRadius: '50%', background: `radial-gradient(circle, rgba(54,1,83,0.06) 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-8%', left: '-4%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, rgba(205,150,35,0.07) 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(54,1,83,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 100, marginBottom: 20, background: 'rgba(54,1,83,0.07)', border: '1px solid rgba(54,1,83,0.14)' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: PURPLE, display: 'inline-block' }} />
            <span style={{ fontSize: 10.5, fontWeight: 700, color: PURPLE, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Get In Touch</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', fontWeight: 800, color: '#0f0020', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16 }}>
            Let's Start a{' '}
            <span style={{ background: `linear-gradient(135deg, ${PURPLE}, ${GOLD})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Conversation</span>
          </h2>
          <p style={{ color: '#6b5a8a', fontSize: 17, lineHeight: 1.75, maxWidth: 520, margin: '0 auto' }}>
            Ready to explore investment opportunities? Our team is here to help you achieve your financial goals.
          </p>
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'start' }}>

          {/* LEFT — info */}
          <div>
            {/* Brand card */}
            <div style={{ borderRadius: 20, padding: '32px 36px', marginBottom: 32, background: '#fff', border: '1px solid rgba(54,1,83,0.09)', boxShadow: '0 4px 32px rgba(54,1,83,0.07)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${PURPLE}, ${GOLD})` }} />
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginBottom: 8 }}>Fundviser Capital (India) Ltd.</p>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 800, color: '#0f0020', marginBottom: 12, lineHeight: 1.2 }}>Excellence in Investment</h3>
              <p style={{ color: '#6b5a8a', fontSize: 14, lineHeight: 1.8 }}>
                A BSE-listed company dedicated to delivering outstanding results for its investors — strategic approach and market expertise ensuring exceptional growth and value since 1993.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#a89fc0', letterSpacing: '0.1em' }}>BSE: 530197</span>
                <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#d1c4e9' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#a89fc0', letterSpacing: '0.1em' }}>Est. 1993</span>
              </div>
            </div>

            {/* Contact cards */}
            {[
              { icon: Phone, label: 'Call Us', value: '+91-22-31236586', href: 'tel:+912231236586', tag: 'Mon–Sat, 10am–6pm' },
              { icon: Mail,  label: 'Email Us', value: 'info@fundvisercapital.in', href: 'mailto:info@fundvisercapital.in', tag: 'We reply within 24h' },
              { icon: MapPin, label: 'Visit Us', value: 'Mumbai, Maharashtra', href: null, tag: 'Pan-India & UAE' },
            ].map(({ icon: Icon, label, value, href, tag }, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '20px 24px', borderRadius: 16, background: '#fff', border: '1px solid rgba(54,1,83,0.08)', boxShadow: '0 2px 16px rgba(54,1,83,0.05)', marginBottom: 12, transition: 'box-shadow 0.25s, transform 0.25s', cursor: href ? 'pointer' : 'default' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(54,1,83,0.13)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 16px rgba(54,1,83,0.05)'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ width: 46, height: 46, borderRadius: 12, background: `linear-gradient(135deg, ${PURPLE}, #5a0280)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 6px 18px rgba(54,1,83,0.22)` }}>
                  <Icon style={{ width: 20, height: 20, color: '#fff' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#a89fc0', marginBottom: 3 }}>{label}</p>
                  {href
                    ? <a href={href} style={{ fontSize: 15, fontWeight: 700, color: '#150827', textDecoration: 'none', display: 'block', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.color = PURPLE}
                        onMouseLeave={e => e.currentTarget.style.color = '#150827'}
                      >{value}</a>
                    : <p style={{ fontSize: 15, fontWeight: 700, color: '#150827', margin: 0 }}>{value}</p>
                  }
                  <p style={{ fontSize: 11, color: '#b0a0c8', marginTop: 2 }}>{tag}</p>
                </div>
                {href && <ArrowRight style={{ width: 16, height: 16, color: '#d1c4e9', alignSelf: 'center', flexShrink: 0 }} />}
              </div>
            ))}
          </div>

          {/* RIGHT — form */}
          <div style={{ borderRadius: 24, background: '#fff', border: '1px solid rgba(54,1,83,0.09)', boxShadow: '0 8px 48px rgba(54,1,83,0.09)', overflow: 'hidden' }}>
            {/* Form header */}
            <div style={{ padding: '32px 36px 28px', borderBottom: '1px solid rgba(54,1,83,0.07)', background: 'linear-gradient(135deg, #faf5ff 0%, #fffdf5 100%)' }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginBottom: 6 }}>Send a Message</p>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 800, color: '#0f0020', margin: 0 }}>We'd love to hear from you</h3>
            </div>

            <form style={{ padding: '32px 36px 36px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Full Name</label>
                  <input type="text" placeholder="Arjun Sharma" style={inputStyle('name')}
                    onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Phone Number</label>
                  <input type="tel" placeholder="+91 98765 43210" style={inputStyle('phone')}
                    onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)} />
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Email Address</label>
                <input type="email" placeholder="arjun@example.com" style={inputStyle('email')}
                  onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Area of Interest</label>
                <select style={{ ...inputStyle('interest'), appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236b5a8a' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: 40, cursor: 'pointer', color: '#1a0030' }}
                  onFocus={() => setFocused('interest')} onBlur={() => setFocused(null)}>
                  <option value="">Select an area…</option>
                  <option>Real Estate</option>
                  <option>Bullion — Gold & Silver</option>
                  <option>Capital Markets</option>
                  <option>Strategic Advisory</option>
                  <option>Entertainment</option>
                  <option>Global Trade</option>
                  <option>Technology</option>
                  <option>General Inquiry</option>
                </select>
              </div>

              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle}>Message</label>
                <textarea rows="4" placeholder="Tell us about your investment interests or questions…"
                  style={{ ...inputStyle('message'), resize: 'none', fontFamily: 'inherit' }}
                  onFocus={() => setFocused('message')} onBlur={() => setFocused(null)} />
              </div>

              <button type="submit"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '16px 24px', borderRadius: 14, border: 'none', background: `linear-gradient(135deg, ${PURPLE} 0%, #5a0280 100%)`, color: '#fff', fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: `0 8px 28px rgba(54,1,83,0.28)`, transition: 'transform 0.2s, box-shadow 0.2s', letterSpacing: '0.01em' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 14px 36px rgba(54,1,83,0.38)`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `0 8px 28px rgba(54,1,83,0.28)`; }}
              >
                Send Message
                <Send style={{ width: 18, height: 18 }} />
              </button>

              <p style={{ textAlign: 'center', fontSize: 11, color: '#b0a0c8', marginTop: 16 }}>
                We typically respond within 1 business day.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
