# iotdb-configuration
POP configuration files

# use

Note the special way this needs to be required.
This allows for multiple `configurations` to be
working within the same system

    const _ = require("iotdb-helpers")
    const cfg = require("iotdb-configuration")("cfg")

Then it's the usual:

    _.promise.make({
        configurationd: {
            path: ".subfolder/cfg.json",
        },
    })
        .then(cfg.initialize)
        .then(cfg.load)
        .then(cfg.set.p("a", 1))
        .then(cfg.get.p("a:variable"))
        .then(_.promise.make(sd => {
            assert.ok(sd.variable, 1)
        })
        .then(cfg.save)

# todo

* autosave?
* yaml?
