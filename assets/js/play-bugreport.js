import { createBugFeedbackFab } from "../vendor/game-forge/bug-report.js";
if (window.__pcGameTitle) {
  document.body.append(createBugFeedbackFab({
    gameName: window.__pcGameTitle,
    mailto: "pickle.castle.studios@gmail.com",
  }));
}
