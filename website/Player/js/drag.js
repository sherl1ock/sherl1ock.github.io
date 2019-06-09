(
    function (w) {
        w.$ = {}


        w.$.drag = function (el, callback) {

            el.onmousedown = function (e) {
                e = e || window.event;

                // 阻止默认行为
                e.preventDefault()


                let downX = e.clientX
                let downL = el.offsetLeft



                document.onmousemove = function (e) {
                    e = e || window.event;
                    let nowX = e.clientX
                    let moveX = downL + nowX - downX
                    if (moveX > el.offsetParent.clientWidth - el.clientWidth) {
                        moveX = el.offsetParent.clientWidth - el.clientWidth
                    } else if (moveX < 0) {
                        moveX = 0;
                    }

                    el.style.left = moveX + 'px'


                    if (callback && callback['move'] && typeof callback['move'] === 'function') {
                        callback['move'].call(el)
                    }
                }

                document.onmouseup = function () {
                    document.onmousemove = document.onmouseup = null;

                }

            }
        }


        w.$.addClass = function (node, className) {
            var reg = new RegExp("\b" + className + "\b");
            if (!reg.test(node.className)) {
                node.className += (" " + className);
            }
        }
        w.$.removeClass = function (node, className) {
            if (node.className) {
                var reg = new RegExp("\b" + className + "\b");
                var classes = node.className;
                node.className = classes.replace(reg, "");
                if (/^\s*$/g.test(node.className)) {
                    node.removeAttribute("class");
                }
            } else {
                node.removeAttribute("class");
            }
        }

        w.$.fixTime = function (time) {
            // 秒-> 时 1h = 60m = 3600s
            let h = fix(parseInt(Math.floor(time) / 3600))
            let m = fix(parseInt(Math.floor(time) / 60))
            let s = fix(parseInt(time%60))
            // console.log(parseInt(Math.floor(376) / 3600))
          
            function fix(times) {
                return times >= 10 ? times : '0' + times
            }

            return `${h}:${m}:${s}`
        }
    }



)(window)