(window._iconfont_svg_string_4018520 =
  '<svg><symbol id="icon-quxiaoquanping" viewBox="0 0 1024 1024"><path d="M298.666667 631.466667H226.133333v-81.066667h217.6v204.8h-85.333333v-68.266667l-128 128L170.666667 759.466667l128-128z m422.4 0l128 128-59.733334 59.733333-128-128v68.266667h-85.333333V554.666667h217.6v81.066666h-72.533333zM298.666667 341.333333L187.733333 230.4 243.2 170.666667l115.2 115.2V217.6h85.333333v204.8H226.133333V341.333333H298.666667z m430.933333 0h64v81.066667h-217.6V217.6h85.333333v72.533333L780.8 170.666667l59.733333 59.733333L729.6 341.333333z"  ></path></symbol><symbol id="icon-quanping" viewBox="0 0 1024 1024"><path d="M368.896 192H224a32 32 0 0 0-32 32v137.888a32 32 0 0 0 64 0V256h112.896a32 32 0 0 0 0-64zM784.864 192H640a32 32 0 1 0 0 64h112.864v105.888a32 32 0 1 0 64 0V224a32 32 0 0 0-32-32zM368.896 777.92H256V672a32 32 0 1 0-64 0v137.92a32 32 0 0 0 32 32h144.896a32 32 0 1 0 0-64zM784.864 640a32 32 0 0 0-32 32v105.92H640a32 32 0 1 0 0 64h144.864a32 32 0 0 0 32-32V672a32 32 0 0 0-32-32z"  ></path><path d="M912 48h-800c-35.296 0-64 28.704-64 64v800c0 35.296 28.704 64 64 64h800c35.296 0 64-28.704 64-64v-800c0-35.296-28.704-64-64-64z m-800 864v-800h800l0.064 800H112z"  ></path></symbol></svg>'),
  (function (n) {
    var t = (t = document.getElementsByTagName("script"))[t.length - 1],
      e = t.getAttribute("data-injectcss"),
      t = t.getAttribute("data-disable-injectsvg");
    if (!t) {
      var o,
        i,
        a,
        c,
        d,
        s = function (t, e) {
          e.parentNode.insertBefore(t, e);
        };
      if (e && !n.__iconfont__svg__cssinject__) {
        n.__iconfont__svg__cssinject__ = !0;
        try {
          document.write(
            "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
          );
        } catch (t) {
          console && console.log(t);
        }
      }
      (o = function () {
        var t,
          e = document.createElement("div");
        (e.innerHTML = n._iconfont_svg_string_4018520),
          (e = e.getElementsByTagName("svg")[0]) &&
            (e.setAttribute("aria-hidden", "true"),
            (e.style.position = "absolute"),
            (e.style.width = 0),
            (e.style.height = 0),
            (e.style.overflow = "hidden"),
            (e = e),
            (t = document.body).firstChild
              ? s(e, t.firstChild)
              : t.appendChild(e));
      }),
        document.addEventListener
          ? ~["complete", "loaded", "interactive"].indexOf(document.readyState)
            ? setTimeout(o, 0)
            : ((i = function () {
                document.removeEventListener("DOMContentLoaded", i, !1), o();
              }),
              document.addEventListener("DOMContentLoaded", i, !1))
          : document.attachEvent &&
            ((a = o),
            (c = n.document),
            (d = !1),
            h(),
            (c.onreadystatechange = function () {
              "complete" == c.readyState &&
                ((c.onreadystatechange = null), l());
            }));
    }
    function l() {
      d || ((d = !0), a());
    }
    function h() {
      try {
        c.documentElement.doScroll("left");
      } catch (t) {
        return void setTimeout(h, 50);
      }
      l();
    }
  })(window);
