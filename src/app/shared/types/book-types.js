"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = require("joi");
var titleBookSchema = joi_1.default.string().max(80).min(3).required();
var posterBookSchema = joi_1.default.string().max(250).min(50).required();
var authorBookSchema = joi_1.default.string().max(250).min(10).required();
