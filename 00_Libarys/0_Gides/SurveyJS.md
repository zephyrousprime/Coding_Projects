---
tags:
  - library/javascript
  - category/forms
  - "#title/surveyjs"
aliases:
  - SurveyJS
  - SurveyJS Form Library
---

# SurveyJS

> JSON-driven forms, surveys, and quizzes

## Related Libraries
- [[Axios]]

## Parent Indexes
- [[Libary-Master]]
- [[Category-Index]]

## Backlinks
- [[Libary-Master]]

---

Open-source JavaScript form library for rendering dynamic surveys, quizzes, and multi-page forms from a JSON schema.

- **Docs:** https://surveyjs.io/form-library/documentation/get-started-html-css-javascript
- **Download:** https://github.com/surveyjs/survey-library

> **Note:** In a plain HTML page, load `survey-core` before `survey-js-ui`. The core package contains the form model and styles; the UI package renders the form.

### Installation

**Local (downloaded files)**

```html
<link rel="stylesheet" href="vendor/surveyjs/survey-core.min.css">
<script src="vendor/surveyjs/survey.core.min.js"></script>
<script src="vendor/surveyjs/survey-js-ui.min.js"></script>
```

**CDN**

```html
<link href="https://unpkg.com/survey-core/survey-core.min.css" rel="stylesheet">
<script src="https://unpkg.com/survey-core/survey.core.min.js"></script>
<script src="https://unpkg.com/survey-js-ui/survey-js-ui.min.js"></script>
```

**Package manager**

```bash
npm install survey-js-ui
```

### Examples

#### Basic contact form

Creates a required name field and an email field, then renders the form into `#surveyContainer`.

```html
<div id="surveyContainer"></div>
```

```js
const survey = new Survey.Model({
  title: "Contact details",
  elements: [
    {
      type: "text",
      name: "name",
      title: "Your name",
      isRequired: true,
    },
    {
      type: "text",
      name: "email",
      title: "Email address",
      inputType: "email",
      validators: [
        { type: "email" },
      ],
    },
  ],
});

document.addEventListener("DOMContentLoaded", () => {
  survey.render(document.getElementById("surveyContainer"));
});
```

#### Conditional follow-up question

Shows the follow-up only when the user selects "Yes", keeping the form concise.

```js
const survey = new Survey.Model({
  elements: [
    {
      type: "boolean",
      name: "hasExperience",
      title: "Do you have programming experience?",
      labelTrue: "Yes",
      labelFalse: "No",
      isRequired: true,
    },
    {
      type: "comment",
      name: "experienceDetails",
      title: "Which languages have you used?",
      visibleIf: "{hasExperience} = true",
      isRequired: true,
    },
  ],
});
```

#### Save completed responses

Sends the completed form data to an application endpoint as JSON. Replace `/api/survey-responses` with the real endpoint.

```js
survey.onComplete.add(async (sender) => {
  const response = await fetch("/api/survey-responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sender.data),
  });

  if (!response.ok) {
    throw new Error("Could not save the survey response.");
  }
});
```

#### Apply a built-in theme

Loads and applies a predefined theme after the core script. Use this when the Default theme does not suit the page.

```html
<script src="https://unpkg.com/survey-core/themes/layered-dark-panelless.min.js"></script>
```

```js
survey.applyTheme(SurveyTheme.LayeredDarkPanelless);
```

---

## Navigation
- [[Libary-Master]]
