/*
 *  test/put.js
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

const cfg = require("..")("cfg")

const assert = require("assert")
const path = require("path")

describe("put", function() {
    const defaults = {
        a: "b",
        c: [ "d", "e" ],
        f: {
            "g": "h",
        },
    };

    const tmp_json = path.join(__dirname, "data/tmp.json");
    const cfg_json = path.join(__dirname, "data/cfg.json");

    const _copy = _.promise.make((self, done) => {
        _.promise.make({})
            .then(_.promise.add("path", cfg_json))
            .then(fs.read.json)
            .then(_.promise.add("path", tmp_json))
            .then(fs.write.json)
            .then(_.promise.done(done, self))
            .catch(done)
    })

    describe("put", function() {
        describe("good", function() {
            it("empty, no path", function(done) {
                _.promise.make({})
                    .then(cfg.initialize)
                    .then(_.promise.add({
                        "key": "something",
                        "value": "dark side",
                    }))
                    .then(cfg.put)
                    .then(_.promise.make(sd => {
                        assert.deepEqual({
                            "something": "dark side",
                        }, sd.cfg);
                    }))
                    .then(_.promise.done(done))
                    .catch(done)
            })
        })
    })
    describe("put.p", function() {
        describe("good", function() {
            it("empty, no path", function(done) {
                _.promise.make({})
                    .then(cfg.initialize)
                    .then(cfg.put.p("something", "dark side"))
                    .then(_.promise.make(sd => {
                        assert.deepEqual({
                            "something": "dark side",
                        }, sd.cfg);
                    }))
                    .then(_.promise.done(done))
                    .catch(done)
            })
        })
    })
})
