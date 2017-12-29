/*
 *  test/_util.js
 *
 *  David Janes
 *  IOTDB.org
 *  2017-12-29
 *
 *  Copyright [2013-2018] [David P. Janes]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict";

const _ = require("iotdb-helpers")
const fs = require("iotdb-fs")

const assert = require("assert")
const path = require("path")

const defaults = {
    a: "b",
    c: [ "d", "e" ],
    f: {
        "g": "h",
    },
};

const tmp_json = path.join(__dirname, "data/tmp.json");
const cfg_json = path.join(__dirname, "data/cfg.json");

const copy = _.promise.make((self, done) => {
    _.promise.make({})
        .then(_.promise.add("path", cfg_json))
        .then(fs.read.json)
        .then(_.promise.add("path", tmp_json))
        .then(fs.write.json)
        .then(_.promise.done(done, self))
        .catch(done)
})

const auto_fail = done => _.promise.make(self => done(new Error("didn't expect to get here")));
const ok_error = done => error => done(null);

/**
 *  API
 */
exports.defaults = defaults;
exports.tmp_json = tmp_json;
exports.cfg_json = cfg_json;
exports.copy = copy;
exports.auto_fail = auto_fail;
exports.ok_error = ok_error;
