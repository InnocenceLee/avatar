/*
 Highcharts JS v2.0.0 (2010-07-13)
 Exporting module
Download by http://www.codefans.net
 (c) 2010 Torstein H�nsi

 License: www.highcharts.com/license
*/
(function() {
    var j = Highcharts,
    G = j.Chart,
    z = j.addEvent,
    C = j.defaultOptions,
    o = j.createElement,
    H = j.discardElement,
    A = j.css,
    D = j.merge,
    p = j.each,
    l = j.extend,
    K = Math,
    L = K.max,
    q = document,
    M = window,
    r = C.lang,
    v = "M",
    w = "L",
    x = "div",
    N = "hidden",
    B = "none",
    O = "highcharts-",
    I = "absolute",
    m = "px";
    l(r, {
        downloadPNG: "Download PNG image",
        downloadJPEG: "Download JPEG image",
        downloadPDF: "Download PDF document",
        downloadSVG: "Download SVG vector image",
        exportButtonTitle: "Export to raster or vector image",
        printButtonTitle: "Print the chart"
    });
    C.navigation = {
        menuStyle: {
            border: "1px solid #A0A0A0",
            background: "#FFFFFF"
        },
        menuItemStyle: {
            padding: "0 5px",
            background: B,
            color: "#303030"
        },
        menuItemHoverStyle: {
            background: "#4572A5",
            color: "#FFFFFF"
        },
        buttonOptions: {
            align: "right",
            backgroundColor: {
                linearGradient: [0, 0, 0, 20],
                stops: [[0.4, "#F7F7F7"], [0.6, "#E3E3E3"]]
            },
            borderColor: "#B0B0B0",
            borderRadius: 3,
            borderWidth: 1,
            height: 20,
            hoverBorderColor: "#909090",
            hoverSymbolFill: "#81A7CF",
            hoverSymbolStroke: "#4572A5",
            symbolFill: "#E0E0E0",
            symbolStroke: "#A0A0A0",
            symbolX: 11.5,
            symbolY: 10.5,
            verticalAlign: "top",
            width: 24,
            y: 10
        }
    };
    C.exporting = {
        type: "image/png",
        url: "http://export.highcharts.com/",
        width: 800,
        buttons: {
            exportButton: {
                symbol: "exportIcon",
                x: -10,
                symbolFill: "#A8BF77",
                hoverSymbolFill: "#768F3E",
                _titleKey: "exportButtonTitle",
                menuItems: [{
                    text: r.downloadPNG,
                    onclick: function() {
                        this.exportChart()
                    }
                },
                {
                    text: r.downloadJPEG,
                    onclick: function() {
                        this.exportChart({
                            type: "image/jpeg"
                        })
                    }
                },
                {
                    text: r.downloadPDF,
                    onclick: function() {
                        this.exportChart({
                            type: "application/pdf"
                        })
                    }
                },
                {
                    text: r.downloadSVG,
                    onclick: function() {
                        this.exportChart({
                            type: "image/svg+xml"
                        })
                    }
                }]
            },
            printButton: {
                symbol: "printIcon",
                x: -36,
                symbolFill: "#B5C9DF",
                hoverSymbolFill: "#779ABF",
                _titleKey: "printButtonTitle",
                onclick: function() {
                    this.print()
                }
            }
        }
    };
    l(G.prototype, {
        getSVG: function(b) {
            var c = this,
            a, f, d = D(c.options, b);
            if (!q.createElementNS) q.createElementNS = function(h, e) {
                var g = q.createElement(e);
                g.getBBox = function() {
                    return c.renderer.Element.prototype.getBBox.apply({
                        element: g
                    })
                };
                return g
            };
            a = o(x, null, {
                position: I,
                top: "-9999em",
                width: c.chartWidth + m,
                height: c.chartHeight + m
            },
            q.body);
            l(d.chart, {
                renderTo: a,
                renderer: "SVG"
            });
            d.exporting.enabled = false;
            d.chart.plotBackgroundImage = null;
            p(d.series,
            function(h) {
                h.animation = false;
                p(h.data,
                function(e) {
                    e && e.marker && /^url\(/.test(e.marker.symbol) && delete e.marker.symbol
                })
            });
            b = new Highcharts.Chart(d);
            f = a.getElementsByTagName(x)[0].innerHTML;
            d = null;
            b.destroy();
            H(a);
            return f = f.replace(/zIndex="[^"]+"/g, "").replace(/isShadow="[^"]+"/g, "").replace(/symbolName="[^"]+"/g, "").replace(/jQuery[0-9]+="[^"]+"/g, "").replace(/isTracker="[^"]+"/g, "").replace(/id=([^" >]+)/g, 'id="$1"').replace(/class=([^" ]+)/g, 'class="$1"').replace(/ transform /g, " ").replace(/:path/g, "path").replace(/style="([^"]+)"/g,
            function(h) {
                return h.toLowerCase()
            })
        },
        exportChart: function(b, c) {
            var a, f = this,
            d = f.getSVG(c);
            b = D(f.options.exporting, b);
            a = o("form", {
                method: "post",
                action: b.url
            },
            {
                display: B
            },
            q.body);
            p(["filename", "type", "width", "svg"],
            function(h) {
                o("input", {
                    type: N,
                    name: h,
                    value: {
                        filename: b.filename || "chart",
                        type: b.type,
                        width: b.width,
                        svg: d
                    } [h]
                },
                null, a)
            });
            a.submit();
            H(a)
        },
        print: function() {
            var b = this,
            c = b.container,
            a, f = [],
            d = c.parentNode,
            h = q.body,
            e = h.childNodes;
            if (!b.isPrinting) {
                b.isPrinting = true;
                p(e,
                function(g) {
                    if (g.nodeType == 1) {
                        f[a] = g.style.display;
                        g.style.display = B
                    }
                });
                h.appendChild(c);
                M.print();
                setTimeout(function() {
                    d.appendChild(c);
                    p(e,
                    function(g) {
                        if (g.nodeType == 1) g.style.display = f[a]
                    });
                    b.isPrinting = false
                },
                1E3)
            }
        },
        contextMenu: function(b, c, a, f, d, h) {
            var e = this,
            g = e.options.navigation,
            n = g.menuItemStyle,
            s = e.chartWidth,
            t = e.chartHeight,
            u = "cache-" + b,
            i = e[u],
            k = L(d, h),
            y = "3px 3px 10px #888",
            J,
            E;
            if (!i) {
                e[u] = i = o(x, {
                    className: O + b
                },
                {
                    position: I,
                    zIndex: 1E3,
                    padding: k + m
                },
                e.container);
                J = o(x, null, l({
                    MozBoxShadow: y,
                    WebkitBoxShadow: y
                },
                g.menuStyle), i);
                E = function() {
                    A(i, {
                        display: B
                    })
                };
                z(i, "mouseleave", E);
                p(c,
                function(F) {
                    F && o(x, {
                        onclick: function() {
                            E();
                            F.onclick.apply(e, arguments)
                        },
                        onmouseover: function() {
                            A(this, g.menuItemHoverStyle)
                        },
                        onmouseout: function() {
                            A(this, n)
                        },
                        innerHTML: F.text
                    },
                    l({
                        cursor: "pointer"
                    },
                    n), J)
                });
                e.exportMenuWidth = i.offsetWidth;
                e.exportMenuHeigh = i.offsetHeight
            }
            b = {
                display: "block"
            };
            if (a + e.exportMenuWidth > s) b.right = s - a - d - k + m;
            else b.left = a - k + m;
            if (f + h + e.exportMenuWidth > t) b.bottom = t - f - k + m;
            else b.top = f + h - k + m;
            A(i, b)
        },
        addButton: function(b) {
            function c() {
                i.attr(y);
                u.attr(k)
            }
            var a = this,
            f = a.renderer,
            d = D(a.options.navigation.buttonOptions, b),
            h = d.onclick,
            e = d.menuItems;
            b = a.getAlignment(d);
            var g = b.x,
            n = b.y,
            s = d.width,
            t = d.height,
            u, i;
            b = d.borderWidth;
            var k = {
                stroke: d.borderColor
            },
            y = {
                stroke: d.symbolStroke,
                fill: d.symbolFill
            };
            if (d.enabled !== false) {
                u = f.rect(0, 0, s, t, d.borderRadius, b).translate(g, n).attr(l({
                    fill: d.backgroundColor,
                    "stroke-width": b,
                    zIndex: 19
                },
                k)).add();
                b = f.rect(g, n, s, t, 0).attr({
                    fill: "rgba(255, 255, 255, 0.001)",
                    title: r[d._titleKey],
                    zIndex: 21
                }).css({
                    cursor: "pointer"
                }).on("mouseover",
                function() {
                    i.attr({
                        stroke: d.hoverSymbolStroke,
                        fill: d.hoverSymbolFill
                    });
                    u.attr({
                        stroke: d.hoverBorderColor
                    })
                }).on("mouseout", c).add();
                z(b.element, "click", c);
                if (e) h = function() {
                    a.contextMenu("export-menu", e, g, n, s, t)
                };
                z(b.element, "click",
                function() {
                    h.apply(a, arguments)
                });
                i = f.symbol(d.symbol, g + d.symbolX, n + d.symbolY, (d.symbolSize || 12) / 2).attr(l(y, {
                    "stroke-width": d.symbolStrokeWidth || 1,
                    zIndex: 20
                })).add()
            }
        }
    });
    j.Renderer.prototype.symbols.exportIcon = function(b, c, a) {
        return [v, b - a, c + a, w, b + a, c + a, b + a, c + a * 0.5, b - a, c + a * 0.5, "Z", v, b, c + a * 0.5, w, b - a * 0.5, c - a / 3, b - a / 6, c - a / 3, b - a / 6, c - a, b + a / 6, c - a, b + a / 6, c - a / 3, b + a * 0.5, c - a / 3, "Z"]
    };
    j.Renderer.prototype.symbols.printIcon = function(b, c, a) {
        return [v, b - a, c + a * 0.5, w, b + a, c + a * 0.5, b + a, c - a / 3, b - a, c - a / 3, "Z", v, b - a * 0.5, c - a / 3, w, b - a * 0.5, c - a, b + a * 0.5, c - a, b + a * 0.5, c - a / 3, "Z", v, b - a * 0.5, c + a * 0.5, w, b - a * 0.75, c + a, b + a * 0.75, c + a, b + a * 0.5, c + a * 0.5, "Z"]
    };
    z(G.prototype, "load",
    function(b) {
        b = b.target;
        var c, a = b.options.exporting,
        f = a.buttons;
        if (a.enabled !== false) for (c in f) b.addButton(f[c])
    })
})();