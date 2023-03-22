import { Injectable } from "@angular/core";
var $ = require("jquery");

@Injectable()
export class Swipe {

    listSwipe(options, element) {
        let _this = this;
        var settings = $.extend({
            itemSelector: '>', //The item in the list that has the side actions
            itemActionWidth: 200, //In pixels
            leftAction: false, //Whether there is an action on the left
            rightAction: true, //Whether there is an action on the right
            snapThreshold: 0.8, //Percent threshold for snapping to position on touch end
            snapDuration: 300, //Snap animation duration
            closeOnOpen: true, //Close other item actions if a new one is moved
            maxYDelta: 40, //Number of pixels in the Y-axis before preventing swiping
            initialXDelta: 25 //Number of pixels in the X-axis before allowing swiping
        }, options);

        return element.each(function () {
            var $list = $(this);

            $list.on('touchstart', settings.itemSelector, function (e) {
                var $item = $(this);
                $item.stop();

                if (settings.closeOnOpen) {
                    $list.find(settings.itemSelector).not($item).animate({
                        left: '0px'
                    }, settings.snapDuration);
                }

                var touch = _this.getTouchPosition(e);
                var rawStartLeft = $item.css('left');

                var data = {
                    touchStart: touch,
                    startLeft: rawStartLeft === 'auto' ? 0 : parseInt(rawStartLeft),
                    initialXDeltaReached: false,
                    maxYDeltaReached: false
                };

                $item.data('listSwipe', data);
            }).on('touchmove', settings.itemSelector, function (e) {
                var $item = $(this);
                var data = $item.data('listSwipe');
                var touch = _this.getTouchPosition(e);

                if (data.maxYDeltaReached) {
                    return;
                }

                var touchDelta = _this.getTouchDelta(touch, data, settings);

                if (!data.maxYDeltaReached && Math.abs(touchDelta.yDelta) > settings.maxYDelta) {
                    data.maxYDeltaReached = true;
                    $item.animate({
                        left: '0px'
                    }, settings.snapDuration);
                }
                else if (!data.initialXDeltaReached && Math.abs(touchDelta.xDelta) > settings.initialXDelta) {
                    data.initialXDeltaReached = true;
                    $item.css('left', touchDelta.xDelta + 'px');

                }
                else if (data.initialXDeltaReached) {
                    $item.css('left', touchDelta.xDelta + 'px');
                }

                $item.data('listSwipe', data);

            }).on('touchend', settings.itemSelector, function (e) {
                var $item = $(this);
                var data = $item.data('listSwipe');
                var touch = _this.getTouchPosition(e);

                if (data.maxYDeltaReached) {
                    return;
                }

                var touchDelta = _this.getTouchDelta(touch, data, settings);

                var xThreshold = Math.abs(touchDelta.xDelta) / settings.itemActionWidth;
                if (xThreshold >= settings.snapThreshold) {
                    if (touchDelta.xDelta < 0) {
                        touchDelta.xDelta = -settings.itemActionWidth;

                    }
                    else {
                        touchDelta.xDelta = settings.itemActionWidth;
                    }
                    /* --------------------------------- mystyle1 add ---------------------------------------------- */

                    if ($item[0].classList.contains('accordianActive')) {
                        if ($("#accordianBody").length) {
                            $("#accordianBody").addClass('mystyle');
                        }

                    } else {
                        if ($("#accordianBody").length) {
                            $("#accordianBody").removeClass('mystyle')
                        }
                    }
                    $('.item-list > .item').on('click', function () {
                        if ($("#accordianBody").length) {
                            $("#accordianBody").addClass('mystyle');
                        }
                    });

                    /* ----------------------------------------------------------------------------------------------- */

                }
                else {
                    touchDelta.xDelta = 0;

                    /* ----------------------------------- mystyle1 remove-------------------------------------------- */

                    if ($("#accordianBody").length) {
                        $("#accordianBody").removeClass('mystyle')
                    }
                    $('.item-list > .item').on('click', function () {
                        if ($("#accordianBody").length) {
                            $("#accordianBody").removeClass('mystyle')
                        }
                    });

                    /* ----------------------------------------------------------------------------------------------- */
                }

                $item.animate({
                    left: touchDelta.xDelta + 'px'
                }, settings.snapDuration);

            });
        });
    }

    getTouchPosition(event) {
        return {
            x: event.changedTouches[0].clientX,
            y: event.changedTouches[0].clientY
        };
    }

    getTouchDelta(touch, data, settings) {
        var xDelta = touch.x - data.touchStart.x + data.startLeft;
        var yDelta = touch.y - data.touchStart.y;

        if (!settings.rightAction && xDelta < 0) {
            xDelta = 0;
        }

        if (!settings.leftAction && xDelta > 0) {
            xDelta = 0;
        }

        return {
            xDelta: xDelta,
            yDelta: yDelta
        };
    }

}