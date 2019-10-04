'use strict';

async function getIndex() {
    return await $.ajax({
        url: 'content/index.json',
        headers: {
            'Content-Type': 'text/json',
        },
        success: r => r,
    });
}

async function getFile(name) {
    return await $.ajax({
        url: `content/${name}`,
        success: r => r,
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
        success: r => r,
    });
}

function makeHead(name) {
    return $(`<span class="head"><h1>${name}</h1></span>`);
}

function makeBody(dir, file, title) {
    let $res = $(`<div id=${dir}-${file} class="unfetched"></div>`);
    $res.html(`<h2>${title}</h2>`);
    $res.on('click', function() { fetchBody($(this), dir, file); });
    return $res;
}

async function fetchBody($body, dir, file) {
    if (!$body.hasClass('unfetched')) return;

    let md = await getFile(`${dir}/${file}.md`);
    let mu = await enrich(md);
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
