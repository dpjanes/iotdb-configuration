/*
 *  lib/set.js
 *
 *  David Janes
 *  IOTDB.org
 *  2017-12-28
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
 *  Accepts: self.configurationd
 *  Produces: self[name], self[name + "d"]
 */
const set = name => _.promise.make(self => {
    const method = `set(${name})`;
    const named = `${name}d`;

    assert.ok(name)
    assert.ok(_.is.String(self.key), `${method}: self.key must be a String`)
    assert.ok(!_.is.Undefined(self.value), `${method}: self.value is required`)

    _.d.set(self[name], self.key, self.value)

    if (!self[named]._dirty) {
        self[named]._dirty = true

        process.nextTick(() => {
            _.promise.make(self)
                // .then(save)
                .catch(error => {
                    console.log("#", error);
                })
        })
    }
})

/**
 *  API
 */
exports.set = set
