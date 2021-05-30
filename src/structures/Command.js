var BaseCommand = /** @class */ (function () {
    function BaseCommand(client, message, args, flags) {
        this.name = this.constructor.name
            .replace(/^\w/g, function (v) { return v.toLowerCase(); })
            .replace(/Command$/g, "");
        this.client = client;
        this.message = message;
        this.args = args;
        this.flags = flags;
    }
    BaseCommand.prototype.help = function () {
        // @ts-ignore
        return this.name + " - " + this.constructor.description + "\n\n" + Object.entries(this.constructor.flags).map(function (_a) {
            var _b = _a[1], t = _b[0], d = _b[1];
            return d + " [" + t.name + "])";
        });
    };
    Object.defineProperty(BaseCommand, "commandName", {
        get: function () {
            return this.name
                .replace(/^\w/g, function (v) { return v.toLowerCase(); })
                .replace(/Command$/g, "");
        },
        enumerable: false,
        configurable: true
    });
    BaseCommand.prototype.execute = function () {
        return this.name + ": not implemented";
    };
    BaseCommand.prototype.errorMsg = function (S) {
        return this.name + ": " + S;
    };
    BaseCommand.prototype.box = function (s) {
        return "```xl\n" + s + "```";
    };
    return BaseCommand;
}());
export { BaseCommand };
export default BaseCommand;
