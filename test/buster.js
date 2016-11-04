var config = module.exports;

config["Test Doctor Module"] = {
    environment: "node",  // or "node"
    rootPath: "../",
    sources: [
        "lib/Doctor.js",
				"lib/Directory.js"
    ],
    tests: [
        "test/TestDoctor.js"
    ]
};
