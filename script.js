const login = document.getElementById("login");
const terminal = document.getElementById("terminal");
const dangerAlert = document.getElementById("danger-alert");
const finalMessage = document.getElementById("final-message");

// Store the current password
let currentPassword = "";

const lines = [
    "Access Granted.",
    "Connecting to darkweb...",
    "Injecting rootkit...",
    "Extracting credentials...",
    "admin: qwerty123",
    "paypal@hack.com: steal@money",
    "Deleting backups...",
    "█▒▒▒▒▒▒▒▒▒▒ 10%",
    "████▒▒▒▒▒▒▒ 50%",
    "█████████▒▒ 90%",
    "███████████ 100%",
    "System Destroyed.",
    "You've been hacked 💀",
    "",
    "...",
    "...",
    "...",
    "Wait...",
    "",
    "🎉 GOTCHA! 🎉",
    "",
    "Just kidding! 😄",
    "This was a harmless prank.",
    "No actual hacking occurred.",
    "Your system is perfectly safe!"
];

let i = 0, charIndex = 0;

function generateRandomPassword() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < 8; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

function getPassword() {
    // Generate a new random password only if there's no current password
    if (!currentPassword || currentPassword === "") {
        currentPassword = generateRandomPassword();
        console.log("New password generated:", currentPassword);
        document.getElementById("password-status").innerHTML = "New password generated";
        document.getElementById("password-status").style.color = "#00ff00";
    } else {
        console.log("Using existing password:", currentPassword);
        document.getElementById("password-status").innerHTML = "Using same password";
        document.getElementById("password-status").style.color = "#ffff00";
    }

    // Show the password hint
    document.getElementById("password-hint").style.display = "block";
    document.getElementById("password").style.display = "block";
    
    // Show toast message with the current password
    showToast(`Your admin password is: ${currentPassword}<br>This password will remain valid until you login`);
    
    // Hide the "get password" button and show "Access" button
    document.getElementById("accessBtn").style.display = "none";
    document.getElementById("loginBtn").style.display = "inline-block";
}

function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = message;
    
    // Better positioning for different screen sizes
    if (window.innerWidth < 768) {
        toast.style.position = 'fixed';
        toast.style.top = '10px';
        toast.style.left = '5px';
        toast.style.right = '5px';
        toast.style.width = 'auto';
    }

    document.body.appendChild(toast);
    
    // Store toast reference globally so we can remove it later
    window.currentToast = toast;
    
    // Toast will persist until correct password is entered
}

function checkPassword() {
    const pass = document.getElementById("password").value;
    console.log("Entered password:", pass);
    console.log("Current password:", currentPassword);
    
    if (pass === currentPassword) {
        console.log("Password match! Logging in...");
        document.getElementById("password-status").innerHTML = "Login successful!";
        document.getElementById("password-status").style.color = "#00ff00";
        
        // Remove toast when password is correct
        if (window.currentToast && window.currentToast.parentNode) {
            window.currentToast.parentNode.removeChild(window.currentToast);
            window.currentToast = null;
        }
        
        // Clear the current password after successful login
        currentPassword = "";
        login.style.display = "none";
        
        // Go directly to terminal
        terminal.style.display = "flex";
        document.body.requestFullscreen?.(); // Lock screen
        
        // Start terminal blinking effect
        terminal.classList.add("blinking");
        
        // Show blinking cursor
        terminal.innerHTML = '';
        
        // After 2 seconds of terminal blinking, start typing
        setTimeout(() => {
            terminal.innerHTML = "";
            terminal.classList.remove("blinking");
            typeLine();
        }, 2000);
    } else {
        console.log("Password mismatch!");
        document.getElementById("password-status").innerHTML = "Wrong password - try again";
        document.getElementById("password-status").style.color = "#ff0000";
        
        // Show a subtle indication that password is wrong
        document.getElementById("password").style.borderColor = "#ff0000";
        setTimeout(() => {
            document.getElementById("password").style.borderColor = "#00ff00";
        }, 1000);
        
        // Toast remains visible since password is wrong
    }
}

function typeLine() {
    if (i < lines.length) {
        const line = lines[i];
        if (charIndex < line.length) {
            terminal.innerHTML += line.charAt(charIndex);
            charIndex++;
            // Play a simple beep sound
            playBeep();
            setTimeout(typeLine, 30);
        } else {
            terminal.innerHTML += "\n";
            i++;
            charIndex = 0;
            
            // Show danger alert after "Access Granted" line
            if (lines[i - 1] === "Access Granted.") {
                // Show danger alert for 3 seconds
                dangerAlert.style.display = "flex";
                setTimeout(() => {
                    dangerAlert.style.display = "none";
                    // Continue typing after hiding danger alert
                    setTimeout(typeLine, 500);
                }, 3000);
                return;
            }

            // Add longer delay for suspense before reveal
            let delay = 500;
            if (lines[i - 1] === "You've been hacked 💀") {
                delay = 2000; // 2 second pause after "hacked" message
            } else if (lines[i - 1] === "Wait...") {
                delay = 1500; // 1.5 second pause before GOTCHA
            } else if (lines[i - 1] === "🎉 GOTCHA! 🎉") {
                delay = 1000; // 1 second pause after GOTCHA
            }

            setTimeout(typeLine, delay);
        }
    } else {
        setTimeout(() => {
            terminal.style.display = "none";
            finalMessage.style.display = "flex";
            finalMessage.style.flexDirection = "column";
            finalMessage.style.alignItems = "center";
            finalMessage.style.justifyContent = "center";
            finalMessage.style.height = "100vh";
        }, 3000); // 3 second delay before showing final screen
    }
}

function playBeep() {
    try {
        // Create a simple beep sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Silently fail if audio context is not available
    }
}

function restart() {
    // Reset everything
    i = 0;
    charIndex = 0;
    currentPassword = "";
    terminal.innerHTML = "";
    finalMessage.style.display = "none";
    dangerAlert.style.display = "none";
    terminal.style.display = "none";
    login.style.display = "flex";
    document.getElementById("password").value = "";
    document.getElementById("password").style.display = "none";
    
    // Remove any existing toast
    if (window.currentToast && window.currentToast.parentNode) {
        window.currentToast.parentNode.removeChild(window.currentToast);
        window.currentToast = null;
    }
    
    // Reset buttons to initial state
    document.getElementById("accessBtn").style.display = "inline-block";
    document.getElementById("loginBtn").style.display = "none";
    
    // Reset password hint
    document.getElementById("password-hint").style.display = "none";
    document.getElementById("password-status").innerHTML = "Password persistence: Ready";
    document.getElementById("password-status").style.color = "#00ff00";
    
    // Exit fullscreen
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}

// Viewport-based font size adjustment
function adjustFontSize() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const terminal = document.getElementById('terminal');
    
    if (vw < 480) {
        terminal.style.fontSize = '0.7rem';
    } else if (vw < 768) {
        terminal.style.fontSize = '0.8rem';
    } else if (vw < 1024) {
        terminal.style.fontSize = '0.9rem';
    } else {
        terminal.style.fontSize = '1rem';
    }
}

// Call on load and resize
window.addEventListener('resize', adjustFontSize);
window.addEventListener('load', adjustFontSize);

// Show login screen on load
window.addEventListener('load', () => {
    login.style.display = "flex";
});

