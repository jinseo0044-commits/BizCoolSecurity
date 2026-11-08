
let locked = true;
let logs = [
  {
    title: "데모 시스템 시작",
    time: new Date().toLocaleString("ko-KR")
  }
];

// 시연용 로그인 (실제 인증 아님)
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "admin" && pass === "1234") {
    document.getElementById("loginPage").hidden = true;
    document.getElementById("mainPage").hidden = false;

    addLog("관리자 데모 로그인");
    navigate("home");
  } else {
    alert("데모 계정 정보를 확인해주세요.");
  }
}

function logout() {
  document.getElementById("mainPage").hidden = true;
  document.getElementById("loginPage").hidden = false;
  document.getElementById("password").value = "";
  addLog("관리자 데모 로그아웃");
}

// 화면 전환
function navigate(page) {
  document.querySelectorAll(".page").forEach(el => {
    el.classList.remove("active");
  });

  document.getElementById(page).classList.add("active");

  document.querySelectorAll(".nav-item").forEach(el => {
    el.classList.toggle(
      "selected",
      el.dataset.tab === page
    );
  });

  renderLogs();
}

// 모형 잠금 상태 변경
function toggleLock() {
  if (locked) {
    const ok = confirm(
      "원격 잠금해제를 시뮬레이션할까요?\n" +
      "실제 장치는 작동하지 않습니다."
    );

    if (!ok) return;
  }

  locked = !locked;

  const symbol = document.getElementById("lockSymbol");
  const text = document.getElementById("lockText");
  const badge = document.getElementById("lockBadge");
  const button = document.getElementById("unlockBtn");

  symbol.textContent = locked ? "🔒" : "🔓";
  text.textContent = locked
    ? "출입문 잠김"
    : "모의 잠금해제";

  badge.textContent = locked ? "잠금" : "모의 열림";
  button.textContent = locked
    ? "원격 잠금해제 체험"
    : "다시 잠그기";

  symbol.classList.toggle("unlocked", !locked);
  badge.classList.toggle("unlocked", !locked);

  addLog(locked
    ? "모의 잠금 실행"
    : "모의 원격 잠금해제"
  );
}

// 로그 추가
function addLog(title) {
  logs.unshift({
    title,
    time: new Date().toLocaleString("ko-KR")
  });

  renderLogs();
}

// 로그 화면 갱신
function renderLogs() {
  const search = document.getElementById("searchLogs");
  const keyword = search ? search.value.toLowerCase() : "";

  const filtered = logs.filter(log =>
    log.title.toLowerCase().includes(keyword)
  );

  const recent = document.getElementById("recentLogs");
  const all = document.getElementById("allLogs");

  recent.replaceChildren(
    ...logs.slice(0, 3).map(createLogElement)
  );

  all.replaceChildren(
    ...filtered.map(createLogElement)
  );

  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "검색 결과가 없습니다.";
    all.appendChild(empty);
  }
}

// 안전하게 로그 요소 만들기
function createLogElement(log) {
  const row = document.createElement("div");
  row.className = "log";

  const icon = document.createElement("div");
  icon.className = "log-icon";
  icon.textContent = "✓";

  const info = document.createElement("div");

  const title = document.createElement("strong");
  title.textContent = log.title;

  const time = document.createElement("p");
  time.textContent = log.time;

  info.append(title, time);
  row.append(icon, info);

  return row;
}

function showNotice() {
  alert("현재 새로운 알림이 없습니다. (데모)");
}

function memberNotice() {
  alert("구성원 등록 기능은 다음 버전에서 구현합니다.");
}

// 시작 상태 설정
renderLogs();
