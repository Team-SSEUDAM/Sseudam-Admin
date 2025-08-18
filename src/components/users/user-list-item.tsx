import { Suspense } from "react";
import type { User } from "@/types/user";
import { formatRelativeTime } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import UserDetail from "./user-detail";

interface UserListItemProps {
  user: User;
}

export default function UserListItem({ user }: UserListItemProps) {
  return (
    <Card className="hover:shadow-md transition-shadow py-2">
      <Accordion type="single" collapsible>
        <AccordionItem value="details" className="border-none">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center justify-between gap-4 w-full">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-semibold text-sm">#{user.userId}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatRelativeTime(user.createdAt)}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground truncate">
                  {user.email}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-sm font-medium text-gray-900">
                  {user.nickname}
                </span>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className="px-4 pb-4">
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-32">
                  <LoadingSpinner />
                </div>
              }
            >
              <UserDetail userId={user.userId} />
            </Suspense>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
