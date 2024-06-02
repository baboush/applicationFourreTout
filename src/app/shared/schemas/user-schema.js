"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseUserSchema = exports.loginUserSchema = exports.userSchema = exports.passwordSchema = exports.usernameSchema = exports.emailSchema = exports.roleSchema = void 0;
var z = require("zod");
var Role = ["USER", "ADMIN", "CONTRIBUTEUR"];
// Définition du schéma Zod
exports.roleSchema = z.enum(Role).default("USER");
exports.emailSchema = z.string().email().min(5);
exports.usernameSchema = z
    .string()
    .max(80)
    .min(4)
    .regex(/^[a-zA-Z0-9s]*$/);
exports.passwordSchema = z
    .string()
    .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/);
exports.userSchema = z.object({
    username: exports.usernameSchema,
    password: exports.passwordSchema,
    email: exports.emailSchema,
    role: exports.roleSchema,
});
exports.loginUserSchema = z.object({
    id: z.number(),
    username: exports.usernameSchema,
    password: exports.passwordSchema,
});
exports.promiseUserSchema = exports.loginUserSchema.promise();
