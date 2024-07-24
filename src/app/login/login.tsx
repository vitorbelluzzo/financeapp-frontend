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
import { Label } from "@/components/ui/label";

export default function LoginScreen() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center  py-12 lg:px-8">
        <div className="mx-auto sm:w-">
          <Image src={logo} className="size-14 mx-auto" alt="" />
          <h2 className="mt-2 text-center text-3xl font-bold ">Finance App</h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <Card className="w-full max-w-sm card">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
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
                <Input id="password" type="password" required />
              </div>
            </CardContent>
            <CardFooter className="gap-2 mt-4 ">
              <Button variant="default" className="w-full  ">Entrar</Button>
              <Button  variant="default" className="w-full ">
                <a href="/register">Crie sua conta</a>
              </Button>
            </CardFooter>
          </Card>

          <p className="mt-10 text-center text-xs text-gray-900"></p>
        </div>
      </div>
    </>
  );
}
