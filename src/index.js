(function() {
    let vue = null,
        tesseract = null;

    let vueTesseract = {
        beforeDestroy() {

        },
        created() {
            if (!vue) {
                console.warn('tesseract-vue not installed!');
                return;
            }

            function fetchSession(db = databases[defaultDB]) {

            }

            let $tesseract = {
                version: '__VERSION__',
                create() {
                    return tesseract.create({
                        workerPath: '/path/to/worker.js',
                        langPath: 'https://cdn.rawgit.com/naptha/tessdata/gh-pages/3.02/',
                        corePath: 'https://cdn.rawgit.com/naptha/tesseract.js-core/0.1.0/index.js',
                    });
                },

                recognize(image) {
                    return Tesseract.recognize(image);
                },
            };

            defineReactive(vm, '$tesseract', $tesseract);

            vm.$test = 'cat'; // Add non-reactive property
        },
    };

    function myFunction() {

    }

    let api = {
        mixin: vueTesseract,
        install: (Vue, options) => {
            vue = Vue;
            tesseract = (options && options.tesseract) || Tesseract;
            myFunction();

            /* if (options.debug) {
                pouch.debug.enable(options.debug);
            } */

            Vue.options = Vue.util.mergeOptions(Vue.options, vueTesseract);
        },
    };

    module.exports = api;
})();
