import { signIn, signOut, auth } from "@/modules/services/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { RiDashboardLine } from "react-icons/ri";

export default async function Hero() {
  const session = await auth();

  return (
    <Card className="w-80 rounded-xl shadow-2xl bg-stone-900 text-card-foreground transition-all duration-300 hover:shadow-xl">
      <CardContent className="pt-8">
        {session ? (
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20 ring-2 ring-primary ring-offset-2 ring-offset-background">
              <AvatarImage
                src={session.user?.image || ""}
                className="w-full h-full object-cover"
              />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                {session.user?.name?.[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <span className="text-xl font-bold text-primary">
                {session.user?.name}
              </span>
              <span className="text-sm text-muted-foreground">
                {session.user?.email}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-20 w-20 rounded-full bg-card-foreground/20" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-40 bg-card-foreground/20" />
              <Skeleton className="h-4 w-32 bg-card-foreground/20" />
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-4">
        {session ? (
          <div className="flex w-full space-x-2">
            <Link href="/panel" passHref>
              <Button
                type="button"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-200"
              >
                <RiDashboardLine className="w-5 h-5" />
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
                className="w-full hover:bg-destructive/90 transition-colors duration-200"
              >
                Sair
              </Button>
            </form>
          </div>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn("discord");
            }}
            className="w-full"
          >
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-200"
            >
              Entrar com Discord
            </Button>
          </form>
        )}
      </CardFooter>
    </Card>
  );
}
