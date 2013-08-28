<!DOCTYPE html>
<!--
-->
<html>
   <head>
      ${self.header()}
   </head>
   <body>
      <h1 id="header"><a href="/">Pastebin</a></h1>
      <div id="center_body">
         <div id="col_sidebar">
            <h2>${_("Recent Posts")}</h2>
            <dl id="recents">
               % for code in c.lastsnippets:
                  <dt><a href="/${code.id}">${code.title or _("No title")}</a></dt>
                  <dd>${_("from")} ${code.username} | ${c.now - code.creation} ${_("ago")}</dd>
               % endfor
            </dl>
            <a href="/archive">${_("more")}...</a>
         </div>
         <div id="col_content">
           ${self.content()}
         </div>
      </div>
      <hr/>
      <div id="footer">
         ${self.footer()}
      </div>
   </body>
</html>
<%def name="header()">
   <title>Pastebin</title>
   <meta charset="utf-8"/>
   <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.8.1/build/reset/reset-min.css">
   <link rel="stylesheet" type="text/css" href="/pygments_style.css" />
   <link rel="stylesheet" type="text/css" href="/style.css" />
</%def>
<%def name="footer()">
<cite>"Guess what? This site is HTML5 compliant and CSS3 compliant. No excuse. Use a good browser."</cite>
<p>100% python handmande. powered by <a href="http://pylonshq.com">pylons</a>,
   <a href="http://www.sqlalchemy.org">sqlalchemy</a>, <a href="http://pygments.org">pygments</a>, <a href="http://www.sqlite.org">sqlite</a> and <a href="http://www.vim.org">vim</a>.</p>
<p>For comments, suggests and bugfix please refer to #informateci on irc.freenode.net</p>
<p><a href="/source">Source code</a> available. take a look!</p>
<p>support our little creatures! <a href="http://informateci.tumblr.com" rel="nofollow">informateci.tumblr.com</a> and <a href="http://twitter.com/informateci" rel="nofollow">twitter.com/informateci</a>
<!--
-->
</%def>
