(() => {
  const $ = id => document.getElementById(id);
  const LETTERS = "ABCDEF";

  let cert = null, DOMAINS = [], QUESTIONS = [], PASS = 70, EXAM_SECONDS = 0, EXAM_COUNT = 65;
  let session = null; // {mode, items, idx, startedAt, deadline, timerId, finished}

  const shuffle = arr => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const same = (a, b) => a.length === b.length && a.every(x => b.includes(x));
  const letters = idxs => idxs.map(i => LETTERS[i]).join(" and ");

  // ---------- Home / setup ----------
  $("certGrid").innerHTML = Object.entries(window.CERTS).map(([id, c]) => `
    <button class="cert-card" type="button" data-id="${id}">
      <span class="level">${c.level}</span>
      <span class="code">${c.code}</span>
      <span class="title">${c.title}</span>
      <span class="blurb">${c.blurb}</span>
      <span class="meta">${c.questions.length} questions &middot; ${c.exam.count} question exam &middot; ${c.exam.minutes} min</span>
    </button>`).join("");
  document.querySelectorAll(".cert-card").forEach(b => { b.onclick = () => selectCert(b.dataset.id); });

  function showHome() {
    cert = null;
    session = null;
    $("brandText").textContent = "AWS Certification Practice";
    show("home");
  }

  function selectCert(id) {
    cert = window.CERTS[id];
    DOMAINS = cert.domains;
    QUESTIONS = cert.questions;
    PASS = cert.exam.pass;
    EXAM_COUNT = cert.exam.count;
    EXAM_SECONDS = cert.exam.minutes * 60;
    $("brandText").textContent = `${cert.code} Practice`;
    $("certTitle").textContent = cert.title;
    $("certCode").textContent = cert.code;
    $("bankSize").textContent = QUESTIONS.length;
    $("domainCount").textContent = DOMAINS.length;
    $("examDesc").textContent = `${EXAM_COUNT} questions, ${cert.exam.minutes} minutes, answers shown at the end. Pass mark ${PASS}%.`;
    $("domainSel").innerHTML = '<option value="all">All domains (weighted)</option>' +
      DOMAINS.map((d, i) => `<option value="${i}">${d.name}</option>`).join("");
    $("weights").innerHTML = DOMAINS.map(d => `<span>${d.name}: ${d.weight}%</span>`).join("");
    show("start");
  }

  $("backHome").onclick = showHome;
  $("brand").onclick = e => {
    e.preventDefault();
    if (session && !session.finished && !$("quiz").classList.contains("hidden") && !confirm("Leave this attempt and go back to the certification list?")) return;
    clearInterval(session && session.timerId);
    $("timer").classList.add("hidden");
    showHome();
  };

  // Question shape: q.o = options (for single-answer, first option is correct).
  // Multiple-response questions set q.ma = indices (into q.o) of ALL correct options.
  function prepare(src) {
    const correctOrig = src.ma || [0];
    const opts = shuffle(src.o.map((t, i) => ({ t, ok: correctOrig.includes(i) })));
    return {
      src, q: src.q, d: src.d, e: src.e,
      multi: correctOrig.length > 1,
      opts,
      correct: opts.map((o, i) => (o.ok ? i : -1)).filter(i => i >= 0),
      picked: [],     // array of option indices
      checked: false, // true once answer is locked (practice modes)
      flag: false
    };
  }

  function pickQuestions(mode, domain) {
    let pool = QUESTIONS;
    if (domain !== "all") pool = pool.filter(q => q.d === +domain);
    if (mode === "exam" && domain === "all") {
      let chosen = [];
      DOMAINS.forEach((dm, i) => {
        const n = Math.round(EXAM_COUNT * dm.weight / 100);
        const p = shuffle(QUESTIONS.filter(q => q.d === i));
        chosen = chosen.concat(p.slice(0, n));
      });
      if (chosen.length < EXAM_COUNT) {
        const rest = shuffle(QUESTIONS.filter(q => !chosen.includes(q)));
        chosen = chosen.concat(rest.slice(0, EXAM_COUNT - chosen.length));
      }
      return shuffle(chosen).slice(0, EXAM_COUNT);
    }
    const n = mode === "quick" ? 20 : mode === "exam" ? EXAM_COUNT : pool.length;
    return shuffle(pool).slice(0, n);
  }

  function show(id) {
    ["home", "start", "quiz", "results"].forEach(s => $(s).classList.toggle("hidden", s !== id));
    window.scrollTo(0, 0);
  }

  function start(items, mode) {
    session = { mode, items, idx: 0, startedAt: Date.now(), finished: false, deadline: null, timerId: null };
    clearInterval(session.timerId);
    if (mode === "exam") {
      session.deadline = Date.now() + EXAM_SECONDS * 1000;
      $("timer").classList.remove("hidden");
      tick();
      session.timerId = setInterval(tick, 1000);
    } else {
      $("timer").classList.add("hidden");
    }
    show("quiz");
    render();
  }

  function tick() {
    const left = Math.max(0, Math.round((session.deadline - Date.now()) / 1000));
    const m = String(Math.floor(left / 60)).padStart(2, "0");
    const s = String(left % 60).padStart(2, "0");
    $("timer").textContent = `${m}:${s}`;
    $("timer").classList.toggle("low", left <= 300);
    if (left === 0) finish();
  }

  const instant = () => session.mode !== "exam";
  const cur = () => session.items[session.idx];

  // ---------- Render question ----------
  function render() {
    const it = cur();
    const n = session.items.length;
    $("counter").textContent = `Question ${session.idx + 1} of ${n}`;
    $("domainTag").textContent = DOMAINS[it.d].name;
    $("barFill").style.width = `${((session.idx + 1) / n) * 100}%`;
    $("question").textContent = it.q;
    $("hint").textContent = it.multi ? `Choose ${it.correct.length} answers.` : "Choose one answer.";
    $("hint").classList.remove("hidden");

    $("options").innerHTML = "";
    it.opts.forEach((o, i) => {
      const b = document.createElement("button");
      b.className = "opt";
      b.type = "button";
      b.innerHTML = `<span class="k">${LETTERS[i]}</span><span></span>`;
      b.lastChild.textContent = o.t;
      const isPicked = it.picked.includes(i);
      if (it.checked) {
        b.disabled = true;
        if (it.correct.includes(i)) b.classList.add("correct");
        else if (isPicked) b.classList.add("wrong");
      } else if (isPicked) {
        b.classList.add("selected");
      }
      b.onclick = () => choose(i);
      $("options").appendChild(b);
    });

    const fb = $("feedback");
    if (it.checked) {
      const ok = same(it.picked, it.correct);
      fb.className = "feedback " + (ok ? "ok" : "bad");
      const head = ok ? "Correct. " : `Incorrect. The answer is ${letters(it.correct)}. `;
      fb.textContent = head + it.e;
    } else {
      fb.className = "feedback hidden";
    }

    // Check button: only for multi-response questions in practice modes
    const showCheck = instant() && it.multi && !it.checked;
    $("checkBtn").classList.toggle("hidden", !showCheck);
    $("checkBtn").disabled = it.picked.length === 0;

    $("prevBtn").disabled = session.idx === 0;
    $("nextBtn").textContent = session.idx === n - 1 ? "Finish" : "Next";
    $("flagBtn").classList.toggle("on", it.flag);
    $("flagBtn").textContent = it.flag ? "Flagged" : "Flag for review";
    renderMap();
  }

  function renderMap() {
    const map = $("map");
    map.innerHTML = "";
    session.items.forEach((it, i) => {
      const b = document.createElement("button");
      b.textContent = i + 1;
      if (it.picked.length) b.classList.add("answered");
      if (it.flag) b.classList.add("flag");
      if (i === session.idx) b.classList.add("cur");
      b.onclick = () => { session.idx = i; render(); };
      map.appendChild(b);
    });
  }

  function choose(i) {
    const it = cur();
    if (it.checked) return;
    if (!it.multi) {
      it.picked = [i];
      if (instant()) it.checked = true; // single-answer locks immediately in practice modes
    } else {
      it.picked = it.picked.includes(i)
        ? it.picked.filter(x => x !== i)
        : [...it.picked, i].sort((a, b) => a - b);
    }
    render();
  }

  $("checkBtn").onclick = () => {
    const it = cur();
    if (!it.picked.length) return;
    it.checked = true;
    render();
  };

  $("prevBtn").onclick = () => { if (session.idx > 0) { session.idx--; render(); } };
  $("nextBtn").onclick = () => {
    if (session.idx < session.items.length - 1) { session.idx++; render(); return; }
    const unanswered = session.items.filter(i => i.picked.length === 0).length;
    if (unanswered && !confirm(`You have ${unanswered} unanswered question(s). Finish anyway?`)) return;
    finish();
  };
  $("flagBtn").onclick = () => { const it = cur(); it.flag = !it.flag; render(); };

  document.addEventListener("keydown", e => {
    if ($("quiz").classList.contains("hidden") || !session) return;
    const k = e.key.toLowerCase();
    if (k.length === 1 && "abcdef".includes(k)) {
      const i = "abcdef".indexOf(k);
      if (i < cur().opts.length) choose(i);
    } else if (e.key === "Enter" && cur().multi && !cur().checked && cur().picked.length) {
      $("checkBtn").click();
    } else if (e.key === "ArrowRight") $("nextBtn").click();
    else if (e.key === "ArrowLeft") $("prevBtn").click();
  });

  // ---------- Results ----------
  function finish() {
    if (session.finished) return;
    session.finished = true;
    clearInterval(session.timerId);
    $("timer").classList.add("hidden");

    const items = session.items;
    const correct = items.filter(i => same(i.picked, i.correct)).length;
    const pct = Math.round((correct / items.length) * 100);
    const passed = pct >= PASS;

    $("scorePct").textContent = pct + "%";
    const circle = $("scoreCircle");
    circle.style.setProperty("--p", pct);
    circle.style.setProperty("--c", passed ? "var(--ok)" : "var(--bad)");
    const v = $("verdict");
    v.textContent = passed ? "Pass" : "Not yet";
    v.className = "verdict " + (passed ? "pass" : "fail");
    $("scoreText").textContent = `${correct} of ${items.length} correct. Target: ${PASS}% or higher.`;
    const secs = Math.round((Date.now() - session.startedAt) / 1000);
    $("timeText").textContent = `Time taken: ${Math.floor(secs / 60)}m ${secs % 60}s`;

    $("domainBreakdown").innerHTML = DOMAINS.map((d, di) => {
      const sub = items.filter(i => i.d === di);
      if (!sub.length) return "";
      const c = sub.filter(i => same(i.picked, i.correct)).length;
      const p = Math.round((c / sub.length) * 100);
      return `<div class="dom-row"><div class="lbl"><span>${d.name}</span><span>${c}/${sub.length} (${p}%)</span></div>
        <div class="track"><div class="fill" style="width:${p}%"></div></div></div>`;
    }).join("");

    renderReview("all");
    document.querySelectorAll(".filters .btn").forEach(b => b.classList.toggle("active", b.dataset.f === "all"));
    show("results");
  }

  function renderReview(filter) {
    const box = $("review");
    box.innerHTML = "";
    session.items.forEach((it, i) => {
      const right = same(it.picked, it.correct);
      if (filter === "wrong" && right) return;
      if (filter === "flagged" && !it.flag) return;
      const d = document.createElement("div");
      d.className = "rv " + (right ? "right" : "miss");
      const yours = it.picked.length
        ? it.picked.map(p => `${LETTERS[p]}. ${it.opts[p].t}`).join("; ")
        : "No answer";
      const correctText = it.correct.map(c => `${LETTERS[c]}. ${it.opts[c].t}`).join("; ");
      d.innerHTML = `<strong></strong><p class="you"></p><p class="ans"></p><p class="ex"></p>`;
      d.children[0].textContent = `${i + 1}. ${it.q}${it.flag ? " (flagged)" : ""}`;
      d.children[1].textContent = right ? "" : `Your answer: ${yours}`;
      d.children[2].textContent = `Correct: ${correctText}`;
      d.children[3].textContent = it.e;
      if (right) d.children[1].remove();
      box.appendChild(d);
    });
    if (!box.children.length) box.innerHTML = "<p>Nothing to show here.</p>";
  }

  document.querySelectorAll(".filters .btn").forEach(b => {
    b.onclick = () => {
      document.querySelectorAll(".filters .btn").forEach(x => x.classList.toggle("active", x === b));
      renderReview(b.dataset.f);
    };
  });

  $("retryWrong").onclick = () => {
    const wrong = session.items.filter(i => !same(i.picked, i.correct));
    if (!wrong.length) { alert("No incorrect answers to retry. Nice work!"); return; }
    start(wrong.map(w => prepare(w.src)), "practice");
  };
  $("restart").onclick = () => show("start");

  showHome();

  $("startBtn").onclick = () => {
    const mode = document.querySelector('input[name="mode"]:checked').value;
    const items = pickQuestions(mode, $("domainSel").value).map(prepare);
    if (!items.length) return;
    start(items, mode);
  };

  window.addEventListener("beforeunload", e => {
    if (session && !session.finished && !$("quiz").classList.contains("hidden")) { e.preventDefault(); e.returnValue = ""; }
  });
})();
