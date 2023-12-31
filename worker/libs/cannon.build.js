!function(t) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = t();
    else if ("function" == typeof define && define.amd)
        define([], t);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).CANNON = t()
    }
}(function() {
    var t = function(t) {
        var e;
        return function(i) {
            return e || t(e = {
                exports: {},
                parent: i
            }, e.exports),
            e.exports
        }
    }
      , e = t(function(t, o) {
        t.exports = n;
        var n = e({});
        function n(t) {
            t = t || {},
            this.id = n.idCounter++,
            this.type = t.type || 0,
            this.boundingSphereRadius = 0,
            this.collisionResponse = !t.collisionResponse || t.collisionResponse,
            this.collisionFilterGroup = void 0 !== t.collisionFilterGroup ? t.collisionFilterGroup : 1,
            this.collisionFilterMask = void 0 !== t.collisionFilterMask ? t.collisionFilterMask : -1,
            this.material = t.material ? t.material : null,
            this.body = null
        }
        i({}),
        n.prototype.constructor = n,
        n.prototype.updateBoundingSphereRadius = function() {
            throw "computeBoundingSphereRadius() not implemented for shape type " + this.type
        }
        ,
        n.prototype.volume = function() {
            throw "volume() not implemented for shape type " + this.type
        }
        ,
        n.prototype.calculateLocalInertia = function(t, e) {
            throw "calculateLocalInertia() not implemented for shape type " + this.type
        }
        ,
        n.idCounter = 0,
        n.types = {
            SPHERE: 1,
            PLANE: 2,
            BOX: 4,
            COMPOUND: 8,
            CONVEXPOLYHEDRON: 16,
            HEIGHTFIELD: 32,
            PARTICLE: 64,
            CYLINDER: 128,
            TRIMESH: 256
        }
    })
      , i = t(function(t, e) {
        t.exports = n;
        var i = o({});
        function n(t, e, i) {
            this.x = t || 0,
            this.y = e || 0,
            this.z = i || 0
        }
        n.ZERO = new n(0,0,0),
        n.UNIT_X = new n(1,0,0),
        n.UNIT_Y = new n(0,1,0),
        n.UNIT_Z = new n(0,0,1),
        n.prototype.cross = function(t, e) {
            var i = t.x
              , o = t.y
              , r = t.z
              , s = this.x
              , a = this.y
              , h = this.z;
            return (e = e || new n).x = a * r - h * o,
            e.y = h * i - s * r,
            e.z = s * o - a * i,
            e
        }
        ,
        n.prototype.set = function(t, e, i) {
            return this.x = t,
            this.y = e,
            this.z = i,
            this
        }
        ,
        n.prototype.setZero = function() {
            this.x = this.y = this.z = 0
        }
        ,
        n.prototype.vadd = function(t, e) {
            if (!e)
                return new n(this.x + t.x,this.y + t.y,this.z + t.z);
            e.x = t.x + this.x,
            e.y = t.y + this.y,
            e.z = t.z + this.z
        }
        ,
        n.prototype.vsub = function(t, e) {
            if (!e)
                return new n(this.x - t.x,this.y - t.y,this.z - t.z);
            e.x = this.x - t.x,
            e.y = this.y - t.y,
            e.z = this.z - t.z
        }
        ,
        n.prototype.crossmat = function() {
            return new i([0, -this.z, this.y, this.z, 0, -this.x, -this.y, this.x, 0])
        }
        ,
        n.prototype.normalize = function() {
            var t = this.x
              , e = this.y
              , i = this.z
              , o = Math.sqrt(t * t + e * e + i * i);
            if (o > 0) {
                var n = 1 / o;
                this.x *= n,
                this.y *= n,
                this.z *= n
            } else
                this.x = 0,
                this.y = 0,
                this.z = 0;
            return o
        }
        ,
        n.prototype.unit = function(t) {
            t = t || new n;
            var e = this.x
              , i = this.y
              , o = this.z
              , r = Math.sqrt(e * e + i * i + o * o);
            return r > 0 ? (r = 1 / r,
            t.x = e * r,
            t.y = i * r,
            t.z = o * r) : (t.x = 1,
            t.y = 0,
            t.z = 0),
            t
        }
        ,
        n.prototype.norm = function() {
            var t = this.x
              , e = this.y
              , i = this.z;
            return Math.sqrt(t * t + e * e + i * i)
        }
        ,
        n.prototype.length = n.prototype.norm,
        n.prototype.norm2 = function() {
            return this.dot(this)
        }
        ,
        n.prototype.lengthSquared = n.prototype.norm2,
        n.prototype.distanceTo = function(t) {
            var e = this.x
              , i = this.y
              , o = this.z
              , n = t.x
              , r = t.y
              , s = t.z;
            return Math.sqrt((n - e) * (n - e) + (r - i) * (r - i) + (s - o) * (s - o))
        }
        ,
        n.prototype.distanceSquared = function(t) {
            var e = this.x
              , i = this.y
              , o = this.z
              , n = t.x
              , r = t.y
              , s = t.z;
            return (n - e) * (n - e) + (r - i) * (r - i) + (s - o) * (s - o)
        }
        ,
        n.prototype.mult = function(t, e) {
            e = e || new n;
            var i = this.x
              , o = this.y
              , r = this.z;
            return e.x = t * i,
            e.y = t * o,
            e.z = t * r,
            e
        }
        ,
        n.prototype.vmul = function(t, e) {
            return (e = e || new n).x = t.x * this.x,
            e.y = t.y * this.y,
            e.z = t.z * this.z,
            e
        }
        ,
        n.prototype.scale = n.prototype.mult,
        n.prototype.addScaledVector = function(t, e, i) {
            return (i = i || new n).x = this.x + t * e.x,
            i.y = this.y + t * e.y,
            i.z = this.z + t * e.z,
            i
        }
        ,
        n.prototype.dot = function(t) {
            return this.x * t.x + this.y * t.y + this.z * t.z
        }
        ,
        n.prototype.isZero = function() {
            return 0 === this.x && 0 === this.y && 0 === this.z
        }
        ,
        n.prototype.negate = function(t) {
            return (t = t || new n).x = -this.x,
            t.y = -this.y,
            t.z = -this.z,
            t
        }
        ;
        var r = new n
          , s = new n;
        n.prototype.tangents = function(t, e) {
            var i = this.norm();
            if (i > 0) {
                var o = r
                  , n = 1 / i;
                o.set(this.x * n, this.y * n, this.z * n);
                var a = s;
                Math.abs(o.x) < .9 ? (a.set(1, 0, 0),
                o.cross(a, t)) : (a.set(0, 1, 0),
                o.cross(a, t)),
                o.cross(t, e)
            } else
                t.set(1, 0, 0),
                e.set(0, 1, 0)
        }
        ,
        n.prototype.toString = function() {
            return this.x + "," + this.y + "," + this.z
        }
        ,
        n.prototype.toArray = function() {
            return [this.x, this.y, this.z]
        }
        ,
        n.prototype.copy = function(t) {
            return this.x = t.x,
            this.y = t.y,
            this.z = t.z,
            this
        }
        ,
        n.prototype.lerp = function(t, e, i) {
            var o = this.x
              , n = this.y
              , r = this.z;
            i.x = o + (t.x - o) * e,
            i.y = n + (t.y - n) * e,
            i.z = r + (t.z - r) * e
        }
        ,
        n.prototype.almostEquals = function(t, e) {
            return void 0 === e && (e = 1e-6),
            !(Math.abs(this.x - t.x) > e || Math.abs(this.y - t.y) > e || Math.abs(this.z - t.z) > e)
        }
        ,
        n.prototype.almostZero = function(t) {
            return void 0 === t && (t = 1e-6),
            !(Math.abs(this.x) > t || Math.abs(this.y) > t || Math.abs(this.z) > t)
        }
        ;
        var a = new n;
        n.prototype.isAntiparallelTo = function(t, e) {
            return this.negate(a),
            a.almostEquals(t, e)
        }
        ,
        n.prototype.clone = function() {
            return new n(this.x,this.y,this.z)
        }
    })
      , o = t(function(t, e) {
        t.exports = n;
        var o = i({});
        function n(t) {
            this.elements = t || [0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
        n.prototype.identity = function() {
            var t = this.elements;
            t[0] = 1,
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t[4] = 1,
            t[5] = 0,
            t[6] = 0,
            t[7] = 0,
            t[8] = 1
        }
        ,
        n.prototype.setZero = function() {
            var t = this.elements;
            t[0] = 0,
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t[4] = 0,
            t[5] = 0,
            t[6] = 0,
            t[7] = 0,
            t[8] = 0
        }
        ,
        n.prototype.setTrace = function(t) {
            var e = this.elements;
            e[0] = t.x,
            e[4] = t.y,
            e[8] = t.z
        }
        ,
        n.prototype.getTrace = function(t) {
            t = t || new o;
            var e = this.elements;
            t.x = e[0],
            t.y = e[4],
            t.z = e[8]
        }
        ,
        n.prototype.vmult = function(t, e) {
            e = e || new o;
            var i = this.elements
              , n = t.x
              , r = t.y
              , s = t.z;
            return e.x = i[0] * n + i[1] * r + i[2] * s,
            e.y = i[3] * n + i[4] * r + i[5] * s,
            e.z = i[6] * n + i[7] * r + i[8] * s,
            e
        }
        ,
        n.prototype.smult = function(t) {
            for (var e = 0; e < this.elements.length; e++)
                this.elements[e] *= t
        }
        ,
        n.prototype.mmult = function(t, e) {
            for (var i = e || new n, o = 0; o < 3; o++)
                for (var r = 0; r < 3; r++) {
                    for (var s = 0, a = 0; a < 3; a++)
                        s += t.elements[o + 3 * a] * this.elements[a + 3 * r];
                    i.elements[o + 3 * r] = s
                }
            return i
        }
        ,
        n.prototype.scale = function(t, e) {
            e = e || new n;
            for (var i = this.elements, o = e.elements, r = 0; 3 !== r; r++)
                o[3 * r + 0] = t.x * i[3 * r + 0],
                o[3 * r + 1] = t.y * i[3 * r + 1],
                o[3 * r + 2] = t.z * i[3 * r + 2];
            return e
        }
        ,
        n.prototype.solve = function(t, e) {
            e = e || new o;
            for (var i, n = [], r = 0; r < 12; r++)
                n.push(0);
            for (r = 0; r < 3; r++)
                for (i = 0; i < 3; i++)
                    n[r + 4 * i] = this.elements[r + 3 * i];
            n[3] = t.x,
            n[7] = t.y,
            n[11] = t.z;
            var s, a, h = 3, l = h;
            do {
                if (0 === n[(r = l - h) + 4 * r])
                    for (i = r + 1; i < l; i++)
                        if (0 !== n[r + 4 * i]) {
                            s = 4;
                            do {
                                n[(a = 4 - s) + 4 * r] += n[a + 4 * i]
                            } while (--s);
                            break
                        }
                if (0 !== n[r + 4 * r])
                    for (i = r + 1; i < l; i++) {
                        var p = n[r + 4 * i] / n[r + 4 * r];
                        s = 4;
                        do {
                            n[(a = 4 - s) + 4 * i] = a <= r ? 0 : n[a + 4 * i] - n[a + 4 * r] * p
                        } while (--s)
                    }
            } while (--h);
            if (e.z = n[11] / n[10],
            e.y = (n[7] - n[6] * e.z) / n[5],
            e.x = (n[3] - n[2] * e.z - n[1] * e.y) / n[0],
            isNaN(e.x) || isNaN(e.y) || isNaN(e.z) || e.x === 1 / 0 || e.y === 1 / 0 || e.z === 1 / 0)
                throw "Could not solve equation! Got x=[" + e.toString() + "], b=[" + t.toString() + "], A=[" + this.toString() + "]";
            return e
        }
        ,
        n.prototype.e = function(t, e, i) {
            if (void 0 === i)
                return this.elements[e + 3 * t];
            this.elements[e + 3 * t] = i
        }
        ,
        n.prototype.copy = function(t) {
            for (var e = 0; e < t.elements.length; e++)
                this.elements[e] = t.elements[e];
            return this
        }
        ,
        n.prototype.toString = function() {
            for (var t = "", e = 0; e < 9; e++)
                t += this.elements[e] + ",";
            return t
        }
        ,
        n.prototype.reverse = function(t) {
            t = t || new n;
            for (var e, i = [], o = 0; o < 18; o++)
                i.push(0);
            for (o = 0; o < 3; o++)
                for (e = 0; e < 3; e++)
                    i[o + 6 * e] = this.elements[o + 3 * e];
            i[3] = 1,
            i[9] = 0,
            i[15] = 0,
            i[4] = 0,
            i[10] = 1,
            i[16] = 0,
            i[5] = 0,
            i[11] = 0,
            i[17] = 1;
            var r, s, a = 3, h = a;
            do {
                if (0 === i[(o = h - a) + 6 * o])
                    for (e = o + 1; e < h; e++)
                        if (0 !== i[o + 6 * e]) {
                            r = 6;
                            do {
                                i[(s = 6 - r) + 6 * o] += i[s + 6 * e]
                            } while (--r);
                            break
                        }
                if (0 !== i[o + 6 * o])
                    for (e = o + 1; e < h; e++) {
                        var l = i[o + 6 * e] / i[o + 6 * o];
                        r = 6;
                        do {
                            i[(s = 6 - r) + 6 * e] = s <= o ? 0 : i[s + 6 * e] - i[s + 6 * o] * l
                        } while (--r)
                    }
            } while (--a);
            o = 2;
            do {
                e = o - 1;
                do {
                    l = i[o + 6 * e] / i[o + 6 * o],
                    r = 6;
                    do {
                        i[(s = 6 - r) + 6 * e] = i[s + 6 * e] - i[s + 6 * o] * l
                    } while (--r)
                } while (e--)
            } while (--o);
            o = 2;
            do {
                l = 1 / i[o + 6 * o],
                r = 6;
                do {
                    i[(s = 6 - r) + 6 * o] = i[s + 6 * o] * l
                } while (--r)
            } while (o--);
            o = 2;
            do {
                e = 2;
                do {
                    if (s = i[3 + e + 6 * o],
                    isNaN(s) || s === 1 / 0)
                        throw "Could not reverse! A=[" + this.toString() + "]";
                    t.e(o, e, s)
                } while (e--)
            } while (o--);
            return t
        }
        ,
        n.prototype.setRotationFromQuaternion = function(t) {
            var e = t.x
              , i = t.y
              , o = t.z
              , n = t.w
              , r = e + e
              , s = i + i
              , a = o + o
              , h = e * r
              , l = e * s
              , p = e * a
              , u = i * s
              , c = i * a
              , d = o * a
              , v = n * r
              , y = n * s
              , f = n * a
              , m = this.elements;
            return m[0] = 1 - (u + d),
            m[1] = l - f,
            m[2] = p + y,
            m[3] = l + f,
            m[4] = 1 - (h + d),
            m[5] = c - v,
            m[6] = p - y,
            m[7] = c + v,
            m[8] = 1 - (h + u),
            this
        }
        ,
        n.prototype.transpose = function(t) {
            for (var e = (t = t || new n).elements, i = this.elements, o = 0; 3 !== o; o++)
                for (var r = 0; 3 !== r; r++)
                    e[3 * o + r] = i[3 * r + o];
            return t
        }
    })
      , n = {};
    function r() {}
    n = r,
    r.defaults = function(t, e) {
        for (var i in t = t || {},
        e)
            i in t || (t[i] = e[i]);
        return t
    }
    ;
    var s = i({});
    function a(t) {
        t = t || {},
        this.lowerBound = new s,
        t.lowerBound && this.lowerBound.copy(t.lowerBound),
        this.upperBound = new s,
        t.upperBound && this.upperBound.copy(t.upperBound)
    }
    var h = a
      , l = new s;
    a.prototype.setFromPoints = function(t, e, i, o) {
        var n = this.lowerBound
          , r = this.upperBound
          , s = i;
        n.copy(t[0]),
        s && s.vmult(n, n),
        r.copy(n);
        for (var a = 1; a < t.length; a++) {
            var h = t[a];
            s && (s.vmult(h, l),
            h = l),
            h.x > r.x && (r.x = h.x),
            h.x < n.x && (n.x = h.x),
            h.y > r.y && (r.y = h.y),
            h.y < n.y && (n.y = h.y),
            h.z > r.z && (r.z = h.z),
            h.z < n.z && (n.z = h.z)
        }
        return e && (e.vadd(n, n),
        e.vadd(r, r)),
        o && (n.x -= o,
        n.y -= o,
        n.z -= o,
        r.x += o,
        r.y += o,
        r.z += o),
        this
    }
    ,
    a.prototype.copy = function(t) {
        return this.lowerBound.copy(t.lowerBound),
        this.upperBound.copy(t.upperBound),
        this
    }
    ,
    a.prototype.clone = function() {
        return (new a).copy(this)
    }
    ,
    a.prototype.extend = function(t) {
        this.lowerBound.x = Math.min(this.lowerBound.x, t.lowerBound.x),
        this.upperBound.x = Math.max(this.upperBound.x, t.upperBound.x),
        this.lowerBound.y = Math.min(this.lowerBound.y, t.lowerBound.y),
        this.upperBound.y = Math.max(this.upperBound.y, t.upperBound.y),
        this.lowerBound.z = Math.min(this.lowerBound.z, t.lowerBound.z),
        this.upperBound.z = Math.max(this.upperBound.z, t.upperBound.z)
    }
    ,
    a.prototype.overlaps = function(t) {
        var e = this.lowerBound
          , i = this.upperBound
          , o = t.lowerBound
          , n = t.upperBound
          , r = o.x <= i.x && i.x <= n.x || e.x <= n.x && n.x <= i.x
          , s = o.y <= i.y && i.y <= n.y || e.y <= n.y && n.y <= i.y
          , a = o.z <= i.z && i.z <= n.z || e.z <= n.z && n.z <= i.z;
        return r && s && a
    }
    ,
    a.prototype.volume = function() {
        var t = this.lowerBound
          , e = this.upperBound;
        return (e.x - t.x) * (e.y - t.y) * (e.z - t.z)
    }
    ,
    a.prototype.contains = function(t) {
        var e = this.lowerBound
          , i = this.upperBound
          , o = t.lowerBound
          , n = t.upperBound;
        return e.x <= o.x && i.x >= n.x && e.y <= o.y && i.y >= n.y && e.z <= o.z && i.z >= n.z
    }
    ,
    a.prototype.getCorners = function(t, e, i, o, n, r, s, a) {
        var h = this.lowerBound
          , l = this.upperBound;
        t.copy(h),
        e.set(l.x, h.y, h.z),
        i.set(l.x, l.y, h.z),
        o.set(h.x, l.y, l.z),
        n.set(l.x, h.y, h.z),
        r.set(h.x, l.y, h.z),
        s.set(h.x, h.y, l.z),
        a.copy(l)
    }
    ;
    var p = [new s, new s, new s, new s, new s, new s, new s, new s];
    a.prototype.toLocalFrame = function(t, e) {
        var i = p
          , o = i[0]
          , n = i[1]
          , r = i[2]
          , s = i[3]
          , a = i[4]
          , h = i[5]
          , l = i[6]
          , u = i[7];
        this.getCorners(o, n, r, s, a, h, l, u);
        for (var c = 0; 8 !== c; c++) {
            var d = i[c];
            t.pointToLocal(d, d)
        }
        return e.setFromPoints(i)
    }
    ,
    a.prototype.toWorldFrame = function(t, e) {
        var i = p
          , o = i[0]
          , n = i[1]
          , r = i[2]
          , s = i[3]
          , a = i[4]
          , h = i[5]
          , l = i[6]
          , u = i[7];
        this.getCorners(o, n, r, s, a, h, l, u);
        for (var c = 0; 8 !== c; c++) {
            var d = i[c];
            t.pointToWorld(d, d)
        }
        return e.setFromPoints(i)
    }
    ,
    a.prototype.overlapsRay = function(t) {
        var e = 1 / t._direction.x
          , i = 1 / t._direction.y
          , o = 1 / t._direction.z
          , n = (this.lowerBound.x - t.from.x) * e
          , r = (this.upperBound.x - t.from.x) * e
          , s = (this.lowerBound.y - t.from.y) * i
          , a = (this.upperBound.y - t.from.y) * i
          , h = (this.lowerBound.z - t.from.z) * o
          , l = (this.upperBound.z - t.from.z) * o
          , p = Math.max(Math.max(Math.min(n, r), Math.min(s, a)), Math.min(h, l))
          , u = Math.min(Math.min(Math.max(n, r), Math.max(s, a)), Math.max(h, l));
        return !(u < 0 || p > u)
    }
    ;
    var u = {};
    function c() {
        this.matrix = []
    }
    u = c,
    c.prototype.get = function(t, e) {
        if (t = t.index,
        (e = e.index) > t) {
            var i = e;
            e = t,
            t = i
        }
        return this.matrix[(t * (t + 1) >> 1) + e - 1]
    }
    ,
    c.prototype.set = function(t, e, i) {
        if (t = t.index,
        (e = e.index) > t) {
            var o = e;
            e = t,
            t = o
        }
        this.matrix[(t * (t + 1) >> 1) + e - 1] = i ? 1 : 0
    }
    ,
    c.prototype.reset = function() {
        for (var t = 0, e = this.matrix.length; t !== e; t++)
            this.matrix[t] = 0
    }
    ,
    c.prototype.setNumObjects = function(t) {
        this.matrix.length = t * (t - 1) >> 1
    }
    ;
    var d = {}
      , v = function() {};
    d = v,
    v.prototype = {
        constructor: v,
        addEventListener: function(t, e) {
            void 0 === this._listeners && (this._listeners = {});
            var i = this._listeners;
            return void 0 === i[t] && (i[t] = []),
            -1 === i[t].indexOf(e) && i[t].push(e),
            this
        },
        hasEventListener: function(t, e) {
            if (void 0 === this._listeners)
                return !1;
            var i = this._listeners;
            return void 0 !== i[t] && -1 !== i[t].indexOf(e)
        },
        hasAnyEventListener: function(t) {
            return void 0 !== this._listeners && void 0 !== this._listeners[t]
        },
        removeEventListener: function(t, e) {
            if (void 0 === this._listeners)
                return this;
            var i = this._listeners;
            if (void 0 === i[t])
                return this;
            var o = i[t].indexOf(e);
            return -1 !== o && i[t].splice(o, 1),
            this
        },
        dispatchEvent: function(t) {
            if (void 0 === this._listeners)
                return this;
            var e = this._listeners[t.type];
            if (void 0 !== e) {
                t.target = this;
                for (var i = 0, o = e.length; i < o; i++)
                    e[i].call(this, t)
            }
            return this
        }
    };
    var y = m
      , f = i({});
    function m(t, e, i, o) {
        this.x = void 0 !== t ? t : 0,
        this.y = void 0 !== e ? e : 0,
        this.z = void 0 !== i ? i : 0,
        this.w = void 0 !== o ? o : 1
    }
    m.prototype.set = function(t, e, i, o) {
        return this.x = t,
        this.y = e,
        this.z = i,
        this.w = o,
        this
    }
    ,
    m.prototype.toString = function() {
        return this.x + "," + this.y + "," + this.z + "," + this.w
    }
    ,
    m.prototype.toArray = function() {
        return [this.x, this.y, this.z, this.w]
    }
    ,
    m.prototype.setFromAxisAngle = function(t, e) {
        var i = Math.sin(.5 * e);
        return this.x = t.x * i,
        this.y = t.y * i,
        this.z = t.z * i,
        this.w = Math.cos(.5 * e),
        this
    }
    ,
    m.prototype.toAxisAngle = function(t) {
        t = t || new f,
        this.normalize();
        var e = 2 * Math.acos(this.w)
          , i = Math.sqrt(1 - this.w * this.w);
        return i < .001 ? (t.x = this.x,
        t.y = this.y,
        t.z = this.z) : (t.x = this.x / i,
        t.y = this.y / i,
        t.z = this.z / i),
        [t, e]
    }
    ;
    var w = new f
      , x = new f;
    m.prototype.setFromVectors = function(t, e) {
        if (t.isAntiparallelTo(e)) {
            var i = w
              , o = x;
            t.tangents(i, o),
            this.setFromAxisAngle(i, Math.PI)
        } else {
            var n = t.cross(e);
            this.x = n.x,
            this.y = n.y,
            this.z = n.z,
            this.w = Math.sqrt(Math.pow(t.norm(), 2) * Math.pow(e.norm(), 2)) + t.dot(e),
            this.normalize()
        }
        return this
    }
    ,
    new f,
    new f,
    new f,
    m.prototype.mult = function(t, e) {
        e = e || new m;
        var i = this.x
          , o = this.y
          , n = this.z
          , r = this.w
          , s = t.x
          , a = t.y
          , h = t.z
          , l = t.w;
        return e.x = i * l + r * s + o * h - n * a,
        e.y = o * l + r * a + n * s - i * h,
        e.z = n * l + r * h + i * a - o * s,
        e.w = r * l - i * s - o * a - n * h,
        e
    }
    ,
    m.prototype.inverse = function(t) {
        var e = this.x
          , i = this.y
          , o = this.z
          , n = this.w;
        t = t || new m,
        this.conjugate(t);
        var r = 1 / (e * e + i * i + o * o + n * n);
        return t.x *= r,
        t.y *= r,
        t.z *= r,
        t.w *= r,
        t
    }
    ,
    m.prototype.conjugate = function(t) {
        return (t = t || new m).x = -this.x,
        t.y = -this.y,
        t.z = -this.z,
        t.w = this.w,
        t
    }
    ,
    m.prototype.normalize = function() {
        var t = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        return 0 === t ? (this.x = 0,
        this.y = 0,
        this.z = 0,
        this.w = 0) : (t = 1 / t,
        this.x *= t,
        this.y *= t,
        this.z *= t,
        this.w *= t),
        this
    }
    ,
    m.prototype.normalizeFast = function() {
        var t = (3 - (this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)) / 2;
        return 0 === t ? (this.x = 0,
        this.y = 0,
        this.z = 0,
        this.w = 0) : (this.x *= t,
        this.y *= t,
        this.z *= t,
        this.w *= t),
        this
    }
    ,
    m.prototype.vmult = function(t, e) {
        e = e || new f;
        var i = t.x
          , o = t.y
          , n = t.z
          , r = this.x
          , s = this.y
          , a = this.z
          , h = this.w
          , l = h * i + s * n - a * o
          , p = h * o + a * i - r * n
          , u = h * n + r * o - s * i
          , c = -r * i - s * o - a * n;
        return e.x = l * h + c * -r + p * -a - u * -s,
        e.y = p * h + c * -s + u * -r - l * -a,
        e.z = u * h + c * -a + l * -s - p * -r,
        e
    }
    ,
    m.prototype.copy = function(t) {
        return this.x = t.x,
        this.y = t.y,
        this.z = t.z,
        this.w = t.w,
        this
    }
    ,
    m.prototype.toEuler = function(t, e) {
        var i, o, n;
        e = e || "YZX";
        var r = this.x
          , s = this.y
          , a = this.z
          , h = this.w;
        switch (e) {
        case "YZX":
            var l = r * s + a * h;
            if (l > .499 && (i = 2 * Math.atan2(r, h),
            o = Math.PI / 2,
            n = 0),
            l < -.499 && (i = -2 * Math.atan2(r, h),
            o = -Math.PI / 2,
            n = 0),
            isNaN(i)) {
                var p = r * r
                  , u = s * s
                  , c = a * a;
                i = Math.atan2(2 * s * h - 2 * r * a, 1 - 2 * u - 2 * c),
                o = Math.asin(2 * l),
                n = Math.atan2(2 * r * h - 2 * s * a, 1 - 2 * p - 2 * c)
            }
            break;
        default:
            throw new Error("Euler order " + e + " not supported yet.")
        }
        t.y = i,
        t.z = o,
        t.x = n
    }
    ,
    m.prototype.setFromEuler = function(t, e, i, o) {
        o = o || "XYZ";
        var n = Math.cos(t / 2)
          , r = Math.cos(e / 2)
          , s = Math.cos(i / 2)
          , a = Math.sin(t / 2)
          , h = Math.sin(e / 2)
          , l = Math.sin(i / 2);
        return "XYZ" === o ? (this.x = a * r * s + n * h * l,
        this.y = n * h * s - a * r * l,
        this.z = n * r * l + a * h * s,
        this.w = n * r * s - a * h * l) : "YXZ" === o ? (this.x = a * r * s + n * h * l,
        this.y = n * h * s - a * r * l,
        this.z = n * r * l - a * h * s,
        this.w = n * r * s + a * h * l) : "ZXY" === o ? (this.x = a * r * s - n * h * l,
        this.y = n * h * s + a * r * l,
        this.z = n * r * l + a * h * s,
        this.w = n * r * s - a * h * l) : "ZYX" === o ? (this.x = a * r * s - n * h * l,
        this.y = n * h * s + a * r * l,
        this.z = n * r * l - a * h * s,
        this.w = n * r * s + a * h * l) : "YZX" === o ? (this.x = a * r * s + n * h * l,
        this.y = n * h * s + a * r * l,
        this.z = n * r * l - a * h * s,
        this.w = n * r * s - a * h * l) : "XZY" === o && (this.x = a * r * s - n * h * l,
        this.y = n * h * s - a * r * l,
        this.z = n * r * l + a * h * s,
        this.w = n * r * s + a * h * l),
        this
    }
    ,
    m.prototype.clone = function() {
        return new m(this.x,this.y,this.z,this.w)
    }
    ,
    m.prototype.slerp = function(t, e, i) {
        i = i || new m;
        var o, n, r, s, a, h = this.x, l = this.y, p = this.z, u = this.w, c = t.x, d = t.y, v = t.z, y = t.w;
        return (n = h * c + l * d + p * v + u * y) < 0 && (n = -n,
        c = -c,
        d = -d,
        v = -v,
        y = -y),
        1 - n > 1e-6 ? (o = Math.acos(n),
        r = Math.sin(o),
        s = Math.sin((1 - e) * o) / r,
        a = Math.sin(e * o) / r) : (s = 1 - e,
        a = e),
        i.x = s * h + a * c,
        i.y = s * l + a * d,
        i.z = s * p + a * v,
        i.w = s * u + a * y,
        i
    }
    ,
    m.prototype.integrate = function(t, e, i, o) {
        o = o || new m;
        var n = t.x * i.x
          , r = t.y * i.y
          , s = t.z * i.z
          , a = this.x
          , h = this.y
          , l = this.z
          , p = this.w
          , u = .5 * e;
        return o.x += u * (n * p + r * l - s * h),
        o.y += u * (r * p + s * a - n * l),
        o.z += u * (s * p + n * h - r * a),
        o.w += u * (-n * a - r * h - s * l),
        o
    }
    ;
    var b = {};
    function g(t) {
        var e = "";
        "string" == typeof (t = t || {}) ? (e = t,
        t = {}) : "object" == typeof t && (e = ""),
        this.name = e,
        this.id = g.idCounter++,
        this.friction = void 0 !== t.friction ? t.friction : -1,
        this.restitution = void 0 !== t.restitution ? t.restitution : -1
    }
    b = g,
    g.idCounter = 0;
    var E = i({});
    function B(t) {
        t = t || {},
        this.position = new E,
        t.position && this.position.copy(t.position),
        this.quaternion = new y,
        t.quaternion && this.quaternion.copy(t.quaternion)
    }
    var z = B
      , A = new y;
    B.pointToLocalFrame = function(t, e, i, o) {
        return o = o || new E,
        i.vsub(t, o),
        e.conjugate(A),
        A.vmult(o, o),
        o
    }
    ,
    B.prototype.pointToLocal = function(t, e) {
        return B.pointToLocalFrame(this.position, this.quaternion, t, e)
    }
    ,
    B.pointToWorldFrame = function(t, e, i, o) {
        return o = o || new E,
        e.vmult(i, o),
        o.vadd(t, o),
        o
    }
    ,
    B.prototype.pointToWorld = function(t, e) {
        return B.pointToWorldFrame(this.position, this.quaternion, t, e)
    }
    ,
    B.prototype.vectorToWorldFrame = function(t, e) {
        return e = e || new E,
        this.quaternion.vmult(t, e),
        e
    }
    ,
    B.vectorToWorldFrame = function(t, e, i) {
        return t.vmult(e, i),
        i
    }
    ,
    B.vectorToLocalFrame = function(t, e, i, o) {
        return o = o || new E,
        e.w *= -1,
        e.vmult(i, o),
        e.w *= -1,
        o
    }
    ;
    var F = C
      , M = e({})
      , S = i({})
      , q = z;
    function C(t, e, i) {
        M.call(this, {
            type: M.types.CONVEXPOLYHEDRON
        }),
        this.vertices = t || [],
        this.worldVertices = [],
        this.worldVerticesNeedsUpdate = !0,
        this.faces = e || [],
        this.faceNormals = [],
        this.computeNormals(),
        this.worldFaceNormalsNeedsUpdate = !0,
        this.worldFaceNormals = [],
        this.uniqueEdges = [],
        this.uniqueAxes = i ? i.slice() : null,
        this.computeEdges(),
        this.updateBoundingSphereRadius()
    }
    C.prototype = new M,
    C.prototype.constructor = C;
    var N = new S;
    C.prototype.computeEdges = function() {
        var t = this.faces
          , e = this.vertices
          , i = (e.length,
        this.uniqueEdges);
        i.length = 0;
        for (var o = N, n = 0; n !== t.length; n++)
            for (var r = t[n], s = r.length, a = 0; a !== s; a++) {
                var h = (a + 1) % s;
                e[r[a]].vsub(e[r[h]], o),
                o.normalize();
                for (var l = !1, p = 0; p !== i.length; p++)
                    if (i[p].almostEquals(o) || i[p].almostEquals(o)) {
                        l = !0;
                        break
                    }
                l || i.push(o.clone())
            }
    }
    ,
    C.prototype.computeNormals = function() {
        this.faceNormals.length = this.faces.length;
        for (var t = 0; t < this.faces.length; t++) {
            for (var e = 0; e < this.faces[t].length; e++)
                if (!this.vertices[this.faces[t][e]])
                    throw new Error("Vertex " + this.faces[t][e] + " not found!");
            var i = this.faceNormals[t] || new S;
            this.getFaceNormal(t, i),
            i.negate(i),
            this.faceNormals[t] = i;
            var o = this.vertices[this.faces[t][0]];
            if (i.dot(o) < 0)
                for (console.error(".faceNormals[" + t + "] = Vec3(" + i.toString() + ") looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule."),
                e = 0; e < this.faces[t].length; e++)
                    console.warn(".vertices[" + this.faces[t][e] + "] = Vec3(" + this.vertices[this.faces[t][e]].toString() + ")")
        }
    }
    ;
    var T = new S
      , R = new S;
    C.computeNormal = function(t, e, i, o) {
        e.vsub(t, R),
        i.vsub(e, T),
        T.cross(R, o),
        o.isZero() || o.normalize()
    }
    ,
    C.prototype.getFaceNormal = function(t, e) {
        var i = this.faces[t]
          , o = this.vertices[i[0]]
          , n = this.vertices[i[1]]
          , r = this.vertices[i[2]];
        return C.computeNormal(o, n, r, e)
    }
    ;
    var P = new S;
    C.prototype.clipAgainstHull = function(t, e, i, o, n, r, s, a, h) {
        for (var l = P, p = -1, u = -Number.MAX_VALUE, c = 0; c < i.faces.length; c++) {
            l.copy(i.faceNormals[c]),
            n.vmult(l, l);
            var d = l.dot(r);
            d > u && (u = d,
            p = c)
        }
        for (var v = [], y = i.faces[p], f = y.length, m = 0; m < f; m++) {
            var w = i.vertices[y[m]]
              , x = new S;
            x.copy(w),
            n.vmult(x, x),
            o.vadd(x, x),
            v.push(x)
        }
        p >= 0 && this.clipFaceAgainstHull(r, t, e, v, s, a, h)
    }
    ;
    var j = new S
      , I = new S
      , L = new S
      , O = new S
      , W = new S
      , k = new S;
    C.prototype.findSeparatingAxis = function(t, e, i, o, n, r, s, a) {
        var h = j
          , l = I
          , p = L
          , u = O
          , c = W
          , d = k
          , v = Number.MAX_VALUE;
        if (this.uniqueAxes)
            for (f = 0; f !== this.uniqueAxes.length; f++) {
                if (i.vmult(this.uniqueAxes[f], h),
                !1 === (x = this.testSepAxis(h, t, e, i, o, n)))
                    return !1;
                x < v && (v = x,
                r.copy(h))
            }
        else
            for (var y = s ? s.length : this.faces.length, f = 0; f < y; f++) {
                var m = s ? s[f] : f;
                if (h.copy(this.faceNormals[m]),
                i.vmult(h, h),
                !1 === (x = this.testSepAxis(h, t, e, i, o, n)))
                    return !1;
                x < v && (v = x,
                r.copy(h))
            }
        if (t.uniqueAxes)
            for (f = 0; f !== t.uniqueAxes.length; f++) {
                if (n.vmult(t.uniqueAxes[f], l),
                !1 === (x = this.testSepAxis(l, t, e, i, o, n)))
                    return !1;
                x < v && (v = x,
                r.copy(l))
            }
        else {
            var w = a ? a.length : t.faces.length;
            for (f = 0; f < w; f++) {
                var x;
                if (m = a ? a[f] : f,
                l.copy(t.faceNormals[m]),
                n.vmult(l, l),
                !1 === (x = this.testSepAxis(l, t, e, i, o, n)))
                    return !1;
                x < v && (v = x,
                r.copy(l))
            }
        }
        for (var b = 0; b !== this.uniqueEdges.length; b++) {
            i.vmult(this.uniqueEdges[b], u);
            for (var g = 0; g !== t.uniqueEdges.length; g++)
                if (n.vmult(t.uniqueEdges[g], c),
                u.cross(c, d),
                !d.almostZero()) {
                    d.normalize();
                    var E = this.testSepAxis(d, t, e, i, o, n);
                    if (!1 === E)
                        return !1;
                    E < v && (v = E,
                    r.copy(d))
                }
        }
        return o.vsub(e, p),
        p.dot(r) > 0 && r.negate(r),
        !0
    }
    ;
    var V = []
      , _ = [];
    C.prototype.testSepAxis = function(t, e, i, o, n, r) {
        C.project(this, t, i, o, V),
        C.project(e, t, n, r, _);
        var s = V[0]
          , a = V[1]
          , h = _[0]
          , l = _[1];
        if (s < l || h < a)
            return !1;
        var p = s - l
          , u = h - a;
        return p < u ? p : u
    }
    ;
    var H = new S
      , U = new S;
    C.prototype.calculateLocalInertia = function(t, e) {
        this.computeLocalAABB(H, U);
        var i = U.x - H.x
          , o = U.y - H.y
          , n = U.z - H.z;
        e.x = 1 / 12 * t * (2 * o * 2 * o + 2 * n * 2 * n),
        e.y = 1 / 12 * t * (2 * i * 2 * i + 2 * n * 2 * n),
        e.z = 1 / 12 * t * (2 * o * 2 * o + 2 * i * 2 * i)
    }
    ,
    C.prototype.getPlaneConstantOfFace = function(t) {
        var e = this.faces[t]
          , i = this.faceNormals[t]
          , o = this.vertices[e[0]];
        return -i.dot(o)
    }
    ;
    var G = new S
      , D = new S
      , X = new S
      , Y = new S
      , Z = new S
      , K = new S
      , Q = new S
      , J = new S;
    C.prototype.clipFaceAgainstHull = function(t, e, i, o, n, r, s) {
        for (var a = G, h = D, l = X, p = Y, u = Z, c = K, d = Q, v = J, y = o, f = [], m = -1, w = Number.MAX_VALUE, x = 0; x < this.faces.length; x++) {
            a.copy(this.faceNormals[x]),
            i.vmult(a, a);
            var b = a.dot(t);
            b < w && (w = b,
            m = x)
        }
        if (!(m < 0)) {
            var g = this.faces[m];
            g.connectedFaces = [];
            for (var E = 0; E < this.faces.length; E++)
                for (var B = 0; B < this.faces[E].length; B++)
                    -1 !== g.indexOf(this.faces[E][B]) && E !== m && -1 === g.connectedFaces.indexOf(E) && g.connectedFaces.push(E);
            y.length;
            for (var z = g.length, A = 0; A < z; A++) {
                var F = this.vertices[g[A]]
                  , M = this.vertices[g[(A + 1) % z]];
                F.vsub(M, h),
                l.copy(h),
                i.vmult(l, l),
                e.vadd(l, l),
                p.copy(this.faceNormals[m]),
                i.vmult(p, p),
                e.vadd(p, p),
                l.cross(p, u),
                u.negate(u),
                c.copy(F),
                i.vmult(c, c),
                e.vadd(c, c),
                c.dot(u);
                var S = g.connectedFaces[A];
                d.copy(this.faceNormals[S]);
                var q = this.getPlaneConstantOfFace(S);
                v.copy(d),
                i.vmult(v, v);
                var C = q - v.dot(e);
                for (this.clipFaceAgainstPlane(y, f, v, C); y.length; )
                    y.shift();
                for (; f.length; )
                    y.push(f.shift())
            }
            for (d.copy(this.faceNormals[m]),
            q = this.getPlaneConstantOfFace(m),
            v.copy(d),
            i.vmult(v, v),
            C = q - v.dot(e),
            E = 0; E < y.length; E++) {
                var N = v.dot(y[E]) + C;
                if (N <= n && (console.log("clamped: depth=" + N + " to minDist=" + n),
                N = n),
                N <= r) {
                    var T = y[E];
                    if (N <= 0) {
                        var R = {
                            point: T,
                            normal: v,
                            depth: N
                        };
                        s.push(R)
                    }
                }
            }
        }
    }
    ,
    C.prototype.clipFaceAgainstPlane = function(t, e, i, o) {
        var n, r, s = t.length;
        if (s < 2)
            return e;
        var a = t[t.length - 1]
          , h = t[0];
        n = i.dot(a) + o;
        for (var l = 0; l < s; l++) {
            if (h = t[l],
            r = i.dot(h) + o,
            n < 0)
                if (r < 0)
                    (p = new S).copy(h),
                    e.push(p);
                else {
                    var p = new S;
                    a.lerp(h, n / (n - r), p),
                    e.push(p)
                }
            else
                r < 0 && (p = new S,
                a.lerp(h, n / (n - r), p),
                e.push(p),
                e.push(h));
            a = h,
            n = r
        }
        return e
    }
    ,
    C.prototype.computeWorldVertices = function(t, e) {
        for (var i = this.vertices.length; this.worldVertices.length < i; )
            this.worldVertices.push(new S);
        for (var o = this.vertices, n = this.worldVertices, r = 0; r !== i; r++)
            e.vmult(o[r], n[r]),
            t.vadd(n[r], n[r]);
        this.worldVerticesNeedsUpdate = !1
    }
    ,
    new S,
    C.prototype.computeLocalAABB = function(t, e) {
        var i = this.vertices.length
          , o = this.vertices;
        t.set(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE),
        e.set(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
        for (var n = 0; n < i; n++) {
            var r = o[n];
            r.x < t.x ? t.x = r.x : r.x > e.x && (e.x = r.x),
            r.y < t.y ? t.y = r.y : r.y > e.y && (e.y = r.y),
            r.z < t.z ? t.z = r.z : r.z > e.z && (e.z = r.z)
        }
    }
    ,
    C.prototype.computeWorldFaceNormals = function(t) {
        for (var e = this.faceNormals.length; this.worldFaceNormals.length < e; )
            this.worldFaceNormals.push(new S);
        for (var i = this.faceNormals, o = this.worldFaceNormals, n = 0; n !== e; n++)
            t.vmult(i[n], o[n]);
        this.worldFaceNormalsNeedsUpdate = !1
    }
    ,
    C.prototype.updateBoundingSphereRadius = function() {
        for (var t = 0, e = this.vertices, i = 0, o = e.length; i !== o; i++) {
            var n = e[i].norm2();
            n > t && (t = n)
        }
        this.boundingSphereRadius = Math.sqrt(t)
    }
    ;
    var $ = new S;
    C.prototype.calculateWorldAABB = function(t, e, i, o) {
        for (var n, r, s, a, h, l, p = this.vertices.length, u = this.vertices, c = 0; c < p; c++) {
            $.copy(u[c]),
            e.vmult($, $),
            t.vadd($, $);
            var d = $;
            d.x < n || void 0 === n ? n = d.x : (d.x > a || void 0 === a) && (a = d.x),
            d.y < r || void 0 === r ? r = d.y : (d.y > h || void 0 === h) && (h = d.y),
            d.z < s || void 0 === s ? s = d.z : (d.z > l || void 0 === l) && (l = d.z)
        }
        i.set(n, r, s),
        o.set(a, h, l)
    }
    ,
    C.prototype.volume = function() {
        return 4 * Math.PI * this.boundingSphereRadius / 3
    }
    ,
    C.prototype.getAveragePointLocal = function(t) {
        t = t || new S;
        for (var e = this.vertices.length, i = this.vertices, o = 0; o < e; o++)
            t.vadd(i[o], t);
        return t.mult(1 / e, t),
        t
    }
    ,
    C.prototype.transformAllPoints = function(t, e) {
        var i = this.vertices.length
          , o = this.vertices;
        if (e) {
            for (var n = 0; n < i; n++) {
                var r = o[n];
                e.vmult(r, r)
            }
            for (n = 0; n < this.faceNormals.length; n++)
                r = this.faceNormals[n],
                e.vmult(r, r)
        }
        if (t)
            for (n = 0; n < i; n++)
                (r = o[n]).vadd(t, r)
    }
    ;
    var tt = new S
      , et = new S
      , it = new S;
    C.prototype.pointIsInside = function(t) {
        var e = this.vertices.length
          , i = this.vertices
          , o = this.faces
          , n = this.faceNormals
          , r = this.faces.length
          , s = tt;
        this.getAveragePointLocal(s);
        for (var a = 0; a < r; a++) {
            this.faces[a].length,
            e = n[a];
            var h = i[o[a][0]]
              , l = et;
            t.vsub(h, l);
            var p = e.dot(l)
              , u = it;
            s.vsub(h, u);
            var c = e.dot(u);
            if (p < 0 && c > 0 || p > 0 && c < 0)
                return !1
        }
        return -1
    }
    ,
    new S;
    var ot = new S
      , nt = new S;
    C.project = function(t, e, i, o, n) {
        var r = t.vertices.length
          , s = ot
          , a = 0
          , h = 0
          , l = nt
          , p = t.vertices;
        l.setZero(),
        q.vectorToLocalFrame(i, o, e, s),
        q.pointToLocalFrame(i, o, l, l);
        var u = l.dot(s);
        h = a = p[0].dot(s);
        for (var c = 1; c < r; c++) {
            var d = p[c].dot(s);
            d > a && (a = d),
            d < h && (h = d)
        }
        if ((h -= u) > (a -= u)) {
            var v = h;
            h = a,
            a = v
        }
        n[0] = a,
        n[1] = h
    }
    ;
    var rt = ht
      , st = e({})
      , at = i({});
    function ht(t) {
        st.call(this, {
            type: st.types.BOX
        }),
        this.halfExtents = t,
        this.convexPolyhedronRepresentation = null,
        this.updateConvexPolyhedronRepresentation(),
        this.updateBoundingSphereRadius()
    }
    ht.prototype = new st,
    ht.prototype.constructor = ht,
    ht.prototype.updateConvexPolyhedronRepresentation = function() {
        var t = this.halfExtents.x
          , e = this.halfExtents.y
          , i = this.halfExtents.z
          , o = at
          , n = [new o(-t,-e,-i), new o(t,-e,-i), new o(t,e,-i), new o(-t,e,-i), new o(-t,-e,i), new o(t,-e,i), new o(t,e,i), new o(-t,e,i)]
          , r = (new o(0,0,1),
        new o(0,1,0),
        new o(1,0,0),
        new F(n,[[3, 2, 1, 0], [4, 5, 6, 7], [5, 4, 0, 1], [2, 3, 7, 6], [0, 4, 7, 3], [1, 2, 6, 5]]));
        this.convexPolyhedronRepresentation = r,
        r.material = this.material
    }
    ,
    ht.prototype.calculateLocalInertia = function(t, e) {
        return e = e || new at,
        ht.calculateInertia(this.halfExtents, t, e),
        e
    }
    ,
    ht.calculateInertia = function(t, e, i) {
        var o = t;
        i.x = 1 / 12 * e * (2 * o.y * 2 * o.y + 2 * o.z * 2 * o.z),
        i.y = 1 / 12 * e * (2 * o.x * 2 * o.x + 2 * o.z * 2 * o.z),
        i.z = 1 / 12 * e * (2 * o.y * 2 * o.y + 2 * o.x * 2 * o.x)
    }
    ,
    ht.prototype.getSideNormals = function(t, e) {
        var i = t
          , o = this.halfExtents;
        if (i[0].set(o.x, 0, 0),
        i[1].set(0, o.y, 0),
        i[2].set(0, 0, o.z),
        i[3].set(-o.x, 0, 0),
        i[4].set(0, -o.y, 0),
        i[5].set(0, 0, -o.z),
        void 0 !== e)
            for (var n = 0; n !== i.length; n++)
                e.vmult(i[n], i[n]);
        return i
    }
    ,
    ht.prototype.volume = function() {
        return 8 * this.halfExtents.x * this.halfExtents.y * this.halfExtents.z
    }
    ,
    ht.prototype.updateBoundingSphereRadius = function() {
        this.boundingSphereRadius = this.halfExtents.norm()
    }
    ;
    var lt = new at;
    new at,
    ht.prototype.forEachWorldCorner = function(t, e, i) {
        for (var o = this.halfExtents, n = [[o.x, o.y, o.z], [-o.x, o.y, o.z], [-o.x, -o.y, o.z], [-o.x, -o.y, -o.z], [o.x, -o.y, -o.z], [o.x, o.y, -o.z], [-o.x, o.y, -o.z], [o.x, -o.y, o.z]], r = 0; r < n.length; r++)
            lt.set(n[r][0], n[r][1], n[r][2]),
            e.vmult(lt, lt),
            t.vadd(lt, lt),
            i(lt.x, lt.y, lt.z)
    }
    ;
    var pt = [new at, new at, new at, new at, new at, new at, new at, new at];
    ht.prototype.calculateWorldAABB = function(t, e, i, o) {
        var n = this.halfExtents;
        pt[0].set(n.x, n.y, n.z),
        pt[1].set(-n.x, n.y, n.z),
        pt[2].set(-n.x, -n.y, n.z),
        pt[3].set(-n.x, -n.y, -n.z),
        pt[4].set(n.x, -n.y, -n.z),
        pt[5].set(n.x, n.y, -n.z),
        pt[6].set(-n.x, n.y, -n.z),
        pt[7].set(n.x, -n.y, n.z);
        var r = pt[0];
        e.vmult(r, r),
        t.vadd(r, r),
        o.copy(r),
        i.copy(r);
        for (var s = 1; s < 8; s++) {
            r = pt[s],
            e.vmult(r, r),
            t.vadd(r, r);
            var a = r.x
              , h = r.y
              , l = r.z;
            a > o.x && (o.x = a),
            h > o.y && (o.y = h),
            l > o.z && (o.z = l),
            a < i.x && (i.x = a),
            h < i.y && (i.y = h),
            l < i.z && (i.z = l)
        }
    }
    ;
    var ut = yt
      , ct = (e({}),
    i({}))
      , dt = o({})
      , vt = h;
    function yt(t) {
        t = t || {},
        d.apply(this),
        this.id = yt.idCounter++,
        this.world = null,
        this.preStep = null,
        this.postStep = null,
        this.vlambda = new ct,
        this.collisionFilterGroup = "number" == typeof t.collisionFilterGroup ? t.collisionFilterGroup : 1,
        this.collisionFilterMask = "number" == typeof t.collisionFilterMask ? t.collisionFilterMask : -1,
        this.collisionResponse = !0,
        this.position = new ct,
        this.previousPosition = new ct,
        this.interpolatedPosition = new ct,
        this.initPosition = new ct,
        t.position && (this.position.copy(t.position),
        this.previousPosition.copy(t.position),
        this.interpolatedPosition.copy(t.position),
        this.initPosition.copy(t.position)),
        this.velocity = new ct,
        t.velocity && this.velocity.copy(t.velocity),
        this.initVelocity = new ct,
        this.force = new ct;
        var e = "number" == typeof t.mass ? t.mass : 0;
        this.mass = e,
        this.invMass = e > 0 ? 1 / e : 0,
        this.material = t.material || null,
        this.linearDamping = "number" == typeof t.linearDamping ? t.linearDamping : .01,
        this.type = e <= 0 ? yt.STATIC : yt.DYNAMIC,
        typeof t.type == typeof yt.STATIC && (this.type = t.type),
        this.allowSleep = void 0 === t.allowSleep || t.allowSleep,
        this.sleepState = 0,
        this.sleepSpeedLimit = void 0 !== t.sleepSpeedLimit ? t.sleepSpeedLimit : .1,
        this.sleepTimeLimit = void 0 !== t.sleepTimeLimit ? t.sleepTimeLimit : 1,
        this.timeLastSleepy = 0,
        this._wakeUpAfterNarrowphase = !1,
        this.torque = new ct,
        this.quaternion = new y,
        this.initQuaternion = new y,
        this.previousQuaternion = new y,
        this.interpolatedQuaternion = new y,
        t.quaternion && (this.quaternion.copy(t.quaternion),
        this.initQuaternion.copy(t.quaternion),
        this.previousQuaternion.copy(t.quaternion),
        this.interpolatedQuaternion.copy(t.quaternion)),
        this.angularVelocity = new ct,
        t.angularVelocity && this.angularVelocity.copy(t.angularVelocity),
        this.initAngularVelocity = new ct,
        this.shapes = [],
        this.shapeOffsets = [],
        this.shapeOrientations = [],
        this.inertia = new ct,
        this.invInertia = new ct,
        this.invInertiaWorld = new dt,
        this.invMassSolve = 0,
        this.invInertiaSolve = new ct,
        this.invInertiaWorldSolve = new dt,
        this.fixedRotation = void 0 !== t.fixedRotation && t.fixedRotation,
        this.angularDamping = void 0 !== t.angularDamping ? t.angularDamping : .01,
        this.linearFactor = new ct(1,1,1),
        t.linearFactor && this.linearFactor.copy(t.linearFactor),
        this.angularFactor = new ct(1,1,1),
        t.angularFactor && this.angularFactor.copy(t.angularFactor),
        this.aabb = new vt,
        this.aabbNeedsUpdate = !0,
        this.boundingRadius = 0,
        this.wlambda = new ct,
        t.shape && this.addShape(t.shape),
        this.updateMassProperties()
    }
    yt.prototype = new d,
    yt.prototype.constructor = yt,
    yt.COLLIDE_EVENT_NAME = "collide",
    yt.DYNAMIC = 1,
    yt.STATIC = 2,
    yt.KINEMATIC = 4,
    yt.AWAKE = 0,
    yt.SLEEPY = 1,
    yt.SLEEPING = 2,
    yt.idCounter = 0,
    yt.wakeupEvent = {
        type: "wakeup"
    },
    yt.prototype.wakeUp = function() {
        var t = this.sleepState;
        this.sleepState = 0,
        this._wakeUpAfterNarrowphase = !1,
        t === yt.SLEEPING && this.dispatchEvent(yt.wakeupEvent)
    }
    ,
    yt.prototype.sleep = function() {
        this.sleepState = yt.SLEEPING,
        this.velocity.set(0, 0, 0),
        this.angularVelocity.set(0, 0, 0),
        this._wakeUpAfterNarrowphase = !1
    }
    ,
    yt.sleepyEvent = {
        type: "sleepy"
    },
    yt.sleepEvent = {
        type: "sleep"
    },
    yt.prototype.sleepTick = function(t) {
        if (this.allowSleep) {
            var e = this.sleepState
              , i = this.velocity.norm2() + this.angularVelocity.norm2()
              , o = Math.pow(this.sleepSpeedLimit, 2);
            e === yt.AWAKE && i < o ? (this.sleepState = yt.SLEEPY,
            this.timeLastSleepy = t,
            this.dispatchEvent(yt.sleepyEvent)) : e === yt.SLEEPY && i > o ? this.wakeUp() : e === yt.SLEEPY && t - this.timeLastSleepy > this.sleepTimeLimit && (this.sleep(),
            this.dispatchEvent(yt.sleepEvent))
        }
    }
    ,
    yt.prototype.updateSolveMassProperties = function() {
        this.sleepState === yt.SLEEPING || this.type === yt.KINEMATIC ? (this.invMassSolve = 0,
        this.invInertiaSolve.setZero(),
        this.invInertiaWorldSolve.setZero()) : (this.invMassSolve = this.invMass,
        this.invInertiaSolve.copy(this.invInertia),
        this.invInertiaWorldSolve.copy(this.invInertiaWorld))
    }
    ,
    yt.prototype.pointToLocalFrame = function(t, e) {
        return e = e || new ct,
        t.vsub(this.position, e),
        this.quaternion.conjugate().vmult(e, e),
        e
    }
    ,
    yt.prototype.vectorToLocalFrame = function(t, e) {
        return e = e || new ct,
        this.quaternion.conjugate().vmult(t, e),
        e
    }
    ,
    yt.prototype.pointToWorldFrame = function(t, e) {
        return e = e || new ct,
        this.quaternion.vmult(t, e),
        e.vadd(this.position, e),
        e
    }
    ,
    yt.prototype.vectorToWorldFrame = function(t, e) {
        return e = e || new ct,
        this.quaternion.vmult(t, e),
        e
    }
    ;
    var ft = new ct
      , mt = new y;
    yt.prototype.addShape = function(t, e, i) {
        var o = new ct
          , n = new y;
        return e && o.copy(e),
        i && n.copy(i),
        this.shapes.push(t),
        this.shapeOffsets.push(o),
        this.shapeOrientations.push(n),
        this.updateMassProperties(),
        this.updateBoundingRadius(),
        this.aabbNeedsUpdate = !0,
        t.body = this,
        this
    }
    ,
    yt.prototype.updateBoundingRadius = function() {
        for (var t = this.shapes, e = this.shapeOffsets, i = t.length, o = 0, n = 0; n !== i; n++) {
            var r = t[n];
            r.updateBoundingSphereRadius();
            var s = e[n].norm()
              , a = r.boundingSphereRadius;
            s + a > o && (o = s + a)
        }
        this.boundingRadius = o
    }
    ;
    var wt = new vt;
    yt.prototype.computeAABB = function() {
        for (var t = this.shapes, e = this.shapeOffsets, i = this.shapeOrientations, o = t.length, n = ft, r = mt, s = this.quaternion, a = this.aabb, h = wt, l = 0; l !== o; l++) {
            var p = t[l];
            s.vmult(e[l], n),
            n.vadd(this.position, n),
            i[l].mult(s, r),
            p.calculateWorldAABB(n, r, h.lowerBound, h.upperBound),
            0 === l ? a.copy(h) : a.extend(h)
        }
        this.aabbNeedsUpdate = !1
    }
    ;
    var xt = new dt
      , bt = new dt;
    new dt,
    yt.prototype.updateInertiaWorld = function(t) {
        var e = this.invInertia;
        if (e.x !== e.y || e.y !== e.z || t) {
            var i = xt
              , o = bt;
            i.setRotationFromQuaternion(this.quaternion),
            i.transpose(o),
            i.scale(e, i),
            i.mmult(o, this.invInertiaWorld)
        }
    }
    ,
    new ct;
    var gt = new ct;
    yt.prototype.applyForce = function(t, e) {
        if (this.type === yt.DYNAMIC) {
            var i = gt;
            e.cross(t, i),
            this.force.vadd(t, this.force),
            this.torque.vadd(i, this.torque)
        }
    }
    ;
    var Et = new ct
      , Bt = new ct;
    yt.prototype.applyLocalForce = function(t, e) {
        if (this.type === yt.DYNAMIC) {
            var i = Et
              , o = Bt;
            this.vectorToWorldFrame(t, i),
            this.vectorToWorldFrame(e, o),
            this.applyForce(i, o)
        }
    }
    ,
    new ct;
    var zt = new ct
      , At = new ct;
    yt.prototype.applyImpulse = function(t, e) {
        if (this.type === yt.DYNAMIC) {
            var i = e
              , o = zt;
            o.copy(t),
            o.mult(this.invMass, o),
            this.velocity.vadd(o, this.velocity);
            var n = At;
            i.cross(t, n),
            this.invInertiaWorld.vmult(n, n),
            this.angularVelocity.vadd(n, this.angularVelocity)
        }
    }
    ;
    var Ft = new ct
      , Mt = new ct;
    yt.prototype.applyLocalImpulse = function(t, e) {
        if (this.type === yt.DYNAMIC) {
            var i = Ft
              , o = Mt;
            this.vectorToWorldFrame(t, i),
            this.vectorToWorldFrame(e, o),
            this.applyImpulse(i, o)
        }
    }
    ;
    var St = new ct;
    yt.prototype.updateMassProperties = function() {
        var t = St;
        this.invMass = this.mass > 0 ? 1 / this.mass : 0;
        var e = this.inertia
          , i = this.fixedRotation;
        this.computeAABB(),
        t.set((this.aabb.upperBound.x - this.aabb.lowerBound.x) / 2, (this.aabb.upperBound.y - this.aabb.lowerBound.y) / 2, (this.aabb.upperBound.z - this.aabb.lowerBound.z) / 2),
        rt.calculateInertia(t, this.mass, e),
        this.invInertia.set(e.x > 0 && !i ? 1 / e.x : 0, e.y > 0 && !i ? 1 / e.y : 0, e.z > 0 && !i ? 1 / e.z : 0),
        this.updateInertiaWorld(!0)
    }
    ,
    yt.prototype.getVelocityAtWorldPoint = function(t, e) {
        var i = new ct;
        return t.vsub(this.position, i),
        this.angularVelocity.cross(i, e),
        this.velocity.vadd(e, e),
        e
    }
    ,
    new ct,
    new ct,
    new y,
    new y,
    yt.prototype.integrate = function(t, e, i) {
        if (this.previousPosition.copy(this.position),
        this.previousQuaternion.copy(this.quaternion),
        (this.type === yt.DYNAMIC || this.type === yt.KINEMATIC) && this.sleepState !== yt.SLEEPING) {
            var o = this.velocity
              , n = this.angularVelocity
              , r = this.position
              , s = this.force
              , a = this.torque
              , h = this.quaternion
              , l = this.invMass
              , p = this.invInertiaWorld
              , u = this.linearFactor
              , c = l * t;
            o.x += s.x * c * u.x,
            o.y += s.y * c * u.y,
            o.z += s.z * c * u.z;
            var d = p.elements
              , v = this.angularFactor
              , y = a.x * v.x
              , f = a.y * v.y
              , m = a.z * v.z;
            n.x += t * (d[0] * y + d[1] * f + d[2] * m),
            n.y += t * (d[3] * y + d[4] * f + d[5] * m),
            n.z += t * (d[6] * y + d[7] * f + d[8] * m),
            r.x += o.x * t,
            r.y += o.y * t,
            r.z += o.z * t,
            h.integrate(this.angularVelocity, t, this.angularFactor, h),
            e && (i ? h.normalizeFast() : h.normalize()),
            this.aabbNeedsUpdate = !0,
            this.updateInertiaWorld()
        }
    }
    ;
    var qt = e({})
      , Ct = i({});
    function Nt() {
        qt.call(this, {
            type: qt.types.PLANE
        }),
        this.worldNormal = new Ct,
        this.worldNormalNeedsUpdate = !0,
        this.boundingSphereRadius = Number.MAX_VALUE
    }
    Nt.prototype = new qt,
    Nt.prototype.constructor = Nt,
    Nt.prototype.computeWorldNormal = function(t) {
        var e = this.worldNormal;
        e.set(0, 0, 1),
        t.vmult(e, e),
        this.worldNormalNeedsUpdate = !1
    }
    ,
    Nt.prototype.calculateLocalInertia = function(t, e) {
        return e || new Ct
    }
    ,
    Nt.prototype.volume = function() {
        return Number.MAX_VALUE
    }
    ;
    var Tt = new Ct;
    Nt.prototype.calculateWorldAABB = function(t, e, i, o) {
        Tt.set(0, 0, 1),
        e.vmult(Tt, Tt);
        var n = Number.MAX_VALUE;
        i.set(-n, -n, -n),
        o.set(n, n, n),
        1 === Tt.x && (o.x = t.x),
        1 === Tt.y && (o.y = t.y),
        1 === Tt.z && (o.z = t.z),
        -1 === Tt.x && (i.x = t.x),
        -1 === Tt.y && (i.y = t.y),
        -1 === Tt.z && (i.z = t.z)
    }
    ,
    Nt.prototype.updateBoundingSphereRadius = function() {
        this.boundingSphereRadius = Number.MAX_VALUE
    }
    ;
    var Rt = {}
      , Pt = i({});
    function jt() {
        this.world = null,
        this.useBoundingBoxes = !1,
        this.dirty = !0
    }
    e({}),
    Rt = jt,
    jt.prototype.collisionPairs = function(t, e, i) {
        throw new Error("collisionPairs not implemented for this BroadPhase class!")
    }
    ,
    jt.prototype.needBroadphaseCollision = function(t, e) {
        return 0 != (t.collisionFilterGroup & e.collisionFilterMask) && 0 != (e.collisionFilterGroup & t.collisionFilterMask) && (0 == (t.type & ut.STATIC) && t.sleepState !== ut.SLEEPING || 0 == (e.type & ut.STATIC) && e.sleepState !== ut.SLEEPING)
    }
    ,
    jt.prototype.intersectionTest = function(t, e, i, o) {
        this.useBoundingBoxes ? this.doBoundingBoxBroadphase(t, e, i, o) : this.doBoundingSphereBroadphase(t, e, i, o)
    }
    ;
    var It = new Pt;
    new Pt,
    new y,
    new Pt,
    jt.prototype.doBoundingSphereBroadphase = function(t, e, i, o) {
        var n = It;
        e.position.vsub(t.position, n);
        var r = Math.pow(t.boundingRadius + e.boundingRadius, 2);
        n.norm2() < r && (i.push(t),
        o.push(e))
    }
    ,
    jt.prototype.doBoundingBoxBroadphase = function(t, e, i, o) {
        t.aabbNeedsUpdate && t.computeAABB(),
        e.aabbNeedsUpdate && e.computeAABB(),
        t.aabb.overlaps(e.aabb) && (i.push(t),
        o.push(e))
    }
    ;
    var Lt = {
        keys: []
    }
      , Ot = []
      , Wt = [];
    jt.prototype.makePairsUnique = function(t, e) {
        for (var i = Lt, o = Ot, n = Wt, r = t.length, s = 0; s !== r; s++)
            o[s] = t[s],
            n[s] = e[s];
        for (t.length = 0,
        e.length = 0,
        s = 0; s !== r; s++) {
            var a = o[s].id
              , h = n[s].id;
            i[l = a < h ? a + "," + h : h + "," + a] = s,
            i.keys.push(l)
        }
        for (s = 0; s !== i.keys.length; s++) {
            var l = i.keys.pop()
              , p = i[l];
            t.push(o[p]),
            e.push(n[p]),
            delete i[l]
        }
    }
    ,
    jt.prototype.setWorld = function(t) {}
    ;
    var kt = new Pt;
    jt.boundingSphereCheck = function(t, e) {
        var i = kt;
        return t.position.vsub(e.position, i),
        Math.pow(t.shape.boundingSphereRadius + e.shape.boundingSphereRadius, 2) > i.norm2()
    }
    ,
    jt.prototype.aabbQuery = function(t, e, i) {
        return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),
        []
    }
    ;
    var Vt = _t;
    function _t(t, e, i) {
        i = n.defaults(i, {
            collideConnected: !0,
            wakeUpBodies: !0
        }),
        this.equations = [],
        this.bodyA = t,
        this.bodyB = e,
        this.id = _t.idCounter++,
        this.collideConnected = i.collideConnected,
        i.wakeUpBodies && (t && t.wakeUp(),
        e && e.wakeUp())
    }
    _t.prototype.update = function() {
        throw new Error("method update() not implmemented in this Constraint subclass!")
    }
    ,
    _t.prototype.enable = function() {
        for (var t = this.equations, e = 0; e < t.length; e++)
            t[e].enabled = !0
    }
    ,
    _t.prototype.disable = function() {
        for (var t = this.equations, e = 0; e < t.length; e++)
            t[e].enabled = !1
    }
    ,
    _t.idCounter = 0;
    var Ht = Gt
      , Ut = i({});
    function Gt() {
        this.spatial = new Ut,
        this.rotational = new Ut
    }
    Gt.prototype.multiplyElement = function(t) {
        return t.spatial.dot(this.spatial) + t.rotational.dot(this.rotational)
    }
    ,
    Gt.prototype.multiplyVectors = function(t, e) {
        return t.dot(this.spatial) + e.dot(this.rotational)
    }
    ;
    var Dt = Yt
      , Xt = i({});
    function Yt(t, e, i, o) {
        this.id = Yt.id++,
        this.minForce = void 0 === i ? -1e6 : i,
        this.maxForce = void 0 === o ? 1e6 : o,
        this.bi = t,
        this.bj = e,
        this.a = 0,
        this.b = 0,
        this.eps = 0,
        this.jacobianElementA = new Ht,
        this.jacobianElementB = new Ht,
        this.enabled = !0,
        this.multiplier = 0,
        this.setSpookParams(1e7, 4, 1 / 60)
    }
    Yt.prototype.constructor = Yt,
    Yt.id = 0,
    Yt.prototype.setSpookParams = function(t, e, i) {
        var o = e
          , n = t
          , r = i;
        this.a = 4 / (r * (1 + 4 * o)),
        this.b = 4 * o / (1 + 4 * o),
        this.eps = 4 / (r * r * n * (1 + 4 * o))
    }
    ,
    Yt.prototype.computeB = function(t, e, i) {
        var o = this.computeGW();
        return -this.computeGq() * t - o * e - this.computeGiMf() * i
    }
    ,
    Yt.prototype.computeGq = function() {
        var t = this.jacobianElementA
          , e = this.jacobianElementB
          , i = this.bi
          , o = this.bj
          , n = i.position
          , r = o.position;
        return t.spatial.dot(n) + e.spatial.dot(r)
    }
    ,
    new Xt,
    Yt.prototype.computeGW = function() {
        var t = this.jacobianElementA
          , e = this.jacobianElementB
          , i = this.bi
          , o = this.bj
          , n = i.velocity
          , r = o.velocity
          , s = i.angularVelocity
          , a = o.angularVelocity;
        return t.multiplyVectors(n, s) + e.multiplyVectors(r, a)
    }
    ,
    Yt.prototype.computeGWlambda = function() {
        var t = this.jacobianElementA
          , e = this.jacobianElementB
          , i = this.bi
          , o = this.bj
          , n = i.vlambda
          , r = o.vlambda
          , s = i.wlambda
          , a = o.wlambda;
        return t.multiplyVectors(n, s) + e.multiplyVectors(r, a)
    }
    ;
    var Zt = new Xt
      , Kt = new Xt
      , Qt = new Xt
      , Jt = new Xt;
    Yt.prototype.computeGiMf = function() {
        var t = this.jacobianElementA
          , e = this.jacobianElementB
          , i = this.bi
          , o = this.bj
          , n = i.force
          , r = i.torque
          , s = o.force
          , a = o.torque
          , h = i.invMassSolve
          , l = o.invMassSolve;
        return n.scale(h, Zt),
        s.scale(l, Kt),
        i.invInertiaWorldSolve.vmult(r, Qt),
        o.invInertiaWorldSolve.vmult(a, Jt),
        t.multiplyVectors(Zt, Qt) + e.multiplyVectors(Kt, Jt)
    }
    ;
    var $t = new Xt;
    Yt.prototype.computeGiMGt = function() {
        var t = this.jacobianElementA
          , e = this.jacobianElementB
          , i = this.bi
          , o = this.bj
          , n = i.invMassSolve
          , r = o.invMassSolve
          , s = i.invInertiaWorldSolve
          , a = o.invInertiaWorldSolve
          , h = n + r;
        return s.vmult(t.rotational, $t),
        h += $t.dot(t.rotational),
        a.vmult(e.rotational, $t),
        h + $t.dot(e.rotational)
    }
    ;
    var te = new Xt;
    new Xt,
    new Xt,
    new Xt,
    new Xt,
    new Xt,
    Yt.prototype.addToWlambda = function(t) {
        var e = this.jacobianElementA
          , i = this.jacobianElementB
          , o = this.bi
          , n = this.bj
          , r = te;
        o.vlambda.addScaledVector(o.invMassSolve * t, e.spatial, o.vlambda),
        n.vlambda.addScaledVector(n.invMassSolve * t, i.spatial, n.vlambda),
        o.invInertiaWorldSolve.vmult(e.rotational, r),
        o.wlambda.addScaledVector(t, r, o.wlambda),
        n.invInertiaWorldSolve.vmult(i.rotational, r),
        n.wlambda.addScaledVector(t, r, n.wlambda)
    }
    ,
    Yt.prototype.computeC = function() {
        return this.computeGiMGt() + this.eps
    }
    ;
    var ee = oe
      , ie = i({});
    function oe(t, e, i) {
        i = void 0 !== i ? i : 1e6,
        Dt.call(this, t, e, 0, i),
        this.restitution = 0,
        this.ri = new ie,
        this.rj = new ie,
        this.ni = new ie
    }
    o({}),
    oe.prototype = new Dt,
    oe.prototype.constructor = oe;
    var ne = new ie
      , re = new ie
      , se = new ie;
    oe.prototype.computeB = function(t) {
        var e = this.a
          , i = this.b
          , o = this.bi
          , n = this.bj
          , r = this.ri
          , s = this.rj
          , a = ne
          , h = re
          , l = o.velocity
          , p = o.angularVelocity
          , u = (o.force,
        o.torque,
        n.velocity)
          , c = n.angularVelocity
          , d = (n.force,
        n.torque,
        se)
          , v = this.jacobianElementA
          , y = this.jacobianElementB
          , f = this.ni;
        r.cross(f, a),
        s.cross(f, h),
        f.negate(v.spatial),
        a.negate(v.rotational),
        y.spatial.copy(f),
        y.rotational.copy(h),
        d.copy(n.position),
        d.vadd(s, d),
        d.vsub(o.position, d),
        d.vsub(r, d);
        var m = f.dot(d)
          , w = this.restitution + 1;
        return -m * e - (w * u.dot(f) - w * l.dot(f) + c.dot(h) - p.dot(a)) * i - t * this.computeGiMf()
    }
    ;
    var ae = new ie
      , he = new ie
      , le = new ie
      , pe = new ie
      , ue = new ie;
    oe.prototype.getImpactVelocityAlongNormal = function() {
        var t = ae
          , e = he
          , i = le
          , o = pe
          , n = ue;
        return this.bi.position.vadd(this.ri, i),
        this.bj.position.vadd(this.rj, o),
        this.bi.getVelocityAtWorldPoint(i, t),
        this.bj.getVelocityAtWorldPoint(o, e),
        t.vsub(e, n),
        this.ni.dot(n)
    }
    ;
    var ce, de = i({});
    function ve() {
        this.rayFromWorld = new de,
        this.rayToWorld = new de,
        this.hitNormalWorld = new de,
        this.hitPointWorld = new de,
        this.hasHit = !1,
        this.shape = null,
        this.body = null,
        this.hitFaceIndex = -1,
        this.distance = -1,
        this._shouldStop = !1
    }
    ce = ve,
    ve.prototype.reset = function() {
        this.rayFromWorld.setZero(),
        this.rayToWorld.setZero(),
        this.hitNormalWorld.setZero(),
        this.hitPointWorld.setZero(),
        this.hasHit = !1,
        this.shape = null,
        this.body = null,
        this.hitFaceIndex = -1,
        this.distance = -1,
        this._shouldStop = !1
    }
    ,
    ve.prototype.abort = function() {
        this._shouldStop = !0
    }
    ,
    ve.prototype.set = function(t, e, i, o, n, r, s) {
        this.rayFromWorld.copy(t),
        this.rayToWorld.copy(e),
        this.hitNormalWorld.copy(i),
        this.hitPointWorld.copy(o),
        this.shape = n,
        this.body = r,
        this.distance = s
    }
    ;
    var ye = xe
      , fe = i({})
      , me = ce
      , we = e({});
    function xe(t, e) {
        this.from = t ? t.clone() : new fe,
        this.to = e ? e.clone() : new fe,
        this._direction = new fe,
        this.precision = 1e-4,
        this.checkCollisionResponse = !0,
        this.skipBackfaces = !1,
        this.collisionFilterMask = -1,
        this.collisionFilterGroup = -1,
        this.mode = xe.ANY,
        this.result = new me,
        this.hasHit = !1,
        this.callback = function(t) {}
    }
    xe.prototype.constructor = xe,
    xe.CLOSEST = 1,
    xe.ANY = 2,
    xe.ALL = 4;
    var be = new h
      , ge = [];
    xe.prototype.intersectWorld = function(t, e) {
        return this.mode = e.mode || xe.ANY,
        this.result = e.result || new me,
        this.skipBackfaces = !!e.skipBackfaces,
        this.collisionFilterMask = void 0 !== e.collisionFilterMask ? e.collisionFilterMask : -1,
        this.collisionFilterGroup = void 0 !== e.collisionFilterGroup ? e.collisionFilterGroup : -1,
        e.from && this.from.copy(e.from),
        e.to && this.to.copy(e.to),
        this.callback = e.callback || function() {}
        ,
        this.hasHit = !1,
        this.result.reset(),
        this._updateDirection(),
        this.getAABB(be),
        ge.length = 0,
        t.broadphase.aabbQuery(t, be, ge),
        this.intersectBodies(ge),
        this.hasHit
    }
    ;
    var Ee = new fe
      , Be = new fe;
    function ze(t, e, i, o) {
        o.vsub(e, Xe),
        i.vsub(e, Ee),
        t.vsub(e, Be);
        var n, r, s = Xe.dot(Xe), a = Xe.dot(Ee), h = Xe.dot(Be), l = Ee.dot(Ee), p = Ee.dot(Be);
        return (n = l * h - a * p) >= 0 && (r = s * p - a * h) >= 0 && n + r < s * l - a * a
    }
    xe.pointInTriangle = ze;
    var Ae = new fe
      , Fe = new y;
    xe.prototype.intersectBody = function(t, e) {
        e && (this.result = e,
        this._updateDirection());
        var i = this.checkCollisionResponse;
        if ((!i || t.collisionResponse) && 0 != (this.collisionFilterGroup & t.collisionFilterMask) && 0 != (t.collisionFilterGroup & this.collisionFilterMask))
            for (var o = Ae, n = Fe, r = 0, s = t.shapes.length; r < s; r++) {
                var a = t.shapes[r];
                if ((!i || a.collisionResponse) && (t.quaternion.mult(t.shapeOrientations[r], n),
                t.quaternion.vmult(t.shapeOffsets[r], o),
                o.vadd(t.position, o),
                this.intersectShape(a, n, o, t),
                this.result._shouldStop))
                    break
            }
    }
    ,
    xe.prototype.intersectBodies = function(t, e) {
        e && (this.result = e,
        this._updateDirection());
        for (var i = 0, o = t.length; !this.result._shouldStop && i < o; i++)
            this.intersectBody(t[i])
    }
    ,
    xe.prototype._updateDirection = function() {
        this.to.vsub(this.from, this._direction),
        this._direction.normalize()
    }
    ,
    xe.prototype.intersectShape = function(t, e, i, o) {
        if (!(function(t, e, i) {
            i.vsub(t, Xe);
            var o = Xe.dot(e);
            return e.mult(o, Ye),
            Ye.vadd(t, Ye),
            i.distanceTo(Ye)
        }(this.from, this._direction, i) > t.boundingSphereRadius)) {
            var n = this[t.type];
            n && n.call(this, t, e, i, o, t)
        }
    }
    ,
    new fe,
    new fe;
    var Me = new fe
      , Se = new fe
      , qe = new fe
      , Ce = new fe;
    new fe,
    new me,
    xe.prototype.intersectBox = function(t, e, i, o, n) {
        return this.intersectConvex(t.convexPolyhedronRepresentation, e, i, o, n)
    }
    ,
    xe.prototype[we.types.BOX] = xe.prototype.intersectBox,
    xe.prototype.intersectPlane = function(t, e, i, o, n) {
        var r = this.from
          , s = this.to
          , a = this._direction
          , h = new fe(0,0,1);
        e.vmult(h, h);
        var l = new fe;
        r.vsub(i, l);
        var p = l.dot(h);
        if (s.vsub(i, l),
        !(p * l.dot(h) > 0 || r.distanceTo(s) < p)) {
            var u = h.dot(a);
            if (!(Math.abs(u) < this.precision)) {
                var c = new fe
                  , d = new fe
                  , v = new fe;
                r.vsub(i, c);
                var y = -h.dot(c) / u;
                a.scale(y, d),
                r.vadd(d, v),
                this.reportIntersection(h, v, n, o, -1)
            }
        }
    }
    ,
    xe.prototype[we.types.PLANE] = xe.prototype.intersectPlane,
    xe.prototype.getAABB = function(t) {
        var e = this.to
          , i = this.from;
        t.lowerBound.x = Math.min(e.x, i.x),
        t.lowerBound.y = Math.min(e.y, i.y),
        t.lowerBound.z = Math.min(e.z, i.z),
        t.upperBound.x = Math.max(e.x, i.x),
        t.upperBound.y = Math.max(e.y, i.y),
        t.upperBound.z = Math.max(e.z, i.z)
    }
    ;
    var Ne = {
        faceList: [0]
    }
      , Te = new fe
      , Re = new xe
      , Pe = [];
    xe.prototype.intersectHeightfield = function(t, e, i, o, n) {
        t.data,
        t.elementSize;
        var r = Re;
        r.from.copy(this.from),
        r.to.copy(this.to),
        z.pointToLocalFrame(i, e, r.from, r.from),
        z.pointToLocalFrame(i, e, r.to, r.to),
        r._updateDirection();
        var s, a, l, p, u = Pe;
        s = a = 0,
        l = p = t.data.length - 1;
        var c = new h;
        r.getAABB(c),
        t.getIndexOfPosition(c.lowerBound.x, c.lowerBound.y, u, !0),
        s = Math.max(s, u[0]),
        a = Math.max(a, u[1]),
        t.getIndexOfPosition(c.upperBound.x, c.upperBound.y, u, !0),
        l = Math.min(l, u[0] + 1),
        p = Math.min(p, u[1] + 1);
        for (var d = s; d < l; d++)
            for (var v = a; v < p; v++) {
                if (this.result._shouldStop)
                    return;
                if (t.getAabbAtIndex(d, v, c),
                c.overlapsRay(r)) {
                    if (t.getConvexTrianglePillar(d, v, !1),
                    z.pointToWorldFrame(i, e, t.pillarOffset, Te),
                    this.intersectConvex(t.pillarConvex, e, Te, o, n, Ne),
                    this.result._shouldStop)
                        return;
                    t.getConvexTrianglePillar(d, v, !0),
                    z.pointToWorldFrame(i, e, t.pillarOffset, Te),
                    this.intersectConvex(t.pillarConvex, e, Te, o, n, Ne)
                }
            }
    }
    ,
    xe.prototype[we.types.HEIGHTFIELD] = xe.prototype.intersectHeightfield;
    var je = new fe
      , Ie = new fe;
    xe.prototype.intersectSphere = function(t, e, i, o, n) {
        var r = this.from
          , s = this.to
          , a = t.radius
          , h = Math.pow(s.x - r.x, 2) + Math.pow(s.y - r.y, 2) + Math.pow(s.z - r.z, 2)
          , l = 2 * ((s.x - r.x) * (r.x - i.x) + (s.y - r.y) * (r.y - i.y) + (s.z - r.z) * (r.z - i.z))
          , p = Math.pow(r.x - i.x, 2) + Math.pow(r.y - i.y, 2) + Math.pow(r.z - i.z, 2) - Math.pow(a, 2)
          , u = Math.pow(l, 2) - 4 * h * p
          , c = je
          , d = Ie;
        if (!(u < 0))
            if (0 === u)
                r.lerp(s, u, c),
                c.vsub(i, d),
                d.normalize(),
                this.reportIntersection(d, c, n, o, -1);
            else {
                var v = (-l - Math.sqrt(u)) / (2 * h)
                  , y = (-l + Math.sqrt(u)) / (2 * h);
                if (v >= 0 && v <= 1 && (r.lerp(s, v, c),
                c.vsub(i, d),
                d.normalize(),
                this.reportIntersection(d, c, n, o, -1)),
                this.result._shouldStop)
                    return;
                y >= 0 && y <= 1 && (r.lerp(s, y, c),
                c.vsub(i, d),
                d.normalize(),
                this.reportIntersection(d, c, n, o, -1))
            }
    }
    ,
    xe.prototype[we.types.SPHERE] = xe.prototype.intersectSphere;
    var Le = new fe
      , Oe = (new fe,
    new fe,
    new fe);
    xe.prototype.intersectConvex = function(t, e, i, o, n, r) {
        for (var s = Le, a = Oe, h = r && r.faceList || null, l = t.faces, p = t.vertices, u = t.faceNormals, c = this._direction, d = this.from, v = this.to, y = d.distanceTo(v), f = h ? h.length : l.length, m = this.result, w = 0; !m._shouldStop && w < f; w++) {
            var x = h ? h[w] : w
              , b = l[x]
              , g = u[x]
              , E = e
              , B = i;
            a.copy(p[b[0]]),
            E.vmult(a, a),
            a.vadd(B, a),
            a.vsub(d, a),
            E.vmult(g, s);
            var z = c.dot(s);
            if (!(Math.abs(z) < this.precision)) {
                var A = s.dot(a) / z;
                if (!(A < 0)) {
                    c.mult(A, Me),
                    Me.vadd(d, Me),
                    Se.copy(p[b[0]]),
                    E.vmult(Se, Se),
                    B.vadd(Se, Se);
                    for (var F = 1; !m._shouldStop && F < b.length - 1; F++) {
                        qe.copy(p[b[F]]),
                        Ce.copy(p[b[F + 1]]),
                        E.vmult(qe, qe),
                        E.vmult(Ce, Ce),
                        B.vadd(qe, qe),
                        B.vadd(Ce, Ce);
                        var M = Me.distanceTo(d);
                        !ze(Me, Se, qe, Ce) && !ze(Me, qe, Se, Ce) || M > y || this.reportIntersection(s, Me, n, o, x)
                    }
                }
            }
        }
    }
    ,
    xe.prototype[we.types.CONVEXPOLYHEDRON] = xe.prototype.intersectConvex;
    var We = new fe
      , ke = new fe
      , Ve = new fe
      , _e = new fe
      , He = new fe
      , Ue = new fe
      , Ge = (new h,
    [])
      , De = new z;
    xe.prototype.intersectTrimesh = function(t, e, i, o, n, r) {
        var s = We
          , a = Ge
          , h = De
          , l = Oe
          , p = ke
          , u = Ve
          , c = _e
          , d = Ue
          , v = He
          , y = (r && r.faceList,
        t.indices)
          , f = (t.vertices,
        t.faceNormals,
        this.from)
          , m = this.to
          , w = this._direction;
        h.position.copy(i),
        h.quaternion.copy(e),
        z.vectorToLocalFrame(i, e, w, p),
        z.pointToLocalFrame(i, e, f, u),
        z.pointToLocalFrame(i, e, m, c),
        c.x *= t.scale.x,
        c.y *= t.scale.y,
        c.z *= t.scale.z,
        u.x *= t.scale.x,
        u.y *= t.scale.y,
        u.z *= t.scale.z,
        c.vsub(u, p),
        p.normalize();
        var x = u.distanceSquared(c);
        t.tree.rayQuery(this, h, a);
        for (var b = 0, g = a.length; !this.result._shouldStop && b !== g; b++) {
            var E = a[b];
            t.getNormal(E, s),
            t.getVertex(y[3 * E], Se),
            Se.vsub(u, l);
            var B = p.dot(s)
              , A = s.dot(l) / B;
            if (!(A < 0)) {
                p.scale(A, Me),
                Me.vadd(u, Me),
                t.getVertex(y[3 * E + 1], qe),
                t.getVertex(y[3 * E + 2], Ce);
                var F = Me.distanceSquared(u);
                !ze(Me, qe, Se, Ce) && !ze(Me, Se, qe, Ce) || F > x || (z.vectorToWorldFrame(e, s, v),
                z.pointToWorldFrame(i, e, Me, d),
                this.reportIntersection(v, d, n, o, E))
            }
        }
        a.length = 0
    }
    ,
    xe.prototype[we.types.TRIMESH] = xe.prototype.intersectTrimesh,
    xe.prototype.reportIntersection = function(t, e, i, o, n) {
        var r = this.from
          , s = this.to
          , a = r.distanceTo(e)
          , h = this.result;
        if (!(this.skipBackfaces && t.dot(this._direction) > 0))
            switch (h.hitFaceIndex = void 0 !== n ? n : -1,
            this.mode) {
            case xe.ALL:
                this.hasHit = !0,
                h.set(r, s, t, e, i, o, a),
                h.hasHit = !0,
                this.callback(h);
                break;
            case xe.CLOSEST:
                (a < h.distance || !h.hasHit) && (this.hasHit = !0,
                h.hasHit = !0,
                h.set(r, s, t, e, i, o, a));
                break;
            case xe.ANY:
                this.hasHit = !0,
                h.hasHit = !0,
                h.set(r, s, t, e, i, o, a),
                h._shouldStop = !0
            }
    }
    ;
    var Xe = new fe
      , Ye = new fe
      , Ze = {};
    function Ke() {
        this.equations = []
    }
    Ze = Ke,
    Ke.prototype.solve = function(t, e) {
        return 0
    }
    ,
    Ke.prototype.addEquation = function(t) {
        t.enabled && this.equations.push(t)
    }
    ,
    Ke.prototype.removeEquation = function(t) {
        var e = this.equations
          , i = e.indexOf(t);
        -1 !== i && e.splice(i, 1)
    }
    ,
    Ke.prototype.removeAllEquations = function() {
        this.equations.length = 0
    }
    ;
    var Qe = {};
    function Je() {
        this.objects = [],
        this.type = Object
    }
    Qe = Je,
    Je.prototype.release = function() {
        for (var t = arguments.length, e = 0; e !== t; e++)
            this.objects.push(arguments[e]);
        return this
    }
    ,
    Je.prototype.get = function() {
        return 0 === this.objects.length ? this.constructObject() : this.objects.pop()
    }
    ,
    Je.prototype.constructObject = function() {
        throw new Error("constructObject() not implemented in this Pool subclass yet!")
    }
    ,
    Je.prototype.resize = function(t) {
        for (var e = this.objects; e.length > t; )
            e.pop();
        for (; e.length < t; )
            e.push(this.constructObject());
        return this
    }
    ;
    var $e = ei
      , ti = i({});
    function ei() {
        Qe.call(this),
        this.type = ti
    }
    ei.prototype = new Qe,
    ei.prototype.constructObject = function() {
        return new ti
    }
    ;
    var ii = ni
      , oi = i({});
    function ni(t, e, i) {
        Dt.call(this, t, e, -i, i),
        this.ri = new oi,
        this.rj = new oi,
        this.t = new oi
    }
    o({}),
    ni.prototype = new Dt,
    ni.prototype.constructor = ni;
    var ri = new oi
      , si = new oi;
    ni.prototype.computeB = function(t) {
        this.a;
        var e = this.b
          , i = (this.bi,
        this.bj,
        this.ri)
          , o = this.rj
          , n = ri
          , r = si
          , s = this.t;
        i.cross(s, n),
        o.cross(s, r);
        var a = this.jacobianElementA
          , h = this.jacobianElementB;
        return s.negate(a.spatial),
        n.negate(a.rotational),
        h.spatial.copy(s),
        h.rotational.copy(r),
        -this.computeGW() * e - t * this.computeGiMf()
    }
    ;
    var ai = ci
      , hi = e({})
      , li = i({})
      , pi = y
      , ui = $e;
    function ci(t) {
        this.contactPointPool = [],
        this.frictionEquationPool = [],
        this.result = [],
        this.frictionResult = [],
        this.v3pool = new ui,
        this.world = t,
        this.currentContactMaterial = null,
        this.enableFrictionReduction = !1
    }
    ci.prototype.createContactEquation = function(t, e, i, o, n, r) {
        var s;
        this.contactPointPool.length ? ((s = this.contactPointPool.pop()).bi = t,
        s.bj = e) : s = new ee(t,e),
        s.enabled = t.collisionResponse && e.collisionResponse && i.collisionResponse && o.collisionResponse;
        var a = this.currentContactMaterial;
        s.restitution = a.restitution,
        s.setSpookParams(a.contactEquationStiffness, a.contactEquationRelaxation, this.world.dt);
        var h = i.material || t.material
          , l = o.material || e.material;
        return h && l && h.restitution >= 0 && l.restitution >= 0 && (s.restitution = h.restitution * l.restitution),
        s.si = n || i,
        s.sj = r || o,
        s
    }
    ,
    ci.prototype.createFrictionEquationsFromContact = function(t, e) {
        var i = t.bi
          , o = t.bj
          , n = t.si
          , r = t.sj
          , s = this.world
          , a = this.currentContactMaterial
          , h = a.friction
          , l = n.material || i.material
          , p = r.material || o.material;
        if (l && p && l.friction >= 0 && p.friction >= 0 && (h = l.friction * p.friction),
        h > 0) {
            var u = h * s.gravity.length()
              , c = i.invMass + o.invMass;
            c > 0 && (c = 1 / c);
            var d = this.frictionEquationPool
              , v = d.length ? d.pop() : new ii(i,o,u * c)
              , y = d.length ? d.pop() : new ii(i,o,u * c);
            return v.bi = y.bi = i,
            v.bj = y.bj = o,
            v.minForce = y.minForce = -u * c,
            v.maxForce = y.maxForce = u * c,
            v.ri.copy(t.ri),
            v.rj.copy(t.rj),
            y.ri.copy(t.ri),
            y.rj.copy(t.rj),
            t.ni.tangents(v.t, y.t),
            v.setSpookParams(a.frictionEquationStiffness, a.frictionEquationRelaxation, s.dt),
            y.setSpookParams(a.frictionEquationStiffness, a.frictionEquationRelaxation, s.dt),
            v.enabled = y.enabled = t.enabled,
            e.push(v, y),
            !0
        }
        return !1
    }
    ;
    var di = new li
      , vi = new li
      , yi = new li;
    ci.prototype.createFrictionFromAverage = function(t) {
        var e = this.result[this.result.length - 1];
        if (this.createFrictionEquationsFromContact(e, this.frictionResult) && 1 !== t) {
            var i = this.frictionResult[this.frictionResult.length - 2]
              , o = this.frictionResult[this.frictionResult.length - 1];
            di.setZero(),
            vi.setZero(),
            yi.setZero();
            for (var n = e.bi, r = (e.bj,
            0); r !== t; r++)
                (e = this.result[this.result.length - 1 - r]).bodyA !== n ? (di.vadd(e.ni, di),
                vi.vadd(e.ri, vi),
                yi.vadd(e.rj, yi)) : (di.vsub(e.ni, di),
                vi.vadd(e.rj, vi),
                yi.vadd(e.ri, yi));
            var s = 1 / t;
            vi.scale(s, i.ri),
            yi.scale(s, i.rj),
            o.ri.copy(i.ri),
            o.rj.copy(i.rj),
            di.normalize(),
            di.tangents(i.t, o.t)
        }
    }
    ;
    var fi = new li
      , mi = new li
      , wi = new pi
      , xi = new pi;
    ci.prototype.getContacts = function(t, e, i, o, n, r, s) {
        this.contactPointPool = n,
        this.frictionEquationPool = s,
        this.result = o,
        this.frictionResult = r;
        for (var a = wi, h = xi, l = fi, p = mi, u = 0, c = t.length; u !== c; u++) {
            var d = t[u]
              , v = e[u]
              , y = null;
            d.material && v.material && (y = i.getContactMaterial(d.material, v.material) || null);
            for (var f = d.type & ut.KINEMATIC && v.type & ut.STATIC || d.type & ut.STATIC && v.type & ut.KINEMATIC || d.type & ut.KINEMATIC && v.type & ut.KINEMATIC, m = 0; m < d.shapes.length; m++) {
                d.quaternion.mult(d.shapeOrientations[m], a),
                d.quaternion.vmult(d.shapeOffsets[m], l),
                l.vadd(d.position, l);
                for (var w = d.shapes[m], x = 0; x < v.shapes.length; x++) {
                    v.quaternion.mult(v.shapeOrientations[x], h),
                    v.quaternion.vmult(v.shapeOffsets[x], p),
                    p.vadd(v.position, p);
                    var b = v.shapes[x];
                    if (w.collisionFilterMask & b.collisionFilterGroup && b.collisionFilterMask & w.collisionFilterGroup && !(l.distanceTo(p) > w.boundingSphereRadius + b.boundingSphereRadius)) {
                        var g = null;
                        w.material && b.material && (g = i.getContactMaterial(w.material, b.material) || null),
                        this.currentContactMaterial = g || y || i.defaultContactMaterial;
                        var E = this[w.type | b.type];
                        E && (w.type < b.type ? E.call(this, w, b, l, p, a, h, d, v, w, b, f) : E.call(this, b, w, p, l, h, a, v, d, w, b, f)) && f && (i.shapeOverlapKeeper.set(w.id, b.id),
                        i.bodyOverlapKeeper.set(d.id, v.id))
                    }
                }
            }
        }
    }
    ,
    ci.prototype[hi.types.BOX | hi.types.BOX] = ci.prototype.boxBox = function(t, e, i, o, n, r, s, a, h, l, p) {
        return t.convexPolyhedronRepresentation.material = t.material,
        e.convexPolyhedronRepresentation.material = e.material,
        t.convexPolyhedronRepresentation.collisionResponse = t.collisionResponse,
        e.convexPolyhedronRepresentation.collisionResponse = e.collisionResponse,
        this.convexConvex(t.convexPolyhedronRepresentation, e.convexPolyhedronRepresentation, i, o, n, r, s, a, t, e, p)
    }
    ,
    ci.prototype[hi.types.BOX | hi.types.CONVEXPOLYHEDRON] = ci.prototype.boxConvex = function(t, e, i, o, n, r, s, a, h, l, p) {
        return t.convexPolyhedronRepresentation.material = t.material,
        t.convexPolyhedronRepresentation.collisionResponse = t.collisionResponse,
        this.convexConvex(t.convexPolyhedronRepresentation, e, i, o, n, r, s, a, t, e, p)
    }
    ,
    ci.prototype[hi.types.BOX | hi.types.PARTICLE] = ci.prototype.boxParticle = function(t, e, i, o, n, r, s, a, h, l, p) {
        return t.convexPolyhedronRepresentation.material = t.material,
        t.convexPolyhedronRepresentation.collisionResponse = t.collisionResponse,
        this.convexParticle(t.convexPolyhedronRepresentation, e, i, o, n, r, s, a, t, e, p)
    }
    ,
    ci.prototype[hi.types.SPHERE] = ci.prototype.sphereSphere = function(t, e, i, o, n, r, s, a, h, l, p) {
        if (p)
            return i.distanceSquared(o) < Math.pow(t.radius + e.radius, 2);
        var u = this.createContactEquation(s, a, t, e, h, l);
        o.vsub(i, u.ni),
        u.ni.normalize(),
        u.ri.copy(u.ni),
        u.rj.copy(u.ni),
        u.ri.mult(t.radius, u.ri),
        u.rj.mult(-e.radius, u.rj),
        u.ri.vadd(i, u.ri),
        u.ri.vsub(s.position, u.ri),
        u.rj.vadd(o, u.rj),
        u.rj.vsub(a.position, u.rj),
        this.result.push(u),
        this.createFrictionEquationsFromContact(u, this.frictionResult)
    }
    ;
    var bi = new li
      , gi = new li
      , Ei = new li;
    ci.prototype[hi.types.PLANE | hi.types.TRIMESH] = ci.prototype.planeTrimesh = function(t, e, i, o, n, r, s, a, h, l, p) {
        var u = new li
          , c = bi;
        c.set(0, 0, 1),
        n.vmult(c, c);
        for (var d = 0; d < e.vertices.length / 3; d++) {
            e.getVertex(d, u);
            var v = new li;
            v.copy(u),
            z.pointToWorldFrame(o, r, v, u);
            var y = gi;
            if (u.vsub(i, y),
            c.dot(y) <= 0) {
                if (p)
                    return !0;
                var f = this.createContactEquation(s, a, t, e, h, l);
                f.ni.copy(c);
                var m = Ei;
                c.scale(y.dot(c), m),
                u.vsub(m, m),
                f.ri.copy(m),
                f.ri.vsub(s.position, f.ri),
                f.rj.copy(u),
                f.rj.vsub(a.position, f.rj),
                this.result.push(f),
                this.createFrictionEquationsFromContact(f, this.frictionResult)
            }
        }
    }
    ;
    var Bi = new li
      , zi = new li
      , Ai = (new li,
    new li)
      , Fi = new li
      , Mi = new li
      , Si = new li
      , qi = new li
      , Ci = new li
      , Ni = new li
      , Ti = new li
      , Ri = new li
      , Pi = new li
      , ji = new li
      , Ii = new h
      , Li = [];
    ci.prototype[hi.types.SPHERE | hi.types.TRIMESH] = ci.prototype.sphereTrimesh = function(t, e, i, o, n, r, s, a, h, l, p) {
        var u = Mi
          , c = Si
          , d = qi
          , v = Ci
          , y = Ni
          , f = Ti
          , m = Ii
          , w = Fi
          , x = zi
          , b = Li;
        z.pointToLocalFrame(o, r, i, y);
        var g = t.radius;
        m.lowerBound.set(y.x - g, y.y - g, y.z - g),
        m.upperBound.set(y.x + g, y.y + g, y.z + g),
        e.getTrianglesInAABB(m, b);
        for (var E = Ai, B = t.radius * t.radius, A = 0; A < b.length; A++)
            for (var F = 0; F < 3; F++)
                if (e.getVertex(e.indices[3 * b[A] + F], E),
                E.vsub(y, x),
                x.norm2() <= B) {
                    if (w.copy(E),
                    z.pointToWorldFrame(o, r, w, E),
                    E.vsub(i, x),
                    p)
                        return !0;
                    (q = this.createContactEquation(s, a, t, e, h, l)).ni.copy(x),
                    q.ni.normalize(),
                    q.ri.copy(q.ni),
                    q.ri.scale(t.radius, q.ri),
                    q.ri.vadd(i, q.ri),
                    q.ri.vsub(s.position, q.ri),
                    q.rj.copy(E),
                    q.rj.vsub(a.position, q.rj),
                    this.result.push(q),
                    this.createFrictionEquationsFromContact(q, this.frictionResult)
                }
        for (A = 0; A < b.length; A++)
            for (F = 0; F < 3; F++) {
                e.getVertex(e.indices[3 * b[A] + F], u),
                e.getVertex(e.indices[3 * b[A] + (F + 1) % 3], c),
                c.vsub(u, d),
                y.vsub(c, f);
                var M = f.dot(d);
                y.vsub(u, f);
                var S = f.dot(d);
                if (S > 0 && M < 0 && (y.vsub(u, f),
                v.copy(d),
                v.normalize(),
                S = f.dot(v),
                v.scale(S, f),
                f.vadd(u, f),
                (j = f.distanceTo(y)) < t.radius)) {
                    if (p)
                        return !0;
                    var q = this.createContactEquation(s, a, t, e, h, l);
                    f.vsub(y, q.ni),
                    q.ni.normalize(),
                    q.ni.scale(t.radius, q.ri),
                    z.pointToWorldFrame(o, r, f, f),
                    f.vsub(a.position, q.rj),
                    z.vectorToWorldFrame(r, q.ni, q.ni),
                    z.vectorToWorldFrame(r, q.ri, q.ri),
                    this.result.push(q),
                    this.createFrictionEquationsFromContact(q, this.frictionResult)
                }
            }
        for (var C = Ri, N = Pi, T = ji, R = Bi, P = (A = 0,
        b.length); A !== P; A++) {
            e.getTriangleVertices(b[A], C, N, T),
            e.getNormal(b[A], R),
            y.vsub(C, f);
            var j = f.dot(R);
            if (R.scale(j, f),
            y.vsub(f, f),
            j = f.distanceTo(y),
            ye.pointInTriangle(f, C, N, T) && j < t.radius) {
                if (p)
                    return !0;
                q = this.createContactEquation(s, a, t, e, h, l),
                f.vsub(y, q.ni),
                q.ni.normalize(),
                q.ni.scale(t.radius, q.ri),
                z.pointToWorldFrame(o, r, f, f),
                f.vsub(a.position, q.rj),
                z.vectorToWorldFrame(r, q.ni, q.ni),
                z.vectorToWorldFrame(r, q.ri, q.ri),
                this.result.push(q),
                this.createFrictionEquationsFromContact(q, this.frictionResult)
            }
        }
        b.length = 0
    }
    ;
    var Oi = new li
      , Wi = new li;
    ci.prototype[hi.types.SPHERE | hi.types.PLANE] = ci.prototype.spherePlane = function(t, e, i, o, n, r, s, a, h, l, p) {
        var u = this.createContactEquation(s, a, t, e, h, l);
        if (u.ni.set(0, 0, 1),
        r.vmult(u.ni, u.ni),
        u.ni.negate(u.ni),
        u.ni.normalize(),
        u.ni.mult(t.radius, u.ri),
        i.vsub(o, Oi),
        u.ni.mult(u.ni.dot(Oi), Wi),
        Oi.vsub(Wi, u.rj),
        -Oi.dot(u.ni) <= t.radius) {
            if (p)
                return !0;
            var c = u.ri
              , d = u.rj;
            c.vadd(i, c),
            c.vsub(s.position, c),
            d.vadd(o, d),
            d.vsub(a.position, d),
            this.result.push(u),
            this.createFrictionEquationsFromContact(u, this.frictionResult)
        }
    }
    ;
    var ki = new li
      , Vi = new li
      , _i = new li;
    function Hi(t, e, i) {
        for (var o = null, n = t.length, r = 0; r !== n; r++) {
            var s = t[r]
              , a = ki;
            t[(r + 1) % n].vsub(s, a);
            var h = Vi;
            a.cross(e, h);
            var l = _i;
            i.vsub(s, l);
            var p = h.dot(l);
            if (!(null === o || p > 0 && !0 === o || p <= 0 && !1 === o))
                return !1;
            null === o && (o = p > 0)
        }
        return !0
    }
    var Ui = new li
      , Gi = new li
      , Di = new li
      , Xi = new li
      , Yi = [new li, new li, new li, new li, new li, new li]
      , Zi = new li
      , Ki = new li
      , Qi = new li
      , Ji = new li;
    ci.prototype[hi.types.SPHERE | hi.types.BOX] = ci.prototype.sphereBox = function(t, e, i, o, n, r, s, a, h, l, p) {
        var u = this.v3pool
          , c = Yi;
        i.vsub(o, Ui),
        e.getSideNormals(c, r);
        for (var d = t.radius, v = !1, y = Ki, f = Qi, m = Ji, w = null, x = 0, b = 0, g = 0, E = null, B = 0, z = c.length; B !== z && !1 === v; B++) {
            var A = Gi;
            A.copy(c[B]);
            var F = A.norm();
            A.normalize();
            var M = Ui.dot(A);
            if (M < F + d && M > 0) {
                var S = Di
                  , q = Xi;
                S.copy(c[(B + 1) % 3]),
                q.copy(c[(B + 2) % 3]);
                var C = S.norm()
                  , N = q.norm();
                S.normalize(),
                q.normalize();
                var T = Ui.dot(S)
                  , R = Ui.dot(q);
                if (T < C && T > -C && R < N && R > -N) {
                    var P = Math.abs(M - F - d);
                    if ((null === E || P < E) && (E = P,
                    b = T,
                    g = R,
                    w = F,
                    y.copy(A),
                    f.copy(S),
                    m.copy(q),
                    x++,
                    p))
                        return !0
                }
            }
        }
        if (x) {
            v = !0;
            var j = this.createContactEquation(s, a, t, e, h, l);
            y.mult(-d, j.ri),
            j.ni.copy(y),
            j.ni.negate(j.ni),
            y.mult(w, y),
            f.mult(b, f),
            y.vadd(f, y),
            m.mult(g, m),
            y.vadd(m, j.rj),
            j.ri.vadd(i, j.ri),
            j.ri.vsub(s.position, j.ri),
            j.rj.vadd(o, j.rj),
            j.rj.vsub(a.position, j.rj),
            this.result.push(j),
            this.createFrictionEquationsFromContact(j, this.frictionResult)
        }
        for (var I = u.get(), L = Zi, O = 0; 2 !== O && !v; O++)
            for (var W = 0; 2 !== W && !v; W++)
                for (var k = 0; 2 !== k && !v; k++)
                    if (I.set(0, 0, 0),
                    O ? I.vadd(c[0], I) : I.vsub(c[0], I),
                    W ? I.vadd(c[1], I) : I.vsub(c[1], I),
                    k ? I.vadd(c[2], I) : I.vsub(c[2], I),
                    o.vadd(I, L),
                    L.vsub(i, L),
                    L.norm2() < d * d) {
                        if (p)
                            return !0;
                        v = !0,
                        (j = this.createContactEquation(s, a, t, e, h, l)).ri.copy(L),
                        j.ri.normalize(),
                        j.ni.copy(j.ri),
                        j.ri.mult(d, j.ri),
                        j.rj.copy(I),
                        j.ri.vadd(i, j.ri),
                        j.ri.vsub(s.position, j.ri),
                        j.rj.vadd(o, j.rj),
                        j.rj.vsub(a.position, j.rj),
                        this.result.push(j),
                        this.createFrictionEquationsFromContact(j, this.frictionResult)
                    }
        u.release(I),
        I = null;
        var V = u.get()
          , _ = u.get()
          , H = (j = u.get(),
        u.get())
          , U = (P = u.get(),
        c.length);
        for (O = 0; O !== U && !v; O++)
            for (W = 0; W !== U && !v; W++)
                if (O % 3 != W % 3) {
                    c[W].cross(c[O], V),
                    V.normalize(),
                    c[O].vadd(c[W], _),
                    j.copy(i),
                    j.vsub(_, j),
                    j.vsub(o, j);
                    var G = j.dot(V);
                    for (V.mult(G, H),
                    k = 0; k === O % 3 || k === W % 3; )
                        k++;
                    P.copy(i),
                    P.vsub(H, P),
                    P.vsub(_, P),
                    P.vsub(o, P);
                    var D = Math.abs(G)
                      , X = P.norm();
                    if (D < c[k].norm() && X < d) {
                        if (p)
                            return !0;
                        v = !0;
                        var Y = this.createContactEquation(s, a, t, e, h, l);
                        _.vadd(H, Y.rj),
                        Y.rj.copy(Y.rj),
                        P.negate(Y.ni),
                        Y.ni.normalize(),
                        Y.ri.copy(Y.rj),
                        Y.ri.vadd(o, Y.ri),
                        Y.ri.vsub(i, Y.ri),
                        Y.ri.normalize(),
                        Y.ri.mult(d, Y.ri),
                        Y.ri.vadd(i, Y.ri),
                        Y.ri.vsub(s.position, Y.ri),
                        Y.rj.vadd(o, Y.rj),
                        Y.rj.vsub(a.position, Y.rj),
                        this.result.push(Y),
                        this.createFrictionEquationsFromContact(Y, this.frictionResult)
                    }
                }
        u.release(V, _, j, H, P)
    }
    ;
    var $i = new li
      , to = new li
      , eo = new li
      , io = new li
      , oo = new li
      , no = new li
      , ro = new li
      , so = new li
      , ao = new li
      , ho = new li;
    ci.prototype[hi.types.SPHERE | hi.types.CONVEXPOLYHEDRON] = ci.prototype.sphereConvex = function(t, e, i, o, n, r, s, a, h, l, p) {
        var u = this.v3pool;
        i.vsub(o, $i);
        for (var c = e.faceNormals, d = e.faces, v = e.vertices, y = t.radius, f = 0; f !== v.length; f++) {
            var m = v[f]
              , w = oo;
            r.vmult(m, w),
            o.vadd(w, w);
            var x = io;
            if (w.vsub(i, x),
            x.norm2() < y * y)
                return !!p || (b = !0,
                (P = this.createContactEquation(s, a, t, e, h, l)).ri.copy(x),
                P.ri.normalize(),
                P.ni.copy(P.ri),
                P.ri.mult(y, P.ri),
                w.vsub(o, P.rj),
                P.ri.vadd(i, P.ri),
                P.ri.vsub(s.position, P.ri),
                P.rj.vadd(o, P.rj),
                P.rj.vsub(a.position, P.rj),
                this.result.push(P),
                void this.createFrictionEquationsFromContact(P, this.frictionResult))
        }
        for (var b = !1, g = (f = 0,
        d.length); f !== g && !1 === b; f++) {
            var E = c[f]
              , B = d[f]
              , z = no;
            r.vmult(E, z);
            var A = ro;
            r.vmult(v[B[0]], A),
            A.vadd(o, A);
            var F = so;
            z.mult(-y, F),
            i.vadd(F, F);
            var M = ao;
            F.vsub(A, M);
            var S = M.dot(z)
              , q = ho;
            if (i.vsub(A, q),
            S < 0 && q.dot(z) > 0) {
                for (var C = [], N = 0, T = B.length; N !== T; N++) {
                    var R = u.get();
                    r.vmult(v[B[N]], R),
                    o.vadd(R, R),
                    C.push(R)
                }
                if (Hi(C, z, i)) {
                    if (p)
                        return !0;
                    b = !0;
                    var P = this.createContactEquation(s, a, t, e, h, l);
                    z.mult(-y, P.ri),
                    z.negate(P.ni);
                    var j = u.get();
                    z.mult(-S, j);
                    var I = u.get();
                    z.mult(-y, I),
                    i.vsub(o, P.rj),
                    P.rj.vadd(I, P.rj),
                    P.rj.vadd(j, P.rj),
                    P.rj.vadd(o, P.rj),
                    P.rj.vsub(a.position, P.rj),
                    P.ri.vadd(i, P.ri),
                    P.ri.vsub(s.position, P.ri),
                    u.release(j),
                    u.release(I),
                    this.result.push(P),
                    this.createFrictionEquationsFromContact(P, this.frictionResult),
                    N = 0;
                    for (var L = C.length; N !== L; N++)
                        u.release(C[N]);
                    return
                }
                for (N = 0; N !== B.length; N++) {
                    var O = u.get()
                      , W = u.get();
                    r.vmult(v[B[(N + 1) % B.length]], O),
                    r.vmult(v[B[(N + 2) % B.length]], W),
                    o.vadd(O, O),
                    o.vadd(W, W);
                    var k = to;
                    W.vsub(O, k);
                    var V = eo;
                    k.unit(V);
                    var _ = u.get()
                      , H = u.get();
                    i.vsub(O, H);
                    var U = H.dot(V);
                    V.mult(U, _),
                    _.vadd(O, _);
                    var G = u.get();
                    if (_.vsub(i, G),
                    U > 0 && U * U < k.norm2() && G.norm2() < y * y) {
                        if (p)
                            return !0;
                        for (P = this.createContactEquation(s, a, t, e, h, l),
                        _.vsub(o, P.rj),
                        _.vsub(i, P.ni),
                        P.ni.normalize(),
                        P.ni.mult(y, P.ri),
                        P.rj.vadd(o, P.rj),
                        P.rj.vsub(a.position, P.rj),
                        P.ri.vadd(i, P.ri),
                        P.ri.vsub(s.position, P.ri),
                        this.result.push(P),
                        this.createFrictionEquationsFromContact(P, this.frictionResult),
                        N = 0,
                        L = C.length; N !== L; N++)
                            u.release(C[N]);
                        return u.release(O),
                        u.release(W),
                        u.release(_),
                        u.release(G),
                        void u.release(H)
                    }
                    u.release(O),
                    u.release(W),
                    u.release(_),
                    u.release(G),
                    u.release(H)
                }
                for (N = 0,
                L = C.length; N !== L; N++)
                    u.release(C[N])
            }
        }
    }
    ,
    new li,
    new li,
    ci.prototype[hi.types.PLANE | hi.types.BOX] = ci.prototype.planeBox = function(t, e, i, o, n, r, s, a, h, l, p) {
        return e.convexPolyhedronRepresentation.material = e.material,
        e.convexPolyhedronRepresentation.collisionResponse = e.collisionResponse,
        e.convexPolyhedronRepresentation.id = e.id,
        this.planeConvex(t, e.convexPolyhedronRepresentation, i, o, n, r, s, a, t, e, p)
    }
    ;
    var lo = new li
      , po = new li
      , uo = new li
      , co = new li;
    ci.prototype[hi.types.PLANE | hi.types.CONVEXPOLYHEDRON] = ci.prototype.planeConvex = function(t, e, i, o, n, r, s, a, h, l, p) {
        var u = lo
          , c = po;
        c.set(0, 0, 1),
        n.vmult(c, c);
        for (var d = 0, v = uo, y = 0; y !== e.vertices.length; y++)
            if (u.copy(e.vertices[y]),
            r.vmult(u, u),
            o.vadd(u, u),
            u.vsub(i, v),
            c.dot(v) <= 0) {
                if (p)
                    return !0;
                var f = this.createContactEquation(s, a, t, e, h, l)
                  , m = co;
                c.mult(c.dot(v), m),
                u.vsub(m, m),
                m.vsub(i, f.ri),
                f.ni.copy(c),
                u.vsub(o, f.rj),
                f.ri.vadd(i, f.ri),
                f.ri.vsub(s.position, f.ri),
                f.rj.vadd(o, f.rj),
                f.rj.vsub(a.position, f.rj),
                this.result.push(f),
                d++,
                this.enableFrictionReduction || this.createFrictionEquationsFromContact(f, this.frictionResult)
            }
        this.enableFrictionReduction && d && this.createFrictionFromAverage(d)
    }
    ;
    var vo = new li
      , yo = new li;
    ci.prototype[hi.types.CONVEXPOLYHEDRON] = ci.prototype.convexConvex = function(t, e, i, o, n, r, s, a, h, l, p, u, c) {
        var d = vo;
        if (!(i.distanceTo(o) > t.boundingSphereRadius + e.boundingSphereRadius) && t.findSeparatingAxis(e, i, n, o, r, d, u, c)) {
            var v = []
              , y = yo;
            t.clipAgainstHull(i, n, e, o, r, d, -100, 100, v);
            for (var f = 0, m = 0; m !== v.length; m++) {
                if (p)
                    return !0;
                var w = this.createContactEquation(s, a, t, e, h, l)
                  , x = w.ri
                  , b = w.rj;
                d.negate(w.ni),
                v[m].normal.negate(y),
                y.mult(v[m].depth, y),
                v[m].point.vadd(y, x),
                b.copy(v[m].point),
                x.vsub(i, x),
                b.vsub(o, b),
                x.vadd(i, x),
                x.vsub(s.position, x),
                b.vadd(o, b),
                b.vsub(a.position, b),
                this.result.push(w),
                f++,
                this.enableFrictionReduction || this.createFrictionEquationsFromContact(w, this.frictionResult)
            }
            this.enableFrictionReduction && f && this.createFrictionFromAverage(f)
        }
    }
    ;
    var fo = new li
      , mo = new li
      , wo = new li;
    ci.prototype[hi.types.PLANE | hi.types.PARTICLE] = ci.prototype.planeParticle = function(t, e, i, o, n, r, s, a, h, l, p) {
        var u = fo;
        u.set(0, 0, 1),
        s.quaternion.vmult(u, u);
        var c = mo;
        if (o.vsub(s.position, c),
        u.dot(c) <= 0) {
            if (p)
                return !0;
            var d = this.createContactEquation(a, s, e, t, h, l);
            d.ni.copy(u),
            d.ni.negate(d.ni),
            d.ri.set(0, 0, 0);
            var v = wo;
            u.mult(u.dot(o), v),
            o.vsub(v, v),
            d.rj.copy(v),
            this.result.push(d),
            this.createFrictionEquationsFromContact(d, this.frictionResult)
        }
    }
    ;
    var xo = new li;
    ci.prototype[hi.types.PARTICLE | hi.types.SPHERE] = ci.prototype.sphereParticle = function(t, e, i, o, n, r, s, a, h, l, p) {
        var u = xo;
        if (u.set(0, 0, 1),
        o.vsub(i, u),
        u.norm2() <= t.radius * t.radius) {
            if (p)
                return !0;
            var c = this.createContactEquation(a, s, e, t, h, l);
            u.normalize(),
            c.rj.copy(u),
            c.rj.mult(t.radius, c.rj),
            c.ni.copy(u),
            c.ni.negate(c.ni),
            c.ri.set(0, 0, 0),
            this.result.push(c),
            this.createFrictionEquationsFromContact(c, this.frictionResult)
        }
    }
    ;
    var bo = new pi
      , go = new li
      , Eo = (new li,
    new li)
      , Bo = new li
      , zo = new li;
    ci.prototype[hi.types.PARTICLE | hi.types.CONVEXPOLYHEDRON] = ci.prototype.convexParticle = function(t, e, i, o, n, r, s, a, h, l, p) {
        var u = -1
          , c = Eo
          , d = zo
          , v = null
          , y = go;
        if (y.copy(o),
        y.vsub(i, y),
        n.conjugate(bo),
        bo.vmult(y, y),
        t.pointIsInside(y)) {
            t.worldVerticesNeedsUpdate && t.computeWorldVertices(i, n),
            t.worldFaceNormalsNeedsUpdate && t.computeWorldFaceNormals(n);
            for (var f = 0, m = t.faces.length; f !== m; f++) {
                var w = [t.worldVertices[t.faces[f][0]]]
                  , x = t.worldFaceNormals[f];
                o.vsub(w[0], Bo);
                var b = -x.dot(Bo);
                if (null === v || Math.abs(b) < Math.abs(v)) {
                    if (p)
                        return !0;
                    v = b,
                    u = f,
                    c.copy(x)
                }
            }
            if (-1 !== u) {
                var g = this.createContactEquation(a, s, e, t, h, l);
                c.mult(v, d),
                d.vadd(o, d),
                d.vsub(i, d),
                g.rj.copy(d),
                c.negate(g.ni),
                g.ri.set(0, 0, 0);
                var E = g.ri
                  , B = g.rj;
                E.vadd(o, E),
                E.vsub(a.position, E),
                B.vadd(i, B),
                B.vsub(s.position, B),
                this.result.push(g),
                this.createFrictionEquationsFromContact(g, this.frictionResult)
            } else
                console.warn("Point found inside convex, but did not find penetrating face!")
        }
    }
    ,
    ci.prototype[hi.types.BOX | hi.types.HEIGHTFIELD] = ci.prototype.boxHeightfield = function(t, e, i, o, n, r, s, a, h, l, p) {
        return t.convexPolyhedronRepresentation.material = t.material,
        t.convexPolyhedronRepresentation.collisionResponse = t.collisionResponse,
        this.convexHeightfield(t.convexPolyhedronRepresentation, e, i, o, n, r, s, a, t, e, p)
    }
    ;
    var Ao = new li
      , Fo = new li
      , Mo = [0];
    ci.prototype[hi.types.CONVEXPOLYHEDRON | hi.types.HEIGHTFIELD] = ci.prototype.convexHeightfield = function(t, e, i, o, n, r, s, a, h, l, p) {
        var u = e.data
          , c = e.elementSize
          , d = t.boundingSphereRadius
          , v = Fo
          , y = Mo
          , f = Ao;
        z.pointToLocalFrame(o, r, i, f);
        var m = Math.floor((f.x - d) / c) - 1
          , w = Math.ceil((f.x + d) / c) + 1
          , x = Math.floor((f.y - d) / c) - 1
          , b = Math.ceil((f.y + d) / c) + 1;
        if (!(w < 0 || b < 0 || m > u.length || x > u[0].length)) {
            m < 0 && (m = 0),
            w < 0 && (w = 0),
            x < 0 && (x = 0),
            b < 0 && (b = 0),
            m >= u.length && (m = u.length - 1),
            w >= u.length && (w = u.length - 1),
            b >= u[0].length && (b = u[0].length - 1),
            x >= u[0].length && (x = u[0].length - 1);
            var g = [];
            e.getRectMinMax(m, x, w, b, g);
            var E = g[0]
              , B = g[1];
            if (!(f.z - d > B || f.z + d < E))
                for (var A = m; A < w; A++)
                    for (var F = x; F < b; F++) {
                        var M = !1;
                        if (e.getConvexTrianglePillar(A, F, !1),
                        z.pointToWorldFrame(o, r, e.pillarOffset, v),
                        i.distanceTo(v) < e.pillarConvex.boundingSphereRadius + t.boundingSphereRadius && (M = this.convexConvex(t, e.pillarConvex, i, v, n, r, s, a, null, null, p, y, null)),
                        p && M)
                            return !0;
                        if (e.getConvexTrianglePillar(A, F, !0),
                        z.pointToWorldFrame(o, r, e.pillarOffset, v),
                        i.distanceTo(v) < e.pillarConvex.boundingSphereRadius + t.boundingSphereRadius && (M = this.convexConvex(t, e.pillarConvex, i, v, n, r, s, a, null, null, p, y, null)),
                        p && M)
                            return !0
                    }
        }
    }
    ;
    var So = new li
      , qo = new li;
    ci.prototype[hi.types.SPHERE | hi.types.HEIGHTFIELD] = ci.prototype.sphereHeightfield = function(t, e, i, o, n, r, s, a, h, l, p) {
        var u = e.data
          , c = t.radius
          , d = e.elementSize
          , v = qo
          , y = So;
        z.pointToLocalFrame(o, r, i, y);
        var f = Math.floor((y.x - c) / d) - 1
          , m = Math.ceil((y.x + c) / d) + 1
          , w = Math.floor((y.y - c) / d) - 1
          , x = Math.ceil((y.y + c) / d) + 1;
        if (!(m < 0 || x < 0 || f > u.length || x > u[0].length)) {
            f < 0 && (f = 0),
            m < 0 && (m = 0),
            w < 0 && (w = 0),
            x < 0 && (x = 0),
            f >= u.length && (f = u.length - 1),
            m >= u.length && (m = u.length - 1),
            x >= u[0].length && (x = u[0].length - 1),
            w >= u[0].length && (w = u[0].length - 1);
            var b = [];
            e.getRectMinMax(f, w, m, x, b);
            var g = b[0]
              , E = b[1];
            if (!(y.z - c > E || y.z + c < g))
                for (var B = this.result, A = f; A < m; A++)
                    for (var F = w; F < x; F++) {
                        var M = B.length
                          , S = !1;
                        if (e.getConvexTrianglePillar(A, F, !1),
                        z.pointToWorldFrame(o, r, e.pillarOffset, v),
                        i.distanceTo(v) < e.pillarConvex.boundingSphereRadius + t.boundingSphereRadius && (S = this.sphereConvex(t, e.pillarConvex, i, v, n, r, s, a, t, e, p)),
                        p && S)
                            return !0;
                        if (e.getConvexTrianglePillar(A, F, !0),
                        z.pointToWorldFrame(o, r, e.pillarOffset, v),
                        i.distanceTo(v) < e.pillarConvex.boundingSphereRadius + t.boundingSphereRadius && (S = this.sphereConvex(t, e.pillarConvex, i, v, n, r, s, a, t, e, p)),
                        p && S)
                            return !0;
                        if (B.length - M > 2)
                            return
                    }
        }
    }
    ;
    var Co = To
      , No = i({});
    function To(t, e, i, o, n) {
        Vt.call(this, t, i),
        n = void 0 !== n ? n : 1e6,
        this.pivotA = e ? e.clone() : new No,
        this.pivotB = o ? o.clone() : new No;
        var r = this.equationX = new ee(t,i)
          , s = this.equationY = new ee(t,i)
          , a = this.equationZ = new ee(t,i);
        this.equations.push(r, s, a),
        r.minForce = s.minForce = a.minForce = -n,
        r.maxForce = s.maxForce = a.maxForce = n,
        r.ni.set(1, 0, 0),
        s.ni.set(0, 1, 0),
        a.ni.set(0, 0, 1)
    }
    To.prototype = new Vt,
    To.prototype.update = function() {
        var t = this.bodyA
          , e = this.bodyB
          , i = this.equationX
          , o = this.equationY
          , n = this.equationZ;
        t.quaternion.vmult(this.pivotA, i.ri),
        e.quaternion.vmult(this.pivotB, i.rj),
        o.ri.copy(i.ri),
        o.rj.copy(i.rj),
        n.ri.copy(i.ri),
        n.rj.copy(i.rj)
    }
    ;
    var Ro = Io
      , Po = i({})
      , jo = (o({}),
    Dt);
    function Io(t, e, i) {
        var o = void 0 !== (i = i || {}).maxForce ? i.maxForce : 1e6;
        jo.call(this, t, e, -o, o),
        this.axisA = i.axisA ? i.axisA.clone() : new Po(1,0,0),
        this.axisB = i.axisB ? i.axisB.clone() : new Po(0,1,0),
        this.angle = void 0 !== i.angle ? i.angle : 0
    }
    Io.prototype = new jo,
    Io.prototype.constructor = Io;
    var Lo = new Po
      , Oo = new Po;
    Io.prototype.computeB = function(t) {
        var e = this.a
          , i = this.b
          , o = this.axisA
          , n = this.axisB
          , r = Lo
          , s = Oo
          , a = this.jacobianElementA
          , h = this.jacobianElementB;
        return o.cross(n, r),
        n.cross(o, s),
        a.rotational.copy(s),
        h.rotational.copy(r),
        -(Math.cos(this.angle) - o.dot(n)) * e - this.computeGW() * i - t * this.computeGiMf()
    }
    ;
    var Wo = _o
      , ko = i({})
      , Vo = (o({}),
    Dt);
    function _o(t, e, i) {
        var o = void 0 !== (i = i || {}).maxForce ? i.maxForce : 1e6;
        Vo.call(this, t, e, -o, o),
        this.axisA = i.axisA ? i.axisA.clone() : new ko(1,0,0),
        this.axisB = i.axisB ? i.axisB.clone() : new ko(0,1,0),
        this.maxAngle = Math.PI / 2
    }
    _o.prototype = new Vo,
    _o.prototype.constructor = _o;
    var Ho = new ko
      , Uo = new ko;
    _o.prototype.computeB = function(t) {
        var e = this.a
          , i = this.b
          , o = this.axisA
          , n = this.axisB
          , r = Ho
          , s = Uo
          , a = this.jacobianElementA
          , h = this.jacobianElementB;
        return o.cross(n, r),
        n.cross(o, s),
        a.rotational.copy(s),
        h.rotational.copy(r),
        -(Math.cos(this.maxAngle) - o.dot(n)) * e - this.computeGW() * i - t * this.computeGiMf()
    }
    ;
    var Go = Xo
      , Do = i({});
    function Xo(t, e, i) {
        var o = void 0 !== (i = i || {}).maxForce ? i.maxForce : 1e6
          , n = i.pivotA ? i.pivotA.clone() : new Do
          , r = i.pivotB ? i.pivotB.clone() : new Do;
        this.axisA = i.axisA ? i.axisA.clone() : new Do,
        this.axisB = i.axisB ? i.axisB.clone() : new Do,
        Co.call(this, t, n, e, r, o),
        this.collideConnected = !!i.collideConnected,
        this.angle = void 0 !== i.angle ? i.angle : 0;
        var s = this.coneEquation = new Ro(t,e,i)
          , a = this.twistEquation = new Wo(t,e,i);
        this.twistAngle = void 0 !== i.twistAngle ? i.twistAngle : 0,
        s.maxForce = 0,
        s.minForce = -o,
        a.maxForce = 0,
        a.minForce = -o,
        this.equations.push(s, a)
    }
    Xo.prototype = new Co,
    Xo.constructor = Xo,
    new Do,
    new Do,
    Xo.prototype.update = function() {
        var t = this.bodyA
          , e = this.bodyB
          , i = this.coneEquation
          , o = this.twistEquation;
        Co.prototype.update.call(this),
        t.vectorToWorldFrame(this.axisA, i.axisA),
        e.vectorToWorldFrame(this.axisB, i.axisB),
        this.axisA.tangents(o.axisA, o.axisA),
        t.vectorToWorldFrame(o.axisA, o.axisA),
        this.axisB.tangents(o.axisB, o.axisB),
        e.vectorToWorldFrame(o.axisB, o.axisB),
        i.angle = this.angle,
        o.maxAngle = this.twistAngle
    }
    ;
    var Yo = {};
    function Zo(t, e, i) {
        i = n.defaults(i, {
            friction: .3,
            restitution: .3,
            contactEquationStiffness: 1e7,
            contactEquationRelaxation: 3,
            frictionEquationStiffness: 1e7,
            frictionEquationRelaxation: 3
        }),
        this.id = Zo.idCounter++,
        this.materials = [t, e],
        this.friction = i.friction,
        this.restitution = i.restitution,
        this.contactEquationStiffness = i.contactEquationStiffness,
        this.contactEquationRelaxation = i.contactEquationRelaxation,
        this.frictionEquationStiffness = i.frictionEquationStiffness,
        this.frictionEquationRelaxation = i.frictionEquationRelaxation
    }
    Yo = Zo,
    Zo.idCounter = 0;
    var Ko = Qo;
    function Qo(t, e, i, o) {
        Vt.call(this, t, e),
        void 0 === i && (i = t.position.distanceTo(e.position)),
        void 0 === o && (o = 1e6),
        this.distance = i;
        var n = this.distanceEquation = new ee(t,e);
        this.equations.push(n),
        n.minForce = -o,
        n.maxForce = o
    }
    Qo.prototype = new Vt,
    Qo.prototype.update = function() {
        var t = this.bodyA
          , e = this.bodyB
          , i = this.distanceEquation
          , o = .5 * this.distance
          , n = i.ni;
        e.position.vsub(t.position, n),
        n.normalize(),
        n.mult(o, i.ri),
        n.mult(-o, i.rj)
    }
    ;
    var Jo = $o;
    function $o() {
        Ze.call(this),
        this.iterations = 10,
        this.tolerance = 1e-7
    }
    i({}),
    $o.prototype = new Ze;
    var tn = []
      , en = []
      , on = [];
    $o.prototype.solve = function(t, e) {
        var i, o, n, r, s, a = 0, h = this.iterations, l = this.tolerance * this.tolerance, p = this.equations, u = p.length, c = e.bodies, d = c.length, v = t;
        if (0 !== u)
            for (var y = 0; y !== d; y++)
                c[y].updateSolveMassProperties();
        var f = en
          , m = on
          , w = tn;
        for (f.length = u,
        m.length = u,
        w.length = u,
        y = 0; y !== u; y++) {
            var x = p[y];
            w[y] = 0,
            m[y] = x.computeB(v),
            f[y] = 1 / x.computeC()
        }
        if (0 !== u) {
            for (y = 0; y !== d; y++) {
                var b = (B = c[y]).vlambda
                  , g = B.wlambda;
                b.set(0, 0, 0),
                g.set(0, 0, 0)
            }
            for (a = 0; a !== h; a++) {
                r = 0;
                for (var E = 0; E !== u; E++)
                    x = p[E],
                    i = m[E],
                    o = f[E],
                    (s = w[E]) + (n = o * (i - x.computeGWlambda() - x.eps * s)) < x.minForce ? n = x.minForce - s : s + n > x.maxForce && (n = x.maxForce - s),
                    w[E] += n,
                    r += n > 0 ? n : -n,
                    x.addToWlambda(n);
                if (r * r < l)
                    break
            }
            for (y = 0; y !== d; y++) {
                var B, z = (B = c[y]).velocity, A = B.angularVelocity;
                B.vlambda.vmul(B.linearFactor, B.vlambda),
                z.vadd(B.vlambda, z),
                B.wlambda.vmul(B.angularFactor, B.wlambda),
                A.vadd(B.wlambda, A)
            }
            for (var F = p.length, M = 1 / v; F--; )
                p[F].multiplier = w[F] * M
        }
        return a
    }
    ;
    var nn = an
      , rn = i({})
      , sn = e({});
    function an(t, e, i, o, n) {
        Rt.apply(this),
        this.nx = i || 10,
        this.ny = o || 10,
        this.nz = n || 10,
        this.aabbMin = t || new rn(100,100,100),
        this.aabbMax = e || new rn(-100,-100,-100);
        var r = this.nx * this.ny * this.nz;
        if (r <= 0)
            throw "GridBroadphase: Each dimension's n must be >0";
        this.bins = [],
        this.binLengths = [],
        this.bins.length = r,
        this.binLengths.length = r;
        for (var s = 0; s < r; s++)
            this.bins[s] = [],
            this.binLengths[s] = 0
    }
    an.prototype = new Rt,
    an.prototype.constructor = an;
    var hn = new rn;
    new rn,
    an.prototype.collisionPairs = function(t, e, i) {
        for (var o = t.numObjects(), n = t.bodies, r = this.aabbMax, s = this.aabbMin, a = this.nx, h = this.ny, l = this.nz, p = h * l, u = l, c = 1, d = r.x, v = r.y, y = r.z, f = s.x, m = s.y, w = s.z, x = a / (d - f), b = h / (v - m), g = l / (y - w), E = (d - f) / a, B = (v - m) / h, z = (y - w) / l, A = .5 * Math.sqrt(E * E + B * B + z * z), F = sn.types, M = F.SPHERE, S = F.PLANE, q = (F.BOX,
        F.COMPOUND,
        F.CONVEXPOLYHEDRON,
        this.bins), C = this.binLengths, N = this.bins.length, T = 0; T !== N; T++)
            C[T] = 0;
        var R = Math.ceil;
        function P(t, e, i, o, n, r, s) {
            var d = (t - f) * x | 0
              , v = (e - m) * b | 0
              , y = (i - w) * g | 0
              , E = R((o - f) * x)
              , B = R((n - m) * b)
              , z = R((r - w) * g);
            d < 0 ? d = 0 : d >= a && (d = a - 1),
            v < 0 ? v = 0 : v >= h && (v = h - 1),
            y < 0 ? y = 0 : y >= l && (y = l - 1),
            E < 0 ? E = 0 : E >= a && (E = a - 1),
            B < 0 ? B = 0 : B >= h && (B = h - 1),
            z < 0 ? z = 0 : z >= l && (z = l - 1),
            v *= u,
            y *= c,
            E *= p,
            B *= u,
            z *= c;
            for (var A = d *= p; A <= E; A += p)
                for (var F = v; F <= B; F += u)
                    for (var M = y; M <= z; M += c) {
                        var S = A + F + M;
                        q[S][C[S]++] = s
                    }
        }
        for (s = Math.min,
        r = Math.max,
        T = 0; T !== o; T++) {
            var j = (tt = n[T]).shape;
            switch (j.type) {
            case M:
                var I = tt.position.x
                  , L = tt.position.y
                  , O = tt.position.z
                  , W = j.radius;
                P(I - W, L - W, O - W, I + W, L + W, O + W, tt);
                break;
            case S:
                j.worldNormalNeedsUpdate && j.computeWorldNormal(tt.quaternion);
                var k = j.worldNormal
                  , V = f + .5 * E - tt.position.x
                  , _ = m + .5 * B - tt.position.y
                  , H = w + .5 * z - tt.position.z
                  , U = hn;
                U.set(V, _, H);
                for (var G = 0, D = 0; G !== a; G++,
                D += p,
                U.y = _,
                U.x += E)
                    for (var X = 0, Y = 0; X !== h; X++,
                    Y += u,
                    U.z = H,
                    U.y += B)
                        for (var Z = 0, K = 0; Z !== l; Z++,
                        K += c,
                        U.z += z)
                            if (U.dot(k) < A) {
                                var Q = D + Y + K;
                                q[Q][C[Q]++] = tt
                            }
                break;
            default:
                tt.aabbNeedsUpdate && tt.computeAABB(),
                P(tt.aabb.lowerBound.x, tt.aabb.lowerBound.y, tt.aabb.lowerBound.z, tt.aabb.upperBound.x, tt.aabb.upperBound.y, tt.aabb.upperBound.z, tt)
            }
        }
        for (T = 0; T !== N; T++) {
            var J = C[T];
            if (J > 1) {
                var $ = q[T];
                for (G = 0; G !== J; G++) {
                    var tt = $[G];
                    for (X = 0; X !== G; X++) {
                        var et = $[X];
                        this.needBroadphaseCollision(tt, et) && this.intersectionTest(tt, et, e, i)
                    }
                }
            }
        }
        this.makePairsUnique(e, i)
    }
    ;
    var ln = cn
      , pn = i({})
      , un = (o({}),
    Dt);
    function cn(t, e, i) {
        i = void 0 !== i ? i : 1e6,
        un.call(this, t, e, -i, i),
        this.axisA = new pn,
        this.axisB = new pn,
        this.targetVelocity = 0
    }
    cn.prototype = new un,
    cn.prototype.constructor = cn,
    cn.prototype.computeB = function(t) {
        this.a;
        var e = this.b
          , i = (this.bi,
        this.bj,
        this.axisA)
          , o = this.axisB
          , n = this.jacobianElementA
          , r = this.jacobianElementB;
        return n.rotational.copy(i),
        o.negate(r.rotational),
        -(this.computeGW() - this.targetVelocity) * e - t * this.computeGiMf()
    }
    ;
    var dn = yn
      , vn = i({});
    function yn(t, e, i) {
        var o = void 0 !== (i = i || {}).maxForce ? i.maxForce : 1e6
          , n = i.pivotA ? i.pivotA.clone() : new vn
          , r = i.pivotB ? i.pivotB.clone() : new vn;
        Co.call(this, t, n, e, r, o),
        (this.axisA = i.axisA ? i.axisA.clone() : new vn(1,0,0)).normalize(),
        (this.axisB = i.axisB ? i.axisB.clone() : new vn(1,0,0)).normalize();
        var s = this.rotationalEquation1 = new Wo(t,e,i)
          , a = this.rotationalEquation2 = new Wo(t,e,i)
          , h = this.motorEquation = new ln(t,e,o);
        h.enabled = !1,
        this.equations.push(s, a, h)
    }
    yn.prototype = new Co,
    yn.constructor = yn,
    yn.prototype.enableMotor = function() {
        this.motorEquation.enabled = !0
    }
    ,
    yn.prototype.disableMotor = function() {
        this.motorEquation.enabled = !1
    }
    ,
    yn.prototype.setMotorSpeed = function(t) {
        this.motorEquation.targetVelocity = t
    }
    ,
    yn.prototype.setMotorMaxForce = function(t) {
        this.motorEquation.maxForce = t,
        this.motorEquation.minForce = -t
    }
    ;
    var fn = new vn
      , mn = new vn;
    yn.prototype.update = function() {
        var t = this.bodyA
          , e = this.bodyB
          , i = this.motorEquation
          , o = this.rotationalEquation1
          , n = this.rotationalEquation2
          , r = fn
          , s = mn
          , a = this.axisA
          , h = this.axisB;
        Co.prototype.update.call(this),
        t.quaternion.vmult(a, r),
        e.quaternion.vmult(h, s),
        r.tangents(o.axisA, n.axisA),
        o.axisB.copy(s),
        n.axisB.copy(s),
        this.motorEquation.enabled && (t.quaternion.vmult(this.axisA, i.axisA),
        e.quaternion.vmult(this.axisB, i.axisB))
    }
    ;
    var wn = bn
      , xn = i({});
    function bn(t, e, i) {
        var o = void 0 !== (i = i || {}).maxForce ? i.maxForce : 1e6
          , n = new xn
          , r = new xn
          , s = new xn;
        t.position.vadd(e.position, s),
        s.scale(.5, s),
        e.pointToLocalFrame(s, r),
        t.pointToLocalFrame(s, n),
        Co.call(this, t, n, e, r, o),
        this.xA = t.vectorToLocalFrame(xn.UNIT_X),
        this.xB = e.vectorToLocalFrame(xn.UNIT_X),
        this.yA = t.vectorToLocalFrame(xn.UNIT_Y),
        this.yB = e.vectorToLocalFrame(xn.UNIT_Y),
        this.zA = t.vectorToLocalFrame(xn.UNIT_Z),
        this.zB = e.vectorToLocalFrame(xn.UNIT_Z);
        var a = this.rotationalEquation1 = new Wo(t,e,i)
          , h = this.rotationalEquation2 = new Wo(t,e,i)
          , l = this.rotationalEquation3 = new Wo(t,e,i);
        this.equations.push(a, h, l)
    }
    bn.prototype = new Co,
    bn.constructor = bn,
    new xn,
    new xn,
    bn.prototype.update = function() {
        var t = this.bodyA
          , e = this.bodyB
          , i = (this.motorEquation,
        this.rotationalEquation1)
          , o = this.rotationalEquation2
          , n = this.rotationalEquation3;
        Co.prototype.update.call(this),
        t.vectorToWorldFrame(this.xA, i.axisA),
        e.vectorToWorldFrame(this.yB, i.axisB),
        t.vectorToWorldFrame(this.yA, o.axisA),
        e.vectorToWorldFrame(this.zB, o.axisB),
        t.vectorToWorldFrame(this.zA, n.axisA),
        e.vectorToWorldFrame(this.xB, n.axisB)
    }
    ;
    var gn = En;
    function En() {
        Rt.apply(this)
    }
    En.prototype = new Rt,
    En.prototype.constructor = En,
    En.prototype.collisionPairs = function(t, e, i) {
        var o, n, r, s, a = t.bodies, h = a.length;
        for (o = 0; o !== h; o++)
            for (n = 0; n !== o; n++)
                r = a[o],
                s = a[n],
                this.needBroadphaseCollision(r, s) && this.intersectionTest(r, s, e, i)
    }
    ,
    new h,
    En.prototype.aabbQuery = function(t, e, i) {
        i = i || [];
        for (var o = 0; o < t.bodies.length; o++) {
            var n = t.bodies[o];
            n.aabbNeedsUpdate && n.computeAABB(),
            n.aabb.overlaps(e) && i.push(n)
        }
        return i
    }
    ;
    var Bn;
    function zn() {
        this.matrix = {}
    }
    Bn = zn,
    zn.prototype.get = function(t, e) {
        if (t = t.id,
        (e = e.id) > t) {
            var i = e;
            e = t,
            t = i
        }
        return t + "-" + e in this.matrix
    }
    ,
    zn.prototype.set = function(t, e, i) {
        if (t = t.id,
        (e = e.id) > t) {
            var o = e;
            e = t,
            t = o
        }
        i ? this.matrix[t + "-" + e] = !0 : delete this.matrix[t + "-" + e]
    }
    ,
    zn.prototype.reset = function() {
        this.matrix = {}
    }
    ,
    zn.prototype.setNumObjects = function(t) {}
    ;
    var An;
    function Fn(t) {
        Rt.apply(this),
        this.axisList = [],
        this.world = null,
        this.axisIndex = 0;
        var e = this.axisList;
        this._addBodyHandler = function(t) {
            e.push(t.body)
        }
        ,
        this._removeBodyHandler = function(t) {
            var i = e.indexOf(t.body);
            -1 !== i && e.splice(i, 1)
        }
        ,
        t && this.setWorld(t)
    }
    e({}),
    An = Fn,
    Fn.prototype = new Rt,
    Fn.prototype.setWorld = function(t) {
        this.axisList.length = 0;
        for (var e = 0; e < t.bodies.length; e++)
            this.axisList.push(t.bodies[e]);
        t.removeEventListener("addBody", this._addBodyHandler),
        t.removeEventListener("removeBody", this._removeBodyHandler),
        t.addEventListener("addBody", this._addBodyHandler),
        t.addEventListener("removeBody", this._removeBodyHandler),
        this.world = t,
        this.dirty = !0
    }
    ,
    Fn.insertionSortX = function(t) {
        for (var e = 1, i = t.length; e < i; e++) {
            for (var o = t[e], n = e - 1; n >= 0 && !(t[n].aabb.lowerBound.x <= o.aabb.lowerBound.x); n--)
                t[n + 1] = t[n];
            t[n + 1] = o
        }
        return t
    }
    ,
    Fn.insertionSortY = function(t) {
        for (var e = 1, i = t.length; e < i; e++) {
            for (var o = t[e], n = e - 1; n >= 0 && !(t[n].aabb.lowerBound.y <= o.aabb.lowerBound.y); n--)
                t[n + 1] = t[n];
            t[n + 1] = o
        }
        return t
    }
    ,
    Fn.insertionSortZ = function(t) {
        for (var e = 1, i = t.length; e < i; e++) {
            for (var o = t[e], n = e - 1; n >= 0 && !(t[n].aabb.lowerBound.z <= o.aabb.lowerBound.z); n--)
                t[n + 1] = t[n];
            t[n + 1] = o
        }
        return t
    }
    ,
    Fn.prototype.collisionPairs = function(t, e, i) {
        var o, n, r = this.axisList, s = r.length, a = this.axisIndex;
        for (this.dirty && (this.sortList(),
        this.dirty = !1),
        o = 0; o !== s; o++) {
            var h = r[o];
            for (n = o + 1; n < s; n++) {
                var l = r[n];
                if (this.needBroadphaseCollision(h, l)) {
                    if (!Fn.checkBounds(h, l, a))
                        break;
                    this.intersectionTest(h, l, e, i)
                }
            }
        }
    }
    ,
    Fn.prototype.sortList = function() {
        for (var t = this.axisList, e = this.axisIndex, i = t.length, o = 0; o !== i; o++) {
            var n = t[o];
            n.aabbNeedsUpdate && n.computeAABB()
        }
        0 === e ? Fn.insertionSortX(t) : 1 === e ? Fn.insertionSortY(t) : 2 === e && Fn.insertionSortZ(t)
    }
    ,
    Fn.checkBounds = function(t, e, i) {
        var o, n;
        0 === i ? (o = t.position.x,
        n = e.position.x) : 1 === i ? (o = t.position.y,
        n = e.position.y) : 2 === i && (o = t.position.z,
        n = e.position.z);
        var r = t.boundingRadius;
        return n - e.boundingRadius < o + r
    }
    ,
    Fn.prototype.autoDetectAxis = function() {
        for (var t = 0, e = 0, i = 0, o = 0, n = 0, r = 0, s = this.axisList, a = s.length, h = 1 / a, l = 0; l !== a; l++) {
            var p = s[l]
              , u = p.position.x;
            t += u,
            e += u * u;
            var c = p.position.y;
            i += c,
            o += c * c;
            var d = p.position.z;
            n += d,
            r += d * d
        }
        var v = e - t * t * h
          , y = o - i * i * h
          , f = r - n * n * h;
        this.axisIndex = v > y ? v > f ? 0 : 2 : y > f ? 1 : 2
    }
    ,
    Fn.prototype.aabbQuery = function(t, e, i) {
        i = i || [],
        this.dirty && (this.sortList(),
        this.dirty = !1);
        var o = this.axisIndex
          , n = "x";
        1 === o && (n = "y"),
        2 === o && (n = "z");
        for (var r = this.axisList, s = (e.lowerBound[n],
        e.upperBound[n],
        0); s < r.length; s++) {
            var a = r[s];
            a.aabbNeedsUpdate && a.computeAABB(),
            a.aabb.overlaps(e) && i.push(a)
        }
        return i
    }
    ;
    var Mn = Cn
      , Sn = e({})
      , qn = i({});
    function Cn(t) {
        if (Sn.call(this, {
            type: Sn.types.SPHERE
        }),
        this.radius = void 0 !== t ? t : 1,
        this.radius < 0)
            throw new Error("The sphere radius cannot be negative.");
        this.updateBoundingSphereRadius()
    }
    Cn.prototype = new Sn,
    Cn.prototype.constructor = Cn,
    Cn.prototype.calculateLocalInertia = function(t, e) {
        e = e || new qn;
        var i = 2 * t * this.radius * this.radius / 5;
        return e.x = i,
        e.y = i,
        e.z = i,
        e
    }
    ,
    Cn.prototype.volume = function() {
        return 4 * Math.PI * this.radius / 3
    }
    ,
    Cn.prototype.updateBoundingSphereRadius = function() {
        this.boundingSphereRadius = this.radius
    }
    ,
    Cn.prototype.calculateWorldAABB = function(t, e, i, o) {
        for (var n = this.radius, r = ["x", "y", "z"], s = 0; s < r.length; s++) {
            var a = r[s];
            i[a] = t[a] - n,
            o[a] = t[a] + n
        }
    }
    ;
    var Nn = Tn;
    function Tn(t) {
        for (Ze.call(this),
        this.iterations = 10,
        this.tolerance = 1e-7,
        this.subsolver = t,
        this.nodes = [],
        this.nodePool = []; this.nodePool.length < 128; )
            this.nodePool.push(this.createNode())
    }
    i({}),
    Tn.prototype = new Ze;
    var Rn = []
      , Pn = []
      , jn = {
        bodies: []
    }
      , In = ut.STATIC;
    function Ln(t) {
        for (var e = t.length, i = 0; i !== e; i++) {
            var o = t[i];
            if (!(o.visited || o.body.type & In))
                return o
        }
        return !1
    }
    var On = [];
    function Wn(t, e, i, o) {
        for (On.push(t),
        t.visited = !0,
        e(t, i, o); On.length; )
            for (var n, r = On.pop(); n = Ln(r.children); )
                n.visited = !0,
                e(n, i, o),
                On.push(n)
    }
    function kn(t, e, i) {
        e.push(t.body);
        for (var o = t.eqs.length, n = 0; n !== o; n++) {
            var r = t.eqs[n];
            -1 === i.indexOf(r) && i.push(r)
        }
    }
    function Vn(t, e) {
        return e.id - t.id
    }
    Tn.prototype.createNode = function() {
        return {
            body: null,
            children: [],
            eqs: [],
            visited: !1
        }
    }
    ,
    Tn.prototype.solve = function(t, e) {
        for (var i = Rn, o = this.nodePool, n = e.bodies, r = this.equations, s = r.length, a = n.length, h = this.subsolver; o.length < a; )
            o.push(this.createNode());
        i.length = a;
        for (var l = 0; l < a; l++)
            i[l] = o[l];
        for (l = 0; l !== a; l++) {
            var p = i[l];
            p.body = n[l],
            p.children.length = 0,
            p.eqs.length = 0,
            p.visited = !1
        }
        for (var u = 0; u !== s; u++) {
            var c = r[u]
              , d = (l = n.indexOf(c.bi),
            n.indexOf(c.bj))
              , v = i[l]
              , y = i[d];
            v.children.push(y),
            v.eqs.push(c),
            y.children.push(v),
            y.eqs.push(c)
        }
        var f, m = 0, w = Pn;
        h.tolerance = this.tolerance,
        h.iterations = this.iterations;
        for (var x = jn; f = Ln(i); ) {
            w.length = 0,
            x.bodies.length = 0,
            Wn(f, kn, x.bodies, w);
            var b = w.length;
            for (w = w.sort(Vn),
            l = 0; l !== b; l++)
                h.addEquation(w[l]);
            h.solve(t, x),
            h.removeAllEquations(),
            m++
        }
        return m
    }
    ;
    var _n = {};
    function Hn() {
        this.current = [],
        this.previous = []
    }
    function Un(t, e) {
        t.push((4294901760 & e) >> 16, 65535 & e)
    }
    _n = Hn,
    Hn.prototype.getKey = function(t, e) {
        if (e < t) {
            var i = e;
            e = t,
            t = i
        }
        return t << 16 | e
    }
    ,
    Hn.prototype.set = function(t, e) {
        for (var i = this.getKey(t, e), o = this.current, n = 0; i > o[n]; )
            n++;
        if (i !== o[n]) {
            for (e = o.length - 1; e >= n; e--)
                o[e + 1] = o[e];
            o[n] = i
        }
    }
    ,
    Hn.prototype.tick = function() {
        var t = this.current;
        this.current = this.previous,
        this.previous = t,
        this.current.length = 0
    }
    ,
    Hn.prototype.getDiff = function(t, e) {
        for (var i = this.current, o = this.previous, n = i.length, r = o.length, s = 0, a = 0; a < n; a++) {
            for (var h = i[a]; h > o[s]; )
                s++;
            h === o[s] || Un(t, h)
        }
        for (s = 0,
        a = 0; a < r; a++) {
            for (var l = o[a]; l > i[s]; )
                s++;
            i[s] === l || Un(e, l)
        }
    }
    ;
    var Gn = {};
    function Dn() {
        this.data = {
            keys: []
        }
    }
    Gn = Dn,
    Dn.prototype.get = function(t, e) {
        if (t > e) {
            var i = e;
            e = t,
            t = i
        }
        return this.data[t + "-" + e]
    }
    ,
    Dn.prototype.set = function(t, e, i) {
        if (t > e) {
            var o = e;
            e = t,
            t = o
        }
        var n = t + "-" + e;
        this.get(t, e) || this.data.keys.push(n),
        this.data[n] = i
    }
    ,
    Dn.prototype.reset = function() {
        for (var t = this.data, e = t.keys; e.length > 0; )
            delete t[e.pop()]
    }
    ;
    var Xn = Kn;
    e({});
    var Yn = i({})
      , Zn = ai;
    function Kn(t) {
        t = t || {},
        d.apply(this),
        this.dt = -1,
        this.allowSleep = !!t.allowSleep,
        this.contacts = [],
        this.frictionEquations = [],
        this.quatNormalizeSkip = void 0 !== t.quatNormalizeSkip ? t.quatNormalizeSkip : 0,
        this.quatNormalizeFast = void 0 !== t.quatNormalizeFast && t.quatNormalizeFast,
        this.time = 0,
        this.stepnumber = 0,
        this.default_dt = 1 / 60,
        this.nextId = 0,
        this.gravity = new Yn,
        t.gravity && this.gravity.copy(t.gravity),
        this.broadphase = void 0 !== t.broadphase ? t.broadphase : new gn,
        this.bodies = [],
        this.solver = void 0 !== t.solver ? t.solver : new Jo,
        this.constraints = [],
        this.narrowphase = new Zn(this),
        this.collisionMatrix = new u,
        this.collisionMatrixPrevious = new u,
        this.bodyOverlapKeeper = new _n,
        this.shapeOverlapKeeper = new _n,
        this.materials = [],
        this.contactmaterials = [],
        this.contactMaterialTable = new Gn,
        this.defaultMaterial = new b("default"),
        this.defaultContactMaterial = new Yo(this.defaultMaterial,this.defaultMaterial,{
            friction: .3,
            restitution: 0
        }),
        this.doProfiling = !1,
        this.profile = {
            solve: 0,
            makeContactConstraints: 0,
            broadphase: 0,
            integrate: 0,
            narrowphase: 0
        },
        this.accumulator = 0,
        this.subsystems = [],
        this.addBodyEvent = {
            type: "addBody",
            body: null
        },
        this.removeBodyEvent = {
            type: "removeBody",
            body: null
        },
        this.idToBodyMap = {},
        this.broadphase.setWorld(this)
    }
    Kn.prototype = new d,
    new h;
    var Qn = new ye;
    if (Kn.prototype.getContactMaterial = function(t, e) {
        return this.contactMaterialTable.get(t.id, e.id)
    }
    ,
    Kn.prototype.numObjects = function() {
        return this.bodies.length
    }
    ,
    Kn.prototype.collisionMatrixTick = function() {
        var t = this.collisionMatrixPrevious;
        this.collisionMatrixPrevious = this.collisionMatrix,
        this.collisionMatrix = t,
        this.collisionMatrix.reset(),
        this.bodyOverlapKeeper.tick(),
        this.shapeOverlapKeeper.tick()
    }
    ,
    Kn.prototype.add = Kn.prototype.addBody = function(t) {
        -1 === this.bodies.indexOf(t) && (t.index = this.bodies.length,
        this.bodies.push(t),
        t.world = this,
        t.initPosition.copy(t.position),
        t.initVelocity.copy(t.velocity),
        t.timeLastSleepy = this.time,
        t instanceof ut && (t.initAngularVelocity.copy(t.angularVelocity),
        t.initQuaternion.copy(t.quaternion)),
        this.collisionMatrix.setNumObjects(this.bodies.length),
        this.addBodyEvent.body = t,
        this.idToBodyMap[t.id] = t,
        this.dispatchEvent(this.addBodyEvent))
    }
    ,
    Kn.prototype.addConstraint = function(t) {
        this.constraints.push(t)
    }
    ,
    Kn.prototype.removeConstraint = function(t) {
        var e = this.constraints.indexOf(t);
        -1 !== e && this.constraints.splice(e, 1)
    }
    ,
    Kn.prototype.rayTest = function(t, e, i) {
        i instanceof ce ? this.raycastClosest(t, e, {
            skipBackfaces: !0
        }, i) : this.raycastAll(t, e, {
            skipBackfaces: !0
        }, i)
    }
    ,
    Kn.prototype.raycastAll = function(t, e, i, o) {
        return i.mode = ye.ALL,
        i.from = t,
        i.to = e,
        i.callback = o,
        Qn.intersectWorld(this, i)
    }
    ,
    Kn.prototype.raycastAny = function(t, e, i, o) {
        return i.mode = ye.ANY,
        i.from = t,
        i.to = e,
        i.result = o,
        Qn.intersectWorld(this, i)
    }
    ,
    Kn.prototype.raycastClosest = function(t, e, i, o) {
        return i.mode = ye.CLOSEST,
        i.from = t,
        i.to = e,
        i.result = o,
        Qn.intersectWorld(this, i)
    }
    ,
    Kn.prototype.remove = function(t) {
        t.world = null;
        var e = this.bodies.length - 1
          , i = this.bodies
          , o = i.indexOf(t);
        if (-1 !== o) {
            i.splice(o, 1);
            for (var n = 0; n !== i.length; n++)
                i[n].index = n;
            this.collisionMatrix.setNumObjects(e),
            this.removeBodyEvent.body = t,
            delete this.idToBodyMap[t.id],
            this.dispatchEvent(this.removeBodyEvent)
        }
    }
    ,
    Kn.prototype.removeBody = Kn.prototype.remove,
    Kn.prototype.getBodyById = function(t) {
        return this.idToBodyMap[t]
    }
    ,
    Kn.prototype.getShapeById = function(t) {
        for (var e = this.bodies, i = 0, o = e.length; i < o; i++)
            for (var n = e[i].shapes, r = 0, s = n.length; r < s; r++) {
                var a = n[r];
                if (a.id === t)
                    return a
            }
    }
    ,
    Kn.prototype.addMaterial = function(t) {
        this.materials.push(t)
    }
    ,
    Kn.prototype.addContactMaterial = function(t) {
        this.contactmaterials.push(t),
        this.contactMaterialTable.set(t.materials[0].id, t.materials[1].id, t)
    }
    ,
    "undefined" == typeof performance && (performance = {}),
    !performance.now) {
        var Jn = Date.now();
        performance.timing && performance.timing.navigationStart && (Jn = performance.timing.navigationStart),
        performance.now = function() {
            return Date.now() - Jn
        }
    }
    new Yn,
    Kn.prototype.step = function(t, e, i) {
        if (i = i || 10,
        0 === (e = e || 0))
            this.internalStep(t),
            this.time += t;
        else {
            this.accumulator += e;
            for (var o = 0; this.accumulator >= t && o < i; )
                this.internalStep(t),
                this.accumulator -= t,
                o++;
            for (var n = this.accumulator % t / t, r = 0; r !== this.bodies.length; r++) {
                var s = this.bodies[r];
                s.previousPosition.lerp(s.position, n, s.interpolatedPosition),
                s.previousQuaternion.slerp(s.quaternion, n, s.interpolatedQuaternion),
                s.previousQuaternion.normalize()
            }
            this.time += e
        }
    }
    ;
    var $n, tr, er, ir, or, nr, rr = {
        type: "postStep"
    }, sr = {
        type: "preStep"
    }, ar = {
        type: ut.COLLIDE_EVENT_NAME,
        body: null,
        contact: null
    }, hr = [], lr = [], pr = [], ur = [];
    return new Yn,
    new Yn,
    new Yn,
    new Yn,
    new Yn,
    new Yn,
    new Yn,
    new Yn,
    new Yn,
    new y,
    new y,
    new y,
    new Yn,
    Kn.prototype.internalStep = function(t) {
        this.dt = t;
        var e, i = this.contacts, o = pr, n = ur, r = this.numObjects(), s = this.bodies, a = this.solver, h = this.gravity, l = this.doProfiling, p = this.profile, u = ut.DYNAMIC, c = this.constraints, d = lr, v = (h.norm(),
        h.x), y = h.y, f = h.z, m = 0;
        for (l && (e = performance.now()),
        m = 0; m !== r; m++)
            if ((S = s[m]).type === u) {
                var w = S.force
                  , x = S.mass;
                w.x += x * v,
                w.y += x * y,
                w.z += x * f
            }
        m = 0;
        for (var b = this.subsystems.length; m !== b; m++)
            this.subsystems[m].update();
        l && (e = performance.now()),
        o.length = 0,
        n.length = 0,
        this.broadphase.collisionPairs(this, o, n),
        l && (p.broadphase = performance.now() - e);
        var g = c.length;
        for (m = 0; m !== g; m++)
            if (!(T = c[m]).collideConnected)
                for (var E = o.length - 1; E >= 0; E -= 1)
                    (T.bodyA === o[E] && T.bodyB === n[E] || T.bodyB === o[E] && T.bodyA === n[E]) && (o.splice(E, 1),
                    n.splice(E, 1));
        this.collisionMatrixTick(),
        l && (e = performance.now());
        var B = hr
          , z = i.length;
        for (m = 0; m !== z; m++)
            B.push(i[m]);
        i.length = 0;
        var A = this.frictionEquations.length;
        for (m = 0; m !== A; m++)
            d.push(this.frictionEquations[m]);
        for (this.frictionEquations.length = 0,
        this.narrowphase.getContacts(o, n, this, i, B, this.frictionEquations, d),
        l && (p.narrowphase = performance.now() - e),
        l && (e = performance.now()),
        m = 0; m < this.frictionEquations.length; m++)
            a.addEquation(this.frictionEquations[m]);
        for (var F = i.length, M = 0; M !== F; M++) {
            var S = (T = i[M]).bi
              , q = T.bj
              , C = T.si
              , N = T.sj;
            (S.material && q.material && this.getContactMaterial(S.material, q.material) || this.defaultContactMaterial).friction,
            S.material && q.material && (S.material.friction >= 0 && q.material.friction >= 0 && (S.material.friction,
            q.material.friction),
            S.material.restitution >= 0 && q.material.restitution >= 0 && (T.restitution = S.material.restitution * q.material.restitution)),
            a.addEquation(T),
            S.allowSleep && S.type === ut.DYNAMIC && S.sleepState === ut.SLEEPING && q.sleepState === ut.AWAKE && q.type !== ut.STATIC && q.velocity.norm2() + q.angularVelocity.norm2() >= 2 * Math.pow(q.sleepSpeedLimit, 2) && (S._wakeUpAfterNarrowphase = !0),
            q.allowSleep && q.type === ut.DYNAMIC && q.sleepState === ut.SLEEPING && S.sleepState === ut.AWAKE && S.type !== ut.STATIC && S.velocity.norm2() + S.angularVelocity.norm2() >= 2 * Math.pow(S.sleepSpeedLimit, 2) && (q._wakeUpAfterNarrowphase = !0),
            this.collisionMatrix.set(S, q, !0),
            this.collisionMatrixPrevious.get(S, q) || (ar.body = q,
            ar.contact = T,
            S.dispatchEvent(ar),
            ar.body = S,
            q.dispatchEvent(ar)),
            this.bodyOverlapKeeper.set(S.id, q.id),
            this.shapeOverlapKeeper.set(C.id, N.id)
        }
        for (this.emitContactEvents(),
        l && (p.makeContactConstraints = performance.now() - e,
        e = performance.now()),
        m = 0; m !== r; m++)
            (S = s[m])._wakeUpAfterNarrowphase && (S.wakeUp(),
            S._wakeUpAfterNarrowphase = !1);
        for (g = c.length,
        m = 0; m !== g; m++) {
            var T;
            (T = c[m]).update(),
            E = 0;
            for (var R = T.equations.length; E !== R; E++) {
                var P = T.equations[E];
                a.addEquation(P)
            }
        }
        a.solve(t, this),
        l && (p.solve = performance.now() - e),
        a.removeAllEquations();
        var j = Math.pow;
        for (m = 0; m !== r; m++)
            if ((S = s[m]).type & u) {
                var I = j(1 - S.linearDamping, t)
                  , L = S.velocity;
                L.mult(I, L);
                var O = S.angularVelocity;
                if (O) {
                    var W = j(1 - S.angularDamping, t);
                    O.mult(W, O)
                }
            }
        for (this.dispatchEvent(sr),
        m = 0; m !== r; m++)
            (S = s[m]).preStep && S.preStep.call(S);
        l && (e = performance.now());
        var k = this.stepnumber % (this.quatNormalizeSkip + 1) == 0
          , V = this.quatNormalizeFast;
        for (m = 0; m !== r; m++)
            s[m].integrate(t, k, V);
        for (this.clearForces(),
        this.broadphase.dirty = !0,
        l && (p.integrate = performance.now() - e),
        this.time += t,
        this.stepnumber += 1,
        this.dispatchEvent(rr),
        m = 0; m !== r; m++) {
            var _ = (S = s[m]).postStep;
            _ && _.call(S)
        }
        if (this.allowSleep)
            for (m = 0; m !== r; m++)
                s[m].sleepTick(this.time)
    }
    ,
    Kn.prototype.emitContactEvents = ($n = [],
    tr = [],
    er = {
        type: "beginContact",
        bodyA: null,
        bodyB: null
    },
    ir = {
        type: "endContact",
        bodyA: null,
        bodyB: null
    },
    or = {
        type: "beginShapeContact",
        bodyA: null,
        bodyB: null,
        shapeA: null,
        shapeB: null
    },
    nr = {
        type: "endShapeContact",
        bodyA: null,
        bodyB: null,
        shapeA: null,
        shapeB: null
    },
    function() {
        var t = this.hasAnyEventListener("beginContact")
          , e = this.hasAnyEventListener("endContact");
        if ((t || e) && this.bodyOverlapKeeper.getDiff($n, tr),
        t) {
            for (var i = 0, o = $n.length; i < o; i += 2)
                er.bodyA = this.getBodyById($n[i]),
                er.bodyB = this.getBodyById($n[i + 1]),
                this.dispatchEvent(er);
            er.bodyA = er.bodyB = null
        }
        if (e) {
            for (i = 0,
            o = tr.length; i < o; i += 2)
                ir.bodyA = this.getBodyById(tr[i]),
                ir.bodyB = this.getBodyById(tr[i + 1]),
                this.dispatchEvent(ir);
            ir.bodyA = ir.bodyB = null
        }
        $n.length = tr.length = 0;
        var n = this.hasAnyEventListener("beginShapeContact")
          , r = this.hasAnyEventListener("endShapeContact");
        if ((n || r) && this.shapeOverlapKeeper.getDiff($n, tr),
        n) {
            for (i = 0,
            o = $n.length; i < o; i += 2) {
                var s = this.getShapeById($n[i])
                  , a = this.getShapeById($n[i + 1]);
                or.shapeA = s,
                or.shapeB = a,
                or.bodyA = s.body,
                or.bodyB = a.body,
                this.dispatchEvent(or)
            }
            or.bodyA = or.bodyB = or.shapeA = or.shapeB = null
        }
        if (r) {
            for (i = 0,
            o = tr.length; i < o; i += 2)
                s = this.getShapeById(tr[i]),
                a = this.getShapeById(tr[i + 1]),
                nr.shapeA = s,
                nr.shapeB = a,
                nr.bodyA = s.body,
                nr.bodyB = a.body,
                this.dispatchEvent(nr);
            nr.bodyA = nr.bodyB = nr.shapeA = nr.shapeB = null
        }
    }
    ),
    Kn.prototype.clearForces = function() {
        for (var t = this.bodies, e = t.length, i = 0; i !== e; i++) {
            var o = t[i];
            o.force,
            o.torque,
            o.force.set(0, 0, 0),
            o.torque.set(0, 0, 0)
        }
    }
    ,
    {
        version: "0.6.2",
        AABB: h,
        ArrayCollisionMatrix: u,
        Body: ut,
        Broadphase: Rt,
        Constraint: Vt,
        ContactEquation: ee,
        Narrowphase: ai,
        ConeTwistConstraint: Go,
        ContactMaterial: Yo,
        DistanceConstraint: Ko,
        Equation: Dt,
        EventTarget: d,
        FrictionEquation: ii,
        GSSolver: Jo,
        GridBroadphase: nn,
        HingeConstraint: dn,
        LockConstraint: wn,
        Mat3: o({}),
        Material: b,
        NaiveBroadphase: gn,
        ObjectCollisionMatrix: Bn,
        Pool: Qe,
        PointToPointConstraint: Co,
        Quaternion: y,
        Ray: ye,
        RaycastResult: ce,
        RotationalEquation: Wo,
        RotationalMotorEquation: ln,
        SAPBroadphase: An,
        Shape: e({}),
        Solver: Ze,
        Sphere: Mn,
        SplitSolver: Nn,
        Transform: z,
        Vec3: i({}),
        Vec3Pool: $e,
        World: Xn
    }
});
