window.Tilda = window.Tilda || {},
    function (g) {
        Tilda.sendEcommerceEvent = function (e, t) {
            if (void 0 === t || 0 == t.length) return !1;
            if (void 0 === e || "add" != e && "remove" != e && "purchase" != e && "detail" != e) return !1;
            for (var i, r, a, d = "", c = 0, o = [], n = "", m = "", l = "", s = 0; s < t.length; s++) {
                "" < d && (d += ", "), d += (a = t[s]).name, c += a.price, r = "", void 0 !== a.options && 0 < a.options.length && g.each(a.options, function (e, t) {
                    r += t.option + ": " + t.variant + "; "
                });
                var p = {
                    name: a.name,
                    price: a.price,
                    variant: r,
                    quantity: 1
                };
                a.id && 0 < a.id && (id = a.id, p.id = a.id), a.uid && 0 < a.uid && (m = a.uid, p.uid = a.uid), a.recid && 0 < a.recid && (n = a.recid, p.recid = a.recid), a.lid && 0 < a.lid && (l = a.lid, p.lid = a.lid), a.sku && 0 < a.sku && (p.sku = a.sku), o[o.length] = p
            }
            "add" != e && "remove" != e || (i = "/tilda/cart/" + e + "/", 0 < n && (i += "" + n), 0 < m ? i += "-u" + m : 0 < l && (i += "-" + l)), "detail" == e && (i = "/tilda/product/detail/", 0 < m ? i += m + "/" : (0 < n && (i += "r" + n), 0 < l && (i += "-l" + l))), "purchase" == e && (i = "/tilda/rec" + n + "/payment/"), (p = {
                ecommerce: {}
            }).ecommerce[e] = {
                products: o
            }, Tilda.sendEventToStatistics(i, d, p, c)
        }, Tilda.sendEventToStatistics = function (e, t, i, r) {
            var a, d = "/" == e.substring(0, 1),
                c = [],
                o = 0,
                n = !(!(n = g("#allrecords").data("fb-event")) || "nosend" != n),
                m = !(!(m = g("#allrecords").data("vk-event")) || "nosend" != m),
                l = g("#allrecords").data("tilda-currency") || g(".t706").data("project-currency-code") || "RUB";
            if (i = i || window.location.href, 0 < (r = r ? parseFloat(r) : 0))
                if (window.dataLayer || (window.dataLayer = []), -1 != e.indexOf("/tilda/") && -1 != e.indexOf("/payment/") && window.tildaForm && "" < window.tildaForm.orderIdForStat) i = {
                    ecommerce: {
                        purchase: {
                            actionField: {
                                id: window.tildaForm.orderIdForStat,
                                revenue: window.tildaForm.amountForStat
                            },
                            products: window.tildaForm.arProductsForStat
                        }
                    }
                }, window.tildaForm.tildapayment && window.tildaForm.tildapayment.promocode && (i.ecommerce.purchase.actionField.coupon = window.tildaForm.tildapayment.promocode), i.event = "purchase";
                else if (i && i.ecommerce && (i.ecommerce.add && i.ecommerce.add.products ? c = i.ecommerce.add.products : i.ecommerce.remove && i.ecommerce.remove.products ? c = i.ecommerce.remove.products : i.ecommerce.detail && i.ecommerce.detail.products && (c = i.ecommerce.detail.products), c && 0 < c.length)) {
                for (o = 0; o < c.length; o++) c[o].id || (c[o].sku ? c[o].id = c[o].sku : c[o].uid ? c[o].id = c[o].uid : c[o].recid && c[o].lid && (c[o].id = c[o].recid + "_" + c[o].lid));
                i.ecommerce.add && i.ecommerce.add.products ? (i.ecommerce.add.products = c, i.event = "addToCart") : i.ecommerce.remove && i.ecommerce.remove.products ? (i.ecommerce.remove.products = c, i.event = "removeFromCart") : i.ecommerce.detail && i.ecommerce.detail.products ? (i.ecommerce.detail.products = c, i.event = "viewProduct") : (d ? (i.event = "pageView", i.eventAction = e) : i.event = e, i.title = t, i.value = r)
            }
            null != window.dataLayer && (d ? 0 < r ? i && i.ecommerce ? window.dataLayer.push(i) : window.dataLayer.push({
                event: "pageView",
                eventAction: e,
                title: t,
                value: r,
                product: i
            }) : window.dataLayer.push({
                event: "pageView",
                eventAction: e,
                title: t,
                referer: i
            }) : i && i.ecommerce ? window.dataLayer.push(i) : window.dataLayer.push({
                event: e,
                eventAction: t,
                value: r,
                referer: i
            }));
            try {
                window.gtagTrackerID && "gtag" == window.mainTracker && (d ? i && i.event ? "purchase" == i.event ? gtag("event", "purchase", {
                    transaction_id: i.ecommerce.purchase.actionField.id,
                    value: parseFloat(r).toFixed(2),
                    currency: l,
                    items: i.ecommerce.purchase.products
                }) : "addToCart" == i.event && i.ecommerce.add ? gtag("event", "add_to_cart", {
                    items: i.ecommerce.add.products
                }) : "removeFromCart" == i.event && i.ecommerce.remove ? gtag("event", "remove_from_cart", {
                    items: i.ecommerce.remove.products
                }) : "viewProduct" == i.event && i.ecommerce.detail && gtag("event", "view_item", {
                    items: i.ecommerce.detail.products
                }) : gtag("config", window.gtagTrackerID, {
                    page_title: t,
                    page_path: e
                }) : gtag("event", e, {
                    event_category: "tilda",
                    event_label: t,
                    value: r
                }))
            } catch (e) {}
            if (window.ga && "tilda" != window.mainTracker && "gtag" != window.mainTracker)
                if (d)
                    if (i && i.event) {
                        try {
                            if (window.Tilda.isLoadGAEcommerce || (window.Tilda.isLoadGAEcommerce = !0, ga("require", "ec")), ga("set", "currencyCode", l), "purchase" == i.event) {
                                var s = i.ecommerce.purchase.products.length;
                                for (h = 0; h < s; h++) f = i.ecommerce.purchase.products[h], ga("ec:addProduct", {
                                    id: f.id || h,
                                    name: f.name,
                                    price: parseFloat(f.price).toFixed(2),
                                    quantity: f.quantity
                                });
                                ga("ec:setAction", "purchase", {
                                    id: i.ecommerce.purchase.actionField.id,
                                    revenue: parseFloat(r).toFixed(2)
                                })
                            } else if ("addToCart" == i.event && i.ecommerce.add) {
                                s = i.ecommerce.add.products.length;
                                for (h = 0; h < s; h++) f = i.ecommerce.add.products[h], ga("ec:addProduct", {
                                    id: f.id || h,
                                    name: f.name,
                                    price: parseFloat(f.price).toFixed(2),
                                    quantity: f.quantity
                                });
                                ga("ec:setAction", "add")
                            } else if ("removeFromCart" == i.event && i.ecommerce.remove) {
                                s = i.ecommerce.remove.products.length;
                                for (h = 0; h < s; h++) f = i.ecommerce.remove.products[h], ga("ec:addProduct", {
                                    id: f.id || h,
                                    name: f.name,
                                    price: parseFloat(f.price).toFixed(2),
                                    quantity: f.quantity
                                });
                                ga("ec:setAction", "remove")
                            } else if ("viewProduct" == i.event && i.ecommerce.detail) {
                                s = i.ecommerce.detail.products.length;
                                for (h = 0; h < s; h++) f = i.ecommerce.detail.products[h], ga("ec:addProduct", {
                                    id: f.id || h,
                                    name: f.name,
                                    price: parseFloat(f.price).toFixed(2),
                                    quantity: f.quantity
                                });
                                ga("ec:setAction", "detail")
                            }
                        } catch (e) {}
                        ga("send", {
                            hitType: "pageview",
                            page: e,
                            title: t,
                            params: i
                        })
                    } else ga("send", {
                        hitType: "pageview",
                        page: e,
                        title: t
                    });
            else ga("send", {
                hitType: "event",
                eventCategory: "tilda",
                eventAction: e,
                eventLabel: t,
                eventValue: r
            });
            if (window.mainMetrikaId && 0 < window.mainMetrikaId && "function" == typeof ym && (d ? (a = {
                    title: t
                }, 0 < r && (a.params = {
                    order_price: r
                }, l && (a.params.currency = l)), ym(window.mainMetrikaId, "hit", e, a)) : 0 < r ? (a = {
                    order_price: r
                }, l && (a.currency = l), ym(window.mainMetrikaId, "reachGoal", e, a)) : ym(window.mainMetrikaId, "reachGoal", e)), "" < window.mainMetrika && window[window.mainMetrika] && (d ? 0 < r ? window[window.mainMetrika].hit(e, {
                    title: t,
                    order_price: r,
                    params: i
                }) : window[window.mainMetrika].hit(e, {
                    title: t
                }) : 0 < r ? window[window.mainMetrika].reachGoal(e, {
                    title: t,
                    params: i,
                    order_price: r
                }) : window[window.mainMetrika].reachGoal(e, {
                    title: t,
                    referer: i
                })), null != window.fbq && 0 == n) try {
                if (d)
                    if (-1 == e.indexOf("tilda/") || -1 == e.indexOf("/payment/") && -1 == e.indexOf("/submitted/"))
                        if (i && i.event && 0 < r)
                            if ("addToCart" == i.event && i.ecommerce.add) {
                                var s = i.ecommerce.add.products.length,
                                    p = [];
                                for (h = 0; h < s; h++) f = i.ecommerce.add.products[h], p.push(f.id || f.uid || f.name);
                                window.fbq("track", "AddToCart", {
                                    content_ids: p,
                                    content_type: "product",
                                    value: r,
                                    currency: l
                                })
                            } else if ("viewProduct" == i.event && i.ecommerce.detail) {
                    s = i.ecommerce.detail.products.length, p = [];
                    for (h = 0; h < s; h++) f = i.ecommerce.detail.products[h], p.push(f.id || f.uid || f.name);
                    window.fbq("track", "ViewContent", {
                        content_ids: p,
                        content_type: "product",
                        value: r,
                        currency: l
                    })
                } else e.indexOf("tilda/popup"), window.fbq("track", "ViewContent", {
                    content_name: t,
                    content_category: e
                });
                else e.indexOf("tilda/popup"), window.fbq("track", "ViewContent", {
                    content_name: t,
                    content_category: e
                });
                else 0 < r && l ? window.fbq("track", "InitiateCheckout", {
                    content_name: t,
                    content_category: e,
                    value: r,
                    currency: l
                }) : window.fbq("track", "Lead", {
                    content_name: t,
                    content_category: e
                });
                else window.fbq("track", e, {
                    content_name: t,
                    value: r
                })
            } catch (e) {}
            if (void 0 !== window.VK && void 0 !== window.VK.Retargeting && 0 == m) try {
                if (d) {
                    var u = g("#allrecords").data("vk-price-list-id") ? parseInt(g("#allrecords").data("vk-price-list-id")) : 0,
                        w = "",
                        v = !1;
                    if (i && i.event)
                        if (v = {
                                products: [],
                                currency_code: "",
                                total_price: 0
                            }, "purchase" == i.event && i.ecommerce.purchase)
                            if (0 < r && 0 < u) {
                                v.currency_code = l;
                                s = i.ecommerce.purchase.products.length, p = [];
                                for (h = 0; h < s; h++) f = i.ecommerce.purchase.products[h], v.products.push({
                                    id: f.id || f.uid || f.name,
                                    price: f.price || 0
                                }), v.total_price = r;
                                w = "init_checkout"
                            } else w = "t-purchase";
                    else if ("addToCart" == i.event && i.ecommerce.add)
                        if (0 < r && 0 < u) {
                            v.currency_code = l;
                            s = i.ecommerce.add.products.length, p = [];
                            for (h = 0; h < s; h++) f = i.ecommerce.add.products[h], v.products.push({
                                id: f.id || f.uid || f.name,
                                price: f.price || 0
                            }), v.total_price = r;
                            w = "add_to_cart"
                        } else w = "t-add-to-cart", i.ecommerce.add[0] && i.ecommerce.add[0].uid && (w += "-" + i.ecommerce.add[0].uid);
                    else if ("viewProduct" == i.event && i.ecommerce.detail)
                        if (0 < r && 0 < u) {
                            v.currency_code = l;
                            s = i.ecommerce.detail.products.length, p = [];
                            for (h = 0; h < s; h++) f = i.ecommerce.detail.products[h], v.products.push({
                                id: f.id || f.uid || f.name,
                                price: f.price || 0
                            }), v.total_price = r;
                            w = "view_product"
                        } else w = "t-view-product", i.ecommerce.detail[0] && i.ecommerce.detail[0].uid && (w += "-" + i.ecommerce.detail[0].uid);
                    else if ("removeFromCart" == i.event && i.ecommerce.remmove)
                        if (0 < r && 0 < u) {
                            v.currency_code = l;
                            var f, h, s = i.ecommerce.remove.products.length,
                                p = [];
                            for (h = 0; h < s; h++) f = i.ecommerce.remove.products[h], v.products.push({
                                id: f.id || f.uid || f.name,
                                price: f.price || 0
                            }), v.total_price = r;
                            w = "remove_from_cart"
                        } else w = "t-remove-product", i.ecommerce.remove[0] && i.ecommerce.remove[0].uid && (w += "-" + i.ecommerce.remove[0].uid);
                    else w = i.event;
                    else w = -1 != e.indexOf("tilda/") && -1 != e.indexOf("/payment/") ? "t-purchase-" + e.replace("/tilda/", "").replace("tilda/", "").replace("/payment/", "") : -1 != e.indexOf("tilda/") && -1 != e.indexOf("/submitted/") ? "t-lead-" + e.replace("/tilda/", "").replace("tilda/", "").replace("/submitted/", "") : -1 != e.indexOf("tilda/popup") || -1 != e.indexOf("tilda/click") ? "t-" + e.replace("/tilda/", "").replace("/", "-") : "t-" + e.replace("/", "-");
                    0 < u && v && v.currency_code ? (VK.Retargeting.Event("purchase"), VK.Retargeting.ProductEvent(u, w, v)) : (VK.Retargeting.Event(w), "t-purchase" == w.substring(0, 10) ? VK.Goal("purchase") : "t-lead" == w.substring(0, 6) && VK.Goal("lead"))
                } else VK.Retargeting.Event(e)
            } catch (e) {}
            "0" < window.mainMailruId && (m = window._tmr || (window._tmr = []), d ? 0 < r ? m.push({
                id: "" + window.mainMailruId,
                type: "pageView",
                url: e,
                value: r,
                start: (new Date).getTime()
            }) : m.push({
                id: "" + window.mainMailruId,
                type: "pageView",
                url: e,
                start: (new Date).getTime()
            }) : 0 < r ? m.push({
                id: "" + window.mainMailruId,
                type: "reachGoal",
                goal: e,
                value: r
            }) : m.push({
                id: "" + window.mainMailruId,
                type: "reachGoal",
                goal: e
            })), "function" == typeof window.tildastat && (d ? (0 < e.indexOf("payment") && -1 < e.indexOf("tilda/form") && (e = e.replace("tilda/form", "tilda/rec")), window.tildastat("pageview", {
                page: e
            })) : window.tildastat("pageview", {
                page: "/tilda/event/" + e
            }))
        }, Tilda.saveUTM = function () {
            try {
                var e = window.location.href,
                    t = "",
                    i = "";
                if (-1 !== e.toLowerCase().indexOf("utm_") && "string" == typeof (t = (t = (e = e.toLowerCase()).split("?"))[1])) {
                    var r, a = t.split("&");
                    for (r in a) "utm_" == a[r].split("=")[0].substring(0, 4) && (i = i + a[r] + "|||");
                    0 < i.length && ((t = new Date).setDate(t.getDate() + 30), document.cookie = "TILDAUTM=" + encodeURIComponent(i) + "; path=/; expires=" + t.toUTCString())
                }
            } catch (e) {}
        }, g(document).ready(function () {
            var e = navigator.userAgent.toLowerCase(),
                e = -1 != e.indexOf("msie") && parseInt(e.split("msie")[1]);
            8 != e && 9 != e || g(".t-btn").each(function () {
                var e = g(this).attr("href");
                0 < g(this).find("table").length && "" < e && -1 == e.indexOf("#popup:") && -1 == e.indexOf("#price:") && g(this).click(function (e) {
                    e.preventDefault();
                    e = g(this).attr("href");
                    window.location.href = e
                })
            });
            try {
                1 == g("#allrecords").length && "no" == g("#allrecords").data("tilda-cookie") || Tilda.saveUTM()
            } catch (e) {}
            g(".r").off("click", "a.js-click-stat, .js-click-zero-stat"), g(".r").on("click", "a.js-click-stat, .js-click-zero-stat", function (e) {
                var t = g(this).data("tilda-event-name"),
                    i = g(this).text(),
                    a = g(this).attr("href") || "",
                    d = g(this).attr("target"),
                    t = t || "/tilda/click/".$(this).closest(".r").attr("id") + "/?url=" + a;
                if (Tilda.sendEventToStatistics(t, i), "http" == a.substring(0, 4)) return window.setTimeout(function () {
                    var e, t, i = "",
                        r = "";
                    if ("_blank" == d) {
                        if (-1 != a.indexOf("?") && (a = (i = a.split("?"))[0], -1 != (i = i[1]).indexOf("#") && (i = i.split("#"), a = a + "#" + i[1], i = i[0]), i = i.split("&")), 0 == g("#tildaredirectform").length ? g("body").append('<form id="tildaredirectform" target="_blank" method="GET" action="' + a + '" style="display:none;"></form>') : g("#tildaredirectform").attr("method", "GET").attr("action", a), r = "", 0 < i.length)
                            for (e in i)(t = i[e].split("=")) && 0 < t.length && (r += '<input type="hidden" name="' + t[0] + '" value="' + (t[1] || "") + '">');
                        g("#tildaredirectform").html(r), g("#tildaredirectform").submit()
                    } else window.location.href = a
                }, 300), e.preventDefault(), !1
            }), g("input.js-amount").each(function () {
                var e = (e = g(this).val()).replace(/,/g, ".");
                e = parseFloat(e.replace(/[^0-9\.]/g, "")), g(this).val(e)
            })
        })
    }(jQuery);

function tcart__init(recid, ymapApiKey) {
    window.tcart__ymapApiKey = ymapApiKey;
    var el = $(".t706");
    if ("yes" === window.tcart_initted && el.length > 1) {
        var str = "RU" === window.browserLang ? "????????????: ???? ???????????????? ???????????????????????? " + el.length + " ?????????????? ?????????????? (???????? ST100). ????????????????????, ?????????????? ??????????????????. ?????????? ?????????? ???????????????????? ???? ???????????????? Header ?????? Footer." : "Error: " + el.length + " cart widgets (block ST100) on the page. Remove a duplicate. Blocks can be on the Header or Footer page.";
        return 0 === $(".t706__previewmode-infobox .t706__previewmode-infobox-error").length && $(".t706__previewmode-infobox center").append('<div class="t706__previewmode-infobox-error" style="color:red">' + str + "</div>"), void(void 0 === window.tcart_erroralert && (alert(str), window.tcart_erroralert = "yes", console.error("Error: Two cart widgets (block ST100) on the page. Remove a duplicate.")))
    }
    var fooo = el.attr("data-cart-dontstore");
    void 0 !== fooo && "y" == fooo && (window.tcart_dontstore = "y"), void 0 !== (fooo = el.attr("data-cart-oneproduct")) && "y" == fooo && (window.tcart_oneproduct = "y"), void 0 !== (fooo = el.attr("data-cart-maxstoredays")) && "" != fooo && fooo >= 0 && (window.tcart_maxstoredays = fooo), void 0 !== (fooo = el.attr("data-cart-sendevent-onadd")) && "y" == fooo && (window.tcart_sendevent_onadd = "y"), window.tcart_initted = "yes", tcart__drawBottomTotalAmount(), tcart__loadLocalObj(), tcart__reDrawCartIcon(), tcart__addEvent__links(), tcart__addEvents(), setTimeout((function () {
        tcart__addEvent__selectpayment();
        var hash = decodeURIComponent(document.location.hash);
        if (-1 !== hash.indexOf("#order:")) {
            var button = $('a[href="' + hash + '"]')[0];
            $(button).click()
        }
    })), $("#rec" + recid).attr("data-animationappear", "off"), $("#rec" + recid).css("opacity", "1"), el.find(".t-input-group_dl").length ? (el.find(".t706__cartwin-prodamount-label").html(tcart_dict("subtotal") + ":&nbsp;"), el.find(".t706__cartwin-totalamount-label").html(tcart_dict("grandTotal") + ":&nbsp;")) : (el.find(".t706__cartwin-prodamount-label").html(tcart_dict("total") + ":&nbsp;"), el.find(".t706__cartwin-totalamount-label").html(tcart_dict("total") + ":&nbsp;")), "" == el.find(".t706__cartwin-heading").html() && el.find(".t706__cartwin-heading").html(tcart_dict("yourOrder") + ":"), "Submit" == el.find(".t-form__submit .t-submit").html() && el.find(".t-form__submit .t-submit").html(tcart_dict("submitOrder")), el.find(".t-input-group_pm").length && el.find(".t-input-group_pm").find(".t-input-title").html(tcart_dict("paymentMethod")), el.find(".t-form__submit").on({
        mouseenter: function () {
            el.find(".t706__minimal").addClass("active")
        },
        mouseleave: function () {
            el.find(".t706__minimal").removeClass("active")
        }
    })
}

function tcart_dict(msg) {
    var dict = [];
    dict.total = {
        EN: "Total",
        RU: "??????????",
        FR: "Total",
        DE: "Gesamtsumme",
        ES: "Total",
        PT: "Total",
        JA: "??????",
        ZH: "?????????",
        UK: "????????",
        PL: "Suma",
        KK: "??????????",
        IT: "Totale",
        LV: "Kop??"
    }, dict.subtotal = {
        EN: "Subtotal",
        RU: "??????????",
        FR: "Sous-total",
        DE: "Zwischensumme",
        ES: "Subtotal",
        PT: "Subtotal",
        JA: "??????",
        ZH: "?????????",
        UK: "????????",
        PL: "Suma",
        KK: "??????????????????",
        IT: "Totale parziale",
        LV: "Kop??j?? summa"
    }, dict.grandTotal = {
        EN: "Total",
        RU: "???????????????? ??????????",
        FR: "Total",
        DE: "Gesamtsumme",
        ES: "Total",
        PT: "Total",
        JA: "??????",
        ZH: "?????????",
        UK: "???????????????? ????????",
        PL: "Suma ????cznie",
        KK: "??????????",
        IT: "Totale",
        LV: "Kop??j?? summa"
    }, dict.yourOrder = {
        EN: "Your order",
        RU: "?????? ??????????",
        FR: "Votre commande",
        DE: "Ihre Bestellung",
        ES: "Su pedido",
        PT: "Seu pedido",
        JA: "?????????",
        ZH: "???????????????",
        UK: "???????? ????????????????????",
        PL: "Twoje zam??wienie",
        KK: "???????????? ????????????????????????",
        IT: "Il tuo ordine",
        LV: "J??su pas??t??jums"
    }, dict.submitOrder = {
        EN: "Submit order",
        RU: "???????????????? ??????????",
        FR: "Commander",
        DE: "Bestellung abschicken",
        ES: "Enviar pedido",
        PT: "Enviar pedido",
        JA: "???????????????",
        ZH: "???????????????",
        UK: "???????????????? ????????????????????",
        PL: "Zam??w",
        KK: "????????????????",
        IT: "Inviare ordine",
        LV: "Iesniegt pas??t??jumu"
    }, dict.paymentMethod = {
        EN: "Payment method",
        RU: "???????????? ????????????",
        FR: "Mode de paiement",
        DE: "Zahlungsmethode",
        ES: "M??todo de pago",
        PT: "M??todo de pagamento",
        JA: "????????????",
        ZH: "???????????????",
        UK: "???????????? ????????????",
        PL: "Spos??b p??atno??ci",
        KK: "?????????? ????????????",
        IT: "Metodo di pagamento",
        LV: "Apmaksas veids"
    }, dict.clickToOrder = {
        EN: "Click to order",
        RU: "???????????????? ????????????????",
        FR: "Commander",
        DE: "Bestellung abschicken",
        ES: "Enviar pedido",
        PT: "Enviar pedido",
        JA: "???????????????",
        ZH: "???????????????",
        UK: "???????????????? ????????????????????",
        PL: "Zam??w",
        KK: "?????????????????? ??????????????",
        IT: "Clicca per ordine",
        LV: "Uzklik????iniet pas??t??juma"
    }, dict.subtotalDiscount = {
        EN: "Subtotal with discount",
        RU: "?????????? ???? ??????????????",
        FR: "Sous-total avec remise",
        DE: "Zwischensumme mit Rabatt",
        ES: "Subtotal con descuento",
        PT: "Subtotal com desconto",
        JA: "???????????????",
        ZH: "??????????????????",
        UK: "???????? ???? ??????????????",
        PL: "Suma z rabatem",
        KK: "?????????????????????? ??????????????????",
        IT: "Totale parziale con lo sconto",
        LV: "Atlaides summa"
    }, dict.promoCode = {
        EN: "Promo code",
        RU: "????????????????",
        FR: "Code promo",
        DE: "Aktionscode",
        ES: "C??digo promocional",
        PT: "C??digo promocional",
        JA: "??????????????????",
        ZH: "???????????????",
        UK: "????????????????",
        PL: "Kod rabatowy",
        KK: "????????????????",
        IT: "Codice promozionale",
        LV: "Promo kods"
    }, dict.discount = {
        EN: "Discount",
        RU: "????????????",
        FR: "Remise",
        DE: "Rabatt",
        ES: "Descuento",
        PT: "Desconto",
        JA: "??????",
        ZH: "?????????",
        UK: "????????????",
        PL: "Rabat",
        KK: "????????????????",
        IT: "Sconto",
        LV: "Atlaide"
    }, dict.minimumOrder = {
        EN: "Minimum order",
        RU: "?????????????????????? ??????????",
        FR: "Commande minimale",
        DE: "Minimale Bestellung",
        ES: "Pedido m??nimo",
        PT: "Pedido m??nimo",
        JA: "??????????????????",
        ZH: "??????????????????",
        UK: "???????????????????? ????????????????????",
        PL: "Minimalne zam??wienie",
        KK: "???? ???? ????????????????",
        IT: "Ordine minimo",
        LV: "Minim??lais pas??t??juma"
    }, dict.minimumQuantity = {
        EN: "Minimum order quantity",
        RU: "?????????????????????? ???????????????????? ?? ????????????",
        FR: "Quantit?? de commande minimale",
        DE: "Mindestbestellmenge",
        ES: "Cantidad m??nima del pedido",
        PT: "Quantidade m??nima por pedido",
        JA: "???????????????",
        ZH: "??????????????????",
        UK: "???????????????????? ?????????????????? ?? ????????????????????",
        PL: "Minimalna ilo???? w zam??wieniu",
        KK: "???? ???? ???????????????? ????????",
        IT: "Quantit?? di ordine minimo",
        LV: "Minim??lais pas??t??juma daudzums"
    }, dict.limitReached = {
        EN: "Sorry, limit has been reached. This is the maximum quantity of goods in stock",
        RU: "????????????????, ?????????????????? ??????????. ?????? ?????????????????????? ?????????????????? ???????????????????? ?????????????? ?? ??????????????",
        FR: "D??sol??, la limite a ??t?? atteinte. Il s'agit de la quantit?? maximale de marchandises en stock",
        DE: "Entschuldigung, das Limit wurde erreicht. Dies ist die maximale Menge an Waren auf Lager",
        ES: "Lo sentimos, se ha alcanzado el l??mite. Esta es la cantidad m??xima de productos en stock",
        PT: "Desculpe, o limite foi atingido. Esta ?? a quantidade m??xima de bens em stock",
        JA: "?????????????????????????????????????????????????????????????????????????????????????????????????????????",
        ZH: "??????????????????????????????????????????????????????????????????",
        UK: "??????????????, ???????????????????? ??????????. ???? ?????????????????????? ?????????????? ?????????????????? ?????????????? ?? ??????????????????",
        PL: "Przepraszamy, osi??gni??to limit. Jest to maksymalna ilo???? dost??pnego towaru",
        KK: "??????????????????, ???????? ?????? ????????????????????. ?????? ?????????????? ?????????????????????? ?????????????? ????????",
        IT: "Siamo spiacenti, il limite ?? stato raggiunto. Questa ?? la quantit?? massima di merce in magazzino",
        LV: "Diem????l ierobe??ojums ir sasniegts. Tas ir maksim??lais iesp??jamais pre??u skaits noliktav??"
    }, dict.free = {
        EN: "free",
        RU: "??????????????????",
        FR: "gratuit",
        DE: "kostenlos",
        ES: "gratis",
        PT: "livre",
        UK: "??????????????????????",
        JA: "?????????",
        ZH: "??????",
        PL: "za darmo",
        KK: "??????????",
        IT: "gratuito",
        LV: "bezmaksas"
    }, dict.youRemoved = {
        EN: "You removed",
        RU: "???? ??????????????",
        FR: "Vous avez retir??",
        DE: "Sie haben entfernt",
        ES: "Has eliminado",
        PT: "Retirou",
        JA: "??????????????????",
        ZH: "????????????",
        UK: "?????????? ????????????????",
        PL: "Usun????e??",
        KK: "?????? ????????????????",
        IT: "Hai rimosso",
        LV: "J??s izdz??s??t"
    }, dict.undo = {
        EN: "Undo",
        RU: "??????????????",
        FR: "Annuler",
        DE: "R??ckg??ngig",
        ES: "Deshacer",
        PT: "Desfazer",
        JA: "????????????",
        ZH: "??????",
        UK: "??????????????????",
        PL: "Powr??t",
        KK: "??????????????????",
        IT: "Disfare",
        LV: "Atcelt"
    };
    var lang = window.browserLang;
    return void 0 !== dict[msg] ? void 0 !== dict[msg][lang] && "" != dict[msg][lang] ? dict[msg][lang] : dict[msg].EN : "Text not found #" + msg
}

function tcart__nullObj() {
    var tcart = {
        products: [],
        prodamount: 0,
        amount: 0,
        system: ""
    };
    return tcart
}

function tcart__loadLocalObj() {
    var data_json_str = null,
        ts, delta;
    if ("object" == typeof localStorage) try {
        data_json_str = localStorage.getItem("tcart")
    } catch (e) {
        console.error("Your web browser does not support storing a Cart data locally.")
    }
    if (window.tcart = null === data_json_str ? tcart__nullObj() : JSON.parse(data_json_str), void 0 !== window.tcart.products) {
        var obj = [],
            oldCountProducts = window.tcart.products.length,
            actualCountProducts;
        $.each(window.tcart.products, (function (index, product) {
            $.isEmptyObject(product) || "yes" === product.deleted || obj.push(product)
        })), window.tcart.products = obj, window.tcart.products.length !== oldCountProducts && tcart__saveLocalObj()
    }
    if (void 0 !== window.tcart_maxstoredays && "" != window.tcart_maxstoredays) {
        var foo = window.tcart_maxstoredays;
        foo > 0 ? void 0 !== window.tcart.updated && window.tcart.updated > 0 && (delta = 1 * (ts = Math.floor(Date.now() / 1e3)) - 1 * window.tcart.updated) > 86400 * foo && ("object" == typeof localStorage && (window.tcart.products = [], localStorage.setItem("tcart", JSON.stringify(window.tcart))), window.tcart = tcart__nullObj()) : "0" == foo && (window.tcart = tcart__nullObj())
    } else void 0 !== window.tcart.updated && window.tcart.updated > 0 && (delta = 1 * (ts = Math.floor(Date.now() / 1e3)) - 1 * window.tcart.updated) > 2592e3 && (window.tcart = tcart__nullObj());
    void 0 !== window.tcart_dontstore && "y" == window.tcart_dontstore && (window.tcart = tcart__nullObj()), delete window.tcart.currency, delete window.tcart.currency_txt, delete window.tcart.currency_txt_l, delete window.tcart.currency_txt_r, delete window.tcart.currency_side, delete window.tcart.currency_sep, delete window.tcart.currency_dec, window.tcart.currency = "$", window.tcart.currency_side = "l", window.tcart.currency_sep = ".", window.tcart.currency_dec = "", void 0 !== window.tcart.delivery && delete window.tcart.delivery, void 0 !== window.tcart.promocode && delete window.tcart.promocode;
    var cc = $(".t706").attr("data-project-currency");
    void 0 !== cc && "" != cc && (window.tcart.currency = cc), window.tcart.currency_txt = window.tcart.currency, void 0 !== (cc = $(".t706").attr("data-project-currency-side")) && "r" == cc && (window.tcart.currency_side = "r"), "l" == window.tcart.currency_side ? (window.tcart.currency_txt_l = window.tcart.currency_txt + "", window.tcart.currency_txt_r = "") : (window.tcart.currency_txt_r = "&nbsp;" + window.tcart.currency_txt, window.tcart.currency_txt_l = ""), void 0 === (cc = $(".t706").attr("data-project-currency-sep")) || "." != cc && "," != cc ? "$" == window.tcart.currency || "???" == window.tcart.currency || "USD" == window.tcart.currency || "EUR" == window.tcart.currency ? window.tcart.currency_sep = "." : window.tcart.currency_sep = "," : window.tcart.currency_sep = cc, cc = $(".t706").attr("data-project-currency-dec"), window.tcart.currency_dec = void 0 !== cc && "00" == cc ? cc : "", delete window.tcart.system;
    var c = $(".t706").attr("data-payment-system");
    window.tcart.system = void 0 !== c && "" != c ? c : "none";
    var ma = $(".t706").attr("data-cart-minorder");
    void 0 !== ma && "" != ma && ma > 0 && void 0 === window.tcart_minorder && (ma *= 1, window.tcart_minorder = ma, $(".t706__cartwin-prodamount-wrap").prepend('<div class="t706__cartwin-prodamount-minorder t706__minimal"><span>' + tcart_dict("minimumOrder") + ": " + tcart__showPrice(ma) + "</span></div>"), $(".t706__cartwin-totalamount-wrap").prepend('<div class="t706__cartwin-prodamount-minorder t706__minimal"><span>' + tcart_dict("minimumOrder") + ": " + tcart__showPrice(ma) + "</span></div>"), $(".js-errorbox-all .t-form__errorbox-text").append('<p data-rule-filled="true" class="t-form__errorbox-item js-rule-error js-rule-error-minorder" style="display: none;">' + tcart_dict("minimumOrder") + ": " + tcart__showPrice(ma) + "</p>"));
    var mq = $(".t706").attr("data-cart-mincntorder");
    void 0 !== mq && "" != mq && mq > 0 && void 0 === window.tcart_mincntorder && (mq *= 1, window.tcart_mincntorder = mq, $(".t706__cartwin-prodamount-wrap").prepend('<div class="t706__cartwin-prodamount-mincntorder t706__minimal"><span>' + tcart_dict("minimumQuantity") + ": " + mq + "</span></div>"), $(".t706__cartwin-totalamount-wrap").prepend('<div class="t706__cartwin-prodamount-mincntorder t706__minimal"><span>' + tcart_dict("minimumQuantity") + ": " + mq + "</span></div>"), $(".js-errorbox-all .t-form__errorbox-text").append('<p data-rule-filled="true"  class="t-form__errorbox-item js-rule-error js-rule-error-minquantity" style="display: none;">' + tcart_dict("minimumQuantity") + ": " + mq + "</p>")), tcart__addDelivery(), tcart__updateTotalProductsinCartObj()
}

function tcart__saveLocalObj() {
    if (window.tcart_newDeliveryActive && window.tcart.amount && window.tcart.total && tcart__rerenderDeliveryServices(), !(void 0 !== window.tcart_dontstore && "y" == window.tcart_dontstore || void 0 !== window.tcart_maxstoredays && 0 == window.tcart_maxstoredays || "object" != typeof window.tcart)) {
        window.tcart.updated = Math.floor(Date.now() / 1e3);
        var data_json_str = JSON.stringify(window.tcart);
        if ("object" == typeof localStorage) try {
            localStorage.setItem("tcart", data_json_str)
        } catch (e) {
            console.error("Your web browser does not support storing a Cart data locally.")
        }
    }
}

function tcart__syncProductsObject__LStoObj() {
    if (!(void 0 !== window.tcart_dontstore && "y" == window.tcart_dontstore || void 0 !== window.tcart_maxstoredays && 0 == window.tcart_maxstoredays || "object" != typeof localStorage)) try {
        var foo_json_str = localStorage.getItem("tcart"),
            foo_json_obj = JSON.parse(foo_json_str);
        if ("object" == typeof foo_json_obj.products) {
            var obj = [],
                oldCountProducts = foo_json_obj.products.length,
                actualCountProducts;
            $.each(foo_json_obj.products, (function (index, product) {
                !$.isEmptyObject(product) && "yes" !== product.deleted && product.quantity > 0 && obj.push(product)
            })), window.tcart.products = obj, window.tcart.products.length !== oldCountProducts && tcart__saveLocalObj(), tcart__updateTotalProductsinCartObj()
        }
    } catch (e) {}
}

function tcart__addEvents() {
    $(".t706__carticon").click((function () {
        tcart__openCart()
    })), $(".t706__cartwin-close").click((function () {
        tcart__closeCart()
    })), $(".t706__cartwin-closebtn").click((function () {
        tcart__closeCart()
    })), $(".t706").find(".js-form-proccess").attr("data-formcart", "y"), $(".t706__cartwin").mousedown((function (e) {
        if (e.target == this) {
            var windowWidth, maxScrollBarWidth = 17,
                windowWithoutScrollBar = $(window).width() - 17;
            if (e.clientX > windowWithoutScrollBar) return;
            tcart__closeCart()
        }
    })), "y" !== window.tcart_dontstore && $(window).on("storage", (function (e) {
        if (e.originalEvent && !window.clearTCart && "tcart" === e.originalEvent.key) {
            try {
                var foo_json_str = localStorage.getItem("tcart"),
                    foo_json_obj = JSON.parse(foo_json_str);
                "object" == typeof foo_json_obj.products && (window.tcart.products = foo_json_obj.products, tcart__updateTotalProductsinCartObj())
            } catch (e) {}
            tcart__reDrawCartIcon(), $("body").hasClass("t706__body_cartwinshowed") && (window.tcart_newDeliveryActive && window.tcart.amount && window.tcart.total && tcart__rerenderDeliveryServices(), tcart__reDrawProducts(), tcart__reDrawTotal())
        }
    }))
}

function tcart__addEvent__links() {
    $(".r").on("click", '[href^="#order"]', (function (e) {
        e.preventDefault();
        var el = $(this),
            btnForm = el.closest("form");
        if (btnForm.length) {
            var arErrors = window.tildaForm.validate(btnForm);
            if (window.tildaForm.showErrors(btnForm, arErrors)) return !1
        }
        if (void 0 === el.attr("data-dbclk-prevent") || "yes" != el.attr("data-dbclk-prevent")) {
            el.attr("data-dbclk-prevent", "yes"), setTimeout((function () {
                el.removeAttr("data-dbclk-prevent")
            }), 1e3), ($("body").hasClass("t-body_popupshowed") || $(".t-popup").hasClass("t-popup_show")) && ($("body").removeClass("t-body_popupshowed"), $(".t-popup").removeClass("t-popup_show"), setTimeout((function () {
                $(".t-popup").not(".t-popup_show").css("display", "none")
            }), 300), tcart__clearProdUrl());
            var tmp = el.attr("href"),
                price = "0",
                name = "",
                img = "",
                sku = "",
                lid = "",
                uid = "",
                recid = "",
                inv = "",
                single = "",
                unit = "",
                portion = "",
                pack_label = "",
                pack_m = "",
                pack_x = "",
                pack_y = "",
                pack_z = "";
            if ("#order:" == tmp.substring(0, 7)) {
                var str = tmp.substring(7);
                if (void 0 !== str && "" != str) {
                    if (str.indexOf(":::") > 0) {
                        var bar_pos = str.indexOf(":::");
                        if (str.indexOf("=") > 0 && str.indexOf("=") < str.indexOf(":::")) {
                            var bar_str = str.substring(bar_pos + 3);
                            str = str.substring(0, bar_pos)
                        }
                    }
                    var arr, arr;
                    if (str.indexOf("=") > 0) void 0 !== (arr = str.split("="))[0] && (name = arr[0]), void 0 !== arr[1] && (price = arr[1]), price = tcart__cleanPrice(price);
                    else name = str;
                    if (void 0 !== bar_str && "" != bar_str)
                        if (bar_str.indexOf("=") > 0) void 0 !== (arr = bar_str.split("="))[0] && void 0 !== arr[1] && "" != arr[0] && "" != arr[1] && "image" == arr[0] && arr[1].indexOf("tildacdn.com") > 0 && (img = arr[1]);
                    "" == recid && void 0 === (recid = el.closest(".r").attr("id").replace("rec", "")) && (recid = "")
                }
            }
            var pel = $(this).closest(".js-product");
            if (void 0 !== pel) {
                if ("" == name && void 0 === (name = pel.find(".js-product-name").text()) && (name = ""), "" != price && 0 != price || (price = tcart__cleanPrice(price = pel.find(".js-product-price").text())), "" == img)
                    if (void 0 !== pel.attr("data-product-img") && "" != pel.attr("data-product-img")) img = pel.attr("data-product-img");
                    else {
                        var imgdiv = pel.find(".js-product-img");
                        if (void 0 !== imgdiv) {
                            var original = imgdiv.attr("data-original") || "";
                            if (original.length > 0) img = original;
                            else if (imgdiv.is("img")) img = imgdiv.attr("src");
                            else if (imgdiv.is("div")) {
                                img = "";
                                var imgcss = imgdiv.css("background-image");
                                void 0 !== imgcss && "" != imgcss && (img = imgcss.replace("url(", "").replace(")", "").replace(/"/gi, ""))
                            }
                        }
                    }
                "" == lid && void 0 === (lid = pel.attr("data-product-lid")) && (lid = ""), "" == uid && void 0 === (uid = pel.attr("data-product-uid")) && (uid = ""), "" == recid && void 0 === (recid = pel.closest(".r").attr("id").replace("rec", "")) && (recid = ""), "" == inv && void 0 === (inv = pel.attr("data-product-inv")) && (inv = ""), unit = pel.attr("data-product-unit") || "", portion = pel.attr("data-product-portion") || "", single = pel.attr("data-product-single") || "";
                var options = [];
                pel.find(".js-product-edition-option").each((function () {
                    var el_opt = $(this),
                        op_option = el_opt.find(".js-product-edition-option-name").text(),
                        op_variant = el_opt.find("option:selected").val(),
                        op_price = el_opt.find("option:selected").attr("data-product-edition-variant-price");
                    if (op_price = tcart__cleanPrice(op_price), void 0 !== op_option && void 0 !== op_variant) {
                        var obj = {};
                        "" != op_option && (op_option = tcart__escapeHtml(op_option)), "" != op_variant && (op_variant = (op_variant = tcart__escapeHtml(op_variant)).replace(/(?:\r\n|\r|\n)/g, "")), op_option.length > 1 && ":" == op_option.charAt(op_option.length - 1) && (op_option = op_option.substring(0, op_option.length - 1)), obj.option = op_option, obj.variant = op_variant, obj.price = op_price, options.push(obj)
                    }
                })), pel.find(".js-product-option").each((function () {
                    var el_opt = $(this),
                        op_option = el_opt.find(".js-product-option-name").text(),
                        op_variant = el_opt.find("option:selected").val(),
                        op_price = el_opt.find("option:selected").attr("data-product-variant-price");
                    if (op_price = tcart__cleanPrice(op_price), void 0 !== op_option && void 0 !== op_variant) {
                        var obj = {};
                        "" != op_option && (op_option = tcart__escapeHtml(op_option)), "" != op_variant && (op_variant = (op_variant = tcart__escapeHtml(op_variant)).replace(/(?:\r\n|\r|\n)/g, "")), op_option.length > 1 && ":" == op_option.charAt(op_option.length - 1) && (op_option = op_option.substring(0, op_option.length - 1)), obj.option = op_option, obj.variant = op_variant, obj.price = op_price, options.push(obj)
                    }
                })), "" == sku && void 0 === (sku = pel.find(".js-product-sku").text().trim()) && (sku = ""), "" == pack_label && void 0 === (pack_label = pel.attr("data-product-pack-label")) && (pack_label = ""), "" == pack_m && void 0 === (pack_m = pel.attr("data-product-pack-m")) && (pack_m = ""), "" == pack_x && void 0 === (pack_x = pel.attr("data-product-pack-x")) && (pack_x = ""), "" == pack_y && void 0 === (pack_y = pel.attr("data-product-pack-y")) && (pack_y = ""), "" == pack_z && void 0 === (pack_z = pel.attr("data-product-pack-z")) && (pack_z = "")
            }
            var productUrl = pel.attr("data-product-url"),
                isOrderButtonActive = pel.find('a[href="#order"]').not(".t-btn").length,
                settedLinkInToProduct = pel.find(".js-product-link").not('[href="#prodpopup"]').not('[href="#order"]').attr("href");
            if (void 0 === productUrl && settedLinkInToProduct ? productUrl = settedLinkInToProduct : void 0 === productUrl && recid && lid && !isOrderButtonActive ? productUrl = window.location.origin + window.location.pathname + "#!/tproduct/" + recid + "-" + lid : void 0 === productUrl && (productUrl = window.location.origin + window.location.pathname + "#rec" + recid), "" != name || "" != price && 0 != price) {
                "" == name && (name = "NoName"), "" == price && (price = 0), "" != name && (name = tcart__escapeHtml(name)), "" != img && (img = tcart__escapeHtmlImg(img));
                var productObj = {};
                productObj.name = name, productObj.price = price, productObj.img = img, productObj.recid = recid, productObj.lid = lid, productObj.pack_label = pack_label, productObj.pack_m = pack_m, productObj.pack_x = pack_x, productObj.pack_y = pack_y, productObj.pack_z = pack_z, productObj.url = productUrl, void 0 !== options && options.length > 0 && (productObj.options = options), void 0 !== sku && "" != sku && (sku = tcart__escapeHtml(sku), productObj.sku = sku), void 0 !== uid && "" != uid && (productObj.uid = uid), void 0 !== lid && "" != lid && (productObj.lid = lid), void 0 !== inv && inv > 0 && (productObj.inv = parseInt(inv, 10)), "" !== unit && (productObj.unit = unit), "" !== portion && (productObj.portion = portion), "" !== single && (productObj.single = single);
                var quantityBtns = el.parent().find(".t-store__prod__quantity");
                if (quantityBtns.length) {
                    var input = quantityBtns.find(".t-store__prod__quantity-input"),
                        count = parseInt(input.val(), 10);
                    !isNaN(count) && count > 0 && (productObj.quantity = count, input.val(1), input.change())
                }
                if (tcart__addProduct(productObj), void 0 !== window.tcart_sendevent_onadd && "y" == window.tcart_sendevent_onadd) try {
                    Tilda.sendEcommerceEvent("add", [productObj])
                } catch (e) {
                    if (window.Tilda && "function" == typeof Tilda.sendEventToStatistics) {
                        var virtPage = "/tilda/cart/add/";
                        recid > 0 && (virtPage += recid), uid && uid > 0 ? virtPage += "-u" + uid : lid && lid > 0 && (virtPage += "-" + lid);
                        var virtTitle = name,
                            virtPrice = price;
                        Tilda.sendEventToStatistics(virtPage, virtTitle, window.location.href, virtPrice)
                    }
                }
            }
        }
    }))
}

function tcart__addProduct(productObj) {
    var ts = Math.floor(Date.now() / 1e3);
    tcart__syncProductsObject__LStoObj();
    var obj = window.tcart.products,
        flag_incart = "";
    obj.length > 0 && $.each(obj, (function (index, product) {
        var eq_options = "y",
            eq_sku = "";
        if ("y" == window.tcart_oneproduct) {
            if (product.name == productObj.name && product.price == productObj.price) {
                if (null == product.options && null == productObj.options && null == product.sku && null == productObj.sku) return flag_incart = "yes", !1;
                if (null == product.options && null == productObj.options && null != product.sku && null != productObj.sku && product.sku == productObj.sku) return flag_incart = "yes", !1;
                if ("object" == typeof product.options && "object" == typeof productObj.options && ($.each(product.options, (function (index, option) {
                        if ("object" == typeof option && "object" == typeof productObj.options[index]) {
                            if (option.option !== productObj.options[index].option || option.variant !== productObj.options[index].variant || option.price !== productObj.options[index].price) return eq_options = !1
                        } else if (null == option || null == productObj.options[index]) return eq_options = !1
                    })), product.sku === productObj.sku && (eq_sku = "y"), "y" === eq_options && "y" === eq_sku)) return parseInt(window.tcart.products[index].quantity, 10) === parseInt(productObj.inv, 10) && alert(tcart_dict("limitReached")), flag_incart = "yes", !1
            }
        } else if (product.name == productObj.name && product.price == productObj.price && product.portion == productObj.portion && product.single == productObj.single && ("object" == typeof product.options && "object" == typeof productObj.options && $.each(product.options, (function (index, option) {
                if ("object" == typeof option && "object" == typeof productObj.options[index]) {
                    if (option.option !== productObj.options[index].option || option.variant !== productObj.options[index].variant || option.price !== productObj.options[index].price) return eq_options = !1
                } else if (void 0 === option || void 0 === productObj.options[index]) return eq_options = !1
            })), product.sku === productObj.sku && (eq_sku = "y"), "y" === eq_options && "y" === eq_sku)) {
            var inv = parseInt(productObj.inv, 10),
                quantity = parseInt(productObj.quantity, 10),
                curInCart = parseInt(window.tcart.products[index].quantity, 10);
            return curInCart === inv ? (alert(tcart_dict("limitReached")), flag_incart = "yes", !1) : (void 0 !== productObj.quantity ? curInCart + quantity > inv ? (alert(tcart_dict("limitReached")), flag_incart = "yes", window.tcart.products[index].quantity = inv) : window.tcart.products[index].quantity += quantity : window.tcart.products[index].quantity++, window.tcart.products[index].amount = window.tcart.products[index].price * window.tcart.products[index].quantity, window.tcart.products[index].amount = tcart__roundPrice(window.tcart.products[index].amount), window.tcart.products[index].ts = ts, flag_incart = "yes", !1)
        }
    })), "" == flag_incart && (void 0 === productObj.quantity ? (productObj.quantity = 1, productObj.amount = productObj.price) : productObj.amount = tcart__roundPrice(productObj.price * productObj.quantity), productObj.ts = ts, window.tcart.products.push(productObj)), tcart__updateTotalProductsinCartObj(), tcart__reDrawCartIcon(), tcart__saveLocalObj(), "yes" == $(".t706").attr("data-opencart-onorder") ? setTimeout((function () {
        tcart__openCart()
    }), 10) : ($(".t706__carticon").addClass("t706__carticon_neworder"), setTimeout((function () {
        $(".t706__carticon").removeClass("t706__carticon_neworder")
    }), 2e3))
}

function tcart__updateProductsPrice() {
    var now = Math.floor(Date.now() / 1e3),
        ts;
    void 0 !== window.tcart && (void 0 !== window.tcart.updated && (now - parseInt(window.tcart.updated, 10)) / 3600 > 12 && $.ajax({
        type: "POST",
        url: "https://store.tildacdn.com/api/getpriceproducts/",
        data: window.tcart,
        dataType: "text",
        success: function (data) {
            "string" == typeof data && "{" === data.substr(0, 1) || console.error("Can't get array.");
            var productsArr = [];
            try {
                var dataObj = jQuery.parseJSON(data);
                if ("error" === dataObj.status) productsArr = dataObj.bad;
                else if ("success" === dataObj.status) return
            } catch (e) {
                console.error("Can't get JSON.", data)
            }
            "" !== productsArr ? 0 !== productsArr.length ? (Object.keys(productsArr).forEach((function (i) {
                var badUid = productsArr[i].uid || productsArr[i].lid;
                "PRICE_CHANGED" === productsArr[i].error && window.tcart.products.forEach((function (product, index) {
                    var uid = product.uid || product.lid;
                    if (badUid === uid && (void 0 !== product.options && void 0 !== productsArr[i].options && void 0 !== productsArr[i].variant && product.options.forEach((function (option) {
                            if (option.variant === productsArr[i].variant) return window.tcart.products[index].amount = parseFloat(productsArr[i].last_amount), void(window.tcart.products[index].price = parseFloat(productsArr[i].last_price))
                        })), void 0 === product.options && void 0 === productsArr[i].options && void 0 === productsArr[i].variant)) return window.tcart.products[index].amount = parseFloat(productsArr[i].last_amount), void(window.tcart.products[index].price = parseFloat(productsArr[i].last_price))
                })), "LESS_PRODUCTS" !== productsArr[i].error && "NOT_FOUND_PRODUCT" !== productsArr[i].error || window.tcart.products.forEach((function (product, index) {
                    var uid = product.uid || product.lid;
                    badUid === uid && (window.tcart.products[index] = {})
                }))
            })), tcart__saveLocalObj(), tcart__reDrawProducts(), tcart__updateTotalProductsinCartObj(), $(".t706__carticon-counter").html(window.tcart.total), tcart__reDrawTotal()) : console.error("Nothing to update.") : console.error("Something went wrong. Can't get products array.")
        },
        timeout: 25e3
    }))
}

function tcart__updateTotalProductsinCartObj() {
    var obj = window.tcart.products;
    if (obj.length > 0) {
        var total = 0,
            prodamount = 0;
        $.each(obj, (function (index, product) {
            $.isEmptyObject(product) || "yes" === product.deleted || ("y" === product.single ? total += 1 : total += 1 * product.quantity, prodamount = 1 * prodamount + 1 * product.amount)
        })), prodamount = tcart__roundPrice(prodamount), window.tcart.total = total, window.tcart.prodamount = prodamount;
        var amount = prodamount;
        if ("object" == typeof window.tcart.promocode && void 0 !== window.tcart.promocode.promocode && "" != window.tcart.promocode.promocode) {
            var discountsum = 0;
            void 0 !== window.tcart.promocode.discountsum && window.tcart.promocode.discountsum > 0 ? discountsum = 1 * window.tcart.promocode.discountsum : void 0 !== window.tcart.promocode.discountpercent && window.tcart.promocode.discountpercent > 0 ? discountsum = tcart__roundPrice(amount * window.tcart.promocode.discountpercent * 1 / 100) : console.error("Cart Some error."), (amount = tcart__roundPrice(amount -= discountsum)) < 0 && (amount = 0), window.tcart.prodamount_discountsum = discountsum, window.tcart.prodamount_withdiscount = amount
        } else delete window.tcart.prodamount_discountsum, delete window.tcart.prodamount_withdiscount;
        "object" == typeof window.tcart.delivery && void 0 !== window.tcart.delivery.price && window.tcart.delivery.price > 0 && window.tcart.prodamount > 0 && (void 0 !== window.tcart.delivery.freedl && window.tcart.delivery.freedl > 0 && amount >= window.tcart.delivery.freedl || (amount += 1 * window.tcart.delivery.price)), amount > 0 && (amount = tcart__roundPrice(amount)), window.tcart.amount = amount
    } else window.tcart.total = 0, window.tcart.prodamount = 0, window.tcart.amount = 0
}

function tcart__reDrawCartIcon() {
    var tcart = window.tcart,
        el = $(".t706__carticon");
    if (1 == tcart.total && (el.css("opacity", 0), el.animate({
            opacity: 1
        }, 300)), void 0 !== tcart.products && tcart.products.length > 0 && tcart.total > 0 ? (el.addClass("t706__carticon_showed"), el.find(".t706__carticon-counter").html(tcart.total)) : (el.removeClass("t706__carticon_showed"), el.find(".t706__carticon-counter").html("")), "" === tcart__showPrice(window.tcart.prodamount) ? $(".t706__carticon-text").hide() : ($(".t706__carticon-text").show(), $(".t706__carticon-text").html("=&nbsp;" + tcart__showPrice(window.tcart.prodamount))), "y" === window.lazy || "yes" === $("#allrecords").attr("data-tilda-lazy")) try {
        tcart__onFuncLoad("t_lazyload_update", (function () {
            t_lazyload_update()
        }))
    } catch (e) {
        console.error("js lazyload not loaded")
    }
}

function tcart__openCart() {
    $(".t706__carticon").removeClass("t706__carticon_showed"), $("body").addClass("t706__body_cartwinshowed"), $(".t706 .t-form__submit button").removeClass("t706__submit_disable"), $(".t706 .t-form__submit button").removeAttr("disabled"), void 0 !== window.tildaForm.hideErrors && window.tildaForm.hideErrors($(".t706 .t-form")), setTimeout((function () {
        tcart__lockScroll()
    }), 500), tcart__syncProductsObject__LStoObj(), tcart__updateProductsPrice();
    var el = $(".t706__cartwin");
    if (el.css("opacity", 0), el.addClass("t706__cartwin_showed"), el.animate({
            opacity: 1
        }, 300), tcart__reDrawProducts(), tcart__reDrawTotal(), $(document).keyup(tcart__keyUpFunc), "y" === window.lazy || "yes" === $("#allrecords").attr("data-tilda-lazy")) try {
        tcart__onFuncLoad("t_lazyload_update", (function () {
            t_lazyload_update()
        }))
    } catch (e) {
        console.error("js lazyload not loaded")
    }
    $(".t706 .t-form .t-radio__wrapper-delivery").each((function (index, wrapper) {
        "y" !== $(wrapper).attr("data-delivery-services") || window.tcart_newDeliveryActive || ("undefined" != typeof tcart_newDelivery && "function" == typeof tcart_newDelivery.init ? tcart_newDelivery.init(window.tcart__ymapApiKey) : (jQuery.cachedZoomScript || (jQuery.cachedZoomScript = function (url) {
            var options = {
                dataType: "script",
                cache: !0,
                url: url
            };
            return jQuery.ajax(options)
        }), $.cachedZoomScript("https://static.tildacdn.com/js/tilda-delivery-1.0.min.js").done((function (script, textStatus) {
            if ("success" == textStatus) {
                tcart_newDelivery.init(window.tcart__ymapApiKey);
                var css = "https://static.tildacdn.com/css/tilda-delivery-1.0.min.css",
                    deliveryCSS;
                0 === $('link[href^="' + css + '"]').length && $("body").append('<link rel="stylesheet" href="' + css + '">')
            } else console.error("Upload script failed, error: " + textStatus)
        }))))
    }))
}

function tcart__reDrawProducts() {
    var el = $(".t706__cartwin-products");
    if (void 0 !== window.tcart.products) {
        var obj = [],
            oldCountProducts = window.tcart.products.length,
            actualCountProducts;
        $.each(window.tcart.products, (function (index, product) {
            !$.isEmptyObject(product) && "yes" !== product.deleted && product.quantity > 0 && obj.push(product)
        })), window.tcart.products = obj, window.tcart.products.length !== oldCountProducts && tcart__saveLocalObj()
    }
    var flag_hasimg = "";
    if (obj.length > 0 && $.each(obj, (function (index, product) {
            "" != product.img && (flag_hasimg = "yes")
        })), obj.length > 0) {
        var str = "";
        $.each(obj, (function (index, product) {
            str += '<div class="t706__product" data-cart-product-i="' + index + '">', "yes" == flag_hasimg && (str += '<div class="t706__product-thumb"><div class="t706__product-imgdiv"' + ("" !== product.img ? "style=\"background-image:url('" + product.img + "');\"" : "") + "></div></div>"), str += '<div class="t706__product-title t-descr t-descr_sm">', product.url ? str += '<a style="color: inherit" target="_blank" href="' + product.url + '">' + product.name + "</a>" : str += product.name, void 0 !== product.options && product.options.length > 0 && (str += '<div class="t706__product-title__option">', $.each(product.options, (function (o_index, option) {
                str += "<div>" + option.option + ": " + option.variant + "</div>"
            })), str += "</div>"), void 0 !== product.sku && "" != product.sku && (str += '<div class="t706__product-title__option">', str += product.sku, str += "</div>"), product.portion > 0 && (str += '<div class="t706__product-title__portion">', str += tcart__showPrice(product.price) + "/", "1" !== product.portion && (str += product.portion + " "), str += t_store_dict(product.unit) + "</div>"), str += "</div>", void 0 !== window.tcart_oneproduct && "y" == window.tcart_oneproduct ? str += '<div class="t706__product-plusminus t-descr t-descr_sm" style="display:none;"><span class="t706__product-quantity">' + product.quantity + "</span></div>" : (str += '<div class="t706__product-plusminus t-descr t-descr_sm"><span class="t706__product-minus"><img src="https://static.tildacdn.com/lib/linea/c8eecd27-9482-6c4f-7896-3eb09f6a1091/arrows_circle_minus.svg" style="width:16px;height:16px;border:0"></span>', str += '<span class="t706__product-quantity">' + product.quantity + "</span>", str += '<span class="t706__product-plus"><img src="https://static.tildacdn.com/lib/linea/c47d1e0c-6880-dc39-ae34-521197f7fba7/arrows_circle_plus.svg" style="width:16px;height:16px;border:0"></span></div>'), product.portion > 0 ? (str += '<div class="t706__product-amount--portion t-descr t-descr_sm">', product.amount > 0 && (str += '<span class="t706__product-amount">' + tcart__showPrice(product.amount) + "</span>", str += '<span class="t706__product-portion">' + tcart__showWeight(product.quantity * product.portion, product.unit) + "</span>"), str += "</div>") : (str += '<div class="t706__product-amount t-descr t-descr_sm">', product.amount > 0 && (str += tcart__showPrice(product.amount)), str += "</div>"), str += '<div class="t706__product-del"><img src="https://static.tildacdn.com/lib/linea/1bec3cd7-e9d1-2879-5880-19b597ef9f1a/arrows_circle_remove.svg" style="width:20px;height:20px;border:0;"></div>', str += "</div>"
        })), el.html(str), tcart__addEvents__forProducts(), $(".t706 .t-form__submit button").removeClass("t706__submit_disable"), $(".t706 .t-form__submit button").removeAttr("disabled")
    } else el.html("")
}

function tcart__reDrawTotal() {
    $(".t706__cartwin-prodamount").html(tcart__showPrice(window.tcart.prodamount)), $(".t706__cartwin-totalamount").html(tcart__showPrice(window.tcart.amount));
    var elinfo = $(".t706__cartwin-totalamount-info"),
        elLabel, elValue;
    elinfo.html(""), "object" != typeof window.tcart.promocode && "object" != typeof window.tcart.delivery || (elinfo.css("display", "block"), elLabel = '<span class="t706__cartwin-totalamount-info_label">' + tcart_dict("subtotal") + ":</span>", elValue = '<span class="t706__cartwin-totalamount-info_value">' + tcart__showPrice(window.tcart.prodamount) + "</span>", elinfo.append(elLabel + elValue + "<br>")), "object" == typeof window.tcart.promocode && (elLabel = '<span class="t706__cartwin-totalamount-info_label">' + tcart_dict("promoCode") + ":</span>", elValue = '<span class="t706__cartwin-totalamount-info_value">' + window.tcart.promocode.promocode + (void 0 !== window.tcart.promocode.discountpercent ? " " + window.tcart.promocode.discountpercent + "% " : "") + "</span>", elinfo.append(elLabel + elValue + "<br>"), elLabel = '<span class="t706__cartwin-totalamount-info_label">' + tcart_dict("discount") + ":</span>", elValue = '<span class="t706__cartwin-totalamount-info_value">' + tcart__showPrice(window.tcart.prodamount_discountsum) + "</span>", elinfo.append(elLabel + elValue + "<br>"), window.tcart.prodamount_withdiscount > 0 ? (elLabel = '<span class="t706__cartwin-totalamount-info_label">' + tcart_dict("subtotalDiscount") + ":</span>", elValue = '<span class="t706__cartwin-totalamount-info_value">' + tcart__showPrice(window.tcart.prodamount_withdiscount) + "</span>", elinfo.append(elLabel + elValue + "<br>")) : (elLabel = '<span class="t706__cartwin-totalamount-info_label">' + tcart_dict("subtotalDiscount") + ":</span>", elValue = '<span class="t706__cartwin-totalamount-info_value"> 0<br></span>', elinfo.append(elLabel + elValue))), "object" == typeof window.tcart.delivery && void 0 !== window.tcart.delivery.name && void 0 !== window.tcart.delivery.price && (window.tcart.delivery.price > 0 || window.tcart.delivery["service-id"]) && (void 0 !== window.tcart.delivery.freedl && window.tcart.delivery.freedl > 0 && window.tcart.prodamount >= window.tcart.delivery.freedl && (window.tcart.prodamount_withdiscount >= window.tcart.delivery.freedl || void 0 === window.tcart.prodamount_withdiscount) ? (elLabel = '<span class="t706__cartwin-totalamount-info_label">' + window.tcart.delivery.name + ":</span>", elValue = '<span class="t706__cartwin-totalamount-info_value"> 0 (' + tcart_dict("free") + ")<br></span>", elinfo.append(elLabel + elValue)) : window.tcart.delivery.price > 0 && (elLabel = '<span class="t706__cartwin-totalamount-info_label">' + window.tcart.delivery.name + ":</span>", elValue = '<span class="t706__cartwin-totalamount-info_value">' + tcart__showPrice(window.tcart.delivery.price) + "</span>", elinfo.append(elLabel + elValue + "<br>"))), 0 == window.tcart.prodamount ? $(".t706__cartwin-prodamount-wrap").css("display", "none") : $(".t706__cartwin-prodamount-wrap").css("display", "block"), tcart__changeSubmitStatus(), 0 == window.tcart.amount ? $(".t706__cartwin-totalamount-wrap").css("display", "none") : window.tcart.prodamount == window.tcart.amount ? $(".t706__orderform").length && $(".t706__orderform").height() > 700 ? $(".t706__cartwin-totalamount-wrap").css("display", "block") : $(".t706__cartwin-totalamount-wrap").css("display", "none") : $(".t706__cartwin-totalamount-wrap").css("display", "block"), void 0 !== window.tcart.promocode && ($(".t706__cartwin-totalamount-wrap").css("display", "block"), 0 == window.tcart.amount && $(".t706__cartwin-totalamount").html("0")), void 0 !== window.tcart.delivery && void 0 !== window.tcart.delivery.price && window.tcart.delivery.price > 0 && $(".t706__cartwin-totalamount-wrap").css("display", "block"), $(".t706__carticon-text").html("=&nbsp;" + tcart__showPrice(window.tcart.prodamount))
}

function tcart__changeSubmitStatus() {
    var newDeliveryActive = window.tcart_newDeliveryActive,
        minOrderSetted = void 0 !== window.tcart_minorder && window.tcart_minorder > 0,
        minQuantitySetted = void 0 !== window.tcart_mincntorder && window.tcart_mincntorder > 0;
    if (newDeliveryActive && window.tcart.emptyDeliveryServices && ($(".t706 .t-form__submit button").addClass("t706__submit_disable"), $(".t706 .t-form__submit button").attr("disabled", "disabled")), minOrderSetted && minQuantitySetted) {
        if (minOrderSetted && (window.tcart.prodamount >= window.tcart_minorder ? $(".t706__cartwin-prodamount-minorder").css("display", "none") : $(".t706__cartwin-prodamount-minorder").css("display", "block")), minQuantitySetted && (window.tcart.total >= window.tcart_mincntorder ? $(".t706__cartwin-prodamount-mincntorder").css("display", "none") : $(".t706__cartwin-prodamount-mincntorder").css("display", "block")), window.tcart.prodamount >= window.tcart_minorder && window.tcart.total >= window.tcart_mincntorder) {
            if (newDeliveryActive && window.tcart.emptyDeliveryServices) return;
            $(".t706").find(".t-submit").removeClass("t706__submit_disable"), $(".t706 .t-form__submit button").removeAttr("disabled")
        }
    } else if (minOrderSetted || minQuantitySetted) {
        if (minOrderSetted)
            if (window.tcart.prodamount >= window.tcart_minorder) {
                if (newDeliveryActive && window.tcart.emptyDeliveryServices) return;
                $(".t706__cartwin-prodamount-minorder").css("display", "none"), $(".t706").find(".t-submit").removeClass("t706__submit_disable"), $(".t706 .t-form__submit button").removeAttr("disabled")
            } else $(".t706__cartwin-prodamount-minorder").css("display", "block");
        if (minQuantitySetted)
            if (window.tcart.total >= window.tcart_mincntorder) {
                if (newDeliveryActive && window.tcart.emptyDeliveryServices) return;
                $(".t706__cartwin-prodamount-mincntorder").css("display", "none"), $(".t706").find(".t-submit").removeClass("t706__submit_disable"), $(".t706 .t-form__submit button").removeAttr("disabled")
            } else $(".t706__cartwin-prodamount-mincntorder").css("display", "block")
    } else newDeliveryActive && !window.tcart.emptyDeliveryServices && ($(".t706").find(".t-submit").removeClass("t706__submit_disable"), $(".t706 .t-form__submit button").removeAttr("disabled"))
}

function tcart__addEvents__forProducts() {
    $(".t706__product-plus").click((function () {
        tcart__product__plus($(this))
    })), $(".t706__product-minus").click((function () {
        tcart__product__minus($(this))
    })), $(".t706__product-del").click((function () {
        tcart__product__del($(this))
    })), $(".t706__product-quantity").click((function () {
        tcart__product__editquantity($(this))
    }))
}

function tcart__closeCart() {
    var tcart = window.tcart;
    $("body").removeClass("t706__body_cartwinshowed"), tcart__unlockScroll(), $(".t706 .t-form__submit button").removeClass("t706__submit_disable"), $(".t706 .t-form__submit button").removeAttr("disabled"), "y" === window.tcart_dontstore && (void 0 !== window.tcart && void 0 !== tcart.products && (tcart.products = []), tcart__updateTotalProductsinCartObj(), $(".t706__carticon-counter").html(tcart.total), tcart__reDrawTotal()), void 0 !== tcart.products && tcart.products.length > 0 && tcart.total > 0 ? $(".t706__carticon").addClass("t706__carticon_showed") : $(".t706__carticon").removeClass("t706__carticon_showed"), tcart.amount > 0 ? $(".t706__carticon-text").show() : $(".t706__carticon-text").hide(), tcart__delZeroquantity_inCartObj(), $(document).unbind("keyup", tcart__keyUpFunc), $(".t706__carticon").removeClass("t706__carticon_neworder"), $(".t706__cartwin").animate({
        opacity: 0
    }, 300), setTimeout((function () {
        $(".t706__cartwin").removeClass("t706__cartwin_showed"), $(".t706__cartwin").css("opacity", "1")
    }), 300), "yes" == window.tcart_success && location.reload()
}

function tcart__keyUpFunc(e) {
    27 == e.keyCode && tcart__closeCart()
}

function tcart__product__plus(thiss) {
    var el = thiss.closest(".t706__product"),
        i = el.attr("data-cart-product-i");
    (window.tcart.products[i] || (tcart__syncProductsObject__LStoObj(), null != window.tcart.products[i])) && (window.tcart.products[i].quantity > 0 && void 0 !== window.tcart.products[i].inv && window.tcart.products[i].inv > 0 && window.tcart.products[i].inv == window.tcart.products[i].quantity ? alert(tcart_dict("limitReached")) : (window.tcart.products[i].quantity++, window.tcart.products[i].amount = window.tcart.products[i].price * window.tcart.products[i].quantity, window.tcart.products[i].amount = tcart__roundPrice(window.tcart.products[i].amount), el.find(".t706__product-quantity").html(window.tcart.products[i].quantity), "y" === window.tcart.products[i].single && void 0 !== window.tcart.products[i].portion && el.find(".t706__product-portion").html(tcart__showWeight(window.tcart.products[i].quantity * window.tcart.products[i].portion, window.tcart.products[i].unit)), window.tcart.products[i].amount > 0 ? el.find(".t706__product-amount").html(tcart__showPrice(window.tcart.products[i].amount)) : el.find(".t706__product-amount").html(""), tcart__updateTotalProductsinCartObj(), $(".t706__carticon-counter").html(window.tcart.total), tcart__reDrawTotal(), tcart__saveLocalObj()))
}

function tcart__product__minus(thiss) {
    var el = thiss.closest(".t706__product"),
        i = el.attr("data-cart-product-i");
    (window.tcart.products[i] || (tcart__syncProductsObject__LStoObj(), null != window.tcart.products[i])) && (window.tcart.products[i].quantity > 0 && window.tcart.products[i].quantity--, window.tcart.products[i].amount = tcart__roundPrice(window.tcart.products[i].price * window.tcart.products[i].quantity), window.tcart.products[i].amount > 0 && el.find(".t706__product-amount").html(tcart__showPrice(window.tcart.products[i].amount)), 0 == window.tcart.products[i].quantity && tcart__product__del(thiss), window.tcart.products[i].amount > 0 && "y" === window.tcart.products[i].single && void 0 !== window.tcart.products[i].portion && el.find(".t706__product-portion").html(tcart__showWeight(window.tcart.products[i].quantity * window.tcart.products[i].portion, window.tcart.products[i].unit)), el.find(".t706__product-quantity").html(window.tcart.products[i].quantity), tcart__updateTotalProductsinCartObj(), $(".t706__carticon-counter").html(window.tcart.total), tcart__reDrawTotal(), tcart__saveLocalObj())
}

function tcart__product__del(thiss) {
    var el = thiss.closest(".t706__product"),
        i = el.attr("data-cart-product-i"),
        ver;
    if (parseInt(thiss.closest(".t706").attr("data-cart-ver"), 10) > 136) {
        var title = el.find(".t706__product-title a").text() || el.find(".t706__product-title").contents().eq(0).text(),
            height = el.outerHeight(),
            products = $(el).closest(".t706__cartwin-products"),
            product, deleted = products.find('.t706__product-deleted[data-cart-product-i="' + i + '"]');
        if (0 === deleted.length) {
            var productsLength;
            $(el).after('<div class="t706__product-deleted" data-cart-product-i="' + i + '" style="display: none">                <div class="t706__product-deleted-wrapper" colspan="5">                    <div class="t706__product-deleted__timer t-descr">                        <div class="t706__product-deleted__timer__left">                            <div class="t706__product-deleted__timer__counter">                                <span class="t706__product-deleted__timer__counter__number">4</span>                                <svg class="t706__product-deleted__timer__counter__circle">                                    <circle r="10" cx="12" cy="12"></circle>                                </svg>                            </div>                            <div class="t706__product-deleted__timer__title">' + tcart_dict("youRemoved") + ' "' + title + '"</div>                        </div>                        <div class="t706__product-deleted__timer__return">' + tcart_dict("undo") + "</div>                    </div>                </div>            </div>"), deleted = products.find('.t706__product-deleted[data-cart-product-i="' + i + '"]'), $(el).fadeOut(200, (function () {
                product = $(this).detach(), $(deleted).fadeIn(200).css("height", height)
            })), window.tcart.products[i].deleted = "yes", tcart__updateTotalProductsinCartObj(), $(".t706__carticon-counter").html(window.tcart.total), tcart__reDrawTotal(), tcart__saveLocalObj(), 0 === window.tcart.products.filter((function (el) {
                return !$.isEmptyObject(el) && "yes" !== el.deleted && 0 !== el.quantity
            })).length && ($(".t706 .t-form__submit button").addClass("t706__submit_disable"), $(".t706 .t-form__submit button").attr("disabled", "disabled"));
            var timerOut = setInterval((function () {
                var countdown = $(deleted).find(".t706__product-deleted__timer__counter__number"),
                    count = $(countdown).text();
                $(".t706__cartwin").hasClass("t706__cartwin_showed") || clearInterval(timerOut), count > 1 ? $(countdown).text(parseInt(count, 10) - 1) : (clearInterval(timerOut), $(deleted).fadeOut(200, (function () {
                    var attr;
                    "yes" !== $(deleted).attr("data-clicked") && void 0 !== window.tcart.products[i] && "yes" === window.tcart.products[i].deleted && ($(this).remove(), window.tcart.products[i] = {}, 0 === products.find(".t706__product-deleted").length && $.isEmptyObject(window.tcart.products[i]) && (window.tcart.products.splice(i, 1), tcart__reDrawProducts()), tcart__saveLocalObj());
                    var productsLength = window.tcart.products.filter((function (el) {
                        return !$.isEmptyObject(el)
                    })).length;
                    0 !== window.tcart.products.length && 0 !== productsLength || tcart__closeCart()
                })))
            }), 1e3);
            $(deleted).find(".t706__product-deleted__timer__return").one("click", (function () {
                if ($(deleted).attr("data-clicked", "yes"), clearInterval(timerOut), $(deleted).fadeOut(200, (function () {
                        $(this).after($(product)), $(product).fadeIn(200, (function () {
                            $(this).removeAttr("style")
                        })), $(this).remove()
                    })), void 0 === window.tcart.products[i]) {
                    tcart__reDrawProducts();
                    var productsLength = window.tcart.products.filter((function (el) {
                        return !$.isEmptyObject(el)
                    })).length;
                    0 !== window.tcart.products.length && 0 !== productsLength || tcart__closeCart()
                } else delete window.tcart.products[i].deleted;
                $(thiss).hasClass("t706__product-minus") ? tcart__product__plus(thiss) : (tcart__updateTotalProductsinCartObj(), $(".t706__carticon-counter").html(window.tcart.total), tcart__reDrawTotal(), tcart__saveLocalObj()), $(".t706 .t-form__submit button").removeClass("t706__submit_disable"), $(".t706 .t-form__submit button").removeAttr("disabled")
            }))
        }
    } else void 0 === window.tcart.products[i] && tcart__syncProductsObject__LStoObj(), window.tcart.products.splice(i, 1), el.remove(), tcart__updateTotalProductsinCartObj(), $(".t706__carticon-counter").html(window.tcart.total), tcart__reDrawTotal(), tcart__saveLocalObj(), tcart__reDrawProducts(), 0 === window.tcart.products.length && tcart__closeCart()
}

function tcart__product__editquantity(thiss) {
    var qnt = "";
    if (!thiss.find(".t706__product-quantity-inp").length) {
        var el = thiss.closest(".t706__product"),
            i = el.attr("data-cart-product-i"),
            foo = thiss.text(),
            str = '<input type="text" name="tilda-tmp-cart-qnt" class="t706__product-quantity-inp" value="' + (qnt = 0 == foo || foo > 0 ? parseInt(foo, 10) : 1) + '" style="width:30px">';
        thiss.html(str), thiss.addClass("t706__product-quantity_editing");
        var inp = thiss.find(".t706__product-quantity-inp");
        inp.focus((function () {
            var that = this;
            setTimeout((function () {
                that.selectionStart = that.selectionEnd = 1e4
            }), 0)
        })), inp.focus(), inp.focusout((function () {
            var qnt = "",
                foo = inp.val();
            foo = parseInt(foo, 10), tcart__product__updateQuantity(thiss, el, i, qnt = foo > 0 ? foo : 1), thiss.text(window.tcart.products[i].quantity), thiss.removeClass("t706__product-quantity_editing")
        }))
    }
}

function tcart__product__updateQuantity(thiss, el, i, qnt) {
    qnt > 0 ? (void 0 !== window.tcart.products[i].inv && window.tcart.products[i].inv > 0 && qnt > window.tcart.products[i].inv && (alert(tcart_dict("limitReached")), qnt = window.tcart.products[i].inv), window.tcart.products[i].quantity = qnt, window.tcart.products[i].amount = window.tcart.products[i].price * window.tcart.products[i].quantity, window.tcart.products[i].amount = tcart__roundPrice(window.tcart.products[i].amount), el.find(".t706__product-quantity").html(window.tcart.products[i].quantity), "y" === window.tcart.products[i].single && void 0 !== window.tcart.products[i].portion && el.find(".t706__product-portion").html(tcart__showWeight(window.tcart.products[i].quantity * window.tcart.products[i].portion, window.tcart.products[i].unit)), window.tcart.products[i].amount > 0 ? el.find(".t706__product-amount").html(tcart__showPrice(window.tcart.products[i].amount)) : el.find(".t706__product-amount").html("")) : tcart__product__del(thiss), tcart__updateTotalProductsinCartObj(), $(".t706__carticon-counter").html(window.tcart.total), tcart__reDrawTotal(), tcart__saveLocalObj(), 0 == qnt && tcart__reDrawProducts()
}

function tcart__delZeroquantity_inCartObj() {
    var obj = window.tcart.products,
        flag_ismod = "";
    obj.length > 0 && $.each(obj, (function (index, product) {
        void 0 !== product && 0 == product.quantity && (window.tcart.products.splice(index, 1), flag_ismod = "yes")
    })), "yes" == flag_ismod && tcart__saveLocalObj()
}

function tcart__drawBottomTotalAmount() {
    var str = "";
    str += '<div class="t706__cartwin-totalamount-wrap t-descr t-descr_xl">', str += '<div class="t706__cartwin-totalamount-info" style="margin-top: 10px; font-size:14px; font-weight:400;"></div>', str += '<span class="t706__cartwin-totalamount-label">' + tcart_dict("total") + ":&nbsp;</span>", str += '<span class="t706__cartwin-totalamount"></span>', str += "</div>", $(".t706 .t-form__errorbox-middle").before(str)
}

function tcart__addDelivery() {
    var wrp = $(".t706 .t-form .t-radio__wrapper-delivery");
    if (0 !== wrp.length) {
        var ed_name = $(".t706 .t-form .t-radio__wrapper-delivery input:checked").val(),
            ed_price = $(".t706 .t-form .t-radio__wrapper-delivery input:checked").attr("data-delivery-price"),
            ed_serviceId = $(".t706 .t-form .t-radio__wrapper-delivery .t-radio_delivery:checked").attr("data-service-id");
        if (void 0 !== ed_name && void 0 !== ed_price && "" != ed_name) {
            ed_price = tcart__cleanPrice(ed_price);
            var pos = ed_name.indexOf("=");
            pos > 0 && (ed_name = (ed_name = ed_name.substring(0, pos)).trim()), window.tcart.delivery = {}, window.tcart.delivery.name = ed_name, window.tcart.delivery.price = ed_price, ed_serviceId && (window.tcart.delivery.service_id = ed_serviceId), window.tcart_newDeliveryActive && window.tcart_newDelivery.deliveryState.freeDeliveryThreshold >= 0 ? window.tcart.delivery.freedl = window.tcart_newDelivery.deliveryState.freeDeliveryThreshold : void 0 !== wrp.attr("data-delivery-free") && wrp.attr("data-delivery-free") >= 0 && (window.tcart.delivery.freedl = parseInt(wrp.attr("data-delivery-free"), 10))
        }
        var el = $(".t706 .t-form .t-radio__wrapper-delivery input");
        el.length && el.change((function () {
            tcart__updateDelivery()
        }))
    }
}

function tcart__updateDelivery() {
    var ed_name = $(".t706 .t-form .t-radio__wrapper-delivery input:checked").val(),
        ed_price = $(".t706 .t-form .t-radio__wrapper-delivery input:checked").attr("data-delivery-price");
    if (void 0 !== ed_name && void 0 !== ed_price) {
        if (ed_price = tcart__cleanPrice(ed_price), "" != ed_name) {
            var pos = ed_name.indexOf("=");
            pos > 0 && (ed_name = (ed_name = ed_name.substring(0, pos)).trim())
        }
        if (window.tcart.delivery = {}, window.tcart.delivery.name = ed_name, window.tcart.delivery.price = ed_price, window.tcart_newDeliveryActive && window.tcart_newDelivery.deliveryState.freeDeliveryThreshold >= 0) window.tcart.delivery.freedl = window.tcart_newDelivery.deliveryState.freeDeliveryThreshold;
        else {
            var wrp = $(".t706 .t-form .t-radio__wrapper-delivery");
            void 0 !== wrp.attr("data-delivery-free") && wrp.attr("data-delivery-free") >= 0 && (window.tcart.delivery.freedl = parseInt(wrp.attr("data-delivery-free"), 10))
        }
    } else void 0 !== window.tcart.delivery && delete window.tcart.delivery;
    $(".t706 #customdelivery").length && (void 0 === tcart_newDelivery.fillTcartDelivery ? tcart_newDelivery.saveTcartDelivery() : tcart_newDelivery.fillTcartDelivery(), tcart_newDelivery.setFullAddress(tcart_newDelivery.getFullAddress())), void 0 !== window.tcart.products && 0 !== window.tcart.products.length || tcart__syncProductsObject__LStoObj(), tcart__updateTotalProductsinCartObj(), tcart__reDrawTotal()
}

function tcart__addPromocode(obj) {
    "object" != typeof window.tcart.promocode ? ("object" == typeof obj && void 0 !== obj.promocode && "" != obj.promocode && (obj.discountsum > 0 || obj.discountpercent > 0) && (window.tcart.promocode = obj), window.tcart_newDeliveryActive && window.tcart.amount && window.tcart.total && tcart__rerenderDeliveryServices(), tcart__updateTotalProductsinCartObj(), tcart__reDrawTotal()) : console.error("Error. Promocode already activated before")
}

function tcart__addEvent__selectpayment() {
    if (0 != $(".t706").find(".t-input-group_pm").length) {
        var el = $(".t706 .t-form .t-radio__wrapper-payment input");
        el.length && (el.change((function () {
            var v = $(".t706 .t-form .t-radio__wrapper-payment input:checked").attr("data-payment-variant-system");
            void 0 !== v && "" != v || (v = ""), $(".t706").attr("data-payment-variant-system", v), window.tcart.system = v
        })), $(".t706 .t-form .t-radio__wrapper-payment input:checked").trigger("change"))
    }
}

function tcart__escapeHtml(text) {
    var map = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    };
    return text.replace(/[<>"']/g, (function (m) {
        return map[m]
    }))
}

function tcart__escapeHtmlImg(text) {
    var map = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;"
    };
    return text.replace(/[<>"]/g, (function (m) {
        return map[m]
    }))
}

function tcart__cleanPrice(price) {
    return void 0 === price || "" == price || 0 == price ? price = 0 : (price = (price = price.replace(",", ".")).replace(/[^0-9\.]/g, ""), price = parseFloat(price).toFixed(2), isNaN(price) && (price = 0), price = parseFloat(price), (price *= 1) < 0 && (price = 0)), price
}

function tcart__roundPrice(price) {
    return void 0 === price || "" == price || 0 == price ? price = 0 : (price = parseFloat(price).toFixed(2), price = parseFloat(price), (price *= 1) < 0 && (price = 0)), price
}

function tcart__showWeight(weight, unit) {
    if (isNaN(parseInt(weight, 10))) return "";
    var convertedUnits = {
            lites: {
                value: 1e3,
                units: ["MLT", "LTR"]
            },
            gramms: {
                value: 1e3,
                units: ["MGM", "GRM", "KGM", "TNE"]
            },
            meters: {
                value: 10,
                units: ["MMT", "CMT", "DMT", "MTR"]
            }
        },
        pos = -1,
        key = "";
    if (Object.keys(convertedUnits).forEach((function (el) {
            var index = convertedUnits[el].units.indexOf(unit);
            index >= 0 && (pos = index, key = el)
        })), pos >= 0 && "" !== key)
        for (var value = convertedUnits[key].value, i = pos + 1; i < convertedUnits[key].units.length; i++) weight > value && (weight /= value, unit = convertedUnits[key].units[i]);
    return tcart__roundPrice(weight) + " " + t_store_dict(unit)
}

function tcart__showPrice(price) {
    if (void 0 === price || 0 == price || "" == price) price = "";
    else {
        var foo;
        if (price = price.toString(), void 0 !== window.tcart.currency_dec && "00" == window.tcart.currency_dec)
            if (-1 === price.indexOf(".") && -1 === price.indexOf(",")) price += ".00";
            else 1 === price.substr(price.indexOf(".") + 1).length && (price += "0");
        price = price.replace(/\B(?=(\d{3})+(?!\d))/g, " "), void 0 !== window.tcart.currency_sep && "," == window.tcart.currency_sep && (price = price.replace(".", ",")), price = window.tcart.currency_txt_l + price + window.tcart.currency_txt_r
    }
    return price
}

function tcart__lockScroll() {
    if (window.isiOS && !window.MSStream && "" !== window.isiOSVersion && void 0 !== window.isiOSVersion && 11 === window.isiOSVersion[0]) {
        var body = $("body");
        if (!body.hasClass("t-body_scroll-locked")) {
            var bodyScrollTop = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            body.addClass("t-body_scroll-locked"), body.css("top", "-" + bodyScrollTop + "px"), body.attr("data-popup-scrolltop", bodyScrollTop)
        }
    }
}

function tcart__unlockScroll() {
    if (window.isiOS && !window.MSStream && "" !== window.isiOSVersion && void 0 !== window.isiOSVersion && 11 === window.isiOSVersion[0]) {
        var body = $("body");
        if (body.hasClass("t-body_scroll-locked")) {
            var bodyScrollTop = $("body").attr("data-popup-scrolltop");
            body.removeClass("t-body_scroll-locked"), body.css("top", ""), body.removeAttr("data-popup-scrolltop"), window.scrollTo(0, bodyScrollTop)
        }
    }
}

function tcart__clearProdUrl() {
    try {
        var curUrl = window.location.href,
            indexToRemove = curUrl.indexOf("#!/tproduct/");
        if (window.isiOS && indexToRemove < 0 && (indexToRemove = curUrl.indexOf("%23!/tproduct/")) < 0 && (indexToRemove = curUrl.indexOf("#%21%2Ftproduct%2F")), indexToRemove < 0 && tcart__onFuncLoad("t_store_closePopup", (function () {
                t_store_closePopup(!1)
            })), indexToRemove < 0) return;
        if (curUrl = curUrl.substring(0, indexToRemove), void 0 !== history.replaceState) try {
            window.history.replaceState("", "", curUrl)
        } catch (e) {}
    } catch (e) {}
}

function tcart__onFuncLoad(funcName, okFunc, time) {
    if ("function" == typeof window[funcName]) okFunc();
    else {
        var startTime = Date.now();
        setTimeout((function checkFuncExist() {
            var currentTime = Date.now();
            if ("function" != typeof window[funcName]) {
                if ("complete" === document.readyState && currentTime - startTime > 5e3 && "function" != typeof window[funcName]) throw new Error(funcName + " is undefined");
                setTimeout(checkFuncExist, time || 100)
            } else okFunc()
        }))
    }
}