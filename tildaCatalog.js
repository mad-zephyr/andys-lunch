function t_store_init(t, e) {
    var r = $("#rec" + t),
        o = $.contains($("#allrecords")[0], $(".t-store__product-snippet")[0]);
    o || t_store_initRouting();
    var s = r.find(".js-store"),
        i = t_store_get_productPopup_html(t, e);
    s.append(i);
    var a = $(".t-records").attr("data-tilda-mode");
    if (e.isPublishedPage = "edit" !== a && "preview" !== a, e.isPublishedPage && t_store_checkUrl(e, t), "" === e.storepart) return r.find(".js-store-grid-cont-preloader").hide(), void(e.sidebar && r.find(".t951__grid-cont").removeClass("t951__grid-cont_hidden"));
    setTimeout(function() {
        r.find(".js-store-grid-cont-preloader").removeClass("t-store__grid-cont-preloader_hidden")
    }, 1500);
    var n = t_store_paramsToObj(t, e);
    if (n[t]) {
        var _ = t_store_updateOptionsBasedOnUrl(e, n, t);
        _ && (e = _, r.on("controlsDrawn", function() {
            t_store_filters_render_selected(e, t)
        }))
    }
    if (e.sidebar) {
        r.on("controlsDrawn", function() {
            t_store_filters_opts_sort(e, t)
        });
        var l = r.find(".js-store-parts-select-container"),
            d = l.find(".t951__sidebar");
        d.length || l.prepend('<div class="t951__sidebar-wrapper"></div>')
    }
    var c = 1;
    if (n[t] && n[t].page && (c = Array.isArray(n[t].page) ? n[t].page.join("") : n[t].page), t_store_loadProducts("", t, e, c), t_store_mobileHoriz_checkBtnVisibility(t, e), e.isHorizOnMob) {
        var p = t_store_get_handIcon_html(t);
        r.find(".js-store-grid-cont-preloader").before(p)
    }
    $(window).bind("resize", t_throttle(function() {
        t_store_unifyCardsHeights(t, e), t_store_moveSearhSort(t, e), t_store_loadMoreBtn_display(t), t_store_pagination_display(t)
    })), r.find(".t-store").bind("displayChanged", function() {
        setTimeout(function() {
            t_store_unifyCardsHeights(t, e)
        })
    });
    try {
        e.verticalAlignButtons && ($(window).bind("resize", t_throttle(function() {
            t_store_verticalAlignButtons(t, e)
        }, 500)), r.find(".t-store").bind("displayChanged", function() {
            t_store_verticalAlignButtons(t, e)
        }))
    } catch (t) {
        console.log("verticalAlignButtons error: " + t)
    }
}

function t_store_history_pushState(t, e, r) {
    void 0 !== history.pushState && window.history.pushState(t, e, r)
}

function t_store_productInit(t, e, r) {
    var o = $("#rec" + t + " .t-store__product-snippet.js-store-product");
    e.tabs && "" !== e.tabs ? t_store_tabs_initSnippet(t, e, o, r) : t_store_initTextAndCharacteristics(o, r)
}

function t_store_tabs_init(t, e, r, o, s) {
    var i = o.find(".t-store__tabs");
    i.empty(), $.when(t_store_loadProductTabs(t, e, r.uid)).done(function() {
        var i = window.tStoreTabsList ? window.tStoreTabsList[r.uid] : null;
        i && i.length ? (t_store_drawProdPopup_drawTabs(t, e, i), t_store_tabs_handleOnChange(t, o), t_store_initTextAndCharacteristics(s, r)) : t_store_initTextAndCharacteristics(s, r)
    })
}

function t_store_tabs_initSnippet(t, e, r, o) {
    var s = r.find(".t-store__tabs");
    if (s.length) {
        var i = e.tabs,
            a = "accordion" === i,
            n = t_store_getCustomColors(e);
        if (s.find(".t-store__tabs__item").each(function(r, o) {
                var s = $(this).find(".t-store__tabs__item-title"),
                    i = s.text().trim(),
                    a = $(this).find(".t-store__tabs__item-button"),
                    _ = $(this).find(".t-store__tabs__content");
                $(this).attr("data-tab-title", t_store_escapeQuote(i)), a.attr("data-tab-title", t_store_escapeQuote(i)), 0 === r && ($(this).addClass("t-store__tabs__item_active"), a.addClass("t-store__tabs__item-button_active"), $(this).find(".t-store__tabs__content").css("display", "block")), n.titleColor && s.css("color", n.titleColor), n.descrColor && _.css("color", n.descrColor);
                var l = t_store_tabs_closeIcon_getHtml(t, e);
                a.append(l)
            }), s.find(".t-store__tabs__button").each(function(t, e) {
                var r = $(this).find(".t-store__tabs__button-title"),
                    o = r.text().trim();
                $(this).attr("data-tab-title", t_store_escapeQuote(o)), 0 === t && $(this).addClass("t-store__tabs__button_active"), n.titleColor && r.css("color", n.titleColor)
            }), a) s.find(".t-store__tabs__list").prepend(t_store_tabs_accordionBorder_getStyle(t, e));
        else {
            var _ = s.find(".t-store__tabs__controls");
            _.prepend(t_store_tabs_fade_getStyle(e)), _.prepend(t_store_tabs_tabBorder_getStyle(t, e))
        }
        s.removeClass("t-store__tabs_snippet"), s.addClass("t-col"), s.addClass("t-col_12"), t_store_tabs_handleOnChange(t, r), t_store_initTextAndCharacteristics(r, o)
    } else t_store_initTextAndCharacteristics(r, o)
}

function t_store_initRouting() {
    window.onpopstate = function() {
        if (window.history.state && window.history.state.productData) {
            var t = window.history.state.productData,
                e = t.recid,
                r = t.opts,
                o = t.productObj,
                s = t.isRelevantsShow;
            t_store_openProductPopup(e, r, o, s)
        }
    }
}

function t_store_verticalAlignButtons(t, e) {
    var r = $("#rec" + t),
        o = r.find(".js-store-grid-cont");
    o.addClass("t-store__valign-buttons");
    var s = r.find(".js-store-grid-cont .t-store__card__textwrapper"),
        i = 0,
        a = parseInt(e.blocksInRow, 10),
        n = $(window).width() <= 480,
        _ = $(window).width() <= 960 && $(window).width() > 480,
        l = !!($(window).width() <= 960 && r.find(".js-store-grid-cont.t-store__grid-cont_mobile-one-row")[0]),
        d = !!($(window).width() <= 480 && r.find(".t-store__mobile-two-columns")[0]);
    n && (a = 1), _ && (a = 2), d && (a = 2), l && (a = 999999);
    var c = 1,
        p = [];
    if ($.each(s, function(t, e) {
            e.style.height = "unset"
        }), $.each(s, function(t, e) {
            1 === a ? e.style.height = "auto" : (p.push(e), e.offsetHeight > i && (i = e.offsetHeight), $.each(p, function(t, e) {
                e.style.height = i + "px"
            }), c === a && (c = 0, i = 0, p = []), c++)
        }), e.showRelevants) {
        var u = r.find(".js-product-relevant .t-store__card__textwrapper"),
            f = 0,
            v = [];
        $.each(u, function(t, e) {
            e.style.height = "unset"
        }), $.each(u, function(t, e) {
            v.push(e), e.offsetHeight > f && (f = e.offsetHeight), $.each(v, function(t, e) {
                e.style.height = f + "px"
            })
        })
    }
}

function t_store_hoverZoom_init(t) {
    if (!window.isMobile) {
        var e = $("#rec" + t);
        try {
            e.find("[data-hover-zoom]")[0] && (jQuery.cachedZoomScript || (jQuery.cachedZoomScript = function(t) {
                var e = {
                    dataType: "script",
                    cache: !0,
                    url: t
                };
                return jQuery.ajax(e)
            }), $.cachedZoomScript("https://static.tildacdn.com/js/tilda-hover-zoom-1.0.min.js").done(function(e, r) {
                "success" == r ? t_hoverZoom_init(t) : console.log("Upload script error: " + r)
            }))
        } catch (t) {
            console.log("Zoom image init error: " + t.message)
        }
    }
}

function t_store_addStoreParts(t, e, r) {
    var o = $("#rec" + t),
        s = o.find(".js-store");
    e.storePartsArr = r;
    var i = t_store_get_storePartsControl_html(t, e);
    e.sidebar ? s.find(".t951__sidebar-wrapper").prepend(i) : s.find(".js-store-parts-select-container").prepend(i), t_store_initStoreParts(t, e)
}

function t_store_initStoreParts(t, e) {
    var r = $("#rec" + t);
    r.find(".js-store-parts-switcher").on("click", function() {
        var o, s, i, a = window.tStoreCustomUrlParams || {},
            n = $(this).text();
        if (r.find(".t-active").removeClass("t-active"), $(this).addClass("t-active"), e.filters || (e.filters = {}), $(this).hasClass("t-store__parts-switch-btn-all")) e.filters.storepartuid && delete e.filters.storepartuid, o = r.find('.js-store-filter-opt[name="storepartuid"]'), s = o.val(), a[t] && a[t].storepartuid && a[t].storepartuid.forEach(function(t) {
            var e = r.find('.js-store-filter-opt-chb[data-filter-value="' + t + '"]');
            e.prop("checked", !1), t_store_filters_opts_chosenVal_hide(r, t)
        }), o.val(""), a[t].storepartuid = [], window.tStoreCustomUrlParams = a, t_store_updateUrlWithParams("delete", "storepartuid", n, t);
        else {
            if (e.filters.storepartuid = [n], r.find(".js-store-filter").length > 0) {
                var _, l = r.find('[data-filter-value="' + n + '"]');
                if (l.length > 0) switch (o = l.parents(".js-store-filter-item").find(".js-store-filter-opt"), s = o.val(), s && (i = r.find('[data-filter-value="' + s + '"]'), i.prop("checked", !1), i.removeClass("active"), t_store_filters_opts_chosenVal_hide(r, s)), _ = l.attr("type"), _) {
                    case "checkbox":
                        l.prop("checked", !0), t_store_filters_opts_chosenVal_add(t, n, l), t_store_filters_opts_checkboxes_changeHiddenInput(l, !0);
                        break;
                    case "selectbox":
                        l.addClass("active"), t_store_filters_opts_chosenVal_add(t, n, l), t_store_filters_opts_customSelect_changeHiddenInput(l)
                } else o = r.find('.js-store-filter-opt[name="storepartuid"]'), s = o.val(), s && (i = r.find('[data-filter-value="' + s + '"]'), i.prop("checked", !1), i.removeClass("active"), t_store_filters_opts_chosenVal_hide(r, s), o.val(""))
            }
            t_store_updateUrlWithParams("update", "storepartuid", n, t)
        }
        e.sidebar && t_store_filters_scrollStickyBar(r), t_store_showLoadersForProductsList(t, e), t_store_loadProducts("", t, e), t_store_mobileHoriz_checkBtnVisibility(t, e), t_store_setActiveStorePart(t)
    })
}

function t_store_setActiveStorePart(t) {
    var e = $("#rec" + t),
        r = window.tStoreCustomUrlParams;
    e.find(".t-active").removeClass("t-active"), e.find(".js-store-parts-switcher").each(function() {
        var e = $(this).hasClass("t-store__parts-switch-btn-all");
        if (r && r[t]) {
            var o = $(this).html(),
                s = r[t].storepartuid;
            s && -1 !== s.indexOf(o) && $(this).addClass("t-active"), !s && e && $(this).addClass("t-active")
        } else e && $(this).addClass("t-active")
    })
}

function t_store_showLoadersForProductsList(t, e) {
    var r = $("#rec" + t);
    r.find(".t-store__card").addClass("t-store__card_hidden");
    var o = setTimeout(function() {
        e.sidebar ? r.find(".t951__grid-cont").addClass("t951__grid-cont_hidden") : r.find(".js-store-grid-cont").html(""), r.find(".js-store-grid-cont-preloader").css({
            display: "",
            opacity: "0"
        }).animate({
            opacity: 1
        }, 200)
    }, 1e3);
    r.data("preloader-timeout", o)
}

function t_store_loadProducts(t, e, r, o, s) {
    window.tStoreProductsRequested = !0;
    var i, a = "relevants" === t,
        n = Date.now(),
        _ = r.storepart,
        l = !o || 1 === parseInt(o, 10),
        d = $("#rec" + e),
        c = a ? d.find(".js-store-relevants-grid-cont") : d.find(".js-store-grid-cont"),
        p = "973" === d.attr("data-record-type");
        a ? (i = {
        storepartuid: _,
        productuid: s.currentProductUid,
        quantity: s.relevantsQuantity,
        method: s.relevantsMethod,
        sort: s.relevantsSort
    }, 
        d.find(".t-store__relevants-grid-cont").css({
        opacity: 0
        })
    ) : i = {
        storepartuid: _,
        recid: e,
        c: n
    }, l && (i.getparts = !0, i.getoptions = !0), o && (i.slice = o), r.filters && (i.filters = r.filters), r.sort && !a && (i.sort = r.sort), r.size && r.size > 0 && (i.size = r.size);
    var u = a ? "https://store.tildacdn.com/api/getrelevantproducts/" : "https://store.tildacdn.com/api/getproductslist/";
    r.isPublishedPage || (i.projectid = $(".t-records").attr("data-tilda-project-id"), u = a ? "https://tilda.cc/projects/store/getrelevantproducts/" : "https://tilda.cc/projects/store/getproductslist/");
    var f = Date.now();
    $.ajax({
        type: "GET",
        url: u,
        data: i,
        dataType: "text",
        success: function(t) {
            if (clearTimeout(d.data("preloader-timeout")), d.find(".js-store-grid-cont-preloader").hide(), r.sidebar && d.find(".t951__grid-cont").removeClass("t951__grid-cont_hidden"), l && c.html(""), "string" == typeof t && "{" !== t.substring(0, 1) && (-1 !== t.indexOf("ERROR:") || -1 !== t.indexOf("Wrong"))) {
                console.log("show error");
                var s = t_store_get_errorBox(r, t);
                return c.append(s), void d.find(".js-store-error-msg").fadeIn(200)
            }
            if ("" !== t) {
                var i = {};
                try {
                    i = jQuery.parseJSON(t), void 0 !== i.partlinks && (r.linksSizeChart = i.partlinks)
                } catch (e) {
                    console.log(t)
                }
                if ("object" == typeof i) {
                    var n = a ? i.relevants : i.products;
                    if (i.options && i.options.length >= 1 && (window.tStoreOptionsList = i.options), t_store_process(n, e, r, !!o, a, i), i.parts && i.parts.length > 1 && 0 === d.find(".js-store-parts-switcher").length && !r.hideStoreParts && t_store_addStoreParts(e, r, i.parts), a || t_store_setActiveStorePart(e, r), "y" !== i.filter || r.hideFilters) {
                        if (r.sidebar && !a) {
                            var _ = d.find(".t951__sidebar");
                            _.addClass("t951__sidebar_empty");
                            var u = "RU" === window.tildaBrowserLang ? 'Пожалуйста, добавьте хотя бы один фильтр каталога для отображения боковой панели магазина. <a href="https://help-ru.tilda.cc/online-store-payments/filters" target="_blank" rel="nofollow noopener">Справка</a>' : 'Please <a href="https://help.tilda.cc/online-store-payments/filters" target="_blank" rel="nofollow noopener">add at least one catalog filter</a> to display the store sidebar';
                            _.html('<span class="t-text t-text_xxs">' + u + "</span>")
                        }
                    } else $.when(t_store_loadFilters(e, r)).done(function(t) {
                        if (t) {
                            var o = t_store_parse_jsonData(t);
                            t_store_filters_init(e, r, o), a || t_store_filters_prodsNumber_update(d, r, i)
                        }
                    });
                    if (t_store_isQueryInAddressBar("tstore") && window.t_store__scrollToBlock) {
                        var f = decodeURI(window.location.hash).split("/"),
                            v = f.indexOf("r") + 1,
                            h = f[v];
                        h == e && (setTimeout(function() {
                            window.scrollTo(0, d.offset().top)
                        }, 500), window.t_store__scrollToBlock = null)
                    }
                    var g = d.find(".js-store-load-more-btn");
                    if (g.removeClass("t-btn_sending"), i.nextslice) {
                        var m = c.has("t-store__grid-cont_mobile-one-row");
                        if (0 === g.length) {
                            g = t_store_get_loadMoreBtn_html(d, r);
                            r.sidebar ? d.find(".t951__cont-w-filter").append(g) : d.find(".js-store-grid-cont").after(g), g = d.find(".js-store-load-more-btn")
                        }
                        g.show(), g.off("click"), g.on("click", function() {
                            window.tStoreProductsRequested || (g.addClass("t-btn_sending"), t_store_loadProducts("", e, r, i.nextslice))
                        }), m && c.bind("scroll", t_throttle(function() {
                            if (!window.tStoreProductsRequested && $(window).width() < 960) {
                                var t = c.get(0).scrollWidth,
                                    e = c.scrollLeft(),
                                    r = c.outerWidth();
                                r + e + 20 > t && "none" !== g.css("display") && g.click()
                            }
                        }, 200))
                    } else a || (g.hide(), c.off("scroll"));
                    if (r.showPagination && "on" === r.showPagination && !a && t_store_pagination_draw(e, r, o, i.nextslice, i.total), window.isMobile && c.bind("scroll", t_throttle(function() {
                            void 0 === $(".t-records").attr("data-tilda-mode") && ("y" !== window.lazy && "yes" !== $("#allrecords").attr("data-tilda-lazy") || t_store_onFuncLoad("t_lazyload_update", function() {
                                t_lazyload_update()
                            }))
                        }, 200)), a) {
                        d.find(".t-store__relevants-grid-cont").css({
                            opacity: 1
                        });
                        var b = 4;
                        r.relevants_slider && (n.length > b || $(window).width() <= 960) && t_store_onFuncLoad("t_sldsInit", function() {
                            t_sldsInit(e + " .js-store-relevants-grid-cont")
                        })
                    }
                    p && !a && t_store_onFuncLoad("t_sldsInit", function() {
                        t_sldsInit(e + " .js-store-grid-cont")
                    }), r.verticalAlignButtons && t_store_verticalAlignButtons(e, r), r.verticalAlignButtons && ("complete" === document.readyState ? t_store_verticalAlignButtons(e, r) : $(window).on("load", function() {
                        t_store_verticalAlignButtons(e, r)
                    })), t_store_onFuncLoad("t_animate__startAnimation", function() {
                        t_animate__startAnimation()
                    }), window.tStoreProductsRequested = !1
                }
            }
        },
        error: function(t) {
            var e = d.find(".js-store-load-more-btn");
            e.removeClass("t-btn_sending");
            var r = Date.now() - f;
            0 == t.status && r < 100 && console.log("Request error (get store products). Please check internet connection..."), window.tStoreProductsRequested = !1
        },
        timeout: 25e3
    })
}

function t_store_loadOneProduct(t, e, r) {
    var o = Date.now(),
        s = e.storepart,
        i = {
            storepartuid: s,
            recid: t,
            productuid: r,
            c: o
        };
    return $.ajax({
        type: "GET",
        url: "https://store.tildacdn.com/api/getproduct/",
        data: i,
        dataType: "text",
        success: function(t) {
            console.log(t)
        },
        error: function() {
            console.log("Can't get product with uid = " + r + " in storepart = " + e.storepart)
        },
        timeout: 25e3
    })
}

function t_store_loadProducts_byId(t, e) {
    var r = Date.now(),
        o = {
            productsuid: t,
            c: r
        },
        s = "https://store.tildacdn.com/api/getproductsbyuid/";
    return void 0 !== e && (e.isPublishedPage || (o.projectid = $(".t-records").attr("data-tilda-project-id"), s = "https://tilda.cc/projects/store/getproductsbyuid/")), $.ajax({
        type: "GET",
        url: s,
        data: o,
        dataType: "text",
        success: function() {},
        error: function() {
            console.log("Can't get getproductsbyuid. Requesting idArr: "), console.log(t)
        },
        timeout: 25e3
    })
}

function t_store_loadFilters(t, e) {
    var r = Date.now(),
        o = e.storepart,
        s = {
            storepartuid: o,
            c: r
        },
        i = "https://store.tildacdn.com/api/getfilters/";
    return e.isPublishedPage || (s.projectid = $(".t-records").attr("data-tilda-project-id"), i = "https://tilda.cc/projects/store/getfilters/"), $.ajax({
        type: "GET",
        url: i,
        data: s,
        dataType: "text",
        success: function() {},
        error: function() {
            console.log("Can't get filters in storepart = " + e.storepart)
        },
        timeout: 25e3
    })
}

function t_store_loadProductTabs(t, e, r) {
    var o = Date.now(),
        s = e.storepart,
        i = {
            storepartuid: s,
            recid: t,
            productuid: r,
            c: o
        };
    return $.ajax({
        type: "GET",
        url: "https://store.tildacdn.com/api/getproducttabs/",
        data: i,
        dataType: "text",
        success: function(t) {
            "string" == typeof t && (t = JSON.parse(t)), "object" == typeof t ? (window.tStoreTabsList || (window.tStoreTabsList = {}), window.tStoreTabsList[t.productuid] = t.tabs) : console.log("Wrong tabs data format for product uid = " + r + " in storepart = " + e.storepart)
        },
        error: function() {
            console.log("Can't get tabs for product uid = " + r + " in storepart = " + e.storepart)
        },
        timeout: 25e3
    })
}

function t_store_parse_jsonData(t) {
    try {
        var e = jQuery.parseJSON(t)
    } catch (e) {
        console.log(t)
    }
    if ("object" == typeof e) return e
}

function t_store_process(t, e, r, o, s, i) {
    var a = $("#rec" + e),
        n = a.find(".js-store-grid-cont"),
        _ = "973" === a.attr("data-record-type");
    s && (n = a.find(".js-store-relevants-grid-cont"));
    var l = t_store_get_horizSeparator_html(r),
        d = {},
        c = n.find(".t-store__card").length;
    if (0 === t.length) {
        var p = t_store_get_emptyMsg_html(r);
        return n.append(p), void a.find(".js-store-empty-part-msg").fadeIn(200)
    }
    if (s && r.relevants_slider && r.prodCard.shadowSize && r.prodCard.shadowSize.length) {
        var u = "",
            f = parseInt(r.prodCard.shadowSize, 10) > 10 ? "10px" : r.prodCard.shadowSize;
        u += "<style>\n", u += "    @media screen and (max-width:960px) {\n", u += "        #rec" + e + " .t-store .t-store__relevants-grid-cont .t-store__card__wrap_all {\n", u += "            margin: " + f + ";\n", u += "        }\n", u += "    }\n", u += "</style>", a.find(".t-popup .t-store__relevants__container").before(u)
    }
    var v = "",
        h = 4,
        g = s ? h : r.blocksInRow;
    if (s && r.relevants_slider && (t.length > h || $(window).width() <= 960) || !s && _) {
        var m = "",
            b = "300";
        "fast" === r.slider_opts.anim_speed && (m = "t-slds_animated-fast"), "slow" === r.slider_opts.anim_speed && (m = "t-slds_animated-slow", b = "500"), v += '<div class="t-slds" style="visibility: hidden;">', v += '<div class="t-slds__main t-container">', v += '<div class="t-slds__container">', v += '<div class="t-slds__items-wrapper ' + m + '" data-slider-items-in-row="' + (!s && _ ? g : h) + '" data-slider-transition="' + b + '" data-slider-with-cycle="true" data-slider-cycle="yes" data-slider-correct-height="' + (!s && _ ? "true" : "false") + '" data-auto-correct-mobile-width="false">', v = v.replace("[[noCycleClass]]", r.slider_opts.cycle ? "" : "t-slds__nocycle").replace("[[isCycled]]", r.slider_opts.cycle ? "true" : "false")
    }
    if ($.each(t, function(t, e) {
            var r = null,
                o = null;
            e.editions.forEach(function(t) {
                if (t.price && "" !== t.price) {
                    var e = t_prod__cleanPrice(t.price);
                    r = null === r ? e : Math.min(r, e), o = null === o ? e : Math.max(o, e)
                }
            }), e.minPrice = r, e.maxPrice = o
        }), $.each(t, function(o, i) {
            (!s && !_ || s && !r.relevants_slider) && c > 0 && c % g == 0 && (v += l), v += t_store_get_productCard_html(a, i, r, s, e, o, t), d[i.uid] = i, c++
        }), s && r.relevants_slider && (t.length > h || $(window).width() <= 960) || !s && _) {
        var w = a.find(".js-store-tpl-slider-arrows"),
            y = w.html();
        if (v += "</div>", v += "</div>", y && !s && _ && (v += y, n.removeClass("t-container").removeClass("t-store__grid-cont_mobile-grid")), !s && _) {
            var x = '<div class="t-slds__bullet_wrapper">';
            $.each(t, function(t) {
                var e = t + 1;
                x += '<div class="t-slds__bullet' + (1 === e ? " t-slds__bullet_active" : "") + '" data-slide-bullet-for="' + e + '"><div class="t-slds__bullet_body" style="background-color: transparent;"></div></div>'
            }), x += "</div>", v += x
        }
        v += "</div>", v += "</div>", y && s && (v += y)
    }
    if (t_store_process_appendAndShowProducts(a, n, v), $.each(t, function(t, o) {
            var i = s ? a.find('.t-store__relevants__container .js-product.t-item[data-product-gen-uid="' + o.uid + '"]') : a.find('.t-store__grid-cont .js-product.t-item[data-product-gen-uid="' + o.uid + '"]');
            i.data("cardSize", "small"), o = d[o.uid], "both" !== r.showStoreBtnQuantity && "list" !== r.showStoreBtnQuantity || t_store_addProductQuantity(e, i, o, r), t_store_addProductOptions(e, o, i, r), t_store_option_handleOnChange_custom(e, i, r), t_store_onFuncLoad("t_prod__initProduct", function() {
                t_prod__initProduct(e, i)
            })
        }), !o && r.isFlexCols && r.isHorizOnMob && (n.find(".t-store__tail-gap").remove(), n.append('<div class="t-store__tail-gap"></div>')), "y" !== window.lazy && "yes" !== $("#allrecords").attr("data-tilda-lazy") || (r.relevants_slider ? setTimeout(function() {
            t_store_onFuncLoad("t_lazyload_update", function() {
                t_lazyload_update()
            })
        }, 100) : t_store_onFuncLoad("t_lazyload_update", function() {
            t_lazyload_update()
        })), $(".t706__cartwin").length > 0 ? "function" == typeof tcart__addEvent__links && tcart__addEvent__links() : console.log("Warning: cart block is not added to this page"), t_store_initPopup(e, d, r, s, i), t_store_unifyCardsHeights(e, r), r.verticalAlignButtons && t_store_verticalAlignButtons(e, r), setTimeout(function() {
            t_store_unifyCardsHeights(e, r), r.verticalAlignButtons && t_store_verticalAlignButtons(e, r)
        }, 1), void 0 !== document.fonts ? void 0 !== document.fonts.ready && document.fonts.ready.then(function() {
            setTimeout(function() {
                t_store_unifyCardsHeights(e, r)
            }, 1e3)
        }) : setTimeout(function() {
            t_store_unifyCardsHeights(e, r)
        }, 1e3), r.verticalAlignButtons && ("complete" === document.readyState ? t_store_verticalAlignButtons(e, r) : $(window).on("load", function() {
            t_store_verticalAlignButtons(e, r)
        })), !r.previewmode) try {
        addEditFieldEvents_new(e)
    } catch (t) {
        console.log(t.message)
    }
}

function t_store_process_appendAndShowProducts(t, e, r) {
    e.append(r), !0 === t.data("already-loaded-first-products") ? setTimeout(function() {
        t.find(".t-store__card").removeClass("t-store__card_hidden")
    }, 10) : (t.find(".t-store__card").removeClass("t-store__card_hidden"), t.data("already-loaded-first-products", !0))
}

function t_store_pagination_draw(t, e, r, o, s) {
    r = r ? Number(r) : 1;
    var i = 5,
        a = e.size,
        n = Math.ceil(s / a),
        _ = t_store_pagination_getPagingRange(r, 1, n, i),
        l = $("#rec" + t),
        d = l.find(".js-store-grid-cont"),
        c = l.find(".t-store__load-more-btn-wrap"),
        p = l.find(".t-store__pagination");
    if (n <= 1) p.remove();
    else {
        var u = t_store_pagination_getHtml(t, e, r, _, n);
        p.length ? (p.empty(), p.append(u)) : c.length ? c.after(u) : d.after(u);
        p = l.find(".t-store__pagination");
        p.attr("data-active-page", r), p.attr("data-total-pages", n), t_store_pagination_addEvents(t, e), t_store_pagination_display(t)
    }
}

function t_store_pagination_getHtml(t, e, r, o, s) {
    var i = $("#rec" + t),
        a = i.find(".t-store__pagination"),
        n = "",
        _ = t_store_pagination_getButtonStyles(e),
        l = e.typo && e.typo.descrColor && e.typo.descrColor.length ? e.typo.descrColor : null,
        d = l || _.bgColor || "#000000",
        c = "...",
        p = '<?xml version="1.0" encoding="UTF-8"?>    <svg class="t-store__pagination__arrow t-store__pagination__arrow_prev" width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">            <path d="M5.85355339,3.14644661 C6.02711974,3.32001296 6.04640489,3.58943736 5.91140884,3.7843055 L5.85355339,3.85355339 L1.707,8 L15.5,8 C15.7761424,8 16,8.22385763 16,8.5 C16,8.74545989 15.8231248,8.94960837 15.5898756,8.99194433 L15.5,9 L1.707,9 L5.85355339,13.1464466 C6.02711974,13.320013 6.04640489,13.5894374 5.91140884,13.7843055 L5.85355339,13.8535534 C5.67998704,14.0271197 5.41056264,14.0464049 5.2156945,13.9114088 L5.14644661,13.8535534 L0.146446609,8.85355339 L0.108961015,8.81166225 L0.108961015,8.81166225 L0.0667474273,8.74976515 L0.0667474273,8.74976515 L0.0376105602,8.6905951 L0.0376105602,8.6905951 L0.0166108213,8.62813914 L0.0166108213,8.62813914 L0.00544806672,8.57406693 L0.00544806672,8.57406693 L0.00182199094,8.54281541 L0.00182199094,8.54281541 L0,8.48946265 C0.000554364655,8.46826702 0.00233820308,8.44709424 0.00546187104,8.42608223 L0,8.5 L0.00282096186,8.4465724 L0.00282096186,8.4465724 L0.0166082551,8.37185423 L0.0166082551,8.37185423 L0.0377922373,8.30896344 L0.0377922373,8.30896344 L0.0885911588,8.2156945 L0.0885911588,8.2156945 L0.134588748,8.15871357 L0.134588748,8.15871357 L5.14644661,3.14644661 C5.34170876,2.95118446 5.65829124,2.95118446 5.85355339,3.14644661 Z" fill="' + d + '" fill-rule="nonzero"></path>        </g>    </svg>',
        u = '<?xml version="1.0" encoding="UTF-8"?>    <svg class="t-store__pagination__arrow t-store__pagination__arrow_next" width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">            <path d="M10.1464466,3.14644661 C9.97288026,3.32001296 9.95359511,3.58943736 10.0885912,3.7843055 L10.1464466,3.85355339 L14.293,8 L0.5,8 C0.223857625,8 0,8.22385763 0,8.5 C0,8.74545989 0.176875161,8.94960837 0.410124368,8.99194433 L0.5,9 L14.293,9 L10.1464466,13.1464466 C9.97288026,13.320013 9.95359511,13.5894374 10.0885912,13.7843055 L10.1464466,13.8535534 C10.320013,14.0271197 10.5894374,14.0464049 10.7843055,13.9114088 L10.8535534,13.8535534 L15.8535534,8.85355339 L15.891039,8.81166225 L15.891039,8.81166225 L15.9332526,8.74976515 L15.9332526,8.74976515 L15.9623894,8.6905951 L15.9623894,8.6905951 L15.9833892,8.62813914 L15.9833892,8.62813914 L15.9945519,8.57406693 L15.9945519,8.57406693 L16,8.5 L16,8.5 L15.997179,8.4465724 L15.997179,8.4465724 L15.9833917,8.37185423 L15.9833917,8.37185423 L15.9622078,8.30896344 L15.9622078,8.30896344 L15.9114088,8.2156945 L15.9114088,8.2156945 L15.8654113,8.15871357 L15.8654113,8.15871357 L10.8535534,3.14644661 C10.6582912,2.95118446 10.3417088,2.95118446 10.1464466,3.14644661 Z" fill="' + d + '" fill-rule="nonzero"></path>        </g>    </svg>',
        f = t_store_pagination_getClass(e, "t-store__pagination__item", "prev"),
        v = t_store_pagination_getClass(e, "t-store__pagination__item", "next"),
        h = t_store_pagination_getClass(e, "t-store__pagination__item", "separator"),
        g = e.typo.descr;
    _.bgColor && (g += " border-color: " + _.bgColor + ";"), _.borderRadius && (g += " border-radius: " + _.borderRadius + ";"), a.length || (n += '<div class="t-store__pagination" data-active-page="' + r + '" data-total-pages="' + s + '">'), 1 !== r && (n += '<div class="' + f + '" style="' + g + '" data-control-type="prev">' + p + "</div>");
    for (var m = o.length - 1, b = 0; b < o.length; b++) {
        var w = o[b],
            y = w === r,
            x = t_store_pagination_getClass(e, "t-store__pagination__item", "page", y);
        0 === b && 1 !== w && (n += '<div class="' + x + '" style="' + g + '" data-page-num="1">1</div>'), 0 === b && w > 2 && (n += '<div class="' + h + '" style="' + g + '">' + c + "</div>"), n += '<div class="' + x + '" style="' + g + '" data-page-num="' + w + '">' + w + "</div>", b === m && o[m] < s - 1 && (n += '<div class="' + h + '" style="' + g + '">' + c + "</div>"), b === m && o[m] !== s && (n += '<div class="' + x + '" style="' + g + '" data-page-num="' + s + '">' + s + "</div>")
    }
    return r < s && (n += '<div class="' + v + '" style="' + g + '" data-control-type="next">' + u + "</div>"), a.length || (n += "</div>"), n
}

function t_store_pagination_display(t) {
    var e = $("#rec" + t),
        r = e.find(".js-store-grid-cont"),
        o = e.find(".t-store__pagination");
    if (r.length && o.length) {
        var s = r.hasClass("t-store__grid-cont_mobile-one-row") && $(window).width() < 960;
        s ? o.hide() : o.show()
    }
}

function t_store_pagination_getClass(t, e, r, o) {
    var s = "sm" === t.btnSize ? "js-pagination-item_sm " : "",
        i = "separator" === r ? e : "js-pagination-item " + s + e;
    return o && (i += " " + e + "_active"), i += " " + e + "_" + r, i += " t-descr t-descr_xxs", i
}

function t_store_pagination_getButtonStyles(t) {
    var e = t.btn1_style.split(";"),
        r = null,
        o = null,
        s = {};
    if (e.forEach(function(t) {
            0 === t.indexOf("background-color") ? r = t.replace("background-color:", "").trim() : 0 === t.indexOf("border-radius") && (o = t.replace("border-radius:", "").trim())
        }), r) {
        s.bgColor = r;
        var i = t_store_hexToRgb(r);
        if (i) {
            var a = i;
            a.push(1), s.bgColorRgba = a
        }
    }
    return o && (s.borderRadius = o), s
}

function t_store_pagination_addEvents(t, e) {
    var r = $("#rec" + t),
        o = r.find(".js-pagination-item"),
        s = r.find(".t-store__pagination"),
        i = t_store_pagination_getButtonStyles(e),
        a = "rgba(0, 0, 0, 0.05)";
    if (i.bgColorRgba) {
        var n = .05;
        i.bgColorRgba[i.bgColorRgba.length - 1] = n, a = "rgba(" + i.bgColorRgba.join(", ") + ")"
    }
    o.mouseenter(function() {
        $(this).css("background-color", a)
    }).mouseleave(function() {
        $(this).css("background-color", "unset")
    }), o.on("click", function() {
        var o = $(this),
            i = o.closest(".t-store__pagination"),
            a = Number(o.attr("data-page-num")),
            n = Number(i.attr("data-active-page")),
            _ = Number(i.attr("data-total-pages")),
            l = "next" === o.attr("data-control-type"),
            d = "prev" === o.attr("data-control-type"),
            c = a;
        if ((isNaN(a) || a != n) && (l ? c = n + 1 <= _ ? n + 1 : _ : d ? c = n - 1 >= 1 ? n - 1 : 1 : isNaN(a) || (c = a), l || d || !isNaN(a))) {
            r.find(".js-store-grid-cont").html(""), t_store_showLoadersForProductsList(t, e), t_store_loadProducts("", t, e, c), s.attr("data-active-page", c), s.attr("data-total-pages", _), t_store_pagination_updateUrl(t, e, c);
            var p = o.closest(".t-store");
            p.length && $("html, body").animate({
                scrollTop: p.offset().top - 50
            }, 50)
        }
    })
}

function t_store_pagination_updateUrl(t, e, r) {
    var o = window.tStoreCustomUrlParams || {};
    o[t] || (o[t] = {}), o[t].page = r, 1 == r && delete o[t].page, window.tStoreCustomUrlParams = o, t_store_paramsToObj_updateUrl(o)
}

function t_store_pagination_getPagingRange(t, e, r, o) {
    var s = [];
    o > r && (o = r);
    var i = t - Math.floor(o / 2);
    i = Math.max(i, e), i = Math.min(i, e + r - o);
    for (var a = 0; a < o; a++) s.push(i + a);
    return s
}

function t_store_mobileHoriz_checkBtnVisibility(t, e) {
    t_store_mobileHoriz_hideLoadBtn(t, e), $(window).bind("resize", t_throttle(function() {
        t_store_mobileHoriz_hideLoadBtn(t, e)
    }, 500))
}

function t_store_mobileHoriz_hideLoadBtn(t, e) {
    var r = $("#rec" + t);
    $(window).width() < 960 && e.hasMobileHorizScroll && r.find(".js-store-load-more-btn").remove()
}

function t_store_get_storePartsControl_html(t, e) {
    var r = "";
    r += '<div class="t-store__parts-switch-wrapper t-align_center">', r += '<div class="js-store-parts-switcher t-store__parts-switch-btn t-name t-name_xs t-menu__link-item t-store__parts-switch-btn-all" data-storepart-link="#!/tstore/r/' + t + "/c/" + e.storepart + '" data-storepart-uid="' + e.storepart + '" >', r += t_store_dict("all"), r += "</div>";
    for (var o = 0; o < e.storePartsArr.length; o++) {
        var s = e.storePartsArr[o];
        r += '<div class="js-store-parts-switcher t-store__parts-switch-btn t-name t-name_xs t-menu__link-item" data-storepart-link="#!/tstore/r/' + t + "/c/" + s.uid + "-" + s.title + '" data-storepart-uid="' + s.uid + '">', r += "" + s.title, r += "</div>"
    }
    return r += "</div>", r
}

function t_store_get_productPopup_html(t, e) {
    var r = "",
        o = e.popup_opts.popupStat ? 'data-track-popup="' + e.popup_opts.popupStat + '"' : "",
        s = "t-popup__container t-popup__container-static",
        i = e.verticalAlignButtons,
        a = i ? "t-store__valign-buttons" : "",
        n = e.showRelevants,
        _ = e.titleRelevants ? e.titleRelevants : t_store_dict("seeAlso"),
        l = e.relevants_slider ? "" : "t-store__grid-cont_mobile-one-row";
    e.popup_opts.isVertical && (s += " t-store__popup-container_8-cols");
    var d = e.popup_opts.overlayBgColorRgba ? 'style="background-color:' + e.popup_opts.overlayBgColorRgba + '"' : "",
        c = e.popup_opts.containerBgColor ? 'style="background-color:' + e.popup_opts.containerBgColor + '"' : "",
        p = e.popup_opts.isVertical ? "" : "t-store__prod-popup__col-left t-col t-col_" + e.popup_opts.columns,
        u = "t-align_" + ("center" === e.popup_opts.align ? "center" : "left") + " ",
        f = u + (e.popup_opts.isVertical ? "" : "t-store__prod-popup__col-right t-col t-col_" + e.popup_opts.columns2);
    return r += '<div class="t-popup" ' + o + " " + d + ">", r += "    " + t_store_get_productPopup_closeIcon_html(e), r += "    " + t_store_get_productPopup_closeText_html(e), r += '    <div class="' + s + '" ' + c + ">", r += "        <div>", r += '            <div class="t-store__prod-popup__container">', r += '                <div class="js-store-product js-product t-store__product-popup">', r += '                    <div class="t-store__prod-popup__slider js-store-prod-slider ' + p + '"></div>', r += '                    <div class="t-store__prod-popup__info ' + f + '">', r += "                        " + t_store_get_productPopup_titleText_html(), r += '                        <div class="js-store-price-wrapper t-store__prod-popup__price-wrapper">', r += "                            " + t_store_get_productPopup_onePrice_html(e, "current"), r += "                            " + t_store_get_productPopup_onePrice_html(e, "old"), r += "                        </div>", r += '                        <div class="js-product-controls-wrapper"></div>', r += "                        " + t_store_get_productPopup_linksSizeChart_html(), r += "                        " + t_store_get_productPopup_buyBtn_html(e), r += "                        " + t_store_get_productPopup_text_html(), r += "                    </div>", r += "                </div>", n && (r += '                <div class="t-store__relevants__container">', r += '                    <div class="t-store__relevants__title-wrapper">', r += '                        <div class="t-store__relevants__title t-uptitle t-uptitle_xxl" style="' + e.typo.title + '">' + _ + "</div>", r += "                    </div>", e.relevants_slider || (r += t_store_get_handIcon_html(t)), r += '                    <div class="t-store__relevants-grid-cont js-store-relevants-grid-cont ' + a + " " + l + '"></div>', r += "                </div>"), r += "            </div>", r += "        </div>", r += "    </div>", r += "</div>", r
}

function t_store_get_productPopup_text_html() {
    var t = "";
    return t += '<div class="js-store-prod-text t-store__prod-popup__text t-descr t-descr_xxs"></div>', t
}

function t_store_get_productPopup_linksSizeChart_html() {
    var t = "";
    return t += '<div class="t-store__prod-popup__links-wrapper"></div>', t
}

function t_store_get_productPopup_buyBtn_html(t) {
    var e = "",
        r = t.btn1_style,
        o = t.popup_opts.btnTitle;
    return "" !== o && (e += '<div class="t-store__prod-popup__btn-wrapper js-store-buttons-wrapper">', e += '<a href="#order" class="t-store__prod-popup__btn t-btn t-btn_sm" style="' + r + '">', e += '<table style="width:100%; height:100%;"><tr><td class="js-store-prod-popup-buy-btn-txt">', e += o, e += "</td></tr></table>", e += "</a>", e += "</div>"), e
}

function t_store_get_productPopup_onePrice_html(t, e) {
    var r = "",
        o = "current" === e ? "js-store-prod-price t-store__prod-popup__price" : "js-store-prod-price-old t-store__prod-popup__price_old",
        s = "",
        i = "",
        a = "current" === e ? t.price.color : t.price.colorOld;
    i += a ? "color:" + a + ";" : "", i += t.price.fontWeight ? "font-weight:" + t.price.fontWeight + ";" : "", s = "" !== i ? 'style = "' + i + '"' : "";
    var n = t.currencyTxt ? '<div class="t-store__prod-popup__price-currency">' + t.currencyTxt + "</div>" : "",
        _ = "current" === e ? "js-product-price js-store-prod-price-val" : "js-store-prod-price-old-val";
    return r += '<div class="' + o + ' t-store__prod-popup__price-item t-name t-name_md" ' + s + ">", r += "r" !== t.currencySide && n ? n : "", r += '    <div class="' + _ + ' t-store__prod-popup__price-value notranslate" translate="no"></div>', r += "r" === t.currencySide && n ? n : "", r += "</div>", r
}

function t_store_get_productPopup_titleText_html() {
    var t = "";
    return t += '<div class="t-store__prod-popup__title-wrapper">', t += '    <div class="js-store-prod-name js-product-name t-store__prod-popup__name t-name t-name_xl"></div>', t += '    <div class="t-store__prod-popup__brand t-descr t-descr_xxs"></div>', t += '    <div class="t-store__prod-popup__sku t-descr t-descr_xxs">', t += t_store_dict("sku") + ": ", t += '<span class="js-store-prod-sku js-product-sku">', t += "</span>", t += "    </div>", t += "</div>", t
}

function t_store_get_productPopup_closeIcon_html(t) {
    var e = "",
        r = t.popup_opts.iconColor ? t.popup_opts.iconColor : "#000000",
        o = t.popup_opts.overlayBgColorRgba ? t_store_removeRgbOpacity(t.popup_opts.overlayBgColorRgba) : t.popup_opts.containerBgColor,
        s = o && o.length ? o : "#ffffff";
    if (t.popup_opts.overlayBgColorRgba && !t.popup_opts.iconColor) {
        var i = t_store_removeRgbOpacity(t.popup_opts.overlayBgColorRgba);
        r = t_store_luma_rgb(i)
    }
    return e += '<div class="t-popup__close" style="background-color: ' + s + '">', e += '    <div class="t-popup__close-wrapper">', e += '<svg class="t-popup__close-icon t-popup__close-icon_arrow" width="26px" height="26px" viewBox="0 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">', e += '<path d="M10.4142136,5 L11.8284271,6.41421356 L5.829,12.414 L23.4142136,12.4142136 L23.4142136,14.4142136 L5.829,14.414 L11.8284271,20.4142136 L10.4142136,21.8284271 L2,13.4142136 L10.4142136,5 Z" fill="' + r + '"></path>', e += "</svg>", e += '        <svg class="t-popup__close-icon t-popup__close-icon_cross" width="23px" height="23px" viewBox="0 0 23 23" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">', e += '            <g stroke="none" stroke-width="1" fill="' + r + '" fill-rule="evenodd">', e += '                <rect transform="translate(11.313708, 11.313708) rotate(-45.000000) translate(-11.313708, -11.313708) " x="10.3137085" y="-3.6862915" width="2" height="30"></rect>', e += '                <rect transform="translate(11.313708, 11.313708) rotate(-315.000000) translate(-11.313708, -11.313708) " x="10.3137085" y="-3.6862915" width="2" height="30"></rect>', e += "            </g>", e += "        </svg>", e += "    </div>", e += "</div>", e
}

function t_store_get_productPopup_closeIcon_color(t, e) {
    var r = e.popup_opts.iconColor ? e.popup_opts.iconColor : "#000000",
        o = e.popup_opts.overlayBgColorRgba ? t_store_removeRgbOpacity(e.popup_opts.overlayBgColorRgba) : e.popup_opts.containerBgColor,
        s = o && o.length ? o : "#ffffff";
    if (e.popup_opts.overlayBgColorRgba && !e.popup_opts.iconColor) {
        var i = t_store_removeRgbOpacity(e.popup_opts.overlayBgColorRgba);
        r = t_store_luma_rgb(i)
    }
    var a = $("#rec" + t),
        n = $.contains($("#allrecords")[0], $(".t-store__product-snippet")[0]),
        _ = n ? a.find(".t-store__prod-snippet__container") : a.find(".t-popup"),
        l = _.find(".t-popup__close"),
        d = _.find(".t-popup__close-icon_cross"),
        c = _.find(".t-popup__close-icon_arrow");
    l.css("background-color", s), c.find("path").attr("fill", r), d.find("g").attr("fill", r)
}

function t_store_get_productPopup_closeText_html(t) {
    if (!t.popup_opts.closeText) return "";
    var e = t_store_unescapeHtml(t.popup_opts.closeText),
        r = t.popup_opts.iconColor ? t.popup_opts.iconColor : "#000000",
        o = t.popup_opts.containerBgColor && t.popup_opts.containerBgColor.length ? t.popup_opts.containerBgColor : "#ffffff";
    if (t.popup_opts.containerBgColor && !t.popup_opts.iconColor) {
        var s = t_store_hexToRgb(o);
        r = t_store_luma_rgb(s)
    }
    var i = 'style="color:' + r + '"',
        a = "";
    return a += '<div class="t-store__prod-popup__close-txt-wr">', a += '    <div class="js-store-close-text t-store__prod-popup__close-txt t-descr t-descr_xxs" ' + i + ">", a += e, a += "    </div>", a += "</div>", a
}

function t_store_get_loadMoreBtn_html(t, e) {
    var r = "",
        o = !!($(window).width() < 960 && t.find(".js-store-grid-cont.t-store__grid-cont_mobile-one-row")[0]),
        s = o ? " t-store__load-more-btn-wrap_hidden " : "",
        i = "sm" === e.btnSize ? "t-btn_xs" : "t-btn_sm";
    return r += '<div class="t-store__load-more-btn-wrap t-align_center' + s + '">', r += '    <div class="js-store-load-more-btn t-store__load-more-btn t-btn ' + i + '" style="' + e.btn1_style + 'display:none;">', r += '        <table style="width:100%; height:100%;"><tr><td>' + t_store_dict("loadmore") + "</td></tr></table>", r += "    </div>", r += "</div>", r
}

function t_store_get_handIcon_html(t) {
    var e = "",
        r = $("#rec" + t),
        o = "42",
        s = "rgba(190,190,190,0.3)",
        i = "rgba(190,190,190,1)",
        a = "mix-blend-mode: multiply;",
        n = r.attr("data-bg-color");
    if (n) {
        var _ = t_store_hexToRgb(n),
            l = t_store_luma_rgb(_);
        if ("white" === l) {
            s = "rgba(255,255,255,0.2)", i = "rgba(255,255,255,1)";
            a = "mix-blend-mode: lighten;"
        }
    }
    return e += '<div class="t-store__scroll-icon-wrapper" style="' + a + '">', e += '<?xml version="1.0" encoding="UTF-8"?>', e += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 300" height="' + o + '" width="' + o + '"> <rect class="tooltip-horizontal-scroll-icon_card" x="480" width="200" height="200" rx="5" fill="' + s + '"></rect> <rect class="tooltip-horizontal-scroll-icon_card" y="0" width="200" height="200" rx="5" fill="' + s + '"></rect> <rect class="tooltip-horizontal-scroll-icon_card" x="240" width="200" height="200" rx="5" fill="' + s + '"></rect> <path class="tooltip-horizontal-scroll-icon_hand" d="M78.9579 285.7C78.9579 285.7 37.8579 212.5 20.5579 180.8C-2.44209 138.6 -6.2422 120.8 9.6579 112C19.5579 106.5 33.2579 108.8 41.6579 123.4L61.2579 154.6V32.3C61.2579 32.3 60.0579 0 83.0579 0C107.558 0 105.458 32.3 105.458 32.3V91.7C105.458 91.7 118.358 82.4 133.458 86.6C141.158 88.7 150.158 92.4 154.958 104.6C154.958 104.6 185.658 89.7 200.958 121.4C200.958 121.4 236.358 114.4 236.358 151.1C236.358 187.8 192.158 285.7 192.158 285.7H78.9579Z" fill="' + i + '"></path>', e += "<style> .tooltip-horizontal-scroll-icon_hand { animation: tooltip-horizontal-scroll-icon_anim-scroll-hand 2s infinite } .tooltip-horizontal-scroll-icon_card { animation: tooltip-horizontal-scroll-icon_anim-scroll-card 2s infinite } @keyframes tooltip-horizontal-scroll-icon_anim-scroll-hand { 0% { transform: translateX(80px) scale(1); opacity: 0 } 10% { transform: translateX(80px) scale(1); opacity: 1 } 20%,60% { transform: translateX(175px) scale(.6); opacity: 1 } 80% { transform: translateX(5px) scale(.6); opacity: 1 } to { transform: translateX(5px) scale(.6); opacity: 0 } } @keyframes tooltip-horizontal-scroll-icon_anim-scroll-card { 0%,60% { transform: translateX(0) } 80%,to { transform: translateX(-240px) } }", e += "</style>", e += "</svg>", e += "</div>", e
}

function t_store_get_emptyMsg_html(t) {
    var e = "",
        r = t.typo.titleColor ? "color:" + t.typo.titleColor + ";border-color:" + t.typo.titleColor + ";" : "",
        o = "js-store-empty-part-msg t-store__empty-part-msg-cont";
    return o += t.colClassFullWidth ? " " + t.colClassFullWidth : "", e += '<div class="' + o + '" style="display:none;">', e += '    <div class=" t-store__empty-part-msg-wrapper t-descr t-descr_sm" style="' + r + '">', e += '        <div class="t-store__empty-part-msg">', e += "        " + t_store_dict("emptypartmsg"), e += "        </div>", e += "    </div>", e += "</div>", e
}

function t_store_get_errorBox(t, e) {
    var r = "",
        o = t.typo.titleColor ? "color:" + t.typo.titleColor + ";border-color:" + t.typo.titleColor + ";" : "",
        s = "js-store-error-msg t-store__error-msg-cont";
    return s += t.colClassFullWidth ? " " + t.colClassFullWidth : "", r += '<div class="' + s + '" style="display:none;">', r += '    <div class="t-store__error-msg-wrapper t-descr t-descr_sm" style="' + o + '">', r += '        <div class="t-store__error-msg">', r += "        " + e, r += "        </div>", r += "    </div>", r += "</div>", r
}

function t_store_get_productCard_html(t, e, r, o, s, i, a) {
    var n = o ? "t-col t-col_3" : r.colClass,
        _ = t_store_product_getFirstAvailableEditionData(e.editions),
        l = "",
        d = "left" === r.align ? "t-align_left" : "t-align_center",
        c = r.itemsAnim && r.previewmode ? "t-animate" : "";
    if (window.isMobile) {
        var p = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        void 0 !== p && ("slow-2g" !== p.effectiveType && "2g" !== p.effectiveType && "3g" !== p.effectiveType || (c = ""))
    }
    var u = r.itemsAnim ? 'data-animate-style="' + r.itemsAnim + '" data-animate-chain="yes" ' : "",
        f = _.quantity && parseInt(_.quantity, 10) <= 0,
        v = 'data-product-inv="' + (_.quantity || "") + '" ',
        h = t_store_get_productCard_link(r.prodCard.btnLink1, e, o, s, t),
        g = t_store_get_productCard_targetAttr(r.prodCard.btnLink1, e),
        m = {
            open: r.previewmode ? '<a href="' + h + '" ' + g + ">" : "",
            close: r.previewmode ? "</a>" : ""
        };
    f && "#order" === h && (m.open = "", m.close = "");
    var b = "";
    o && (b = "js-product-relevant");
    var w = 4,
        y = e.pack_label,
        x = e.pack_m,
        C = e.pack_x,
        k = e.pack_y,
        j = e.pack_z;
    i = parseInt(i, 10) + 1;
    var P = "973" === t.attr("data-record-type") && !o,
        S = o && r.relevants_slider && (a.length > w || $(window).width() <= 960);
    (S || P) && (l += '<div class="t-slds__item t-animate" data-slide-index="' + i + '">', l += '<div class="t__slds-wrapper t-slds__wrapper t-slds__wrapper_100 t-align_center">');
    var O = e.url || "";
    return l += '<div class="js-product t-store__card t-store__card_hidden ' + n + " " + d + " " + b + " t-item " + c + '" ' + u + v + 'data-product-lid="' + e.uid + '" data-product-uid="' + e.uid + '" data-product-gen-uid="' + e.uid + '" data-product-pack-label="' + y + '" data-product-pack-m="' + x + '" data-product-pack-x="' + C + '" data-product-pack-y="' + k + '" data-product-pack-z="' + j + '" data-product-url="' + O + '" >', l += r.prodCard.hasWrap ? t_store_get_productCard_wrapperStructure(e, _, r, m, o, s, t) : t_store_get_productCard_simpleStructure(e, _, r, m, o, s, t), l += "</div>", (S || P) && (l += "</div>", l += "</div>"), l
}

function t_store_get_productCard_simpleStructure(t, e, r, o, s, i, a) {
    var n = r.prodCard.showOpts ? "" : 'style="display:none;"',
        _ = t_store_get_productCard_img_html(t, r),
        l = "";
    return l += o.open, l += "    " + _, l += "    " + t_store_get_productCard_txtAndPrice_html(t, e, r, _), l += o.close, l += '<div class="js-product-controls-wrapper t-store__card__prod-controls-wrapper" ' + n + "></div>", l += t_store_get_productCard_btn_html(t, e, r, s, i, a), l
}

function t_store_get_productCard_wrapperStructure(t, e, r, o, s, i, a) {
    var n = "",
        _ = t_store_get_productCard_getWrapperStylesStr(r),
        l = r.prodCard.showOpts ? "" : 'style="display:none;"',
        d = r.prodCard && r.prodCard.txtPad ? "t-store__card__wrap_pad-" + r.prodCard.txtPad : "";
    return n += '<div class="t-store__card__wrap_all ' + d + '" style="' + _ + '">', n += "    " + o.open, n += "        " + t_store_get_productCard_img_html(t, r), n += "    " + o.close, n += '    <div class="t-store__card__wrap_txt-and-btns">', n += '        <div class="store__card__wrap_txt-and-opts">', n += "            " + o.open, n += "                " + t_store_get_productCard_txtAndPrice_html(t, e, r), n += "            " + o.close, n += '            <div class="js-product-controls-wrapper t-store__card__prod-controls-wrapper" ' + l + "></div>", n += "        </div>", n += "        " + t_store_get_productCard_btn_html(t, e, r, s, i, a), n += "    </div>", n += "</div>", n
}

function t_store_get_productCard_getWrapperStylesStr(t) {
    var e = "";
    e += t.prodCard.bgColor ? "background-color:" + t.prodCard.bgColor + ";" : "", e += t.prodCard.borderRadius ? "border-radius:" + parseInt(t.prodCard.borderRadius, 10) + "px;" : "";
    var r = !!(t.prodCard.shadowOpacity && t.prodCard.shadowOpacity.length || t.prodCard.shadowSize && t.prodCard.shadowSize.length);
    if (r) {
        var o = t.prodCard.shadowOpacity ? "0." + t.prodCard.shadowOpacity : "0.3",
            s = t.prodCard.shadowSize ? parseInt(t.prodCard.shadowSize, 10) + "px" : "10px";
        e += "box-shadow: 0px 0px " + s + " 0px rgba(0, 0, 0, " + o + ");"
    }
    return e
}

function t_store_get_productCard_img_html(t, e, r) {
    var o = "",
        s = e.hasOriginalAspectRatio && !e.isHorizOnMob ? "t-store__card__imgwrapper_original-ratio" : "",
        i = "t-store__card__imgwrapper " + s + (e.isFlexCols ? " " + e.imageRatioClass : ""),
        a = e.imageHeight && !e.isFlexCols ? "padding-bottom:" + 100 * parseInt(e.imageHeight, 10) / (e.colWidth || 360) + "%;" : "";
    if (e.hasOriginalAspectRatio && e.prodCard.borderRadius) {
        var n = parseInt(e.prodCard.borderRadius, 10);
        a += "border-radius:" + n + "px " + n + "px 0px 0px; overflow: hidden;"
    }
    var _, l = t_store_get_productCard_imgElHover_html(t, e, r),
        d = e.imageHover && l,
        c = e.hasOriginalAspectRatio ? "imgfield" : "bgimgfield",
        p = 1 === t.editions.length ? c + '="st_gallery__' + t.uid + ':::0"' : "",
        u = r || t_store_getProductFirstImg(t);
    if ("" !== u) {
        if (e.hasOriginalAspectRatio) _ = "<img " + t_store_getLazySrc(e, u) + ' class="js-product-img t-store__card__img ' + (d ? "t-store__card__img_hover" : "") + ' t-img" ' + p + "/>";
        else {
            var f = t_store_get_productCard_getImgStyles(e);
            _ = '<div class="js-product-img t-store__card__bgimg ' + (d ? "t-store__card__bgimg_hover" : "") + ' t-bgimg" data-original="' + u + '" style="background-image:url(\'' + t_store_getLazyUrl(e, u) + "');" + f + '" ' + p + "></div>"
        }
        return o += '<div class="' + i + '" style="' + a + '">', o += "    " + t_store_get_productCard_mark_html(t, e), o += "    " + _, o += "    " + (e.imageHover ? l : ""), o += "</div>", o
    }
    return ""
}

function t_store_get_productCard_img_replaceWith(t, e, r, o) {
    var s = e.find(".t-store__card__imgwrapper"),
        i = t_store_get_productCard_img_html(t, r, o);
    s.replaceWith(i), "y" !== window.lazy && "yes" !== $("#allrecords").attr("data-tilda-lazy") || t_store_onFuncLoad("t_lazyload_update", function() {
        t_lazyload_update()
    })
}

function t_store_get_productCard_imgElHover_html(t, e, r) {
    if (t.gallery && "[" === t.gallery[0]) {
        var o = jQuery.parseJSON(t.gallery);
        if (void 0 !== o[1]) {
            var s = o[1].img;
            if (r && r.length)
                for (var i = 0; i < o.length; i++) {
                    var a = o[i].img;
                    if (a !== r) {
                        s = a;
                        break
                    }
                }
            var n = t_store_get_productCard_getImgStyles(e);
            return e.hasOriginalAspectRatio ? "<img " + t_store_getLazySrc(e, s) + ' class="t-store__card__img t-store__card__img_second t-img"/>' : '<div class="t-store__card__bgimg_second t-bgimg" data-original="' + s + '" style="background-image:url(' + t_store_getLazyUrl(e, s) + ");" + n + '"></div>'
        }
    }
    return ""
}

function t_store_get_productCard_getImgStyles(t) {
    if (t.prodCard.borderRadius) {
        var e = parseInt(t.prodCard.borderRadius, 10);
        return "border-radius:" + e + "px " + e + "px 0px 0px; " + (e > 0 ? "top: -2px;" : "")
    }
    return ""
}

function t_store_get_productCard_mark_html(t, e) {
    if (!t.mark) return "";
    var r = "";
    r += e.markColor ? "color:" + e.markColor + ";" : "", r += e.markBgColor ? "background-color:" + e.markBgColor + ";" : "";
    var o = r ? 'style="' + r + '"' : "",
        s = "";
    return s += '<div class="t-store__card__mark-wrapper">', s += '    <div class="t-store__card__mark" ' + o + ">", s += "        " + t.mark, s += "    </div>", s += "</div>", s
}

function t_store_get_productCard_txtAndPrice_html(t, e, r, o) {
    var s = "",
        i = "" === o ? 'style="padding-top:0px;"' : "";
    return s += '        <div class="t-store__card__textwrapper" ' + i + ">", s += "            " + t_store_get_productCard_txt_html(t, e, r), Object.prototype.hasOwnProperty.call(r.price, "position") && "" != r.price.position || (s += t_store_get_productCard_Price_html(t, e, r)), s += "        </div>", s
}

function t_store_get_productCard_txt_html(t, e, r) {
    var o = "",
        s = "";
    if (Object.prototype.hasOwnProperty.call(r.price, "position") && "at" == r.price.position && (o += t_store_get_productCard_Price_html(t, e, r)), t.title) {
        s = 4 === parseInt(r.blocksInRow, 10) ? "t-name_xs" : 2 === parseInt(r.blocksInRow, 10) ? "t-name_xl" : "t-name_md";
        var i = 1 === t.editions.length ? 'field="st_title__' + e.uid + '" data-redactor-toolbar="no"' : "";
        o += '<div class="js-store-prod-name js-product-name t-store__card__title t-name ' + s + '" style="' + r.typo.title + '" ' + i + ">", o += t.title, o += "</div>"
    }
    if (Object.prototype.hasOwnProperty.call(r.price, "position") && "bt" == r.price.position && (o += t_store_get_productCard_Price_html(t, e, r)), e.sku) {
        var a = r.prodCard.showOpts ? "" : "display:none;",
            n = r.typo.descrColor ? "color:" + r.typo.descrColor + ";" : "",
            _ = 'style="' + a + n + '"',
            l = 1 === t.editions.length ? 'field="st_sku__' + e.uid + '" data-redactor-toolbar="no"' : "";
        o += '<div class="t-store__card__sku t-descr t-descr_xxs" ' + _ + ">", o += t_store_dict("sku") + ": ", o += '<span class="js-store-prod-sku js-product-sku" ' + l + ">", o += e.sku, o += "</span>", o += "</div>"
    }
    if (t.descr) {
        var d = 1 === t.editions.length ? 'field="st_descr__' + e.uid + '" data-redactor-toolbar="no"' : "";
        o += '<div class="js-store-prod-descr t-store__card__descr t-descr t-descr_xxs" style="' + r.typo.descr + '" ' + d + ">", o += "    " + t.descr, o += "</div>"
    }
    return o
}

function t_store_get_productCard_Price_html(t, e, r) {
    var o = "",
        s = "",
        i = t_store__getFormattedPriceRange(r, t);
    return Object.prototype.hasOwnProperty.call(r.price, "position") && ("at" == r.price.position ? s = " t-store__card__price-wrapper_above-title" : "bt" == r.price.position && (s = " t-store__card__price-wrapper_below-title")), o += '<div class="js-store-price-wrapper t-store__card__price-wrapper' + s + '">', o += "    " + t_store_get_productCard_onePrice_html(t, e, r, "current"), i || (o += "    " + t_store_get_productCard_onePrice_html(t, e, r, "old")), o += "    " + (0 === parseInt(e.quantity, 10) ? t_store_get_soldOutMsg_html() : ""), o += "</div>", o
}

function t_store_get_productCard_onePrice_html(t, e, r, o) {
    var s = "current" === o ? e.price : e.priceold,
        i = t_store__getFormattedPrice(r, s),
        a = t_store__getFormattedPriceRange(r, t);
    i = a || i;
    var n = "current" === o ? "price" : "priceold",
        _ = "",
        l = "current" === o ? "t-store__card__price" : "t-store__card__price_old",
        d = "",
        c = "",
        p = "current" === o ? r.price.color : r.price.colorOld;
    c += s && "0" !== s ? "" : "display: none;", c += p ? "color:" + p + ";" : "", c += r.price.fontSize ? "font-size:" + r.price.fontSize + ";" : "", c += r.price.fontWeight ? "font-weight:" + r.price.fontWeight + ";" : "", d = "" !== c ? 'style = "' + c + '"' : "";
    var u = 1 === t.editions.length ? 'field="st_' + n + "__" + e.uid + '" data-redactor-toolbar="no"' : "",
        f = r.currencyTxt ? '<div class="t-store__card__price-currency">' + r.currencyTxt + "</div>" : "",
        v = "current" === o ? "js-product-price js-store-prod-price-val" : "js-store-prod-price-old-val";
    return a && (v += " js-store-prod-price-range-val"), _ += '<div class="' + l + ' t-store__card__price-item t-name t-name_xs" ' + d + ">", a || (_ += "r" !== r.currencySide && f ? f : ""), _ += '<div class="' + v + ' t-store__card__price-value notranslate" translate="no" ' + u + ">" + i + "</div>", a || (_ += "r" === r.currencySide && f ? f : ""), t.portion > 0 && (_ += '<div class="t-store__prod__price-portion">/', "1" !== t.portion && (_ += +t.portion + " "), _ += t_store_dict(t.unit) + "</div>"), _ += "</div>", _
}

function t_store_get_productCard_btn_html(t, e, r, o, s, i) {
    if (!r.prodCard.btnTitle1 && !r.prodCard.btnTitle2) return "";
    var a, n, _ = "",
        l = "sm" === r.btnSize ? "t-btn_xs" : "t-btn_sm",
        d = "" !== e.quantity && parseInt(e.quantity, 10) <= 0,
        c = !d || d && "order" !== r.prodCard.btnLink1,
        p = !d || d && "order" !== r.prodCard.btnLink2;
    return _ += '<div class="t-store__card__btns-wrapper js-store-buttons-wrapper">', r.prodCard.btnTitle1 && c && (a = t_store_get_productCard_link(r.prodCard.btnLink1, t, o, s, i), n = t_store_get_productCard_targetAttr(r.prodCard.btnLink1, t), _ += '<a href="' + a + '" ' + n + ' class="js-store-prod-btn t-store__card__btn t-btn ' + l + '" style="' + r.btn1_style + '"><span class="t-store__card__btn-text">' + r.prodCard.btnTitle1 + "</span></a>"), r.prodCard.btnTitle2 && p && (a = t_store_get_productCard_link(r.prodCard.btnLink2, t, o, s, i), n = t_store_get_productCard_targetAttr(r.prodCard.btnLink2, t), _ += '<a href="' + a + '" ' + n + ' class="js-store-prod-btn2 t-store__card__btn t-store__card__btn_second t-btn ' + l + '" style="' + r.btn2_style + '"><span class="t-store__card__btn-text">' + r.prodCard.btnTitle2 + "</span></a>"), _ += "</div>", _
}

function t_store_get_productCard_link(t, e, r, o, s) {
    if (s[0]) {
        var i = $.contains($("#allrecords")[0], $(".t-store__product-snippet")[0]);
        if (i && "popup" === t) return t_store_generateUrl(e)
    }
    if ("order" === t) return "#order";
    if (r) {
        var a = e.buttonlink ? e.buttonlink : "#prodpopup";
        return a
    }
    if ("popup" === t) {
        if (e.buttonlink) {
            var n = e.buttonlink;
            return -1 === n.indexOf("//") && "/" !== n.slice(0, 1) && (n = "http://" + n), n
        }
        return "#prodpopup"
    }
    return "#prodpopup"
}

function t_store_get_productCard_targetAttr(t, e) {
    return "popup" === t && e.buttonlink && "_blank" === e.buttontarget ? 'target="_blank"' : ""
}

function t_store_get_horizSeparator_html(t) {
    var e = '<div class="t-clear t-store__grid-separator" [[style]]></div>';
    return e = e.replace("[[style]]", t.vindent ? 'style="margin-bottom:' + t.vindent + ';"' : ""), e
}

function t_store_unifyCardsHeights(t, e) {
    if (e.prodCard && e.prodCard.hasWrap) {
        var r = $("#rec" + t),
            o = r.find(".t-store__card"),
            s = t_store_unifyCardsHeights_getBlocksInRow(e, o);
        if ($(window).width() <= 480 && !e.isHorizOnMob) r.find(".t-store__card__wrap_txt-and-btns").css("height", "auto");
        else
            for (var i = 0; i < o.length; i += s) {
                var a = 0,
                    n = o.slice(i, i + s).find(".t-store__card__wrap_txt-and-btns");
                n.each(function() {
                    var t = $(this).find(".store__card__wrap_txt-and-opts"),
                        e = $(this).find(".t-store__card__btns-wrapper"),
                        r = t.outerHeight() + e.outerHeight();
                    r > a && (a = r)
                }), n.css("height", a)
            }
    }
}

function t_store_unifyCardsHeights_getBlocksInRow(t, e) {
    return $(window).width() <= 960 && t.isHorizOnMob ? e.length : $(window).width() <= 960 ? 2 : parseInt(t.blocksInRow, 10)
}

function t_store_get_soldOutMsg_html() {
    return '<div class="js-store-prod-sold-out t-store__card__sold-out-msg t-name t-name_xs">' + t_store_dict("soldOut") + "</div>"
}

function t_store_initPopup(t, e, r, o, s) {
    for (var i in o || window.localStorage.setItem("urlBeforePopupOpen", window.location.href), e) {
        var a = $("#rec" + t),
            n = o ? a.find(".js-product-relevant[data-product-gen-uid=" + i + "]") : a.find("[data-product-gen-uid=" + i + "]"),
            _ = n.find('[href^="#prodpopup"]');
        _.unbind();
        var l = n.closest(".js-product"),
            d = l.attr("data-product-gen-uid"),
            c = e[d];
        void 0 !== c && _.attr("href", c.url), _.click(function(i) {
            i.preventDefault(), l = $(this).closest(".js-product"), d = l.attr("data-product-gen-uid"), c = e[d];
            var a = i.ctrlKey,
                n = i.metaKey && -1 !== navigator.platform.indexOf("Mac");
            a || n ? window.open(c.url) : (s.header || s.footer) && s.disablepopup ? location.href = c.url : t_store_openProductPopup(t, r, c, o, !1, !!o)
        })
    }
    r.isPublishedPage && setTimeout(function() {
        t_store_checkUrl(r, t)
    }, 300), t_store_copyTypographyFromLeadToPopup(t, r)
}

function t_store_openProductPopup(t, e, r, o, s, i) {
    var a = $.contains($("#allrecords")[0], $(".t-store__product-snippet")[0]);
    a || t_store_open_popup_routing_init(t, e);
    var n = e.showRelevants,
        _ = $("#rec" + t),
        l = _.find(".t-popup");
    t_store_drawProdPopup(t, l, r, e, i), t_store_showPopup(t, s, i);
    var d = l.attr("data-track-popup");
    if (d > "") {
        var c = r.title;
        c || (c = "prod" + r.uid);
        try {
            Tilda && "function" == typeof Tilda.sendEcommerceEvent ? Tilda.sendEcommerceEvent("detail", [{
                id: "" + (r.id ? r.id : r.uid),
                uid: "" + r.uid,
                price: "" + (r.price_min ? r.price_min : r.price),
                sku: r.sku ? r.sku : "",
                name: r.title
            }]) : Tilda.sendEventToStatistics(d, c)
        } catch (t) {
            Tilda.sendEventToStatistics(d, c)
        }
    }
    if (e.isPublishedPage && !s && t_store_changeUrl(t, r, o, e), "973" === _.attr("data-record-type") ? t_slds_updateSlider(t + " .js-store-product") : t_slds_updateSlider(t), n && !a) {
        var p = {
                cc: "current_category",
                all: "all_categories"
            },
            u = p[n] || "category_" + n,
            f = "random",
            v = e.relevants_quantity || 4;
        t_store_loadProducts("relevants", t, e, !1, {
            currentProductUid: r.uid,
            relevantsQuantity: v,
            relevantsMethod: u,
            relevantsSort: f
        })
    }
    if ("y" !== window.lazy && "yes" !== $("#allrecords").attr("data-tilda-lazy") || t_store_popup_updLazyOnScroll(t), "both" === e.showStoreBtnQuantity || "popup" === e.showStoreBtnQuantity) {
        var h = $("#rec" + t + " .t-popup .js-store-product");
        t_store_addProductQuantity(t, h, r, e)
    }
    t_store_hoverZoom_init(t), setTimeout(function() {
        t_store_onFuncLoad("t_animate__setAnimationStateChains", function() {
            var t = $(".r").has(".t-animate[data-animate-chain=yes]");
            t_animate__setAnimationStateChains(t)
        })
    }, 300)
}

function t_store_addProductQuantity(t, e, r, o) {
    var s = e.find('.t-store__prod-popup__btn-wrapper a[href="#order"]:not(.t-store__prod-popup__btn_disabled)').first(),
        i = e.find('.t-store__card__btns-wrapper a[href="#order"]:not([style*="display: none"])').first(),
        a = parseInt(r.quantity, 10);
    if (isNaN(a) && void 0 !== r.editions) {
        var n = t_store_product_getFirstAvailableEditionData(r.editions);
        a = parseInt(n.quantity, 10)
    }
    if (0 === i.length && 0 === s.length || 0 == a || 1 == a || "" === o.showStoreBtnQuantity || void 0 === o.showStoreBtnQuantity) {
        var _ = e.find(".t-store__prod__quantity");
        return _.parent().removeClass("t-store__card__btns-wrapper--quantity"), void _.remove()
    }
    if ("list" === o.showStoreBtnQuantity && e.hasClass("t-store__card") || "popup" === o.showStoreBtnQuantity && e.hasClass("t-store__product-snippet") || "popup" === o.showStoreBtnQuantity && e.hasClass("t-store__product-popup") || "both" === o.showStoreBtnQuantity) {
        void 0 === o && (o = {});
        _ = e.find(".t-store__prod__quantity");
        var l = _.find(".t-store__prod__quantity-input");
        if (_.length < 1) {
            var d = "",
                c = o.btn1_style,
                p = "",
                u = "";
            if (e.hasClass("t-store__card") && (u = "", "sm" === o.btnSize && (u = "t-store__prod__quantity_xs")), "" !== c && void 0 !== c) {
                var f = c.indexOf("border-radius");
                if (-1 !== f) {
                    var v = c.slice(f).indexOf(";");
                    p = c.slice(f + 14, f + v)
                }
            }
            var h = "";
            "" !== p && (h = "border-radius:" + p + ";"), d += '<div class="t-store__prod__quantity ' + u + '" style="' + h + '">', d += '<div class="t-store__prod__quantity__minus-wrapper">', d += '<span class="t-store__prod__quantity__minus"></span>', d += "</div>", d += '<input class="t-store__prod__quantity-input t-descr t-descr_xxs" type="number" min="1" max="9999" step="1" value="1" size="4" maxlength="4" />', d += '<div class="t-store__prod__quantity__plus-wrapper">', d += '<span class="t-store__prod__quantity__plus"></span>', d += "</div>", d += "</div>", 1 === s.length ? s.before(d) : 1 === i.length && i.before(d), t_store_addProductQuantityEvents(e), _ = e.find(".t-store__prod__quantity"), l = _.find(".t-store__prod__quantity-input");
            var g = i.parent();
            g.addClass("t-store__card__btns-wrapper--quantity"), g.find('a:not([href^="#order"])').length > 0 && g.parent().is("div[class]") && g.wrap("<div></div>")
        } else {
            l.val(1), l.change();
            var m = l.val();
            isNaN(a) ? _.removeClass("t-store__prod-popup__btn_disabled") : a > 1 ? (_.removeClass("t-store__prod-popup__btn_disabled"), 0 === parseInt(m, 10) && l.val(1)) : _.addClass("t-store__prod-popup__btn_disabled")
        }
        isNaN(a) ? l.prop("max", 9999) : a > 0 && l.prop("max", a)
    }
}

function t_store_addProductQuantityEvents(t) {
    var e = t.find(".t-store__prod__quantity"),
        r = e.find(".t-store__prod__quantity-input");
    t.find(".t-store__prod__quantity__minus-wrapper").off("click"), t.find(".t-store__prod__quantity__minus-wrapper").on("click", function() {
        var t = parseInt(r.val(), 10) - 1;
        t = t < 1 ? 1 : t, r.val(t), r.change()
    }), t.find(".t-store__prod__quantity__plus-wrapper").off("click"), t.find(".t-store__prod__quantity__plus-wrapper").on("click", function() {
        var t = parseInt(r.val(), 10) + 1,
            e = r.prop("max") || 999;
        t = t > e ? e : t, r.val(t), r.change()
    }), t.find(".t-store__prod__quantity-input").off("change"), t.find(".t-store__prod__quantity-input").on("change", function() {
        var t = r.prop("max") || 999,
            e = parseInt(r.val() || 1, 10);
        e < 1 || isNaN(e) ? r.val(1) : e > t ? r.val(t) : r.val(e)
    })
}

function t_store_open_popup_routing_init(t, e) {
    window.onpopstate = function() {
        if (window.history.state)
            if (window.history.state.productData) {
                var r = window.history.state.productData,
                    o = r.recid,
                    s = r.opts,
                    i = r.productObj,
                    a = r.isRelevantsShow;
                t_store_openProductPopup(o, s, i, a, !0)
            } else t_store_closePopup(!0, t, e);
        else t_store_closePopup(!0, t, e)
    }
}

function t_store_popup_updLazyOnScroll(t) {
    var e = $("#rec" + t + " .t-popup"),
        r = $(".t-records").attr("data-tilda-mode");
    e.length && "edit" != r && "preview" != r && e.bind("scroll", t_throttle(function() {
        "y" !== window.lazy && "yes" !== $("#allrecords").attr("data-tilda-lazy") || t_store_onFuncLoad("t_lazyload_update", function() {
            t_lazyload_update()
        })
    }, 1e3))
}

function t_store_changeUrl(t, e, r, o) {
    var s, i = window.location.href,
        a = {
            productObj: e,
            opts: o,
            isRelevantsShow: r,
            recid: t
        },
        n = document.title + " – " + e.title;
    i.indexOf("/tproduct/") < 0 && i.indexOf("%2Ftproduct%2F") < 0 ? (s = t_store_generateUrl(e), t_store_history_pushState({
        productData: a
    }, n, s)) : r && (s = t_store_generateUrl(e), t_store_history_pushState({
        productData: a
    }, n, s))
}

function t_store_generateUrl(t) {
    var e, r = window.location.protocol,
        o = window.location.host;
    e = t.url.split("://")[1], e = e.split("/"), e.shift(), e = e.join("/");
    var s = r + "//" + o + "/" + e;
    return s
}

function t_store_drawProdPopup(t, e, r, o, s) {
    $(e).scrollTop(0);
    var i = e.find(".js-store-product.js-product");
    i.data("cardSize", "large"), t_store_drawProdPopup_drawGallery(t, e, r, o), e.find(".js-store-product").data("def-pack-obj", ""), e.find(".js-store-product").attr("data-product-lid", r.uid).attr("data-product-uid", r.uid).attr("data-product-gen-uid", r.uid), r.title ? e.find(".js-store-prod-name").html(r.title).show() : e.find(".js-store-prod-name").html("").hide();
    var a = [];
    try {
        a = JSON.parse(r.partuids)
    } catch (t) {}
    if (void 0 !== o.linksSizeChart && a.length > 0) {
        for (var n = "", _ = [], l = 0; l < a.length; l++) {
            var d = a[l];
            void 0 !== o.linksSizeChart[d] && void 0 !== o.linksSizeChart[d].infotext && void 0 !== o.linksSizeChart[d].infourl && -1 === _.indexOf(o.linksSizeChart[d].infourl) && (n += '    <div class="t-store__prod-popup__link t-descr t-descr_xxs">', n += '        <a href="' + o.linksSizeChart[d].infourl.replace(/"/g, "&quot;") + '" target="_blank">', n += "            " + o.linksSizeChart[d].infotext, n += "        </a>", n += "    </div>", _.push(o.linksSizeChart[d].infourl))
        }
        e.find(".t-store__prod-popup__links-wrapper").html(n)
    } else e.find(".t-store__prod-popup__links-wrapper").html("");
    t_store_initTextAndCharacteristics(e, r), o.tabs && "" !== o.tabs && t_store_tabs_init(t, o, r, i, e), t_store_addProductOptions(t, r, i, o), t_store_option_handleOnChange_custom(t, i, o), t_prod__initProduct(t, i), s && $(window).unbind("resize", window.t_store_prodPopup_updateGalleryThumbsEvent), window.t_store_prodPopup_updateGalleryThumbsEvent = function() {
        t_store_prodPopup_updateGalleryThumbs(t, e, r, o)
    }, $(window).bind("resize", window.t_store_prodPopup_updateGalleryThumbsEvent)
}

function t_store_initTextAndCharacteristics(t, e) {
    var r = $.contains($("#allrecords")[0], $(".t-store__product-snippet")[0]),
        o = t.find(".js-store-prod-text");
    o.empty().hide();
    var s = e.pack_label || "",
        i = parseInt(e.pack_m, 10) || 0,
        a = parseInt(e.pack_x, 10) || 0,
        n = parseInt(e.pack_y, 10) || 0,
        _ = parseInt(e.pack_z, 10) || 0,
        l = e.url || "",
        d = s && a && n && _,
        c = i,
        p = e.characteristics && e.characteristics.length > 0 || d || c,
        u = !0,
        f = p,
        v = t.find('.t-store__tabs__item[data-tab-type="text"]'),
        h = t.find('.t-store__tabs__item[data-tab-type="chars"]');
    v.length && (u = !1), h.length && (f = !1);
    var g = '<div class="js-store-prod-all-text"' + (u ? "" : ' style="display: none;"') + ">";
    g += e.text ? e.text : e.descr ? e.descr : "", g += "</div>";
    var m = u ? "margin-top: 20px;" : "";
    m += f ? "" : "display: none;";
    var b = '<div class="js-store-prod-all-charcs"' + (m.length ? ' style="' + m + '"' : "") + ">";
    if (p && e.characteristics.forEach(function(t) {
            b += '<p class="js-store-prod-charcs">' + t.title + ": " + t.value + "</p>"
        }), b += '<p class="js-store-prod-dimensions"></p>', b += '<p class="js-store-prod-weight"></p>', b += "</div>", o.append(g), o.append(b), o.show(), r && h.length) {
        var w = h.find(".t-store__tabs__content");
        w.empty(), w.append(b), w.find(".js-store-prod-all-charcs").show(), w.find(".js-store-prod-all-charcs").css("margin-top", "0")
    }
    if (d) {
        var y = a + "x" + n + "x" + _;
        t.find(".js-store-prod-dimensions").html(t_store_dict("product-" + s) + ": " + y + "&nbsp;" + t_store_dict("mm")), r && (h.find(".js-store-prod-dimensions").html(t_store_dict("product-" + s) + ": " + y + "&nbsp;" + t_store_dict("mm")), t.attr("data-product-pack-label", s), t.attr("data-product-pack-x", a), t.attr("data-product-pack-y", n), t.attr("data-product-pack-z", _))
    }
    c && (t.find(".js-store-prod-weight").html(t_store_dict("product-weight") + ": " + i + "&nbsp;" + t_store_dict("g")), r && (h.find(".js-store-prod-weight").html(t_store_dict("product-weight") + ": " + i + "&nbsp;" + t_store_dict("g")), t.attr("data-product-pack-m", i))), t.find(".js-store-product").attr("data-product-pack-label", s).attr("data-product-pack-m", i).attr("data-product-pack-x", a).attr("data-product-pack-y", n).attr("data-product-pack-z", _), t.find(".js-store-product").attr("data-product-url", l)
}

function t_store_addProductOptions(t, e, r, o) {
    var s = r.find(".js-product-controls-wrapper");
    s.html("");
    var i = $.contains($("#allrecords")[0], $(".t-store__product-snippet")[0]),
        a = t_store_product_getFirstAvailableEditionData(e.editions);
    t_store_product_initEditions(t, e, r, o);
    var n = {
            name: e.prod_option,
            values: e.prod_variants
        },
        _ = {
            name: e.prod_option2,
            values: e.prod_variants2
        },
        l = {
            name: e.prod_option3,
            values: e.prod_variants3
        },
        d = {
            name: e.prod_option4,
            values: e.prod_variants4
        },
        c = {
            name: e.prod_option5,
            values: e.prod_variants5
        };
    t_store_product_addOneOptionsControl("modificator", n, s, o, a, t), t_store_product_addOneOptionsControl("modificator", _, s, o, a, t), t_store_product_addOneOptionsControl("modificator", l, s, o, a, t), t_store_product_addOneOptionsControl("modificator", d, s, o, a, t), t_store_product_addOneOptionsControl("modificator", c, s, o, a, t), i && t_store_option_handleOnChange_custom(t, r, o)
}

function t_store_get_control_option_html(t) {
    var e = "",
        r = "",
        o = "",
        s = t.typo && t.typo.descrColor ? t.typo.descrColor : "";
    return o += "" !== s ? "color:" + s + ";" : "", r = "" !== o ? 'style = "' + o + '"' : "", e += '<div class="js-product-option t-product__option">', e += '    <div class="js-product-option-name t-product__option-title t-descr t-descr_xxs" ' + r + ">[[name]]</div>", e += '    <div class="t-product__option-variants t-product__option-variants_regular"> <select class="js-product-option-variants t-product__option-select t-descr t-descr_xxs"> [[optiontags]] </select> </div>', e += "</div>", e
}

function t_store_get_control_editionOption_html(t, e) {
    var r, o = "",
        s = "",
        i = "",
        a = t.typo && t.typo.descrColor ? t.typo.descrColor : "";
    s += "" !== a ? "color:" + a + ";" : "", r = "" !== s ? 'style = "' + s + '"' : "";
    var n = t_store_option_checkIfCustom(e),
        _ = n ? ' style="display: none;"' : "";
    return e.params && (e.params.view && (i += ' data-view-type="' + e.params.view + '"'), e.params.hasColor ? i += ' data-option-type="color"' : i += ' data-option-type="regular"'), o += '<div class="js-product-edition-option t-product__option" data-edition-option-id="[[id]]"' + i + ">", o += '    <div class="js-product-edition-option-name t-product__option-title t-descr t-descr_xxs" ' + r + ">[[name]]</div>", o += '    <div class="t-product__option-variants t-product__option-variants_regular"' + _ + '> <select class="js-product-edition-option-variants t-product__option-select t-descr t-descr_xxs"> [[optiontags]] </select> </div>', o += "</div>", o
}

function t_store_option_styleCustomControl(t, e, r, o, s) {
    var i = "",
        a = o.find('.js-product-edition-option[data-edition-option-id="' + r.id + '"]'),
        n = r.params && "select" === r.params.view,
        _ = r.params && r.params.hasColor && !r.params.linkImage,
        l = r.params && r.params.linkImage,
        d = r.values[0],
        c = t_store_option_getClassModificator(r, "select", "t-product__option-variants"),
        p = t_store_option_getClassModificator(r, "select", "t-product__option-item"),
        u = t_store_option_getClassModificator(r, "select", "t-product__option-input"),
        f = t_store_option_getClassModificator(r, "select", "t-product__option-checkmark"),
        v = t_store_option_getClassModificator(r, "select", "t-product__option-title");
    if (n) {
        var h = t_store_option_getClassModificator(r, "select", "t-product__option-selected");
        if (i += '<div class="t-product__option-selected ' + h + ' t-descr t-descr_xxs">', _) {
            var g = ' style="background-color: ' + t_store_option_getColorValue(r.valuesObj, d) + ';"';
            i += '    <span class="t-product__option-selected-checkmark"' + g + "></span>"
        } else if (l) {
            var m = r.values[0],
                b = r.imagesObj[m],
                w = t_store_getLazyUrl(e, b),
                y = w ? " style=\"background-image: url('" + w + "');\"" : "";
            i += '    <div class="t-product__option-selected-checkmark t-bgimg" data-original="' + b + '"' + y + "></div>"
        }
        i += '        <span class="t-product__option-selected-title">' + d + "</span>", i += "</div>", c += " t-product__option-variants_hidden"
    }
    i += '<form class="t-product__option-variants t-product__option-variants_custom ' + c + '">';
    for (var x = 0; x < r.values.length; x++) {
        m = r.values[x];
        var C = s[r.name] === m,
            k = C ? " checked" : "",
            j = C ? " t-product__option-item_active " : "",
            P = _ ? ' style="background-color: ' + t_store_option_getColorValue(r.valuesObj, m) + ';"' : "";
        if (i += '<label class="t-product__option-item ' + j + p + '">', i += '    <input class="t-product__option-input ' + u + '" type="radio" name="' + r.name + '" value="' + t_store_escapeQuote(m) + '"' + k + ">", l && r.imagesObj) {
            b = r.imagesObj[m], w = t_store_getLazyUrl(e, b);
            P = w ? " style=\"background-image: url('" + w + "');\"" : "", i += '    <div class="t-product__option-checkmark t-bgimg ' + f + '"' + P + ' data-original="' + b + '"></div>'
        } else i += '    <div class="t-product__option-checkmark ' + f + '"' + P + "></div>";
        i += '    <span class="t-product__option-title ' + v + ' t-descr t-descr_xxs">' + m + "</span>", i += "</label>"
    }
    i += "</form>", a.append(i)
}

function t_store_option_getColorValue(t, e) {
    var r = "#ffffff";
    for (var o in t) {
        var s = t[o];
        if (s.value === e) {
            r = s.color;
            break
        }
    }
    return r
}

function t_store_option_getClassModificator(t, e, r) {
    if (!t) return "";
    var o = t.params,
        s = r + "_" + o.view;
    return o.hasColor && o.linkImage ? "filter" === e ? (s = r + "_buttons", s += " " + r + "_color") : s += " " + r + "_image" : o.hasColor ? s += " " + r + "_color" : o.linkImage ? s += " " + r + "_image" : s += " " + r + "_simple", s
}

function t_store_checkUrl(t, e) {
    var r = window.location.href,
        o = r.indexOf("/tproduct/");
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && o < 0 && (o = r.indexOf("/tproduct/"), o < 0 && (o = r.indexOf("%2Ftproduct%2F"))), o >= 0) {
        r = r.substring(o, r.length);
        var s = r.split("-");
        if (void 0 === s[1]) return;
        var i = s[1],
            a = $("#rec" + e),
            n = a.find(".js-store-grid-cont [data-product-gen-uid=" + i + "]"),
            _ = a.find(".t-popup");
        if (r.indexOf(e) >= 0 && n.length) _.hasClass("t-popup_show") || a.find("[data-product-gen-uid=" + i + '] [href^="#prodpopup"]').triggerHandler("click");
        else if (r.indexOf(e) >= 0) {
            if (_.hasClass("t-popup_show")) return;
            var l = $.contains($("#allrecords")[0], $(".t-store__product-snippet")[0]);
            l || t_store_loadOneProduct(e, t, i).then(function(r) {
                if ("string" == typeof r && "{" == r.substr(0, 1)) {
                    try {
                        var o = jQuery.parseJSON(r),
                            s = o.product
                    } catch (t) {
                        console.log(r)
                    }
                    if ("" === s) return void console.log("Can't get product with uid = " + i + " in storepart = " + t.storepart);
                    t_store_openProductPopup(e, t, s)
                } else console.log("Can't get product with uid = " + i + " in storepart = " + t.storepart)
            })
        }
    }
}

function t_store_showPopup(t, e, r) {
    var o = $("#rec" + t),
        s = o.find(".t-popup");
    t_store_resetNavStyles(t), $("body").addClass("t-body_popupshowed").trigger("popupShowed"), s.css("display", "block");
    var i = document.querySelector("#rec" + t + " .t-popup").scrollHeight > document.documentElement.clientHeight;
    i || s.css("overflow", "hidden"), setTimeout(function() {
        s.find(".t-popup__container").addClass("t-popup__container-animated"), s.addClass("t-popup_show"), "y" !== window.lazy && "yes" !== $("#allrecords").attr("data-tilda-lazy") || t_store_onFuncLoad("t_lazyload_update", function() {
            t_lazyload_update()
        }), i || setTimeout(function() {
            s.css("overflow", "auto")
        }, 300)
    }, 50), r || addPopupEvents(o, t)
}

function addPopupEvents(t) {
    t.find(".t-popup").off("click"), t.find(".t-popup").on("click", function(t) {
        t.target == this && t_store_closePopup(!1)
    }), t.find(".t-popup__close, .js-store-close-text").off("click"), t.find(".t-popup__close, .js-store-close-text").on("click", function() {
        t_store_closePopup(!1)
    }), $(document).keydown(function(t) {
        27 == t.keyCode && t_store_closePopup(!1)
    }), t.find(".t-popup").off("scroll"), t_store_addEvent_scrollNav(t.find(".t-popup"))
}

function t_store_addEvent_scrollNav(t) {
    t.off("scroll");
    var e = 30,
        r = 200,
        o = t.find(".t-popup__close-opacity-scroll");
    o.length && t.on("scroll", function() {
        var s = t.scrollTop(),
            i = 0;
        i = s >= r ? 1 : s <= e ? 0 : s / r, o.css("background-color", "rgba(255,255,255," + i + ")")
    })
}

function t_store_resetNavStyles(t) {
    var e = $("#rec" + t).find(".t-popup__close");
    e.hasClass("t-popup__close-solid") ? e.css("background-color", "rgba(255,255,255,1)") : e.hasClass("t-popup__close-opacity-scroll") && e.css("background-color", "rgba(255,255,255,0)")
}

function t_store_closePopup(t, e, r) {
    var o, s, i, a = $.contains($("#allrecords")[0], $(".t-store__product-snippet")[0]);
    if (a || t_store_closePopup_routing(), $(".t-popup").removeClass("t-popup_show"), setTimeout(function() {
            $("body").removeClass("t-body_popupshowed").trigger("popupHidden")
        }, 300), t)
        if (t_store_isQueryInAddressBar("tstore")) {
            var n, _ = decodeURI(window.location.hash).split("/"),
                l = _.indexOf("c") + 1,
                d = _.indexOf("r") + 1,
                c = _[d];
            n = -1 != _[l].indexOf("-") ? _[l].slice(0, _[l].indexOf("-")) : _[l], o = window.history.state.opts, o.storepart = n, t_store_isStorepartFromHistoryActive(n, e, r) || t_store_loadProducts("", c, o)
        } else t_store_isStorepartFromHistoryActive(r.storepart, e, r) || t_store_loadProducts("", e, r);
    else window.history.state && window.history.state.productData && (i = window.localStorage.getItem("urlBeforePopupOpen"), s = window.history.state.productData, n = s.opts.storepart, r = s.opts, e = s.recid, t_store_history_pushState({
        storepartuid: n,
        opts: r,
        recid: e
    }, null, i));
    t_store_setActiveStorePart(e, r), t_store_galleryVideoClearFrame(e), setTimeout(function() {
        $(".t-popup").scrollTop(0), $(".t-popup").not(".t-popup_show").css("display", "none")
    }, 300), $(document).unbind("keydown"), $(window).unbind("resize", window.t_store_prodPopup_updateGalleryThumbsEvent)
}

function t_store_isStorepartFromHistoryActive(t, e, r) {
    var o = $("#rec" + e);
    if (r && !r.storePartsArr) return !0;
    if (!t) return !1;
    t = parseInt(t, 10);
    var s = o.find(".js-store-parts-switcher.t-active").data("storepartUid");
    return s === t
}

function t_store_closePopup_routing() {
    window.onpopstate = function() {
        if (window.history.state) {
            if (window.history.state.productData) {
                var t = window.history.state.productData,
                    e = t.recid,
                    r = t.opts,
                    o = t.productObj,
                    s = t.isRelevantsShow;
                t_store_openProductPopup(e, r, o, s, !0)
            }
            if (window.history.state.storepartuid) {
                var i = window.history.state.opts,
                    a = window.history.state.recid;
                r.isPublishedPage = !0, t_store_loadProducts("", a, i)
            }
        }
    }
}

function t_store_copyTypographyFromLeadToPopup(t, e) {
    var r = $("#rec" + t),
        o = r.find(".js-store-grid-cont .js-store-prod-name").attr("style"),
        s = r.find(".js-store-grid-cont .js-store-prod-descr").attr("style");
    void 0 === s && "" != e.typo.descr && (s = e.typo.descr), r.find(".t-popup .js-store-prod-name").attr("style", t_store_removeSizesFromStylesLine(o)), r.find(".t-popup .js-store-prod-text").attr("style", t_store_removeSizesFromStylesLine(s))
}

function t_store_removeSizesFromStylesLine(t) {
    if (void 0 !== t && (t.indexOf("font-size") >= 0 || t.indexOf("padding-top") >= 0 || t.indexOf("padding-bottom") >= 0)) {
        var e = t.split(";");
        t = "";
        for (var r = 0; r < e.length; r++) e[r].indexOf("font-size") >= 0 || e[r].indexOf("padding-top") >= 0 || e[r].indexOf("padding-bottom") >= 0 ? (e.splice(r, 1), r--) : "" != e[r] && (t += e[r] + ";")
    }
    return t
}

function t_store_drawProdPopup_drawTabs(t, e, r) {
    var o = $("#rec" + t),
        s = o.find(".t-popup .js-product"),
        i = "",
        a = e.tabs,
        n = "accordion" === a,
        _ = !n && r[0] ? r[0] : null,
        l = t_store_getCustomColors(e),
        d = l.descrColor ? ' style="color: ' + l.descrColor + ';"' : "",
        c = l.titleColor ? ' style="color: ' + l.titleColor + ';"' : "";
    i += '<div class="t-store__tabs t-store__tabs_' + a + ' t-col t-col_12" data-tab-design="' + a + '"' + (_ ? ' data-active-tab="' + _.title + '"' : "") + ">", i += '<div class="t-store__tabs__controls-wrap">', i += '    <div class="t-store__tabs__controls">', n || (i += t_store_tabs_fade_getStyle(e), i += t_store_tabs_tabBorder_getStyle(t, e)), r.forEach(function(t, e) {
        i += '<div class="t-store__tabs__button js-store-tab-button' + (0 !== e || n ? " " : " t-store__tabs__button_active") + '" data-tab-title="' + t_store_escapeQuote(t.title) + '">', i += '    <div class="t-store__tabs__button-title t-name t-name_xs"' + c + ">", i += t.title, i += "    </div>", i += "</div>"
    }), i += "    </div>", i += "</div>", i += '    <div class="t-store__tabs__list">', n && (i += t_store_tabs_accordionBorder_getStyle(t, e)), r.forEach(function(r, o) {
        var a = t_store_drawProdPopup_getSingleTabData(r, s, e);
        i += '        <div class="t-store__tabs__item' + (0 !== o || n ? " " : " t-store__tabs__item_active") + '" data-tab-title="' + t_store_escapeQuote(r.title) + '" data-tab-type="' + r.type + '">', i += '            <div class="t-store__tabs__item-button js-store-tab-button" data-tab-title="' + t_store_escapeQuote(r.title) + '">', i += '                <div class="t-store__tabs__item-title t-name t-name_xs"' + c + ">", i += r.title, i += "                </div>", n && (i += t_store_tabs_closeIcon_getHtml(t, e)), i += "            </div>", i += '            <div class="t-store__tabs__content t-descr t-descr_xxs"' + d + ">", i += a, i += "            </div>", i += "        </div>"
    }), i += "    </div>", i += "</div>";
    var p = s.find(".t-store__tabs");
    p.length ? p.replaceWith(i) : s.append(i)
}

function t_store_getCustomColors(t) {
    var e, r, o, s = t.typo && t.typo.descrColor ? t.typo.descrColor : null,
        i = t.typo && t.typo.titleColor ? t.typo.titleColor : null,
        a = t.popup_opts.containerBgColor && t.popup_opts.containerBgColor.length ? t.popup_opts.containerBgColor : "#ffffff",
        n = t_store_hexToRgb(a),
        _ = "rgba(" + n.join(",") + ",1)",
        l = "rgba(" + n.join(",") + ",0)";
    i = t.typo && t.typo.titleColor ? t.typo.titleColor : null, s = t.typo && t.typo.descrColor ? t.typo.descrColor : null;
    return i && (e = t_store_hexToRgb(i), r = "rgba(" + e.join(",") + ",1)", o = "rgba(" + e.join(",") + ",0.3)"), {
        descrColor: s,
        titleColor: i,
        titleColorRgb: e,
        borderActiveColor: r,
        borderPassiveColor: o,
        bgColor: a,
        bgColorRgb: n,
        fadeColorTo: _,
        fadeColorFrom: l
    }
}

function t_store_tabs_fade_getStyle(t) {
    var e = "",
        r = t_store_getCustomColors(t),
        o = "background-image:linear-gradient(to right," + r.fadeColorTo + " 0%, " + r.fadeColorFrom + " 90%)",
        s = "background-image:linear-gradient(to right," + r.fadeColorFrom + " 0%, " + r.fadeColorTo + " 90%)";
    return e += "<style>", e += "    .t-store__tabs__controls-wrap:before, .t-store__tabs__controls-wrap:after {\n", e += "        display: none;\n", e += "        z-index: 1;\n", e += "        position: absolute;\n", e += '        content: "";\n', e += "        width: 50px;\n", e += "        bottom: 1px;\n", e += "        top: 0;\n", e += "        pointer-events: none;\n", e += "    }\n", e += "    .t-store__tabs__controls-wrap_left:before {\n", e += o + ";\n", e += "        left: -1px;\n", e += "    }\n", e += "    .t-store__tabs__controls-wrap_right:after {\n", e += s + ";\n", e += "        right: -2px;\n", e += "    }\n", e += "    .t-store__tabs__controls-wrap_left:before {\n", e += "        display: block;\n", e += "    }\n", e += "    .t-store__tabs__controls-wrap_right:after {\n", e += "        display: block;\n", e += "    }\n", e += "</style>", e
}

function t_store_tabs_tabBorder_getStyle(t, e) {
    var r = "",
        o = t_store_getCustomColors(e);
    return o.borderActiveColor && o.borderPassiveColor && (r += "<style>", r += "@media screen and (max-width:560px) {\n", r += "    #rec" + t + " .t-store .t-store__tabs__controls .t-store__tabs__button.t-store__tabs__button_active {\n", r += "        border-bottom: 1px solid " + o.borderPassiveColor + ";\n", r += "    }\n", r += "    #rec" + t + " .t-store .t-store__tabs__controls .t-store__tabs__button_active .t-store__tabs__button-title:after {\n", r += "        border-bottom: 1px solid " + o.borderActiveColor + ";\n", r += "    }\n", r += "}\n", r += "    #rec" + t + " .t-store .t-store__tabs .t-store__tabs__button {\n", r += "        border-bottom: 1px solid " + o.borderPassiveColor + ";\n", r += "    }\n", r += "    #rec" + t + " .t-store .t-store__tabs__controls .t-store__tabs__button_active, \n", r += "    #rec" + t + " .t-store .t-store__tabs__controls .t-store__tabs__button:hover, \n", r += "    #rec" + t + " .t-store .t-store__tabs_snippet .t-store__tabs__controls .t-store__tabs__button:first-child {\n", r += "        border-bottom: 1px solid " + o.borderActiveColor + ";\n", r += "    }\n", r += "</style>"), r
}

function t_store_tabs_accordionBorder_getStyle(t, e) {
    var r = "",
        o = t_store_getCustomColors(e);
    return o.borderActiveColor && o.borderPassiveColor && (r += "<style>", r += "    #rec" + t + " .t-store .t-store__tabs.t-store__tabs_accordion .t-store__tabs__item-button {\n", r += "        border-top: 1px solid " + o.borderActiveColor + ";\n", r += "    }\n", r += "    #rec" + t + " .t-store .t-store__tabs_accordion .t-store__tabs__item-button:not(.t-store__tabs__item-button_active) {\n", r += "        border-bottom: 1px solid " + o.borderActiveColor + ";\n", r += "    }\n", r += "</style>"), r
}

function t_store_tabs_closeIcon_getHtml(t, e) {
    var r = "",
        o = t_store_getCustomColors(e),
        s = o.borderActiveColor ? o.borderActiveColor : "#222222";
    return r += '<div class="t-store__tabs__close">', o.borderPassiveColor && (r += "<style>", r += "    #rec" + t + " .t-store .t-store__tabs__close:after {\n", r += "        background-color: " + o.borderPassiveColor + ";\n", r += "    }\n", r += "</style>"), r += '    <svg class="t-store__tabs__close-icon" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">', r += '        <g stroke="none" stroke-width="1px" fill="none" fill-rule="evenodd" stroke-linecap="square">', r += '        <g transform="translate(1.000000, 1.000000)" stroke="' + s + '">', r += '            <path d="M0,11 L22,11"></path>', r += '            <path d="M11,0 L11,22"></path>', r += "        </g>", r += "        </g>", r += "    </svg>", r += "</div>", r
}

function t_store_drawProdPopup_getSingleTabData(t, e, r) {
    return t && "object" == typeof t ? "info" === t.type || "template" === t.type ? t_store_addLazyLoadToHtml(r, t.data) : "text" === t.type ? e.find(".js-store-prod-all-text").html() : "chars" === t.type ? e.find(".js-store-prod-all-charcs").html() : void 0 : null
}

function t_store_addLazyLoadToHtml(t, e) {
    if (!t.isPublishedPage || "y" !== window.lazy || "yes" !== $("#allrecords").attr("data-tilda-lazy")) return e;
    var r = $("<div></div>").append(e);
    return r.find("img").each(function() {
        var t = $(this),
            e = t.attr("src");
        if (t.addClass("t-img"), -1 == e.indexOf(".tildacdn.com") || e.indexOf("-/empty/") > 0 || e.indexOf("-/resize/") > 0);
        else {
            var r = e.split("/");
            r.splice(e.split("/").length - 1, 0, "-/empty");
            var o = r.join("/");
            t.attr("src", o), t.attr("data-original", e)
        }
    }), r.html()
}

function t_store_drawProdPopup_drawGallery(t, e, r, o) {
    var s, i = $("#rec" + t);
    if (r.gallery)
        if (s = "string" == typeof r.gallery ? jQuery.parseJSON(r.gallery) : r.gallery, 0 !== s.length) {
            var a, n, _ = t_store_get_productcard_slider_html(i, o),
                l = _,
                d = "",
                c = "",
                p = "thumbs" === o.slider_opts.controls || "arrowsthumbs" === o.slider_opts.controls || "dots" === o.slider_opts.controls || "" === o.slider_opts.controls,
                u = "thumbs" === o.slider_opts.controls || "arrowsthumbs" === o.slider_opts.controls,
                f = parseInt(o.popup_opts.columns, 10),
                v = +o.slider_slidesOpts.ratio,
                h = 60,
                g = 10;
            $.each(s, function(t, e) {
                var r = t_store_get_productcard_oneSlide_html(o, e);
                if (d += r.replace("[[activeClass]]", 0 === t ? "t-slds__item_active" : "").replace("[[productClass]]", 0 === t ? "js-product-img" : "").replace(/\[\[index\]\]/g, t + 1).replace(/\[\[imgsource_lazy\]\]/g, t_store_getLazyUrl(o, e.img)).replace(/\[\[imgsource\]\]/g, e.img), p)
                    if (u && "l" == o.sliderthumbsside) {
                        var i = t_store_prodPopup_gallery_calcMaxThumbsCount(f, v, h, g);
                        t <= i - 1 && (t <= i - 2 || t === s.length - 1 ? (a = t_store_get_productcard_oneSliderBullet_html(o), n = a.replace("[[activeClass]]", 0 === t ? "t-slds__bullet_active" : "").replace(/\[\[index\]\]/g, t + 1).replace(/\[\[imgsource_lazy\]\]/g, t_store_getLazyUrl(o, e.img)).replace(/\[\[imgsource\]\]/g, e.img)) : (a = t_store_get_productcard_thumbsGallery_html(o, s.length, i), n = a.replace("[[activeClass]]", 0 === t ? "t-slds__bullet_active" : "").replace(/\[\[index\]\]/g, t + 1).replace(/\[\[imgsource_lazy\]\]/g, t_store_getLazyUrl(o, e.img)).replace(/\[\[imgsource\]\]/g, e.img)), c += n)
                    } else a = t_store_get_productcard_oneSliderBullet_html(o), n = a.replace("[[activeClass]]", 0 === t ? "t-slds__bullet_active" : "").replace(/\[\[index\]\]/g, t + 1).replace(/\[\[imgsource_lazy\]\]/g, t_store_getLazyUrl(o, e.img)).replace(/\[\[imgsource\]\]/g, e.img), c += n
            }), l = l.replace("[[slides]]", d), p && (l = l.replace("[[bullets]]", c)), e.find(".js-store-prod-slider").html(l), t_store_galleryVideoHandle(t);
            var m, b = ".t-slds__arrow_container, .t-slds__bullet_wrapper, .t-slds__thumbsbullet-wrapper";
            1 === s.length ? e.find(b).hide() : e.find(b).show(), "l" == o.sliderthumbsside && (m = {
                thumbsbulletGallery: !0,
                storeOptions: o
            }), t_store_onFuncLoad("t_sldsInit", function() {
                t_sldsInit(t + " .js-store-product", m)
            })
        } else e.find(".js-store-prod-slider").html("");
    else e.find(".js-store-prod-slider").html("")
}

function t_store_galleryVideoHandle(t) {
    var e, r = $("#rec" + t),
        o = r.find(".t-slds__play_icon");
    o.click(function() {
        "youtube.com" == $(this).attr("data-slider-video-type") && (e = $(this).attr("data-slider-video-url"), $(this).next().html('<iframe class="t-slds__frame" width="100%" height="100%" src="https://www.youtube.com/embed/' + e + '?autoplay=1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')), "vimeo.com" == $(this).attr("data-slider-video-type") && (e = $(this).attr("data-slider-video-url"), $(this).next().html('<iframe class="t-slds__frame" width="100%" height="100%" src="https://player.vimeo.com/video/' + e + '" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>')), $(this).next().css("z-index", "3")
    }), r.on("updateSlider", function() {
        t_store_galleryVideoClearFrame(t)
    })
}

function t_store_galleryVideoClearFrame(t) {
    var e = $("#rec" + t),
        r = e.find(".t-slds__frame-wrapper");
    r && r.html("").css("z-index", "")
}

function t_store_prodPopup_updateGalleryThumbs(t, e, r, o) {
    var s, i = $("#rec" + t),
        a = "thumbs" === o.slider_opts.controls || "arrowsthumbs" === o.slider_opts.controls;
    if (!a && "l" === o.sliderthumbsside && r.gallery)
        if (s = "string" == typeof r.gallery ? jQuery.parseJSON(r.gallery) : r.gallery, 0 !== s.length) {
            var n, _, l, d = parseInt(o.popup_opts.columns, 10),
                c = +o.slider_slidesOpts.ratio,
                p = 60,
                u = 10,
                f = i.find(".t-slds__thumbsbullet").length,
                v = t_store_prodPopup_gallery_calcMaxThumbsCount(d, c, p, u);
            if (f !== v && s.length >= v || f < v && f !== s.length) {
                $.each(s, function(t, e) {
                    t <= v - 1 && (t <= v - 2 || t === s.length - 1 ? (_ = t_store_get_productcard_oneSliderBullet_html(o), l = _.replace("[[activeClass]]", 0 === t ? "t-slds__bullet_active" : "").replace(/\[\[index\]\]/g, t + 1).replace(/\[\[imgsource_lazy\]\]/g, t_store_getLazyUrl(o, e.img)).replace(/\[\[imgsource\]\]/g, e.img)) : (_ = t_store_get_productcard_thumbsGallery_html(o, s.length, v), l = _.replace("[[activeClass]]", 0 === t ? "t-slds__bullet_active" : "").replace(/\[\[index\]\]/g, t + 1).replace(/\[\[imgsource_lazy\]\]/g, t_store_getLazyUrl(o, e.img)).replace(/\[\[imgsource\]\]/g, e.img)), n += l)
                });
                var h, g = i.find(".t-slds__thumbsbullet-wrapper");
                g.html(n), "l" == o.sliderthumbsside && (h = {
                    thumbsbulletGallery: !0,
                    storeOptions: o
                }), t_sldsInit(t + " .js-store-product", h), "y" !== window.lazy && "yes" !== $("#allrecords").attr("data-tilda-lazy") || t_store_onFuncLoad("t_lazyload_update", function() {
                    t_lazyload_update()
                })
            }
        } else e.find(".js-store-prod-slider").html("")
}

function t_store_prodPopup_gallery_calcMaxThumbsCount(t, e, r, o) {
    var s = t_store_getColumnWidth(t),
        i = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    i >= 960 && i <= 1240 && (s = 440);
    var a = Math.floor(100 * e),
        n = Math.floor(a * (s - (r + o)) / 100),
        _ = Math.floor(n / (r + o));
    return _
}

function t_store_get_productcard_slider_html(t, e) {
    var r = "",
        o = "t-slds_animated-none",
        s = "300";
    "fast" === e.slider_opts.anim_speed && (o = "t-slds_animated-fast"), "slow" === e.slider_opts.anim_speed && (o = "t-slds_animated-slow", s = "500");
    var i = "",
        a = "thumbs" === e.slider_opts.controls || "arrowsthumbs" === e.slider_opts.controls;
    if (a && "l" == e.sliderthumbsside && (i = "t-slds__thumbsbullets-with-gallery"), r += '<div class="t-slds ' + i + '" style="visibility: hidden;">', r += '    <div class="t-slds__main">', r += '        <div class="t-slds__container" [[containerStyles]]>', r += '            <div class="t-slds__items-wrapper ' + o + ' [[noCycleClass]]" data-slider-transition="' + s + '" data-slider-with-cycle="[[isCycled]]" data-slider-correct-height="true" data-auto-correct-mobile-width="false">', r += "                [[slides]]", r += "            </div>", r += "            [[arrows]]", r += "        </div>", r += "    </div>", r += "    [[bullets]]", r += "</div>", "arrows" === e.slider_opts.controls || "arrowsthumbs" === e.slider_opts.controls || "" === e.slider_opts.controls) {
        var n = t.find(".js-store-tpl-slider-arrows"),
            _ = n.html(),
            l = "t-slds__arrow_container " + ("" === e.slider_opts.cycle ? "t-slds__nocycle" : "");
        _ = '<div class="' + l + '">' + _ + "</div>", r = r.replace("[[arrows]]", _)
    } else r = r.replace("[[arrows]]", "");
    if ("thumbs" === e.slider_opts.controls || "arrowsthumbs" === e.slider_opts.controls) {
        var d = '<div class="t-slds__thumbsbullet-wrapper ' + ("contain" === e.slider_slidesOpts.bgsize ? "t-align_center" : "") + '">[[bullets]]</div>';
        r = r.replace("[[bullets]]", d)
    } else r = "dots" === e.slider_opts.controls || "" === e.slider_opts.controls ? r.replace("[[bullets]]", '<div class="t-slds__bullet_wrapper">[[bullets]]</div>') : r.replace("[[bullets]]", "");
    return r = r.replace("[[containerStyles]]", e.slider_opts.bgcolor ? 'style="background-color:' + e.slider_opts.bgcolor + ';"' : "").replace("[[noCycleClass]]", e.slider_opts.cycle ? "" : "t-slds__nocycle").replace("[[isCycled]]", e.slider_opts.cycle ? "true" : "false"), r
}

function t_store_get_productcard_oneSlide_html(t, e) {
    var r = t.slider_opts.videoPlayerIconColor || "#fff",
        o = "";
    return o += '<div class="t-slds__item [[activeClass]]" data-slide-index="[[index]]">', o += '    <div class="t-slds__wrapper" itemscope itemtype="http://schema.org/ImageObject">', o += '        <meta itemprop="image" content="[[imgsource]]">', o += '        <div class="t-slds__imgwrapper [[zoomClass]]" [[zoomAttrs]]>', o += '            <div class="t-slds__bgimg [[containClass]] t-bgimg [[productClass]]" data-original="[[imgsource]]" style="padding-bottom:[[paddingBottomVal]]; background-image: url(\'[[imgsource_lazy]]\');">', o += "            </div>", o += "         </div>", e.video && (o += '<div class="t-slds__videowrapper">', o += '<div class="t-slds__play_icon" data-slider-video-url="' + e.videoid + '"  data-slider-video-type="' + e.vtype + '" style="width:70px; height: 70px; ">', o += '<svg width="70px" height="70px" viewBox="0 0 60 60">', o += '<g stroke="none" stroke-width="1" fill="" fill-rule="evenodd">', o += '<g transform="translate(-691.000000, -3514.000000)" fill="' + r + '">', o += '<path d="M721,3574 C737.568542,3574 751,3560.56854 751,3544 C751,3527.43146 737.568542,3514 721,3514 C704.431458,3514 691,3527.43146 691,3544 C691,3560.56854 704.431458,3574 721,3574 Z M715,3534 L732,3544.5 L715,3555 L715,3534 Z"></path>', o += "</g>", o += "</g>", o += "</svg>", o += "</div>", o += '<div class="t-slds__frame-wrapper"></div>', o += "</div>"), o += "    </div>", o += "</div>", o = o.replace("[[zoomAttrs]]", t.slider_slidesOpts.zoomable ? 'data-zoom-target="[[index]]" data-zoomable="yes" data-img-zoom-url="[[imgsource]]"' : "").replace("[[zoomClass]]", t.slider_slidesOpts.zoomable ? "t-zoomable" : "").replace("[[containClass]]", "contain" === t.slider_slidesOpts.bgsize ? "t-slds__bgimg-contain" : "").replace("[[paddingBottomVal]]", 100 * t.slider_slidesOpts.ratio + "%"), o
}

function t_store_get_productcard_oneSliderBullet_html(t) {
    var e = "";
    if ("thumbs" !== t.slider_opts.controls && "arrowsthumbs" !== t.slider_opts.controls || (e += '<div class="t-slds__thumbsbullet t-slds__bullet [[activeClass]]" data-slide-bullet-for="[[index]]">', e += '    <div class="t-slds__bgimg t-bgimg" data-original="[[imgsource]]" style="padding-bottom: 100%; background-image: url(\'[[imgsource_lazy]]\');"></div>', e += '    <div class="t-slds__thumbsbullet-border"></div>', e += "</div>"), "dots" === t.slider_opts.controls || "" === t.slider_opts.controls) {
        e += '<div class="t-slds__bullet [[activeClass]]" data-slide-bullet-for="[[index]]">', e += '    <div class="t-slds__bullet_body" [[styles]]></div>', e += "</div>";
        var r = "";
        if (t.slider_dotsOpts.size) {
            var o = parseInt(t.slider_dotsOpts.size, 10);
            o = o > 20 ? 20 : o, r += "width:" + o + "px;height:" + o + "px;"
        }
        if (t.slider_dotsOpts.bgcolor && (r += "background-color:" + t.slider_dotsOpts.bgcolor + ";"), t.slider_dotsOpts.bordersize) {
            var s = t.slider_dotsOpts.bgcoloractive ? t.slider_dotsOpts.bgcoloractive : "#222";
            r += "border: " + t.slider_dotsOpts.bordersize + " solid " + s + ";"
        }
        e = e.replace("[[styles]]", "" !== r ? 'style="' + r + '"' : "")
    }
    return e
}

function t_store_get_productcard_thumbsGallery_html(t, e, r) {
    var o = "",
        s = e - r;
    return "thumbs" !== t.slider_opts.controls && "arrowsthumbs" !== t.slider_opts.controls || (o += '<div class="t-slds__thumbsbullet t-slds__bullet t-slds__thumbs_gallery [[activeClass]]" [[zoomAttrs]] data-gallery-length=' + s + " data-slide-bullet-for=" + r + ">", o += '    <div class="t-slds__bgimg t-bgimg" data-original="[[imgsource]]" style="padding-bottom: 100%; background-image: url(\'[[imgsource_lazy]]\');"></div>', o += '    <div class="t-slds__thumbsbullet-border"></div>', o += "</div>", o = o.replace("[[zoomAttrs]]", t.slider_slidesOpts.zoomable ? 'data-zoom-target="[[index]]" data-zoomable="yes" data-img-zoom-url="[[imgsource]]"' : "")), o
}

function t_store_getLazyUrl(t, e) {
    if (!t.isPublishedPage || "y" !== window.lazy) return e;
    if (-1 === e.indexOf("static.tildacdn.com")) return e;
    var r = e.split("/");
    r.splice(e.split("/").length - 1, 0, "-/resizeb/x20");
    var o = r.join("/");
    return o
}

function t_store_getLazySrc(t, e) {
    if (!t.isPublishedPage || "y" !== window.lazy) return 'src="' + e + '"';
    if (-1 == e.indexOf(".tildacdn.com") || e.indexOf("-/empty/") > 0 || e.indexOf("-/resize/") > 0) return 'src="' + e + '" ';
    var r = e.split("/");
    r.splice(e.split("/").length - 1, 0, "-/empty");
    var o = r.join("/");
    return 'src="' + o + '" data-original="' + e + '"'
}

function t_store_dict(t) {
    var e = [];
    e.sku = {
        EN: "SKU",
        RU: "Артикул",
        FR: "UGS",
        DE: "SKU",
        ES: "SKU",
        PT: "SKU",
        UK: "SKU",
        JA: "単品管理",
        ZH: "存货单位",
        PL: "SKU",
        KK: "SKU",
        IT: "SKU",
        LV: "SKU"
    }, e.soldOut = {
        EN: "Out of stock",
        RU: "Нет в наличии",
        FR: "En rupture de stock",
        DE: "Ausverkauft",
        ES: "Agotado",
        PT: "Fora de estoque",
        UK: "Немає в наявності",
        JA: "在庫切れ",
        ZH: "缺货",
        PL: "Nie ma na stanie",
        KK: "Сатылды",
        IT: "Esaurito",
        LV: "Nav noliktavā"
    }, e.all = {
        EN: "All",
        RU: "Все",
        FR: "Tout",
        DE: "Alles",
        ES: "Todos",
        PT: "Todos",
        UK: "Всі",
        JA: "すべて",
        ZH: "所有",
        PL: "Wszystkie",
        KK: "Барлық",
        IT: "Tutti",
        LV: "Visi"
    }, e.from = {
        EN: "from",
        RU: "от",
        FR: "de",
        DE: "von",
        ES: "de",
        PT: "de",
        JA: "から",
        ZH: "从",
        UK: "від",
        PL: "od",
        KK: "бастап",
        IT: "da",
        LV: "no"
    }, e.emptypartmsg = {
        EN: "Nothing found",
        RU: "Ничего не найдено",
        FR: "Rien trouvé",
        DE: "Nichts gefunden",
        ES: "Nada encontrado",
        PT: "Nada encontrado",
        UK: "Нічого не знайдено",
        JA: "何も見つかりませんでした",
        ZH: "什么都没找到",
        PL: "Nic nie znaleziono",
        KK: "Ештеңе табылмады",
        IT: "Non abbiamo trovato nulla",
        LV: "Nekas nav atrasts"
    }, e.seeotherproducts = {
        EN: "See other",
        RU: "Другие товары",
        FR: "Autres produits",
        DE: "Andere produkte",
        ES: "Otros productos",
        PT: "Outros produtos",
        UK: "Інші товари",
        JA: "その他の商品",
        ZH: "其他产品",
        PL: "Inne produkty",
        KK: "Басқа қараңыз",
        IT: "Vedi altri",
        LV: "Skatiet citas"
    }, e.seeAlso = {
        EN: "See also",
        RU: "Смотрите также",
        FR: "Voir également",
        DE: "Siehe auch",
        ES: "Ver también",
        PT: "Veja também",
        UK: "Дивись також",
        JA: "また見なさい",
        ZH: "也可以看看",
        PL: "Patrz również",
        KK: "Сондай-ақ, қараңыз",
        IT: "Guarda anche",
        LV: "Skatīt arī"
    }, e.addtocart = {
        EN: "Buy now",
        RU: "Купить",
        FR: "Acheter",
        DE: "Zu kaufen",
        ES: "Para comprar",
        PT: "Comprar",
        UK: "Купити",
        JA: "購入する",
        ZH: "要买",
        PL: "Kup",
        KK: "Қазір сатып Ал",
        IT: "Acquista ora",
        LV: "Pērc tagad"
    }, e.loadmore = {
        EN: "Load more",
        RU: "Загрузить еще",
        FR: "Charger plus",
        DE: "Mehr laden",
        ES: "Carga más",
        PT: "Carregue mais",
        UK: "Завантажити ще",
        JA: "もっと読み込む",
        ZH: "裝載更多",
        PL: "Pokaż więcej",
        KK: "Load көп",
        IT: "Carica ancora",
        LV: "Ielādēt vairāk"
    }, e.filters = {
        EN: "Filters",
        RU: "Фильтры",
        FR: "Filtres",
        DE: "Filter",
        ES: "Filtros",
        PT: "Filtros",
        UK: "Фільтри",
        JA: "フィルター",
        ZH: "过滤器",
        PL: "Filtry",
        KK: "Сүзгілер",
        IT: "Filtri",
        LV: "Filtri"
    }, e.searchplaceholder = {
        EN: "Search",
        RU: "Поиск",
        FR: "Recherche de produit",
        DE: "Produktsuche",
        ES: "Buscar productos",
        PT: "Procurar produtos",
        UK: "Пошук товарів",
        JA: "商品を探す",
        ZH: "搜索商品",
        PL: "Wyszukaj produkt",
        KK: "Іздеу",
        IT: "Ricerca",
        LV: "Meklēt"
    }, e["sort-label"] = {
        EN: "Sort",
        RU: "Сортировка",
        FR: "Trier",
        DE: "Sortieren nach",
        ES: "Ordenar",
        PT: "Ordenar",
        UK: "Сортування",
        JA: "並べ替え",
        ZH: "分类",
        PL: "Sortuj",
        KK: "Сорт",
        IT: "Ordinare",
        LV: "Šķirot"
    }, e["sort-default"] = {
        EN: "Sort: by default",
        RU: "Порядок: по умолчанию",
        FR: "Trier: par défaut",
        DE: "Sortieren nach: Standardmäßig",
        ES: "Ordenar: por defecto",
        PT: "Ordenar: por padrão",
        UK: "Сортування: за замовчуванням",
        JA: "並べ替え：デフォルトで",
        ZH: "分类: 默认",
        PL: "Sortuj: dowolnie",
        KK: "Сұрыптау: Әдепкі бойынша",
        IT: "Ordina: per impostazione predefinita",
        LV: "Kārtot: pēc noklusējuma"
    }, e["sort-price-asc"] = {
        EN: "Price: low to high",
        RU: "Цена: по возрастанию",
        FR: "Prix: par ordre croissant",
        DE: "Preis: aufsteigend",
        ES: "Precio: de más bajo a más alto",
        PT: "Preço: baixo para alto",
        UK: "Ціна: спочатку дешеві",
        JA: "価格の安い順番",
        ZH: "价格: 从便宜到贵",
        PL: "Cena: od najniższej",
        KK: "Бағасы: жоғары төмен",
        IT: "Prezzo crescente",
        LV: "Cena: no zema uz augstu"
    }, e["sort-price-desc"] = {
        EN: "Price: high to low",
        RU: "Цена: по убыванию",
        FR: "Prix: par ordre décroissant",
        DE: "Preis: absteigend",
        ES: "Precio: de más alto a más bajo",
        PT: "Preço: alto para baixo",
        UK: "Ціна: спочатку дорогі ",
        JA: "価格の高い順番",
        ZH: "价格: 从贵到便宜",
        PL: "Cena: od najdroższej",
        KK: "Бағасы: төмен жоғары",
        IT: "Prezzo decrescente",
        LV: "Cena: no augstākās līdz zemākajai"
    }, e["sort-name-asc"] = {
        EN: "Title: A—Z",
        RU: "Название: А—Я",
        FR: "Titre: A—Z",
        DE: "Titel: A—Z",
        ES: "Título: A—Z",
        PT: "Título: A—Z",
        UK: "Назва:  А—Я",
        JA: "製品名：五十音順",
        ZH: "商品名称: 字母顺序排列",
        PL: "Nazwa: A-Ż",
        KK: "Атауы: A-Z",
        IT: "Titolo: A-Z",
        LV: "Nosaukums: A-Z"
    }, e["sort-name-desc"] = {
        EN: "Title: Z—A",
        RU: "Название: Я—А",
        FR: "Titre: Z—A",
        DE: "Titel: Z—A",
        ES: "Título: Z—A",
        PT: "Título: Z—A",
        UK: "Назва: Я—А",
        JA: "製品名：降順",
        ZH: "商品名称: 降序母顺序排列",
        PL: "Nazwa: Ż-A",
        KK: "Атауы: Z-A",
        IT: "Titolo: Z-A",
        LV: "Nosaukums: no Z līdz A"
    }, e["sort-created-desc"] = {
        EN: "Sort: newest first",
        RU: "Порядок: сперва новые",
        FR: "Trier: le plus récent en premier",
        DE: "Sortieren nach: Neueste zuerst",
        ES: "Ordenar: más nuevos primero",
        PT: "Ordenar: mais recente primeiro",
        UK: "Сортувати: спочатку нові",
        JA: "最新のものから並べ替え",
        ZH: "分类: 最新的",
        PL: "Sortuj: najnowsze",
        KK: "Сұрыптау: Бірінші жаңалар Бірінші",
        IT: "Nuovi primo",
        LV: "Kārtot: jaunākie vispirms"
    }, e["sort-created-asc"] = {
        EN: "Sort: oldest first",
        RU: "Порядок: сперва старые",
        FR: "Trier: le plus ancien en premier",
        DE: "Sortieren nach: Älteste zuerst",
        ES: "Ordenar: el más antiguo primero",
        PT: "Ordenar: mais antigo primeiro",
        UK: "Сортування: спочатку старі",
        JA: "並べ替え：古いものから",
        ZH: "分类: 最早的",
        PL: "Sortuj: najstarsze",
        KK: "Сұрыптау: көне бірінші",
        IT: "Ordina: prima i più vecchi",
        LV: "Kārtot: vecākie vispirms"
    }, e["filter-price-name"] = {
        EN: "Price",
        RU: "Цена",
        FR: "Prix",
        DE: "Preis",
        ES: "Precio",
        PT: "Preço",
        UK: "Ціна",
        JA: "価格",
        ZH: "价格",
        PL: "Cena",
        KK: "Баға",
        IT: "Prezzo",
        LV: "Cena"
    }, e["filter-available-name"] = {
        EN: "Availability",
        RU: "Наличие",
        FR: "Disponibilité",
        DE: "Verfügbarkeit",
        ES: "Disponibilidad",
        PT: "Disponibilidade",
        UK: "Наявність",
        JA: "可用性",
        ZH: "可用性",
        PL: "Dostępność",
        KK: "Болуы",
        IT: "Disponibilità",
        LV: "Pieejamība"
    }, e["filter-available-label"] = {
        EN: "Only in stock",
        RU: "Только товары в наличии",
        FR: "Seulement articles en stock",
        DE: "Nur auf Lager",
        ES: "Solo artículos en stock",
        PT: "Apenas itens em estoque",
        UK: "Тільки товари в наявності",
        JA: "在庫品のみ",
        ZH: "只有货",
        PL: "Tylko dostępne produkty",
        KK: "Тек қоймада",
        IT: "Solo in magazzino",
        LV: "Tikai noliktavā"
    }, e["filter-reset"] = {
        EN: "Clear all",
        RU: "Очистить все",
        FR: "Tout effacer",
        DE: "Alles löschen",
        ES: "Limpiar todo",
        PT: "Limpar tudo",
        UK: "Очистити все",
        JA: "すべてクリア",
        ZH: "全部清除",
        PL: "Wyczyść wszystko",
        KK: "Clear Барлық",
        IT: "Cancella tutto",
        LV: "Nodzēst visu"
    }, e["filter-expand"] = {
        EN: "Show all",
        RU: "Показать все",
        FR: "Afficher tout",
        DE: "Zeige alles",
        ES: "Mostrar todo",
        PT: "Pokaż wszystko",
        UK: "Показати всі",
        JA: "すべて表示する",
        ZH: "显示所有",
        PL: "Pokaż wszystko",
        KK: "Барлығын көрсету",
        IT: "Mostra tutto",
        LV: "Parādīt visu"
    }, e["filter-collapse"] = {
        EN: "Collapse",
        RU: "Свернуть",
        FR: "Effondrer",
        DE: "Zusammenbruch",
        ES: "Colapso",
        PT: "Zawalić się",
        UK: "Згорнути",
        JA: "崩壊",
        ZH: "坍方",
        PL: "Zwiń",
        KK: "Күйреу",
        IT: "Crollo",
        LV: "Sabrukums"
    }, e["filter-prodsnumber"] = {
        EN: "Found",
        RU: "Найдено",
        FR: "Trouvé",
        DE: "Gefunden",
        ES: "Encontrado",
        PT: "Encontrado",
        UK: "Знайдено",
        JA: "見つかった",
        ZH: "发现",
        PL: "Znaleziono",
        KK: "Табылған",
        IT: "Trovato",
        LV: "Atrasts"
    }, e.mm = {
        EN: "mm",
        RU: "мм",
        FR: "mm",
        DE: "mm",
        ES: "mm",
        PT: "mm",
        UK: "мм",
        JA: "mm",
        ZH: "mm",
        PL: "mm",
        KK: "мм",
        IT: "mm",
        LV: "mm"
    }, e.g = {
        EN: "g",
        RU: "г",
        FR: "g",
        DE: "g",
        ES: "g",
        PT: "g",
        UK: "г",
        JA: "g",
        ZH: "g",
        PL: "r",
        KK: "г",
        IT: "g",
        LV: "g"
    }, e.PCE = {
        EN: "pc",
        RU: "шт"
    }, e.NMP = {
        EN: "pack",
        RU: "уп"
    }, e.MGM = {
        EN: "mg",
        RU: "мг"
    }, e.GRM = {
        EN: "g",
        RU: "г"
    }, e.KGM = {
        EN: "kg",
        RU: "кг"
    }, e.TNE = {
        EN: "t",
        RU: "т"
    }, e.MLT = {
        EN: "ml",
        RU: "мл"
    }, e.LTR = {
        EN: "l",
        RU: "л"
    }, e.MMT = {
        EN: "mm",
        RU: "мм"
    }, e.CMT = {
        EN: "cm",
        RU: "см"
    }, e.DMT = {
        EN: "dm",
        RU: "дм"
    }, e.MTR = {
        EN: "m",
        RU: "м"
    }, e.MTK = {
        EN: "m²",
        RU: "м²"
    }, e.MTQ = {
        EN: "m³",
        RU: "м³"
    }, e.RMT = {
        EN: "rm",
        RU: "пог. м"
    }, e.HAR = {
        EN: "ha",
        RU: "га"
    }, e.ACR = {
        EN: "acre",
        RU: "акр"
    }, e["product-lwh"] = {
        EN: "LxWxH",
        RU: "ДxШxВ",
        FR: "LxWxH",
        DE: "LxBxH",
        ES: "PxLxK",
        PT: "LxWxH",
        UK: "ДxШxВ",
        JA: "LxWxH",
        ZH: "LxWxH",
        PL: "LxWxH",
        KK: "LxWxH",
        IT: "LxWxH",
        LV: "LxWxH"
    }, e["product-wht"] = {
        EN: "WxHxT",
        RU: "ШxВxТ",
        FR: "LxHxÉ",
        DE: "BxHxD",
        ES: "LxKxP",
        PT: "LxAxE",
        UK: "ШxВxТ",
        JA: "WxHxT",
        ZH: "WxHxT",
        PL: "WxHxT",
        KK: "WxHxT",
        IT: "WxHxT",
        LV: "WxHxT"
    }, e["product-whd"] = {
        EN: "WxHxD",
        RU: "ШxВxГ",
        FR: "LxHxP",
        DE: "BxHxT",
        ES: "LxKxS",
        PT: "LxAxP",
        UK: "ШxВxГ",
        JA: "WxHxD",
        ZH: "WxHxD",
        PL: "WxHxD",
        KK: "WxHxD",
        IT: "WxHxD",
        LV: "WxHxD"
    }, e["product-weight"] = {
        EN: "Weight",
        RU: "Вес",
        FR: "Poids",
        DE: "Gewicht",
        ES: "Kaal",
        PT: "Peso",
        UK: "Вага",
        JA: "重さ",
        ZH: "機重",
        PL: "Waga",
        KK: "Салмақ",
        IT: "Peso",
        LV: "Svars"
    };
    var r = window.browserLang;
    return void 0 !== e[t] ? void 0 !== e[t][r] && "" != e[t][r] ? e[t][r] : e[t].EN : 'Text not found "' + t + '"'
}

function t_store_convertTextToUrlSlug(t) {
    var e = t;
    return e = e.replace(/^\s+|\s+$/g, ""), e = e.replace("&lt;", ""), e = e.toLowerCase(), e = t_store_transliterate(e), e = e.replace(/[^a-z0-9 -]/g, ""), e = e.replace(/\s+/g, "-"), e = e.replace(/-+/g, "-"), 0 !== e.length && e.match(/[a-z]/i) || (e = t, e = e.replace(/\s+/g, "-"), e = e.replace("&lt;", "")), e.length > 40 && (e = e.slice(0, 40), "-" === e[e.length - 1] && (e = e.substring(0, e.length - 1))), e
}

function t_store_transliterate(t) {
    var e = {
        "Ё": "YO",
        "Й": "I",
        "Ц": "TS",
        "У": "U",
        "К": "K",
        "Е": "E",
        "Н": "N",
        "Г": "G",
        "Ш": "SH",
        "Щ": "SCH",
        "З": "Z",
        "Х": "H",
        "Ъ": "'",
        "ё": "yo",
        "й": "i",
        "ц": "ts",
        "у": "u",
        "к": "k",
        "е": "e",
        "н": "n",
        "г": "g",
        "ш": "sh",
        "щ": "sch",
        "з": "z",
        "х": "h",
        "ъ": "'",
        "Ф": "F",
        "Ы": "I",
        "В": "V",
        "А": "a",
        "П": "P",
        "Р": "R",
        "О": "O",
        "Л": "L",
        "Д": "D",
        "Ж": "ZH",
        "Э": "E",
        "ф": "f",
        "ы": "i",
        "в": "v",
        "а": "a",
        "п": "p",
        "р": "r",
        "о": "o",
        "л": "l",
        "д": "d",
        "ж": "zh",
        "э": "e",
        "Я": "Ya",
        "Ч": "CH",
        "С": "S",
        "М": "M",
        "И": "I",
        "Т": "T",
        "Ь": "'",
        "Б": "B",
        "Ю": "YU",
        "я": "ya",
        "ч": "ch",
        "с": "s",
        "м": "m",
        "и": "i",
        "т": "t",
        "ь": "'",
        "б": "b",
        "ю": "yu"
    };
    return $.map(t.split(""), function(t) {
        return e[t] || t
    }).join("")
}

function t_store_escapeQuote(t) {
    if (!t) return "";
    var e = {
        '"': "&quot;",
        "'": "&#039;"
    };
    return t.replace(/["']/g, function(t) {
        return e[t]
    })
}

function t_store_product_initEditions(t, e, r, o) {
    var s = r.find(".js-product-controls-wrapper");
    t_store_product_addEditionControls(e, s, o, t);
    var i = t_store_product_selectAvailableEdition(t, e, r, o);
    i ? (t_store_product_triggerSoldOutMsg(r, !1, o), t_store_product_disableUnavailOpts(r, e)) : t_store_product_triggerSoldOutMsg(r, !0, o), r.find(".js-product-edition-option").on("change", function() {
        var s = t_store_product_detectEditionByControls(r, e),
            i = !0;
        if (s) {
            t_store_product_updateEdition(t, r, s, e, o, i), t_prod__updatePrice(t, r);
            var a = parseInt(s.quantity, 10) <= 0;
            t_store_product_triggerSoldOutMsg(r, a, o), t_store_addProductQuantity(t, r, s, o)
        } else {
            for (var n = $(this), _ = n.attr("data-edition-option-id"), l = [], d = 0; d < e.editionOptions.length; d++) {
                var c = e.editionOptions[d];
                if (l.push(c), c.name === _) break
            }
            var p = t_store_product_selectAvailableEdition(t, e, r, o, l, i);
            t_prod__updatePrice(t, r), t_store_product_triggerSoldOutMsg(r, !p, o), t_store_addProductQuantity(t, r, e, o)
        }
        r.find(".js-product-edition-option-variants option").removeAttr("disabled"), t_store_product_disableUnavailOpts(r, e)
    })
}

function t_store_product_detectEditionByControls(t, e) {
    for (var r = 0; r < e.editions.length; r++) {
        for (var o = e.editions[r], s = !0, i = 0; i < e.editionOptions.length; i++) {
            var a = e.editionOptions[i],
                n = t_store_product_getEditionSelectEl(t, a),
                _ = n.find(".js-product-edition-option-variants").val(),
                l = o[a.name];
            _ !== l && (s = !1)
        }
        if (s) return o
    }
    return null
}

function t_store_product_addEditionControls(t, e, r, o) {
    var s = t_store_option_getOptionsData(),
        i = t_store_product_getFirstAvailableEditionData(t.editions);
    t.editionOptions || (t.editionOptions = t_store_product_getEditionOptionsArr(t, s)), t.editionOptions.forEach(function(t) {
        t_store_product_addOneOptionsControl("editionopt", t, e, r, i, o)
    })
}

function t_store_product_selectAvailableEdition(t, e, r, o, s, i) {
    var a = s && s.length > 0 ? t_store_product_getFirstAvailableEditionData_forCertainVals(e.editions, s, r) : t_store_product_getFirstAvailableEditionData(e.editions);
    if (!a) return console.log("No available edition for uid = " + e.uid + " with selected options values"), !1;
    var n = parseInt(a.quantity, 10) > 0 || "" === a.quantity;
    return e.editionOptions.forEach(function(t) {
        var e = a[t.name],
            o = t_store_product_getEditionSelectEl(r, t);
        o.find(".js-product-edition-option-variants").val(e);
        var s = o.find(".t-product__option-variants_custom");
        if (s.length) {
            var i = s.find(".t-product__option-item");
            i.each(function() {
                var t = $(this).find(".t-product__option-input");
                t.val() === e ? (t.prop("checked", !0).click(), $(this).addClass("t-product__option-item_active")) : (t.prop("checked", !1), $(this).removeClass("t-product__option-item_active"))
            })
        }
    }), t_store_product_updateEdition(t, r, a, e, o, i), n
}

function t_store_product_disableUnavailOpts(t, e) {
    for (var r = 1; r < e.editionOptions.length; r++) {
        var o = e.editionOptions[r],
            s = t_store_product_getEditionSelectEl(t, o),
            i = e.editionOptions[r - 1],
            a = t_store_product_getEditionSelectEl(t, i),
            n = a.find(".js-product-edition-option-variants").val() || "";
        o.values.forEach(function(r) {
            var a = t_store_product_disableUnavailOpts_checkEdtn(e, o, r, i, n),
                _ = s.find('option[value="' + r + '"]'),
                l = t.find('.t-product__option-input[value="' + r + '"]');
            if (a) {
                if (_.removeAttr("disabled"), l.length) {
                    var d = l.closest(".t-product__option-item");
                    d.removeClass("t-product__option-item_disabled")
                }
            } else if (_.attr("disabled", "disabled"), l.length) {
                d = l.closest(".t-product__option-item");
                d.addClass("t-product__option-item_disabled"), d.removeClass("t-product__option-item_active")
            }
        })
    }
}

function t_store_product_updateEdition(t, e, r, o, s, i) {
    var a = "" !== window.location.search ? window.location.search.split("=")[1] : "";
    if (r || o.editions.forEach(function(t) {
            t.uid === a && (r = t)
        }), a === r.uid && ($(".js-store-product").attr("data-product-lid", r.uid), $(".js-store-product").attr("data-product-uid", r.uid), $(".js-store-product").attr("data-product-url", window.location), setTimeout(function() {
            t_store_product_updateEdition_moveSlider(t, e, r)
        }, 100), $(".js-store-product").attr("data-product-img", r.img), $(".js-product-edition-option").each(function() {
            var t = $(this).attr("data-edition-option-id");
            if (r[t]) {
                var e = r[t],
                    o = $(this).find(".js-product-edition-option-variants");
                o.val() !== e && o.val(e).change()
            }
        })), r.price && 0 !== parseFloat(r.price)) {
        var n = t_store__getFormattedPrice(s, r.price),
            _ = t_store__getFormattedPriceRange(s, o);
        if (n = _ || n, e.find(".js-store-prod-price").show(), e.find(".js-store-prod-price-val").html(n), t_store_onFuncLoad("t_prod__cleanPrice", function() {
                var t = t_prod__cleanPrice(r.price);
                e.find(".js-product-price").attr("data-product-price-def", t), e.find(".js-product-price").attr("data-product-price-def-str", t), e.find(".js-product-price").attr("data-product-price-def-str", t)
            }), e.find(".t-store__prod__price-portion").remove(), o.portion > 0) {
            var l = '<div class="t-store__prod__price-portion">/';
            "1" !== o.portion && (l += +o.portion + " "), l += t_store_dict(o.unit) + "</div>", e.find(".t-store__card__price-currency + .js-product-price, .js-product-price + .t-store__card__price-currency").after(l)
        }
    } else e.find(".js-store-prod-price").hide(), e.find(".js-store-prod-price-val").html(""), e.find(".js-product-price").attr("data-product-price-def", ""), e.find(".js-product-price").attr("data-product-price-def-str", ""), e.find(".t-store__prod__price-portion").remove();
    if (r.priceold && "0" !== r.priceold) {
        var d = t_store__getFormattedPrice(s, r.priceold);
        e.find(".js-store-prod-price-old").show(), e.find(".t-store__card__price_old").show(), e.find(".js-store-prod-price-old-val").html(d)
    } else e.find(".js-store-prod-price-old").hide(), e.find(".t-store__card__price_old").hide(), e.find(".js-store-prod-price-old-val").html("");
    var c = e.find(".t-store__prod-popup__brand");
    o.brand && o.brand > "" && (1 == c.find("span[itemprop=brand]").length ? c.find("span[itemprop=brand]").html(o.brand) : c.html('<span itemprop="brand" class="js-product-brand">' + o.brand + "</span>")), o.brand || c.hide();
    var p = e.find(".t-store__prod-popup__sku"),
        u = e.find(".js-store-prod-sku");
    r.sku ? (u.html(r.sku), "large" === e.data("cardSize") && (u.show(), p.show())) : (u.html("").hide(), p.hide()), e.attr("data-product-inv", r.quantity), e.attr("data-product-lid", r.uid).attr("data-product-uid", r.uid);
    try {
        var f = e.data("def-pack-obj");
        if (r.pack_x && r.pack_y && r.pack_z) {
            f || (f = {
                pack_x: e.attr("data-product-pack-x") || 0,
                pack_y: e.attr("data-product-pack-y") || 0,
                pack_z: e.attr("data-product-pack-z") || 0,
                pack_label: e.attr("data-product-pack-label") || o.pack_label || "lwh",
                pack_m: e.attr("data-product-pack-m") || 0
            }, e.data("def-pack-obj", f)), e.attr("data-product-pack-x", r.pack_x).attr("data-product-pack-y", r.pack_y).attr("data-product-pack-z", r.pack_z).attr("data-product-pack-label", f.pack_label);
            var v = "";
            v += r.pack_x + "x" + r.pack_y + "x" + r.pack_z, e.find(".js-store-prod-dimensions").html(t_store_dict("product-" + f.pack_label) + ": " + v + "&nbsp;" + t_store_dict("mm"))
        } else if (f && f.pack_x) {
            e.attr("data-product-pack-x", f.pack_x).attr("data-product-pack-y", f.pack_y).attr("data-product-pack-z", f.pack_z).attr("data-product-pack-label", f.pack_label);
            v = "";
            v += f.pack_x + "x" + f.pack_y + "x" + f.pack_z, e.find(".js-store-prod-dimensions").html(t_store_dict("product-" + f.pack_label) + ": " + v + "&nbsp;" + t_store_dict("mm"))
        }
        r.pack_m ? (e.attr("data-product-pack-m", r.pack_m), e.find(".js-store-prod-weight").html(t_store_dict("product-weight") + ": " + r.pack_m + "&nbsp;" + t_store_dict("g"))) : f && parseFloat(f.pack_m) > 0 && (e.attr("data-product-pack-m", f.pack_m), e.find(".js-store-prod-weight").html(t_store_dict("product-weight") + ": " + f.pack_m + "&nbsp;" + t_store_dict("g")))
    } catch (t) {
        console.log(t)
    }
    if (r.img) e.attr("data-product-img", r.img), "large" === e.data("cardSize") ? t_store_product_updateEdition_moveSlider(t, e, r) : i && t_store_get_productCard_img_replaceWith(o, e, s, r.img);
    else {
        var h = e.attr("data-product-img");
        void 0 !== h && "" !== h && "large" === e.data("cardSize") && (t_store_product_updateEdition_moveSlider(t, e, r), e.attr("data-product-img", ""))
    }
    o.portion > 0 && (e.attr("data-product-unit", o.unit), e.attr("data-product-portion", o.portion), e.attr("data-product-single", o.single))
}

function t_store_product_updateEdition_moveSlider(t, e, r) {
    if (0 !== e.find(".t-slds").length) {
        -1 !== r.img.indexOf("&amp;") && (r.img = r.img.replace("&amp;", "&"));
        var o = e.find(".t-slds__items-wrapper"),
            s = e.find('.t-slds__item .t-slds__bgimg[data-original="' + r.img + '"]');
        if (r.img) {
            var i = $(s[0]).parents(".t-slds__item").attr("data-slide-index");
            0 === parseInt(i, 10) && (i = o.attr("data-slider-totalslides"))
        } else i = 1;
        o.attr("data-slider-pos", i), t_store_onFuncLoad("t_slideMoveInstantly", function() {
            t_slideMoveInstantly(t + " .js-store-product")
        })
    }
}

function t_store_product_triggerSoldOutMsg(t, e, r) {
    t.find(".js-store-prod-sold-out").remove();
    var o, s = t.find('[href="#order"]');
    if ("large" === t.data("cardSize")) {
        var i = s.find(".js-store-prod-popup-buy-btn-txt");
        if (0 === i.length && (i = s.find(".js-store-prod-buy-btn-txt")), e) o = t_store_get_soldOutMsg_html(), t.find(".js-store-price-wrapper").append(o), s.addClass("t-store__prod-popup__btn_disabled"), i.text(t_store_dict("soldOut"));
        else {
            s.removeClass("t-store__prod-popup__btn_disabled");
            var a = r.buyBtnTitle || r.popup_opts && r.popup_opts.btnTitle || t_store_dict("addtocart");
            i.text(a)
        }
    } else "small" === t.data("cardSize") && (e ? (o = t_store_get_soldOutMsg_html(), t.find(".js-store-price-wrapper").append(o), s.length > 1 ? s.not(":first").hide() : s.hide()) : (s.show(), s.css("display", "")))
}

function t_store_product_addOneOptionsControl(t, e, r, o, s, i) {
    if (e.name) {
        var a, n, _, l = "";
        if ("modificator" === t) {
            if (void 0 === e.values) return;
            n = '<option value="[[value]]" data-product-variant-price="[[price]]">[[text]]</option>';
            var d = e.values.split("\n");
            $.each(d, function(t, e) {
                var r = e.split("=")[0],
                    o = e.split("=")[1];
                l += n.replace(/\[\[value\]\]/g, t_store_escapeQuote(r).replace(/&amp;/g, "&amp;amp;")).replace(/\[\[text\]\]/g, t_store_escapeQuote(r)).replace(/\[\[price\]\]/g, o || "")
            }), _ = t_store_get_control_option_html(o), a = _.replace(/\[\[name\]\]/g, e.name).replace(/\[\[optiontags\]\]/g, l)
        } else n = '<option value="[[value]]">[[text]]</option>', $.each(e.values, function(t, e) {
            "" !== e && (l += n.replace(/\[\[value\]\]/g, t_store_escapeQuote(e).replace(/&amp;/g, "&amp;amp;")).replace(/\[\[text\]\]/g, t_store_escapeQuote(e)))
        }), "" !== l && (_ = t_store_get_control_editionOption_html(o, e), a = _.replace(/\[\[id\]\]/g, e.id.replace(/&amp;/g, "&amp;amp;")).replace(/\[\[name\]\]/g, e.name).replace(/\[\[optiontags\]\]/g, l));
        r.append(a);
        var c = t_store_option_checkIfCustom(e);
        if (c && t_store_option_styleCustomControl(i, o, e, r, s), "editionopt" === t) return r.find(".js-product-edition-option").last()
    }
}

function t_store_product_getEditionOptionsArr(t, e) {
    var r = t.editions,
        o = ["quantity", "price", "priceold", "gallery", "sku", "uid", "img", "externalid", "pack_x", "pack_y", "pack_z", "pack_m"],
        s = Object.keys(r[0]),
        i = [];
    return s.forEach(function(s) {
        if (-1 === o.indexOf(s)) {
            var a = {
                name: s,
                id: t_store_combineOptionIdByName(s),
                params: t_store_product_getEditionOptionsArr_getParams(s, t, e),
                values: t_store_product_getEditionOptionsArr_getValues(s, r),
                imagesObj: t_store_product_getEditionOptionsArr_getImgValues(s, r),
                valuesObj: e && e[s] ? e[s].values : {}
            };
            i.push(a)
        }
    }), i
}

function t_store_product_getFirstAvailableEditionData(t) {
    for (var e = 0; e < t.length; e++) {
        var r = t[e];
        if (0 !== parseInt(r.quantity, 10)) return r
    }
    return t[0]
}

function t_store_product_getFirstAvailableEditionData_forCertainVals(t, e, r) {
    for (var o = "", s = 0; s < t.length; s++) {
        for (var i = t[s], a = !0, n = 0; n < e.length; n++) {
            var _ = e[n].name,
                l = t_store_product_getCurEditionOptValByName(r, _);
            if (i[_] !== l) {
                a = !1;
                break
            }
        }
        if (a) {
            if (0 !== parseInt(i.quantity, 10)) return i;
            o || (o = i)
        }
    }
    return o
}

function t_store_product_disableUnavailOpts_getValsComb(t, e, r, o) {
    for (var s = {}, i = 0; i < e.editionOptions.length; i++) {
        var a = e.editionOptions[i],
            n = t_store_product_getEditionSelectEl(t, a),
            _ = n.find(".js-product-edition-option-variants").val();
        s[a.name] = a.name === r ? o : _
    }
    return s
}

function t_store_product_disableUnavailOpts_checkEdtn(t, e, r, o, s) {
    for (var i = !1, a = 0; a < t.editions.length; a++) {
        var n = t.editions[a];
        if (n[o.name] === s && n[e.name] === r) {
            i = !0;
            break
        }
    }
    return i
}

function t_store_product_getEditionOptionsArr_getValues(t, e) {
    var r = [];
    return e.forEach(function(e) {
        var o = e[t]; - 1 === r.indexOf(o) && r.push(o)
    }), r = t_store_product_sortValues(r), r
}

function t_store_product_sortValues(t, e, r) {
    var o = t || [];
    if (!t.length) return o;
    var s = "filter" === e ? t[0].value.toString() : t[0].toString(),
        i = ["XXXS", "3XS", "XXS", "2XS", "XS", "S", "M", "L", "XL", "XXL", "2XL", "XXXL", "3XL", "XXXXL", "BXL", "4XL", "BXXL", "5XL", "BXXXL", "6XL"],
        a = ["Вт", "W", "даВт", "daW", "гВт", "hW", "кВт", "kW", "мВт", "mW", "ГВт", "GW", "ТВт", "TW", "ПВт", "PW"],
        n = ["Б", "B", "Кб", "Кбайт", "KiB", "KB", "Мбайт", "Мб", "MiB", "MB", "Mb", "Гбайт", "Гб", "GiB", "GB", "Gb", "Тбайт", "Тб", "TiB", "TB"],
        _ = ["мкг", "mcg", "мг", "mg", "г", "g", "кг", "kg", "т", "t", "ц"],
        l = ["мкм", "мм", "mm", "дм", "dm", "см", "cm", "м", "m", "км", "km"],
        d = {
            wattOrder: a,
            bytesOrder: n,
            weightOrder: _,
            lengthOrder: l
        },
        c = !0,
        p = r || t;
    if (p.forEach(function(t) {
            "string" == typeof t && (t = t.trim().toUpperCase(), i.indexOf(t) < 0 && (c = !1))
        }), c) o = o.sort(function(t, r) {
        var o = "filter" === e ? t.value : t,
            s = "filter" === e ? r.value : r;
        return i.indexOf(o) - i.indexOf(s)
    });
    else {
        try {
            o = t.sort(function(t, r) {
                var o = "filter" === e ? t.value : t,
                    s = "filter" === e ? r.value : r;
                return o = parseFloat(o.toString().replace(",", ".").trim()), s = parseFloat(s.toString().replace(",", ".").trim()), isNaN(o) || isNaN(s) ? 0 : o - s
            })
        } catch (t) {
            console.log(t)
        }
        try {
            for (var u in d) {
                t = d[u];
                var f = t_store_product_testUnits(t, s),
                    v = new RegExp(/^\d*,?\.?\d+\s*/, "gi");
                if (f) return o = o.sort(function(r, o) {
                    var s = "filter" === e ? r.value : r,
                        i = "filter" === e ? o.value : o;
                    return s = s.toString().replace(v, "").trim(), i = i.toString().replace(v, "").trim(), t.indexOf(s) - t.indexOf(i)
                }), o
            }
        } catch (t) {
            console.log(t)
        }
    }
    return o
}

function t_store_product_testUnits(t, e) {
    var r = !1;
    e = e.replace(/\s/g, "");
    for (var o = 0; o < t.length; o++) {
        var s = t[o],
            i = "^[\\d.,]+(" + s + "){1}$",
            a = new RegExp(i, "i");
        if (a.test(e)) {
            r = !0;
            break
        }
    }
    return r
}

function t_store_product_getEditionOptionsArr_getParams(t, e, r) {
    var o = {};
    if (r) o = r[t] ? r[t].params : {};
    else {
        var s = JSON.parse(e.json_options);
        s && s.forEach(function(e) {
            e.params && e.title && e.title === t && (o = e.params)
        })
    }
    return o
}

function t_store_product_getEditionOptionsArr_getImgValues(t, e) {
    var r = {};
    return e.forEach(function(e) {
        var o = e[t];
        r[o] || (r[o] = e.img)
    }), r
}

function t_store_product_getCurEditionOptValByName(t, e) {
    var r = t.find('.js-product-edition-option[data-edition-option-id="' + e + '"]');
    return r.find(".js-product-edition-option-variants").val() || ""
}

function t_store_product_getEditionSelectEl(t, e) {
    return t.find('.js-product-edition-option[data-edition-option-id="' + e.id + '"]')
}

function t_store_combineOptionIdByName(t) {
    return t.replace(/[\/\\'"<>{}]/g, "")
}

function t_store_getProductFirstImg(t) {
    if (t.gallery && "[" === t.gallery[0]) {
        var e = jQuery.parseJSON(t.gallery);
        if (e[0] && e[0].img) return e[0].img
    }
    return ""
}

function t_store__getFormattedPrice(t, e) {
    if (null == e || 0 == e || "" == e) return "";
    t_store_onFuncLoad("t_prod__cleanPrice", function() {
        e = t_prod__cleanPrice(e), e = e.toString()
    });
    var r = !1,
        o = !1;
    if (t.currencyDecimal ? r = "00" === t.currencyDecimal : void 0 !== window.tcart && void 0 !== window.tcart.currency_dec && (r = "00" === window.tcart.currency_dec), t.currencySeparator ? o = "." === t.currencySeparator : void 0 !== window.tcart && void 0 !== window.tcart.currency_sep && (o = "." === window.tcart.currency_sep), r)
        if (-1 === e.indexOf(".") && -1 === e.indexOf(",")) e += ".00";
        else {
            var s = e.substr(e.indexOf(".") + 1);
            1 === s.length && (e += "0")
        } return e = o ? e.replace(",", ".") : e.replace(".", ","), e = e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "), e
}

function t_store__getFormattedPriceRange(t, e) {
    if (!t.hasOwnProperty("prodCard") || t.prodCard.showOpts || !t.price.priceRange || "" == t.price.priceRange || !e.hasOwnProperty("minPrice") || !e.hasOwnProperty("maxPrice")) return null;
    var r = e.minPrice,
        o = e.maxPrice;
    if (null === r || null === o || r === o) return null;
    r = t_store__getFormattedPrice(t, r), o = t_store__getFormattedPrice(t, o);
    var s = t.price.priceRange;
    return t.currencyTxt && ("l" === t.currencySide ? r = t.currencyTxt + r : "r" === t.currencySide && ("range" === s ? o = o + " " + t.currencyTxt : "from" === s && (r = r + " " + t.currencyTxt))), "range" === s ? r + "&mdash;" + o : "from" === s ? t_store_dict("from") + " " + r : void 0
}

function t_store_filters_init(t, e, r) {
    if (r.sort || r.search || r.filters && 0 !== r.filters.length) {
        var o = $("#rec" + t);
        o.find(".js-store-filter").length > 0 || (t_store_filters_drawControls(t, e, r), t_store_filters_showHideFilterControls(t, o), t_store_filters_handleOnChange(t, e))
    }
}

function t_store_filters_showHideFilterControls(t, e) {
    $(window).on("click", function(r) {
        var o = "",
            s = ($(r.target).hasClass("js-store-filter-item-title") || $(r.target).parents("js-store-filter-item-title").length > 0) && $(r.target).parents("#rec" + t).length > 0,
            i = $(r.target).hasClass("js-store-filter-item-controls-wr") || $(r.target).parents(".js-store-filter-item-controls-wr").length > 0;
        if (!s) return i ? void 0 : void e.find(".js-store-filter-item").removeClass("active");
        o = $(r.target);
        var a = o.parents(".js-store-filter-item"),
            n = a.find(".js-store-filter-item-controls-wr");
        a.hasClass("active") ? a.removeClass("active") : ($(".js-store-filter-item").removeClass("active"), a.addClass("active"), n.offset().left < 10 ? n.addClass("t-store__filter__item-controls-wrap_left") : n.offset().right < 0 && console.log("controlsWrap offset right < 0"))
    })
}

function t_store_filters_drawControls(t, e, r) {
    t_store_filters_cashSortOptsInData(r);
    var o = "",
        s = "";
    s += '<div class="t-store__filter__search-and-sort">', r.search && (s += t_store_filters_drawControls_getSearchHtml()), r.sort && (s += t_store_filters_drawControls_getSortHtml(r)), s += "</div>";
    var i = "t-store__filter js-store-filter";
    if (i += e.isHorizOnMob ? " t-store__filter_horiz-on-mobile" : "", o += '<div class="' + i + '">', o += '    <div class="t-store__filter__controls-wrapper">', o += "        " + t_store_filters_mobileBtns_getHtml(t, r), o += "        " + t_store_filters_opts_getHtml(t, r, e), !e.sidebar || $(window).width() < 960) o += s;
    else {
        var a = $("#rec" + t),
            n = a.find(".t951__cont-w-filter");
        n && n.prepend(s)
    }
    o += "    </div>", o += '    <div class="t-store__filter__chosen-bar" style="display: none;">', o += "    " + t_store_filters_opts_chosenVals_getHtml(), o += "    " + t_store_filters_prodsNumber_getHtml(), o += "    </div>", o += "</div>";
    a = $("#rec" + t);
    var _ = a.find(".js-store-parts-select-container");
    a.find(".js-store-filter").remove(), e.sidebar ? _.find(".t951__sidebar-wrapper").append(o) : _.append(o), a.trigger("controlsDrawn"), t_store_filters_opts_checkboxes_groupCheckedToHiddenInput(t), t_store_filters_opts_customSelect_saveToHiddenInput(t), t_store_filters_initUIBtnsOnMobile(a), t_store_filters_initResetBtn(t, e), t_store_filters_initExpandBtn(t)
}

function t_store_filters_initResetBtn(t, e) {
    var r = $("#rec" + t);
    r.find(".js-store-filter-reset").on("click", function() {
        r.find(".js-store-filter-search, .js-store-filter-sort, .js-store-filter-opt").val(""), r.find(".js-store-parts-switcher.t-active").removeClass("t-active"), r.find(".js-store-parts-switcher.t-store__parts-switch-btn-all").addClass("t-active");
        var o = r.find(".js-store-filter-pricemin"),
            s = t_store__getFormattedPrice(e, o.attr("data-min-val"));
        o.val(s);
        var i = r.find(".js-store-filter-pricemax"),
            a = t_store__getFormattedPrice(e, i.attr("data-max-val"));
        i.val(a), r.find(".js-store-filter-onlyavail, .js-store-filter-opt-chb").prop("checked", !1), r.find(".js-store-filter-custom-select").removeClass("active"), r.find(".t-store__filter__checkbox").removeClass("active"), o.data("previousMin", s), i.data("previousMax", a), r.find(".t-store__filter__item_select .js-store-filter-opt").data("previousVal", ""), r.find(".t-store__filter__chosen-bar").hide();
        var n = r.find(".t-store__filter__range_min"),
            _ = r.find(".t-store__filter__range_max");
        e.sidebar && n.length && _.length ? t_store_filters_updatePriceRange(r) : t_store_filters_send(t, e), e.sidebar && (t_store_filters_opts_sort(e, t), t_store_filters_scrollStickyBar(r)), r.find(".js-store-filter-chosen-item").remove(), r.find(".js-store-filter-reset").removeClass("t-store__filter__reset_visible"), r.find(".js-store-filter-search-close").hide(), t_store_updateUrlWithParams("delete_all", null, null, t)
    })
}

function t_store_filters_initExpandBtn(t) {
    var e = $("#rec" + t);
    e.find(".js-store-filter-btn-expand").on("click", function() {
        var t = "no" !== $(this).attr("data-expanded"),
            e = $(this).parent().find(".t-store__filter__item-controls-container"),
            r = $(this).find(".t-store__filter__btn-text");
        t ? (e.find(".t-checkbox__control").each(function(t) {
            t > 9 && $(this).addClass("t-checkbox__control_hidden")
        }), e.find(".t-store__filter__custom-sel").each(function(t) {
            t > 9 && $(this).addClass("t-store__filter__custom-sel_hidden")
        }), r.text(t_store_dict("filter-expand")), e.removeClass("t-store__filter__item-controls-container_expanded"), $(this).attr("data-expanded", "no")) : (e.find(".t-checkbox__control_hidden").removeClass("t-checkbox__control_hidden"), e.find(".t-store__filter__custom-sel_hidden").removeClass("t-store__filter__custom-sel_hidden"), r.text(t_store_dict("filter-collapse")), e.addClass("t-store__filter__item-controls-container_expanded"), $(this).attr("data-expanded", "yes"))
    })
}

function t_store_filters_cashSortOptsInData(t) {
    t.sortControlData = {
        name: "sort",
        label: t_store_dict("sort-label"),
        values: [{
            value: "",
            text: t_store_dict("sort-default")
        }, {
            value: "price:asc",
            text: t_store_dict("sort-price-asc")
        }, {
            value: "price:desc",
            text: t_store_dict("sort-price-desc")
        }, {
            value: "title:asc",
            text: t_store_dict("sort-name-asc")
        }, {
            value: "title:desc",
            text: t_store_dict("sort-name-desc")
        }, {
            value: "created:desc",
            text: t_store_dict("sort-created-desc")
        }, {
            value: "created:asc",
            text: t_store_dict("sort-created-asc")
        }]
    }
}

function t_store_filters_drawControls_getSortHtml(t) {
    var e = "";
    e += '<div class="t-store__filter__sort">', e += '<div class="t-store__sort-select-wrapper">', e += '    <select class="t-store__sort-select t-descr t-descr_xxs js-store-filter-sort" name="sort">';
    for (var r = 0; r < t.sortControlData.values.length; r++) {
        var o = t.sortControlData.values[r];
        e += '<option data-filter-value="' + o.value + '" value="' + o.value + '">' + o.text + "</option>"
    }
    return e += "    </select>", e += "</div>", e += "</div>", e
}

function t_store_filters_drawControls_getSearchHtml() {
    var t = "";
    return t += '<div class="t-store__filter__search t-descr t-descr_xxs">', t += '    <div class="t-store__search-wrapper">', t += '        <input class="t-store__filter__input js-store-filter-search" type="text" name="query" placeholder="' + t_store_dict("searchplaceholder") + '">', t += '<svg class="t-store__search-icon js-store-filter-search-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88"> <path fill="#757575" d="M85 31.1c-.5-8.7-4.4-16.6-10.9-22.3C67.6 3 59.3 0 50.6.6c-8.7.5-16.7 4.4-22.5 11-11.2 12.7-10.7 31.7.6 43.9l-5.3 6.1-2.5-2.2-17.8 20 9 8.1 17.8-20.2-2.1-1.8 5.3-6.1c5.8 4.2 12.6 6.3 19.3 6.3 9 0 18-3.7 24.4-10.9 5.9-6.6 8.8-15 8.2-23.7zM72.4 50.8c-9.7 10.9-26.5 11.9-37.6 2.3-10.9-9.8-11.9-26.6-2.3-37.6 4.7-5.4 11.3-8.5 18.4-8.9h1.6c6.5 0 12.7 2.4 17.6 6.8 5.3 4.7 8.5 11.1 8.9 18.2.5 7-1.9 13.8-6.6 19.2z"></path></svg>', t += '<svg class="t-store__search-close-icon js-store-filter-search-close" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#757575" fill-rule="evenodd" clip-rule="evenodd" d="M0.781448 10.6465L10.7814 0.646484L11.4886 1.35359L1.48856 11.3536L0.781448 10.6465Z" fill="black"/><path fill="#757575" fill-rule="evenodd" clip-rule="evenodd" d="M10.6464 11.3536L0.646439 1.35359L1.35355 0.646484L11.3535 10.6465L10.6464 11.3536Z" fill="black"/></svg>', t += "    </div>", t += "</div>", t
}

function t_store_filters_initUIBtnsOnMobile(t) {
    var e = t.find(".js-store-filter-mob-btn"),
        r = t.find(".t-store__filter__options"),
        o = t.find(".js-store-search-mob-btn"),
        s = t.find(".t-store__filter__search-and-sort");
    e.on("click", function() {
        s.hide(), o.removeClass("active"), e.hasClass("active") ? (r.hide(), e.removeClass("active")) : (r.show(), e.addClass("active"))
    }), o.on("click", function() {
        e.removeClass("active"), o.hasClass("active") ? (s.hide(), o.removeClass("active"), e.removeClass("active")) : (s.show(), o.addClass("active"), e.removeClass("active"))
    })
}

function t_store_loadMoreBtn_display(t) {
    var e = $("#rec" + t),
        r = e.find(".t-store__load-more-btn-wrap"),
        o = !!($(window).width() < 960 && e.find(".js-store-grid-cont.t-store__grid-cont_mobile-one-row")[0]);
    !o && r.hasClass("t-store__load-more-btn-wrap_hidden") ? r.removeClass("t-store__load-more-btn-wrap_hidden") : o && !r.hasClass("t-store__load-more-btn-wrap_hidden") && r.addClass("t-store__load-more-btn-wrap_hidden")
}

function t_store_moveSearhSort(t, e) {
    var r = $("#rec" + t),
        o = r.find(".t-store__filter__search-and-sort");
    if ($(window).width() > 960 && o.is(":hidden") && o.show(), e.sidebar) {
        var s = r.find(".t-store__filter__controls-wrapper"),
            i = r.find(".js-store-cont-w-filter");
        if (o) {
            var a = o.parent().hasClass("js-store-cont-w-filter");
            $(window).width() < 960 ? a && (o.remove(), s.append(o)) : a || (o.remove(), i.prepend(o))
        }
    }
}

function t_store_filters_send(t, e) {
    var r = {},
        o = $("#rec" + t),
        s = t_prod__cleanPrice(o.find(".js-store-filter-pricemin").attr("data-min-val")),
        i = t_prod__cleanPrice(o.find(".js-store-filter-pricemin").val());
    i !== s && (r["price:min"] = i);
    var a = t_prod__cleanPrice(o.find(".js-store-filter-pricemax").attr("data-max-val")),
        n = t_prod__cleanPrice(o.find(".js-store-filter-pricemax").val());
    n !== a && (r["price:max"] = n), o.find(".js-store-filter-onlyavail")[0] && o.find(".js-store-filter-onlyavail")[0].checked && (r.quantity = "y");
    var _ = o.find(".t-store__parts-switch-wrapper .js-store-parts-switcher.t-active:not(.t-store__parts-switch-btn-all)").text();
    _ && (r.storepartuid = _), o.find(".js-store-filter-opt").each(function() {
        var t = $(this).val(),
            e = $(this).attr("name");
        "sort" !== e && (t && "" !== t && "array" === $(this).attr("data-info-type") ? r[e] = t.split("&&") : t && (r[e] = t))
    });
    var l = o.find(".js-store-filter-search").val();
    l && (r.query = l);
    var d = {},
        c = o.find(".js-store-filter-sort").val();
    if ("" === c && (c = o.find('.js-store-filter-opt[name="sort"]').val(), t_store_isQueryInAddressBar("tfc_sort[" + t + "]") && t_store_updateUrlWithParams("delete", "sort", p + ":" + u, t)), c) {
        var p = c.split(":")[0],
            u = c.split(":")[1];
        d[p] = u, t_store_updateUrlWithParams("update", "sort", p + ":" + u, t)
    }
    e.filters = r, e.sort = d, t_store_filters_prodsNumber_update(o, e), t_store_showLoadersForProductsList(t, e), t_store_pagination_updateUrl(t, e, 1), t_store_loadProducts("", t, e)
}

function t_store_filters_mobileBtns_getHtml(t, e) {
    var r = "";
    return (e.filters.length > 0 || e.sort) && (r += '<div class="js-store-filter-mob-btn t-store__filter__opts-mob-btn t-name t-name_xs">', r += '<svg class="t-store__filter__opts-mob-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 63.42 100"><defs><style>.cls-1{fill:#1d1d1b;}</style></defs><title>2Монтажная область 1 копия</title><path class="cls-1" d="M13.75,22.59V.38h-6V22.59a10.75,10.75,0,0,0,0,20.64V99.62h6V43.23a10.75,10.75,0,0,0,0-20.64Z"/><path class="cls-1" d="M63.42,67.09a10.75,10.75,0,0,0-7.75-10.32V.38h-6V56.77a10.75,10.75,0,0,0,0,20.64V99.62h6V77.41A10.75,10.75,0,0,0,63.42,67.09Z"/></svg>', r += t_store_dict("filters"), r += "</div>"), e.search && (r += '<div class="js-store-search-mob-btn t-store__filter__search-mob-btn t-descr t-descr_xs">', r += '<svg class="t-store__filter__search-mob-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88"> <path fill="#3f3f3f" d="M85 31.1c-.5-8.7-4.4-16.6-10.9-22.3C67.6 3 59.3 0 50.6.6c-8.7.5-16.7 4.4-22.5 11-11.2 12.7-10.7 31.7.6 43.9l-5.3 6.1-2.5-2.2-17.8 20 9 8.1 17.8-20.2-2.1-1.8 5.3-6.1c5.8 4.2 12.6 6.3 19.3 6.3 9 0 18-3.7 24.4-10.9 5.9-6.6 8.8-15 8.2-23.7zM72.4 50.8c-9.7 10.9-26.5 11.9-37.6 2.3-10.9-9.8-11.9-26.6-2.3-37.6 4.7-5.4 11.3-8.5 18.4-8.9h1.6c6.5 0 12.7 2.4 17.6 6.8 5.3 4.7 8.5 11.1 8.9 18.2.5 7-1.9 13.8-6.6 19.2z"></path></svg>', r += "</div>"), r
}

function t_store_filters_opts_getHtml(t, e, r) {
    var o = "";
    if (0 === e.filters.length && !e.sort) return "";
    o += '<div class="t-store__filter__options ' + (e.sort || e.search ? "" : "t-store__filter__options_center") + '">';
    var s = e.filters;
    e.sort && (o += t_store_filters_opts_getHtml_customSelect(e.sortControlData, r));
    for (var i = 0; i < s.length; i++) {
        var a = s[i];
        "select" === a.control ? o += t_store_filters_opts_getHtml_customSelect(a, r) : "checkbox" === a.control ? o += t_store_filters_opts_getHtml_checkbox(a, r) : "range" === a.control && "price" === a.name && (o += t_store_filters_opts_getHtml_range(a, r))
    }
    return o += "</div>", o
}

function t_store_filters_opts_getOption(t) {
    var e = t_store_option_getOptionsData();
    if (!e) return null;
    var r = t.type && "option" === t.type ? e[t.label] : null;
    if (!r) return null;
    var o = t_store_option_checkIfCustom(r);
    return o ? r : null
}

function t_store_filters_opts_getHtml_customSelect(t, e) {
    var r = "",
        o = t_store_filters_opts_getOption(t);
    if (o && o.params && o.params.hasColor) return t_store_filters_opts_getHtml_checkbox(t, e);
    var s, i = "",
        a = "";
    o && (i = t_store_option_getClassModificator(o, "filter", "t-store__filter__item"), a = t_store_option_getClassModificator(o, "filter", "t-store__filter__item-controls-container"), s = o.params && o.params.hasColor);
    var n = "sort" === t.name ? "t-store__filter__item_sort-mobile" : "",
        _ = o ? " t-store__filter__item_custom " : " ";
    r += '<div class="' + n + " t-store__filter__item" + _ + i + ' t-store__filter__item_select js-store-filter-item t-descr t-descr_xxs">', r += '    <div class="t-store__filter__item-title js-store-filter-item-title" data-filter-name="' + t.name.toLowerCase() + '">' + t.label + "</div>", r += '    <div class="t-store__filter__item-controls-wrap js-store-filter-item-controls-wr">', r += '        <div class="t-store__filter__item-controls-container ' + a + '" data-type="selectbox">', r += '        <input type="hidden" class="js-store-filter-opt" name="' + t.name + '">';
    var l = !1;
    if (t.values) {
        t.values = t_store_product_sortValues(t.values, "filter"), l = e.sidebar && t.values.length > 10;
        for (var d = 0; d < t.values.length; d++) {
            var c = t.values[d].value,
                p = t.values[d].text,
                u = t_store_option_getClassModificator(o, "filter", "t-store__filter__custom-sel");
            if (u = e.sidebar && d > 9 ? u += " t-store__filter__custom-sel_hidden " : u += "", "" !== c) {
                var f = "";
                if (f = '<div class="t-store__filter__custom-sel ' + u + " js-store-filter-custom-select " + n + '" data-select-val="" data-filter-value="" type="selectbox">', s) {
                    var v = o ? ' style="background-color: ' + t_store_option_getColorValue(o.values, c) + ';"' : "",
                        h = t_store_option_getClassModificator(o, "filter", "t-store__filter__checkmark");
                    f += '<div class="t-store__filter__checkmark ' + h + '"' + v + "></div>"
                }
                var g = t_store_option_getClassModificator(o, "filter", "t-store__filter__title");
                f += '<div class="t-store__filter__title ' + g + '">' + (p || c) + "</div>", f += "    </div>";
                var m = jQuery.parseHTML(f);
                $(m).attr("data-select-val", c).attr("data-filter-value", c), r += $(m)[0].outerHTML
            }
        }
    }
    return r += "        </div>", l && (r += t_store_filters_opts_getHtml_expandButton()), r += "    </div>", r += "</div>", r
}

function t_store_filters_opts_getHtml_checkbox(t, e) {
    var r, o, s = "",
        i = t_store_filters_opts_getOption(t),
        a = "",
        n = "";
    i && (a = t_store_option_getClassModificator(i, "filter", "t-store__filter__item"), n = t_store_option_getClassModificator(i, "filter", "t-store__filter__item-controls-container"), r = i.params && i.params.hasColor, o = i.params && i.params.linkImage && !i.params.hasColor);
    var _ = i ? " t-store__filter__item_custom " : " ";
    if ("quantity" === t.name) s += '<div class="t-store__filter__item t-store__filter__item_available js-store-filter-item t-descr t-descr_xxs">', s += '<div class="t-store__filter__item-title js-store-filter-item-title" data-filter-name="quantity">', s += t.label ? t.label : t_store_dict("filter-available-name"), s += "</div>", s += '<div class="t-store__filter__item-controls-wrap js-store-filter-item-controls-wr">', s += '<label class="t-checkbox__control t-descr t-descr_xxs">', s += '<input class="t-checkbox js-store-filter-onlyavail" type="checkbox" name="' + t_store_dict("filter-available-label") + '" data-filter-value="' + t_store_dict("filter-available-label") + '">', s += '<div class="t-checkbox__indicator"></div>', s += t_store_dict("filter-available-label"), s += "</label>", s += "</div>", s += "</div>";
    else {
        s += '<div class="t-store__filter__item ' + _ + a + ' t-store__filter__item_checkbox js-store-filter-item t-descr t-descr_xxs">', s += '    <div class="t-store__filter__item-title js-store-filter-item-title" data-filter-label="' + t.label.toLowerCase() + '" data-filter-name="' + t.name + '">' + t.label + "</div>", s += '    <div class="t-store__filter__item-controls-wrap js-store-filter-item-controls-wr">', s += '        <div class="t-store__filter__item-controls-container ' + n + '" data-type="checkbox">', s += '            <input type="hidden" class="js-store-filter-opt" name="' + t.name + '" data-info-type="array">';
        var l = !1,
            d = r || o;
        if (t.values) {
            t.values = t_store_product_sortValues(t.values, "filter"), l = e.sidebar && t.values.length > 10;
            for (var c = 0; c < t.values.length; c++) {
                var p = t.values[c].value,
                    u = t_store_option_getClassModificator(i, "filter", "t-store__filter__checkbox");
                u = e.sidebar && c > 9 ? u += " t-checkbox__control_hidden " : u += "";
                var f = d ? "t-store__filter__checkmark " + t_store_option_getClassModificator(i, "filter", "t-store__filter__checkmark") : "",
                    v = i && r ? ' style="background-color: ' + t_store_option_getColorValue(i.values, p) + ';"' : "";
                if ("" !== p) {
                    var h = "";
                    h = '<label class="t-checkbox__control t-store__filter__checkbox ' + u + ' t-descr t-descr_xxs">', h += '<input class="t-checkbox js-store-filter-opt-chb" type="checkbox" name="" data-filter-value="">', h += '<div class="t-checkbox__indicator ' + f + '" ' + v + "></div>";
                    var g = t_store_option_getClassModificator(i, "filter", "t-store__filter__title");
                    h += '<span class="t-store__filter__title ' + g + '">' + p + "</span>", h += "</label>";
                    var m = jQuery.parseHTML(h);
                    $(m).find(".js-store-filter-opt-chb").attr("name", p).attr("data-filter-value", p), s += $(m)[0].outerHTML
                }
            }
        }
        s += "        </div>", l && (s += t_store_filters_opts_getHtml_expandButton()), s += "    </div>", s += "</div>"
    }
    return s
}

function t_store_filters_opts_getHtml_range(t, e) {
    var r = t_store_filters_priceRange_checkIfAllowed(),
        o = "";
    return o += '<div class="t-store__filter__item t-store__filter__item_price js-store-filter-item t-descr t-descr_xxs">', o += '    <div class="t-store__filter__item-title js-store-filter-item-title">', o += t.label ? t.label : t_store_dict("filter-price-name"), o += "    </div>", e.sidebar && r && (o += t_store_filters_opts_getHtml_sliderRange(t)), o += '    <div class="t-store__filter__item-controls-wrap t-store__filter__item-price-box js-store-filter-item-controls-wr">', o += '        <input class="t-store__filter__input js-store-filter-pricemin" type="text" name="price:min" data-min-val="' + t.min + '" value="' + t_store__getFormattedPrice(e, t.min) + '">', o += '&nbsp;—&nbsp;<input class="t-store__filter__input js-store-filter-pricemax" type="text" name="price:max" data-max-val="' + t.max + '" value="' + t_store__getFormattedPrice(e, t.max) + '">', o += '<button class="t-store__filter__btn js-store-filter-price-btn">OK</button>', o += "    </div>", o += "</div>", o
}

function t_store_filters_opts_getHtml_sliderRange(t) {
    var e = "";
    e += '<div class="t-store__filter__item-controls-wrap t-store__filter__item-price-slider js-store-filter-item-controls-wr">', e += '<div class="t-store__filter__price-outer t-store__filter__price-outer_start"></div>', e += '<div class="t-store__filter__price-outer t-store__filter__price-outer_end"></div>';
    var r = t_store_filters_price_countDecimals([t.min, t.max]),
        o = "";
    return o = 1 === r ? .1 : r >= 2 ? .01 : 1, e += '<input class="t-store__filter__range t-store__filter__range_min" type="range" name="price_range" min="' + t.min + '" max="' + t.max + '" step="' + o + '" data-min-val="' + t.min + '" value="' + t_prod__cleanPrice(t.min) + '">', e += '<input class="t-store__filter__range t-store__filter__range_max" type="range" name="price_range" min="' + t.min + '" max="' + t.max + '" step="' + o + '" data-max-val="' + t.max + '" value="' + t_prod__cleanPrice(t.max) + '">', e += '<div class="t-store__filter__range_bg"></div>', e += "</div>", e
}

function t_store_filters_opts_checkboxes_groupCheckedToHiddenInput(t) {
    var e = $("#rec" + t);
    e.find(".js-store-filter-opt-chb").on("change", function() {
        t_store_filters_opts_checkboxes_changeHiddenInput($(this))
    })
}

function t_store_filters_opts_checkboxes_changeHiddenInput(t, e) {
    var r = t.parents(".js-store-filter-item").find(".js-store-filter-opt"),
        o = r.val();
    if (t[0].checked) e ? o = t.attr("name") : "" === o ? o = t.attr("name") : o += "&&" + t.attr("name");
    else {
        var s = o.split("&&"),
            i = s.indexOf(t.attr("name")); - 1 !== i && s.splice(i, 1), o = s.join("&&")
    }
    r.val(o)
}

function t_store_filters_opts_getHtml_expandButton() {
    var t = "";
    return t += '<button class="t-store__filter__btn-expand js-store-filter-btn-expand" data-expanded="no" type="button">', t += '<span class="t-store__filter__btn-text t-descr t-descr_xxs">' + t_store_dict("filter-expand") + "</span>", t += "</button>", t
}

function t_store_filters_opts_customSelect_saveToHiddenInput(t) {
    var e = $("#rec" + t);
    e.find(".js-store-filter-custom-select").on("click", function() {
        var t = $(this).parents(".js-store-filter-item").find(".js-store-filter-opt"),
            e = $(this).parents(".js-store-filter-item");
        if ($(this).hasClass("active")) return $(this).removeClass("active"), void t.val("");
        var r = $(this).attr("data-select-val");
        t.val(r), e.find(".js-store-filter-custom-select").removeClass("active"), $(this).addClass("active")
    })
}

function t_store_filters_opts_customSelect_changeHiddenInput(t) {
    var e = t.parents(".js-store-filter-item").find(".js-store-filter-opt"),
        r = t.attr("data-select-val");
    e.val(r), e.data("previousVal", r)
}

function t_store_filters_opts_chosenVals_getHtml() {
    var t = "";
    return t += '<div class="t-store__filter__chosen-wrapper js-store-opts-chosen-wrapper">', t += '<div class="t-store__filter__reset js-store-filter-reset t-descr t-descr_xxs">' + t_store_dict("filter-reset") + "</div>", t += "</div>", t
}

function t_store_filters_prodsNumber_getHtml() {
    var t = "";
    return t += '<div class="t-store__filter__prods-number js-store-filters-prodsnumber-wrap t-descr t-descr_xxs" style="display:none;">', t += t_store_dict("filter-prodsnumber"), t += ': <span class="js-store-filters-prodsnumber">', t += "</span>", t += "</div>", t
}

function t_store_filters_prodsNumber_update(t, e, r) {
    if (e.filters) {
        var o = t.find(".t-store__filter__chosen-bar");
        Object.keys(e.filters).length && e.previewmode.length ? o.show() : o.hide();
        var s = Object.keys(e.filters).length;
        if (s > 0 && r && r.products.length > 0 && e.isPublishedPage) return o.show(), t.find(".js-store-filters-prodsnumber").text(r.total), void t.find(".js-store-filters-prodsnumber-wrap").show();
        if (t.find(".js-store-filters-prodsnumber-wrap").hide(), e.sidebar) {
            var i = o.find(".t-store__filter__chosen-val");
            i.length || o.hide()
        }
    }
}

function t_store_filters_opts_chosenVal_add(t, e, r, o) {
    var s = r.closest(".t-store__filter__item-controls-container").find(".js-store-filter-opt").attr("name"),
        i = !!$("#rec" + t).find('.t-store__filter__chosen-val[data-option-name="' + s + '"][data-field-val="' + e + '"]')[0];
    if (!i) {
        var a = '<div class="t-store__filter__chosen-val js-store-filter-chosen-item t-descr t-descr_xxs" data-field-val=""></div>',
            n = jQuery.parseHTML(a);
        $(n).attr("data-field-val", e).text(t_store_unescapeHtml(o || e)), s && $(n).attr("data-option-name", s);
        var _ = $(n)[0].outerHTML,
            l = $("#rec" + t).find(".js-store-opts-chosen-wrapper");
        l.prepend(_);
        var d = s ? l.find('.js-store-filter-chosen-item[data-field-val="' + e + '"][data-option-name="' + s + '"]') : l.find('.js-store-filter-chosen-item[data-field-val="' + e + '"]');
        d.data("controlElem", r), l.find(".js-store-filter-chosen-item").length > 1 && l.find(".js-store-filter-reset").addClass("t-store__filter__reset_visible")
    }
}

function t_store_filters_handleOnChange(t, e) {
    var r = $("#rec" + t);
    t_store_filters_handleOnChange_avail(t, e, r), t_store_filters_handleOnChange_price(t, e, r), e.sidebar && t_store_filters_handleOnChange_priceRange(t, e, r), t_store_filters_handleOnChange_checkbox(t, e, r), t_store_filters_handleOnChange_selectbox(t, e, r), t_store_filters_handleOnChange_sort(t, e, r), t_store_filters_handleOnChange_search(t, e, r), t_store_filters_opts_checkedValues_hideOnClick(t, e)
}

function t_store_filters_handleOnChange_avail(t, e, r) {
    r.find(".js-store-filter-onlyavail").on("change", function() {
        var o = $(this).attr("name"),
            s = $(this).hasClass("js-store-filter-onlyavail");
        s && (o = "y");
        var i = $(this).closest(".t-store__filter__item-controls-wrap").siblings(".js-store-filter-item-title"),
            a = $(i).data("filter-name");
        $(this)[0].checked ? (t_store_updateUrlWithParams("add", a, o, t), t_store_filters_opts_chosenVal_add(t, o, $(this), t_store_dict("filter-available-label"))) : (t_store_updateUrlWithParams("delete", a, o, t), t_store_filters_opts_chosenVal_hide(r, o)), t_store_filters_send(t, e)
    })
}

function t_store_filters_handleOnChange_price(t, e, r) {
    var o = r.find(".js-store-filter-item.t-store__filter__item_price"),
        s = t_prod__cleanPrice(r.find(".js-store-filter-pricemin").attr("data-min-val")),
        i = t_prod__cleanPrice(r.find(".js-store-filter-pricemax").attr("data-max-val")),
        a = r.find(".js-store-filter-pricemin"),
        n = r.find(".js-store-filter-pricemax");
    a.data("previousMin") || a.data("previousMin", s), e.sidebar && (a.on("change", function() {
        var o = t_store_filters_handleOnChange_price_checkMin(t, a, s, i, e);
        if (o) {
            t_store_filters_send(t, e);
            var n = r.find(".t-store__filter__range_min");
            n.trigger("input")
        }
    }), n.on("change", function() {
        var o = t_store_filters_handleOnChange_price_checkMax(t, n, s, i, e);
        if (o) {
            t_store_filters_send(t, e);
            var a = r.find(".t-store__filter__range_max");
            a.trigger("input")
        }
    })), a.on("keypress tstoreMinPriceTriggerReset", function(r) {
        if ("keypress" !== r.type || 13 === r.which) {
            var _ = !1,
                l = !1,
                d = !1;
            _ = t_store_filters_handleOnChange_price_checkMin(t, a, s, i, e), l = t_store_filters_handleOnChange_price_checkMax(t, n, s, i, e), d = _ || l, d && (t_store_filters_send(t, e), a.blur(), window.isMobile || o.removeClass("active"))
        }
    }), n.data("previousMax") || n.data("previousMax", i), n.on("keypress tstoreMaxPriceTriggerReset", function(r) {
        if ("keypress" !== r.type || 13 === r.which) {
            var _ = !1,
                l = !1,
                d = !1;
            _ = t_store_filters_handleOnChange_price_checkMin(t, a, s, i, e), l = t_store_filters_handleOnChange_price_checkMax(t, n, s, i, e), d = _ || l, d && (t_store_filters_send(t, e), n.blur(), window.isMobile || o.removeClass("active"))
        }
    });
    var _ = r.find(".js-store-filter-price-btn");
    _.on("click", function() {
        var r = !1,
            _ = !1,
            l = !1;
        r = t_store_filters_handleOnChange_price_checkMin(t, a, s, i, e), _ = t_store_filters_handleOnChange_price_checkMax(t, n, s, i, e), l = r || _, l && (t_store_filters_send(t, e), window.isMobile || o.removeClass("active"))
    })
}

function t_store_filters_handleOnChange_priceRange(t, e, r) {
    var o = t_store_filters_priceRange_checkIfAllowed();
    if (e.sidebar && o) {
        var s = r.find(".t-store__filter__range_min"),
            i = r.find(".t-store__filter__range_max"),
            a = r.find(".js-store-filter-pricemin"),
            n = r.find(".js-store-filter-pricemax"),
            _ = +a.attr("data-min-val"),
            l = +n.attr("data-max-val"),
            d = t_prod__cleanPrice(s.val()),
            c = t_prod__cleanPrice(i.val());
        t_store_filters_calcPriceOuterWidth(r, "start", _, l, d), t_store_filters_calcPriceOuterWidth(r, "end", _, l, c);
        var p = null,
            u = null;
        s.on("input", function() {
            var t = t_prod__cleanPrice(s.val()),
                o = t_prod__cleanPrice(s.val()),
                n = t_prod__cleanPrice(i.val());
            _ === l ? t = l : o > n ? t = n - 1 : o < _ ? t = _ : o >= l && (t = l - 1), s.val(t);
            var d = t ? t_store__getFormattedPrice(e, t.toString()) : t;
            a.val(d), t_store_filters_calcPriceOuterWidth(r, "start", _, l, t), p && clearTimeout(p), p = setTimeout(function() {
                a.trigger("tstoreMinPriceTriggerReset"), t_store_filters_scrollStickyBar(r)
            }, 1e3)
        }), i.on("input", function() {
            var t = t_prod__cleanPrice(i.val()),
                o = t_prod__cleanPrice(s.val()),
                a = t_prod__cleanPrice(i.val());
            _ === l ? t = l : a < o ? t = o + 1 : a <= _ ? t = _ + 1 : a > l && (t = l), i.val(t);
            var d = t ? t_store__getFormattedPrice(e, t.toString()) : t;
            n.val(d), t_store_filters_calcPriceOuterWidth(r, "end", _, l, t), u && clearTimeout(u), u = setTimeout(function() {
                n.trigger("tstoreMaxPriceTriggerReset"), t_store_filters_scrollStickyBar(r)
            }, 1e3)
        })
    }
}

function t_store_filters_handleOnChange_price_checkMax(t, e, r, o, s) {
    var i = $("#rec" + t),
        a = t_prod__cleanPrice(e.val());
    if (a !== e.data("previousMax")) {
        if (a = t_store_filters_handleOnChange_checkInRange(a, e, r, o, "max"), s && s.sidebar) {
            var n = i.find(".t-store__filter__range_max");
            n.val(a)
        }
        var _ = "< " + e.val();
        return e.data("previousMax") && t_store_filters_opts_chosenVal_hide(i, e.data("previousMax")), a !== o && t_store_filters_opts_chosenVal_add(t, a, e, _), e.data("previousMax", a), a !== o ? (e.attr("data-filter-value", a), t_store_updateUrlWithParams("update", "price:max", a, t)) : a <= o && (e.attr("data-filter-value", ""), t_store_updateUrlWithParams("delete", "price:max", a, t)), !0
    }
    return !1
}

function t_store_filters_handleOnChange_price_checkMin(t, e, r, o, s) {
    var i = $("#rec" + t),
        a = t_prod__cleanPrice(e.val());
    if (a !== e.data("previousMin")) {
        if (a = t_store_filters_handleOnChange_checkInRange(a, e, r, o, "min"), s && s.sidebar) {
            var n = i.find(".t-store__filter__range_min");
            n.val(a)
        }
        var _ = "> " + e.val();
        return e.data("previousMin") && t_store_filters_opts_chosenVal_hide(i, e.data("previousMin")), a !== r && t_store_filters_opts_chosenVal_add(t, a, e, _), e.data("previousMin", a), a !== r ? (e.attr("data-filter-value", a), t_store_updateUrlWithParams("update", "price:min", a, t)) : a >= r && (e.attr("data-filter-value", ""), t_store_updateUrlWithParams("delete", "price:min", a, t)), !0
    }
    return !1
}

function t_store_filters_handleOnChange_checkInRange(t, e, r, o, s) {
    return 0 === t && "max" === s ? (t = o, e.val(o)) : t > o ? (t = o, e.val(o)) : t < r && (t = r, e.val(r)), t
}

function t_store_filters_handleOnChange_checkbox(t, e, r) {
    r.find(".js-store-filter-opt-chb").on("change", function() {
        var o = $(this).attr("name"),
            s = $(this).closest(".t-store__filter__item-controls-wrap").siblings(".js-store-filter-item-title"),
            i = $(s).data("filter-name");
        $(this)[0].checked ? ($(this).parent().addClass("active"), t_store_updateUrlWithParams("add", i, o, t), t_store_filters_opts_chosenVal_add(t, o, $(this))) : ($(this).parent().removeClass("active"), t_store_updateUrlWithParams("delete", i, o, t), t_store_filters_opts_chosenVal_hide(r, o, $(this))), t_store_setActiveStorePart(t), t_store_filters_send(t, e), e.sidebar && (t_store_filters_opts_sort(e, t), t_store_filters_scrollStickyBar(r))
    })
}

function t_store_filters_handleOnChange_selectbox(t, e, r) {
    r.find(".js-store-filter-custom-select").on("click", function(o) {
        var s = $(o.target).hasClass("t-store__filter__item_sort-mobile") || $(this).hasClass("t-store__filter__item_sort-mobile"),
            i = $(this).attr("data-select-val"),
            a = $(this).text(),
            n = $(this).closest(".t-store__filter__item-controls-wrap").siblings(".js-store-filter-item-title"),
            _ = $(n).data("filter-name"),
            l = $(this).parents(".js-store-filter-item").find(".js-store-filter-opt"),
            d = l.data("previousVal");
        if (d && t_store_filters_opts_chosenVal_hide(r, d), d === i) return t_store_updateUrlWithParams("delete", _, i, t), t_store_setActiveStorePart(t), t_store_filters_send(t, e), l.data("previousVal", ""), void(e.sidebar && t_store_filters_opts_sort(e, t));
        s && r.find(".js-store-filter-sort").val(i), t_store_updateUrlWithParams("update", _, i, t), s || t_store_filters_opts_chosenVal_add(t, i, $(this), a), t_store_filters_send(t, e), l.data("previousVal", i), e.sidebar && (t_store_filters_opts_sort(e, t), t_store_filters_scrollStickyBar(r))
    })
}

function t_store_filters_handleOnChange_search(t, e, r) {
    var o = $("#rec" + t),
        s = "",
        i = r.find(".js-store-filter-search"),
        a = r.find(".js-store-filter-search-close"),
        n = r.find(".js-store-filter-search-btn");
    n.on("click", function() {
        s !== i.val() && (t_store_filters_opts_chosenVal_hide(r, s), s = i.val(), t_store_filters_handleOnChange_search_send(t, i, a, e))
    }), i.on("keypress tstoreSearchTriggerReset", function(o, n) {
        n && "" === s ? s = n : o.currentTarget.defaultValue && "" === s && (s = o.currentTarget.defaultValue, o.currentTarget.defaultValue = ""), "keypress" === o.type && 13 !== o.which || s !== i.val() && (t_store_filters_opts_chosenVal_hide(r, s), s = i.val(), t_store_filters_handleOnChange_search_send(t, i, a, e))
    }).on("keyup", function() {
        $(this).val().length > 0 ? a.show() : 0 === $(this).val().length && a.hide()
    }), a.on("click", function() {
        o.find('.js-store-filter-search[name="query"]').attr("value") && (s = o.find('.js-store-filter-search[name="query"]').attr("value")), t_store_filters_opts_chosenVal_hide(r, s), i.val(""), s = "", o.find('.js-store-filter-search[name="query"]')[0].defaultValue = "", t_store_filters_handleOnChange_search_send(t, i, a, e)
    })
}

function t_store_filters_handleOnChange_search_send(t, e, r, o) {
    var s = e.val();
    if ("" !== s) {
        var i = t_store_dict("searchplaceholder") + ": " + s;
        t_store_updateUrlWithParams("update", "query", s, t), t_store_filters_opts_chosenVal_add(t, s, e, i)
    } else r.hide(), t_store_updateUrlWithParams("delete", "query", s, t);
    t_store_filters_send(t, o), e.blur()
}

function t_store_filters_handleOnChange_sort(t, e, r) {
    r.find(".js-store-filter-sort").on("change", function(r) {
        $(this).find('[selected="selected"]').attr("selected", !1), $(r.currentTarget.selectedOptions[0]).attr("selected", !0), t_store_filters_send(t, e)
    })
}

function t_store_filters_calcPriceOuterWidth(t, e, r, o, s) {
    var i = o - r,
        a = "start" === e,
        n = a ? Math.ceil((s - r) / i * 100) : Math.ceil((o - s) / i * 100);
    a ? t.find(".t-store__filter__price-outer_start").css("width", n + "%") : t.find(".t-store__filter__price-outer_end").css("width", n + "%")
}

function t_store_filters_updatePriceRange(t) {
    var e = t_store_filters_priceRange_checkIfAllowed();
    if (e) {
        var r = t.find(".t-store__filter__range_min"),
            o = t.find(".t-store__filter__range_max"),
            s = t.find(".js-store-filter-pricemin"),
            i = t.find(".js-store-filter-pricemax");
        r.val(t_prod__cleanPrice(s.val())), o.val(t_prod__cleanPrice(i.val())), r.trigger("input"), o.trigger("input")
    }
}

function t_store_filters_price_countDecimals(t) {
    for (var e = 0, r = 0; r < t.length; r++) {
        var o = +t[r],
            s = o.toString(),
            i = 0; - 1 !== s.indexOf(".") && (i = s.split(".")[1].length), i > e && (e = i)
    }
    return e
}

function t_store_filters_opts_chosenVal_hide(t, e, r) {
    var o = r && r.length ? r.closest(".t-store__filter__item-controls-container").find(".js-store-filter-opt").attr("name") : null,
        s = o ? t.find('.js-store-filter-chosen-item[data-field-val="' + e + '"][data-option-name="' + o + '"]') : t.find('.js-store-filter-chosen-item[data-field-val="' + e + '"]'),
        i = "951" === t.attr("data-record-type");
    i && t_store_filters_updatePriceRange(t);
    var a = t.find(".t-store__filter__range_min");
    a.trigger("input"), s.remove(), t.find(".js-store-filter-chosen-item").length <= 1 && t.find(".js-store-filter-reset").removeClass("t-store__filter__reset_visible")
}

function t_store_filters_opts_checkedValues_hideOnClick(t, e) {
    var r, o = $("#rec" + t),
        s = o.find(".js-store-parts-select-container");
    s.on("click", ".js-store-filter-chosen-item", function() {
        var s = $(this),
            i = s.data("controlElem");
        if (!i || !i.length) return s.text() === t_store_dict("filter-available-label") && (t_store_updateUrlWithParams("delete", "quantity", null, t), t_store_filters_opts_chosenVal_hide(o, "y", $(this)), t_store_setActiveStorePart(t), t_store_filters_send(t, e), e.sidebar && (t_store_filters_opts_sort(e, t), t_store_filters_scrollStickyBar(o))), void console.log("smth wrong with current filter");
        if (i.hasClass("js-store-filter-opt-chb") || i.hasClass("js-store-filter-onlyavail")) i[0].checked = !1, i.trigger("change");
        else if (i.hasClass("js-store-filter-custom-select")) i.trigger("click");
        else if (i.hasClass("js-store-filter-pricemin")) r = t_store__getFormattedPrice(e, i.attr("data-min-val")), i.val(r), i.trigger("tstoreMinPriceTriggerReset"), t_store_updateUrlWithParams("delete", "price:min", null, t);
        else if (i.hasClass("js-store-filter-pricemax")) r = t_store__getFormattedPrice(e, i.attr("data-max-val")), i.val(r), i.trigger("tstoreMaxPriceTriggerReset"), t_store_updateUrlWithParams("delete", "price:max", null, t);
        else if (i.hasClass("js-store-filter-search")) {
            var a = i.val();
            i.val("").trigger("tstoreSearchTriggerReset", a)
        }
    })
}

function t_store_filters_scrollStickyBar(t) {
    var e = t.find(".t951__sidebar_sticky");
    e.length && $("html, body").animate({
        scrollTop: t.offset().top - 50
    }, 200)
}

function t_store_oneProduct_init(t, e) {
    var r = $("#rec" + t + " .js-store-product_single"),
        o = r.attr("data-product-gen-uid");
    o = t_store_oneProduct_clearUid(o), r.attr("data-product-gen-uid", o), t_store_oneProduct_preloader_add(t);
    var s = $(".t-records").attr("data-tilda-mode");
    e.isPublishedPage = "edit" !== s && "preview" !== s;
    var i = window.tStoreSingleProdsObj && !e.previewmode;
    !window.tStoreSingleProductsIsRequested || i ? (t_store_oneProduct_requestAllSingle(e), window.tStoreSingleProductsIsRequested = !0, r.bind("tStoreSingleProductsLoaded", function() {
        t_store_oneProduct_fill(t, window.tStoreSingleProdsObj[o], e)
    })) : window.tStoreSingleProdsObj ? t_store_oneProduct_fill(t, window.tStoreSingleProdsObj[o], e) : r.bind("tStoreSingleProductsLoaded", function() {
        t_store_oneProduct_fill(t, window.tStoreSingleProdsObj[o], e)
    })
}

function t_store_oneProduct_clearUid(t) {
    return t.replace("product id: ", "")
}

function t_store_oneProduct_preloader_add(t) {
    var e = $("#rec" + t),
        r = e.find(".js-store-product_single");
    if (!window.isSearchBot) {
        var o = r.find(".js-store-single-product-info");
        o.hide();
        var s = setTimeout(function() {
            var t = "";
            t += '<div class="t-store__single-prod-preloader" style="display:none;">';
            for (var e = '<div class="t-store__single-prod-preloader__text"></div>', s = 0; s < 6; s++) t += e;
            t += "</div>", o.before(t), r.find(".t-store__single-prod-preloader").fadeIn(200)
        }, 1e3);
        e.data("preloader-timeout", s)
    }
}

function t_store_oneProduct_preloader_hide(t) {
    var e = $("#rec" + t),
        r = e.find(".js-store-product_single");
    clearTimeout(e.data("preloader-timeout")), r.find(".js-store-single-product-info").show(), r.find(".t-store__single-prod-preloader").remove()
}

function t_store_oneProduct_requestAllSingle(t) {
    for (var e = $(".js-store-product_single"), r = [], o = 0; o < e.length; o++) {
        var s = $(e[o]).attr("data-product-gen-uid");
        s = t_store_oneProduct_clearUid(s), r.push(s)
    }
    t_store_loadProducts_byId(r, t).then(function(t) {
        "string" == typeof t && "{" === t.substr(0, 1) || console.log("Can't get products array by uid list");
        try {
            var r = jQuery.parseJSON(t),
                o = r.products
        } catch (e) {
            console.log(t)
        }
        "" !== o ? (r.options && r.options.length && !window.tStoreOptionsList && (window.tStoreOptionsList = r.options), window.tStoreSingleProdsObj = t_store_oneProduct_prodsArrToAssociative(o), e.trigger("tStoreSingleProductsLoaded")) : console.log("Something went wrong. Can't get products array by uid list. Please check products UID.")
    })
}

function t_store_oneProduct_prodsArrToAssociative(t) {
    var e = {};
    if (!t) return e;
    for (var r = 0; r < t.length; r++) {
        var o = t[r];
        e[o.uid] = o
    }
    return e
}

function t_store_oneProduct_fill(t, e, r) {
    var o = $("#rec" + t),
        s = o.find(".js-product");
    t_store_oneProduct_preloader_hide(t), e ? (t_store_oneProduct_successMsg_show(t, e, r), s.data("cardSize", "large"), t_store_oneProduct_fill_data(t, e, s, r), t_store_option_handleOnChange_custom(t, s, r)) : t_store_oneProduct_error_show(t, r)
}

function t_store_oneProduct_successMsg_show(t, e, r) {
    if (!r.previewmode) {
        var o = $("#rec" + t),
            s = "RU" === window.tildaBrowserLang ? "Товар успешно связан с каталогом. Название товара в каталоге: " : "Product is connected to catalog. Product name in catalog is ";
        s += "<b>" + e.title + "</b>", t_store_showMsgInRedactor(o, s, "success")
    }
}

function t_store_oneProduct_error_show(t, e) {
    if (!e.previewmode) {
        var r = $("#rec" + t),
            o = "RU" === window.tildaBrowserLang ? "Не удается получить товар из каталога. Пожалуйста, проверьте, что товар с таким ID существует." : "Can't find a product in the catalog. Please check that the product with this ID exists.";
        t_store_showMsgInRedactor(r, o, "error")
    }
}

function t_store_showMsgInRedactor(t, e, r) {
    t.find(".js-store-msg").remove();
    var o = "success" === r ? "#fff" : "#000",
        s = "success" === r ? "#62C584" : "yellow",
        i = "";
    i += '<div class="js-store-msg" style="margin: 0px;text-align: left; font-family: tfutura,Arial; color: ' + o + ';">', i += '   <div style="background: ' + s + '; padding: 16px 20px; box-sizing: border-box; margin-bottom: 30px; position: relative;" class="t-container">', i += '       <div style="width: 40px; height: 40px; position: absolute; left: 20px; bottom: -40px;">', i += '       <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="40px" width="40px"><polygon fill="' + s + '" stroke="' + s + '" stroke-width="0" points="0,0 40,0 0,20 0,0"></polygon></svg>', i += "       </div>", i += e, i += "   </div>", i += "</div>", t.prepend(i)
}

function t_store_oneProduct_fill_data(t, e, r, o) {
    t_store_addProductOptions(t, e, r, o, "largecard"), t_store_onFuncLoad("t_prod__init", function() {
        t_prod__init(t)
    }), $(window).trigger("resize")
}

function t_store_isQueryInAddressBar(t) {
    var e = decodeURI(window.location.href);
    return -1 !== e.indexOf(t)
}

function t_store_getColumnWidth(t) {
    var e = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        r = e > 1200 ? "minWidth1200" : "maxWidth1200",
        o = {
            minWidth1200: {
                col_1: 60,
                col_2: 160,
                col_3: 260,
                col_4: 360,
                col_5: 460,
                col_6: 560,
                col_7: 660,
                col_8: 760,
                col_9: 860,
                col_10: 960,
                col_11: 1060,
                col_12: 1160
            },
            maxWidth1200: {
                col_1: 60,
                col_2: 140,
                col_3: 220,
                col_4: 300,
                col_5: 380,
                col_6: 460,
                col_7: 540,
                col_8: 620,
                col_9: 700,
                col_10: 780,
                col_11: 860,
                col_12: 940
            }
        };
    return o[r]["col_" + t]
}

function t_store_paramsToObj(t, e) {
    var r;
    try {
        r = decodeURI(window.location.search)
    } catch (t) {
        r = window.location.search
    }
    var o = {
        otherParams: []
    };
    o[t] = {};
    try {
        r = r.replace(/&amp;/g, "%26amp")
    } catch (t) {
        console.log(t)
    }
    var s = r.slice(1).split("&");
    if (s = s.map(function(t) {
            return t.replace(/%26amp/g, "&amp;")
        }), o.otherParams = s.filter(function(t) {
            var e = /^tfc_/i.test(t) || /^s_/i.test(t);
            return !e && t
        }), -1 !== window.location.href.indexOf("s_recid=")) {
        var i = window.location.href.split("s_recid=")[1].split("&")[0];
        i == t && s.splice(1).forEach(function(e) {
            try {
                var r = /^s_/i.test(e),
                    s = $("#rec" + t).length;
                if (!s) return;
                if (o[t] || (o[t] = {}), r) {
                    e = e.replace(/^s_/i, "tfc_"), e = e.replace(/%3A/gi, ":");
                    var i = e.split("="),
                        a = i[0],
                        n = i[1].replace(/\+/g, " ").split("%2B"),
                        _ = a.replace(/^tfc_/i, "");
                    o[t][_] = o[t][_] ? o[t][_].concat(n) : n
                }
            } catch (t) {
                console.log(t)
            }
        })
    } else -1 !== window.location.href.indexOf("tfc_") && s.forEach(function(t) {
        var e = t.split("=");
        try {
            var r = /^tfc_/i.test(t);
            if (r) {
                var s = e[0],
                    i = e[1].replace(/\+/g, " ").split("%2B"),
                    a = new RegExp(/\[\d.*\]$/, "gi"),
                    n = s.match(a),
                    _ = n ? Number(JSON.parse(n[0])) : null;
                if (!_) return void console.error("Can't find recid in URL param");
                var l = $("#rec" + _).length;
                if (!l) return;
                var d = s.replace(a, "").replace("tfc_", "");
                o[_] || (o[_] = {}), o[_][d] = o[_][d] ? o[_][d].concat(i) : i
            }
        } catch (t) {
            console.log(t)
        }
    });
    window.tStoreCustomUrlParams = o, t_store_paramsToObj_updateUrl(o);
    var a = t_store_paramsToObj_getDefaultSort(t, e.defaultSort);
    for (var n in a) {
        var _ = a[n].sort,
            l = a[n].quantity;
        (_ || l) && (o[n] && o[n].sort && e.previewmode || _ && (o[n] || (o[n] = {}), o[n].sort = _), o[n] && "y" === o[n].quantity && e.previewmode || l && (o[n] || (o[n] = {}), o[n].quantity = "y"))
    }
    return window.tStoreCustomUrlParams = o, o
}

function t_store_paramsToObj_updateUrl(t) {
    var e = t_store_customURLParamsToString(t);
    window.location.hash && (e += window.location.hash);
    try {
        window.history.replaceState(null, null, e)
    } catch (t) {}
}

function t_store_paramsToObj_getDefaultSort(t, e) {
    var r = window.tStoreDefaultSort ? window.tStoreDefaultSort : {};
    if (!e) return r;
    if (e.default) {
        var o = {
            "sort-price-asc": "price:asc",
            "sort-price-desc": "price:desc",
            "sort-name-asc": "title:asc",
            "sort-name-desc": "title:desc",
            "sort-created-asc": "created:asc",
            "sort-created-desc": "created:desc"
        };
        r[t] || (r[t] = {}), r[t].sort = new Array(o[e.default])
    }
    return e.in_stock && (r[t] || (r[t] = {}), r[t].quantity = "y"), window.tStoreDefaultSort = r, r
}

function t_store_customURLParamsToString(t) {
    var e = "",
        r = "";
    for (var o in t) {
        var s = t[o];
        if ("otherParams" !== o)
            for (var i in s) try {
                var a = Array.isArray(s[i]) ? s[i].join("[[PLUS]]") : s[i].toString();
                a = a.replace(/%/g, "%25"), a = a.replace(/\[\[PLUS\]\]/g, "%2B"), a = a.replace(/%26amp/g, "&amp;"), a = a.replace(/\s/gi, "+"), e += e.length ? "&" : "?", e += "tfc_" + i + "[" + o + "]=" + a
            } catch (t) {
                console.log(t)
            }
    }
    return t.otherParams && t.otherParams.length && (t.otherParams.forEach(function(t) {
        t.length && (r += "&" + t)
    }), e = e.length ? e + r : "?" + r.slice(1)), e.length ? e : window.location.origin + window.location.pathname
}

function t_store_updateUrlWithParams(t, e, r, o) {
    try {
        var s = window.tStoreCustomUrlParams || {};
        switch (s[o] || (s[o] = {}), t) {
            case "add":
                s[o][e] ? s[o][e].push(r) : s[o][e] = [r];
                break;
            case "update":
                s[o][e] = [r];
                break;
            case "delete":
                if (!s[o][e]) break;
                var i = "string" == typeof s[o][e] || "query" === e || "sort" === e || "price:min" === e || "price:max" === e || "quantity" === e;
                i ? delete s[o][e] : s[o][e] = s[o][e].filter(function(t) {
                    return t !== r
                }), s[o][e] && !s[o][e].length && (s[o][e] = null, delete s[o][e]);
                break;
            case "delete_all":
                delete s[o]
        }
        window.tStoreCustomUrlParams = s, t_store_paramsToObj_updateUrl(s)
    } catch (t) {
        console.log("something wrong in t_store_updateUrlWithParams", t)
    }
}

function t_store_updateOptionsBasedOnUrl(t, e, r) {
    try {
        var o = e[r];
        for (var s in t.filters = {}, o)
            if ("sort" !== s) {
                var i = -1 !== s.indexOf("price:m") || -1 !== s.indexOf("quantity");
                t.filters[s] = i ? o[s].toString() : o[s]
            } else {
                t.sort = {};
                var a = o[s].join().split(":"),
                    n = (s = a[0], a[1]);
                t.sort[s] = n
            } return t
    } catch (t) {
        console.log("something wrong in t_store_updateOptionsBasedOnUrl", t)
    }
}

function t_store_filters_opts_sort(t, e) {
    if (t.sidebar) {
        var r = $("#rec" + e),
            o = r.find(".t-store__filter__item-controls-container");
        o.each(function() {
            var t = $(this).attr("data-type");
            if ("checkbox" === t) {
                var e = $(this).find(".t-checkbox__control"),
                    r = [];
                e.each(function(t, e) {
                    var o = $(e).find(".js-store-filter-opt-chb").attr("data-filter-value");
                    r.push(o)
                });
                var o = e.sort(function(t, e) {
                    var o = $(t).find(".js-store-filter-opt-chb"),
                        s = $(e).find(".js-store-filter-opt-chb");
                    if (o.is(":checked") && !s.is(":checked")) return -1;
                    if (!o.is(":checked") && s.is(":checked")) return 1;
                    if (!o.is(":checked") && !s.is(":checked")) {
                        var i = o.attr("data-filter-value"),
                            a = s.attr("data-filter-value"),
                            n = [i, a].sort();
                        return n = t_store_product_sortValues(n, "string", r), n.indexOf(i) - n.indexOf(a)
                    }
                    return 0
                });
                o.each(function() {
                    var t = $(this).find(".js-store-filter-opt-chb");
                    t.is(":checked") && $(this).removeClass("t-checkbox__control_hidden")
                }), $(this).append(o)
            } else if ("selectbox" === t) {
                e = $(this).find(".t-store__filter__custom-sel"), r = [];
                e.each(function(t, e) {
                    var o = $(this).attr("data-filter-value");
                    r.push(o)
                });
                o = e.sort(function(t, e) {
                    if ($(t).hasClass("active") && $(e).hasClass("active")) return 1;
                    if ($(t).hasClass("active") && !$(e).hasClass("active")) return -1;
                    if (!$(t).hasClass("active") && !$(e).hasClass("active")) {
                        var o = $(t).attr("data-filter-value"),
                            s = $(e).attr("data-filter-value"),
                            i = [o, s].sort();
                        return i = t_store_product_sortValues(i, "string", r), i.indexOf(o) - i.indexOf(s)
                    }
                    return 0
                });
                o.each(function() {
                    $(this).hasClass("active") && $(this).removeClass("t-store__filter__custom-sel_hidden")
                }), $(this).append(o)
            }
        })
    }
}

function t_store_filters_render_selected(t, e) {
    try {
        var r, o, s = $("#rec" + e),
            i = Object.assign({}, t.filters),
            a = Object.assign({}, t.sort);
        for (var n in i) "string" == typeof i[n] && (i[n] = [i[n]]), i[n].forEach(function(a) {
            var _;
            if (o = s.find('[data-filter-value="' + a + '"]'), "price:min" === n) o = s.find('[name="price:min"]'), o.data("previousMin", parseInt(a, 10)), o.attr("value", t_store__getFormattedPrice(t, a)), _ = "> " + a, t_store_filters_opts_chosenVal_add(e, a, o, _), t.sidebar && s.find(".t-store__filter__range_min").val(a);
            else if ("price:max" === n) o = s.find('[name="price:max"]'), o.data("previousMax", parseInt(a, 10)), o.attr("value", t_store__getFormattedPrice(t, a)), _ = "< " + a, t_store_filters_opts_chosenVal_add(e, a, o, _), t.sidebar && s.find(".t-store__filter__range_max").val(a);
            else if ("query" === n) s.find(".js-store-filter-search-close").show(), o = s.find('[name="query"]'), o.attr("value", a), o.val(a), _ = t_store_dict("searchplaceholder") + ": " + a, t_store_filters_opts_chosenVal_add(e, a, o, _);
            else if ("quantity" === n) o = s.find(".js-store-filter-onlyavail"), o.length && o.prop("checked", !0), _ = t_store_dict("filter-available-label"), t_store_filters_opts_chosenVal_add(e, a, o, _);
            else if (o.length > 0) switch (r = o.attr("type"), r) {
                case "checkbox":
                    o.each(function() {
                        var t = $(this).closest(".t-store__filter__item-controls-container").find(".js-store-filter-opt").attr("name"),
                            r = i[t] && -1 !== i[t].indexOf(a);
                        r && ($(this).prop("checked", !0), $(this).parent().addClass("active"), t_store_filters_opts_chosenVal_add(e, a, $(this)), t_store_filters_opts_checkboxes_changeHiddenInput($(this)))
                    });
                    break;
                case "selectbox":
                    o.each(function() {
                        var t = $(this).closest(".t-store__filter__item-controls-container").find(".js-store-filter-opt").attr("name"),
                            r = i[t] && -1 !== i[t].indexOf(a);
                        r && (t_store_filters_opts_chosenVal_add(e, a, $(this)), $(this).addClass("active"), t_store_filters_opts_customSelect_changeHiddenInput($(this)))
                    })
            }
        });
        for (var _ in a) {
            var l = _ + ":" + a[_],
                d = s.find('option[data-filter-value="' + l + '"]'),
                c = s.find('.js-store-filter-custom-select[data-filter-value="' + l + '"]');
            d.attr("selected", "selected"), c.addClass("active")
        }
    } catch (t) {
        console.log("something wrong in t_store_filters_render_selected", t)
    }
}

function t_store_option_getOptionsData() {
    var t = window.tStoreOptionsList;
    if (!t) return null;
    for (var e = {}, r = 0; r < t.length; r++) {
        var o = t[r],
            s = o.title;
        o.params && "string" == typeof o.params && (o.params = JSON.parse(o.params)), o.values && "string" == typeof o.values && (o.values = JSON.parse(o.values)), e[s] = o
    }
    return e
}

function t_store_option_checkIfCustom(t) {
    var e = t.params;
    return !(!e || Array.isArray(e)) && (!(!e.view || "select" === e.view) || !(!e.hasColor && !e.linkImage))
}

function t_store_tabs_handleOnChange(t, e) {
    var r = e.find(".t-store__tabs"),
        o = r.attr("data-tab-design"),
        s = "accordion" === o,
        i = e.find(".js-store-tab-button");
    if (i.off("click"), i.on("click", function() {
            var t = $(this).attr("data-tab-title"),
                e = r.find(".t-store__tabs__list");
            if (s) {
                var o = $(this).parent();
                o.find(".t-store__tabs__content").slideToggle(300), o.find(".t-store__tabs__item-button").toggleClass("t-store__tabs__item-button_active"), o.toggleClass("t-store__tabs__item_active"), e.find(".t-store__tabs__item").each(function() {
                    var e = $(this).attr("data-tab-title"),
                        r = $(this).find(".t-store__tabs__content"),
                        o = $(this).find(".t-store__tabs__item-button"),
                        s = $(this).hasClass("t-store__tabs__item_active");
                    e !== t && s && (r.slideToggle(300), $(this).toggleClass("t-store__tabs__item_active"), o.toggleClass("t-store__tabs__item-button_active"))
                })
            } else {
                e.find(".t-store__tabs__item").each(function() {
                    var e = $(this).attr("data-tab-title");
                    e === t ? ($(this).addClass("t-store__tabs__item_active"), $(this).find(".t-store__tabs__content").css("opacity", 0), $(this).find(".t-store__tabs__content").show(), setTimeout(function() {
                        t_store_tabs_animateHeight(r)
                    }, 0)) : ($(this).removeClass("t-store__tabs__item_active"), $(this).find(".t-store__tabs__content").hide())
                });
                var i = $(this).hasClass("t-store__tabs__button_active"),
                    a = $(this).closest(".t-store__tabs__controls");
                if (i || !a.length) return;
                a.find(".t-store__tabs__button").each(function() {
                    var e = $(this).attr("data-tab-title");
                    e === t ? $(this).addClass("t-store__tabs__button_active") : $(this).removeClass("t-store__tabs__button_active")
                })
            }
            r.attr("data-active-tab", t)
        }), !s) {
        var a = r.find(".t-store__tabs__controls");
        t_store_tabs_handleFade(a), a.on("scroll", function() {
            t_store_tabs_handleFade($(this))
        })
    }
}

function t_store_tabs_animateHeight(t) {
    var e = t.height(),
        r = t.css({
            height: "auto"
        }).height();
    t.find(".t-store__tabs__content").css("opacity", 1), t.css({
        height: e
    }).animate({
        height: r
    }, 500)
}

function t_store_tabs_handleFade(t) {
    var e = t.parent();
    if ($(window).width() < 560) {
        var r = 10,
            o = t.width(),
            s = t.scrollLeft(),
            i = t[0].scrollWidth;
        s > r ? e.addClass("t-store__tabs__controls-wrap_left") : e.removeClass("t-store__tabs__controls-wrap_left"), i - o > s + r ? e.addClass("t-store__tabs__controls-wrap_right") : e.removeClass("t-store__tabs__controls-wrap_right")
    } else e.removeClass("t-store__tabs__controls-wrap_left"), e.removeClass("t-store__tabs__controls-wrap_right")
}

function t_store_option_handleOnChange_custom(t, e, r) {
    var o = e.find(".t-product__option-variants_custom");
    $(".js-product-edition-option-variants").off("change"), $(".js-product-edition-option-variants").change(function() {
        var e = $(this).closest(".js-product-edition-option"),
            o = e.find(".t-product__option-variants_custom");
        if (e.length && o.length) {
            var s = $(this).val(),
                i = o.find(".t-product__option-item_active");
            if (i.length) {
                var a = i.find(".t-product__option-input");
                if (a.val() !== s) {
                    a.prop("checked", !1);
                    var n = o.find('.t-product__option-input[value="' + s + '"]');
                    n.prop("checked", !0).click(), setTimeout(function() {
                        t_store_unifyCardsHeights(t, r), r.verticalAlignButtons && t_store_verticalAlignButtons(t, r)
                    }, 50)
                }
            }
        }
    }), o.length && o.each(function() {
        var e = $(this).find(".t-product__option-input"),
            o = $(this).find(".t-product__option-item"),
            s = $(this).parent().find(".t-product__option-variants_regular .js-product-edition-option-variants");
        e.off("change"), e.change(function() {
            var e = $(this).val();
            e = e.replace(/&/g, "&amp;"), s.val(e).change(), o.removeClass("t-product__option-item_active"), $(this).parent().addClass("t-product__option-item_active"), setTimeout(function() {
                t_store_unifyCardsHeights(t, r), r.verticalAlignButtons && t_store_verticalAlignButtons(t, r)
            }, 50)
        })
    });
    var s = e.find(".t-product__option-selected_select");
    if (s.length) {
        o = s.parent().find(".t-product__option-variants_custom");
        s.off("click"), s.on("click", function() {
            $(this).next(".t-product__option-variants_custom").toggleClass("t-product__option-variants_hidden"), "y" === window.lazy && t_lazyload_update()
        });
        var i = o.find(".t-product__option-item");
        i.off("click"), i.on("click", function() {
            i.removeClass("t-product__option-item_active"), $(this).addClass("t-product__option-item_active"), $(this).closest(".t-product__option-variants_custom").addClass("t-product__option-variants_hidden");
            var t = $(this).find(".t-product__option-title").text(),
                e = $(this).closest(".t-product__option").find(".t-product__option-selected-title");
            e.text(t);
            var r = $(this).closest(".t-product__option").find(".t-product__option-selected.t-product__option-selected_color");
            if (r.length) {
                var o = $(this).find(".t-product__option-checkmark_color").css("background-color"),
                    s = r.find(".t-product__option-selected-checkmark");
                s.css("background-color", o)
            }
            var a = $(this).closest(".t-product__option").find(".t-product__option-selected.t-product__option-selected_image");
            if (a.length) {
                var n = $(this).find(".t-product__option-checkmark_image").css("background-image");
                s = a.find(".t-product__option-selected-checkmark");
                s.css("background-image", "none"), s.css("background-image", n)
            }
        }), $(document).off("click outsideCustomDropdown"), $(document).on("click outsideCustomDropdown", function(t) {
            var e = $(t.target),
                r = e.closest(".t-product__option-variants_custom");
            r.length && $.contains(r[0], e[0]) || e.hasClass("t-product__option-selected") || e.parents(".t-product__option-selected").length || $(".t-product__option-variants_custom.t-product__option-variants_select").addClass("t-product__option-variants_hidden")
        })
    }
}

function t_store_unescapeHtml(t) {
    return $("<div />").html(t).text()
}

function t_store_filters_priceRange_checkIfAllowed() {
    var t = !!document.documentMode;
    return !t
}

function t_store_onFuncLoad(t, e, r) {
    if ("function" == typeof window[t]) e();
    else {
        var o = Date.now();
        setTimeout(function s() {
            var i = Date.now();
            if ("function" != typeof window[t]) {
                if ("complete" === document.readyState && i - o > 5e3 && "function" != typeof window[t]) throw new Error(t + " is undefined");
                setTimeout(s, r || 100)
            } else e()
        })
    }
}

function t_store_hexToRgb(t) {
    var e = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    t = t.replace(e, function(t, e, r, o) {
        return e + e + r + r + o + o
    });
    var r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t),
        o = r ? {
            r: parseInt(r[1], 16),
            g: parseInt(r[2], 16),
            b: parseInt(r[3], 16)
        } : null;
    return r ? [o.r, o.g, o.b] : null
}

function t_store_luma_rgb(t) {
    var e = Array.isArray(t);
    if (void 0 === t) return "black";
    if (0 != t.indexOf("rgb") && !e) return "black";
    var r = e ? t : t.split("(")[1].split(")")[0].split(",");
    return r.length < 3 ? "black" : .2126 * r[0] + .7152 * r[1] + .0722 * r[2] > 128 ? "black" : "white"
}

function t_store_removeRgbOpacity(t) {
    if (!t || !t.length) return null;
    var e = t.split(",");
    return e[3] && (e[3] = "1)"), e.join()
}
if (window.t_userAgentParser = {
        userAgent: window.navigator.userAgent,
        getIOSMajorVersion: function() {
            var t = "iPhone OS";
            try {
                var e = this.userAgent.search(t);
                if (-1 !== e) {
                    var r = e + t.length + 1,
                        o = this.userAgent.slice(r),
                        s = o.match(/(\d{1,3}_\d{1,3}(_\d{1,3})?)/),
                        i = parseInt(s[0], 10);
                    return i
                }
                return null
            } catch (t) {
                console.log("error in userAgentParser > getIOSMajorVersion" + t.message)
            }
        },
        isIOSMobileChrome: function() {
            return !!navigator.userAgent.match("CriOS")
        },
        getIEVersion: function() {
            try {
                var t = -1;
                if ("Microsoft Internet Explorer" == navigator.appName) {
                    var e = navigator.userAgent,
                        r = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");
                    null !== r.exec(e) && (t = parseFloat(RegExp.$1))
                } else "Netscape" == navigator.appName && (t = -1 === navigator.appVersion.indexOf("Trident") ? 12 : 11);
                return t
            } catch (t) {
                console.log("error in userAgentParser > getIEVersion" + t.message)
            }
        }
    }, window.t_userAgentParser.getIEVersion() <= 11 || !0 === window.isiOS && (window.isiOSVersion[0] < 10 || 10 == window.isiOSVersion[0] && window.isiOSVersion[1] < 3)) {
    var self = this || {};
    try {
        ! function(t, e) {
            if (new t("q=%2B").get("q") !== e || new t({
                    q: e
                }).get("q") !== e || new t([
                    ["q", e]
                ]).get("q") !== e || "q=%0A" !== new t("q=\n").toString() || "q=+%26" !== new t({
                    q: " &"
                }).toString() || "q=%25zx" !== new t({
                    q: "%zx"
                }).toString()) throw t;
            self.URLSearchParams = t
        }(URLSearchParams, "+")
    } catch (t) {
        ! function(t, e, r) {
            "use strict";

            function o(t) {
                var e = l(null);
                switch (d(this, "_ungap", {
                        value: e
                    }), !0) {
                    case !t:
                        break;
                    case "string" == typeof t:
                        "?" === t.charAt(0) && (t = t.slice(1));
                        for (var o = t.split("&"), n = 0, _ = o.length; n < _; n++) {
                            var c = (p = o[n]).indexOf("="); - 1 < c ? i(e, a(p.slice(0, c)), a(p.slice(c + 1))) : p.length && i(e, a(p), "")
                        }
                        break;
                    case r(t):
                        for (n = 0, _ = t.length; n < _; n++) {
                            var p;
                            i(e, (p = t[n])[0], p[1])
                        }
                        break;
                    case "forEach" in t:
                        t.forEach(s, e);
                        break;
                    default:
                        for (var u in t) i(e, u, t[u])
                }
            }

            function s(t, e) {
                i(this, e, t)
            }

            function i(t, e, o) {
                var s = r(o) ? o.join(",") : o;
                e in t ? t[e].push(s) : t[e] = [s]
            }

            function a(t) {
                return decodeURIComponent(t.replace(p, "%25").replace(u, " "))
            }

            function n(t) {
                return encodeURIComponent(t).replace(c, _)
            }

            function _(t) {
                return f[t]
            }
            var l = t.create,
                d = t.defineProperty,
                c = /[!'\(\)~]|%20|%00/g,
                p = /%(?![0-9a-fA-F]{2})/g,
                u = /\+/g,
                f = {
                    "!": "%21",
                    "'": "%27",
                    "(": "%28",
                    ")": "%29",
                    "~": "%7E",
                    "%20": "+",
                    "%00": "\0"
                },
                v = {
                    append: function(t, e) {
                        i(this._ungap, t, e)
                    },
                    delete: function(t) {
                        delete this._ungap[t]
                    },
                    get: function(t) {
                        return this.has(t) ? this._ungap[t][0] : null
                    },
                    getAll: function(t) {
                        return this.has(t) ? this._ungap[t].slice(0) : []
                    },
                    has: function(t) {
                        return t in this._ungap
                    },
                    set: function(t, r) {
                        this._ungap[t] = [e(r)]
                    },
                    forEach: function(t, r) {
                        function o(o) {
                            t.call(r, o, e(i), s)
                        }
                        var s = this;
                        for (var i in s._ungap) s._ungap[i].forEach(o, i)
                    },
                    toJSON: function() {
                        return {}
                    },
                    toString: function() {
                        var t = [];
                        for (var e in this._ungap)
                            for (var r = n(e), o = 0, s = this._ungap[e]; o < s.length; o++) t.push(r + "=" + n(s[o]));
                        return t.join("&")
                    }
                };
            for (var h in v) d(o.prototype, h, {
                configurable: !0,
                writable: !0,
                value: v[h]
            });
            self.URLSearchParams = o
        }(Object, String, Array.isArray)
    }! function(t) {
        function e(t, e) {
            var o = [];
            return t.forEach(e, o), r ? o[Symbol.iterator]() : {
                next: function() {
                    var t = o.shift();
                    return {
                        done: void 0 === t,
                        value: t
                    }
                }
            }
        }
        var r = !1;
        try {
            r = !!Symbol.iterator
        } catch (e) {}
        "forEach" in t || (t.forEach = function(t, e) {
                var r = this,
                    o = Object.create(null);
                this.toString().replace(/=[\s\S]*?(?:&|$)/g, "=").split("=").forEach(function(s) {
                    !s.length || s in o || (o[s] = r.getAll(s)).forEach(function(o) {
                        t.call(e, o, s, r)
                    })
                })
            }), "keys" in t || (t.keys = function() {
                return e(this, function(t, e) {
                    this.push(e)
                })
            }), "values" in t || (t.values = function() {
                return e(this, function(t, e) {
                    this.push(t)
                })
            }), "entries" in t || (t.entries = function() {
                return e(this, function(t, e) {
                    this.push([e, t])
                })
            }), !r || Symbol.iterator in t || (t[Symbol.iterator] = t.entries), "sort" in t || (t.sort = function() {
                for (var t, e, r, o = this.entries(), s = o.next(), i = s.done, a = [], n = Object.create(null); !i;) e = (r = s.value)[0], a.push(e), e in n || (n[e] = []), n[e].push(r[1]), i = (s = o.next()).done;
                for (a.sort(), t = 0; t < a.length; t++) this.delete(a[t]);
                for (t = 0; t < a.length; t++) e = a[t], this.append(e, n[e].shift())
            }),
            function(e) {
                function r(e) {
                    var r = e.append;
                    e.append = t.append, URLSearchParams.call(e, e._usp.search.slice(1)), e.append = r
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("'searchParams' accessed on an object that does not implement interface " + e.name)
                }

                function s(s) {
                    function n(e, r) {
                        t.append.call(this, e, r), e = this.toString(), p.set.call(this._usp, e ? "?" + e : "")
                    }

                    function _(e) {
                        t.delete.call(this, e), e = this.toString(), p.set.call(this._usp, e ? "?" + e : "")
                    }

                    function l(e, r) {
                        t.set.call(this, e, r), e = this.toString(), p.set.call(this._usp, e ? "?" + e : "")
                    }
                    var d, c, p, u = s.prototype,
                        f = a(u, "searchParams"),
                        v = a(u, "href"),
                        h = a(u, "search");
                    !f && h && h.set && (p = h, c = function(t, e) {
                        return t.append = n, t.delete = _, t.set = l, i(t, "_usp", {
                            configurable: !0,
                            writable: !0,
                            value: e
                        })
                    }, d = function(t, e) {
                        return i(t, "_searchParams", {
                            configurable: !0,
                            writable: !0,
                            value: c(e, t)
                        }), e
                    }, e.defineProperties(u, {
                        href: {
                            get: function() {
                                return v.get.call(this)
                            },
                            set: function(t) {
                                var e = this._searchParams;
                                v.set.call(this, t), e && r(e)
                            }
                        },
                        search: {
                            get: function() {
                                return h.get.call(this)
                            },
                            set: function(t) {
                                var e = this._searchParams;
                                h.set.call(this, t), e && r(e)
                            }
                        },
                        searchParams: {
                            get: function() {
                                return o(this, s), this._searchParams || d(this, new URLSearchParams(this.search.slice(1)))
                            },
                            set: function(t) {
                                o(this, s), d(this, t)
                            }
                        }
                    }))
                }
                var i = e.defineProperty,
                    a = e.getOwnPropertyDescriptor;
                try {
                    s(HTMLAnchorElement), /^function|object$/.test(typeof URL) && URL.prototype && s(URL)
                } catch (s) {}
            }(Object)
    }(self.URLSearchParams.prototype, Object)
}
window.t_userAgentParser.getIEVersion() <= 11 && "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
    value: function(t, e) {
        "use strict";
        if (null == t) throw new TypeError("Cannot convert undefined or null to object");
        for (var r = Object(t), o = 1; o < arguments.length; o++) {
            var s = arguments[o];
            if (null != s)
                for (var i in s) Object.prototype.hasOwnProperty.call(s, i) && (r[i] = s[i])
        }
        return r
    },
    writable: !0,
    configurable: !0
});