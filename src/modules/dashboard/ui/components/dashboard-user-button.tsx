import { authClient } from "@/lib/auth-client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GenerateAvatar } from "@/components/generate-avatar";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

export const DashboardUserButton = () => {
    const router = useRouter();
    const isMobile = useIsMobile();
    const { data, isPending } = authClient.useSession();

    const onLogout = () => {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in");
                }
            }
        });
    };

    if (isPending || !data?.user) {
        return null;
    }

    if (isMobile) {
        return (
            <Drawer>
                <DrawerTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
                    {data.user.image ? (
                        <Avatar>
                            <AvatarImage src={data.user.image} />
                        </Avatar>
                    ) : (
                        <GenerateAvatar
                            seed={data.user.name || "User"}
                            variant="initials"
                            className="size-9 mr-3"
                        />
                    )}
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5 text-left overflow-hidden ml-3">
                        <p className="text-sm truncate w-full">
                            {data.user.name || "User"}
                        </p>
                        <p className="text-xs truncate w-full">
                            {data.user.email || "email.gmail.com"}
                        </p>
                    </div>
                    <ChevronDownIcon className="size-4 shrink-0" />
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{data.user.name}</DrawerTitle>
                        <DrawerTitle>{data.user.email}</DrawerTitle>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button
                            variant="outline"
                            onClick={()=>{}}
                        >
                            <CreditCardIcon className="size-4 text-black" />
                            Billing
                        </Button>
                        <Button
                            variant="outline"
                            onClick={onLogout}
                        >
                            <LogOutIcon className="size-4 text-black" />
                            Logout
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
                {data.user.image ? (
                    <Avatar>
                        <AvatarImage src={data.user.image} />
                    </Avatar>
                ) : (
                    <GenerateAvatar
                        seed={data.user.name || "User"}
                        variant="initials"
                        className="size-9 mr-3"
                    />
                )}
                <div className="flex-1 min-w-0 flex flex-col gap-0.5 text-left overflow-hidden ml-3">
                    <p className="text-sm truncate w-full">
                        {data.user.name || "User"}
                    </p>
                    <p className="text-xs truncate w-full">
                        {data.user.email || "email.gmail.com"}
                    </p>
                </div>
                <ChevronDownIcon className="size-4 shrink-0" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="right" className="w-72">
                <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                        <span className="font-medium truncate">{data.user.name}</span>
                        <span className="text-sm font-normal text-muted-foreground truncate">{data.user.email}</span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer flex items-center justify-between"
                >
                    Billing
                    <CreditCardIcon className="size-4" />
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={onLogout}
                    className="cursor-pointer flex items-center justify-between"
                >
                    Logout
                    <LogOutIcon className="size-4" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};