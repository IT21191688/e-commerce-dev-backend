"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants = {
    API: {
        PREFIX: "/api/v1",
    },
    USER: {
        ROLES: {
            ADMIN: "admin",
            USER: "user",
        },
    },
    WELLKNOWNSTATUS: {
        ACTIVE: 1,
        DISABLED: 0,
        PENDING: 2,
        APPROVE: 3,
        REJECT: 4,
        DELETED: 5,
    },
    CLOUDINARY: {
        FILE_NAME: "E-commerce",
    },
    CATEGORYTYPES: {
        NEWS: "news",
        JOB: "job",
        CERTIFICATE: "certificate",
        SERVICETYPE: "serviceType",
    },
};
exports.default = constants;
