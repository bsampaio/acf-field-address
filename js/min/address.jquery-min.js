!function ($) {
    var e = 0, t = function (t, a) {
        e += 1;
        var l = {
            layout: [[{id: "street1", label: "Street 1"}], [{id: "street2", label: "Street 2"}], [{
                id: "street3",
                label: "Street 3"
            }], [{id: "city", label: "City"}, {id: "state", label: "State"}, {
                id: "zip",
                label: "Postal Code"
            }, {id: "country", label: "Country"}], []], rowClass: "acf-address-" + e + "-row", sortableElement: "li"
        }, d = $.extend(l, t), n = {
            $el: a,
            layout: d.layout,
            rowClass: d.rowClass,
            sortableElement: d.sortableElement,
            $inputElement: $('<input type="hidden">').prop("name", "acfAddressWidget[" + d.fieldKey + "][address_layout]").prop("value", JSON.stringify(d.layout)),
            $detachedEls: {}
        }, r = function () {
            var e = [];
            n.$el.find("." + n.rowClass).each(function (t, a) {
                var l = [];
                $(a).find(n.sortableElement).each(function (e, a) {
                    var d = $(a);
                    l[e] = {id: d.data().id, label: d.data().label};
                    var n = {col: e, row: t};
                    d.data(n)
                }), e[t] = l
            }), n.$inputElement.attr("value", JSON.stringify(e))
        }, s = function (e, t) {
            var a = $.extend({
                stop: function () {
                    r()
                }
            }, t);
            return e.sortable(a).disableSelection()
        }, i = function (e) {
            var t = e.data.id, l = e.target.value;
            "label" === $(e.target).data("col") && n.$el.find("li").each(function (e, d) {
                a = $(d), a.data().id === t && a.data("label", l).text(l)
            })
        }, o = function (e) {
            var t = e.data.id, l = $(e.target).data(), d = n.$el.find("." + n.rowClass).last();
            e.target.checked ? d.append(n.$detachedEls.hasOwnProperty(t) ? n.$detachedEls[t] : $("<li></li>").data({
                id: l.id,
                label: l.label
            }).text(l.label)) : n.$el.find("li").each(function (e, l) {
                a = $(l), a.data().id === t && (n.$detachedEls[t] = a, a.detach())
            }), r()
        }, p = function () {
            n.$el.append(n.$inputElement), $(n.layout).each(function (e, t) {
                var a = $("<ul></ul>").addClass(n.rowClass);
                n.$el.append(a), s(a, {connectWith: "." + n.rowClass}), $(t).each(function (e, t) {
                    a.append($("<li></li>").data(t).text(t.label))
                })
            })
        };
        return p(), {onBlur: i, onCheck: o}
    }, a = function (e, t) {
        function a(e) {
            r.onBlur(e), d(e)
        }

        function l(e) {
            r.onCheck(e), d(e)
        }

        function d(e) {
            var t = s.$inputElement.data(), a = $(e.target).data("col");
            t.val[e.data.id][a] = "change" === e.type ? e.target.checked : e.target.value, s.$inputElement.data(t), s.$inputElement.prop("value", JSON.stringify(t.val))
        }

        var n = {
            options: {
                street1: {
                    id: "street1",
                    label: "Street 1",
                    defaultValue: "",
                    enabled: !0,
                    cssClass: "street1",
                    separator: ""
                },
                street2: {
                    id: "street2",
                    label: "Street 2",
                    defaultValue: "",
                    enabled: !0,
                    cssClass: "street2",
                    separator: ""
                },
                street3: {
                    id: "street3",
                    label: "Street 3",
                    defaultValue: "",
                    enabled: !0,
                    cssClass: "street3",
                    separator: ""
                },
                city: {id: "city", label: "City", defaultValue: "", enabled: !0, cssClass: "city", separator: ","},
                state: {id: "state", label: "State", defaultValue: "", enabled: !0, cssClass: "state", separator: ""},
                zip: {id: "zip", label: "Postal Code", defaultValue: "", enabled: !0, cssClass: "zip", separator: ""},
                country: {
                    id: "country",
                    label: "Country",
                    defaultValue: "",
                    enabled: !0,
                    cssClass: "country",
                    separator: ""
                }
            }
        }, r = $.extend(n, e), s = {
            $element: t,
            $inputElement: $('<input type="hidden">').data("val", r.options).prop("value", JSON.stringify(r.options)).prop("name", "acfAddressWidget[" + r.fieldKey + "][address_options]"),
            options: r.options,
            onBlur: a,
            onCheck: l
        }, i = function (e, t, a) {
            var l = $('<input type="hidden">').val(t).data(a);
            return "checkbox" === e && l.prop("type", "checkbox").prop("checked", t).on("change", a, s.onCheck), "text" === e && l.prop("type", "text").on("blur", a, s.onBlur), l
        }, o = function () {
            s.$element.append(s.$inputElement);
            var e = $("<table></table>"), t = $("<tr></tr>").append($("<th>Enabled</th>")).append($("<th>Label</th>")).append($("<th>Default Value</th>")).append($("<th>Css Class</th>")).append($("<th>Separator</th>"));
            e.append(t), $.each(s.options, function (t, a) {
                var l = $("<tr></tr>"), d = $("<td></td>").append(i("checkbox", a.enabled, a).data("col", "enabled")), n = $("<td></td>").append(i("text", a.label, a).data("col", "label")), r = $("<td></td>").append(i("text", a.defaultValue, a).data("col", "defaultValue")), s = $("<td></td>").append(i("text", a.cssClass, a).data("col", "cssClass")), o = $("<td></td>").append(i("text", a.separator, a).data("col", "separator"));
                l.append(d).append(n).append(r).append(s).append(o), e.append(l)
            }), s.$element.append(e)
        };
        return o(), s.$element
    };
    $.fn.acfAddressWidget = function (e) {
        var l = $(this), d = $.extend({}, e);
        return l.each(function (e, l) {
            var n = $(l);
            if (n.data("acfAddressWidgetized") !== !0) {
                n.data("acfAddressWidgetized", !0);
                var r = $("<div></div>").attr("id", "options-container"), s = $("<div></div>").attr("id", "layout-container");
                n.append(r).append(s), d.fieldKey = n.data("field"), d.layout = window.acfAddressWidgetData.address_layout, d.options = window.acfAddressWidgetData.address_options;
                var i = t(d, s);
                d.onBlur = i.onBlur, d.onCheck = i.onCheck, a(d, r)
            }
        }), l
    }
}(jQuery);