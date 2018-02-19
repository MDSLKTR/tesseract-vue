(function() {
    let vue = null,
        tesseract = null,
        optimizer = null;

    let vueTesseract = {
        created() {
            if (!vue) {
                console.warn('tesseract-vue not installed!');
                return;
            }

            let defineReactive = vue.util.defineReactive,
                vm = this;

            let $tesseract = {
                version: '__VERSION__',
                create(paths = {}) {
                    return tesseract.create(paths);
                },

                recognize(image, options = {}) {
                    return tesseract.recognize(image, options);
                },

                detect(image) {
                    return tesseract.detect(image);
                },

                preOptimize(image, preOptimizer) {
                    if (preOptimizer && typeof preOptimizer === 'function') {
                        return preOptimizer(image);
                    }

                    return false;
                },
            };

            defineReactive(vm, '$tesseract', $tesseract);
        },
    };

    let api = {
        mixin: vueTesseract,
        install: (Vue, options) => {
            vue = Vue;
            tesseract = (options && options.tesseract) || Tesseract;
            Vue.options = Vue.util.mergeOptions(Vue.options, vueTesseract);
        },
    };

    module.exports = api;
})();
