import {Issue} from '../../data/model/issue.model';
import {Complaint} from '../../data/model/complaint.model';
import User from '../../data/model/user.model';

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

        return comment;
    }

    static transformUser(user)
    {
        return User.createFromRawData(user);
    }
}