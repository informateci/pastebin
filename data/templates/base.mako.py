from mako import runtime, filters, cache
UNDEFINED = runtime.UNDEFINED
__M_dict_builtin = dict
__M_locals_builtin = locals
_magic_number = 4
_modified_time = 1285953406.6861119
_template_filename=u'/var/www/pastebin/pastebin/templates/base.mako'
_template_uri=u'/base.mako'
_template_cache=cache.Cache(__name__, _modified_time)
_source_encoding=None
_exports = ['header', 'footer']


def render_body(context,**pageargs):
    context.caller_stack._push_frame()
    try:
        __M_locals = __M_dict_builtin(pageargs=pageargs)
        self = context.get('self', UNDEFINED)
        c = context.get('c', UNDEFINED)
        _ = context.get('_', UNDEFINED)
        __M_writer = context.writer()
        # SOURCE LINE 1
        __M_writer(u'<!DOCTYPE html>\n<!--\n-->\n<html>\n   <head>\n      ')
        # SOURCE LINE 6
        __M_writer(unicode(self.header()))
        __M_writer(u'\n   </head>\n   <body>\n      <h1 id="header"><a href="/">Pastebin</a></h1>\n      <div id="center_body">\n         <div id="col_sidebar">\n            <h2>')
        # SOURCE LINE 12
        __M_writer(unicode(_("Recent Posts")))
        __M_writer(u'</h2>\n            <dl id="recents">\n')
        # SOURCE LINE 14
        for code in c.lastsnippets:
            # SOURCE LINE 15
            __M_writer(u'                  <dt><a href="/')
            __M_writer(unicode(code.id))
            __M_writer(u'">')
            __M_writer(unicode(code.title or _("No title")))
            __M_writer(u'</a></dt>\n                  <dd>')
            # SOURCE LINE 16
            __M_writer(unicode(_("from")))
            __M_writer(u' ')
            __M_writer(unicode(code.username))
            __M_writer(u' | ')
            __M_writer(unicode(c.now - code.creation))
            __M_writer(u' ')
            __M_writer(unicode(_("ago")))
            __M_writer(u'</dd>\n')
        # SOURCE LINE 18
        __M_writer(u'            </dl>\n            <a href="/archive">')
        # SOURCE LINE 19
        __M_writer(unicode(_("more")))
        __M_writer(u'...</a>\n         </div>\n         <div id="col_content">\n           ')
        # SOURCE LINE 22
        __M_writer(unicode(self.content()))
        __M_writer(u'\n         </div>\n      </div>\n      <hr/>\n      <div id="footer">\n         ')
        # SOURCE LINE 27
        __M_writer(unicode(self.footer()))
        __M_writer(u'\n      </div>\n   </body>\n</html>\n')
        # SOURCE LINE 37
        __M_writer(u'\n')
        # SOURCE LINE 47
        __M_writer(u'\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_header(context):
    context.caller_stack._push_frame()
    try:
        __M_writer = context.writer()
        # SOURCE LINE 31
        __M_writer(u'\n   <title>Pastebin</title>\n   <meta charset="utf-8"/>\n   <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.8.1/build/reset/reset-min.css">\n   <link rel="stylesheet" type="text/css" href="/pygments_style.css" />\n   <link rel="stylesheet" type="text/css" href="/style.css" />\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_footer(context):
    context.caller_stack._push_frame()
    try:
        __M_writer = context.writer()
        # SOURCE LINE 38
        __M_writer(u'\n<cite>"Guess what? This site is HTML5 compliant and CSS3 compliant. No excuse. Use a good browser."</cite>\n<p>100% python handmande. powered by <a href="http://pylonshq.com">pylons</a>,\n   <a href="http://www.sqlalchemy.org">sqlalchemy</a>, <a href="http://pygments.org">pygments</a>, <a href="http://www.sqlite.org">sqlite</a> and <a href="http://www.vim.org">vim</a>.</p>\n<p>For comments, suggests and bugfix please refer to #informateci on irc.freenode.net</p>\n<p><a href="/source">Source code</a> available. take a look!</p>\n<p>support our little creatures! <a href="http://informateci.tumblr.com" rel="nofollow">informateci.tumblr.com</a> and <a href="http://twitter.com/informateci" rel="nofollow">twitter.com/informateci</a>\n<!--\n-->\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


