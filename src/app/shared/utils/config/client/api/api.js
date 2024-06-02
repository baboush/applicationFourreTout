"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIS = void 0;
__exportStar(require("./authentification.service"), exports);
var authentification_service_1 = require("./authentification.service");
__exportStar(require("./categories.service"), exports);
var categories_service_1 = require("./categories.service");
__exportStar(require("./movie.service"), exports);
var movie_service_1 = require("./movie.service");
exports.APIS = [authentification_service_1.AuthentificationService, categories_service_1.CategoriesService, movie_service_1.MovieService];
