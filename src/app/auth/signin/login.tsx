"use client";

import logo from "@/app/assets/logo.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";

export default function LoginScreen() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      console.log('Iniciando requisição para /signin...');

      const response = await fetch('http://localhost:8080/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        console.error("Erro na requisição:", response.status, response.statusText);
        throw new Error("Falha no login, por favor verifique suas informações");
      }

      const data = await response.json();
      console.log("Dados recebidos:", data);

      localStorage.setItem("authToken", data.accessToken);



      console.log("Login bem-sucedido. Redirecionando para o dashboard...");
      window.location.href = "/overview";
    } catch (err) {
      console.error("Erro ao fazer login:", err);

      if (err instanceof Error) {
        setError(err.message || "Erro ao fazer login");
      } else {
        setError("Erro ao fazer login");
      }
    }
  };


  return (
    <>

      <div className="w-full max-w-sm  mx-auto my-auto justify-center py-12 ">
        <div className="mx-auto ">
          <Image src={logo} className="size-14 mx-auto" alt="" />
          <h2 className="mt-2 text-center text-3xl font-bold ">Finance App</h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <Card className="w-full max-w-sm ">
            <CardContent className="grid gap-4 mt-7">

              <div className="grid gap-2">
                <Input
                  type="text"
                  placeholder="username"
                  value={username}
                  className="p-3 rounded"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  className="p-3 rounded"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>

            <CardFooter className="  ">
              <div className=" w-full gap-3 flex flex-col  ">
                <Button variant="default" className="w-full " onClick={handleLogin}>
                  Entrar
                </Button>
                <Link href="/auth/signup">
                  <Button variant="secondary" className="w-full">Criar conta</Button>
                </Link>

              </div>
            </CardFooter>
          </Card>

          <p className="mt-10 text-center text-xs "></p>
        </div>
      </div>
    </>
  );
}
