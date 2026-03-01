import React from "react";
import { useNavigate } from "react-router-dom";

export const HomePage: React.FC = () => {
  const navigate=useNavigate();
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome 👋</h1>
        <p style={styles.subtitle}>
          We're glad to have you here. Please sign in or log in to continue.
        </p>

        <div style={styles.buttonContainer}>
          <button style={styles.primaryButton} onClick={()=>{navigate('/signup');}}>Sign Up</button>
          <button style={styles.secondaryButton} onClick={()=>{navigate('/signin');}}>Login</button>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #white, #white)",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    width: "500px",
    padding: "40px",
    borderRadius: "16px",
    backgroundColor: "#ffffff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    textAlign: "center",
  },
  title: {
    fontSize: "32px",
    marginBottom: "10px",
    color: "#111827",
  },
  subtitle: {
    fontSize: "16px",
    marginBottom: "30px",
    color: "#6b7280",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  primaryButton: {
    padding: "12px 28px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4f46e5",
    color: "#ffffff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  },
  secondaryButton: {
    padding: "12px 28px",
    borderRadius: "8px",
    border: "2px solid #4f46e5",
    backgroundColor: "transparent",
    color: "#4f46e5",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  },
};
