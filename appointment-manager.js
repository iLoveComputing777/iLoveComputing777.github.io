import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  Timestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { auth, db } from "./firebase.js";

const soonWindowMs = 3 * 24 * 60 * 60 * 1000;
const appointmentAlert = document.querySelector("#appointment-alert");
const appointmentForm = document.querySelector("#appointment-form");
const appointmentInput = appointmentForm?.elements.namedItem("appointmentAt");
const appointmentStatus = document.querySelector("#appointment-status");
const appointmentList = document.querySelector("#appointment-list");
const emptyMessage = document.querySelector("#appointment-empty");

let appointments = [];
let appointmentsLoaded = false;
let unsubscribeAppointments;
let reminderInterval;

function setStatus(message) {
  if (appointmentStatus) {
    appointmentStatus.textContent = message;
  }
}

function updateAppointmentAlert() {
  if (!appointmentAlert) {
    return;
  }

  const now = Date.now();
  const hasSoonAppointment = appointments.some(({ appointmentAt }) => {
    const time = appointmentAt.toMillis();
    return time >= now && time - now <= soonWindowMs;
  });

  appointmentAlert.hidden = !hasSoonAppointment;
}

function renderAppointments() {
  if (!appointmentList) {
    return;
  }

  appointmentList.replaceChildren();
  if (emptyMessage) {
    emptyMessage.hidden = !appointmentsLoaded || appointments.length > 0;
  }

  for (const appointment of appointments) {
    const date = appointment.appointmentAt.toDate();
    const item = document.createElement("li");
    item.className = "appointment-item";

    const time = document.createElement("time");
    time.dateTime = date.toISOString();
    time.textContent = date.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short"
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "appointment-delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", async () => {
      const user = auth.currentUser;
      if (!user) {
        setStatus("Please log in to delete an appointment.");
        return;
      }

      deleteButton.disabled = true;
      setStatus("");
      try {
        await deleteDoc(doc(db, "users", user.uid, "appointments", appointment.id));
        setStatus("Appointment deleted.");
      } catch (error) {
        console.error("Unable to delete appointment:", error);
        setStatus("Could not delete the appointment. Please try again.");
        deleteButton.disabled = false;
      }
    });

    item.append(time, deleteButton);
    appointmentList.append(item);
  }
}

if (appointmentForm && appointmentInput) {
  appointmentInput.min = new Date(
    Date.now() - new Date().getTimezoneOffset() * 60_000
  ).toISOString().slice(0, 16);

  appointmentForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus("");

    const user = auth.currentUser;
    if (!user) {
      setStatus("Please log in to add an appointment.");
      return;
    }

    const appointmentDate = new Date(appointmentInput.value);
    if (!appointmentInput.value || Number.isNaN(appointmentDate.getTime()) || appointmentDate <= new Date()) {
      setStatus("Choose a future date and time.");
      return;
    }

    const submitButton = appointmentForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    try {
      await addDoc(collection(db, "users", user.uid, "appointments"), {
        appointmentAt: Timestamp.fromDate(appointmentDate)
      });
      appointmentForm.reset();
      appointmentInput.min = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60_000
      ).toISOString().slice(0, 16);
      setStatus("Appointment added.");
    } catch (error) {
      console.error("Unable to add appointment:", error);
      setStatus("Could not add the appointment. Check Firestore setup and try again.");
    } finally {
      submitButton.disabled = false;
    }
  });
}

onAuthStateChanged(
  auth,
  (user) => {
    if (unsubscribeAppointments) {
      unsubscribeAppointments();
      unsubscribeAppointments = undefined;
    }
    if (reminderInterval) {
      window.clearInterval(reminderInterval);
      reminderInterval = undefined;
    }

    appointments = [];
    appointmentsLoaded = false;
    updateAppointmentAlert();
    renderAppointments();

    if (!user) {
      return;
    }

    const userAppointments = collection(db, "users", user.uid, "appointments");
    unsubscribeAppointments = onSnapshot(
      userAppointments,
      (snapshot) => {
        appointments = snapshot.docs
          .map((appointmentDocument) => ({
            id: appointmentDocument.id,
            appointmentAt: appointmentDocument.data().appointmentAt
          }))
          .sort((left, right) => left.appointmentAt.toMillis() - right.appointmentAt.toMillis());

        appointmentsLoaded = true;
        renderAppointments();
        updateAppointmentAlert();
      },
      (error) => {
        console.error("Unable to load appointments:", error);
        appointments = [];
        appointmentsLoaded = false;
        renderAppointments();
        updateAppointmentAlert();
        setStatus("Could not load appointments. Check Firestore setup and rules.");
      }
    );
    reminderInterval = window.setInterval(updateAppointmentAlert, 30_000);
  },
  (error) => {
    console.error("Unable to monitor appointment account:", error);
    appointments = [];
    appointmentsLoaded = false;
    renderAppointments();
    updateAppointmentAlert();
    setStatus("Unable to check appointments. Please reload the page.");
  }
);
