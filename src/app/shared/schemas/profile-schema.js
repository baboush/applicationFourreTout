"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.surnameSchema = exports.nameSchema = void 0;
var z = require("zod");
exports.nameSchema = z
    .string()
    .max(40)
    .min(3)
    .regex(/^[A-Z][a-zA-Z]*$/)
    .nullable();
exports.surnameSchema = z
    .string()
    .max(50)
    .min(3)
    .regex(/^[A-Z][a-zA-Z]*$/)
    .nullable();
