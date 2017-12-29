/*
 *  index.js
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

const assert = require("assert")

const configuration = name => {
    const method = "configuration";

    assert.ok(_.is.String(name))

    const put = require("./put");
    const get = require("./get");
    const load = require("./load");

    const d = {
        initialize: require("./initialize").initialize(name),
        put: put.put(name),
        get: get.get(name),
        load: load.load(name),
    }

    d.put.p = put.put_p(name)
    d.get.p = get.get_p(name)
    d.load.clear = load.load_clear(name)

    return d;
}

/**
 *  API
 */
exports.configuration = configuration
