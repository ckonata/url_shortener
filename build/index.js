"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("./config/knex");
(0, knex_1.onDatabaseConnection)().then(() => { console.log('Database connection established'); });
