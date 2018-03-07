/* Variables for tutorial */
var level = 0;
var tipsCounter = 0;
var spikeHeight = 30;
var spikeDemiThickness = 10;
var borderRadius = 7;
var tipsIsOpen = false;
var callback = '';
var timer;

$(function() {
    /* Init tips */
    if ( borderRadius > spikeDemiThickness )
    {
        borderRadius = spikeDemiThickness;
    }
    $('.tips').css('borderRadius', borderRadius);

    /* Init obscure area */
    $('#level-1').css({
        width: ImageDimension['width'] * 7,
        height: ImageDimension['height'] * 7,
        left: 0,
        top: 0
    });
    $('#level-2').css({
        width: ImageDimension['width'] * 7,
        height: ImageDimension['height'] * 6,
        left: 0,
        top: ImageDimension['height'] * 7
    });
    $('#level-3').css({
        width: ImageDimension['width'] * 7,
        height: ImageDimension['height'] * 6,
        left: 0,
        top: ImageDimension['height'] * 13
    });
    $('#level-4').css({
        width: ImageDimension['width'] * 7,
        height: ImageDimension['height'] * 6,
        left: 0,
        top: ImageDimension['height'] * 19
    });
    $('#level-5').css({
        width: ImageDimension['width'] * 6,
        height: ImageDimension['height'] * 7,
        left: ImageDimension['width'] * 7,
        top: ImageDimension['height'] * 18
    });
    $('#level-6').css({
        width: ImageDimension['width'] * 6,
        height: ImageDimension['height'] * 6,
        left: ImageDimension['width'] * 7,
        top: ImageDimension['height'] * 12
    });
    $('#level-7').css({
        width: ImageDimension['width'] * 6,
        height: ImageDimension['height'] * 6,
        left: ImageDimension['width'] * 7,
        top: ImageDimension['height'] * 6
    });
    $('#level-8').css({
        width: ImageDimension['width'] * 6,
        height: ImageDimension['height'] * 6,
        left: ImageDimension['width'] * 7,
        top: 0
    });
    $('#level-9').css({
        width: ImageDimension['width'] * 6,
        height: ImageDimension['height'] * 7,
        left: ImageDimension['width'] * 13,
        top: 0
    });
    $('#level-10').css({
        width: ImageDimension['width'] * 6,
        height: ImageDimension['height'] * 7,
        left: ImageDimension['width'] * 19,
        top: 0
    });
    $('#level-11').css({
        width: ImageDimension['width'] * 7,
        height: ImageDimension['height'] * 6,
        left: ImageDimension['width'] * 18,
        top: ImageDimension['height'] * 7
    });
    $('#level-12').css({
        width: ImageDimension['width'] * 5,
        height: ImageDimension['height'] * 6,
        left: ImageDimension['width'] * 13,
        top: ImageDimension['height'] * 7
    });
    $('#level-13').css({
        width: ImageDimension['width'] * 6,
        height: ImageDimension['height'] * 6,
        left: ImageDimension['width'] * 13,
        top: ImageDimension['height'] * 13
    });
    $('#level-14').css({
        width: ImageDimension['width'] * 6,
        height: ImageDimension['height'] * 6,
        left: ImageDimension['width'] * 19,
        top: ImageDimension['height'] * 13
    });
    $('#level-15').css({
        width: ImageDimension['width'] * 6,
        height: ImageDimension['height'] * 6,
        left: ImageDimension['width'] * 13,
        top: ImageDimension['height'] * 19
    });
    $('#level-16').css({
        width: ImageDimension['width'] * 6,
        height: ImageDimension['height'] * 6,
        left: ImageDimension['width'] * 19,
        top: ImageDimension['height'] * 19
    });

    /* Load tutorial map */
    load('http://localhost/lasertank/load.php', 'file=tutorial/tutorial');

    var content = '<h2>Welcome to the tutorial !</h2>';
    content    += '<p>It will introduce you to the game rules.</p>';
    content    += '<p>Controls :</p>';
    content    += '<ul><li>Press enter to close the tips.</li>';
    content    += '<li>Use arrows key to move.</li>';
    content    += '<li>Use space bar to shoot.</li></ul>';
    openDocumentTips(content, 0, 0);

     /* Manage tips */
    $(document).keydown(function(event){
        if (tipsIsOpen)
        {
            if ( event.keyCode == 13 || event.keyCode == 27 )
            {
                switch ( tipsCounter )
                {
                    case 0:
                        closeTips();
                        $('#level-1').fadeOut(500, function(){
                            var content = '<h2>Breakable block</h2>';
                            content    += '<p>Shoot at it, and it will disapear.</p>';
                            openMapTips(content, 6, 3);
                        });
                        level++;
                        break;

                    case 2:
                        closeTips(function(){
                            var content = '<h2>Movable block</h2>';
                            content    += '<p>You can shoot at it to make it move.</p>';
                            content    += '<p>Try to make a bridge.</p>';
                            openMapTips(content, 8, 2, 'top');
                        });
                        break;

                    case 10:
                        closeTips(function(){
                            var content = '<h2>Piece of advice</h2>';
                            content    += '<p>I don\'t think this way is safe...</p>';
                            openMapTips(content, 4, 16, 'left');
                        });
                        break;

                    case 17:
                        closeTips(function(){
                            var content = '<h2>Piece of advice</h2>';
                            content    += '<p>Enemies only trigger their fire on your movement.</p>';
                            content    += '<p>Use this block to surprise them.</p>';
                            openMapTips(content, 19, 15, 'bottom');
                        });
                        break;

                    default:
                        closeTips();
                        break;
                }
            }
        }
    });

    /* Manage obscure */
    $(document).bind('move', function(){
        switch (level)
        {
            case 1:
                if ( movables['tank']['top'] == 6 )
                {
                    $('#level-2').fadeOut(500, function(){
                        var content = '<h2>Water</h2>';
                        content    += '<p>Do not fall in !</p>';
                        openMapTips(content, 10, 5);
                    });
                    level++;
                }
                break;

            case 2:
                if ( movables['tank']['top'] == 12 )
                {
                    $('#level-3').fadeOut(500, function(){
                        var content = '<h2>Cross block</h2>';
                        content    += '<p>They block movement.</p>';
                        content    += '<p>But they do not block laser shots.</p>';
                        openMapTips(content, 16, 4);
                    });
                    level++;
                }
                break;

            case 3:
                if ( movables['tank']['top'] == 18 )
                {
                    $('#level-4').fadeOut(500, function(){
                        var content = '<h2>Mirror</h2>';
                        content    += '<p>Laser shots are reflected.</p>';
                        content    += '<p>Try shooting at them.</p>';
                        openMapTips(content, 23, 5, 'left');
                    });
                    level++;
                }
                break;

            case 4:
                if ( movables['tank']['left'] == 6 )
                {
                    $('#level-5').fadeOut(500, function(){
                        var content = '<h2>Double mirror</h2>';
                        content    += '<p>It\'s the same as the simple mirror<br/>';
                        content    += 'with two opposite reflectives sides.</p>';
                        content    += '<p>Be careful not to shoot at yourself...</p>';
                        openMapTips(content, 21, 10, 'left');
                    });
                    level++;
                }
                break;

            case 5:
                if ( movables['tank']['top'] == 18 )
                {
                    $('#level-6').fadeOut(500, function(){
                        var content = '<h2>Enemi</h2>';
                        content    += '<p>If you move in front of them,<br/>';
                        content    += 'they will be no mercy...</p>';
                        content    += '<p>But they are not as clever as you.</p>';
                        openMapTips(content, 13, 11, 'left');
                    });
                    level++;
                }
                break;

            case 6:
                if ( movables['tank']['top'] == 12 )
                {
                    $('#level-7').fadeOut(500, function(){
                        var content = '<h2>Movable mirror</h2>';
                        content    += '<p>Movable block and mirror mix.</p>';
                        content    += '<p>But in contrary to movable blocks,<br/>';
                        content    += 'you can not use them to make a bridge</p>';
                        openMapTips(content, 8, 7, 'right');
                    });
                    level++;
                }
                break;

            case 7:
                if ( movables['tank']['top'] == 6 )
                {
                    $('#level-8').fadeOut(500, function(){
                        var content = '<h2>Rotating mirror</h2>';
                        content    += '<p>If you shot at the back of the reflective side,<br/>';
                        content    += 'it will rotate clockwise.</p>';
                        openMapTips(content, 2, 9, 'left');
                    });
                    level++;
                }
                break;

            case 8:
                if ( movables['tank']['left'] == 12 )
                {
                    $('#level-9').fadeOut(500, function(){
                        var content = '<h2>Arrow</h2>';
                        content    += '<p>Try to move on it.</p>';
                        content    += '<p>Movables objects are not affected.</p>';
                        openMapTips(content, 5, 15);
                    });
                    level++;
                }
                break;

            case 9:
                if ( movables['tank']['left'] == 18 )
                {
                    $('#level-10').fadeOut(500, function(){
                        var content = '<h2>Movable enemi</h2>';
                        content    += '<p>Everything is in the title...</p>';
                        openMapTips(content, 5, 21, 'top');
                    });
                    level++;
                }
                break;

            case 10:
                if ( movables['tank']['top'] == 6 )
                {
                    $('#level-11').fadeOut(500, function(){
                        var content = '<h2>Ice</h2>';
                        content    += '<p>Oops it\'s slippery !</p>';
                        content    += '<p>All movables objects are affected.</p>';
                        openMapTips(content, 7, 21);
                    });
                    level++;
                }
                break;

            case 11:
                if ( movables['tank']['left'] == 18 )
                {
                    $('#level-12').fadeOut(500, function(){
                        var content = '<h2>Breaked ice</h2>';
                        content    += '<p>Support only one passage.</p>';
                        content    += '<p>Think twice before moving over it.</p>';
                        openMapTips(content, 7, 13, 'right');
                    });
                    level++;
                }
                break;

            case 12:
                if ( movables['tank']['top'] == 12 )
                {
                    $('#level-13').fadeOut(500, function(){
                        var content = '<h2>Key</h2>';
                        content    += '<p>It may be useful.</p>';
                        openMapTips(content, 17, 15, 'top');
                    });
                    level++;
                }
                break;

            case 13:
                if ( movables['tank']['left'] == 18 )
                {
                    $('#level-14').fadeOut(500, function(){
                        var content = '<h2>Teleporter</h2>';
                        content    += '<p>There may be another one,<br/>';
                        content    += 'of the same color, somewhere...</p>';
                        openMapTips(content, 17, 21, 'top');
                    });
                    level++;
                }
                break;

            case 14:
                if ( movables['tank']['top'] == 19 )
                {
                    $('#level-15').fadeOut(500, function(){
                        var content = '<h2>Locked door</h2>';
                        content    += '<p>If you have the key of the<br/>';
                        content    += 'same color, it will open.</p>';
                        openMapTips(content, 21, 18, 'bottom');
                    });
                    level++;
                }
                break;

            case 15:
                if ( movables['tank']['left'] == 18 )
                {
                    $('#level-16').fadeOut(500, function(){
                        var content = '<h2>Finish</h2>';
                        content    += '<p>This is the end !</p>';
                        openMapTips(content, 21, 22, 'bottom');
                    });
                    level++;
                }
                break;
        }
    });
});

function openDocumentTips(content)
{
    var tips = $('#document-tips');
    var documentObject = $(document);
    tips.children('.tips-content').html(content);
    tips.css({
        top: parseInt( (documentObject.height() - tips.height() ) / 2 ),
        left: parseInt( (documentObject.width() - tips.width() ) / 2 )
    });
    tips.fadeTo(500, 0.8);
    $('#overlay').fadeTo(500, 0.5, function(){
        tipsIsOpen = true;
    });
    $('#play-area').blur();
    timer = window.setTimeout("$('.tips-bottom').css('visibility', 'visible');", 5000);
}

function openMapTips(content, top, left)
{
    var forceDirection = '';
    if ( arguments[3] )
    {
        forceDirection = arguments[3];
    }

    var tipsPosition = {};
    var canvasPosition = {}

    var tips = $('#map-tips');
    tips.children('.tips-content').html(content);

    var tipsHeight = tips.outerHeight();
    var tipsWidth = tips.outerWidth();

    var documentObject = $(document);
    var imageOffset = $('#ground-area tr').eq(top).children('td').eq(left).children('img').offset();
    var absoluteDistance = {
        top: imageOffset['top'] + parseInt(ImageDimension['height'] / 2) - parseInt(documentObject.height() / 2),
        left: imageOffset['left'] + parseInt(ImageDimension['width'] / 2) - parseInt(documentObject.width() / 2)
    }

    var mapObject = $('#map');
    var imagePosition = $('#ground-area tr').eq(top).children('td').eq(left).children('img').position();
    var imageCenter = {
        top: imagePosition['top'] + parseInt(ImageDimension['height'] / 2),
        left: imagePosition['left'] + parseInt(ImageDimension['width'] / 2)
    }
    var relativeDistance = {
        top: imageCenter['top'] - parseInt(mapObject.height() / 2),
        left: imageCenter['left'] - parseInt(mapObject.width() / 2)
    }

    var canvas = $('#tips-canvas');
    var context = canvas[0].getContext('2d');

    if ( ( Math.abs( absoluteDistance['top'] ) > Math.abs( absoluteDistance['left'] ) && forceDirection == '' ) || forceDirection == 'top' || forceDirection == 'bottom' )
    {
        // Top or bottom
        canvas.attr('width', tipsWidth);
        canvas.attr('height', spikeHeight);

        // spikePosition = relativeDistance['left'] + tipsWidth;
        spikePosition = imageCenter['left'] / ( map['width'] * ImageDimension['width'] ) * tipsWidth;
        if ( spikePosition - spikeDemiThickness - borderRadius < 0 )
        {
            spikePosition = spikeDemiThickness + borderRadius;
        }
        else if ( spikePosition + spikeDemiThickness + borderRadius > tipsWidth )
        {
            spikePosition = tipsWidth - spikeDemiThickness - borderRadius;
        }

        if ( ( absoluteDistance['top'] < 0 && forceDirection == '' ) || forceDirection == 'top' )
        {
            // Top
            canvasPosition = {
                top: imageCenter['top'] + parseInt(ImageDimension['height'] / 2),
                left: imageCenter['left'] - spikePosition
            }
            tipsPosition = {
                top: canvasPosition['top'] + spikeHeight,
                left: canvasPosition['left']
            };

            context.beginPath();
            context.fillStyle = "rgb(255, 255, 255)";
            context.moveTo(spikePosition - spikeDemiThickness, spikeHeight);
            //context.lineTo(spikePosition, 0);
            context.bezierCurveTo(spikePosition - spikeDemiThickness + borderRadius, spikeHeight, spikePosition, borderRadius, spikePosition, 0);
            //context.lineTo(spikePosition + spikeDemiThickness, spikeHeight);
            context.bezierCurveTo(spikePosition, borderRadius, spikePosition + spikeDemiThickness - borderRadius, spikeHeight, spikePosition + spikeDemiThickness, spikeHeight);
            context.closePath();
            context.fill();
        }
        else
        {
            // Bottom.
            canvasPosition = {
                top: imageCenter['top'] - spikeHeight - parseInt(ImageDimension['height'] / 2),
                left: imageCenter['left'] - spikePosition
            }
            tipsPosition = {
                top: canvasPosition['top'] - tipsHeight,
                left: canvasPosition['left']
            };

            context.beginPath();
            context.fillStyle = "rgb(255, 255, 255)";
            context.moveTo(spikePosition - spikeDemiThickness, 0);
            //context.lineTo(spikePosition, spikeHeight);
            context.bezierCurveTo(spikePosition - spikeDemiThickness + borderRadius, 0, spikePosition, spikeHeight - borderRadius, spikePosition, spikeHeight);
            //context.lineTo(spikePosition + spikeDemiThickness, 0);
            context.bezierCurveTo(spikePosition, spikeHeight - borderRadius, spikePosition + spikeDemiThickness - borderRadius, 0, spikePosition + spikeDemiThickness, 0);
            context.closePath();
            context.fill();
        }
        tipsHeight = tipsHeight + spikeHeight + ImageDimension['height'];
    }
    else
    {
        canvas.attr('width', spikeHeight);
        canvas.attr('height', tipsHeight);

        //spikePosition = relativeDistance['top'] + tipsHeight;
        spikePosition = imageCenter['top'] / ( map['height'] * ImageDimension['height'] ) * tipsHeight;
        if ( spikePosition - spikeDemiThickness - borderRadius < 0 )
        {
            spikePosition = spikeDemiThickness + borderRadius;
        }
        else if ( spikePosition + spikeDemiThickness + borderRadius > tipsHeight )
        {
            spikePosition = tipsHeight - spikeDemiThickness - borderRadius;
        }

        // Left or right
        if ( ( absoluteDistance['left'] < 0 && forceDirection == '' ) || forceDirection == 'left' )
        {
            // Left
            canvasPosition = {
                top: imageCenter['top'] - spikePosition,
                left: imageCenter['left']  + parseInt(ImageDimension['width'] / 2)
            }
            tipsPosition = {
                top: canvasPosition['top'],
                left: canvasPosition['left'] + spikeHeight
            };

            context.beginPath();
            context.fillStyle = "rgb(255, 255, 255)";
            context.moveTo(spikeHeight, spikePosition - spikeDemiThickness);
            //context.lineTo(0, spikePosition);
            context.bezierCurveTo(spikeHeight, spikePosition - spikeDemiThickness + borderRadius, borderRadius, spikePosition, 0, spikePosition);
            //context.lineTo(spikeHeight, spikePosition + spikeDemiThickness);
            context.bezierCurveTo(borderRadius, spikePosition, spikeHeight, spikePosition + spikeDemiThickness - borderRadius, spikeHeight, spikePosition + spikeDemiThickness);
            context.closePath();
            context.fill();
        }
        else
        {
            // Right
            canvasPosition = {
                top: imageCenter['top'] - spikePosition,
                left: imageCenter['left'] - spikeHeight - parseInt(ImageDimension['width'] / 2)
            }
            tipsPosition = {
                top: canvasPosition['top'],
                left: canvasPosition['left'] - tipsWidth
            };

            context.beginPath();
            context.fillStyle = "rgb(255, 255, 255)";
            context.moveTo(0, spikePosition - spikeDemiThickness);
            //context.lineTo(spikeHeight, spikePosition);
            context.bezierCurveTo(0, spikePosition - spikeDemiThickness + borderRadius, spikeHeight - borderRadius, spikePosition, spikeHeight, spikePosition);
            //context.lineTo(0, spikePosition + spikeDemiThickness);
            context.bezierCurveTo(spikeHeight - borderRadius, spikePosition, 0, spikePosition + spikeDemiThickness - borderRadius, 0, spikePosition + spikeDemiThickness);
            context.closePath();
            context.fill();
        }
        tipsWidth = tipsWidth + spikeHeight + ImageDimension['width'];
    }

    if ( canvasPosition['top'] < ImageDimension['height'] + mapObject.scrollTop() )
    {
        mapObject.scrollTop(canvasPosition['top'] - ImageDimension['height']);
    }
    else if (tipsPosition['top'] + tipsHeight > documentObject.height() + mapObject.scrollTop() - toolbarsHeight - scrollBottomHeight)
    {
        mapObject.scrollTop(tipsPosition['top'] + tipsHeight - documentObject.height() + toolbarsHeight + scrollBottomHeight);
    }

    if ( canvasPosition['left'] < ImageDimension['width'] + mapObject.scrollLeft() )
    {
        mapObject.scrollLeft(canvasPosition['left']- ImageDimension['width']);
    }
    else if (tipsPosition['left'] + tipsWidth > documentObject.width() + mapObject.scrollLeft() - scrollRightWidth)
    {
        mapObject.scrollLeft(tipsPosition['left'] + tipsWidth - documentObject.width() + scrollRightWidth);
    }

    canvas.css(canvasPosition);
    tips.css(tipsPosition);

    canvas.fadeTo(500, 0.8);
    tips.fadeTo(500, 0.8);
    $('#overlay').fadeTo(500, 0.5, function(){
        tipsIsOpen = true;
    });

    $('#play-area').blur();
    timer = window.setTimeout("$('.tips-bottom').css('visibility', 'visible');", 5000);
}

function closeTips()
{
    callback = '';
    if ( arguments[0] )
    {
        callback = arguments[0]
    }
    $('#tips-canvas').add('.tips').fadeOut(500);
    $('#overlay').fadeOut(500, function(){
        $('.tips-bottom').css('visibility', 'hidden');
        if(typeof callback === "function")
        {
            callback.apply();
        }
        tipsIsOpen = false;
    });
    $('#play-area').focus();
    clearTimeout(timer);
    tipsCounter++;
}
