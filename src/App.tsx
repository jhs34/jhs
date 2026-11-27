import { useCallback, useEffect, useRef, useState } from 'react';
import Aurora from './Aurora';
import './App.css';
import logo from './assets/logo.png';

interface ProjectItem {
    name: string;
    url: string;
}

type ModalType = 'projects' | 'about';

const PROJECTS: ProjectItem[] = [
    { name: 'KRHS Dashboard', url: 'https://krhs.web.app' },
    { name: 'VocabFlow', url: 'https://vocabflow-jhs.web.app' },
    { name: 'Lyrictify', url: 'https://lyrictify-jhs.web.app' },
    { name: 'Blurify', url: 'https://blurify-jhs.web.app' },
];

function App() {
    const [activeModal, setActiveModal] = useState<ModalType | null>(null);
    const [isClosing, setIsClosing] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuClosing, setIsMenuClosing] = useState(false);
    const headerRef = useRef<HTMLElement | null>(null);

    const closeMenu = useCallback(() => {
        if (!isMenuOpen || isMenuClosing) return;
        setIsMenuClosing(true);
        setTimeout(() => {
            setIsMenuOpen(false);
            setIsMenuClosing(false);
        }, 160);
    }, [isMenuOpen, isMenuClosing]);

    const closeModal = useCallback(() => {
        if (!activeModal || isClosing) return;
        setIsClosing(true);
        setTimeout(() => {
            setActiveModal(null);
            setIsClosing(false);
        }, 180);
    }, [activeModal, isClosing]);

    const openModal = (modalType: ModalType) => {
        setActiveModal(modalType);
        setIsClosing(false);
        if (isMenuOpen) {
            closeMenu();
        }
    };

    const toggleMenu = () => {
        if (isMenuOpen) {
            closeMenu();
        } else {
            setIsMenuOpen(true);
            setIsMenuClosing(false);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (activeModal) closeModal();
                else if (isMenuOpen) closeMenu();
            }
        };

        const handlePointerDown = (e: PointerEvent) => {
            if (
                isMenuOpen &&
                headerRef.current &&
                e.target instanceof Node &&
                !headerRef.current.contains(e.target)
            ) {
                closeMenu();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('pointerdown', handlePointerDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('pointerdown', handlePointerDown);
        };
    }, [activeModal, isMenuOpen, closeModal, closeMenu]);

    return (
        <div className="app-container">
            <header className="app-header" ref={headerRef}>
                <div className="logo-container">
                    <img src={logo} alt="JHS Logo" className="app-logo" />
                    <span className="logo-text google-sans-flex">JHS</span>
                </div>

                <button
                    type="button"
                    className={`menu-button ${isMenuOpen && !isMenuClosing ? 'open' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Menu"
                    aria-expanded={isMenuOpen && !isMenuClosing}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {isMenuOpen && (
                    <div className={`glass-menu ${isMenuClosing ? 'closing' : ''}`} role="menu">
                        <ul className="menu-items">
                            <li>
                                <button
                                    type="button"
                                    className="menu-item-btn google-sans-flex"
                                    onClick={() => openModal('projects')}
                                >
                                    Projects
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className="menu-item-btn google-sans-flex"
                                    onClick={() => openModal('about')}
                                >
                                    About
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </header>

            <Aurora
                colorStops={['#4F8CFD', '#6453ff', '#4F8CFD']}
                blend={0.5}
                amplitude={1.0}
                speed={0.5}
            />

            <main className="content">
                <h1 className="hero-title google-sans-flex">Welcome</h1>
                <p className="subtitle noto-sans-kr">환영합니다</p>

                <div className="scroll-indicator" aria-hidden="true">
                    <p className="scroll-caption noto-sans-kr">아래로 스크롤하여 프로젝트 보기</p>
                    <div className="arrow">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 5v14M19 12l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </main>

            <section className="projects-section">
                <button
                    type="button"
                    className="glass-button google-sans-flex"
                    onClick={() => openModal('projects')}
                >
                    Projects
                </button>
            </section>

            {activeModal && (
                <div
                    className={`modal-overlay ${isClosing ? 'closing' : ''}`}
                    onClick={closeModal}
                    role="dialog"
                    aria-modal="true"
                    aria-label={activeModal === 'projects' ? 'Projects' : 'About'}
                >
                    <div
                        className={`glass-modal ${isClosing ? 'closing' : ''}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {activeModal === 'projects' && (
                            <>
                                <div className="modal-header">
                                    <h2 className="modal-title google-sans-flex">Projects</h2>
                                    <button
                                        type="button"
                                        className="close-button"
                                        onClick={closeModal}
                                        aria-label="Close modal"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 6L6 18M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <ul className="project-list">
                                    {PROJECTS.map((project) => (
                                        <li key={project.url}>
                                            <a
                                                href={project.url}
                                                className="project-link google-sans-flex"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <span>{project.name}</span>
                                                <svg
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="project-link-icon"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M7 17L17 7M7 7h10v10" />
                                                </svg>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {activeModal === 'about' && (
                            <>
                                <button
                                    type="button"
                                    className="close-button close-button--floating"
                                    onClick={closeModal}
                                    aria-label="Close modal"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                </button>
                                <div className="about-content">
                                    <div className="about-header">
                                        <img src={logo} alt="JHS Logo" className="about-logo" />
                                        <span className="about-title google-sans-flex">JHS</span>
                                    </div>
                                    <div className="about-body">
                                        <a
                                            href="https://github.com/jhs34"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="github-link"
                                        >
                                            <svg viewBox="0 0 24 24" fill="currentColor" className="github-icon" aria-hidden="true">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                            <span className="google-sans-flex github-username">jhs34</span>
                                        </a>
                                    </div>
                                    <div className="about-footer">
                                        <p className="google-sans-flex">Made with Antigravity</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
