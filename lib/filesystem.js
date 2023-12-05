'use strict';

const pa = require('path');
const fs = require('fs');

const BASE_DIRECTORY = '/path/to/allowed/directory'; // Set your allowed base directory

class DefaultFileSystem {

    // ... other methods ...

    resolve(path) {
        const resolvedPath = pa.resolve(BASE_DIRECTORY, path);
        if (!resolvedPath.startsWith(BASE_DIRECTORY)) {
            throw new Error('Access denied: path resolution outside of the base directory is not allowed');
        }
        return resolvedPath;
    }

    // ... other methods ...

}

class VMFileSystem {

    constructor({fs: fsModule = fs, path: pathModule = pa, baseDirectory = BASE_DIRECTORY} = {}) {
        this.fs = fsModule;
        this.path = pathModule;
        this.baseDirectory = baseDirectory;
    }

    // ... other methods ...

    resolve(path) {
        const resolvedPath = this.path.resolve(this.baseDirectory, path);
        if (!resolvedPath.startsWith(this.baseDirectory)) {
            throw new Error('Access denied: path resolution outside of the base directory is not allowed');
        }
        return resolvedPath;
    }

    // ... other methods ...

}

exports.DefaultFileSystem = DefaultFileSystem;
exports.VMFileSystem = VMFileSystem;