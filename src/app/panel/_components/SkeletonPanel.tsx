import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";

const SkeletonPanel = () => (
  <Card className="w-80 rounded-xl shadow-2xl bg-stone-900 text-card-foreground transition-all duration-300 hover:shadow-xl">
    <CardHeader>
      <Skeleton className="h-6 w-3/4" />
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </CardContent>
    <CardFooter className="pt-4">
      <div className="flex w-full space-x-2">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-10 w-1/2" />
      </div>
    </CardFooter>
  </Card>
);

export default SkeletonPanel;