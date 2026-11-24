import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const protectedPage = document.body.hasAttribute("data-auth-required");

onAuthStateChanged(
  auth,
  (user) => {
    document.body.classList.toggle("authenticated", Boolean(user));
    if (protectedPage) {
      if (user) {
        document.body.classList.remove("auth-pending");
      } else {
        window.location.replace("login.html");
      }
    }
  },
  (error) => {
    console.error("Unable to verify Firebase Authentication state:", error);
    if (protectedPage) {
      window.alert("Unable to verify your sign-in. Please log in again.");
      window.location.replace("login.html");
    }
  }
);

const errorMessages = {
  "auth/invalid-credential": "The email or password is incorrect.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
  "auth/email-already-in-use": "An account already exists for this email.",
  "auth/operation-not-allowed": "Email/password authentication is not enabled for this Firebase project.",
  "auth/weak-password": "Choose a password with at least 6 characters.",
  "auth/network-request-failed": "Unable to connect. Check your internet connection and try again."
};

function showError(messageElement, error) {
  console.error("Firebase Authentication error:", error);
  messageElement.textContent = errorMessages[error.code] || "Authentication failed. Please try again.";
}

for (const form of document.querySelectorAll("[data-auth-form]")) {
  const message = form.querySelector(".auth-message");
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    message.textContent = "";
    submitButton.disabled = true;

    const email = form.elements.namedItem("email").value.trim();
    const password = form.elements.namedItem("password").value;

    try {
      if (form.dataset.authForm === "register") {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      window.location.assign("index.html");
    } catch (error) {
      showError(message, error);
    } finally {
      submitButton.disabled = false;
    }
  });

  const resetButton = form.querySelector("[data-password-reset]");
  if (resetButton) {
    resetButton.addEventListener("click", async () => {
      message.textContent = "";
      const email = form.elements.namedItem("email").value.trim();
      if (!email) {
        message.textContent = "Enter your email address first.";
        form.elements.namedItem("email").focus();
        return;
      }

      resetButton.disabled = true;
      try {
        await sendPasswordResetEmail(auth, email);
        message.textContent = "If an account exists for that email, a password reset email has been sent.";
      } catch (error) {
        if (error.code === "auth/user-not-found") {
          message.textContent = "If an account exists for that email, a password reset email has been sent.";
        } else {
          showError(message, error);
        }
      } finally {
        resetButton.disabled = false;
      }
    });
  }
}

const logoutLink = document.querySelector("[data-auth-logout]");
if (logoutLink) {
  logoutLink.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      await signOut(auth);
      window.location.assign("login.html");
    } catch (error) {
      console.error("Firebase sign-out error:", error);
      window.alert("Unable to log out. Please try again.");
    }
  });
}
