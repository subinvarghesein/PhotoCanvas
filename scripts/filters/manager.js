define(["filters/filters"], function(filters) {
    var FilterManager = function(filters) {
        function initialize() {}
        function generate() {}
        function addEvents() {}

        return {
            initialize: initialize,
            generate: generate
        }
    };

    var manager = FilterManager(filters);
    return manager;
});