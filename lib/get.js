/*
 *  lib/get.js
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
 *  Accepts: self.key, self.otherwise
 *  Produces: self.value (or sometimes self.*)
 */
const get = name => _.promise.make(self => {
    const method = `get(${name})`;
    const named = `${name}d`;

    assert.ok(name)
    assert.ok(_.is.String(self.key), `${method}: self.key must be a String`)
    // assert.ok(!_.is.Undefined(self.otherwise), `${method}: self.otherwise is required`)

    const parts = self.key.split(":")
    assert.ok(parts.length <= 2, `${method}: self.key must have one or two parts`)

    const key_from = parts[0];
    const key_to = parts.length === 2 ? parts[1] : "value";

    _.d.set(self, key_to, _.d.get(self[name], key_from, self.otherwise))
})

/**
 *  Parameterized
 */
const get_p = name => (_key, _otherwise) => _.promise.make((self, done) => {
    const named = `${name}d`;
    
    const parts = _key.split(":")
    const key_to = parts.length === 2 ? parts[1] : "value";

    _.promise.make(self)
        .then(_.promise.add({
            key: _key,
            otherwise: _otherwise,
        }))
        .then(get(name))
        .then(_.promise.done(done, self, key_to))
        .catch(done);
})


/**
 *  API
 */
exports.get = get
exports.get_p = get_p
