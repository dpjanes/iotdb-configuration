/*
 *  lib/save.js
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
 *  Requires: self.configuration, self.configurationd.path
 */
const save = name => _.promise.make((self, done) => {
    const method = `save(${name})`;
    const named = `${name}d`;

    assert.ok(self[named].path, `${method}: self.${named}.path is required`)

    _.promise.make(self)
        .then(_.promise.add({
            path: self[named].path,
            json: self[name],
        }))
        .then(fs.make.directory.parent)
        .then(fs.write.json)
        .then(_.promise.done(done, self))
        .catch(done);
})

/**
 *  API
 */
exports.save = save
