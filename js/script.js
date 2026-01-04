/* DATA */
const classesData = [
  { id: "gitar-pemula", name: "Kelas Gitar Pemula", instrument: "Gitar", level: "Pemula", duration: "8 pertemuan", price: 450000, studio: "Studio A", desc: "Belajar dasar chord, strumming, dan lagu sederhana.", scheduleHint: "Senin / Rabu / Jumat (15:00-19:00)" },
  { id: "gitar-menengah", name: "Kelas Gitar Menengah", instrument: "Gitar", level: "Menengah", duration: "8 pertemuan", price: 550000, studio: "Studio A", desc: "Teknik picking, rhythm lanjutan, dan improvisasi dasar.", scheduleHint: "Selasa / Kamis (16:00-20:00)" },
  { id: "piano-pemula", name: "Kelas Piano Pemula", instrument: "Piano", level: "Pemula", duration: "8 pertemuan", price: 500000, studio: "Studio B", desc: "Dasar notasi, posisi tangan, dan latihan koordinasi.", scheduleHint: "Senin / Kamis (14:00-18:00)" },
  { id: "drum-pemula", name: "Kelas Drum Pemula", instrument: "Drum", level: "Pemula", duration: "8 pertemuan", price: 520000, studio: "Studio C", desc: "Basic groove, timing, dan teknik stick control.", scheduleHint: "Rabu / Sabtu (15:00-20:00)" },
  { id: "vokal-pemula", name: "Kelas Vokal Pemula", instrument: "Vokal", level: "Pemula", duration: "6 pertemuan", price: 400000, studio: "Studio D", desc: "Pemanasan, pernapasan, dan intonasi dasar.", scheduleHint: "Selasa / Jumat (14:00-18:00)" },
  { id: "biola-pemula", name: "Kelas Biola Pemula", instrument: "Biola", level: "Pemula", duration: "8 pertemuan", price: 600000, studio: "Studio B", desc: "Teknik bowing dasar dan latihan nada.", scheduleHint: "Kamis / Sabtu (14:00-18:00)" },
];

const instructorsData = [
  { name: "Komang Sari", instrument: "Piano", exp: "7+ tahun", photo: "media/instruktur/Komang%20Sari.png", bio: "Pendekatan bertahap: notasi, koordinasi, dan lagu populer." },
  { name: "Made Arya", instrument: "Gitar", exp: "5+ tahun", photo: "media/instruktur/Made%20Arya.png", bio: "Fokus pada teknik rhythm & fingerstyle untuk pemula–menengah." },
  { name: "Putu Lestari", instrument: "Vokal", exp: "8+ tahun", photo: "media/instruktur/Putu%20Lestari.png", bio: "Breathing, placement, dan kontrol pitch dengan latihan aman." },
  { name: "Wayan Yoga", instrument: "Drum", exp: "6+ tahun", photo: "media/instruktur/Wayan%20Yoga.png", bio: "Groove, timing, dan dinamika permainan band." },
];

const scheduleData = [
  { day: "Senin", time: "14:00", classId: "piano-pemula", instructor: "Komang Sari", studio: "Studio B" },
  { day: "Senin", time: "16:00", classId: "gitar-pemula", instructor: "Made Arya", studio: "Studio A" },
  { day: "Selasa", time: "14:00", classId: "vokal-pemula", instructor: "Putu Lestari", studio: "Studio D" },
  { day: "Selasa", time: "18:00", classId: "gitar-menengah", instructor: "Made Arya", studio: "Studio A" },
  { day: "Rabu", time: "15:00", classId: "drum-pemula", instructor: "Wayan Yoga", studio: "Studio C" },
  { day: "Rabu", time: "17:00", classId: "gitar-pemula", instructor: "Made Arya", studio: "Studio A" },
  { day: "Kamis", time: "14:00", classId: "piano-pemula", instructor: "Komang Sari", studio: "Studio B" },
  { day: "Kamis", time: "16:00", classId: "biola-pemula", instructor: "Komang Sari", studio: "Studio B" },
  { day: "Jumat", time: "15:00", classId: "gitar-pemula", instructor: "Made Arya", studio: "Studio A" },
  { day: "Jumat", time: "17:00", classId: "vokal-pemula", instructor: "Putu Lestari", studio: "Studio D" },
  { day: "Sabtu", time: "15:00", classId: "drum-pemula", instructor: "Wayan Yoga", studio: "Studio C" },
  { day: "Sabtu", time: "16:00", classId: "biola-pemula", instructor: "Komang Sari", studio: "Studio B" },
];

/* UTIL */
function formatRupiah(n){
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(n);
}
function getClassById(id){
  return classesData.find(c => c.id === id);
}
function unique(arr){
  return [...new Set(arr)];
}
function setActiveNav(){
  const path = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("[data-nav]").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if(href === path) a.classList.add("active");
  });
}

/* KELAS PAGE*/
function initKelasPage(){
  const listEl = document.getElementById("classList");
  if(!listEl) return;

  const instrumentSelect = document.getElementById("filterInstrument");
  const levelSelect = document.getElementById("filterLevel");
  const priceSelect = document.getElementById("filterPrice");
  const searchInput = document.getElementById("searchClass");
  const resetBtn = document.getElementById("btnResetFilter");

  if(instrumentSelect){
    unique(classesData.map(c => c.instrument)).sort().forEach(ins => {
      instrumentSelect.insertAdjacentHTML("beforeend", `<option value="${ins}">${ins}</option>`);
    });
  }

  function passPriceRange(price, range){
    if(!range) return true;
    if(range === "lt500") return price < 500000;
    if(range === "500to600") return price >= 500000 && price <= 600000;
    if(range === "gt600") return price > 600000;
    return true;
  }

  function renderCards(items){
    if(!items.length){
      listEl.innerHTML = `
        <div class="col-12">
          <div class="alert alert-warning mb-0">
            Tidak ada kelas yang cocok. Coba reset filter.
          </div>
        </div>`;
      return;
    }

    listEl.innerHTML = items.map(c => `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card card-hover h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start gap-2">
              <h5 class="card-title mb-1">${c.name}</h5>
              <span class="badge badge-soft">${c.level}</span>
            </div>
            <div class="small-muted mb-2">${c.instrument} • ${c.duration} • ${c.studio}</div>
            <p class="card-text mb-3">${c.desc}</p>
            <div class="d-flex justify-content-between align-items-center">
              <strong>${formatRupiah(c.price)}</strong>
              <div class="d-flex gap-2">
                <button class="btn btn-outline-primary btn-sm" data-detail="${c.id}"
                        data-bs-toggle="modal" data-bs-target="#classDetailModal">
                  Detail
                </button>
                <a class="btn btn-primary btn-sm" href="daftar.html?kelas=${encodeURIComponent(c.id)}">
                  Daftar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `).join("");
  }

  function applyFilters(){
    const q = (searchInput?.value || "").trim().toLowerCase();
    const ins = instrumentSelect?.value || "";
    const lvl = levelSelect?.value || "";
    const pr = priceSelect?.value || "";

    const filtered = classesData.filter(c => {
      const matchQ = !q || (c.name.toLowerCase().includes(q) || c.instrument.toLowerCase().includes(q));
      const matchIns = !ins || c.instrument === ins;
      const matchLvl = !lvl || c.level === lvl;
      const matchPrice = passPriceRange(c.price, pr);
      return matchQ && matchIns && matchLvl && matchPrice;
    });

    renderCards(filtered);
  }

  [instrumentSelect, levelSelect, priceSelect].forEach(el => el && el.addEventListener("change", applyFilters));
  searchInput && searchInput.addEventListener("input", applyFilters);

  resetBtn && resetBtn.addEventListener("click", () => {
    if(searchInput) searchInput.value = "";
    if(instrumentSelect) instrumentSelect.value = "";
    if(levelSelect) levelSelect.value = "";
    if(priceSelect) priceSelect.value = "";
    applyFilters();
  });

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-detail]");
    if(!btn) return;

    const id = btn.getAttribute("data-detail");
    const c = getClassById(id);
    if(!c) return;

    const titleEl = document.getElementById("modalClassTitle");
    const bodyEl = document.getElementById("modalClassBody");
    const ctaEl = document.getElementById("modalClassCTA");

    if(titleEl) titleEl.textContent = c.name;
    if(bodyEl){
      bodyEl.innerHTML = `
        <div class="mb-2">
          <span class="badge badge-soft">${c.level}</span>
          <span class="ms-2 small-muted">${c.instrument}</span>
        </div>
        <ul class="mb-3">
          <li><strong>Durasi:</strong> ${c.duration}</li>
          <li><strong>Studio:</strong> ${c.studio}</li>
          <li><strong>Estimasi Jadwal:</strong> ${c.scheduleHint}</li>
          <li><strong>Harga:</strong> ${formatRupiah(c.price)}</li>
        </ul>
        <p class="mb-0">${c.desc}</p>
      `;
    }
    if(ctaEl) ctaEl.setAttribute("href", `daftar.html?kelas=${encodeURIComponent(c.id)}`);
  });

  applyFilters();
}

/* INSTRUKTUR PAGE */
function initInstrukturPage(){
  const wrap = document.getElementById("instructorList");
  if(!wrap) return;

  wrap.innerHTML = instructorsData.map(i => `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card card-hover h-100">
        <div class="card-body d-flex gap-3">
          <img src="${i.photo}" alt="Foto instruktur ${i.name}"
               class="rounded-circle border instructor-photo" width="72" height="72" loading="lazy">
          <div class="flex-grow-1">
            <div class="d-flex justify-content-between align-items-start gap-2">
              <div>
                <h5 class="mb-1">${i.name}</h5>
                <div class="small-muted">Spesialis: ${i.instrument} • ${i.exp}</div>
              </div>
              <span class="badge badge-soft">${i.instrument}</span>
            </div>
            <p class="mt-2 mb-0">${i.bio}</p>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

/* JADWAL PAGE */

function initJadwalPage(){
  const body = document.getElementById("scheduleBody");
  if(!body) return;

  const daySelect = document.getElementById("filterDay");
  const instrumentSelect = document.getElementById("filterSchedInstrument");
  const instructorSelect = document.getElementById("filterInstructor");
  const resetBtn = document.getElementById("btnResetSchedule");

  if(daySelect){
    unique(scheduleData.map(s => s.day)).forEach(d =>
      daySelect.insertAdjacentHTML("beforeend", `<option value="${d}">${d}</option>`)
    );
  }
  if(instrumentSelect){
    unique(classesData.map(c => c.instrument)).sort().forEach(ins =>
      instrumentSelect.insertAdjacentHTML("beforeend", `<option value="${ins}">${ins}</option>`)
    );
  }
  if(instructorSelect){
    unique(scheduleData.map(s => s.instructor)).sort().forEach(i =>
      instructorSelect.insertAdjacentHTML("beforeend", `<option value="${i}">${i}</option>`)
    );
  }

  function renderRows(items){
    if(!items.length){
      body.innerHTML = `<tr><td colspan="5"><div class="alert alert-warning mb-0">Jadwal tidak ditemukan. Coba reset filter.</div></td></tr>`;
      return;
    }

    body.innerHTML = items.map(s => {
      const c = getClassById(s.classId);
      const className = c ? c.name : s.classId;
      const instrument = c ? c.instrument : "-";
      return `
        <tr>
          <td>${s.day}</td>
          <td>${s.time}</td>
          <td>${className}<div class="small-muted">${instrument}</div></td>
          <td>${s.instructor}</td>
          <td>${s.studio}</td>
        </tr>
      `;
    }).join("");
  }

  function apply(){
    const d = daySelect?.value || "";
    const ins = instrumentSelect?.value || "";
    const inst = instructorSelect?.value || "";

    const filtered = scheduleData.filter(s => {
      const c = getClassById(s.classId);
      const matchDay = !d || s.day === d;
      const matchInstructor = !inst || s.instructor === inst;
      const matchInstrument = !ins || (c && c.instrument === ins);
      return matchDay && matchInstructor && matchInstrument;
    });

    const dayOrder = ["Senin","Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"];
    filtered.sort((a,b) => {
      const da = dayOrder.indexOf(a.day), db = dayOrder.indexOf(b.day);
      if(da !== db) return da - db;
      return a.time.localeCompare(b.time);
    });

    renderRows(filtered);
  }

  [daySelect, instrumentSelect, instructorSelect].forEach(el => el && el.addEventListener("change", apply));
  resetBtn && resetBtn.addEventListener("click", () => {
    if(daySelect) daySelect.value = "";
    if(instrumentSelect) instrumentSelect.value = "";
    if(instructorSelect) instructorSelect.value = "";
    apply();
  });

  apply();
}

/* DAFTAR PAGE */
function initDaftarPage(){
  const form = document.getElementById("regForm");
  if(!form) return;

  const classSelect = document.getElementById("selectClass");
  const nameEl = document.getElementById("fullName");
  const phoneEl = document.getElementById("phone");
  const emailEl = document.getElementById("email");

  // isi dropdown kelas
  if(classSelect){
    classesData.forEach(c => {
      classSelect.insertAdjacentHTML(
        "beforeend",
        `<option value="${c.id}">${c.name} — ${formatRupiah(c.price)}</option>`
      );
    });
  }

  // auto pilih kelas dari url 
  const params = new URLSearchParams(window.location.search);
  const kelasId = params.get("kelas");
  if(kelasId && classSelect) classSelect.value = kelasId;

  function isValidEmail(v){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }
  function onlyDigits(v){
    return /^[0-9]{9,14}$/.test(v);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = (nameEl?.value || "").trim();
    const phone = (phoneEl?.value || "").trim();
    const email = (emailEl?.value || "").trim();
    const chosenClass = classSelect?.value || "";

    form.classList.add("was-validated");

    let ok = true;
    if(!name) ok = false;
    if(!onlyDigits(phone)) ok = false;
    if(!isValidEmail(email)) ok = false;
    if(!chosenClass) ok = false;

    if(!ok) return;

    if(window.Swal){
      const c = getClassById(chosenClass);
      Swal.fire({
        icon: "success",
        title: "Pendaftaran Berhasil!",
        html: `Kamu terdaftar untuk <b>${c ? c.name : "kelas pilihan"}</b>.<br/>Kami akan menghubungi via WhatsApp/Email.`,
        confirmButtonText: "OK"
      }).then(() => {
        form.reset();
        form.classList.remove("was-validated");
      });
    } else {
      alert("Pendaftaran berhasil!");
      form.reset();
      form.classList.remove("was-validated");
    }
  });
}

/* AUDIO */
function initAudioPlayer(){
  const select = document.getElementById("audioSelect");
  const playBtn = document.getElementById("audioPlayBtn");
  const stopBtn = document.getElementById("audioStopBtn");
  const seek = document.getElementById("audioSeek");
  const vol = document.getElementById("audioVolume");
  const timeEl = document.getElementById("audioTime");
  const labelEl = document.getElementById("audioLabel");
  const audio = document.getElementById("audioPlayer");

  if(!select || !playBtn || !stopBtn || !seek || !vol || !timeEl || !labelEl || !audio) return;

  function formatTime(sec){
    if(!isFinite(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function setLabel(){
    labelEl.textContent = select.options[select.selectedIndex]?.textContent || "-";
  }

  function loadSelected(){
    audio.src = select.value;
    audio.load();
    setLabel();
    seek.value = 0;
    timeEl.textContent = `0:00 / 0:00`;
  }

  audio.volume = parseFloat(vol.value || "0.9");
  loadSelected();

  select.addEventListener("change", () => {
    const wasPlaying = !audio.paused;
    loadSelected();
    if(wasPlaying) audio.play().catch(() => {});
  });

  playBtn.addEventListener("click", () => {
    if(audio.paused){
      audio.play().catch(() => alert("Audio gagal diputar. Cek file/path audio."));
    } else {
      audio.pause();
    }
  });

  stopBtn.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;
  });

  audio.addEventListener("loadedmetadata", () => {
    timeEl.textContent = `0:00 / ${formatTime(audio.duration)}`;
  });

  audio.addEventListener("timeupdate", () => {
    if(!isFinite(audio.duration) || audio.duration <= 0) return;
    const percent = (audio.currentTime / audio.duration) * 100;
    seek.value = String(Math.floor(percent));
    timeEl.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
  });

  seek.addEventListener("input", () => {
    if(!isFinite(audio.duration) || audio.duration <= 0) return;
    const percent = parseFloat(seek.value || "0") / 100;
    audio.currentTime = audio.duration * percent;
  });

  vol.addEventListener("input", () => {
    audio.volume = parseFloat(vol.value || "0.9");
  });
}

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  initKelasPage();
  initInstrukturPage();
  initJadwalPage();
  initDaftarPage();
  initAudioPlayer();
});
