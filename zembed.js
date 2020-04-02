! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.ZMP3_EMBED = t() : e.ZMP3_EMBED = t()
}(window, function() {
    return function(e) {
        var t = {};

        function r(n) {
            if (t[n]) return t[n].exports;
            var i = t[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return e[n].call(i.exports, i, i.exports, r), i.l = !0, i.exports
        }
        return r.m = e, r.c = t, r.d = function(e, t, n) {
            r.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: n
            })
        }, r.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }, r.t = function(e, t) {
            if (1 & t && (e = r(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var n = Object.create(null);
            if (r.r(n), Object.defineProperty(n, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & t && "string" != typeof e)
                for (var i in e) r.d(n, i, function(t) {
                    return e[t]
                }.bind(null, i));
            return n
        }, r.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return r.d(t, "a", t), t
        }, r.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, r.p = "", r(r.s = 13)
    }([function(e, t, r) {
    }, function(e, t, r) {
        e.exports = function() {
            var e = e || function(e, t) {
                var r = Object.create || function() {
                        function e() {}
                        return function(t) {
                            var r;
                            return e.prototype = t, r = new e, e.prototype = null, r
                        }
                    }(),
                    n = {},
                    i = n.lib = {},
                    o = i.Base = {
                        extend: function(e) {
                            var t = r(this);
                            return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function() {
                                t.$super.init.apply(this, arguments)
                            }), t.init.prototype = t, t.$super = this, t
                        },
                        create: function() {
                            var e = this.extend();
                            return e.init.apply(e, arguments), e
                        },
                        init: function() {},
                        mixIn: function(e) {
                            for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                            e.hasOwnProperty("toString") && (this.toString = e.toString)
                        },
                        clone: function() {
                            return this.init.prototype.extend(this)
                        }
                    },
                    a = i.WordArray = o.extend({
                        init: function(e, t) {
                            e = this.words = e || [], this.sigBytes = void 0 != t ? t : 4 * e.length
                        },
                        toString: function(e) {
                            return (e || l).stringify(this)
                        },
                        concat: function(e) {
                            var t = this.words,
                                r = e.words,
                                n = this.sigBytes,
                                i = e.sigBytes;
                            if (this.clamp(), n % 4)
                                for (var o = 0; o < i; o++) {
                                    var a = r[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                                    t[n + o >>> 2] |= a << 24 - (n + o) % 4 * 8
                                } else
                                    for (var o = 0; o < i; o += 4) t[n + o >>> 2] = r[o >>> 2];
                            return this.sigBytes += i, this
                        },
                        clamp: function() {
                            var t = this.words,
                                r = this.sigBytes;
                            t[r >>> 2] &= 4294967295 << 32 - r % 4 * 8, t.length = e.ceil(r / 4)
                        },
                        clone: function() {
                            var e = o.clone.call(this);
                            return e.words = this.words.slice(0), e
                        },
                        random: function(t) {
                            for (var r, n = [], i = function(t) {
                                    var t = t,
                                        r = 987654321,
                                        n = 4294967295;
                                    return function() {
                                        var i = ((r = 36969 * (65535 & r) + (r >> 16) & n) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & n) & n;
                                        return i /= 4294967296, (i += .5) * (e.random() > .5 ? 1 : -1)
                                    }
                                }, o = 0; o < t; o += 4) {
                                var s = i(4294967296 * (r || e.random()));
                                r = 987654071 * s(), n.push(4294967296 * s() | 0)
                            }
                            return new a.init(n, t)
                        }
                    }),
                    s = n.enc = {},
                    l = s.Hex = {
                        stringify: function(e) {
                            for (var t = e.words, r = e.sigBytes, n = [], i = 0; i < r; i++) {
                                var o = t[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                                n.push((o >>> 4).toString(16)), n.push((15 & o).toString(16))
                            }
                            return n.join("")
                        },
                        parse: function(e) {
                            for (var t = e.length, r = [], n = 0; n < t; n += 2) r[n >>> 3] |= parseInt(e.substr(n, 2), 16) << 24 - n % 8 * 4;
                            return new a.init(r, t / 2)
                        }
                    },
                    u = s.Latin1 = {
                        stringify: function(e) {
                            for (var t = e.words, r = e.sigBytes, n = [], i = 0; i < r; i++) {
                                var o = t[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                                n.push(String.fromCharCode(o))
                            }
                            return n.join("")
                        },
                        parse: function(e) {
                            for (var t = e.length, r = [], n = 0; n < t; n++) r[n >>> 2] |= (255 & e.charCodeAt(n)) << 24 - n % 4 * 8;
                            return new a.init(r, t)
                        }
                    },
                    c = s.Utf8 = {
                        stringify: function(e) {
                            try {
                                return decodeURIComponent(escape(u.stringify(e)))
                            } catch (e) {
                                throw new Error("Malformed UTF-8 data")
                            }
                        },
                        parse: function(e) {
                            return u.parse(unescape(encodeURIComponent(e)))
                        }
                    },
                    p = i.BufferedBlockAlgorithm = o.extend({
                        reset: function() {
                            this._data = new a.init, this._nDataBytes = 0
                        },
                        _append: function(e) {
                            "string" == typeof e && (e = c.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes
                        },
                        _process: function(t) {
                            var r = this._data,
                                n = r.words,
                                i = r.sigBytes,
                                o = this.blockSize,
                                s = 4 * o,
                                l = i / s,
                                u = (l = t ? e.ceil(l) : e.max((0 | l) - this._minBufferSize, 0)) * o,
                                c = e.min(4 * u, i);
                            if (u) {
                                for (var p = 0; p < u; p += o) this._doProcessBlock(n, p);
                                var f = n.splice(0, u);
                                r.sigBytes -= c
                            }
                            return new a.init(f, c)
                        },
                        clone: function() {
                            var e = o.clone.call(this);
                            return e._data = this._data.clone(), e
                        },
                        _minBufferSize: 0
                    }),
                    f = (i.Hasher = p.extend({
                        cfg: o.extend(),
                        init: function(e) {
                            this.cfg = this.cfg.extend(e), this.reset()
                        },
                        reset: function() {
                            p.reset.call(this), this._doReset()
                        },
                        update: function(e) {
                            return this._append(e), this._process(), this
                        },
                        finalize: function(e) {
                            e && this._append(e);
                            var t = this._doFinalize();
                            return t
                        },
                        blockSize: 16,
                        _createHelper: function(e) {
                            return function(t, r) {
                                return new e.init(r).finalize(t)
                            }
                        },
                        _createHmacHelper: function(e) {
                            return function(t, r) {
                                return new f.HMAC.init(e, r).finalize(t)
                            }
                        }
                    }), n.algo = {});
                return n
            }(Math);
            return e
        }()
    }, function(e, t, r) {
        e.exports = function(e) {
            return function(t) {
                var r = e,
                    n = r.lib,
                    i = n.Base,
                    o = n.WordArray,
                    a = r.x64 = {};
                a.Word = i.extend({
                    init: function(e, t) {
                        this.high = e, this.low = t
                    }
                }), a.WordArray = i.extend({
                    init: function(e, t) {
                        e = this.words = e || [], this.sigBytes = void 0 != t ? t : 8 * e.length
                    },
                    toX32: function() {
                        for (var e = this.words, t = e.length, r = [], n = 0; n < t; n++) {
                            var i = e[n];
                            r.push(i.high), r.push(i.low)
                        }
                        return o.create(r, this.sigBytes)
                    },
                    clone: function() {
                        for (var e = i.clone.call(this), t = e.words = this.words.slice(0), r = t.length, n = 0; n < r; n++) t[n] = t[n].clone();
                        return e
                    }
                })
            }(), e
        }(r(1))
    }, function(e, t, r) {
        e.exports = function(e) {
            return function(t) {
                var r = e,
                    n = r.lib,
                    i = n.WordArray,
                    o = n.Hasher,
                    a = r.algo,
                    s = [],
                    l = [];
                ! function() {
                    function e(e) {
                        for (var r = t.sqrt(e), n = 2; n <= r; n++)
                            if (!(e % n)) return !1;
                        return !0
                    }

                    function r(e) {
                        return 4294967296 * (e - (0 | e)) | 0
                    }
                    for (var n = 2, i = 0; i < 64;) e(n) && (i < 8 && (s[i] = r(t.pow(n, .5))), l[i] = r(t.pow(n, 1 / 3)), i++), n++
                }();
                var u = [],
                    c = a.SHA256 = o.extend({
                        _doReset: function() {
                            this._hash = new i.init(s.slice(0))
                        },
                        _doProcessBlock: function(e, t) {
                            for (var r = this._hash.words, n = r[0], i = r[1], o = r[2], a = r[3], s = r[4], c = r[5], p = r[6], f = r[7], d = 0; d < 64; d++) {
                                if (d < 16) u[d] = 0 | e[t + d];
                                else {
                                    var h = u[d - 15],
                                        y = (h << 25 | h >>> 7) ^ (h << 14 | h >>> 18) ^ h >>> 3,
                                        g = u[d - 2],
                                        m = (g << 15 | g >>> 17) ^ (g << 13 | g >>> 19) ^ g >>> 10;
                                    u[d] = y + u[d - 7] + m + u[d - 16]
                                }
                                var v = n & i ^ n & o ^ i & o,
                                    A = (n << 30 | n >>> 2) ^ (n << 19 | n >>> 13) ^ (n << 10 | n >>> 22),
                                    b = f + ((s << 26 | s >>> 6) ^ (s << 21 | s >>> 11) ^ (s << 7 | s >>> 25)) + (s & c ^ ~s & p) + l[d] + u[d];
                                f = p, p = c, c = s, s = a + b | 0, a = o, o = i, i = n, n = b + (A + v) | 0
                            }
                            r[0] = r[0] + n | 0, r[1] = r[1] + i | 0, r[2] = r[2] + o | 0, r[3] = r[3] + a | 0, r[4] = r[4] + s | 0, r[5] = r[5] + c | 0, r[6] = r[6] + p | 0, r[7] = r[7] + f | 0
                        },
                        _doFinalize: function() {
                            var e = this._data,
                                r = e.words,
                                n = 8 * this._nDataBytes,
                                i = 8 * e.sigBytes;
                            return r[i >>> 5] |= 128 << 24 - i % 32, r[14 + (i + 64 >>> 9 << 4)] = t.floor(n / 4294967296), r[15 + (i + 64 >>> 9 << 4)] = n, e.sigBytes = 4 * r.length, this._process(), this._hash
                        },
                        clone: function() {
                            var e = o.clone.call(this);
                            return e._hash = this._hash.clone(), e
                        }
                    });
                r.SHA256 = o._createHelper(c), r.HmacSHA256 = o._createHmacHelper(c)
            }(Math), e.SHA256
        }(r(1))
    }, function(e, t, r) {
        e.exports = function(e) {
            return e.HmacSHA512
        }(r(1), r(2), r(10), r(11))
    }, function(e, t, r) {}, function(e, t, r) {
        "use strict";
        r.r(t), t.default = function(e) {
            return e = e || Object.create(null), {
                on: function(t, r) {
                    (e[t] || (e[t] = [])).push(r)
                },
                off: function(t, r) {
                    e[t] && e[t].splice(e[t].indexOf(r) >>> 0, 1)
                },
                emit: function(t, r) {
                    (e[t] || []).slice().map(function(e) {
                        e(r)
                    }), (e["*"] || []).slice().map(function(e) {
                        e(t, r)
                    })
                }
            }
        }
    }, function(e, t, r) {}, function(e, t, r) {}, function(e, t, r) {}, function(e, t, r) {
        e.exports = function(e) {
            return function() {
                var t = e,
                    r = t.lib.Hasher,
                    n = t.x64,
                    i = n.Word,
                    o = n.WordArray,
                    a = t.algo;

                function s() {
                    return i.create.apply(i, arguments)
                }
                var l = [s(1116352408, 3609767458), s(1899447441, 602891725), s(3049323471, 3964484399), s(3921009573, 2173295548), s(961987163, 4081628472), s(1508970993, 3053834265), s(2453635748, 2937671579), s(2870763221, 3664609560), s(3624381080, 2734883394), s(310598401, 1164996542), s(607225278, 1323610764), s(1426881987, 3590304994), s(1925078388, 4068182383), s(2162078206, 991336113), s(2614888103, 633803317), s(3248222580, 3479774868), s(3835390401, 2666613458), s(4022224774, 944711139), s(264347078, 2341262773), s(604807628, 2007800933), s(770255983, 1495990901), s(1249150122, 1856431235), s(1555081692, 3175218132), s(1996064986, 2198950837), s(2554220882, 3999719339), s(2821834349, 766784016), s(2952996808, 2566594879), s(3210313671, 3203337956), s(3336571891, 1034457026), s(3584528711, 2466948901), s(113926993, 3758326383), s(338241895, 168717936), s(666307205, 1188179964), s(773529912, 1546045734), s(1294757372, 1522805485), s(1396182291, 2643833823), s(1695183700, 2343527390), s(1986661051, 1014477480), s(2177026350, 1206759142), s(2456956037, 344077627), s(2730485921, 1290863460), s(2820302411, 3158454273), s(3259730800, 3505952657), s(3345764771, 106217008), s(3516065817, 3606008344), s(3600352804, 1432725776), s(4094571909, 1467031594), s(275423344, 851169720), s(430227734, 3100823752), s(506948616, 1363258195), s(659060556, 3750685593), s(883997877, 3785050280), s(958139571, 3318307427), s(1322822218, 3812723403), s(1537002063, 2003034995), s(1747873779, 3602036899), s(1955562222, 1575990012), s(2024104815, 1125592928), s(2227730452, 2716904306), s(2361852424, 442776044), s(2428436474, 593698344), s(2756734187, 3733110249), s(3204031479, 2999351573), s(3329325298, 3815920427), s(3391569614, 3928383900), s(3515267271, 566280711), s(3940187606, 3454069534), s(4118630271, 4000239992), s(116418474, 1914138554), s(174292421, 2731055270), s(289380356, 3203993006), s(460393269, 320620315), s(685471733, 587496836), s(852142971, 1086792851), s(1017036298, 365543100), s(1126000580, 2618297676), s(1288033470, 3409855158), s(1501505948, 4234509866), s(1607167915, 987167468), s(1816402316, 1246189591)],
                    u = [];
                ! function() {
                    for (var e = 0; e < 80; e++) u[e] = s()
                }();
                var c = a.SHA512 = r.extend({
                    _doReset: function() {
                        this._hash = new o.init([new i.init(1779033703, 4089235720), new i.init(3144134277, 2227873595), new i.init(1013904242, 4271175723), new i.init(2773480762, 1595750129), new i.init(1359893119, 2917565137), new i.init(2600822924, 725511199), new i.init(528734635, 4215389547), new i.init(1541459225, 327033209)])
                    },
                    _doProcessBlock: function(e, t) {
                        for (var r = this._hash.words, n = r[0], i = r[1], o = r[2], a = r[3], s = r[4], c = r[5], p = r[6], f = r[7], d = n.high, h = n.low, y = i.high, g = i.low, m = o.high, v = o.low, A = a.high, b = a.low, _ = s.high, E = s.low, w = c.high, k = c.low, T = p.high, S = p.low, z = f.high, P = f.low, O = d, L = h, C = y, R = g, D = m, I = v, x = A, M = b, j = _, B = E, N = w, F = k, U = T, Y = S, G = z, H = P, V = 0; V < 80; V++) {
                            var K = u[V];
                            if (V < 16) var Q = K.high = 0 | e[t + 2 * V],
                                W = K.low = 0 | e[t + 2 * V + 1];
                            else {
                                var q = u[V - 15],
                                    X = q.high,
                                    J = q.low,
                                    Z = (X >>> 1 | J << 31) ^ (X >>> 8 | J << 24) ^ X >>> 7,
                                    $ = (J >>> 1 | X << 31) ^ (J >>> 8 | X << 24) ^ (J >>> 7 | X << 25),
                                    ee = u[V - 2],
                                    te = ee.high,
                                    re = ee.low,
                                    ne = (te >>> 19 | re << 13) ^ (te << 3 | re >>> 29) ^ te >>> 6,
                                    ie = (re >>> 19 | te << 13) ^ (re << 3 | te >>> 29) ^ (re >>> 6 | te << 26),
                                    oe = u[V - 7],
                                    ae = oe.high,
                                    se = oe.low,
                                    le = u[V - 16],
                                    ue = le.high,
                                    ce = le.low;
                                Q = (Q = (Q = Z + ae + ((W = $ + se) >>> 0 < $ >>> 0 ? 1 : 0)) + ne + ((W += ie) >>> 0 < ie >>> 0 ? 1 : 0)) + ue + ((W += ce) >>> 0 < ce >>> 0 ? 1 : 0), K.high = Q, K.low = W
                            }
                            var pe, fe = j & N ^ ~j & U,
                                de = B & F ^ ~B & Y,
                                he = O & C ^ O & D ^ C & D,
                                ye = L & R ^ L & I ^ R & I,
                                ge = (O >>> 28 | L << 4) ^ (O << 30 | L >>> 2) ^ (O << 25 | L >>> 7),
                                me = (L >>> 28 | O << 4) ^ (L << 30 | O >>> 2) ^ (L << 25 | O >>> 7),
                                ve = (j >>> 14 | B << 18) ^ (j >>> 18 | B << 14) ^ (j << 23 | B >>> 9),
                                Ae = (B >>> 14 | j << 18) ^ (B >>> 18 | j << 14) ^ (B << 23 | j >>> 9),
                                be = l[V],
                                _e = be.high,
                                Ee = be.low,
                                we = G + ve + ((pe = H + Ae) >>> 0 < H >>> 0 ? 1 : 0),
                                ke = me + ye;
                            G = U, H = Y, U = N, Y = F, N = j, F = B, j = x + (we = (we = (we = we + fe + ((pe += de) >>> 0 < de >>> 0 ? 1 : 0)) + _e + ((pe += Ee) >>> 0 < Ee >>> 0 ? 1 : 0)) + Q + ((pe += W) >>> 0 < W >>> 0 ? 1 : 0)) + ((B = M + pe | 0) >>> 0 < M >>> 0 ? 1 : 0) | 0, x = D, M = I, D = C, I = R, C = O, R = L, O = we + (ge + he + (ke >>> 0 < me >>> 0 ? 1 : 0)) + ((L = pe + ke | 0) >>> 0 < pe >>> 0 ? 1 : 0) | 0
                        }
                        h = n.low = h + L, n.high = d + O + (h >>> 0 < L >>> 0 ? 1 : 0), g = i.low = g + R, i.high = y + C + (g >>> 0 < R >>> 0 ? 1 : 0), v = o.low = v + I, o.high = m + D + (v >>> 0 < I >>> 0 ? 1 : 0), b = a.low = b + M, a.high = A + x + (b >>> 0 < M >>> 0 ? 1 : 0), E = s.low = E + B, s.high = _ + j + (E >>> 0 < B >>> 0 ? 1 : 0), k = c.low = k + F, c.high = w + N + (k >>> 0 < F >>> 0 ? 1 : 0), S = p.low = S + Y, p.high = T + U + (S >>> 0 < Y >>> 0 ? 1 : 0), P = f.low = P + H, f.high = z + G + (P >>> 0 < H >>> 0 ? 1 : 0)
                    },
                    _doFinalize: function() {
                        var e = this._data,
                            t = e.words,
                            r = 8 * this._nDataBytes,
                            n = 8 * e.sigBytes;
                        return t[n >>> 5] |= 128 << 24 - n % 32, t[30 + (n + 128 >>> 10 << 5)] = Math.floor(r / 4294967296), t[31 + (n + 128 >>> 10 << 5)] = r, e.sigBytes = 4 * t.length, this._process(), this._hash.toX32()
                    },
                    clone: function() {
                        var e = r.clone.call(this);
                        return e._hash = this._hash.clone(), e
                    },
                    blockSize: 32
                });
                t.SHA512 = r._createHelper(c), t.HmacSHA512 = r._createHmacHelper(c)
            }(), e.SHA512
        }(r(1), r(2))
    }, function(e, t, r) {
        e.exports = function(e) {
            ! function() {
                var t = e,
                    r = t.lib,
                    n = r.Base,
                    i = t.enc,
                    o = i.Utf8,
                    a = t.algo;
                a.HMAC = n.extend({
                    init: function(e, t) {
                        e = this._hasher = new e.init, "string" == typeof t && (t = o.parse(t));
                        var r = e.blockSize,
                            n = 4 * r;
                        t.sigBytes > n && (t = e.finalize(t)), t.clamp();
                        for (var i = this._oKey = t.clone(), a = this._iKey = t.clone(), s = i.words, l = a.words, u = 0; u < r; u++) s[u] ^= 1549556828, l[u] ^= 909522486;
                        i.sigBytes = a.sigBytes = n, this.reset()
                    },
                    reset: function() {
                        var e = this._hasher;
                        e.reset(), e.update(this._iKey)
                    },
                    update: function(e) {
                        return this._hasher.update(e), this
                    },
                    finalize: function(e) {
                        var t = this._hasher,
                            r = t.finalize(e);
                        t.reset();
                        var n = t.finalize(this._oKey.clone().concat(r));
                        return n
                    }
                })
            }()
        }(r(1))
    }, function(e, t, r) {}, function(e, t, r) {
        "use strict";
        r.r(t);
        var n = {};
        
        var i = function(e) {
                return null != e ? e.constructor : null
            },
            o = function(e, t) {
                return Boolean(e && t && e instanceof t)
            },
            a = function(e) {
                return null == e
            },
            s = function(e) {
                return i(e) === Object
            },
            l = function(e) {
                return i(e) === String
            },
            u = function(e) {
                return Array.isArray(e)
            },
            c = function(e) {
                return o(e, NodeList)
            },
            p = function(e) {
                return a(e) || (l(e) || u(e) || c(e)) && !e.length || s(e) && !Object.keys(e).length
            },
            f = {
                
                url: function(e) {
                    if (o(e, window.URL)) return !0;
                    var t = e;
                    e.startsWith("http://") && e.startsWith("https://") || (t = "http://".concat(e));
                    try {
                        return !p(new URL(t).hostname)
                    } catch (e) {
                        return !1
                    }
                },
                empty: p
            };

        function d(e) {
            e = e || {};
            for (var t = 1, r = arguments.length; t < r; ++t) {
                var n = arguments[t];
                if (n)
                    for (var i in n) n.hasOwnProperty(i) && ("[object Object]" !== Object.prototype.toString.call(n[i]) ? e[i] = n[i] : e[i] = d(e[i], n[i]))
            }
            return e
        }
        var h = r(0);

        function y(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        
        const k = r(6).default;
        class T {
            constructor() {
                this._emitter = k();
            }
            on(e, t) {
                this._emitter.on(e, t)
            }
            off(e, t) {
                this._emitter.off(e, t)
            }
            trigger(e, t) {
                this._emitter.emit(e, t)
            }
        }

        class X extends T {
            constructor() {
                super(), this.Dom = n
            }
            static get tagName() {
                return "div"
            }
            static get events() {
                return {}
            }
            static get attributes() {
                return {}
            }
            get properties() {
                return {}
            }
            querySelector(e) {
                return this.$el.querySelector(e)
            }
            querySelectorAll(e) {
                return this.$el.querySelectorAll(e)
            }
            getAttribute(e) {
                return Y(this.$el, e)
            }
            setAttribute(e, t) {
                return G(this.$el, e, t), this
            }
            removeAttribute(e) {
                return H(this.$el, e), this
            }
            setStyles(e) {
                return R(this.$el, e), this
            }
            hasClass(e) {
                return z(this.$el, e)
            }
            addClass(e) {
                return P(this.$el, e), this
            }
            removeClass(e) {
                return this.Dom.removeClass(this.$el, e), this
            }
            toggleClass(e, t) {
                return L(this.$el, e, t), this
            }
            show() {
                return this.removeClass("hide"), this
            }
            hide() {
                return this.addClass("hide"), this
            }
            append(e) {
                if (f.string(e)) {
                    let t = document.createElement("div");
                    t.innerHTML = e, e = t.firstChild
                }
                return this.$el.appendChild(e), this
            }
            prepend(e) {
                return this.prepend(e), this
            }
            after(e) {
                return this.$el.after(e), this
            }
            before(e) {
                return this.$el.before(e), this
            }
            remove() {
                return q(this.$el), this
            }
            html(e) {
                return this.$el.innerHTML = e, this
            }
            render() {
                // const e = d({}, this.attributes);
                // this.id && (e.id = this.id);
                // const t = d({}, this.properties);
            }
        }
           
        var re = class {
            constructor(e = "zmp3-em") {
                this.key = e
            }
            static supported() {
                return ee()
            }
            get(e) {
                const t = te.getItem(this.key);
                if (f.empty(t)) return {};
                const r = JSON.parse(t);
                return f.string(e) && e.length ? r[e] : r
            }
            set(e) {
                if (!f.object(e)) return;
                let t = this.get();
                f.empty(t) && (t = {}), d(t, e), te.setItem(this.key, JSON.stringify(t))
            }
            clean() {
                te.removeItem(this.key)
            }
        };
        const ne = "10a01dcf33762d3a204cb96429918ff6",
            ie = "https://log.zingmp3.vn/v1/web/stats/post/live",
            oe = 3e4,
            ae = {
                VIDEO: "/video/get-video-detail",
                SONG: "/song/get-song-info",
                PLAYLIST: "/playlist/get-playlist-detail",
                STREAMING_SONG: "/song/get-streamings"
            },
            se = {
                SONG: "song",
                VIDEO: "video",
                PLAYLIST: "playlist",
                ALBUM: "album"
            },
            le = {
                SONG: 1,
                VIDEO: 2,
                ALBUM: 3,
                PLAYLIST: 4
            },
            ue = {};
        ["PLAYING_SONG_CHANGE", "PLAYER_ENDED"].forEach(e => {
            ue[e] = e
        });
        const ce = {
        };
        var pe = function(e, t) {
                if (f.empty(t)) return e;
                var r = function(e) {
                    return Object.keys(e).map(function(t) {
                        return "undefined" !== e[t] && "null" !== e[t] && void 0 !== e[t] && null !== e[t] && "" !== e[t] ? "".concat(t, "=").concat(encodeURIComponent(e[t])) : void 0
                    }).filter(function(e) {
                        return void 0 !== e
                    }).join("&")
                }(t);
                return e + (f.empty(r) ? "" : "?" + r)
            },
            fe = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    n = arguments.length > 3 ? arguments[3] : void 0;
                return function() {
                    var e = Array.prototype.slice.call(arguments);
                    if (window.fetch) return window.fetch.apply(window, e);

                    function t(e) {
                        if ("string" != typeof e && (e = e.toString()), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e)) throw new TypeError("Invalid character in header field name");
                        return e.toLowerCase()
                    }

                    function r(e) {
                        return "string" != typeof e && (e = e.toString()), e
                    }

                    function n(e) {
                        var t = this;
                        this.map = {}, e instanceof n ? e.forEach(function(e, r) {
                            r.forEach(function(r) {
                                t.append(e, r)
                            })
                        }) : e && Object.getOwnPropertyNames(e).forEach(function(r) {
                            t.append(r, e[r])
                        })
                    }

                    function i(e) {
                        if (e.bodyUsed) return fetch.Promise.reject(new TypeError("Already read"));
                        e.bodyUsed = !0
                    }

                    function o(e) {
                        return new fetch.Promise(function(t, r) {
                            e.onload = function() {
                                t(e.result)
                            }, e.onerror = function() {
                                r(e.error)
                            }
                        })
                    }

                    function a(e) {
                        var t = new FileReader;
                        return t.readAsArrayBuffer(e), o(t)
                    }
                    n.prototype.append = function(e, n) {
                        e = t(e), n = r(n);
                        var i = this.map[e];
                        i || (i = [], this.map[e] = i), i.push(n)
                    }, n.prototype.delete = function(e) {
                        delete this.map[t(e)]
                    }, n.prototype.get = function(e) {
                        var r = this.map[t(e)];
                        return r ? r[0] : null
                    }, n.prototype.getAll = function(e) {
                        return this.map[t(e)] || []
                    }, n.prototype.has = function(e) {
                        return this.map.hasOwnProperty(t(e))
                    }, n.prototype.set = function(e, n) {
                        this.map[t(e)] = [r(n)]
                    }, n.prototype.forEach = function(e) {
                        var t = this;
                        Object.getOwnPropertyNames(this.map).forEach(function(r) {
                            e(r, t.map[r])
                        })
                    };
                    var s = {
                        blob: "FileReader" in window && "Blob" in window && function() {
                            try {
                                return new Blob, !0
                            } catch (e) {
                                return !1
                            }
                        }(),
                        formData: "FormData" in window
                    };

                    function l() {
                        return this.bodyUsed = !1, this._initBody = function(e) {
                            if (this._bodyInit = e, "string" == typeof e) this._bodyText = e;
                            else if (s.blob && Blob.prototype.isPrototypeOf(e)) this._bodyBlob = e;
                            else if (s.formData && FormData.prototype.isPrototypeOf(e)) this._bodyFormData = e;
                            else {
                                if (e) throw new Error("unsupported BodyInit type");
                                this._bodyText = ""
                            }
                        }, s.blob ? (this.blob = function() {
                            var e = i(this);
                            if (e) return e;
                            if (this._bodyBlob) return fetch.Promise.resolve(this._bodyBlob);
                            if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                            return fetch.Promise.resolve(new Blob([this._bodyText]))
                        }, this.arrayBuffer = function() {
                            return this.blob().then(a)
                        }, this.text = function() {
                            var e, t, r = i(this);
                            if (r) return r;
                            if (this._bodyBlob) return e = this._bodyBlob, (t = new FileReader).readAsText(e), o(t);
                            if (this._bodyFormData) throw new Error("could not read FormData body as text");
                            return fetch.Promise.resolve(this._bodyText)
                        }) : this.text = function() {
                            return i(this) || fetch.Promise.resolve(this._bodyText)
                        }, s.formData && (this.formData = function() {
                            return this.text().then(p)
                        }), this.json = function() {
                            return this.text().then(function(e) {
                                return JSON.parse(e)
                            })
                        }, this
                    }
                    var u = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];

                    function c(e, t) {
                        var r, i;
                        if (t = t || {}, this.url = e, this.credentials = t.credentials || "omit", this.headers = new n(t.headers), this.method = (i = (r = t.method || "GET").toUpperCase(), u.indexOf(i) > -1 ? i : r), this.mode = t.mode || null, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && t.body) throw new TypeError("Body not allowed for GET or HEAD requests");
                        this._initBody(t.body)
                    }

                    function p(e) {
                        var t = new FormData;
                        return e.trim().split("&").forEach(function(e) {
                            if (e) {
                                var r = e.split("="),
                                    n = r.shift().replace(/\+/g, " "),
                                    i = r.join("=").replace(/\+/g, " ");
                                t.append(decodeURIComponent(n), decodeURIComponent(i))
                            }
                        }), t
                    }

                    function f(e) {
                        var t = new n;
                        return e.getAllResponseHeaders().trim().split("\n").forEach(function(e) {
                            var r = e.trim().split(":"),
                                n = r.shift().trim(),
                                i = r.join(":").trim();
                            t.append(n, i)
                        }), t
                    }
                    var d = !("undefined" == typeof window || !window.ActiveXObject || window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent);

                    function h(e, t) {
                        t || (t = {}), this._initBody(e), this.type = "default", this.url = null, this.status = t.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = t.statusText, this.headers = t.headers instanceof n ? t.headers : new n(t.headers), this.url = t.url || ""
                    }
                    return l.call(c.prototype), l.call(h.prototype), window.Headers = n, window.Request = c, window.Response = h, window.fetch = function(e, t) {
                        var r;
                        return r = c.prototype.isPrototypeOf(e) && !t ? e : new c(e, t), new fetch.Promise(function(e, t) {
                            var n = function() {
                                return d && !/^(get|post|head|put|delete|options)$/i.test(this.method) ? (this.usingActiveXhr = !0, new window.ActiveXObject("Microsoft.XMLHTTP")) : new XMLHttpRequest
                            }.call(this);

                            function i() {
                                if (4 === n.readyState) {
                                    var r = 1223 === n.status ? 204 : n.status;
                                    if (r < 100 || r > 599) t(new TypeError("Network request failed"));
                                    else {
                                        var i = {
                                                status: r,
                                                statusText: n.statusText,
                                                headers: f(n),
                                                url: "responseURL" in n ? n.responseURL : /^X-Request-URL:/m.test(n.getAllResponseHeaders()) ? n.getResponseHeader("X-Request-URL") : void 0
                                            },
                                            o = "response" in n ? n.response : n.responseText;
                                        e(new h(o, i))
                                    }
                                }
                            }
                            "cors" === r.credentials && (n.withCredentials = !0), n.onreadystatechange = i, this.usingActiveXhr || (n.onload = i, n.onerror = function() {
                                t(new TypeError("Network request failed"))
                            }), n.open(r.method, r.url, !0), "responseType" in n && s.blob && (n.responseType = "blob"), r.headers.forEach(function(e, t) {
                                t.forEach(function(t) {
                                    n.setRequestHeader(e, t)
                                })
                            }), n.send(void 0 === r._bodyInit ? null : r._bodyInit)
                        })
                    }, fetch.Promise = window.Promise, window.fetch.polyfill = !0, window.fetch.apply(window, e)
                }(pe(e, t), r, n).then(function(e) {
                    return e.json()
                }).catch(function(e) {
                    return {
                        error: e
                    }
                })
            },
            de = r(3),
            he = r.n(de),
            ye = r(4),
            ge = r.n(ye);
        const me = (e, t = {}, r = {}, n) => (t.ctime = Math.round((new Date).getTime() / 1e3), t.sig = function(e, t) {
            debugger;
            console.log("Linh's debugger")
            console.trace();
            const r = function(e) {
                    const t = function(e) {
                            const t = {};
                            return Object.keys(e).sort().forEach(function(r) {
                                t[r] = e[r]
                            }), t
                        }(e),
                        r = [];
                    for (let n in t) "ctime" !== n && "id" !== n || null !== e[n] && void 0 !== e[n] && (r[n] = t[n]);
                    return Ae(r, "")
                }(t),
                n = he()("" + r);
            return ge()(e + n, ne)
        }(e, t), t.api_key = "38e8643fb0dc04e8d65b99994d3dafff", fe("https://zingmp3.vn/api" + e, t, r, n));


        function Ae(e, t = "&") {
            const r = encodeURIComponent;
            return Object.keys(e).map(t => r(e[t]).length > 5e3 ? "" : `${r(t)}=${r(e[t])}`).filter(e => "" !== e).join(t)
        }

        class _e extends X {
            get defaultOptions() {
                return {
//                     loop: "true" == ve("loop"),
//                     mute: "true" == ve("mute"),
//                     showList: "true" == ve("showList"),
//                     disabledControl: "true" == ve("disabledControl")
                }
            }
            get id() {
                return this._id ? this._id : (this._id = window.location.pathname.split("/")[3], this._id)
            }
            get apiPath() {
                if (!this.type) return "";
                switch (this.type) {
                    case se.VIDEO:
                        return ae.VIDEO;
                    case se.SONG:
                        return ae.SONG;
                    case se.PLAYLIST:
                        return ae.PLAYLIST
                }
                return ""
            }
            constructor(e, t = {}) {
                super(), this.options = d(this.defaultOptions, t), this.$parent = e, this.storage = new re, this.fetchAndRender();
            }
            normalizeData(e) {
                return {
                    id: e.id,
                    link: e.link,
                    title: e.title,
                    poster: e.thumbnail_medium,
                    artist: e.artists_names
                }
            }

            fetchData() {
                return me(this.apiPath, {
                    id: this.id
                })
            }
            async fetchAndRender() {
                const e = await this.fetchData();
                e && 0 === e.err && e.data && this.normalizeData(e.data), this.render()
            }
        }
        

        class we extends _e {
            get properties() {
                return {
                    className: "zembed song-embed"
                }
            }
            get type() {
                return se.SONG
            }
            constructor(e, t = {}) {
                super(e, t)
            }
            normalizeData(e) {
//                 this.data = d(super.normalizeData(e), {
//                     ttype: le.SONG,
//                     poster: e.thumbnail_medium && e.thumbnail_medium.replace("w240_r1x1_jpeg/", ""),
//                     album: e.album && e.album.title,
// //                     source: this.buildSources(e.streaming)
//                 })
            }
        }
                
        r.d(t, "VideoEmbed", function() {
            return Ee
        }), r.d(t, "SongEmbed", function() {
            return we
        }), r.d(t, "PlaylistEmbed", function() {
            return ze
        })
    }])
});