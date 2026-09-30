const emoji = {
    joy: "😊", sadness: "😢", anger: "😡", fear: "😨",
    surprise: "😲", love: "❤️", neutral: "😐"
};

async function loadDashboard() {
    const stats = await fetch("/api/stats").then(r => r.json());
    const history = await fetch("/api/history").then(r => r.json());

    document.getElementById("total").textContent = stats.total;
    const nonzero = stats.emotions.filter(x => x.count > 0);
    document.getElementById("unique").textContent = nonzero.length;

    if (nonzero.length) {
        const most = [...nonzero].sort((a,b) => b.count-a.count)[0];
        document.getElementById("mostDetected").textContent =
            `${most.emoji} ${most.label}`;
    }

    const max = Math.max(1, ...stats.emotions.map(x => x.count));
    document.getElementById("distribution").innerHTML = stats.emotions.map(x => `
        <div class="dist-row">
            <div class="dist-head">
                <span>${x.emoji} ${x.label}</span><strong>${x.count}</strong>
            </div>
            <div class="dist-bar"><div class="dist-fill" style="width:${x.count/max*100}%"></div></div>
        </div>
    `).join("");

    document.getElementById("historyBody").innerHTML = history.length
        ? history.map(x => `
            <tr>
                <td>${escapeHtml(x.text)}</td>
                <td>${x.emoji} ${x.label}</td>
                <td>${x.confidence}%</td>
                <td>${x.created_at}</td>
            </tr>
        `).join("")
        : `<tr><td colspan="4">No predictions yet.</td></tr>`;
}

async function clearHistory() {
    if (!confirm("Clear all prediction history?")) return;
    await fetch("/api/clear-history", {method: "DELETE"});
    loadDashboard();
}

function escapeHtml(value) {
    return value.replace(/[&<>"']/g, c => ({
        "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
    }[c]));
}

loadDashboard();
