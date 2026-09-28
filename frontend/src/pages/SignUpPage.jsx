import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../AuthContext";

const BASE = "http://127.0.0.1:8000";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit() {
    setError("");
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    const res = await fetch(`${BASE}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.detail || "Signup failed.");
      return;
    }

    // signup succeeded, now log them in automatically
    const loginRes = await fetch(`${BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ username: email, password }),
    });
    const loginData = await loginRes.json();
    login(loginData.access_token);
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-stone-900">
          Create account
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Start tracking with Cadence.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:outline-none"
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            maxLength={72}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:outline-none"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            onClick={handleSubmit}
            className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-700"
          >
            Sign up
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-stone-500">
          Already have an account?{" "}
          <Link to="/login" className="text-stone-900 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
