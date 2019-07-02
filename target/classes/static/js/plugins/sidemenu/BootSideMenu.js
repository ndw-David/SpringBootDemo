/**
 * BootSideMenu v 1.0
 * Author: Andrea Lombardo
 * http://www.lombardoandrea.com
 * https://github.com/AndreaLombardo/BootSideMenu
 * */
(function ($) {

    $.fn.BootSideMenu = function (userOptions) {

        var initialCode;
        var newCode;
        var menu;
        var prevStatus;
        var body = {};

        var defaults = {
            side: "left",
            duration: 500,
            remember: true,
            autoClose: false,
            pushBody: true,
            closeOnClick: true,
            width: "15%",
            onTogglerClick: function () {
                //code to be executed when the toggler arrow was clicked
            },
            onBeforeOpen: function () {
                //code to be executed before menu open
            },
            onBeforeClose: function () {
                //code to be executed before menu close
            },
            onOpen: function () {
                //code to be executed after menu open
            },
            onClose: function () {
                //code to be executed after menu close
            },
            onStartup: function () {
                //code to be executed when the plugin is called
            }
        };

        var options = $.extend({}, defaults, userOptions);


        body.originalMarginLeft = $("body").css("margin-left");
        body.originalMarginRight = $("body").css("margin-right");
        body.width = $("body").width();

        initialCode = this.html();

        newCode = "<div class=\"row\">";
        newCode += "	<div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\">\n" + initialCode + " </div>";
        newCode += "</div>";
        newCode += "<div class=\"toggler\" data-whois=\"toggler\">";
        newCode += "	<span class=\"glyphicon\"></span>";
        newCode += "</div>";

        this.empty();
        this.append(newCode);

        menu = $(this);

        menu.addClass("container");
        menu.addClass("sidebar");
        menu.css("width", options.width);

        if (options.side == "left") {
            menu.addClass("sidebar-left");
        } else if (options.side == "right") {
            menu.addClass("sidebar-right");
        }

        menu.id = menu.attr("id");
        menu.cookieName = "bsm2-" + menu.id;
        menu.toggler = $(menu.children()[1]);
        menu.originalWidth = menu.width();
        menu.originalPushBody = options.pushBody;


        if (options.remember) {
            prevStatus = readCookie(menu.cookieName);
        } else {
            prevStatus = null;
        }

        forSmallBody();

        switch (prevStatus) {
            case "opened":
                startOpened();
                break;
            case "closed":
                startClosed();
                break;
            default:
                startDefault();
                break;
        }

        if (options.onStartup !== undefined) {
            options.onStartup(menu);
        }

        //aggiungi icone a tutti i collapse
        $("[data-toggle=\"collapse\"]", menu).each(function () {
            var icona = $("<span class=\"glyphicon glyphicon-chevron-right\"></span>");
            $(this).prepend(icona);
        });

        menu.off("click", "[data-whois=toggler]");
        menu.on("click", "[data-whois=toggler]", function () {
            toggle();
            if (options.onTogglerClick !== undefined) {
                options.onTogglerClick(menu);
            }
        });

        menu.off("click", ".list-group-item");
        menu.on("click", ".list-group-item", function () {
            menu.find(".list-group-item").each(function () {
                $(this).removeClass("active");
            });
            $(this).addClass("active");
            $(".glyphicon", this).toggleClass("glyphicon-chevron-right").toggleClass("glyphicon-chevron-down");
        });


        menu.off("click", "a.list-group-item");
        menu.on("click", "a.list-group-item", function () {
            if (options.closeOnClick) {
                if ($(this).attr("data-toggle") != "collapse") {
                    closeMenu(true);
                }
            }
        });


        function toggle() {
            if (menu.status == "opened") {
                closeMenu(true);
            } else {
                openMenu(true);
            }
        }

        function switchArrow(side) {
            var span = menu.toggler.find("span.glyphicon");
            if (side == "left") {
                span.removeClass("glyphicon-chevron-left").addClass("glyphicon-chevron-right");
            } else if (side == "right") {
                span.removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-left");
            }
        }

        function startDefault() {
            if (options.side == "left") {
                if (options.autoClose) {
                    menu.status = "closed";
                    menu.hide().animate({
                        left: -(menu.width() + 2)
                    }, 1, function () {
                        menu.show();
                        switchArrow("left");
                    });
                } else if (!options.autoClose) {
                    switchArrow("right");
                    menu.status = "opened";
                    if (options.pushBody) {
                        $("body").css("margin-left", menu.width());
                    }
                }
            } else if (options.side == "right") {
                if (options.autoClose) {
                    menu.status = "closed";
                    menu.hide().animate({
                        right: -(menu.width() + 2)
                    }, 1, function () {
                        menu.show();
                        switchArrow("right");
                    });
                } else {
                    switchArrow("left");
                    menu.status = "opened";
                    if (options.pushBody) {
                        $("body").css("margin-right", menu.width());
                    }
                }
            }
        }

        function startClosed() {
            if (options.side == "left") {
                menu.status = "closed";
                menu.hide().animate({
                    left: -(menu.width() + 2)
                }, 1, function () {
                    menu.show();
                    switchArrow("left");
                });
            } else if (options.side == "right") {
                menu.status = "closed";
                menu.hide().animate({
                    right: -(menu.width() + 2)
                }, 1, function () {
                    menu.show();
                    switchArrow("right");
                })
            }
        }

        function startOpened() {
            if (options.side == "left") {
                switchArrow("right");
                menu.status = "opened";
                if (options.pushBody) {
                    $("body").css("margin-left", menu.width() );
                }

            } else if (options.side == "right") {
                switchArrow("left");
                menu.status = "opened";
                if (options.pushBody) {
                    $("body").css("margin-right", menu.width());
                }
            }
        }

        function closeMenu(execFunctions) {

            if (execFunctions) {
                if (options.onBeforeClose !== undefined) {
                    options.onBeforeClose(menu);
                }
            }
            if (options.side == "left") {

                if (options.pushBody) {
                    $("body").animate({marginLeft: body.originalMarginLeft}, {duration: options.duration});
                }

                menu.animate({
                    left: -(menu.width() + 2)
                }, {
                    duration: options.duration,
                    done: function () {
                        switchArrow("left");
                        menu.status = "closed";

                        if (execFunctions) {
                            if (options.onClose !== undefined) {
                                options.onClose(menu);
                            }
                        }
                    }
                });
            } else if (options.side == "right") {

                if (options.pushBody) {
                    $("body").animate({marginRight: body.originalMarginRight}, {duration: options.duration});
                }

                menu.animate({
                    right: -(menu.width() + 2)
                }, {
                    duration: options.duration,
                    done: function () {
                        switchArrow("right");
                        menu.status = "closed";

                        if (execFunctions) {
                            if (options.onClose !== undefined) {
                                options.onClose(menu);
                            }
                        }
                    }
                });
            }

            if (options.remember) {
                storeCookie(menu.cookieName, "closed");
            }

        }

        function openMenu(execFunctions) {

            if (execFunctions) {
                if (options.onBeforeOpen !== undefined) {
                    options.onBeforeOpen(menu);
                }
            }

            if (options.side == "left") {

                if (options.pushBody) {
                    $("body").animate({marginLeft: menu.width()}, {duration: options.duration});
                }

                menu.animate({
                    left: 0
                }, {
                    duration: options.duration,
                    done: function () {
                        switchArrow("right");
                        menu.status = "opened";

                        if (execFunctions) {
                            if (options.onOpen !== undefined) {
                                options.onOpen(menu);
                            }
                        }
                    }
                });
            } else if (options.side == "right") {

                if (options.pushBody) {
                    $("body").animate({marginRight: menu.width()}, {duration: options.duration});
                }

                menu.animate({
                    right: 0
                }, {
                    duration: options.duration,
                    done: function () {
                        switchArrow("left");
                        menu.status = "opened";

                        if (execFunctions) {
                            if (options.onOpen !== undefined) {
                                options.onOpen(menu);
                            }
                        }
                    }
                });
            }

            if (options.remember) {
                storeCookie(menu.cookieName, "opened");
            }
        }


        function forSmallBody() {
        }

        function storeCookie(nome, valore) {
        }

        function readCookie(nome) {
        }


        function onResize() {
            menu.width(options.width);

            forSmallBody();
            if (menu.status == "closed") {
                startClosed();
            }
            if (menu.status == "opened") {
                startOpened();
            }
        }

        var resizeStart;
        var resizeEnd;
        var wait = 250;
        window.addEventListener("resize", function () {
            resizeStart = new Date().getMilliseconds();
            resizeEnd = resizeStart + wait;
            setTimeout(function () {
                var now = new Date().getMilliseconds();
                if (now > resizeEnd) {
                    onResize();
                }
            }, wait);
        }, false);

        return this;
    }
}(jQuery));