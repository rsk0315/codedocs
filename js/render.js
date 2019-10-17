'use strict';

async function getIndex() {
    return await $.ajax({
        url: 'contents/index.json',
        headers: {
            'Content-Type': 'text/json',
        },
    });
}

async function getFile(name) {
    return await $.ajax({
        url: `contents/${name}`,
    });
}

async function enrich(text) {
    return await $.ajax({
        url: 'https://api.github.com/markdown/raw',
        type: 'POST',
        headers: {
            'Content-Type': 'text/plain',
        },
        data: text,
    }).then(
        data => data,
        error => undefined,
    );
}

function htmlSpecialChars(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function enrichFallback(text) {
    return htmlSpecialChars(text).replace(/\n/g, '<br>');
}

function alertIcon(text = '') {
    // return `<span><i class="glyphicon glyphicon-exclamation-sign"></i> ${text}</span>`;
    // return `<span><i class="glyphicon glyphicon-remove-sign danger"></i> ${text}</span>`;
    return `<span><i class="glyphicon glyphicon-remove-circle" style="color: #d73a49;"></i> ${text}</span>`;
}

function format($body) {
    $.each($body.find('li'), function(i, el) {
        let match = el.innerHTML.match(/^\s*\[([ xX])\]/);
        if (match === null) return;

        let checked = (match[1] != ' ');
        let pos = el.innerHTML.indexOf(']') + 1;
        el.innerHTML = el.innerHTML.substr(pos);
        let $cb = $('<input type="checkbox">');
        $cb.prop({checked, disabled: true}).css({
            margin: '0 .2em .25em -1.25em'
        });
        $(el).css({'list-style-type': 'none'}).prepend($cb);
    });
    $body.find('a').attr({target: '_blank'});
}

function makeHead(name, title) {
    return $(`<span class="head" id="head-${name}"><h1>${title}</h1></span>`);
}

function makeBody(dir, file, title) {
    let $panel = $('<div class="panel panel-docs"></div>');

    let $panelHead = $('<div></div>');
    $panelHead.attr({
        class: 'panel-heading collapse-heading collapsed',
        id: `panel-${dir}-${file}`,
        'data-toggle': 'collapse',
        'data-target': `#panel-${dir}-${file}-body`,
        'aria-expanded': false,
    });
    $panelHead.html(`<h3 class="panel-title">${title}<span class="glyphicon pull-right"></span></h3>`);

    let $panelBody = $('<div></div>');
    $panelBody.attr({
        class: 'panel-body panel-collapse collapse unfetched',
        id: `panel-${dir}-${file}-body`,
        'aria-expanded': false,
    });

    $panel.append($panelHead);
    $panel.append($panelBody);

    $panel.on('click', () => fetchBody($panelBody, dir, file));
    return $panel;
}

async function fetchBody($body, dir, file) {
    if (!$body.hasClass('unfetched')) return;

    let md = await getFile(`${dir}/${file}.md`);
    md = md.substr(md.search('\n') + 1);
    let mu = await enrich(md);
    let success = (typeof mu !== 'undefined');
    if (success) {
        // fetch はできていて，enrich が失敗しているだけ．
        // ほんとは enrich だけのやり直しができるとよい．
        $body.removeClass('unfetched');
        $body.html(mu);
        MathJax.typeset();
        format($body);
    } else {
        $body.text('');
        $body.append(alertIcon('API の上限に達したので markdown 形式のままで表示しています．'));
        $body.append('<hr>');
        $body.append(enrichFallback(md));
    }
}

function jumpTo(dir) {
    $('html, body').animate({
        scrollTop: $(`#head-${dir}`).offset().top - 80,
    }, 500);
}

$(function() {
    let index = getIndex();
    index.then(function(res) {
        let j = ((typeof res) === 'string')? JSON.parse(res): res;

        for (let dir of TARGET) {
            let $group = $('<div>');

            let dirTitle = j[dir].title;
            let $a = $(`<a>${dirTitle}</a>`);
            $a.on('click', () => jumpTo(dir));
            $('#jumpto').append($('<li>').html($a));

            let $head = makeHead(dir, dirTitle);
            $group.append($head);

            let ls = j[dir].contents;

            for (let d of ls) {
                let file = d.id;
                let title = d.title;

                let $body = makeBody(dir, file, title);
                $group.append($body);
            }

            $('#main').append($group);
        }
    });
});
