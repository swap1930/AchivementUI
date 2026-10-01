$content = Get-Content 'app/page.tsx' -Raw

$oldSidebar = '<nav aria-label="Portfolio sections">{tabs.map(({ id, label, icon: Icon }) => <button key={id} className={activeTab === id ? "nav-tab active" : "nav-tab"} onClick={() => { setActiveTab(id); setSelectedProject(null) }}><Icon /><span>{label}</span>{activeTab === id && <span className="tab-indicator" /></button>)}</nav></div></aside>'

$newSidebar = '<nav aria-label="Portfolio sections">{tabs.map(({ id, label, icon: Icon }) => <button key={id} className={activeTab === id ? "nav-tab active" : "nav-tab"} onClick={() => { setActiveTab(id); setSelectedProject(null) }}><Icon /><span>{label}</span>{activeTab === id && <span className="tab-indicator" /></button>)}</nav><div className="sidebar-social"><a href="https://linkedin.com/in/" target="_blank" rel="noreferrer" className="social-link"><Linkedin /></a><a href="https://instagram.com/" target="_blank" rel="noreferrer" className="social-link"><Instagram /></a></div><button className="portfolio-button" onClick={() => window.open("https://vercel.com/", "_blank", "noopener,noreferrer")}><span>Portfolio</span><ExternalLink /></button></div></aside>'

$content = $content -replace [regex]::Escape($oldSidebar), $newSidebar
Set-Content 'app/page.tsx' -Value $content -NoNewline
Write-Host "Sidebar updated successfully"