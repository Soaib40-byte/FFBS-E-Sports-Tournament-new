let balance = 10;
let matchesPlayed = 0;
let isJoined = false;

// লগইন চেক (Local Storage ব্যবহার করা হয়েছে যাতে বারবার লগইন না লাগে)
function login() {
    localStorage.setItem('userLoggedIn', 'true');
    checkStatus();
}

function checkStatus() {
    if (localStorage.getItem('userLoggedIn') === 'true') {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('app-ui').classList.remove('hidden');
        startTimer();
    }
}

// নেভিগেশন কন্ট্রোল
function showHome() { hideSections(); document.getElementById('home-sec').classList.remove('hidden'); setActiveNav('n-home'); }
function showFFSection() { hideSections(); document.getElementById('ff-sec').classList.remove('hidden'); }
function showProfile() { hideSections(); document.getElementById('profile-sec').classList.remove('hidden'); setActiveNav('n-profile'); }

function hideSections() {
    document.querySelectorAll('.sec').forEach(section => section.classList.add('hidden'));
}

function setActiveNav(id) {
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// জয়েন করার লজিক
function handleJoin() {
    if (isJoined) return;

    let ign = prompt("আপনার গেমের নাম (In-Game Name) লিখুন:");
    if (!ign) return;

    if (balance >= 1) {
        if (confirm(`নাম: ${ign}\nএন্ট্রি ফি ১ টাকা কাটা হবে। আপনি কি নিশ্চিত?`)) {
            balance -= 1;
            updateUI();
            
            // জয়েন হওয়ার প্রসেস (সিমুলেশন)
            let btn = document.getElementById('join-btn');
            btn.innerText = "পেন্ডিং (Wait Approval)";
            btn.style.background = "#ffa502";

            setTimeout(() => {
                alert("এডমিন আপনার রিকোয়েস্ট এপ্রুভ করেছে!");
                isJoined = true;
                matchesPlayed++;
                btn.innerText = "JOINED ✅";
                btn.style.background = "#747d8c";
                btn.disabled = true;
                updateUI();
            }, 3000); // ৩ সেকেন্ড পর এপ্রুভ হবে
        }
    } else {
        alert("ব্যালেন্স নেই! দয়া করে ওয়ালেটে টাকা যোগ করুন।");
    }
}

function updateUI() {
    document.getElementById('top-balance').innerText = balance;
    document.getElementById('m-played').innerText = matchesPlayed;
}

function showRules() {
    alert("রুলস:\n১. হ্যাক ব্যবহার নিষিদ্ধ।\n২. টিম আপ করা যাবে না।\n৩. প্রাইজ মানি সরাসরি ওয়ালেটে যাবে।");
}

// টাইমার
function startTimer() {
    let timeLeft = 3600; 
    setInterval(() => {
        let m = Math.floor(timeLeft / 60);
        let s = timeLeft % 60;
        document.getElementById('timer').innerText = `ম্যাচ শুরু: ${m}:${s < 10 ? '0'+s : s}`;
        if(timeLeft > 0) timeLeft--;
    }, 1000);
}

window.onload = checkStatus;
