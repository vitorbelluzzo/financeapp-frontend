import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm mt-20">
      <CardHeader>
        <CardTitle className="text-xl">Registrar</CardTitle>
       
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">Nome</Label>
              <Input id="first-name" placeholder="Vitor" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Sobrenome</Label>
              <Input id="last-name" placeholder="Belluzzo" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="v@exemplo.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" />
          </div>
          <Button type="submit" className="w-full">
            Criar conta
          </Button>
          
        </div>
        <div className="mt-4 text-center text-sm">
          Já tem uma conta?{" "}
          <a href="/" className="underline">
            Entrar
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
