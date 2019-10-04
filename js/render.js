'use strict';

async function getIndex() {
    return await $.ajax({
        url: 'content/index.json',
        headers: {
            'Content-Type': 'text/json',
        },
    });
}

async function getFile(name) {
    return await $.ajax({
        url: `content/${name}`,
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
    });
}

function makeHead(name) {
    return $(`<span class="head"><h1>${name}</h1></span>`);
}

function makeBody(dir, file, title) {
    let $panel = $('<div class="panel panel-info"></div>');

    let $panelHead = $('<div></div>');
    $panelHead.attr({
        class: 'panel-heading collapse-heading collapsed',
        id: `${dir}-${file}`,
        'data-toggle': 'collapse',
        'data-target': `#${dir}-${file}-body`,
        'aria-expanded': false,
    });
    $panelHead.html(`<h3 class="panel-title">${title}<span class="glyphicon pull-right"></span></h3>`);

    let $panelBody = $('<div></div>');
    $panelBody.attr({
        class: 'panel-body panel-collapse collapse unfetched',
        id: `${dir}-${file}-body`,
        'aria-expanded': false,
    });

    $panel.append($panelHead);
    $panel.append($panelBody);

    $panel.on('click', () => fetchBody($panelBody, dir, file));
    return $panel;
}

async function fetchBody($body, dir, file) {
    console.log('clicked', $body);
    if (!$body.hasClass('unfetched')) return;

    let md = await getFile(`${dir}/${file}.md`);
    let mu = await enrich(md.substr(md.search('\n')+1));
    $body.removeClass('unfetched');
    $body.append(mu);
    MathJax.typeset();
}

$(function() {
    let index = getIndex();
    index.then(function(res) {
        let j = JSON.parse(res);
        console.log(j);

        for (let dir of TARGET) {
            let $group = $('<div>');

            let $head = makeHead(dir);
            $group.append($head);

            let ls = j[dir];
            console.log(ls);

            for (let d of ls) {
                let file = Object.keys(d)[0];
                let title = d[file];

                let $body = makeBody(dir, file, title);
                $group.append($body);
            }

            $('#main').append($group);
        }
    });
});
