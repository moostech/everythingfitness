/* ==========================================================================
   EVERYTHING FITNESS STUDIO - JAVASCRIPT ENGINE
   Controls: Time-Row Schedule, Real-Time Capacity Tracker, Booking & Auth
   ========================================================================== */

// STATE MANAGEMENT
let currentDateOffset = 0; // 0 = Current Week (May 18-24, 2026)
let selectedDayIndex = 1; // Default Monday
let activeTypeFilter = 'all';
let activeInstructorFilter = 'all';

// MASTER SCHEDULE DATA (Days 0=SUN, 1=MON, 2=TUE, 3=WED, 4=THU, 5=FRI, 6=SAT)
let scheduleData = [
  // SUNDAY (0)
  { id: 101, day: 0, time: "7:00 AM - 8:00 AM", title: "Yoga Flow & Breath", type: "yoga", isWomenOnly: false, instructor: "Sora", room: "Studio A", max: 20, booked: 18 },
  { id: 102, day: 0, time: "8:30 AM - 9:30 AM", title: "Women-Only Reformer Sculpt", type: "reformer", isWomenOnly: true, instructor: "Mariam", room: "Reformer Bay", max: 12, booked: 10 },
  { id: 103, day: 0, time: "9:00 AM - 9:25 AM", title: "Static Assisted Stretch", type: "stretch", isWomenOnly: false, instructor: "James", room: "Stretch Bay 1", max: 2, booked: 1 },
  { id: 104, day: 0, time: "10:00 AM - 11:00 AM", title: "Women-Only Zumba Dance", type: "zumba", isWomenOnly: true, instructor: "Elena", room: "Studio B", max: 20, booked: 14 },

  // MONDAY (1)
  { id: 201, day: 1, time: "6:00 AM - 7:00 AM", title: "Reformer Power Pilates", type: "reformer", isWomenOnly: false, instructor: "Mariam", room: "Reformer Bay", max: 12, booked: 9 },
  { id: 202, day: 1, time: "7:30 AM - 8:30 AM", title: "Women-Only Vinyasa Yoga", type: "yoga", isWomenOnly: true, instructor: "Sora", room: "Studio A", max: 20, booked: 12 },
  { id: 203, day: 1, time: "8:00 AM - 8:25 AM", title: "Static Assisted Stretch", type: "stretch", isWomenOnly: false, instructor: "James", room: "Stretch Bay 1", max: 2, booked: 1 },
  { id: 204, day: 1, time: "9:00 AM - 10:00 AM", title: "Reformer Alignment & Tone", type: "reformer", isWomenOnly: false, instructor: "Mariam", room: "Reformer Bay", max: 12, booked: 11 },
  { id: 205, day: 1, time: "5:30 PM - 6:30 PM", title: "Women-Only Zumba Cardio", type: "zumba", isWomenOnly: true, instructor: "Elena", room: "Studio B", max: 20, booked: 15 },
  { id: 206, day: 1, time: "6:00 PM - 6:50 PM", title: "Deep Assisted Stretch Therapy", type: "stretch", isWomenOnly: false, instructor: "James", room: "Stretch Bay 2", max: 2, booked: 2 },

  // TUESDAY (2)
  { id: 301, day: 2, time: "7:00 AM - 8:00 AM", title: "Women-Only Reformer Jumpboard", type: "reformer", isWomenOnly: true, instructor: "Mariam", room: "Reformer Bay", max: 12, booked: 12 },
  { id: 302, day: 2, time: "8:30 AM - 9:30 AM", title: "Hot Yoga Sculpt & Tone", type: "yoga", isWomenOnly: false, instructor: "Sora", room: "Studio A", max: 20, booked: 17 },
  { id: 303, day: 2, time: "9:30 AM - 9:55 AM", title: "Static Assisted Stretch", type: "stretch", isWomenOnly: false, instructor: "James", room: "Stretch Bay 1", max: 2, booked: 0 },
  { id: 304, day: 2, time: "11:00 AM - 12:00 PM", title: "Zumba High Energy", type: "zumba", isWomenOnly: false, instructor: "Elena", room: "Studio B", max: 20, booked: 8 },

  // WEDNESDAY (3)
  { id: 401, day: 3, time: "6:00 AM - 7:00 AM", title: "Reformer Core Foundations", type: "reformer", isWomenOnly: false, instructor: "Mariam", room: "Reformer Bay", max: 12, booked: 7 },
  { id: 402, day: 3, time: "8:00 AM - 9:00 AM", title: "Women-Only Restorative Yoga", type: "yoga", isWomenOnly: true, instructor: "Sora", room: "Studio A", max: 20, booked: 10 },
  { id: 403, day: 3, time: "9:00 AM - 9:25 AM", title: "Static Assisted Stretch", type: "stretch", isWomenOnly: false, instructor: "James", room: "Stretch Bay 2", max: 2, booked: 1 },
  { id: 404, day: 3, time: "5:00 PM - 6:00 PM", title: "Women-Only Reformer Conditioning", type: "reformer", isWomenOnly: true, instructor: "Mariam", room: "Reformer Bay", max: 12, booked: 10 },

  // THURSDAY (4)
  { id: 501, day: 4, time: "6:00 AM - 7:00 AM", title: "Reformer Cardio Reform", type: "reformer", isWomenOnly: false, instructor: "Mariam", room: "Reformer Bay", max: 12, booked: 8 },
  { id: 502, day: 4, time: "7:30 AM - 8:30 AM", title: "Yin Yoga & Breathwork", type: "yoga", isWomenOnly: false, instructor: "Sora", room: "Studio A", max: 20, booked: 11 },
  { id: 503, day: 4, time: "9:00 AM - 10:00 AM", title: "Static Assisted Stretch", type: "stretch", isWomenOnly: false, instructor: "James", room: "Stretch Bay 1", max: 2, booked: 1 },
  { id: 504, day: 4, time: "6:00 PM - 7:00 PM", title: "Women-Only Zumba Fiesta", type: "zumba", isWomenOnly: true, instructor: "Elena", room: "Studio B", max: 20, booked: 19 },

  // FRIDAY (5)
  { id: 601, day: 5, time: "7:00 AM - 8:00 AM", title: "Women-Only Reformer Sculpt", type: "reformer", isWomenOnly: true, instructor: "Mariam", room: "Reformer Bay", max: 12, booked: 11 },
  { id: 602, day: 5, time: "9:00 AM - 10:00 AM", title: "Static Assisted Stretch", type: "stretch", isWomenOnly: false, instructor: "James", room: "Stretch Bay 2", max: 2, booked: 0 },
  { id: 603, day: 5, time: "10:30 AM - 11:30 AM", title: "Flow & Glow Yoga", type: "yoga", isWomenOnly: false, instructor: "Sora", room: "Studio A", max: 20, booked: 14 },
  { id: 604, day: 5, time: "5:00 PM - 6:00 PM", title: "Zumba Dance Kickoff", type: "zumba", isWomenOnly: false, instructor: "Elena", room: "Studio B", max: 20, booked: 9 },

  // SATURDAY (6)
  { id: 701, day: 6, time: "8:00 AM - 9:00 AM", title: "Women-Only Reformer Masterclass", type: "reformer", isWomenOnly: true, instructor: "Mariam", room: "Reformer Bay", max: 12, booked: 11 },
  { id: 702, day: 6, time: "9:30 AM - 10:30 AM", title: "Vinyasa Flow & Sound Bath", type: "yoga", isWomenOnly: false, instructor: "Sora", room: "Studio A", max: 20, booked: 18 },
  { id: 703, day: 6, time: "10:00 AM - 10:50 AM", title: "Static Assisted Stretch", type: "stretch", isWomenOnly: false, instructor: "James", room: "Stretch Bay 1", max: 2, booked: 2 },
  { id: 704, day: 6, time: "11:00 AM - 12:00 PM", title: "Women-Only Zumba Party", type: "zumba", isWomenOnly: true, instructor: "Elena", room: "Studio B", max: 20, booked: 16 }
];

// USER BOOKING HISTORY SIMULATION
let userBookings = [
  { id: 201, title: "Reformer Power Pilates", time: "Mon, May 19 · 6:00 AM", instructor: "Mariam K.", room: "Reformer Bay" },
  { id: 303, title: "Static Assisted Stretch", time: "Tue, May 20 · 9:30 AM", instructor: "James L.", room: "Stretch Bay 1" }
];

let selectedSlotForBooking = null;
let isLoggedIn = false;

// DOM INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  renderDayTabs();
  renderSchedule();
  setupScrollHeader();
  renderDashboardContent('bookings');
});

// SCROLL HEADER STICKY EFFECT
function setupScrollHeader() {
  const header = document.getElementById("siteHeader");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.style.boxShadow = "var(--shadow-md)";
    } else {
      header.style.boxShadow = "none";
    }
  });
}

// RENDER DAY TABS
function renderDayTabs() {
  const container = document.getElementById("dayTabsContainer");
  const days = [
    { name: "SUN", date: "5/18" },
    { name: "MON", date: "5/19" },
    { name: "TUE", date: "5/20" },
    { name: "WED", date: "5/21" },
    { name: "THU", date: "5/22" },
    { name: "FRI", date: "5/23" },
    { name: "SAT", date: "5/24" }
  ];

  container.innerHTML = days.map((day, idx) => `
    <div class="day-tab ${idx === selectedDayIndex ? 'active' : ''}" onclick="selectDay(${idx})">
      <span class="day-name">${day.name}</span>
      <span class="day-date">${day.date}</span>
    </div>
  `).join("");
}

function selectDay(index) {
  selectedDayIndex = index;
  renderDayTabs();
  renderSchedule();
}

function changeWeek(direction) {
  currentDateOffset += direction;
  const dateRangeEl = document.getElementById("dateRangeText");
  if (currentDateOffset === 0) {
    dateRangeEl.innerText = "May 18 – May 24, 2026";
  } else if (currentDateOffset > 0) {
    dateRangeEl.innerText = "May 25 – May 31, 2026";
  } else {
    dateRangeEl.innerText = "May 11 – May 17, 2026";
  }
  renderSchedule();
}

// SCHEDULE FILTERING & RENDERING (TIME-ROW LAYOUT)
function applyScheduleFilters() {
  activeTypeFilter = document.getElementById("typeFilter").value;
  activeInstructorFilter = document.getElementById("instructorFilter").value;
  renderSchedule();
}

function resetScheduleFilters() {
  document.getElementById("typeFilter").value = "all";
  document.getElementById("instructorFilter").value = "all";
  activeTypeFilter = "all";
  activeInstructorFilter = "all";
  renderSchedule();
}

function filterScheduleAndScroll(type) {
  document.getElementById("typeFilter").value = type;
  activeTypeFilter = type;
  renderSchedule();
  scrollToSection("schedule");
}

function renderSchedule() {
  const container = document.getElementById("scheduleGrid");
  
  let filtered = scheduleData.filter(item => item.day === selectedDayIndex);

  if (activeTypeFilter === "women") {
    filtered = filtered.filter(item => item.isWomenOnly);
  } else if (activeTypeFilter !== "all") {
    filtered = filtered.filter(item => item.type === activeTypeFilter);
  }

  if (activeInstructorFilter !== "all") {
    filtered = filtered.filter(item => item.instructor.toLowerCase().includes(activeInstructorFilter.toLowerCase()));
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; color: var(--text-muted); background:#fff; border-radius:12px; border:1px solid var(--border-color);">
        <p>No classes found matching the selected filters for this day.</p>
        <button class="btn btn-sm btn-outline" onclick="resetScheduleFilters()" style="margin-top: 12px;">Clear Filters</button>
      </div>
    `;
    return;
  }

  // SORT BY TIME
  filtered.sort((a, b) => a.time.localeCompare(b.time));

  container.innerHTML = filtered.map(slot => {
    const spotsLeft = slot.max - slot.booked;
    let badgeClass = "cap-reformer";
    let badgeLabel = "Reformer Pilates";

    if (slot.isWomenOnly) {
      badgeClass = "cap-women";
      badgeLabel = "Women-Only Session";
    } else if (slot.type === "yoga") {
      badgeClass = "cap-yoga"; badgeLabel = "Yoga Flow";
    } else if (slot.type === "zumba") {
      badgeClass = "cap-zumba"; badgeLabel = "Zumba & Dance";
    } else if (slot.type === "stretch") {
      badgeClass = "cap-stretch"; badgeLabel = "Assisted Stretch";
    }

    let spotText = "";
    let spotUrgency = "available";

    if (spotsLeft === 0) {
      spotText = "FULL (Waitlist Only)";
      spotUrgency = "full";
    } else if (spotsLeft <= 2) {
      spotText = `⚠️ Only ${spotsLeft} spot${spotsLeft > 1 ? 's' : ''} left of ${slot.max}`;
      spotUrgency = "urgent";
    } else {
      spotText = `✓ ${spotsLeft} spots left of ${slot.max}`;
    }

    return `
      <div class="schedule-time-row">
        <div class="time-col">
          <span class="slot-time">${slot.time}</span>
          <span class="slot-room">${slot.room}</span>
        </div>
        <div class="class-info-col">
          <h4>${slot.title} <span class="slot-badge ${badgeClass}">${badgeLabel}</span></h4>
          <p>Instructor: <strong>${slot.instructor}</strong></p>
        </div>
        <div class="capacity-col">
          <span class="spots-remaining ${spotUrgency}">${spotText}</span>
          <span class="capacity-subtitle">Max ${slot.max} seats per session</span>
        </div>
        <div class="action-col">
          <button class="btn btn-sm ${spotsLeft === 0 ? 'btn-secondary' : 'btn-primary'}" onclick="openBookingModal(${slot.id})">
            ${spotsLeft === 0 ? 'Waitlist' : 'Book Class'}
          </button>
        </div>
      </div>
    `;
  }).join("");
}

// PLAN SELECTION
function selectPlan(planName, price) {
  openIntroModal();
  alert(`Great choice! You selected "${planName}" (${price}). First, claim your 100% Free Introductory session below:`);
}

// WOMEN-ONLY WORKOUT TRIGGER
function openWomenOnlyModal() {
  openIntroModal();
  const radioEl = document.querySelector('input[name="introModality"][value="Women-Only Session"]');
  if (radioEl) radioEl.checked = true;
}

function openContactModal(subject) {
  scrollToSection('contact');
  const sel = document.getElementById('contactSubjectSelect');
  if (sel) {
    for (let i = 0; i < sel.options.length; i++) {
      if (sel.options[i].text.toLowerCase().includes(subject.toLowerCase())) {
        sel.selectedIndex = i;
        break;
      }
    }
  }
}

// MODAL CONTROLLERS
function openIntroModal() {
  document.getElementById("introModal").classList.add("active");
}

function closeIntroModal() {
  document.getElementById("introModal").classList.remove("active");
}

function handleIntroSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("introName").value;
  const modality = document.querySelector('input[name="introModality"]:checked').value;
  alert(`🎉 Congratulations ${name}! Your Free Introductory Session for ${modality} has been registered! Check your email for confirmation details.`);
  closeIntroModal();
}

// CLASS BOOKING MODAL
function openBookingModal(slotId) {
  selectedSlotForBooking = scheduleData.find(s => s.id === slotId);
  if (!selectedSlotForBooking) return;

  const spotsLeft = selectedSlotForBooking.max - selectedSlotForBooking.booked;

  document.getElementById("bookModalTitle").innerText = selectedSlotForBooking.title;
  document.getElementById("bookModalDetails").innerText = `Time: ${selectedSlotForBooking.time} | Instructor: ${selectedSlotForBooking.instructor}`;
  
  const alertEl = document.getElementById("spotCapacityAlert");
  const alertText = document.getElementById("spotAlertText");

  if (spotsLeft === 0) {
    alertEl.style.backgroundColor = "#f2f4f4";
    alertEl.style.borderColor = "#d5dbdb";
    alertEl.style.color = "#7f8c8d";
    alertText.innerText = `This session is FULL (Max ${selectedSlotForBooking.max}). You will be added to the priority waitlist.`;
  } else if (spotsLeft <= 2) {
    alertEl.style.backgroundColor = "#fdf2e9";
    alertEl.style.borderColor = "#fae5d3";
    alertEl.style.color = "#b9770e";
    alertText.innerText = `⚠️ Hurry! Only ${spotsLeft} spot${spotsLeft > 1 ? 's' : ''} remaining out of ${selectedSlotForBooking.max} max capacity.`;
  } else {
    alertEl.style.backgroundColor = "#eaf0e8";
    alertEl.style.borderColor = "#d5e1d3";
    alertEl.style.color = "#323b2c";
    alertText.innerText = `✓ ${spotsLeft} spots available out of ${selectedSlotForBooking.max} max capacity.`;
  }

  document.getElementById("bookingModal").classList.add("active");
}

function closeBookingModal() {
  document.getElementById("bookingModal").classList.remove("active");
}

function handleClassBookingSubmit(e) {
  e.preventDefault();
  if (!selectedSlotForBooking) return;

  const name = document.getElementById("bookName").value;

  if (selectedSlotForBooking.booked < selectedSlotForBooking.max) {
    selectedSlotForBooking.booked += 1;
    userBookings.push({
      id: selectedSlotForBooking.id,
      title: selectedSlotForBooking.title,
      time: selectedSlotForBooking.time,
      instructor: selectedSlotForBooking.instructor,
      room: selectedSlotForBooking.room
    });
    alert(`Success! ${name}, your spot for "${selectedSlotForBooking.title}" is confirmed!`);
  } else {
    alert(`Added to waitlist! ${name}, we will notify you immediately if a spot opens up.`);
  }

  closeBookingModal();
  renderSchedule();
  renderDashboardContent('bookings');
}

// MEMBER AUTHENTICATION & DASHBOARD
function openAuthModal() {
  document.getElementById("authModal").classList.add("active");
}

function closeAuthModal() {
  document.getElementById("authModal").classList.remove("active");
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  isLoggedIn = true;

  document.getElementById("loginBtnText").innerText = "My Account";
  document.getElementById("authFormView").style.display = "none";
  document.getElementById("authDashboardView").style.display = "block";
  
  if (email.includes("mostafa") || email.includes("Mostafa")) {
    document.getElementById("dashUserName").innerText = "Mostafa M.";
  } else {
    document.getElementById("dashUserName").innerText = email.split("@")[0];
  }

  renderDashboardContent('bookings');
}

function handleGoogleLogin() {
  isLoggedIn = true;
  document.getElementById("loginBtnText").innerText = "My Account";
  document.getElementById("authFormView").style.display = "none";
  document.getElementById("authDashboardView").style.display = "block";
  document.getElementById("dashUserName").innerText = "Mostafa Mansour";
  renderDashboardContent('bookings');
}

function handleLogout() {
  isLoggedIn = false;
  document.getElementById("loginBtnText").innerText = "Member Login";
  document.getElementById("authFormView").style.display = "block";
  document.getElementById("authDashboardView").style.display = "none";
  closeAuthModal();
}

// DASHBOARD TABS RENDERING
function showDashTab(tabName) {
  document.querySelectorAll('.dash-nav-item').forEach(el => el.classList.remove('active'));
  
  if (tabName === 'bookings') document.getElementById('tabBookingsBtn').classList.add('active');
  if (tabName === 'packages') document.getElementById('tabPackagesBtn').classList.add('active');
  if (tabName === 'payments') document.getElementById('tabPaymentsBtn').classList.add('active');
  if (tabName === 'history') document.getElementById('tabHistoryBtn').classList.add('active');

  renderDashboardContent(tabName);
}

function renderDashboardContent(tabName) {
  const contentArea = document.getElementById("dashContentArea");
  document.getElementById("dashBookingCount").innerText = `${userBookings.length} Active`;

  if (tabName === 'bookings') {
    if (userBookings.length === 0) {
      contentArea.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding:20px;">You have no active class bookings.</p>`;
    } else {
      contentArea.innerHTML = `
        <h4 style="margin-bottom:12px;">Active Class Reservations</h4>
        ${userBookings.map((b, idx) => `
          <div style="background:#fff; border:1px solid var(--border-color); padding:12px; border-radius:8px; margin-bottom:8px; display:flex; justify-between; align-items:center;">
            <div>
              <strong>${b.title}</strong><br>
              <small style="color:var(--text-muted);">${b.time} · ${b.instructor}</small>
            </div>
            <button class="btn btn-sm btn-outline" onclick="cancelBooking(${idx})" style="color:#c0392b; border-color:#f2d7d5;">Cancel</button>
          </div>
        `).join('')}
      `;
    }
  } else if (tabName === 'packages') {
    contentArea.innerHTML = `
      <h4>My Active Membership & Credits</h4>
      <div style="background:#fff; border:1px solid var(--primary-sage); padding:14px; border-radius:8px; margin-top:10px;">
        <strong style="color:var(--primary-sage-dark);">Unlimited Everything VIP Plan</strong>
        <p style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">Unlimited Reformer, Yoga & Zumba | Auto-renews June 1, 2026</p>
        <div style="margin-top:10px; font-size:0.82rem; font-weight:600; color:var(--text-dark);">
          ✓ 1-on-1 Assisted Stretch Credits: 2 / 2 remaining
        </div>
      </div>
    `;
  } else if (tabName === 'payments') {
    contentArea.innerHTML = `
      <h4>Saved Payment Methods</h4>
      <div style="background:#fff; border:1px solid var(--border-color); padding:12px; border-radius:8px; margin-top:10px; display:flex; align-items:center; gap:12px;">
        <svg width="28" height="20" viewBox="0 0 36 24" fill="none"><rect width="36" height="24" rx="3" fill="#1A1F71"/><circle cx="13" cy="12" r="7" fill="#EB001B"/><circle cx="23" cy="12" r="7" fill="#F79E1B"/></svg>
        <div>
          <strong>Visa ending in 4242</strong><br>
          <small style="color:var(--text-muted);">Expires 09/28 · Default Payment Method</small>
        </div>
      </div>
    `;
  } else if (tabName === 'history') {
    contentArea.innerHTML = `
      <h4>Purchase Receipts</h4>
      <div style="background:#fff; border:1px solid var(--border-color); padding:10px 14px; border-radius:8px; margin-top:10px; display:flex; justify-between;">
        <div>
          <strong>Unlimited Everything VIP Membership</strong><br>
          <small style="color:var(--text-muted);">Billed May 1, 2026</small>
        </div>
        <strong>$219.00</strong>
      </div>
    `;
  }
}

function cancelBooking(index) {
  const removed = userBookings.splice(index, 1)[0];
  const slot = scheduleData.find(s => s.id === removed.id);
  if (slot && slot.booked > 0) {
    slot.booked -= 1;
  }
  alert(`Reservation for "${removed.title}" cancelled.`);
  renderSchedule();
  renderDashboardContent('bookings');
}

function handleContactSubmit(e) {
  e.preventDefault();
  alert("Thank you for reaching out to Everything Fitness Studio! Our studio team will get back to you within 2 hours.");
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}
