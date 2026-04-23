const els = document.querySelectorAll(
  "header, nav, section, article, aside, footer",
);

const panel = document.getElementById("panel");
const codeBox = document.getElementById("code");
const descBox = document.getElementById("desc");
const exampleBox = document.getElementById("example");
const closeBtn = document.getElementById("closeBtn");

const menuBtn = document.getElementById("menuBtn");
const dropdown = document.getElementById("dropdown");
const overlay = document.getElementById("panelOverlay");
const editIndicator = document.getElementById("editIndicator");

/* ========================= */
/* 🧠 LIVE EDIT MODE */
/* ========================= */
let editMode = false;

/* ========================= */
/* RESET UI */
/* ========================= */
function resetUI() {
  els.forEach((e) => {
    e.classList.remove(
      "active",
      "dimmed",
      "parent-highlight",
      "sibling-highlight",
    );
    e.removeAttribute("contenteditable");
  });

  document
    .querySelectorAll("nav button")
    .forEach((b) => b.classList.remove("active-btn"));
}

/* ========================= */
/* RIPPLE */
/* ========================= */
function createRipple(e) {
  const el = e.currentTarget;

  const circle = document.createElement("span");
  const size = Math.max(el.clientWidth, el.clientHeight);

  circle.classList.add("ripple");
  circle.style.width = circle.style.height = size + "px";

  const rect = el.getBoundingClientRect();

  circle.style.left = e.clientX - rect.left - size / 2 + "px";
  circle.style.top = e.clientY - rect.top - size / 2 + "px";

  el.appendChild(circle);

  setTimeout(() => circle.remove(), 600);
}

/* ========================= */
/* COLOR BASED ON MODE */
/* ========================= */

function getEditColor() {
  const body = document.body;

  if (body.classList.contains("mode1")) return "#2f80ed";
  if (body.classList.contains("mode2")) return "#facc15";
  if (body.classList.contains("mode3")) return "#22c55e";

  return "#2f80ed";
}

/* ========================= */
/* INFO DATA */
/* ========================= */
const infoMap = {
  header: {
    desc: "Top section of the page, usually contains logo or title.",
    example: "<header>My Website</header>",
  },
  nav: {
    desc: "Contains navigation links for your website.",
    example: "<nav><a href='#'>Home</a></nav>",
  },
  section: {
    desc: "Groups related content together.",
    example: "<section>...</section>",
  },
  article: {
    desc: "Independent piece of content.",
    example: "<article>Blog post</article>",
  },
  aside: {
    desc: "Sidebar content like ads or links.",
    example: "<aside>Sidebar</aside>",
  },
  footer: {
    desc: "Bottom section of page.",
    example: "<footer>© 2026</footer>",
  },
};

/* ========================= */
/* OPEN PANEL */
/* ========================= */
function openPanel(tag) {
  const panelTitle = document.getElementById("panelTitle");

  panelTitle.textContent = tag.toUpperCase() + " ELEMENT";

  let descHTML = "";
  let codeHTML = "";
  let exampleHTML = "";

  /* ========================= */
  /* 🔹 NAV */
  /* ========================= */
  if (tag === "nav") {
    const nav = document.querySelector("nav");

    const label = nav.querySelector(".nav-label")?.textContent || "";
    const buttons = [...nav.querySelectorAll("button")].filter(
      (b) => b.id !== "addNavBtn",
    );

    descHTML += `<div class="desc-block">
      <h3>📌 Navigation Title</h3>
      <p>${label}</p>
    </div>`;

    descHTML += `<div class="desc-block">
      <h3>🔗 Buttons (${buttons.length})</h3>
      <p>${buttons.map((b) => b.textContent).join(", ")}</p>
    </div>`;

    codeHTML = `<nav>\n`;
    codeHTML += `  <div>${label}</div>\n`;

    buttons.forEach((btn) => {
      codeHTML += `  <button>${btn.textContent}</button>\n`;
    });

    codeHTML += `</nav>`;

    exampleHTML = "Navigation with interactive buttons";
  } else if (tag === "section") {
    /* ========================= */
    /* 🔹 SECTION */
    /* ========================= */
    const section = document.querySelector("section");

    const title = section.querySelector(".main-text")?.textContent || "";
    const items = [...section.querySelectorAll(".inner div")];

    descHTML += `<div class="desc-block">
      <h3>📦 Section Title</h3>
      <p>${title}</p>
    </div>`;

    descHTML += `<div class="desc-block">
      <h3>🧱 Inner Blocks (${items.length})</h3>
      <p>${items.map((i) => i.textContent).join(", ")}</p>
    </div>`;

    codeHTML = `<section>\n`;
    codeHTML += `  <h2>${title}</h2>\n`;
    codeHTML += `  <div class="inner">\n`;

    items.forEach((i) => {
      codeHTML += `    <div>${i.textContent}</div>\n`;
    });

    codeHTML += `  </div>\n</section>`;

    exampleHTML = "Grouped related content";
  } else if (tag === "article") {
    /* ========================= */
    /* 🔹 ARTICLE */
    /* ========================= */
    const article = document.querySelector("article");

    const title = article.querySelector(".main-text")?.textContent || "";
    const items = [...article.querySelectorAll(".inner div")];

    descHTML += `<div class="desc-block">
      <h3>📰 Article Title</h3>
      <p>${title}</p>
    </div>`;

    descHTML += `<div class="desc-block">
      <h3>📄 Content Blocks (${items.length})</h3>
      <p>${items.map((i) => i.textContent).join(", ")}</p>
    </div>`;

    codeHTML = `<article>\n`;
    codeHTML += `  <h2>${title}</h2>\n`;
    codeHTML += `  <div class="inner">\n`;

    items.forEach((i) => {
      codeHTML += `    <div>${i.textContent}</div>\n`;
    });

    codeHTML += `  </div>\n</article>`;

    exampleHTML = "Independent standalone content";
  } else {
    /* ========================= */
    /* 🔹 DEFAULT (others) */
    /* ========================= */
    const data = infoMap[tag];

    descHTML = `<div class="desc-block">
      <h3>ℹ️ Info</h3>
      <p>${data?.desc || ""}</p>
    </div>`;

    codeHTML = `<${tag}>...</${tag}>`;
    exampleHTML = data?.example || "";
  }

  /* ========================= */
  /* APPLY TO PANEL */
  /* ========================= */
  descBox.innerHTML = descHTML;
  codeBox.textContent = codeHTML;
  exampleBox.textContent = exampleHTML;

  panel.classList.add("active");
  overlay.classList.add("active");

  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  document.body.style.paddingRight = scrollbarWidth + "px";
  document.body.style.overflow = "hidden";
}

/* ========================= */
/* CLOSE PANEL */
/* ========================= */
function closePanel() {
  panel.classList.remove("active");
  overlay.classList.remove("active");

  document.body.style.paddingRight = "";
  document.body.style.overflow = "";

  resetUI();
}

closeBtn.onclick = closePanel;
overlay.onclick = closePanel;

/* ========================= */
/* CLICK ELEMENT */
/* ========================= */

els.forEach((el) => {
  el.addEventListener("click", (e) => {
    // ❌ ignore inner blocks (they have their own edit)
    if (e.target.closest(".inner div")) return;

    // ❌ ignore nav buttons (handled separately)
    if (e.target.tagName === "BUTTON") return;

    e.stopPropagation();

    /* ========================= */
    /* ✏️ EDIT MODE (CONTENT BLOCKS) */
    /* ========================= */
    if (editMode) {
      e.stopPropagation();

      // ❌ block helper text only
      if (
        e.target.classList.contains("mini") ||
        e.target.classList.contains("info")
      )
        return;

      // ✅ clear previous edits
      document.querySelectorAll("[contenteditable]").forEach((el) => {
        el.removeAttribute("contenteditable");
        el.style.outline = "";
      });

      // ✅ IMPORTANT: pick correct editable target
      let target = e.target;

      // 🔥 fix: if clicking container, edit main label instead
      if (el.tagName === "HEADER") target = el.querySelector(".header-label");
      if (el.tagName === "FOOTER") target = el.querySelector(".footer-label");
      if (el.tagName === "NAV") target = el.querySelector(".nav-label");
      if (el.tagName === "SECTION") target = el.querySelector(".main-text");
      if (el.tagName === "ARTICLE") target = el.querySelector(".main-text");
      if (el.tagName === "ASIDE") target = el;

      // fallback safety
      if (!target || target.classList?.contains("mini")) return;

      // ✅ enable editing
      // ✅ enable editing
      target.setAttribute("contenteditable", "true");
      target.focus();

      return;
    }

    /* ========================= */
    /* NORMAL MODE */
    /* ========================= */
    createRipple(e);
    resetUI();

    els.forEach((e) => e.classList.add("dimmed"));

    el.classList.remove("dimmed");
    el.classList.add("active");

    const parent = el.parentElement;

    if (parent && parent.matches("main, section, article, nav")) {
      parent.classList.add("parent-highlight");

      Array.from(parent.children).forEach((child) => {
        if (child !== el) {
          child.classList.add("sibling-highlight");
        }
      });
    }

    const tag = el.tagName.toLowerCase();
    openPanel(tag);
  });
});

/* ========================= */
/* ✏️ INNER BLOCK EDIT MODE */
/* ========================= */

const innerEls = document.querySelectorAll(".inner div");

innerEls.forEach((el) => {
  el.addEventListener("click", (e) => {
    if (!editMode) return;

    e.stopPropagation();

    document.querySelectorAll("[contenteditable]").forEach((el) => {
      el.removeAttribute("contenteditable");
      el.style.outline = "";
    });

    el.setAttribute("contenteditable", "true");
    el.style.setProperty("--edit-color", getEditColor());
    el.focus();
  });
});

/* ========================= */
/* ✏️ NAV BUTTON EDIT MODE */
/* ========================= */

document.querySelectorAll("nav button").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (editMode) {
      e.stopPropagation();
      e.preventDefault();

      document.querySelectorAll("[contenteditable]").forEach((el) => {
        el.removeAttribute("contenteditable");
      });

      btn.setAttribute("contenteditable", "true");

      // ✅ just focus (NO cursor forcing, NO color setting)
      btn.focus();

      return;
    }

    const action = btn.dataset.action;

    if (action === "home") {
      home(e);
      return;
    }

    flash(e);
  });
});

/* ========================= */
/* HOME FLASH */
/* ========================= */

function home(e) {
  e.stopPropagation();

  // ❌ BLOCK animation in edit mode
  if (editMode) return;

  const elements = [
    document.querySelector("header"),
    document.querySelector("nav"),
    document.querySelector("section"),
    document.querySelector("article"),
    document.querySelector("aside"),
    document.querySelector("footer"),
  ];

  const body = document.body;

  let color = "";
  if (body.classList.contains("mode1")) color = "#2f80ed";
  if (body.classList.contains("mode2")) color = "#facc15";
  if (body.classList.contains("mode3")) color = "#22c55e";

  elements.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("flash-animate");
      el.style.setProperty("--flash-color", color);

      setTimeout(() => {
        el.classList.remove("flash-animate");
      }, 600);
    }, i * 200);
  });

  codeBox.textContent = "<body> ... full page structure ... </body>";
  descBox.textContent = "This shows how all semantic elements work together.";
  exampleBox.textContent = "<header> + <nav> + <main> + <aside> + <footer>";
}

/* ========================= */
/* 🔥 NAV TARGET FLASH */
/* ========================= */

/* ========================= */
/* 🔥 SMART TEXT MATCH FLASH */
/* ========================= */

function flash(e) {
  e.stopPropagation();
  if (editMode) return;

  const btn = e.currentTarget;
  const targetId = btn.dataset.target;

  // ❌ if no target → do nothing
  if (!targetId) return;

  const target = document.getElementById(targetId);
  if (!target) return;

  resetUI();

  // ✅ highlight active button
  document.querySelectorAll("nav button").forEach((b) => {
    b.classList.remove("active-btn");
  });
  btn.classList.add("active-btn");

  // 🎯 SCROLL TO ELEMENT (MAIN FEATURE)
  target.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });

  // 🎨 color based on mode
  let color = "#2f80ed";
  if (document.body.classList.contains("mode2")) color = "#facc15";
  if (document.body.classList.contains("mode3")) color = "#22c55e";

  // ✨ flash animation
  target.classList.add("flash-animate");
  target.style.setProperty("--flash-color", color);

  setTimeout(() => {
    target.classList.remove("flash-animate");
  }, 700);

  // 📦 highlight parent section/article
  const parent = target.closest("section, article");
  if (parent) parent.classList.add("parent-highlight");

  // 👇 show hint briefly after auto-scroll
  if (hasScroll()) {
    scrollHint.classList.add("show");

    setTimeout(() => {
      scrollHint.classList.remove("show");
    }, 2000);
  }
}

/* ========================= */
/* MODE SWITCH */
/* ========================= */

let mode = 1;

function cycleMode(e) {
  e.stopPropagation();

  mode++;
  if (mode > 3) mode = 1;

  document.body.className = document.body.className.replace(/mode\d/g, "");
  document.body.classList.add("mode" + mode);
}

/* ========================= */
/* DROPDOWN */
/* ========================= */
menuBtn.onclick = (e) => {
  e.stopPropagation();
  dropdown.classList.toggle("active");
  menuBtn.classList.toggle("open");
};

dropdown.onclick = (e) => e.stopPropagation();

document.body.addEventListener("click", () => {
  dropdown.classList.remove("active");
  menuBtn.classList.remove("open");
});

/* ========================= */
/* ✏️ EDIT BUTTON (PENCIL ICON) */
/* ========================= */

const editBtn = document.getElementById("editBtn");

editBtn.onclick = (e) => {
  e.stopPropagation();

  editMode = !editMode;

  document.body.style.cursor = editMode ? "text" : "default";

  editBtn.classList.toggle("active", editMode);

  // ✅ SHOW / HIDE INDICATOR
  if (editIndicator) {
    editIndicator.classList.toggle("active", editMode);
  }

  // turn OFF editing everywhere when disabled
  if (!editMode) {
    document.querySelectorAll("[contenteditable]").forEach((el) => {
      el.removeAttribute("contenteditable");
      el.style.outline = "";
    });
  }
};

/* ========================= */
/* ⌨️ KEYBOARD SHORTCUTS */
/* ========================= */

document.addEventListener("keydown", (e) => {
  const isTyping =
    document.activeElement && document.activeElement.isContentEditable;

  // ✅ ALWAYS allow ESC
if (e.key === "Escape") {
  if (editMode) {
    editMode = false;

    document.body.style.cursor = "default";

    const editBtn = document.getElementById("editBtn");
    if (editBtn) editBtn.classList.remove("active");

    document.querySelectorAll("[contenteditable]").forEach((el) => {
      el.removeAttribute("contenteditable");
      el.style.outline = "";
    });

    // ✅ HIDE EDIT INDICATOR
    if (editIndicator) {
      editIndicator.classList.remove("active");
    }

    return;
  }

  closePanel();
  return;
}

  // 🚫 block other shortcuts while typing
  if (isTyping) return;

  // 🔁 MODE SWITCH (L)
  if (e.key.toLowerCase() === "l") {
    cycleMode(e);
  }

  // ✏️ EDIT MODE (E)
if (e.key.toLowerCase() === "e") {
  editMode = !editMode;

  document.body.style.cursor = editMode ? "text" : "default";

  const editBtn = document.getElementById("editBtn");
  if (editBtn) editBtn.classList.toggle("active", editMode);

  // ✅ SYNC INDICATOR
  if (editIndicator) {
    editIndicator.classList.toggle("active", editMode);
  }

  if (!editMode) {
    document.querySelectorAll("[contenteditable]").forEach((el) => {
      el.removeAttribute("contenteditable");
      el.style.outline = "";
    });
  }
}
});

/* ========================= */
/* CLICK OUTSIDE EDIT */
/* ========================= */

document.addEventListener("click", (e) => {
  if (!editMode) return;

  if (!e.target.closest("[contenteditable='true']")) {
    document.querySelectorAll("[contenteditable]").forEach((el) => {
      el.removeAttribute("contenteditable");
      el.style.outline = "";
    });
  }
});

/* ========================= */
/* ⌨️ FIX SPACE IN NAV EDIT */
/* ========================= */

const addNavBtn = document.getElementById("addNavBtn");

addNavBtn.onclick = (e) => {
  e.stopPropagation();

  const nav = document.querySelector("nav");

  const newBtn = document.createElement("button");
  newBtn.textContent = "New";
  newBtn.dataset.target = "";

  // 👉 insert before +
  nav.insertBefore(newBtn, addNavBtn);

  attachNavEvents(newBtn);
  syncNavTargets(); // 🔥 ADD THIS
};

const addSectionBtn = document.getElementById("addSectionBtn");

let sectionCount = 3;

addSectionBtn.onclick = (e) => {
  e.stopPropagation();

  // ❌ prevent edit behavior
  if (editMode) return;

  const container = addSectionBtn.parentElement;

  const newDiv = document.createElement("div");
  newDiv.textContent = "Section" + sectionCount;
  newDiv.id = "s" + sectionCount;

  sectionCount++;

  container.insertBefore(newDiv, addSectionBtn);

  attachInnerEvents(newDiv);
  syncNavTargets();
};

const addArticleBtn = document.getElementById("addArticleBtn");

let articleCount = 3;

addArticleBtn.onclick = (e) => {
  e.stopPropagation();

  // ❌ prevent edit behavior
  if (editMode) return;

  const container = addArticleBtn.parentElement;

  const newDiv = document.createElement("div");
  newDiv.textContent = "Article" + articleCount;
  newDiv.id = "a" + articleCount;

  articleCount++;

  container.insertBefore(newDiv, addArticleBtn);

  attachInnerEvents(newDiv);
  syncNavTargets();
};

function attachNavEvents(btn) {
  btn.addEventListener("click", (e) => {
    // ❌ block "+" from edit mode
    if (btn.id === "addNavBtn") {
      e.stopPropagation();
      return;
    }

    if (editMode) {
      e.stopPropagation();
      e.preventDefault();

      document.querySelectorAll("[contenteditable]").forEach((el) => {
        el.removeAttribute("contenteditable");
      });

      btn.setAttribute("contenteditable", "true");
      btn.focus();
      return;
    }

    flash(e);
  });

  btn.addEventListener("keydown", (e) => {
    if (e.key === " ") e.stopPropagation();
  });

  btn.addEventListener("input", syncNavTargets);
}

function attachInnerEvents(el) {
  el.addEventListener("click", (e) => {
    if (!editMode) return;

    e.stopPropagation();

    document.querySelectorAll("[contenteditable]").forEach((el) => {
      el.removeAttribute("contenteditable");
      el.style.outline = "";
    });

    el.setAttribute("contenteditable", "true");
    el.style.setProperty("--edit-color", getEditColor());
    el.focus();
  });

  // 🔥 NEW: live sync
  el.addEventListener("input", syncNavTargets);
}

function makeId(text) {
  return (
    text.toLowerCase().trim().replace(/\s+/g, "").replace(/[^\w]/g, "") || null
  );
}

function syncNavTargets() {
  const blocks = document.querySelectorAll(".inner div");

  const map = {};

  // 🔹 build map from section/article blocks
  blocks.forEach((block) => {
    const text = block.textContent.trim();
    const id = makeId(text);

    if (!id) return;

    block.id = id; // ✅ always update ID
    map[id] = block;
  });

  // 🔹 connect nav buttons
  document.querySelectorAll("nav button").forEach((btn) => {
    // ❌ skip "+" button
    if (btn.id === "addNavBtn") return;

    const text = btn.textContent.trim();
    const id = makeId(text);

    if (!id) {
      btn.dataset.target = "";
      return;
    }

    if (map[id]) {
      btn.dataset.target = id; // ✅ connected
    } else {
      btn.dataset.target = ""; // ❌ no match
    }
  });
}

syncNavTargets();

// ✅ attach to EXISTING nav buttons
document.querySelectorAll("nav button").forEach((btn) => {
  if (btn.id === "addNavBtn") return;
  attachNavEvents(btn);
});

// ✅ attach to EXISTING section/article blocks
document.querySelectorAll(".inner div").forEach((el) => {
  attachInnerEvents(el);
});

