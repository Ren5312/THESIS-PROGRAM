/* =========================================================
   THESIS ASSISTANT SYSTEM
   HTML + CSS + JAVASCRIPT
   ========================================================= */


/* ================= STORAGE ================= */

let thesis = JSON.parse(
    localStorage.getItem("thesis")
) || {
    title: "",
    researcher: "",
    adviser: "",
    schoolYear: ""
};

let chapters = JSON.parse(
    localStorage.getItem("chapters")
) || [];

let rrl = JSON.parse(
    localStorage.getItem("rrl")
) || [];

let questions = JSON.parse(
    localStorage.getItem("questions")
) || [];

let respondents = JSON.parse(
    localStorage.getItem("respondents")
) || [];

let references = JSON.parse(
    localStorage.getItem("references")
) || [];

let activities = JSON.parse(
    localStorage.getItem("activities")
) || [];


/* ================= INITIALIZATION ================= */

document.addEventListener("DOMContentLoaded", function () {

    initializeNavigation();

    initializeForms();

    updateDate();

    renderAll();

});


/* ================= NAVIGATION ================= */

function initializeNavigation() {

    const buttons =
        document.querySelectorAll(".nav-btn");

    buttons.forEach(button => {

        button.addEventListener("click", function () {

            const page =
                this.getAttribute("data-page");

            showPage(page);

            document
                .querySelector(".sidebar")
                .classList.remove("open");

        });

    });

}


function showPage(pageName) {

    document
        .querySelectorAll(".page")
        .forEach(page => {
            page.classList.remove("active");
        });

    const selectedPage =
        document.getElementById(pageName);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }


    document
        .querySelectorAll(".nav-btn")
        .forEach(button => {

            button.classList.remove("active");

            if (
                button.getAttribute("data-page")
                === pageName
            ) {
                button.classList.add("active");
            }

        });


    const titles = {

        dashboard: [
            "Dashboard",
            "Manage your thesis research in one place."
        ],

        chapters: [
            "Thesis Chapters",
            "Manage your thesis chapters and progress."
        ],

        rrl: [
            "RRL Manager",
            "Organize your Review of Related Literature."
        ],

        questions: [
            "Research Questions",
            "Manage your Statement of the Problem."
        ],

        respondents: [
            "Respondents",
            "Track your research participants."
        ],

        analysis: [
            "Data Analysis",
            "Calculate basic research statistics."
        ],

        references: [
            "References",
            "Manage your research references."
        ],

        progress: [
            "Progress Tracker",
            "Monitor the completion of your thesis."
        ]

    };


    if (titles[pageName]) {

        document.getElementById("pageTitle")
            .textContent = titles[pageName][0];

        document.getElementById("pageSubtitle")
            .textContent = titles[pageName][1];

    }

}


/* ================= MOBILE MENU ================= */

document.getElementById("mobileMenu")
    .addEventListener("click", function () {

        document
            .querySelector(".sidebar")
            .classList.toggle("open");

    });


/* ================= DATE ================= */

function updateDate() {

    const date = new Date();

    document.getElementById("currentDate")
        .textContent =
        date.toLocaleDateString(
            "en-PH",
            {
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );

}


/* ================= MODALS ================= */

function openModal(id) {

    document
        .getElementById(id)
        .classList.add("show");

}


function closeModal(id) {

    document
        .getElementById(id)
        .classList.remove("show");

}


function openThesisModal() {

    document.getElementById("thesisTitle")
        .value = thesis.title;

    document.getElementById("thesisResearcher")
        .value = thesis.researcher;

    document.getElementById("thesisAdviser")
        .value = thesis.adviser;

    document.getElementById("thesisSchoolYear")
        .value = thesis.schoolYear;

    openModal("thesisModal");

}


function openChapterModal() {

    document
        .getElementById("chapterForm")
        .reset();

    openModal("chapterModal");

}


function openRRLModal() {

    document
        .getElementById("rrlForm")
        .reset();

    openModal("rrlModal");

}


function openQuestionModal() {

    document
        .getElementById("questionForm")
        .reset();

    openModal("questionModal");

}


function openRespondentModal() {

    document
        .getElementById("respondentForm")
        .reset();

    openModal("respondentModal");

}


function openReferenceModal() {

    document
        .getElementById("referenceForm")
        .reset();

    openModal("referenceModal");

}


/* Close modal when clicking outside */

document
    .querySelectorAll(".modal")
    .forEach(modal => {

        modal.addEventListener("click", function (event) {

            if (event.target === this) {
                this.classList.remove("show");
            }

        });

    });


/* ================= THESIS FORM ================= */

function initializeForms() {

    document
        .getElementById("thesisForm")
        .addEventListener("submit", function (e) {

            e.preventDefault();

            thesis = {

                title:
                    document
                        .getElementById("thesisTitle")
                        .value,

                researcher:
                    document
                        .getElementById("thesisResearcher")
                        .value,

                adviser:
                    document
                        .getElementById("thesisAdviser")
                        .value,

                schoolYear:
                    document
                        .getElementById("thesisSchoolYear")
                        .value

            };


            saveData();

            closeModal("thesisModal");

            addActivity(
                "Thesis information updated."
            );

            showToast(
                "Thesis information saved!"
            );

            renderAll();

        });


    /* CHAPTER */

    document
        .getElementById("chapterForm")
        .addEventListener("submit", function (e) {

            e.preventDefault();

            const chapter = {

                id: Date.now(),

                name:
                    document
                        .getElementById("chapterName")
                        .value,

                status:
                    document
                        .getElementById("chapterStatus")
                        .value,

                notes:
                    document
                        .getElementById("chapterNotes")
                        .value

            };


            chapters.push(chapter);

            saveData();

            closeModal("chapterModal");

            addActivity(
                `${chapter.name} added.`
            );

            showToast("Chapter added!");

            renderAll();

        });


    /* RRL */

    document
        .getElementById("rrlForm")
        .addEventListener("submit", function (e) {

            e.preventDefault();

            const item = {

                id: Date.now(),

                author:
                    document
                        .getElementById("rrlAuthor")
                        .value,

                year:
                    document
                        .getElementById("rrlYear")
                        .value,

                title:
                    document
                        .getElementById("rrlTitle")
                        .value,

                finding:
                    document
                        .getElementById("rrlFinding")
                        .value,

                gap:
                    document
                        .getElementById("rrlGap")
                        .value,

                source:
                    document
                        .getElementById("rrlSource")
                        .value

            };


            rrl.push(item);

            saveData();

            closeModal("rrlModal");

            addActivity(
                `RRL source "${item.title}" added.`
            );

            showToast("RRL source added!");

            renderAll();

        });


    /* QUESTION */

    document
        .getElementById("questionForm")
        .addEventListener("submit", function (e) {

            e.preventDefault();

            const question = {

                id: Date.now(),

                number:
                    document
                        .getElementById("questionNumber")
                        .value,

                text:
                    document
                        .getElementById("questionText")
                        .value

            };


            questions.push(question);

            saveData();

            closeModal("questionModal");

            addActivity(
                "Research question added."
            );

            showToast("Research question added!");

            renderAll();

        });


    /* RESPONDENT */

    document
        .getElementById("respondentForm")
        .addEventListener("submit", function (e) {

            e.preventDefault();

            const respondent = {

                id: Date.now(),

                name:
                    document
                        .getElementById("respondentName")
                        .value,

                age:
                    document
                        .getElementById("respondentAge")
                        .value,

                gender:
                    document
                        .getElementById("respondentGender")
                        .value,

                category:
                    document
                        .getElementById("respondentCategory")
                        .value

            };


            respondents.push(respondent);

            saveData();

            closeModal("respondentModal");

            addActivity(
                `Respondent "${respondent.name}" added.`
            );

            showToast("Respondent added!");

            renderAll();

        });


    /* REFERENCE */

    document
        .getElementById("referenceForm")
        .addEventListener("submit", function (e) {

            e.preventDefault();

            const reference = {

                id: Date.now(),

                author:
                    document
                        .getElementById("referenceAuthor")
                        .value,

                year:
                    document
                        .getElementById("referenceYear")
                        .value,

                title:
                    document
                        .getElementById("referenceTitle")
                        .value,

                type:
                    document
                        .getElementById("referenceType")
                        .value

            };


            references.push(reference);

            saveData();

            closeModal("referenceModal");

            addActivity(
                `Reference "${reference.title}" added.`
            );

            showToast("Reference added!");

            renderAll();

        });

}


/* ================= SAVE ================= */

function saveData() {

    localStorage.setItem(
        "thesis",
        JSON.stringify(thesis)
    );

    localStorage.setItem(
        "chapters",
        JSON.stringify(chapters)
    );

    localStorage.setItem(
        "rrl",
        JSON.stringify(rrl)
    );

    localStorage.setItem(
        "questions",
        JSON.stringify(questions)
    );

    localStorage.setItem(
        "respondents",
        JSON.stringify(respondents)
    );

    localStorage.setItem(
        "references",
        JSON.stringify(references)
    );

    localStorage.setItem(
        "activities",
        JSON.stringify(activities)
    );

}


/* ================= RENDER ALL ================= */

function renderAll() {

    renderDashboard();

    renderChapters();

    renderRRL();

    renderQuestions();

    renderRespondents();

    renderReferences();

    renderProgress();

}


/* ================= DASHBOARD ================= */

function renderDashboard() {

    document.getElementById("dashboardTitle")
        .textContent =
        thesis.title || "Your Thesis Project";


    document.getElementById("infoTitle")
        .textContent =
        thesis.title || "Not set";


    document.getElementById("infoResearcher")
        .textContent =
        thesis.researcher || "Not set";


    document.getElementById("infoAdviser")
        .textContent =
        thesis.adviser || "Not set";


    document.getElementById("infoSchoolYear")
        .textContent =
        thesis.schoolYear || "Not set";


    document.getElementById("chapterCount")
        .textContent = chapters.length;

    document.getElementById("rrlCount")
        .textContent = rrl.length;

    document.getElementById("respondentCount")
        .textContent = respondents.length;

    document.getElementById("referenceCount")
        .textContent = references.length;


    const completed =
        chapters.filter(
            c => c.status === "Completed"
        ).length;


    const progress =
        chapters.length === 0
            ? 0
            : Math.round(
                (completed / chapters.length) * 100
            );


    document.getElementById("overallProgress")
        .textContent = progress + "%";


    document.getElementById("overallProgressBar")
        .style.width = progress + "%";


    document.getElementById("completedChapters")
        .textContent = completed;


    document.getElementById("pendingChapters")
        .textContent =
        chapters.length - completed;


    renderActivities();

}


/* ================= CHAPTERS ================= */

function renderChapters() {

    const container =
        document.getElementById("chapterList");

    if (chapters.length === 0) {

        container.innerHTML =
            `<div class="empty-state">
                No chapters added yet.
             </div>`;

        return;
    }


    container.innerHTML =
        chapters.map(chapter => {

            let statusClass = "pending";

            if (chapter.status === "Completed") {
                statusClass = "completed";
            }

            if (chapter.status === "In Progress") {
                statusClass = "progress";
            }


            return `

            <div class="chapter-card">

                <div class="chapter-top">

                    <div>

                        <h3>
                            ${escapeHTML(chapter.name)}
                        </h3>

                        <p>
                            ${escapeHTML(
                                chapter.notes ||
                                "No notes available."
                            )}
                        </p>

                    </div>

                    <button
                        class="delete-btn"
                        onclick="deleteChapter(${chapter.id})">
                        🗑
                    </button>

                </div>

                <span class="status ${statusClass}">
                    ${escapeHTML(chapter.status)}
                </span>

            </div>

            `;

        }).join("");

}


/* ================= RRL ================= */

function renderRRL() {

    const tbody =
        document.getElementById("rrlTable");

    const search =
        document.getElementById("rrlSearch")
            .value
            .toLowerCase();


    const filtered =
        rrl.filter(item =>

            (
                item.author +
                " " +
                item.title +
                " " +
                item.finding +
                " " +
                item.gap
            )
            .toLowerCase()
            .includes(search)

        );


    if (filtered.length === 0) {

        tbody.innerHTML =
            `<tr>
                <td colspan="6"
                    class="empty-state">
                    No RRL sources found.
                </td>
             </tr>`;

        return;
    }


    tbody.innerHTML =
        filtered.map(item => `

        <tr>

            <td>
                <strong>
                    ${escapeHTML(item.author)}
                </strong>
            </td>

            <td>
                ${escapeHTML(item.year)}
            </td>

            <td>
                ${escapeHTML(item.title)}
                ${
                    item.source
                    ?
                    `<br>
                     <small>
                        ${escapeHTML(item.source)}
                     </small>`
                    :
                    ""
                }
            </td>

            <td>
                ${escapeHTML(
                    item.finding || "—"
                )}
            </td>

            <td>
                ${escapeHTML(
                    item.gap || "—"
                )}
            </td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteRRL(${item.id})">
                    🗑
                </button>

            </td>

        </tr>

        `).join("");

}


/* ================= QUESTIONS ================= */

function renderQuestions() {

    const container =
        document.getElementById("questionList");


    if (questions.length === 0) {

        container.innerHTML =
            `<div class="empty-state">
                No research questions added.
             </div>`;

        return;
    }


    const sorted =
        [...questions].sort(
            (a, b) =>
                Number(a.number) -
                Number(b.number)
        );


    container.innerHTML =
        sorted.map(question => `

        <div class="question-card">

            <div class="question-number">
                ${escapeHTML(question.number)}
            </div>

            <div style="flex:1">

                <p>
                    ${escapeHTML(question.text)}
                </p>

            </div>

            <button
                class="delete-btn"
                onclick="deleteQuestion(${question.id})">
                🗑
            </button>

        </div>

        `).join("");

}


/* ================= RESPONDENTS ================= */

function renderRespondents() {

    const tbody =
        document.getElementById("respondentTable");


    document.getElementById("totalRespondents")
        .textContent = respondents.length;


    document.getElementById("maleRespondents")
        .textContent =
        respondents.filter(
            r => r.gender === "Male"
        ).length;


    document.getElementById("femaleRespondents")
        .textContent =
        respondents.filter(
            r => r.gender === "Female"
        ).length;


    if (respondents.length === 0) {

        tbody.innerHTML =
            `<tr>
                <td colspan="6"
                    class="empty-state">
                    No respondents added.
                </td>
             </tr>`;

        return;
    }


    tbody.innerHTML =
        respondents.map((r, index) => `

        <tr>

            <td>${index + 1}</td>

            <td>
                <strong>
                    ${escapeHTML(r.name)}
                </strong>
            </td>

            <td>
                ${escapeHTML(r.age || "—")}
            </td>

            <td>
                ${escapeHTML(r.gender)}
            </td>

            <td>
                ${escapeHTML(
                    r.category || "—"
                )}
            </td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteRespondent(${r.id})">
                    🗑
                </button>

            </td>

        </tr>

        `).join("");

}


/* ================= REFERENCES ================= */

function renderReferences() {

    const container =
        document.getElementById("referenceList");


    const search =
        document.getElementById("referenceSearch")
            .value
            .toLowerCase();


    const filtered =
        references.filter(ref =>

            (
                ref.author +
                " " +
                ref.title +
                " " +
                ref.type
            )
            .toLowerCase()
            .includes(search)

        );


    if (filtered.length === 0) {

        container.innerHTML =
            `<div class="empty-state">
                No references found.
             </div>`;

        return;
    }


    container.innerHTML =
        filtered.map(ref => `

        <div class="reference-card">

            <span class="reference-type">
                ${escapeHTML(ref.type)}
            </span>

            <h3>
                ${escapeHTML(ref.title)}
            </h3>

            <p>
                ${escapeHTML(ref.author)}
                (${escapeHTML(ref.year || "n.d.")})
            </p>

            <br>

            <button
                class="delete-btn"
                onclick="deleteReference(${ref.id})">
                🗑 Delete
            </button>

        </div>

        `).join("");

}


/* ================= PROGRESS ================= */

function renderProgress() {

    const container =
        document.getElementById("progressList");


    if (chapters.length === 0) {

        container.innerHTML =
            `<div class="empty-state">
                Add chapters to start tracking progress.
             </div>`;

        return;
    }


    container.innerHTML =
        chapters.map(chapter => {

            let percentage = 0;

            if (chapter.status === "In Progress") {
                percentage = 50;
            }

            if (chapter.status === "Completed") {
                percentage = 100;
            }


            return `

            <div class="progress-item">

                <div class="progress-item-header">

                    <h3>
                        ${escapeHTML(chapter.name)}
                    </h3>

                    <span>
                        ${percentage}%
                    </span>

                </div>

                <div class="progress-bar">

                    <div
                        class="progress-fill"
                        style="width:${percentage}%">
                    </div>

                </div>

            </div>

            `;

        }).join("");

}


/* ================= ACTIVITY ================= */

function addActivity(message) {

    activities.unshift({

        id: Date.now(),

        message: message,

        date: new Date().toLocaleString(
            "en-PH"
        )

    });


    activities =
        activities.slice(0, 10);


    saveData();

}


function renderActivities() {

    const container =
        document.getElementById("activityList");


    if (activities.length === 0) {

        container.innerHTML =
            `<div class="empty-state">
                No activity yet.
             </div>`;

        return;
    }


    container.innerHTML =
        activities.map(activity => `

        <div class="activity-item">

            <strong>
                ${escapeHTML(activity.message)}
            </strong>

            <p>
                ${escapeHTML(activity.date)}
            </p>

        </div>

        `).join("");

}


/* ================= DELETE ================= */

function deleteChapter(id) {

    if (!confirm("Delete this chapter?")) {
        return;
    }

    chapters =
        chapters.filter(
            chapter => chapter.id !== id
        );

    saveData();

    showToast("Chapter deleted.");

    renderAll();

}


function deleteRRL(id) {

    if (!confirm("Delete this RRL source?")) {
        return;
    }

    rrl =
        rrl.filter(
            item => item.id !== id
        );

    saveData();

    showToast("RRL source deleted.");

    renderAll();

}


function deleteQuestion(id) {

    if (!confirm("Delete this question?")) {
        return;
    }

    questions =
        questions.filter(
            q => q.id !== id
        );

    saveData();

    showToast("Question deleted.");

    renderAll();

}


function deleteRespondent(id) {

    if (!confirm("Delete this respondent?")) {
        return;
    }

    respondents =
        respondents.filter(
            r => r.id !== id
        );

    saveData();

    showToast("Respondent deleted.");

    renderAll();

}


function deleteReference(id) {

    if (!confirm("Delete this reference?")) {
        return;
    }

    references =
        references.filter(
            r => r.id !== id
        );

    saveData();

    showToast("Reference deleted.");

    renderAll();

}


/* ================= DATA ANALYSIS ================= */

function calculateMean() {

    const input =
        document.getElementById("scoresInput")
            .value;


    const numbers =
        input
            .split(",")
            .map(value => Number(value.trim()))
            .filter(value => !isNaN(value));


    if (numbers.length === 0) {

        document.getElementById("meanResult")
            .textContent =
            "Please enter valid numbers.";

        return;
    }


    const sum =
        numbers.reduce(
            (total, number) =>
                total + number,
            0
        );


    const mean =
        sum / numbers.length;


    let interpretation = "";


    if (mean >= 4.21) {
        interpretation = "Very High";
    }
    else if (mean >= 3.41) {
        interpretation = "High";
    }
    else if (mean >= 2.61) {
        interpretation = "Moderate";
    }
    else if (mean >= 1.81) {
        interpretation = "Low";
    }
    else {
        interpretation = "Very Low";
    }


    document.getElementById("meanResult")
        .innerHTML =

        `Mean: <strong>
            ${mean.toFixed(2)}
        </strong>
        <br>
        Interpretation:
        <strong>
            ${interpretation}
        </strong>`;

}


function calculatePercentage() {

    const value =
        Number(
            document.getElementById(
                "percentageValue"
            ).value
        );


    const total =
        Number(
            document.getElementById(
                "percentageTotal"
            ).value
        );


    if (
        isNaN(value) ||
        isNaN(total) ||
        total === 0
    ) {

        document.getElementById(
            "percentageResult"
        ).textContent =
            "Please enter valid values.";

        return;

    }


    const percentage =
        (value / total) * 100;


    document.getElementById(
        "percentageResult"
    ).innerHTML =

        `Percentage:
        <strong>
            ${percentage.toFixed(2)}%
        </strong>`;

}


/* ================= CLEAR DATA ================= */

document
    .getElementById("clearDataBtn")
    .addEventListener("click", function () {

        const confirmed =
            confirm(
                "WARNING!\n\n" +
                "This will delete ALL thesis data " +
                "stored in this browser.\n\n" +
                "Continue?"
            );


        if (!confirmed) {
            return;
        }


        localStorage.clear();


        thesis = {
            title: "",
            researcher: "",
            adviser: "",
            schoolYear: ""
        };

        chapters = [];

        rrl = [];

        questions = [];

        respondents = [];

        references = [];

        activities = [];


        showToast(
            "All thesis data has been cleared."
        );


        renderAll();

    });


/* ================= TOAST ================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");


    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* ================= SECURITY ================= */

function escapeHTML(value) {

    if (value === null ||
        value === undefined) {
        return "";
    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}
