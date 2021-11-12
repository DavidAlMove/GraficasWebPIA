const fbxLoader = (path) => {
    return new Promise((resolve) => {
        (new THREE.FBXLoader()).load(path, resolve);
    });
};

const textureLoader = (path) => {
    return new Promise((resolve) => {
        (new THREE.TextureLoader()).load(path, resolve);
    });
}

export default class Resources {
    static loaders = {
        fbx: fbxLoader,
        png: textureLoader
    };

    static resourcePaths = {
        model: {},
        texture: {}
    };

    static resources = {
        model: {},
        texture: {},
        animation: {}
    };

    static setModelPath(key, path) {
        Resources.resourcePaths.model[key.toLowerCase()] = path;
    }

    static getModelPath(key, defVal = "") {
        return Resources.resourcePaths.model[key.toLowerCase()] ?? defVal;
    }

    static setTexturePath(key, path) {
        Resources.resourcePaths.texture[key.toLowerCase()] = path;
    }

    static getTexturePath(key, defVal = "") {
        return Resources.resourcePaths.texture[key.toLowerCase()] ?? defVal;
    }

    static getModelResource(key, defVal = null) {
        return Resources.resources.model[key.toLowerCase()] ?? defVal;
    }

    static setModelResource(key, value) {
        Resources.resources.model[key.toLowerCase()] = value;
    }

    static getTextureResource(key, defVal = null) {
        return Resources.resources.texture[key.toLowerCase()] ?? defVal;
    }

    static setTextureResource(key, value) {
        Resources.resources.texture[key.toLowerCase()] = value;
    }

    static getAnimationResource(key, defVal = null) {
        return Resources.resources.animation[key.toLowerCase()] ?? defVal;
    }

    static setAnimationResouce(key, value) {
        Resources.resources.animation[key.toLowerCase()] = value;
    }

    static loadResources(resources) {
        const promises = resources.map((resource) => {
            const name = resource.name.toLowerCase();
            const type = resource.type.toLowerCase();
            const path = resource.path;
            const extension = path.split('.').pop().toLowerCase();
            const loader = Resources.loaders[extension];

            return loader(path).then((loaded) => {
                Resources.resources[type][name] = loaded;
            });
        });

        return Promise.all(promises);
    }
}