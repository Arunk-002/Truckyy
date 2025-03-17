import toast from "react-hot-toast";
import Swal from 'sweetalert2';

const notifySignup = (username) => {
  toast.success(`🍔 Welcome, ${username}! Your account is ready.`, {
    icon: "🎉",
    style: {
      border: "2px solid #F38181", // Primary color
      padding: "14px",
      color: "#fff",
      background: "#95E1D3", // Dark theme color
      fontWeight: "bold",
      borderRadius: "10px",
    },
    duration: 4000,
    position: "top-center",
  });
};

const notifyMessage = (message) => {
  toast.success(`🍔 ${message}!`, {
    icon: "🎉",
    style: {
      border: "2px solid #F38181", // Primary color
      padding: "14px",
      color: "#fff",
      background: "#95E1D3", // Dark theme color
      fontWeight: "bold",
      borderRadius: "10px",
    },
    duration: 4000,
    position: "top-center",
  });
};

const notifyLogin = (username) => {
  toast(`🍕 Welcome back, ${username}!`, {
    icon: "🚀",
    style: {
      background: "#EAFFD0", // Accent color
      color: "#000",
      fontWeight: "bold",
      border: "2px solid #FCE38A", // Secondary color
      borderRadius: "10px",
    },
    position: "top-center",
    duration: 3500,
  });
};

const notifyError = (message) => {
  toast.error(`🚨 Oops! ${message}`, {
    icon: "⚠️",
    style: {
      border: "2px solid #F38181", // Primary color
      padding: "14px",
      color: "#fff",
      background: "#F38181", // Using primary color for error background
      fontWeight: "bold",
      borderRadius: "10px",
    },
    duration: 4000,
    position: "top-center",
  });
};

// ----------------------------SweetAlert--------------------------------

const confirmModal = async () => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to undo this action!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#95E1D3", // Dark theme color
    cancelButtonColor: "#F38181", // Primary color
    confirmButtonText: "Yes, proceed!",
    cancelButtonText: "Cancel",
  });
  if (result.isConfirmed) {
    return true
  } else {
    return false
  }
};

export { notifySignup, notifyLogin, notifyError, notifyMessage, confirmModal };