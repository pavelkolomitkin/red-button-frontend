import User from './user.model';
import {Issue} from './issue.model';

export class IssueComment
{
    id?: number;
    message?: string;
    author: User;
    issue ?: Issue;

    createdAt?: number;
    updatedAt?: number;
}