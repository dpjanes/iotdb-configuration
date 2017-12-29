/*
 *  test/delete.js
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

const cfg = require("..")("cfg")

const assert = require("assert")
const path = require("path")

const _util = require("./_util")

describe("delete", function() {
    describe("delete", function() {
        describe("good", function() {
            it("key exists", function(done) {
                _.promise.make({
                    configurationd: {
                        defaults: _util.defaults,
                    },
                }) 
                    .then(cfg.initialize)
                    .then(_.promise.add("key", "a"))
                    .then(cfg.delete)
                    .then(_.promise.make(sd => {
                        assert.deepEqual({ c: [ 'd', 'e' ], f: { g: 'h' } }, sd.cfg);
                    }))
                    .then(_.promise.done(done))
                    .catch(done)
            })
            it("key does not exists", function(done) {
                _.promise.make({
                    configurationd: {
                        defaults: _util.defaults,
                    },
                }) 
                    .then(cfg.initialize)
                    .then(_.promise.add("key", "AAA"))
                    .then(cfg.delete)
                    .then(_.promise.make(sd => {
                        assert.deepEqual(_util.defaults, sd.cfg);
                    }))
                    .then(_.promise.done(done))
                    .catch(done)
            })
            it("key is path", function(done) {
                _.promise.make({
                    configurationd: {
                        defaults: _util.defaults,
                    },
                }) 
                    .then(cfg.initialize)
                    .then(_.promise.add("key", "/f/g"))
                    .then(cfg.delete)
                    .then(_.promise.make(sd => {
                        assert.deepEqual({ a: 'b', c: [ 'd', 'e' ], f: {} }, sd.cfg);
                    }))
                    .then(_.promise.done(done))
                    .catch(done)
            })
        })
    })
    describe("delete.p", function() {
        describe("good", function() {
            it("key exists", function(done) {
                _.promise.make({
                    configurationd: {
                        defaults: _util.defaults,
                    },
                }) 
                    .then(cfg.initialize)
                    .then(cfg.delete.p("a"))
                    .then(_.promise.make(sd => {
                        assert.deepEqual({ c: [ 'd', 'e' ], f: { g: 'h' } }, sd.cfg);
                    }))
                    .then(_.promise.done(done))
                    .catch(done)
            })
            it("key does not exists", function(done) {
                _.promise.make({
                    configurationd: {
                        defaults: _util.defaults,
                    },
                }) 
                    .then(cfg.initialize)
                    .then(cfg.delete.p("AAA"))
                    .then(_.promise.make(sd => {
                        assert.deepEqual(_util.defaults, sd.cfg);
                    }))
                    .then(_.promise.done(done))
                    .catch(done)
            })
            it("key is path", function(done) {
                _.promise.make({
                    configurationd: {
                        defaults: _util.defaults,
                    },
                }) 
                    .then(cfg.initialize)
                    .then(cfg.delete.p("/f/g"))
                    .then(_.promise.make(sd => {
                        assert.deepEqual({ a: 'b', c: [ 'd', 'e' ], f: {} }, sd.cfg);
                    }))
                    .then(_.promise.done(done))
                    .catch(done)
            })
        })
    })
})
