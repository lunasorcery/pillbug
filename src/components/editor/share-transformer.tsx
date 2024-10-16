import { EditorDocument } from "./editor-types";
import {
    MegalodonEditorTransformer,
    MegalodonPostStatus,
} from "./megalodon-status-transformer";

type SharePreTransform = {};

/** Megalodon status transformer for share posts */
export class ShareTransformer extends MegalodonEditorTransformer<SharePreTransform> {
    constructor(private shareTargetUrl: string) {
        super();
    }

    protected override async postTransform(
        doc: EditorDocument,
        status: MegalodonPostStatus,
        preTransform: SharePreTransform | undefined
    ): Promise<MegalodonPostStatus> {
        status.status = `${status.status}\n\nRE: ${this.shareTargetUrl}`;

        return status;
    }
}
