/*
 *  test/initialize.js
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

const _util = require("./_util")

describe("initialize", function() {
    describe("works", function() {
        it("empty", function(done) {
            _.promise.make({})
                .then(cfg.initialize)
                .then(_.promise.make(sd => {
                    assert.deepEqual({}, sd.cfg);
                }))
                .then(_.promise.done(done))
                .catch(done)
        })
        it("no defaults", function(done) {
            _.promise.make({
                configurationd: {
                },
            })
                .then(cfg.initialize)
                .then(_.promise.make(sd => {
                    assert.deepEqual({}, sd.cfg);
                }))
                .then(_.promise.done(done))
                .catch(done)
        })
        it("defaults", function(done) {
            _.promise.make({
                configurationd: {
                    defaults: _util.defaults,
                },
            })
                .then(cfg.initialize)
                .then(_.promise.make(sd => {
                    assert.deepEqual(_util.defaults, sd.cfg)
                }))
                .then(_.promise.done(done))
                .catch(done)
        })
    })
})
