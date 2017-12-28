# iotdb-configuration
POP configuration

# use

Note the special way this needs to be required.
This allows for multiple `configurations` to be
working within the same system

    const configuration = require("iotdb-configuration")("cfg")

Then it's the usual:

    _.promise.make({
        configurationd: {
            path: ".consensas/configuration.json",
        },
    })
        .then(configuration.initialize)
        .then(configuration.set("a", 1))
        .then(configuration.get("b"))
