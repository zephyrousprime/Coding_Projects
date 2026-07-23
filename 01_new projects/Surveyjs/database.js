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
