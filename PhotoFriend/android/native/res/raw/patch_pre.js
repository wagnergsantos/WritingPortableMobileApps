window = {};
document = {};
console = {};
window.console = console;

console.log = function (txt) {
    gateway.JS_log(txt);
};

printf = window.printf = function (txt) {
    gateway.JS_printf(txt);
};

alert = window.alert = function (txt) {
    gateway.JS_alert(txt);
};

timeouts = {};
timeout_count = 0;

getTimeoutHandle = function ()
{
    if (timeout_count > 2000000000) {
        timeout_count = 0;
    }
    return ++timeout_count;
};

setTimeout = window.setTimeout = function (cb, to, handle) {
    var handle = getTimeoutHandle();
    gateway.JS_setTimeout(to, handle);
    timeouts[handle] = {"cb": cb, "interval": 0};
    return handle;
};

clearTimeout = window.clearTimeout = function (handle) {
    gateway.JS_clearTimeout(handle);
    delete timeouts[handle];
};

timeoutCallback = function (handle) {
    var to = timeouts[handle];
    if (to.interval !== 1) {
        delete timeouts[handle];
    }
    if (to.cb) {
        to.cb();
    }
};

setInterval = window.setInterval = function (cb, to) {
    var handle = getTimeoutHandle();
    gateway.JS_setInterval(to, handle);
    timeouts[handle] = {"cb": cb, "interval": 1};
    return handle;
};

clearInterval = window.clearInterval = function (handle) {
    gateway.JS_clearInterval(handle);
    delete timeouts[handle];
};
