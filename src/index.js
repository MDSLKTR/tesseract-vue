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

                recognize(image) {
                    return tesseract.recognize(image, options = {});
                },

                detect(image) {
                    return tesseract.detect(image);
                },

                optimize(image) {
                    if (optimizer && typeof optimizer === 'function') {
                        return tesseract.bind(optimizer(image));
                    }

                    return tesseract;
                },
            };

            defineReactive(vm, '$tesseract', $tesseract);
        },
    };

    function myFunction() {

    }

    let api = {
        mixin: vueTesseract,
        install: (Vue, options) => {
            vue = Vue;
            tesseract = (options && options.tesseract) || Tesseract;
            optimizer = options && options.optimizer;
            myFunction();
            Vue.options = Vue.util.mergeOptions(Vue.options, vueTesseract);
        },
    };

    module.exports = api;
})();
