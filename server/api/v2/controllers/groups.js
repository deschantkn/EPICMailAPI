import async from 'async';
import db from '../../../db';
import queries from '../../../db/queries';

const {
  newGroup,
  insertGroupMember,
  getMyGroups,
  getGroupById,
  newGroupName,
  deleteMyGroup,
  findUserByEmail,
  getMyGroup,
} = queries;

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
  getGroups: async (req, res) => {
    const { id: currentUser } = req.user;
    try {
      // Fetch ids of groups where user is a member
      const { rows: groups } = await db.query(getMyGroups, [currentUser, 'admin']);
      const data = [];
      async.forEach(groups, async (group, callback) => {
        // Fetch group
        const { rows: fetchedGroup } = await db.query(getGroupById, [group.groupid, currentUser]);
        data.push(fetchedGroup[0]);
        callback();
      }, () => res.status(200).json({ status: 200, data }));
    } catch (error) {
      return res.status(500).json({ status: 500, error: `Internal server error: ${error}` });
    }
  },
  updateGroupName: async (req, res) => {
    const { id: currentUser } = req.user;
    const { groupName } = req.body;
    const { groupId } = req.params;
    try {
      const { rows: updatedGroup } = await db.query(newGroupName, [groupName, currentUser, parseInt(groupId, 10), 'admin']);
      if (!updatedGroup[0]) {
        return res.status(404).json({ status: 404, error: 'Cannot update, group not found' });
      }

      return res.status(200).json({ status: 200, data: updatedGroup });
    } catch (error) {
      return res.status(500).json({ status: 500, error: `Internal server error: ${error}` });
    }
  },
  deleteGroup: async (req, res) => {
    const { id: currentUser } = req.user;
    const { groupId } = req.params;
    try {
      const { rows: deletedGroup } = await db.query(deleteMyGroup, [groupId, currentUser, 'admin']);
      if (!deletedGroup[0]) {
        return res.status(404).json({ status: 404, error: 'Cannot delete, group not found' });
      }

      return res.status(200).json({ status: 200, data: [{ message: 'Group successfully deleted' }] });
    } catch (error) {
      return res.status(500).json({ status: 500, error: `Internal server error: ${error}` });
    }
  },
  addUserToGroup: async (req, res) => {
    const { id: currentUser } = req.user;
    const { newUserEmail, groupName } = req.body;
    const { groupId } = req.params;
    try {
      // Check if user to be added exists
      const { rows: userExists } = await db.query(findUserByEmail, [newUserEmail]);
      if (!userExists[0]) {
        return res.status(400).json({ status: 400, error: 'Cannot add user. User not found' });
      }
      // Find group where current user is the owner
      const { rows: groupToAddTo } = await db.query(getMyGroup, [groupName, currentUser, 'admin', groupId]);
      if (!groupToAddTo[0]) {
        return res.status(400).json({ status: 400, error: 'Cannot add user. Group not found' });
      }
      // Add user to group as a member
      const { id: tagetGroupId } = groupToAddTo[0];
      const { id: newMemberId } = userExists[0];
      const { rows: insertedMember } = await db.query(insertGroupMember, [tagetGroupId, newMemberId, 'member']);
      const { groupid, memberid, role } = insertedMember[0];
      return res.status(200).json({
        status: 200,
        data: [{ id: groupid, userId: memberid, userRole: role }],
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: `Internal server error: ${error}` });
    }
  },
};
