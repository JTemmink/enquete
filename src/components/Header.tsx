import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  showNavigation?: boolean;
  currentPage?: string;
}

export default function Header({ showNavigation = true, currentPage }: HeaderProps) {
  const navigationItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/over-mij', label: 'Over mij', icon: '👋' },
    { href: '/enquete/vraag1', label: 'Enquête', icon: '📝' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200 shadow-soft">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo en site naam */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 bg-primary-bg rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/images/bakkeraandedeurlogo.png"
                alt="Bakkeraandedeur Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display text-xl font-bold text-neutral-900">
                Bakkeraandedeur
              </h1>
              <p className="text-xs text-neutral-600">Verse broodjes aan je deur</p>
            </div>
          </Link>

          {/* Navigatie */}
          {showNavigation && (
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const isActive = currentPage === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-100 text-primary-700 border border-primary-200'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Mobile menu button */}
          {showNavigation && (
            <button className="md:hidden p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
