import {Issue} from '../../data/model/issue.model';
import {Complaint} from '../../data/model/complaint.model';
import User from '../../data/model/user.model';
import {CompanyRepresentativeUser} from '../../data/model/company-representative-user.model';

export class EntityTransformer
{
    static transformIssue(issue)
    {
        issue.complaintConfirmations = issue.complaintConfirmations.map((confirmation) => {
            if (!confirmation)
            {
                return null;
            }
            confirmation.complaint =  EntityTransformer.transformComplaint(confirmation.complaint);

            return confirmation;
        });

        const result = Object.assign(new Issue(), {
            ...issue,
            location: {
                latitude: issue.address.latitude,
                longitude: issue.address.longitude
            }
        });

        return result;
    }

    static transformComplaint(complaint)
    {
        const result = Object.assign(new Complaint(), {
            ...complaint,
            location: {
                latitude: complaint.address.latitude,
                longitude: complaint.address.longitude
            }
        });

        return result;
    }

    static transformIssueComment(comment)
    {
        comment.author = EntityTransformer.transformUser(comment.author);

        if (!!comment.issue)
        {
            comment.issue = EntityTransformer.transformIssue(comment.issue);
        }

        return comment;
    }

    static transformUser(user)
    {
        if (typeof user['company'] !== 'undefined')
        {
            return CompanyRepresentativeUser.createFromRawData(user);
        }
        else
        {
            return User.createFromRawData(user);
        }

    }
}