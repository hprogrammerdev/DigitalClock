const clock = document.getElementById("clock");
const dateEl = document.getElementById("date");
const langBtn = document.getElementById("lang-btn");
const themeBtn = document.getElementById("theme-btn");

let isArabic = true;
let isDark = false;

function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // الساعة 0 = 12
  clock.textContent = `${hours
    .toString()
    .padStart(2, "0")}:${minutes}:${seconds} ${ampm}`;

  const gregorian = now.toLocaleDateString(isArabic ? "ar-EG" : "en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const hijri = new Intl.DateTimeFormat(
    isArabic ? "ar-SA" : "en-SA-u-ca-islamic",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  ).format(now);

  dateEl.innerHTML = isArabic
    ? `التاريخ الميلادي: ${gregorian}<br>التاريخ الهجري: ${hijri}`
    : `Date Gregorian: ${gregorian}<br>Date Hijri: ${hijri}`;
}

function toggleLang() {
  isArabic = !isArabic;
  document.documentElement.lang = isArabic ? "ar" : "en";
  // document.documentElement.dir = isArabic ? "rtl" : "ltr";
  dateEl.dir = isArabic ? "rtl" : "ltr";
  updateTime();
}

function toggleTheme() {
  isDark = !isDark;
  document.body.className = isDark ? "dark" : "light";
  themeBtn.textContent = isDark ? "🌜" : "🌞";
}

setInterval(updateTime, 1000);
updateTime();
