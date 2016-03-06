(function(root, undefined) {

    "use strict";


    var ANONYMOUS_MODULE_STR = 'anonymous_module_';
    var ModultItem = function(module_id, required_module_ids, module_callback) {
        this.id = module_id ? module_id : _.uniqueId(ANONYMOUS_MODULE_STR);
        this.requiredModuleIds = required_module_ids;
        this.callback = module_callback;
    };

    ModultItem.prototype = {

        instance: undefined,

        isResolved: false,

        isAnonymous: function() {
            return 0 === this.id.indexOf(ANONYMOUS_MODULE_STR);
        },

        resolve: function(require_callback) {
            if (this.isResolved) {
                return;
            }

            if (_.isEmpty(this.requiredModuleIds)) {
                // 使用require方式注入
                var module_obj = {
                    exports: {}
                };

                var instance = this.callback(require_callback, module_obj.exports, module_obj);

                if (_.isUndefined(instance)) {
                    this.instance = module_obj.exports;
                } else {
                    this.instance = instance;
                }

            } else {
                // 显示声明了依赖的模块
                var args = _.map(this.requiredModuleIds, require_callback);
                this.instance = this.callback.apply(this, args);
            }

            delete this.callback;
            delete this.requiredModuleIds;
            this.isResolved = true;
        }
    };


    var namespace = function(namespaceStr, obj) {
        if (!obj || obj.__namespace__) {
            return;
        }
        var arr = namespaceStr.split('.');

        _.reduce(arr, function(pre, name, index) {
            pre[name] = pre[name] || {};
            if (index === arr.length - 1) {
                pre[name] = obj;
            }
            return pre[name];
        }, window);
        obj.__namespace__ = namespaceStr;
    };

    var NOOP = function() {};

    var SyncModule = function() {
        this.__modulePreLoadStore = {};
        this.__moduleStore = {};
        this.__options = {
            'alias': {}
        };
    };

    SyncModule.prototype = {
        define: function() {
            var self = this;
            var args = arguments;
            var module_id;

            var required_module_ids = [];
            var module_callback = NOOP;

            switch (args.length) {

                case 1:
                    module_callback = args[0];
                    break;

                case 2:
                    if (_.isString(args[0])) {
                        module_id = args[0];
                    } else {
                        required_module_ids = args[0];
                    }
                    module_callback = args[1];
                    break;

                default:
                    module_id = args[0];
                    required_module_ids = args[1];
                    module_callback = args[2];
                    break;
            }

            var module_item = this.__defineModule(module_id, required_module_ids, module_callback);

            return {
                use: function(_id) {
                    var id = _id || module_item.id;
                    var obj = self.use(id);

                    return obj;
                }
            };
        },

        /**
         * 执行模块
         */
        use: function(module_id) {

            var self = this;
            var alias_id = this.__options.alias[module_id] || module_id;

            // 先从已经解析过的模块中查找
            if (this.__moduleStore[alias_id]) {
                return this.__moduleStore[alias_id].instance;
            }

            var all_module_store = _.extend({}, this.__moduleStore, this.__modulePreLoadStore);
            var module_item = all_module_store[alias_id];

            if (module_item) {

                // 解析、执行模块
                var require_callback = function(dependency_id) {
                    try {
                        var obj = self.use.apply(self, arguments);
                        return obj;
                    } catch (e) {
                        console.error('module [%s]\'s depency module[%s] does not exist.', module_item.id, dependency_id);
                        throw e;
                    }
                };
                module_item.resolve(require_callback);

                // 如果不为匿名Module，则缓存下来
                if (!module_item.isAnonymous()) {
                    this.__moduleStore[module_item.id] = module_item;
                }

                delete this.__modulePreLoadStore[module_item.id];
                namespace(alias_id, module_item.instance);
                return module_item.instance;
            } else {
                throw 'module [' + alias_id + '] does not exist.';
            }
        },

        /**
         * 构造模块对象，并存到列表中
         */
        __defineModule: function(module_id, required_module_ids, module_callback) {
            var module_item = new ModultItem(module_id, required_module_ids, module_callback);
            this.__modulePreLoadStore[module_item.id] = module_item;
            return module_item;
        },

        /**
         * @method config
         * @param {Object} alias 别名
         */
        config: function(options) {
            var __options = this.__options;
            _.each(options, function(value, name) {
                switch (name) {
                    case 'alias':
                        _.extend(__options[name], options[name]);
                        break;
                    default:
                        __options[name] = options[name];
                        break;
                }
            });
        }
    };


    var root = root || {};
    var syncmod = new SyncModule();

    _.bindAll(syncmod, 'define', 'use', 'config');
    // Export to the root, which is probably `window`.
    root.syncmod = {
        Version: '1.0.0',
        define: syncmod.define,
        use: syncmod.use,
        config: syncmod.config
    };


}(this));
