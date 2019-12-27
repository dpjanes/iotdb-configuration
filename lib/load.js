/*
 *  lib/load.js
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

/**
 *  Accepts: self.configurationd.path
 *  Produces: self[name], self[name + "d"]
 *
 *  Loads 'configuratiod.path' and merges
 */
const load = name => _.promise((self, done) => {
    const method = `load(${name})`;
    const named = `${name}d`;

    if (!self[named].path) {
        return done(null, self)
    }

    _.promise(self)
        .add("path", self[named].path)
        .then(fs.make.directory.parent)
        .add("fs$otherwise_json", {})
        .then(fs.read.json)
        .make(sd => {
            sd[name] = _.d.compose.deep(sd.json, sd[name]);
        })
        .end(done, self, name, named)
})

/**
 *  This is like load, except it removes all existing data
 */
const load_clear = name => _.promise((self, done) => {
    _.promise(self)
        .add(name, {})
        .then(load(name))
        .end(done, self, name)
})


/**
 *  API
 */
exports.load = load
exports.load_clear = load_clear
