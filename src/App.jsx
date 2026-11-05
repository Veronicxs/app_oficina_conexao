import { useState } from 'react'
import {
  Activity, ArrowUpRight, Bell, BookOpen, Check, ChevronDown,
  CircleHelp, Command, Database, FileText, Gauge, Home, Layers3,
  Menu, MoreHorizontal, Plus, Search, Settings, Users, X
} from 'lucide-react'
import { isSupabaseConfigured, supabase } from './lib/supabase'

const navigation = [
  { label: 'Visão geral', icon: Home },
  { label: 'Cadastros', icon: Users },
  { label: 'Relatórios', icon: FileText },
]
const footerNavigation = [
  { label: 'Ajuda', icon: CircleHelp },
  { label: 'Documentação', icon: BookOpen },
  { label: 'Configurações', icon: Settings },
]

export default function App() {
  const [activePage, setActivePage] = useState('Visão geral')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [notice, setNotice] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigate = (label) => {
    setActivePage(label)
    setSidebarOpen(false)
    if (label !== 'Visão geral') {
      setNotice({ type: 'info', text: `“${label}” é uma página demonstrativa para este teste.` })
    } else {
      setNotice(null)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const cleanName = name.trim()
    if (cleanName.length < 2) {
      setNotice({ type: 'error', text: 'Digite um nome com pelo menos 2 caracteres.' })
      return
    }
    if (!isSupabaseConfigured) {
      setNotice({ type: 'error', text: 'Configure as variáveis do Supabase para habilitar o cadastro.' })
      return
    }

    setLoading(true)
    setNotice(null)
    const { error } = await supabase.from('nomes').insert({ nome: cleanName })
    setLoading(false)

    if (error) {
      setNotice({ type: 'error', text: `Não foi possível salvar: ${error.message}` })
      return
    }
    setName('')
    setNotice({ type: 'success', text: 'Nome cadastrado com sucesso no Supabase.' })
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><Layers3 size={19} /></div>
          <div><strong>Oficina<span>Conexão</span></strong><small>WORKSPACE</small></div>
          <button className="icon-button mobile-close" onClick={() => setSidebarOpen(false)} aria-label="Fechar menu"><X size={18} /></button>
        </div>

        <div className="workspace-switch">
          <div className="workspace-avatar">OC</div>
          <div className="workspace-copy"><strong>Meu workspace</strong><span>Plano gratuito</span></div>
          <ChevronDown size={16} className="muted-icon" />
        </div>

        <div className="nav-label">MENU PRINCIPAL</div>
        <nav className="side-nav" aria-label="Menu principal">
          {navigation.map(({ label, icon: Icon }) => (
            <button key={label} className={`nav-link ${activePage === label ? 'active' : ''}`} onClick={() => navigate(label)}>
              <Icon size={18} /><span>{label}</span>
              {label === 'Cadastros' && <span className="nav-count">1</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="nav-label">SUPORTE</div>
          {footerNavigation.map(({ label, icon: Icon }) => (
            <button key={label} className={`nav-link ${activePage === label ? 'active' : ''}`} onClick={() => navigate(label)}>
              <Icon size={18} /><span>{label}</span>
            </button>
          ))}
          <div className="sidebar-profile">
            <div className="profile-avatar">VF</div>
            <div className="profile-copy"><strong>Visitante</strong><span>Conta de demonstração</span></div>
            <MoreHorizontal size={18} className="muted-icon" />
          </div>
        </div>
      </aside>

      {sidebarOpen && <button className="sidebar-scrim" aria-label="Fechar menu" onClick={() => setSidebarOpen(false)} />}

      <div className="main-column">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button menu-toggle" onClick={() => setSidebarOpen(true)} aria-label="Abrir menu"><Menu size={20} /></button>
            <div className="breadcrumb"><span>Workspace</span><span className="breadcrumb-separator">/</span><strong>{activePage}</strong></div>
          </div>
          <div className="topbar-actions">
            <div className="connection-pill"><span className={isSupabaseConfigured ? 'status-dot online' : 'status-dot'} />{isSupabaseConfigured ? 'Supabase conectado' : 'Aguardando configuração'}</div>
            <button className="icon-button search-button" aria-label="Pesquisar (demonstração)" onClick={() => setNotice({ type: 'info', text: 'Pesquisa demonstrativa.' })}><Search size={18} /></button>
            <button className="icon-button notification-button" aria-label="Notificações (demonstração)" onClick={() => setNotice({ type: 'info', text: 'Você não tem notificações.' })}><Bell size={18} /><i /></button>
            <div className="top-avatar">VF</div>
          </div>
        </header>

        <main className="content">
          <div className="page-heading">
            <div>
              <div className="eyebrow"><Command size={13} /> AMBIENTE DE TESTES</div>
              <h1>{activePage}</h1>
              <p>Um espaço simples para testar a conexão entre React e Supabase.</p>
            </div>
            <div className="heading-date">PROJETO DEMONSTRATIVO <span>•</span> 2026</div>
          </div>

          {activePage === 'Visão geral' ? (
            <>
              <section className="welcome-card">
                <div className="welcome-copy">
                  <div className="welcome-tag"><Activity size={13} /> CONEXÃO EM TEMPO REAL</div>
                  <h2>Seu próximo teste<br />começa por aqui.</h2>
                  <p>Cadastre um nome e veja a integração com o banco de dados em ação.</p>
                </div>
                <div className="welcome-art" aria-hidden="true">
                  <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
                  <div className="art-core"><Database size={34} /></div>
                  <div className="art-chip chip-top"><Check size={15} /></div>
                  <div className="art-chip chip-bottom"><Activity size={15} /></div>
                </div>
                <div className="welcome-index">01 <span>/ 03</span></div>
              </section>

              <div className="section-heading">
                <div><span className="section-kicker">FUNCIONALIDADE PRINCIPAL</span><h2>Cadastro rápido</h2></div>
                <span className="minimal-label"><span className="status-dot online" /> FORMULÁRIO ATIVO</span>
              </div>

              <section className="form-card">
                <div className="form-card-icon"><Users size={20} /></div>
                <div className="form-intro"><h3>Novo cadastro</h3><p>Preencha o campo abaixo para inserir um registro no banco.</p></div>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="name">Nome completo</label>
                  <div className="input-wrap">
                    <Users size={17} />
                    <input id="name" type="text" placeholder="Digite um nome..." value={name} onChange={(event) => setName(event.target.value)} maxLength={100} required />
                    <span className="input-counter">{name.length}/100</span>
                  </div>
                  <div className="form-footer">
                    <span>O registro será salvo na tabela <code>nomes</code>.</span>
                    <button className="submit-button" type="submit" disabled={loading || !isSupabaseConfigured}>
                      {loading ? 'Salvando...' : 'Salvar cadastro'} <ArrowUpRight size={16} />
                    </button>
                  </div>
                  {!isSupabaseConfigured && <p className="config-hint">Adicione as credenciais do Supabase no arquivo <code>.env.local</code> para habilitar o botão.</p>}
                </form>
                {notice && <div className={`notice notice-${notice.type}`} role="status">{notice.text}<button onClick={() => setNotice(null)} aria-label="Fechar aviso"><X size={15} /></button></div>}
              </section>

              <div className="info-grid">
                <div className="info-card"><div className="info-icon purple"><Gauge size={17} /></div><div><strong>Interface leve</strong><span>React + Vite</span></div><span className="info-arrow">↗</span></div>
                <div className="info-card"><div className="info-icon green"><Database size={17} /></div><div><strong>Banco de dados</strong><span>Supabase / PostgreSQL</span></div><span className="info-arrow">↗</span></div>
                <div className="info-card"><div className="info-icon orange"><Layers3 size={17} /></div><div><strong>Deploy</strong><span>Preparado para Vercel</span></div><span className="info-arrow">↗</span></div>
              </div>
            </>
          ) : (
            <section className="placeholder-card">
              <div className="placeholder-icon"><Layers3 size={24} /></div>
              <span className="section-kicker">NAVEGAÇÃO MOCKADA</span>
              <h2>{activePage}</h2>
              <p>Esta área existe apenas para demonstrar a navegação do menu. Nenhuma outra funcionalidade foi implementada.</p>
              <button className="submit-button" onClick={() => navigate('Visão geral')}>Voltar ao início <ArrowUpRight size={16} /></button>
            </section>
          )}
        </main>

        <footer className="footer">
          <div className="footer-brand"><span className="footer-mark"><Layers3 size={13} /></span> Oficina Conexão <span className="footer-version">v1.0.0</span></div>
          <nav className="footer-nav" aria-label="Navegação do rodapé">
            <button onClick={() => navigate('Visão geral')}>Início</button>
            <button onClick={() => navigate('Documentação')}>Documentação</button>
            <button onClick={() => navigate('Ajuda')}>Ajuda</button>
          </nav>
          <span className="footer-status"><span className="status-dot online" /> SISTEMA OPERACIONAL</span>
        </footer>
      </div>
    </div>
  )
}