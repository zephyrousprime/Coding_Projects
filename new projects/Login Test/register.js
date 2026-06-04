async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

const users = [];

async function register(username, password) {
    const hash = await hashPassword(password);
    users.push({ username, passwordHash: hash });
}

document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;
    
    await register(username, password);
    
    const finalHash = await hashPassword(password);
    document.getElementById("regResult").textContent = 
        `User ${username} registered successfully!\n` +
        `Password was: ${password}\n` +
        `SHA-256 Hash: ${finalHash}`;
});