"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const {
    data: session
  } = authClient.useSession()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmit = () => {
    authClient.signUp.email({
      email,
      password,
      name,
    }, {
      onSuccess: () => {
        window.alert("User created successfully");
        // Optionally redirect or show a success message
      },
      onError: (error) => {
        window.alert("Something went wrong");
        // Handle error, e.g., show an error message
      }
    });
  }

  const onLogin = () => {
    authClient.signIn.email({
      email,
      password,
    }, {
      onSuccess: () => {
        window.alert("Login successfully");
        // Optionally redirect or show a success message
      },
      onError: (error) => {
        window.alert("Something went wrong");
        // Handle error, e.g., show an error message
      }
    });
  }

  if (session) {
    return (
      <div className="p-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-10">
      <div className="p-4 flex flex-col gap-y-4">
        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <Button onClick={onSubmit}>
          Create User
        </Button>
      </div>
      <div className="p-4 flex flex-col gap-y-4">
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <Button onClick={onLogin}>
          Login
        </Button>
      </div>
    </div>
  );
}
