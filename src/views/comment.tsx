import { A } from "@solidjs/router";
import { Entity } from "megalodon";
import { Status } from "megalodon/lib/src/entities/status";
import {
    createResource,
    createSignal,
    For,
    Setter,
    type Component,
} from "solid-js";
import {
    AuthProviderProps,
    tryGetAuthenticatedClient,
    useAuthContext,
} from "~/App";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Flex } from "~/components/ui/flex";
import { Grid, Col } from "~/components/ui/grid";
import HtmlSandbox from "./htmlsandbox";

export type CommentProps = {
    status: Status;
    depth: number;
};

const CommentPostComponent: Component<CommentProps> = (postData) => {
    const authContext = useAuthContext();
    const status = postData.status;

    const userHref = `/user/${status.account.acct}`;
    const postHref = `/post/${status.id}`;

    const indentClass = `mx-${postData.depth * 5 + 20}`;

    return (
        <Card class="m-4 flex flex-row mx-20 my-1 py-1">
            <div class="w-7 flex-none size-16 aspect-square">
                <A href={userHref} class="m-2 size-16 aspect-square">
                    <img
                        src={status.account.avatar}
                        class="size-16 aspect-square"
                        alt={`the avatar of ${status.account.acct}`}
                    />
                </A>
            </div>
            <div class="flex-1 grow">
                <div class="p-3">
                    <A href={userHref} class="m-2">
                        {status.account.display_name}
                    </A>
                    <A href={userHref} class="m-1 text-neutral-500">
                        {status.account.acct}
                    </A>
                    <A href={postHref} class="m-1 text-neutral-500">
                        {status.created_at}
                    </A>
                    depth: {postData.depth}
                </div>
                <CardContent class="p-3">
                    <HtmlSandbox html={status.content} />
                </CardContent>
            </div>
        </Card>
    );
};

export default CommentPostComponent;