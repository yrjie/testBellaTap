(function() {
    var w, A, x, z, y, i, l, n, o, q, g, s, C, e, j, m, p, v, G, B, H, Q, R, S, T, E, U, V, W, X, Y, I, J, Z, K, $, aa, ba, ca, da, ea, L, fa, ga, ha, ia, ja, ka, la, ma, r, M, na, oa, pa, qa, ra, sa, N, ta, O, ua, va, wa, xa, ya, za, Aa, Ba, Ca, Da, Ea = [].slice,
        Fa = {}.hasOwnProperty,
        t = function(d, b) {
            function a() {
                this.constructor = d
            }
            for (var f in b) Fa.call(b, f) && (d[f] = b[f]);
            a.prototype = b.prototype;
            d.prototype = new a;
            d.__super__ = b.prototype;
            return d
        };
    r = {
        TO_RADIANS: Math.PI / 180,
        FROM_RADIANS: 180 / Math.PI,
        hexToRGB: function(d, b) {
            var a, f, c;
            null == b && (b = 0);
            "#" === d.charAt(0) &&
                (d = d.substring(1, 7));
            c = parseInt(d.substring(0, 2), 16);
            f = parseInt(d.substring(2, 4), 16);
            a = parseInt(d.substring(4, 6), 16);
            return b ? "rgba(" + c + ", " + f + ", " + a + ", " + b + ")" : "rgb(" + c + ", " + f + ", " + a + ")"
        },
        valuesOf: function() {
            var d, b, a, f, c;
            a = 1 <= arguments.length ? Ea.call(arguments, 0) : [];
            d = {};
            f = 0;
            for (c = a.length; f < c; f++)(b = a[f]) && r.mergeProps(b, d);
            return d
        },
        mergeProps: function(d, b) {
            var a, f;
            null == b && (b = {});
            for (a in d) f = d[a], b[a] = f && "object" === typeof f && !f.length && 0 !== f.length ? this.mergeProps(f, b[a]) : f;
            return b
        },
        copy: function(d) {
            var b,
                a, f;
            b = {};
            for (a in d) f = d[a], b[a] = f && "object" === typeof f && !f.length && 0 !== f.length ? this.copy(f) : f;
            return b
        },
        normalizeRect: function(d) {
            return 0 > d.width ? r.normalizeRect({
                x: d.x + d.width,
                y: d.y,
                width: -d.width,
                height: d.height,
                orientation: d.orientation
            }) : 0 > d.height ? r.normalizeRect({
                x: d.x,
                y: d.y + d.height,
                width: d.width,
                height: -d.height,
                orientation: d.orientation
            }) : d
        },
        distanceBetweenPointAndLine: function(d, b) {
            var a, f, c, h;
            a = b.from.x;
            c = b.from.y;
            f = b.to.x;
            h = b.to.y;
            return Math.abs((f - a) * (c - d.y) - (a - d.x) * (h - c)) / Math.sqrt((f -
                a) * (f - a) + (h - c) * (h - c))
        },
        isHasRectPoint: function(d, b) {
            var a;
            a = {
                x: d.x,
                y: d.y,
                width: d.width,
                height: d.height,
                textAlign: d.textAlign,
                textBaseline: d.textBaseline
            };
            90 === d.rotation && (a.width = d.height, a.height = d.width, a.textBaseline = function() {
                switch (d.textAlign) {
                    case "left":
                        return "top";
                    case "center":
                        return "middle";
                    case "right":
                        return "bottom"
                }
            }(), a.textAlign = function() {
                switch (d.textBaseline) {
                    case "top":
                        return "right";
                    case "center":
                        return "middle";
                    case "bottom":
                        return "left"
                }
            }());
            return this.hasLeftRightPoint(a,
                b) && this.hasTopBottomPoint(a, b)
        },
        hasLeftRightPoint: function(d, b) {
            var a, f, c;
            return "right" === d.textAlign ? d.x >= (a = b.x) && a >= d.x - d.width : "center" === d.textAlign ? d.x - d.width / 2 <= (f = b.x) && f <= d.x + d.width / 2 : d.x <= (c = b.x) && c <= d.x + d.width
        },
        hasTopBottomPoint: function(d, b) {
            var a, f, c;
            return "bottom" === d.textBaseline ? d.y >= (a = b.y) && a >= d.y - d.height : "middle" === d.textBaseline ? d.y - d.height / 2 <= (f = b.y) && f <= d.y + d.height / 2 : d.y <= (c = b.y) && c <= d.y + d.height
        },
        isHasArcPoint: function(d, b) {
            var a, f, c;
            c = b.y - d.y;
            f = b.x - d.x;
            a = Math.sqrt(c *
                c + f * f);
            if (!(a >= d.radius * (100 - d.fillPercent) / 100 && a < d.radius)) return !1;
            a = Math.atan2(c, f) * r.FROM_RADIANS;
            0 > a && (a += 360);
            return a >= d.startAngle && a < d.endAngle
        },
        isHasCirclePoint: function(d, b) {
            var a, f;
            f = b.y - d.y;
            a = b.x - d.x;
            a = Math.sqrt(f * f + a * a);
            return 0 <= a && a < d.radius
        },
        circleXY: function(d, b, a) {
            return {
                x: d.x + Math.sin(a * r.TO_RADIANS) * b,
                y: d.y - Math.cos(a * r.TO_RADIANS) * b
            }
        },
        measureTime: function(d) {
            var b;
            b = (new Date).getTime();
            d();
            d = (new Date).getTime() - b;
            return console.log("Execution time: " + d)
        }
    };
    l = function() {
        function d() {
            this.children = [];
            this.mouseover = !1
        }
        d.prototype.STACK_GAP = 1.5;
        d.prototype.addChild = function(b) {
            return this.children.push(b)
        };
        d.prototype.removeChild = function(b) {
            var a, f, c, h, k;
            k = this.children;
            f = c = 0;
            for (h = k.length; c < h; f = ++c) a = k[f], a === b && this.children.splice(f, 1)
        };
        d.prototype.optionsChanged = function(b) {
            var a, f, c, h;
            h = this.children;
            f = 0;
            for (c = h.length; f < c; f++) a = h[f], a.optionsChanged(b)
        };
        d.prototype.resize = function(b) {
            var a, f, c, h;
            h = this.children;
            f = 0;
            for (c = h.length; f < c; f++) a = h[f], a.resize(b)
        };
        d.prototype.render = function(b) {
            var a,
                f, c, h;
            h = this.children;
            f = 0;
            for (c = h.length; f < c; f++) a = h[f], a.render(b)
        };
        d.prototype.draw = function(b, a) {
            var f, c, h, k;
            k = this.children;
            c = 0;
            for (h = k.length; c < h; c++) f = k[c], f.draw(b, a)
        };
        d.prototype.getKeys = function() {
            var b, a, f, c, h, k, F, d;
            a = [];
            F = this.children;
            f = 0;
            for (h = F.length; f < h; f++) {
                b = F[f];
                d = b.getKeys();
                c = 0;
                for (k = d.length; c < k; c++) b = d[c], a.push(b)
            }
            return a
        };
        d.prototype.getMaxX = function() {
            var b, a, f, c, h;
            a = this.x;
            h = this.children;
            f = 0;
            for (c = h.length; f < c; f++) b = h[f], b = b.getMaxX(), isNaN(a) ? a = b : isNaN(b) || (a = Math.max(a,
                b));
            return a
        };
        d.prototype.getMinX = function() {
            var b, a, f, c, h;
            a = this.x;
            h = this.children;
            f = 0;
            for (c = h.length; f < c; f++) b = h[f], b = b.getMinX(), isNaN(a) ? a = b : isNaN(b) || (a = Math.min(a, b));
            return a
        };
        d.prototype.getElement = function() {
            return null
        };
        d.prototype.addValues = function() {
            var b, a, f, c, h;
            h = this.values;
            b = f = 0;
            for (c = h.length; f < c; b = ++f)
                if (a = h[b])(b = this.getElement(b, a)) && this.addChild(b)
        };
        d.prototype.onTouch = function(b) {
            var a, f, c, h;
            h = this.children;
            f = 0;
            for (c = h.length; f < c; f++) a = h[f], a.onTouch(b)
        };
        d.prototype.onClick =
            function(b) {
                var a, f, c, h;
                h = this.children;
                f = 0;
                for (c = h.length; f < c; f++)
                    if (a = h[f], a = a.onClick(b)) return a
            };
        return d
    }();
    I = function() {
        function d(b, a, f, c) {
            this.top = b;
            this.left = a;
            this.right = f;
            this.bottom = c;
            this.barGroups = 0
        }
        d.prototype.view = function(b, a, f, c) {
            b = new d(b, a, a + f, b + c);
            b.barGroups = this.barGroups;
            b.xaxis = this.xaxis;
            b.yaxis = this.yaxis;
            b.yRightAxis = this.yRightAxis;
            return b
        };
        d.prototype.getWidth = function() {
            return this.getRight() - this.getLeft()
        };
        d.prototype.getHeight = function() {
            return this.getBottom() -
                this.getTop()
        };
        d.prototype.getLeft = function() {
            return this.left
        };
        d.prototype.getRight = function() {
            return this.right
        };
        d.prototype.getTop = function() {
            return this.top
        };
        d.prototype.getBottom = function() {
            return this.bottom
        };
        d.prototype.getCenterX = function() {
            return this.getWidth() / 2 + this.getLeft()
        };
        d.prototype.getCenterY = function() {
            return this.getHeight() / 2 + this.getTop()
        };
        d.prototype.getXFromValue = function(b) {
            return this.getXAxisValues().getValue(b)
        };
        d.prototype.getOffsetXFromValue = function(b) {
            return this.getXAxisValues().getOffsetValue(b)
        };
        d.prototype.getYFromValue = function(b, a) {
            return this.getYAxisValues(a).getValue(b)
        };
        d.prototype.getYBottom = function(b) {
            return this.getYAxisValues(b).getBottomValue()
        };
        d.prototype.getVerticalBarCoords = function() {
            this.verticalBarCoords || (this.verticalBarCoords = new na(this, this.xaxis));
            return this.verticalBarCoords
        };
        d.prototype.getHorizontalBarCoords = function(b) {
            if (b || "right" === b) return this.horizontalBarCoordsYRight || (this.horizontalBarCoordsYRight = new v(this, this.yRightAxis)), this.horizontalBarCoordsYRight;
            this.horizontalBarCoords || (this.horizontalBarCoords = new v(this, this.yaxis));
            return this.horizontalBarCoords
        };
        d.prototype.getYAxisValues = function(b) {
            return "right" === b ? this.getYRightAxisValues() : this.getYLeftAxisValues()
        };
        d.prototype.getYLeftAxisValues = function() {
            return this.yaxisValues ? this.yaxisValues : this.yaxisValues = new O(this, this.yaxis)
        };
        d.prototype.getYRightAxisValues = function() {
            return this.yRightAxisValues ? this.yRightAxisValues : this.yRightAxisValues = new O(this, this.yRightAxis)
        };
        d.prototype.getXAxisValues =
            function() {
                return this.xaxisValues || void 0 === this.xaxis ? this.xaxisValues : this.xaxisValues = new qa(this, this.xaxis)
            };
        d.prototype.getCoordsFromXPositionAndYValue = function(b, a, f) {
            return {
                x: this.getXFromValue(b),
                y: this.getYFromValue(a, f)
            }
        };
        d.prototype.getCoordsFromXValueAndYValue = function(b, a, f) {
            return {
                x: this.getXFromValue(b),
                y: this.getYFromValue(a, f)
            }
        };
        d.prototype.toString = function() {
            return "Left: " + this.getLeft() + " Right: " + this.getRight() + " Top: " + this.getTop() + " Bottom: " + this.getBottom()
        };
        d.prototype.getYOrigin =
            function(b) {
                null == b && (b = "left");
                if ("right" === b && null == this.yRightAxisValues || "left" === b && null == this.yaxisValues) return this.bottom;
                b = this.getYFromValue(0, b);
                return this.top <= b && b <= this.bottom ? b : this.bottom
            };
        return d
    }();
    w = function() {
        function d(b, a) {
            this.sc = b;
            this.axis = a;
            this.range = this.getRange();
            this.min = this.range.min;
            this.steps = this.range.steps;
            this.itemWidth = this.getFromTo() / this.range.count;
            this.offset = this.axis.offset ? Math.abs(this.itemWidth / 2) : 0
        }
        d.prototype.DIRECTION = 1;
        d.prototype.getRange =
            function() {
                return this.axis.getRange()
            };
        d.prototype.getOffsetValue = function(b) {
            return this.getValue(b) + this.offset * this.DIRECTION
        };
        d.prototype.getValue = function(b) {
            var a, b = b - this.min;
            if (0 < (a = this.steps) && 1 > a) b /= this.steps;
            return this.getFrom() + b * this.itemWidth * this.DIRECTION
        };
        return d
    }();
    qa = function(d) {
        function b() {
            return ua = b.__super__.constructor.apply(this, arguments)
        }
        t(b, d);
        b.prototype.getFromTo = function() {
            return this.sc.getWidth()
        };
        b.prototype.getFrom = function() {
            return this.sc.getLeft()
        };
        return b
    }(w);
    O = function(d) {
        function b() {
            return va = b.__super__.constructor.apply(this, arguments)
        }
        t(b, d);
        b.prototype.DIRECTION = -1;
        b.prototype.getFromTo = function() {
            return this.sc.getHeight()
        };
        b.prototype.getFrom = function() {
            return this.sc.getBottom()
        };
        b.prototype.getTopValue = function() {
            return b.__super__.getValue.apply(this, [this.getRange().max])
        };
        b.prototype.getBottomValue = function() {
            return b.__super__.getValue.apply(this, [Math.max(1.0E-9, this.getRange().min)])
        };
        b.prototype.getValue = function(a) {
            return this.axis.log ?
                (0 === a && (a = 1.0E-8), b.__super__.getValue.call(this, Math.log(a) / Math.LN10)) : b.__super__.getValue.call(this, a)
        };
        return b
    }(w);
    w = function() {
        function d(b, a) {
            this.sc = b;
            this.axis = a;
            this.groupsCount = this.sc.barGroups || 1;
            this.count = this.axis.getRange().count;
            this.itemSize = this.getSize() / this.count;
            this.gap = this.itemSize * this.BAR_GAP;
            this.itemSizeWithoutGap = this.itemSize - this.gap;
            this.groupSize = (this.itemSizeWithoutGap - this.GROUP_GAP * (this.groupsCount - 1)) / this.groupsCount;
            this.axisOffset = this.axis.offset ? this.itemSize /
                2 : 0;
            this.offset = this.getFrom() + this.axisOffset;
            this.gapOffset = this.itemSizeWithoutGap / 2;
            this.itemOffset = this.offset - this.gapOffset
        }
        d.prototype.BAR_GAP = 0.15;
        d.prototype.GROUP_GAP = 1;
        d.prototype.getRange = function() {
            return this.axis.getRange().count
        };
        d.prototype.middles = function() {
            var b, a, f, c;
            if (100 < this.count || 2 > this.count) return [];
            c = [];
            b = a = 0;
            for (f = this.count - 2; 0 <= f ? a <= f : a >= f; b = 0 <= f ? ++a : --a) c.push(this.itemOffset + b * this.itemSize + +this.itemSizeWithoutGap + this.gap / 2);
            return c
        };
        d.prototype.at = function(b,
            a) {
            null == a && (a = 0);
            return {
                from: this.itemOffset + b * this.itemSize + a * this.groupSize + this.GROUP_GAP * a,
                size: this.groupSize
            }
        };
        return d
    }();
    v = function(d) {
        function b() {
            return wa = b.__super__.constructor.apply(this, arguments)
        }
        t(b, d);
        b.prototype.getSize = function() {
            return this.sc.getHeight()
        };
        b.prototype.getFrom = function() {
            return this.sc.getTop()
        };
        return b
    }(w);
    na = function(d) {
        function b() {
            return xa = b.__super__.constructor.apply(this, arguments)
        }
        t(b, d);
        b.prototype.getSize = function() {
            return this.sc.getWidth()
        };
        b.prototype.getFrom =
            function() {
                return this.sc.getLeft()
            };
        return b
    }(w);
    J = function(d) {
        function b(a, f, c, h) {
            b.__super__.constructor.call(this, a, f, c, h)
        }
        t(b, d);
        b.prototype.setAngles = function(a) {
            this.angles = a;
            return this.radarAngle = 360 / this.angles
        };
        b.prototype.getCoordsFromXPositionAndYValue = function(a, f, c, b) {
            null == c && (c = this.getRadarRadius());
            null == b && (b = this.radarAngle);
            a *= b;
            b = f / this.radarAxis.getRange().max;
            f = (a - 90) * r.TO_RADIANS;
            c *= b;
            return {
                x: c * Math.cos(f) + this.getCenterX(),
                y: c * Math.sin(f) + this.getCenterY()
            }
        };
        b.prototype.getCoordsFromXValueAndYValue =
            function(a, f, c, b) {
                return this.getCoordsFromXPositionAndYValue(a, f, c, b)
            };
        b.prototype.getRadarRadius = function() {
            return Math.min(this.getWidth(), this.getHeight()) / 2
        };
        b.prototype.getMax = function() {
            return this.radarAxis.getRange().max
        };
        return b
    }(I);
    Z = function(d) {
        function b(a, f, c, h) {
            b.__super__.constructor.call(this, a, f, c, h)
        }
        t(b, d);
        b.prototype.setAngles = function(a) {
            this.angles = a;
            return this.radarAngle = 180 / this.angles
        };
        b.prototype.getPositionAngle = function(a, f) {
            null == f && (f = this.angles);
            return a * (180 / f) +
                180
        };
        b.prototype.getValueAngle = function(a) {
            var f, c;
            c = this.radarAxis.getRange().min;
            f = this.radarAxis.getRange().max;
            return 180 * (a - c) / (f - c) + 180
        };
        b.prototype.getCoordsFromRadiusAndAngle = function(a, f) {
            var c, b;
            c = f * r.TO_RADIANS;
            b = this.getCentre();
            return {
                x: a * Math.cos(c) + b.x,
                y: a * Math.sin(c) + b.y
            }
        };
        b.prototype.getRadarRadius = function() {
            return Math.min(this.getHeight(), this.getWidth() / 2)
        };
        b.prototype.getCentre = function() {
            return {
                x: this.getCenterX(),
                y: this.getCenterY() + this.getRadarRadius() / 2
            }
        };
        return b
    }(I);
    B =
        function(d) {
            function b(a) {
                b.__super__.constructor.call(this, a);
                this.rotation = this.y = this.x = 0;
                this.visible = !0;
                this.colour = a.colour;
                this.context = a.context;
                this.textBaseline = "top";
                this.calculatedtextDimensions = !1;
                this.fontSize = this.options.fontSize
            }
            t(b, d);
            b.prototype.linkImage = {
                width: 11,
                height: 8,
                totalWidth: 16
            };
            b.prototype.optionsChanged = function(a) {
                a = this.options = a;
                this.font = a.font;
                this.fontSize = a.fontSize;
                this.maxLineWidth = a.maxLineWidth;
                return this.calculatedtextDimensions = !1
            };
            b.prototype.draw = function(a,
                f) {
                var c, b;
                if (this.hasVisibleText() && (c = {
                        x: this.x,
                        y: this.y,
                        height: this.height,
                        width: this.width,
                        rotation: this.rotation,
                        font: this.font,
                        fontSize: this.fontSize,
                        colour: this.colour,
                        textAlign: this.textAlign,
                        textBaseline: this.textBaseline,
                        xOffset: this.getXStart(),
                        noClip: !0
                    }, this.textDimensions(), this.textWrap ? (this.textDimensions(), c.text = this.lines) : c.text = this.text, f.animateText(c, this.startX, this.startY), this.hasLink())) c = this.getLinkImagePosition(), b = Charts.options.assetUrl + Charts.options.linkIcon, f.image(b,
                    this.x, this.y, this.linkImage.width, this.linkImage.height, {
                        rotation: this.rotation,
                        xOffset: c.x,
                        yOffset: c.y,
                        link: this.link,
                        noClip: !0
                    })
            };
            b.prototype.getXStart = function() {
                return !this.hasLink() ? 0 : Math.round(function() {
                    switch (this.textAlign) {
                        case "right":
                            return -this.linkImage.totalWidth;
                        case "center":
                            return -this.linkImage.totalWidth / 2;
                        default:
                            return 0
                    }
                }.call(this))
            };
            b.prototype.getLinkImagePosition = function() {
                var a, f, c;
                a = function() {
                    switch (this.textAlign) {
                        case "right":
                            return 0 - this.linkImage.width;
                        case "center":
                            return (this.width -
                                this.linkImage.width) / 2;
                        default:
                            return this.width - this.linkImage.width
                    }
                }.call(this);
                c = (null != (f = this.lineHeight) ? f : this.fontHeight) - this.linkImage.height;
                f = function() {
                    switch (this.textBaseline) {
                        case "bottom":
                            return 0 - this.linkImage.height - c;
                        case "middle":
                            return this.height / 2 - this.linkImage.height - this.linkImage.height / 4 - c / 2;
                        default:
                            return this.height - this.linkImage.height - this.linkImage.height / 2
                    }
                }.call(this);
                return {
                    x: Math.floor(a),
                    y: Math.floor(f)
                }
            };
            b.prototype.setText = function(a, f) {
                this.text = a;
                this.link =
                    f;
                return this.calculatedtextDimensions = !1
            };
            b.prototype.getWidth = function() {
                this.textDimensions();
                return this.width
            };
            b.prototype.getHeight = function() {
                this.textDimensions();
                return this.height
            };
            b.prototype.hasVisibleText = function() {
                var a;
                return this.visible && 0 < (null != (a = this.text) ? a.length : void 0)
            };
            b.prototype.hasLink = function() {
                var a;
                return 0 < (null != (a = this.link) ? a.length : void 0) && Charts.options.showLinks
            };
            b.prototype.textDimensions = function() {
                var a, f, c, b, k, F, d, e, D = this;
                if (this.hasVisibleText()) {
                    if (this.calculatedtextDimensions &&
                        this.maxLineWidth === this.measuredLineWidth) return {
                        width: this.width,
                        height: this.height
                    };
                    if (this.textWrap) {
                        this.lines = [];
                        f = "";
                        this.height = this.width = c = 0;
                        this.lineHeight = this.measureText("x", this.font, this.fontSize).height;
                        b = function(a) {
                            null == a && (a = !1);
                            a || (f = f.replace(/^\s+|\s+$/g, ""));
                            if (f) return D.lines.push(f), D.width = Math.max(c, D.width), D.height += D.lineHeight, f = "", c = 0
                        };
                        e = this.text.split(" ");
                        F = 0;
                        for (d = e.length; F < d; F++) k = e[F], a = this.measureText(k, this.font, this.fontSize), c + a.width > this.maxLineWidth &&
                            b(), f && (f += " "), f += k, c = this.measureText(f, this.font, this.fontSize).width;
                        this.hasLink() ? (c + this.linkImage.totalWidth > this.maxLineWidth && (b(), f = " "), c += this.linkImage.totalWidth, b(!0)) : b()
                    } else a = this.measureText(this.text, this.font, this.fontSize), this.width = a.width + (this.hasLink() ? this.linkImage.totalWidth : 0), this.height = null != (b = a.height) ? b : this.fontHeight;
                    this.measuredLineWidth = this.maxLineWidth;
                    this.calculatedtextDimensions = !0;
                    return {
                        width: this.width,
                        height: this.height
                    }
                }
            };
            b.prototype.intercepts =
                function(a) {
                    return r.isHasRectPoint(this, a)
                };
            b.prototype.onTouch = function(a) {
                if (this.visible && this.tip && r.isHasRectPoint(this, a)) return a.addTooltip(this.tip, this.colour, this.context)
            };
            b.prototype.onClick = function(a) {
                if (this.hasLink() && this.intercepts(a)) return {
                    link: this.link
                }
            };
            return b
        }(l);
    H = function(d) {
        function b() {
            return ya = b.__super__.constructor.apply(this, arguments)
        }
        t(b, d);
        b.prototype.getHeight = function() {
            var a, f, c, b, k;
            a = 0;
            k = this.children;
            c = 0;
            for (b = k.length; c < b; c++) f = k[c], f.hasVisibleText() &&
                (a = Math.max(a, f.getHeight()));
            return a
        };
        b.prototype.getWidth = function() {
            var a, f, c, b, k;
            f = 0;
            k = this.children;
            c = 0;
            for (b = k.length; c < b; c++) a = k[c], a.hasVisibleText() && (f = Math.max(f, a.getWidth()));
            return f
        };
        b.prototype.getSumWidth = function() {
            var a, f, c, b, k;
            f = 0;
            k = this.children;
            c = 0;
            for (b = k.length; c < b; c++) a = k[c], a.hasVisibleText() && (f += a.getWidth());
            return f
        };
        b.prototype.getSumHeight = function() {
            var a, f, c, b, k;
            a = 0;
            k = this.children;
            c = 0;
            for (b = k.length; c < b; c++) f = k[c], f.hasVisibleText() && (a += f.getHeight());
            return a
        };
        return b
    }(l);
    G = function(d) {
        function b(a, f) {
            null == f && (f = {});
            b.__super__.constructor.call(this, f);
            this.values = a;
            this.addValues();
            this.keyPadding = 12;
            this.hidden = this.newLine = !1
        }
        var a, f;
        t(b, d);
        b.prototype.getElement = function(c, b) {
            var k;
            k = new B(b);
            k.setText(b.text, b.link);
            return new f(new a(b), k)
        };
        b.prototype.measure = function(a) {
            var f, b;
            if (0 === this.children.length) return {
                width: 0,
                height: 0
            };
            f = b = 0;
            this.iterate(a, void 0, function(a, c) {
                return b = Math.max(b, c)
            }, function(a) {
                return f = a
            });
            return {
                width: b,
                height: f
            }
        };
        b.prototype.iterate = function(a, f, b, d) {
            var e, u, D, j, m, g, i, l, p, n;
            null == f && (f = function() {});
            null == b && (b = function() {});
            null == d && (d = function() {});
            i = g = 0;
            j = this.newLine ? a : void 0;
            D = [];
            u = 0;
            n = this.children;
            l = 0;
            for (p = n.length; l < p; l++) {
                e = n[l];
                e.textField.textWrap = this.newLine;
                m = !this.newLine && 0 < g ? this.keyPadding : 0;
                if (0 < g && (g + e.width(j) + m > a || this.newLine)) b(D, g, i), g = 0, D = [], i += u, m = u = 0;
                D.push(e);
                g += m;
                f(e, g, i);
                g += e.width(j);
                u = Math.max(u, e.height())
            }
            i += this.children[this.children.length - 1].height();
            b(D, g);
            return d(i)
        };
        b.prototype.draw = function(a, f, k) {
            var d, e;
            null == k && (k = 0);
            if (!this.hidden && this.children.length) return d = a.getLeft(), e = a.getTop(), this.iterate(a.getWidth(), function(a, c, f) {
                a.x = d + c;
                return a.y = e + f
            }, function(f, b) {
                var h, d, e, F, P;
                d = a.getWidth() - b;
                if (1 === k || 2 === k) {
                    P = [];
                    e = 0;
                    for (F = f.length; e < F; e++) h = f[e], P.push(h.x += 1 === k ? d / 2 : d);
                    return P
                }
            }), b.__super__.draw.call(this, a, f)
        };
        f = function(a) {
            function f(a, c) {
                this.tick = a;
                this.textField = c;
                f.__super__.constructor.call(this);
                this.addChild(this.tick);
                this.addChild(this.textField);
                this.padding = 3
            }
            t(f, a);
            f.prototype.width = function(a) {
                this.textField.maxLineWidth = null != a ? a - this.tick.width - this.padding : void 0;
                return this.tick.width + this.padding + this.textField.getWidth()
            };
            f.prototype.height = function() {
                return this.textField.getHeight()
            };
            f.prototype.draw = function(a, c) {
                this.tick.x = this.x;
                this.tick.y = this.y + this.tick.height;
                this.textField.x = this.x + this.padding + this.tick.width;
                this.textField.y = this.y;
                return f.__super__.draw.call(this, a, c)
            };
            return f
        }(l);
        a = function(a) {
            function f(a) {
                f.__super__.constructor.call(this,
                    a);
                this.height = this.width = 8;
                this.colour = a.colour
            }
            t(f, a);
            f.prototype.draw = function(a, c) {
                c.rect(this.x, this.y - this.height / 2, this.width, this.height, {
                    fill: this.colour
                });
                return f.__super__.draw.call(this, a, c)
            };
            return f
        }(l);
        return b
    }(l);
    R = function(d) {
        function b(a) {
            var f;
            b.__super__.constructor.apply(this, arguments);
            this.values = a.values;
            this.colours = a.colours;
            this.props = r.copy(this.options.pie);
            this.fillPercent = null != (f = a["fill-percent"]) ? f : 100;
            this.startAngle = a["start-angle"] || 0;
            this.totalValue = a.totalLabel;
            this.gradient = this.props.gradient;
            this.addValues()
        }
        t(b, d);
        b.prototype.addValues = function() {
            var a, f, c, b, k, d, e, u;
            b = this.startAngle;
            k = 0;
            d = this.values;
            a = 0;
            for (c = d.length; a < c; a++) f = d[a], k += isNaN(f) ? f.value : f;
            u = this.values;
            a = d = 0;
            for (e = u.length; d < e; a = ++d) f = u[a], c = 360 / k * (isNaN(f) ? f.value : f), 0 <= c && this.addChild(this.addSlice(a, b % 360, c, this.colours[a % this.colours.length], f)), b += c;
            null != this.totalValue && (this.totalLabel = new B({
                    colour: this.props.colour
                }), this.totalLabel.text = this.totalValue, this.totalLabel.textAlign =
                "center", this.totalLabel.textBaseline = "middle")
        };
        b.prototype.addSlice = function(a, f, c, b, k) {
            k = isNaN(k) ? k : {};
            k = r.mergeProps(this.props, k);
            k.start = f;
            k.angle = c;
            k.colour = b;
            k.fillPercent = this.fillPercent;
            return new T(a, k)
        };
        b.prototype.draw = function(a, f) {
            var c, h, k, d, e, u, j, m, g, i, l, p, n, v, s;
            this.x = a.getCenterX();
            this.y = a.getCenterY();
            h = null;
            if (!h) {
                h = Math.min(a.getWidth(), a.getHeight()) / 2;
                u = {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                };
                p = this.children;
                g = 0;
                for (l = p.length; g < l; g++)
                    for (d in c = p[g], c = c.getRadiusOffsets(), u) c[d] >
                        u[d] && (u[d] = c[d]);
                h -= Math.max(u.top, u.bottom);
                h + u.left > a.getWidth() / 2 && (h = a.getWidth() / 2 - u.left);
                h + u.right > a.getWidth() / 2 && (h = a.getWidth() / 2 - u.right);
                h = Math.max(h, 10)
            }
            this.radius = h;
            this.gradient && (c = Math.max(0, this.radius - this.radius * (this.fillPercent / 100)), f.circle(this.x, this.y, this.radius - 1, {
                "stroke-width": 0,
                fill: "r#FFF:40-#888"
            }), 0 < c && f.circle(this.x, this.y, c, {
                "stroke-width": 0,
                fill: "#FFF"
            }));
            i = 720;
            l = -1;
            m = -720;
            g = -1;
            j = 720;
            d = -1;
            e = -720;
            u = -1;
            s = this.children;
            k = n = 0;
            for (v = s.length; n < v; k = ++n)
                if (c = s[k],
                    c.resize(a, h), p = c.getTicAngle(), 270 <= p) {
                    if (p < i || 90 >= i) i = p, l = k;
                    if (0 > m || 90 < m && m < p) m = p, g = k
                } else if (90 >= p) {
                if (p > m || 90 < m) m = p, g = k;
                if (360 < i || 90 >= i && p < m) i = p, l = k
            } else if (180 >= p) {
                if (0 > e || p < e) e = p, u = k;
                if (360 < j || j < p) j = p, d = k
            } else {
                if (360 < j || p > j) j = p, d = k;
                if (0 > e || e > p) e = p, u = k
            }
            h = l;
            k = a.getTop();
            for (c = !1; 0 <= h && !c;) c = this.children[h], p = c.getTicAngle(), 270 <= p || 90 >= p ? (k = c.moveLabelDown(a, k), h++, h >= this.children.length && (h = 0), c = h === l) : c = !0;
            h = g;
            k = a.getBottom();
            for (c = !1; 0 <= h && !c;) c = this.children[h], p = c.getTicAngle(), 270 <= p ||
                90 >= p ? (k = c.moveLabelUp(a, k), h--, 0 > h && (h = this.children.length - 1), c = h === g) : c = !0;
            h = u;
            k = a.getBottom();
            for (c = !1; 0 <= h && !c;) c = this.children[h], p = c.getTicAngle(), 90 < p && 270 > p ? (k = c.moveLabelUp(a, k), h++, h >= this.children.length && (h = 0), c = h === u) : c = !0;
            h = d;
            k = a.getTop();
            for (c = !1; 0 <= h && !c;) c = this.children[h], p = c.getTicAngle(), 90 < p && 270 > p ? (k = c.moveLabelDown(a, k), h--, 0 > h && (h = this.children.length - 1), c = h === d) : c = !0;
            b.__super__.draw.call(this, a, f);
            null != this.totalLabel && (c = Math.max(0, this.radius - this.radius * (this.fillPercent /
                100)), this.totalLabel.getWidth() < 2 * (c - 10) && (this.totalLabel.x = a.getCenterX(), this.totalLabel.y = a.getCenterY(), this.totalLabel.draw(a, f)))
        };
        return b
    }(l);
    S = function(d) {
        function b(a, f) {
            b.__super__.constructor.call(this, f);
            this.index = a;
            this.tip = f.tip;
            this.colour = f.colour;
            this.angle = f.angle;
            this.fillPercent = f.fillPercent;
            this.context = f.context;
            this.startAngle = f.start;
            this.endAngle = this.startAngle + this.angle
        }
        t(b, d);
        b.prototype.getTicAngle = function() {
            return (this.startAngle + this.angle / 2) % 360
        };
        b.prototype.draw =
            function(a, f) {
                var c, h;
                h = Math.max(0, this.radius - this.radius * (this.fillPercent / 100));
                c = {
                    tooltip: this.tip,
                    "onclick-context": this.context,
                    canHover: !0
                };
                360 > this.angle ? (c.fill = this.colour, f.animateCircularArc(this.x, this.y, h, this.radius, this.startAngle * r.TO_RADIANS, this.endAngle * r.TO_RADIANS, c), 3 < this.getSliceDiagonal() && (c = this.x + this.radius * Math.cos(this.startAngle * r.TO_RADIANS), h = this.y + this.radius * Math.sin(this.startAngle * r.TO_RADIANS), f.path([
                    ["M", [this.x, this.y]],
                    ["L", [c, h]]
                ], {
                    stroke: f.getBackgroundColor(),
                    "stroke-width": 1
                }))) : (c["stroke-width"] = this.radius - h, c.stroke = this.colour, f.animateCircle(this.x, this.y, (this.radius + h) / 2, c, void 0, void 0, 0));
                b.__super__.draw.call(this, a, f)
            };
        b.prototype.isRightSide = function() {
            return 270 <= this.getTicAngle() || 90 >= this.getTicAngle()
        };
        b.prototype.isBottomSide = function() {
            var a;
            return 0 < (a = this.getTicAngle()) && 180 > a
        };
        b.prototype.isAtTop = function() {
            return 270 > this.startAngle && 270 < this.endAngle
        };
        b.prototype.isAtBottom = function() {
            return 90 > this.startAngle && 90 < this.endAngle
        };
        b.prototype.getSliceDiagonal = function() {
            var a, f, c, b;
            c = this.x + this.radius * Math.cos(this.startAngle * r.TO_RADIANS);
            b = this.y + this.radius * Math.sin(this.startAngle * r.TO_RADIANS);
            a = this.x + this.radius * Math.cos(this.endAngle * r.TO_RADIANS);
            f = this.y + this.radius * Math.sin(this.endAngle * r.TO_RADIANS);
            return Math.sqrt(Math.pow(c - a, 2) + Math.pow(b - f, 2))
        };
        return b
    }(l);
    T = function(d) {
        function b(a, f) {
            b.__super__.constructor.apply(this, arguments);
            this.showTicks = !1;
            this.index = a;
            this.tickSize = this.showTicks ? 10 : 6;
            this.tickExtensionSize =
                this.showTicks ? 4 : 0;
            this.labelMargin = this.showTicks ? 10 : 0;
            this.pieLabel = new B(f);
            this.pieLabel.textWrap = !0;
            this.pieLabel.setText(f.label, f.link);
            this.pieLabel.colour = f.colour;
            this.pieLabel.visible = !0;
            this.pieLabel.tip = f.tip;
            this.addChild(this.pieLabel);
            this.pieSlice = new S(a, f);
            this.addChild(this.pieSlice)
        }
        t(b, d);
        b.prototype.getRadiusOffsets = function() {
            var a, f, c;
            a = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            };
            this.pieLabel.visible && (f = this.pieSlice.getTicAngle(), c = this.tickSize, 0 <= f && 90 >= f ? (a.bottom = this.pieLabel.getHeight() +
                1, a.right = (90 - f) / 90 * c + this.tickExtensionSize + this.labelMargin + this.pieLabel.getWidth()) : 90 < f && 180 >= f ? (a.bottom = this.pieLabel.getHeight() + 1, a.left = (f - 90) / 90 * c + this.tickExtensionSize + this.labelMargin + this.pieLabel.getWidth() + 4) : 180 < f && 270 > f ? (a.top = this.pieLabel.getHeight() + 1, a.left = (270 - f) / 90 * c + this.tickExtensionSize + this.labelMargin + this.pieLabel.getWidth() + 4) : (a.top = this.pieLabel.getHeight() + 1, a.right = (f - 270) / 90 * c + this.tickExtensionSize + this.labelMargin + this.pieLabel.getWidth()));
            return a
        };
        b.prototype.draw =
            function(a, f) {
                this.showTicks && this.drawTicLines(f);
                b.__super__.draw.call(this, a, f)
            };
        b.prototype.resize = function(a, f) {
            var c, b;
            this.radius = f;
            this.pieSlice.radius = this.radius;
            this.pieSlice.x = a.getCenterX();
            this.pieSlice.y = a.getCenterY();
            this.pieLabel.visible = this.showTicks || 12 < this.pieSlice.getSliceDiagonal();
            c = this.getTicAngle();
            if (this.pieLabel.visible && (b = this.radius + this.tickSize, c *= r.TO_RADIANS, this.pieLabel.x = this.pieSlice.x + b * Math.cos(c), this.pieLabel.y = this.pieSlice.y + b * Math.sin(c), this.pieLabel.x =
                    this.pieLabel.y < this.pieSlice.y - this.pieSlice.radius || this.pieLabel.y > this.pieSlice.y + this.pieSlice.radius ? this.pieLabel.x - this.pieLabel.getWidth() / 2 : this.isRightSide() ? this.pieLabel.x + (this.tickExtensionSize + this.labelMargin) : this.pieLabel.x - this.pieLabel.getWidth() - this.tickExtensionSize - this.labelMargin - 4, !this.pieSlice.isBottomSide())) return this.pieLabel.y += this.pieLabel.getHeight() * (this.pieLabel.y - a.getCenterY()) / this.pieSlice.radius
        };
        b.prototype.getTicAngle = function() {
            return this.pieSlice.getTicAngle()
        };
        b.prototype.isRightSide = function() {
            return this.pieSlice.isRightSide()
        };
        b.prototype.moveLabelDown = function(a, f) {
            var c, b, k;
            return this.pieLabel.visible ? (b = !1, k = this.getLabelTopY(), k < f && ((c = f - k, this.pieLabel.getHeight() + f > a.getBottom() - 1 && (c = a.getBottom() - this.pieLabel.getHeight() - k, b = !0), this.pieLabel.y += c, b) ? this.pieLabel.visible = !1 : (c = this.radius + this.tickSize, b = (this.pieLabel.y + this.pieLabel.getHeight() / 2 - this.pieSlice.y) / c, b = Math.max(-1, Math.min(1, b)), b = Math.asin(b) / r.TO_RADIANS, 90 < this.getTicAngle() &&
                270 > this.getTicAngle() ? b = 180 - b : 270 <= this.getTicAngle() && (b = 360 + b), c = this.pieSlice.x + c * Math.cos(b * r.TO_RADIANS), this.pieLabel.x = this.isRightSide() ? c + this.tickExtensionSize + this.labelMargin : c - this.pieLabel.getWidth() - this.tickExtensionSize - this.labelMargin - 4)), this.pieLabel.y + this.pieLabel.getHeight()) : f
        };
        b.prototype.moveLabelUp = function(a, f) {
            var c, b;
            return this.pieLabel.visible ? (b = !1, c = this.getLabelBottomY(), c > f && ((c = f - c, f - this.pieLabel.getHeight() < a.getTop() + 1 && (c = a.getTop() - this.getLabelTopY(), b = !0), this.pieLabel.y += c, b) ? this.pieLabel.visible = !1 : (b = this.radius + this.tickSize, c = (this.pieLabel.y + this.pieLabel.getHeight() / 2 - this.pieSlice.y) / b, c = Math.max(-1, Math.min(1, c)), c = Math.asin(c) / r.TO_RADIANS, 90 < this.getTicAngle() && 270 > this.getTicAngle() ? c = 180 - c : 270 <= this.getTicAngle() && (c = 360 + c), b = this.pieSlice.x + b * Math.cos(c * r.TO_RADIANS), this.pieLabel.x = this.isRightSide() ? b + this.tickExtensionSize + this.labelMargin : b - this.pieLabel.getWidth() - this.tickExtensionSize - this.labelMargin - 4)), this.pieLabel.y) :
                f
        };
        b.prototype.getLabelTopY = function() {
            return this.pieLabel.y
        };
        b.prototype.getLabelBottomY = function() {
            return this.pieLabel.y + this.pieLabel.getHeight()
        };
        b.prototype.drawTicLines = function(a) {
            var f, c, b, k, d;
            this.pieLabel.text && this.pieLabel.visible && (c = this.getTicAngle(), f = c * r.TO_RADIANS, k = this.pieSlice.isRightSide() ? this.pieLabel.x - this.labelMargin : this.pieLabel.x + this.pieLabel.getWidth() + this.labelMargin + 4, d = this.pieLabel.y + this.pieLabel.getHeight() / 2, c = this.pieSlice.x + this.radius * Math.cos(f), b = this.pieSlice.y +
                this.radius * Math.sin(f), f = k + (this.pieSlice.isRightSide() ? -this.tickExtensionSize : this.tickExtensionSize), c = [
                    ["M", [k, d]],
                    ["L", [f, d]],
                    ["L", [c, b]]
                ], a.path(c, {
                    stroke: this.pieLabel.colour,
                    "stroke-width": 1
                }))
        };
        return b
    }(l);
    y = function(d) {
        function b(a) {
            this.type = a;
            this.step = 5;
            this.lineWidth = 1;
            this.fill = "rgba(0, 0, 0, 0.3)";
            b.__super__.constructor.call(this)
        }
        t(b, d);
        b.prototype.draw = function(a, f) {
            "hbar" === this.type ? this.renderHorizontal(a, f) : this.renderVertical(a, f);
            return b.__super__.draw.call(this, a, f)
        };
        b.prototype.renderVertical = function(a, f) {
            var c, b, k, d, e, u, j, m, g, i;
            b = a.getVerticalBarCoords();
            d = a.getTop();
            c = a.getBottom();
            k = [];
            g = b.middles();
            u = 0;
            for (m = g.length; u < m; u++)
                if (b = g[u], b = Math.round(b), c > d) {
                    e = j = d;
                    for (i = 2 * this.step; 0 < i ? j <= c : j >= c; e = j += i) k.push(["M", [b, e]]), k.push(["L", [b, e + Math.min(this.step, c - e)]])
                }
            f.path(k, {
                stroke: this.fill,
                "stroke-width": this.lineWidth
            })
        };
        b.prototype.renderHorizontal = function(a, b) {
            var c, h, k, d, e, u, j, m, g, i;
            c = a.getHorizontalBarCoords();
            h = a.getLeft();
            d = a.getRight();
            k = [];
            g = c.middles();
            u = 0;
            for (m = g.length; u < m; u++)
                if (e = g[u], e = Math.round(e), d > h) {
                    c = j = h;
                    for (i = 2 * this.step; 0 < i ? j <= d : j >= d; c = j += i) k.push(["M", [c, e]]), k.push(["L", [c + Math.min(this.step, d - c), e]])
                }
            b.path(k, {
                stroke: this.fill,
                "stroke-width": this.lineWidth
            })
        };
        return b
    }(l);
    z = function(d) {
        function b(a, f) {
            var c, h;
            this.group = a;
            this.props = f;
            b.__super__.constructor.call(this, f);
            this.props = r.valuesOf(this.options.base, this.options.bar, f);
            this.values = f.values;
            this.keys = f.keys;
            if (null == f.colour && null != (null != (c = this.values) ? null != (h = c[0]) ?
                    h.colour : void 0 : void 0)) this.props.colour = this.values[0].colour;
            this.addValues()
        }
        t(b, d);
        b.prototype.getElement = function(a, b) {
            switch (this.props.type) {
                case "bar_stack":
                case "multihbar":
                    return new ea(a, this.group, b, this.props);
                case "hbar":
                    return new p(a, this.group, r.valuesOf(this.props, b));
                default:
                    return new M(a, this.group, r.valuesOf(this.props, b))
            }
        };
        b.prototype.getKeys = function() {
            return this.keys ? this.keys : this.props.text ? [this.props] : b.__super__.getKeys.call(this)
        };
        return b
    }(l);
    w = function(d) {
        function b(a,
            f, c) {
            this.index = a;
            this.group = f;
            this.props = c;
            b.__super__.constructor.call(this, c);
            this.colour = c.colour;
            this.alpha = c.alpha;
            this.tip = c.tip;
            this.axis = c.axis;
            this.context = c.context;
            this.animate = c.animate;
            null == this.animate && (this.animate = !0)
        }
        t(b, d);
        b.prototype.STACK_GAP = 1.5;
        b.prototype._addLabel = function(a, b) {
            this.barLabel = new i(this, a, b);
            if (a) return this.addChild(this.barLabel)
        };
        b.prototype.draw = function(a, f) {
            var c;
            c = this.getBarCoords(a);
            f.animateRect(c.x, c.y, c.width, c.height, {
                fill: this.colour,
                tooltip: this.tip,
                "fill-opacity": this.alpha,
                "onclick-context": this.context,
                canHover: !0
            }, this.animate ? this.getDirection(a) : void 0);
            b.__super__.draw.call(this, a, f)
        };
        b.prototype.getDirection = function() {};
        return b
    }(l);
    p = function(d) {
        function b(a, f, c) {
            b.__super__.constructor.call(this, a, f, c);
            this.left = c.left;
            this.right = c.right;
            a = c.label;
            this.left || (this.left = 0);
            this.right || (this.right = 0);
            this._addLabel(a, c)
        }
        t(b, d);
        b.prototype.getBarCoords = function(a) {
            var b, c, h, k;
            c = a.getHorizontalBarCoords(this.axis).at(this.index, this.group);
            b = c.from;
            k = c.size;
            c = a.getXFromValue(this.left);
            h = a.getXFromValue(this.right);
            0 < this.number && 4 < Math.abs(c - h) && (c > h ? c -= this.STACK_GAP : h -= this.STACK_GAP);
            return r.normalizeRect({
                x: c,
                y: b,
                width: h - c,
                height: k,
                orientation: this.getDirection(a)
            })
        };
        b.prototype.getDirection = function(a) {
            var b;
            b = a.getXFromValue(this.left);
            a = a.getXFromValue(this.right);
            return b > a ? "left" : "right"
        };
        return b
    }(w);
    M = function(d) {
        function b(a, f, c) {
            b.__super__.constructor.call(this, a, f, c);
            this.top = c.top;
            this.bottom = c.bottom;
            a = c.label;
            this.number =
                c.number;
            this._addLabel(a, c)
        }
        t(b, d);
        b.prototype.getBarCoords = function(a) {
            var b, c, h, k;
            b = a.getVerticalBarCoords().at(this.index, this.group);
            c = b.from;
            h = b.size;
            k = this.top ? Math.max(a.getYFromValue(this.top, this.axis), a.getTop()) : a.getYBottom();
            b = this.bottom ? Math.min(a.getYFromValue(this.bottom, this.axis), a.getBottom()) : a.getYBottom();
            0 < this.number && 4 < Math.abs(k - b) && (k > b ? k -= this.STACK_GAP : b -= this.STACK_GAP);
            return r.normalizeRect({
                x: c,
                y: k,
                width: h,
                height: b - k,
                orientation: this.getDirection(a)
            })
        };
        b.prototype.getDirection =
            function(a) {
                var b;
                b = this.top ? Math.max(a.getYFromValue(this.top, this.axis), a.getTop()) : a.getYBottom();
                a = this.bottom ? Math.min(a.getYFromValue(this.bottom, this.axis), a.getBottom()) : a.getYBottom();
                return b > a ? "down" : "up"
            };
        return b
    }(w);
    ea = function(d) {
        function b(a, f, c, h) {
            this.index = a;
            this.group = f;
            this.values = c;
            this.props = h;
            b.__super__.constructor.call(this, h);
            this.top = this.bottom = this.left = this.right = this.number = 0;
            this.type = "multihbar" === this.props.type ? "horizontal" : "vertical";
            this.addValues();
            a = this.props.label;
            this.children.length && a && this.addChild(new i(this, a, r.mergeProps(h, {
                animate: !1
            })))
        }
        t(b, d);
        b.prototype.getBarCoords = function(a) {
            var b, c, h;
            switch (this.type) {
                case "horizontal":
                    return h = a.getHorizontalBarCoords(this.axis).at(this.index, this.group), b = h.from, h = h.size, c = a.getXFromValue(this.left), a = a.getXFromValue(this.right), r.normalizeRect({
                        x: c,
                        y: b,
                        width: a - c,
                        height: h,
                        orientation: c > a ? "left" : "right"
                    });
                case "vertical":
                    return h = a.getVerticalBarCoords().at(this.index, this.group), b = h.from, h = h.size, c = this.top ?
                        a.getYFromValue(this.top, this.axis) : a.getYBottom(), a = this.bottom ? a.getYFromValue(this.bottom, this.axis) : a.getYBottom(), r.normalizeRect({
                            x: b,
                            y: c,
                            width: h,
                            height: a - c,
                            orientation: c > a ? "down" : "up"
                        })
            }
        };
        b.prototype.getElement = function(a, b) {
            if (null != b) switch (this.props.colours && !b.colour && (b.colour = this.props.colours[a % this.props.colours.length]), b.number = this.number++, this.type) {
                case "horizontal":
                    return this.right = b.right, new p(this.index, this.group, r.valuesOf(this.props, b, {
                        animate: !1
                    }));
                case "vertical":
                    if (null ==
                        b.val) break;
                    b.bottom = this.top;
                    this.top += b.val;
                    b.top = this.top;
                    return new M(this.index, this.group, r.valuesOf(this.props, b, {
                        animate: !1
                    }))
            }
        };
        return b
    }(l);
    i = function(d) {
        function b(a, f, c) {
            this.holder = a;
            b.__super__.constructor.call(this);
            this.label = new B(c);
            this.label.setText(f);
            this.addChild(this.label)
        }
        t(b, d);
        b.prototype.draw = function(a, f) {
            var c, h, k, d, e;
            if (this.label)
                if (this.label.visible = !0, this.label.rotation = 0, h = this.holder.getBarCoords(a), d = h.x, e = h.y, k = h.width, c = h.height, h = h.orientation, ("up" === h ||
                        "down" === h) && 14 > k) this.label.visible = !1;
                else if (("left" === h || "right" === h) && c + 4 <= this.label.getHeight()) this.label.visible = !1;
            else switch (h) {
                case "up":
                    this.label.textBaseline = "bottom";
                    this.label.textAlign = "center";
                    this.label.getWidth() > k && this.label.getHeight() < k && (this.label.rotation = 270, this.label.textAlign = "left", this.label.textBaseline = "middle");
                    this.label.x = d + k / 2;
                    this.label.y = e;
                    this.label.startY = e + c;
                    break;
                case "down":
                    this.label.textBaseline = "top";
                    this.label.textAlign = "center";
                    this.label.x = d + k /
                        2;
                    this.label.y = e + c;
                    this.label.startY = e;
                    break;
                case "right":
                    this.label.textBaseline = "middle";
                    this.label.textAlign = "left";
                    this.label.x = d + k + 5;
                    this.label.y = e + c / 2;
                    this.label.startX = d + 5;
                    break;
                case "left":
                    this.label.textBaseline = "middle", this.label.textAlign = "right", this.label.x = d - 5, this.label.y = e + c / 2, this.label.startX = d + k - 5
            }
            b.__super__.draw.apply(this, arguments)
        };
        return b
    }(l);
    E = function(d) {
        function b(a) {
            var f;
            b.__super__.constructor.call(this, a);
            this.axis = a.axis;
            this.yrightaxis = "right" === this.axis;
            this.xVal =
                a.x;
            this.yVal = a.y || a.value;
            this.dotSize = a["dot-size"] || 1;
            this.haloSize = a["halo-size"] || 0;
            this.canHover = null != (f = a.canHover) ? f : !1;
            this.index = a.index;
            this.colour = a.colour;
            this.tip = a.tip;
            this.context = a.context;
            f = a.label;
            this.animate = a.animate;
            this.lineWidth = a.lineWidth;
            this.fillColour = this.colour;
            f && (this.label = new B(a), this.label.setText(f), this.addChild(this.label))
        }
        t(b, d);
        b.prototype.draw = function(a, f) {
            var c, h;
            c = a.getCoordsFromXValueAndYValue(this.xVal, this.yVal, this.axis);
            null == this.x && (this.x = c.x);
            null == this.y && (this.y = c.y);
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            this.startY = a.getYOrigin(this.axis);
            this.label && (this.label.colour = "black", this.label.textAlign = "left", this.label.textBaseline = "bottom", this.label.x = this.x, this.label.y = this.y, this.label.startY = this.startY, h = a.getXAxisValues(), c = a.getWidth() / 100, this.label.visible = h && h.range.count <= c ? !0 : a instanceof J || h && 0 === this.index % Math.floor(h.range.count / c));
            b.__super__.draw.call(this, a, f)
        };
        b.prototype.getMaxX = function() {
            return this.xVal ||
                this.index
        };
        b.prototype.getMinX = function() {
            return this.xVal || this.index
        };
        b.prototype.isInRange = function(a) {
            var b, c;
            return Math.floor(a.getLeft()) <= (b = this.x) && b <= Math.ceil(a.getRight()) && Math.floor(a.getTop()) <= (c = this.y) && c <= Math.ceil(a.getBottom())
        };
        b.prototype.onTouch = function(a) {
            this.tip && (a.isVerticalTouch() ? a.isPointInVerticalTouch(this.x, this.y, this.dotSize / 2) && a.addTooltipAtXY(this.x, this.y, this.tip, this.colour, this.context) : r.isHasCirclePoint({
                x: this.x,
                y: this.y,
                radius: this.dotSize
            }, a) && a.addTooltip(this.tip,
                this.colour, this.context))
        };
        b.prototype.toFront = function(a, b) {
            return setTimeout(function() {
                null != a && a.toFront();
                return null != b ? b.toFront() : void 0
            }, 0)
        };
        return b
    }(l);
    C = function(d) {
        function b(a) {
            this.props = a;
            b.__super__.constructor.call(this, a)
        }
        t(b, d);
        b.prototype.draw = function(a, f) {
            var c, h;
            b.__super__.draw.apply(this, arguments);
            this.isInRange(a) && (h = {
                fill: f.getBackgroundColor(),
                noClip: !0
            }, c = {
                fill: this.colour,
                stroke: f.getBackgroundColor(),
                "stroke-width": this.haloSize,
                tooltip: this.tip,
                canHover: this.canHover,
                growOnHover: !0,
                "onclick-context": this.context,
                noClip: !0
            }, this.animate ? (h = f.animateCircle(this.x, this.y, this.dotSize + this.haloSize, h, this.x, this.startY), c = f.animateCircle(this.x, this.y, this.dotSize + Math.ceil(this.haloSize / 2), c, this.x, this.startY)) : (h = f.circle(this.x, this.y, this.dotSize + this.haloSize, h), c = f.circle(this.x, this.y, this.dotSize + Math.ceil(this.haloSize / 2), c)), this.toFront(h, c))
        };
        return b
    }(E);
    L = function(d) {
        function b() {
            return za = b.__super__.constructor.apply(this, arguments)
        }
        t(b, d);
        b.prototype.draw =
            function(a, f) {
                var c;
                b.__super__.draw.apply(this, arguments);
                this.isInRange(a) && (c = {
                    stroke: f.getBackgroundColor(),
                    fill: f.getBackgroundColor(),
                    "stroke-width": this.haloSize,
                    noClip: !0
                }, this.drawStar(a, f, this.dotSize + this.haloSize, c), c = {
                    fill: this.colour,
                    stroke: f.getBackgroundColor(),
                    "stroke-width": this.haloSize,
                    tooltip: this.tip,
                    canHover: this.canHover,
                    growOnHover: 1.5,
                    "onclick-context": this.context,
                    noClip: !0
                }, this.toFront(this.drawStar(a, f, this.dotSize + this.haloSize, c)))
            };
        b.prototype.drawStar = function(a,
            b, c, h) {
            var k, d, e;
            e = c + 1;
            d = 0.6 * e;
            k = function(a, b) {
                var f, h, k, j, m;
                h = [];
                for (f = m = 0; 10 >= m; f = ++m) c = f % 2 ? d : e, j = r.circleXY({
                    x: a,
                    y: b
                }, c, 36 * f), k = j.x, j = j.y, h.push([!f ? "M" : "L", [k, j]]);
                return h
            };
            a = k(this.x, this.startY);
            k = k(this.x, this.y);
            return b.animatePath(k, h, this.animate ? a : void 0)
        };
        return b
    }(E);
    s = function(d) {
        function b() {
            return Aa = b.__super__.constructor.apply(this, arguments)
        }
        t(b, d);
        b.prototype.draw = function(a, f) {
            var c, h, k, d;
            b.__super__.draw.apply(this, arguments);
            this.isInRange(a) && (h = null != (c = this.lineWidth) ?
                c : 1, d = {
                    fill: f.getBackgroundColor(),
                    tooltip: this.tip,
                    "tooltip-colour": this.colour,
                    touchLineTooltip: !1,
                    noClip: !0
                }, c = {
                    stroke: this.colour,
                    "stroke-width": null != (k = this.lineWidth) ? k : 1,
                    fill: f.getBackgroundColor(),
                    "tooltip-colour": this.colour,
                    tooltip: this.tip,
                    canHover: !0,
                    growOnHover: !0,
                    growStroke: !0,
                    "onclick-context": this.context,
                    noClip: !0
                }, this.animate ? (k = f.animateCircle(this.x, this.y, this.dotSize + this.haloSize, d, this.x, this.startY), h = f.animateCircle(this.x, this.y, this.dotSize - Math.floor(h / 2), c, this.x, this.startY)) :
                (k = f.circle(this.x, this.y, this.dotSize + this.haloSize, d), h = f.circle(this.x, this.y, this.dotSize - Math.floor(h / 2), c)), this.toFront(k, h))
        };
        return b
    }(E);
    o = function(d) {
        function b() {
            return Ba = b.__super__.constructor.apply(this, arguments)
        }
        t(b, d);
        b.prototype.draw = function(a, f) {
            b.__super__.draw.apply(this, arguments);
            this.isInRange(a) && (this.drawBow(a, f, this.dotSize + this.haloSize, !1), f.rect(this.x - this.haloSize, this.y - this.haloSize, 2 * this.haloSize, 2 * this.haloSize, {
                fill: f.getBackgroundColor(),
                tooltip: this.tip,
                "tooltip-colour": this.colour,
                touchLineTooltip: !1,
                noClip: !0
            }), this.toFront(this.drawBow(a, f, this.dotSize)))
        };
        b.prototype.drawBow = function(a, b, c, h) {
            var k, d, e;
            null == h && (h = !0);
            a = h ? this.colour : b.getBackgroundColor();
            d = function(a, b, f) {
                a = r.circleXY({
                    x: a,
                    y: b
                }, c, f);
                return [a.x, a.y]
            };
            k = function(a, b) {
                return [
                    ["M", [a, b]],
                    ["L", d(a, b, 60)],
                    ["L", d(a, b, 120)],
                    ["L", {
                        centerX: a,
                        centerY: b
                    }],
                    ["L", d(a, b, -60)],
                    ["L", d(a, b, -120)],
                    ["Z"]
                ]
            };
            e = k(this.x, this.startY);
            k = k(this.x, this.y);
            return b.animatePath(k, {
                fill: a,
                stroke: a,
                tooltip: this.tip,
                "tooltip-colour": this.colour,
                canHover: this.canHover && h,
                growOnHover: h,
                touchLineTooltip: h,
                "onclick-context": this.context,
                noClip: !0
            }, this.animate ? e : void 0)
        };
        return b
    }(E);
    A = function(d) {
        function b() {
            return Ca = b.__super__.constructor.apply(this, arguments)
        }
        t(b, d);
        b.prototype.draw = function(a, f) {
            var c;
            b.__super__.draw.apply(this, arguments);
            this.isInRange(a) && (c = {
                stroke: f.getBackgroundColor(),
                fill: f.getBackgroundColor(),
                "stroke-width": this.haloSize,
                noClip: !0
            }, this.drawAnchor(a, f, this.dotSize + this.haloSize,
                c), c = {
                fill: this.colour,
                stroke: f.getBackgroundColor(),
                "stroke-width": this.haloSize,
                tooltip: this.tip,
                canHover: this.canHover,
                growOnHover: 1.5,
                "onclick-context": this.context,
                noClip: !0
            }, this.toFront(this.drawAnchor(a, f, this.dotSize + this.haloSize, c)))
        };
        b.prototype.drawAnchor = function(a, b, c, h) {
            var k;
            k = function(a, b) {
                var f, h, k, d, e;
                h = [];
                for (f = e = 0; 2 >= e; f = ++e) d = r.circleXY({
                    x: a,
                    y: b
                }, c, 120 * f), k = d.x, d = d.y, h.push([!f ? "M" : "L", [k, d]]);
                h.push(["Z"]);
                return h
            };
            a = k(this.x, this.startY);
            k = k(this.x, this.y);
            return b.animatePath(k,
                h, this.animate ? a : void 0)
        };
        return b
    }(E);
    Q = function(d) {
        function b(a) {
            var f, c;
            b.__super__.constructor.call(this, a);
            a = r.mergeProps(a, r.copy(this.options.line));
            this.values = a.values;
            this.text = a.text;
            this.link = a.link;
            this.colour = a.colour;
            this.fill = a.fill;
            this.axis = a.axis;
            this.type = function() {
                switch (a.type) {
                    case "line_dot":
                        return "dotted";
                    case "line_hollow":
                        return "dashed";
                    case "area":
                        return this.area = !0, "line";
                    default:
                        return "line"
                }
            }.call(this);
            this.lineWidth = a.width;
            this.haloWidth = (null != (c = a["dot-style"]) ?
                c["halo-size"] : void 0) || 0;
            this.isLoop = a.loop;
            this.animate = !this.isLoop;
            if (this.area || this.fill) this.fill_colour = r.hexToRGB(this.fill ? this.fill : this.color, a["fill-alpha"]);
            this.dotStyle = r.mergeProps(a["dot-style"], r.copy(this.options.lineDot));
            if ((null != (f = this.values) ? f.length : void 0) > this.options.line["max-dots"]) this.dotStyle.type = "dot";
            this.addValues()
        }
        t(b, d);
        b.prototype.getElement = function(a, b) {
            var c;
            isNaN(b) || (b = {
                value: b
            });
            c = r.mergeProps(b, this.dotStyle);
            c.index = a;
            c.colour = this.colour;
            c.axis =
                this.axis;
            c.canHover = !0;
            c.animate = this.animate;
            c.lineWidth = this.lineWidth;
            if (this.isLoop) return new E(c);
            switch (this.dotStyle.type) {
                case "dot":
                    return new E(c);
                case "solid-dot":
                    return new C(c);
                case "hollow-dot":
                    return new s(c);
                case "star":
                    return new L(c);
                case "bow":
                    return new o(c);
                case "anchor":
                    return new A(c);
                default:
                    return new E(c)
            }
        };
        b.prototype.getKeys = function() {
            return this.text ? [{
                text: this.text,
                colour: this.colour,
                link: this.link
            }] : b.__super__.getKeys.call(this)
        };
        b.prototype.drawLine = function(a,
            b, c) {
            var h, k, d, e, u, j, m;
            d = [];
            e = [];
            m = this.children;
            k = u = 0;
            for (j = m.length; u < j; k = ++u) h = m[k], d.push([0 === k ? "M" : "L", [h.x, h.y]]), e.push([0 === k ? "M" : "L", [h.x, a.getYOrigin(this.axis)]]);
            b.animatePath(d, c, this.animate ? e : void 0)
        };
        b.prototype.fillAxisShape = function(a, b) {
            var c, h, k, d, e, u, j;
            k = [];
            d = [];
            j = this.children;
            h = e = 0;
            for (u = j.length; e < u; h = ++e)
                if (c = j[h], 0 === h ? (k.push(["M", [c.x, a.getYOrigin(this.axis)]]), k.push(["L", [c.x, c.y]]), d.push(["M", [c.x, a.getYOrigin(this.axis)]])) : k.push(["L", [c.x, c.y]]), d.push(["L", [c.x,
                        a.getYOrigin(this.axis)
                    ]]), h === this.children.length - 1) k.push(["L", [c.x, a.getYOrigin(this.axis)]]), d.push(["L", [c.x, a.getYOrigin(this.axis)]]);
            k.push(["Z"]);
            b.animatePath(k, {
                fill: this.fill_colour
            }, d)
        };
        b.prototype.fillLoopShape = function(a, b) {
            var c, h, k, d, e, u, j;
            k = [];
            d = [];
            j = this.children;
            h = e = 0;
            for (u = j.length; e < u; h = ++e) c = j[h], k.push([0 === h ? "M" : "L", [c.x, c.y]]), d.push([0 === h ? "M" : "L", [a.getCenterX(), a.getCenterY()]]);
            k.push(["Z"]);
            d.push(["Z"]);
            c = {
                fill: this.fill_colour,
                stroke: this.colour,
                "stroke-width": this.lineWidth,
                canHover: !0
            };
            c.tooltip = {
                points: this.children
            };
            c["tooltip-colour"] = this.colour;
            b.animatePath(k, c, d)
        };
        b.prototype.setCoordinatesForPoints = function(a) {
            var b, c, h, k, d;
            d = this.children;
            h = 0;
            for (k = d.length; h < k; h++) c = d[h], b = void 0 !== c.xVal && void 0 !== c.yVal ? a.getCoordsFromXValueAndYValue(c.xVal, c.yVal, c.axis) : a.getCoordsFromXPositionAndYValue(c.index, c.yVal, c.axis), c.x = b.x, c.y = b.y
        };
        b.prototype.draw = function(a, f) {
            var c, h;
            this.setCoordinatesForPoints(a);
            1 < this.children.length && (this.isLoop && this.fill_colour ? this.fillLoopShape(a,
                f) : this.fillAxisShape(a, f), this.isLoop || (c = {
                stroke: f.getBackgroundColor(),
                "stroke-width": this.lineWidth + this.haloWidth
            }, h = {
                "stroke-type": this.type,
                stroke: this.colour,
                "stroke-width": this.lineWidth,
                canFade: !0
            }, "dot" === this.dotStyle.type && (h.tooltip = {
                points: this.children
            }, c["tooltip-colour"] = this.colour, c.tooltip = {
                points: this.children
            }, c.touchLineTooltip = !1), this.drawLine(a, f, c), this.drawLine(a, f, h)));
            b.__super__.draw.call(this, a, f)
        };
        b.prototype.onTouch = function(a) {
            a.sc = this.sc;
            return b.__super__.onTouch.call(this,
                a)
        };
        return b
    }(l);
    q = function(d) {
        function b(a, f) {
            var c;
            this.group = a;
            b.__super__.constructor.call(this, f);
            c = this.props = r.mergeProps(f, r.copy(this.options.candle));
            this.values = c.values;
            this.text = c.text;
            this.link = c.link;
            this.colour = c.colour;
            this.axis = c.axis;
            this.addValues()
        }
        t(b, d);
        b.prototype.getElement = function(a, b) {
            return new g(a, this.group, b, this.props)
        };
        b.prototype.getKeys = function() {
            return this.text ? [{
                text: this.text,
                colour: this.colour,
                link: this.link
            }] : b.__super__.getKeys.call(this)
        };
        return b
    }(l);
    g = function(d) {
        function b(a, f, c, h) {
            this.index = a;
            this.group = f;
            this.high = c.high;
            this.low = c.low;
            this.top = c.top;
            this.bottom = c.bottom;
            this.tip = c.tip;
            this.tipHigh = c.tipHigh;
            this.tipLow = c.tipLow;
            b.__super__.constructor.call(this, h);
            this.yrightaxis = "right" === h.axis;
            this.colour = h.colour;
            this.positiveColour = h.positiveColour;
            this.negativeColour = h.negativeColour;
            this.alpha = h.alpha
        }
        t(b, d);
        b.prototype.draw = function(a, b) {
            var c, h, k, d, e, u, j, m, g, i;
            u = a.getVerticalBarCoords().at(this.index, this.group);
            this.yrightaxis ?
                (d = a.getCoordsFromXValueAndYRightValue(this.index, this.high), e = a.getCoordsFromXValueAndYRightValue(this.index, this.low), m = a.getCoordsFromXValueAndYRightValue(this.index, this.top), h = a.getCoordsFromXValueAndYRightValue(this.index, this.bottom)) : (d = a.getCoordsFromXValueAndYValue(this.index, this.high), e = a.getCoordsFromXValueAndYValue(this.index, this.low), m = a.getCoordsFromXValueAndYValue(this.index, this.top), h = a.getCoordsFromXValueAndYValue(this.index, this.bottom));
            c = !1;
            h.y < m.y && (c = !0, k = m, m = h, h = k);
            k = this.colour;
            c ? this.negativeColour && (k = this.negativeColour) : this.positiveColour && (k = this.positiveColour);
            this.coords = r.normalizeRect({
                x: u.from,
                y: m.y,
                width: u.size,
                height: h.y - m.y
            });
            u = u.from + u.size / 2;
            j = this.coords.y + this.coords.height / 2;
            d = [
                ["M", [u, d.y]],
                ["L", [u, m.y]]
            ];
            h = [
                ["M", [u, e.y]],
                ["L", [u, h.y]]
            ];
            e = [
                ["M", [u, j]],
                ["L", [u, j]],
                ["M", [u, j]],
                ["L", [u, j]]
            ];
            b.animatePath(d, {
                stroke: k,
                "stroke-width": 1,
                tooltip: this.tipHigh,
                "fill-opacity": this.alpha,
                canFade: !0
            }, e);
            b.animatePath(h, {
                stroke: k,
                "stroke-width": 1,
                tooltip: this.tipLow,
                "fill-opacity": this.alpha,
                canFade: !0
            }, e);
            c = c ? {
                stroke: k,
                fill: null != (i = this.negativeColour) ? i : b.getBackgroundColor(),
                tooltip: this.tip,
                "fill-opacity": this.alpha,
                canHover: !0,
                "tooltip-colour": null != (g = this.negativeColour) ? g : k
            } : {
                fill: k,
                tooltip: this.tip,
                "fill-opacity": this.alpha,
                canHover: !0
            };
            b.animateRect(this.coords.x, this.coords.y, this.coords.width, this.coords.height, c, "vertical")
        };
        b.prototype.getMaxX = function() {
            return this.coords.x
        };
        b.prototype.getMinX = function() {
            return this.coords.x
        };
        return b
    }(l);
    Y =
        function(d) {
            function b(a) {
                b.__super__.constructor.call(this, a);
                a = r.mergeProps(a, r.copy(this.options.scatter));
                this.values = a.values;
                this.text = a.text;
                this.link = a.link;
                this.colour = a.colour;
                this.axis = a.axis;
                this.dotStyle = r.mergeProps(a["dot-style"], r.mergeProps(a, r.copy(this.options.scatterDot)));
                this.addValues()
            }
            t(b, d);
            b.prototype.getElement = function(a, b) {
                var c;
                isNaN(b) || (b = {
                    value: b
                });
                c = r.mergeProps(b, this.dotStyle);
                c.colour = this.colour;
                c.axis = this.axis;
                c.index = a;
                c.canHover = !0;
                c.animate = !0;
                switch (this.dotStyle.type) {
                    case "dot":
                        return new E(c);
                    case "solid-dot":
                        return new C(c);
                    case "hollow-dot":
                        return new s(c);
                    case "star":
                        return new L(c);
                    case "bow":
                        return new o(c);
                    case "anchor":
                        return new A(c);
                    default:
                        return new E(c)
                }
            };
            b.prototype.getKeys = function() {
                return this.text ? [{
                    text: this.text,
                    colour: this.colour,
                    link: this.link
                }] : b.__super__.getKeys.call(this)
            };
            return b
        }(l);
    e = function(d) {
        function b(a) {
            var f, c, h, k;
            this.data = a;
            b.__super__.constructor.apply(this, arguments);
            this.props = r.copy(this.options.funnel);
            this.gradient = this.props.gradient;
            this.addChild(this.labels =
                new H);
            this.addChild(this.bars = new l);
            this.total = 0;
            this.data.values.sort(function(a, b) {
                return b.value - a.value
            });
            k = this.data.values;
            f = c = 0;
            for (h = k.length; c < h; f = ++c) a = k[f], this.total += a.value, this.labels.addChild(new m(f, this, a)), this.bars.addChild(new j(f, this, a))
        }
        t(b, d);
        b.prototype.draw = function(a, b) {
            var c, h, k;
            h = this.labels.getWidth();
            c = Math.min(700, a.getWidth());
            k = (a.getWidth() - c) / 2;
            c = a.view(a.getTop(), a.getLeft() + k + h, c - h, a.getHeight());
            h = a.view(a.getTop(), a.getLeft() + k, h, a.getHeight());
            this.values =
                this.getDataValues(c);
            this.bars.draw(c, b);
            this.labels.draw(h, b)
        };
        b.prototype.getCoordsForFunnelBar = function(a) {
            return this.values[a]
        };
        b.prototype.getDataValues = function(a) {
            var b, c, h, k, d, e, u, j, m;
            c = a.getWidth();
            b = a.getHeight();
            a.getLeft();
            u = a.getTop();
            var g;
            j = this.data.values;
            g = [];
            a = d = 0;
            for (e = j.length; d < e; a = ++d) h = j[a], h = h.value / this.total, 0 === a && (k = c / h), g.push({
                width: k * h,
                height: b * h
            });
            m = [];
            a = j = 0;
            for (h = g.length; j < h; a = ++j) d = g[a], e = 2 < a && g[a - 2].width === g[a - 1].width ? g[a - 1].width : d.width, b = 0 < a && g[a - 1].width ===
                d.width ? d.width : a + 1 < g.length ? g[a + 1].width : d.width, k = u, c = d.height, u += d.height, 0 < a && 4 < c && (k += this.STACK_GAP, c -= this.STACK_GAP), m.push({
                    y: k,
                    topWidth: e,
                    bottomWidth: b,
                    height: c
                });
            return m
        };
        return b
    }(l);
    j = function(d) {
        function b(a, f, c) {
            this.index = a;
            this.funnel = f;
            this.tip = c.tip;
            this.colour = c.colour;
            this.context = c.context;
            b.__super__.constructor.apply(this, arguments);
            this.gradient = this.options.funnel.gradient
        }
        t(b, d);
        b.prototype.draw = function(a, f) {
            var c, h, k, d, e;
            k = this.funnel.getCoordsForFunnelBar(this.index);
            c = k.y;
            e = k.topWidth;
            h = k.bottomWidth;
            d = k.height;
            k = a.getCenterX();
            h = [
                ["M", [k - e / 2, c]],
                ["L", [k + e / 2, c]],
                ["L", [k + h / 2, c + d]],
                ["L", [k - h / 2, c + d]],
                ["Z"]
            ];
            k = [
                ["M", [k, c]],
                ["L", [k, c]],
                ["L", [k, c + d]],
                ["L", [k, c + d]],
                ["Z"]
            ];
            c = {
                tooltip: this.tip,
                "tooltip-colour": this.colour,
                canHover: !0
            };
            c.fill = this.gradient ? "0-" + this.colour + "-" + r.hexToRGB(this.colour, 0.5) + ":20-" + this.colour : this.colour;
            f.animatePath(h, c, k);
            b.__super__.draw.call(this, a, f)
        };
        b.prototype.onClick = function(a) {
            if (this.context && this.intercepts(a)) return this.context
        };
        b.prototype.onTouch = function(a) {
            if (this.tip && this.intercepts(a)) return a.addTooltip(this.tip, this.colour, this.context)
        };
        return b
    }(l);
    m = function(d) {
        function b(a, f, c) {
            this.index = a;
            this.funnel = f;
            b.__super__.constructor.call(this, c);
            this.setText(c.label, c.link);
            this.textWrap = !0;
            this.colour = c.colour
        }
        t(b, d);
        b.prototype.draw = function(a, f) {
            var c;
            this.x = a.getLeft();
            c = this.funnel.getCoordsForFunnelBar(this.index);
            this.y = c.y;
            c = c.height;
            c < this.height || (this.y += (c - this.height) / 2, b.__super__.draw.call(this, a, f))
        };
        return b
    }(B);
    la = function(d) {
        function b(a) {
            b.__super__.constructor.apply(this, arguments);
            this.values = a.values;
            this.colours = a.colours;
            this.props = r.copy(this.options.treemap);
            this.addValues()
        }
        t(b, d);
        b.prototype.addValues = function() {
            var a, b, c, h, k, d, e, u, j;
            a = !1;
            b = Number.MIN_VALUE;
            c = Number.MAX_VALUE;
            if (null != (null != (h = this.values[0]) ? h.secondary : void 0)) {
                a = !0;
                u = this.values;
                d = 0;
                for (e = u.length; d < e; d++) h = u[d], b = Math.max(b, h.secondary), c = Math.min(c, h.secondary)
            }
            u = this.values;
            j = [];
            d = 0;
            for (e = u.length; d < e; d++) h =
                u[d], k = isNaN(h) ? h : {}, a && b !== c && (k.secondaryRatio = (h.secondary - c) / (b - c)), h = r.mergeProps(this.props, k), j.push(this.addChild(new ma(h)));
            return j
        };
        b.prototype.draw = function(a, f) {
            var c, h, k, d, e, u;
            e = this.children;
            u = [];
            k = 0;
            for (d = e.length; k < d; k++) c = e[k], u.push(c.primary);
            k = Treemap.generate(u, a.getWidth(), a.getHeight());
            u = this.children;
            h = d = 0;
            for (e = u.length; d < e; h = ++d) c = u[h], h = k[h], c.x = h[0] + a.getLeft(), c.y = h[1] + a.getTop(), c.width = h[2] - h[0], c.height = h[3] - h[1];
            return b.__super__.draw.call(this, a, f)
        };
        return b
    }(l);
    ma = function(d) {
        function b(a) {
            var f, c, h, k, d;
            b.__super__.constructor.call(this, a);
            this.primary = a.primary;
            k = a.secondaryRatio;
            this.background = a.background;
            this.tip = a.tip;
            this.context = a.context;
            null == this.background && (this.background = "#000");
            null != k && (f = new Color(this.background), c = Math.max(f.hsl().l, 80), h = Math.min(f.hsl().l, 20), f.lightness(c - (c - h) * k), this.background = f.rgbString());
            this.itemLabel = new B(a);
            this.itemLabel.textWrap = !0;
            this.itemLabel.setText(a.label, a.link);
            this.itemLabel.colour = null != (d =
                a.foreground) ? d : "#FFF";
            this.addChild(this.itemLabel)
        }
        t(b, d);
        b.prototype.draw = function(a, f) {
            var c;
            c = {
                tooltip: this.tip,
                "onclick-context": this.context,
                canHover: !0,
                fill: this.background,
                stroke: f.getBackgroundColor()
            };
            f.rect(this.x, this.y, this.width, this.height, c);
            this.itemLabel.maxLineWidth = this.width;
            this.itemLabel.visible = !0;
            this.itemLabel.getWidth() < this.width && this.itemLabel.getHeight() < this.height ? (this.itemLabel.x = this.x + (this.width - this.itemLabel.getWidth()) / 2, this.itemLabel.y = this.y + (this.height -
                this.itemLabel.getHeight()) / 2) : this.itemLabel.visible = !1;
            return b.__super__.draw.call(this, a, f)
        };
        return b
    }(l);
    w = function(d) {
        function b(a) {
            b.__super__.constructor.call(this, a);
            a = r.valuesOf(this.options.axis, this.getDefaultValues(), a);
            this.colour = a.colour;
            this.steps = a.steps;
            this.max = a.max;
            this.min = a.min;
            this.offset = a.offset;
            this.steps = a.steps;
            this.stroke = a.stroke;
            this.steps || (this.steps = 1);
            this.tickOffset = 1;
            this.gridVisible = a["grid-visible"];
            this.tickLength = a["tick-height"];
            this.gridColour = a["grid-colour"]
        }
        t(b, d);
        b.prototype.getDefaultValues = function() {
            return {}
        };
        b.prototype.getRange = function() {
            return {
                min: this.min,
                max: this.max,
                steps: this.steps,
                offset: this.offset,
                count: this.rangeCount()
            }
        };
        b.prototype.rangeCount = function() {
            var a, b;
            a = this.max - this.min;
            if (0 < (b = this.steps) && 1 > b) a /= this.steps;
            return this.offset ? a + 1 : a
        };
        return b
    }(l);
    x = function(d) {
        function b(a) {
            b.__super__.constructor.call(this, a);
            this.labelsCount = 0
        }
        t(b, d);
        b.prototype.addLabels = function(a) {
            var b, c, h, k, d, e, u, j, m;
            k = this.min || 0;
            if (a.labels) {
                m = a.labels;
                b = e = 0;
                for (u = m.length; e < u; b = ++e) c = m[b], d = void 0 !== c.x ? c.x : void 0 !== c.y ? c.y : k, h = r.copy(a), h.visible = void 0 === this.steps ? !0 : 0 === d % this.steps, h.pos = k++, "string" === typeof c ? h.text = c : h = r.mergeProps(c, h), h.link = null != (j = a.links) ? j[b] : void 0, this.addLabel(h)
            }
        };
        b.prototype.addLabel = function(a) {
            var b;
            b = new B(a);
            b.setText(a.text, a.link);
            b.visible = a.visible;
            b.xVal = a.x || 0 === a.x ? a.x : a.pos;
            b.yVal = a.y || 0 === a.y ? a.y : a.pos;
            this.textAlign && (b.textAlign = this.textAlign);
            this.textBaseline && (b.textBaseline = this.textBaseline);
            this.addChild(b);
            this.labelsCount += 1
        };
        b.prototype.count = function() {
            return this.labelsCount - 1
        };
        return b
    }(H);
    oa = function(d) {
        function b(a, f, c) {
            f = (null != f ? f : {}).text;
            b.__super__.constructor.call(this, a);
            this.calcSteps();
            a.steps = this.steps;
            this.showGrid = !0 !== a.hideGrid;
            this.showYGrid = !0 !== c.hideGrid;
            this.addChild(this.labels = new pa(this, a.labels, a));
            this.axisLabelOffset = 4;
            f && (this.axisLabel = new B({
                colour: "black"
            }), this.axisLabel.setText(f), this.addChild(this.axisLabel))
        }
        t(b, d);
        b.prototype.isRangeSet = function() {
            return void 0 !==
                this.max || null === this.max
        };
        b.prototype.setRange = function(a, b) {
            this.min = a;
            this.max = b;
            return this.calcSteps()
        };
        b.prototype.calcSteps = function() {
            var a, b;
            a = this.max - this.min;
            b = this.min > this.max;
            this.steps || (this.steps = 1);
            250 < Math.abs(a) / this.steps && (this.steps = a / 250);
            return this.steps = b ? -Math.abs(this.steps) : Math.abs(this.steps)
        };
        b.prototype.measure = function(a, b) {
            var c;
            c = this.stroke + this.tickLength + this.tickOffset + this.labels.measure(a, b).height;
            this.axisLabel && (c += this.axisLabelOffset + this.axisLabel.getHeight());
            return {
                width: a,
                height: c
            }
        };
        b.prototype.draw = function(a, f) {
            var c, h, k, d, e, j, m, g;
            a.xaxis = this;
            if (!this.isRangeSet()) {
                c = this.labels.count();
                if (void 0 === c || 0 > c) c = 0;
                this.setRange(0, c)
            }
            c = this.labels.measure(a.getWidth(), a.getHeight()).height;
            h = a.view(a.getBottom() + this.stroke + this.tickLength + this.tickOffset, a.getLeft(), a.getWidth(), c);
            h.xaxis = this;
            this.axisLabel && (this.axisLabel.x = a.getLeft() + a.getWidth() / 2, this.axisLabel.y = h.getBottom() + this.axisLabelOffset, this.axisLabel.textAlign = "center", this.axisLabel.textBaseline =
                "top");
            e = [];
            c = [];
            k = [];
            e.push(["M", [a.getLeft(), a.getBottom() + this.stroke / 2]]);
            e.push(["L", [a.getLeft() + a.getWidth(), a.getBottom() + this.stroke / 2]]);
            d = j = this.min;
            m = this.max;
            for (g = this.steps; 0 < g ? j <= m : j >= m; d = j += g) d = a.getXFromValue(d), k.push(["M", [d, a.getBottom() + this.tickOffset - this.tickLength]]), k.push(["L", [d, a.getBottom() + this.tickOffset + this.tickLength]]), c.push(["M", [d, a.getTop()]]), c.push(["L", [d, a.getTop() + a.getHeight()]]);
            (this.showYGrid || !this.showGrid) && f.path(e, {
                stroke: this.colour,
                "stroke-width": this.stroke
            });
            this.showGrid && f.path(c, {
                stroke: this.gridColour
            });
            f.path(k, {
                stroke: this.gridColour
            });
            return b.__super__.draw.call(this, h, f)
        };
        b.prototype.getHeight = function() {
            return this.stroke + this.tickLength + this.tickOffset + this.labels.getHeight()
        };
        b.prototype.getDefaultValues = function() {
            return {
                offset: 1
            }
        };
        return b
    }(w);
    pa = function(d) {
        function b(a, f, c) {
            this.xaxis = a;
            b.__super__.constructor.call(this, f);
            this.steps = c.steps;
            this.textAlign = "center";
            this.textBaseline = "bottom";
            this.addLabels(f)
        }
        t(b, d);
        b.prototype.measure =
            function(a) {
                var b, c;
                c = this.rotation = this.getRotation(a);
                b = 0;
                0 === c ? b = this.getHeight() : 90 === c && (b = this.getWidth());
                return {
                    width: a,
                    height: b
                }
            };
        b.prototype.draw = function(a, f) {
            var c, h, k, d, e, j;
            k = this.rotation;
            j = this.children;
            h = d = 0;
            for (e = j.length; d < e; h = ++d) c = j[h], c.x = isNaN(c.xVal) ? a.getOffsetXFromValue(h) : a.getOffsetXFromValue(c.xVal), c.y = a.getTop() + c.getHeight(), 90 === k && (c.x -= c.getHeight() / 2, c.y = a.getTop() + c.getWidth() / 2), c.rotation = k;
            return b.__super__.draw.call(this, a, f)
        };
        b.prototype.getRotation = function(a) {
            var b,
                c, h, k;
            k = this.children;
            c = 0;
            for (h = k.length; c < h; c++)
                if (b = k[c], b.hasVisibleText() && b.getWidth() + 6 > a / this.children.length) return 90;
            return 0
        };
        return b
    }(x);
    sa = function(d) {
        function b(a, f, c) {
            f = (null != f ? f : {}).text;
            b.__super__.constructor.call(this, a);
            this.conditions = a.conditions;
            this.hideGrid = a.hideGrid;
            this.log = a.log;
            this.showGrid = !0 !== a.hideGrid;
            this.showXGrid = !0 !== c.hideGrid;
            this.addChild(this.labels = new N(this, a.labels, a));
            this.axisLabelOffset = 4;
            f && (this.axisLabel = new B({
                    colour: "black"
                }), this.axisLabel.setText(f),
                this.addChild(this.axisLabel))
        }
        t(b, d);
        b.prototype.getWidth = function() {
            return this.stroke + this.tickLength + this.tickOffset + this.labels.getWidth() + (this.axisLabel ? this.axisLabelOffset + this.axisLabel.getHeight() : 0)
        };
        b.prototype.measure = function(a, b) {
            return {
                width: this.getWidth(),
                height: b
            }
        };
        b.prototype.draw = function(a, f) {
            var c, h, k, d, e, j, m, g, i, p, l;
            a.yaxis = this;
            c = 0;
            this.axisLabel && (c = this.axisLabel.getHeight() + this.axisLabelOffset, this.axisLabel.x = a.getLeft() + this.axisLabel.getHeight() / 2, this.axisLabel.y =
                a.getTop() + a.getHeight() / 2, this.axisLabel.rotation = 270, this.axisLabel.textAlign = "center", this.axisLabel.textBaseline = "middle");
            h = new I(a.getTop(), a.getLeft() + c, a.getLeft() + c + this.labels.getWidth(), a.getBottom());
            h.yaxis = this;
            a = new I(a.getTop(), h.getRight(), a.getRight(), a.getBottom());
            a.yaxis = this;
            this.drawConditions(a, f);
            g = [];
            c = [];
            e = [];
            d = this.tickOffset + this.tickLength + this.stroke;
            k = a.getLeft() + d;
            j = a.getWidth() - d;
            g.push(["M", [k, a.getTop()]]);
            g.push(["L", [k, a.getTop() + a.getHeight() + this.stroke]]);
            d = i = this.min;
            p = this.max;
            for (l = this.steps; 0 < l ? i <= p : i >= p; d = i += l) m = a.getYFromValue(this.log ? Math.pow(10, d) : d), m += this.stroke / 2, e.push(["M", [k - this.tickLength, m]]), e.push(["L", [k + this.tickLength, m]]), d !== this.min && (c.push(["M", [k, m]]), c.push(["L", [k + j, m]]));
            (this.showXGrid || !this.showGrid) && f.path(g, {
                stroke: this.colour,
                "stroke-width": this.stroke
            });
            this.showGrid && f.path(c, {
                stroke: this.gridColour
            });
            f.path(e, {
                stroke: this.gridColour
            });
            return b.__super__.draw.call(this, h, f)
        };
        b.prototype.drawConditions = function(a,
            b) {
            var c, h, k, d, e, j, m, g;
            if (this.conditions) {
                k = a.getYAxisValues().getBottomValue();
                d = a.getYAxisValues().getTopValue();
                e = k;
                g = this.conditions;
                j = 0;
                for (m = g.length; j < m; j++) c = g[j], h = a.getYFromValue(c.value), h = Math.min(h, k), h = Math.max(h, d), c = r.hexToRGB(c.colour), b.rect(a.getLeft() + this.tickOffset + this.tickLength + this.stroke, h, a.getWidth(), e - h, {
                    fill: c
                }), e = h
            }
        };
        b.prototype.getDefaultValues = function() {
            return {
                offset: !1
            }
        };
        return b
    }(w);
    ta = function(d) {
        function b(a, f) {
            var c;
            c = (null != f ? f : {}).text;
            b.__super__.constructor.call(this,
                a);
            this.addChild(this.labels = new N(this, a.labels, a));
            this.axisLabelOffset = 4;
            c && (this.axisLabel = new B({
                colour: "black"
            }), this.axisLabel.setText(c), this.addChild(this.axisLabel))
        }
        t(b, d);
        b.prototype.getWidth = function() {
            return this.stroke + this.tickLength + this.tickOffset + this.labels.getWidth() + (this.axisLabel ? this.axisLabelOffset + this.axisLabel.getHeight() : 0)
        };
        b.prototype.measure = function(a, b) {
            return {
                width: this.getWidth(),
                height: b
            }
        };
        b.prototype.draw = function(a, f) {
            var c, h, k, d, e, j;
            a.yRightAxis = this;
            c = a.view(a.getTop(),
                a.getLeft(), this.stroke + this.tickLength + this.tickOffset, a.getHeight());
            c.yaxis = this;
            h = new I(a.getTop(), c.getRight(), c.getRight() + this.labels.getWidth(), a.getBottom());
            h.yaxis = this;
            this.axisLabel && (this.axisLabel.x = h.getRight() + this.axisLabelOffset + this.axisLabel.getHeight() / 2, this.axisLabel.y = a.getTop() + a.getHeight() / 2, this.axisLabel.rotation = 270, this.axisLabel.textAlign = "center", this.axisLabel.textBaseline = "middle");
            a = c;
            c = [];
            c.push(["M", [a.getLeft() + this.stroke / 2, a.getTop()]]);
            c.push(["L", [a.getLeft() +
                this.stroke / 2, a.getTop() + a.getHeight() + this.stroke
            ]]);
            k = d = this.min;
            e = this.max;
            for (j = this.steps; 0 < j ? d <= e : d >= e; k = d += j) k = a.getYFromValue(this.log ? Math.pow(10, k) : k), k += this.stroke / 2, c.push(["M", [a.getLeft() + this.stroke - this.tickLength, k]]), c.push(["L", [a.getLeft() + this.stroke + this.tickLength, k]]);
            f.path(c, {
                stroke: this.colour,
                "stroke-width": this.stroke
            });
            return b.__super__.draw.call(this, h, f)
        };
        b.prototype.getDefaultValues = function() {
            return {
                offset: !1
            }
        };
        return b
    }(w);
    N = function(d) {
        function b(a, f, c) {
            this.yaxis =
                a;
            b.__super__.constructor.call(this, f);
            this.min = c.min;
            this.max = c.max;
            f.visibleSteps && (this.steps = f.visibleSteps);
            f.steps && (this.steps = f.steps);
            this.textAlign = "right";
            this.textBaseline = "middle";
            this.addLabels(f)
        }
        t(b, d);
        b.prototype.draw = function(a, f) {
            var c, h, k, d, e, j;
            h = this.getWidth();
            k = a.getYAxisValues();
            j = this.children;
            d = 0;
            for (e = j.length; d < e; d++) c = j[d], c.x = a.getLeft() + h, c.y = k.getOffsetValue(this.yaxis.log ? Math.pow(10, c.yVal) : c.yVal);
            return b.__super__.draw.call(this, a, f)
        };
        return b
    }(x);
    U = function(d) {
        function b(a) {
            b.__super__.constructor.call(this,
                a);
            this.spokeLabels = new W(a["spoke-labels"]);
            this.addChild(this.spokeLabels)
        }
        t(b, d);
        b.prototype.draw = function(a, f) {
            a.radarAxis = this;
            a.setAngles(this.spokeLabels.children.length);
            this.count = a.angles;
            this.drawGrid(a, f, this.count);
            b.__super__.draw.call(this, a, f)
        };
        b.prototype.drawAxis = function(a, b, c) {
            var h, k, d, e, j;
            k = [];
            for (h = j = 0; 0 <= c ? j <= c : j >= c; h = 0 <= c ? ++j : --j) e = a.getCoordsFromXPositionAndYValue(h, 0), d = e.x, e = e.y, k.push(["M", [d, e]]), h = a.getCoordsFromXPositionAndYValue(h, this.max), d = h.x, e = h.y, k.push(["L", [d, e]]);
            b.path(k, {
                "store-width": this.stroke,
                stroke: this.colour
            })
        };
        b.prototype.drawGrid = function(a, b, c) {
            var h, k, d, e, j, m, g, i, p;
            k = [];
            d = m = this.steps;
            i = this.max;
            for (p = this.steps; 0 < p ? m <= i : m >= i; d = m += p) {
                g = a.getCoordsFromXPositionAndYValue(0, d);
                e = g.x;
                j = g.y;
                k.push(["M", [e, j]]);
                for (h = g = 1; 1 <= c ? g <= c : g >= c; h = 1 <= c ? ++g : --g) h = a.getCoordsFromXPositionAndYValue(h, d), e = h.x, j = h.y, k.push(["L", [e, j]])
            }
            k.push(["Z", [e, j]]);
            b.path(k, {
                "store-width": 1,
                stroke: this.gridColour
            })
        };
        return b
    }(w);
    W = function(d) {
        function b(a) {
            var f, c,
                h, k, d, e, j;
            b.__super__.constructor.call(this, a);
            a = r.mergeProps(a, {
                colour: "#784016",
                labels: []
            });
            j = this.labels = a.labels;
            f = k = 0;
            for (d = j.length; k < d; f = ++k) c = j[f], h = {
                text: "",
                visible: !0
            }, h = r.mergeProps(h, a), "string" === typeof c ? h.text = c : h = r.mergeProps(c, h), c = new B(h), c.textWrap = !0, c.setText(h.text, null != (e = a.links) ? e[f] : void 0), this.addChild(c)
        }
        t(b, d);
        b.prototype.measure = function() {
            return {
                width: this.getWidth(),
                height: this.getHeight()
            }
        };
        b.prototype.resizeLabel = function(a, b) {
            var c, h, k, d, e, j, m, g;
            c = a.getCenterX();
            g = this.children;
            h = j = 0;
            for (m = g.length; j < m; h = ++j) k = g[h], e = a.getCoordsFromXPositionAndYValue(h, a.getMax(), b), d = e.x, e = e.y, k.x = d > c ? d : d - k.getWidth(), 0 === h ? (k.y = e - k.getHeight() - 3, k.x = d) : (k.x += d > c ? 6 : -6, k.y = e - k.getHeight() / 2)
        };
        b.prototype.draw = function(a, f) {
            var c, h, d, e, j, m;
            d = a.getRadarRadius();
            for (h = !0; h && 10 < d;) {
                h = !1;
                this.resizeLabel(a, d);
                m = this.children;
                e = 0;
                for (j = m.length; e < j; e++)
                    if (c = m[e], c.x < this.left || c.y < this.top || c.y + c.getHeight() > this.bottom || c.x + c.getWidth() > this.right) {
                        h = !0;
                        break
                    }
                d--
            }
            b.__super__.draw.call(this,
                a, f)
        };
        return b
    }(H);
    ba = function(d) {
        function b(a) {
            b.__super__.constructor.call(this, a);
            this.gradient = r.copy(this.options.speedometer).gradient;
            this.conditions = a.conditions;
            this.addChild(this.labels = new ca(a.labels))
        }
        t(b, d);
        b.prototype.draw = function(a, f) {
            a.radarAxis = this;
            a.setAngles(this.labels.children.length - 1);
            this.count = a.angles;
            this.lineWidth = a.getHeight() / 10;
            this.arcWidth = this.lineWidth / 2;
            a.radius = a.getRadarRadius() - this.arcWidth;
            a.innerRadius = a.radius - this.arcWidth;
            a.outerRadius = a.radius + this.arcWidth;
            this.drawAxisArc(a, f, this.count);
            b.__super__.draw.call(this, a, f)
        };
        b.prototype.drawAxisArc = function(a, b) {
            var c, h, d, e, j, m, g, i, p, l, n;
            g = a.innerRadius;
            i = a.outerRadius;
            m = function(b, c, f, h, d) {
                var k, e, j, m, g;
                null == f && (f = i);
                null == h && (h = i - b);
                null == d && (d = 1);
                b = [];
                e = m = d;
                for (g = c - d; d <= g ? m <= g : m >= g; e = d <= g ? ++m : --m) k = a.getPositionAngle(e, c), j = a.getCoordsFromRadiusAndAngle(f, k), e = j.x, j = j.y, b.push(["M", [e, j]]), k = a.getCoordsFromRadiusAndAngle(h, k), e = k.x, j = k.y, b.push(["L", [e, j]]);
                return b
            };
            d = a.getCentre();
            j = function(a, c,
                h, e) {
                var j;
                j = [];
                b.arcPath(j, d.x, d.y, g, a * r.TO_RADIANS, c * r.TO_RADIANS);
                b.arcPath(j, d.x, d.y, i, c * r.TO_RADIANS, a * r.TO_RADIANS, !0);
                j.push("Z");
                b.path(j, {
                    fill: h,
                    stroke: e
                })
            };
            if (this.conditions) {
                c = 180;
                n = this.conditions;
                p = 0;
                for (l = n.length; p < l; p++) e = n[p], h = e.value, h = Math.min(e.value, this.max), h = Math.max(h, this.min), h = a.getValueAngle(h), j(c, h, e.colour), c = h;
                360 > h && j(h, 360, this.colour)
            }
            this.strokeColour = "white";
            j(180, 360, !this.conditions ? this.colour : void 0, this.strokeColour);
            e = 2 * (i - g) / 3;
            c = (i - g - e) / 2;
            p = e / 2;
            j = (i -
                g - p) / 2;
            j = m(p, 3 * this.count, i - j, g + j);
            b.path(j, {
                stroke: this.strokeColour,
                "stroke-width": 1
            });
            j = m(e, this.count, i - c, g + c);
            b.path(j, {
                stroke: this.strokeColour,
                "stroke-width": 2
            })
        };
        return b
    }(w);
    ca = function(d) {
        function b(a) {
            b.__super__.constructor.call(this, a);
            this.addLabels(a)
        }
        t(b, d);
        b.prototype.resizeLabel = function(a) {
            var b, c, h, d, e, j, m, g;
            c = a.getCentre();
            g = this.children;
            b = j = 0;
            for (m = g.length; j < m; b = ++j)(h = g[b], b = a.getPositionAngle(b), e = a.getCoordsFromRadiusAndAngle(a.outerRadius, b), d = e.x, e = e.y, h.y = e, h.x = d + (d >
                c.x ? 6 : -6), d > c.x - 10 && d < c.x + 10 && (h.y -= 6), h.textBaseline = "bottom", 180 <= b && 260 >= b) ? h.textAlign = "right" : 280 <= b && 360 >= b ? h.textAlign = "left" : 260 < b && 280 > b ? h.textAlign = "center" : (h.x = d, h.y = e)
        };
        b.prototype.draw = function(a, f) {
            var c, h, d, e, j, m;
            d = a.getRadarRadius();
            for (h = !0; h && 10 < d;) {
                h = !1;
                this.resizeLabel(a, d);
                m = this.children;
                e = 0;
                for (j = m.length; e < j; e++)
                    if (c = m[e], c.x < this.left || c.y < this.top || c.y + c.height > this.bottom || c.x + c.width > this.right) {
                        h = !0;
                        break
                    }
                d--
            }
            b.__super__.draw.call(this, a, f)
        };
        return b
    }(x);
    K = function(d) {
        function b(a,
            f, c, h) {
            b.__super__.constructor.call(this, a, f, c, h);
            this.radius = 0.7 * this.getWidth()
        }
        t(b, d);
        b.prototype.getRange = function() {
            return this.taxis.getRange()
        };
        b.prototype.getYFromValue = function(a) {
            var b, c, h;
            b = 2 * this.getTherRadius() + 8;
            c = this.getHeight() - 20 - b;
            h = this.getRange();
            return this.getBottom() - b - (a - h.min) * (c / h.count)
        };
        b.prototype.getYBottom = function() {
            return this.getYFromValue(this.getRange().min)
        };
        b.prototype.getYTop = function() {
            return this.getYFromValue(this.getRange().max)
        };
        b.prototype.getTherRadius =
            function() {
                return this.radius
            };
        return b
    }(I);
    fa = function(d) {
        function b(a) {
            var f, c, h, d;
            b.__super__.constructor.call(this, a);
            this.values = a.values;
            this.keys = a.keys;
            this.addChild(this.bars = new l);
            this.addChild(this.barLabels = new H);
            this.barLabelsTopGap = 5;
            this.barLabelsBottomGap = 2;
            this.barLabelsBetweenGap = 10;
            d = this.values;
            f = c = 0;
            for (h = d.length; c < h; f = ++c) a = d[f], null !== a && (this.bars.addChild(new ia(f, this.values.length, a)), f = new B(a), f.textAlign = "center", f.textBaseline = "top", f.textWrap = !0, f.setText(a.label,
                a.link), f.visible = !0, this.barLabels.addChild(f))
        }
        t(b, d);
        b.prototype.draw = function(a, b) {
            var c, h, d, e, j, m, g, i, p, l, n, v;
            this.taxis = a.taxis;
            m = this.taxis.labels.getWidth();
            e = 80 * this.bars.children.length;
            e = Math.max((a.getWidth() - e - m - 9) / 2, 0);
            h = 0;
            i = this.barLabels.children;
            d = 0;
            for (g = i.length; d < g; d++) c = i[d], c.maxLineWidth = 80 - this.barLabelsBetweenGap, c.textDimensions(), h += c.width, h > a.getRight() && (c.visible = !1);
            c = this.barLabels.getHeight();
            h = a.getHeight() - c - this.barLabelsTopGap - this.barLabelsBottomGap;
            g = a.getTop() +
                h + this.barLabelsTopGap;
            p = a.getTop();
            i = a.getLeft() + e + 9 + m;
            v = this.bars.children;
            j = l = 0;
            for (n = v.length; l < n; j = ++l) c = v[j], i > a.getRight() ? (c.visible = !1, c = this.barLabels.children[j], c.visible = !1) : (d = new K(p + 0.5, i, i + 50, p + h + 0.5), d.taxis = this.taxis, c.visible = !0, c.draw(d, b), c = this.barLabels.children[j], c.x = d.getCenterX(), c.y = g, c.visible = !0, c.draw(a, b), i += 2 * d.getTherRadius() + 10);
            a = new K(a.getTop(), a.getLeft(), a.getLeft() + 50, a.getTop() + h);
            a.taxis = this.taxis;
            g = this.taxis.labels.children;
            h = 0;
            for (d = g.length; h < d; h++) c =
                g[h], c.x = a.getLeft() + e + m, c.y = a.getYFromValue(c.yVal);
            this.taxis.labels.draw(a, b)
        };
        return b
    }(l);
    ia = function(d) {
        function b(a, f, c) {
            this.index = a;
            this.count = f;
            b.__super__.constructor.call(this, c);
            a = r.mergeProps(c, r.copy(this.options.thermometer));
            this.value = a.value;
            this.tip = a.tip;
            this.colour = a.colour;
            this.gradient = a.gradient;
            this.frameColor = a.frameColor;
            this.context = a.context;
            this.tickLength = 3;
            this.tickOffset = 4;
            this.tickStroke = 2;
            this.rectStroke = 1;
            this.visible = !0
        }
        t(b, d);
        b.prototype.draw = function(a, b) {
            var c,
                h, d, e, j, m, g, i, p, l, n, v, s, o, q, B, t, w, G, y, x;
            if (this.visible) {
                this.taxis = a.taxis;
                q = a.getTherRadius();
                v = Math.floor(0.6 * a.getWidth());
                s = Math.floor(a.getLeft() + (a.getWidth() - v) / 2);
                o = a.getTop();
                a.getHeight();
                l = a.getCenterX();
                n = a.getBottom() - q;
                w = a.getYBottom();
                g = v - 12;
                i = s + (v - g) / 2;
                p = this.value ? a.getYFromValue(this.value) : w;
                j = a.getCenterX();
                m = a.getBottom() - q;
                e = q - 6;
                h = function(a) {
                    var c, d;
                    c = n - Math.sqrt(Math.pow(q, 2) - Math.pow(v / 2, 2));
                    d = [];
                    d.push(["M", [s, a]]);
                    d.push(["L", [s, c]]);
                    b.arcTo(d, {
                        x: l,
                        y: n
                    }, {
                        x: s + v,
                        y: c
                    }, !0);
                    d.push(["L", [s + v, a]]);
                    d.push("Z");
                    return d
                };
                c = function(a) {
                    var c, d;
                    c = m - Math.sqrt(Math.pow(e, 2) - Math.pow(g / 2, 2));
                    d = [];
                    d.push(["M", [i, a]]);
                    d.push(["L", [i, c]]);
                    b.arcTo(d, {
                        x: j,
                        y: m
                    }, {
                        x: i + g,
                        y: c
                    }, !0);
                    d.push(["L", [i + g, a]]);
                    d.push("Z");
                    return d
                };
                B = {
                    stroke: this.frameColor,
                    "stroke-width": this.rectStroke
                };
                b.path(h(o), B);
                if (this.taxis.conditions) {
                    o = a.getYBottom();
                    x = this.taxis.conditions;
                    B = 0;
                    for (G = x.length; B < G; B++) d = x[B], t = Math.min(d.value, a.getRange().max), t = Math.max(t, a.getRange().min), t = a.getYFromValue(t), d = {
                        fill: r.hexToRGB(d.colour),
                        stroke: r.hexToRGB(d.colour)
                    }, b.rect(s, t, v, o - t, d), o === a.getYBottom() && b.path(h(w - 1), d), o = t
                }
                B = {
                    fill: this.colour,
                    stroke: this.colour,
                    tooltip: this.tip,
                    canHover: !0
                };
                0 < (null != (y = this.taxis.conditions) ? y.length : void 0) ? (b.animatePath(c(p + 1), {
                    fill: b.getBackgroundColor()
                }, c(w)), b.animatePath(c(p), B, c(w))) : b.animatePath(h(p), B, h(w));
                this.gradient && b.circle(j, m, e, {
                    fill: "r#fff-" + this.colour,
                    tooltip: this.tip
                })
            }
        };
        b.prototype.drawTicks = function(a, b, c) {
            var d, e, j, m, g, i;
            e = a.getRange();
            d = [];
            j = m = e.min;
            g = e.max;
            for (i = e.steps; 0 < i ? m <= g : m >= g; j = m += i) e = c.x - this.tickStroke, j = a.getYFromValue(j) - this.tickStroke / 2, d.push(["M", [e, j]]), d.push(["L", [e + this.tickLength, j]]);
            return b.path(d, {
                stroke: "black",
                "stroke-width": this.tickStroke
            })
        };
        return b
    }(l);
    ga = function(d) {
        function b(a) {
            b.__super__.constructor.call(this, a);
            this.labels = new ha(a.labels);
            this.conditions = a.conditions
        }
        t(b, d);
        return b
    }(w);
    ha = function(d) {
        function b(a) {
            b.__super__.constructor.call(this, a);
            this.labelsCount = 0;
            this.labels = a.labels;
            this.min =
                a.min;
            this.max = a.max;
            this.steps = a.steps;
            void 0 === this.min && (this.min = 0);
            void 0 === this.max && (this.max = this.labels.length);
            void 0 === this.steps && (this.steps = 1);
            this.addLabels(a)
        }
        t(b, d);
        b.prototype.addLabels = function(a) {
            var b, c, d;
            if (a.labels) {
                d = a.labels;
                b = a = 0;
                for (c = d.length; a < c; b = ++a) b = d[b], this.addLabel(b)
            }
        };
        b.prototype.addLabel = function(a) {
            var b;
            b = new B(a);
            b.textAlign = "right";
            b.textBaseline = "middle";
            b.setText(a.text);
            b.xVal = a.x || 0 === a.x ? a.x : a.pos;
            b.yVal = a.y || 0 === a.y ? a.y : a.pos;
            b.visible = !0;
            b.colour =
                this.options.thermometer.labelColor;
            b.visible && this.addChild(b);
            this.labelsCount += 1
        };
        b.prototype.count = function() {
            return this.labelsCount - 1
        };
        return b
    }(H);
    $ = function(d) {
        function b(a, f) {
            var c, d, e, j, m;
            b.__super__.constructor.call(this, a);
            m = a.values;
            c = d = 0;
            for (e = m.length; d < e; c = ++d) c = m[c], null !== c && this.addChild(new aa(c));
            this.colour = null != (j = null != f ? f.colour : void 0) ? j : Charts.options.axis.colour
        }
        t(b, d);
        b.prototype.draw = function(a, f) {
            b.__super__.draw.call(this, a, f);
            this.centre = a.getCentre();
            this.centerRadius =
                0.05 * a.innerRadius;
            f.circle(this.centre.x, this.centre.y, this.centerRadius, {
                fill: this.colour,
                stroke: f.getBackgroundColor(),
                "stroke-width": 0
            });
            f.rect(a.getLeft(), this.centre.y, a.getWidth(), a.getBottom() - this.centre.y, {
                fill: f.getBackgroundColor()
            })
        };
        return b
    }(l);
    aa = function(d) {
        function b(a) {
            b.__super__.constructor.call(this, a);
            a = r.mergeProps(a, r.copy(this.options.speedometer || {}));
            this.label = a.label;
            this.link = a.link;
            this.value = a.value;
            this.tip = a.tip;
            this.colour = a.colour;
            this.context = a.context
        }
        t(b, d);
        b.prototype.draw = function(a, f) {
            var c, d, e;
            if (a.radarAxis.getRange().min <= (e = this.value) && e <= a.radarAxis.getRange().max) d = 0.05 * a.innerRadius, c = a.innerRadius + 0.75 * (a.outerRadius - a.innerRadius), e = a.getCentre(), f.animateTransformation(function(b) {
                var f, e;
                e = a.getCoordsFromRadiusAndAngle(c, b);
                f = a.getCoordsFromRadiusAndAngle(d / 2, b + 45);
                b = a.getCoordsFromRadiusAndAngle(d / 2, b - 45);
                return [
                    ["M", [f.x, f.y]],
                    ["L", [e.x, e.y]],
                    ["L", [b.x, b.y]],
                    ["Z"]
                ]
            }(180), {
                fill: this.colour,
                "stroke-width": 0,
                tooltip: this.tip,
                canHover: !0
            }, {
                transform: "R" + (a.getValueAngle(this.value) - 180) + "," + e.x + "," + e.y
            });
            b.__super__.draw.call(this, a, f)
        };
        b.prototype.getKeys = function() {
            return this.label ? [{
                text: this.label,
                link: this.link,
                colour: this.colour
            }] : b.__super__.getKeys.call(this)
        };
        return b
    }(l);
    this.Charts = {
        options: {
            font: "Tahoma",
            fontSize: 12,
            fontHeight: 12,
            showsTouchLine: !0,
            barGroupBoundaries: !1,
            hoverOpacity: 0.7,
            animation: {
                speed: 400,
                limit: 100
            },
            base: {
                showValueLabels: !0
            },
            padding: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            },
            lineDot: {
                type: "dot",
                "dot-size": 5,
                "halo-size": 2,
                alpha: 1,
                width: 1
            },
            scatterDot: {
                type: "dot",
                "dot-size": 5,
                "halo-size": 2,
                alpha: 1,
                width: 1
            },
            line: {
                "fill-alpha": 0.35,
                values: [],
                width: 2,
                colour: "#3030d0",
                text: "",
                "font-size": 12,
                loop: !1,
                shadow: !1,
                shadowColor: "rgba(0,0,0,0.5)",
                shadowColorFill: "transparent",
                "max-dots": 120
            },
            candle: {
                alpha: 1,
                values: [],
                "font-size": 12,
                colour: "#3030d0",
                shadow: !1,
                shadowColor: "rgba(0,0,0,0.5)",
                shadowColorFill: "transparent"
            },
            scatter: {
                values: [],
                "font-size": 12
            },
            bar: {
                shadow: !1,
                shadowColor: "rgba(0,0,0,0.5)",
                values: [],
                colour: "#3030d0",
                text: "",
                "font-size": 12,
                alpha: 1,
                keys: []
            },
            pie: {
                colour: "#784016",
                start: null,
                angle: null,
                gradient: !1
            },
            treemap: {},
            thermometer: {
                gradient: !1,
                frameColor: "#ddd",
                labelColor: "#000"
            },
            funnel: {
                gradient: !1
            },
            speedometer: {
                gradient: !1
            },
            tooltip: {
                fillGrid: !1
            },
            axis: {
                stroke: 1,
                "tick-height": 6,
                colour: "#784016",
                "grid-colour": "#F5E1AA",
                "grid-visible": !0,
                steps: 1,
                min: 0
            },
            legend: {
                position: 11,
                verticalPadding: 3,
                horizontalPadding: 6
            }
        },
        _create: function(d, b) {
            var a, f, c, h, k, j, m, g, i, p, v, s, o, t, w, G, x, C, A, H;
            null == b && (b = {});
            b = r.valuesOf(this.options,
                b, d.options);
            p = b.onShowTooltips;
            o = b.showsTouchLine;
            i = b.onClick;
            l.prototype.options = b;
            B.prototype.font = b.font;
            B.prototype.fontHeight = b.fontHeight;
            a = 0;
            k = !1;
            w = void 0;
            c = new l;
            t = d.elements;
            x = 0;
            for (C = t.length; x < C; x++) h = t[x], (f = function() {
                switch (h.type) {
                    case "pie":
                        return new R(h);
                    case "treeMap":
                        return new la(h);
                    case "line":
                    case "area":
                    case "line_dot":
                    case "line_hollow":
                        return k = !0, w = 0, new Q(h);
                    case "bar":
                    case "bar_round_glass":
                    case "bar_sketch":
                    case "bar_glass":
                    case "bar_cylinder":
                    case "bar_cylinder_outline":
                    case "bar_dome":
                    case "bar_round":
                    case "bar_round3d":
                    case "bar_fade":
                    case "bar_3d":
                    case "bar_filled":
                    case "bar_plastic":
                    case "bar_plastic_flat":
                    case "bar_stack":
                    case "hbar":
                    case "multihbar":
                        return new z(a++,
                            h);
                    case "scatter":
                        return k = !0, w = 0, new Y(h);
                    case "funnel":
                        return new e(h);
                    case "thermometer":
                        return new fa(h);
                    case "speedometer":
                        return new $(h, d.speedometer_axis);
                    case "candle":
                        return k = !0, new q(a++, h)
                }
            }()) && c.addChild(f);
            b.barGroupBoundaries && 1 < a && c.addChild(new y(h.type));
            g = new n;
            d.x_axis && d.y_axis ? (d.y_axis_right && (G = new ta(d.y_axis_right, d.y_right_legend)), null == w && (w = d.x_axis.offset), g = new ra(new oa(r.mergeProps({
                    offset: null != w ? w : 1
                }, d.x_axis), d.x_legend, d.y_axis), new sa(d.y_axis, d.y_legend, d.x_axis),
                G)) : d.radar_axis ? g = new V(new U(d.radar_axis)) : d.speedometer_axis && (g = new da(new ba(d.speedometer_axis)));
            d.t_axis && (g = new ja(new ga(d.t_axis)));
            window && g.setTLR && k && g.setTLR(new ka(b.tooltip.fillGrid, o));
            g.setCharts(c);
            g.setKeys && !1 !== d.showLegend && g.setKeys(g.getKeys(), null != (A = d.legendPosition) ? A : b.legend.position);
            s = null;
            m = 0;
            C = d.elements;
            f = 0;
            for (G = C.length; f < G; f++)
                if (h = C[f], 0 < (null != (H = h.values) ? H.length : void 0)) {
                    A = h.values;
                    c = 0;
                    for (x = A.length; c < x; c++)
                        if (t = A[c], 0 < (null != t ? t.length : void 0)) {
                            o = 0;
                            for (t = t.length; o < t; o++) m++
                        } else m++
                } else m++;
            j = function(a, b, c) {
                var f, d, h, e;
                c == null && (c = {});
                h = c.width;
                f = c.height;
                c = document.getElementById(a);
                if (h && f)
                    if (d = c.parentNode) {
                        c.width = /.*%/.test(h) ? d.clientWidth * h.replace(/%/, "") / 100 : h.replace(/px/, "");
                        c.height = /.*%/.test(f) ? d.clientHeight * f.replace(/%/, "") / 100 : f.replace(/px/, "")
                    }
                h = parseFloat(c.style && c.style.width || c.width);
                c = parseFloat(c.style && c.style.height || c.height);
                s = new X(a, h, c, {
                    hoverOpacity: Charts.options.hoverOpacity,
                    animationSpeed: -1 < (e = Charts.options.animation.limit) &&
                        e < m ? 0 : Charts.options.animation.speed,
                    background: b.bg_colour
                });
                s.setShowTooltips(p);
                typeof i === "string" && (i = window ? window[i] : null);
                s.setOnClick(i);
                return l.prototype.measureText = function(a, b, c) {
                    return s.measureText(a, b, c)
                }
            };
            v = function(c) {
                var f;
                if (!b.maxLineWidth) b.maxLineWidth = c.width * 0.25;
                f = new I(b.padding.top, b.padding.left, c.width - b.padding.right, c.height - b.padding.bottom);
                f.barGroups = a;
                g.optionsChanged(b);
                g.draw(f, c);
                c.render()
            };
            return {
                draw: function(a, b, c) {
                    c == null && (c = {});
                    s == null && j(a, b, c);
                    v(s)
                },
                resize: function(a, b, c) {
                    if (s.resize(b, c)) {
                        v(s);
                        return true
                    }
                    return false
                },
                clear: function() {
                    return s.clear()
                },
                initRenderer: j,
                getWidth: function() {
                    return s.width
                },
                getHeight: function() {
                    return s.height
                }
            }
        },
        create: function(d, b, a) {
            var f, c;
            null == a && (a = {});
            f = Charts._create(b, a);
            c = f.resize;
            f.resize = function(a, b) {
                return c(d, a, b)
            };
            f.initRenderer(d, b, a);
            return f
        },
        createAndRender: function(d, b, a) {
            var f;
            null == a && (a = {});
            f = Charts.create(d, b, a);
            f.draw(d, b, a);
            return f
        },
        createSC: function(d) {
            return new I(0, 0, d.canvas.width,
                d.canvas.height)
        },
        clearCanvas: function() {}
    };
    ja = function(d) {
        function b(a) {
            this.taxis = a;
            b.__super__.constructor.call(this)
        }
        t(b, d);
        b.prototype.draw = function(a, f) {
            a.taxis = this.taxis;
            b.__super__.draw.call(this, a, f)
        };
        b.prototype.setCharts = function(a) {
            this.charts = a;
            return this.addChild(this.charts)
        };
        return b
    }(l);
    n = function(d) {
        function b() {
            return Da = b.__super__.constructor.apply(this, arguments)
        }
        t(b, d);
        b.prototype.setCharts = function(a) {
            this.charts = a;
            return this.addChild(this.charts)
        };
        b.prototype.setKeys = function(a,
            b) {
            var c;
            null == b && (b = 11);
            if (0 < a.length) return this.addChild(this.keys = new G(a)), this.keyPosition = this.determineKeyPosition(b), this.keys.newLine = 1 === (c = this.keyPosition.side) || 3 === c
        };
        b.prototype.determineKeyPosition = function(a) {
            var b, c;
            if (null != a) return c = Math.floor((a + 1) % 12 / 3), b = function() {
                switch (c) {
                    case 0:
                        return (a + 1) % 3;
                    case 1:
                        return (a + 1) % 3;
                    case 2:
                        return (13 - a) % 3;
                    case 3:
                        return (13 - a) % 3
                }
            }(), {
                side: c,
                orientation: b
            }
        };
        b.prototype.measureKeys = function(a, b) {
            var c, d, e;
            if (this.keys) {
                c = this.keys.measure(a, b);
                if (c.height + 100 < b) {
                    this.keys.hidden = !1;
                    if (0 === (d = this.keyPosition.side) || 2 === d) c.height += Charts.options.legend.verticalPadding;
                    else if (1 === (e = this.keyPosition.side) || 3 === e) c.width += Charts.options.legend.horizontalPadding;
                    return c
                }
                this.keys.hidden = !0
            }
            return {
                width: 0,
                height: 0
            }
        };
        b.prototype.drawKeys = function(a, b, c, d, e) {
            var j, m;
            if (0 === (j = null != c ? c.side : void 0) || 2 === j) {
                j = d.width;
                m = d.height - Charts.options.legend.verticalPadding;
                j = function() {
                    switch (c.orientation) {
                        case 0:
                            return e.left + e.leftWidth;
                        case 1:
                            return e.left +
                                e.leftWidth + e.middleWidth / 2 - d.width / 2;
                        case 2:
                            return e.left + e.leftWidth + e.middleWidth - d.width
                    }
                }();
                if (0 === c.side) return this.keys.draw(a.view(e.top, j, d.width, m), b, c.orientation);
                if (2 === c.side) return this.keys.draw(a.view(e.top + e.height - m, j, d.width, m), b, c.orientation)
            } else if (1 === (m = null != c ? c.side : void 0) || 3 === m) {
                j = d.width - Charts.options.legend.horizontalPadding;
                m = d.height;
                m = function() {
                    switch (c.orientation) {
                        case 0:
                            return e.top;
                        case 1:
                            return e.top + e.height / 2 - d.height / 2;
                        case 2:
                            return e.top + e.height - d.height
                    }
                }();
                if (1 === c.side) return this.keys.draw(a.view(m, e.left + e.width - j, j, d.height), b);
                if (3 === c.side) return this.keys.draw(a.view(m, e.left, j, d.height), b)
            }
        };
        return b
    }(l);
    ra = function(d) {
        function b(a, f, c) {
            this.xaxis = a;
            this.yaxis = f;
            this.yaxisRight = c;
            b.__super__.constructor.call(this);
            this.addChild(this.xaxis);
            this.addChild(this.yaxis);
            this.yaxisRight && this.addChild(this.yaxisRight)
        }
        t(b, d);
        b.prototype.draw = function(a, b) {
            var c, d, e, j, m, g, i, p, l, s, n, v, o, q, r, t;
            m = this.getLabelHeight();
            g = a.getLeft();
            s = a.getTop();
            v = a.getWidth();
            d = a.getHeight();
            j = l = i = c = n = 0;
            if (1 === (p = null != (o = this.keyPosition) ? o.side : void 0) || 3 === p) e = this.measureKeys(v / 4, d), j += e.width;
            p = this.yaxis.measure(v, d);
            i += p.width;
            this.yaxisRight && (p = this.yaxisRight.measure(v - i, d), l += p.width);
            p = v - i - l - j;
            o = this.xaxis.measure(p, d);
            if (!this.yaxisRight && (0 === this.xaxis.labels.rotation && (l += this.xaxis.labels.getWidth() / 2, p = v - i - l - j, o = this.xaxis.measure(p, d)), 90 === this.xaxis.labels.rotation)) l += this.xaxis.labels.getHeight() / 2, p = v - i - l - j, o = this.xaxis.measure(p, d);
            null == e && (e =
                this.measureKeys(p, d));
            this.drawKeys(a, b, this.keyPosition, e, {
                left: g,
                leftWidth: i,
                middleWidth: p,
                width: v,
                top: s,
                height: d
            });
            if (0 === (null != (q = this.keyPosition) ? q.side : void 0)) n += e.height;
            if (3 === (null != (r = this.keyPosition) ? r.side : void 0)) g += e.width;
            0 === n && (n = this.yaxis.labels.getHeight() / 2);
            c += o.height;
            c = d - n - c - m;
            if (2 === (null != (t = this.keyPosition) ? t.side : void 0)) c -= e.height;
            e = a.view(s + n + m, g + i, p, c);
            this.yaxis.draw(a.view(s + n + m, g, p + i, c), b);
            this.xaxis.draw(a.view(s + n + m, g + i, p, c), b);
            this.yaxisRight && this.yaxisRight.draw(a.view(s +
                n + m, g + i + p, i, c), b);
            e.xaxis = this.xaxis;
            e.yaxis = this.yaxis;
            e.yRightAxis = this.yaxisRight;
            b.startGroup();
            this.charts.draw(e, b);
            b.finishGroupAndClip(e.getLeft(), e.getTop(), p, c);
            if (this.tlr) return this.tlr.draw(e, b)
        };
        b.prototype.getLabelHeight = function() {
            var a, b, c, d, e, j, m, g, i, p, l;
            d = 0;
            g = this.charts.children;
            e = 0;
            for (j = g.length; e < j; e++) {
                a = g[e];
                i = null != a ? a.children : void 0;
                a = 0;
                for (m = i.length; a < m; a++)
                    if (c = i[a], null != (p = c.barLabel) && null != (l = p.label) && "function" === typeof l.hasVisibleText && l.hasVisibleText()) b =
                        c.barLabel.label.textDimensions(), b = 0 === c.barLabel.label.rotation % 180 ? b.height : b.width, d = Math.max(d, b)
            }
            return d
        };
        b.prototype.setTLR = function(a) {
            this.tlr = a;
            return this.addChild(this.tlr)
        };
        return b
    }(n);
    V = function(d) {
        function b(a) {
            this.raxis = a;
            b.__super__.constructor.call(this);
            this.addChild(this.raxis)
        }
        t(b, d);
        b.prototype.draw = function(a, b) {
            var c, d, e, j, m, g, i, p, l;
            m = j = c = g = 0;
            if (1 === (d = null != (i = this.keyPosition) ? i.side : void 0) || 3 === d) e = this.measureKeys(a.getWidth() / 4, a.getHeight()), 1 === this.keyPosition.side ?
                m += e.width : j += e.width;
            else if (0 === (p = null != (l = this.keyPosition) ? l.side : void 0) || 2 === p) e = this.measureKeys(a.getWidth(), a.getHeight()), 0 === this.keyPosition.side ? g += e.height : c += e.height;
            d = {
                left: a.getLeft(),
                leftWidth: 0,
                middleWidth: a.getWidth(),
                width: a.getWidth(),
                top: a.getTop(),
                height: a.getHeight()
            };
            this.drawKeys(a, b, this.keyPosition, e, d);
            a.getWidth() > a.getHeight() ? (e = this.raxis.spokeLabels.getHeight(), g += e + 5, c += e + 5) : (e = this.raxis.spokeLabels.getWidth(), j += e + 5, m += e + 5);
            a = new J(a.getTop() + g, a.getLeft() +
                j, a.getRight() - m, a.getBottom() - c);
            this.raxis.draw(a, b);
            this.charts.draw(a, b);
            if (this.tlr) return this.tlr.draw(a, b)
        };
        b.prototype.setTLR = function(a) {
            this.tlr = a;
            return this.addChild(this.tlr)
        };
        return b
    }(n);
    da = function(d) {
        function b(a) {
            this.saxis = a;
            b.__super__.constructor.call(this);
            this.addChild(this.saxis)
        }
        t(b, d);
        b.prototype.draw = function(a, b) {
            var c, d, e, j, m, g, i, p, l;
            m = j = c = g = 0;
            if (1 === (d = null != (i = this.keyPosition) ? i.side : void 0) || 3 === d) e = this.measureKeys(a.getWidth() / 4, a.getHeight()), 1 === this.keyPosition.side ?
                m += e.width : j += e.width;
            else if (0 === (p = null != (l = this.keyPosition) ? l.side : void 0) || 2 === p) e = this.measureKeys(a.getWidth(), a.getHeight()), 0 === this.keyPosition.side ? g += e.height : c += e.height;
            d = {
                left: a.getLeft(),
                leftWidth: 0,
                middleWidth: a.getWidth(),
                width: a.getWidth(),
                top: a.getTop(),
                height: a.getHeight()
            };
            this.drawKeys(a, b, this.keyPosition, e, d);
            a.getWidth() > a.getHeight() && (g += this.saxis.labels.getHeight() + 5);
            e = this.saxis.labels.getWidth();
            j += e + 15;
            m += e + 15;
            a = new Z(a.getTop() + g, a.getLeft() + j, a.getRight() - m, a.getBottom() -
                c);
            this.saxis.draw(a, b);
            b.startGroup();
            this.charts.draw(a, b);
            b.finishGroupAndClip(a.getLeft(), a.getTop(), a.getWidth(), a.getHeight())
        };
        return b
    }(n);
    ka = function(d) {
        function b(a, f) {
            this.fillGrid = null != a ? a : !1;
            this.showLine = null != f ? f : !0;
            b.__super__.constructor.apply(this, arguments)
        }
        t(b, d);
        b.prototype.removeVerticalTouchLine = function() {
            var a;
            null != (a = this.line) && a.remove();
            return this.line = void 0
        };
        b.prototype.drawVerticalTouchLine = function(a) {
            if (this.showLine) return null == this.line && (this.line = this.renderer.path([
                ["M", [1, this.sc.top]],
                ["L", [1, this.sc.bottom]]
            ], {
                stroke: "#000"
            })), this.line.transform("T" + a + ",0")
        };
        b.prototype.activate = function(a, b) {
            if (this.sc.left <= a && a <= this.sc.right && this.sc.top <= b && b <= this.sc.bottom) return this.touchActive = !0
        };
        b.prototype.deactivate = function() {
            this.touchActive = !1;
            return this.removeVerticalTouchLine()
        };
        b.prototype.onTouch = function(a, f) {
            var c, d, e;
            if (this.touchActive && this.sc.left <= a && a <= this.sc.right && this.sc.top <= f && f <= this.sc.bottom) {
                this.drawVerticalTouchLine(a);
                if (this.fillGrid &&
                    null != (null != (d = this.sc) ? null != (e = d.xaxis) ? e.steps : void 0 : void 0)) d = this.sc.xaxis.steps, c = this.sc.xaxis.min, c = this.sc.getXFromValue(c + d) - this.sc.getXFromValue(c), c = Math.max(c / 2, 0);
                this.renderer.showTooltipsOnX(a, c)
            } else this.removeVerticalTouchLine();
            return b.__super__.onTouch.apply(this, arguments)
        };
        b.prototype.draw = function(a, b) {
            this.sc = a;
            this.renderer = b;
            this.renderer.setTouchLineRenderer(this);
            return this.removeVerticalTouchLine()
        };
        return b
    }(l);
    X = function() {
        function d(b, a, d, c) {
            var e, k, j, m = this;
            this.width = a;
            this.height = d;
            this.el = document.getElementById(b);
            this.animationSpeed = "VML" === Raphael.type ? 0 : null != (e = null != c ? c.animationSpeed : void 0) ? e : 0;
            this.hoverOpacity = null != (k = null != c ? c.hoverOpacity : void 0) ? k : 1;
            this.isFaded = !1;
            this.paper = Raphael(this.el, this.width, this.height);
            this.backgroundColor = null != (j = c.background) ? j : "#ffffff";
            this.paper.canvas.style.backgroundColor = this.backgroundColor;
            this.paper.canvas.onmouseout = function() {
                if ("function" === typeof m.onShowTooltipsFunc) m.onShowTooltipsFunc([]);
                m.paper.forEach(function(a) {
                    if (a.data("canFade") || a.data("canHover")) return a.attr({
                        opacity: 1
                    })
                });
                m.isFaded = !1
            };
            this.paper.canvas.onmouseover = function() {
                m.paper.forEach(function(a) {
                    if (a.data("canFade") || a.data("canHover")) return a.attr({
                        opacity: m.hoverOpacity
                    })
                });
                m.isFaded = !0
            };
            this.paper.canvas.onmousemove = function() {
                var a, b, c, d;
                d = m.panelMousemove;
                b = 0;
                for (c = d.length; b < c; b++) a = d[b], a.apply(m, arguments)
            };
            this.panelMousemove = [];
            this.panelMousemove.push(function() {
                if ("function" === typeof this.onShowTooltipsFunc) this.onShowTooltipsFunc(this.tooltips,
                    this.el);
                this.tooltips = []
            });
            this.tooltips = [];
            this.initTooltipHandling()
        }
        d.prototype.initTooltipHandling = function() {
            var b, a = this;
            this.tooltipElements = [];
            document && "ontouchstart" in document.documentElement && (b = function(b) {
                var c, d, e;
                if (1 === (null != (c = b.targetTouches) ? c.length : void 0)) return b = b.targetTouches[0], null != (d = a.touchLineRenderer) && d.activate(b.pageX, b.pageY), null != (e = a.touchLineRenderer) ? e.onTouch(b.pageX, b.pageY) : void 0
            }, this.paper.canvas.addEventListener("touchmove", b), this.paper.canvas.addEventListener("touchstart",
                b));
            this.paper.canvas.onmousedown = function(b) {
                var c, d, e;
                if (b == null) b = window.event;
                return (c = a.touchLineRenderer) != null ? c.activate((d = b.offsetX) != null ? d : b.layerX, (e = b.offsetY) != null ? e : b.layerY) : void 0
            };
            this.paper.canvas.onmouseup = function() {
                var b;
                return (b = a.touchLineRenderer) != null ? b.deactivate() : void 0
            };
            return this.panelMousemove.push(function(b) {
                var c, d, e;
                if (b == null) b = window.event;
                return (c = a.touchLineRenderer) != null ? c.onTouch((d = b.offsetX) != null ? d : b.layerX, (e = b.offsetY) != null ? e : b.layerY) : void 0
            })
        };
        d.prototype.rect = function(b, a, d, c, e) {
            return this.animateRect(b, a, d, c, e)
        };
        d.prototype.animateRect = function(b, a, d, c, e, k) {
            var j;
            e.stroke || (e.stroke = "none");
            if (0 < this.animationSpeed) switch (k) {
                case "right":
                    k = this.paper.rect(b, a, 0, c);
                    k.animate({
                        width: d
                    }, this.animationSpeed);
                    break;
                case "left":
                    k = this.paper.rect(b + d, a, 0, c);
                    k.animate({
                        x: b,
                        width: d
                    }, this.animationSpeed);
                    break;
                case "up":
                    k = this.paper.rect(b, a + c, d, 0);
                    k.animate({
                        y: a,
                        height: c
                    }, this.animationSpeed);
                    break;
                case "down":
                    k = this.paper.rect(b, a, d, 0);
                    k.animate({
                            height: c
                        },
                        this.animationSpeed);
                    break;
                case "vertical":
                    k = this.paper.rect(b, a + c / 2, d, 0);
                    k.animate({
                        y: a,
                        height: c
                    }, this.animationSpeed);
                    break;
                case "horizontal":
                    k = this.paper.rect(b + d / 2, a, 0, c);
                    k.animate({
                        x: b,
                        width: d
                    }, this.animationSpeed);
                    break;
                default:
                    k = this.paper.rect(b, a, d, c)
            } else k = this.paper.rect(b, a, d, c);
            k.attr(e);
            k.data("canFade", null != (j = e.canHover) ? j : e.canFade);
            this.hover(k, e);
            this.onClick(k, e);
            return this.tooltip(k, e)
        };
        d.prototype.image = function(b, a, d, c, e, j) {
            var m, g, i, p;
            m = null != (g = null != j ? j.rotation : void 0) ?
                g : 0;
            g = null != (i = null != j ? j.xOffset : void 0) ? i : 0;
            i = null != (p = null != j ? j.yOffset : void 0) ? p : 0;
            b = this.paper.image(b, a, d, c, e);
            null != (null != j ? j.link : void 0) && b.attr({
                href: j.link,
                target: "new"
            });
            b.transform("r" + m + "t" + g + "," + i);
            b.data("noClip", j.noClip);
            return b
        };
        d.prototype.circle = function(b, a, d, c) {
            null == c && (c = {});
            return this.animateCircle(b, a, d, c)
        };
        d.prototype.animateCircle = function(b, a, d, c, e, j, m) {
            var g;
            null == c && (c = {});
            null == e && (e = b);
            null == j && (j = a);
            null == m && (m = d);
            c.stroke || (c.stroke = "none");
            0 < this.animationSpeed &&
                (e !== b || j !== a || m !== d) ? (m = this.paper.circle(e, j, m), m.animate({
                    transform: "T" + (b - e) + "," + (a - j),
                    r: d,
                    "stroke-width": c["stroke-width"]
                }, this.animationSpeed)) : m = this.paper.circle(b, a, d);
            m.attr(c);
            m.data("canFade", null != (g = c.canHover) ? g : c.canFade);
            this.hover(m, c);
            this.onClick(m, c);
            this.tooltip(m, c);
            return m
        };
        d.prototype.path = function(b, a) {
            null == a && (a = {});
            return this.animatePath(b, a)
        };
        d.prototype.buildPath = function(b) {
            var a, d, c, e, j, m;
            d = "";
            j = 0;
            for (m = b.length; j < m; j++) a = b[j], "string" === typeof a ? d += a : (c = a[0], e =
                a[1], d += function() {
                    switch (c) {
                        case "M":
                            return "M" + e[0] + "," + e[1];
                        case "L":
                            return "L" + e[0] + "," + e[1];
                        case "Z":
                            return "Z"
                    }
                }());
            return d
        };
        d.prototype.animatePath = function(b, a, d) {
            null == a && (a = {});
            return null != d ? this.animateTransformation(d, a, {
                path: this.buildPath(b)
            }) : this.animateTransformation(b, a)
        };
        d.prototype.animateTransformation = function(b, a, d) {
            var c, b = this.paper.path(this.buildPath(b));
            null != d && (0 < this.animationSpeed ? b.animate(d, this.animationSpeed) : b.attr(d));
            a.stroke || (a.stroke = "none");
            var e;
            a: switch (a["stroke-type"]) {
                case "dashed":
                    e =
                        "-";
                    break a;
                case "dotted":
                    e = "."
            }
            a["stroke-dasharray"] = e;
            b.attr(a);
            b.data("canFade", null != (c = a.canHover) ? c : a.canFade);
            this.hover(b, a);
            this.onClick(b, a);
            this.tooltip(b, a);
            return b
        };
        d.prototype.arcPath = function(b, a, d, c, e, j, m) {
            var g, i;
            g = Math.abs(j - e) > 180 * r.TO_RADIANS ? 1 : 0;
            i = a + c * Math.cos(e);
            e = d + c * Math.sin(e);
            a += c * Math.cos(j);
            d += c * Math.sin(j);
            c = [c, c, 0, g, m ? 0 : 1, a, d].join();
            b.push([b.length ? "L" : "M", [i, e]]);
            b.push("A" + c);
            return b
        };
        d.prototype.arcTo = function(b, a, d, c) {
            null == c && (c = !1);
            a = Math.sqrt(Math.pow(a.x -
                d.x, 2) + Math.pow(a.y - d.y, 2));
            b.push("A" + a + "," + a + ",0," + (c ? 1 : 0) + ",0," + d.x + "," + d.y);
            return b
        };
        d.prototype.buildCircularArc = function(b, a, d, c, e, j) {
            var m;
            m = [];
            0 < d ? this.arcPath(m, b, a, d, j, e, !0) : m.push(["M", [b, a]]);
            this.arcPath(m, b, a, c, e, j, !1);
            m.push(["Z"]);
            return m
        };
        d.prototype.animateCircularArc = function(b, a, d, c, e, j, m) {
            d = this.buildCircularArc(b, a, d, c, e, j);
            b = this.buildCircularArc(b, a, 0, 1, e, j);
            return this.animatePath(d, m, b)
        };
        d.prototype.text = function(b) {
            return this.animateText(b)
        };
        d.prototype.animateText = function(b,
            a, d) {
            var c, e, j, m, g, i, p, l, n, v, s, o;
            i = b.text;
            v = b.x;
            o = b.y;
            g = b.rotation;
            e = b.font;
            j = b.fontSize;
            c = b.colour;
            p = b.textAlign;
            n = b.textBaseline;
            s = b.xOffset;
            m = b.noClip;
            null == a && (a = v);
            null == d && (d = o);
            b = 0 < this.animationSpeed && (a !== v || d !== o);
            l = function() {
                if (p) switch (p) {
                    case "start":
                    case "left":
                        return "start";
                    case "end":
                    case "right":
                        return "end";
                    default:
                        return "middle"
                } else return "start"
            }();
            "string" !== typeof i && (i = i.join("\n"));
            i = b ? this.paper.text(a, d, i) : this.paper.text(v, o, i);
            i.attr({
                "text-anchor": l,
                "font-size": j,
                "font-family": e,
                fill: c
            });
            c = 0;
            "top" === n ? c = 0.5 * i.getBBox().height : "bottom" === n && (c = -(0.5 * i.getBBox().height));
            (g = "" + (g ? "r" + g + "," + (b ? a : v) + "," + (b ? d : o) : "") + (c ? "t0," + c : "") + (s ? "t" + s + ",0" : "")) && i.transform(g);
            i.data("noClip", m);
            b && i.animate({
                transform: g + ("T" + (v - a) + "," + (o - d))
            }, this.animationSpeed);
            return i
        };
        d.prototype.startGroup = function() {
            this.paper.setStart()
        };
        d.prototype.finishGroupAndClip = function(b, a, d, c) {
            var e;
            e = this.paper.setFinish();
            e.forEach(function(e) {
                if (!0 !== e.data("noClip")) return e.attr({
                    "clip-rect": "" + b + " " +
                        a + " " + d + " " + c
                })
            });
            "VML" === Raphael.type && e.forEach(function(a) {
                var b;
                return null != (b = a.node) ? b.style.zIndex = 1 : void 0
            })
        };
        d.prototype.hover = function(b, a) {
            var d, c, e = this;
            b.data("noClip", a.noClip);
            a.canHover && (b.data("canHover", !0), b.data("growOnHover", a.growOnHover), b.data("growStroke", a.growStroke), d = c = void 0, b.hover(function() {
                return setTimeout(function() {
                    c = b.attr("stroke-width");
                    b.attr({
                        opacity: 1
                    });
                    if (b.data("growOnHover")) return d = !0 === b.data("growOnHover") ? 2 : b.data("growOnHover"), b.transform("...s" +
                        d), b.data("growStroke") && b.attr({
                        "stroke-width": c * d
                    }), b.data("isGrown", !0)
                }, 0)
            }, function() {
                return setTimeout(function() {
                    e.isFaded && b.attr({
                        opacity: e.hoverOpacity
                    });
                    if (b.data("isGrown")) return b.attr({
                        transform: "...s" + 1 / d,
                        "stroke-width": c
                    }), b.data("isGrown", !1)
                }, 0)
            }))
        };
        d.prototype.tooltip = function(b, a) {
            var d, c, e, j, m, g, i = this;
            if ((e = a.tooltip) && this.onShowTooltipsFunc) {
                if (!1 !== a.touchLineTooltip)
                    if (0 < (null != (c = e.points) ? c.length : void 0)) {
                        c = this.el.getBoundingClientRect();
                        g = e.points;
                        j = 0;
                        for (m = g.length; j <
                            m; j++) d = g[j], this.tooltipElements.push({
                            el: b,
                            attr: r.valuesOf(a, {
                                tooltip: d.tip
                            }),
                            bbox: {
                                x: d.x - 3,
                                y: d.y - 3,
                                width: 7,
                                height: 7
                            },
                            position: {
                                x: d.x + c.left,
                                y: d.y + c.top
                            }
                        })
                    } else this.tooltipElements.push({
                        el: b,
                        attr: a
                    });
                b.mousemove(function(c) {
                    var j, m, k, g, p, l, v, n;
                    if (0 < (null != (j = e.points) ? j.length : void 0)) {
                        j = 4;
                        m = void 0;
                        v = e.points;
                        p = 0;
                        for (l = v.length; p < l; p++) d = v[p], k = Math.sqrt(Math.pow((null != (g = c.offsetX) ? g : c.layerX) - d.x, 2) + Math.pow((null != (n = c.offsetY) ? n : c.layerY) - d.y, 2)), k < j && (j = k, m = d);
                        if (m) return g = r.valuesOf(a, {
                            tooltip: m.tip
                        }), i.showTooltip(b.getBBox(), g, c.clientX, c.clientY)
                    } else return i.showTooltip(b.getBBox(), a, c.clientX, c.clientY)
                })
            }
        };
        d.prototype.showTooltip = function(b, a, d, c) {
            var e, j;
            e = this.el.getBoundingClientRect();
            null == d && (d = e.left + b.x + b.width / 2);
            null == c && (c = e.top + b.y + b.height / 2);
            b = d + (document.documentElement.scrollLeft || document.body.scrollLeft);
            d = c + (document.documentElement.scrollTop || document.body.scrollTop);
            c = null != a["onclick-context"] ? c = null != (j = JSON.parse(a["onclick-context"])) ? j.dataLink :
                void 0 : void 0;
            return this.tooltips.push({
                x: b,
                y: d,
                text: a.tooltip,
                dataId: c,
                color: a["tooltip-colour"] || a.fill || a.stroke
            })
        };
        d.prototype.onClick = function(b, a) {
            var d, c, e = this;
            c = a["onclick-context"];
            null != c && (d = JSON.parse(c), d.tooltip = a.tooltip, d.color = a["tooltip-colour"] || a.fill || a.stroke, c = JSON.stringify(d));
            c && this.onClickFunc && b.click(function(a) {
                return e.onClickFunc(a, c)
            })
        };
        d.prototype.render = function() {};
        d.prototype.measureText = function(b, a, d) {
            var c;
            c = document.createElement("div");
            c.setAttribute("style",
                "position:absolute;visibility:hidden;top:-100px;font-family:" + a + ";font-size:" + d + "px;line-height:initial;margin:0;padding:0;");
            c.innerText = c.textContent = b;
            document.body.appendChild(c);
            a = c.offsetWidth;
            b = c.offsetHeight;
            document.body.removeChild(c);
            return {
                width: a,
                height: b
            }
        };
        d.prototype.resize = function(b, a) {
            return b !== this.width || a !== this.height ? (this.width = b, this.height = a, this.clear(), this.paper.setSize(this.width, this.height), !0) : !1
        };
        d.prototype.clear = function() {
            return this.paper.clear()
        };
        d.prototype.setShowTooltips =
            function(b) {
                this.onShowTooltipsFunc = b
            };
        d.prototype.setOnClick = function(b) {
            this.onClickFunc = b
        };
        d.prototype.getOffset = function(b) {
            var a;
            if (a = b && b.ownerDocument) return a = a.documentElement, b = void 0 !== typeof b.getBoundingClientRect ? b.getBoundingClientRect() : {
                top: 0,
                left: 0
            }, {
                offsetY: b.top + (window.pageYOffset || a.scrollTop) - (a.clientTop || 0),
                offsetX: b.left + (window.pageXOffset || a.scrollLeft) - (a.clientLeft || 0)
            }
        };
        d.prototype.setTouchLineRenderer = function(b) {
            this.touchLineRenderer = b
        };
        d.prototype.showTooltipsOnX =
            function(b, a) {
                var d, c, e, j, m, g;
                null == a && (a = 0);
                if (null != this.onShowTooltipsFunc) {
                    this.tooltips = [];
                    m = this.tooltipElements;
                    e = 0;
                    for (j = m.length; e < j; e++) c = m[e], d = null != (g = c.bbox) ? g : c.el.getBBox(), d.x - a <= b && b <= d.x + d.width + a && this.showTooltip(d, c.attr);
                    if ("function" === typeof this.onShowTooltipsFunc) this.onShowTooltipsFunc(this.tooltips, this.el);
                    return this.tooltips = []
                }
            };
        d.prototype.getBackgroundColor = function() {
            return this.backgroundColor
        };
        return d
    }()
}).call(this);
var Treemap = {};
(function() {
    Treemap.generate = function() {
        function w(l, o, q, g) {
            this.xoffset = l;
            this.yoffset = o;
            this.height = g;
            this.width = q;
            this.shortestEdge = function() {
                return Math.min(this.height, this.width)
            };
            this.getCoordinates = function(g) {
                var l = [],
                    e = this.xoffset,
                    j = this.yoffset,
                    m = i(g) / this.height,
                    p = i(g) / this.width,
                    v;
                if (this.width >= this.height)
                    for (v = 0; v < g.length; v++) l.push([e, j, e + m, j + g[v] / m]), j += g[v] / m;
                else
                    for (v = 0; v < g.length; v++) l.push([e, j, e + g[v] / p, j + p]), e += g[v] / p;
                return l
            };
            this.cutArea = function(g) {
                this.width >= this.height ?
                    (g /= this.height, g = new w(this.xoffset + g, this.yoffset, this.width - g, this.height)) : (g /= this.width, g = new w(this.xoffset, this.yoffset + g, this.width, this.height - g));
                return g
            }
        }

        function A(i, o, q, g, s) {
            var g = "undefined" === typeof g ? 0 : g,
                s = "undefined" === typeof s ? 0 : s,
                w = [],
                e = [],
                j;
            if (i[0] && i[0].constructor === Array) {
                for (j = 0; j < i.length; j++) w[j] = l(i[j]);
                o = x(w, o, q, g, s);
                for (j = 0; j < i.length; j++) e.push(A(i[j], o[j][2] - o[j][0], o[j][3] - o[j][1], o[j][0], o[j][1]))
            } else e = x(i, o, q, g, s);
            return e
        }

        function x(l, o, q, g, s) {
            for (var g = "undefined" ===
                    typeof g ? 0 : g, s = "undefined" === typeof s ? 0 : s, x = z, e = o * q, j = [], m = i(l), e = e / m, m = 0; m < l.length; m++) j[m] = l[m] * e;
            l = x(j, [], new w(g, s, o, q), []);
            o = [];
            for (q = 0; q < l.length; q++)
                for (g = 0; g < l[q].length; g++) o.push(l[q][g]);
            return o
        }

        function z(l, o, q, g) {
            var s, w;
            if (0 === l.length) g.push(q.getCoordinates(o));
            else {
                s = q.shortestEdge();
                w = l[0];
                var e;
                var j;
                0 === o.length ? e = !0 : (j = o.slice(), j.push(w), e = y(o, s), s = y(j, s), e = e >= s);
                e ? (o.push(w), z(l.slice(1), o, q, g)) : (w = q.cutArea(i(o), g), g.push(q.getCoordinates(o)), z(l, [], w, g));
                return g
            }
        }

        function y(l,
            o) {
            var q = Math.min.apply(Math, l),
                g = Math.max.apply(Math, l),
                s = i(l);
            return Math.max(Math.pow(o, 2) * g / Math.pow(s, 2), Math.pow(s, 2) / (Math.pow(o, 2) * q))
        }

        function i(i) {
            var l = 0,
                q;
            for (q = 0; q < i.length; q++) l += i[q];
            return l
        }

        function l(n) {
            var o, q = 0;
            if (n[0] && n[0].constructor === Array)
                for (o = 0; o < n.length; o++) q += l(n[o]);
            else q = i(n);
            return q
        }
        return A
    }()
})();
(function(w, A, x) {
    function z(i, n) {
        if (!A[i]) {
            if (!w[i]) {
                var o = "function" == typeof require && require;
                if (!n && o) return o(i, !0);
                if (y) return y(i, !0);
                throw Error("Cannot find module '" + i + "'");
            }
            o = A[i] = {
                exports: {}
            };
            w[i][0].call(o.exports, function(n) {
                var g = w[i][1][n];
                return z(g ? g : n)
            }, o, o.exports)
        }
        return A[i].exports
    }
    for (var y = "function" == typeof require && require, i = 0; i < x.length; i++) z(x[i]);
    return z
})({
    1: [function(w) {
        Color = w("./color")
    }, {
        "./color": 2
    }],
    2: [function(w, A) {
        var x = w("color-convert"),
            z = w("color-string");
        A.exports = function(i) {
            return new y(i)
        };
        var y = function(i) {
            this.values = {
                rgb: [0, 0, 0],
                hsl: [0, 0, 0],
                hsv: [0, 0, 0],
                cmyk: [0, 0, 0, 0],
                alpha: 1
            };
            if ("string" == typeof i) {
                var l = z.getRgba(i);
                l ? this.setValues("rgb", l) : (l = z.getHsla(i)) && this.setValues("hsl", l)
            } else "object" == typeof i && (l = i, void 0 !== l.r || void 0 !== l.red ? this.setValues("rgb", l) : void 0 !== l.l || void 0 !== l.lightness ? this.setValues("hsl", l) : void 0 !== l.v || void 0 !== l.value ? this.setValues("hsv", l) : (void 0 !== l.c || void 0 !== l.cyan) && this.setValues("cmyk", l))
        };
        y.prototype = {
            rgb: function(i) {
                return this.setSpace("rgb", arguments)
            },
            hsl: function(i) {
                return this.setSpace("hsl", arguments)
            },
            hsv: function(i) {
                return this.setSpace("hsv", arguments)
            },
            cmyk: function(i) {
                return this.setSpace("cmyk", arguments)
            },
            rgbArray: function() {
                return this.values.rgb
            },
            hslArray: function() {
                return this.values.hsl
            },
            hsvArray: function() {
                return this.values.hsv
            },
            cmykArray: function() {
                return this.values.cmyk
            },
            rgbaArray: function() {
                return this.values.rgb.concat([this.values.alpha])
            },
            hslaArray: function() {
                return this.values.hsl.concat([this.values.alpha])
            },
            alpha: function(i) {
                if (void 0 === i) return this.values.alpha;
                this.setValues("alpha", i);
                return this
            },
            red: function(i) {
                return this.setChannel("rgb", 0, i)
            },
            green: function(i) {
                return this.setChannel("rgb", 1, i)
            },
            blue: function(i) {
                return this.setChannel("rgb", 2, i)
            },
            hue: function(i) {
                return this.setChannel("hsl", 0, i)
            },
            saturation: function(i) {
                return this.setChannel("hsl", 1, i)
            },
            lightness: function(i) {
                return this.setChannel("hsl", 2, i)
            },
            saturationv: function(i) {
                return this.setChannel("hsv", 1, i)
            },
            value: function(i) {
                return this.setChannel("hsv",
                    2, i)
            },
            cyan: function(i) {
                return this.setChannel("cmyk", 0, i)
            },
            magenta: function(i) {
                return this.setChannel("cmyk", 1, i)
            },
            yellow: function(i) {
                return this.setChannel("cmyk", 2, i)
            },
            black: function(i) {
                return this.setChannel("cmyk", 3, i)
            },
            hexString: function() {
                return z.hexString(this.values.rgb)
            },
            rgbString: function() {
                return z.rgbString(this.values.rgb, this.values.alpha)
            },
            rgbaString: function() {
                return z.rgbaString(this.values.rgb, this.values.alpha)
            },
            percentString: function() {
                return z.percentString(this.values.rgb, this.values.alpha)
            },
            hslString: function() {
                return z.hslString(this.values.hsl, this.values.alpha)
            },
            hslaString: function() {
                return z.hslaString(this.values.hsl, this.values.alpha)
            },
            keyword: function() {
                return z.keyword(this.values.rgb, this.values.alpha)
            },
            luminosity: function() {
                for (var i = this.values.rgb, l = [], n = 0; n < i.length; n++) {
                    var o = i[n] / 255;
                    l[n] = 0.03928 >= o ? o / 12.92 : Math.pow((o + 0.055) / 1.055, 2.4)
                }
                return 0.2126 * l[0] + 0.7152 * l[1] + 0.0722 * l[2]
            },
            contrast: function(i) {
                var l = this.luminosity(),
                    i = i.luminosity();
                return l > i ? (l + 0.05) / (i + 0.05) :
                    (i + 0.05) / (l + 0.05)
            },
            dark: function() {
                var i = this.values.rgb;
                return 128 > (299 * i[0] + 587 * i[1] + 114 * i[2]) / 1E3
            },
            light: function() {
                return !this.dark()
            },
            negate: function() {
                for (var i = [], l = 0; 3 > l; l++) i[l] = 255 - this.values.rgb[l];
                this.setValues("rgb", i);
                return this
            },
            lighten: function(i) {
                this.values.hsl[2] += this.values.hsl[2] * i;
                this.setValues("hsl", this.values.hsl);
                return this
            },
            darken: function(i) {
                this.values.hsl[2] -= this.values.hsl[2] * i;
                this.setValues("hsl", this.values.hsl);
                return this
            },
            saturate: function(i) {
                this.values.hsl[1] +=
                    this.values.hsl[1] * i;
                this.setValues("hsl", this.values.hsl);
                return this
            },
            desaturate: function(i) {
                this.values.hsl[1] -= this.values.hsl[1] * i;
                this.setValues("hsl", this.values.hsl);
                return this
            },
            greyscale: function() {
                var i = this.values.rgb,
                    i = 0.3 * i[0] + 0.59 * i[1] + 0.11 * i[2];
                this.setValues("rgb", [i, i, i]);
                return this
            },
            clearer: function(i) {
                this.setValues("alpha", this.values.alpha - this.values.alpha * i);
                return this
            },
            opaquer: function(i) {
                this.setValues("alpha", this.values.alpha + this.values.alpha * i);
                return this
            },
            rotate: function(i) {
                var l =
                    this.values.hsl[0],
                    l = (l + i) % 360;
                this.values.hsl[0] = 0 > l ? 360 + l : l;
                this.setValues("hsl", this.values.hsl);
                return this
            },
            mix: function(i, l) {
                for (var l = 1 - (null == l ? 0.5 : l), n = 2 * l - 1, o = this.alpha() - i.alpha(), n = ((-1 == n * o ? n : (n + o) / (1 + n * o)) + 1) / 2, o = 1 - n, q = this.rgbArray(), g = i.rgbArray(), s = 0; s < q.length; s++) q[s] = q[s] * n + g[s] * o;
                this.setValues("rgb", q);
                this.setValues("alpha", this.alpha() * l + i.alpha() * (1 - l));
                return this
            },
            toJSON: function() {
                return this.rgb()
            },
            clone: function() {
                return new y(this.rgb())
            }
        };
        y.prototype.getValues = function(i) {
            for (var l = {}, n = 0; n < i.length; n++) l[i[n]] = this.values[i][n];
            1 != this.values.alpha && (l.a = this.values.alpha);
            return l
        };
        y.prototype.setValues = function(i, l) {
            var n = {
                    rgb: ["red", "green", "blue"],
                    hsl: ["hue", "saturation", "lightness"],
                    hsv: ["hue", "saturation", "value"],
                    cmyk: ["cyan", "magenta", "yellow", "black"]
                },
                o = {
                    rgb: [255, 255, 255],
                    hsl: [360, 100, 100],
                    hsv: [360, 100, 100],
                    cmyk: [100, 100, 100, 100]
                },
                q = 1;
            if ("alpha" == i) q = l;
            else if (l.length) this.values[i] = l.slice(0, i.length), q = l[i.length];
            else if (void 0 !== l[i[0]]) {
                for (q = 0; q < i.length; q++) this.values[i][q] =
                    l[i[q]];
                q = l.a
            } else if (void 0 !== l[n[i][0]]) {
                for (var g = n[i], q = 0; q < i.length; q++) this.values[i][q] = l[g[q]];
                q = l.alpha
            }
            this.values.alpha = Math.max(0, Math.min(1, void 0 !== q ? q : this.values.alpha));
            if ("alpha" != i) {
                for (var s in n) {
                    s != i && (this.values[s] = x[i][s](this.values[i]));
                    for (q = 0; q < s.length; q++) g = Math.max(0, Math.min(o[s][q], this.values[s][q])), this.values[s][q] = Math.round(g)
                }
                return !0
            }
        };
        y.prototype.setSpace = function(i, l) {
            var n = l[0];
            if (void 0 === n) return this.getValues(i);
            "number" == typeof n && (n = Array.prototype.slice.call(l));
            this.setValues(i, n);
            return this
        };
        y.prototype.setChannel = function(i, l, n) {
            if (void 0 === n) return this.values[i][l];
            this.values[i][l] = n;
            this.setValues(i, this.values[i]);
            return this
        }
    }, {
        "color-convert": 3,
        "color-string": 4
    }],
    3: [function(w, A, x) {
        var z = w("./conversions"),
            x = {};
        A.exports = x;
        for (var y in z) x[y + "Raw"] = function(i) {
            return function(l) {
                "number" == typeof l && (l = Array.prototype.slice.call(arguments));
                return z[i](l)
            }
        }(y), A = /(\w+)2(\w+)/.exec(y), w = A[1], A = A[2], x[w] = x[w] || {}, x[w][A] = x[y] = function(i) {
            return function(l) {
                "number" ==
                typeof l && (l = Array.prototype.slice.call(arguments));
                var n = z[i](l);
                if ("string" == typeof n || void 0 === n) return n;
                for (var o = 0; o < n.length; o++) n[o] = Math.round(n[o]);
                return n
            }
        }(y)
    }, {
        "./conversions": 5
    }],
    5: [function(w, A) {
        function x(e) {
            var j = e[0] / 255,
                m = e[1] / 255,
                g = e[2] / 255,
                e = Math.min(j, m, g),
                i = Math.max(j, m, g),
                l = i - e,
                n;
            i == e ? n = 0 : j == i ? n = (m - g) / l : m == i ? n = 2 + (g - j) / l : g == i && (n = 4 + (j - m) / l);
            n = Math.min(60 * n, 360);
            0 > n && (n += 360);
            j = (e + i) / 2;
            return [n, 100 * (i == e ? 0 : 0.5 >= j ? l / (i + e) : l / (2 - i - e)), 100 * j]
        }

        function z(e) {
            var j = e[0],
                m = e[1],
                e = e[2],
                g = Math.min(j, m, e),
                i = Math.max(j, m, e),
                l = i - g,
                n, s;
            s = 0 == i ? 0 : 1E3 * (l / i) / 10;
            i == g ? n = 0 : j == i ? n = (m - e) / l : m == i ? n = 2 + (e - j) / l : e == i && (n = 4 + (j - m) / l);
            n = Math.min(60 * n, 360);
            0 > n && (n += 360);
            return [n, s, 1E3 * (i / 255) / 10]
        }

        function y(e) {
            var j = e[0] / 255,
                m = e[1] / 255,
                e = e[2] / 255,
                g;
            g = Math.min(1 - j, 1 - m, 1 - e);
            return [100 * ((1 - j - g) / (1 - g)), 100 * ((1 - m - g) / (1 - g)), 100 * ((1 - e - g) / (1 - g)), 100 * g]
        }

        function i(e) {
            return s[JSON.stringify(e)]
        }

        function l(e) {
            var j = e[0] / 255,
                m = e[1] / 255,
                e = e[2] / 255,
                j = 0.04045 < j ? Math.pow((j + 0.055) / 1.055, 2.4) : j / 12.92,
                m = 0.04045 < m ? Math.pow((m +
                    0.055) / 1.055, 2.4) : m / 12.92,
                e = 0.04045 < e ? Math.pow((e + 0.055) / 1.055, 2.4) : e / 12.92;
            return [100 * (0.4124 * j + 0.3576 * m + 0.1805 * e), 100 * (0.2126 * j + 0.7152 * m + 0.0722 * e), 100 * (0.0193 * j + 0.1192 * m + 0.9505 * e)]
        }

        function n(e) {
            var j = e[0] / 360,
                m = e[1] / 100,
                e = e[2] / 100,
                g, i;
            if (0 == m) return g = 255 * e, [g, g, g];
            m = 0.5 > e ? e * (1 + m) : e + m - e * m;
            e = 2 * e - m;
            i = [0, 0, 0];
            for (var l = 0; 3 > l; l++) g = j + 1 / 3 * -(l - 1), 0 > g && g++, 1 < g && g--, g = 1 > 6 * g ? e + 6 * (m - e) * g : 1 > 2 * g ? m : 2 > 3 * g ? e + 6 * (m - e) * (2 / 3 - g) : e, i[l] = 255 * g;
            return i
        }

        function o(e) {
            var j = e[0] / 60,
                g = e[1] / 100,
                e = e[2] / 100,
                i = Math.floor(j) %
                6,
                l = j - Math.floor(j),
                j = 255 * e * (1 - g),
                n = 255 * e * (1 - g * l),
                g = 255 * e * (1 - g * (1 - l)),
                e = 255 * e;
            switch (i) {
                case 0:
                    return [e, g, j];
                case 1:
                    return [n, e, j];
                case 2:
                    return [j, e, g];
                case 3:
                    return [j, n, e];
                case 4:
                    return [g, j, e];
                case 5:
                    return [e, j, n]
            }
        }

        function q(e) {
            var j = e[1] / 100,
                g = e[2] / 100,
                i = e[3] / 100,
                e = 1 - Math.min(1, e[0] / 100 * (1 - i) + i),
                j = 1 - Math.min(1, j * (1 - i) + i),
                g = 1 - Math.min(1, g * (1 - i) + i);
            return [255 * e, 255 * j, 255 * g]
        }
        A.exports = {
            rgb2hsl: x,
            rgb2hsv: z,
            rgb2cmyk: y,
            rgb2keyword: i,
            rgb2xyz: l,
            rgb2lab: function(e) {
                var j = l(e),
                    e = j[0],
                    g = j[1],
                    j = j[2],
                    e = e / 95.047,
                    g = g / 100,
                    j = j / 108.883,
                    e = 0.008856 < e ? Math.pow(e, 1 / 3) : 7.787 * e + 16 / 116,
                    g = 0.008856 < g ? Math.pow(g, 1 / 3) : 7.787 * g + 16 / 116,
                    j = 0.008856 < j ? Math.pow(j, 1 / 3) : 7.787 * j + 16 / 116;
                return [116 * g - 16, 500 * (e - g), 200 * (g - j)]
            },
            hsl2rgb: n,
            hsl2hsv: function(e) {
                var j = e[0],
                    g = e[1] / 100,
                    e = e[2] / 100,
                    e = 2 * e,
                    g = g * (1 >= e ? e : 2 - e);
                return [j, 100 * g, 100 * ((e + g) / 2)]
            },
            hsl2cmyk: function(e) {
                return y(n(e))
            },
            hsl2keyword: function(e) {
                return i(n(e))
            },
            hsv2rgb: o,
            hsv2hsl: function(e) {
                var j = e[0],
                    g = e[1] / 100,
                    i = e[2] / 100,
                    e = (2 - g) * i,
                    g = g * i / (1 >= e ? e : 2 - e);
                return [j, 100 * g, 100 * (e / 2)]
            },
            hsv2cmyk: function(e) {
                return y(o(e))
            },
            hsv2keyword: function(e) {
                return i(o(e))
            },
            cmyk2rgb: q,
            cmyk2hsl: function(e) {
                return x(q(e))
            },
            cmyk2hsv: function(e) {
                return z(q(e))
            },
            cmyk2keyword: function(e) {
                return i(q(e))
            },
            keyword2rgb: function(e) {
                return g[e]
            },
            keyword2hsl: function(e) {
                return x(g[e])
            },
            keyword2hsv: function(e) {
                return z(g[e])
            },
            keyword2cmyk: function(e) {
                return y(g[e])
            },
            xyz2rgb: function(e) {
                var j = e[0] / 100,
                    g = e[1] / 100,
                    i = e[2] / 100,
                    l, e = 3.2406 * j + -1.5372 * g + -0.4986 * i;
                l = -0.9689 * j + 1.8758 * g + 0.0415 * i;
                j = 0.0557 * j + -0.204 * g +
                    1.057 * i;
                e = 0.0031308 < e ? 1.055 * Math.pow(e, 1 / 2.4) - 0.055 : e *= 12.92;
                l = 0.0031308 < l ? 1.055 * Math.pow(l, 1 / 2.4) - 0.055 : l *= 12.92;
                j = 0.0031308 < j ? 1.055 * Math.pow(j, 1 / 2.4) - 0.055 : j *= 12.92;
                return [255 * (0 > e ? 0 : e), 255 * (0 > l ? 0 : l), 255 * (0 > j ? 0 : j)]
            }
        };
        var g = {
                aliceblue: [240, 248, 255],
                antiquewhite: [250, 235, 215],
                aqua: [0, 255, 255],
                aquamarine: [127, 255, 212],
                azure: [240, 255, 255],
                beige: [245, 245, 220],
                bisque: [255, 228, 196],
                black: [0, 0, 0],
                blanchedalmond: [255, 235, 205],
                blue: [0, 0, 255],
                blueviolet: [138, 43, 226],
                brown: [165, 42, 42],
                burlywood: [222, 184, 135],
                cadetblue: [95, 158, 160],
                chartreuse: [127, 255, 0],
                chocolate: [210, 105, 30],
                coral: [255, 127, 80],
                cornflowerblue: [100, 149, 237],
                cornsilk: [255, 248, 220],
                crimson: [220, 20, 60],
                cyan: [0, 255, 255],
                darkblue: [0, 0, 139],
                darkcyan: [0, 139, 139],
                darkgoldenrod: [184, 134, 11],
                darkgray: [169, 169, 169],
                darkgreen: [0, 100, 0],
                darkgrey: [169, 169, 169],
                darkkhaki: [189, 183, 107],
                darkmagenta: [139, 0, 139],
                darkolivegreen: [85, 107, 47],
                darkorange: [255, 140, 0],
                darkorchid: [153, 50, 204],
                darkred: [139, 0, 0],
                darksalmon: [233, 150, 122],
                darkseagreen: [143, 188, 143],
                darkslateblue: [72, 61, 139],
                darkslategray: [47, 79, 79],
                darkslategrey: [47, 79, 79],
                darkturquoise: [0, 206, 209],
                darkviolet: [148, 0, 211],
                deeppink: [255, 20, 147],
                deepskyblue: [0, 191, 255],
                dimgray: [105, 105, 105],
                dimgrey: [105, 105, 105],
                dodgerblue: [30, 144, 255],
                firebrick: [178, 34, 34],
                floralwhite: [255, 250, 240],
                forestgreen: [34, 139, 34],
                fuchsia: [255, 0, 255],
                gainsboro: [220, 220, 220],
                ghostwhite: [248, 248, 255],
                gold: [255, 215, 0],
                goldenrod: [218, 165, 32],
                gray: [128, 128, 128],
                green: [0, 128, 0],
                greenyellow: [173, 255, 47],
                grey: [128, 128, 128],
                honeydew: [240,
                    255, 240
                ],
                hotpink: [255, 105, 180],
                indianred: [205, 92, 92],
                indigo: [75, 0, 130],
                ivory: [255, 255, 240],
                khaki: [240, 230, 140],
                lavender: [230, 230, 250],
                lavenderblush: [255, 240, 245],
                lawngreen: [124, 252, 0],
                lemonchiffon: [255, 250, 205],
                lightblue: [173, 216, 230],
                lightcoral: [240, 128, 128],
                lightcyan: [224, 255, 255],
                lightgoldenrodyellow: [250, 250, 210],
                lightgray: [211, 211, 211],
                lightgreen: [144, 238, 144],
                lightgrey: [211, 211, 211],
                lightpink: [255, 182, 193],
                lightsalmon: [255, 160, 122],
                lightseagreen: [32, 178, 170],
                lightskyblue: [135, 206, 250],
                lightslategray: [119,
                    136, 153
                ],
                lightslategrey: [119, 136, 153],
                lightsteelblue: [176, 196, 222],
                lightyellow: [255, 255, 224],
                lime: [0, 255, 0],
                limegreen: [50, 205, 50],
                linen: [250, 240, 230],
                magenta: [255, 0, 255],
                maroon: [128, 0, 0],
                mediumaquamarine: [102, 205, 170],
                mediumblue: [0, 0, 205],
                mediumorchid: [186, 85, 211],
                mediumpurple: [147, 112, 219],
                mediumseagreen: [60, 179, 113],
                mediumslateblue: [123, 104, 238],
                mediumspringgreen: [0, 250, 154],
                mediumturquoise: [72, 209, 204],
                mediumvioletred: [199, 21, 133],
                midnightblue: [25, 25, 112],
                mintcream: [245, 255, 250],
                mistyrose: [255,
                    228, 225
                ],
                moccasin: [255, 228, 181],
                navajowhite: [255, 222, 173],
                navy: [0, 0, 128],
                oldlace: [253, 245, 230],
                olive: [128, 128, 0],
                olivedrab: [107, 142, 35],
                orange: [255, 165, 0],
                orangered: [255, 69, 0],
                orchid: [218, 112, 214],
                palegoldenrod: [238, 232, 170],
                palegreen: [152, 251, 152],
                paleturquoise: [175, 238, 238],
                palevioletred: [219, 112, 147],
                papayawhip: [255, 239, 213],
                peachpuff: [255, 218, 185],
                peru: [205, 133, 63],
                pink: [255, 192, 203],
                plum: [221, 160, 221],
                powderblue: [176, 224, 230],
                purple: [128, 0, 128],
                red: [255, 0, 0],
                rosybrown: [188, 143, 143],
                royalblue: [65,
                    105, 225
                ],
                saddlebrown: [139, 69, 19],
                salmon: [250, 128, 114],
                sandybrown: [244, 164, 96],
                seagreen: [46, 139, 87],
                seashell: [255, 245, 238],
                sienna: [160, 82, 45],
                silver: [192, 192, 192],
                skyblue: [135, 206, 235],
                slateblue: [106, 90, 205],
                slategray: [112, 128, 144],
                slategrey: [112, 128, 144],
                snow: [255, 250, 250],
                springgreen: [0, 255, 127],
                steelblue: [70, 130, 180],
                tan: [210, 180, 140],
                teal: [0, 128, 128],
                thistle: [216, 191, 216],
                tomato: [255, 99, 71],
                turquoise: [64, 224, 208],
                violet: [238, 130, 238],
                wheat: [245, 222, 179],
                white: [255, 255, 255],
                whitesmoke: [245, 245,
                    245
                ],
                yellow: [255, 255, 0],
                yellowgreen: [154, 205, 50]
            },
            s = {},
            C;
        for (C in g) s[JSON.stringify(g[C])] = C
    }, {}],
    4: [function(w, A) {
        function x(g) {
            if (g) {
                var i = /^#([a-fA-F0-9]{6})$/,
                    l = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d\.]+)\s*)?\)$/,
                    e = /^rgba?\(\s*([\d\.]+)\%\s*,\s*([\d\.]+)\%\s*,\s*([\d\.]+)\%\s*(?:,\s*([\d\.]+)\s*)?\)$/,
                    j = /(\D+)/,
                    m = [0, 0, 0],
                    p = 1,
                    v = g.match(/^#([a-fA-F0-9]{3})$/);
                if (v) {
                    v = v[1];
                    for (g = 0; g < m.length; g++) m[g] = parseInt(v[g] + v[g], 16)
                } else if (v = g.match(i)) {
                    v = v[1];
                    for (g = 0; g < m.length; g++) m[g] =
                        parseInt(v.slice(2 * g, 2 * g + 2), 16)
                } else if (v = g.match(l)) {
                    for (g = 0; g < m.length; g++) m[g] = parseInt(v[g + 1]);
                    p = parseFloat(v[4])
                } else if (v = g.match(e)) {
                    for (g = 0; g < m.length; g++) m[g] = Math.round(2.55 * parseFloat(v[g + 1]));
                    p = parseFloat(v[4])
                } else if (v = g.match(j)) {
                    if ("transparent" == v[1]) return [0, 0, 0, 0];
                    m = q.keyword2rgb(v[1]);
                    if (!m) return
                }
                for (g = 0; g < m.length; g++) m[g] = n(m[g], 0, 255);
                p = !p && 0 != p ? 1 : n(p, 0, 1);
                m.push(p);
                return m
            }
        }

        function z(g) {
            if (g) {
                var i = g.match(/^hsla?\(\s*(\d+)\s*,\s*([\d\.]+)%\s*,\s*([\d\.]+)%\s*(?:,\s*([\d\.]+)\s*)?\)/);
                if (i) {
                    var g = n(parseInt(i[1]), 0, 360),
                        l = n(parseFloat(i[2]), 0, 100),
                        e = n(parseFloat(i[3]), 0, 100),
                        i = n(parseFloat(i[4]) || 1, 0, 1);
                    return [g, l, e, i]
                }
            }
        }

        function y(g, i) {
            void 0 === i && (i = void 0 !== g[3] ? g[3] : 1);
            return "rgba(" + g[0] + ", " + g[1] + ", " + g[2] + ", " + i + ")"
        }

        function i(g, i) {
            var l = Math.round(100 * (g[0] / 255)),
                e = Math.round(100 * (g[1] / 255)),
                j = Math.round(100 * (g[2] / 255));
            return "rgba(" + l + "%, " + e + "%, " + j + "%, " + (i || g[3] || 1) + ")"
        }

        function l(g, i) {
            void 0 === i && (i = void 0 !== g[3] ? g[3] : 1);
            return "hsla(" + g[0] + ", " + g[1] + "%, " + g[2] + "%, " +
                i + ")"
        }

        function n(g, i, l) {
            return Math.min(Math.max(i, g), l)
        }

        function o(g) {
            g = g.toString(16).toUpperCase();
            return 2 > g.length ? "0" + g : g
        }
        var q = w("color-convert");
        A.exports = {
            getRgba: x,
            getHsla: z,
            getRgb: function(g) {
                return x(g).slice(0, 3)
            },
            getHsl: function(g) {
                return z(g).slice(0, 3)
            },
            getAlpha: function(g) {
                var i = x(g);
                if (i || (i = z(g))) return i[3]
            },
            hexString: function(g) {
                return "#" + o(g[0]) + o(g[1]) + o(g[2])
            },
            rgbString: function(g, i) {
                return 1 > i || g[3] && 1 > g[3] ? y(g, i) : "rgb(" + g[0] + ", " + g[1] + ", " + g[2] + ")"
            },
            rgbaString: y,
            percentString: function(g,
                l) {
                if (1 > l || g[3] && 1 > g[3]) return i(g, l);
                var n = Math.round(100 * (g[0] / 255)),
                    e = Math.round(100 * (g[1] / 255)),
                    j = Math.round(100 * (g[2] / 255));
                return "rgb(" + n + "%, " + e + "%, " + j + "%)"
            },
            percentaString: i,
            hslString: function(g, i) {
                return 1 > i || g[3] && 1 > g[3] ? l(g, i) : "hsl(" + g[0] + ", " + g[1] + "%, " + g[2] + "%)"
            },
            hslaString: l,
            keyword: function(g) {
                return q.rgb2keyword(g.slice(0, 3))
            }
        }
    }, {
        "color-convert": 6
    }],
    6: [function(w, A, x) {
        var z = w("./conversions"),
            x = {};
        A.exports = x;
        for (var y in z) x[y + "Raw"] = function(i) {
            return function(l) {
                "number" == typeof l &&
                    (l = Array.prototype.slice.call(arguments));
                return z[i](l)
            }
        }(y), A = /(\w+)2(\w+)/.exec(y), w = A[1], A = A[2], x[w] = x[w] || {}, x[w][A] = x[y] = function(i) {
            return function(l) {
                "number" == typeof l && (l = Array.prototype.slice.call(arguments));
                var n = z[i](l);
                if ("string" == typeof n || void 0 === n) return n;
                for (var o = 0; o < n.length; o++) n[o] = Math.round(n[o]);
                return n
            }
        }(y)
    }, {
        "./conversions": 7
    }],
    7: [function(w, A) {
        function x(e) {
            var j = e[0] / 255,
                g = e[1] / 255,
                i = e[2] / 255,
                e = Math.min(j, g, i),
                l = Math.max(j, g, i),
                n = l - e,
                o;
            l == e ? o = 0 : j == l ? o = (g - i) / n : g ==
                l ? o = 2 + (i - j) / n : i == l && (o = 4 + (j - g) / n);
            o = Math.min(60 * o, 360);
            0 > o && (o += 360);
            j = (e + l) / 2;
            return [o, 100 * (l == e ? 0 : 0.5 >= j ? n / (l + e) : n / (2 - l - e)), 100 * j]
        }

        function z(e) {
            var j = e[0],
                g = e[1],
                e = e[2],
                i = Math.min(j, g, e),
                l = Math.max(j, g, e),
                n = l - i,
                o, q;
            q = 0 == l ? 0 : 1E3 * (n / l) / 10;
            l == i ? o = 0 : j == l ? o = (g - e) / n : g == l ? o = 2 + (e - j) / n : e == l && (o = 4 + (j - g) / n);
            o = Math.min(60 * o, 360);
            0 > o && (o += 360);
            return [o, q, 1E3 * (l / 255) / 10]
        }

        function y(e) {
            var j = e[0] / 255,
                g = e[1] / 255,
                e = e[2] / 255,
                i;
            i = Math.min(1 - j, 1 - g, 1 - e);
            return [100 * ((1 - j - i) / (1 - i)), 100 * ((1 - g - i) / (1 - i)), 100 * ((1 - e - i) / (1 -
                i)), 100 * i]
        }

        function i(e) {
            return s[JSON.stringify(e)]
        }

        function l(e) {
            var j = e[0] / 255,
                g = e[1] / 255,
                e = e[2] / 255,
                j = 0.04045 < j ? Math.pow((j + 0.055) / 1.055, 2.4) : j / 12.92,
                g = 0.04045 < g ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92,
                e = 0.04045 < e ? Math.pow((e + 0.055) / 1.055, 2.4) : e / 12.92;
            return [100 * (0.4124 * j + 0.3576 * g + 0.1805 * e), 100 * (0.2126 * j + 0.7152 * g + 0.0722 * e), 100 * (0.0193 * j + 0.1192 * g + 0.9505 * e)]
        }

        function n(e) {
            var g = e[0] / 360,
                i = e[1] / 100,
                e = e[2] / 100,
                l, n;
            if (0 == i) return l = 255 * e, [l, l, l];
            i = 0.5 > e ? e * (1 + i) : e + i - e * i;
            e = 2 * e - i;
            n = [0, 0, 0];
            for (var o = 0; 3 >
                o; o++) l = g + 1 / 3 * -(o - 1), 0 > l && l++, 1 < l && l--, l = 1 > 6 * l ? e + 6 * (i - e) * l : 1 > 2 * l ? i : 2 > 3 * l ? e + 6 * (i - e) * (2 / 3 - l) : e, n[o] = 255 * l;
            return n
        }

        function o(e) {
            var g = e[0] / 60,
                i = e[1] / 100,
                e = e[2] / 100,
                l = Math.floor(g) % 6,
                n = g - Math.floor(g),
                g = 255 * e * (1 - i),
                o = 255 * e * (1 - i * n),
                i = 255 * e * (1 - i * (1 - n)),
                e = 255 * e;
            switch (l) {
                case 0:
                    return [e, i, g];
                case 1:
                    return [o, e, g];
                case 2:
                    return [g, e, i];
                case 3:
                    return [g, o, e];
                case 4:
                    return [i, g, e];
                case 5:
                    return [e, g, o]
            }
        }

        function q(e) {
            var g = e[1] / 100,
                i = e[2] / 100,
                l = e[3] / 100,
                e = 1 - Math.min(1, e[0] / 100 * (1 - l) + l),
                g = 1 - Math.min(1, g * (1 - l) +
                    l),
                i = 1 - Math.min(1, i * (1 - l) + l);
            return [255 * e, 255 * g, 255 * i]
        }
        A.exports = {
            rgb2hsl: x,
            rgb2hsv: z,
            rgb2cmyk: y,
            rgb2keyword: i,
            rgb2xyz: l,
            rgb2lab: function(e) {
                var g = l(e),
                    e = g[0],
                    i = g[1],
                    g = g[2],
                    e = e / 95.047,
                    i = i / 100,
                    g = g / 108.883,
                    e = 0.008856 < e ? Math.pow(e, 1 / 3) : 7.787 * e + 16 / 116,
                    i = 0.008856 < i ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116,
                    g = 0.008856 < g ? Math.pow(g, 1 / 3) : 7.787 * g + 16 / 116;
                return [116 * i - 16, 500 * (e - i), 200 * (i - g)]
            },
            hsl2rgb: n,
            hsl2hsv: function(e) {
                var g = e[0],
                    i = e[1] / 100,
                    e = e[2] / 100,
                    e = 2 * e,
                    i = i * (1 >= e ? e : 2 - e);
                return [g, 100 * i, 100 * ((e + i) / 2)]
            },
            hsl2cmyk: function(e) {
                return y(n(e))
            },
            hsl2keyword: function(e) {
                return i(n(e))
            },
            hsv2rgb: o,
            hsv2hsl: function(e) {
                var g = e[0],
                    i = e[1] / 100,
                    l = e[2] / 100,
                    e = (2 - i) * l,
                    i = i * l / (1 >= e ? e : 2 - e);
                return [g, 100 * i, 100 * (e / 2)]
            },
            hsv2cmyk: function(e) {
                return y(o(e))
            },
            hsv2keyword: function(e) {
                return i(o(e))
            },
            cmyk2rgb: q,
            cmyk2hsl: function(e) {
                return x(q(e))
            },
            cmyk2hsv: function(e) {
                return z(q(e))
            },
            cmyk2keyword: function(e) {
                return i(q(e))
            },
            keyword2rgb: function(e) {
                return g[e]
            },
            keyword2hsl: function(e) {
                return x(g[e])
            },
            keyword2hsv: function(e) {
                return z(g[e])
            },
            keyword2cmyk: function(e) {
                return y(g[e])
            },
            xyz2rgb: function(e) {
                var g = e[0] / 100,
                    i = e[1] / 100,
                    l = e[2] / 100,
                    n, e = 3.2406 * g + -1.5372 * i + -0.4986 * l;
                n = -0.9689 * g + 1.8758 * i + 0.0415 * l;
                g = 0.0557 * g + -0.204 * i + 1.057 * l;
                e = 0.0031308 < e ? 1.055 * Math.pow(e, 1 / 2.4) - 0.055 : e *= 12.92;
                n = 0.0031308 < n ? 1.055 * Math.pow(n, 1 / 2.4) - 0.055 : n *= 12.92;
                g = 0.0031308 < g ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : g *= 12.92;
                return [255 * (0 > e ? 0 : e), 255 * (0 > n ? 0 : n), 255 * (0 > g ? 0 : g)]
            }
        };
        var g = {
                aliceblue: [240, 248, 255],
                antiquewhite: [250, 235, 215],
                aqua: [0, 255, 255],
                aquamarine: [127, 255, 212],
                azure: [240, 255, 255],
                beige: [245, 245, 220],
                bisque: [255,
                    228, 196
                ],
                black: [0, 0, 0],
                blanchedalmond: [255, 235, 205],
                blue: [0, 0, 255],
                blueviolet: [138, 43, 226],
                brown: [165, 42, 42],
                burlywood: [222, 184, 135],
                cadetblue: [95, 158, 160],
                chartreuse: [127, 255, 0],
                chocolate: [210, 105, 30],
                coral: [255, 127, 80],
                cornflowerblue: [100, 149, 237],
                cornsilk: [255, 248, 220],
                crimson: [220, 20, 60],
                cyan: [0, 255, 255],
                darkblue: [0, 0, 139],
                darkcyan: [0, 139, 139],
                darkgoldenrod: [184, 134, 11],
                darkgray: [169, 169, 169],
                darkgreen: [0, 100, 0],
                darkgrey: [169, 169, 169],
                darkkhaki: [189, 183, 107],
                darkmagenta: [139, 0, 139],
                darkolivegreen: [85,
                    107, 47
                ],
                darkorange: [255, 140, 0],
                darkorchid: [153, 50, 204],
                darkred: [139, 0, 0],
                darksalmon: [233, 150, 122],
                darkseagreen: [143, 188, 143],
                darkslateblue: [72, 61, 139],
                darkslategray: [47, 79, 79],
                darkslategrey: [47, 79, 79],
                darkturquoise: [0, 206, 209],
                darkviolet: [148, 0, 211],
                deeppink: [255, 20, 147],
                deepskyblue: [0, 191, 255],
                dimgray: [105, 105, 105],
                dimgrey: [105, 105, 105],
                dodgerblue: [30, 144, 255],
                firebrick: [178, 34, 34],
                floralwhite: [255, 250, 240],
                forestgreen: [34, 139, 34],
                fuchsia: [255, 0, 255],
                gainsboro: [220, 220, 220],
                ghostwhite: [248, 248, 255],
                gold: [255, 215, 0],
                goldenrod: [218, 165, 32],
                gray: [128, 128, 128],
                green: [0, 128, 0],
                greenyellow: [173, 255, 47],
                grey: [128, 128, 128],
                honeydew: [240, 255, 240],
                hotpink: [255, 105, 180],
                indianred: [205, 92, 92],
                indigo: [75, 0, 130],
                ivory: [255, 255, 240],
                khaki: [240, 230, 140],
                lavender: [230, 230, 250],
                lavenderblush: [255, 240, 245],
                lawngreen: [124, 252, 0],
                lemonchiffon: [255, 250, 205],
                lightblue: [173, 216, 230],
                lightcoral: [240, 128, 128],
                lightcyan: [224, 255, 255],
                lightgoldenrodyellow: [250, 250, 210],
                lightgray: [211, 211, 211],
                lightgreen: [144, 238, 144],
                lightgrey: [211, 211, 211],
                lightpink: [255, 182, 193],
                lightsalmon: [255, 160, 122],
                lightseagreen: [32, 178, 170],
                lightskyblue: [135, 206, 250],
                lightslategray: [119, 136, 153],
                lightslategrey: [119, 136, 153],
                lightsteelblue: [176, 196, 222],
                lightyellow: [255, 255, 224],
                lime: [0, 255, 0],
                limegreen: [50, 205, 50],
                linen: [250, 240, 230],
                magenta: [255, 0, 255],
                maroon: [128, 0, 0],
                mediumaquamarine: [102, 205, 170],
                mediumblue: [0, 0, 205],
                mediumorchid: [186, 85, 211],
                mediumpurple: [147, 112, 219],
                mediumseagreen: [60, 179, 113],
                mediumslateblue: [123, 104, 238],
                mediumspringgreen: [0,
                    250, 154
                ],
                mediumturquoise: [72, 209, 204],
                mediumvioletred: [199, 21, 133],
                midnightblue: [25, 25, 112],
                mintcream: [245, 255, 250],
                mistyrose: [255, 228, 225],
                moccasin: [255, 228, 181],
                navajowhite: [255, 222, 173],
                navy: [0, 0, 128],
                oldlace: [253, 245, 230],
                olive: [128, 128, 0],
                olivedrab: [107, 142, 35],
                orange: [255, 165, 0],
                orangered: [255, 69, 0],
                orchid: [218, 112, 214],
                palegoldenrod: [238, 232, 170],
                palegreen: [152, 251, 152],
                paleturquoise: [175, 238, 238],
                palevioletred: [219, 112, 147],
                papayawhip: [255, 239, 213],
                peachpuff: [255, 218, 185],
                peru: [205, 133, 63],
                pink: [255, 192, 203],
                plum: [221, 160, 221],
                powderblue: [176, 224, 230],
                purple: [128, 0, 128],
                red: [255, 0, 0],
                rosybrown: [188, 143, 143],
                royalblue: [65, 105, 225],
                saddlebrown: [139, 69, 19],
                salmon: [250, 128, 114],
                sandybrown: [244, 164, 96],
                seagreen: [46, 139, 87],
                seashell: [255, 245, 238],
                sienna: [160, 82, 45],
                silver: [192, 192, 192],
                skyblue: [135, 206, 235],
                slateblue: [106, 90, 205],
                slategray: [112, 128, 144],
                slategrey: [112, 128, 144],
                snow: [255, 250, 250],
                springgreen: [0, 255, 127],
                steelblue: [70, 130, 180],
                tan: [210, 180, 140],
                teal: [0, 128, 128],
                thistle: [216,
                    191, 216
                ],
                tomato: [255, 99, 71],
                turquoise: [64, 224, 208],
                violet: [238, 130, 238],
                wheat: [245, 222, 179],
                white: [255, 255, 255],
                whitesmoke: [245, 245, 245],
                yellow: [255, 255, 0],
                yellowgreen: [154, 205, 50]
            },
            s = {},
            C;
        for (C in g) s[JSON.stringify(g[C])] = C
    }, {}]
}, {}, [1]);