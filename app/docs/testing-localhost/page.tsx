
import { Metadata } from 'next'
import { LandingHeader } from '@/components/LandingHeader'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import Script from 'next/script'

export const metadata: Metadata = {
    title: 'Localhost Testing in Rihario: Official Documentation',
    description: 'Learn why Rihario does not test localhost directly and how to use secure tunneling services like ngrok or Cloudflare Tunnel for local development.',
    keywords: ['localhost testing', 'test localhost', 'ngrok', 'cloudflare tunnel', 'localtunnel', 'rihario localhost'],
}

export default function LocalhostTestingDocPage() {
    return (
        <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <LandingHeader />

            <Script id="doc-schema" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "TechArticle",
                    "headline": "Localhost Testing in Rihario: Official Documentation",
                    "description": "Official guide on testing localhost applications with Rihario using tunneling services.",
                    "articleSection": "Documentation",
                    "keywords": "localhost testing, ngrok, cloudflare tunnel"
                })}
            </Script>

            <article style={{ paddingTop: '40px', paddingBottom: '80px' }}>
                <div className="container" style={{ maxWidth: '800px' }}>

                    {/* Breadcrumbs */}
                    <nav style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>
                        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
                        <span style={{ margin: '0 0.5rem', color: 'var(--text-muted)' }}>/</span>
                        <Link href="/docs" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Docs</Link>
                        <span style={{ margin: '0 0.5rem', color: 'var(--text-muted)' }}>/</span>
                        <span style={{ color: 'var(--text-primary)' }}>Localhost Testing</span>
                    </nav>

                    <h1 style={{ fontSize: '3rem', marginBottom: '2rem', lineHeight: 1.1 }}>
                        Localhost Testing in Rihario: Official Documentation
                    </h1>

                    <div className="glass-panel" style={{ padding: '2rem', borderLeft: '4px solid var(--primary)', marginBottom: '3rem' }}>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                            Rihario does not and will not directly test localhost URLs. This is a fundamental limitation of cloud-based browser execution, not a product limitation. To test applications running on localhost, users must expose their local app using a secure third-party tunneling service.
                        </p>
                    </div>

                    <section style={{ marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Why Localhost Cannot Be Tested</h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            When you type <code>localhost</code> (or <code>127.0.0.1</code>) into a browser, it resolves to the machine <em>running that browser</em>.
                        </p>
                        <ul style={{ lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            <li>Your app is running on <strong>Your Laptop</strong>.</li>
                            <li>Rihario's AI agent is running on a <strong>Remote Cloud Worker</strong>.</li>
                        </ul>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                            If our Cloud Worker tries to visit <code>localhost</code>, it looks for a server running inside its own isolated container—and finds nothing. This is true for all cloud testing platforms (BrowserStack, Sauce Labs, LambdaTest, etc.).
                        </p>
                    </section>

                    <section style={{ marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>How to Test Localhost Applications (Correct Method)</h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            To test a local app, you must create a "Tunnel." A tunnel creates a secure bridge from your local machine to the public internet, giving you a temporary public URL that Rihario can access.
                        </p>
                        <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '8px' }}>
                            <ol style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.5rem' }}>Your App runs on <code>localhost:3000</code></li>
                                <li style={{ marginBottom: '0.5rem' }}>Tunnel Service assigns a URL like <code>https://fancy-cat-99.ngrok.io</code></li>
                                <li style={{ marginBottom: '0.5rem' }}>You give that URL to Rihario</li>
                                <li style={{ marginBottom: '0.5rem' }}>Rihario visits the URL, traffic travels through the tunnel to your laptop</li>
                                <li>Results stream back normally</li>
                            </ol>
                        </div>
                    </section>

                    <section style={{ marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Supported Tunneling Services</h2>
                        <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            Rihario works with any service that provides a publicly accessible HTTPS URL. We recommend the following providers:
                        </p>

                        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>1. ngrok (Recommended for Quick Setup)</h3>
                            <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                ngrok is the industry standard for localhost tunneling. It requires a small CLI installation but is extremely reliable and easy to use.
                            </p>
                            <ul style={{ marginBottom: '1.5rem', lineHeight: 1.7 }}>
                                <li><strong>Official Site:</strong> <a href="https://ngrok.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>https://ngrok.com</a></li>
                                <li><strong>Documentation:</strong> <a href="https://ngrok.com/docs" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>https://ngrok.com/docs</a></li>
                            </ul>
                            <div style={{ background: '#1e293b', color: '#cbd5e1', padding: '1rem', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                                $ ngrok http 3000
                            </div>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>2. Cloudflare Tunnel (Recommended for Security)</h3>
                            <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                For improved security and stable URLs without paid plans, Cloudflare Tunnel (formerly Argo Tunnel) is an excellent choice. It works via the <code>cloudflared</code> daemon.
                            </p>
                            <ul style={{ marginBottom: '1.5rem', lineHeight: 1.7 }}>
                                <li><strong>Official Site:</strong> <a href="https://www.cloudflare.com/products/tunnel/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>https://www.cloudflare.com/products/tunnel/</a></li>
                                <li><strong>Documentation:</strong> <a href="https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>Cloudflare Tunnel Docs</a></li>
                            </ul>
                            <div style={{ background: '#1e293b', color: '#cbd5e1', padding: '1rem', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                                $ cloudflared tunnel --url http://localhost:3000
                            </div>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>3. LocalTunnel (Lightweight / Open Source)</h3>
                            <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                A simple, open-source Node.js package. It is less reliable than ngrok or Cloudflare but requires zero registration. <strong>Not recommended for sensitive apps.</strong>
                            </p>
                            <ul style={{ marginBottom: '1.5rem', lineHeight: 1.7 }}>
                                <li><strong>GitHub Repository:</strong> <a href="https://github.com/localtunnel/localtunnel" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>https://github.com/localtunnel/localtunnel</a></li>
                            </ul>
                            <div style={{ background: '#1e293b', color: '#cbd5e1', padding: '1rem', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                                $ npx localtunnel --port 3000
                            </div>
                        </div>
                    </section>

                    <section style={{ marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>What Works When Using a Tunnel</h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            <strong>There is no functional downgrade when using a tunnel.</strong> Rihario treats the tunnel URL exactly the same as a production URL.
                        </p>
                        <ul style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1rem',
                            listStyle: 'none',
                            padding: 0,
                            marginTop: '1.5rem'
                        }}>
                            {[
                                'Visual Testing', 'Login & Signup Flows', 'Form Submissions',
                                'Navigation & Crawling', 'Accessibility Audits', 'Rage Bait Testing',
                                'Live Streaming', 'Video Artifacts'
                            ].map(item => (
                                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem' }}>
                                    <span style={{ color: 'var(--success)' }}>✔</span> {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section style={{ marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Security Considerations</h2>
                        <div style={{ background: '#fff1f2', borderLeft: '4px solid #e11d48', padding: '1.5rem', borderRadius: '0 8px 8px 0' }}>
                            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: 1.7, color: '#881337' }}>
                                <li style={{ marginBottom: '0.5rem' }}><strong>Tunnels make your app public:</strong> Anyone with the URL can access your localhost app while the tunnel is running.</li>
                                <li style={{ marginBottom: '0.5rem' }}><strong>Use Test Credentials:</strong> Never use real production admin credentials on a tunneled database unless necessary.</li>
                                <li style={{ marginBottom: '0.5rem' }}><strong>Shut Down:</strong> Always terminate the tunnel process (Ctrl+C) when testing is complete.</li>
                                <li><strong>Rihario Role:</strong> Rihario does not manage, proxy, or control these tunnels. We simply visit the URL you provide.</li>
                            </ul>
                        </div>
                    </section>

                    <section style={{ padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '12px', textAlign: 'center' }}>
                        <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                            Rihario will not support direct localhost testing. Localhost testing is fully supported through secure third-party tunneling services and aligns with industry standards for cloud-based browser execution.
                        </p>
                    </section>

                </div>
            </article>
            <Footer />
        </main>
    )
}
