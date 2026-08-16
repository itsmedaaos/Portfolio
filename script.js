const pdfProjects = [

 {
    title: "Aoun Charity Platform ",
    category: "Branding",
    file: "assets/pdfs/guidline.pdf",
    description: "Full visual identity and brand presentation."
  },

  {
    title: "Sofara Mobile Application",
    category: "Branding",
    file: "assets/pdfs/s_guideline.pdf",
    description: "Full visual identity and brand presentation."
  },

  {
    title: "Savora — Brand Presentation",
    category: "Branding",
    file: "assets/pdfs/savoraFinal.pdf",
    description: "Full visual identity and brand presentation."
  },

    {
    title: "Omama Store",
    category: "Branding",
    file: "assets/pdfs/FinalResultOmama.pdf",
    description: "Full visual identity and brand presentation."
  },
 

    {
    title: "Egoh",
    category: "Branding",
    file: "assets/pdfs/egoh_new_logo.pdf",
    description: "Full visual identity and brand presentation."
  },

      {
    title: "Asas Company",
    category: "Branding",
    file: "assets/pdfs/هويـة - شركـة أساس التنظيف المثالى.pdf",
    description: "Full visual identity and brand presentation."
  },
 
 

];

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

  const filters = document.querySelectorAll(".filter");
  const projects = document.querySelectorAll(".project");
  filters.forEach(filter => {
    filter.addEventListener("click", () => {
      filters.forEach(f => f.classList.remove("active"));
      filter.classList.add("active");
      const category = filter.dataset.filter;
      projects.forEach(project => {
        project.classList.toggle("hidden", category !== "all" && project.dataset.category !== category);
      });
    });
  });

  const glow = document.querySelector(".cursor-glow");
  window.addEventListener("pointermove", e => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  menuButton.addEventListener("click", () => {
    const open = nav.style.display === "flex";
    nav.style.display = open ? "" : "flex";
    if (!open) {
      nav.style.position = "absolute";
      nav.style.top = "72px";
      nav.style.left = "0";
      nav.style.right = "0";
      nav.style.padding = "25px 5vw";
      nav.style.background = "var(--bg)";
      nav.style.flexDirection = "column";
      nav.style.gap = "20px";
    }
  });

  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = lightbox.querySelector("img");
  const lightboxTitle = lightbox.querySelector(".lightbox-title");
  const lightboxCategory = lightbox.querySelector(".lightbox-category");

  const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
  };

  projects.forEach(project => {
    project.addEventListener("click", () => {
      const img = project.querySelector("img");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxTitle.textContent = project.dataset.title;
      lightboxCategory.textContent = project.dataset.categoryLabel;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
    });
  });

  lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });

  // PDF portfolio
  const pdfGrid = document.getElementById("pdfGrid");
  const pdfEmpty = document.getElementById("pdfEmpty");
  const pdfViewer = document.getElementById("pdfViewer");
  const pdfFrame = document.getElementById("pdfFrame");
  const pdfViewerTitle = document.getElementById("pdfViewerTitle");
  const pdfDownload = document.getElementById("pdfDownload");
  const pdfClose = document.getElementById("pdfClose");

  if (pdfProjects.length) {
    pdfEmpty.classList.add("hidden");
    pdfGrid.innerHTML = pdfProjects.map((pdf, index) => `
      <article class="pdf-card reveal">
        <div class="pdf-card-top">
          <div class="pdf-file-icon">PDF</div>
          <span class="pdf-number">${String(index + 1).padStart(2, "0")}</span>
        </div>
        <div>
          <h3>${escapeHtml(pdf.title)}</h3>
          <p>${escapeHtml(pdf.description || "Complete project file available for online viewing and download.")}</p>
        </div>
        <div class="pdf-card-footer">
          <span class="pdf-card-category">${escapeHtml(pdf.category || "Project file")}</span>
          <div class="pdf-buttons">
            <button class="pdf-card-btn primary pdf-open" data-index="${index}">View PDF ↗</button>
            <a class="pdf-card-btn" href="${encodeURI(pdf.file)}" download>Download ↓</a>
          </div>
        </div>
      </article>
    `).join("");

    pdfGrid.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    pdfGrid.querySelectorAll(".pdf-open").forEach(button => {
      button.addEventListener("click", () => {
        const pdf = pdfProjects[Number(button.dataset.index)];
        pdfViewerTitle.textContent = pdf.title;
        pdfFrame.src = pdf.file;
        pdfDownload.href = pdf.file;
        pdfDownload.setAttribute("download", "");
        pdfViewer.classList.add("open");
        pdfViewer.setAttribute("aria-hidden", "false");
        document.body.classList.add("lightbox-open");
      });
    });
  }

  const closePdfViewer = () => {
    pdfViewer.classList.remove("open");
    pdfViewer.setAttribute("aria-hidden", "true");
    pdfFrame.src = "about:blank";
    document.body.classList.remove("lightbox-open");
  };

  pdfClose.addEventListener("click", closePdfViewer);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeLightbox();
      closePdfViewer();
    }
  });
});

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
