const randomButton = document.getElementById("randomButton");
const favoriteButton = document.getElementById("favoriteButton");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");

const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

const calendarScreen = document.getElementById("calendarScreen");
const proofScreen = document.getElementById("proofScreen");

const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");

const proofTitle = document.getElementById("proofTitle");
const proofAuthor = document.getElementById("proofAuthor");
const proofYear = document.getElementById("proofYear");
const proofDifficulty = document.getElementById("proofDifficulty");
const proofText = document.getElementById("proofText");
const proofImage = document.getElementById("proofImage");

const backButton = document.getElementById("backButton");

const darkModeButton = document.getElementById("darkModeButton");
const searchBox = document.getElementById("searchBox");

const today = new Date();

let year = today.getFullYear();
let month = today.getMonth();

let currentProof = 1;

const proofCount = Object.keys(proofs).length;

const weekNames = ["일", "월", "화", "수", "목", "금", "토"];

// =======================
// 달력 그리기
// =======================

function drawCalendar() {

    calendar.innerHTML = "";

    monthYear.textContent = `${year}년 ${month + 1}월`;

    for (const w of weekNames) {

        const cell = document.createElement("div");
        cell.textContent = w;
        cell.style.fontWeight = "bold";

        calendar.appendChild(cell);

    }

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        calendar.appendChild(document.createElement("div"));
    }

    for (let d = 1; d <= lastDate; d++) {

        const cell = document.createElement("div");

        cell.className = "day";
        cell.textContent = d;

        if (
            d === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            cell.classList.add("today");
        }

        cell.addEventListener("click", function () {

            currentProof = d;

            calendarScreen.style.display = "none";
            proofScreen.style.display = "block";

            showProof(currentProof);

        });

        calendar.appendChild(cell);

    }

}

// =======================
// 증명 표시
// =======================

function showProof(number) {

    if (proofs[number]) {

        proofTitle.textContent = proofs[number].title;
        proofAuthor.textContent = "👤 " + proofs[number].author;
        proofYear.textContent = "📅 " + proofs[number].year;
        proofDifficulty.textContent = "⭐ " + proofs[number].difficulty;
        proofText.textContent = proofs[number].text;

        proofImage.src = proofs[number].image;
        proofImage.style.display = "block";
        if (favorites.includes(number)) {

    favoriteButton.textContent = "⭐ 즐겨찾기";

} else {

    favoriteButton.textContent = "🤍 즐겨찾기";

}

    }

    else {

        proofTitle.textContent = `Proof #${number}`;
        proofAuthor.textContent = "";
        proofYear.textContent = "";
        proofDifficulty.textContent = "";
        proofText.textContent = "아직 등록되지 않은 증명입니다.";

        proofImage.removeAttribute("src");
        proofImage.style.display = "none";

    }

}

// =======================
// 버튼
// =======================

backButton.addEventListener("click", function () {

    proofScreen.style.display = "none";
    calendarScreen.style.display = "block";

});

prevButton.addEventListener("click", function () {

    if (currentProof > 1) {

        currentProof--;
        showProof(currentProof);

    }

});

nextButton.addEventListener("click", function () {

    if (currentProof < proofCount) {

        currentProof++;
        showProof(currentProof);

    }

});

prevMonth.addEventListener("click", function () {

    month--;

    if (month < 0) {

        month = 11;
        year--;

    }

    drawCalendar();

});

nextMonth.addEventListener("click", function () {

    month++;

    if (month > 11) {

        month = 0;
        year++;

    }

    drawCalendar();

});

// =======================
// 다크 모드
// =======================

darkModeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark");

});

// =======================
// 검색
// =======================

searchBox.addEventListener("keydown", function (event) {

    if (event.key !== "Enter") return;

    const keyword = searchBox.value.trim().toLowerCase();

    for (const id in proofs) {

        const proof = proofs[id];

        if (
            proof.title.toLowerCase().includes(keyword) ||
            proof.author.toLowerCase().includes(keyword)
        ) {

            currentProof = Number(id);

            calendarScreen.style.display = "none";
            proofScreen.style.display = "block";

            showProof(currentProof);

            return;

        }

    }

    alert("검색 결과가 없습니다.");

});

// =======================
// 시작
// =======================

drawCalendar();
favoriteButton.addEventListener("click", function () {

    if (favorites.includes(currentProof)) {

        favorites = favorites.filter(n => n !== currentProof);

    } else {

        favorites.push(currentProof);

    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    showProof(currentProof);

});
randomButton.addEventListener("click", function () {

    const ids = Object.keys(proofs);
    const randomIndex = Math.floor(Math.random() * ids.length);
    currentProof = Number(ids[randomIndex]);

    calendarScreen.style.display = "none";
    proofScreen.style.display = "block";

    showProof(currentProof);

});