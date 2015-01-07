pez.lib.define('params', function () {
    var q = {};
    var queryString = location.search.substring(1);
    var re = /([^&=]+)=([^&]*)/g, m;
    while (m = re.exec(queryString)) {
        q[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    return q;
});