const users = [
    {
        username: "student1",
        password: "Password123!",
        passwordHash: await simpleHash(`Password123!`)
    },
    {
        username: "pro_coder", // Added second user
        password: "SecureNode789",
        passwordHash: await simpleHash(`SecureNode789`)
    }
];

async function simpleHash(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
document.getElementById("loginBtn").onclick = async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const result = document.getElementById("result");

    const user = users.find(u => u.username === username);
    const pos = users.indexOf(user);

    if (!user) {
        result.textContent = "User not found";
        return;
    }

    const inputHash = await simpleHash(password);

    if (inputHash === user.passwordHash) {
        // Using template literals (backticks) for the tricky message
        result.textContent = `Login successful for ${user.username}. The Hash of the password is ${user.passwordHash}`;
    } else {
        result.textContent = "Incorrect password";
    }
};