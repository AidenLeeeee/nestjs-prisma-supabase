import { BadRequestException } from '@nestjs/common';
import { UserEntity } from './user.entity';

type ObjectId = string;
type Comment = { userId: ObjectId; content: string; createdAt: Date };

export class PostEntity {
    postId?: ObjectId;
    title?: string;
    writer?: UserEntity;
    writerId?: ObjectId;
    comments?: Comment[];

    constructor(
        postId: ObjectId,
        title: string,
        writerId: ObjectId,
        writer: UserEntity,
        comments: Comment[],
    ) {
        if (postId) this.postId = postId;
        if (title) this.title = title;
        if (writer) this.writer = writer;
        if (writerId) this.writerId = writerId;
        if (comments) this.comments = comments;
    }

    static Builder = class {
        _postId: ObjectId;
        _title: string;
        _writerId: ObjectId;
        _writer: UserEntity;
        _comments: Comment[];

        postId(val: ObjectId) {
            this._postId = val;
            return this;
        }

        title(val: string | number) {
            if (typeof val === 'number') val = String(val);
            this._title = val;
            return this;
        }

        writerId(writerId: ObjectId) {
            this._writerId = writerId;
            return this;
        }

        writer(writerId: ObjectId, writer: UserEntity) {
            if (!(writer instanceof UserEntity)) {
                throw new BadRequestException('writer must be user.');
            }
            this._writerId = writerId;
            this._writer = writer;
            return this;
        }

        comments(val: Comment[]) {
            if (!Array.isArray(val)) {
                throw new BadRequestException('comment must be array type.');
            }
            this._comments = val;
            return this;
        }

        build() {
            return new PostEntity(
                this._postId,
                this._title,
                this._writerId,
                this._writer,
                this._comments,
            );
        }
    };
}
