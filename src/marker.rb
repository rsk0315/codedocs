require 'commonmarker'

HTML_HEAD = %q(<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  
  <!-- <link rel="stylesheet" href="css/github-light.css"> -->

  <script src="https://code.jquery.com/jquery-3.4.1.min.js"
          integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
          crossorigin="anonymous">
  </script>

  <link rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
        crossorigin="anonymous">
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
          integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
          crossorigin="anonymous">
  </script>

  <script>
    MathJax = {
        tex: {
            packages: ['base', 'require'],
            inlineMath: [['$', '$'], ['$$', '$$']],
        },
        startup: {
            requireMap: {
                AMSmath: 'ams',
                AMSsymbols: 'ams',
                AMScd: 'amsCd',
                HTML: 'html',
                noErrors: 'noerrors',
                noUndefined: 'noundefined',
            },
            ready: function() {
                let CommandMap = MathJax._.input.tex.SymbolMap.CommandMap;
                let requireMap = MathJax.config.startup.requireMap;
                let RequireLoad = MathJax._.input.tex.require.RequireConfiguration.RequireLoad;
                let RequireMethods = {
                    Require: function(parser, name) {
                        let required = parser.GetArgument(name);
                        if (required.match(/[^_a-zA-Z0-9]/) || required === '') {
                            throw new TexError('BadPackageName', 'Argument for %1 is not a valid package name', name);
                        }
                        if (requireMap.hasOwnProperty(required)) {
                            required = requireMap[required];
                        }
                        RequireLoad(parser, required);
                    }
                };
                new CommandMap('require', {require: 'Require'}, RequireMethods);
                return MathJax.startup.defaultReady();
            }
        },
    };
  </script>
  <script type="text/javascript"
          id="MathJax-script" async
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-svg.js">
  </script>

  <link href="https://fonts.googleapis.com/css?family=Lato:100,400,700"
        rel="stylesheet" type="text/css">
  <link rel="stylesheet" href="/css/base.css">

  <link rel="stylesheet" href="/css/styles/github-gist.css">
  <script src="/js/highlight.pack.js"></script>
  <script>hljs.initHighlightingOnLoad();</script>

  <style>
    .hljs {
      background: inherit;
      padding: 0;
      border-radius: 0;
    }
  </style>
</head>)

BLOCKQUOTE_OPEN = '<div class="blockquote-wrapper">
<div class="blockquote-container">
<div class="blockquote-border">&nbsp;</div>
<div class="blockquote-content">'
BLOCKQUOTE_CLOSE = '</div></div></div>'

def postprocess(html)
    html
        .gsub('<blockquote>', BLOCKQUOTE_OPEN)
        .gsub('</blockquote>', BLOCKQUOTE_CLOSE)
        .gsub('<li><input', '<li style="list-style-type: none;"><input')
        .gsub('<pre><code>', '<pre><code class="plaintext">')
        .gsub('<section', "<hr>\n<section")
end

def main()
    begin
        fin = File.open(ARGV[0] || '/dev/stdin', 'r')
        fout = File.open(ARGV[1] || '/dev/stdout', 'w')
        md = fin.read
        doc = CommonMarker.render_doc(
            md,
            [:DEFAULT, :FOOTNOTES],
            [:tasklist, :strikethrough, :table]
        )
        htmldoc = postprocess doc.to_html
        html = (fout.path != '/dev/stdout')? %Q(<!DOCTYPE html>
<html>
#{HTML_HEAD}
<body>

<div id="main-nav" class="float-container">
  <div id="main" class="container">
    <div class="panel panel-docs">
      <div class="panel-heading collapse-heading"><h3>xxx</h3></div>
      <div class="panel-body panel-collapsed">

#{htmldoc}

      </div>
    </div>
  </div>
</div>

</body>
</html>
): htmldoc
        fout.write html
    rescue IOError => e
        p fin
        p fout
    ensure
        fin.close unless fin.nil?
        fout.close unless fout.nil?
    end
end

main
