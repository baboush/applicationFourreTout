"use strict";
/**
 * Application Fourre Tout
 * Api Rest pour ajouter, supprimer, des rendez-vous, des films, des livres, des taches
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthentificationService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var encoder_1 = require("../encoder");
var configuration_1 = require("../configuration");
var AuthentificationService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthentificationService = _classThis = /** @class */ (function () {
        function AuthentificationService_1(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://localhost';
            this.defaultHeaders = new http_1.HttpHeaders();
            this.configuration = new configuration_1.Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                var firstBasePath = Array.isArray(basePath) ? basePath[0] : undefined;
                if (firstBasePath != undefined) {
                    basePath = firstBasePath;
                }
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new encoder_1.CustomHttpParameterCodec();
        }
        // @ts-ignore
        AuthentificationService_1.prototype.addToHttpParams = function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        AuthentificationService_1.prototype.addToHttpParamsRecursive = function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    value.forEach(function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); });
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, value.toISOString().substring(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach(function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? "".concat(key, ".").concat(k) : k); });
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        AuthentificationService_1.prototype.authControllerApplicationLogOut = function (observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var localVarHeaders = this.defaultHeaders;
            var localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (localVarHttpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [];
                localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (localVarHttpHeaderAcceptSelected !== undefined) {
                localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
            }
            var localVarHttpContext = options && options.context;
            if (localVarHttpContext === undefined) {
                localVarHttpContext = new http_1.HttpContext();
            }
            var localVarTransferCache = options && options.transferCache;
            if (localVarTransferCache === undefined) {
                localVarTransferCache = true;
            }
            var responseType_ = 'json';
            if (localVarHttpHeaderAcceptSelected) {
                if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                    responseType_ = 'text';
                }
                else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                    responseType_ = 'json';
                }
                else {
                    responseType_ = 'blob';
                }
            }
            var localVarPath = "/auth/logOut";
            return this.httpClient.request('get', "".concat(this.configuration.basePath).concat(localVarPath), {
                context: localVarHttpContext,
                responseType: responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                transferCache: localVarTransferCache,
                reportProgress: reportProgress
            });
        };
        AuthentificationService_1.prototype.authControllerApplicationSignIn = function (loginDtoApplication, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (loginDtoApplication === null || loginDtoApplication === undefined) {
                throw new Error('Required parameter loginDtoApplication was null or undefined when calling authControllerApplicationSignIn.');
            }
            var localVarHeaders = this.defaultHeaders;
            var localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (localVarHttpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [];
                localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (localVarHttpHeaderAcceptSelected !== undefined) {
                localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
            }
            var localVarHttpContext = options && options.context;
            if (localVarHttpContext === undefined) {
                localVarHttpContext = new http_1.HttpContext();
            }
            var localVarTransferCache = options && options.transferCache;
            if (localVarTransferCache === undefined) {
                localVarTransferCache = true;
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
            }
            var responseType_ = 'json';
            if (localVarHttpHeaderAcceptSelected) {
                if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                    responseType_ = 'text';
                }
                else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                    responseType_ = 'json';
                }
                else {
                    responseType_ = 'blob';
                }
            }
            var localVarPath = "/auth/login";
            return this.httpClient.request('post', "".concat(this.configuration.basePath).concat(localVarPath), {
                context: localVarHttpContext,
                body: loginDtoApplication,
                responseType: responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                transferCache: localVarTransferCache,
                reportProgress: reportProgress
            });
        };
        AuthentificationService_1.prototype.authControllerApplicationSignUp = function (createUserDtoApplication, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (createUserDtoApplication === null || createUserDtoApplication === undefined) {
                throw new Error('Required parameter createUserDtoApplication was null or undefined when calling authControllerApplicationSignUp.');
            }
            var localVarHeaders = this.defaultHeaders;
            var localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (localVarHttpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [];
                localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (localVarHttpHeaderAcceptSelected !== undefined) {
                localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
            }
            var localVarHttpContext = options && options.context;
            if (localVarHttpContext === undefined) {
                localVarHttpContext = new http_1.HttpContext();
            }
            var localVarTransferCache = options && options.transferCache;
            if (localVarTransferCache === undefined) {
                localVarTransferCache = true;
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
            }
            var responseType_ = 'json';
            if (localVarHttpHeaderAcceptSelected) {
                if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                    responseType_ = 'text';
                }
                else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                    responseType_ = 'json';
                }
                else {
                    responseType_ = 'blob';
                }
            }
            var localVarPath = "/auth/signUp";
            return this.httpClient.request('post', "".concat(this.configuration.basePath).concat(localVarPath), {
                context: localVarHttpContext,
                body: createUserDtoApplication,
                responseType: responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                transferCache: localVarTransferCache,
                reportProgress: reportProgress
            });
        };
        return AuthentificationService_1;
    }());
    __setFunctionName(_classThis, "AuthentificationService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthentificationService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthentificationService = _classThis;
}();
exports.AuthentificationService = AuthentificationService;
