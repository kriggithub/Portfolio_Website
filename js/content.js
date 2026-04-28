const views = {
  home: `
    <section class="reveal" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: calc(100vh - 48px - 4rem); position: relative;">
      <h1>Hi, I'm <span class="gradient-text">Kurt.</span></h1>
      <h3 class="typingText" style="font-size: 1.8rem; font-weight: 400; margin-top: 0.5rem; width: 100%; text-align: center;">
          I'm a&nbsp;<span class="typing-wrapper">
              <span id="typing-word" class="gradient-text"></span><span class="caret"></span>
          </span>
      </h3>
      <div class="links">
          <a href="https://github.com/kriggithub" target="_blank" rel="noopener noreferrer">
              <i class="fa-brands fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/kurtriggin/" target="_blank" rel="noopener noreferrer">
              <i class="fa-brands fa-linkedin"></i>
          </a>
          <a href="https://www.youtube.com/channel/UCiIQgFerfIQ8my1xAd28ZEA" target="_blank" rel="noopener noreferrer">
              <i class="fa-brands fa-youtube"></i>
          </a>
          <a href="https://orcid.org/0009-0004-4700-1251" target="_blank" rel="noopener noreferrer">
              <i class="fa-brands fa-orcid"></i>
          </a>
      </div>
      <p style="margin-top: 3rem; max-width: 700px; text-align: center;">
        Welcome. I'm exploring the intersections of data, technology, and continuous personal improvement.
      </p>
      <div class="scroll-arrow-wrapper"><div class="scroll-arrow"><i class="fa-solid fa-chevron-down"></i></div></div>
    </section>

    <section class="reveal text-left" style="width: 100%;">
      <h2>About Me</h2>
      <div class="card">
        <div class="about-card-inner">
          <img src="images/herophoto.webp" class="about-photo" alt="Kurt Riggin">
          <p style="max-width: none; margin-bottom: 0;">
            I'm an MS Biostatistics student at the University of Washington, where I'm completing my Capstone year.
            My undergraduate training was at Regis University, where I graduated with a degree in Biology and Mathematics.
            I have a passion for data science and research, and I strive to make complex topics accessible and entertaining for everyone.
          </p>
        </div>
      </div>
    </section>

    <section class="reveal text-left" style="width: 100%;">
      <h2>The 3Ps</h2>
      <p style="margin-top: -1rem; margin-bottom: 2rem;">When I'm not coding or doing research, you can find me pursuing my main hobbies:</p>
      
      <div class="grid-2" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
        <div class="card hobby-card" data-bg="images/pickleball.webp">
          <div class="card-bg-layer"></div>
          <h3>Pickleball</h3>
          <p style="font-size: 0.95rem;">Trying to climb the ranks and get my DUPR rating up. Catch me on the courts!</p>
          <a href="https://dashboard.dupr.com/dashboard/player/5056706137" target="_blank" style="color: var(--accent-color); font-size: 0.95rem;">View my DUPR profile &rarr;</a>
        </div>

        <div class="card hobby-card" data-bg="images/poker.webp">
          <div class="card-bg-layer"></div>
          <h3>Poker</h3>
          <p style="font-size: 0.95rem;">Studying the odds, reading the table, and continuously refining my strategy.</p>
        </div>

        <div class="card hobby-card" data-bg="images/pokemon.webp">
          <div class="card-bg-layer"></div>
          <h3>Pokémon Cards</h3>
          <p style="font-size: 0.95rem;">A lifelong collector of vintage and modern sets.</p>
          <a href="#" target="_blank" style="color: var(--accent-color); font-size: 0.95rem;">View my Collection &rarr;</a>
        </div>
      </div>
    </section>
  `,

  academic: `
    <section class="reveal">
      <h1>Academic Work</h1>
      <p>Showcasing my journey in Biostatistics, data analysis, and open source software.</p>
    </section>

    <section class="reveal text-left" style="width: 100%;">
      <h2>Open Source Software</h2>
      <div class="grid-2">
        <div class="card">
          <h3><i class="fa-solid fa-tree" style="margin-right: 8px;"></i> standrecon</h3>
          <div style="margin-bottom: 1rem;">
            <span class="badge">R Package</span>
            <span class="badge" style="background: rgba(33, 150, 83, 0.15); border: 1px solid rgba(74, 222, 128, 0.3); color: #4ade80;">CRAN v0.1.0</span>
          </div>
          <p>Reconstruct historical forest stand conditions.</p>
          <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
            <a href="https://github.com/kriggithub/standrecon" target="_blank" class="card-link">View on GitHub <span class="link-arrow">&rarr;</span></a>
            <a href="https://cran.r-project.org/web/packages/standrecon/index.html" target="_blank" class="card-link">View on CRAN <span class="link-arrow">&rarr;</span></a>
          </div>
        </div>

        <div class="card">
          <h3><i class="fa-solid fa-circle-nodes" style="margin-right: 8px;"></i> corradar</h3>
          <div style="margin-bottom: 1rem;">
            <span class="badge">R Package</span>
          </div>
          <p>Create correlation-based radar plots.</p>
          <a href="https://github.com/kriggithub/corradar" target="_blank" class="card-link">View on GitHub <span class="link-arrow">&rarr;</span></a>
        </div>
      </div>
    </section>

    <section class="reveal text-left" style="width: 100%;">
      <h2>Research Projects</h2>

      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="about-card-inner">
          <img src="images/acropoma.webp" class="about-photo" alt="Acropoma fish" style="object-position: 5% center;">
          <div>
            <h3><i class="fa-solid fa-fish-fins" style="margin-right: 8px;"></i> Acropoma Diet Partitioning</h3>
            <p style="max-width: none; margin-bottom: 0.75rem;">Evidence of deep-sea trophic resource partitioning between the glowbellies <em>Acropoma hanedai</em> and <em>A. japonicum</em> near Southwestern Taiwan.</p>
            <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
              <a href="https://link.springer.com/article/10.1007/s10641-026-01814-y" target="_blank" class="card-link">Read Article <span class="link-arrow">&rarr;</span></a>
              <a href="https://github.com/kriggithub/Acropoma_Diet_Partitioning" target="_blank" class="card-link muted"><i class="fa-brands fa-github"></i> R Code</a>
            </div>
          </div>
        </div>
      </div>

      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="about-card-inner">
          <img src="images/monkey.webp" class="about-photo" alt="Howler monkey">
          <div>
            <h3><i class="fa-solid fa-industry" style="margin-right: 8px;"></i> Howler Monkeys Edge Effects</h3>
            <p style="max-width: none; margin-bottom: 0.75rem;">A mathematical approach for determining behavioral forest edge effects on howler monkeys (<em>Alouatta palliata</em>) in Costa Rica.</p>
            <div style="display: flex; gap: 1.5rem;">
              <a href="https://github.com/kriggithub/Behavioral_Forest_Edge" target="_blank" class="card-link muted"><i class="fa-brands fa-github"></i> R Code</a>
            </div>
          </div>
        </div>
      </div>

      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="about-card-inner">
          <img src="images/blackbird.webp" class="about-photo" alt="Emberizoid bird">
          <div>
            <h3><i class="fa-solid fa-crow" style="margin-right: 8px;"></i> Emberizoid Hindlimbs</h3>
            <p style="max-width: none; margin-bottom: 0.75rem;">Ecomorphology and phylogenetic signal of hindlimbs in North American sparrows and blackbirds (<em>Passerellidae</em> & <em>Icteridae</em>).</p>
            <div style="display: flex; gap: 1.5rem;">
              <a href="https://github.com/kriggithub/Emberizoid_Hindlimbs" target="_blank" class="card-link muted"><i class="fa-brands fa-github"></i> R Code</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="reveal text-left" style="width: 100%;">
      <h2>Curriculum Vitae</h2>
      <div class="card">
        <h3><i class="fa-solid fa-file-lines" style="margin-right: 8px;"></i> Resume / CV</h3>
        <p>Available for download (Updated Apr 2026).</p>
        <a href="Kurt_Riggin_CV.pdf" target="_blank" class="btn" style="margin-top: 1rem;"><i class="fa-solid fa-download"></i> Download CV</a>
      </div>
    </section>
  `,

  youtube: `
    <section class="reveal">
      <h1>YouTube & Business</h1>
      <p>Documenting the intersection of technology, data, and personal growth.</p>
    </section>

    <section class="reveal text-left" style="width: 100%;">
      <h2>The Channel</h2>
      <p style="margin-bottom: 2rem;">Breaking down complex topics in AI and Biostatistics, alongside productivity systems and tech reviews.</p>
      
      <div class="grid-2">
        <div class="card video-placeholder">
          <!-- Placeholder div for iframe later. Add iframe inside this div once you have the YouTube link -->
          <div class="video-embed-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; background: rgba(0,0,0,0.5); border-radius: 12px; border: 1px dashed rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center;">
            <i class="fa-brands fa-youtube" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 3rem; color: rgba(255,255,255,0.2);"></i>
          </div>
          <h3 style="margin-top: 1.5rem;">Video Coming Soon</h3>
          <p style="font-size: 0.95rem;">Space reserved for an embedded YouTube video.</p>
        </div>
        
        <div class="card video-placeholder">
          <!-- Placeholder div for iframe later -->
          <div class="video-embed-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; background: rgba(0,0,0,0.5); border-radius: 12px; border: 1px dashed rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center;">
            <i class="fa-brands fa-youtube" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 3rem; color: rgba(255,255,255,0.2);"></i>
          </div>
          <h3 style="margin-top: 1.5rem;">Video Coming Soon</h3>
          <p style="font-size: 0.95rem;">Space reserved for an embedded YouTube video.</p>
        </div>
      </div>
    </section>

    <section class="reveal text-left" style="width: 100%; margin-top: 4rem;">
      <div class="card">
        <h2>Business Inquiries</h2>
        <p>
          Interested in collaborating on a data project, sponsoring a video, or just want to connect? Send me an email.
        </p>
        <a href="mailto:krigbusiness@gmail.com" class="btn" style="margin-top: 1.5rem;"><i class="fa-solid fa-envelope"></i> Contact Me</a>
      </div>
    </section>
  `
};

window.contentViews = views;
