"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("./user.model"));
const save = async (user, session) => {
    if (session) {
        return await user.save({ session });
    }
    else {
        return await user.save();
    }
};
const findByEmail = async (email) => {
    return await user_model_1.default.findOne({ email: email });
};
const findById = async (id) => {
    return await user_model_1.default.findById(id).populate("organization");
};
const findByOrganization = async (organization) => {
    return await user_model_1.default.findOne({ organization: organization });
};
const findAllAppliedJobs = async (id) => {
    return await user_model_1.default.findById(id)
        .populate({
        path: "appliedJobs",
        populate: {
            path: "organization",
            select: "-createdAt -updatedAt -status",
        },
    })
        .populate({
        path: "appliedJobs",
        populate: {
            path: "type",
            select: "-createdAt -updatedAt -status",
        },
    });
};
//find all saved jobs
const findAllSavedJobs = async (id) => {
    return await user_model_1.default.findById(id)
        .populate({
        path: "savedJobs",
        populate: {
            path: "organization",
            select: "-createdAt -updatedAt -status",
        },
    })
        .populate({
        path: "savedJobs",
        populate: {
            path: "type",
            select: "-createdAt -updatedAt -status",
        },
    });
};
exports.default = {
    save,
    findByEmail,
    findById,
    findByOrganization,
    findAllAppliedJobs,
    findAllSavedJobs,
};
