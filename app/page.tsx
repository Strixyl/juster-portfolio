"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

export default function Home() {
  const [activeSection, setActiveSection] = useState('about');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 flex items-center justify-between px-12 py-8 z-50 bg-black/50 backdrop-blur-md">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="block leading-tight">JUS</span>
            <span className="block leading-tight">TER</span>
          </h1>
        </div>

        <ul className="flex space-x-10 text-xs font-medium tracking-widest uppercase">
          <li>
            <button
              onClick={() => scrollToSection('about')}
              className={`hover:text-white/60 transition-colors duration-300 ${activeSection === 'about' ? 'text-white' : 'text-white/40'}`}
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('works')}
              className={`hover:text-white/60 transition-colors duration-300 ${activeSection === 'works' ? 'text-white' : 'text-white/40'}`}
            >
              Works
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('skills')}
              className={`hover:text-white/60 transition-colors duration-300 ${activeSection === 'skills' ? 'text-white' : 'text-white/40'}`}
            >
              Skills
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('contact')}
              className={`hover:text-white/60 transition-colors duration-300 ${activeSection === 'contact' ? 'text-white' : 'text-white/40'}`}
            >
              Contact Me
            </button>
          </li>
        </ul>
      </nav>

      {/* About Section - Hero */}
      <section id="about" className="relative h-screen flex items-center justify-center overflow-hidden">

        {/* Semi-transparent background with website mockups effect */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-48 h-64 bg-gray-900/30 backdrop-blur-sm rounded-lg border border-white/10 transform -rotate-6 opacity-60"></div>
          <div className="absolute top-32 left-1/3 w-56 h-72 bg-gray-900/20 backdrop-blur-sm rounded-lg border border-white/10 transform rotate-3 opacity-40"></div>
          <div className="absolute top-16 right-20 w-52 h-68 bg-gray-900/30 backdrop-blur-sm rounded-lg border border-white/10 transform rotate-6 opacity-50"></div>
          <div className="absolute bottom-20 left-1/4 w-60 h-80 bg-gray-900/25 backdrop-blur-sm rounded-lg border border-white/10 transform -rotate-3 opacity-45"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left - Text */}
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <h2 className="text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
                  DATA SCIENCE &
                </h2>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full border-2 border-white/40"></div>
                    </div>
                  </div>
                  <h3 className="text-5xl lg:text-6xl font-bold tracking-tight">
                    UI/UX DESIGN
                  </h3>
                </div>
              </div>

              <p className="text-white/60 text-base leading-relaxed max-w-md">
                Hello there, I'm Juster – I specialize in Data Science with a touch of UI/UX Design that transforms your ideas into beautiful, user-friendly digital experiences. Currently based in Iloilo City, Philippines.
              </p>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-white text-black px-8 py-3 rounded-full font-semibold text-sm hover:bg-white/80 transition-all"
                >
                  Contact Me
                </button>
              </div>

              {/* Social Links at bottom left */}
              <div className="flex gap-4 pt-8">
                <span className="text-xs uppercase tracking-widest text-white/40">SAY HELLO</span>
                <Link href="https://twitter.com" target="_blank" className="text-white/60 hover:text-white transition-colors">
                  <FaTwitter size={14} />
                </Link>
                <Link href="https://www.instagram.com/peachmango.jus/" target="_blank" className="text-white/60 hover:text-white transition-colors">
                  <FaInstagram size={14} />
                </Link>
                <Link href="https://www.linkedin.com/in/juster-ureta/" target="_blank" className="text-white/60 hover:text-white transition-colors">
                  <FaLinkedin size={14} />
                </Link>
              </div>
            </div>

            {/* Right - Image */}
            <div className="flex justify-center lg:justify-end items-center relative">
              <div className="relative w-40 h-40 lg:w-56 lg:h-56">
                {/* Circular gradient border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/40 to-blue-600/40 blur-xl"></div>

                {/* Image circle */}
                <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-white/20 bg-gray-900">
                  <Image
                    src="/images/picpf.png"
                    alt="Profile"
                    fill
                    className="object-cover transition-all duration-300"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Works Section */}
      <section id="works" className="relative min-h-screen flex items-center justify-center px-12 py-24 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-5xl lg:text-6xl font-bold mb-16 tracking-tight">PROJECTS</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((project) => (
              <div key={project} className="group relative bg-gray-900/40 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:border-white/30 transition-all h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black/80 opacity-60"></div>
                <div className="relative h-full flex flex-col justify-between p-8">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/40 mb-3">Project {project}</p>
                    <h3 className="text-2xl font-bold mb-4">Safe Drive</h3>
                    <p className="text-white/60 text-sm">Web-based system for a traffic regulatory department</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 text-xs border border-white/10 text-white/60 rounded-full">Design</span>
                    <span className="px-3 py-1 text-xs border border-white/10 text-white/60 rounded-full">Development</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative min-h-screen flex items-center justify-center px-12 py-24 bg-black">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-5xl lg:text-6xl font-bold mb-16 tracking-tight">SKILLS</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['Data Science', 'Python', 'React', 'Machine Learning', 'UI/UX Design', 'Web Development'].map((skill, idx) => (
              <div key={idx} className="bg-gray-900/40 backdrop-blur-sm border border-white/10 p-8 rounded-lg hover:border-white/30 transition-all">
                <h3 className="text-xl font-bold mb-3">{skill}</h3>
                <p className="text-white/60 text-sm mb-4">Expertise in this domain with hands-on experience.</p>
                <a href="/path-to-your-certificate.jpg" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 text-xs border border-white/20 hover:border-white/60 rounded transition-all">
                  View Certificate
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative min-h-screen flex items-center justify-center px-12 py-24 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="max-w-4xl mx-auto w-full text-center">
          <h2 className="text-5xl lg:text-6xl font-bold mb-8 tracking-tight">GET IN TOUCH</h2>
          <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Let's connect and create something amazing together.
          </p>

          <div className="space-y-6">
            <a href="mailto:uretajuster@gmail.com" className="inline-block bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/80 transition-all text-lg">
              Contact Me
            </a>

            <div className="flex justify-center gap-8 pt-8">
              <Link href="https://github.com/Strixyl" target="_blank" className="text-white/40 hover:text-white transition-colors">
                <FaGithub size={28} />
              </Link>
              <Link href="https://www.linkedin.com/in/juster-ureta/" target="_blank" className="text-white/40 hover:text-white transition-colors">
                <FaLinkedin size={28} />
              </Link>
              <Link href="mailto:uretajuster@gmail.com" className="text-white/40 hover:text-white transition-colors">
                <SiGmail size={28} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed Left Sidebar Social Links */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 z-40">
        <Link href="https://github.com/Strixyl" target="_blank" className="text-white/40 hover:text-white transition-colors">
          <FaGithub size={20} />
        </Link>
        <Link href="https://www.linkedin.com/in/juster-ureta/" target="_blank" className="text-white/40 hover:text-white transition-colors">
          <FaLinkedin size={20} />
        </Link>
        <Link href="mailto:uretajuster@gmail.com" className="text-white/40 hover:text-white transition-colors">
          <SiGmail size={20} />
        </Link>
        <div className="w-px h-24 bg-white/20 mx-auto"></div>
      </div>

      {/* Scroll Progress Indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-40">
        <div className="text-xs uppercase tracking-widest text-white/40">
          {activeSection.toUpperCase()}
        </div>
        <div className="w-px h-32 bg-white/10">
          <div className="w-full h-1/4 bg-white/60 transition-all duration-300"></div>
        </div>
      </div>

    </div>
  );
}