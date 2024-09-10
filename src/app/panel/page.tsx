import SkeletonPanel from "@/app/panel/_components/SkeletonPanel";
import { Suspense } from 'react';
import { auth, signOut } from "@/modules/services/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RiLogoutBoxLine, RiArrowLeftLine } from "react-icons/ri";
import Link from "next/link";

async function PanelContent() {
  const session = await auth();
  if (!session) {
    redirect('/');
  }

  return (
    <Card className="w-80 rounded-xl shadow-2xl bg-stone-900 text-card-foreground transition-all duration-300 hover:shadow-xl">
      <CardHeader>
        <CardTitle>
            <div className="text-xl font-bold text-primary">
               Bem-vindo ao painel, {session.user?.name}!
            </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground text-stone-600">
            <span className="text-stone-400 flex flex-col">Você está logado com o email:</span>
            {session.user?.email}
        </p>
      </CardContent>

      <CardFooter className="pt-4">
          <div className="flex w-full space-x-2">
            <Link href="/" passHref>
              <Button
                variant="secondary"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-200"
              >
                <RiArrowLeftLine className="w-5 h-5" />
              </Button>
            </Link>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
              className="flex-1"
            >
              <Button
                variant="destructive"
                type="submit"
                className="w-full hover:bg-destructive/90 transition-colors duration-200 flex items-center justify-center"
              >
                <RiLogoutBoxLine className="w-5 h-5" />
              </Button>
            </form>
          </div>
      </CardFooter>
    </Card>
  );
}

export default function Panel() {
  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center p-6">
      <Suspense fallback={<SkeletonPanel />}>
        <PanelContent />
      </Suspense>
    </div>
  );
}