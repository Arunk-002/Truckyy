import toast from "react-hot-toast";

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
      border: "2px solid #F38181", // Primary (red shade)
      padding: "14px",
      color: "#fff",
      background: "#B00020", // Strong warning color
      fontWeight: "bold",
      borderRadius: "10px",
    },
    duration: 4000,
    position: "top-center",
  });
};

export { notifySignup, notifyLogin, notifyError };
