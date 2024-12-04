const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { workspaceService } = require('../services');
const { Workspace, Boards } = require('../models');
const WorkSpace = require('../models/workSpace.modal');

const createWorkSpace = async (req, res) => {
  try {
    const userId = req.userId;

    const workspaceData = {
      ...req.body,
      userId,
    };

    const workspace = await workspaceService.createWorkSpace(workspaceData);
    res.status(201).json(workspace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getWorkSpaces = async (req, res) => {
  try {
    const userId = req.userId;

    const { sortBy, limit, page } = req.query;
    const options = { sortBy, limit, page };

    const workspaces = await workspaceService.queryWorkspace(
      { userId },
      options
    );

    res.status(200).json(workspaces);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getWorkSpaceById = async (req, res) => {
  const { workSpaceId } = req.params;
  const workSpace = await workspaceService.getWorkSpaceById(workSpaceId);
  if (!workSpace) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: 'WorkSpace not found',
    });
  }
  res.status(httpStatus.OK).send(workSpace);
};

const updateWorkspace = catchAsync(async (req, res) => {
  const { workSpaceId } = req.params;
  const userId = req.userId;
  const workspace = await workspaceService.updateWorkspaceById(
    workSpaceId,
    req.body,
    userId
  );
  if (!workspace) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: 'Workspace not found',
    });
  }
  res.status(httpStatus.OK).send({ workspace });
});

const deleteWorkspace = catchAsync(async (req, res) => {
  const { workSpaceId } = req.params;
  const userId = req.userId;
  const workspace = await workspaceService.getWorkSpaceById(workSpaceId);
  if (!workspace) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: 'Workspace not found',
    });
  }
  if (workspace.userId.toString() !== userId) {
    return res.status(httpStatus.FORBIDDEN).send({
      message: 'You do not have permission to delete this board',
    });
  }
  await workspaceService.deleteWorkspaceById(workSpaceId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createWorkSpace,
  getWorkSpaces,
  getWorkSpaceById,
  deleteWorkspace,
  updateWorkspace,
};
