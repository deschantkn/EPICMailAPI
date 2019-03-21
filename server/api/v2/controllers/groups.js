import db from '../../../db';
import queries from '../../../db/queries';

const { newGroup, insertGroupMember } = queries;

export default {
  newGroup: async (req, res) => {
    const { id: currentUser } = req.user;
    const { groupName } = req.body;
    try {
      // create group
      const { rows: savedGroup } = await db.query(newGroup, [groupName]);
      const { id: savedGroupId, name: savedGroupName } = savedGroup[0];
      // add current user to the group with admin role
      const { rows: addedMember } = await db.query(insertGroupMember, [savedGroupId, currentUser, 'admin']);
      const { role } = addedMember[0];
      return res.status(201).json({
        status: 201,
        data: [{ id: savedGroupId, name: savedGroupName, role }],
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: `Internal server error: ${error}` });
    }
  },
};
