function indexjs() {
  
        // ──────────────────────────────────────────────────────────────
// script.js  –  SurveyJS form setup & submission handler
// ──────────────────────────────────────────────────────────────

const surveyJson = {
  title: "Contact & Feedback Form",
  description:
    "Please complete the form below. All fields marked with * are required.",
  showProgressBar: "top",
  progressBarType: "buttons",
  pages: [
    // ── Page 1: Personal Info ─────────────────────────────
    {
      name: "personal",
      title: "Personal Information",
      elements: [
        {
          type: "text",
          name: "firstName",
          title: "First Name *",
          isRequired: true,
          minWidth: "200px",
          maxWidth: "400px",
        },
        {
          type: "text",
          name: "lastName",
          title: "Last Name *",
          isRequired: true,
          minWidth: "200px",
          maxWidth: "400px",
        },
        {
          type: "text",
          name: "email",
          title: "Email Address *",
          inputType: "email",
          isRequired: true,
          validators: [{ type: "email" }],
          placeholder: "you@example.com",
        },
        {
          type: "text",
          name: "phone",
          title: "Phone Number",
          inputType: "tel",
          placeholder: "(555) 123-4567",
        },
      ],
    },
    // ── Page 2: Preferences ───────────────────────────────
    {
      name: "preferences",
      title: "Your Preferences",
      elements: [
        {
          type: "radiogroup",
          name: "contactMethod",
          title: "Preferred Contact Method *",
          isRequired: true,
          choices: ["Email", "Phone", "Text Message"],
        },
        {
          type: "dropdown",
          name: "department",
          title: "Department of Interest",
          choices: [
            "Sales",
            "Support",
            "Billing",
            "Technical",
            "Other",
          ],
          placeholder: "Select a department…",
        },
        {
          type: "boolean",
          name: "newsletter",
          title: "Subscribe to our newsletter?",
          labelTrue: "Yes, please",
          labelFalse: "No thanks",
          defaultValue: true,
        },
      ],
    },
    // ── Page 3: Additional Info ───────────────────────────
    {
      name: "additional",
      title: "Anything Else?",
      elements: [
        {
          type: "rating",
          name: "satisfaction",
          title: "How would you rate your experience so far?",
          rateCount: 5,
          rateMin: 1,
          minRateDescription: "Poor",
          maxRateDescription: "Excellent",
        },
        {
          type: "comment",
          name: "comments",
          title: "Additional comments or questions",
          placeholder: "Type anything here…",
          rows: 4,
        },
      ],
    },
  ],
};

// ── Create the survey model ────────────────────────────────
const survey = new Survey.Model(surveyJson);

// ── Handle completion → save to database ───────────────────
survey.onComplete.add(async (sender) => {
  const statusEl = document.getElementById("statusMessage");

  try {
    statusEl.textContent = "Submitting…";
    statusEl.className = "status";

    // ↓↓↓  This is where your data goes to the database  ↓↓↓
    await Database.saveResponse(sender.data);

    statusEl.textContent = "Response saved successfully!";
    statusEl.className = "status success";
  } catch (err) {
    console.error("Failed to save survey response:", err);
    statusEl.textContent = `Error: ${err.message}`;
    statusEl.className = "status error";
  }

  statusEl.classList.remove("hidden");
});

// ── Render the survey once the DOM is ready ────────────────
document.addEventListener("DOMContentLoaded", () => {
  survey.render(document.getElementById("surveyContainer"));
});
}
function resultsjs() {
  
        
    document.addEventListener("DOMContentLoaded", async () => {
      const loading = document.getElementById("loading");
      const container = document.getElementById("resultsTable");

      try {
        const res = await fetch("load.php");
        const rows = await res.json();

        if (rows.length === 0) {
          loading.textContent = "No responses yet.";
          return;
        }

        loading.classList.add("hidden");

        let html = `<table class="data-table">
          <thead>
            <tr>
              <th>#</th><th>Name</th><th>Email</th><th>Phone</th>
              <th>Contact</th><th>Dept</th><th>Rating</th><th>Comments</th><th>Date</th>
            </tr>
          </thead>
          <tbody>`;

        rows.forEach((r, i) => {
          html += `<tr>
            <td>${i + 1}</td>
            <td>${r.first_name} ${r.last_name}</td>
            <td>${r.email}</td>
            <td>${r.phone || "—"}</td>
            <td>${r.contact_method}</td>
            <td>${r.department || "—"}</td>
            <td>${r.satisfaction || "—"}</td>
            <td>${r.comments || "—"}</td>
            <td>${r.submitted_at}</td>
          </tr>`;
        });

        html += "</tbody></table>";
        container.innerHTML = html;
      } catch (err) {
        loading.textContent = "Error loading results: " + err.message;
        loading.classList.add("error");
      }
    });
}
function databasejs() {
  // ──────────────────────────────────────────────────────────────
// database.js  –  Database integration layer
//
//  Uses your existing MySQL setup via insert.php.
//  SurveyJS posts JSON here → PHP inserts via mysqli.
// ──────────────────────────────────────────────────────────────

const Database = (() => {a

  const API_URL = "insert.php";

  /**
   * Save a completed survey response.
   * @param {object} data  The survey result (sender.data from SurveyJS).
   * @returns {Promise<object>}  JSON response from the PHP endpoint.
   */
  async function saveResponse(data) {
    const payload = {
      responses: data,
    };

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await res.json();

    if (!res.ok || json.error) {
      throw new Error(json.error || `Server error: ${res.status}`);
    }

    return json;
  }

  /**
   * Load all saved responses (optional – useful for a stats page).
   * @returns {Promise<object[]>}
   */
  async function loadResponses() {
    const res = await fetch("load.php");

    if (!res.ok) {
      throw new Error(`Database error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  }

  return {
    saveResponse,
    loadResponses,
  };
})();

}
switch(document.body.id) {
    case "index":
      indexjs();
      databasejs();
        break;
    case "results":
      resultsjs();
        break;
}

