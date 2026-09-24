/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================
   PHOTO SLIDER
========================= */

const slider = document.getElementById("photoSlider");

const nextBtn = document.getElementById("nextBtn");

const prevBtn = document.getElementById("prevBtn");

const currentSlide = document.getElementById("currentSlide");

const cards = document.querySelectorAll(".photo-card");

let currentIndex = 0;


/* Calculate slide */

function updateSlide() {

    if (!cards.length) return;

    const cardWidth =
        cards[0].offsetWidth + 35;

    slider.scrollTo({

        left: currentIndex * cardWidth,

        behavior: "smooth"

    });


    currentSlide.textContent =
        String(currentIndex + 1).padStart(2, "0");

}


/* NEXT */

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= cards.length) {

        currentIndex = 0;

    }

    updateSlide();

});


/* PREVIOUS */

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = cards.length - 1;

    }

    updateSlide();

});


/* =========================
   DRAG TO SLIDE
========================= */

let isDragging = false;

let startX;

let scrollStart;


slider.addEventListener("mousedown", (e) => {

    isDragging = true;

    startX = e.pageX - slider.offsetLeft;

    scrollStart = slider.scrollLeft;

    slider.style.cursor = "grabbing";

});


slider.addEventListener("mouseleave", () => {

    isDragging = false;

    slider.style.cursor = "grab";

});


slider.addEventListener("mouseup", () => {

    isDragging = false;

    slider.style.cursor = "grab";

});


slider.addEventListener("mousemove", (e) => {

    if (!isDragging) return;

    e.preventDefault();

    const x =
        e.pageX - slider.offsetLeft;

    const distance =
        (x - startX) * 1.2;

    slider.scrollLeft =
        scrollStart - distance;

});


/* =========================
   TOUCH SUPPORT
========================= */

let touchStart = 0;


slider.addEventListener("touchstart", (e) => {

    touchStart =
        e.touches[0].clientX;

});


slider.addEventListener("touchend", (e) => {

    const touchEnd =
        e.changedTouches[0].clientX;

    const difference =
        touchStart - touchEnd;


    if (Math.abs(difference) > 50) {

        if (difference > 0) {

            nextBtn.click();

        } else {

            prevBtn.click();

        }

    }

});


/* =========================
   KEYBOARD
========================= */

document.addEventListener("keydown", (e) => {

    if (e.key === "ArrowRight") {

        nextBtn.click();

    }

    if (e.key === "ArrowLeft") {

        prevBtn.click();

    }

});


/* =========================
   AUTO SLIDE
========================= */

let autoSlide = setInterval(() => {

    currentIndex++;

    if (currentIndex >= cards.length) {

        currentIndex = 0;

    }

    updateSlide();

}, 6000);


/* Stop autoplay while interacting */

slider.addEventListener("mouseenter", () => {

    clearInterval(autoSlide);

});


slider.addEventListener("mouseleave", () => {

    autoSlide = setInterval(() => {

        currentIndex++;

        if (currentIndex >= cards.length) {

            currentIndex = 0;

        }

        updateSlide();

    }, 6000);

});


/* =========================
   SMOOTH NAVIGATION
========================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (e) => {

        e.preventDefault();

        const target =
            document.querySelector(
                link.getAttribute("href")
            );

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});


/* =========================
   PHOTO ERROR CHECK
========================= */

document.querySelectorAll(".photo-frame img").forEach((image) => {

    image.addEventListener("error", () => {

        console.error(
            "Foto tidak ditemukan:",
            image.src
        );

        image.style.opacity = "0.3";

    });

});


/* =========================
   SUBTLE MOUSE EFFECT
========================= */

document.querySelectorAll(".photo-frame").forEach((frame) => {

    frame.addEventListener("mousemove", (e) => {

        const rect =
            frame.getBoundingClientRect();

        const x =
            e.clientX - rect.left;

        const y =
            e.clientY - rect.top;

        const rotateX =
            ((y / rect.height) - 0.5) * -3;

        const rotateY =
            ((x / rect.width) - 0.5) * 3;

        frame.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-6px)`;

    });


    frame.addEventListener("mouseleave", () => {

        frame.style.transform = "";

    });

});


/* =========================
   CONSOLE
========================= */

console.log(
    "♡ This little website was made with love."
);
/* =========================
   ROMANTIC PUZZLE
========================= */

const puzzleBoard =
    document.getElementById("puzzleBoard");

const moveCount =
    document.getElementById("moveCount");

const shuffleBtn =
    document.getElementById("shuffleBtn");

const puzzleComplete =
    document.getElementById("puzzleComplete");

let puzzlePieces =
    Array.from(
        document.querySelectorAll(".puzzle-piece")
    );

let moves = 0;

let draggedPiece = null;


/* =========================
   SHUFFLE
========================= */

function shufflePuzzle() {

    moves = 0;

    moveCount.textContent = "0";

    puzzleComplete.classList.remove("show");


    const shuffled =
        [...puzzlePieces].sort(
            () => Math.random() - 0.5
        );


    shuffled.forEach(piece => {

        puzzleBoard.appendChild(piece);

    });

}


shuffleBtn.addEventListener(
    "click",
    shufflePuzzle
);


/* =========================
   DRAG START
========================= */

function dragStart(e) {

    draggedPiece = this;

    this.classList.add("dragging");

    e.dataTransfer.effectAllowed = "move";

}


/* =========================
   DRAG END
========================= */

function dragEnd() {

    this.classList.remove("dragging");

    draggedPiece = null;

}


/* =========================
   DRAG OVER
========================= */

function dragOver(e) {

    e.preventDefault();

}


/* =========================
   DROP
========================= */

function dropPiece(e) {

    e.preventDefault();

    if (!draggedPiece) return;

    const target = this;

    if (target === draggedPiece) return;


    const pieces =
        Array.from(
            puzzleBoard.children
        );

    const draggedIndex =
        pieces.indexOf(draggedPiece);

    const targetIndex =
        pieces.indexOf(target);


    if (draggedIndex < targetIndex) {

        puzzleBoard.insertBefore(
            draggedPiece,
            target.nextSibling
        );

    } else {

        puzzleBoard.insertBefore(
            draggedPiece,
            target
        );

    }


    moves++;

    moveCount.textContent =
        moves;


    checkPuzzle();

}


/* =========================
   CHECK PUZZLE
========================= */

function checkPuzzle() {

    const pieces =
        Array.from(
            puzzleBoard.children
        );


    let correct = true;


    pieces.forEach(
        (piece, index) => {

            const correctPosition =
                Number(
                    piece.dataset.position
                );

            if (
                correctPosition !== index
            ) {

                correct = false;

            }

        }
    );


    if (correct) {

        puzzleComplete.classList.add(
            "show"
        );

        puzzleBoard.classList.add(
            "puzzle-solved"
        );

        createPuzzleHearts();

    }

}


/* =========================
   EVENTS
========================= */

puzzlePieces.forEach(piece => {

    piece.setAttribute(
        "draggable",
        "true"
    );


    piece.addEventListener(
        "dragstart",
        dragStart
    );

    piece.addEventListener(
        "dragend",
        dragEnd
    );

    piece.addEventListener(
        "dragover",
        dragOver
    );

    piece.addEventListener(
        "drop",
        dropPiece
    );

});


/* =========================
   HEART EFFECT
========================= */

function createPuzzleHearts() {

    for (let i = 0; i < 10; i++) {

        const heart =
            document.createElement("span");

        heart.textContent = "♡";

        heart.style.position = "fixed";

        heart.style.left =
            Math.random() * 100 + "%";

        heart.style.bottom = "15%";

        heart.style.fontSize =
            14 + Math.random() * 15 + "px";

        heart.style.color =
            "#d98b9b";

        heart.style.pointerEvents =
            "none";

        heart.style.zIndex = "9999";

        document.body.appendChild(
            heart
        );


        heart.animate(
            [
                {
                    transform:
                        "translateY(0) scale(0.5)",

                    opacity: 0
                },

                {
                    transform:
                        "translateY(-150px) scale(1)",

                    opacity: 1
                },

                {
                    transform:
                        "translateY(-300px) scale(0.8)",

                    opacity: 0
                }
            ],
            {
                duration:
                    1800 + Math.random() * 1000,

                easing:
                    "ease-out"
            }
        );


        setTimeout(
            () => heart.remove(),
            3000
        );

    }

}


/* =========================
   START SHUFFLED
========================= */

setTimeout(() => {

    shufflePuzzle();

}, 500);
/* =========================================
   THEME SWITCHER
========================================= */

const themeButtons = document.querySelectorAll(".theme-btn");

function setTheme(theme) {

    if (theme === "blue") {
        document.body.classList.add("blue-mode");
    } else {
        document.body.classList.remove("blue-mode");
    }

    themeButtons.forEach(button => {

        button.classList.remove("active");

        if (button.dataset.theme === theme) {
            button.classList.add("active");
        }

    });

    localStorage.setItem("loveTheme", theme);
}


/* Button click */

themeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const theme = button.dataset.theme;

        setTheme(theme);

    });

});


/* Remember user's choice */

const savedTheme = localStorage.getItem("loveTheme");

if (savedTheme) {
    setTheme(savedTheme);
} else {
    setTheme("pink");
}
/* =========================================
   MUSIC PLAYER TOGGLE
========================================= */

const musicToggle =
    document.getElementById("musicToggle");

const musicPlayerElement =
    document.getElementById("musicPlayer");


if (musicToggle && musicPlayerElement) {

    musicToggle.addEventListener("click", () => {

        musicPlayerElement.classList.toggle("hidden");

    });

}
/* =========================================
   MUSIC PLAYER CONTROLS
========================================= */

const loveSong = document.getElementById("loveSong");
const musicPlay = document.getElementById("musicPlay");
const musicProgress = document.getElementById("musicProgress");
const musicVolume = document.getElementById("musicVolume");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

if (
    loveSong &&
    musicPlay &&
    musicProgress &&
    musicVolume &&
    currentTime &&
    duration
) {

    musicPlay.addEventListener("click", () => {

        if (loveSong.paused) {

            loveSong.play();

            musicPlay.textContent = "❚❚";

        } else {

            loveSong.pause();

            musicPlay.textContent = "▶";

        }

    });

    loveSong.addEventListener("loadedmetadata", () => {

        musicProgress.max = loveSong.duration;

        duration.textContent =
            formatTime(loveSong.duration);

    });

    loveSong.addEventListener("timeupdate", () => {

        musicProgress.value = loveSong.currentTime;

        currentTime.textContent =
            formatTime(loveSong.currentTime);

    });

    musicProgress.addEventListener("input", () => {

        loveSong.currentTime =
            musicProgress.value;

    });

    musicVolume.addEventListener("click", () => {

        loveSong.muted =
            !loveSong.muted;

        musicVolume.textContent =
            loveSong.muted ? "🔇" : "♫";

    });

    loveSong.addEventListener("ended", () => {

        musicPlay.textContent = "▶";

        musicProgress.value = 0;

    });

}

function formatTime(seconds) {

    if (isNaN(seconds)) return "0:00";

    const minutes =
        Math.floor(seconds / 60);

    const secs =
        Math.floor(seconds % 60);

    return minutes + ":" +
        (secs < 10 ? "0" : "") +
        secs;
}
// SUPABASE
const SUPABASE_URL = "https://xbyhglkqbgygypvaaegv.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_zRLeYmOibh2erCmAHj0oSg_jwXm6gNT";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);
/* =========================================
   MISS ME MESSAGE - SUPABASE
========================================= */

const missForm =
    document.getElementById("missForm");

const missMessage =
    document.getElementById("missMessage");

const missSuccess =
    document.getElementById("missSuccess");

const missSend =
    document.getElementById("missSend");


if (missForm) {

    missForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const message =
            missMessage.value.trim();

        if (!message) return;

        missSend.textContent = "sending...";
        missSend.disabled = true;

        try {

            const { error } =
                await supabaseClient
                    .from("messages")
                    .insert([
                        {
                            message: message
                        }
                    ]);

            if (error) {
                console.error("Supabase error:", error);
                throw error;
            }
            
// berhasil
missMessage.value = "";

missSend.textContent = "sent ♡";

const notification = document.createElement("div");

notification.textContent = "udaah kekirimm bb ♡";

notification.style.position = "fixed";
notification.style.bottom = "30px";
notification.style.left = "50%";
notification.style.transform = "translateX(-50%)";
notification.style.background = "#fff";
notification.style.color = "#d98b9b";
notification.style.padding = "12px 22px";
notification.style.borderRadius = "30px";
notification.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
notification.style.fontSize = "14px";
notification.style.fontWeight = "600";
notification.style.zIndex = "99999";

document.body.appendChild(notification);

setTimeout(() => {
    notification.remove();
}, 2500);

setTimeout(() => {
    missSend.textContent = "send it to me ♡";
    missSend.disabled = false;
}, 1200);
        } catch (error) {

            console.error(error);

            missSend.textContent =
                "try again ♡";

            missSend.disabled = false;

        }

    });

}
